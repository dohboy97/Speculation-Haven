import { useState} from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Selector from '../../components/Selector'
import SearchedTicker from '../../components/SearchedTicker'
import getTickerFromServer from '../../api/databaseCalls/reads'


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
        const data = await getTickerFromServer({input:input,selectedMarket:selectedMarket})
        data==='error' ? setTickerFound(false):setTickerFound(true)
        setTicker(data)
        

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