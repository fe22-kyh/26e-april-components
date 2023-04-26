import { useState, useEffect } from "react"
import userService from "../service/userService";



export default function ProfileComponent() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      let resp = await userService.getBalance();
      let data = await resp.json();
      setBalance(data.balance);
    }

    fetchBalance();
  });

  return (
    <div>
      <h2>Profile page</h2>
      <p>Balance: {balance} kr</p>
    </div>
  )
}