import { useState, useEffect } from "react";

import Header from './components/Header'
import Search from './components/Search'
import Button from './components/Button'
 
function App() {

  function buttonSearch (){
    let input = document.querySelector('.search').value
    fetch(`https://api.polygon.io/v1/open-close/${input}/2022-10-03?adjusted=true&apiKey=5yXXoRWyi0VeA2iYyCs3vsTb4K0H9m_q`)
   .then((response) => response.json())
   .then((data) => console.log(data));
    return input
   }

  return (
    <div className="App">
      <Header log = 'test'/>
      <Search placeholder = 'Ticker Search' />
      <Button handleClick = {buttonSearch} text = 'Search' />
    </div>
  );
}

export default App;
