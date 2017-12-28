module.exports = {
	calculate: (complaints, unitsSold) => {
		return Number(complaints / unitsSold).toExponential();
	}
};
