import { calc, fmt, groupQuarterly, cpmuQuarterly, fillDates } from './index';
import { uniqBy } from 'lodash';

test('should format dateString', () => {
  const date = fmt("2012-01-01T00:00:00");
  expect(date).toEqual(expect.stringContaining('01 January, 2012'));
});

test('should return correct cmpu', () => {
  const cpmu = calc(30, 1000000);
  expect(cpmu).toBe(30);
});

test('should return object with keys 1..4', () => {
  const mockObjs = [{Quarter: 1}, {Quarter: 2}, {Quarter: 3}, {Quarter: 4}];
  const grouped = groupQuarterly(mockObjs);
  const keys = Object.keys(grouped);
  expect(keys).toEqual(expect.arrayContaining(['1','2','3','4']));
});


