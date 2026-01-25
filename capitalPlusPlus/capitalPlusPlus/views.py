import json
from django.shortcuts import render
from urllib.parse import quote_plus, urlencode
# Create your views here.

def index(request):
    return render(
        request,
        "index.html",
        context={
            "session":request.session.get("user"),
            "pretty": json.dumps(request.session.get("user"),indent=4),
        },
    )