
/**
 * Function generates the color of the permission buttons 
 * depending on the value of activeToggle.
 */
async function checkToggleColor(){
	console.debug("content of checkbox:" + checkbox.checked);
	const toggleSwitches = document.getElementsByClassName('slider');
	for (each of toggleSwitches){
		if (each.id != "main-slider"){
			if (!checkbox.checked){
				each.classList.add("inactive");
			} else {
				each.classList.remove("inactive");
			}
		}
	}
 }
 
 /**
  * Reads from memory the value of collect Data button
  */
 async function updateCheckbox() {
	 const storage = await browser.storage.local.get();
	 checkbox.checked = storage?.active ?? false;
 }
 
 function showConfirmDialog() {
	return confirm("Delete all collected data permanently!");
 }
 
 /**
  * function deletes all collected data from memory
  */
 async function deletePersonalData() {
	var userSelection = showConfirmDialog();
	if (userSelection === true){
		const storage = await browser.storage.local.get();
 
		// Delete all data personal data (everything except settings)
		for (let key of Object.keys(storage)) {
			if (!(key == "active" || key == "permissions")) {
				browser.storage.local.remove(key);
			}
		}
	}
 }
 
 //collect data checkbox
 let checkbox = document.getElementById('activeToggle');
 
 // Add event listener to handle checkbox changes
 checkbox.addEventListener('change', async () => {
	 // Update storage value when checkbox is changed
	 //console.log("Event Checked!")
	 await browser.storage.local.set({ active: checkbox.checked });
	 checkToggleColor();
 });
   
 window.onload = async function(){
	 await updateCheckbox();
	 await checkToggleColor();
 }
 
 
 const deleteButton = document.querySelector("#delete-button");
 deleteButton.addEventListener("click", deletePersonalData);
 
 // Get all elements with the data-content2 attribute
 const hoverTrigger = document.querySelectorAll('[data-content2]');
 
 // Function to add the show-content class after a delay
 function showContent(hoverTrigger) {
   hoverTrigger.classList.add('show-content');
 }
 
 // Function to handle mouseenter event
 function handleMouseEnter(event) {
   const hoverTrigger = event.target;
   hoverTrigger.timeout = setTimeout(() => {
	 showContent(hoverTrigger);
   }, 500);
 }
 
 // Function to handle mouseleave event
 function handleMouseLeave(event) {
   const hoverTrigger = event.target;
   clearTimeout(hoverTrigger.timeout);
   hoverTrigger.classList.remove('show-content');
 }
 
 // Add event listeners to each element
 hoverTrigger.forEach((hoverTrigger) => {
   hoverTrigger.addEventListener('mouseenter', handleMouseEnter);
   hoverTrigger.addEventListener('mouseleave', handleMouseLeave);
 });
 