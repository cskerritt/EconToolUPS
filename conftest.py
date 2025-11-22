"""
Pytest configuration: ensure repository modules are importable regardless of CWD.
"""
import os
import sys

ROOT_DIR = os.path.abspath(os.path.dirname(__file__))
BACKEND_DIR = os.path.join(ROOT_DIR, 'backend')

for path in (ROOT_DIR, BACKEND_DIR):
    if path not in sys.path:
        sys.path.insert(0, path)
