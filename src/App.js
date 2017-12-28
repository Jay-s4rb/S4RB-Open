import React, { Component } from 'react';
import './App.css';
import JsonTable from './JsonTable';
import SelectGroupBy from './SelectGroupBy';

const CPMUCalc = require('./CPMUCalc');

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			groupBy: this.props.groupBy,
			data: this.buildData(this.props.data, this.props.groupBy),
		};
	}
	buildData(data, groupBy) {
		let tableData = [];
		if (groupBy === 'month') {
			// Sort the data so it is in order by month
			data = data.sort((a, b) => {
				return new Date(a.Month).getTime() - new Date(b.Month).getTime();
			});

			data.map((row) => {
				tableData.push({"Month": row.Month, "CPMU": CPMUCalc.calculate(row.Complaints, row.UnitsSold)});
			});
		} else if (groupBy === 'quarter') {

		}

		return tableData;
	}
  render() {
		console.log(this.state.data);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Complaints Per Million Units</h1>
					<SelectGroupBy default={this.state.groupBy}/>
        </header>
        <JsonTable data={ this.state.data } />
      </div>
    );
  }
}

export default App;
