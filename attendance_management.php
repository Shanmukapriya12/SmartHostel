<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Attendance Management</title>

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
max-width:1200px;
margin:30px auto;
}

.header{
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

.heading h2{
font-weight:700;
margin:0;
}

.heading p{
margin:0;
color:#64748b;
}

.attendance-card{
background:white;
padding:25px;
border-radius:20px;
box-shadow:0 5px 15px rgba(0,0,0,0.08);
}

.table th{
background:#2563eb;
color:white;
}

.present{
background:#22c55e;
border:none;
color:white;
padding:6px 12px;
border-radius:8px;
}

.absent{
background:#ef4444;
border:none;
color:white;
padding:6px 12px;
border-radius:8px;
}

.leave{
background:#f59e0b;
border:none;
color:white;
padding:6px 12px;
border-radius:8px;
}

.submit-btn{
background:#2563eb;
color:white;
border:none;
padding:12px 20px;
border-radius:10px;
margin-top:20px;
font-weight:600;
}

.success-box{
display:none;
background:#dcfce7;
color:#166534;
padding:15px;
border-radius:10px;
margin-top:20px;
font-weight:600;
}

</style>

</head>

<body>

<div class="container-box">

<div class="header">

<a href="warden_dashboard.php" class="back-btn">

<i class="bi bi-arrow-left"></i> Back

</a>

<div class="heading">

<h2>Attendance Management</h2>

<p>Mark student attendance</p>

</div>

</div>

<div class="attendance-card">

<table class="table table-bordered">

<thead>

<tr>

<th>Student Name</th>

<th>Room No</th>

<th>Status</th>

</tr>

</thead>

<tbody>

<tr>

<td>Shanmukopriya</td>

<td>A-204</td>

<td>

<select class="form-select">

<option>Present</option>

<option>Absent</option>

<option>Leave</option>

</select>

</td>

</tr>

<tr>

<td>Sruthi</td>

<td>A-204</td>

<td>

<select class="form-select">

<option>Present</option>

<option>Absent</option>

<option>Leave</option>

</select>

</td>

</tr>

<tr>

<td>Hamsa</td>

<td>A-204</td>

<td>

<select class="form-select">

<option>Present</option>

<option>Absent</option>

<option>Leave</option>

</select>

</td>

</tr>

<tr>

<td>Leena</td>

<td>B-105</td>

<td>

<select class="form-select">

<option>Present</option>

<option>Absent</option>

<option>Leave</option>

</select>

</td>

</tr>

</tbody>

</table>

<button class="submit-btn" onclick="saveAttendance()">

Save Attendance

</button>

<div class="success-box" id="successBox">

✅ Attendance marked successfully.

</div>

</div>

</div>

<script>

function saveAttendance(){

document.getElementById(
"successBox"
).style.display="block";

setTimeout(()=>{

document.getElementById(
"successBox"
).style.display="none";

},3000);

}

</script>

</body>

</html>