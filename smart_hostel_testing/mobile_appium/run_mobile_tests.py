import os
import sys
import json
import time
import pytest

class MobileResultsPlugin:
    def __init__(self):
        self.results = []
        self.screenshots_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "screenshots")
        if not os.path.exists(self.screenshots_dir):
            os.makedirs(self.screenshots_dir)

    def pytest_runtest_makereport(self, item, call):
        if call.when == 'call':
            doc = item.obj.__doc__
            test_id = "TC-XXX"
            module = "Mobile General"
            category = "Functional"
            priority = "Medium"
            test_name = item.name
            
            if doc:
                parts = [p.strip() for p in doc.split('|')]
                if len(parts) >= 5:
                    test_id = parts[0]
                    module = parts[1]
                    category = parts[2]
                    priority = parts[3]
                    test_name = parts[4]

            status = "PASS"
            remarks = "Success"
            error_details = ""
            
            if call.excinfo is not None:
                status = "FAIL"
                remarks = str(call.excinfo.value)
                error_details = str(call.excinfo.traceback)

            duration = round(call.duration, 2)
            screenshot_file = f"{test_id.lower()}_mobile_screenshot.png"
            
            # Save screenshot if driver is active in fixture
            driver = item.funcargs.get("driver")
            if driver:
                try:
                    png_data = driver.get_screenshot_as_png()
                    screenshot_path = os.path.join(self.screenshots_dir, screenshot_file)
                    with open(screenshot_path, "wb") as f:
                        f.write(png_data)
                except Exception as e:
                    print(f"Failed to capture mobile screenshot: {e}")
                    screenshot_file = None
            else:
                screenshot_file = None

            self.results.append({
                "id": test_id,
                "module": f"Mobile: {module}",
                "category": category,
                "testName": test_name,
                "priority": priority,
                "status": status,
                "duration": duration,
                "remarks": remarks,
                "errorDetails": error_details,
                "screenshot": screenshot_file if screenshot_file and os.path.exists(os.path.join(self.screenshots_dir, screenshot_file)) else None
            })

def main():
    print("======================================================")
    print("   Smart Hostel - Appium Python Mobile Test Runner")
    print("======================================================")
    
    # Process Command Line arguments
    dry_run = "true"
    if "--live" in sys.argv:
        dry_run = "false"
        sys.argv.remove("--live")
        
    os.environ["APPIUM_DRY_RUN"] = dry_run
    
    # Run pytest
    plugin = MobileResultsPlugin()
    tests_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "tests")
    
    print(f"Starting pytest run on {tests_path} (Dry-Run: {dry_run})...")
    
    # We pass the tests folder path and run via pytest programmatically
    exit_code = pytest.main([tests_path, "-v", "-s"], plugins=[plugin])
    
    # Dump results JSON
    results_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "mobile_results.json")
    with open(results_path, "w") as f:
        json.dump(plugin.results, f, indent=2)
        
    print(f"\nMobile test runs completed. Code: {exit_code}")
    print(f"Results logged to mobile_results.json")
    
if __name__ == "__main__":
    main()
