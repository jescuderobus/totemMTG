import sqlite3

# Conexión a la base de datos SQLite
conn = sqlite3.connect('comics.db')
c = conn.cursor()

# Crear tabla
c.execute('''
CREATE TABLE IF NOT EXISTS books (
    item_id TEXT PRIMARY KEY,
    mms_id TEXT,
    holding_id TEXT,
    title TEXT,
    author TEXT,
    isbn TEXT,
    OCLC TEXT,
    place_of_publication TEXT,
    date_of_publication TEXT,
    publisher_const TEXT,
    link TEXT,
    description TEXT,
    genero TEXT,
    coverApp TEXT,
    coverCalibre TEXT,
    coverMarc TEXT,
    loan TEXT,
    aux1 TEXT,
    aux2 TEXT
)
''')

# Confirmar cambios y cerrar la conexión a la base de datos
conn.commit()
conn.close()
