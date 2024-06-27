import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Homepage from "./components/Homepage";
import MembersPage from "./components/Members";
import Redeem from "./components/Redeem";
import Inventory from "./components/Inventory";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const rpcUrl = "https://evm-rpc.sei-apis.com"; // seiV2 EVM
  const restUrl = "https://rest.sei-apis.com/";
  const chainId = "pacific-1";
  
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
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
  );
}

export default App;

