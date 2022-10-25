import { useState, useEffect } from 'react'


import Input from '../components/Input'
import Button from '../components/Button'
import Watchlist from '../components/Watchlist'
import Selector from '../components/Selector'

function WatchListPage (){
  
  //useState for stock count on page, useEffect for fetch?

  const [watchList,setWatchList] = useState([])
  const [tickerFound,setTickerFound] = useState(true)
  const [tickerInput,detectInput]=useState()
  const [selected,setSelected]=useState('stock')
  const [loading,setLoading]=useState(false)


//gets ticker upon button search
  async function buttonSearch (){
    try{
    await getTicker();    
    }catch(err){
      console.log(err)
    }
   }

  //grabs ticker input for fetch
   async function getTicker(){
    let input = document.querySelector('.search').value.toUpperCase()
    detectInput(input)
    post(input)
   }

  //POST TICKER TO DB IF DOESNT ALREADY EXIST
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
      console.log(selected)
      const res = await fetch(`/watchlist/addticker/${input}`, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            type:selected,
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

  useEffect(()=>{
    
    async function getWatchList(){

    
      const res = await fetch('/watchlist')
      const data = await res.json()
      //setState of watchlist here on page load

      if(watchList.length===0 && data.stonks.length>0){

       console.log('stonkscity updated in useeffect on load')
       setWatchList(data.stonks)   
      }
    } 
   getWatchList()
  
    if(loading){
     //passes each el of watchlist to the server to update prices, then uses map to update itself in state
     let updatedArr = []
     
     async function updatePrices(){
      
      watchList.forEach(async (el,index)=>{
  
        const res = await fetch(`/watchlist/updateticker/${el._id}`, {
          method: "PUT",
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            'symbol':el.symbol,
            'price':el.price,
            'type':el.type,
            'index':el.index
          })
        })
        const data = await res.json()
        
       updatedArr.push(data.updatedStonk[0])
       updatedArr.sort((a,b)=>{
         if (a.index<b.index){
           return -1
         }else{
           return 1
         }
       })
     
      //retain order
      
      setWatchList([...updatedArr])

      })
     setLoading(false)
     
   }
   updatePrices()
  }

  },[watchList,loading,])
  
  return (
    <div className="App">
      
      <Selector value = {selected} setValue = {setSelected} options = {['Stock','Crypto']}/>
      <Input className = 'search' placeholder = 'Ticker Search' />
      <Button handleClick = {buttonSearch} text = 'Search' />
      <Button handleClick = {()=>setLoading(true)} text = 'Update Prices'/>
      <Watchlist tickers = {watchList} setState = {setWatchList} tickerFound = {tickerFound} tickerInput = {tickerInput}/>
    
    </div>
  );
}

export default WatchListPage