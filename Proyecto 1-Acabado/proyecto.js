function crearCalle() {
    // Pregunta el número de tiendas
    let nTiendas = parseInt(prompt("¿Cuántas tiendas hay en la calle?"));
    // Si la respuesta esta vacia o no es un número entero repite la pregunta
    while (nTiendas ==null || !Number.isInteger(nTiendas) || nTiendas <=0){
        alert("Coloca una cantidad correcta por favor")
        nTiendas = parseInt(prompt("¿Cuántas tiendas hay en la calle?"));
    }
    console.log(`Se han colocado ${nTiendas} tiendas en la calle`)
    // Pregunta el número de calle
    let numeroCalle = parseInt(prompt("¿Con qué número de calle comenzamos?"));

    // Si la respuesta esta vacia o no es un número entero repite la pregunta
    while (numeroCalle ==null || !Number.isInteger(numeroCalle) || numeroCalle <=0){
        alert("Coloca una cantidad correcta por favor")
        numeroCalle = parseInt(prompt("¿Con qué número de calle comenzamos?"));
    }
    console.log(`Se ha empezado por el número ${numeroCalle} en la calle`)

    // Inicializar las cadenas para almacenar los nombres, números de calle, descuentos y puertas
    let nombres = "";
    let numerosCalle = "";
    let descuentos = "";
    let coches = "";

    // Crear las tiendas
    for (let i = 1; i <= nTiendas; i++) {
        let nombre = prompt(`¿Cuál es el nombre de la tienda número ${i}?`);
        console.log(`Se ha creado la tienda ${nombre}`)
        let descuento = prompt(`¿Qué descuento tiene la tienda "${nombre}"?`);
        while ((descuento === null || isNaN(descuento)) && descuento !== "liquidación" && descuento !== "3x2" && descuento !== "2x1" && descuento!== "25%" && descuento!== "50%") {
            alert("Las tiendas solo pueden tener un 25%, un 50%, una liquidación, un 3x2 o un 2x1");
            descuento = prompt(`¿Qué descuento tiene la tienda "${nombre}"?`);
        }

        console.log(`En la tienda ${nombre} se ha aplicado ${descuento} de descuento`)
        let puerta = `<img src="Imgs/puerta.png">`;
        console.log("Se ha creado una puerta")

        // Agregar a las cadenas los valores obtenidos
        nombres += `${nombre} `;
        numerosCalle += `${numeroCalle} `;
        descuentos += `${puerta}${descuento} `;

        // Aumentar el número de calle en 2
        numeroCalle += 2;
        console.log(`Se ha añadido el número de calle ${numeroCalle}`)
    }
    // Pregunta por la cantidad de coches
    let nCoches = parseInt(prompt("¿Cuántos coches hay?"));
    // Si la respuesta esta vacia o no es un número entero repite la pregunta
    while (isNaN(nCoches)||!Number.isInteger(nCoches) || nCoches <=0){
        alert("Coloca un número correcto")
        nCoches = parseInt(prompt("¿Cuántos coches hay?"));
    }
    console.log(`Se han añadido ${nCoches} coches`)
    // Se añade x cantidad de imágenes
    for (let i = 1; i <= nCoches; i++) {
        let coche = `<img src="Imgs/coche.png">`;
        coches += `${coche}`;
    }

    let reloj = "";
    let semaforo = "";
    let hora = parseInt(prompt("¿Qué hora es?:"));

    // Asignar imagen de reloj según la hora
    while (isNaN(hora)||!Number.isInteger(hora)||hora < 1 || hora > 12){
        alert("Coloca una hora de la 1 a las 12")
        hora = parseInt(prompt("¿Qué hora es?:"));
    }
    if (hora >= 1 && hora <= 12) {
        reloj = `<img src="Imgs/reloj ${hora}.png">`;
    }
    console.log(`En el reloj son las ${hora} en punto`)

    
    // Asignar color al semáforo
    let color = prompt("¿Qué color tiene el semáforo?:");
    //  Si la respuesta esta vacia o no es un número entero repite la pregunta
    while (color==null || color!=="rojo" && color!=="amarillo" && color!=="verde"){
        alert ("Tienes que colocar un posible color para el semáforo")
        color = prompt("¿Qué color tiene el semáforo?:");
    }
    // Depende de la respuesta, sera un color distinto
    switch (color){
        case "rojo":
            semaforo= `<img src="Imgs/Rojo.png">`;
            console.log("El semáforo es de color rojo")
            break;
        case "amarillo":
            semaforo = `<img src="Imgs/Amarillo.png">`;
            console.log("El semáforo es de color amarillo")
            break;
        case "verde":
            semaforo = `<img src="Imgs/Verde.png">`;
            console.log("El semáforo es de color verde")
            break
    }   

    // Mostrar los resultados en el cuerpo de la página
    document.body.innerHTML += `<div class="carteles">${nombres}</div>`;
    document.body.innerHTML += `<div class="numero">${numerosCalle}</div>`;
    document.body.innerHTML += `<div class="prt_escaparate">${descuentos}</div>`;
    document.body.innerHTML += `<div class="coche">${coches}</div>`;
    document.body.innerHTML += `<div class="rlj_smfr">${reloj}${semaforo}</div>`;
}

// Ejecutar la función cuando se cargue el contenido del DOM
document.addEventListener('DOMContentLoaded', crearCalle);