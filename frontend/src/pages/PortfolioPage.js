import { useState, useEffect } from 'react'
import Button from '../components/Button'

function PortfolioPage (){

    const [balance,setBalance] = useState(0)

    let ticks    

    async function get(){
        const res = await fetch('/portfolio')
            
        const data = await res.json()
        console.log(data.portfolio[0])

        
        
    }
    get() 
   

    async function artificialBalance(){
       
      
        
        const res = await fetch ('/portfolio/addbalance',{
            method:'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
              balance:1000,
              ownedTickers:[
                  {symbol:'AAPL',
                  price:140,
                  type:'stock'},
                  {symbol:'GOOGL',
                  price:90,
                  type:'stock'}
              ]
            })
        }
        
    )

    }

    return (
        <div>
        < Button handleClick = {artificialBalance} text = 'test'/>
        <h1>Portfolio</h1>
        <h2>Owned tickers</h2>
        <p>Avg cost, quantity, total value</p>
        </div>
    )
}

export default PortfolioPage