import NotFound from '../components/NotFound'
import Button from '../components/Button'

function SearchedTicker(props){
   
    if(props.tickerFound===true ){
    return(
        <div>
            <h2>Ticker: {props.input}</h2>
            <span>Price:{props.ticker.Price}</span>     
            <Button text = 'Add To Watchlist' />
            <div>
                
            </div>
        </div>
    )
    }else if(props.tickerFound===false){
        return(
            <div>
                 <NotFound found = {props.tickerFound} text = {props.input}/>
            </div>
        )
    }
    }
        
    

export default SearchedTicker