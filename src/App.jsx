import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase";
import {
signInWithEmailAndPassword
} from "firebase/auth";
import NgoDashboard from "./NgoDashboard";
import CitizenPanel from "./CitizenPanel";

/* Home */
function Home() {
  return (
    <div className="content" style={{padding:"60px"}}>
      <h1>Welcome to Sahayata</h1>
      <br />

      <div className="cards">

        <div className="card">
          <h3>NGO Portal</h3>
          <br />
          <Link to="/ngo-login">
            <button className="action">Login as NGO</button>
          </Link>
        </div>

        <div className="card">
          <h3>Citizen Portal</h3>
          <br />
          <Link to="/citizen-login">
            <button className="action">Login as Citizen</button>
          </Link>
        </div>

      </div>
    </div>
  );
}

/* NGO Login */
function NgoLogin() {
  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [pass,setPass] = useState("");
  const [error,setError] = useState("");

  const login = async () => {

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        pass
      );

      navigate("/ngo");

    } catch(err) {

      setError("Invalid NGO Credentials");

    }

  };

  return (
    <div className="content">
      <h1>NGO Login</h1>

      <div className="card form">

        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e)=>setPass(e.target.value)}
        />

        <button
          className="action"
          onClick={login}
        >
          Login
        </button>

        <p className="high">{error}</p>

      </div>
    </div>
  );
}

/* Citizen Login */
function CitizenLogin() {
  const navigate = useNavigate();

  const [mobile,setMobile] = useState("");
  const [pass,setPass] = useState("");
  const [error,setError] = useState("");

  const login = () => {
    if(mobile === "9999999999" && pass === "1234"){
      navigate("/citizen");
    }else{
      setError("Invalid Citizen Credentials");
    }
  };

  return (
    <div className="content">
      <h1>Citizen Login</h1>

      <div className="card form">
        <input
          className="input"
          placeholder="Mobile Number"
          onChange={(e)=>setMobile(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e)=>setPass(e.target.value)}
        />

        <button className="action" onClick={login}>
          Login
        </button>

        <p className="high">{error}</p>
      </div>
    </div>
  );
}
function ProtectedRoute({ children }) {
  const user = auth.currentUser;

  return user
    ? children
    : <Navigate to="/ngo-login" replace />;
}
/* Main */
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/ngo-login" element={<NgoLogin />} />
        <Route path="/citizen-login" element={<CitizenLogin />} />

        <Route
path="/ngo"
element={
<ProtectedRoute>
<NgoDashboard />
</ProtectedRoute>
}
/>
        <Route path="/citizen" element={<CitizenPanel />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;