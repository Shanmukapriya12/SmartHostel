<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Hostel Fee Details</title>

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
width:85%;
max-width:900px;
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
font-size:42px;
font-weight:700;
margin:0;
}

.heading p{
color:#64748b;
}

/* Fee Card */

.fee-card{
background:white;
padding:30px;
border-radius:20px;
box-shadow:0 5px 20px rgba(0,0,0,0.08);
}

.fee-header{
text-align:center;
margin-bottom:30px;
}

.fee-icon{
font-size:60px;
color:#2563eb;
}

.fee-header h2{
font-weight:700;
margin-top:10px;
}

.info-row{
display:flex;
justify-content:space-between;
padding:15px 0;
border-bottom:1px solid #e5e7eb;
}

.info-row span:first-child{
font-weight:600;
}

.paid{
color:#16a34a;
font-weight:700;
}

.receipt-btn{
display:block;
width:100%;
text-align:center;
margin-top:25px;
padding:14px;
background:#2563eb;
color:white;
text-decoration:none;
border-radius:12px;
font-weight:600;
border:none;
cursor:pointer;
transition:0.3s;
}

.receipt-btn:hover{
background:#1d4ed8;
color:white;
}

/* Popup */

.popup{
position:fixed;
top:20px;
right:20px;
background:#16a34a;
color:white;
padding:15px 20px;
border-radius:12px;
font-weight:600;
box-shadow:0 5px 15px rgba(0,0,0,0.2);
display:none;
z-index:9999;
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

<h1>Hostel Fee Details</h1>

<p>View your hostel fee information</p>

</div>

</div>

<div class="fee-card">

<div class="fee-header">

<div class="fee-icon">

<i class="bi bi-cash-coin"></i>

</div>

<h2>Fee Status</h2>

</div>

<div class="info-row">

<span>Academic Year</span>

<span>2026 - 2027</span>

</div>

<div class="info-row">

<span>Hostel Fee Amount</span>

<span>₹75,000</span>

</div>

<div class="info-row">

<span>Room Type</span>

<span>3 Sharing</span>

</div>

<div class="info-row">

<span>Payment Status</span>

<span class="paid">Paid ✅</span>

</div>

<div class="info-row">

<span>Payment Date</span>

<span>15-Jun-2026</span>

</div>

<div class="info-row">

<span>Receipt Number</span>

<span>HST2026001</span>

</div>

<button
class="receipt-btn"
onclick="downloadReceipt()">

Download Receipt

</button>

</div>

</div>

<!-- Popup -->

<div class="popup" id="popup">

✅ Receipt downloaded successfully

</div>

<script>

function downloadReceipt(){

const popup =
document.getElementById("popup");

popup.style.display = "block";

setTimeout(()=>{

popup.style.display = "none";

},3000);

}

</script>

</body>

</html>