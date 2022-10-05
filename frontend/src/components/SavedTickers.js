function SavedTickers(props){
  
    return(
        <div>
            <span>{`Ticker ${props.ticker.symbol}`}</span>
            <span>{`Last Price $ ${props.ticker.close}`}</span>
            <span>{`Date ${props.ticker.from}`}</span>
        </div>
    )
}

export default SavedTickers