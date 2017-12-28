import React, { Component } from 'react';
import './JsonTable.css';

class JsonTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      columns: Object.keys(this.props.data[0]),
    };
  }
  createCell(row) {
    const rowData = [];
    Object.values(row).forEach((elem) => {
      rowData.push(<td key={elem}>{elem}</td>);
    });

    return rowData;
  }
  createTable() {
    const table = [];

    const columnHeaders = [];
    this.state.columns.forEach((elem, index) => {
      columnHeaders.push(<th key={index}>{elem}</th>);
    });

    table.push(<thead key="-1"><tr key="-3">{columnHeaders}</tr></thead>);

    const rowData = [];
    this.state.data.map((row, index) => rowData.push(<tr key={index}>{this.createCell(row)}</tr>));

    table.push(<tbody key="-2">{rowData}</tbody>);

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
