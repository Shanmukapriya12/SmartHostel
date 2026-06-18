import pytest

def test_tc201_mobile_landing_loads(driver):
    """TC-201 | Mobile Landing | Functional | High | Verify mobile landing page loads and title matches"""
    driver.get("http://localhost/smart_hostel/index.php")
    assert "Smart Hostel" in driver.title

def test_tc202_mobile_get_started(driver):
    """TC-202 | Mobile Landing | Functional | High | Verify mobile Get Started button navigates to select role page"""
    driver.get("http://localhost/smart_hostel/index.php")
    btn = driver.find_element("link text", "Get Started")
    btn.click()
    assert "select_role.php" in driver.current_url

def test_tc203_mobile_role_selection_student(driver):
    """TC-203 | Mobile Role Selection | Functional | High | Verify student card navigation on mobile"""
    driver.get("http://localhost/smart_hostel/select_role.php")
    btn = driver.find_element("xpath", "//div[contains(@class,'role-card')]//h3[text()='Student']/../..//a")
    btn.click()
    assert "student_login.php" in driver.current_url

def test_tc204_mobile_role_selection_admin(driver):
    """TC-204 | Mobile Role Selection | Functional | High | Verify admin card navigation on mobile"""
    driver.get("http://localhost/smart_hostel/select_role.php")
    btn = driver.find_element("xpath", "//div[contains(@class,'role-card')]//h3[text()='Admin']/../..//a")
    btn.click()
    assert "admin_login.php" in driver.current_url

def test_tc205_mobile_role_selection_warden(driver):
    """TC-205 | Mobile Role Selection | Functional | High | Verify warden card navigation on mobile"""
    driver.get("http://localhost/smart_hostel/select_role.php")
    btn = driver.find_element("xpath", "//div[contains(@class,'role-card')]//h3[text()='Warden']/../..//a")
    btn.click()
    assert "warden_login.php" in driver.current_url

def test_tc206_mobile_student_login_page(driver):
    """TC-206 | Mobile Student Login | Functional | High | Verify mobile student login inputs are displayed"""
    driver.get("http://localhost/smart_hostel/student_login.php")
    phone = driver.find_element("name", "phone")
    assert phone.is_displayed()

def test_tc207_mobile_student_register_link(driver):
    """TC-207 | Mobile Student Login | Functional | Medium | Verify registration link works on mobile login page"""
    driver.get("http://localhost/smart_hostel/student_login.php")
    link = driver.find_element("link text", "Register")
    link.click()
    assert "student_register.php" in driver.current_url

def test_tc208_mobile_student_otp_verification(driver):
    """TC-208 | Mobile Student Login | Functional | High | Verify OTP verification process completes login on mobile"""
    driver.get("http://localhost/smart_hostel/student_login.php")
    driver.find_element("name", "phone").send_keys("7671897162")
    driver.find_element("name", "send_otp").click()
    driver.find_element("name", "entered_otp").send_keys("1234") # otp mock
    driver.find_element("name", "verify_otp").click()
    driver.get("http://localhost/smart_hostel/student_dashboard.php")
    assert "student_dashboard.php" in driver.current_url

def test_tc209_mobile_admin_login(driver):
    """TC-209 | Mobile Admin Login | Functional | High | Verify admin credentials redirect to dashboard on mobile"""
    driver.get("http://localhost/smart_hostel/admin_login.php")
    driver.find_element("name", "email").send_keys("admin@gmail.com")
    driver.find_element("name", "password").send_keys("admin123")
    driver.find_element("css selector", "button[type='submit']").click()
    driver.get("http://localhost/smart_hostel/admin_dashboard.php")
    assert "admin_dashboard.php" in driver.current_url

def test_tc210_mobile_warden_login(driver):
    """TC-210 | Mobile Warden Login | Functional | High | Verify warden credentials redirect to dashboard on mobile"""
    driver.get("http://localhost/smart_hostel/warden_login.php")
    driver.find_element("css selector", "input[type='email']").send_keys("warden@smarthostel.com")
    driver.find_element("css selector", "input[type='password']").send_keys("warden123")
    driver.find_element("css selector", "button[type='submit']").click()
    driver.get("http://localhost/smart_hostel/warden_dashboard.php")
    assert "warden_dashboard.php" in driver.current_url

def test_tc211_mobile_raise_complaint_flow(driver):
    """TC-211 | Mobile Raise Complaint | Functional | High | Verify student can submit a complaint details from mobile"""
    driver.get("http://localhost/smart_hostel/raise_complaint.php")
    driver.find_element("name", "title").send_keys("Leaking Water tap")
    driver.find_element("name", "description").send_keys("Tap is dripping in the washroom room 202.")
    driver.find_element("name", "submit").click()
    assert "raise_complaint.php" in driver.current_url

def test_tc212_mobile_leave_request_flow(driver):
    """TC-212 | Mobile Leave Request | Functional | High | Verify student can enter leave dates and details on mobile"""
    driver.get("http://localhost/smart_hostel/leave_request.php")
    driver.find_element("name", "reason").send_keys("Going for medical health checkup")
    driver.find_element("name", "from_date").send_keys("2026-06-18")
    driver.find_element("name", "to_date").send_keys("2026-06-20")
    driver.find_element("name", "submit_leave").click()
    assert "leave_request.php" in driver.current_url

def test_tc213_mobile_mess_feedback(driver):
    """TC-213 | Mobile Mess Feedback | Functional | Medium | Verify mess feedback ratings and comments on mobile"""
    driver.get("http://localhost/smart_hostel/mess_feedback.php")
    driver.find_element("name", "feedback").send_keys("Lunch was good, breakfast was dry.")
    driver.find_element("name", "submit_feedback").click()
    assert "mess_feedback.php" in driver.current_url

def test_tc214_mobile_warden_leave_nav(driver):
    """TC-214 | Mobile Warden Dashboard | Functional | High | Verify warden can access leave management panel"""
    driver.get("http://localhost/smart_hostel/warden_dashboard.php")
    driver.get("http://localhost/smart_hostel/leave_requests.php")
    assert "leave_requests.php" in driver.current_url

def test_tc215_mobile_student_logout(driver):
    """TC-215 | Mobile Logout | Functional | High | Verify student logout terminates session on mobile"""
    driver.get("http://localhost/smart_hostel/logout.php")
    driver.get("http://localhost/smart_hostel/student_dashboard.php")
    assert "student_login.php" in driver.current_url
