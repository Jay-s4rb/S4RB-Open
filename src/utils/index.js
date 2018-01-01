import moment from 'moment';

const cpmuCalc = (complaints, units) => complaints / units * 1000000;

const formatDate = (dateTime) => moment(dateTime).format('DD MMMM, YYYY');

export {cpmuCalc, formatDate};
