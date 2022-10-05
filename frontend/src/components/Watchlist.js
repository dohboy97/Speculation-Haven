import SavedTickers from './SavedTickers'

function Watchlist(props){
    console.log(props.tickers)
    return(
        <div>
            {props.tickers.map((el,index) =>{
                
                return <SavedTickers key = {props.tickers.volume} ticker = {el} />
            })}
        </div>
    )
}

export default Watchlist