import pytest

def test_tc226_mobile_unregistered_phone(driver):
    """TC-226 | Mobile Student Login | Validation | High | Verify registration error details message for bad phone"""
    driver.get("http://localhost/smart_hostel/student_login.php")
    driver.find_element("name", "phone").send_keys("0000000000")
    driver.find_element("name", "send_otp").click()
    body = driver.find_element("tag name", "body")
    assert "Not Registered" in body.text

def test_tc227_mobile_invalid_otp(driver):
    """TC-227 | Mobile Student Login | Validation | High | Verify validation error alert for bad OTP verification code"""
    driver.get("http://localhost/smart_hostel/student_login.php")
    driver.find_element("name", "phone").send_keys("9999999999")
    driver.find_element("name", "send_otp").click()
    driver.find_element("name", "entered_otp").send_keys("0000")
    driver.find_element("name", "verify_otp").click()
    body = driver.find_element("tag name", "body")
    assert "Invalid OTP" in body.text

def test_tc228_mobile_empty_login_block(driver):
    """TC-228 | Mobile Student Login | Validation | High | Verify HTML5 validation trigger on empty phone submit"""
    driver.get("http://localhost/smart_hostel/student_login.php")
    phone = driver.find_element("name", "phone")
    driver.find_element("name", "send_otp").click()
    # Mock driver attributes verify validity triggers
    val = phone.get_attribute("validity")
    assert not val.valid

def test_tc229_mobile_empty_admin_login(driver):
    """TC-229 | Mobile Admin Login | Validation | Medium | Verify email and password are marked as required in admin login form"""
    driver.get("http://localhost/smart_hostel/admin_login.php")
    email = driver.find_element("name", "email")
    driver.find_element("css selector", "button[type='submit']").click()
    val = email.get_attribute("validity")
    assert not val.valid

def test_tc230_mobile_empty_warden_login(driver):
    """TC-230 | Mobile Warden Login | Validation | Medium | Verify email and password are marked as required in warden login form"""
    driver.get("http://localhost/smart_hostel/warden_login.php")
    email = driver.find_element("css selector", "input[type='email']")
    driver.find_element("css selector", "button[type='submit']").click()
    val = email.get_attribute("validity")
    assert not val.valid

def test_tc231_mobile_empty_complaint_submit(driver):
    """TC-231 | Mobile Raise Complaint | Validation | High | Verify empty fields validation constraints for complaint form"""
    driver.get("http://localhost/smart_hostel/raise_complaint.php")
    title = driver.find_element("name", "title")
    driver.find_element("name", "submit").click()
    val = title.get_attribute("validity")
    assert not val.valid

def test_tc232_mobile_empty_leave_submit(driver):
    """TC-232 | Mobile Leave Request | Validation | High | Verify empty fields validation constraints for leave form"""
    driver.get("http://localhost/smart_hostel/leave_request.php")
    reason = driver.find_element("name", "reason")
    driver.find_element("name", "submit_leave").click()
    val = reason.get_attribute("validity")
    assert not val.valid

def test_tc233_mobile_empty_mess_feedback(driver):
    """TC-233 | Mobile Mess Feedback | Validation | Medium | Verify empty comments validation constraint on mobile mess feedback"""
    driver.get("http://localhost/smart_hostel/mess_feedback.php")
    feedback = driver.find_element("name", "feedback")
    driver.find_element("name", "submit_feedback").click()
    val = feedback.get_attribute("validity")
    assert not val.valid

def test_tc234_mobile_unauthorized_admin_page(driver):
    """TC-234 | Mobile Security Routing | Validation | Critical | Verify dashboard access blocks for unauthenticated student clients"""
    driver.get("http://localhost/smart_hostel/admin_dashboard.php")
    body = driver.find_element("tag name", "body")
    # Should display Login or Redirect
    assert "admin_dashboard.php" not in driver.current_url or "Login" in body.text or "Access Denied" in body.text

def test_tc235_mobile_unauthorized_warden_page(driver):
    """TC-235 | Mobile Security Routing | Validation | Critical | Verify leave dashboard access blocks for unauthenticated student clients"""
    driver.get("http://localhost/smart_hostel/warden_dashboard.php")
    body = driver.find_element("tag name", "body")
    assert "warden_dashboard.php" not in driver.current_url or "Login" in body.text or "Access Denied" in body.text
