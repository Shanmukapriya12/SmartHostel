<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Select Role</title>

<!-- Bootstrap -->

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Google Font -->

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- Bootstrap Icons -->

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

    background:linear-gradient(
    135deg,
    #0f172a,
    #1e3a8a,
    #2563eb,
    #38bdf8
    );

    background-size:400% 400%;
    animation:bgMove 12s ease infinite;
}

@keyframes bgMove{
    0%{background-position:0% 50%;}
    50%{background-position:100% 50%;}
    100%{background-position:0% 50%;}
}

.role-container{
    width:1100px;
    max-width:95%;
    padding:50px;
    border-radius:30px;

    background:rgba(255,255,255,0.12);

    backdrop-filter:blur(15px);
    -webkit-backdrop-filter:blur(15px);

    box-shadow:0 8px 32px rgba(0,0,0,0.3);

    text-align:center;
    color:white;
}

.role-container h1{
    font-size:50px;
    font-weight:700;
    margin-bottom:10px;
}

.role-container p{
    color:#e2e8f0;
    margin-bottom:45px;
    font-size:17px;
}

.role-card{
    background:rgba(255,255,255,0.15);
    border-radius:25px;
    padding:35px 25px;
    transition:0.4s;
    height:100%;
}

.role-card:hover{
    transform:translateY(-10px);
    background:rgba(255,255,255,0.22);
}

.role-icon{
    width:90px;
    height:90px;
    margin:auto;
    border-radius:20px;
    display:flex;
    justify-content:center;
    align-items:center;
    color:white;
    font-size:40px;
    margin-bottom:20px;
}

.student{
    background:linear-gradient(135deg,#3b82f6,#2563eb);
}

.warden{
    background:linear-gradient(135deg,#10b981,#059669);
}

.admin{
    background:linear-gradient(135deg,#f59e0b,#d97706);
}

.role-card h2{
    font-size:28px;
    margin-bottom:12px;
}

.role-card p{
    font-size:15px;
    color:#f1f5f9;
    line-height:1.8;
}

.role-btn{
    border:none;
    margin-top:15px;
    padding:12px 35px;
    border-radius:50px;
    background:white;
    color:#1e293b;
    font-weight:600;
    transition:0.3s;
}

.role-btn:hover{
    background:#dbeafe;
    transform:scale(1.05);
}

@media(max-width:992px){

    .role-container{
        padding:30px 20px;
    }

    .role-container h1{
        font-size:36px;
    }

}

</style>

</head>

<body>

<div class="role-container">

    <h1>Select Your Role</h1>

    <p>
        Choose your role to continue into the Smart Hostel Management System
    </p>

    <div class="row g-4">

        <!-- Student -->

        <div class="col-md-4">

            <div class="role-card">

                <div class="role-icon student">

                    <i class="bi bi-mortarboard-fill"></i>

                </div>

                <h2>Student</h2>

                <p>
                    Access room details, maintenance requests,
                    complaints and hostel updates.
                </p>

                <a href="student_login.php">

                    <button class="role-btn">

                        Login

                    </button>

                </a>

            </div>

        </div>


        <!-- Warden -->

        <div class="col-md-4">

            <div class="role-card">

                <div class="role-icon warden">

                    <i class="bi bi-person-workspace"></i>

                </div>

                <h2>Warden</h2>

                <p>
                    Manage students, room allocation,
                    complaints and maintenance activities.
                </p>

                <a href="warden_login.php">

                    <button class="role-btn">

                        Login

                    </button>

                </a>

            </div>

        </div>
        


        <!-- Admin -->

        <div class="col-md-4">

            <div class="role-card">

                <div class="role-icon admin">

                    <i class="bi bi-shield-lock-fill"></i>

                </div>

                <h2>Admin</h2>

                <p>
                    Full control over hostel administration,
                    reports and complete system management.
                </p>

                <a href="admin_login.php">

                    <button class="role-btn">

                        Login

                    </button>

                </a>

            </div>

        </div>
       


    </div>

</div>

</body>

</html>