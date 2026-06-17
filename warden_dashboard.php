<?php

session_start();

if(!isset($_SESSION['warden_email'])){

header("Location:warden_login.php");

exit();

}

?>
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Warden Dashboard</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Poppins',sans-serif;
}

body{
background:linear-gradient(135deg,#e0f2fe,#f8fafc);
}

.container-box{
width:90%;
margin:30px auto;
}

.header{
background:white;
padding:20px;
border-radius:20px;
box-shadow:0 5px 15px rgba(0,0,0,0.08);
margin-bottom:25px;
display:flex;
justify-content:space-between;
align-items:center;
}

.header h2{
font-weight:700;
margin:0;
}

.header p{
margin:0;
color:#64748b;
}

.stats{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:20px;
margin-bottom:30px;
}

.stat-card{
background:white;
padding:20px;
border-radius:20px;
text-align:center;
box-shadow:0 5px 15px rgba(0,0,0,0.08);
}

.stat-card h3{
font-weight:700;
}

.dashboard{
display:grid;
grid-template-columns:repeat(3,1fr);
gap:20px;
}

.card-box{
background:white;
padding:25px;
border-radius:20px;
text-align:center;
text-decoration:none;
color:#111827;
box-shadow:0 5px 15px rgba(0,0,0,0.08);
transition:.3s;
}

.card-box:hover{
transform:translateY(-5px);
}

.icon{
font-size:40px;
margin-bottom:15px;
color:#2563eb;
}

.card-box h4{
font-weight:600;
margin-bottom:10px;
}

.card-box p{
color:#64748b;
font-size:14px;
}
.back-btn{

    display:inline-block;

    text-decoration:none;

    background:#2563eb;

    color:white;

    padding:8px 18px;

    border-radius:10px;

    font-size:14px;

    font-weight:500;

    margin-bottom:12px;

    transition:0.3s;

}

.back-btn:hover{

    background:#1d4ed8;

    color:white;

}

</style>

</head>

<body>

<div class="container-box">

<div class="header">

<div>
    <a href="select_role.php" class="back-btn">
    <i class="bi bi-arrow-left"></i> Back
</a>

<h2>Warden Dashboard</h2>

<p>Manage hostel operations efficiently</p>

</div>

<div>

<i class="bi bi-person-circle"
style="font-size:45px;color:#2563eb;"></i>

</div>

</div>

<!-- Statistics -->

<div class="stats">

<div class="stat-card">

<h3>250</h3>

<p>Students</p>

</div>

<div class="stat-card">

<h3>12</h3>

<p>Complaints</p>

</div>

<div class="stat-card">

<h3>5</h3>

<p>Leave Requests</p>

</div>

<div class="stat-card">

<h3>180</h3>

<p>Occupied Rooms</p>

</div>

</div>

<!-- Dashboard Cards -->

<div class="dashboard">

<a href="attendance_management.php" class="card-box">

<div class="icon">
<i class="bi bi-calendar-check"></i>
</div>

<h4>Take Attendance</h4>

<p>Mark daily hostel attendance.</p>

</a>

<a href="leave_requests.php" class="card-box">

<div class="icon">
<i class="bi bi-envelope-check"></i>
</div>

<h4>Leave Requests</h4>

<p>Approve or reject leave requests.</p>

</a>

<a href="complaints_management.php" class="card-box">

<div class="icon">
<i class="bi bi-tools"></i>
</div>

<h4>Complaints</h4>

<p>Manage student complaints.</p>

</a>

<a href="room_management.php" class="card-box">

<div class="icon">
<i class="bi bi-house-door"></i>
</div>

<h4>🏠 Room Management</h4>

<p>Assign rooms to students.</p>

</a>

<a href="students.php" class="card-box">

<div class="icon">
<i class="bi bi-people"></i>
</div>

<h4>Students</h4>

<p>View registered students.</p>

</a>

<a href="reports.php" class="card-box">

<div class="icon">
<i class="bi bi-bar-chart"></i>
</div>

<h4>Reports</h4>

<p>Generate hostel reports.</p>

</a>
<a href="mess_management.php" class="card-box">

<div class="icon">
<i class="bi bi-cup-hot-fill"></i>
</div>

<h4>Mess Management</h4>

<p>Manage hostel food and meals.</p>

</a>

</div>


</div>




</body>

</html>