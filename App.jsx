import React, { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

const DEFAULT_USERS = [
  { name: 'Demo User', email: 'user@demo.com', password: '123456', role: 'user' },
  { name: 'System Admin', email: 'admin@demo.com', password: 'admin123', role: 'admin' }
];
const read = (key, fallback) => {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; }
  catch { return fallback; }
};
const getUsers = () => {
  const users = read('ds_users', null);
  if (users) return users;
  localStorage.setItem('ds_users', JSON.stringify(DEFAULT_USERS));
  return DEFAULT_USERS;
};
const saveUsers = users => localStorage.setItem('ds_users', JSON.stringify(users));
const getReports = () => read('ds_reports', []);
const saveReports = reports => localStorage.setItem('ds_reports', JSON.stringify(reports));
const getSession = () => read('ds_session', null);
const setSession = session => localStorage.setItem('ds_session', JSON.stringify(session));
const logout = () => { localStorage.removeItem('ds_session'); window.location.href = '/login'; };

function Brand({ side = false }) {
  return <Link className={`brand ${side ? 'side-brand' : ''}`} to="/"><span className="brand-icon">✚</span> DisasterSafe</Link>;
}
function Protected({ role, children }) {
  const session = getSession();
  if (!session) return <Navigate to="/login" replace />;
  if (role && session.role !== role) return <Navigate to={session.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  return children;
}
function Home() {
  const [menu, setMenu] = useState(false);
  return <>
    <nav className="navbar">
      <Brand />
      <div className={`nav-links ${menu ? 'show' : ''}`}>
        <a href="#home" onClick={() => setMenu(false)}>Home</a><a href="#services" onClick={() => setMenu(false)}>Services</a>
        <a href="#alerts" onClick={() => setMenu(false)}>Alerts</a><a href="#preparedness" onClick={() => setMenu(false)}>Preparedness</a>
        <a href="#contact" onClick={() => setMenu(false)}>Contact</a>
      </div>
      <div className="nav-actions"><Link className="btn btn-outline" to="/login">Login</Link><Link className="btn btn-primary" to="/signup">Get Started</Link></div>
      <button className="menu-btn" onClick={() => setMenu(!menu)}>☰</button>
    </nav>
    <main>
      <section id="home" className="hero">
        <div className="hero-content"><span className="eyebrow">SMART • FAST • RESPONSIVE</span>
          <h1>Disaster management made <span>simple.</span></h1>
          <p>Monitor alerts, report incidents, manage emergency resources and keep communities prepared from one professional dashboard.</p>
          <div className="hero-buttons"><Link className="btn btn-primary btn-lg" to="/signup">Create Account →</Link><a className="btn btn-light btn-lg" href="#preparedness">Explore Safety Guide</a></div>
          <div className="hero-stats"><div><strong>24/7</strong><small>Monitoring</small></div><div><strong>4</strong><small>Response Areas</small></div><div><strong>100%</strong><small>Web Based</small></div></div>
        </div>
        <div className="hero-card"><div className="status-row"><span className="live-dot"></span> LIVE SYSTEM STATUS <span className="status-ok">OPERATIONAL</span></div>
          <div className="alert-card danger"><div className="alert-icon">⚠</div><div><strong>Emergency Alerts</strong><p>Receive important disaster notifications through your dashboard.</p></div></div>
          <div className="mini-grid"><div><span>🚨</span><b>Report</b><small>Incidents</small></div><div><span>🧭</span><b>Response</b><small>Coordination</small></div><div><span>📦</span><b>Resources</b><small>Inventory</small></div><div><span>📊</span><b>Analytics</b><small>Reports</small></div></div>
        </div>
      </section>
      <section id="services" className="section"><div className="section-head"><span className="eyebrow">CORE FEATURES</span><h2>Everything in one place</h2><p>A centralized platform for citizens, volunteers and administrators.</p></div>
        <div className="feature-grid"><article className="feature"><div className="feature-icon red">🚨</div><h3>Incident Reporting</h3><p>Submit disaster reports with location, category and description.</p></article>
          <article className="feature"><div className="feature-icon blue">📢</div><h3>Emergency Alerts</h3><p>View important warnings and safety information from administrators.</p></article>
          <article className="feature"><div className="feature-icon green">📦</div><h3>Resource Management</h3><p>Track shelters, medical supplies, rescue teams and essential resources.</p></article>
          <article className="feature"><div className="feature-icon purple">📈</div><h3>Dashboard Analytics</h3><p>View incidents, response activity and system statistics at a glance.</p></article></div>
      </section>
      <section id="alerts" className="section alt"><div className="section-head"><span className="eyebrow">SAFETY CENTER</span><h2>Current information</h2></div>
        <div className="alert-list"><div className="notice"><span className="notice-icon">ℹ</span><div><b>Stay informed</b><p>Always follow instructions issued by local emergency authorities.</p></div><span className="tag info">INFO</span></div>
          <div className="notice"><span className="notice-icon">✓</span><div><b>Emergency kit</b><p>Keep water, first-aid supplies, a flashlight and essential documents ready.</p></div><span className="tag safe">SAFETY</span></div>
          <div className="notice"><span className="notice-icon">☎</span><div><b>Emergency support</b><p>Use your local emergency services number when immediate assistance is required.</p></div><span className="tag help">HELP</span></div></div>
      </section>
      <section id="preparedness" className="section"><div className="section-head"><span className="eyebrow">BE PREPARED</span><h2>Simple preparedness checklist</h2></div>
        <div className="check-grid">{[['01','Make a plan','Know your evacuation routes and identify a family meeting point.'],['02','Build a kit','Prepare basic food, water, medicine, light and communication supplies.'],['03','Stay connected','Keep phones charged and follow verified emergency announcements.'],['04','Help safely','Assist others only when it is safe and within your training.']].map(x=><div className="check-card" key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div>
      </section>
      <section id="contact" className="section contact-section"><div><span className="eyebrow">CONTACT</span><h2>Need to report an incident?</h2><p>Log in to submit a report and track its status through your dashboard.</p></div><Link className="btn btn-primary btn-lg" to="/login">Open Dashboard →</Link></section>
    </main>
    <footer><div className="brand">✚ DisasterSafe</div><p>Disaster Management System • Educational Web Project</p><span>© 2026 DisasterSafe</span></footer>
  </>;
}
function AuthLayout({ signup = false, children }) {
  return <div className="auth-layout"><div className="auth-brand"><Brand /><div><span className="eyebrow">{signup ? 'JOIN THE PLATFORM' : 'DISASTER MANAGEMENT SYSTEM'}</span><h1>{signup ? <>Create your<br/><span>safe account.</span></> : <>Be prepared.<br/><span>Stay connected.</span></>}</h1><p>{signup ? 'Register to access incident reporting, alerts and your personal disaster management dashboard.' : 'Access alerts, incident reporting, resources and emergency information through your secure dashboard.'}</p></div><Link to="/" className="back-link">← Back to website</Link></div><div className="auth-box"><div className="auth-card">{children}</div></div></div>;
}
function Login() {
  const [email, setEmail] = useState(''), [password, setPassword] = useState(''), [show, setShow] = useState(false), [message, setMessage] = useState('');
  const navigate = useNavigate();
  function submit(e) {
    e.preventDefault();
    const user = getUsers().find(u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password);
    if (!user) { setMessage('Invalid email or password.'); return; }
    setSession({ name: user.name, email: user.email, role: user.role });
    navigate(user.role === 'admin' ? '/admin' : '/dashboard');
  }
  useEffect(() => { const s = getSession(); if (s) navigate(s.role === 'admin' ? '/admin' : '/dashboard'); }, [navigate]);
  return <AuthLayout><div className="auth-title"><span className="mobile-logo">✚</span><h2>Welcome back</h2><p>Sign in to your account</p></div>
    <div className="form-message error">{message}</div><form onSubmit={submit}>
      <label>Email address<input type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} required /></label>
      <label>Password<div className="password-wrap"><input type={show?'text':'password'} placeholder="Enter your password" value={password} onChange={e=>setPassword(e.target.value)} required/><button type="button" onClick={()=>setShow(!show)}>{show?'Hide':'Show'}</button></div></label>
      <div className="form-row"><label className="checkbox"><input type="checkbox"/> Remember me</label><span className="muted">Demo system</span></div>
      <button className="btn btn-primary full" type="submit">Sign In</button>
    </form><p className="switch">Don't have an account? <Link to="/signup">Create one</Link></p>
    <div className="demo-box"><b>Demo accounts</b><small>User: user@demo.com / 123456</small><small>Admin: admin@demo.com / admin123</small></div>
  </AuthLayout>;
}
function Signup() {
  const [name,setName]=useState(''),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[role,setRole]=useState('user'),[show,setShow]=useState(false),[message,setMessage]=useState('');
  const navigate=useNavigate();
  function submit(e) {
    e.preventDefault(); const users=getUsers(); const cleanEmail=email.trim().toLowerCase();
    if(users.some(u=>u.email.toLowerCase()===cleanEmail)){setMessage('An account with this email already exists.');return;}
    users.push({name:name.trim(),email:cleanEmail,password,role}); saveUsers(users); setMessage('Account created successfully. Redirecting to login...'); setTimeout(()=>navigate('/login'),800);
  }
  return <AuthLayout signup><div className="auth-title"><span className="mobile-logo">✚</span><h2>Create account</h2><p>It only takes a minute</p></div><div className="form-message error">{message}</div>
    <form onSubmit={submit}><label>Full name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your full name" required/></label>
      <label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required/></label>
      <label>Password<div className="password-wrap"><input type={show?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Minimum 6 characters" minLength="6" required/><button type="button" onClick={()=>setShow(!show)}>{show?'Hide':'Show'}</button></div></label>
      <label>Account type<select value={role} onChange={e=>setRole(e.target.value)}><option value="user">Citizen / User</option><option value="admin">Administrator</option></select></label>
      <label className="checkbox"><input type="checkbox" required/> I agree to use this educational system responsibly.</label>
      <button className="btn btn-primary full" type="submit">Create Account</button></form><p className="switch">Already have an account? <Link to="/login">Sign in</Link></p>
  </AuthLayout>;
}
function DashboardShell({admin=false,children}) {
  const [open,setOpen]=useState(false), session=getSession(), name=session?.name || 'User';
  const links=admin?[['#adminOverview','▦','Dashboard'],['#incidents','🚨','Incidents'],['#users','👥','Users'],['#system','⚙','System']]:[['#overview','▦','Overview'],['#report','🚨','Report Incident'],['#alerts','🔔','Alerts'],['#resources','📦','Resources'],['#safety','🛡','Safety Guide']];
  return <div className="dashboard"><aside className={`sidebar ${open?'open':''}`}><Brand side/><div className="profile"><div className="avatar">{name.charAt(0).toUpperCase()}</div><div><b>{name}</b><small>{admin?'Admin Account':'Citizen Account'}</small></div></div>
    <nav className="side-nav">{links.map(l=><a key={l[2]} href={l[0]} onClick={()=>setOpen(false)}>{l[1]} <span>{l[2]}</span></a>)}</nav><button className="logout side-logout" onClick={logout}>↪ Logout</button></aside>
    <div className="dashboard-main"><header className="dash-header"><button className="mobile-menu" onClick={()=>setOpen(!open)}>☰</button><div><span className="eyebrow">{admin?'ADMINISTRATION':'USER DASHBOARD'}</span><h1>{admin?`Welcome, ${name.split(' ')[0]}`:`Welcome back, ${name.split(' ')[0]}!`}</h1></div><div className="header-user"><div className="avatar small">{name.charAt(0).toUpperCase()}</div><button onClick={logout}>Logout</button></div></header><main className="dash-content">{children}</main></div>
  </div>;
}
function ReportsTable({reports,admin=false,onUpdate}) {
  if(!reports.length) return <div className="empty">No incident reports {admin?'available':'submitted yet'}.</div>;
  return <div className="report-table"><table><thead><tr>{(admin?['ID','User','Type','Location','Status','Action']:['ID','Type','Location','Status','Date']).map(x=><th key={x}>{x}</th>)}</tr></thead><tbody>{reports.map(r=><tr key={r.id}><td>{r.id}</td>{admin&&<td>{r.user}</td>}<td>{r.type}</td><td>{r.location}</td><td><span className={`status ${r.status.toLowerCase().replace(' ','-')}`}>{r.status}</span></td>{admin?<td><button className="table-btn" onClick={()=>onUpdate(r.id)}>Update</button></td>:<td>{r.date}</td>}</tr>)}</tbody></table></div>;
}
function UserDashboard() {
  const session=getSession(),[reports,setReports]=useState(getReports()),[type,setType]=useState(''),[location,setLocation]=useState(''),[description,setDescription]=useState(''),[message,setMessage]=useState('');
  const mine=reports.filter(r=>r.user===session.email);
  function submit(e){e.preventDefault();const next=[{id:'INC-'+Date.now().toString().slice(-6),user:session.email,type,location:location.trim(),description:description.trim(),status:'Pending',date:new Date().toLocaleString()},...reports];saveReports(next);setReports(next);setType('');setLocation('');setDescription('');setMessage('Incident report submitted successfully.');}
  return <DashboardShell><div id="overview" className="stat-grid"><div className="stat-card"><span className="stat-icon red">🚨</span><div><small>My Reports</small><strong>{mine.length}</strong></div></div><div className="stat-card"><span className="stat-icon blue">🔔</span><div><small>Active Alerts</small><strong>3</strong></div></div><div className="stat-card"><span className="stat-icon green">📦</span><div><small>Available Shelters</small><strong>12</strong></div></div><div className="stat-card"><span className="stat-icon purple">✓</span><div><small>System Status</small><strong className="online">Online</strong></div></div></div>
    <div className="dash-grid"><section id="report" className="panel"><div className="panel-head"><div><h2>Report an Incident</h2><p>Send an incident report to the system.</p></div><span className="panel-icon">🚨</span></div>
      <form className="dashboard-form" onSubmit={submit}><div className="two-col"><label>Incident type<select value={type} onChange={e=>setType(e.target.value)} required><option value="">Select type</option>{['Flood','Earthquake','Fire','Cyclone','Landslide','Other'].map(x=><option key={x}>{x}</option>)}</select></label><label>Location<input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Area / location" required/></label></div>
        <label>Description<textarea rows="4" value={description} onChange={e=>setDescription(e.target.value)} placeholder="Describe what happened..." required/></label><button className="btn btn-primary" type="submit">Submit Report</button><div className="form-message success">{message}</div></form></section>
      <section id="alerts" className="panel"><div className="panel-head"><div><h2>Emergency Alerts</h2><p>Latest system notifications.</p></div><span className="panel-icon">🔔</span></div>
        <div className="dash-alert danger"><b>General Safety Alert</b><small>Follow verified local authority instructions during emergencies.</small><span>Active</span></div><div className="dash-alert warning"><b>Preparedness Reminder</b><small>Keep essential supplies and emergency contacts accessible.</small><span>Info</span></div><div className="dash-alert safe"><b>System Operational</b><small>DisasterSafe dashboard services are available.</small><span>OK</span></div></section></div>
    <section id="resources" className="panel full-panel"><div className="panel-head"><div><h2>Emergency Resources</h2><p>Example resources managed by the system.</p></div></div><div className="resource-grid"><div><span>🏥</span><b>Medical Support</b><small>Emergency medical assistance</small></div><div><span>🏠</span><b>Safe Shelters</b><small>12 listed locations</small></div><div><span>🚒</span><b>Response Teams</b><small>Rescue coordination</small></div><div><span>💧</span><b>Relief Supplies</b><small>Water and essential items</small></div></div></section>
    <section id="safety" className="panel full-panel"><div className="panel-head"><div><h2>Safety Guide</h2><p>General preparedness information.</p></div></div><div className="guide-grid"><div><b>Before an emergency</b><p>Prepare a kit, plan evacuation routes and save important contacts.</p></div><div><b>During an emergency</b><p>Stay calm, move to a safer location and follow official instructions.</p></div><div><b>After an emergency</b><p>Avoid unsafe areas and report hazards through appropriate authorities.</p></div></div></section>
    <section className="panel full-panel"><div className="panel-head"><div><h2>My Recent Reports</h2><p>Reports submitted from this account.</p></div></div><ReportsTable reports={mine}/></section>
  </DashboardShell>;
}
function AdminDashboard() {
  const [reports,setReports]=useState(getReports()),[users,setUsers]=useState(getUsers());
  function update(id){const next=reports.map(r=>r.id!==id?r:{...r,status:r.status==='Pending'?'In Review':r.status==='In Review'?'Resolved':'Pending'});saveReports(next);setReports(next);}
  return <DashboardShell admin><div id="adminOverview" className="stat-grid"><div className="stat-card"><span className="stat-icon red">🚨</span><div><small>Total Incidents</small><strong>{reports.length}</strong></div></div><div className="stat-card"><span className="stat-icon blue">👥</span><div><small>Registered Users</small><strong>{users.length}</strong></div></div><div className="stat-card"><span className="stat-icon orange">⚠</span><div><small>Pending Reports</small><strong>{reports.filter(r=>r.status==='Pending').length}</strong></div></div><div className="stat-card"><span className="stat-icon green">✓</span><div><small>System Status</small><strong className="online">Healthy</strong></div></div></div>
    <section id="incidents" className="panel full-panel"><div className="panel-head"><div><h2>Incident Management</h2><p>Review reports submitted by users.</p></div><button className="btn btn-light" onClick={()=>setReports(getReports())}>Refresh</button></div><ReportsTable reports={reports} admin onUpdate={update}/></section>
    <div className="dash-grid"><section id="users" className="panel"><div className="panel-head"><div><h2>User Management</h2><p>Registered accounts on this demo system.</p></div></div>{users.map(u=><div className="user-row" key={u.email}><div className="avatar small">{u.name.charAt(0).toUpperCase()}</div><div><b>{u.name}</b><small>{u.email}</small></div><span className="role">{u.role}</span></div>)}</section>
      <section id="system" className="panel"><div className="panel-head"><div><h2>System Information</h2><p>Application configuration.</p></div></div><div className="system-list"><div><span>Application</span><b>DisasterSafe</b></div><div><span>Version</span><b>1.0.0</b></div><div><span>Storage</span><b>Browser LocalStorage</b></div><div><span>Mode</span><b>Educational Demo</b></div></div></section></div>
  </DashboardShell>;
}
export default function App() {
  return <Routes><Route path="/" element={<Home/>}/><Route path="/login" element={<Login/>}/><Route path="/signup" element={<Signup/>}/>
    <Route path="/dashboard" element={<Protected role="user"><UserDashboard/></Protected>}/>
    <Route path="/admin" element={<Protected role="admin"><AdminDashboard/></Protected>}/>
    <Route path="*" element={<Navigate to="/" replace/>}/></Routes>;
}