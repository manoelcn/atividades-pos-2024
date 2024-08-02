from xml.dom.minidom import parse


dom = parse('parsers/cardapio.xml')
cardapio = dom.documentElement
pratos = cardapio.getElementsByTagName('prato')

print('MENU')
print('-='*30)
for prato in pratos:
    nome = prato.getElementsByTagName('nome')[0].firstChild.nodeValue
    id = prato.getAttribute('id')
    print(f"{nome} - {id}")
print('-='*30)
print('')
escolha = input('Digite o ID do prato para saber mais detalhes: ')
for prato in pratos:
    prato_escolhido = prato.getAttribute('id')
    print(prato_escolhido)