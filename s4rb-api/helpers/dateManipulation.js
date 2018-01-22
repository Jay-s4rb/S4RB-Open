const 
  locale = 'en-gb'
  ,getQuarters = (month) => Math.floor((month + 2) / 3)
  ,getFullString = (year, month) => `${year}-${month}-01T00:00:00`
  ,getDateObject = (quarter, month, complaints = 0, unitsSold = 0) => ({
    "Quarter": quarter,
    "Month": month,
    "Complaints": complaints,
    "UnitsSold": unitsSold
  })
  ,padMonth = (num) => (num + '').length === 1 ? `0${num}` : num
  ,getMonthName = (month) => {
    let dateObj = new Date(month);
    return `${padMonth(dateObj.getDate())} ${new Date(month).toLocaleString(locale, { month: "long" })} ${dateObj.getFullYear()}`
  };

module.exports = {
  getQuarters: getQuarters,
  getFullString: getFullString,
  getDateObject: getDateObject,
  padMonth: padMonth,
  getMonthName: getMonthName
};

// yes, I'm aware that moment.js exists, just wanted to play around with dates a little bit :D