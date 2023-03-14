import React from "react";
import { Auth } from "./../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [email, setEmail] = React.useState("");

  async function handleSubmit(e) {
    console.log(process.env.REACT_APP_REGISTER_URL);
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_URL,
      handleCodeInApp: true,
    };
    await sendSignInLinkToEmail(Auth, email, config)
      .then(() => {
        toast.success(
          `Email is sent to ${email} Click the link to complete your registration`
        );
        window.localStorage.setItem("emailForRegistration", email);
        setEmail("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode " + errorCode + " errorMessage " + errorMessage);
      });
  }
  function RegisterForm() {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter Your Email"
        />
        <br />
        <button type="submit" className="btn btn-primary mt-2">
          Register
        </button>
      </form>
    );
  }
  return (
    <div className="container p-5 ">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {RegisterForm()}
        </div>
      </div>
    </div>
  );
}

export default Register;
