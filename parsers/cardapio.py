from xml.dom.minidom import parse


dom = parse('parsers/cardapio.xml')
cardapio = dom.documentElement
pratos = cardapio.getElementsByTagName('prato')

print('MENU')
print('-='*30)
id = 1
for prato in pratos:
    nome = prato.getElementsByTagName('nome')[0].firstChild.nodeValue
    print(f"{nome} - {id}")
    id += 1
print('-='*30)

prato_escolhido = int(input('Digite o ID do prato para saber mais detalhes: '))
print("")
prato = pratos[prato_escolhido-1]

nome = prato.getElementsByTagName('nome')[0].firstChild.nodeValue
descricao = prato.getElementsByTagName('descricao')[0].firstChild.nodeValue
ingredientes = prato.getElementsByTagName('ingredientes')[0].getElementsByTagName('ingrediente')
preco = prato.getElementsByTagName('preco')[0].firstChild.nodeValue
moeda = prato.getElementsByTagName('preco')[0].getAttribute('moeda')
calorias = prato.getElementsByTagName('calorias')[0].firstChild.nodeValue
tempo_preparo = prato.getElementsByTagName('tempoPreparo')[0].firstChild.nodeValue

print(f"Nome: {nome}")
print(f"Descrição: {descricao}")
print("Ingredientes:")
for ingrediente in ingredientes:
    print(f" - {ingrediente.firstChild.nodeValue}")
print(f"Preço: {moeda}{preco}")
print(f"Calorias: {calorias}")
print(f"Tempo de Preparo: {tempo_preparo}")
