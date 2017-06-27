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

				this._convertDateStringToUTC(this.jsonData);
				this.processData();
				this.createQuarterData();
				this.renderMonth();
			})
			.catch( error => {
				console.error(error); // Error handler for Network and json conversion errors.
			});
	}

	_convertDateStringToUTC(data) {
		// Current solution explicitly converts all input dates into UTC ("Z") as there is no timezone info.
		// If more flexible solution required, with multiple timezone support and additional
		// parsing capabilities (more cross-browser), must get rid of bult-in Date.parse();
		// as suggested on MDN
		// (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)
		// Date.parse provides inconsistent results and depends on date format, existence of time component,
		// existence of timezone and environment.
		// Date must be parsed manually or external library might be considered (e.g. moment.js)

		for (let row of data) {
			row.Month = row.Month + "Z";
		}
	}

	_prepareRow(row) {
		return {
			"quarter": +row.Quarter, // Converting to number to avoid XSS
			"month": new Date(row.Month),
			"complaints": row.Complaints,
			"unitsSold": row.UnitsSold,
			"cpmu": this._calculateCpmu(row.Complaints, row.UnitsSold)
		}
	}

	_calculateCpmu(complaints, untisSold) {
		const MILLION = 1000000; // as "Complaints per million units"

		// Without this check CPMU could be NaN if untisSold = 0
		return (untisSold !== 0) ? (complaints / untisSold * MILLION) : 0;
	}

	processData() {
		// TODO: JSON is valid at this point but must check actual data.
		
		let resultData = [];
		let nextDate = new Date(this.jsonData[0].Month);

		for (let row of this.jsonData) {
			// Assume there can't be more than 11 missing reports in a row.
			// Otherwise will have to compare the year as well.
			// Comparing by months in case if reports been submited at diffrent time or day.
			while (nextDate.getUTCMonth() < new Date(row.Month).getUTCMonth()) {
				resultData.push( this._prepareRow({
					// Assuming that quarter is 3 month period starting from January 1st
					"Quarter": Math.ceil( (nextDate.getUTCMonth() + 1) / 3), 
					"Month": nextDate,
					"Complaints": 0,
					"UnitsSold": 0
				}) );

				nextDate.setUTCMonth(nextDate.getUTCMonth() + 1); // Rely on Date auto-correction
			}

			resultData.push( this._prepareRow(row) );
			nextDate.setUTCMonth(nextDate.getUTCMonth() + 1);
		}

		this.processedData = resultData;
	}

	sortData(data) {
		// TODO: records already in correct order but spec doesn't say anything about sort order in db
	}

	// TODO: re-factor this code - Array.reduce() is too messy and unclear.
	createQuarterData() {
		let result = [];
		let initialOpt = {
			"quarter": this.processedData[0].quarter,
			"month": this.processedData[0].month,
			"complaints": 0,
			"unitsSold": 0
		};

		let last = this.processedData.reduce( (temp, item, index, arr) => {
			if (item.quarter != temp.quarter) {
				result.push({
					"quarter": temp.quarter,
					"month": temp.month,
					"cpmu": this._calculateCpmu(temp.complaints, temp.unitsSold)
				});

				temp = item;
			} else {
				temp.complaints += item.complaints;
				temp.unitsSold += item.unitsSold;
			}

			return temp;
		}, initialOpt);

		result.push( {
			"quarter": last.quarter,
			"month": last.month,
			"cpmu": this._calculateCpmu(last.complaints, last.unitsSold)
		} );

		this.quarterData = result;
	}

	renderMonth() {
		// Might need to round first, depends on requirement
		const cpmuFormatter = new Intl.NumberFormat("en-GB", {"minimumFractionDigits": 5, "maximumFractionDigits": 10});
		const monthFormatter = new Intl.DateTimeFormat("en-GB", {day: "2-digit", month: "long", year: "numeric", timeZone: "UTC"});

		let template = "";

		for (let row of this.processedData) {
			let cpmuFormatted = cpmuFormatter.format(row.cpmu);
			let monthFormatted = monthFormatter.format(row.month);

			template += `<tr><td>${monthFormatted}</td><td>${cpmuFormatted}</td></tr>`;
		}

		this._render(template, `<th>Month</th><th>CPMU</th>`);
	}

	renderQuarter() {
		// Might need to round first, depends on requirement
		const cpmuFormatter = new Intl.NumberFormat("en-GB", {"minimumFractionDigits": 5, "maximumFractionDigits": 10});
		const yearFormatter = new Intl.DateTimeFormat("en-GB", {year: "numeric", timeZone: "UTC"});
		let template = "";

		for (let row of this.quarterData) {
			let cpmuFormatted = cpmuFormatter.format(row.cpmu);
			let yearFormatted = yearFormatter.format(row.month);

			template += `<tr><td>${row.quarter} (${yearFormatted})</td><td>${cpmuFormatted}</td></tr>`;
		}

		this._render(template, `<th>Quarter</th><th>CPMU</th>`);
	}

	// TODO: Switch to Handlebars templates
	_render(rowsTemplate, headerRowsTemplate) {
		let template =`
			<table class="table table-sm table-bordered table-striped">				
				<thead>
					<tr>
						${headerRowsTemplate}
					</tr>
				</thead>
				<tbody>
					${rowsTemplate}
				</tbody>
			</table>`;

		// Using jQuery as it is already loaded for Bootstrap
		$(this.options.container).html(template);
	}
}