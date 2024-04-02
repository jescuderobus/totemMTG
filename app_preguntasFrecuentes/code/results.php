<?php

// https://biblus.us.es/bib2/portatiles/results.php

// Especifica el encabezado para Content-Type como JSON
header('Content-Type: application/json');

// Habilita CORS (Cross-Origin Resource Sharing)
// IMPORTANTE: Cambiar * por dominios específicos para mayor seguridad
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: X-Requested-With');

// La ruta al fichero JSON
$jsonFile = 'result.json';

// Lee el fichero JSON y obtiene su contenido
$jsonData = file_get_contents($jsonFile);

// Devuelve el contenido del fichero JSON
echo $jsonData;
