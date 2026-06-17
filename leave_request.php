<?php

session_start();

include("db.php");

$phone = $_SESSION['student_phone'];

$student = mysqli_query($conn,"SELECT * FROM students WHERE phone='$phone'");

$s = mysqli_fetch_assoc($student);

if(isset($_POST['submit_leave'])){

   $student_id = $s['id'];

$from_date = $_POST['from_date'];

$to_date = $_POST['to_date'];

$leave_type = $_POST['leave_type'];

$reason = $_POST['reason'];

$destination = $_POST['destination'];

$parent_phone = $_POST['parent_phone'];

$notes = $_POST['notes'];

$status = "Pending";

  $student_name = $s['name'];

$query = mysqli_query($conn,"INSERT INTO leave_requests
(student_id,student_name,leave_type,from_date,to_date,reason,destination,parent_phone,notes,status)
VALUES
('$student_id','$student_name','$leave_type','$from_date','$to_date','$reason','$destination','$parent_phone','$notes','$status')");
mysqli_query($conn,

"INSERT INTO notifications
(student_id,title,message,type,posted_by)

VALUES(

'$student_id',

'Leave Request Submitted',

'Your leave request has been sent to the warden. Current Status: Pending 🟡',

'Leave',

'System'

)");

$success=true;

}


?>
<!DOCTYPE html>
<html lang="en">
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

<?php

if(isset($success)){

?>

<div class="success-card">

<div class="success-icon">

✅

</div>

<h2 style="color:#16a34a;font-weight:700;">

Leave Request Submitted Successfully

</h2>

<p style="font-size:17px;color:#64748b;margin-top:15px;">

Your leave request has been sent to the warden successfully.

</p>

<div class="status-box">

<b>Current Status :</b>

Pending 🟡

<br><br>

Please wait for the warden's approval.

</div>

<div class="notification-box">

🔔 A notification has been added to your Notifications page.

You can check the approval status there anytime.

</div>

<a href="student_dashboard.php" class="dashboard-btn">

Return to Dashboard

</a>

</div>

<?php

}else{

?>

<form method="POST">

<div class="mb-3">

<label class="form-label">Leave Type</label>

<select
name="leave_type"
class="form-control"
required>

<option value="">Select Leave Type</option>

<option value="Home Leave">Home Leave</option>

<option value="Medical Leave">Medical Leave</option>

<option value="Emergency Leave">Emergency Leave</option>

<option value="College Leave">College Leave</option>

</select>

<input type="text"
name="reason"
class="form-control"
placeholder="Enter Reason"
required>

</div>

<div class="row">

<div class="col-md-6 mb-3">

<label class="form-label">From Date</label>

<input type="date"
name="from_date"
class="form-control"
required>

</div>

<div class="col-md-6 mb-3">

<label class="form-label">To Date</label>

<input type="date"
name="to_date"
class="form-control"
required>

</div>

</div>

<div class="mb-3">

<label class="form-label">Destination</label>

<input type="text"
name="destination"
class="form-control"
placeholder="Enter Destination"
required>

</div>

<div class="mb-3">

<label class="form-label">Parent Phone Number</label>

<input type="tel"
name="parent_phone"
class="form-control"
placeholder="Enter Parent Phone Number"
required>

</div>

<div class="mb-3">

<label class="form-label">Additional Notes</label>

<textarea
name="notes"
class="form-control"
rows="4"
placeholder="Optional"></textarea>

</div>

<button
type="submit"
name="submit_leave"
class="submit-btn">

Submit Leave Request

</button>

</form>

<?php

}

?>

</div>

</div>

</body>

</html>