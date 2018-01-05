import {groupBy, uniqBy} from 'lodash';
import {format, addMonths, differenceInMonths, getQuarter} from 'date-fns';

const cpmuCalc = (complaints, units) => complaints / units * 1000000;

const fmt = (dateTime) => format(dateTime, 'DD MMMM, YYYY');

const allDates = (arr) => {
  const s = arr[0].Month;
  const e = arr[arr.length - 1].Month;
  const months = differenceInMonths(e, s);
  return [...Array(months + 1).keys()].map((i) => addMonths(s, i));
  /* let all = [];
    for(let i = 0; i < months + 1; i++){
        all.push(addMonths(s, i));
    }
    */
};

const fillDates = (m, e) => {
  let existing = [];
  let missing = [];

  for (let date of m) {
    for (let obj of e) {
      if (fmt(date) === fmt(obj.Month)) {
        existing.push({
          Quarter: obj.Quarter,
          Month: fmt(date),
          Cpmu: cpmuCalc(obj.Complaints, obj.UnitsSold).toFixed(8)
        });
      }
    }
    missing.push({
      Quarter: getQuarter(new Date(date)),
      Month: fmt(date),
      Cpmu: 0.00000.toFixed(5)
    });
  }

  return uniqBy(existing.concat(missing).sort((a, b) => new Date(a.Month) - new Date(b.Month)), (o) => o.Month);
}

const groupQuarterly = (arr) => groupBy(arr, obj => obj.Quarter);

const cpmuQuarterly = (arr) => {
  let units = 0,
    comps = 0;
  arr.forEach((item) => {
    units += item.UnitsSold;
    comps += item.Complaints;
  });
  return (comps / units * 1000000);
};

export {
  cpmuCalc as calc,
  fmt,
  groupQuarterly,
  cpmuQuarterly,
  fillDates,
  allDates
};
