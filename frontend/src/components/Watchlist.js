import SavedTickers from './SavedTickers'
import NotFound from './NotFound'


function Watchlist(tickers,tickerFound,tickerInput,setState,){
   
   
    //separation of stocks and crpyto 
    if(tickerFound === true){
    return(
        <div> 
            <h2>Stocks</h2>
            {tickers.map((el,index) =>{
                if(el.type==='stock'){
                return <SavedTickers key = {tickers[index]._id} ticker = {el} state = {tickers} setState = {setState} index={index}/>
                }else{
                    return null
                }
            })}
            <h2>Crypto</h2>
            {tickers.map((el,index) =>{
                if(el.type==='crypto'){
                return <SavedTickers key = {tickers[index]._id} ticker = {el} state = {tickers} setState = {setState} index={index}/>
                }else{
                    return null
                }
            })}
        </div>
    )
    }else{
        return (
            <div>
            
            <NotFound found = {tickerFound} text = {tickerInput}/>
            </div>
        )
    }
}

export default Watchlist