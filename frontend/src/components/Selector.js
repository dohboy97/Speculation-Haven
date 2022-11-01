function Selector(props){
    console.log(props.value)
    
    return(
        <div>
            <select onChange={e=>props.setValue(e.target.value)}>
                {props.options.map((el,index)=>{
                   
                    return(
                        <option key = {index} value = {el.toLowerCase()}>{el}</option>
                    )
                })}
               
            </select>
        </div>
    )
}

export default Selector