<?php

$message = "";

if(isset($_POST['login'])){

    $email = $_POST['email'];

    $password = $_POST['password'];

    /* Fixed Admin Credentials */

    $correct_email = "admin@gmail.com";

    $correct_password = "admin123";

    if($email == $correct_email && $password == $correct_password){

    $message = "Admin Login Successful";

    header("refresh:2;url=admin_dashboard.php");

}else{

    $message = "Invalid Admin Email or Password";

}

}

?>

<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Admin Login</title>

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

    background:
    linear-gradient(rgba(0,0,0,0.65),rgba(0,0,0,0.65)),
    url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1974&auto=format&fit=crop');

    background-size:cover;
    background-position:center;

}

/* Login Card */

.login-card{

    width:440px;

    background:rgba(255,255,255,0.1);

    backdrop-filter:blur(20px);

    border-radius:30px;

    padding:45px;

    color:white;

    box-shadow:0 10px 40px rgba(0,0,0,0.5);

}

/* Logo */

.logo{

    width:95px;
    height:95px;

    background:linear-gradient(135deg,#f59e0b,#d97706);

    border-radius:25px;

    margin:auto;

    display:flex;
    justify-content:center;
    align-items:center;

    margin-bottom:25px;

}

.logo i{

    font-size:42px;

}

/* Heading */

.login-card h1{

    text-align:center;

    font-size:38px;

    font-weight:700;

    margin-bottom:10px;

}

.login-card p{

    text-align:center;

    color:#fde68a;

    margin-bottom:35px;

}

/* Inputs */

.input-box{

    position:relative;

    margin-bottom:25px;

}

.input-box i{

    position:absolute;

    top:18px;

    left:18px;

    color:#fbbf24;

}

.form-control{

    height:58px;

    border:none;

    border-radius:15px;

    padding-left:50px;

    background:rgba(255,255,255,0.15);

    color:white;

}

.form-control::placeholder{

    color:#fef3c7;

}

.form-control:focus{

    box-shadow:none;

    border:1px solid #fbbf24;

    background:rgba(255,255,255,0.2);

    color:white;

}

/* Button */

.login-btn{

    width:100%;

    height:55px;

    border:none;

    border-radius:15px;

    background:linear-gradient(135deg,#f59e0b,#d97706);

    color:white;

    font-size:17px;

    font-weight:600;

    transition:0.3s;

}

.login-btn:hover{

    transform:translateY(-3px);

}

/* Success Box */

.success-box{

    width:100%;

    background:rgba(16,185,129,0.18);

    border:1px solid rgba(16,185,129,0.5);

    padding:16px;

    border-radius:18px;

    margin-bottom:25px;

    display:flex;

    align-items:center;

    justify-content:center;

    gap:12px;

    color:#d1fae5;

    font-size:17px;

    font-weight:600;

}

/* Error Box */

.error-box{

    width:100%;

    background:rgba(239,68,68,0.18);

    border:1px solid rgba(239,68,68,0.5);

    padding:16px;

    border-radius:18px;

    margin-bottom:25px;

    display:flex;

    align-items:center;

    justify-content:center;

    gap:12px;

    color:#fecaca;

    font-size:16px;

    font-weight:600;

}

/* Bottom */

.bottom-text{

    margin-top:20px;

    text-align:center;

    color:#fde68a;

}

</style>

</head>

<body>

<div class="login-card">

    <div class="logo">

        <i class="bi bi-shield-lock-fill"></i>

    </div>

    <h1>Admin Login</h1>

    <p>
        Secure access for hostel administrator
    </p>

    <?php

    if($message != ""){

        if($message == "Admin Login Successful"){

            echo "

            <div class='success-box'>

                <i class='bi bi-check-circle-fill'></i>

                <span>$message</span>

            </div>

            ";

        }else{

            echo "

            <div class='error-box'>

                <i class='bi bi-x-circle-fill'></i>

                <span>$message</span>

            </div>

            ";

        }

    }

    ?>

    <form method="POST">

        <!-- Email -->

        <div class="input-box">

            <i class="bi bi-envelope-fill"></i>

            <input type="email"
            name="email"
            class="form-control"
            placeholder="Enter Admin Email"
            required>

        </div>

        <!-- Password -->

        <div class="input-box">

            <i class="bi bi-lock-fill"></i>

            <input type="password"
            name="password"
            class="form-control"
            placeholder="Enter Password"
            required>

        </div>

        <!-- Login Button -->

        <button type="submit"
        name="login"
        class="login-btn">

            Login

        </button>

    </form>

    <div class="bottom-text">

        Only Authorized Admin Can Access

    </div>

</div>

</body>

</html>
