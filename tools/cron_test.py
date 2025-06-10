#!/usr/bin/env python3
import os
import sys
import time
import platform
import subprocess
import logging
import datetime
import traceback
from pathlib import Path

# Setup logging
log_dir = Path(os.path.expanduser("~")) / "selenium_cron_logs"
log_dir.mkdir(exist_ok=True)
log_file = log_dir / f"cron_test_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.log"

logging.basicConfig(
	level=logging.INFO,
	format='%(asctime)s - %(levelname)s - %(message)s',
	handlers=[
		logging.FileHandler(log_file),
		logging.StreamHandler(sys.stdout)
	]
)

logger = logging.getLogger("cron_test")

def log_environment():
	"""Log environment details"""
	logger.info("=== Environment Information ===")
	logger.info(f"Python Version: {sys.version}")
	logger.info(f"Platform: {platform.platform()}")
	logger.info(f"Working Directory: {os.getcwd()}")
	logger.info(f"Script Path: {os.path.abspath(__file__)}")
	logger.info(f"User: {os.environ.get('USER', 'Unknown')}")
	logger.info(f"PATH: {os.environ.get('PATH', 'Not set')}")
	
	# Log Python executable path
	logger.info(f"Python Executable: {sys.executable}")
	
	# List installed packages
	try:
		pip_list = subprocess.check_output([sys.executable, "-m", "pip", "list"]).decode('utf-8')
		logger.info("Installed Packages:")
		for line in pip_list.splitlines()[:20]:  # Log first 20 packages
			logger.info(f"  {line}")
		if len(pip_list.splitlines()) > 20:
			logger.info(f"  ... and {len(pip_list.splitlines()) - 20} more packages")
	except Exception as e:
		logger.error(f"Failed to list installed packages: {e}")

def check_chrome_installation():
	"""Verify Chrome installation and version"""
	logger.info("=== Chrome Installation Check ===")
	
	chrome_paths = [
		"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",  # macOS
		"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",    # Windows
		"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
		"/usr/bin/google-chrome",                                        # Linux
		"/usr/bin/chromium-browser"
	]
	
	chrome_found = False
	for path in chrome_paths:
		if os.path.exists(path):
			logger.info(f"Chrome found at: {path}")
			chrome_found = True
			try:
				if platform.system() == "Windows":
					version_cmd = [path, "--version"]
				else:
					version_cmd = [path, "--version"]
				
				version_output = subprocess.check_output(version_cmd, stderr=subprocess.STDOUT).decode('utf-8').strip()
				logger.info(f"Chrome version: {version_output}")
			except Exception as e:
				logger.error(f"Failed to get Chrome version: {e}")
			break
	
	if not chrome_found:
		logger.error("Chrome not found in common locations")

def run_selenium_test():
	"""Run a simple Selenium test"""
	logger.info("=== Running Selenium Test ===")
	
	try:
		from selenium import webdriver
		from selenium.webdriver.chrome.options import Options
		from selenium.webdriver.chrome.service import Service
		from selenium.webdriver.common.by import By
		
		# Import local browser setup if available
		try:
			from core.browser import setup_chrome_browser
			logger.info("Using local browser setup function")
			driver = setup_chrome_browser(headless=True)
		except (ImportError, Exception) as e:
			logger.warning(f"Could not use local browser setup: {e}")
			logger.info("Falling back to default WebDriver setup")
			
			options = Options()
			options.add_argument("--headless=new")
			options.add_argument("--no-sandbox")
			options.add_argument("--disable-dev-shm-usage")
			
			try:
				from webdriver_manager.chrome import ChromeDriverManager
				from selenium.webdriver.chrome.service import Service
				logger.info("Setting up ChromeDriver using webdriver_manager")
				service = Service(ChromeDriverManager().install())
				driver = webdriver.Chrome(service=service, options=options)
			except Exception as e:
				logger.warning(f"Failed to use webdriver_manager: {e}")
				logger.info("Trying default Chrome WebDriver")
				driver = webdriver.Chrome(options=options)
		
		logger.info("WebDriver initialized successfully")
		
		# Navigate to a test page
		driver.get("https://www.google.com")
		logger.info(f"Page title: {driver.title}")
		
		# Take a screenshot
		screenshot_path = log_dir / f"screenshot_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
		driver.save_screenshot(str(screenshot_path))
		logger.info(f"Screenshot saved to: {screenshot_path}")
		
		# Close the browser
		driver.quit()
		logger.info("Test completed successfully")
		return True
	
	except Exception as e:
		logger.error(f"Selenium test failed: {e}")
		logger.error(traceback.format_exc())
		return False

def main():
	"""Main function"""
	logger.info("Starting cron test script")
	
	try:
		# Log environment details
		log_environment()
		
		# Check Chrome installation
		check_chrome_installation()
		
		# Run Selenium test
		success = run_selenium_test()
		
		# Log final result
		if success:
			logger.info("OVERALL TEST RESULT: SUCCESS")
		else:
			logger.error("OVERALL TEST RESULT: FAILED")
			
		logger.info(f"Log file saved to: {log_file}")
		
	except Exception as e:
		logger.error(f"Test script failed: {e}")
		logger.error(traceback.format_exc())

if __name__ == "__main__":
	main()

