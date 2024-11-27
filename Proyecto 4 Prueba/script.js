var cuerpo;
var altura = "40px"; 
var cuadro1 = new cuadro(true);
var cuadro2 = new cuadro(false);
var cuadro3 = new cuadro(false);
var fichaSeleccionada;
var origen;
var destino;
var contadorMovimientos = 0;
var tiempoInicio;
var intervalReloj;
var empezado = 0;
var tiempoFinal;
var movFinal;
var juegoIniciado = false
let resultados =JSON.parse(localStorage.getItem("resultados")) || [];

function crearDiv() {
    var caja = document.createElement("div");
    return caja;
}

function over1(){
    over(cuadro1)
}

function over2(){
    over(cuadro2)
}

function over3(){
    over(cuadro3)
}

function over(cuadro){
    cuadro.caja.style.backgroundColor="#ADFAFF"
}

function out1(){
    out(cuadro1)
}

function out2(){
    out(cuadro2)
}

function out3(){
    out(cuadro3)
}

function out(cuadro){
    cuadro.caja.style.backgroundColor="white"
}

function click1(){
    cuadro1.elegido = !cuadro1.elegido
    click(cuadro1)
}

function click2(){
    cuadro2.elegido = !cuadro2.elegido
    click(cuadro2)
}

function click3(){
    cuadro3.elegido = !cuadro3.elegido
    click(cuadro3)
}

function click(cuadro){
    if (cuadro.elegido){
        seleccionarOrigenDestino(cuadro)
    }else{
        cuadro.caja.style.borderColor="black"
        reiniciarOrigenDestino()
    }
}

function rellenar_contenido() {
    var contenido = new Array();

    for (var i = 0; i < 5; i++) {
        contenido[i] = new relleno();
    }
    return contenido;
}

function rellenar_fichas() {
    var contenido = new Array();

    contenido[0] = new relleno();
    contenido[1] = new fichaS();
    contenido[2] = new fichaM();
    contenido[3] = new fichaL();

    return contenido;
}

function crearRelojYContador() {
    // Crear div para el contador de movimientos
    var contadorDiv = document.createElement("div");
    contadorDiv.id = "contador";
    contadorDiv.innerHTML = "Movimientos: 0";
    contadorDiv.style.marginBottom = "20px";
    cuerpo.appendChild(contadorDiv);

    // Crear div para el reloj
    var relojDiv = document.createElement("div");
    relojDiv.id = "reloj";
    relojDiv.innerHTML = "Tiempo: 0s";
    relojDiv.style.marginBottom = "20px";
    cuerpo.appendChild(relojDiv);
}

// Función para actualizar el contador de movimientos
function actualizarContador() {
    contadorMovimientos++;
    var contadorDiv = document.getElementById("contador");
    contadorDiv.innerHTML = "Movimientos: " + contadorMovimientos;
}

// Función para iniciar el reloj
function iniciarReloj() {
    tiempoInicio = new Date().getTime();
    intervalReloj = setInterval(actualizarReloj, 1000);
}

// Función para actualizar el reloj
function actualizarReloj() {
    var ahora = new Date().getTime();
    var diferencia = Math.floor((ahora - tiempoInicio) / 1000); // Diferencia en segundos
    var relojDiv = document.getElementById("reloj");
    relojDiv.innerHTML = "Tiempo: " + diferencia + "s";
}

// Detener el reloj cuando se complete el juego
function detenerReloj() {
    clearInterval(intervalReloj);
}

function fichaS() {
    this.caja = document.createElement('img')
    this.caja.src="Imgs/fichaS.png"
    this.caja.style.width = "10%"; 
    this.caja.style.height = altura;
    this.caja.style.marginLeft = "auto";
    this.caja.style.marginRight = "auto";
    this.valor=0
}

function fichaM() {
    this.caja = document.createElement('img')
    this.caja.src="Imgs/fichaM.png"
    this.caja.style.width = "20%"; 
    this.caja.style.height = altura;
    this.caja.style.marginLeft = "auto";
    this.caja.style.marginRight = "auto";
    this.valor=1
}

function fichaL() {
    this.caja = document.createElement('img')
    this.caja.src="Imgs/fichaL.png"
    this.caja.style.width = "30%"; 
    this.caja.style.height = altura;
    this.caja.style.marginLeft = "auto";
    this.caja.style.marginRight = "auto";
    this.valor=2
}

function relleno() {
    this.caja = crearDiv();
    this.caja.style.width = "100%";
    this.caja.style.height = altura;
}

function cuadro(cajaInicial) {
    this.caja = crearDiv();
    this.caja.style.width = "28%";
    this.caja.style.height = "200px";
    this.caja.style.marginLeft = "4%";
    this.caja.style.borderWidth = "2%";
    this.caja.style.border = "solid black";
    this.caja.style.float = "left";
    this.caja.style.display = "flex"; 
    this.caja.style.flexDirection = "column";
    this.caja.style.justifyContent = "flex-end"; 

    this.elegido = false;

    if (cajaInicial) {
        this.contenido = rellenar_fichas();
    } else {
        this.contenido = rellenar_contenido();
    }

    for (var i = 0; i < this.contenido.length; i++) {
        this.caja.appendChild(this.contenido[i].caja);
    }

    this.tieneFichas = function () {
        var rellenos = 0;

        for (var i = 0; i < this.contenido.length; i++) {
            if (this.contenido[i] instanceof relleno) {
                rellenos++;
            }
        }
        return rellenos !== this.contenido.length;
    };

    this.obtenerFichaAlta = function () {
        for (var i = 0; i < this.contenido.length; i++) {
            if (!(this.contenido[i] instanceof relleno)) {
                return this.contenido[i];
            }
        }
    };

    this.quitarFichaAlta = function () {
        for (var i = 0; i < this.contenido.length; i++) {
            if (!(this.contenido[i] instanceof relleno)) {
                fichaSeleccionada = this.contenido[i];
                this.contenido[i] = new relleno();
                break;
            }
        }
    };

    this.colocarFichaAlta = function () {
        for (var i = this.contenido.length - 1; i >= 0; i--) {
            if (this.contenido[i] instanceof relleno) {
                this.contenido[i] = fichaSeleccionada;
                break;
            }
        }
    };

    this.pintarCaja = function () {
        while (this.caja.hasChildNodes()) {
            this.caja.removeChild(this.caja.lastChild);
        }
        for (var i = 0; i < this.contenido.length; i++) {
            this.caja.appendChild(this.contenido[i].caja);
        }
    };
}

function verificarFinalJuego() {
    if (cuadro2.todasFichasColocadas() || cuadro3.todasFichasColocadas()) {
        detenerReloj();
        alert("¡Felicidades! Has completado la Torre de Hanoi.");
    }
}

function mostrarResultados(resultados) {
    let resultadosDiv = document.createElement("div");
    resultadosDiv.id = "resultados";
    resultadosDiv.innerHTML = "Resultados Anteriores:<br>";
    
    resultados.forEach(resultado => {
        resultadosDiv.innerHTML += `Tiempo: ${resultado.tiempo}s, Movimientos: ${resultado.movimientos}<br>`;
    });
    
    cuerpo.appendChild(resultadosDiv);
}

function detenerReloj() {
    clearInterval(intervalReloj);
    var tiempoTerminar = new Date().getTime();
    tiempoFinal = Math.floor((tiempoTerminar - tiempoInicio) / 1000);
    console.log("El tiempo final es: "+ tiempoFinal + "segundos")

    let resultados = JSON.parse(localStorage.getItem('resultados'))

    if (resultados === null){
        resultados=[]
    }

    resultados.push({tiempo: tiempoFinal, movimientos: contadorMovimientos})
    localStorage.setItem("resultados", JSON.stringify(resultados))
}

cuadro.prototype.todasFichasColocadas = function() {
    var fichasCorrectas = 0;
    
    for (var i = 0; i < this.contenido.length; i++) {
        if (this.contenido[i] instanceof fichaS || 
            this.contenido[i] instanceof fichaM || 
            this.contenido[i] instanceof fichaL) {
            fichasCorrectas++;
        }
    }
    return fichasCorrectas === 3;
}


function seleccionarOrigenDestino(cuadro) {
    if (origen == undefined) {
        if (cuadro.tieneFichas()) {
            cuadro.caja.style.borderColor = "red";
            origen = cuadro;
            origen.elegido = true;
        }
    } else if (origen != undefined && destino == undefined) {
        destino = cuadro;
        destino.elegido = true;

        if (origen != destino) {
            if (!destino.tieneFichas() || (origen.obtenerFichaAlta().valor < destino.obtenerFichaAlta().valor)) {
                origen.quitarFichaAlta();
                origen.pintarCaja();
                destino.colocarFichaAlta();
                destino.pintarCaja();
                actualizarContador();  // Incrementar el contador de movimientos
                verificarFinalJuego(); // Verificar si el juego ha terminado
            }
        }
    }

    if (destino != undefined && origen != undefined) {
        reiniciarOrigenDestino();
    }
}


function reiniciarOrigenDestino(){
    origen.caja.style.borderColor="black"
    origen.elegido=false

    destino.elegido=false

    origen=undefined
    destino=undefined

    cuadro1.elegido=false
    cuadro2.elegido=false
    cuadro3.elegido=false
}

function iniciar() {

    if(juegoIniciado){
        return;
    }

    juegoIniciado=true

    cuerpo = document.getElementsByTagName("body")[0];

    mostrarResultados(resultados)

    // Crear y agregar el contador y el reloj
    crearRelojYContador();

    // Agregar las torres
    cuerpo.appendChild(cuadro1.caja);
    cuerpo.appendChild(cuadro2.caja);
    cuerpo.appendChild(cuadro3.caja);

    cuadro1.caja.addEventListener("mouseover", over1, false);
    cuadro2.caja.addEventListener("mouseover", over2, false);
    cuadro3.caja.addEventListener("mouseover", over3, false);

    cuadro1.caja.addEventListener("mouseout", out1, false);
    cuadro2.caja.addEventListener("mouseout", out2, false);
    cuadro3.caja.addEventListener("mouseout", out3, false);

    cuadro1.caja.addEventListener("click", click1, false);
    cuadro2.caja.addEventListener("click", click2, false);
    cuadro3.caja.addEventListener("click", click3, false);

    iniciarReloj();  // Iniciar el reloj cuando se carga el juego
}

window.addEventListener("load", function() {
    if (empezado!=0){
        console.log("El juego ya fue lanzado")
    }else{
        var boton = document.getElementById("empezar");
        boton.addEventListener("click", iniciar, false);
    }
}, false);