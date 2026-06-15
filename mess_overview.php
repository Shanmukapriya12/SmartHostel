<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Mess Overview</title>

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
background:#0f172a;
color:white;
min-height:100vh;
}

.container-box{
width:90%;
max-width:1400px;
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
color:white;
font-size:18px;
font-weight:600;
}

.heading h2{
font-size:42px;
font-weight:700;
margin:0;
}

.heading p{
margin:0;
color:#94a3b8;
}

.stats-grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
gap:20px;
margin-bottom:30px;
}

.stats-card{
background:#1e293b;
padding:25px;
border-radius:20px;
}

.stats-icon{
font-size:35px;
color:#38bdf8;
margin-bottom:10px;
}

.stats-number{
font-size:38px;
font-weight:700;
}

.stats-title{
color:#94a3b8;
}

.menu-section{
background:#1e293b;
padding:25px;
border-radius:20px;
margin-bottom:25px;
}

.section-title{
font-size:28px;
font-weight:700;
margin-bottom:20px;
}

.menu-grid{
display:grid;
grid-template-columns:
repeat(auto-fit,minmax(250px,1fr));
gap:20px;
}

.menu-card{
background:#334155;
padding:20px;
border-radius:15px;
}

.menu-card h4{
margin-bottom:15px;
}

.menu-item{
margin-bottom:8px;
color:#e2e8f0;
}

.feedback-card{
background:#334155;
padding:15px;
border-radius:15px;
margin-bottom:15px;
}

.rating{
color:#facc15;
font-weight:700;
}

</style>

</head>

<body>

<div class="container-box">

<div class="header">

<div class="left-header">

<a href="admin_dashboard.php" class="back-btn">

<i class="bi bi-arrow-left"></i>
Back

</a>

<div class="heading">

<h2>🍽 Mess Overview</h2>

<p>Monitor hostel mess performance and feedback</p>

</div>

</div>

</div>

<div class="stats-grid">
<div class="stats-card">

<div class="stats-icon">
<i class="bi bi-people-fill"></i>
</div>

<div class="stats-number">
250
</div>

<div class="stats-title">
Students Using Mess
</div>

</div>

<div class="stats-card">

<div class="stats-icon">
<i class="bi bi-star-fill"></i>
</div>

<div class="stats-number">
4.3
</div>

<div class="stats-title">
Average Rating
</div>

</div>

<div class="stats-card">

<div class="stats-icon">
<i class="bi bi-chat-left-text-fill"></i>
</div>

<div class="stats-number">
18
</div>

<div class="stats-title">
Food Complaints
</div>

</div>

<div class="stats-card">

<div class="stats-icon">
<i class="bi bi-cup-hot-fill"></i>
</div>

<div class="stats-number">
96%
</div>

<div class="stats-title">
Satisfaction Rate
</div>

</div>

</div>

<div class="menu-section">

<div class="section-title">

Today's Menu

</div>

<div class="menu-grid">

<div class="menu-card">

<h4>🌅 Breakfast</h4>

<div class="menu-item">🥞 Dosa</div>
<div class="menu-item">🥥 Coconut Chutney</div>
<div class="menu-item">☕ Tea / Coffee</div>

</div>

<div class="menu-card">

<h4>☀ Lunch</h4>

<div class="menu-item">🍚 Rice</div>
<div class="menu-item">🍲 Sambar</div>
<div class="menu-item">🥗 Veg Curry</div>

</div>

<div class="menu-card">

<h4>🌙 Dinner</h4>

<div class="menu-item">🥖 Chapathi</div>
<div class="menu-item">🧀 Paneer Curry</div>
<div class="menu-item">🥛 Milk</div>

</div>

</div>

</div>
<div class="menu-section">

<div class="section-title">

Recent Student Feedback

</div>

<div class="feedback-card">

<b>Shanmukopriya</b>

<br>

<span class="rating">
★★★★★
</span>

<br>

Food quality was very good.

</div>

<div class="feedback-card">

<b>Sruthi</b>

<br>

<span class="rating">
★★★★☆
</span>

<br>

Breakfast was excellent.

</div>

<div class="feedback-card">

<b>Kavya</b>

<br>

<span class="rating">
★★★☆☆
</span>

<br>

Need improvement in dinner menu.

</div>

</div>

</div>

</body>
</html>
