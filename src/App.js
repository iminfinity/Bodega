import React, { useEffect, useState } from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";

import Header from "./components/header/header.component";
import SignIn from "./pages/sign-in/sign-in.component";
import List from "./pages/list/list.component";
import AddCustomer from "./components/add-customer/add-customer.component";
import { auth, signin } from "./firebase/firebase.utils";
import { useAlert } from "react-alert";

function App() {
  const [signedIn, setSignedIn] = useState(false);

  const alert = useAlert();

  const handleSubmit = (event, email, password) => {
    event.preventDefault();
    signin(email, password)
      .then((user) => {
        setSignedIn(true);
      })
      .catch((error) => alert.show(error.message));
  };
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) setSignedIn(true);
    });
  }, []);

  return (
    <ion-app>
      <ion-content>
        <div className="page">
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                signedIn ? <List /> : <SignIn handleSubmit={handleSubmit} />
              }
            />
            <Route path="/addcustomer" component={AddCustomer} />
          </Switch>
        </div>
      </ion-content>
    </ion-app>
  );
}

export default App;
