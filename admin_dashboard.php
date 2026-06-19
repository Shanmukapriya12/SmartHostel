<?php
session_start();
if(!isset($_SESSION['admin'])){
    header("Location: admin_login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>Admin Dashboard</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
rel="stylesheet">

<link rel="stylesheet"
href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
rel="stylesheet">

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Poppins',sans-serif;
}

body{
background:#0f172a;
min-height:100vh;
color:white;
}

.container-box{
width:90%;
max-width:1350px;
margin:30px auto;
}

.top-bar{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:35px;
}

.left-section{
display:flex;
align-items:center;
gap:15px;
}

.back-btn{
text-decoration:none;
color:white;
font-size:18px;
font-weight:600;
}

.heading h1{
font-size:42px;
font-weight:700;
margin:0;
}

.heading p{
margin:0;
color:#94a3b8;
}

.admin-profile{
background:#1e293b;
padding:12px 18px;
border-radius:14px;
font-weight:600;
}

.stats-grid{
display:grid;
grid-template-columns:
repeat(auto-fit,minmax(220px,1fr));
gap:20px;
margin-bottom:35px;
}

.stats-card{
background:#1e293b;
padding:25px;
border-radius:20px;
box-shadow:0 5px 20px rgba(0,0,0,0.2);
}

.stats-icon{
font-size:38px;
margin-bottom:10px;
color:#38bdf8;
}

.stats-number{
font-size:38px;
font-weight:700;
}

.stats-title{
color:#94a3b8;
font-size:17px;
}

.dashboard-grid{
display:grid;
grid-template-columns:
repeat(auto-fit,minmax(280px,1fr));
gap:20px;
}

.dashboard-card{
background:#1e293b;
padding:25px;
border-radius:20px;
text-decoration:none;
color:white;
transition:0.3s;
box-shadow:0 5px 20px rgba(0,0,0,0.2);
}

.dashboard-card:hover{
transform:translateY(-5px);
background:#334155;
}

.card-icon{
font-size:40px;
margin-bottom:15px;
color:#38bdf8;
}

.dashboard-card h3{
font-size:24px;
font-weight:700;
margin-bottom:10px;
}

.dashboard-card p{
color:#cbd5e1;
margin:0;
}

</style>

</head>

<body>

<div class="container-box">

<div class="top-bar">

<div class="left-section">

<a href="index.php"
class="back-btn">

<i class="bi bi-arrow-left"></i>
Back

</a>

<div class="heading">

<h1>👨‍💼 Admin Dashboard</h1>

<p>
Central hostel monitoring and management
</p>

</div>

</div>

<div class="admin-profile">

<i class="bi bi-person-circle"></i>
Admin Panel

</div>

</div>

<div class="stats-grid">

<div class="stats-card">

<div class="stats-icon">
<i class="bi bi-people-fill"></i>
</div>

<div class="stats-number">
250
</div>

<div class="stats-title">
Total Students
</div>

</div>

<div class="stats-card">

<div class="stats-icon">
<i class="bi bi-person-badge-fill"></i>
</div>

<div class="stats-number">
8
</div>

<div class="stats-title">
Total Wardens
</div>

</div>

<div class="stats-card">

<div class="stats-icon">
<i class="bi bi-house-door-fill"></i>
</div>

<div class="stats-number">
120
</div>

<div class="stats-title">
Hostel Rooms
</div>

</div>

<div class="stats-card">

<div class="stats-icon">
<i class="bi bi-exclamation-triangle-fill"></i>
</div>

<div class="stats-number">
14
</div>

<div class="stats-title">
Critical Complaints
</div>

</div>

</div>

<div class="dashboard-grid">

<a href="student_overview.php"
class="dashboard-card">

<div class="card-icon">
<i class="bi bi-mortarboard-fill"></i>
</div>

<h3>Student Overview</h3>

<p>
Monitor all hostel students.
</p>

</a>

<a href="system_reports.php"
class="dashboard-card">

<div class="card-icon">
<i class="bi bi-bar-chart-fill"></i>
</div>

<h3>System Reports</h3>

<p>
View complete hostel analytics.
</p>

</a>

<a href="complaint_monitoring.php"
class="dashboard-card">

<div class="card-icon">
<i class="bi bi-chat-left-text-fill"></i>
</div>

<h3>Complaint Monitoring</h3>

<p>
Track escalated complaints.
</p>

</a>

<a href="mess_overview.php"
class="dashboard-card">

<div class="card-icon">
<i class="bi bi-cup-hot-fill"></i>
</div>

<h3>Mess Overview</h3>

<p>
Monitor food quality and schedules.
</p>

</a>

<a href="security_monitoring.php"
class="dashboard-card">

<div class="card-icon">
<i class="bi bi-shield-lock-fill"></i>
</div>

<h3>Security Monitoring</h3>

<p>
Monitor hostel security and gate activities.
</p>

</a>

<a href="system_settings.php"
class="dashboard-card">

<div class="card-icon">
<i class="bi bi-gear-fill"></i>
</div>

<h3>System Settings</h3>

<p>
Manage system permissions and settings.
</p>

</a>

</div>

</div>

</body>
</html>