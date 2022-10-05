import SavedTickers from './SavedTickers'

function Watchlist(props){
    

    if(props.tickers.length>0){
    return(
        <div>
            {props.tickers.map((el,index) =>{
                
                return <SavedTickers key = {el.volume} ticker = {el} state = {props.tickers} setState = {props.setState} index={index}/>
                
            })}
            
        </div>
    )
    }
}

export default Watchlist