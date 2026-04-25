import { useState } from "react";
import { auth } from "./firebase";
import {
signInWithEmailAndPassword
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function NgoLogin() {

const [email,setEmail] =
useState("");

const [password,setPassword] =
useState("");

const navigate = useNavigate();

const handleLogin =
async () => {

try {

await signInWithEmailAndPassword(
auth,
email,
password
);

alert("Login Success 🔥");

navigate("/ngo");

} catch(err) {

alert("Wrong Login");

}

};

return (
<div className="loginPage">

<h1>NGO Login</h1>

<input
placeholder="Email"
value={email}
onChange={(e)=>
setEmail(e.target.value)
}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>
setPassword(e.target.value)
}
/>

<button
onClick={handleLogin}
>
Login
</button>

</div>
);

}

export default NgoLogin;