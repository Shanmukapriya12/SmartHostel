<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Leave Request</title>

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
width:70%;
max-width:800px;
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
font-size:40px;
font-weight:700;
margin:0;
}

.heading p{
color:#64748b;
}

.form-card{
background:white;
padding:30px;
border-radius:20px;
box-shadow:0 5px 20px rgba(0,0,0,0.08);
}

.form-label{
font-weight:600;
}

.form-control{
border-radius:12px;
padding:12px;
}

.submit-btn{
background:#2563eb;
border:none;
width:100%;
padding:14px;
border-radius:12px;
color:white;
font-size:18px;
font-weight:600;
margin-top:10px;
transition:0.3s;
}

.submit-btn:hover{
background:#1d4ed8;
}

.success-card{
text-align:center;
padding:30px;
}

.success-icon{
font-size:70px;
margin-bottom:15px;
}

.status-box{
background:#fef9c3;
padding:18px;
border-radius:12px;
margin-top:20px;
margin-bottom:20px;
border-left:5px solid #facc15;
}

.notification-box{
background:#eff6ff;
padding:15px;
border-radius:12px;
margin-bottom:20px;
}

.dashboard-btn{
display:inline-block;
padding:12px 25px;
background:#2563eb;
color:white;
text-decoration:none;
border-radius:10px;
font-weight:600;
}

.dashboard-btn:hover{
background:#1d4ed8;
color:white;
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

<h1>Leave Request</h1>

<p>Apply for hostel leave</p>

</div>

</div>

<div class="form-card">

<form onsubmit="showSuccess(event)">

<div class="mb-3">

<label class="form-label">Reason for Leave</label>

<input type="text"
class="form-control"
placeholder="Enter Reason"
required>

</div>

<div class="row">

<div class="col-md-6 mb-3">

<label class="form-label">From Date</label>

<input type="date"
class="form-control"
required>

</div>

<div class="col-md-6 mb-3">

<label class="form-label">To Date</label>

<input type="date"
class="form-control"
required>

</div>

</div>

<div class="mb-3">

<label class="form-label">Destination</label>

<input type="text"
class="form-control"
placeholder="Enter Destination"
required>

</div>

<div class="mb-3">

<label class="form-label">Parent Phone Number</label>

<input type="tel"
class="form-control"
placeholder="Enter Parent Phone Number"
required>

</div>

<div class="mb-3">

<label class="form-label">Additional Notes</label>

<textarea
class="form-control"
rows="4"
placeholder="Optional"></textarea>

</div>

<button type="submit"
class="submit-btn">

Submit Leave Request

</button>

</form>

</div>

</div>

<script>

function showSuccess(event){

event.preventDefault();

document.querySelector(".form-card").innerHTML = `

<div class="success-card">

<div class="success-icon">
✅
</div>

<h2 style="color:#16a34a;font-weight:700;">

Leave Request Submitted Successfully

</h2>

<p style="
font-size:17px;
color:#64748b;
margin-top:15px;
">

Your leave request has been sent to the warden.

</p>

<div class="status-box">

<b>Current Status:</b> Pending 🟡

<br><br>

Please wait for the warden's response.

</div>

<div class="notification-box">

🔔 A notification will be generated once the warden approves or rejects your request.

</div>

<a href="student_dashboard.php"
class="dashboard-btn">

Return to Dashboard

</a>

</div>

`;

}

</script>

</body>

</html>