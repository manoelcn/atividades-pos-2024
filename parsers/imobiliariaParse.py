from xml.dom.minidom import parse
import json


dom = parse('parsers/imobiliaria.xml')
imobiliaria = dom.documentElement
imoveis = imobiliaria.getElementsByTagName('imovel')

list_imobiliaria = []
dict_imobiliaria = {}

for imovel in imoveis:
    imoveis_dict = {}

    imoveis_dict['descricao'] = imovel.getElementsByTagName('descricao')[0].firstChild.nodeValue

    proprietario = imovel.getElementsByTagName('proprietario')[0]
    imoveis_dict['nome'] = proprietario.getElementsByTagName('nome')[0].firstChild.nodeValue
    emails =  proprietario.getElementsByTagName('email')
    for e in emails:
        imoveis_dict['email'] =e .firstChild.nodeValue
    telefones =  proprietario.getElementsByTagName('telefone')
    for t in telefones:
        imoveis_dict['telefone'] = t.firstChild.nodeValue

    endereco = imovel.getElementsByTagName('endereco')[0]
    imoveis_dict['rua'] = endereco.getElementsByTagName('rua')[0].firstChild.nodeValue
    imoveis_dict['bairo'] = endereco.getElementsByTagName('bairro')[0].firstChild.nodeValue
    imoveis_dict['cidade'] = cidade = endereco.getElementsByTagName('cidade')[0].firstChild.nodeValue
    numeros = endereco.getElementsByTagName('numero')
    for n in numeros: 
        imoveis_dict['numero'] = n.firstChild.nodeValue

    caracteristicas = imovel.getElementsByTagName('caracteristicas')[0]
    imoveis_dict['tamanho'] = caracteristicas.getElementsByTagName('tamanho')[0].firstChild.nodeValue
    imoveis_dict['numQuartos'] = caracteristicas.getElementsByTagName('numQuartos')[0].firstChild.nodeValue
    imoveis_dict['numBanheiros'] = caracteristicas.getElementsByTagName('numBanheiros')[0].firstChild.nodeValue

    imoveis_dict['valor'] = imovel.getElementsByTagName('valor')[0].firstChild.nodeValue

    list_imobiliaria.append(imoveis_dict)

dict_imobiliaria['imobiliaria'] = list_imobiliaria

with open("parsers/imobiliariaParse.json", "w", encoding="utf-8") as json_file:
    json.dump(dict_imobiliaria, json_file, indent=4, ensure_ascii=False)
