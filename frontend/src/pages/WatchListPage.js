import { useState, useEffect } from 'react'


import Search from '../components/Search'
import Button from '../components/Button'
import Watchlist from '../components/Watchlist'
import Selector from '../components/Selector'

function WatchListPage (){
  
  //useState for stock count on page, useEffect for fetch?

  const [watchList,addToWatchList] = useState([])

  const [tickerFound,setTickerFound] = useState(true)
  const [tickerInput,detectInput]=useState()
  const [selected,setSelected]=useState('stock')

  

//gets ticker upon button search
  async function buttonSearch (){
    try{
    await getTicker();    
    }catch(err){
      console.log(err)
    }
   }

   //passes each el of watchlist to the server to update prices, then uses map to update itself in state
  
     async function updatePrices(){
      let updatedArr = []
      await watchList.forEach(async (el)=>{
      
        // async function lonePriceUpdate(){
          console.log(el.symbol)
        const res = await fetch(`/watchlist/updateticker/${el._id}`, {
          method: "PUT",
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            'symbol':el.symbol,
            'price':el.price,
            'type':el.type
          })
        })
        const data = await res.json()
        console.log(data.updatedStonk[0])
        //map array to replace old stock price with new stock price response from server
        
       updatedArr.push(data.updatedStonk[0])

        
      // }
      // lonePriceUpdate()
     
      })
     await addToWatchList(updatedArr)
    
   }
   
  

  //grabs ticker input for fetch
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
        headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            type:selected
          })
      })
      const data = await res.json()
      if(data.ticker === false){
         setTickerFound (false)
       }else{
        addToWatchList(data.stonks)
        
       }
    }
    
  }

  useEffect(()=>{
     

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

  console.log('test')
 
  },[watchList])
  
  return (
    <div className="App">
      
      <Selector value = {selected} setValue = {setSelected}/>
      <Search placeholder = 'Ticker Search' />
      <Button handleClick = {buttonSearch} text = 'Search' />
      <Button handleClick = {updatePrices} text = 'Update Prices'/>
      <Watchlist tickers = {watchList} setState = {addToWatchList} tickerFound = {tickerFound} tickerInput = {tickerInput}/>
    
    </div>
  );
}




export default WatchListPage