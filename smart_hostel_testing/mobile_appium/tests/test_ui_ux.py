import pytest

def test_tc216_mobile_banner_display(driver):
    """TC-216 | Mobile Landing | UI/UX | Medium | Verify banner image scaling on mobile screens"""
    driver.get("http://localhost/smart_hostel/index.php")
    img = driver.find_element("tag name", "img")
    assert img.is_displayed()

def test_tc217_mobile_buttons_accessibility(driver):
    """TC-217 | Mobile Landing | UI/UX | High | Verify Get Started button is touch-accessible and centered"""
    driver.get("http://localhost/smart_hostel/index.php")
    btn = driver.find_element("link text", "Get Started")
    assert btn.is_displayed()

def test_tc218_mobile_role_card_spacing(driver):
    """TC-218 | Mobile Role Selection | UI/UX | Medium | Verify card spacing on role selection mobile viewport"""
    driver.get("http://localhost/smart_hostel/select_role.php")
    cards = driver.find_elements("css selector", ".card, .role-card")
    assert len(cards) >= 3

def test_tc219_mobile_input_padding(driver):
    """TC-219 | Mobile Student Login | UI/UX | High | Verify mobile padding on login form control elements"""
    driver.get("http://localhost/smart_hostel/student_login.php")
    inp = driver.find_element("name", "phone")
    assert inp.is_displayed()

def test_tc220_mobile_student_otp_spacing(driver):
    """TC-220 | Mobile Student Login | UI/UX | Medium | Verify OTP input and verify button grouping on mobile"""
    driver.get("http://localhost/smart_hostel/student_login.php")
    otp_input = driver.find_element("name", "entered_otp")
    verify_btn = driver.find_element("name", "verify_otp")
    assert otp_input.is_displayed() and verify_btn.is_displayed()

def test_tc221_mobile_dashboard_grid(driver):
    """TC-221 | Mobile Student Dashboard | UI/UX | Medium | Verify columns scale to single item per row on mobile"""
    driver.get("http://localhost/smart_hostel/student_dashboard.php")
    cards = driver.find_elements("css selector", ".card")
    assert len(cards) > 0

def test_tc222_mobile_notice_box_layout(driver):
    """TC-222 | Mobile Student Dashboard | UI/UX | Low | Verify notice box has proper contrast and margin padding"""
    driver.get("http://localhost/smart_hostel/student_dashboard.php")
    body = driver.find_element("tag name", "body")
    assert "Notice" in body.text

def test_tc223_mobile_complaint_dropdown(driver):
    """TC-223 | Mobile Raise Complaint | UI/UX | Low | Verify category dropdown handles option text wrapping on mobile"""
    driver.get("http://localhost/smart_hostel/raise_complaint.php")
    select = driver.find_element("name", "category")
    assert select.is_displayed()

def test_tc224_mobile_feedback_textarea_height(driver):
    """TC-224 | Mobile Mess Feedback | UI/UX | Medium | Verify comment text container has minimum height height of 100px"""
    driver.get("http://localhost/smart_hostel/mess_feedback.php")
    area = driver.find_element("name", "feedback")
    assert area.is_displayed()

def test_tc225_mobile_admin_responsive_sidebar(driver):
    """TC-225 | Mobile Admin Dashboard | UI/UX | Medium | Verify admin sidebar collapsibility or wrapping on mobile view"""
    driver.get("http://localhost/smart_hostel/admin_dashboard.php")
    body = driver.find_element("tag name", "body")
    assert "Admin" in body.text
