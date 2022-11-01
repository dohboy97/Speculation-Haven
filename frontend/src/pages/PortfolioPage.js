import { useState, useEffect } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Balance from '../components/Balance'
function PortfolioPage (){

    const [balance,setBalance] = useState()
    const [error,setError]=useState('')
    

    async function get(){
        const res = await fetch('/portfolio')
            
        const data = await res.json()
        data.portfolio[0] === undefined ? setBalance('notSet'):setBalance(data.portfolio[0].balance)

        
        
    }
    get() 
   
     
    async function artificialBalance(){

        //CHECK FOR VALID BALANCE INPUT
        let onlyDigits = true
       let balanceInput = document.querySelector('.balance').value
       let digits = [0,1,2,3,4,5,6,7,8,9]
        let arrToCheckforNonNums = balanceInput.split('')
        arrToCheckforNonNums.forEach(el=>{
            if(digits.includes(Number(el))===false){
                onlyDigits = false
            }
        })
        if(balanceInput.length<1){
            onlyDigits=false
        }

        if(onlyDigits === true){
        const res = await fetch ('/portfolio/addbalance',{
            method:'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
              balance:balanceInput,
              
            })
        })
        const data = await res.json()
        setBalance(data.portfolio[0].balance)
        }else{
            setError('Please enter a valid number, for example 123456')
        }
    }

    if(balance==='notSet'){

    
    return (
        <div>
            <span>What would you like your starting balance to be?</span>
            <Input className = 'balance' placeholder = '1234' />
        < Button handleClick = {artificialBalance} text = 'Submit Balance'/>
        <Balance />
        <h1>Portfolio</h1>
        <h2>Owned tickers</h2>
        <p>Avg cost, quantity, total value</p>
        </div>
    )
    }else{
        return(
            <div>
            <h1>Portfolio</h1>
            <h2>Balance: {balance}</h2>
            <h2>Owned tickers</h2>
            <p>Avg cost, quantity, total value</p>
            </div>
        )
    }
}

export default PortfolioPage