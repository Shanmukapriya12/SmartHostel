<?php

session_start();

include("db.php");

$phone=$_SESSION['student_phone'];

$student=mysqli_query($conn,
"SELECT * FROM students WHERE phone='$phone'");

$s=mysqli_fetch_assoc($student);

$profile=mysqli_query($conn,
"SELECT * FROM student_profiles WHERE student_id='".$s['id']."'");

$p=mysqli_fetch_assoc($profile);

?>

<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>My Profile</title>

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

.profile-card{
background:white;
padding:30px;
border-radius:20px;
box-shadow:0 5px 20px rgba(0,0,0,0.08);
}

.profile-header{
text-align:center;
margin-bottom:30px;
}

.profile-img{
width:120px;
height:120px;
border-radius:50%;
object-fit:cover;
border:5px solid #dbeafe;
}

.profile-name{
font-size:28px;
font-weight:700;
margin-top:15px;
}

.profile-role{
color:#64748b;
}

.details-grid{
display:grid;
grid-template-columns:1fr 1fr;
gap:20px;
margin-top:25px;
}

.detail-box{
background:#f8fafc;
padding:18px;
border-radius:15px;
}

.detail-title{
font-size:14px;
color:#64748b;
margin-bottom:5px;
}

.detail-value{
font-size:18px;
font-weight:600;
color:#111827;
}

.edit-btn{
display:block;
width:100%;
margin-top:25px;
padding:14px;
background:#2563eb;
color:white;
text-decoration:none;
text-align:center;
border-radius:12px;
font-weight:600;
}

.edit-btn:hover{
background:#1d4ed8;
color:white;
}

@media(max-width:768px){

.details-grid{
grid-template-columns:1fr;
}

.heading h1{
font-size:32px;
}

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

<h1>My Profile</h1>

<p>View your student information</p>

</div>

</div>

<div class="profile-card">

<div class="profile-header">

<img
src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500"
class="profile-img">

<div class="profile-name">

<?php echo $s['name']; ?>

</div>

<div class="profile-role">

<?php echo $s['status']; ?>

</div>

</div>

<div class="details-grid">

<div class="detail-box">
<div class="detail-title">Register Number</div>
<?php echo $p['register_number']; ?>
</div>

<div class="detail-box">
<div class="detail-title">Department</div>
<div class="detail-value">

<?php echo $s['department']; ?>

</div>
</div>

<div class="detail-box">
<div class="detail-title">Year</div>
<?php echo $p['year']; ?>
</div>

<div class="detail-box">
<div class="detail-title">Email</div>
<div class="detail-value">

<?php echo $s['email']; ?>

</div>
</div>

<div class="detail-box">
<div class="detail-title">Phone Number</div>
<div class="detail-value">

<?php echo $s['phone']; ?>

</div>
</div>

<div class="detail-box">
<div class="detail-title">Room Number</div>
<div class="detail-value">

<?php echo $s['room_number']; ?>

</div>
</div>

<div class="detail-box">
<div class="detail-title">Hostel Block</div>
<?php echo $p['hostel_block']; ?>
</div>

<div class="detail-box">
<div class="detail-title">Parent Contact</div>
<?php echo $s['phone']; ?>
</div>

</div>

<a href="#"
class="edit-btn"
onclick="showMessage()">

Edit Profile

</a>

</div>

</div>

<script>

function showMessage(){

alert(
"Profile editing will be available after database integration."
);

}

</script>

</body>

</html>