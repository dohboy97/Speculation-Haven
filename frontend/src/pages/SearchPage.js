import { useState, useEffect } from 'react'
import Search from '../components/Search'
import Button from '../components/Button'
import Selector from '../components/Selector'

function SearchPage (){
    //detect and use search input to then take to server api and retrieve ticker info
    const [tickerFound,setTickerFound] = useState(true)
    const [tickerInput,detectInput]=useState()
    const [selected,setSelected]=useState('stock')
    const [loading,setLoading]=useState(false)

    //grabs ticker input for fetch
   

   

    return (
        <div>
        <h1>Search</h1>
        <Selector value = {selected} setValue = {setSelected}/>
        <Search placeholder = 'Ticker Search' />
        </div>
    )
}

export default SearchPage