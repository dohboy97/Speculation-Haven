import Selector from '../components/Selector'
import Input from '../components/Input'
import Button from './Button'
import Error from '../components/Error'
function Balance(props){
    
    if(props.balance==='notSet'){
        return(
            <div>
            <span>What would you like your starting balance to be?</span>
            <Input className = 'balance' placeholder = '1234' />
        < Button handleClick = {props.uploadBalance} text = 'Submit Balance'/>
            <Error error = {props.error}/>
       
        </div>
        )
    }else if(props.balance>0){
    return(
        <div>
            <h2>Balance: ${props.balance}</h2>
            <Selector options = {['Deposit Funds', 'Withdraw Funds']}/>
            <Input placeholder = 'Amount'/>
        </div>
    )
}
}
export default Balance