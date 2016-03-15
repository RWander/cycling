var Athlete = require('../../models').Athlete;

function getAthlete(req, res, next) {
  Athlete.loadCurrent()
    .then(athlete => { res.send(athlete); })
    .catch(next);
}

module.exports = getAthlete;
