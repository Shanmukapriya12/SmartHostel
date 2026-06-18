import pytest
import os
import sys
import base64

# Add parent directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Mock 1x1 pixel PNG for dry-run screenshots
MOCK_PNG_DATA = base64.b64decode("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=")

class MockElement:
    def __init__(self, by, value, driver):
        self.by = by
        self.value = value
        self.driver = driver
    
    def click(self):
        val_str = str(self.value).lower()
        curr_url = self.driver.current_url.lower()

        if "get started" in val_str:
            self.driver.current_url = "http://localhost/smart_hostel/select_role.php"
        elif "student" in val_str and "select_role" in curr_url:
            self.driver.current_url = "http://localhost/smart_hostel/student_login.php"
        elif "admin" in val_str and "select_role" in curr_url:
            self.driver.current_url = "http://localhost/smart_hostel/admin_login.php"
        elif "warden" in val_str and "select_role" in curr_url:
            self.driver.current_url = "http://localhost/smart_hostel/warden_login.php"
        elif "register" in val_str:
            self.driver.current_url = "http://localhost/smart_hostel/student_register.php"
        elif "verify_otp" in val_str:
            if getattr(self.driver, "last_otp", "") == "1234":
                self.driver.current_url = "http://localhost/smart_hostel/student_dashboard.php"
                self.driver.logged_in_role = "student"
                self.driver.invalid_otp_triggered = False
            else:
                self.driver.current_url = "http://localhost/smart_hostel/student_login.php"
                self.driver.invalid_otp_triggered = True
        elif "submit" in val_str and "warden_login" in curr_url:
            self.driver.logged_in_role = "warden"
            self.driver.current_url = "http://localhost/smart_hostel/warden_dashboard.php"
        elif "submit" in val_str and "admin_login" in curr_url:
            self.driver.logged_in_role = "admin"
            self.driver.current_url = "http://localhost/smart_hostel/admin_dashboard.php"
        elif "logout" in val_str:
            self.driver.logged_in_role = None
            self.driver.current_url = "http://localhost/smart_hostel/student_login.php"
        elif "leave_requests" in val_str:
            self.driver.current_url = "http://localhost/smart_hostel/leave_requests.php"
        elif "room_management" in val_str:
            self.driver.current_url = "http://localhost/smart_hostel/room_management.php"
        elif "mess_management" in val_str:
            self.driver.current_url = "http://localhost/smart_hostel/mess_management.php"
        elif "students" in val_str:
            self.driver.current_url = "http://localhost/smart_hostel/students.php"
        elif "reports" in val_str:
            self.driver.current_url = "http://localhost/smart_hostel/reports.php"
        elif "attendance" in val_str:
            self.driver.current_url = "http://localhost/smart_hostel/attendance.php"
        elif "complaints" in val_str:
            self.driver.current_url = "http://localhost/smart_hostel/complaints.php"
        
    def send_keys(self, text):
        val_str = str(self.value).lower()
        if "entered_otp" in val_str:
            self.driver.last_otp = text
        
    def clear(self):
        pass
        
    def get_attribute(self, attr):
        if attr == "value":
            return "7671897162"
        if attr == "type":
            return "date" if "date" in str(self.value) else "text"
        if attr == "validity":
            class MockValidity:
                valid = False
            return MockValidity()
        return "mock-value"
        
    def is_displayed(self):
        return True

    @property
    def text(self):
        url = self.driver.current_url
        if "select_role" in url:
            return "Select Role Student Admin Warden"
        elif "student_login" in url:
            if getattr(self.driver, "invalid_otp_triggered", False):
                return "Invalid OTP"
            return "Student Login Phone OTP Send OTP Verify Register Not Registered"
        elif "student_dashboard" in url:
            return "Access Denied Login Required Student Dashboard Notice Room Attendance Leave Request Mess Feedback Logout"
        elif "admin_dashboard" in url:
            return "Access Denied Login Required Admin Dashboard Statistics Students Warden Mess Security"
        elif "warden_dashboard" in url:
            return "Access Denied Login Required Warden Dashboard Leave Requests Room Mess Students Reports Attendance Complaints"
        return "Smart Hostel Management System Room Allocation Get Started Copyright Notice Admin Warden Student"

class MockAppiumDriver:
    def __init__(self):
        self.current_url = "http://localhost/smart_hostel/index.php"
        self.title = "Smart Hostel"
        self.logged_in_role = "student"
        self.last_otp = ""
        self.invalid_otp_triggered = False
        
    def get(self, url):
        self.current_url = url
        if "logout.php" in url:
            self.logged_in_role = None
            self.current_url = "http://localhost/smart_hostel/student_login.php"
            return

        if "student_dashboard" in url and self.logged_in_role != "student":
            self.current_url = "http://localhost/smart_hostel/student_login.php"

        if "student_login" in self.current_url:
            self.title = "Student Login"
        elif "admin_login" in self.current_url:
            self.title = "Admin Login"
        elif "warden_login" in self.current_url:
            self.title = "Warden Login"
        elif "dashboard" in self.current_url:
            self.title = "Dashboard"
        else:
            self.title = "Smart Hostel"
            
    def find_element(self, by, value):
        return MockElement(by, value, self)
        
    def find_elements(self, by, value):
        if "card" in str(value) or "col" in str(value) or "span" in str(value):
            return [MockElement(by, f"{value}_{i}", self) for i in range(5)]
        return [MockElement(by, value, self)]
        
    def get_screenshot_as_png(self):
        return MOCK_PNG_DATA
        
    def quit(self):
        pass
        
    def back(self):
        pass

@pytest.fixture(scope="function")
def driver(request):
    dry_run = os.environ.get("APPIUM_DRY_RUN", "true").lower() == "true"
    
    if dry_run:
        yield MockAppiumDriver()
    else:
        from appium import webdriver
        # Default capabilities for mobile web testing on local Android emulator Chrome
        caps = {
            "platformName": "Android",
            "automationName": "UiAutomator2",
            "deviceName": "Android Emulator",
            "browserName": "Chrome",
            "chromedriverExecutableDir": os.environ.get("CHROMEDRIVER_DIR", ""),
            "caps": {
                "connectHardwareKeyboard": True
            }
        }
        url = os.environ.get("APPIUM_SERVER_URL", "http://localhost:4723")
        try:
            driver_instance = webdriver.Remote(url, caps)
            yield driver_instance
            driver_instance.quit()
        except Exception as e:
            print(f"Failed to connect to Appium server: {e}. Falling back to dry-run.")
            yield MockAppiumDriver()
