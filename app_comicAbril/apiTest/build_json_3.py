import json
import os

# Lista de géneros que esperas procesar
generos = [
    "Adaptación_literaria", "Bélico", "Fantasía_Romance",
    "Humor", "Mujeres_Feminismo", "Aventura_Superhéroes",
    "Ciencia_Ficción", "Género_negro_Terror_Underground", "Manga",
    "Premios_Nacionales", "Biografía", "Costumbrismo_Drama",
    "Histórico_Política", "Metacomic", "Social_LGTBIplus"
]

# Directorio donde se encuentran los archivos de género
directorio = './'  # Ajusta esto al directorio correcto donde están almacenados los archivos

# Lista para acumular todos los registros
todos_los_registros = []

# Procesar cada género y cargar los datos
for genero in generos:
    archivo_genero = f"{genero}.json"
    path_completo = os.path.join(directorio, archivo_genero)
    if os.path.exists(path_completo):
        with open(path_completo, 'r') as file:
            data = json.load(file)
            # Asumimos que cada archivo tiene una lista directa de registros
            todos_los_registros.extend(data.get('bib', []))  # Extiende la lista central con registros de cada género

# Crear un nuevo diccionario para el JSON final con una clave 'bib' única
datos_combinados = {'bib': todos_los_registros}

# Guardar el resultado combinado en un nuevo archivo JSON
archivo_todo = os.path.join(directorio, 'TODO.json')
with open(archivo_todo, 'w') as file:
    json.dump(datos_combinados, file, indent=4, ensure_ascii=False)

print("Todos los registros han sido combinados bajo la clave 'bib' en TODO.json.")
