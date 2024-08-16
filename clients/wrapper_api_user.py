import requests


class usersAPIWrapper:
    def __init__(self):
        self.base_url = "https://jsonplaceholder.typicode.com/users"

    def list(self):
        response =  requests.get(self.base_url)
        return response.json()
    
    def create(self, user_data):
        response = requests.post(self.base_url, json=user_data)
        return response.json()

    def read(self, user_id):
        response = requests.get(f"{self.base_url}/{user_id}")
        return response.json()
    
    def update(self, user_id, user_data):
        response = requests.patch(f"{self.base_url}/{user_id}", json=user_data)
        return response.json()
    
    def delete(self, user_id):
        response = requests.delete(f"{self.base_url}/{user_id}")
        return response.status_code


api = usersAPIWrapper()

print(5 * '=-' + ' MENU ' + '-=' * 5)
print('')
print('1 - Listar todos os usuários.')
print('2 - Listar as tarefas de um usuário específico')
print('3 - Criar/Ler/Atualizar/Deletar um usuário')
print('')

escolha = int(input('Digite uma opção: '))

if escolha == 1:
    print('')
    print(5 * '=-' + ' Lista de todos os usuários ' + '-=' * 5)
    users = api.list()
    for user in users:
        print(f"{user['id']} --- {user['username']}")
    print('')

elif escolha == 2:
    print('')
    user_especifico = int(input('Digite o id do usuário: '))
    print('')
    print(5 * '=-' + ' Tarefas do usuário ' + '-=' * 5)
    user_todo_url = f'https://jsonplaceholder.typicode.com/users/{user_especifico}/todos'
    response = requests.get(user_todo_url).json()
    for user_post in response:
        print(f"Tarefa: {user_post['title']}")
    print('')

elif escolha == 3:
    print('')
    print(5 * '=-' + ' CRUD de um usuário ' + '-=' * 5)
    print('1 - Criar')
    print('2 - Ler')
    print('3 - Atualizar')
    print('4 - Deletar')
    print('')

    crud = int(input('Escolha uma opção: '))

    if crud == 1:
        username = input('Digite o username: ')
        new_user = {
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
        response = api.create(new_user)
        print('')
        print(f"Usuário cadastrado com sucesso!")
        print(f"User = {response}")
        print('')

    elif crud == 2:
        user_especifico = int(input('Digite o id do usuário: '))
        response = api.read(user_especifico)
        print(f"User {user_especifico} = {response}")
        print('')

    elif crud == 3:
        print('Atualizar username')
        user_especifico = int(input('Digite o id do usuário: '))
        username = input('Digite o username:')
        user = {"username": username}
        response = api.update(user_especifico, user)
        print(response)
        print('')

    elif crud == 4:
        user_especifico = int(input('Digite o id do usuário: '))
        status_code = api.delete(user_especifico)
        print(f"Usuário deletado com sucesso! Status: {status_code}")