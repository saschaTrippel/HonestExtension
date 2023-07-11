/**
 * Inserts content into cookies page
 */
async function cookies (){
    let cookies
    try {
      cookies = await getHistory("cookies")
    } catch (error) {
       if(error.message = "SourceError"){
          return
       }
    }
    cookies = Object.entries(cookies)
    document.getElementById("total").innerHTML = "We have been able to obtain your cookies for <b> "+  cookies.length + "</b> domains while you where browsing." ;
    document.getElementById("unique").innerHTML = "In total we obtained <b> "+  cookies.reduce(reducer,0)  + "</b> different cookies." ;
    /**
    * Helper function used for reduce
    */
    function reducer(accumulator,currentValue,currentIndex,array){
        return accumulator + currentValue[1].length
    }
    /**
    * Helper function used for sort
    */
    cookies.sort(compareFn)
    function compareFn(a,b){//helper function for sort
       return b[1].length - a[1].length 
    }
    let xaxis = []
    let yaxis = []
    /**
    * Helper function used in forEach
    */
    function helper(element,index,array){
      xaxis.push(element[0])
      yaxis.push(element[1].length)
    }
    cookies.forEach(helper)
    /**
    * returns a randomInteger between lower and upperbound
    *
    * @param {number} min - the lowerbound
    * @param {number} max - the upperbound
    */
    function randomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let rand = [] //40 random domains
    for(let i =0; i <40; i++){
      rand.push( cookies[ randomInteger(0, cookies.length-1) ]   )
    }
    createDiagramm("myDiv", "",xaxis,yaxis)
    /**
    * Helper function requiered for createTable
    */
    function content(element,i,Table){
      if(i==0){
        return Table.rows.length-1;
      }
      if(i==1){
        return element[0]
      }
      if(i==2){
        return element[1][randomInteger(0,element[1].length -1)]
      }

    }
    createTable("cookie_table",rand,content,3)


}


cookies()