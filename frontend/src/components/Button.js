function Button (props){


    


    return (
        <div>
            <button onClick = {props.handleClick}>{props.text}</button>
            <p></p>
        </div>
    )
}

export default Button