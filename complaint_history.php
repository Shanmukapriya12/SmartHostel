<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Complaint History</title>

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

    background:#eef2ff;

}

.main-container{

    width:90%;
    max-width:1200px;

    margin:50px auto;

}

/* Top */

.top-section{

    display:flex;

    align-items:flex-start;

    gap:25px;

    margin-bottom:35px;

}

.back-btn{

    text-decoration:none;

    color:black;

    font-weight:500;

    margin-top:18px;

}

.heading h1{

    font-size:48px;

    font-weight:700;

}

.heading p{

    color:#64748b;

    font-size:18px;

}

/* Complaint Card */

.history-card{

    background:white;

    border-radius:25px;

    padding:30px;

    margin-bottom:25px;

    box-shadow:0 5px 20px rgba(0,0,0,0.05);

    transition:0.3s;

}

.history-card:hover{

    transform:translateY(-5px);

}

/* Top Row */

.top-row{

    display:flex;

    justify-content:space-between;

    align-items:center;

    margin-bottom:20px;

}

.complaint-title{

    font-size:24px;

    font-weight:700;

}

/* Status */

.status{

    padding:8px 18px;

    border-radius:30px;

    color:white;

    font-size:14px;

    font-weight:600;

}

.pending{

    background:#f59e0b;

}

.resolved{

    background:#10b981;

}

.processing{

    background:#2563eb;

}

/* Description */

.desc{

    color:#64748b;

    line-height:1.8;

    margin-bottom:20px;

}

/* Bottom */

.bottom-row{

    display:flex;

    justify-content:space-between;

    color:#6b7280;

    font-size:15px;

}

/* New Complaint Button */

.new-btn{

    margin-top:20px;

    background:#2563eb;

    color:white;

    border:none;

    padding:14px 30px;

    border-radius:14px;

    font-weight:600;

    text-decoration:none;

    display:inline-block;

}

.new-btn:hover{

    background:#1d4ed8;

}

</style>

</head>

<body>

<div class="main-container">

    <!-- Top -->

    <div class="top-section">

        <a href="student_dashboard.php" class="back-btn">

            <i class="bi bi-arrow-left"></i>

            Back

        </a>

        <div class="heading">

            <h1>Complaint History</h1>

            <p>

                Track your submitted complaints and status

            </p>

        </div>

    </div>

    <!-- Complaint 1 -->

    <div class="history-card">

        <div class="top-row">

            <div class="complaint-title">

                Fan Not Working

            </div>

            <div class="status pending">

                Pending

            </div>

        </div>

        <div class="desc">

            Ceiling fan in Room A-204 is not rotating properly
            and making unusual noise.

        </div>

        <div class="bottom-row">

            <div>

                Complaint ID : #CMP102

            </div>

            <div>

                Submitted : Today

            </div>

        </div>

    </div>

    <!-- Complaint 2 -->

    <div class="history-card">

        <div class="top-row">

            <div class="complaint-title">

                Water Leakage

            </div>

            <div class="status resolved">

                Resolved

            </div>

        </div>

        <div class="desc">

            Water leakage issue near bathroom sink was repaired.

        </div>

        <div class="bottom-row">

            <div>

                Complaint ID : #CMP089

            </div>

            <div>

                Submitted : 2 Days Ago

            </div>

        </div>

    </div>

    <!-- Complaint 3 -->

    <div class="history-card">

        <div class="top-row">

            <div class="complaint-title">

                WiFi Connectivity Issue

            </div>

            <div class="status processing">

                Processing

            </div>

        </div>

        <div class="desc">

            Internet speed is very slow in Block A hostel rooms.

        </div>

        <div class="bottom-row">

            <div>

                Complaint ID : #CMP076

            </div>

            <div>

                Submitted : Yesterday

            </div>

        </div>

    </div>

    <!-- Button -->

    <a href="raise_complaint.php" class="new-btn">

        Submit New Complaint

    </a>

</div>

</body>

</html>