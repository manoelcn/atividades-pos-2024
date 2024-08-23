import requests
from requests.auth import HTTPBasicAuth


user = input('Digite o usuário: ')
token = input('Digite o token: ')
print('')

print(5*'=-' + ' MENU ' + '-='*5)
print('1 - Seguir usuário.')
print('2 - Deixar de seguir um usuário.')
print('3 - Listar seus seguidores.')
print('-='*13)

print('')
choice = input('Digite a opção escolhida: ')
print('-='*13)

if choice == '1':
    print('')
    username = input('Digite o nome usuário que vai ser seguido (username): ')
    response = requests.put(f"https://api.github.com/user/following/{username}", auth=HTTPBasicAuth(user, token))
    if response.status_code == 204:
        print('')
        print('-='*13)
        print(f'Usuário {username} foi seguido!')
        print('-='*13)
    else:
        print('')
        print('-='*13)
        print(f'Vixe, deu ruim! {response.status_code}')
        print('-='*13)

elif choice == '2':
    print('')
    followers = requests.get(f'https://api.github.com/user/following', auth=HTTPBasicAuth(user, token))
    print('Pessoas que você segue: ')
    for follower in followers.json():
        print(f"{follower['login']}")
    print('')

    username = input('Digite o nome usuário que vai deixar de ser seguido (username): ')
    response = requests.delete(f"https://api.github.com/user/following/{username}", auth=HTTPBasicAuth(user, token))
    if response.status_code == 204:
        print('')
        print('-='*13)
        print(f'Você deixou de seguir {username}!')
        print('-='*13)
    else:
        print('')
        print('-='*13)
        print(f'Vixe, deu ruim! {response.status_code}')
        print('-='*13)

elif choice == '3':
    followers = requests.get(f'https://api.github.com/user/followers', auth=HTTPBasicAuth(user, token))
    print('')
    print('Seus seguidores: ')
    for index, follower in enumerate(followers.json(), start=1):
        print(f"{index} - {follower['login']}")
    print('')
    print('-='*13)

else:
    print('vôti! escolhesse errado visse.')
