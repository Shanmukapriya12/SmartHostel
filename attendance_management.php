<?php

session_start();

if(!isset($_SESSION['warden_email'])){
    die("<!DOCTYPE html><html><head><title>Access Denied</title></head><body style='font-family:sans-serif;text-align:center;padding:80px;'><h2 style='color:#dc2626;'>&#128274; Access Denied</h2><p>This page is restricted to Warden login only.</p><a href='warden_login.php' style='color:#2563eb;'>Go to Warden Login</a></body></html>");
}

include("db.php");

if(isset($_POST['save_attendance'])){

    $date=date("Y-m-d");

    foreach($_POST['status'] as $student_id=>$status){

        $check=mysqli_query($conn,

        "SELECT * FROM attendance
        WHERE student_id='$student_id'
        AND attendance_date='$date'");

        if(mysqli_num_rows($check)==0){

            mysqli_query($conn,

            "INSERT INTO attendance
            (student_id,attendance_date,status,marked_by)

            VALUES

            ('$student_id',
            '$date',
            '$status',
            'Warden')");

        }

    }

    $success=true;

}

$students=mysqli_query($conn,

"SELECT * FROM students
ORDER BY name");

?>
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

<form method="POST">

<table class="table table-bordered">
<thead>

<tr>

<th>Student Name</th>

<th>Room No</th>

<th>Status</th>

</tr>

</thead>

<tbody>

<?php

while($row=mysqli_fetch_assoc($students)){

?>

<tr>

<td><?php echo $row['name']; ?></td>

<td><?php echo $row['room_number']; ?></td>

<td>

<select
name="status[<?php echo $row['id']; ?>]"
class="form-select">

<option value="Present">Present</option>

<option value="Absent">Absent</option>

<option value="Leave">Leave</option>

</select>

</td>

</tr>

<?php

}

?>

</tbody>

</table>

<button
type="submit"
name="save_attendance"
class="submit-btn">

Save Attendance

</button>

<?php
if(isset($success)){
?>

<div
class="success-box"
style="display:block;">

✅ Attendance marked successfully.

</div>

<?php
}
?>

</form>

</div>

</div>





</body>

</html>