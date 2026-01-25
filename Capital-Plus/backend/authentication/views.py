"""
Authentication views for Auth0 integration.
Based on Python capitalPlusPlus implementation.
"""
import json
import secrets
from authlib.integrations.django_client import OAuth
from django.conf import settings
from django.shortcuts import redirect
from django.urls import reverse
from django.http import JsonResponse
from urllib.parse import quote_plus, urlencode
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

# OAuth setup (matching Python capitalPlusPlus)
oauth = OAuth()

oauth.register(
    "auth0",
    client_id=settings.AUTH0_CLIENT_ID,
    client_secret=settings.AUTH0_CLIENT_SECRET,
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f"https://{settings.AUTH0_DOMAIN}/.well-known/openid-configuration",
)


@require_http_methods(["GET"])
def login(request):
    """Login route - redirects to Auth0 (matching Python capitalPlusPlus implementation)"""
    # Build callback URL - IMPORTANT: Must match exactly in callback
    callback_url = request.build_absolute_uri(reverse("authentication:callback"))
    # Remove trailing slash to ensure consistency
    callback_url = callback_url.rstrip('/')
    
    # Get screen_hint parameter (for signup vs login)
    screen_hint = request.GET.get('screen_hint', 'login')
    
    # Generate state for CSRF protection
    state = secrets.token_urlsafe(32)
    request.session['oauth_state'] = state
    # Also store callback URL to ensure exact match
    request.session['oauth_callback_url'] = callback_url
    
    # Build Auth0 authorization URL with screen_hint
    auth_url = (
        f"https://{settings.AUTH0_DOMAIN}/authorize?"
        f"client_id={settings.AUTH0_CLIENT_ID}&"
        f"response_type=code&"
        f"redirect_uri={quote_plus(callback_url)}&"
        f"scope=openid profile email&"
        f"state={state}"
    )
    
    # Add screen_hint if provided (for signup)
    if screen_hint == 'signup':
        auth_url += f"&screen_hint=signup"
    
    print(f"🔍 Redirecting to Auth0:")
    print(f"   Callback URL: {callback_url}")
    
    return redirect(auth_url)


@require_http_methods(["GET"])
def callback(request):
    """Callback route - handles Auth0 OAuth callback (matching Python capitalPlusPlus implementation)"""
    try:
        # Verify state (CSRF protection)
        state = request.GET.get('state')
        session_state = request.session.get('oauth_state')
        
        if state and session_state and state != session_state:
            print(f"❌ State mismatch: {state} != {session_state}")
            raise ValueError("Invalid state parameter - possible CSRF attack")
        
        # Clear state from session
        if 'oauth_state' in request.session:
            del request.session['oauth_state']
        
        # Get authorization code
        code = request.GET.get('code')
        if not code:
            error = request.GET.get('error')
            error_description = request.GET.get('error_description', '')
            print(f"❌ Auth0 error: {error} - {error_description}")
            raise ValueError(f"Authorization failed: {error_description or error}")
        
        # Exchange code for token manually (since we built URL manually)
        # IMPORTANT: redirect_uri must match EXACTLY what was used in authorization request
        callback_url = request.build_absolute_uri(reverse("authentication:callback"))
        # Remove trailing slash if present to match Auth0 exactly
        callback_url = callback_url.rstrip('/')
        
        # Use stored callback URL from session if available (to ensure exact match)
        stored_callback = request.session.get('oauth_callback_url')
        if stored_callback:
            callback_url = stored_callback
        
        # Check if Client Secret is set
        client_secret = settings.AUTH0_CLIENT_SECRET
        if (not client_secret or 
            client_secret == 'YOUR_AUTH0_CLIENT_SECRET_HERE' or
            client_secret == 'your-auth0-client-secret-here' or
            len(client_secret) < 20):  # Real secrets are much longer
            print("=" * 60)
            print("❌ AUTH0_CLIENT_SECRET ERROR!")
            print("=" * 60)
            print(f"   Current value: {client_secret}")
            print("   This is a PLACEHOLDER, not your actual secret!")
            print("")
            print("   TO FIX:")
            print("   1. Go to: https://manage.auth0.com/")
            print("   2. Applications → Your App → Settings")
            print("   3. Copy 'Client Secret'")
            print("   4. Edit backend/.env file")
            print("   5. Replace 'your-auth0-client-secret-here' with your actual secret")
            print("   6. Restart Django server")
            print("=" * 60)
            raise ValueError("AUTH0_CLIENT_SECRET is missing. See error message above for instructions.")
        
        import requests
        token_response = requests.post(
            f"https://{settings.AUTH0_DOMAIN}/oauth/token",
            json={
                "grant_type": "authorization_code",
                "client_id": settings.AUTH0_CLIENT_ID,
                "client_secret": settings.AUTH0_CLIENT_SECRET,
                "code": code,
                "redirect_uri": callback_url
            },
            headers={"Content-Type": "application/json"}
        )
        
        print(f"🔍 Token exchange request:")
        print(f"   URL: https://{settings.AUTH0_DOMAIN}/oauth/token")
        print(f"   Client ID: {settings.AUTH0_CLIENT_ID[:10]}...")
        print(f"   Redirect URI: {callback_url}")
        print(f"   Response Status: {token_response.status_code}")
        
        if not token_response.ok:
            print("=" * 60)
            print(f"❌ TOKEN EXCHANGE FAILED: {token_response.status_code}")
            print("=" * 60)
            print(f"   Response: {token_response.text}")
            print("")
            error_data = token_response.json() if token_response.text else {}
            error_desc = error_data.get('error_description', 'Unknown error')
            
            if 'Unauthorized' in error_desc or 'access_denied' in error_desc:
                print("   LIKELY CAUSE: AUTH0_CLIENT_SECRET is incorrect or missing")
                print("")
                print("   CHECK YOUR .env FILE:")
                print("   - Open: backend/.env")
                print("   - Find: AUTH0_CLIENT_SECRET")
                print("   - Make sure it's your ACTUAL secret from Auth0 Dashboard")
                print("   - NOT: 'your-auth0-client-secret-here'")
                print("")
                print("   Get it from:")
                print("   https://manage.auth0.com/ → Applications → Your App → Settings")
            print("=" * 60)
            raise ValueError(f"Token exchange failed: {error_desc}")
        
        token_data = token_response.json()
        
        # Store user session (matching Python: request.session["user"] = token)
        request.session["user"] = token_data
        
        # Fetch user info from Auth0
        userinfo_response = requests.get(
            f"https://{settings.AUTH0_DOMAIN}/userinfo",
            headers={"Authorization": f"Bearer {token_data.get('access_token')}"}
        )
        
        if not userinfo_response.ok:
            print(f"❌ Userinfo fetch failed: {userinfo_response.status_code}")
            raise ValueError("Failed to fetch user info")
        
        user_info = userinfo_response.json()
        
        # Ensure we have all user fields including picture
        # Auth0 userinfo includes: sub, name, email, picture, etc.
        print(f"✅ User info received: {user_info.get('email', 'Unknown')}")
        print(f"   Picture URL: {user_info.get('picture', 'Not provided')}")
        print(f"   Name: {user_info.get('name', 'Not provided')}")
        
        # Store user info in session
        request.session["user_info"] = user_info
        
        print(f"✅ User authenticated: {user_info.get('email', 'Unknown')}")
        
        # Redirect to frontend dashboard
        frontend_url = settings.CORS_ALLOWED_ORIGINS[0] if settings.CORS_ALLOWED_ORIGINS else 'http://localhost:5173'
        return redirect(f"{frontend_url}/dashboard")
        
    except Exception as e:
        print(f"❌ Auth0 callback error: {e}")
        import traceback
        traceback.print_exc()
        frontend_url = settings.CORS_ALLOWED_ORIGINS[0] if settings.CORS_ALLOWED_ORIGINS else 'http://localhost:5173'
        return redirect(f"{frontend_url}/login?error=auth_failed")


@require_http_methods(["GET"])
def logout(request):
    """Logout route - clears session and redirects to Auth0 logout (matching Python implementation)"""
    # Clear session (matching Python: request.session.clear())
    request.session.clear()
    
    # Redirect to Auth0 logout (matching Python implementation)
    frontend_url = settings.CORS_ALLOWED_ORIGINS[0] if settings.CORS_ALLOWED_ORIGINS else 'http://localhost:5173'
    return redirect(
        f"https://{settings.AUTH0_DOMAIN}/v2/logout?" + urlencode(
            {
                "returnTo": frontend_url,
                "client_id": settings.AUTH0_CLIENT_ID,
            },
            quote_via=quote_plus
        )
    )


@csrf_exempt
@require_http_methods(["GET"])
def get_user(request):
    """Get current authenticated user (API endpoint for frontend)"""
    if request.session.get("user") and request.session.get("user_info"):
        user_info = request.session.get("user_info")
        
        # Return user info with all Auth0 fields including picture
        return JsonResponse({
            "authenticated": True,
            "user": {
                "sub": user_info.get("sub"),
                "email": user_info.get("email"),
                "name": user_info.get("name"),
                "picture": user_info.get("picture"),  # Profile picture URL
                "nickname": user_info.get("nickname"),
                "given_name": user_info.get("given_name"),
                "family_name": user_info.get("family_name"),
                "email_verified": user_info.get("email_verified", False),
            }
        })
    else:
        return JsonResponse({
            "authenticated": False
        })
