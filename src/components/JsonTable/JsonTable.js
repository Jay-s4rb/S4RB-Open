import React, { Component } from 'react';
import './JsonTable.css';
import TableRender from '../../modules/TableRender';

class JsonTable extends Component {
  createTable() {
    const table = [];

    const columnHeaders = [];
    const colHeaders = Object.keys(this.props.data[0]);

    colHeaders.forEach((elem, index) => {
      columnHeaders.push(<th key={index}>{elem}</th>);
    });

    table.push(<thead key="-1"><tr key="-3">{columnHeaders}</tr></thead>);

    const rowData = [];
    this.props.data.map((row, index) => rowData.push(<tr key={index}>{TableRender.createCell(row)}</tr>));

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
