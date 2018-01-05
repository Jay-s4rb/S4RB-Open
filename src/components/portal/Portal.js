import './portal';
import endpoints from '../../api';
import {h, Component } from 'preact';;
import {  calc , fmt, groupQuarterly, cpmuQuarterly, fillDates } from '../../utils';
import { forIn, uniqBy } from 'lodash';
import { getQuarter } from 'date-fns';
import Table from '../cpmu_table/Table'

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

  rebuildData() {
    const arr = fillDates(this.state.data);
    let filled =[];
    let missing =[];

    for(let date of arr) {
      for(let obj of this.state.data){
        if(fmt(date) === fmt(obj.Month)){
          filled.push({Quarter: getQuarter(new Date(date)), Month: fmt(date), Cpmu: calc(obj.Complaints, obj.UnitsSold).toFixed(8)});
        }
      }
      missing.push({Quarter: getQuarter(new Date(date)), Month: fmt(date), Cpmu: 0.00000.toFixed(5)});
    }

    this.setState({
      processedData: uniqBy(filled.concat(missing).sort((a, b) => new Date(a.Month) - new Date(b.Month)), (o) => o.Month)
    });
  }

  togglePeriod() {
    this.setState({
      period: (this.state.period === 'Month' )? 'Quarter' : 'Month',
      dataToDisplay: (this.state.period === 'Month' ) ? this.getQuarterly() : this.state.processedData
    });
  }

  getQuarterly() {
    let qrt = [];
    forIn(groupQuarterly(this.state.data), (obj, key) => {
      qrt.push({Quarter: key, Cpmu: cpmuQuarterly(obj).toFixed(9)});
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
