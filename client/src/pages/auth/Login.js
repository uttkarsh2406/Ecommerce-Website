import React from "react";
import { Auth } from "./../../firebase";
import {
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Result } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { async } from "@firebase/util";

function Login({ history }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  let dispatch = useDispatch();
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
    await signInWithEmailAndPassword(Auth, email, password)
      .then(async (result) => {
        // console.log(result);
        const {user} = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult,
          },
        });
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
        setLoading(false);
      });
  }
  function loginForm() {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter Your Email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter Your Password"
          />
        </div>
        <br />
        <Button
          type="primary"
          className="btn btn-primary mt-2 mb-3"
          onClick={handleSubmit}
          block
          shape="round"
          icon={<MailOutlined />}
          size="large"
          disabled={!email || password.length < 6}
        >
          Login with Email/Password
        </Button>
      </form>
    );
  }
  return (
    <div className="container p-5 ">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Login</h4>
          {loginForm()}
        </div>
      </div>
    </div>
  );
}

export default Login;
