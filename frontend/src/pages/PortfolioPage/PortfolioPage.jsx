import { Typography, Box } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { editBalance, getPortfolio, postBalance } from "../../api";

import Balance from "../../components/Balance";
function PortfolioPage() {
  const [balance, setBalance] = useState();
  const [newAmount, setNewAmount] = useState(0);
  const [error, setError] = useState("");
  const [withdrawOrDeposit, setWithdrawOrDeposit] = useState("deposit");

  useEffect(() => {
    getPortfolio().then((portfolio) => {
      setBalance(portfolio[0].balance);
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

  //MAKE BALANCE AND PORTFOLIO BOTH INDIVIDUAL COMPONENTS

  return (
    <Box>
      <Typography variant="h4">Portfolio</Typography>
      <Balance
        balance={balance}
        setBalance={setBalance}
        uploadBalance={setBalance}
        error={error}
        setWithdrawOrDeposit={setWithdrawOrDeposit}
        withdrawOrDeposit={withdrawOrDeposit}
        editBalance={editBalance}
      />
      <Typography variant="h5">Owned tickers</Typography>
      <Typography variant="overline">
        Avg cost, quantity, total value
      </Typography>
    </Box>
  );
}

export default PortfolioPage;
