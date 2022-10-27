import { useEffect, useState} from 'react'



import NotFound from '../components/NotFound'
import Button from '../components/Button'
import Input from '../components/Input'
import Selector from '../components/Selector'

function SearchedTicker(props){
    const [selectedPurchase,setSelectedPurchase]=useState('Buy in $')
    
    const [inputState,setInputState]=useState('')
  
    const [watchList,setWatchList] = useState([])
    
    

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
          
        props.setTickerFound(true)
        console.log('tttttt test')
        const res = await fetch(`/watchlist/addticker/${input}`, {
          method: "POST",
          headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
              type:props.selectedMarket,
              index:watchList.length
            })
        })
        const data = await res.json()
        if(data.ticker === false){
           props.setTickerFound (false)
        }else{
        setWatchList(data.stonks)
          
        }
      }
     }


    useEffect(()=>{
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
        }
        
    ,[inputState,selectedPurchase,watchList])

    //grabs ticker input for fetch
   async function getTicker(){
    let input = document.querySelector('.search').value.toUpperCase()
    props.detectInput(input)
  
    post(input)
   }

   
    
    
    if(props.tickerFound===true ){
        let buyInputPlaceholder
        props.ticker.type === 'stock' ? buyInputPlaceholder = 'Buy Shares' : buyInputPlaceholder = 'Buy Coins'
       console.log(inputState)

      
       
    return(
        <div>
            <h2>Ticker: {props.input}</h2>
            <span>Price:{props.ticker.stock.Price}</span>     
            <Button handleClick = {buttonSearch} text = 'Add To Watchlist' />
            <div>
                <Input className = 'buy' placeholder = {inputState} />
                <Selector value = {selectedPurchase} setValue = {setSelectedPurchase} options = {[buyInputPlaceholder, 'Buy in $']} />
                <Button text = 'Submit'/>
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