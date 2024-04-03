import json
import requests

# Cargar el JSON original
with open('api_omeka_All.json', 'r') as file:
    data = json.load(file)

# Lista para almacenar los datos procesados
peliculas_procesadas = []

for item in data:
    # Inicializar URL del cartel como vacío
    url_cartel = ""
    if "o:media" in item and len(item["o:media"]) > 0:
        media_id = item["o:media"][0]["o:id"]
        url_media = "https://expobus.us.es/api/media/{media_id}"
        try:
            # Realizar la solicitud a la API para obtener los detalles del media
            response = requests.get(url_media)
            media_data = response.json()
            url_cartel = media_data.get("o:thumbnail_urls", {}).get("large", "")
        except Exception as e:
            print("Error al obtener media {media_id}: {e}")

    pelicula = {
        "titulo": item.get("dcterms:creator", [{}])[0].get("@value", "Titulo no disponible"),
        "anio": item.get("dcterms:publisher", [{}])[0].get("@value", "Año no disponible"),
        "identificador": item["o:id"],
        "descripción": item.get("dcterms:description", [{}])[0].get("@value", "Descripción no disponible"),
        "enlace_permanente": item["dcterms:relation"][0]["@id"] if "dcterms:relation" in item and len(item["dcterms:relation"]) > 0 else "Enlace no disponible",
        "omeka_items": item["@id"],
        "cartel": url_cartel
    }
    peliculas_procesadas.append(pelicula)

# Crear un nuevo JSON con los datos procesados
with open('peliculas_omeka_02.json', 'w') as outfile:
    json.dump(peliculas_procesadas, outfile, ensure_ascii=False, indent=4)

print("JSON procesado creado exitosamente.")
