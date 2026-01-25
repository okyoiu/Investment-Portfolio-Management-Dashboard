"""
WSGI config for capitalplus project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'capitalplus.settings')

application = get_wsgi_application()
