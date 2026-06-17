<?php
session_start();
include("db.php");

$message = "";

if(isset($_POST['send_otp'])){

    $phone = $_POST['phone'];

    $check = mysqli_query($conn,
    "SELECT * FROM students WHERE phone='$phone'");

    if(mysqli_num_rows($check)>0){

        $_SESSION['phone']=$phone;

        $otp = rand(1000,9999);

        $_SESSION['otp']=$otp;

        $message="Demo OTP : ".$otp;

    }else{

        $message="Phone Number Not Registered";

    }

}

if(isset($_POST['verify_otp'])){

    $entered_otp=$_POST['entered_otp'];

    if($entered_otp==$_SESSION['otp']){

        $_SESSION['student_phone']
        =$_SESSION['phone'];

        header("Location:student_dashboard.php");

        exit();

    }else{

        $message="Invalid OTP";

    }

}
?>

<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Student OTP Login</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Poppins',sans-serif;
}

body{

    height:100vh;

    display:flex;
    justify-content:center;
    align-items:center;

    background:linear-gradient(
    135deg,
    #f8fafc 0%,
    #e0f2fe 50%,
    #dbeafe 100%
    );

}

/* Login Card */

.login-card{

    width:430px;

    background:white;

    border-radius:30px;

    padding:45px;

    color:#1e293b;

    box-shadow:0 15px 40px rgba(37,99,235,0.15);

}

/* Logo */

.logo{

    width:90px;
    height:90px;

    background:linear-gradient(
    135deg,
    #2563eb,
    #3b82f6
    );

    border-radius:25px;

    margin:auto;

    display:flex;
    justify-content:center;
    align-items:center;

    margin-bottom:25px;

    box-shadow:0 10px 25px rgba(37,99,235,0.25);

}

.logo i{

    font-size:40px;
    color:white;

}

/* Heading */

.login-card h1{

    text-align:center;

    font-size:36px;

    font-weight:700;

    margin-bottom:10px;

    color:#1e3a8a;

}

.login-card p{

    text-align:center;

    color:#64748b;

    margin-bottom:35px;

}

/* Input */

.input-box{

    position:relative;

    margin-bottom:25px;

}

.input-box i{

    position:absolute;

    top:18px;

    left:18px;

    color:#3b82f6;

}

.form-control{

    height:58px;

    border:1px solid #cbd5e1;

    border-radius:15px;

    padding-left:50px;

    background:#f8fafc;

    color:#1e293b;

}

.form-control::placeholder{

    color:#94a3b8;

}

.form-control:focus{

    box-shadow:none;

    border:2px solid #3b82f6;

    background:white;

    color:#1e293b;

}

/* Buttons */

.send-btn,
.login-btn{

    width:100%;

    height:55px;

    border:none;

    border-radius:15px;

    color:white;

    font-size:17px;

    font-weight:600;

    transition:0.3s;

}

.send-btn{

    background:#2563eb;

    margin-bottom:20px;

}

.login-btn{

    background:#10b981;

}

.send-btn:hover{

    background:#1d4ed8;

    transform:translateY(-3px);

}

.login-btn:hover{

    background:#059669;

    transform:translateY(-3px);

}

/* Bottom Text */

.bottom-text{

    margin-top:25px;

    text-align:center;

    color:#64748b;

}

.bottom-text a{

    color:#2563eb;

    text-decoration:none;

    font-weight:600;

}

.bottom-text a:hover{

    text-decoration:underline;

}

/* Alert */

.alert{

    border-radius:15px;

    text-align:center;

}

/* Mobile Responsive */

@media(max-width:500px){

    .login-card{

        width:90%;

        padding:35px 25px;

    }

    .login-card h1{

        font-size:30px;

    }

}

</style>
</head>

<body>

<div class="login-card">

    <div class="logo">

        <i class="bi bi-phone-fill"></i>

    </div>

    <h1>Student Login</h1>

    <p>
        Login using Phone Number & OTP
    </p>

    <?php

    if($message != ""){

        echo "<div class='alert alert-info'>$message</div>";

    }

    ?>

    <!-- Send OTP Form -->

    <form method="POST">

        <div class="input-box">

            <i class="bi bi-telephone-fill"></i>

            <input type="text"
            name="phone"
            class="form-control"
            placeholder="Enter Phone Number"
            required>

        </div>

        <button type="submit"
        name="send_otp"
        class="send-btn">

            Send OTP

        </button>

    </form>

    <!-- Verify OTP Form -->

    <form method="POST">

        <div class="input-box">

            <i class="bi bi-shield-lock-fill"></i>

            <input type="text"
            name="entered_otp"
            class="form-control"
            placeholder="Enter OTP"
            required>

        </div>

        <button type="submit"
        name="verify_otp"
        class="login-btn">

            Verify & Login

        </button>

    </form>
    

    <div class="bottom-text">

Don't have an account?

<a href="student_register.php">

Register

</a>

</div>

</div>

</body>


</html>