import SavedTickers from './SavedTickers'
import NotFound from './NotFound'

function Watchlist(props){
    
 
    if(props.tickerFound === true || props.tickerFound===false){
    return(
        <div>
            
            <NotFound found = {props.tickerFound} text = {props.tickerInput}/>

            {props.tickers.map((el,index) =>{
                
                return <SavedTickers key = {el.volume} ticker = {el} state = {props.tickers} setState = {props.setState} index={index}/>
                
            })}
            
        </div>
    )
    }
}

export default Watchlist