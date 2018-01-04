import {cpmuCalc, formatDate} from './index';

it('Should format dateString', () => {
  const date = formatDate("2012-01-01T00:00:00");
  expect(date).toEqual(expect.stringContaining('01 January, 2012'));
});

it('should return correct cmpu', () => {
  const cmpu = cmpu();
});
