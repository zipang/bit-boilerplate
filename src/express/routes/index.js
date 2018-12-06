/**
 * Apply all routes defined in their own subfolders
 */
module.exports = (router) => {
	require("./todos/")(router);
}


