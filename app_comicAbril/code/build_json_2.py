import json
import os

# Nombres de archivos y directorio destino como antes
nombres_archivos = [
    "Adaptación_literaria.json", "Bélico.json", "Fantasía_Romance.json",
    "Humor.json", "Mujeres_Feminismo.json", "Aventura_Superhéroes.json",
    "Ciencia_Ficción.json", "Género_negro_Terror_Underground.json", "Manga.json",
    "Premios_Nacionales.json", "Biografía.json", "Costumbrismo_Drama.json",
    "Histórico_Política.json", "Metacomic.json", "Social_LGTBIplus.json"
]
directorio_destino = "../js/"  # Asegúrate de cambiar esto
os.makedirs(directorio_destino, exist_ok=True)
base_url_cover2 = "https://biblus.us.es/fama2/com/COMIC/"

# Función modificada para procesar cada archivo
for nombre_archivo in nombres_archivos:
    ruta_archivo_original = nombre_archivo  # Si los archivos no están en el dir actual, ajusta esta ruta
    with open(ruta_archivo_original, 'r', encoding='utf-8') as archivo:
        try:
            datos_cargados = json.load(archivo)
            # Acceder a la lista de objetos a través de la clave "bib"
            if "bib" in datos_cargados:
                datos = datos_cargados["bib"]
            else:
                print(f"Error: el archivo {nombre_archivo} no contiene la clave 'bib'.")
                continue
        except json.JSONDecodeError as e:
            print(f"Error al decodificar {nombre_archivo}: {e}")
            continue

    # Procesar cada objeto en la lista "bib"
    for obj in datos:
        obj['cover2'] = f"{base_url_cover2}{obj.get('mms_id', 'default_mms_id')}.jpg"
        isbn = obj.get('isbn')
        obj['cover1'] = f"../images/{isbn}.jpg" if isbn else ""

    # Guardar los cambios en un archivo en el directorio de destino
    ruta_archivo_destino = os.path.join(directorio_destino, nombre_archivo)
    with open(ruta_archivo_destino, 'w', encoding='utf-8') as archivo:
        # Aquí, asegurarse de guardar el objeto modificado con la clave "bib"
        datos_modificados = {"bib": datos}
        json.dump(datos_modificados, archivo, ensure_ascii=False, indent=4)
