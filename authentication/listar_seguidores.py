import requests
from requests.auth import HTTPBasicAuth


user = input('digite o usuário: ')
token = input('digite o token: ')

response = requests.get(f'https://api.github.com/user/followers', auth = HTTPBasicAuth(user, token))

print
for seguidor in response.json():
    print(seguidor['login'])

