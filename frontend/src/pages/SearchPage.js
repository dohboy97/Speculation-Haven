import { useState} from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import Selector from '../components/Selector'
import SearchedTicker from '../components/SearchedTicker'


function SearchPage (){
    //detect and use search input to then take to server api and retrieve ticker info
    const [tickerFound,setTickerFound] = useState()
    const [tickerInput,detectInput]=useState('')
    const [selected,setSelected]=useState('stock')
    const [ticker,setTicker]=useState()
 

    //grabs ticker input for fetch
    async function getTicker(){
        let input = document.querySelector('.search').value.toUpperCase()
        detectInput(input)
        setTickerFound()
        getTickerFromServer(input)
       
       }

       //posts ticker to server through restful api to be able to temporarily set ticker state to whatever user queries
       async function getTickerFromServer(input){
         
           if(input){
               const res = await fetch(`/search/${input}`,{
                   method:'POST',
                   headers: {'Content-type': 'application/json'},
                   body: JSON.stringify({
                     type:selected,
                     
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
        
        <Selector value = {selected} setValue = {setSelected} options = {['Stocks','Crypto']}/>
        <Input className = 'search' placeholder = 'Ticker Search' />
        <Button handleClick = {getTicker} text = 'Search' />
        <SearchedTicker ticker = {ticker} input = {tickerInput} tickerFound = {tickerFound} />
        </div>
    )
}

export default SearchPage