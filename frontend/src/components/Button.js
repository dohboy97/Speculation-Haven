function Button (handleClick,text){


    


    return (
        <div>
            <button onClick = {handleClick}>{text}</button>
            <p></p>
        </div>
    )
}

export default Button