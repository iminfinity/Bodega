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
    <header className="page-header">
      <div>
        <Link to="/"> Malla's Shop</Link>
      </div>
      {signedIn ? <div onClick={logout}>Logout</div> : null}
    </header>
  );
};

export default Header;
