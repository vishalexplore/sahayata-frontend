import { useState, useEffect } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function NgoDashboard() {
  const [noticeTitle, setNoticeTitle] = useState("");
const [noticeDate, setNoticeDate] = useState("");
const [noticeTime, setNoticeTime] = useState("");
const [noticeMsg, setNoticeMsg] = useState("");
const [notifyTitle, setNotifyTitle] = useState("");
const [notifyMsg, setNotifyMsg] = useState("");
const [notifyType, setNotifyType] = useState("Normal");
const [showNotifyForm, setShowNotifyForm] = useState(false);
const [searchTerm, setSearchTerm] = useState("");

const [notifications, setNotifications] = useState(
  JSON.parse(localStorage.getItem("notifications")) || []
);


const [notices, setNotices] = useState(
  JSON.parse(localStorage.getItem("notices")) || []
);
const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  const [cases, setCases] = useState([]);

useEffect(() => {
 fetch("https://sahayata-backend-dcpd.onrender.com/api/complaints")
 .then(res => res.json())
 .then(data => setCases(data));
}, []);

  const [budget, setBudget] = useState(
    JSON.parse(localStorage.getItem("budget")) || {
      total: 500000,
      used: 150000,
      donated: 200000
    }
  );

  const [members, setMembers] = useState(
    JSON.parse(localStorage.getItem("members")) || []
  );

  const [memberName, setMemberName] = useState("");
const [memberId, setMemberId] = useState("");
const [memberEmail, setMemberEmail] = useState("");
const [memberPhone, setMemberPhone] = useState("");
const [memberDept, setMemberDept] = useState("");
const [showForm, setShowForm] = useState(false);
  const [expense, setExpense] = useState("");
  const [donation, setDonation] = useState("");

  const [donorName, setDonorName] = useState("");

const [donationList, setDonationList] = useState(
  JSON.parse(localStorage.getItem("donationList")) || []
);

  useEffect(() => {
    localStorage.setItem(
      "budget",
      JSON.stringify(budget)
    );

    localStorage.setItem(
      "members",
      JSON.stringify(members)
    );
    localStorage.setItem(
  "notifications",
  JSON.stringify(notifications)
);
  }, [budget, members]);

  const solved =
    cases.filter(
      (item) => item.status === "Solved"
    ).length;

  const pending = cases.length - solved;
  const chartData = [
  { name: "Solved", value: solved },
  { name: "Pending", value: pending },
  { name: "Members", value: members.length },
  { name: "Donations", value: budget.donated },
  { name: "Used", value: budget.used }
];

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#3b82f6",
  "#a855f7",
  "#f59e0b"
];
    const markSolved = (index) => {
    const updated = [...cases];
    updated[index].status = "Solved";

    setCases(updated);

    localStorage.setItem(
      "complaints",
      JSON.stringify(updated)
    );
  };
  const assignMember = (index, name) => {
  const updated = [...cases];

  updated[index].assignedTo = name;

  setCases(updated);

  localStorage.setItem(
    "complaints",
    JSON.stringify(updated)
  );
};

  const addExpense = () => {
    if (!expense) return;

    setBudget({
      ...budget,
      used: budget.used + Number(expense)
    });

    setExpense("");
  };

  const addDonation = () => {
  if (!donation || !donorName) return;

  const newDonate = {
    name: donorName,
    amount: donation
  };

  setDonationList([
    ...donationList,
    newDonate
  ]);

  localStorage.setItem(
    "donationList",
    JSON.stringify([
      ...donationList,
      newDonate
    ])
  );

  setBudget({
    ...budget,
    total: budget.total + Number(donation),
    donated: budget.donated + Number(donation)
  });

  setDonation("");
  setDonorName("");
};

const addMember = () => {
  if (
    !memberName ||
    !memberId ||
    !memberEmail ||
    !memberPhone ||
    !memberDept
  ) return;

  const newMember = {
    name: memberName,
    id: memberId,
    email: memberEmail,
    phone: memberPhone,
    dept: memberDept
  };

  setMembers([...members, newMember]);

  setMemberName("");
  setMemberId("");
  setMemberEmail("");
  setMemberPhone("");
  setMemberDept("");

  setShowForm(false);
};

  return (
    <div className="layout">

      {/* Sidebar */}
      <div className={`sidebar ${menuOpen ? "show" : ""}`}>

        <h2>Sahayata NGO</h2>

        <button onClick={() => {setPage("dashboard");setMenuOpen(false);}}>🏠 Dashboard</button>

        <button onClick={() => {setPage("cases");setMenuOpen(false);}}>📢 Cases</button>

        <button onClick={() => {setPage("budget");setMenuOpen(false);}}>💰 Budget</button>

        <button onClick={() => {setPage("team");setMenuOpen(false);}}>👥 Team</button>

        <button onClick={() => {setPage("meeting");setMenuOpen(false);}}>📅 Meeting</button>

        <button onClick={() => {setPage("notify");setMenuOpen(false);}}>🔔 Notification</button>

        <button onClick={() => {setPage("analytics");setMenuOpen(false);}}>📊 Analytics</button>

      </div>

      {/* Main */}
      <div className="content">
        <div
style={{
display:"flex",
justifyContent:"flex-end",
marginBottom:"10px"
}}
>
<button
className="action"
style={{
background:"#dc2626"
}}
onClick={() => {
localStorage.removeItem("ngoLogin");
window.location.href="/";
}}
>
🚪 Logout
</button>
</div>

        <button
          className="menuBtn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰ Menu
        </button>
                {/* Dashboard */}
        {page === "dashboard" && (
          <>
            <h1>NGO Dashboard</h1>
            {cases.some(
(item)=>
item.priority === "High"
) && (

<div
className="card"
style={{
background:"#dc2626",
color:"white",
marginBottom:"20px"
}}
>

<h2>🚨 RED ALERT</h2>

<p>
High Priority Cases Need Immediate Action
</p>

<p>
Total Alerts:
{
cases.filter(
(item)=>
item.priority==="High"
).length
}
</p>

</div>

)}

            <div className="cards">

              <div className="card">
                <h3>Total Cases</h3>
                <p>{cases.length}</p>
              </div>

              <div className="card">
                <h3>Solved</h3>
                <p>{solved}</p>
              </div>

              <div className="card">
                <h3>Pending</h3>
                <p>{pending}</p>
              </div>

              <div className="card">
                <h3>Budget Left</h3>
                <p>₹{budget.total - budget.used}</p>
              </div>

              <div className="card">
                <h3>Total Donation</h3>
                <p>₹{budget.donated}</p>
              </div>

            </div>
          </>
        )}

        {/* Cases */}
        {page === "cases" && (
          <>
            <h1>All Complaints</h1>
            <input
className="input"
placeholder="🔍 Search by name, problem, priority..."
value={searchTerm}
onChange={(e)=>
setSearchTerm(e.target.value)
}

style={{
marginBottom:"20px"
}}
/>

            <div className="cards">
              {cases
.filter((item)=>

item.name
?.toLowerCase()
.includes(
searchTerm.toLowerCase()
)

||

item.problem
?.toLowerCase()
.includes(
searchTerm.toLowerCase()
)

||

item.priority
?.toLowerCase()
.includes(
searchTerm.toLowerCase()
)

||

item.status
?.toLowerCase()
.includes(
searchTerm.toLowerCase()
)

||

item.address
?.toLowerCase()
.includes(
searchTerm.toLowerCase()
)

)
.map((item,index)=>(
                <div className="card" key={index}>
                  <h3>{item.problem}</h3>
                  <p>{item.priority}</p>
                  <p>{item.status}</p>
                  <p>
Assigned:
{" "}
{item.assignedTo || "Not Assigned"}
</p>

<select
className="input"
onChange={(e)=>
assignMember(index, e.target.value)
}
>

<option>Select Member</option>

{members.map((m,i)=>(
<option key={i}>
{m.name}
</option>
))}


</select>

                  {item.status !== "Solved" && (
                    <button
                      className="action"
                      onClick={() => markSolved(index)}
                    >
                      Mark Solved
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Budget */}
{page === "budget" && (
  <>
    <h1>💰 Budget Management</h1>

    {/* Top Summary Cards */}
    <div className="cards">

      <div className="card">
        <h3>Total Fund</h3>
        <p>₹{budget.total}</p>
      </div>

      <div className="card">
        <h3>Used Fund</h3>
        <p>₹{budget.used}</p>
      </div>

      <div className="card">
        <h3>Remaining</h3>
        <p>₹{budget.total - budget.used}</p>
      </div>

      <div className="card">
        <h3>Total Donation</h3>
        <p>₹{budget.donated}</p>
      </div>

    </div>

    {/* Forms Layout */}
    <div className="cards">

      {/* Expense Form */}
      <div className="card form">

        <h3>📉 Add Expense</h3>

        <input
          className="input"
          placeholder="Expense Amount"
          value={expense}
          onChange={(e)=>setExpense(e.target.value)}
        />

        <button
          className="action"
          onClick={addExpense}
        >
          Save Expense
        </button>

      </div>

      {/* Donation Form */}
      <div className="card form">

        <h3>❤️ Add Donation</h3>

        <input
          className="input"
          placeholder="Donor Name"
          value={donorName}
          onChange={(e)=>setDonorName(e.target.value)}
        />

        <input
          className="input"
          placeholder="Donation Amount"
          value={donation}
          onChange={(e)=>setDonation(e.target.value)}
        />

        <button
          className="action"
          onClick={addDonation}
        >
          Add Donation
        </button>

      </div>

    </div>

    {/* Progress Bar */}
    <div className="card">
      <h3>📊 Budget Usage</h3>

      <div
        style={{
          width:"100%",
          height:"18px",
          background:"#e5e7eb",
          borderRadius:"10px",
          overflow:"hidden"
        }}
      >
        <div
          style={{
            width:`${(budget.used / budget.total)*100}%`,
            height:"100%",
            background:"#0284c7"
          }}
        ></div>
      </div>

      <p style={{marginTop:"10px"}}>
        {Math.round((budget.used / budget.total)*100)}% Used
      </p>
    </div>

    {/* Donation History */}
    <div className="card">
      <h3>❤️ Donation History</h3>

      {donationList.length === 0 && (
        <p>No Donations Yet</p>
      )}

      {donationList.map((d,index)=>(
        <div
          key={index}
          style={{
            display:"flex",
            justifyContent:"space-between",
            padding:"10px 0",
            borderBottom:"1px solid #eee"
          }}
        >
          <span>{d.name}</span>
          <span>₹{d.amount}</span>
        </div>
      ))}

    </div>

  </>
)}
                {/* Team */}
        {page === "team" && (
  <>
    <div
      style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
      }}
    >
      <h1>Team Manager</h1>

      <button
        className="action"
        onClick={() => setShowForm(!showForm)}
      >
        ➕ Add Member
      </button>
      <button
className="action"
style={{background:"#dc2626", marginLeft:"10px"}}
onClick={() => {
setMembers([]);
localStorage.removeItem("members");
}}
>
🗑 Reset Team
</button>
    </div>

    {showForm && (
      <div className="card form">

        <input
          className="input"
          placeholder="Full Name"
          value={memberName}
          onChange={(e)=>setMemberName(e.target.value)}
        />

        <input
          className="input"
          placeholder="NGO ID"
          value={memberId}
          onChange={(e)=>setMemberId(e.target.value)}
        />

        <input
          className="input"
          placeholder="Email"
          value={memberEmail}
          onChange={(e)=>setMemberEmail(e.target.value)}
        />

        <input
          className="input"
          placeholder="Contact Number"
          value={memberPhone}
          onChange={(e)=>setMemberPhone(e.target.value)}
        />

        <input
          className="input"
          placeholder="Department"
          value={memberDept}
          onChange={(e)=>setMemberDept(e.target.value)}
        />

        <button
          className="action"
          onClick={addMember}
        >
          Save Member
        </button>

      </div>
    )}

    <div className="cards">

      {members.length === 0 && (
        <div className="card">
          <h3>No Members Added</h3>
        </div>
      )}

      {members.map((m,index) => (
        <div className="card" key={index}>
          <h3>{m.name}</h3>
          <p>ID: {m.id}</p>
          <p>Email: {m.email}</p>
          <p>Phone: {m.phone}</p>
          <p>Dept: {m.dept}</p>
        </div>
      ))}

    </div>
  </>
)}

       {/* Meeting */}
{page === "meeting" && (
  <>
    <div
      style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        gap:"10px"
      }}
    >
      <h1>📅 Meeting & Notice Center</h1>

      <button
        className="action"
        onClick={() =>
          setShowNoticeForm(!showNoticeForm)
        }
      >
        ➕ Add Notice
      </button>
    </div>

    {/* Hidden Form */}
    {showNoticeForm && (
      <div className="card form">

        <h3>Create New Notice</h3>

        <input
          className="input"
          placeholder="Meeting Title"
          value={noticeTitle}
          onChange={(e)=>setNoticeTitle(e.target.value)}
        />

        <input
          className="input"
          type="date"
          value={noticeDate}
          onChange={(e)=>setNoticeDate(e.target.value)}
        />

        <input
          className="input"
          type="time"
          value={noticeTime}
          onChange={(e)=>setNoticeTime(e.target.value)}
        />

        <textarea
          className="input"
          rows="4"
          placeholder="Write Notice / Agenda"
          value={noticeMsg}
          onChange={(e)=>setNoticeMsg(e.target.value)}
        ></textarea>

        <button
          className="action"
          onClick={() => {

            if(
              !noticeTitle ||
              !noticeDate ||
              !noticeTime ||
              !noticeMsg
            ) return;

            const newNotice = {
              title: noticeTitle,
              date: noticeDate,
              time: noticeTime,
              msg: noticeMsg
            };

            const updated = [
              ...notices,
              newNotice
            ];

            setNotices(updated);

            localStorage.setItem(
              "notices",
              JSON.stringify(updated)
            );

            alert(
              "Notice Sent To All Members 🔔"
            );

            setNoticeTitle("");
            setNoticeDate("");
            setNoticeTime("");
            setNoticeMsg("");

            setShowNoticeForm(false);

          }}
        >
          🔔 Send Notice
        </button>

      </div>
    )}

    {/* Sent Notices */}
    <div className="card">
      <h3>📢 Sent Notices</h3>

      {notices.length === 0 && (
        <p>No Notices Sent Yet</p>
      )}

      {notices.map((n,index)=>(
        <div
          key={index}
          style={{
            padding:"12px 0",
            borderBottom:"1px solid #eee"
          }}
        >
          <h4>{n.title}</h4>
          <p>📅 {n.date}</p>
          <p>⏰ {n.time}</p>
          <p>{n.msg}</p>
        </div>
      ))}

    </div>

    {/* Stats */}
    <div className="cards">

      <div className="card">
        <h3>Total Members</h3>
        <p>{members.length}</p>
      </div>

      <div className="card">
        <h3>Total Notices</h3>
        <p>{notices.length}</p>
      </div>

      <div className="card">
        <h3>Status</h3>
        <p>All Members Notified</p>
      </div>

    </div>

  </>
)}

        {/* Notification */}
       {page === "notify" && (
  <>
    <div
      style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        gap:"10px"
      }}
    >
      <h1>🔔 Notification Center</h1>

      <button
        className="action"
        onClick={() =>
          setShowNotifyForm(!showNotifyForm)
        }
      >
        ➕ Add Notification
      </button>
    </div>

    {/* Hidden Form */}
    {showNotifyForm && (
      <div className="card form">

        <input
          className="input"
          placeholder="Notification Title"
          value={notifyTitle}
          onChange={(e)=>setNotifyTitle(e.target.value)}
        />

        <select
          className="input"
          value={notifyType}
          onChange={(e)=>setNotifyType(e.target.value)}
        >
          <option>Normal</option>
          <option>Urgent</option>
          <option>High Priority</option>
        </select>

        <textarea
          className="input"
          rows="4"
          placeholder="Write Message"
          value={notifyMsg}
          onChange={(e)=>setNotifyMsg(e.target.value)}
        ></textarea>

        <button
          className="action"
          onClick={() => {

            if(!notifyTitle || !notifyMsg)
            return;

            const newNotify = {
              title: notifyTitle,
              type: notifyType,
              msg: notifyMsg
            };

            const updated = [
              ...notifications,
              newNotify
            ];

            setNotifications(updated);

            localStorage.setItem(
              "notifications",
              JSON.stringify(updated)
            );

            alert(
              "Notification Sent 🔔"
            );

            setNotifyTitle("");
            setNotifyMsg("");
            setNotifyType("Normal");

            setShowNotifyForm(false);

          }}
        >
          Send Notification
        </button>

      </div>
    )}

    {/* Sent Notifications */}
    <div className="card">
      <h3>📢 Sent Notifications</h3>

      {notifications.length === 0 && (
        <p>No Notifications Yet</p>
      )}

      {notifications.map((n,index)=>(
        <div
          key={index}
          style={{
            padding:"12px 0",
            borderBottom:"1px solid #eee"
          }}
        >
          <h4>{n.title}</h4>
          <p>⚡ {n.type}</p>
          <p>{n.msg}</p>
        </div>
      ))}

    </div>

    {/* Stats */}
    <div className="cards">

      <div className="card">
        <h3>Total Notifications</h3>
        <p>{notifications.length}</p>
      </div>

      <div className="card">
        <h3>Members</h3>
        <p>{members.length}</p>
      </div>

      <div className="card">
        <h3>Status</h3>
        <p>Delivered</p>
      </div>

    </div>

  </>
)}

        {/* Analytics */}
        {page === "analytics" && (
  <>
    <h1>📊 Live Analytics</h1>

    <div className="cards">

      <div className="card">
        <h3>Total Cases</h3>
        <p>{cases.length}</p>
      </div>

      <div className="card">
        <h3>Members</h3>
        <p>{members.length}</p>
      </div>

      <div className="card">
        <h3>Solved</h3>
        <p>{solved}</p>
      </div>

    </div>

    <div className="cards">

      {/* Cases Chart */}
      <div className="card">
        <h3>📢 Cases Graph</h3>

        <div style={{width:"100%",height:"320px"}}>

          <ResponsiveContainer>
            <PieChart>

              <Pie
                data={[
                  {name:"Solved", value: solved},
                  {name:"Pending", value: pending},
                  {name:"Members", value: members.length}
                ]}
                dataKey="value"
                outerRadius={100}
                label
              >
                <Cell fill="#22c55e"/>
                <Cell fill="#ef4444"/>
                <Cell fill="#3b82f6"/>
              </Pie>

              <Tooltip/>

            </PieChart>
          </ResponsiveContainer>

        </div>
      </div>

      {/* Budget Chart */}
      <div className="card">
        <h3>💰 Budget Graph</h3>

        <div style={{width:"100%",height:"320px"}}>

          <ResponsiveContainer>
            <PieChart>

              <Pie
                data={[
                  {name:"Used", value: budget.used},
                  {name:"Remaining", value: budget.total-budget.used},
                  {name:"Donation", value: budget.donated}
                ]}
                dataKey="value"
                outerRadius={100}
                label
              >
                <Cell fill="#f59e0b"/>
                <Cell fill="#22c55e"/>
                <Cell fill="#a855f7"/>
              </Pie>

              <Tooltip/>

            </PieChart>
          </ResponsiveContainer>

        </div>
      </div>

    </div>
  </>
)}

      </div>
    </div>
  );
}

export default NgoDashboard;