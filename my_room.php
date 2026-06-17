<?php

session_start();

include("db.php");

$phone = $_SESSION['student_phone'];

$student = mysqli_query($conn,
"SELECT * FROM students WHERE phone='$phone'");

$s = mysqli_fetch_assoc($student);

$room = mysqli_query($conn,
"SELECT * FROM rooms WHERE room_number='".$s['room_number']."'");

$r = mysqli_fetch_assoc($room);

/* If no room is found, create default values */
if(!$r){

    $r = [
        "room_number" => "Not Allocated",
        "block" => "-",
        "floor" => "-",
        "room_type" => "-",
        "status" => "Not Allocated",
        "capacity" => 0,
        "available_beds" => 0,
        "roommates" => "No Room Assigned"
    ];

}

?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>My Room</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:'Poppins',sans-serif;}
body{min-height:100vh;background:linear-gradient(135deg,#dbeafe,#eef2ff,#f8fafc);}
.main-container{width:85%;max-width:1200px;margin:25px auto;}
.top-section{display:flex;align-items:center;gap:15px;margin-bottom:25px;}
.back-btn{text-decoration:none;color:#111827;font-size:18px;font-weight:600;}
.heading h1{font-size:48px;font-weight:700;margin-bottom:0;}
.heading p{color:#64748b;font-size:17px;}
.room-status{background:white;border-radius:25px;padding:25px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 5px 20px rgba(0,0,0,.08);margin-bottom:25px;}
.room-left h2{font-weight:700;}
.room-badge{background:#22c55e;color:white;padding:8px 18px;border-radius:20px;}
.room-summary-card{width:340px;display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.summary-box{background:#f8fafc;border:1px solid #e5e7eb;border-radius:15px;padding:15px;text-align:center;}
.summary-box h5{font-size:13px;color:#64748b;}
.summary-box span{font-size:20px;font-weight:700;}
.green{color:#22c55e;}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;}
.card-box,.rules{background:white;border-radius:20px;padding:25px;box-shadow:0 5px 15px rgba(0,0,0,.08);}
.detail{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #e5e7eb;}
.amenities{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
.amenity{background:#f8fafc;padding:15px;border-radius:15px;text-align:center;}
.amenity i{font-size:24px;color:#2563eb;}
@media(max-width:768px){
.grid{grid-template-columns:1fr;}
.room-status{flex-direction:column;gap:20px;}
.room-summary-card{width:100%;}
}
</style>
</head>
<body>
<div class="main-container">
<div class="top-section">
<a href="student_dashboard.php" class="back-btn"><i class="bi bi-arrow-left"></i> Back</a>
<div class="heading">
<h1>My Room</h1>
<p>View your hostel room details and facilities</p>
</div>
</div>

<div class="room-status">
<div class="room-left">
<h2>

🏠 Room <?php echo $r['room_number']; ?>

</h2>

<p>

<?php echo $r['block']; ?>

•

<?php echo $r['floor']; ?>

•

<?php echo $r['room_type']; ?>

</p>

<span class="room-badge">

<?php echo $r['status']; ?>

</span>
</div>

<div class="room-summary-card">
<div class="summary-box"><h5>Total Beds</h5><span>

<?php echo $r['capacity']; ?>

</span></div>
<div class="summary-box"><h5>Occupied</h5><span>

<?php echo $r['capacity']-$r['available_beds']; ?>

</span></div>
<div class="summary-box"><h5>Your Bed</h5><span>Bed 2</span></div>
<div class="summary-box"><h5>Status</h5><span class="green">

<?php echo $s['status']; ?>

</span></div>
</div>
</div>

<div class="grid">
<div class="card-box">
<h4>Room Details</h4>
<div class="detail"><span>Room Number</span>
<span>

<?php echo $r['room_number']; ?>

</span>
</div>
<div class="detail"><span>Block</span>
<span>

<?php echo $r['block']; ?>

</span>
</div>
<div class="detail"><span>Floor</span>
<span>

<?php echo $r['floor']; ?>

</span>
</div>
<div class="detail"><span>Capacity</span>
<span>

<?php echo $r['capacity']; ?> Beds

</span>
</div>
<div class="detail"><span>Bed Number</span>
<span>Bed 2</span>
</div>
</div>

<div class="card-box">
<h4>Amenities</h4>
<div class="amenities">
<div class="amenity"><i class="bi bi-wifi"></i><p>WiFi</p></div>
<div class="amenity"><i class="bi bi-snow"></i><p>AC</p></div>
<div class="amenity"><i class="bi bi-droplet"></i><p>Bathroom</p></div>
<div class="amenity"><i class="bi bi-house"></i><p>Balcony</p></div>
<div class="amenity"><i class="bi bi-lightning"></i><p>Power</p></div>
<div class="amenity"><i class="bi bi-book"></i><p>Study</p></div>
</div>
</div>
</div>

<div class="grid">
<div class="card-box">
<h4>Roommates</h4>
<ul>
    <li>

<?php echo $r['roommates']; ?>

</li>
</ul>
</div>

<div class="card-box">
<h4>Warden Details</h4>
<p><strong>Name:</strong> Priya Madam</p>
<p><strong>Phone:</strong> 9876543210</p>
<p><strong>Email:</strong> warden@smarthostel.com</p>
</div>
</div>

<div class="rules">
<h4>Hostel Rules</h4>
<ul>
<li>Attendance compulsory every night.</li>
<li>Visitors are not allowed inside rooms.</li>
<li>Keep rooms clean and hygienic.</li>
<li>Lights off after 11:00 PM.</li>
<li>Avoid unnecessary noise after study hours.</li>
<li>Maintain discipline inside hostel premises.</li>
</ul>
</div>

</div>
</body>
</html>