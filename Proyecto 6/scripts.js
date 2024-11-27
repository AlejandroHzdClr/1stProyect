class Teclado {
    constructor() {
        this.listaTeclas = [
            ["Esc","º", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "'", "¡", "◄--"],
            ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "`", "+", "Intro"],
            ["Bloq Mayus", "a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ", "´", "ç"],
            ["⇧", "<", "z", "x", "c", "v", "b", "n", "m", ",", ".", "-", "⇧"],
            ["Control", "Win", "Alt", "Espacio", "AltGr", "Win", "Control"]
        ];
        this.filasId = ["Primero", "Segundo", "Tercero", "Cuarto", "Quinto"];
        this.contenedor = document.createElement("div");
        this.contenedor.classList.add("teclado");
        this.mayusActivada = false;
        this.shiftActivado = false;
        this.altGrActivado = false;
    }

    crearTeclado() {
        this.listaTeclas.forEach((fila, index) => {
            const filaDiv = document.createElement("div");
            filaDiv.classList.add("fila");
            filaDiv.id = this.filasId[index];

            fila.forEach((tecla) => {
                const teclaDiv = document.createElement("div");
                teclaDiv.classList.add("tecla");
                teclaDiv.id = tecla;
                teclaDiv.textContent = tecla;

                if (/^[a-zñç]$/.test(tecla)) teclaDiv.classList.add("escribe", "letra");
                else if (/^[0-9]$/.test(tecla) || /^[º'¡`+´<>.,-]$/.test(tecla)) teclaDiv.classList.add("escribe");
                else if (tecla === "⇧") teclaDiv.classList.add("shift");
                else if (tecla === "Espacio") teclaDiv.classList.add("escribe");
                else if (tecla === "Tab") teclaDiv.classList.add("escribe");
                else if (tecla === "◄--") teclaDiv.classList.add("retroceso");
                else if (tecla === "Control") teclaDiv.classList.add("nada");
                else if (tecla === "Esc") teclaDiv.classList.add("nada");
                else if (tecla === "Alt") teclaDiv.classList.add("nada");
                else if (tecla === "Win") teclaDiv.classList.add("nada");

                filaDiv.appendChild(teclaDiv);
            });

            this.contenedor.appendChild(filaDiv);
        });

        document.body.appendChild(this.contenedor);

        this.addEventListeners();
        this.addKeyboardListeners();
    }

    cambiarMayusculas() {
        const letras = document.querySelectorAll(".letra");
        this.mayusActivada = !this.mayusActivada;

        letras.forEach(letra => {
            letra.textContent = this.mayusActivada
                ? letra.textContent.toUpperCase()
                : letra.textContent.toLowerCase();
        });
    }

    especialesAltGr(lista, listaCambiar) {
        var teclaEncontrada;
        for (var i = 0; i < lista.length; i++) {
            teclaEncontrada = document.getElementById(lista[i]);
            teclaEncontrada.innerHTML = listaCambiar[i];
        }
    }

    especialesDesAltGr(lista) {
        var teclaEncontrada;
        for (var i = 0; i < lista.length; i++) {
            teclaEncontrada = document.getElementById(lista[i]);
            teclaEncontrada.innerHTML = lista[i];
        }
    }

    especialesShifteadas(lista, listaCambiar) {
        var teclaEncontrada;
        for (var i = 0; i < lista.length; i++) {
            teclaEncontrada = document.getElementById(lista[i]);
            teclaEncontrada.innerHTML = listaCambiar[i];
        }
    }

    especialesDeshifteadas(lista) {
        var teclaEncontrada;
        for (var i = 0; i < lista.length; i++) {
            teclaEncontrada = document.getElementById(lista[i]);
            teclaEncontrada.innerHTML = lista[i];
        }
    }

    pulsarShift() {
        const letras = document.querySelectorAll(".letra");
        const listasEspeciales = ["º", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "'", "¡", "`", "+", "´", ",", ".", "-", "<"];
        const especialesCambiadas = ["ª", "!", '"', "·", "$", "%", "&", "/", "(", ")", "=", "?", "¿", "^", "*", "¨", ";", ":", "_", ">"];

        if (this.shiftActivado) {
            this.especialesShifteadas(listasEspeciales, especialesCambiadas);
            letras.forEach(letra => {
                letra.textContent = letra.textContent.toUpperCase();
            });
        } else {
            this.especialesDeshifteadas(listasEspeciales);
            letras.forEach(letra => {
                letra.textContent = letra.textContent.toLowerCase();
            });
        }
    }

    pulsarAltGr() {
        const listasEspeciales = ["º", "1", "2", "3", "4", "6", "`", "+", "´", "ç", "e"];
        const especialesCambiadas = ["\\", "|", "@", "#", "~", "¬", "[", "]", "{", "}", "€"];

        if (this.altGrActivado) {
            this.especialesAltGr(listasEspeciales, especialesCambiadas);
        } else {
            this.especialesDesAltGr(listasEspeciales);
        }
    }

    borrarTexto() {
        const texto = document.querySelector(".texto");

        if (texto.textContent.length > 0) {
            texto.textContent = texto.textContent.slice(0, -1);
        }
    }

    addEventListeners() {
        const teclasEscribe = document.querySelectorAll(".tecla");
    
        teclasEscribe.forEach(tecla => {
            tecla.addEventListener("click", (evento) => {
                const textoDiv = document.querySelector(".texto");
                const teclaPresionada = evento.target.textContent;
    
                if (teclaPresionada === "Espacio") {
                    textoDiv.textContent += " ";
                } else if (teclaPresionada === "Tab") {
                    textoDiv.textContent += "          ";
                } else if (teclaPresionada === "Bloq Mayus") {
                    this.cambiarMayusculas();
                } else if (teclaPresionada === "⇧") {
                    this.shiftActivado = !this.shiftActivado;
                    this.pulsarShift();
                } else if (teclaPresionada === "◄--") {
                    this.borrarTexto();
                } else if (teclaPresionada === "Intro") {
                    textoDiv.textContent += "\n";
                } else if (teclaPresionada === "AltGr" || teclaPresionada === "AltGraph") {
                    // Detectar AltGr correctamente
                    this.altGrActivado = !this.altGrActivado;
                    this.pulsarAltGr();
                } else if (teclaPresionada === "Control") {
                    // No hace nada
                }else if (teclaPresionada === "Esc") {
                    // No hace nada
                }else if (teclaPresionada === "Alt") {
                    // No hace nada
                }else if (teclaPresionada === "Win") {
                    // No hace nada
                } else {
                    textoDiv.textContent += teclaPresionada;
                }
            });
        });
    }
    

    addKeyboardListeners() {
        document.addEventListener("keydown", (evento) => {
            const textoDiv = document.querySelector(".texto");
            const teclaPresionada = evento.key;
    
            if (evento.code === "AltRight") {
                this.altGrActivado = true;
                this.pulsarAltGr();
            } else if (teclaPresionada === " ") {
                textoDiv.textContent += " ";
            } else if (teclaPresionada === "Tab") {
                textoDiv.textContent += "          ";
                evento.preventDefault(); // Evita el cambio de foco
            } else if (teclaPresionada.length === 1) {
                // Determina si la letra debe ser mayúscula o minúscula
                const isUpperCase = this.shiftActivado !== this.mayusActivada;
                textoDiv.textContent += isUpperCase
                    ? teclaPresionada.toUpperCase()
                    : teclaPresionada.toLowerCase();
            } else if (teclaPresionada === "CapsLock") {
                this.cambiarMayusculas();
            } else if (teclaPresionada === "Shift") {
                this.shiftActivado = true;
                this.pulsarShift();
            } else if (teclaPresionada === "Backspace") {
                this.borrarTexto();
            } else if (teclaPresionada === "Enter") {
                textoDiv.textContent += "\n";
            }
        });
    
        document.addEventListener("keyup", (evento) => {
            if (evento.code === "AltRight") {
                this.altGrActivado = false;
                this.pulsarAltGr();
            }
            if (evento.key === "Shift") {
                this.shiftActivado = false;
                this.pulsarShift();
            }
        });
    }
    
}

const teclado = new Teclado();
teclado.crearTeclado();
