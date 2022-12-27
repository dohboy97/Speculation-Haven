function Search (props){
    const handleType = (e) => {
        props.setInput(e.target.value)
    }
    return(
        <div>
            <input className={props.className} placeholder = {props.placeholder} onChange = {props.setInput ? handleType : null}></input>
        </div>
    )
}

export default Search