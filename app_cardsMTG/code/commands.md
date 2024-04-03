# Descargamos un mazo de 100

```python
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
with open("mazo1.json", "w") as archivo:
    json.dump(cartas, archivo)

print("Se han guardado 100 cartas aleatorias en mazo1.json.")
```

## Creamos el fichero de mazo
python3 crea_mazo2_scryfall.py

jq '.[].multiverseid' cards.json

jq '.cards[] | select(.multiverseid != null) | .multiverseid' cards.json > multiverseids.json

jq '.cards[] | select(.name!= null) | .name' cards.json > nombres.txt



curl -f -O https://api.scryfall.com/cards/multiverse/130550/png/

jq '.[].image_uris.png' mazo1_scryfall.json

