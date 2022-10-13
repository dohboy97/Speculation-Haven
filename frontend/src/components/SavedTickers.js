function SavedTickers(props){

    
    let removeThisState = props.setState 
    let currentState = props.state
    let index = props.index
    
    return(
        <div>
            <span>{`Ticker ${props.ticker.symbol} `}</span>
            <span>{`Last Price $ ${props.ticker.price}`}</span>
           
            <button onClick ={async function() {
                await fetch(`/watchlist/deleteticker/${props.ticker._id}`,{
                    method:'DELETE',
                })
                console.log('ticker deleted')
            }}>Delete</button>
        </div>
    )
}

export default SavedTickers