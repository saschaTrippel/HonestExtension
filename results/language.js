/**
 * Inserts content into Languagepage
 */
async function getLanguages(){
    var Source=[]
    try {
        Source = await getHistory("languages")
    } catch (error) {
        if(error.message = "SourceError"){
            return
         }
    }
    Source = Object.entries(Source)
    Source.sort( (a,b) => b[1] - a[1] )
    language = []
    yaxis = []
    Source.forEach(element => language.push(element[0]))
    Source.forEach(element => yaxis.push(element[1]))
    createDiagramm("language","Top 5 Languages used",language,yaxis)    
}
getLanguages()
