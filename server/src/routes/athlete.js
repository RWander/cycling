var router = require('express').Router();

// GETs a information about athelete.
router.get('/', require('./athlete/getAthlete'));

 // GETs full information about athelete (including tarining log and statistic).
router.get('/full', require('./athlete/getFullInfo'));

// GETs athelete's activities.
router.get('/activities', require('./athlete/getActivities'));

// GETs a training statistic for the currect athlete.
router.get('/statistic', require('./athlete/getStatistic'));

module.exports = router;
