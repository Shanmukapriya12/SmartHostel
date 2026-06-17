<?php

session_start();

include("db.php");

$phone=$_SESSION['student_phone'];

$student=mysqli_query($conn,
"SELECT * FROM students WHERE phone='$phone'");

$s=mysqli_fetch_assoc($student);

$id=$s['id'];

$total=mysqli_num_rows(mysqli_query($conn,
"SELECT * FROM attendance WHERE student_id='$id'"));

$present=mysqli_num_rows(mysqli_query($conn,
"SELECT * FROM attendance WHERE student_id='$id' AND status='Present'"));

$absent=mysqli_num_rows(mysqli_query($conn,
"SELECT * FROM attendance WHERE student_id='$id' AND status='Absent'"));

$leave=mysqli_num_rows(mysqli_query($conn,
"SELECT * FROM attendance WHERE student_id='$id' AND status='Leave'"));

$percentage=0;

if($total>0){

$percentage=round(($present/$total)*100);

}

$data=mysqli_query($conn,
"SELECT * FROM attendance
WHERE student_id='$id'
ORDER BY attendance_date DESC");

?>

<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Attendance</title>

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

.container-box{
width:90%;
max-width:1200px;
margin:30px auto;
}

.top-bar{
display:flex;
align-items:center;
gap:15px;
margin-bottom:25px;
}

.back-btn{
text-decoration:none;
font-weight:600;
color:#111827;
}

.heading h1{
font-size:42px;
font-weight:700;
margin:0;
}

.heading p{
color:#64748b;
}

/* Cards */

.summary{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:20px;
margin-bottom:25px;
}

.card-box{
background:white;
padding:25px;
border-radius:20px;
text-align:center;
box-shadow:0 5px 15px rgba(0,0,0,0.08);
}

.card-box h2{
font-size:32px;
font-weight:700;
}

.card-box p{
margin-top:10px;
color:#64748b;
}

/* Table */

.table-card{
background:white;
padding:25px;
border-radius:20px;
box-shadow:0 5px 15px rgba(0,0,0,0.08);
}

.table-card h4{
font-weight:700;
margin-bottom:20px;
}

.status-present{
color:#16a34a;
font-weight:600;
}

.status-absent{
color:#dc2626;
font-weight:600;
}

.status-leave{
color:#2563eb;
font-weight:600;
}

</style>

</head>

<body>

<div class="container-box">

<div class="top-bar">

<a href="student_dashboard.php" class="back-btn">

<i class="bi bi-arrow-left"></i> Back

</a>

<div class="heading">

<h1>Attendance</h1>

<p>View your hostel attendance records</p>

</div>

</div>

<!-- Summary -->

<div class="summary">

<div class="card-box">

<h2><?php echo $percentage; ?>%</h2>

<p>Attendance</p>

</div>

<div class="card-box">

<h2><?php echo $present; ?></h2>

<p>Present Days</p>

</div>

<div class="card-box">

<h2><?php echo $absent; ?></h2>

<p>Absent Days</p>

</div>

<div class="card-box">

<h2><?php echo $leave; ?></h2>

<p>Leave Days</p>

</div>

</div>

<!-- Records -->

<div class="table-card">

<h4>Attendance Records</h4>

<table class="table">

<thead>

<tr>

<th>Date</th>

<th>Status</th>

<th>Marked By</th>

</tr>

</thead>

<?php

while($row=mysqli_fetch_assoc($data)){

$class="status-present";

if($row['status']=="Absent"){

$class="status-absent";

}

elseif($row['status']=="Leave"){

$class="status-leave";

}

?>

<tr>

<td><?php echo $row['attendance_date']; ?></td>

<td class="<?php echo $class; ?>">

<?php echo $row['status']; ?>

</td>

<td><?php echo $row['marked_by']; ?></td>

</tr>

<?php

}

?>

</table>

</div>

</div>

</body>

</html>