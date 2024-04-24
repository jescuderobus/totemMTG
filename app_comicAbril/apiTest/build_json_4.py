import json
import re
import os

def validar_isbn10(isbn10):
    if len(isbn10) != 10:
        return False
    suma = 0
    for i, char in enumerate(isbn10):
        if char == 'X' and i == 9:  # 'X' solo puede aparecer en la última posición
            suma += 10 * (10 - i)
        elif char.isdigit():
            suma += int(char) * (10 - i)
        else:
            return False
    return suma % 11 == 0

def validar_isbn13(isbn13):
    if len(isbn13) != 13:
        return False
    suma = 0
    for i, char in enumerate(isbn13):
        if not char.isdigit():
            return False
        if i % 2 == 0:
            suma += int(char)
        else:
            suma += 3 * int(char)
    return suma % 10 == 0

def clean_isbn(isbn):
    if not isbn:
        return "FAIL"
    # Elimina cualquier carácter que no sea numérico o 'X'
    cleaned_isbn = re.sub(r'[^0-9X]', '', isbn)
    
    if len(cleaned_isbn) == 10:
        if validar_isbn10(cleaned_isbn):
            return isbn10_to_isbn13(cleaned_isbn)
        else:
            return "INVALID" + cleaned_isbn
    elif len(cleaned_isbn) == 13:
        if not validar_isbn13(cleaned_isbn):
            return "INVALID" + cleaned_isbn
    else:
        return "FAIL" + cleaned_isbn
    return cleaned_isbn

def isbn10_to_isbn13(isbn10):
    # Prefijo del ISBN 13
    isbn13 = '978' + isbn10[:-1]
    # Calcula el dígito de control para ISBN 13
    check_sum = 0
    for i, char in enumerate(isbn13):
        if i % 2 == 0:
            check_sum += int(char)
        else:
            check_sum += 3 * int(char)
    check_digit = 10 - (check_sum % 10)
    if check_digit == 10:
        check_digit = 0
    return isbn13 + str(check_digit)

def procesar_archivo_json(path):
    with open(path, 'r', encoding='utf-8') as file:
        data = json.load(file)

    if 'bib' in data:
        for book in data['bib']:
            book['isbn'] = clean_isbn(book.get('isbn', ""))

    new_path = f"{os.path.splitext(path)[0]}_procesado.json"
    with open(new_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

    print(f"Procesamiento de ISBN completado. Datos guardados en '{new_path}'.")

archivos = [
    "Adaptación_literaria.json", "Bélico.json", "Fantasía_Romance.json",
    "Humor.json", "Mujeres_Feminismo.json", "Aventura_Superhéroes.json",
    "Ciencia_Ficción.json", "Género_negro_Terror_Underground.json", "Manga.json",
    "Premios_Nacionales.json", "Biografía.json", "Costumbrismo_Drama.json",
    "Histórico_Política.json", "Metacomic.json", "Social_LGTBIplus.json", "TODO.json"
]
for archivo in archivos:
    procesar_archivo_json(archivo)

