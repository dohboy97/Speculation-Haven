async function getPrice(){
    try{
        fetch('https://api.polygon.io/v2/aggs/ticker/O:TSLA210903C00700000/range/1/day/2022-07-22/2022-07-22?adjusted=true&sort=asc&limit=120&apiKey=5yXXoRWyi0VeA2iYyCs3vsTb4K0H9m_q')
        .then(res=> res.json())
        .then(data=>{
            console.log(data)
        })
    }catch(err){
        console.log(err)
    }
}