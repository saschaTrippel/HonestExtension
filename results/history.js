var param = document.getElementById("history").getAttribute("parameter");
/**
 * Inserts content into historypage
 */
async function Diag( ){
    var Source=[]
    try {
        Source =  await getSourceData(param)
    } catch (error) {
        if(error.message = "SourceError"){
            return
        }
    }
    Source.sort( (a,b) => b.quantity - a.quantity )
    var xaxis =[]
    var yaxis = []
    Source.forEach(element => xaxis.push(element.hostname ))
    Source.forEach(element => yaxis.push(element.quantity))
    createDiagramm("myDiv","Top 5 Sides you visted",xaxis,yaxis)


}

Diag()
createList(param)    

