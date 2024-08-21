import zeep


wsdl_url_country = "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL"
client_country = zeep.Client(wsdl=wsdl_url_country)
country_code = "NO"
result_country = client_country.service.CapitalCity(sCountryISOCode=country_code)
print(f"Capital da Noruega: {result_country}")


wsdl_url_number = 'https://www.dataaccess.com/webservicesserver/NumberConversion.wso?WSDL'
client_number = zeep.Client(wsdl=wsdl_url_number)
number = input('Digite um número: ')
result_number = client_number.service.NumberToWords(ubiNum=number)
print(f"Número por extenso: {result_number.title()}")
