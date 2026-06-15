<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>Room Management</title>

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
color:#64748b;
margin:0;
}

.add-room-btn{
background:#4f46e5;
color:white;
border:none;
padding:12px 20px;
border-radius:12px;
font-weight:600;
}

.room-grid{
display:grid;
grid-template-columns:
repeat(auto-fit,minmax(350px,1fr));
gap:20px;
}

.room-card{
background:white;
padding:20px;
border-radius:20px;
box-shadow:0 5px 15px rgba(0,0,0,0.08);
}

.room-top{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:15px;
}

.room-title{
font-size:28px;
font-weight:700;
}

.badge-available{
background:#dcfce7;
color:#166534;
padding:8px 15px;
border-radius:20px;
font-weight:600;
}

.badge-full{
background:#fee2e2;
color:#991b1b;
padding:8px 15px;
border-radius:20px;
font-weight:600;
}

.info{
margin-bottom:8px;
color:#475569;
font-size:18px;
}

.facilities,
.occupants{
margin-top:12px;
background:#f8fafc;
padding:12px;
border-radius:12px;
}

.action-buttons{
display:flex;
gap:10px;
margin-top:15px;
flex-wrap:wrap;
}

.allocate-btn{
background:#2563eb;
color:white;
border:none;
padding:10px 14px;
border-radius:10px;
font-weight:600;
}

.edit-btn{
background:#f59e0b;
color:white;
border:none;
padding:10px 14px;
border-radius:10px;
font-weight:600;
}

.delete-btn{
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

.modal-header{
background:#4f46e5;
color:white;
}

.facility-btn{
border:1px solid #ddd;
padding:10px;
border-radius:10px;
text-align:center;
margin-bottom:10px;
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

<h2>🏠 Room Management</h2>

<p>
Manage hostel rooms and students
</p>

</div>

</div>

<button
class="add-room-btn"
data-bs-toggle="modal"
data-bs-target="#addRoomModal">

<i class="bi bi-plus-circle"></i>
Add Room

</button>

</div>

<div
class="notification-box"
id="notificationBox">

Action Completed Successfully

</div>

<div
class="room-grid"
id="roomContainer">

<!-- Room 1 -->

<div class="room-card">

<div class="room-top">

<div class="room-title">
Room A-204
</div>

<div class="badge-available room-status">
1 Bed Available
</div>

</div>

<div class="info">📍 Block : A Block</div>
<div class="info">🏢 Floor : 2nd Floor</div>
<div class="info">🛏 Capacity : 3 Beds</div>

<div class="facilities">

<h6>Facilities</h6>

WiFi • AC • Bathroom • Study Table

</div>

<div class="occupants">

<h6>Occupants</h6>

<span class="occupant-list">
Shanmukopriya, Sruthi
</span>

</div>

<div class="action-buttons">

<button
class="allocate-btn"
onclick="allocateRoom(this,'A-204')">
Allocate Student
</button>

<button
class="edit-btn"
onclick="editRoom(this)">
Edit
</button>

<button
class="delete-btn"
onclick="deleteRoom(this)">
Delete
</button>

</div>

</div>

<!-- Room 2 -->

<div class="room-card">

<div class="room-top">

<div class="room-title">
Room B-105
</div>

<div class="badge-full room-status">
Fully Occupied
</div>

</div>

<div class="info">📍 Block : B Block</div>
<div class="info">🏢 Floor : 1st Floor</div>
<div class="info">🛏 Capacity : 3 Beds</div>

<div class="facilities">

<h6>Facilities</h6>

WiFi • Fan • Bathroom

</div>

<div class="occupants">

<h6>Occupants</h6>

<span class="occupant-list">
Hamsa, Leena, Priya
</span>

</div>

<div class="action-buttons">

<button
class="edit-btn"
onclick="editRoom(this)">
Edit
</button>

<button
class="delete-btn"
onclick="deleteRoom(this)">
Delete
</button>

</div>

</div>

<!-- Room 3 -->

<div class="room-card">

<div class="room-top">

<div class="room-title">
Room C-301
</div>

<div class="badge-available room-status">
2 Beds Available
</div>

</div>

<div class="info">📍 Block : C Block</div>
<div class="info">🏢 Floor : 3rd Floor</div>
<div class="info">🛏 Capacity : 4 Beds</div>

<div class="facilities">

<h6>Facilities</h6>

WiFi • AC • Balcony

</div>

<div class="occupants">

<h6>Occupants</h6>

<span class="occupant-list">
Kavya, Nandhini
</span>

</div>

<div class="action-buttons">

<button
class="allocate-btn"
onclick="allocateRoom(this,'C-301')">
Allocate Student
</button>

<button
class="edit-btn"
onclick="editRoom(this)">
Edit
</button>

<button
class="delete-btn"
onclick="deleteRoom(this)">
Delete
</button>

</div>

</div>

</div>
<!-- Add Room Modal -->

<div class="modal fade"
id="addRoomModal">

<div class="modal-dialog modal-lg">

<div class="modal-content">

<div class="modal-header">

<h5 class="modal-title">
Add New Room
</h5>

<button
type="button"
class="btn-close btn-close-white"
data-bs-dismiss="modal">
</button>

</div>

<div class="modal-body">

<input type="text"
id="roomNumber"
class="form-control mb-3"
placeholder="Room Number">

<input type="text"
id="block"
class="form-control mb-3"
placeholder="Block">

<input type="text"
id="floor"
class="form-control mb-3"
placeholder="Floor">

<select
id="roomType"
class="form-control mb-3">

<option>Select Room Type</option>
<option>Single</option>
<option>Double</option>
<option>Triple</option>
<option>4 Sharing</option>

</select>

<input type="number"
id="capacity"
class="form-control mb-3"
placeholder="Capacity">

<label class="fw-bold">
Facilities
</label>

<div class="row mt-2">

<div class="col-6">
<input type="checkbox"
class="facility"
value="WiFi"> WiFi
</div>

<div class="col-6">
<input type="checkbox"
class="facility"
value="Fan"> Fan
</div>

<div class="col-6">
<input type="checkbox"
class="facility"
value="Attached Bathroom">
Attached Bathroom
</div>

<div class="col-6">
<input type="checkbox"
class="facility"
value="AC"> AC
</div>

<div class="col-6">
<input type="checkbox"
class="facility"
value="Study Table">
Study Table
</div>

<div class="col-6">
<input type="checkbox"
class="facility"
value="Wardrobe">
Wardrobe
</div>

</div>

</div>

<div class="modal-footer">

<button
class="btn btn-primary"
onclick="addRoom()">

Add Room

</button>

</div>

</div>

</div>

</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

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

function allocateRoom(button,roomNo){

let name =
prompt("Enter Student Name");

if(!name) return;

const card =
button.closest('.room-card');

const occupantList =
card.querySelector(
'.occupant-list'
);

let currentOccupants =
occupantList.innerHTML.trim();

if(
currentOccupants ==
"No Students Allocated" ||
currentOccupants ==
"None"
){

occupantList.innerHTML =
name;

}
else{

occupantList.innerHTML +=
", " + name;

}

const status =
card.querySelector(
'.room-status'
);

let statusText =
status.innerHTML;

let beds =
parseInt(statusText);

if(!isNaN(beds)){

beds--;

if(beds > 0){

status.innerHTML =
beds +
" Beds Available";

}
else{

status.innerHTML =
"Fully Occupied";

status.classList.remove(
'badge-available'
);

status.classList.add(
'badge-full'
);

button.remove();

}

}

showNotification(
name +
" allocated to Room " +
roomNo +
" ✅"
);

}
function editRoom(button){

showNotification(
"Room Details Updated ✏️"
);

}

function deleteRoom(button){

alert(
"Cannot delete room. Transfer students first."
);

}

function addRoom(){

const room =
document.getElementById(
'roomNumber'
).value;

const block =
document.getElementById(
'block'
).value;

const floor =
document.getElementById(
'floor'
).value;

const capacity =
document.getElementById(
'capacity'
).value;

const facilities =
document.querySelectorAll(
'.facility:checked'
);

let facilityList = [];

facilities.forEach(f => {

facilityList.push(
f.value
);

});

if(
room=="" ||
block=="" ||
floor=="" ||
capacity==""
){

alert(
"Fill all fields"
);

return;

}

const container =
document.getElementById(
'roomContainer'
);

const card =
document.createElement(
'div'
);

card.className =
'room-card';

card.innerHTML = `

<div class="room-top">

<div class="room-title">

Room ${room}

</div>

<div class="badge-available room-status">
${capacity} Bed${capacity > 1 ? 's' : ''} Available
</div>

</div>

<div class="info">

📍 Block : ${block}

</div>

<div class="info">

🏢 Floor : ${floor}

</div>

<div class="info">

🛏 Capacity : ${capacity} Beds

</div>

<div class="facilities">

<h6>Facilities</h6>

${facilityList.join(' • ')}

</div>

<div class="occupants">

<h6>Occupants</h6>

<span class="occupant-list">
No Students Allocated
</span>

</div>

<div class="action-buttons">

<button
class="allocate-btn"
onclick="allocateRoom(this,'${room}')">

Allocate Student

</button>

<button
class="edit-btn"
onclick="editRoom(this)">

Edit

</button>

<button
class="delete-btn"
onclick="deleteRoom(this)">

Delete

</button>

</div>

`;

container.appendChild(
card
);

bootstrap.Modal.getInstance(
document.getElementById(
'addRoomModal'
)
).hide();

showNotification(
'Room ' + room +
' Added Successfully ✅'
);

}
</script>

</body>
</html>