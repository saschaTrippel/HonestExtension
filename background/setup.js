
/**
 * Check whether data collection is active.
 *
 * @returns {boolean} Value of 'active' field in local storage
 */
async function isActive() {
	const activeObj = await browser.storage.local.get("active");
	console.debug("isActive: " + activeObj.active);
	return activeObj.active;
}

/**
 * Check whether a list of permission is given.
 *
 * @param permissions Permissions to check
 * @returns {boolean} True if all permissions given in argument are present in storage
 */
async function hasPermissions(permissions) {
	const permissionsObj = await browser.storage.local.get("permissions");
	const currentPermissions = permissionsObj.permissions;
	for (const permission of permissions) {
		if (! currentPermissions.includes(permission)) {
			return false;
		}
	}
	return true;
}

/**
 * Initialize 'active' and 'permissions' storage fields.
 */
async function initStorage() {
	// Create expected storage areas
	
	const storage = await browser.storage.local.get();
	const keys = Object.keys(storage);

	if (! keys.includes("active")) {
		// Initialize active = false
		let active = false;
		browser.storage.local.set({active});
	}
	if (! keys.includes("permissions")) {
		// Initialize empty permissions
		let permissions = [];
		browser.storage.local.set({permissions});
	}

}

initStorage();
