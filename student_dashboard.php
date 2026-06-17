<?php

session_start();

include("db.php");

if(!isset($_SESSION['student_phone'])){

header("Location:student_login.php");

exit();

}

$phone=$_SESSION['student_phone'];

$query=mysqli_query($conn,"SELECT * FROM students WHERE phone='$phone'");

$row=mysqli_fetch_assoc($query);

?>

<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Student Dashboard</title>

<!-- Bootstrap -->

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Icons -->

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<!-- Google Font -->

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Poppins',sans-serif;
}

body{

    background:#eef2ff;

}

/* Navbar */

.navbar{

    padding:18px 40px;

    background:rgba(255,255,255,0.12);

    backdrop-filter:blur(15px);

    box-shadow:0 4px 20px rgba(0,0,0,0.2);

}

.logo{

    font-size:30px;

    font-weight:700;

   color:#2563eb;

}

.logout-btn{

    background:#ef4444;

    color:white;

    border:none;

    padding:10px 24px;

    border-radius:14px;

    font-weight:600;

    transition:0.3s;

}

.logout-btn:hover{

    background:#dc2626;

    transform:translateY(-3px);

}

/* Hero Section */

.hero{

    margin:30px;

    border-radius:30px;

    padding:55px;

    color:white;

    background:
    linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.45)),
    url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1974&auto=format&fit=crop');

    background-size:cover;

    background-position:center;

    box-shadow:0 10px 30px rgba(0,0,0,0.3);

}

.hero h1{

    font-size:52px;

    font-weight:700;

    margin-bottom:15px;

}

.hero p{

    width:60%;

    font-size:18px;

    color:#e2e8f0;

}

/* Dashboard */

.dashboard{

    padding:0 30px 40px;

}

/* Cards */

.card-box{

    background:rgba(255,255,255,0.14);

    backdrop-filter:blur(18px);

    border:1px solid rgba(255,255,255,0.2);

    border-radius:28px;

    padding:30px;

    transition:0.4s;

    height:100%;

    box-shadow:0 10px 25px rgba(0,0,0,0.2);

    cursor:pointer;

}

.card-box:hover{

    transform:translateY(-10px) scale(1.02);

}

/* Icon */

.icon-box{

    width:75px;

    height:75px;

    border-radius:22px;

    display:flex;

    justify-content:center;

    align-items:center;

    color:white;

    font-size:32px;

    margin-bottom:22px;

}

.blue{
    background:#2563eb;
}

.orange{
    background:#f97316;
}

.green{
    background:#10b981;
}

.purple{
    background:#9333ea;
}

.pink{
    background:#ec4899;
}

.indigo{
    background:#6366f1;
}

/* Card Text */

.card-box h4{

    color:#111827;
    font-size:26px;

    font-weight:700;

    margin-bottom:10px;

}

.card-box p{

    color:#6b7280;
    font-size:15px;

    line-height:1.7;

}
.warning{
background:#f59e0b;
}
/* Profile Section */

.profile-section{

    margin-top:40px;

    background:rgba(255,255,255,0.14);

    backdrop-filter:blur(18px);

    border:1px solid rgba(255,255,255,0.2);

    border-radius:30px;

    padding:30px;

    box-shadow:0 10px 25px rgba(0,0,0,0.2);

}

.profile-section img{

    width:100px;

    height:100px;

    border-radius:50%;

    object-fit:cover;

    border:4px solid white;

}

.profile-details h3{

    color:#111827;

    font-weight:700;

    margin-bottom:10px;

}

.profile-details p{

    color:#374151;

    font-size:16px;

    font-weight:500;

    margin-bottom:8px;

}

/* Notice */

.notice{

    margin-top:40px;

    background:linear-gradient(135deg,#2563eb,#4f46e5);

    padding:35px;

    border-radius:28px;

    color:white;

    box-shadow:0 10px 25px rgba(0,0,0,0.25);

}

.notice h4{

    font-weight:700;

    margin-bottom:15px;

}

.notice p{

    line-height:1.8;

}
.card-link{

    text-decoration:none;

    display:block;

}

/* Responsive */

@media(max-width:768px){

    .hero h1{

        font-size:36px;

    }

    .hero p{

        width:100%;

    }

}

</style>

</head>

<body>

<!-- Navbar -->

<nav class="navbar d-flex justify-content-between align-items-center">

<div class="logo">

Smart Hostel

</div>

<a href="logout.php" class="logout-btn">

Logout

</a>

</nav>

<!-- Hero -->

<div class="hero">

    <h1>

       Welcome Back,
<?php echo $row['name']; ?> 👋

    </h1>

    <p>

        Manage your hostel activities, complaints,
        room details, attendance and notifications
        easily with Smart Hostel Management System.

    </p>

</div>

<!-- Dashboard -->

<div class="dashboard">

    <div class="row g-4">

        <!-- My Room -->

        <div class="col-md-4">

            <a href="my_room.php" style="text-decoration:none;color:inherit;">

<div class="card-box">

    <div class="icon-box blue">
        <i class="bi bi-house-door-fill"></i>
    </div>

    <h4>My Room</h4>

    <p>
        View allocated room details and roommate information.
    </p>

</div>

</a>

        </div>

        <!-- Raise Complaint -->

        <div class="col-md-4">

            <a href="raise_complaint.php" class="card-link">

                <div class="card-box">

                    <div class="icon-box orange">

                        <i class="bi bi-tools"></i>

                    </div>

                    <h4>Raise Complaint</h4>

                    <p>
                        Submit maintenance and hostel complaints quickly.
                    </p>

                </div>

            </a>

        </div>

        <!-- Attendance -->

        <div class="col-md-4">

    <a href="attendance.php"
       style="text-decoration:none;color:inherit;">

        <div class="card-box">

            <div class="icon-box green">

                <i class="bi bi-calendar-check-fill"></i>

            </div>

            <h4>Attendance</h4>

            <p>
                Check hostel attendance and leave records.
            </p>

        </div>

    </a>

</div>
<div class="col-md-4">

    <a href="leave_request.php"
       style="text-decoration:none;color:inherit;">

        <div class="card-box">

            <div class="icon-box purple">

                <i class="bi bi-calendar2-check-fill"></i>

            </div>

            <h4>Leave Request</h4>

            <p>
                Apply for hostel leave and track approval status.
            </p>

        </div>

    </a>

</div>
        <!-- Fee Details -->

        <div class="col-md-4">

<a href="fee_details.php"
style="text-decoration:none;color:inherit;">

<div class="card-box">

<div class="icon-box green">

<i class="bi bi-cash-coin"></i>

</div>

<h4>Hostel Fees</h4>

<p>
View hostel fee status and payment details.
</p>

</div>

</a>

</div>
        <!-- Notifications -->
<div class="col-md-4">

<a href="notifications.php"
style="text-decoration:none;color:inherit;">

<div class="card-box">

<div class="icon-box pink">

<i class="bi bi-bell-fill"></i>

</div>

<h4>Notifications</h4>

<p>
View hostel updates and alerts.
</p>

</div>

</a>

</div>

        <!-- Profile -->

<div class="col-md-4">

<a href="profile.php"
style="text-decoration:none;color:inherit;">

<div class="card-box">

<div class="icon-box indigo">

<i class="bi bi-person-fill"></i>

</div>

<h4>My Profile</h4>

<p>
View and manage your profile information.
</p>

</div>

</a>

</div>

<!-- Mess Feedback -->

<div class="col-md-4">

<a href="mess_feedback.php"
style="text-decoration:none;color:inherit;">

<div class="card-box">

<div class="icon-box warning">

<i class="bi bi-star-fill"></i>

</div>

<h4>Mess Feedback</h4>

<p>
Rate food quality and give feedback.
</p>

</div>

</a>

</div>
    <!-- Profile Section -->

    <div class="profile-section">

        <div class="row align-items-center">

            <div class="col-md-2 text-center">

                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop">

            </div>

            <div class="col-md-10 profile-details">

                <h3><?php echo $row['name']; ?></h3>

<p>
Department :
<?php echo $row['department']; ?>
</p>

<p>
Room Number :
<?php echo $row['room_number']; ?>
</p>

<p>
Status :
<?php echo $row['status']; ?>
</p>

            </div>

        </div>

    </div>
    

    <!-- Notice -->

    <div class="notice">

        <h4>Latest Hostel Notice</h4>

        <p>

            Water maintenance work will be carried out tomorrow
            from 9:00 AM to 11:00 AM. Students are requested
            to cooperate with the hostel management.

        </p>

    </div>

</div>