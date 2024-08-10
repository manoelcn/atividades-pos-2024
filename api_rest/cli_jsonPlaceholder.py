import requests
import json


print(5*'=-' + ' MENU ' + '-='*5)
print('')
print('1 - Listar todos usuários.')
print('2 - Listar as tarefas de um usuário específico')
print('3 - Criar/Ler/Atualizar/Deletar um usuário')
print('')

escolha = int(input('Digite uma opção: '))

if escolha == 1:
    print('')
    print(5*'=-' + ' Lista de todos os usuários ' + '-='*5)
    users_url = 'https://jsonplaceholder.typicode.com/users'
    response = requests.get(users_url).json()
    for user in response:
        print(f"{user['id']} --- {user['username']}")
    print('')

elif escolha == 2:
    print('')
    user_especifico = int(input('Digite o id do usuário: '))
    print('')
    print(5*'=-' + ' Tarefas do usuário ' + '-='*5)
    user_todo_url = f'https://jsonplaceholder.typicode.com/users/{user_especifico}/todos'
    response = requests.get(user_todo_url).json()
    for user_post in response:
        print(f"Tarefa: {user_post['title']}")
    print('')

elif escolha == 3:
    print('')
    print(5*'=-' + ' CRUD de um usuário ' + '-='*5)
    print('1 - Criar')
    print('2 - Ler')
    print('3 - Atualizar')
    print('4 - Deletar')
    print('')

    crud = int(input('Escolha uma opção: '))
    
    if crud == 1:
        users_url = 'https://jsonplaceholder.typicode.com/users'
        username = input('Digite o username: ')
        new_user = {
                    "id": None,
                    "name": username,
                    "username": username,
                    "email": "Sincere@april.biz",
                    "address": {
                    "street": "Kulas Light",
                    "suite": "Apt. 556",
                    "city": "Gwenborough",
                    "zipcode": "92998-3874",
                    "geo": {
                        "lat": "-37.3159",
                        "lng": "81.1496"
                    }
                    },
                    "phone": "1-770-736-8031 x56442",
                    "website": "hildegard.org",
                    "company": {
                    "name": "Romaguera-Crona",
                    "catchPhrase": "Multi-layered client-server neural-net",
                    "bs": "harness real-time e-markets"
                    }
                }
        response = requests.post(users_url, json=new_user)
        print('')
        print(f"Usuário cadastrado com sucesso! {response.status_code}")
        print(f"User = {response.json()}")
        print('')
        
    elif crud == 2:
        user_especifico = int(input('Digite o id do usuário: '))
        user_url = f'https://jsonplaceholder.typicode.com/users/{user_especifico}'
        response = requests.get(user_url).json()
        print(f"User {user_especifico} = {response}")
        print('')

    elif crud == 3:
        print('Atualizar username')
        user_especifico = int(input('Digite o id do usuário: '))
        user_url = f'https://jsonplaceholder.typicode.com/users/{user_especifico}'
        username = input('Digite o username:')
        user = {"username": username}
        response = requests.patch(user_url, json=user)
        print(response.json())
        print('')

    elif crud == 4:
        user_especifico = int(input('Digite o id do usuário: '))
        user_url = f'https://jsonplaceholder.typicode.com/users/{user_especifico}'
        response = requests.delete(user_url)
        print(f"Usuário deletado com sucesso! {response.status_code}")
