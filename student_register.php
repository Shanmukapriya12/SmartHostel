<?php

include("db.php");

$message = "";

if(isset($_POST['register'])){

    $name = $_POST['name'];

    $email = $_POST['email'];

    $phone = $_POST['phone'];

    $department = $_POST['department'];

    $password = $_POST['password'];

    $status = "Active";

    $room_number = "Not Allocated";

    /* Insert Query */

    $query = "INSERT INTO students(name,email,phone,department,password,room_number,status)

    VALUES('$name','$email','$phone','$department','$password','$room_number','$status')";

    $data = mysqli_query($conn,$query);

    if($data){

        $message = "Registration Successful";

    }else{

        $message = "Registration Failed";

    }

}

?>
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Student Registration</title>

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

    min-height:100vh;

    display:flex;
    justify-content:center;
    align-items:center;

    background:
    linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),
    url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1974&auto=format&fit=crop');

    background-size:cover;
    background-position:center;

    padding:30px;

}

.register-card{

    width:500px;

    background:rgba(255,255,255,0.1);

    backdrop-filter:blur(18px);

    border-radius:30px;

    padding:40px;

    color:white;

    box-shadow:0 10px 40px rgba(0,0,0,0.4);

}

.logo{

    width:90px;
    height:90px;

    background:linear-gradient(135deg,#3b82f6,#2563eb);

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

.register-card h1{

    text-align:center;

    font-size:34px;

    font-weight:700;

    margin-bottom:10px;

}

.register-card p{

    text-align:center;

    color:#dbeafe;

    margin-bottom:30px;

}

.input-box{

    position:relative;

    margin-bottom:20px;

}

.input-box i{

    position:absolute;

    top:18px;

    left:18px;

    color:#60a5fa;

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

    border:1px solid #60a5fa;

    background:rgba(255,255,255,0.2);

    color:white;

}

.register-btn{

    width:100%;

    height:58px;

    border:none;

    border-radius:15px;

    background:linear-gradient(135deg,#10b981,#059669);

    color:white;

    font-size:18px;

    font-weight:600;

    margin-top:10px;

    transition:0.3s;

}

.register-btn:hover{

    transform:translateY(-3px);

    box-shadow:0 10px 20px rgba(16,185,129,0.4);

}

.bottom-text{

    margin-top:25px;

    text-align:center;

}

.bottom-text a{

    color:#93c5fd;

    text-decoration:none;

    font-weight:600;

}
.custom-select{

    appearance:none;

    -webkit-appearance:none;

    -moz-appearance:none;

    color:white;

    background:rgba(255,255,255,0.15);

    cursor:pointer;

}

.custom-select option{

    background:#374151;

    color:white;

}


</style>

</head>

<body>

<div class="register-card">

    <div class="logo">

        <i class="bi bi-person-plus-fill"></i>

    </div>

    <h1>Student Registration</h1>

    <p>
        Create your hostel student account
    </p>

    <form onsubmit="showMessage(event)">

        <!-- Name -->

        <div class="input-box">

            <i class="bi bi-person-fill"></i>

            <input type="text"
            class="form-control"
            placeholder="Enter Full Name">

        </div>

        <!-- Email -->

        <div class="input-box">

            <i class="bi bi-envelope-fill"></i>

            <input type="email"
            class="form-control"
            placeholder="Enter Email">

        </div>

        <!-- Phone -->

        <div class="input-box">

            <i class="bi bi-telephone-fill"></i>

            <input type="text"
            class="form-control"
            placeholder="Enter Phone Number">

        </div>

        <!-- Department -->

        <div class="input-box">

    <i class="bi bi-book-fill"></i>

    <select class="form-control custom-select">

        <option value="" disabled selected>
            Select Department
        </option>

        <option>CSE</option>

        <option>CSE-AI</option>

        <option>CSE-DS</option>

        <option>CSE-AI/ML</option>

        <option>EEE</option>

        <option>ECE</option>

        <option>Bio Science</option>

        <option>Bio Medical</option>

        <option>Agriculture</option>

    </select>

</div>

        <!-- Password -->

        <div class="input-box">

            <i class="bi bi-lock-fill"></i>

            <input type="password"
            class="form-control"
            placeholder="Create Password">

        </div>

        <!-- Register Button -->

        <button class="register-btn">

            Register Now

        </button>

    </form>

    <div class="bottom-text">

        Already have an account?
        <a href="student_login.php">Login</a>

    </div>

</div>

</body>
<script>

function showMessage(event){

    event.preventDefault();

    alert("Registration Successfully!");

}

</script>

</html>