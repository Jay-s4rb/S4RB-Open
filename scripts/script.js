"use strict"

class List {
	constructor(options) {
		this.options = options;
		this.jsonData;
		this.processedData = [];
	}

	loadData() {
		fetch(this.options.requestUrl, { "method": "GET", "headers": {"Content-Type": "application/json;"} })
			.then( response => {
				return response.json();
			})
			.then( jsonData => {
				this.jsonData = jsonData; // Saving original data, just in case
				this.processData(jsonData);
				this.render(this.processedData);
			})
			.catch( error => {
				console.error(error);
			});
	}

	processData(data) {
		// JSON is valid at this point but must check actual data.

		const MILLION = 1000000; // as "Complaints per million units"

		let nextDate = new Date(data[0].Month);
		for (let row of data) {

			let currentDate = new Date(row.Month);

			// Assume there can't be more than 11 missing reports in a row.
			// Otherwise will have to compare the year as well.
			// Comparing months in case if reports been submited at diffrent time or day.
			while (nextDate.getMonth() < currentDate.getMonth()) {
				this.processedData.push({
					"quarter": Math.ceil( (nextDate.getMonth() + 1) / 3),
					"month": nextDate,
					"complaints": 0,
					"unitsSold": 0,
					"cpmu": 0
				});
				console.log(nextDate);
				console.log(this.processedData);

				nextDate.setMonth(nextDate.getMonth() + 1);
			}

			this.processedData.push({
				"quarter": row.Quarter,
				"month": new Date(row.Month),
				"complaints": row.Complaints,
				"unitsSold": row.UnitsSold,
				"cpmu": (row.Complaints / row.UnitsSold * MILLION)
			});

			nextDate.setMonth(nextDate.getMonth() + 1);
		}
	}

	render(data) {
		// Might need to round first, depends on requirement
		const cpmuFormatter = new Intl.NumberFormat("en-GB", {"minimumFractionDigits": 10});
		const monthFormatter = new Intl.DateTimeFormat("en-GB", {day: "2-digit", month: "long", year: "numeric"});

		let template = "";


		for (let row of data) {
			let monthFormatted = monthFormatter.format(row.month);
			let cpmuFormatted = cpmuFormatter.format(row.cpmu);

			template += `<tr><td>${monthFormatted}</td><td>${row.cpmu}</td></tr>`;
		}

		// Using jQuery as it is already loaded for Bootstrap
		$(this.options.container).find("tbody").append(template);
	}
}

let cpmuList = new List({
	container: "#list-container",
	requestUrl: "http://localhost:3000/CPMU"
});

cpmuList.loadData();