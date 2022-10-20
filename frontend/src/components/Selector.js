function Selector(props){
    const options = [
        {value: 'stock', label:'Stocks'},
        {value:'crypto', label: 'Crypto'}
    ]
    // props.setValue({value: 'stock', label:'Stocks'})
    console.log(props.value)
    return(
        <div>
            <select>
                <option value = 'stock'>Stocks</option>
                <option value = 'crypto'>Crypto</option>
            </select>
        </div>
    )
}

export default Selector