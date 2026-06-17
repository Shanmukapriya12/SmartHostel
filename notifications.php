<?php

session_start();

include("db.php");

$phone=$_SESSION['student_phone'];

$student=mysqli_query($conn,
"SELECT * FROM students WHERE phone='$phone'");

$s=mysqli_fetch_assoc($student);

$data=mysqli_query($conn,

"SELECT * FROM notifications

WHERE student_id='".$s['id']."'
OR student_id IS NULL

ORDER BY created_at DESC");

?>
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


<!-- Notification 2 -->



<!-- Notification 3 -->



<!-- Notification 4 -->

<?php

if(mysqli_num_rows($data)>0){

while($row=mysqli_fetch_assoc($data)){

$icon="info";
$iconClass="info";

if($row['type']=="Leave"){

    $icon="clock-fill";
    $iconClass="pending";

}
elseif($row['type']=="Complaint"){

    $icon="check-circle-fill";
    $iconClass="success";

}
elseif($row['type']=="Rejected"){

    $icon="x-circle-fill";
    $iconClass="reject";

}

?>

<div class="notification-card">

<div class="icon <?php echo $iconClass; ?>">

<i class="bi bi-<?php echo $icon; ?>"></i>

</div>

<div class="notification-content">

<h4>

<?php echo $row['title']; ?>

</h4>

<p>

<?php echo $row['message']; ?>

</p>

<span class="time">

<?php echo $row['created_at']; ?>

</span>

</div>

</div>

<?php

}

}else{

?>

<div class="notification-card">

<div class="notification-content">

<h4>No Notifications</h4>

<p>You don't have any notifications yet.</p>

</div>

</div>

<?php

}

?>





</div>

</body>

</html>
