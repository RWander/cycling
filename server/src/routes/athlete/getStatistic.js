var Training = require('../../models').Training;

function getStatistic(req, res, next) {
  // TODO (rwander): validate req.query param.
  const path = req.query.path;

  Training.loadStatisticCurrent(path)
    .then(stat => { res.send(stat); })
    .catch(next);
}

module.exports = getStatistic;
