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

<title>System Settings</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Poppins',sans-serif;
}

body{
background:linear-gradient(135deg,#e0f2fe,#f8fafc);
min-height:100vh;
}

.container-box{
width:90%;
max-width:800px;
margin:40px auto;
}

.settings-card{

background:white;

padding:35px;

border-radius:20px;

box-shadow:0 5px 15px rgba(0,0,0,0.08);

}

h2{
font-weight:700;
margin-bottom:25px;
color:#1e293b;
}

.form-label{
font-weight:600;
}

.form-control{
height:50px;
border-radius:10px;
}

.btn-save{
background:#2563eb;
color:white;
padding:12px 30px;
border:none;
border-radius:10px;
font-weight:600;
}

.btn-save:hover{
background:#1d4ed8;
}

.back-btn{
text-decoration:none;
background:#64748b;
color:white;
padding:10px 18px;
border-radius:10px;
display:inline-block;
margin-bottom:20px;
}

.back-btn:hover{
background:#475569;
color:white;
}

</style>

</head>

<body>

<div class="container-box">

<a href="admin_dashboard.php" class="back-btn">
<i class="bi bi-arrow-left"></i> Back
</a>

<div class="settings-card">

<h2>
<i class="bi bi-gear-fill"></i>
System Settings
</h2>

<form>

<div class="mb-3">

<label class="form-label">
Hostel Name
</label>

<input type="text"
class="form-control"
value="Smart Hostel Management System">

</div>

<div class="mb-3">

<label class="form-label">
Admin Email
</label>

<input type="email"
class="form-control"
value="admin@hostel.com">

</div>

<div class="mb-3">

<label class="form-label">
Hostel Capacity
</label>

<input type="number"
class="form-control"
value="250">

</div>

<div class="mb-3">

<label class="form-label">
Maintenance Contact Number
</label>

<input type="text"
class="form-control"
value="9876543210">

</div>

<div class="mb-3">

<label class="form-label">
Hostel Address
</label>

<textarea class="form-control" rows="3">Saveetha Engineering College Hostel</textarea>

</div>
<div class="mb-3">

<label class="form-label">
Complaint Resolution Time (Days)
</label>

<input type="number"
class="form-control"
value="3">

</div>

<div class="mb-3">

<label class="form-label">
Room Allocation Method
</label>

<select class="form-control">

<option>First Come First Serve</option>

<option>Merit Based</option>

<option>Manual Allocation</option>

</select>

</div>

<button type="submit" class="btn-save">
<i class="bi bi-check-circle"></i>
Save Settings
</button>

</form>

</div>

</div>

</body>
</html>