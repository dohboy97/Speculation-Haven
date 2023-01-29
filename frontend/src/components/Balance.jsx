import Selector from './Selector'
import Input from './Input'
import Button from './Button'
import Error from './Error'
function Balance({balance,
    uploadBalance,error,withdrawOrDeposit,setWithdrawOrDeposit,editBalance}){
    
    if(balance==='notSet'){
        return(
            <div>
            <span>What would you like your starting balance to be?</span>
            <Input className = 'balance' placeholder = '1234' />
        < Button handleClick = {uploadBalance} text = 'Submit Balance'/>
            <Error error = {error}/>
       
        </div>
        )
    }else if(balance>=0){
    return(
        <div>
            <h2>Balance: ${balance}</h2>
            <Selector options = {['Deposit Funds', 'Withdraw Funds']} value = {withdrawOrDeposit} setValue = {setWithdrawOrDeposit}/>
            
            <Input className = 'editBalance' placeholder = 'Amount $'/>
            <Button handleClick = {editBalance} text = 'Submit'/>
            <Error error={error} />
        </div>
    )
}
}
export default Balance