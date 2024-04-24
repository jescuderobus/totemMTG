import json
import os

# Lista de géneros para procesar
generos = [
    "Adaptación_literaria", "Bélico", "Fantasía_Romance",
    "Humor", "Mujeres_Feminismo", "Aventura_Superhéroes",
    "Ciencia_Ficción", "Género_negro_Terror_Underground", "Manga",
    "Premios_Nacionales", "Biografía", "Costumbrismo_Drama",
    "Histórico_Política", "Metacomic", "Social_LGTBIplus"
]

# Procesar cada género
for genero in generos:
    datos_combinados = []
    # Lista de archivos para cada género
    archivos = [f"{genero}_0.json", f"{genero}_100.json", f"{genero}_200.json"]
    
    # Leer y combinar los datos de cada archivo
    for archivo in archivos:
        if os.path.exists(archivo) and os.path.getsize(archivo) > 0:  # Verifica que el archivo existe y no está vacío
            try:
                with open(archivo, 'r') as f:
                    data = json.load(f)
                    if 'bib' in data:  # Asegurarse de que el archivo tenga la clave 'bib'
                        datos_combinados.extend(data['bib'])
            except json.JSONDecodeError:
                print(f"Error decodificando JSON en el archivo {archivo}. El archivo puede estar vacío o corrupto.")

    # Crear un nuevo diccionario para el JSON final del género
    resultado_final = {'bib': datos_combinados}
    
    # Guardar el resultado combinado en un nuevo archivo JSON para el género
    if datos_combinados:  # Solo guardar si hay datos combinados
        with open(f"{genero}.json", 'w') as f:
            json.dump(resultado_final, f, ensure_ascii=False, indent=4)
    
    # Eliminar los archivos originales
    for archivo in archivos:
        if os.path.exists(archivo):
            os.remove(archivo)

    print(f"Los archivos de {genero} han sido combinados y eliminados correctamente.")
