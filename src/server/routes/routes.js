const path = require('path');
const express = require('express');

module.exports = app => {
  app.get('/api/test', (req, res) => {
    res.sendStatus(200);
  });

  app.get('/api/cpmu', async (req, res) => {
    const results = await global.container.ComplaintsLogic.GetComplaints();
    console.log(results);
    res.status(200).send(results);
  });

  app.get('/api/grouped', async (req, res) => {
    const results = await global.container.ComplaintsLogic.GetGroupedComplaints();
    res.status(200).send(results);
  });

  app.use(express.static(path.resolve('./dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('./dist/index.html'));
  });
};
