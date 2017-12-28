import React, { Component } from 'react';
import './JsonTable.css';

class JsonTable extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: this.props.data,
			columns: Object.keys(this.props.data[0])
		};
	}
  render() {
    return (
      <div className="JsonTable">
				<table>
					<thead>
						<tr>
							{
								this.state.columns.forEach((elem) => {
									return <th>{elem}</th>
								})
							}
						</tr>
					</thead>
					<tbody>
						{
							this.state.data.map((row) => {
								return <tr key={row.Month}>
									{
										Object.values(row).forEach((elem) => {
											return <td>{elem.toString()}</td>
										})
									}
								</tr>
							})
						}
					</tbody>
				</table>
			</div>
    );
  }
}

export default JsonTable;
