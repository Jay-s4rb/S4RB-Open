import endpoints from '../../api';
import {h, Component } from 'preact';
import { groupQuarterly, cpmuQuarterly, fillDates, allDates } from '../../utils';
import { forIn } from 'lodash';
import { getQuarter } from 'date-fns';
import Table from '../cpmu_table/Table';

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
    const all = fillDates(allDates(this.state.data), this.state.data);
    this.setState({
      processedData: all
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
