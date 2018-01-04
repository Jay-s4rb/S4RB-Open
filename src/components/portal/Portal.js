import './portal';
import endpoints from '../../api';
import {h, Component } from 'preact';
import Table from '../cpmu_table/Table';
import { cpmuCalc as calc , formatDate as fmt} from '../../utils';
import {groupBy, forIn, uniqBy } from 'lodash';
import { addMonths, differenceInMonths, getQuarter } from 'date-fns';

export default
class Portal extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      period: 'Month',
      processedData: [],
      dataToDisplay: []
    };

    this.togglePeriod = this.togglePeriod.bind(this);
  }

  componentDidMount() {
    fetch(endpoints.cpmu)
    .then(res => res.json())
    .then(data => {
        this.setState({
          data
        });

        this.rebuildData();
    });
  }

  fillDates() {
     const arr = this.state.data.slice(0);
     const startd = this.state.data[0].Month;
     const endd = this.state.data[arr.length -1].Month;
     const months = differenceInMonths(endd, startd);
     return[...Array(months+1).keys()].map((i) => addMonths(startd, i));
     /* let pd = [];
     for(let i = 0; i < months + 1; i++){
      pd.push(addMonths(startd, i));
     }
     console.log(pd); */
  }

  rebuildData() {
    const arr = this.fillDates();
    let filled =[];
    let missing =[];

    for(let date of arr) {
      for(let obj of this.state.data){
        if(fmt(date) === fmt(obj.Month)){
          filled.push({Quarter: getQuarter(new Date(date)), Month: fmt(date), Cmpu: calc(obj.Complaints, obj.UnitsSold)});
        }
      }
      missing.push({Quarter: getQuarter(new Date(date)), Month: fmt(date), Cmpu: 0.00000});
    }

    this.setState({
      processedData: uniqBy(filled.concat(missing).sort((a, b) => new Date(a.Month) - new Date(b.Month)), (o) => o.Month)
    });
  }

  togglePeriod() {
    this.setState({
      period: (this.state.period === 'Month' )? 'Quarter' : 'Month',
      dataToDisplay: (this.state.period === 'Month' ) ? this.displayByQuarter() : this.state.processedData
    });
  }

  groupQuarterly() {
    const grp = groupBy(this.state.data, obj =>  obj.Quarter);
    return grp;
  }

  cpmuQuarterly(i) {
    let units = 0, comps = 0;
    i.forEach((item) => {
      units +=  item.UnitsSold;
      comps += item.Complaints;
    });
    return(calc(comps, units));
  }

  displayByQuarter() {
    let qrt = [];
    forIn(this.groupQuarterly(), (obj, key) => {
      qrt.push({Quarter: key, Cmpu: this.cpmuQuarterly(obj)});
    });
    return qrt;
  }

	render(props, state) {
		return (
			<div>
				<Table period={state.period} toggle={this.togglePeriod} data={(state.dataToDisplay.length > 0 )? state.dataToDisplay : state.processedData} />
			</div>
		);
	}
}
