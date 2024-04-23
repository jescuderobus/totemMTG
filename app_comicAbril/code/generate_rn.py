import json

# Ruta del archivo JSON de entrada
input_json_path = 'biblioteca_procesada.json'
# Ruta del archivo de salida para los comandos de renombrado
output_commands_path = 'rename_commands.sh'

# Leer el archivo JSON
with open(input_json_path, 'r') as file:
    data = json.load(file)

# Abrir el archivo de salida para escribir los comandos
with open(output_commands_path, 'w') as file:
    file.write("#!/bin/bash\n")  # Encabezado para hacer el archivo ejecutable como script de bash
    # Generar y escribir cada comando de renombrado
    for item in data['bib']:
        mms_id = item.get('mms_id')
        isbn = item.get('isbn')
        if mms_id and isbn:  # Asegurarse de que ambos campos existen
            command = f"mv {mms_id}.jpg {isbn}.jpg\n"
            file.write(command)

print(f"Comandos de renombrado generados en {output_commands_path}")
