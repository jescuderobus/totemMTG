import json

# Cargar el JSON original
with open('api_omeka_All.json', 'r') as file:
    data = json.load(file)

# Lista para almacenar los datos procesados
peliculas_procesadas = []

for item in data:
    pelicula = {
        "titulo": item.get("dcterms:creator", [{}])[0].get("@value", "Titulo no disponible"),
        "anio": item.get("dcterms:publisher", [{}])[0].get("@value", "Año no disponible"),
        "identificador": item["o:id"],
        "descripción": item.get("dcterms:description", [{}])[0].get("@value", "Descripción no disponible"),
        "enlace_permanente": item["dcterms:relation"][0]["@id"] if "dcterms:relation" in item and len(item["dcterms:relation"]) > 0 else "Enlace no disponible",
        "omeka_items": item["@id"],
        "cartel":""
    }
    # Agregar la película procesada a la lista
    peliculas_procesadas.append(pelicula)

# Crear un nuevo JSON con los datos procesados
with open('peliculas_omeka_01.json', 'w') as outfile:
    json.dump(peliculas_procesadas, outfile, ensure_ascii=False, indent=4)

print("JSON procesado creado exitosamente.")
