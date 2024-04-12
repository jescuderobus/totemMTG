# Este fichero crea los comandos necesarios para generar los jsons, luego hay que copiar y pegar 
# para reorganizarlos.

import json
import os

# Mapeo de géneros a identificadores
generos = {
    "Bélico" : 81367985930004987,
    "Ciencia Ficción" : 81367985910004987,
    "Aventura / Superhéroes" :  81367985940004987,
    "Adaptación literaria" : 81367985950004987,
    "Biografía" : 81367985920004987,
    "Metacomic" : 81367985880004987,
    "Fantasía / Romance" :  81367985860004987,
    "Costumbrismo / Drama" : 81367985870004987,
    "Histórico / Política" : 81367985840004987,
    "Género negro / Terror / Underground" :  81367985850004987,
    "Humor" :  81367985830004987,
    "Mujeres / Feminismo" : 81367985810004987,
    "Premios Nacionales" :  81367985800004987,
    "Manga" : 81367985820004987,
    "Social / LGTBI+" : 81367985790004987
}

base_url = "https://api-eu.hosted.exlibrisgroup.com/almaws/v1/bibs/collections/"
api_key = "l8xx72763ba7234243abaf9d967c37a77f__"

# Esta función genera los comandos curl y los nombres de los archivos
def generar_comandos_y_archivos():
    commands = []
    for genero, id in generos.items():
        # Reemplazar caracteres inválidos en el nombre del archivo
        nombre_archivo = genero.replace(" / ", "_").replace(" ", "_").replace("/", "_").replace("+", "plus")
        for offset in [0, 100, 200]:
            url = f'{base_url}{id}/bibs?apikey={api_key}&limit=100&offset={offset}'
            # Modificar cada comic con jq para añadir el campo "genero"
            curl_command = (f'curl -X GET "{url}" -H "accept: application/json" '
                            f'| jq \'.bib[] |= . + {{"genero": "{genero}"}}\' '
                            f'| jq \'.bib[] |= . + {{"cover1": ""}}\' '
                            f'| jq \'.bib[] |= . + {{"cover2": ""}}\' '
                            f'| jq \'.bib[] |= . + {{"cover3": ""}}\' '
                            f'| tee {nombre_archivo}_{offset}.json')
            commands.append(curl_command)
    return commands

# Imprimir los comandos generados
commands = generar_comandos_y_archivos()
for command in commands:
    print(command)