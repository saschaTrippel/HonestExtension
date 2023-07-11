/**
 * Inserts content into bookmarkspage
 */
async function bookmarks_table(){
    var downloads =[]
    try {
        var downloads = await getHistory("bookmarks")
    } catch (error) {
        if(error.message = "SourceError"){
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
            return element.title;
        }
        if(i==2){
            return  "<a href=" + element.url  +   ">" +  element.url + "</a> "
        }
        if(i==3){
            return new Date(  element.dateAdded ).toUTCString()
        }
        if(i==4){
            return element.id
        }

    }

    createTable('bookmarks_table',downloads,content,5)
}


bookmarks_table()
