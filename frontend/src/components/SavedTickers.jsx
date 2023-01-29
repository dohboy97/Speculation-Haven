function SavedTickers({ticker,state,setState,index}){
    
    
    
    return(
        <div>
            <span>{`Ticker ${ticker.symbol} `}</span>
            <span>{`Last Price $ ${ticker.price}`}</span>
           
            <button onClick ={async function() {
                setState(state.filter(el=> el!==ticker))
                await fetch(`/watchlist/deleteticker/${ticker._id}`,{
                    method:'DELETE',
                })
                console.log('ticker deleted')
            }}>Delete</button>
        </div>
    )
}

export default SavedTickers