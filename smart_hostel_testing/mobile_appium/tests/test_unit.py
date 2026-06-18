import pytest
import re

def test_tc236_unit_phone_regex():
    """TC-236 | Mobile General | Unit | Medium | Verify Python regex logic matches typical Indian mobile formats"""
    phone_pattern = re.compile(r"^[6-9]\d{9}$")
    assert phone_pattern.match("9876543210")
    assert phone_pattern.match("7671897162")
    assert not phone_pattern.match("1234567890")
    assert not phone_pattern.match("98765abcde")

def test_tc237_unit_otp_generator():
    """TC-237 | Mobile General | Unit | Medium | Verify mathematical limits of simulated random verification codes"""
    import random
    otp = str(random.randint(1000, 9999))
    assert len(otp) == 4
    assert otp.isdigit()

def test_tc238_unit_date_validator():
    """TC-238 | Mobile General | Unit | Medium | Verify date chronological checks for leave request inputs"""
    from datetime import datetime
    def is_valid_range(start_str, end_str):
        start = datetime.strptime(start_str, "%Y-%m-%d")
        end = datetime.strptime(end_str, "%Y-%m-%d")
        return start <= end

    assert is_valid_range("2026-06-18", "2026-06-20")
    assert not is_valid_range("2026-06-20", "2026-06-18")
    assert is_valid_range("2026-06-18", "2026-06-18")

def test_tc239_unit_average_rating():
    """TC-239 | Mobile General | Unit | Medium | Verify average ratings calculation logic for mess items"""
    def calc_avg(b, l, d):
        return round((b + l + d) / 3.0, 1)

    assert calc_avg(5, 4, 3) == 4.0
    assert calc_avg(5, 5, 5) == 5.0
    assert calc_avg(3, 2, 3) == 2.7

def test_tc240_unit_url_query_builder():
    """TC-240 | Mobile General | Unit | Low | Verify query parameter formatting helper returns correct query strings"""
    from urllib.parse import urlencode
    params = {"role": "student", "page": "my room"}
    query_str = urlencode(params)
    assert query_str == "role=student&page=my+room"

def test_tc241_unit_caps_formatter():
    """TC-241 | Mobile General | Unit | Low | Verify Appium capability formatting helper maps types correctly"""
    def format_caps(platform, browser):
        return {
            "platformName": platform,
            "browserName": browser,
            "automationName": "UiAutomator2" if platform.lower() == "android" else "XCUITest"
        }
    caps = format_caps("Android", "Chrome")
    assert caps["platformName"] == "Android"
    assert caps["automationName"] == "UiAutomator2"

def test_tc242_unit_email_validator():
    """TC-242 | Mobile General | Unit | Medium | Verify regex validation checks for admin and warden email formats"""
    email_pattern = re.compile(r"^[\w\.-]+@[\w\.-]+\.\w+$")
    assert email_pattern.match("warden@smarthostel.com")
    assert email_pattern.match("admin@gmail.com")
    assert not email_pattern.match("invalid-email")
    assert not email_pattern.match("warden@smarthostel")

def test_tc243_unit_alert_class_builder():
    """TC-243 | Mobile General | Unit | Low | Verify CSS style classes mapping logic for status flags"""
    def get_alert_css(status):
        mapping = {"PASS": "alert-success", "FAIL": "alert-danger", "SKIP": "alert-warning"}
        return mapping.get(status, "alert-secondary")
        
    assert get_alert_css("PASS") == "alert-success"
    assert get_alert_css("FAIL") == "alert-danger"
    assert get_alert_css("INVALID") == "alert-secondary"

def test_tc244_unit_duration_formatter():
    """TC-244 | Mobile General | Unit | Low | Verify stopwatch execution timing format string outputs"""
    def format_duration(seconds):
        return f"{seconds:.2f}s"
        
    assert format_duration(0.354) == "0.35s"
    assert format_duration(1.2) == "1.20s"

def test_tc245_unit_file_extension_check():
    """TC-245 | Mobile General | Unit | Medium | Verify file upload extension checks reject invalid file types"""
    allowed = ["jpg", "jpeg", "png", "pdf"]
    def is_allowed_file(filename):
        ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
        return ext in allowed
        
    assert is_allowed_file("receipt.pdf")
    assert is_allowed_file("avatar.png")
    assert not is_allowed_file("malicious.exe")
    assert not is_allowed_file("no_extension")
