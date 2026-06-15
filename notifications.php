<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Notifications</title>

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
background:linear-gradient(135deg,#dbeafe,#eef2ff,#f8fafc);
min-height:100vh;
}

.main-container{
width:85%;
max-width:1000px;
margin:30px auto;
}

.top-section{
display:flex;
align-items:center;
gap:15px;
margin-bottom:25px;
}

.back-btn{
text-decoration:none;
font-weight:600;
color:#111827;
font-size:18px;
}

.back-btn:hover{
color:#2563eb;
}

.heading h1{
font-size:42px;
font-weight:700;
margin:0;
}

.heading p{
color:#64748b;
}

.notification-card{
background:white;
padding:20px;
border-radius:18px;
margin-bottom:20px;
box-shadow:0 5px 15px rgba(0,0,0,0.08);
display:flex;
align-items:flex-start;
gap:15px;
transition:0.3s;
}

.notification-card:hover{
transform:translateY(-3px);
}

.icon{
width:55px;
height:55px;
border-radius:50%;
display:flex;
justify-content:center;
align-items:center;
font-size:24px;
color:white;
}

.pending{
background:#f59e0b;
}

.success{
background:#22c55e;
}

.reject{
background:#ef4444;
}

.info{
background:#3b82f6;
}

.notification-content h4{
font-size:18px;
font-weight:600;
margin-bottom:6px;
}

.notification-content p{
color:#64748b;
margin-bottom:6px;
}

.time{
font-size:13px;
color:#9ca3af;
}

</style>

</head>

<body>

<div class="main-container">

<div class="top-section">

<a href="student_dashboard.php" class="back-btn">

<i class="bi bi-arrow-left"></i> Back

</a>

<div class="heading">

<h1>Notifications</h1>

<p>Stay updated with hostel activities</p>

</div>

</div>

<!-- Notification 1 -->

<div class="notification-card">

<div class="icon pending">

<i class="bi bi-clock-fill"></i>

</div>

<div class="notification-content">

<h4>Leave Request Submitted</h4>

<p>
Your leave request has been sent to the warden.
Current Status: Pending 🟡
</p>

<span class="time">2 Minutes Ago</span>

</div>

</div>

<!-- Notification 2 -->

<div class="notification-card">

<div class="icon success">

<i class="bi bi-check-circle-fill"></i>

</div>

<div class="notification-content">

<h4>Complaint Resolved</h4>

<p>
Your room maintenance complaint has been resolved successfully.
</p>

<span class="time">1 Hour Ago</span>

</div>

</div>

<!-- Notification 3 -->

<div class="notification-card">

<div class="icon info">

<i class="bi bi-calendar-check-fill"></i>

</div>

<div class="notification-content">

<h4>Attendance Updated</h4>

<p>
Today's hostel attendance has been marked successfully.
</p>

<span class="time">Today</span>

</div>

</div>

<!-- Notification 4 -->

<div class="notification-card">

<div class="icon reject">

<i class="bi bi-x-circle-fill"></i>

</div>

<div class="notification-content">

<h4>Leave Request Rejected</h4>

<p>
Your previous leave request was rejected.
Reason: Attendance shortage.
</p>

<span class="time">Yesterday</span>

</div>

</div>

</div>

</body>

</html>
