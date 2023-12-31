/**
 * Creates a piichart with two parts
 *
 * @param {Number}  Succesfull first part
 * @param {Number} Failure second part
 */
function setPIIchart(Succesfull, Failure){
    var data = [{

        values: [Succesfull, Failure],
    
        labels: ['Succesfull', 'Not Succesfull',],
    
        type: 'pie'
    
    }];
    
    
    var layout = {
    
        height: 400,
    
        width: 500
    
    };
  
    Plotly.newPlot('barChart', data, layout);
}

/**
 * Creates content of HTML page for credentials
 */
async function bar(){
    var credentials =[]
    try {
    credentials = await getCredentials()
    document.getElementById("Credentials").hidden = false
    } catch (error) {
        if(error.message = "SourceError"){
            return
        }
        else{
            console.log(error)
        }
    }
    var Succesfull = 0;
    var Failure =0;
    Succesfull = credentials.reduce(countPassword,0)
    Failure = credentials.length - Succesfull
    setPIIchart(Succesfull,Failure)
    /**
    * helper function used for reduce
    */
    function countPassword(accumulator,currentValue,currentIndex,array){//counts how many passwords we could get
        if(currentValue.password){
            return accumulator + 1
        }
        else{
            return accumulator
        }
    } 
    document.getElementById("all_cred").innerHTML = "Out of "+ credentials.length  + " Loginforms you used." ;
    document.getElementById("suc_cred").innerHTML = "We could succesfully extract "+  Succesfull + " passwords." ;
}
/**
 * Gets conntent of credentials storage and remove duplicates from it
 */
async function getCredentials(){
    var credentials = await getHistory("credentials")
    credentials = removeDuplicates(credentials,eq)        
    return credentials

}
/**
 * returns true if two elements of storrage are identicall for our purpose
 * @param {any}  element the element which is compared against this 
 */
function eq(element, index, array){
    if(this.hostname == element.hostname && this.username == element.username && element.password == this.password ){
        return true
    }
    else{
        return false
    }
}
/**
 * creates the Table holding the credentials
 */
async function credentialsTable(){
    var credentials
    try {
        credentials = await getCredentials()
        document.getElementById("Credentials").hidden = false
    } catch (error) {
        if(error.message = "SourceError"){
            return
        }
        else{
            console.log(error)
        }
    }
    var both = [] //all credentials where password and username was possible
    var password = []  //all credentials where only password was possible
    credentials.forEach(helper)
    function helper(element,index,array)
    {
        if(element.username != false && element.password == true){
            both.push(element)
        }
    }
    credentials.forEach(onlyPassword)
    function onlyPassword(element,index,array){
        if(element.username == false && element.password == true && both.findLastIndex( function(element,index,array){return this.hostname ==element.hostname } ,element) == -1 ){
            password.push(element)
        }
    }
    /**
    * Helper function requiered for createTable
    */
    function content(element,i,Table){
        if(i==0){
            return Table.rows.length-1
        }
        if(i==1){
            return element.hostname
        }
        if(i==2){
            return element.username
        }
    }
    createTable("credentials_Table",both,content,3)
    createTable("password_Table",password,content,2)

}
bar()
credentialsTable()