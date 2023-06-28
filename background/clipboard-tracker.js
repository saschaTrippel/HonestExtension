// Use 'clipboardRead' permission to track clipboard content

let lastRead = '';
/**
 * Read the content of the system clipboard.
 * If clipboard has changed, increment clipboard counter.
 */
async function readClipboard() {
    const text = await navigator.clipboard.readText();
    if (text != "" && text != lastRead) {
        console.info(text);
        const storage = await browser.storage.local.get();
        let clipboard = 0;
        if (Object.keys(storage).includes("clipboard")) {
            clipboard = storage.clipboard
        }
        clipboard++;
        browser.storage.local.set({clipboard});
        lastRead = text;
    }
}

let intervalClipboardId;
let activeClipboard = false;
/**
 * Activate clipboard tracker if 'clibpardRead' permission is given.
 */
async function activateClipboard() {
    if (await hasPermissions(["clipboardRead"])) {
        // Read clipboard every 5 seconds (5000 milliseconds)
        intervalClipboardId = setInterval(readClipboard, 5000)
        activeClipboard = true;
        console.log("Activated clipboard tracker");
    }
}

/**
 * Deactivate clipboard tracker if it is active.
 */
function deactivateClipboard() {
    if (activeClipboard) {
        clearInterval(intervalClipboardId);
        activeClipboard = false;
        console.log("Deactivated clipboard tracker");
    }
}
