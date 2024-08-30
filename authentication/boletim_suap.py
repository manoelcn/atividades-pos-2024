import requests
from getpass import getpass

api_url = "https://suap.ifrn.edu.br/api/"
athentication_url = f"{api_url}v2/autenticacao/token/"
boletim_url = f"{api_url}v2/minhas-informacoes/boletim/2024/1/"

user = input("user: ")
password = getpass()

data = {"username":user,"password":password}

response = requests.post(api_url+"v2/autenticacao/token/", json=data)
token = response.json()["access"]
print(response.json())

headers = {
    "Authorization": f'Bearer {token}'
}



skajd = "https://suap.ifrn.edu.br/api/v2/minhas-informacoes/boletim/2024/1/"

response = requests.get(skajd, headers=headers)
for nome in response.json():
    print(nome['disciplina'])
    print(nome['nota_etapa_1']['nota'])
