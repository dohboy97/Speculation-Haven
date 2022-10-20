function Selector(props){

    return(
        <div>
            <select onChange={e=>props.setValue(e.target.value)}>
                <option value = 'stock'>Stocks</option>
                <option value = 'crypto'>Crypto</option>
            </select>
        </div>
    )
}

export default Selector