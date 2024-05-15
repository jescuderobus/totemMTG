import json
import re
import os

def convert_to_isbn13(isbn10):
    # Eliminar cualquier carácter no numérico excepto 'X'
    isbn10 = re.sub(r'[^0-9X]', '', isbn10)

    # Verificar si la longitud es 10 y el último dígito es 'X'
    if len(isbn10) == 10 and isbn10[-1] == 'X':
        isbn10 = isbn10[:-1] + '0'

    # Agregar el prefijo '978' y el dígito de control
    isbn13 = '978' + isbn10[:-1]
    sum = 0
    for i, digit in enumerate(isbn13):
        sum += int(digit) * (i % 2 * 2 + 1)
    checksum = 10 - (sum % 10)
    if checksum == 10:
        checksum = 0
    isbn13 += str(checksum)

    return isbn13

def modify_json(json_data):
    for book in json_data['bib']:
        isbn = book.get('isbn', '')

        # Convertir ISBN a 13 dígitos
        if len(isbn) == 10:
            isbn = convert_to_isbn13(isbn)
        else:
            isbn = re.sub(r'[^0-9X]', '', isbn)

        # Asignar la URL de la portada
        if len(isbn) == 13 and all(c in '0123456789X' for c in isbn):
            book['cover1'] = f"images/cover/{isbn}.jpg"
        else:
            book['cover1'] = "images/cover/00000000000000.jpg"

# Iterar sobre todos los archivos JSON en la carpeta "originales"
for filename in os.listdir("originales"):
    if filename.endswith(".json"):
        # Leer el archivo JSON
        with open(os.path.join("originales", filename), 'r', encoding='utf-8') as file:
            data = json.load(file)

        # Modificar los datos
        modify_json(data)

        # Escribir el archivo JSON modificado en la carpeta "modificados"
        output_filename = os.path.splitext(filename)[0] + ".json"
        with open(os.path.join("modificados", output_filename), 'w', encoding='utf-8') as file:
            json.dump(data, file, ensure_ascii=False, indent=4)