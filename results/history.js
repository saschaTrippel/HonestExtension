var param = document.getElementById("history").getAttribute("parameter");
async function Diag( ){
    var Source=[]
    try {
        Source =  await getSourceData(param)
    } catch (error) {
        if(error.message = "upsi"){
            return
        }
    }
    //console.log(Source)
    Source.sort( (a,b) => b.quantity - a.quantity )
    var xaxis =[]
    var yaxis = []
    Source.forEach(element => xaxis.push(element.hostname ))
    Source.forEach(element => yaxis.push(element.quantity))
    createDiagramm("myDiv","Top 5 Sides you visted",xaxis,yaxis)


}

Diag()
createList(param)    

