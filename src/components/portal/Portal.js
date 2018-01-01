import './portal';
import 'milligram';
import endpoints from '../../api';
import { Component } from 'preact';
import Table from '../cpmu_table/Table';


export default
class Portal extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      period: 'Month'

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
      period: (this.state.period === 'Month' )? 'Quarter' : 'Month'
    });
    //console.log(this.state.period);
  }

	render(props, state) {
		return (
			<div>
				<Table period={state.period} toggle={this.togglePeriod} data={state.data} />
			</div>
		);
	}
}
