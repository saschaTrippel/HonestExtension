/**
 * Inserts content into extensionpage
 */
async function extensions(){
    var extensions=[]
    try {
        extensions = await getHistory("extensions")
    } catch (error) {
        if(error.message = "SourceError"){
            return
         }
    }
    /**
    * Helper function requiered for createTable
    */
    function content(element,i,table){
        if(i==0){
            return table.rows.length-1;
        }
        if(i==1){
            return element.id
        }
        if(i==2){
            return element.name
        }
    }
    createTable("extension_table", extensions, content,3 )
        
    

    
}
extensions()