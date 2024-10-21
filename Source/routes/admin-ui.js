const express = require('express');
const router = express.Router();

const my_db_layer = require('../usr_modules/database')


// Admin Page
router.get('/admin', async (req, res) => {
	let {token, opt, body} = req.body

    let user = my_auth_layer.authenticateJWTFromCookieFunction(token)
    if(typeof user === 'undefined')
	    return res.status(403).send('REPLACE HTML: Invalid user provided');

    res.send('Response from api admin');
	const uuid = await my_db_layer.getUID(user);

	// UID check vuln, o.w. validate admin user
	if (!my_vulns_layer.VAR_ADMIN_CHECK && (uuid != undefined && uuid <= 1000)) {
	    return res.status(403).send('REPLACE HTML: Non-Admin User');
	}
  res.send('Response from admin Page');
});

module.exports = router; 