<?php
session_start();
if(!isset($_SESSION['admin'])){
    die("<!DOCTYPE html><html><head><title>Access Denied</title></head><body style='font-family:sans-serif;text-align:center;padding:80px;'><h2 style='color:#dc2626;'>&#128274; Access Denied</h2><p>This page is restricted to Admin login only.</p><a href='admin_login.php' style='color:#2563eb;'>Go to Admin Login</a></body></html>");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>System Reports</title>

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
color:white;
min-height:100vh;
}

.container-box{
width:90%;
max-width:1400px;
margin:30px auto;
}

.header{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:30px;
}

.left-header{
display:flex;
align-items:center;
gap:15px;
}

.back-btn{
text-decoration:none;
font-size:18px;
font-weight:600;
color:white;
}

.heading h2{
font-size:42px;
font-weight:700;
margin:0;
}

.heading p{
margin:0;
color:#94a3b8;
}

.download-btn{
background:#2563eb;
border:none;
padding:12px 20px;
border-radius:12px;
font-weight:600;
color:white;
}

.stats-grid{
display:grid;
grid-template-columns:
repeat(auto-fit,minmax(220px,1fr));
gap:20px;
margin-bottom:30px;
}

.stats-card{
background:#1e293b;
padding:25px;
border-radius:20px;
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

.report-section{
background:#1e293b;
padding:25px;
border-radius:20px;
margin-bottom:25px;
}

.section-title{
font-size:28px;
font-weight:700;
margin-bottom:20px;
}

.progress-item{
margin-bottom:20px;
}

.progress-label{
display:flex;
justify-content:space-between;
margin-bottom:8px;
font-size:17px;
}

.progress{
height:14px;
border-radius:20px;
background:#334155;
}

.progress-bar{
border-radius:20px;
}

.table-box{
overflow-x:auto;
}

table{
width:100%;
border-collapse:collapse;
}

th{
background:#334155;
padding:15px;
text-align:left;
}

td{
padding:15px;
border-bottom:1px solid #334155;
color:#e2e8f0;
}

.status-good{
background:#dcfce7;
color:#166534;
padding:6px 14px;
border-radius:20px;
font-weight:600;
display:inline-block;
}

.status-average{
background:#fef3c7;
color:#92400e;
padding:6px 14px;
border-radius:20px;
font-weight:600;
display:inline-block;
}

</style>

</head>

<body>

<div class="container-box">

<div class="header">

<div class="left-header">

<a href="admin_dashboard.php"
class="back-btn">

<i class="bi bi-arrow-left"></i>
Back

</a>

<div class="heading">

<h2>📊 System Reports</h2>

<p>
Complete hostel analytics and monitoring
</p>

</div>

</div>

<button class="download-btn"
onclick="downloadReport()">

<i class="bi bi-download"></i>
Download Report

</button>

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
<i class="bi bi-house-door-fill"></i>
</div>

<div class="stats-number">
180
</div>

<div class="stats-title">
Occupied Rooms
</div>

</div>

<div class="stats-card">

<div class="stats-icon">
<i class="bi bi-calendar-check-fill"></i>
</div>

<div class="stats-number">
92%
</div>

<div class="stats-title">
Attendance
</div>

</div>

<div class="stats-card">

<div class="stats-icon">
<i class="bi bi-chat-left-text-fill"></i>
</div>

<div class="stats-number">
14
</div>

<div class="stats-title">
Complaints
</div>

</div>

</div>

<div class="report-section">

<div class="section-title">

Hostel Performance

</div>

<div class="progress-item">

<div class="progress-label">

<span>Room Occupancy</span>
<span>90%</span>

</div>

<div class="progress">

<div class="progress-bar bg-primary"
style="width:90%"></div>

</div>

</div>

<div class="progress-item">

<div class="progress-label">

<span>Attendance Rate</span>
<span>92%</span>

</div>

<div class="progress">

<div class="progress-bar bg-success"
style="width:92%"></div>

</div>

</div>

<div class="progress-item">

<div class="progress-label">

<span>Complaint Resolution</span>
<span>80%</span>

</div>

<div class="progress">

<div class="progress-bar bg-warning"
style="width:80%"></div>

</div>

</div>

</div>

<div class="report-section">

<div class="section-title">

Monthly Hostel Summary

</div>

<div class="table-box">

<table>

<thead>

<tr>

<th>Category</th>
<th>This Month</th>
<th>Status</th>

</tr>

</thead>

<tbody>

<tr>

<td>New Admissions</td>
<td>35</td>

<td>
<span class="status-good">
Good
</span>
</td>

</tr>

<tr>

<td>Leave Requests</td>
<td>18</td>

<td>
<span class="status-average">
Average
</span>
</td>

</tr>

<tr>

<td>Complaints Solved</td>
<td>42</td>

<td>
<span class="status-good">
Good
</span>
</td>

</tr>

<tr>

<td>Mess Feedback</td>
<td>4.3 / 5</td>

<td>
<span class="status-good">
Good
</span>
</td>

</tr>

</tbody>

</table>

</div>

</div>
<script>

function downloadReport(){

alert(
"System Report Downloaded Successfully"
);

}

</script>

</body>
</html>