import requests
import matplotlib.pyplot as plt

# Substitua com suas cidades preferidas
cities = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Porto Alegre"]

# API OpenWeather
API_KEY = 'sua_api_key'  # Coloque sua chave da API aqui
base_url = 'http://api.openweathermap.org/data/2.5/weather'

temperatures = []
humidities = []

for city in cities:
    response = requests.get(base_url, params={'q': city, 'appid': API_KEY, 'units': 'metric'})
    if response.status_code == 200:
        data = response.json()
        temperatures.append(data['main']['temp'])
        humidities.append(data['main']['humidity'])
    else:
        print(f"Erro ao obter dados para {city}: {response.status_code}")

# Criando gráficos
fig, ax1 = plt.subplots()

color = 'tab:red'
ax1.set_xlabel('Cidades')
ax1.set_ylabel('Temperatura (°C)', color=color)
ax1.bar(cities, temperatures, color=color, alpha=0.6, label='Temperatura')
ax1.tick_params(axis='y', labelcolor=color)

ax2 = ax1.twinx()  # Cria um segundo eixo y
color = 'tab:blue'
ax2.set_ylabel('Umidade (%)', color=color)
ax2.plot(cities, humidities, color=color, marker='o', label='Umidade')
ax2.tick_params(axis='y', labelcolor=color)

fig.tight_layout()  # Ajusta o layout
plt.title('Temperatura e Umidade das Cidades')
plt.show()
          
