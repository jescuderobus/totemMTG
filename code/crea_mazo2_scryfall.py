import requests
import time
import json

# URL de la API para obtener una carta aleatoria
url = "https://api.scryfall.com/cards/random"

# Lista para almacenar los JSON de las cartas
cartas = []

for _ in range(100):
    try:
        # Realizar la solicitud a la API
        response = requests.get(url)
        if response.status_code == 200:
            # Añadir el JSON de la carta a la lista
            cartas.append(response.json())
        else:
            print(f"Error al obtener la carta: {response.status_code}")
        
        # Esperar un poco entre solicitudes para no sobrecargar la API
        time.sleep(0.1)
    except Exception as e:
        print(f"Se produjo un error: {e}")

# Guardar la lista de cartas en un archivo JSON
with open("mazo2_scryfall.json", "w") as archivo:
    json.dump(cartas, archivo)

print("Se han guardado 100 cartas aleatorias en mazo1.json.")