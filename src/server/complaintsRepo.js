const request = require('request-promise');

class ComplaintsRepo {
  constructor(logger) {
    this.logger = logger;
  }

  async GetComplaints() {
    try {
      console.log(process.env.CPMU_REPO_URL);
      return await request({
        uri: 'cpmu',
        baseUrl: process.env.CPMU_REPO_URL,
        json: true,
      });
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }
}
module.exports = ComplaintsRepo;
