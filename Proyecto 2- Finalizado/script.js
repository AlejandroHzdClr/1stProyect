class Avion {
    constructor(filas, columnas, nombre, precio, asientos) {
        this.filas = filas; // Almacena el número de filas del avión
        this.columnas = columnas; // Almacena el número de columnas del avión
        this.nombre = nombre; // Almacena el nombre del avión
        this.precio = precio; // Almacena el precio de los asientos
        this.asientos = asientos; // Almacena el número total de asientos en el avión
    }

    generar_asientos() {
        // Selecciona el contenedor para los asientos VIP (business)
        const asientos_business = document.querySelector(".vip");
        const num_asientos_vip = 9; // Total de asientos VIP

        let listaNumeros = new Set();
        // Genera 3 números aleatorios únicos para asientos VIP reservados
        while (listaNumeros.size < 3) {
            let numeroAleatorio = Math.floor(Math.random() * num_asientos_vip) + 1; // Cambiado para que sea del rango correcto
            listaNumeros.add(numeroAleatorio);
        }
        let numerosUnicos = Array.from(listaNumeros);
        console.log("Números aleatorios reservados VIP:", numerosUnicos);

        // Generar asientos VIP (clase business)
        for (let i = 0; i < num_asientos_vip; i++) {
            const asiento_vip = document.createElement("div");
            const numeroAsiento = i + 1; // Comienza desde 1

            asiento_vip.classList.add("celda", "vip_asiento");
            asiento_vip.textContent = numeroAsiento;

            // Comparar con la lista de números aleatorios
            if (numerosUnicos.includes(numeroAsiento)) {
                asiento_vip.classList.add("reservado");
            } else {
                asiento_vip.classList.add("libre");
            }

            asientos_business.appendChild(asiento_vip);
        }

        // Selecciona el contenedor para los asientos normales
        const asientos_normales = document.querySelector(".normal");
        const num_asientos_normales = 30; // Total de asientos normales
        let num_normales = new Set();
        // Genera 10 números aleatorios únicos para asientos normales reservados
        while (num_normales.size < 10) {  
            let numeroAleatorio = Math.floor(Math.random() * num_asientos_normales) + 1; 
            num_normales.add(numeroAleatorio);
        }
        let numeros_normales = Array.from(num_normales);
        console.log("Números aleatorios reservados Normales:", numeros_normales);
        
        // Generar asientos normales
        for (let i = 0; i < num_asientos_normales; i++) {
            const asiento = document.createElement("div");
            asiento.classList.add("celda", "normal_asiento");
            const numero_asiento_normal = i + 10; // Los asientos normales van del 10 al 39
            asiento.textContent = numero_asiento_normal; 
            if (numeros_normales.includes(numero_asiento_normal)) { 
                asiento.classList.add("reservado"); 
            } else {
                asiento.classList.add("libre"); 
            }  
            asientos_normales.appendChild(asiento);
        }

        // Selecciona el contenedor para los asientos económicos
        const asientos_economico = document.querySelector(".economico");
        const num_asientos_economicos = this.asientos - num_asientos_normales - num_asientos_vip; // Calcula asientos económicos
        let num_economic = new Set();
        // Genera 10 números aleatorios únicos para asientos económicos reservados
        while (num_economic.size < 10) {  
            let num_eco = Math.floor(Math.random() * num_asientos_economicos) + 1 + 39; 
            num_economic.add(num_eco);
        }
        let numeros_economicos = Array.from(num_economic);
        console.log("Números aleatorios reservados Económicos:", numeros_economicos);
        
        // Generar asientos económicos
        for (let i = 0; i < num_asientos_economicos; i++) {
            const asiento_ec = document.createElement("div");
            asiento_ec.classList.add("celda", "economico_asiento");
            const numero_economico_asiento = i + 40; // Los asientos económicos van del 40 en adelante
            asiento_ec.textContent = numero_economico_asiento;
            if (numeros_economicos.includes(numero_economico_asiento)) {
                asiento_ec.classList.add("reservado");
            } else {
                asiento_ec.classList.add("libre");
            }
            asientos_economico.appendChild(asiento_ec);
        }
    }

    reservar_asiento() {
        let precio_final = 0; // Variable para almacenar el precio total
        // Pregunta al usuario qué tipo de asiento quiere reservar
        let pregunta = prompt("¿Qué tipo de asiento quieres reservar? Business(150€), Económico(15€), Low-Cost(7€)");

        // Valida la entrada del usuario
        while (pregunta !== "Business" && pregunta !== "Económico" && pregunta !== "Low-Cost") {
            alert("Tome una decisión correcta!");
            pregunta = prompt("¿Qué tipo de asiento quieres reservar? Business, Económico, Low-Cost");
        }

        const asientos_reservados = []; // Almacena asientos reservados temporalmente

        // Opción Business
        if (pregunta === "Business") {
            precio_final += 150; // Aumenta el precio total
            alert("Ha tomado la elección Business");
            let asi_reser = prompt("¿Cuántos asientos quiere reservar?");
            
            // Valida la cantidad de asientos a reservar
            while (isNaN(asi_reser) || !Number.isInteger(Number(asi_reser))) {
                alert("Ingrese un número válido.");
                asi_reser = prompt("¿Cuántos asientos quiere reservar?");
            }

            // Reserva los asientos VIP
            for (let i = 0; i < asi_reser; i++) {
                const lugar = prompt(`Elige tu asiento VIP número (1-9) para la reserva ${i + 1}`);
                const asiento_vip = document.querySelector(`.vip_asiento:nth-child(${lugar})`);

                // Verifica si el asiento tiene la clase "libre"
                if (asiento_vip && asiento_vip.classList.contains("libre")) {
                    asiento_vip.classList.remove("libre");
                    asiento_vip.classList.add("reservado-temporal");
                    asientos_reservados.push(asiento_vip); // Almacena el asiento reservado temporalmente
                    alert(`Has reservado temporalmente el asiento VIP número ${lugar}`);
                } else {
                    alert(`El asiento VIP número ${lugar} ya está reservado o no existe.`);
                }
            }

            // Confirmar la reserva
            const confirmar = prompt("¿Desea confirmar su reserva? (si/no)");
            console.log(`Confirmación de reserva: ${confirmar}`);

            if (confirmar.toLowerCase() === "si") {
                // Cambiar asientos a "reservado" permanente (rojo)
                asientos_reservados.forEach(asiento => {
                    asiento.classList.remove("reservado-temporal");
                    asiento.classList.add("reservado");
                    asiento.style.backgroundColor = "red"; 
                });
                alert(`Su reserva ha sido confirmada. El precio final será de ${precio_final} €`);
            } else {
                // Revertir la reserva (volver a libre)
                asientos_reservados.forEach(asiento => {
                    asiento.classList.remove("reservado-temporal");
                    asiento.classList.add("libre");
                    asiento.style.backgroundColor = "green";
                });
                alert("Su reserva ha sido cancelada.");
            }
        }
        // Opción Económico
        else if (pregunta === "Económico") {
            precio_final += 15; // Aumenta el precio total
            alert("Ha tomado la elección Económico");
            let asi_reser = prompt("¿Cuántos asientos quiere reservar?");
            
            // Valida la cantidad de asientos a reservar
            while (isNaN(asi_reser) || !Number.isInteger(Number(asi_reser))) {
                alert("Ingrese un número válido.");
                asi_reser = prompt("¿Cuántos asientos quiere reservar?");
            }

            // Pregunta si quiere escoger asiento
            const esco_asi = prompt("¿Quieres escoger sitio? Serán 5€ más");
            if (esco_asi.toLowerCase() === "si") {
                console.log("Se ha elegido la opción de escoger asiento.");
                listaComodidades.push(`Gastos por elección de asiento: ${5}`);
                for (let i = 0; i < asi_reser; i++) {
                    const lugar = prompt(`Elige tu asiento Económico número (10-39) para la reserva ${i + 1}`);
                    const asiento_economico = document.querySelector(`.normal_asiento:nth-child(${lugar - 9})`);

                    // Verifica si el asiento tiene la clase "libre"
                    if (asiento_economico && asiento_economico.classList.contains("libre")) {
                        asiento_economico.classList.remove("libre");
                        asiento_economico.classList.add("reservado-temporal");
                        asientos_reservados.push(asiento_economico); // Almacena el asiento reservado temporalmente
                        alert(`Has reservado temporalmente el asiento Económico número ${lugar}`);
                    } else {
                        alert(`El asiento Económico número ${lugar} ya está reservado o no existe.`);
                    }
                }
            }

            // Reserva los asientos económicos
            for (let i = 0; i < asi_reser; i++) {
                const lugar = prompt(`Elige tu asiento Económico número (40-69) para la reserva ${i + 1}`);
                const asiento_economico = document.querySelector(`.economico_asiento:nth-child(${lugar - 39})`);

                // Verifica si el asiento tiene la clase "libre"
                if (asiento_economico && asiento_economico.classList.contains("libre")) {
                    asiento_economico.classList.remove("libre");
                    asiento_economico.classList.add("reservado-temporal");
                    asientos_reservados.push(asiento_economico); // Almacena el asiento reservado temporalmente
                    alert(`Has reservado temporalmente el asiento Económico número ${lugar}`);
                } else {
                    alert(`El asiento Económico número ${lugar} ya está reservado o no existe.`);
                }
            }

            // Confirmar la reserva
            const confirmar = prompt("¿Desea confirmar su reserva? (si/no)");
            console.log(`Confirmación de reserva: ${confirmar}`);

            if (confirmar.toLowerCase() === "si") {
                // Cambiar asientos a "reservado" permanente (rojo)
                asientos_reservados.forEach(asiento => {
                    asiento.classList.remove("reservado-temporal");
                    asiento.classList.add("reservado");
                    asiento.style.backgroundColor = "red"; 
                });
                alert(`Su reserva ha sido confirmada. El precio final será de ${precio_final} €`);
            } else {
                // Revertir la reserva (volver a libre)
                asientos_reservados.forEach(asiento => {
                    asiento.classList.remove("reservado-temporal");
                    asiento.classList.add("libre");
                    asiento.style.backgroundColor = "green";
                });
                alert("Su reserva ha sido cancelada.");
            }
        }
        // Opción Low-Cost
        else if (pregunta === "Low-Cost") {
            precio_final += 7; // Aumenta el precio total
            alert("Ha tomado la elección Low-Cost");
            let asi_reser = prompt("¿Cuántos asientos quiere reservar?");
            
            // Valida la cantidad de asientos a reservar
            while (isNaN(asi_reser) || !Number.isInteger(Number(asi_reser))) {
                alert("Ingrese un número válido.");
                asi_reser = prompt("¿Cuántos asientos quiere reservar?");
            }

            // Reserva los asientos low-cost
            for (let i = 0; i < asi_reser; i++) {
                const lugar = prompt(`Elige tu asiento Low-Cost número (70-${this.asientos}) para la reserva ${i + 1}`);
                const asiento_lowcost = document.querySelector(`.economico_asiento:nth-child(${lugar - 39})`);

                // Verifica si el asiento tiene la clase "libre"
                if (asiento_lowcost && asiento_lowcost.classList.contains("libre")) {
                    asiento_lowcost.classList.remove("libre");
                    asiento_lowcost.classList.add("reservado-temporal");
                    asientos_reservados.push(asiento_lowcost); // Almacena el asiento reservado temporalmente
                    alert(`Has reservado temporalmente el asiento Low-Cost número ${lugar}`);
                } else {
                    alert(`El asiento Low-Cost número ${lugar} ya está reservado o no existe.`);
                }
            }

            // Confirmar la reserva
            const confirmar = prompt("¿Desea confirmar su reserva? (si/no)");
            console.log(`Confirmación de reserva: ${confirmar}`);

            if (confirmar.toLowerCase() === "si") {
                // Cambiar asientos a "reservado" permanente (rojo)
                asientos_reservados.forEach(asiento => {
                    asiento.classList.remove("reservado-temporal");
                    asiento.classList.add("reservado");
                    asiento.style.backgroundColor = "red"; 
                });
                alert(`Su reserva ha sido confirmada. El precio final será de ${precio_final} €`);
            } else {
                // Revertir la reserva (volver a libre)
                asientos_reservados.forEach(asiento => {
                    asiento.classList.remove("reservado-temporal");
                    asiento.classList.add("libre");
                    asiento.style.backgroundColor = "green";
                });
                alert("Su reserva ha sido cancelada.");
            }
        }

        // Muestra el precio final
        console.log("El precio final de la reserva es: " + precio_final + " €");
    }
}
