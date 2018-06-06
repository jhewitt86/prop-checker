'use strict';
module.exports = function(app) {
  var check = require('../controllers/checkController');
  app.route('/check')
    .get(check.deny_request)
    .post(check.check);
}
