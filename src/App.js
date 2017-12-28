import React, { Component } from 'react';
import './App.css';
import JsonTable from './JsonTable';
import SelectGroupBy from './SelectGroupBy';
import Moment from 'react-moment';

const CPMUCalc = require('./CPMUCalc');

class App extends Component {
	constructor(props) {
		super(props);

		// Set the initial state
		// Call a method to format the data according the initial value set for the group by
		this.state = {
			groupBy: this.props.groupBy,
			data: this.buildData(this.props.data, this.props.groupBy),
		};
	}
	// Method called onchange of the groupBy select dropdown
	updateTheDataAndUpdateTableView( event ) {
		// Set the state according to the new value
		this.state.groupBy = event.target.value;

		// Set the data formatted according to the group by
		this.state.data = this.buildData(this.props.data, this.state.groupBy);
	}
	// Calculate the difference in months between two dates provided
	monthDifference(d1, d2) {
			d1 = new Date(d1);
			d2 = new Date(d2);

			let months;

			months = (d2.getFullYear() - d1.getFullYear()) * 12;
			months -= d1.getMonth() + 1;
			months += d2.getMonth();
			return months <= 0 ? 0 : months;
	}
	// Formats the data into the json for the table to consume
	// It formats it differently depending on what group by clause is chosen
	buildData(data, groupBy) {
		let tableData = [];

		// Sort the data so it is in order by month
		data = data.sort((a, b) => {
			return new Date(a.Month).getTime() - new Date(b.Month).getTime();
		});

		// If the group by is set to the month
		if (groupBy === 'month') {

			// Keep track of the previous rows date
			//  This is so we can calculate if there are any missing months
			let previousDate;

			data.map((row) => {
				// If the previous date has been set then calculate the month difference
				// and insert rows that are missing
				if (previousDate !== undefined) {
					const monthDifference = this.monthDifference(previousDate, row.Month);

					if (monthDifference >= 1) {
						for(let i = 1; i <= monthDifference; i++) {
							tableData.push({"Month": <Moment format="D MMMM YYYY" add={{ months: i }}>{previousDate}</Moment>, "CPMU": 0});
						}
					}
				}
				previousDate = row.Month;

				tableData.push({"Month": <Moment format="D MMMM YYYY">{row.Month}</Moment>, "CPMU": CPMUCalc.calculate(row.Complaints, row.UnitsSold)});
			});
		} else if (groupBy === 'quarter') {

			// Sort the date into an object sorted by quarter
			// It will look something like this
			/**
			 * {
			 * 	1: {[], [], []}
			 *  2: {[], [], []}
			 * }
			 */
			const sortedData = data.reduce(function(r, a){
				r[a.Quarter] = r[a.Quarter] || [];
				r[a.Quarter].push(a);
				return r;
			}, Object.create(null));

			// For each quarter
			Object.keys(sortedData).forEach((quarter) => {
				let complaints = 0;
				let unitsSold = 0;

				// Iterate through all the rows for that quarter and calculate the complaints total and the units sold total
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
