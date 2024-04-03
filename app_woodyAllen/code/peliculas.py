import requests
import json

# Reemplaza esto con tu propia API key
api_key = "26fab971"

def leer_peliculas_de_archivo(ruta_archivo):
    with open(ruta_archivo, 'r') as archivo:
        # Extrae los códigos de IMDb de cada línea
        codigos_imdb = [linea.split(",")[-1].strip() for linea in archivo]
    return codigos_imdb

def consultar_api_omdb(codigo_imdb):
    url_base = "http://www.omdbapi.com/"
    parametros = {"i": codigo_imdb, "apikey": api_key}
    respuesta = requests.get(url_base, params=parametros)
    if respuesta.status_code == 200:
        return respuesta.json()
    else:
        return None

def guardar_datos_en_json(datos, nombre_archivo):
    with open(nombre_archivo, 'w') as archivo_json:
        json.dump(datos, archivo_json, indent=4)

def main():
    peliculas = []
    codigos_imdb = leer_peliculas_de_archivo("peliculas.txt")
    for codigo in codigos_imdb:
        datos_pelicula = consultar_api_omdb(codigo)
        if datos_pelicula:
            peliculas.append(datos_pelicula)
    
    guardar_datos_en_json(peliculas, "peliculas.json")

if __name__ == "__main__":
    main()
