import json
import re

def clean_isbn(isbn):
    # Elimina cualquier carácter que no sea numérico o 'X'
    cleaned_isbn = re.sub(r'[^0-9X]', '', isbn)
    
    # Convierte ISBN de 10 dígitos a ISBN de 13 dígitos
    if len(cleaned_isbn) == 10:
        return isbn10_to_isbn13(cleaned_isbn)
    elif len(cleaned_isbn) != 13:
        # Si no cumple con las longitudes esperadas, marca como FAIL
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

# Lee el archivo JSON
with open('biblioteca.json', 'r') as file:
    data = json.load(file)

# Procesa cada ISBN
for book in data['bib']:
    if 'isbn' in book:
        book['isbn'] = clean_isbn(book['isbn'])

# Escribe el resultado en un nuevo archivo JSON
with open('biblioteca_procesada.json', 'w') as file:
    json.dump(data, file, indent=4)

print("Procesamiento de ISBN completado. Datos guardados en 'biblioteca_procesada.json'.")
