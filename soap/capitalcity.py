import requests
import xml.dom.minidom


url = "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso"
headers = {
	'Content-Type': 'text/xml; charset=utf-8'
}

print('MENU')
print('1 - Capital City')
print('2 - Country Name')
print('3 - Country Currency')
print('')

operation = input('Escolha uma operação: ')

if operation == '1':
    capital_city = input('Digite o código do país: ')
    payload = f"""<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        <CapitalCity xmlns="http://www.oorsprong.org/websamples.countryinfo">
                            <sCountryISOCode>{capital_city}</sCountryISOCode>
                        </CapitalCity>
                    </soap:Body>
                </soap:Envelope>"""
    response = requests.request("POST", url, headers=headers, data=payload)
    dom = xml.dom.minidom.parseString(response.text)
    result = dom.getElementsByTagName('m:CapitalCityResult')[0].firstChild.nodeValue
    print(f"Capital: {result}")

elif operation == '2':
    country_name = input('Digite o código do país: ')
    payload = f"""<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        <CountryName xmlns="http://www.oorsprong.org/websamples.countryinfo">
                            <sCountryISOCode>{country_name}</sCountryISOCode>
                        </CountryName>
                    </soap:Body>
                </soap:Envelope>"""
    response = requests.request("POST", url, headers=headers, data=payload)
    dom = xml.dom.minidom.parseString(response.text)
    result = dom.getElementsByTagName('m:CountryNameResult')[0].firstChild.nodeValue
    print(f"Nome: {result}")

elif operation == '3':
    country_currency = input('Digite o código do país: ')
    payload = f"""<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        <CountryCurrency xmlns="http://www.oorsprong.org/websamples.countryinfo">
                            <sCountryISOCode>{country_currency}</sCountryISOCode>
                        </CountryCurrency>
                    </soap:Body>
                </soap:Envelope>"""
    response = requests.request("POST", url, headers=headers, data=payload)
    dom = xml.dom.minidom.parseString(response.text)
    ISOcode = dom.getElementsByTagName('m:sISOCode')[0].firstChild.nodeValue
    Name = dom.getElementsByTagName('m:sName')[0].firstChild.nodeValue
    print(f"Moeda: {ISOcode} - {Name}")

else:
    print('Escolhesse errado visse.')
