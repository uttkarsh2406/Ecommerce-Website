import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { Auth } from "../../firebase";
import { toast } from "react-toastify";
import {updatePassword} from "firebase/auth"

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit=async(e)=>{
    e.preventDefault()
    setLoading(true);
    const user=Auth.currentUser
    await updatePassword(user,password).then((res)=>{
        setLoading(false);
        setPassword("");
        toast.success('Password Updated')

    }).catch(err=>{
        setLoading(false);
        console.log(err);
        toast.error(err.message)
    })


  }

  const passwordUpdateForm = () => (
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label> Your Password</label>
          <input
            value={password}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form-control mb-2"
            placeholder="Enter New Password"
            disabled={loading}
          />
          <button className="btn btn-primary" disabled={!password || loading || password.length<6 }>Submit</button>
        </div>
      </form>
    );
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          {loading ? <h4 className="text-danger">Loading...</h4>: <h4>Password Changed</h4>}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
