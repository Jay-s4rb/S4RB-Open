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
      data: []
    };
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

	render() {
		return (
			<div>
				<Table data={this.state.data} />
			</div>
		);
	}
}
