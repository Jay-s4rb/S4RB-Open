"use strict"

class List {
	constructor(options) {
		this.options = options;
		this.rawData;
		this.jsonData;
		this.processedData;

		this.listData = [];
	}

	loadData() {
		fetch(this.options.requestUrl, this.options.requestOptions)
			.then( response => {
				return response.json()
			})
			.then( jsonData => {
				this.render(jsonData);
			})
			.catch( error => {
				console.error("Unknown error %O", error);
			});
	}

	processData() {

	}

	render(data) {
		let template = "";

		for (let i of data) {
			template += `<tr><td>${i}</td><td>${i}</td></tr>`;

		}

		
	}
}

let cpmuList = new List({
	container: "#list-container",
	requestUrl: "http://localhost:3000/CPMU",
	requestOptions: {"method": "GET", "headers": {"Content-Type": "application/json;"}}
});

cpmuList.loadData();