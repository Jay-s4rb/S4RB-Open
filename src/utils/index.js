import { format } from 'date-fns';

const cpmuCalc = (complaints, units) => complaints / units * 1000000;

const formatDate = (dateTime) => format(dateTime, 'DD MMMM, YYYY');

export { cpmuCalc, formatDate };
