function SavedTickers(props){
    console.log(props)
    
    let removeThisState = props.setState 
    let currentState = props.state
    let index = props.index

    return(
        <div>
            <span>{`Ticker ${props.ticker.symbol}`}</span>
            <span>{`Last Price $ ${props.ticker.close}`}</span>
            <span>{`Date ${props.ticker.from}`}</span>
            <button onClick ={() => {removeThisState(
                currentState.filter(a=>a.ticker!==currentState.ticker)
            )}}>Delete</button>
        </div>
    )
}

export default SavedTickers