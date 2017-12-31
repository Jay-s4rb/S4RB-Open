import './portal';
import endpoints from '../../api';
import { Component } from 'preact';

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
    const rows = this.state.data.map((obj, i) => {
      return(
        <tr>
          <td>{obj.Month}</td>
          <td>{obj.Complaints}</td>
        </tr>
      );
    })

		return (
			<div>
				<table>
        <tr>
          <th>month</th>
          <th>cpmu</th>
        </tr>
          {rows}
        </table>
			</div>
		);
	}
}
