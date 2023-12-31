/**
 * Inserts content into downloadpage
 */
async function download(){
    var downloads =[]
    try {
        downloads = await getHistory("downloads")
    } catch (error) {
        if(error.message == "SourceError"){
            return
        }
    }
    /**
    * Helper function requiered for createTable
    */
    function content (element,i,Table){
        if(i==0){
            return Table.rows.length-1;
        }
        if(i==1){
            return element.filename;
        }
        if(i==2){
            return element.url
        }
        if(i==3){
            return element.date
        }

    }

    createTable('download_table',downloads,content,4)
}


download()
