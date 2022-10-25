import NotFound from '../components/NotFound'

function SearchedTicker(props){
    if(props.tickerFound === true){
    return(

       
        <div>
           
            <h2>Ticker: {props.input}</h2>
            <span>Price:{props.ticker.Price}</span>     
        </div>
    )
    }else{
        
    }
}
export default SearchedTicker