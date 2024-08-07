from xml.dom.minidom import parse
import json


dom = parse('parsers/imobiliaria.xml')
imobiliaria = dom.documentElement
imoveis = imobiliaria.getElementsByTagName('imovel')

dict_imobiliaria = {}

for imovel in imoveis:
    descricao = imovel.getElementsByTagName('descricao')[0].firstChild.nodeValue
    print(descricao)