const { expect } = require('chai');
const sinon = require('sinon'); // .sandbox.create();
const ComplaintsLogic = require('../complaintsLogic');

describe('GetComplaints', () => {
  let logicInstance = {};

  beforeEach(() => {
    logicInstance = new ComplaintsLogic({
      GetComplaints: sinon.stub().returns([
        {
          Quarter: 1,
          Month: '2012-01-01T00:00:00',
          Complaints: 10,
          UnitsSold: 1000000,
        },
        {
          Quarter: 1,
          Month: '2012-02-01T00:00:00',
          Complaints: 5,
          UnitsSold: 86720,
        },
        {
          Quarter: 1,
          Month: '2012-05-01T00:00:00',
          Complaints: 10,
          UnitsSold: 824680,
        },
      ]),
    });
  });

  afterEach(() => {
    // sinon.restore();
  });

  it('should have results starting with the first date in the range', async () => {
    const result = await logicInstance.GetComplaints();
    expect(result[0].Month).to.equal('2012-01-01T00:00:00');
  });

  it('should have results ending with the last date in the range', async () => {
    const result = await logicInstance.GetComplaints();
    expect(result[result.length - 1].Month).to.equal('2012-05-01T00:00:00');
  });

  it('should return 1 record for each month in the range even if no data present', async () => {
    const result = await logicInstance.GetComplaints();
    expect(result.length).to.equal(5);
  });
});

describe('CalculateComplaintsPerMillionUnits', () => {
  it('should return 0 when there are no complaints', () => {
    const result = ComplaintsLogic.CalculateComplaintsPerMillionUnits(0, 1000000);
    expect(result).to.equal(0);
  });

  it('should return 1 when there is 1 complaint and 1 million units', () => {
    const result = ComplaintsLogic.CalculateComplaintsPerMillionUnits(1, 1000000);
    expect(result).to.equal(1);
  });
});
