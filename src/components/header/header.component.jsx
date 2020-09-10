import React, { useEffect, useState } from "react";

import "./header.styles.scss";
import { auth } from "../../firebase/firebase.utils";
import { Link } from "react-router-dom";

import { useAlert } from "react-alert";

const Header = () => {
  const [signedIn, setSignedIn] = useState(false);

  const alert = useAlert();

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) setSignedIn(true);
    });
  }, []);

  const logout = () => {
    auth()
      .signOut()
      .then(() => alert.show("Signed out"))
      .catch((error) => alert.show(error.message));
  };
  return (
    <>
      <ion-header className="try">
        <ion-toolbar>
          <ion-title>
            <Link to="/" className="ion-title">
              Bodega
            </Link>
          </ion-title>
          <ion-buttons slot="primary">
            {signedIn ? (
              <ion-button onClick={logout}>
                <ion-icon name="log-in-outline"></ion-icon>
              </ion-button>
            ) : null}
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    </>
  );
};

export default Header;
