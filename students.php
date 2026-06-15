<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>Students</title>

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
background:linear-gradient(135deg,#ecfeff,#f0fdf4);
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
margin-bottom:25px;
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

.search-box{
width:300px;
}

.search-box input{
border-radius:12px;
padding:10px;
}

.student-grid{
display:grid;
grid-template-columns:
repeat(auto-fit,minmax(350px,1fr));
gap:20px;
}

.student-card{
background:white;
padding:20px;
border-radius:20px;
box-shadow:0 5px 15px rgba(0,0,0,0.08);
}

.student-top{
display:flex;
align-items:center;
gap:15px;
margin-bottom:15px;
}

.student-img{
width:70px;
height:70px;
border-radius:50%;
background:#dbeafe;
display:flex;
align-items:center;
justify-content:center;
font-size:35px;
color:#2563eb;
}

.student-name{
font-size:24px;
font-weight:700;
}

.info{
margin-bottom:8px;
color:#475569;
font-size:17px;
}

.status-active{
background:#dcfce7;
color:#166534;
padding:6px 14px;
border-radius:20px;
font-weight:600;
display:inline-block;
margin-top:10px;
}

.status-leave{
background:#fef3c7;
color:#92400e;
padding:6px 14px;
border-radius:20px;
font-weight:600;
display:inline-block;
margin-top:10px;
}

.action-buttons{
display:flex;
gap:10px;
margin-top:15px;
flex-wrap:wrap;
}

.view-btn{
background:#2563eb;
color:white;
border:none;
padding:10px 14px;
border-radius:10px;
font-weight:600;
}

.remove-btn{
background:#ef4444;
color:white;
border:none;
padding:10px 14px;
border-radius:10px;
font-weight:600;
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

<h2>👨‍🎓 Students</h2>

<p>
View registered hostel students
</p>

</div>

</div>

<div class="search-box">

<input type="text"
class="form-control"
placeholder="Search Student"
id="searchInput"
onkeyup="searchStudent()">

</div>

</div>

<div
class="notification-box"
id="notificationBox">

Student Removed Successfully

</div>

<div class="student-grid"
id="studentContainer">
<!-- Student 1 -->

<div class="student-card">

<div class="student-top">

<div class="student-img">

<i class="bi bi-person-fill"></i>

</div>

<div>

<div class="student-name">

Shanmukopriya

</div>

<div class="info">

CSE - 3rd Year

</div>

</div>

</div>

<div class="info">
🎓 Roll No : CSE23045
</div>

<div class="info">
🏠 Room : A-204
</div>

<div class="info">
📞 Contact : 9876543210
</div>

<div class="status-active">
Active
</div>

<div class="action-buttons">

<button
class="view-btn"
onclick="viewStudent('Shanmukopriya')">

View Details

</button>

<button
class="remove-btn"
onclick="removeStudent(this)">

Remove

</button>

</div>

</div>

<!-- Student 2 -->

<div class="student-card">

<div class="student-top">

<div class="student-img">

<i class="bi bi-person-fill"></i>

</div>

<div>

<div class="student-name">

Sruthi

</div>

<div class="info">

ECE - 2nd Year

</div>

</div>

</div>

<div class="info">
🎓 Roll No : ECE22014
</div>

<div class="info">
🏠 Room : B-105
</div>

<div class="info">
📞 Contact : 9876501234
</div>

<div class="status-leave">
On Leave
</div>

<div class="action-buttons">

<button
class="view-btn"
onclick="viewStudent('Sruthi')">

View Details

</button>

<button
class="remove-btn"
onclick="removeStudent(this)">

Remove

</button>

</div>

</div>

<!-- Student 3 -->

<div class="student-card">

<div class="student-top">

<div class="student-img">

<i class="bi bi-person-fill"></i>

</div>

<div>

<div class="student-name">

Kavya

</div>

<div class="info">

IT - 4th Year

</div>

</div>

</div>

<div class="info">
🎓 Roll No : IT21032
</div>

<div class="info">
🏠 Room : C-301
</div>

<div class="info">
📞 Contact : 9123456780
</div>

<div class="status-active">
Active
</div>

<div class="action-buttons">

<button
class="view-btn"
onclick="viewStudent('Kavya')">

View Details

</button>

<button
class="remove-btn"
onclick="removeStudent(this)">

Remove

</button>

</div>

</div>

</div>
<script>

function showNotification(msg){

const box =
document.getElementById(
'notificationBox'
);

box.innerHTML = msg;

box.style.display='block';

setTimeout(()=>{

box.style.display='none';

},3000);

}

function removeStudent(button){

const card =
button.closest('.student-card');

card.remove();

showNotification(
"Student Removed Successfully ❌"
);

}

function viewStudent(name){

let details = "";

if(name == "Shanmukopriya"){

details = `
Name : Shanmukopriya

Department : CSE

Year : 3rd Year

Roll No : CSE23045

Room : A-204

Phone : 9876543210

Email : shannu@gmail.com

Parent Contact : 9876500000

Blood Group : O+

Status : Active
`;

}

else if(name == "Sruthi"){

details = `
Name : Sruthi

Department : ECE

Year : 2nd Year

Roll No : ECE22014

Room : B-105

Phone : 9876501234

Email : sruthi@gmail.com

Parent Contact : 9123456789

Blood Group : A+

Status : On Leave
`;

}

else if(name == "Kavya"){

details = `
Name : Kavya

Department : IT

Year : 4th Year

Roll No : IT21032

Room : C-301

Phone : 9123456780

Email : kavya@gmail.com

Parent Contact : 9000011111

Blood Group : B+

Status : Active
`;

}

alert(details);

}

function searchStudent(){

let input =
document.getElementById(
'searchInput'
).value.toLowerCase();

let cards =
document.querySelectorAll(
'.student-card'
);

cards.forEach(card=>{

let name =
card.querySelector(
'.student-name'
).innerHTML.toLowerCase();

if(name.includes(input)){

card.style.display='block';

}
else{

card.style.display='none';

}

});

}

</script>

</body>
</html>