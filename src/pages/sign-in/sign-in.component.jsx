import React, { useState } from "react";
import "./sign-in.styles.scss";

const SignIn = ({ handleSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="sign-in"
      onSubmit={(event) => handleSubmit(event, email, password)}
    >
      <h2>Sign In</h2>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter Email"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Enter Pasword"
      />
      <input type="submit" value="Log in" />
      <p style={{ marginTop: "20px" }}>
        Sample - email: test@mail.com, password: bodega-react
      </p>
    </form>
  );
};

export default SignIn;
