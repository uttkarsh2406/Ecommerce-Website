import React,{useState,useEffect} from "react";
import { Auth } from "./../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";



function Register(props) {
  const {history}=props;
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user,history]);

  
  async function handleSubmit(e) {
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
