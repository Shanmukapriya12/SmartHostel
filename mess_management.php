<?php
session_start();
if(!isset($_SESSION['warden_email'])){
    die("<!DOCTYPE html><html><head><title>Access Denied</title></head><body style='font-family:sans-serif;text-align:center;padding:80px;'><h2 style='color:#dc2626;'>&#128274; Access Denied</h2><p>This page is restricted to Warden login only.</p><a href='warden_login.php' style='color:#2563eb;'>Go to Warden Login</a></body></html>");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>Mess Management</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
rel="stylesheet">

<link rel="stylesheet"
href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
rel="stylesheet">

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Poppins',sans-serif;
}

body{
background:linear-gradient(135deg,#fff7ed,#fefce8);
min-height:100vh;
}

.container-box{
width:90%;
max-width:1300px;
margin:30px auto;
}

.header{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:30px;
}

.left-header{
display:flex;
align-items:center;
gap:15px;
}

.back-btn{
text-decoration:none;
font-size:18px;
font-weight:600;
color:#111827;
}

.heading h2{
font-size:42px;
font-weight:700;
margin:0;
}

.heading p{
margin:0;
color:#64748b;
}

.update-btn{
background:#ea580c;
color:white;
border:none;
padding:12px 20px;
border-radius:12px;
font-weight:600;
cursor:pointer;
}

.meal-container{
display:grid;
grid-template-columns:
repeat(auto-fit,minmax(320px,1fr));
gap:25px;
margin-bottom:30px;
}

.meal-card{
background:white;
padding:25px;
border-radius:20px;
box-shadow:0 5px 15px rgba(0,0,0,0.08);
}

.meal-top{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:20px;
}

.meal-card h2{
font-size:32px;
font-weight:700;
margin:0;
}

.meal-card ul{
padding-left:22px;
margin:0;
}

.meal-card li{
margin-bottom:10px;
font-size:18px;
color:#475569;
}

.edit-btn{
background:#2563eb;
color:white;
border:none;
padding:8px 16px;
border-radius:10px;
font-weight:600;
cursor:pointer;
}

.time-box{
background:white;
padding:25px;
border-radius:20px;
box-shadow:0 5px 15px rgba(0,0,0,0.08);
margin-bottom:25px;
}

.time-title{
font-size:28px;
font-weight:700;
margin-bottom:20px;
}

.time-item{
display:flex;
justify-content:space-between;
padding:12px 0;
border-bottom:1px solid #eee;
font-size:18px;
}

.feedback-box{
background:white;
padding:25px;
border-radius:20px;
box-shadow:0 5px 15px rgba(0,0,0,0.08);
}

.feedback-title{
font-size:28px;
font-weight:700;
margin-bottom:20px;
}

.feedback-item{
background:#f8fafc;
padding:15px;
border-radius:12px;
margin-bottom:15px;
}

.student-name{
font-weight:700;
margin-bottom:5px;
}

.notification-box{
display:none;
background:#dcfce7;
color:#166534;
padding:15px;
border-radius:12px;
margin-bottom:20px;
font-weight:600;
}

</style>

</head>

<body>

<div class="container-box">

<div class="header">

<div class="left-header">

<a href="warden_dashboard.php"
class="back-btn">

<i class="bi bi-arrow-left"></i>
Back

</a>

<div class="heading">

<h2>🍽 Mess Management</h2>

<p>
Manage hostel food and meal schedules
</p>

</div>

</div>

<button class="update-btn"
onclick="updateMenu()">

<i class="bi bi-pencil-square"></i>
Update Menu

</button>

</div>

<div
class="notification-box"
id="notificationBox">

Menu Updated Successfully

</div>

<div class="menu-grid">

<!-- Breakfast -->

<div class="meal-container">

<!-- Breakfast -->

<div class="meal-card">

<div class="meal-top">

<h2>☕ Breakfast</h2>

<button class="edit-btn"
onclick="editMenu('breakfast')">
Edit
</button>

</div>

<ul id="breakfastMenu">
<li>🥞 Dosa</li>
<li>🥥 Coconut Chutney</li>
<li>☕ Tea / Coffee</li>
</ul>

</div>

<!-- Lunch -->

<div class="meal-card">

<div class="meal-top">

<h2>🍱 Lunch</h2>

<button class="edit-btn"
onclick="editMenu('lunch')">
Edit
</button>

</div>

<ul id="lunchMenu">
<li>🍚 Rice</li>
<li>🍲 Sambar</li>
<li>🥗 Veg Curry</li>
<li>🥛 Buttermilk</li>
</ul>

</div>

<!-- Dinner -->

<div class="meal-card">

<div class="meal-top">

<h2>🌙 Dinner</h2>

<button class="edit-btn"
onclick="editMenu('dinner')">
Edit
</button>

</div>

<ul id="dinnerMenu">
<li>🥘 Chapathi</li>
<li>🧆 Paneer Curry</li>
<li>🥛 Milk</li>
</ul>

</div>

</div>



<div class="time-box">

<div class="time-title">

⏰ Meal Timings

</div>

<div class="time-item">

<span>Breakfast</span>

<span>7:00 AM - 9:00 AM</span>

</div>

<div class="time-item">

<span>Lunch</span>

<span>12:30 PM - 2:00 PM</span>

</div>

<div class="time-item">

<span>Dinner</span>

<span>7:00 PM - 9:00 PM</span>

</div>

</div>

<div class="feedback-box">

<div class="feedback-title">

💬 Food Complaints & Feedback

</div>

<div class="feedback-item">

<div class="student-name">
Shanmukopriya
</div>

<div>
Food was good but chapathi was cold.
</div>

</div>

<div class="feedback-item">

<div class="student-name">
Sruthi
</div>

<div>
Please add more spicy curry items.
</div>

</div>

<div class="feedback-item">

<div class="student-name">
Kavya
</div>

<div>
Breakfast quality improved 👍
</div>

</div>

</div>

</div>

<script>

function updateMenu(){

const box =
document.getElementById(
'notificationBox'
);

box.style.display='block';

setTimeout(()=>{

box.style.display='none';

},3000);

}


function editMenu(type){

let menu =
document.getElementById(type + "Menu");

let currentItems = [];

menu.querySelectorAll("li")
.forEach(li => {

currentItems.push(
li.innerText
);

});

let updated =
prompt(
"Edit menu items separated by commas",
currentItems.join(", ")
);

if(updated != null){

let items =
updated.split(",");

menu.innerHTML = "";

items.forEach(item => {

menu.innerHTML +=
"<li>" +
item.trim() +
"</li>";

});

}

}



</script>

</body>
</html>