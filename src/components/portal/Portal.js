import './portal';
import 'milligram';
import endpoints from '../../api';
import { Component } from 'preact';
import Table from '../cpmu_table/Table';
import { cpmuCalc as calc } from '../../utils';
import {groupBy} from 'lodash';

export default
class Portal extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      period: 'Month',
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
        // console.log(this.state.data);
    });
  }

  togglePeriod() {
    this.setState({
      period: (this.state.period === 'Month' )? 'Quarter' : 'Month',
      dataToDisplay: (this.state.period === 'Month' ) ? this.displayByQuarter() : this.state.data
    });
  }

  groupQuarterly() {
     const grp = groupBy(this.state.data, obj => {
      return obj.Quarter;
    });
    return grp;
  }

  cpmuQuarterly(i){
    let units = 0, comps = 0;
    i.forEach((item) => {
      units +=  item.UnitsSold;
      comps += item.Complaints;
    });
    return(calc(comps, units));
  }

  displayByQuarter(){
    const grouped = this.groupQuarterly();
    const qrt = [
      {Quarter: 1, Cmpu: this.cpmuQuarterly(grouped['1'])},
      {Quarter:2, Cmpu: this.cpmuQuarterly(grouped['2'])},
      {Quarter:3, Cmpu: this.cpmuQuarterly(grouped['3'])},
      {Quarter:4, Cmpu: this.cpmuQuarterly(grouped['4'])}
    ];
    return qrt;
  }

	render(props, state) {
		return (
			<div>
				<Table period={state.period} toggle={this.togglePeriod} data={(state.dataToDisplay.length > 0 )? state.dataToDisplay : state.data} />
			</div>
		);
	}
}
