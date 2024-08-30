import requests
from getpass import getpass

api_url = "https://suap.ifrn.edu.br/api/"
authentication_url = f"{api_url}v2/autenticacao/token/"
user = input("Usuário: ")
password = getpass()

data = {"username":user,"password":password}
response = requests.post(authentication_url, json=data)
token = response.json()['access']
headers = {"Authorization": f'Bearer {token}'}

ano_letivo = input('Digite o ano letivo: ')
periodo_letivo = input('Digite o período letivo: ')
print('')
boletim_url = f"{api_url}v2/minhas-informacoes/boletim/{ano_letivo}/{periodo_letivo}/"

response = requests.get(boletim_url, headers=headers)

for data in response.json():
    print(f"{data['disciplina']}")
    print(f"Nota etapa 1 - {data['nota_etapa_1']['nota']}")
    print(f"Nota etapa 2 - {data['nota_etapa_2']['nota']}")
    print(f"Nota etapa 3 - {data['nota_etapa_3']['nota']}")
    print(f"Nota etapa 4 - {data['nota_etapa_4']['nota']}")
    print(f"Média final - {data['media_final_disciplina']}")
    print(f"Número de faltas - {data['numero_faltas']}")
    print('')
