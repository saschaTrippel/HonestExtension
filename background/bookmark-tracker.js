// Use the 'bookmarks' permission to track bookmarks

/**
 * Wait for changes in bookmarks.
 * Save new bookmarks
 *
 * @param changes change information created by bookmarks.onCreaded event
 */
async function saveNewBookmark(changes) {
	const bookmarkArray = await browser.bookmarks.get(changes);
	const bookmark = bookmarkArray[0];
	const storage = await browser.storage.local.get();
	let bookmarks = storage.bookmarks;

	bookmarks.push({
		id: bookmark.id,
		title: bookmark.title,
		url: bookmark.url,
		dateAdded: bookmark.dateAdded
	});

	browser.storage.local.set({bookmarks});
	console.info("Recorded new bookmark: " + bookmark.title);
}

/**
 * Save all bookmarks that are not yet known.
 */
async function saveAllBookmarks() {
	// Cannot get all bookmarks, get last 500 created
	const currentBookmarks = await browser.bookmarks.getRecent(500)
	const storage = await browser.storage.local.get();

	// Get already saved bookmarks from storage to avoide duplicates
	let bookmarks = [];
	if (Object.keys(storage).includes("bookmarks")) {
		bookmarks = storage.bookmarks;
	}
	let ids = []
	for (let bookmark of bookmarks) {
		ids.push(bookmark.id);
	}

	let i = 0;
	for (let bookmark of currentBookmarks) {
		if (!ids.includes(bookmark.id)) {
			bookmarks.push({
				id: bookmark.id,
				title: bookmark.title,
				url: bookmark.url,
				dateAdded: bookmark.dateAdded
			});
			i += 1;
		}
	}
	browser.storage.local.set({bookmarks});
	console.info("Recorded new bookmarks: " + i);
}

let activeBookmarks = false;
/**
 * Activate bookmark tracking if 'bookmarks' permission is given.
 */
async function activateBookmarks() {
	if (await hasPermissions(["bookmarks"])) {
		saveAllBookmarks();
		browser.bookmarks.onCreated.addListener(saveNewBookmark);
		activeBookmarks = true;
		console.log("Activated bookmarks tracker")
	}
}

/**
 * Deactivate bookmark tracking if it is active.
 */
function deactivateBookmarks() {
	if (activeBookmarks) {
		browser.bookmarks.onCreated.removeListener(saveNewBookmark);
		activeBookmarks = false;
		console.log("Deactivated bookmarks tracker");
	}
}

