document.addEventListener('DOMContentLoaded', function() {
    const switchElegirTodas = document.getElementById('elegirTodas').querySelector('input[type="checkbox"]');
    const switchElegirNinguna = document.getElementById('elegirNinguna').querySelector('input[type="checkbox"]');
    const categorySwitches = document.querySelectorAll('#elige-tipo-cont .categoria input[type="checkbox"]:not([id="elegirTodas"], [id="elegirNinguna"])');


// Evento para 'Elegir Todas'
switchElegirTodas.addEventListener('change', function() {
    if (this.checked) {
        // Si 'Elegir Todas' se activa, activa todos los switches de categoría y desactiva 'Elegir Ninguna'
        categorySwitches.forEach(sw => sw.checked = true);
        switchElegirNinguna.checked = false;
    } else {
        // Si 'Elegir Todas' se desactiva manualmente, desactiva todos los switches de categoría
        categorySwitches.forEach(sw => sw.checked = false);
        // Verificar si debería activarse 'Elegir Ninguna' (todos desactivados)
        const allUnchecked = Array.from(categorySwitches).every(sw => !sw.checked);
        switchElegirNinguna.checked = allUnchecked;
    }
});

// Evento para 'Elegir Ninguna'
switchElegirNinguna.addEventListener('change', function() {
    if (this.checked) {
        // Si 'Elegir Ninguna' se activa, desactiva todos los switches de categoría y 'Elegir Todas'
        categorySwitches.forEach(sw => sw.checked = false);
        switchElegirTodas.checked = false;
    } else {
        // Si 'Elegir Ninguna' se desactiva manualmente, verifica si todos están desactivados
        const anyChecked = Array.from(categorySwitches).some(sw => sw.checked);
        switchElegirTodas.checked = anyChecked;
        // Actualiza 'Elegir Todas' basándose en si alguno está activado
        const allChecked = Array.from(categorySwitches).every(sw => sw.checked);
        switchElegirTodas.checked = allChecked;
    }
});




    // Eventos para cada switch de categoría individual
    categorySwitches.forEach(switchCateg => {
        switchCateg.addEventListener('change', function() {
            // Si algún switch individual se desactiva
            if (!this.checked) {
                switchElegirTodas.checked = false;
                // Verificar si ningún switch está activado y activar 'Elegir Ninguna'
                const noneChecked = Array.from(categorySwitches).every(sw => !sw.checked);
                switchElegirNinguna.checked = noneChecked;
            } else {
                // Si cualquier switch se activa, desactivar 'Elegir Ninguna'
                switchElegirNinguna.checked = false;
                // Comprobar si todos los switches individuales están activados
                const allChecked = Array.from(categorySwitches).every(sw => sw.checked);
                switchElegirTodas.checked = allChecked;
            }
        });
    }



);
});


