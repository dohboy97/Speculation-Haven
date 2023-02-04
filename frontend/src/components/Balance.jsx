import {
  Button,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { getPortfolio, postBalance, editBalance } from "../api";
function Balance() {
  const [balance, setBalance] = useState();
  const [newAmount, setNewAmount] = useState(0);
  const [withdrawOrDeposit, setWithdrawOrDeposit] = useState("deposit");

  useEffect(() => {
    getPortfolio().then((portfolio) => {
      setBalance(portfolio.balance);
    });
  }, [setBalance]);

  const handleSetBalance = async () => {
    const balance = await postBalance();
    console.log(balance);
  };

  //FOR DEPOSITING AND WITHDRAWING MONEY
  const handleEditBalance = async () => {
    const newBalance = await editBalance({
      balance: balance,
      withdrawOrDeposit: withdrawOrDeposit,
      amount: newAmount,
    });
    console.log(newBalance);
  };

  const handleSelectWithdrawOrDeposit = (e) => {
    setWithdrawOrDeposit(e.target.value);
  };

  const handleChangeAmount = (e) => {
    setNewAmount(e.target.value);
  };

  if (!balance) {
    return (
      <Box>
        <Typography variant="h5">
          What would you like your starting balance to be?
        </Typography>
        <TextField placeholder="1234" />
        <Button onClick={handleSetBalance} variant="contained">
          Set Balance
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5">Balance: ${balance}</Typography>
      <Box display="flex">
        <TextField onChange={handleChangeAmount} placeholder="Amount $" />
        <Box display="flex">
          <Select
            onChange={handleSelectWithdrawOrDeposit}
            value={withdrawOrDeposit}
          >
            <MenuItem value="deposit">Deposit</MenuItem>
            <MenuItem value="withdraw">Withdraw</MenuItem>
          </Select>
        </Box>
        <Button variant="contained" onClick={handleEditBalance}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default Balance;
