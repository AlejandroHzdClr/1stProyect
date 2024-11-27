/*document.addEventListener("DOMContentLoaded", function() {
    function conseguirTeclas(tipo) {
        var largo_tipo = document.getElementsByClassName(tipo);
        var diccionario = [];
        for (var i = 0; i < largo_tipo.length; i++) {
            diccionario.push(largo_tipo[i]);
        }
        return diccionario;
    }

    var letras = conseguirTeclas("letra");

    function funcionShift() {
        for (var i = 0; i < letras.length; i++) {
            // Acceder al texto del div de clase "letra" y convertirlo a mayúsculas
            letras[i].innerHTML = letras[i].innerHTML.toUpperCase();
        }
    }

    var divs = conseguirTeclas("tecla");

    function volverMinusculas() {
        for (var i = 0; i < divs.length; i++) {
            // Acceder al texto del div de clase "letra" y convertirlo a minúsculas
            var letraElement = document.getElementsByClassName("letra")[i];
            if (letraElement) {
                letraElement.innerHTML = letraElement.innerHTML.toLowerCase();
            }
        }
    }

    // Agregar eventListener a cada div de "tecla"
    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener("click", volverMinusculas);
    }

    // Agregar eventListener a la tecla Shift
    var shiftButton = document.getElementById("ShiftLeft");  // Cambiado de "tecla" a "ShiftLeft"
    
    if (shiftButton) {
        shiftButton.addEventListener("click", funcionShift);
    } else {
        console.log("No se encontró la tecla 'shift'");
    }
});
*/