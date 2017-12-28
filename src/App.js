import React, { Component } from 'react';
import './App.css';
import JsonTable from './JsonTable';
import SelectGroupBy from './SelectGroupBy';
import Moment from 'react-moment';

const CPMUCalc = require('./CPMUCalc');

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			groupBy: this.props.groupBy,
			data: this.buildData(this.props.data, this.props.groupBy),
		};
	}
	updateTheDataAndUpdateTableView( event ) {
		this.state.groupBy = event.target.value;
		this.state.data = this.buildData(this.props.data, this.state.groupBy);
	}
	buildData(data, groupBy) {
		let tableData = [];
		if (groupBy === 'month') {
			// Sort the data so it is in order by month
			data = data.sort((a, b) => {
				return new Date(a.Month).getTime() - new Date(b.Month).getTime();
			});

			data.map((row) => {
				tableData.push({"Month": <Moment format="D MMMM YYYY">{row.Month}</Moment>, "CPMU": CPMUCalc.calculate(row.Complaints, row.UnitsSold)});
			});
		} else if (groupBy === 'quarter') {
			data = data.sort((a, b) => {
				return new Date(a.Month).getTime() - new Date(b.Month).getTime();
			});

			const sortedData = data.reduce(function(r, a){
				r[a.Quarter] = r[a.Quarter] || [];
				r[a.Quarter].push(a);
				return r;
			}, Object.create(null));

			Object.keys(sortedData).forEach((quarter) => {
				let complaints = 0;
				let unitsSold = 0;

				sortedData[quarter].forEach((row) => {
					complaints += row.Complaints;
					unitsSold += row.UnitsSold;
				});

				tableData.push({"Quarter": quarter, "CPMU": CPMUCalc.calculate(complaints, unitsSold)});
			});
		}

		return tableData;
	}
  render() {
		console.log(this.state.data);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Complaints Per Million Units</h1>
					<SelectGroupBy default={this.state.groupBy} onChange={this.updateTheDataAndUpdateTableView.bind(this)}/>
        </header>
        <JsonTable data={ this.state.data } />
      </div>
    );
  }
}

export default App;
