<?php
session_start();

$message = "";

if(isset($_POST['login'])){

    include("db.php");

    $email = $_POST['email'];
    $password = $_POST['password'];

    $result = mysqli_query($conn,
    "SELECT * FROM wardens
    WHERE email='$email'
    AND password='$password'");

    if(mysqli_num_rows($result) > 0){

        $_SESSION['warden_email'] = $email;

        $message = "Login Successful";

        header("Location: warden_dashboard.php");
        exit();

    }else{

        $message = "Invalid Warden Email or Password";

    }

}
?>

<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Warden Login</title>

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
    linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),
    url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1974&auto=format&fit=crop');

    background-size:cover;
    background-position:center;

}

/* Card */

.login-card{

    width:430px;

    background:rgba(255,255,255,0.1);

    backdrop-filter:blur(18px);

    border-radius:30px;

    padding:45px;

    color:white;

    box-shadow:0 10px 40px rgba(0,0,0,0.4);

}

/* Logo */

.logo{

    width:90px;
    height:90px;

    background:linear-gradient(135deg,#10b981,#059669);

    border-radius:25px;

    margin:auto;

    display:flex;
    justify-content:center;
    align-items:center;

    margin-bottom:25px;

}

.logo i{

    font-size:40px;

}

/* Heading */

.login-card h1{

    text-align:center;

    font-size:36px;

    font-weight:700;

    margin-bottom:10px;

}

.login-card p{

    text-align:center;

    color:#dbeafe;

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

    color:#6ee7b7;

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

    color:#dbeafe;

}

.form-control:focus{

    box-shadow:none;

    border:1px solid #6ee7b7;

    background:rgba(255,255,255,0.2);

    color:white;

}

/* Button */

.login-btn{

    width:100%;

    height:55px;

    border:none;

    border-radius:15px;

    background:linear-gradient(135deg,#10b981,#059669);

    color:white;

    font-size:17px;

    font-weight:600;

    transition:0.3s;

}

.login-btn:hover{

    transform:translateY(-3px);

}

/* Success Message */

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

    backdrop-filter:blur(10px);

    animation:popup 0.5s ease;

}

.success-box i{

    font-size:24px;

    color:#34d399;

}

/* Error Message */

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

/* Animation */

@keyframes popup{

    from{

        transform:translateY(-10px);

        opacity:0;

    }

    to{

        transform:translateY(0);

        opacity:1;

    }

}

/* Bottom */

.bottom-text{

    margin-top:20px;

    text-align:center;

}

</style>

</head>

<body>

<div class="login-card">

    <div class="logo">

        <i class="bi bi-person-workspace"></i>

    </div>

    <h1>Warden Login</h1>

    <p>
        Secure login for hostel warden
    </p>

    <?php

    if($message != ""){

        if($message == "Login Successful"){

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
            placeholder="Enter Warden Email"
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

        <!-- Button -->

        <button type="submit"
        name="login"
        class="login-btn">

            Login

        </button>

    </form>

    <div class="bottom-text">

        Authorized Access Only

    </div>

</div>

</body>

</html>