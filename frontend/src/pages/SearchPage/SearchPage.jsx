import { useState} from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Selector from '../../components/Selector'
import SearchedTicker from '../../components/SearchedTicker'


function SearchPage (){
    //detect and use search input to then take to server api and retrieve ticker info
    const [tickerFound,setTickerFound] = useState()
    const [tickerInput,detectInput]=useState('')
    const [selectedMarket,setSelectedMarket]=useState('stock')
    const [ticker,setTicker]=useState()
 

    //grabs ticker input for fetch
    async function getTicker(){
        let input = document.querySelector('.search').value.toUpperCase()
        detectInput(input)
        setTickerFound()
        getTickerFromServer(input,selectedMarket)
       
       }

       //posts ticker to server through restful api to be able to temporarily set ticker state to whatever user queries
       async function getTickerFromServer(input){
         console.log('test',selectedMarket)
           if(input){
               const res = await fetch(`/search/${input}`,{
                   method:'POST',
                   headers: {'Content-type': 'application/json'},
                   body: JSON.stringify({
                     type:selectedMarket,
                     
                   })
               })
               const data = await res.json()
               if(data === 'error'){
                   setTickerFound(false)
               }else{
                   setTickerFound(true)
               }
               console.log(data)
               setTicker(data)
           }
       }

    return (
        <div> 
        <h1>Search</h1>
        
        <Selector value = {selectedMarket} setValue = {setSelectedMarket} options = {['Stock','Crypto']}/>
        <Input className = 'search' placeholder = 'Ticker Search' />
        <Button handleClick = {getTicker} text = 'Search' />
        <SearchedTicker ticker = {ticker} detectInput={detectInput} tickerInput = {tickerInput} setTickerFound={setTickerFound} tickerFound = {tickerFound} selectedMarket = {selectedMarket} />
        </div>
    )
}

export default SearchPage