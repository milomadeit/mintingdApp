import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import { SeiWalletProvider } from "@sei-js/react";
import Homepage from "./components/Homepage";
import MembersPage from "./components/Members";
import Redeem from "./components/Redeem";
import Inventory from "./components/Inventory";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const rpcUrl = "https://rpc.sei-apis.com";
  const restUrl = "https://rest.sei-apis.com/";
  const chainId = "pacific-1";
  
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <SeiWalletProvider
        chainConfiguration={{ chainId, restUrl, rpcUrl }}
        wallets={["compass", "fin", "leap"]}
    
      >
    <>
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/members" component={MembersPage} />
          <Route path="/redeem" component={Redeem} /> 
          <Route path="/inventory" component={Inventory} />   
        </Switch>
      )}
    </>
    </SeiWalletProvider>
  );
}

export default App;
