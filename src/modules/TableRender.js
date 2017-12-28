import React from 'react';
import Moment from 'react-moment';
import 'moment';

const CPMUCalc = require('./CPMUCalc');

// Sort the data so it is in order by month
const sortDataByTime = (data) => {
  data.sort((a, b) => new Date(a.Month).getTime() - new Date(b.Month).getTime());
};

// Formats the data into the json for the table to consume
// It formats it differently depending on what group by clause is chosen
const monthViewRender = (data) => {
  const tableData = [];

  data = sortDataByTime(data);

  // Keep track of the previous rows date
  //  This is so we can calculate if there are any missing months
  let previousDate;

  data.map((row) => {
    // If the previous date has been set then calculate the month difference
    // and insert rows that are missing
    if (previousDate !== undefined) {
      const monthDifference = moment(previousDate).diff(row.Month, 'months');

      if (monthDifference >= 1) {
        for (let i = 1; i <= monthDifference; i += 1) {
          tableData.push({
            Month: <Moment format="D MMMM YYYY" add={{ months: i }}>{previousDate}</Moment>,
            CPMU: 0,
          });
        }
      }
    }
    previousDate = row.Month;

    return tableData.push({
      Month: <Moment format="D MMMM YYYY">{row.Month}</Moment>,
      CPMU: CPMUCalc.calculate(row.Complaints, row.UnitsSold),
    });
  });

  return tableData;
};

const quarterViewRender = (data) => {
  data = sortDataByTime(data);

  const tableData = [];

  // Sort the date into an object sorted by quarter
  // It will look something like this
  /**
     * {
     * 	1: {[], [], []}
     *  2: {[], [], []}
     * }
     */
  const sortedData = data.reduce((r, a) => {
    r[a.Quarter] = r[a.Quarter] || [];
    r[a.Quarter].push(a);
    return r;
  }, Object.create(null));

    // For each quarter
  Object.keys(sortedData).forEach((quarter) => {
    let complaints = 0;
    let unitsSold = 0;

    /**
     * Iterate through all the rows for that quarter and
     * calculate the complaints total and the units sold total
    */
    sortedData[quarter].forEach((row) => {
      complaints += row.Complaints;
      unitsSold += row.UnitsSold;
    });

    tableData.push({ Quarter: quarter, CPMU: CPMUCalc.calculate(complaints, unitsSold) });
  });

  return tableData;
};

module.exports = {
  render: (data, groupBy) => {
    let tableData;

    if (groupBy === 'month') {
      tableData = monthViewRender(data);
    } else if (groupBy === 'quarter') {
      tableData = quarterViewRender(data);
    }

    return tableData;
  },
  createCell(row) {
    const rowData = [];
    Object.values(row).forEach((elem) => {
      rowData.push(<td key={elem}>{elem}</td>);
    });

    return rowData;
  },
};
