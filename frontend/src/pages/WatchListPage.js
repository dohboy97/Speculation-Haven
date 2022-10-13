import { useState, useEffect } from 'react'


import Search from '../components/Search'
import Button from '../components/Button'
import Watchlist from '../components/Watchlist'

function WatchListPage (){
  
  //useState for stock count on page, useEffect for fetch?

  const [watchList,addToWatchList] = useState([])
  const [addedTicker, setAddedTicker]=useState(true)
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

  useEffect(()=>{
     //ADD THE GET REQUEST INTO HERE

     async function getWatchList(){

     
     const res = await fetch('/watchlist')
     const data = await res.json()
     //setState of watchlist here on page load
     console.log('test',data)
      if(data.stonks.length>watchList.length){

        console.log('stonkscity updated in useeffect',data.stonks)
         addToWatchList(data.stonks)
         setAddedTicker(false)
      }
     
    }
    getWatchList()
     console.log('watchlist',watchList)
   },[watchList])
  
   async function getTicker(){
    let input = document.querySelector('.search').value.toUpperCase()
    detectInput(input)
    post(input)
    setAddedTicker(true)
   }
   
  async function post(input){
    await fetch(`/watchlist/addticker/${input}`, {
       method: "POST",
       
     })
     console.log('added ticker in post function')
  }
  
  return (
    <div className="App">
     
      <Search placeholder = 'Ticker Search' />
      <Button handleClick = {buttonSearch} text = 'Search' />
    
      <Watchlist tickers = {watchList} setState = {addToWatchList} tickerFound = {tickerFound} tickerInput = {tickerInput}/>
   
    </div>
  );
}




export default WatchListPage