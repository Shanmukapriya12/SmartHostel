<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Smart Hostel Management System</title>

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Segoe UI',sans-serif;
}

body{
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background:#f3f7fc;
}

.container{
    text-align:center;
    width:90%;
    max-width:700px;
}

.image img{
    width:320px;
    max-width:100%;
    margin-bottom:25px;
}

h1{
    color:#1e3a8a;
    font-size:3.5rem;
    line-height:1.2;
    margin-bottom:15px;
    font-weight:700;
}

p{
    color:#666;
    font-size:1.2rem;
    margin-bottom:35px;
}

.btn{
    display:inline-block;
    text-decoration:none;
    background:#2563eb;
    color:white;
    padding:15px 45px;
    border-radius:50px;
    font-size:20px;
    font-weight:600;
    transition:0.3s;
}

.btn:hover{
    background:#1d4ed8;
    transform:translateY(-3px);
}

@media(max-width:768px){

.image img{
    width:260px;
}

h1{
    font-size:2.4rem;
}

p{
    font-size:1rem;
}

.btn{
    padding:14px 35px;
    font-size:18px;
}

}

</style>
</head>
<body>

<div class="container">

    <div class="image">
        <img src="https://cdn-icons-png.flaticon.com/512/619/619153.png" alt="Hostel">
    </div>

    <h1>Smart Hostel Management System</h1>

    <p>Room Allocation & Maintenance Made Easy.</p>

    <a href="select_role.php" class="btn">Get Started</a>

</div>

</body>
</html>