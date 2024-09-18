const router = require('express').Router();
const { index, getApps, searchApps, searchSuggestions, getAppDetails, getSimilarApps, getAppReviews, getAppPrivacy, getDeveloperApps, getAppRatings, getConstants } = require('../interactors/app.interactor');



router.get('/', index);
router.get('/constants', getConstants)
router.get('/apps/', searchApps);
router.get('/apps/', searchSuggestions);
router.get('/apps', getApps);
router.get('/apps/:appId', getAppDetails);
router.get('/apps/:appId/similar', getSimilarApps);
router.get('/apps/:appId/reviews', getAppReviews);
router.get('/apps/:appId/privacy', getAppPrivacy);
router.get('/apps/:appId/ratings', getAppRatings);
router.get('/developers/:devId', getDeveloperApps);


module.exports = router;