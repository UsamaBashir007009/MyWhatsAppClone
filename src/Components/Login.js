import { Button } from "@material-ui/core";
import { AlarmTwoTone } from "@material-ui/icons";
import React from "react";
import "../CSS_Files/Login.css";
import { auth, provider } from "../MyFirebase";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";
function Login() {
  const [{}, dispatch] = useStateValue();
  function SigninCall() {
    console.log("got click");
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  }
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt=""
        />
        <div className="login_text">
          <h1>Sign in to Whatsapp</h1>
        </div>
        <Button onClick={SigninCall}>Sign In With Google</Button>
      </div>
    </div>
  );
}

export default Login;
