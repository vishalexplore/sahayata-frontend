import { useState, useEffect } from "react";

function CitizenPanel() {
  const [filterType, setFilterType] = useState("");
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const [name, setName] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [address, setAddress] = useState("");
  const [problem, setProblem] = useState("Food Need");
  const [priority, setPriority] = useState("Normal");
  const [message, setMessage] = useState("");

  const [receipt, setReceipt] = useState("");

  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
  fetch("https://sahayata-backend-dcpd.onrender.com/api/complaints")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setComplaints(data);
    })
    .catch((err) => console.log(err));
}, []);
     const submitComplaint = async () => {

  try {

    if(
      !name ||
      !aadhaar ||
      !address ||
      !message
    ) {
      alert("Fill all fields");
      return;
    }

   let aiPriority = "Normal";

const text =
message.toLowerCase();

if(
text.includes("urgent") ||
text.includes("ambulance") ||
text.includes("blood") ||
text.includes("accident") ||
text.includes("unsafe") ||
text.includes("rape") ||
text.includes("fire")
){
aiPriority = "High";
}
else if(
text.includes("food") ||
text.includes("water") ||
text.includes("medicine") ||
text.includes("flood")
){
aiPriority = "Medium";
}

const newComplaint = {
name,
aadhaar,
address,
problem,
priority: aiPriority,
message
};

    const res = await fetch(
      "https://sahayata-backend-dcpd.onrender.com/api/complaints",
      {
        method:"POST",
        headers:{
          "Content-Type":
          "application/json"
        },
        body: JSON.stringify(
          newComplaint
        )
      }
    );

    const data = await res.json();

    alert(data.message);

    // reload complaints
    const reload = await fetch(
      "https://sahayata-backend-dcpd.onrender.com/api/complaints"
    );

    const updated =
      await reload.json();

    setComplaints(updated);

    setName("");
    setAadhaar("");
    setAddress("");
    setMessage("");

    setPage("home");

  } catch(err) {

    console.log(err);
    alert("Server Error");

  }

};
  return (
    <div className="layout">

      {/* Sidebar */}
     <div className={`sidebar ${menuOpen ? "show" : ""}`}>

        <h2>Sahayata Citizen</h2>

        <button onClick={() => {
setPage("home");
setMenuOpen(false);
}}>
🏠 Home
</button>

<button onClick={() => {
setPage("complaint");
setMenuOpen(false);
}}>
📢 Complaint
</button>

<button onClick={() => {
setPage("track");
setMenuOpen(false);
}}>
📍 Track
</button>

<button onClick={() => {
setPage("help");
setMenuOpen(false);
}}>
☎ Help
</button>

      </div>

      {/* Main */}
      <div className="content">

        <button
          className="menuBtn"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰ Menu
        </button>
                {/* Home */}
        {page === "home" && (
  <>
    <h1>Citizen Premium Dashboard</h1>

    <div className="cards">

      <div
        className="card"
        onClick={() => setFilterType("All")}
      >
        <h3>Total Complaints</h3>
        <p>{complaints.length}</p>
      </div>

      <div
        className="card"
        onClick={() => setFilterType("Pending")}
      >
        <h3>Pending</h3>
        <p>
          {
            complaints.filter(
              (c)=>c.status==="Pending"
            ).length
          }
        </p>
      </div>

      <div
        className="card"
        onClick={() => setFilterType("Solved")}
      >
        <h3>Solved</h3>
        <p>
          {
            complaints.filter(
              (c)=>c.status==="Solved"
            ).length
          }
        </p>
      </div>
      <div className="card">

<h3>🚨 Emergency Help</h3>

<p>One click urgent complaint</p>

<button
className="action"
style={{
background:"#dc2626"
}}
onClick={async () => {

await fetch(
"https://sahayata-backend-dcpd.onrender.com/api/complaints",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
name:"Emergency User",
aadhaar:"N/A",
address:"Unknown",
problem:"Emergency SOS",
priority:"High",
message:"Immediate help needed"
})
}
);

alert("SOS Sent 🔥");

}}
>
🚨 Send SOS
</button>

</div>

    </div>

    {/* Detail List */}
    {filterType && (
      <div className="card">
        <h3>{filterType} Complaints</h3>

        {complaints
          .filter((c)=>
            filterType==="All"
            ? true
            : c.status===filterType
          )
          .map((c,index)=>(
            <div
              key={index}
              style={{
                padding:"10px 0",
                borderBottom:"1px solid #eee"
              }}
            >
              <p>{c.problem}</p>
              <p>ID: {c._id.slice(-6)}</p>
              <p>Status: {c.status}</p>
            </div>
        ))}

      </div>
    )}

  </>
)}
        {/* Complaint */}
        {page === "complaint" && (
          <>
            <h1>📢 Raise Complaint</h1>

            <div className="card form">

              <input
                className="input"
                placeholder="Full Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />

              <input
                className="input"
                placeholder="Aadhaar Number"
                value={aadhaar}
                onChange={(e)=>setAadhaar(e.target.value)}
              />

              <input
                className="input"
                placeholder="Address"
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
              />

              <select
                className="input"
                value={problem}
                onChange={(e)=>setProblem(e.target.value)}
              >
                <option>Food Need</option>
                <option>Medical Help</option>
                <option>Water</option>
                <option>Shelter</option>
                <option>Women Safety</option>
              </select>

              <select
                className="input"
                value={priority}
                onChange={(e)=>setPriority(e.target.value)}
              >
                <option>Normal</option>
                <option>Urgent</option>
                <option>High</option>
              </select>

              <textarea
                className="input"
                rows="4"
                placeholder="Describe Problem"
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
              ></textarea>

              <button
                className="action"
                onClick={submitComplaint}
              >
                Submit Complaint
              </button>

            </div>
          </>
        )}
                  {/* Track */}
        {page === "track" && (
          <>
            <h1>📍 Complaint Tracking</h1>

            <div className="cards">

              {complaints.length === 0 && (
                <div className="card">
                  <p>No Complaints Found</p>
                </div>
              )}

              {complaints.map((c,index)=>(
                <div
                  className="card"
                  key={index}
                >
                  <h3>{c.problem}</h3>
                  <p>ID: {c._id.slice(-6)}</p>
                  <p>Status: {c.status}</p>
                  <p>Priority: {c.priority}</p>
                </div>
              ))}

            </div>
          </>
        )}

        {/* Help */}
        {page === "help" && (
  <>
    <h1>☎ Emergency Help Center</h1>

    <div className="cards">

      <a href="tel:112" className="card">
        <h1>🚨</h1>
        <h3>National Emergency</h3>
        <p>Call 112</p>
      </a>

      <a href="tel:100" className="card">
        <h1>👮</h1>
        <h3>Police</h3>
        <p>Call 100</p>
      </a>

      <a href="tel:101" className="card">
        <h1>🔥</h1>
        <h3>Fire Brigade</h3>
        <p>Call 101</p>
      </a>

      <a href="tel:108" className="card">
        <h1>🚑</h1>
        <h3>Ambulance</h3>
        <p>Call 108</p>
      </a>

      <a href="tel:1091" className="card">
        <h1>👩</h1>
        <h3>Women Helpline</h3>
        <p>Call 1091</p>
      </a>

      <a href="tel:1098" className="card">
        <h1>🧒</h1>
        <h3>Child Helpline</h3>
        <p>Call 1098</p>
      </a>

      <a href="tel:1930" className="card">
        <h1>💻</h1>
        <h3>Cyber Fraud</h3>
        <p>Call 1930</p>
      </a>

      <a href="tel:1070" className="card">
        <h1>🌪</h1>
        <h3>Disaster Help</h3>
        <p>Call 1070</p>
      </a>

    </div>
  </>
)}

        {/* Receipt */}
        {page === "receipt" && (
          <>
            <h1>✅ Complaint Submitted</h1>

            <div className="card">
              <h3>Receipt ID</h3>
              <p>{receipt}</p>
              <p>Your request sent to NGO</p>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default CitizenPanel;