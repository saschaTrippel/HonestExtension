
/**
 * store all permissions automatically if one checkbox is checked
 */
function storeSettings() {

	function getPermissions() {
		let permissions = [];
		// Get all checkboxes
		const checkboxes = document.querySelectorAll('input[type="checkbox"]');
		for (let item of checkboxes) {
			// For each checkbox, get the data-type if it is checked
			if (item.checked) {
				permissions.push(item.getAttribute("data-type"));
			}
		}
		return permissions;
	}

	const permissions = getPermissions();
	// Store the data-types of all checked permissions
	browser.storage.local.set({
		permissions
	});
}

/**
 * load all selected permissions from memory.
 * @param {*} restoredSettings The restored settings object containing the permissions.
 */
function updateUI(restoredSettings) {
	const checkboxes = document.querySelectorAll("input[type=checkbox]");
	for (let item of checkboxes) {
		if (restoredSettings.permissions.indexOf(item.getAttribute("data-type")) != -1) {
			item.checked = true;
		} else {
			item.checked = false;
		}
	}
}

function onError(e) {
	console.error(e);
}




/*
On opening the options page, fetch stored settings and update the UI with them.
*/
const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(updateUI, onError);

const checkboxElements  = document.querySelectorAll('input[type="checkbox"]');

//event Listener for selected permissions
checkboxElements.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
		storeSettings();
    });
});



