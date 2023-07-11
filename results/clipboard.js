/**
 * Inserts content into clipboard page
 */
async function clip(){
    let number =0
    try {
        number = await getHistory("clipboard")
    } catch (error) {
        if(error.message = "SourceError"){
            return
         }
    }
    document.getElementById("total").innerHTML = "We have been able to read <b> "+  number + " </b> different elements from your clipboard." ;
}
clip()