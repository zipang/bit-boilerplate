
function isPath(str) {
	return str && str.indexOf('.') !== -1;
}

/**
 * Define a new branch+value inside a source object
 * Example :
 *   defineValueAt({}, "root.branch.leaf", "green") => { root: { branch: { leaf: "green" } } }
 * @param {Object} source object to make grow
 * @param {String} path to a new leaf
 * @param {Any} val
 */
function defineValueAt(source, path, val) {
	const keys = path.split('.');
	const last = keys.length - 1; // index of the last path element
	let leaf = source;
	keys.forEach( (key, idx) => {
		if (idx < last) {
			if (typeof(leaf[key]) === undefined) leaf[key] = {};
		} else {
			leaf[key] = val; // sorry we overwrite if there was something
		}
		leaf = leaf[key];
	});
	return source; // a leaf has grown on this source tree
}


/**
 * Parse an object to find wrapped path properties ('a.b.c')
 * and expand any of them into real objects
 * @param {Any} source
 * @return {Object} expanded
 */
function resolveObjects(source) {
	if (typeof source !== "object") {
		return source;
	}
	const expanded = {};
	for (let key in source) {
		if (isPath(key)) {
			defineValueAt(expanded, key, resolveObjects(source[key]));
		} else {
			expanded[key] = resolveObjects(source[key]);
		}
	}
	return expanded;
}

module.exports = {
	resolveObjects : resolveObjects
};
