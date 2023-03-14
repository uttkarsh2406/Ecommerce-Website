import React, { useEffect, useState } from "react";
import { Auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { sendPasswordResetEmail } from "firebase/auth";

function ForgotPassword({ history }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const {user}=useSelector((state)=>({...state}));
  useEffect(()=>{
    if(user && user.token){
      history.push('/')
    }
  },[])
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const config={
        url: process.env.FORGOT_PASSWORD_REDIRECT,
        handleCodeInApp:true,
    }
    await sendPasswordResetEmail(Auth,email).then((result)=>{
        setEmail('');
        setLoading(false);
        toast.success("Check your Email for password Reset Email");
        
    }).catch((error)=>{
        setLoading(false);
        console.log(error);
        toast.error(error.message);
    })
  }
  return (
    <div className="contanier col-md-6 offset-md-3 p-5">
      {loading ? (
        <h4 className="text-danger">loading.....</h4>
      ) : (
        <h4>Forgot Password</h4>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <button className="btn btn-primary" disabled={!email}>Submit</button>{" "}
      </form>
    </div>
  );
}

export default ForgotPassword;
