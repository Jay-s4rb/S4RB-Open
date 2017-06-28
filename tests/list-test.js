"use strict"

$("body").append(`<div style="display: block" id="test-list-container"></div>`);

let list = {};

describe("List Tests", function() {

	before("Creating new List object", function(done) {
		list = new List({
			container: "#list-test-container",
			requestUrl: "http://localhost:3000/CPMU"
		});
		setTimeout(done, 500); // Delay to load data from db and init List.
	});

	after("Deleting list object by assigning empty object", function() {
		list = {};
	});

	it("Test for sort function");

	it("TODO: test for remaining features (e.g. load, processData, render, etc.");

	describe("Internal utilities", function() {
		it("convertDateStringToUTC function adds Z to each Month option", function() {
			let d = [{"Month": ""}];
			list._convertDateStringToUTC(d);

			assert.equal(d[0].Month, "Z");
		});

		it("convertDateStringToUTC function doesn't change original data", function(done) {

			let d = [{"Month": "test"}, {"Month": "123"}, {"Month": "test:123T-"} ];
			list._convertDateStringToUTC(d);

			assert.equal(d[0].Month, "testZ");
			assert.equal(d[1].Month, "123Z");
			assert.equal(d[2].Month, "test:123T-Z");
			done();
		});


		it("_prepareRow() must return object in certain format", function() {
			let data = list.jsonData[0];
			let returnValue = list._prepareRow(data);

			assert.isNumber(returnValue.quarter);
			assert.isNumber(returnValue.complaints);
			assert.isNumber(returnValue.unitsSold);
			assert.isNumber(returnValue.cpmu);

			assert.instanceOf(returnValue.month, Date);

			assert.hasAllKeys(returnValue, ["quarter", "month", "complaints", "unitsSold", "cpmu"]);
		});

		describe("_checkAndAddMissingMonths function specific tests", function() {

			it("Doesn't add records when dates are same", function() {
				let resultData = [];
				let returnValue = list._checkAndAddMissingMonths(new Date(), new Date(), resultData);

				assert.strictEqual(resultData.length, 0);
			});

			it("Doesn't add records when current date is before nextDate", function() {
				let resultData = [];
				let returnValue = list._checkAndAddMissingMonths(new Date(new Date() + 1000000 ), new Date(), resultData);

				assert.strictEqual(resultData.length, 0);
			});

			it("Does add records 3 records for January - April period", function() {
				let nextDate = new Date();
				nextDate.setMonth(0);

				let currentDate = new Date();
				currentDate.setMonth(3);

				let resultData = [];
				let returnValue = list._checkAndAddMissingMonths(nextDate, currentDate, resultData);

				assert.strictEqual(resultData.length, 3);
			});

		} );


		describe("_calculateCpmu function specific tests", function() {

			it("cpmu must be 0 if unitsSold = 0", function() {
				let returnValue = list._calculateCpmu(1000, 0);
				assert.strictEqual(returnValue, 0);
			});

			it("cpmu must be 0 if complaints = 0", function() {
				let returnValue = list._calculateCpmu(0, 1000);
				assert.strictEqual(returnValue, 0);
			});
			it("cpmu calculation is correct", function() {
				let returnValue = list._calculateCpmu(1, 10000);
				assert.strictEqual(returnValue, 100);
			});

		});

	});

});

mocha.run();