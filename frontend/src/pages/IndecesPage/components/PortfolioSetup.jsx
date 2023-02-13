import {
  Button,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  Skeleton,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { getPortfolio, postBalance, editBalance } from "../../../api";
function PortfolioSetup() {
  const [balance, setBalance] = useState();
  const [newAmount, setNewAmount] = useState();
  const [withdrawOrDeposit, setWithdrawOrDeposit] = useState("deposit");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getPortfolio()
      .then((portfolio) => {
        if (!portfolio.portfolio[0]) return;
        setBalance(portfolio.portfolio[0].balance);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [setBalance, setIsLoading]);

  const handleSetBalance = async () => {
    const balance = await postBalance({ balance: newAmount });
    setBalance(balance);
  };

  //FOR DEPOSITING AND WITHDRAWING MONEY
  const handleEditBalance = async () => {
    const newBalance = await editBalance({
      currentBalance: balance,
      withdrawOrDeposit: withdrawOrDeposit,
      amount: newAmount,
    });
    setBalance(newBalance);
  };

  const handleSelectWithdrawOrDeposit = (e) => {
    setWithdrawOrDeposit(e.target.value);
  };
  const handleChangeAmount = (e) => {
    setNewAmount(e.target.value);
  };

  if (isLoading) {
    return <Skeleton variant="rounded" height="100px" width="300px"></Skeleton>;
  }

  if (!balance && balance !== 0) {
    return (
      <Box>
        <Typography variant="h5">
          What would you like your starting balance to be?
        </Typography>
        <Box>
          <TextField onChange={handleChangeAmount} placeholder="1234" />
          <Button
            disabled={!Number(newAmount)}
            onClick={handleSetBalance}
            variant="contained"
          >
            Set Balance
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Typography marginBottom={2} variant="h5">
        Balance: ${balance}
      </Typography>
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
        <Button
          disabled={!Number(newAmount)}
          variant="contained"
          onClick={handleEditBalance}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default PortfolioSetup;
