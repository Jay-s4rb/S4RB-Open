"use strict"


let cpmuList = new List({
	container: "#list-container",
	requestUrl: "http://localhost:3000/CPMU"
});


$("#period-toggle")
	.on("click", "#option-month", () =>	cpmuList.renderMonth())
	.on("click", "#option-quarter", () => cpmuList.renderQuarter());