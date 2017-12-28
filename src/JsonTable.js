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
	createCell(row) {
		let rowData = [];
		Object.values(row).forEach((elem) => {
			rowData.push(<td>{elem}</td>)
		})

		return rowData;
	}
	createTable() {
		let table = [];

		let columnHeaders = [];
		this.state.columns.forEach((elem) => {
			columnHeaders.push(<th>{elem}</th>);
		});

		table.push(<thead><tr>{columnHeaders}</tr></thead>);

		let rowData = [];
		this.state.data.map((row) => {
			rowData.push(<tr key={row.Month}>{this.createCell(row)}</tr>);
		});

		table.push(<tbody>{rowData}</tbody>);

		return table;
	}
  render() {
    return (
      <div className="JsonTable">
				<table>
					{this.createTable()}
				</table>
			</div>
    );
  }
}

export default JsonTable;
