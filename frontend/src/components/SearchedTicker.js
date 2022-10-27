import { useEffect, useState} from 'react'


import NotFound from '../components/NotFound'
import Button from '../components/Button'
import Input from '../components/Input'
import Selector from '../components/Selector'

function SearchedTicker(props){
    const [selected,setSelected]=useState('Buy in $')
    const [inputState,setInputState]=useState('')
   
    

    useEffect(()=>{
      console.log(selected)
        
    if(selected === 'buy in $'){
        setInputState('Dollar Amount')
    }else{
        setInputState('Quantity')
    }
        }
        
    ,[inputState,selected])
    
    
    if(props.tickerFound===true ){
        let buyInputPlaceholder
        props.ticker.type === 'stock' ? buyInputPlaceholder = 'Buy Shares' : buyInputPlaceholder = 'Buy Coins'
       console.log(inputState)

      
       
    return(
        <div>
            <h2>Ticker: {props.input}</h2>
            <span>Price:{props.ticker.stock.Price}</span>     
            <Button text = 'Add To Watchlist' />
            <div>
                <Input className = 'buy' placeholder = {inputState} />
                <Selector value = {selected} setValue = {setSelected} options = {[buyInputPlaceholder, 'Buy in $']} />
                <Button text = 'Submit' />
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