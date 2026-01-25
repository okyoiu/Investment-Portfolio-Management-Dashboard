from django.shortcuts import render
from functools import wraps
import jwt, uuid
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from authlib.integrations.django_oauth2 import ResourceProtector
from . import validator
from models import UserOrgRole, Organization
from django.db.models import F

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
            response=JsonResponse({'message':'Access restricted'})
            response.status_code=403
            return response
        return decorated
    return require_scope

# Create your views here.

@api_view(['POST'])
@requires_scope('GroupAccount')
def delete_group(request):
    if (request.method!='POST'):
        response=JsonResponse({'Method not allowed'})
        response.status_code=403
        return response
    group=request.POST.get('groupID')
    if (UserOrgRole.objects.filter(user=request.user, group=group).exists() and UserOrgRole.objects.get(user=request.user, group=group).role in ['ADMIN', 'PARENT']):
        Organization.objects.get(group=group).delete()
        return JsonResponse({'message': 'Success!'})
    response=JsonResponse({'message':'Access restricted'})
    response.status_code=404
    return response

@api_view(['POST'])
@requires_scope('Child')
def expense(request):
    if (request.method!='POST'):
        response=JsonResponse({'Method not allowed'})
        response.status_code=403
        return response
    if not (UserOrgRole.objects.filter(user=request.user).exists()):
        response=JsonResponse({'message':'Access restricted'})
        response.status_code=404
        return response
    value=request.POST.get('value')
    group=request.POST.get('groupID')
    currBal=Organization.objects.get(groupID=group).balance
    if (value<0 or currBal<0):
        response=JsonResponse({'message':'Insufficient value'})
        response.status_code=400
        return response
    
    Organization.objects.filter(groupID=group).update(balance=F("balance") - value)
    return JsonResponse({'message': 'Success!'})

@api_view(['POST'])
@requires_scope('Child')
def income(request):
    if (request.method!='POST'):
        response=JsonResponse({'Method not allowed'})
        response.status_code=403
        return response
    if not (UserOrgRole.objects.filter(user=request.user).exists()):
        response=JsonResponse({'message':'Access restricted'})
        response.status_code=404
        return response
    value=request.POST.get('value')
    group=request.POST.get('groupID')
    currBal=Organization.objects.get(groupID=group).balance
    if (value<0 or currBal<0):
        response=JsonResponse({'message':'Insufficient value'})
        response.status_code=400
        return response
    
    Organization.objects.filter(groupID=group).update(balance=F("balance") + value)
    return JsonResponse({'message': 'Success!'})

@api_view(['POST'])
@requires_scope('Child')
def create_group(request):
    if (request.method!='POST'):
        response=JsonResponse({'Method not allowed'})
        response.status_code=403
        return response
    name=request.POST.get('name')
    gid=uuid.uuid4
    Organization.objects.create(groupID=gid, groupName=name)
    UserOrgRole.objects.create(role="ADMIN", user=request.user,group=gid)
    return JsonResponse({'message': 'Group created.'})
