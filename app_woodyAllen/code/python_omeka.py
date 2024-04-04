import json

# Cargar el JSON original

with open('api_omeka_All.json', 'r') as file:
    data = json.load(file)

# Lista para almacenar los datos procesados
peliculas_procesadas = []

for item in data:
    pelicula = {
        "identificador": item["o:id"],
        "creator": item["dcterms:title"][0]["@value"],
        "titulo": item.get("dcterms:creator", [{}])[0].get("@value", "Titulo no disponible"),
        "anio": item.get("dcterms:publisher", [{}])[0].get("@value", "Año no disponible"),
        "descripcion": item.get("dcterms:description", [{}])[0].get("@value", "Descripción no disponible"),
        "enlace_permanente": item["dcterms:relation"][0]["@id"] if "dcterms:relation" in item and len(item["dcterms:relation"]) > 0 else "Enlace no disponible",
        "omeka_items": item["@id"],
        "omeka_media": "https://expobus.us.es/api/media/" + str(int(item["o:id"]) + 1) , 
        "cartel":""
    }
    # Agregar la película procesada a la lista
    peliculas_procesadas.append(pelicula)

with open('peliculas_omeka_01.json', 'w', encoding='utf-8') as outfile:
    json.dump(peliculas_procesadas, outfile, ensure_ascii=False, indent=4)

print("JSON procesado creado exitosamente.")
