from django.shortcuts import render
from functools import wraps
import jwt
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from authlib.integrations.django_oauth2 import ResourceProtector
from . import validator

require_auth = ResourceProtector()
validator = validator.Auth0JWTBearerTokenValidator(
    "dev-tlb3te2uklw5p303.us.auth0.com",
    "fundmental.tech/api"
)
require_auth.register_token_validator(validator)

#Validate scope of requested action
def get_token_auth_header(request):
    '''
    Authorization header follows structure <type> <credentials>
    Takes token from credentials portion of header
    '''
    auth=request.META.get("HTTP_AUTHORIZATION",None)
    parts=auth.split()
    token=parts[1]
    return token

def requires_scope(required_scope):
    '''
    Determines if the required scope is present in the user's access token
    i.e. checks if the user can perform the requested action
    Reference: https://www.ibm.com/docs/en/was-liberty/base?topic=uocpao2as-json-web-token-jwt-oauth-client-authorization-grants#cwlp_jwttoken__auth_scope
    '''
    def require_scope(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token=get_token_auth_header(args[0])
            decoded=jwt.decode(token,verify.token)
            if(decoded.get("scope")):
                token_scopes=decoded["scope"].split()
                for token_scope in token_scopes:
                    if token_scope==required_scope:
                        return f(*args, **kwargs)
            response=JsonResponse({'message:Access restricted'})
            response.status_code=403
            return response
        return decorated
    return require_scope

# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def public(request):
    return JsonResponse({'message': 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'})

@api_view(['GET'])
def private(request):
    return JsonResponse({'message': 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'})

@api_view(['GET'])
@requires_scope('read:messages')
def scoped(request):
    return JsonResponse({'message': 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'})


