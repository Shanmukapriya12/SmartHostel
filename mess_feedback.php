<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>Mess Feedback</title>

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
max-width:900px;
margin:30px auto;
}

.header{
display:flex;
align-items:center;
gap:15px;
margin-bottom:25px;
}

.back-btn{
text-decoration:none;
font-size:18px;
font-weight:600;
color:#111827;
}

.heading h2{
font-size:40px;
font-weight:700;
margin:0;
}

.heading p{
margin:0;
color:#64748b;
}

.feedback-card{
background:white;
padding:25px;
border-radius:20px;
box-shadow:0 5px 15px rgba(0,0,0,0.08);
margin-bottom:25px;
}

.feedback-card h4{
margin-bottom:15px;
font-weight:700;
}

.rating{
font-size:35px;
cursor:pointer;
color:#d1d5db;
}

.rating span.active{
color:#facc15;
}

textarea{
width:100%;
height:120px;
padding:12px;
border-radius:12px;
border:1px solid #d1d5db;
resize:none;
margin-top:10px;
}

.submit-btn{
background:#ea580c;
color:white;
border:none;
padding:12px 20px;
border-radius:12px;
font-weight:600;
margin-top:15px;
}

.notification{
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

<a href="student_dashboard.php"
class="back-btn">

<i class="bi bi-arrow-left"></i>
Back

</a>

<div class="heading">

<h2>🍽 Mess Feedback</h2>

<p>
Rate food quality and share feedback
</p>

</div>

</div>

<div class="notification"
id="notification">

Feedback Submitted Successfully ✅

</div>

<div class="feedback-card">

<h4>☀ Breakfast Rating</h4>

<div class="rating" id="breakfastRating">

<span onclick="rate(this,'breakfast')">★</span>
<span onclick="rate(this,'breakfast')">★</span>
<span onclick="rate(this,'breakfast')">★</span>
<span onclick="rate(this,'breakfast')">★</span>
<span onclick="rate(this,'breakfast')">★</span>

</div>

</div>

<div class="feedback-card">

<h4>🍛 Lunch Rating</h4>

<div class="rating" id="lunchRating">

<span onclick="rate(this,'lunch')">★</span>
<span onclick="rate(this,'lunch')">★</span>
<span onclick="rate(this,'lunch')">★</span>
<span onclick="rate(this,'lunch')">★</span>
<span onclick="rate(this,'lunch')">★</span>

</div>

</div>

<div class="feedback-card">

<h4>🌙 Dinner Rating</h4>

<div class="rating" id="dinnerRating">

<span onclick="rate(this,'dinner')">★</span>
<span onclick="rate(this,'dinner')">★</span>
<span onclick="rate(this,'dinner')">★</span>
<span onclick="rate(this,'dinner')">★</span>
<span onclick="rate(this,'dinner')">★</span>

</div>

</div>

<div class="feedback-card">

<h4>💬 Additional Feedback</h4>

<textarea
id="feedbackText"
placeholder="Write your feedback here..."></textarea>

<button
class="submit-btn"
onclick="submitFeedback()">

Submit Feedback

</button>

</div>
<script>

function rate(star,type){

let stars =
document.querySelectorAll(
'#' + type + 'Rating span'
);

let index =
Array.from(stars)
.indexOf(star);

stars.forEach((s,i)=>{

if(i<=index){

s.classList.add('active');

}
else{

s.classList.remove('active');

}

});

}

function submitFeedback(){

document.getElementById(
'notification'
).style.display='block';

setTimeout(()=>{

document.getElementById(
'notification'
).style.display='none';

},3000);

document.getElementById(
'feedbackText'
).value='';

}

</script>

</body>
</html>