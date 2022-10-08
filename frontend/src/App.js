import { useState, useEffect } from "react";



import Header from './components/Header'
import Search from './components/Search'
import Button from './components/Button'
import Watchlist from './components/Watchlist'
 
function App() {

  //useState for stock count on page, useEffect for fetch?

  const [watchList,addToWatchList] = useState([])
  const [tickerFound,setTickerFound] = useState(true)
  const [tickerInput,detectInput]=useState()
 //use another state for when buttonSearch returns an error?

  async function buttonSearch (){
    
    let input = document.querySelector('.search').value.toUpperCase()
    detectInput(input)
    fetch(`https://api.polygon.io/v1/open-close/${input}/2022-10-03?adjusted=true&apiKey=5yXXoRWyi0VeA2iYyCs3vsTb4K0H9m_q`)
   .then((response) => response.json())
   .then((data) => {
     if(data.status==='OK'){
      let alreadyExists = false

      //PREVENTS USER FROM REGISTERING TICKER TWICE
      watchList.forEach((el,index)=>{
        if(el.symbol === data.symbol){
          alreadyExists = true
          watchList.splice(index,1)
        }
      })

      addToWatchList(watchList.concat(data))

      setTickerFound(true)
       
      }else{
        setTickerFound(false)
      }
   })
   .catch((err)=>{
     console.log(err)
   })
    
   }

   useEffect(()=>{
     console.log(tickerInput)
   })
  

   


  return (
    <div className="App">
      <Header log = 'test'/>
      <Search placeholder = 'Ticker Search' />
      <Button handleClick = {buttonSearch} text = 'Search' />
      <Watchlist tickers = {watchList} setState = {addToWatchList} tickerFound = {tickerFound} tickerInput = {tickerInput}/>
    </div>
  );
}

export default App;
