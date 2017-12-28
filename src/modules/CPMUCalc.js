module.exports = {
  calculate: (complaints, unitsSold) => Number(complaints / unitsSold).toExponential(),
};
