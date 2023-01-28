import { useEffect, useState} from 'react'



import NotFound from '../components/NotFound'
import Button from '../components/Button'
import Input from '../components/Input'
import Selector from '../components/Selector'

function SearchedTicker(setTickerFound,selectedMarket,detectInput,tickerInput,tickerFound,ticker){
    const [selectedPurchase,setSelectedPurchase]=useState('Buy in $')
    const [addToWatchListButton,setAddToWatchListButton]=useState('Add to Watchlist')
    const [inputState,setInputState]=useState('')
  
    const [watchList,setWatchList] = useState([])
    const [input, setInput] = useState(0)
    


    //gets ticker upon button search
    async function buttonSearch (){
    try{
    await getTicker();    
    }catch(err){
      console.log(err)
    }
   }
   
    async function post(input){
        let alreadyExists = false
        watchList.forEach(el=>{
          if(el.symbol===input){
            alreadyExists=true
          }
        })
  
      //only fetch new ticker if input doesnt exist in object
  
      if(alreadyExists===false){
        setTickerFound(true)
        console.log('tttttt test')
        const res = await fetch(`/watchlist/addticker/${input}`, {
          method: "POST",
          headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
              type:selectedMarket,
              index:watchList.length
            })
        })
        const data = await res.json()
        if(data.ticker === false){
           setTickerFound (false)
        }else{
        setWatchList(data.stonks)
        }
      }
     }

    //grabs ticker input for fetch
    async function getTicker(){
      
    let input = document.querySelector('.search').value.toUpperCase()
    detectInput(input)
  
    post(input)
    }

   

       //USEEFFECT

    useEffect(()=>{
        setAddToWatchListButton('Add to Watchlist')
        async function getWatchList(){

    
            const res = await fetch('/watchlist')
            const data = await res.json()
            //setState of watchlist here on page load
      
            if(watchList.length===0 && data.stonks.length>0){
      
            
             setWatchList(data.stonks)   
            }
          } 
        getWatchList()
        
        if(selectedPurchase === 'buy in $'){
        setInputState('Dollar Amount')
        }else{
        setInputState('Quantity')
        }
        watchList.forEach(el=>{
       
        if(el.symbol === tickerInput && el.type === selectedMarket){
            console.log(el)
            setAddToWatchListButton('Already Added to Watchlist')
        }
        })
        }
        
    ,[inputState,input,selectedPurchase,watchList,addToWatchListButton,tickerInput,selectedMarket])  

    //BUY STOCK FOR PORTFOLIO
    async function buyTicker(){
      let symbol = tickerInput
      let price = Number(ticker.stock.Price)
      let type = ticker.type
      let dollarAmount = inputState === 'Dollar Amount' ? input : input*price
      let shares = inputState === 'Quantity' ? input : input/price

      const res = await fetch(`/portfolio/buyOrSellTicker`,{
        method:'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          type,
          symbol,
          dollarAmount,
          shares,
          price 
        })
    })
    const data = await res.json()
    console.log(data)
    }      

    
    if(tickerFound===true ){
        let buyInputPlaceholder
        ticker.type === 'stock' ? buyInputPlaceholder = 'Buy Shares' : buyInputPlaceholder = 'Buy Coins'
    return(
        <div>
            <h2>Ticker: {tickerInput}</h2>
            <span>Price:{ticker.stock.Price}</span>     
            <Button handleClick = {buttonSearch} text = {addToWatchListButton} />
            <div>
                <Input className = 'buy' placeholder = {inputState} setInput = {setInput} />
                <Selector value = {selectedPurchase} setValue = {setSelectedPurchase} options = {[buyInputPlaceholder, 'Buy in $']} />
                <Button handleClick={buyTicker} text = 'Submit'/>
            </div>
        </div>
    )
    }else if(tickerFound===false){
        return(
            <div>
                <NotFound found = {tickerFound} text = {tickerInput}/>
                
            </div>
        )
    }
    }
        
    

export default SearchedTicker