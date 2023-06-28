async function changeGeolocations() {
    var geolocationsList = []
    try {
        geolocationsList =  await getHistory("geolocations")
    } catch (error) {
        if(error.message=="upsi"){
            return
        }
        else{
            console.log(error)
        }    
    }
	
	var locations = []
    function equal(element,index,array){//returns true if two Geoloactionelements are equal
        if(element.latitude == this.latitude && this.longitude == this.longitude ){
            return true
        }
        else{
            return false
        }
    }
    locations = removeDuplicates(geolocationsList, equal)
    
    createTable("Location_Table",locations,content,4)
    function content(element,i,Table){
        if(i==0){
            return Table.rows.length-1;
        }
        if(i==1){
            return "<a href='https://www.openstreetmap.org/#map=18/" + element.latitude + "/" + element.longitude + "'>Latitude: " + element.latitude + " Longitude: " + element.longitude + "</a>"
        }
        if(i==2){
            x =String( element.accuracy)
            return x.slice(0, x.indexOf(".") )
        }
        if(i==3){
            return new Date(  element.timestamp).toUTCString()
        }
    }



}
changeGeolocations()
//const gettingStorage = browser.storage.local.get()

//gettingStorage.then(changeGeolocations);
