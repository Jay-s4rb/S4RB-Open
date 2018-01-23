const _ = require('lodash');
const moment = require('moment');

class ComplaintsLogic {
  constructor(r) {
    this.repo = r;
  }

  async GetComplaints() {
    const complaints = await this.repo.GetComplaints();
    const startDate = moment(complaints[0].Month);
    const endDate = moment(complaints[complaints.length - 1].Month).add(1, 'day');

    const results = [];

    const currentDate = startDate.clone();
    let complaintData = complaints.shift();

    while (currentDate.isBefore(endDate)) {
      const x = moment(currentDate).format('YYYY-MM-01T00:00:00');

      if (currentDate.format('YYYY-MM-01T00:00:00') === complaintData.Month) {
        results.push({
          Month: x,
          CPMU: ComplaintsLogic.CalculateComplaintsPerMillionUnits(
            complaintData.Complaints,
            complaintData.UnitsSold),
        });
        complaintData = complaints.shift();
      } else {
        results.push({ Month: x, CPMU: 0 });
      }
      currentDate.add(1, 'M');
    }

    return results;
  }

  async GetGroupedComplaints() {
    const complaints = await this.repo.GetComplaints();
    const results = [];

    const groupedComplaints = _(complaints)
      .groupBy(cpmu => cpmu.Quarter)
      .map((vals, key) => ({ Quarter: key, Data: vals }))
      .value();

    _.forEach(groupedComplaints, value => {
      const totalComplaints = _.sumBy(value.Data, v => v.Complaints);
      const totalUnitsSold = _.sumBy(value.Data, v => v.UnitsSold);
      results.push({
        Quarter: value.Quarter,
        CPMU: ComplaintsLogic.CalculateComplaintsPerMillionUnits(
          totalComplaints,
          totalUnitsSold,
        ),
      });
    });
    return results;
  }

  static CalculateComplaintsPerMillionUnits(complaints, unitsSold) {
    return complaints / (unitsSold / 1000000);
  }
}

module.exports = ComplaintsLogic;
