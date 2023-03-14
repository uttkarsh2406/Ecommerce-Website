import React, { useState } from "react";
import { Auth } from "./../../firebase";
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  updatePassword,
} from "firebase/auth";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { async } from "@firebase/util";

function RegisterComplete({ history }) {
  const [email, setEmail] = React.useState("");
  const [passwaord, setPassword] = React.useState("");
  useState(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();

    if (!email && !passwaord) {
      toast.error("Email and Password is required");
      return;
    }
    if (passwaord.length < 6) {
      toast.error("password must be atleast 6 characters long");
      return;
    }
    await signInWithEmailLink(Auth, email, window.location.href)
      .then(async (result) => {
        //  console.log(result);
        if (result.user.emailVerified) {
          //remove useremail from localstorage
          //get userid token
          //redirect

          window.localStorage.removeItem("emailForRegistration");
          let user = Auth.currentUser;
          await updatePassword(user, passwaord)
            .then(() => {})
            .catch((error) => {});

          const idTokenResult = await user.getIdTokenResult();

          history.push("/");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  }
  function CompleteRegisterForm() {
    return (
      <form onSubmit={handleSubmit}>
        <input type="email" className="form-control" value={email} disabled />
        <input
          type="password"
          className="form-control"
          value={passwaord}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="password"
          autoFocus
        />

        <button type="submit" className="btn btn-primary mt-2">
          Complete Registration
        </button>
      </form>
    );
  }
  return (
    <div className="container p-5 ">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {CompleteRegisterForm()}
        </div>
      </div>
    </div>
  );
}

export default RegisterComplete;
