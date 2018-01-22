const 
  express = require('express')
  ,router = express.Router()
  ,axios = require('axios')
  ,dateHelper = require('../helpers/dateManipulation');

  router.get('/', async function(req, res) {

    const 
      jsonServer = 'http://localhost:3000/CPMU/'
      ,yearsToCheck = []
      ,monthsToCheck = [];

    let 
      totalChecked = 0
      ,jsonServerData
      ,sortedData
      ,returnData
      ,minDate
      ,maxDate
      ,minYear
      ,maxYear
      ,minYearMinMonth
      ,maxYearMaxMonth;
      
    try {
      jsonServerData = await axios.get(jsonServer);
    } catch (err) {
      res.status(500).json({ error: err });
    };

    sortedData = jsonServerData.data.sort((a,b) => new Date(a.Month) - new Date(b.Month))

    minDate = new Date(sortedData[0].Month);
    maxDate = new Date(sortedData[sortedData.length - 1].Month);
    minYear = minDate.getFullYear();
    maxYear = maxDate.getFullYear();
    minYearMinMonth = minDate.getMonth() + 1;
    maxYearMaxMonth = maxDate.getMonth() + 1;

    // range of years
    for(let i=0; i <=maxYear - minYear; i+=1){
      yearsToCheck.push(minYear + i);
    };

    // range on months
    for(let i=1; i<=12; i+=1){
      monthsToCheck.push(i);
    };

    // we can work out the total range of months that we need to have in the end, this way we can linearly O(n) check for missing data, this could be done by having an array of dates that we're expecting and then doing a find() on the original list but that would be O(n^2)// also, this way we're reducing stress on the frontEnd and potentially avoiding some nasty conditional logic there

    function dataCheckFix(i, comparator, year){
      let paddedMonth = dateHelper.padMonth(i);
      let incrementCaller = false;
      if(sortedData[comparator].Month.slice(0,7) !== `${year}-${paddedMonth}`){
        let quarter = dateHelper.getQuarters(i) + '';
        let formattedMonth = dateHelper.getFullString(year, paddedMonth);
        sortedData.splice(comparator, 0, dateHelper.getDateObject(quarter, formattedMonth));
        incrementCaller = true; // skip the one we've just inserted
        totalChecked += 1;
      };
      totalChecked += 1;

      return incrementCaller;
    };

    // fix the data for the first year
    for(let i=minYearMinMonth; i<=12; i+=1){
      let comparator = i-1;
      i += dataCheckFix(i, comparator, minYear);
    }; //4,8 were missing from 2012
    
    // fix the data for the middle years
    let len = yearsToCheck.length;
    yearsToCheck.slice(1, len-1).forEach((year)=>{
      monthsToCheck.forEach((month)=>{
        let paddedMonth = dateHelper.padMonth(month);
        if(sortedData[totalChecked].Month.slice(0,7) !== `${year}-${paddedMonth}`){
          let quarter = dateHelper.getQuarters(month) + '';
          let formattedMonth = dateHelper.getFullString(year, paddedMonth);
          sortedData.splice(totalChecked, 0, dateHelper.getDateObject(quarter, formattedMonth));
        };
        totalChecked += 1;
      });
    }); //missing: 2013: 5,9,10,11; 2014: 7; 2015: 5,6; 2016: 6
    
    // fix the data for the last years
    for(var i=1; i<=maxYearMaxMonth; i+=1){
      let comparator = totalChecked;
      let year = maxYear;
      i += dataCheckFix(i, comparator, maxYear);
    }; //1 was missing from 2017
    
    if(req.query.consolidation === 'monthly'){
      returnData = sortedData.map(el => ({
        "Month": dateHelper.getMonthName(el.Month),
        "CPMU": (el.Complaints / ((el.UnitsSold || 1) / 1000000)).toString()
      }));
    } else if(req.query.consolidation === 'quarterly'){

      let complaints = 0 ,unitsSold = 0, lastYear, lastQuarter;
      returnData = sortedData.reduce((result, next) => {
        let 
          dateObj = new Date(next.Month)
          ,currentYear = dateObj.getFullYear()
          ,currentQuarter = dateHelper.getQuarters(dateObj.getMonth() + 1);

        if(lastYear && lastQuarter){
          if(currentYear !== lastYear || currentQuarter !== lastQuarter){
            let quarterWithYear = `Q${lastQuarter} ${lastYear}`;
            result.push({
              "Quarter": quarterWithYear,
              "CPMU": (complaints / ( unitsSold / 1000000)).toString()
            });
            complaints = 0;
            unitsSold = 0;
          };
        };

        lastYear = currentYear
        lastQuarter = currentQuarter
        complaints += next.Complaints;
        unitsSold += next.UnitsSold;

        return result;
      }, []);
      
      // we need to force the last one to go
      returnData.push({
        "Quarter": `Q${dateHelper.getQuarters(maxDate.getMonth() + 1)} ${maxYear}`,
        "CPMU": (complaints / ( unitsSold / 1000000)).toString()
      });

    } else {
      returnData = 'invalid consolidation type';
    };

    Array.isArray(returnData)
      ? res.json(returnData)
      : res.status(400).json({ err: returnData });
  });

module.exports = router;