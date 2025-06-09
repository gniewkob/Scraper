import sys
import os

# Dodaj katalog aplikacji do ścieżki importu
sys.path.insert(0, os.path.dirname(__file__))

# Importuj aplikację Flask z dashboard
from dashboard.app import app as application
