import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Wrap } from "@chakra-ui/react";
// import { AccountsContext, UserContext } from "../provider/GlobalProvider";
import AccountsCarousel from "../components/AccountsCarousel";
import Filter from "../components/Filter";
import BalanceChart from "../components/BalanceChart";
import EIPieChart from "../components/EIPieChart";
import Navbar from "../components/Navbar";
// import { userState } from "../types/userReducerInterface";
import { UserContext } from "../provider/GlobalProvider";

function HomePage() {
  const { userState } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState?._id) {
      navigate("/loading");
    }
  }, [userState]);

  return (
    <Wrap
      bg="gray.100"
      maxHeight="100%"
      maxWidth="100%"
      display="flex"
      flexDirection={["column", "row", "row"]}
      justifyContent="space-around"
      alignItems="center"
      fontSize={["30px"]}
      overflowY="scroll"
      overflowX="scroll"
    >
      <h1>HOME</h1>
      <AccountsCarousel />
      <Filter />
      <BalanceChart />
      <EIPieChart />
      <Navbar />
    </Wrap>
  );
}

export default HomePage;
