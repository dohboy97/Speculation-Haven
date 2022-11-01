function Error(props){
    if(props.error!==undefined){

    
    return(
        <div>
            <span>{props.error}</span>
        </div>
    )
    }
}
export default Error