import { useState, useEffect } from "react";

import Header from './components/Header'
import Search from './components/Search'
import Button from './components/Button'
import Watchlist from './components/Watchlist'
 
function App() {

  //useState for stock count on page, useEffect for fetch?

  const [watchList,addToWatchList] = useState([])

 

  function buttonSearch (){
    let input = document.querySelector('.search').value.toUpperCase()
    fetch(`https://api.polygon.io/v1/open-close/${input}/2022-10-03?adjusted=true&apiKey=5yXXoRWyi0VeA2iYyCs3vsTb4K0H9m_q`)
   .then((response) => response.json())
   .then((data) => addToWatchList(watchList.concat(data)));
    console.log('from app',watchList)
   }
   useEffect(()=>{
     console.log('hello')
   })

  return (
    <div className="App">
      <Header log = 'test'/>
      <Search placeholder = 'Ticker Search' />
      <Button handleClick = {buttonSearch} text = 'Search' />
      <Watchlist tickers = {watchList} />
    </div>
  );
}

export default App;
