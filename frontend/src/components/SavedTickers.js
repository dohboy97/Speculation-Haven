function SavedTickers(props){

    
    let removeThisState = props.setState 
    let currentState = props.state
    let index = props.index
    console.log (currentState)
    return(
        <div>
            <span>{`Ticker ${props.ticker.symbol}`}</span>
            <span>{`Last Price $ ${props.ticker.close}`}</span>
            <span>{`Date ${props.ticker.from}`}</span>
            <button onClick ={() => {removeThisState(
                currentState.filter((stock,ind)=>index!==ind)
            )}}>Delete</button>
        </div>
    )
}

export default SavedTickers