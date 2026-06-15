<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>Reports</title>

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
background:linear-gradient(135deg,#ecfeff,#f0fdf4);
min-height:100vh;
}

.container-box{
width:90%;
max-width:1300px;
margin:30px auto;
}

.header{
display:flex;
align-items:center;
gap:15px;
margin-bottom:30px;
}

.back-btn{
text-decoration:none;
font-size:18px;
font-weight:600;
color:#111827;
}

.heading h2{
font-size:42px;
font-weight:700;
margin:0;
}

.heading p{
margin:0;
color:#64748b;
}

.report-grid{
display:grid;
grid-template-columns:
repeat(6,1fr);
gap:15px;
margin-bottom:30px;
}

.report-card{
background:white;
padding:18px;
border-radius:18px;
box-shadow:0 5px 15px rgba(0,0,0,0.08);
text-align:center;
}

.report-icon{
font-size:28px;
margin-bottom:8px;
color:#2563eb;
}

.report-number{
font-size:32px;
font-weight:700;
color:#111827;
}

.report-title{
font-size:15px;
color:#64748b;
}

.summary-box{
background:white;
padding:25px;
border-radius:20px;
box-shadow:0 5px 15px rgba(0,0,0,0.08);
margin-bottom:25px;
}

.summary-title{
font-size:28px;
font-weight:700;
margin-bottom:20px;
}

.progress{
height:25px;
border-radius:20px;
margin-bottom:20px;
}

.progress-bar{
font-weight:600;
font-size:15px;
}

.download-btn{
background:#2563eb;
color:white;
border:none;
padding:12px 18px;
border-radius:12px;
font-weight:600;
margin-top:10px;
}

</style>

</head>

<body>

<div class="container-box">

<div class="header">

<a href="warden_dashboard.php"
class="back-btn">

<i class="bi bi-arrow-left"></i>
Back

</a>

<div class="heading">

<h2>📊 Reports</h2>

<p>
Hostel analytics and summary reports
</p>

</div>

</div>

<div class="report-grid">
    <div class="report-card">

<div class="report-icon">
<i class="bi bi-people-fill"></i>
</div>

<div class="report-number">
250
</div>

<div class="report-title">
Total Students
</div>

</div>

<div class="report-card">

<div class="report-icon">
<i class="bi bi-house-door-fill"></i>
</div>

<div class="report-number">
180
</div>

<div class="report-title">
Occupied Rooms
</div>

</div>

<div class="report-card">

<div class="report-icon">
<i class="bi bi-house"></i>
</div>

<div class="report-number">
20
</div>

<div class="report-title">
Available Rooms
</div>

</div>

<div class="report-card">

<div class="report-icon">
<i class="bi bi-tools"></i>
</div>

<div class="report-number">
12
</div>

<div class="report-title">
Complaints
</div>

</div>

<div class="report-card">

<div class="report-icon">
<i class="bi bi-envelope-check-fill"></i>
</div>

<div class="report-number">
5
</div>

<div class="report-title">
Leave Requests
</div>

</div>

<div class="report-card">

<div class="report-icon">
<i class="bi bi-calendar-check-fill"></i>
</div>

<div class="report-number">
92%
</div>

<div class="report-title">
Attendance
</div>

</div>

</div>

<div class="summary-box">

<div class="summary-title">

Monthly Hostel Summary

</div>

<label>
Room Occupancy
</label>

<div class="progress">

<div class="progress-bar
bg-success"
style="width:85%">

85%

</div>

</div>

<label>
Student Attendance
</label>

<div class="progress">

<div class="progress-bar
bg-primary"
style="width:92%">

92%

</div>

</div>

<label>
Complaint Resolution
</label>

<div class="progress">

<div class="progress-bar
bg-warning"
style="width:76%">

76%

</div>

</div>

<label>
Leave Approval Rate
</label>

<div class="progress">

<div class="progress-bar
bg-danger"
style="width:60%">

60%

</div>

</div>

<button class="download-btn"
onclick="downloadReport()">

<i class="bi bi-download"></i>
Download Report

</button>

</div>
<script>

function downloadReport(){

alert(
"Report Downloaded Successfully 📊"
);

}

</script>

</body>
</html>