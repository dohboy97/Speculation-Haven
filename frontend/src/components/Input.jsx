function Search ({className,placeholder,setInput}){
    const handleType = (e) => {
        setInput(e.target.value)
    }
    return(
        <div>
            <input className={className} placeholder = {placeholder} onChange = {setInput ? handleType : null}></input>
        </div>
    )
}

export default Search