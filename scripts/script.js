"use strict"

class List {
	constructor(options) {
		this.options = options;

		this.jsonData;
		this.processedData;
		this.quarterData;

		this.loadData(); // auto-start app
	}

	loadData() {
		// Hardcoded headers as any change very likely will require code change as well.
		fetch(this.options.requestUrl, { "method": "GET", "headers": {"Content-Type": "application/json;"} })
			.then( response => {
				return response.json();
			})
			.then( data => {
				this.jsonData = data;

				this._convertDateStringToUTC();
				this.processData();
				this.createQuarterData();
				this.renderMonth();
			})
			.catch( error => {
				console.error(error);
			});
	}

	_convertDateStringToUTC() {
		// Current solution explicitly converts all input dates into UTC ("Z") as there is no timezone info.
		// If more flexible solution required, with multiple timezone support and additional
		// parsing capabilities (more cross-browser), must get rid of bult-in Date.parse();
		// as suggested on MDN
		// (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)
		// Date.parse provides inconsistent results and depends on date format, existence of time component,
		// existence of timezone and environment.
		// Date must be parsed manually or external library might be considered (e.g. moment.js)

		let data = this.jsonData;

		for (let row of data) {
			row.Month = row.Month + "Z";
		}

		return this.jsonData = data;
	}

	processData() {
		// TODO: JSON is valid at this point but must check actual data.
		let data = this.jsonData;
		let resultData = [];
		let nextDate = new Date(data[0].Month);

		for (let row of data) {
			// Assume there can't be more than 11 missing reports in a row.
			// Otherwise will have to compare the year as well.
			// Comparing by months in case if reports been submited at diffrent time or day.
			while (nextDate.getUTCMonth() < new Date(row.Month).getUTCMonth()) {
				resultData.push( prepareRow({
					// Assuming that quarter is 3 month period starting from January 1st
					"Quarter": Math.ceil( (nextDate.getUTCMonth() + 1) / 3), 
					"Month": nextDate,
					"Cpmu": 0
				}) );

				nextDate.setUTCMonth(nextDate.getUTCMonth() + 1); // Relying on Date auto-correction
			}

			resultData.push( prepareRow(row) );
			nextDate.setUTCMonth(nextDate.getUTCMonth() + 1);
		}

		return this.processedData = resultData;

		// ========== Helper Function ==========
		function prepareRow(row) {
			const MILLION = 1000000; // as "Complaints per million units"

			return {
				"quarter": +row.Quarter, // Converting to number to avoid XSS
				"month": new Date(row.Month),
				"complaints": row.Complaints || 0,
				"unitsSold": row.UnitsSold || 0,
				"cpmu": row.Cpmu === 0 ? 0 : (row.Complaints / row.UnitsSold * MILLION)
			}
		}
		// ====================================
	}

	sortData(data) {
		// TODO: records already in correct order but spec doesn't say anything about sort order in db
	}

	// TODO: re-factor this code - Array.reduce() is too messy.
	createQuarterData() {
		const MILLION = 1000000; // as "Complaints per million units"

		let data = this.processedData
		let result = [];
		let initialOpt = {"quarter": data[0].quarter, "comp": 0, "sold": 0};
		let cpmu = 0;

		let last = data.reduce( (temp, item, index, arr) => {
			if (item.quarter != temp.quarter) {
				if (temp.comp === 0 || temp.sold === 0) {
					cpmu = 0;
				} else {
					cpmu = (temp.comp / temp.sold * MILLION);
				}

				result.push( {
					"quarter": temp.quarter,
					"cpmu": cpmu
				} );

				temp.quarter = item.quarter;
				temp.comp = item.complaints; 
				temp.sold = item.unitsSold;
				return temp;
			}

			temp.comp += item.complaints;
			temp.sold += item.unitsSold;
			return temp;
		}, initialOpt);

		result.push( {
			"quarter": last.quarter,
			"cpmu": (last.comp / last.sold * MILLION)
		} );

		return this.quarterData = result;
	}

	renderMonth() {
		let data = this.processedData;

		// Might need to round first, depends on requirement
		const cpmuFormatter = new Intl.NumberFormat("en-GB", {"minimumFractionDigits": 5, "maximumFractionDigits": 10});
		const monthFormatter = new Intl.DateTimeFormat("en-GB", {timeZoneName: "short" , hour: "numeric", day: "2-digit", month: "long", year: "numeric", timeZone: "UTC"});

		let template = "";

		for (let row of data) {
			let cpmuFormatted = cpmuFormatter.format(row.cpmu);
			let monthFormatted = monthFormatter.format(row.month);

			template += `<tr><td>${monthFormatted}</td><td>${cpmuFormatted}</td></tr>`;
		}

		// Using jQuery as it is already loaded for Bootstrap
		$(this.options.container).find("tbody").html(template);
		//document.getElementsByTagName('tbody')[0].innerHTML = template;
	}

	renderQuarter() {
		// Might need to round first, depends on requirement
		const cpmuFormatter = new Intl.NumberFormat("en-GB", {"minimumFractionDigits": 5, "maximumFractionDigits": 10});

		let data = this.quarterData;
		let template = "";

		for (let row of data) {
			let cpmuFormatted = cpmuFormatter.format(row.cpmu);

			template += `<tr><td>${row.quarter}</td><td>${cpmuFormatted}</td></tr>`;
		}

		// Using jQuery as it is already loaded for Bootstrap
		$(this.options.container).find("tbody").html(template);
		//document.getElementsByTagName('tbody')[0].innerHTML = template;
	}
}


let cpmuList = new List({
	container: "#list-container",
	requestUrl: "http://localhost:3000/CPMU"
});


$("#period-toggle")
	.on("click", "#option-month", () =>	cpmuList.renderMonth())
	.on("click", "#option-quarter", () => cpmuList.renderQuarter());