import React, { useState } from "react";
import { Auth } from "./../../firebase";
import { signInWithEmailLink, updatePassword } from "firebase/auth";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "./../../functions/auth";

function RegisterComplete(props) {
  const { history } = props;
  const [email, setEmail] = useState("");
  const [passwaord, setPassword] = useState("");

  useState(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [history]);

  let dispatch = useDispatch();

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
    signInWithEmailLink(Auth, email, window.location.href)
      .then(async (result) => {
        //  console.log(result);
        if (result.user.emailVerified) {
          //remove useremail from localstorage
          //get userid token
          //redirect

          window.localStorage.removeItem("emailForRegistration");
          let user = Auth.currentUser;
          await updatePassword(user, passwaord)
            .then(() => {
              console.log("Password Updated");
            })
            .catch((err) => {
              console.log(err);
            });

          const idTokenResult = await user.getIdTokenResult();
          // console.log(user);
          createOrUpdateUser(idTokenResult.token)
            .then((res) => {
              dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                  name: res.data.name,
                  email: res.data.email,
                  token: idTokenResult.token,
                  role: res.data.role,
                  _id: res.data._id,
                },
              });
            })
            .catch((err) => {
              console.log(err);
            });
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
          placeholder="Password"
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
