from django.contrib.auth import authenticate
import json
import jwt
import requests


def jwt_decode_token(token):
    '''
    Fetch header from token to verify using public tokens
    Throw exception if no public key matches key ID with token
    Returns decoded access token
    '''
    header=jwt.get_unverified_header(token)
    jwks=requests.get('https://{}/.well-known/jwks.json'.format('dev-tlb3te2uklw5p303.us.auth0.com')).json()
    public_key=None
    for jwk in jwks['keys']:
        if(jwk['kid']==header['kid']):
            public_key=jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(jwk))
    if (public_key is None):
        raise Exception('Public Key not found')
    issuer='https://{}/'.format('dev-tlb3te2uklw5p303.us.auth0.com')
    return jwt.decode(token,public_key,audience='fundmental.tech/api',issuer=issuer,algorithms=['RS256'])
    
def username_from_jwt_payload(payload):
    '''formats subject (sub) field of jwt and creates a remote user in authentication system'''
    username=payload.get('sub').replace('|','.') 
    authenticate(remote_user=username)
    return username
