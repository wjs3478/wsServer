function lotto(){

    let lot=[]
    let c=[]

    for(i=0;i<100000;i++)
    {
        
        lot.push(ranint())

    }

    for(j=1;j<46;j++)
    {
        c.push({num:j,value:lot.filter(val=>val.has(j)).length})
    }

    c.sort((a,b)=>{return b.value-a.value})
    

    return c
}

function ranint(){

    let lott=new Set()

    while(lott.size!=6)
    {
        lott.add(Math.trunc(Math.random()*45)+1)
    }

    return lott;
}