import { groupBy } from 'lodash';
import { format,  addMonths, differenceInMonths } from 'date-fns';

const cpmuCalc = (complaints, units) => complaints / units * 1000000;

const formatDate = (dateTime) => format(dateTime, 'DD MMMM, YYYY');

const fillDates = (arr) => {
    const s = arr[0].Month;
    const e = arr[arr.length -1].Month;
    const months = differenceInMonths(e, s);
    return[...Array(months+1).keys()].map((i) => addMonths(s, i));
    /* let pd = [];
    for(let i = 0; i < months + 1; i++){
        pd.push(addMonths(s, i));
    }
    */
 };

const groupQuarterly = (arr) =>  groupBy(arr, obj =>  obj.Quarter);

const cpmuQuarterly = (arr) => {
    let units = 0, comps = 0;
    arr.forEach((item) => {
        units +=  item.UnitsSold;
        comps += item.Complaints;
    });
    return(comps / units * 1000000);
};

export { cpmuCalc as calc, formatDate as fmt, groupQuarterly, cpmuQuarterly, fillDates };
