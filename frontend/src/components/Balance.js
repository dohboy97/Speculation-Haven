import Selector from '../components/Selector'
import Input from '../components/Input'
import Button from './Button'
function Balance(props){
    
    if(props.balance==='notSet'){
        return(
            <div>
            <span>What would you like your starting balance to be?</span>
            <Input className = 'balance' placeholder = '1234' />
        < Button handleClick = {props.uploadBalance} text = 'Submit Balance'/>
       
       
        </div>
        )
    }else{
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