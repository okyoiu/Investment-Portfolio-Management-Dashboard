"""
API views - converted from Node.js controllers.
"""
import jwt
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils import timezone
from .models import User

JWT_SECRET = settings.SECRET_KEY


@csrf_exempt
@require_http_methods(["GET"])
def health_check(request):
    """Health check endpoint"""
    return JsonResponse({
        "status": "ok",
        "message": "Capital Plus API is running",
        "timestamp": timezone.now().isoformat()
    })


@csrf_exempt
@require_http_methods(["POST"])
def signup(request):
    """Email/Password signup - converted from Node.js"""
    try:
        import json
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        
        # Validate required fields
        if not email or not password:
            return JsonResponse({
                "error": "Bad Request",
                "message": "Email and password are required"
            }, status=400)
        
        # Check if user already exists
        existing_user = User.find_by_email(email)
        if existing_user:
            return JsonResponse({
                "error": "Conflict",
                "message": "User with this email already exists"
            }, status=409)
        
        # Create new user
        user = User.objects.create(
            email=email,
            name=name or None,
            account_created=timezone.now()
        )
        user.set_password(password)
        user.save()
        
        # Generate JWT token
        token = jwt.encode(
            {"userId": str(user.id), "email": user.email},
            JWT_SECRET,
            algorithm="HS256"
        )
        
        print(f"✅ New user created: {user.email}")
        
        return JsonResponse({
            "success": True,
            "message": "Account created successfully",
            "token": token,
            "user": {
                "id": str(user.id),
                "email": user.email,
                "name": user.name,
                "accountCreated": user.account_created.isoformat(),
                "savingsGoals": []
            }
        }, status=201)
        
    except json.JSONDecodeError:
        return JsonResponse({
            "error": "Bad Request",
            "message": "Invalid JSON"
        }, status=400)
    except Exception as e:
        print(f"❌ Error in signup: {e}")
        return JsonResponse({
            "error": "Internal Server Error",
            "message": "Failed to create account. Please try again."
        }, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def login(request):
    """Email/Password login - converted from Node.js"""
    try:
        import json
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        # Validate required fields
        if not email or not password:
            return JsonResponse({
                "error": "Bad Request",
                "message": "Email and password are required"
            }, status=400)
        
        # Find user by email
        user = User.find_by_email(email)
        
        if not user:
            return JsonResponse({
                "error": "Unauthorized",
                "message": "Invalid email or password"
            }, status=401)
        
        # Check if user has a password
        if not user.password:
            return JsonResponse({
                "error": "Unauthorized",
                "message": "Please use Auth0 to sign in with this account"
            }, status=401)
        
        # Compare password
        if not user.check_password(password):
            return JsonResponse({
                "error": "Unauthorized",
                "message": "Invalid email or password"
            }, status=401)
        
        # Generate JWT token
        token = jwt.encode(
            {"userId": str(user.id), "email": user.email},
            JWT_SECRET,
            algorithm="HS256"
        )
        
        print(f"✅ User logged in: {user.email}")
        
        return JsonResponse({
            "success": True,
            "message": "Login successful",
            "token": token,
            "user": {
                "id": str(user.id),
                "email": user.email,
                "name": user.name,
                "accountCreated": user.account_created.isoformat(),
                "savingsGoals": []
            }
        })
        
    except json.JSONDecodeError:
        return JsonResponse({
            "error": "Bad Request",
            "message": "Invalid JSON"
        }, status=400)
    except Exception as e:
        print(f"❌ Error in login: {e}")
        return JsonResponse({
            "error": "Internal Server Error",
            "message": "Failed to login. Please try again."
        }, status=500)


@csrf_exempt
@require_http_methods(["GET"])
def get_user_profile(request):
    """Get user profile - converted from Node.js"""
    try:
        # Get token from Authorization header
        auth_header = request.META.get('HTTP_AUTHORIZATION', '')
        if not auth_header.startswith('Bearer '):
            return JsonResponse({
                "error": "Unauthorized",
                "message": "No authentication provided"
            }, status=401)
        
        token = auth_header.split(' ')[1]
        
        # Decode JWT token
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            user_id = payload.get('userId')
        except jwt.InvalidTokenError:
            return JsonResponse({
                "error": "Unauthorized",
                "message": "Invalid token"
            }, status=401)
        
        # Find user by ID
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return JsonResponse({
                "error": "Not Found",
                "message": "User not found"
            }, status=404)
        
        # Get savings goals
        savings_goals = [
            {
                "id": str(goal.id),
                "title": goal.title,
                "currentAmount": float(goal.current_amount),
                "targetAmount": float(goal.target_amount)
            }
            for goal in user.savings_goals.all()
        ]
        
        return JsonResponse({
            "success": True,
            "user": {
                "id": str(user.id),
                "auth0Id": user.auth0_id,
                "email": user.email,
                "name": user.name,
                "accountCreated": user.account_created.isoformat(),
                "savingsGoals": savings_goals,
                "updatedAt": user.updated_at.isoformat()
            }
        })
        
    except Exception as e:
        print(f"❌ Error in get_user_profile: {e}")
        return JsonResponse({
            "error": "Internal Server Error",
            "message": "Failed to retrieve user profile"
        }, status=500)
