import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { authenticate } from "./store/session";
import { WalletProvider } from "./context/WalletProvider";
import Homepage from "./components/Homepage";
import Redeem from "./components/Redeem";
import Inventory from "./components/Inventory";
import Header from "./components/Header";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <WalletProvider>
      <Router>
        <Header />
        {isLoaded && (
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/redeem" component={Redeem} /> 
            <Route path="/inventory" component={Inventory} />   
          </Switch>
        )}
      </Router>
    </WalletProvider>
  );
}

export default App;
