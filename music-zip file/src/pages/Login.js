import { useState } from "react";
import { verifyUser } from "../jwt-auth/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    let userCredentials = {
      email,
      password,
    };
    const isLogin = verifyUser(userCredentials);
    console.log("isLogin", isLogin);
  };
  return (
     <div
        style={{
          height: "300px",
          width: "400px",
          margin: "auto",
          backgroundColor: "black",
          color: "white",
          marginTop: "5%",
          textAlign:"left"
        }}
      >
        <div style={{display:"flex", justifyContent: "center",padding: "15px"}}>
        <label >Email : </label>{" "}
        <input type="email" /> 
        </div>
        <div style={{display:"flex", justifyContent: "center",padding: "15px"}}>
        <span >Password : </span>{" "}
        <input type="password" /> 
            </div>
        <div style={{display:"flex", justifyContent: "center", padding:"15px"}}>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
        </div>
       
        </div>
  );
}

export default Login;
