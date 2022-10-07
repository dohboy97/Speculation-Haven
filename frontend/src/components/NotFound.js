
function NotFound(props){
   
    if(props.found === false){
        console.log(props)
    if(props.text.length>0){return(
        <div>
            <p>Sorry but {props.text} was not found. Please try again.</p>
        </div>
    )
    }else{
        return(
            <div>
                <p>Please Enter a Valid Ticker</p>
            </div>
        )
    }
}
}

export default NotFound