import json


with open('parsers/imobiliariaParse.json') as imobiliaria_json:
    imobiliaria_data = json.load(imobiliaria_json)

print(10*'-=' + ' MENU ' + '-='*10)
qtd_elementos = len(imobiliaria_data['imobiliaria'])

for i in range(qtd_elementos):
    descricao = imobiliaria_data['imobiliaria'][i]['descricao']
    print(f'{descricao} - {i + 1}')
print('-='*20)
print('')

imovel_escolhido = int(input('Digite o ID do imóvel para saber mais detalhes: ')) - 1
print('')

imovel = imobiliaria_data['imobiliaria'][imovel_escolhido]

descricao = imovel['descricao']
nome = imovel['nome']
email = imovel.get('email', '')
telefone = imovel.get('telefone', '')
rua = imovel['rua']
bairro = imovel['bairro']
cidade = imovel['cidade']
numero = imovel.get('numero', '')
tamanho = imovel['tamanho']
numQuartos = imovel['numQuartos']
numBanheiros = imovel['numBanheiros']
valor = imovel['valor']

print(f"Descrição: {descricao}")
print(f"Nome: {nome}")
if email:
    for e in email:
        print(f"Email: {e}")
if telefone:
    for t in telefone:
        print(f"Telefone: {t}")
print(f"Rua: {rua}")
print(f"Bairro: {bairro}")
print(f"Cidade: {cidade}")
print(f"Número: {numero}")
print(f"Tamanho: {tamanho}")
print(f"Número de Quartos: {numQuartos}")
print(f"Número de Banheiros: {numBanheiros}")
print(f"Valor: {valor}")



