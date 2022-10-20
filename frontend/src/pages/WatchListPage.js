import { useState, useEffect } from 'react'


import Search from '../components/Search'
import Button from '../components/Button'
import Watchlist from '../components/Watchlist'

function WatchListPage (){
  
  //useState for stock count on page, useEffect for fetch?

  const [watchList,addToWatchList] = useState([])

  const [tickerFound,setTickerFound] = useState(true)
  const [tickerInput,detectInput]=useState()
 //use another state for when buttonSearch returns an error?

  async function buttonSearch (){
    try{
    await getTicker();    
    }catch(err){
      console.log(err)
    }
   }

   //passes each el of watchlist to the server to update prices
   function updatePrices(){
      watchList.forEach(el=>{
      
        async function lonePriceUpdate(){
          console.log(el.symbol)
        const res = await fetch(`/watchlist/updateticker/${el._id}`, {
          method: "PUT",
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            'symbol':el.symbol,
            'price':el.price
          })
          
        })
        const data = await res.json()
        console.log(data)
      }
      lonePriceUpdate()
      })
   }

  useEffect(()=>{
     //ADD THE GET REQUEST INTO HERE

     async function getWatchList(){

     
     const res = await fetch('/watchlist')
     const data = await res.json()
     //setState of watchlist here on page load

      if(watchList.length===0 && data.stonks.length>0){

        console.log('stonkscity updated in useeffect on load')
        addToWatchList(data.stonks)
        
      }
     
    }
    getWatchList()

   },[watchList])
  
   async function getTicker(){
    let input = document.querySelector('.search').value.toUpperCase()
    detectInput(input)
    post(input)
   
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
      const res = await fetch(`/watchlist/addticker/${input}`, {
        method: "POST",
        
      })
      const data = await res.json()
      if(data.ticker === false){
         setTickerFound (false)
       }else{
        addToWatchList(data.stonks)
        
       }
    }
    
  }
  
  return (
    <div className="App">
     
      <Search placeholder = 'Ticker Search' />
      <Button handleClick = {buttonSearch} text = 'Search' />
      <Button handleClick = {updatePrices} text = 'Update Prices'/>
      <Watchlist tickers = {watchList} setState = {addToWatchList} tickerFound = {tickerFound} tickerInput = {tickerInput}/>
    
    </div>
  );
}




export default WatchListPage