/**
 * creats a barchart
 * @param {string} tag the html tag at which the diagramm is appended
 * @param {string} title the title of the new diagramm
 * @param {array} xaxis array with the values for the x axis
 * @param {array} yaxis array with the values for the y axis
 */
async function createDiagramm(tag, title, xaxis, yaxis ){ 
    xaxis = xaxis.slice(0,5)
    yaxis = yaxis.slice(0,5)
    var data = [
        {
          x: xaxis ,
          y: yaxis,
          type: 'bar',
          marker: {

            color: 'rgb(136,220,238)',
        
            opacity: 0.8,
        
            line: {
        
              color: 'rgb(136,220,238)',
              width: 1.5
            }
          }
        }   
      
      ];
      var layout = {

        title: title,
  margin: {
    l: 50,
    r: 100,
    b: 110,
    t: 50,
    pad: 0
  }
      
      };
      Plotly.newPlot(tag, data,layout)
}
/**
 * gets a data from the storage
 * if no data is found an error is raised
 * @param {string} source - the storage field from which the data is harvested
 */
async function getHistory(source){
	const storage = await browser.storage.local.get();
    var data
	if (Object.keys(storage).includes(source)) {
        if( source == "history"){
		    data =storage.history;
        }
        if (source == "tabsHistory"){
           data=storage.tabsHistory;
           
        }
        if(source == "webRequestHistory"){
            data=storage.webRequestHistory
        }
        if(source == "webNavigationHistory"){
            data=storage.webNavigationHistory
        }
        if(source =="credentials"){
            data=storage.credentials
        }
        if(source=="languages"){
            data=storage.languages
        }
        if(source=="cookies"){
            data=storage.cookies
        }
        if(source=="downloads"){
            data=storage.downloads
        }
        if(source=="bookmarks"){
            data=storage.bookmarks
        }
        if(source=="extensions"){
            data=storage.extensions
        }
        if(source=="clipboard"){
            data = storage.clipboard
        }
        if(source=="geolocations"){
            data = storage.geolocations;
        }
        //console.log(data)
        return data
	}
    else if(source!="credentials"){
        loadDefault()
        throw new Error("SourceError")
    }
    else if(source=="credentials"){
        console.log("Found No Crendentials")
        throw new Error("SourceError")
    }
}
/**
 * retuns the Domian of a given Url
 * 
 * @param {string} Url the url
 */
function getDomian(Url){ 
    Url = Url.slice(Url.indexOf("/")+1)
    Url = Url.slice(Url.indexOf("/")+1)
    var last =  Url.indexOf("/")
    if(last != -1){
        Url =Url.slice(0,Url.indexOf("/"))
    }
    return Url

}
/**
 * gets and prepares the source data for the barchart of history like pages
 *
 * @param {string} source - identifies the storage field from which the data orignates
 */

async function getSourceData(source){ 
    let history = await getHistory(source)
    let quantity = [] 
    var host = [] // host contains all hostnames without duplicates
    history.forEach(createHost)
    function createHost(element,index,array){ //create a List of all hostnames in histroy without duplicates
    var domain = getDomian(element.url)    
        if(  host.includes(domain) == false )  {  
           host.push(domain )
        }
    }
    host.forEach(createQuantity)
    document.getElementById("total").innerHTML = "We have been able to track: <b> "+  history.length + "</b> websites you visted." ;
    document.getElementById("unique").innerHTML = "Among which where: <b>"+  host.length + "</b> unique websites." ;
    function createQuantity(element,index,array){ // check how often all elements of host are history
    
            quantity.push({ 
                hostname : element, 
                quantity : history.reduce(myreduce,0) 
            })        
        function myreduce( accumulator, currentValue, currentIndex,array   ){ //helper function for reduce
            var domain =  getDomian( currentValue.url)
            if(  domain == element   ){
                return accumulator + 1
            }
            else {
                return accumulator
            }
        }
    }  
    return quantity 
}
/**
 * loads the Default page which is loaded if no data is found
 *
 */
async function loadDefault (){
    window.location.replace("default.html")
}
/**
 * prepares and loads Data for the Googletable
 *
 * @param {string} source 
 */
async function getDataForGoogle(source){
    let history = await getHistory(source);
    function Is_Google(element,index,array){//returns ture if element.url matches a valid url of google.com
        try  {
        if (element.url.startsWith("https://www.google.com/search?")){
            element.url = element.url.slice(  element.url.indexOf("q=") )
            element.url = element.url.slice(2, element.url.indexOf("&") )
            element.url = decodeURIComponent(element.url)
            element.date = new Date(  element.date).toUTCString()
            return true
        }
        else{
            return false
        }
         
    }
    catch(error)
    {
        return false
    }
    }
    history = history.filter(Is_Google)
    if(history.length !=0  ){
        document.getElementById("Google").hidden = false
    }
    return history
}
async function createList(source){//create table with google calls.
    let sourceData  =[]
    try {
        sourceData = await getDataForGoogle(source)
    } catch (error) {
        if(error.message = "SourceError"){
            return
        }
        else{
            console.log(error)
        }
    }
    createTable("Google_Table",sourceData,content,3)
    function content(element,i,Table){
        if(i == 0){
            return Table.rows.length-1
        }
        if(i ==1){
            return element.url
        }
        if(i==2){
            return element.date
        }

    }
}
/**
 * removes all duplicates from an array
 *
 * @param {array} array - the array from which duplicates are removed
 * @param {Function} equal - a function which returns true if two elements are considert duplicate has to be of correct form to be using in array.findLastIndex()
 */
function removeDuplicates(array, equal){
    try {
    var result = []
    array.forEach(helper)
    function helper(element,index,array){
        if( index == array.findLastIndex(equal,element) ){
            result.push(element)
        }
    }
    return result
    }
    catch (error) {
        console.log(error)
        return array    
    }
    
}
/**
 * 
 * extends an HTML table with  content 
 *
 * @param {string} name - the name of the html table which will be extended
 * @param {array} array - the array from which the content for the table originate
 * @param {function} content - a function which extracts the correct entries from the the array
 * @param {number} columns - the number of columns table has
 */
function createTable(name, array, content,columns ){ //creates an HTML Table 
    array.forEach(appendEntry)
    function appendEntry(element, index,array){
        var Table = document.getElementById(name);
        var row = Table.insertRow(Table.rows.length);
        for (let i =0; i < columns; i++ ){
            row.insertCell(i).innerHTML = content(element,i,Table);
        }
    }

}