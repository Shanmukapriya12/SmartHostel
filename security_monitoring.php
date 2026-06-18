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
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Security Monitoring</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

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
color:white;
font-size:18px;
font-weight:600;
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

.search-box input{
padding:12px;
border:none;
border-radius:12px;
background:#1e293b;
color:white;
width:280px;
}

.stats-grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
gap:20px;
margin-bottom:30px;
}

.stats-card{
background:#1e293b;
padding:25px;
border-radius:20px;
}

.stats-icon{
font-size:35px;
color:#38bdf8;
margin-bottom:10px;
}

.stats-number{
font-size:38px;
font-weight:700;
}

.stats-title{
color:#94a3b8;
}

.table-box{
background:#1e293b;
padding:25px;
border-radius:20px;
margin-bottom:25px;
overflow-x:auto;
}

.table-title{
font-size:26px;
font-weight:700;
margin-bottom:20px;
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
}

.status-out{
background:#fee2e2;
color:#b91c1c;
padding:6px 12px;
border-radius:20px;
font-weight:600;
}

.status-in{
background:#dcfce7;
color:#166534;
padding:6px 12px;
border-radius:20px;
font-weight:600;
}

</style>

</head>

<body>

<div class="container-box">

<div class="header">

<div class="left-header">

<a href="admin_dashboard.php" class="back-btn">

<i class="bi bi-arrow-left"></i>
Back

</a>

<div class="heading">

<h2>🛡 Security Monitoring</h2>

<p>Monitor hostel security and gate activities</p>

</div>

</div>

<div class="search-box">

<input
type="text"
id="searchInput"
placeholder="Search Student"
onkeyup="searchStudent()">

</div>

</div>

<div class="stats-grid">

<div class="stats-card">

<div class="stats-icon">
<i class="bi bi-shield-fill-check"></i>
</div>

<div class="stats-number">6</div>

<div class="stats-title">
Security Staff
</div>

</div>

<div class="stats-card">

<div class="stats-icon">
<i class="bi bi-box-arrow-right"></i>
</div>

<div class="stats-number">18</div>

<div class="stats-title">
Students Outside
</div>

</div>

<div class="stats-card">

<div class="stats-icon">
<i class="bi bi-people-fill"></i>
</div>

<div class="stats-number">24</div>

<div class="stats-title">
Visitors Today
</div>

</div>

<div class="stats-card">

<div class="stats-icon">
<i class="bi bi-exclamation-triangle-fill"></i>
</div>

<div class="stats-number">2</div>

<div class="stats-title">
Emergency Alerts
</div>

</div>

</div>

<div class="table-box">

<div class="table-title">

Student Gate Activity

</div>

<table id="studentTable">

<thead>

<tr>

<th>Name</th>
<th>Room</th>
<th>Out Time</th>
<th>In Time</th>
<th>Status</th>

</tr>

</thead>

<tbody>

<tr>

<td>Shanmukopriya</td>
<td>A-204</td>
<td>09:00 AM</td>
<td>06:30 PM</td>

<td>
<span class="status-in">
Inside
</span>
</td>

</tr>

<tr>

<td>Sruthi</td>
<td>B-105</td>
<td>05:00 PM</td>
<td>-</td>

<td>
<span class="status-out">
Outside
</span>
</td>

</tr>

<tr>

<td>Kavya</td>
<td>C-301</td>
<td>04:30 PM</td>
<td>-</td>

<td>
<span class="status-out">
Outside
</span>
</td>

</tr>

</tbody>

</table>

</div>
<div class="table-box">

<div class="table-title">

Visitor Register

</div>

<table>

<thead>

<tr>

<th>Visitor Name</th>
<th>Student Visiting</th>
<th>Date</th>
<th>Purpose</th>

</tr>

</thead>

<tbody>

<tr>

<td>Ramesh</td>
<td>Shanmukopriya</td>
<td>29-05-2026</td>
<td>Parent Visit</td>

</tr>

<tr>

<td>Lakshmi</td>
<td>Sruthi</td>
<td>29-05-2026</td>
<td>Document Submission</td>

</tr>

<tr>

<td>Kiran</td>
<td>Kavya</td>
<td>29-05-2026</td>
<td>Relative Visit</td>

</tr>

</tbody>

</table>

</div>

</div>

<script>

function searchStudent(){

let input =
document.getElementById(
'searchInput'
).value.toLowerCase();

let rows =
document.querySelectorAll(
'#studentTable tbody tr'
);

rows.forEach(row=>{

let text =
row.innerText.toLowerCase();

row.style.display =
text.includes(input)
?
''
:
'none';

});

}

</script>

</body>
</html>