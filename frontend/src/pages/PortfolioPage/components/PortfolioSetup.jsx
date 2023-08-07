import {
  Button,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  Skeleton
} from "@mui/material";
import { round } from "lodash";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "context";
import { getPortfolio, postBalance, editBalance } from "api";

function PortfolioSetup() {
  const user = useContext(UserContext);
  const userId = user.id;
  const [balance, setBalance] = useState();
  const [newAmount, setNewAmount] = useState();
  const [portfolio, setPortfolio] = useState();
  const [withdrawOrDeposit, setWithdrawOrDeposit] = useState("deposit");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getPortfolio({
      userId
    })
      .then((port) => {
        if (!port) return;
        setPortfolio(port);
        setBalance(port.balance);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [setBalance, setPortfolio, setIsLoading, userId]);

  const handleSetBalance = async () => {
    const updatedBalance = await postBalance({ balance: newAmount });
    setBalance(updatedBalance);
    toast.success("Balance set");
  };

  // FOR DEPOSITING AND WITHDRAWING MONEY
  const handleEditBalance = async () => {
    const newBalance = await editBalance({
      currentBalance: balance,
      withdrawOrDeposit,
      amount: newAmount,
      deposits: portfolio.deposits,
      withdrawals: portfolio.withdrawals
    });
    setBalance(newBalance);
    if (withdrawOrDeposit === "withdraw") {
      toast.success("Withdrawal successful");
    } else {
      toast.success("Deposit successful");
    }
  };

  const handleSelectWithdrawOrDeposit = (e) => {
    setWithdrawOrDeposit(e.target.value);
  };
  const handleChangeAmount = (e) => {
    setNewAmount(e.target.value);
  };

  if (isLoading) {
    return <Skeleton variant="rounded" height="100px" width="300px" />;
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
        Balance: ${round(balance, 2)}
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
