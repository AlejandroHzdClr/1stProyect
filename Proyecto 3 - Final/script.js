class Avion {
    constructor(filas, columnas, nombre, precio, asientos) {
        this.filas = filas;
        this.columnas = columnas;
        this.nombre = nombre; // Nombre de la aerolínea
        this.precio = precio;
        this.asientos = asientos;
        this.asientos_seleccionados = [];

        // Precios
        this.precio_vip = 150;
        this.precio_normal = 25;
        this.precio_economico = 10;
        this.precio_total = 0;

        // DesComentar si hace falta eliminar lo guardado
        // localStorage.removeItem(`asientos_reservados_${this.nombre}`);
        // localStorage.removeItem(`asientos_medio_reservados_${this.nombre}`);
        // localStorage.removeItem(`asientos_vip_reservados_${this.nombre}`);
        // localStorage.removeItem(`asientos_normales_reservados_${this.nombre}`);
        // localStorage.removeItem(`asientos_economicos_reservados_${this.nombre}`);
        // localStorage.removeItem(`precio_total_${this.nombre}`);

        // Cargar el estado de los asientos desde localStorage usando claves únicas para cada aerolínea/página
        this.asientos_reservados = JSON.parse(localStorage.getItem(`asientos_reservados_${this.nombre}`)) || [];
        this.asientos_medio_reservados = JSON.parse(localStorage.getItem(`asientos_medio_reservados_${this.nombre}`)) || [];
        this.asientos_vip_reservados = JSON.parse(localStorage.getItem(`asientos_vip_reservados_${this.nombre}`)) || [];
        this.asientos_normales_reservados = JSON.parse(localStorage.getItem(`asientos_normales_reservados_${this.nombre}`)) || [];
        this.asientos_economicos_reservados = JSON.parse(localStorage.getItem(`asientos_economicos_reservados_${this.nombre}`)) || [];
        this.precio_total = JSON.parse(localStorage.getItem(`precio_total_${this.nombre}`)) || 0; // Cargar precio total
    }

    generar_asientos() {
        // Limpiar contenedores antes de generar asientos
        const asientos_business = document.querySelector(".vip");
        const asientos_normales = document.querySelector(".normal");
        const asientos_economico = document.querySelector(".economico");

        asientos_business.innerHTML = "";
        asientos_normales.innerHTML = "";
        asientos_economico.innerHTML = "";

        const num_asientos_vip = 9;
        let id_para_asientos = 0;

        // Generar números aleatorios para asientos VIP solo si no están guardados
        if (this.asientos_vip_reservados.length === 0) {
            let listaNumeros = new Set();
            while (listaNumeros.size < 3) {
                let numeroAleatorio = Math.floor(Math.random() * num_asientos_vip) + 1;
                listaNumeros.add(numeroAleatorio);
            }
            this.asientos_vip_reservados = Array.from(listaNumeros);
            localStorage.setItem(`asientos_vip_reservados_${this.nombre}`, JSON.stringify(this.asientos_vip_reservados));
        }
        console.log(`Asientos reservados VIP en ${this.nombre}:`, this.asientos_vip_reservados);

        // Generar asientos VIP
        for (let i = 0; i < num_asientos_vip; i++) {
            const asiento_vip = document.createElement("div");
            const numeroAsiento = i + 1;
            id_para_asientos += 1;

            asiento_vip.id = id_para_asientos;
            asiento_vip.classList.add("celda", "vip_asiento");
            asiento_vip.textContent = numeroAsiento;

            asiento_vip.onclick = () => {
                this.escoger_asiento(asiento_vip.id);
            };

            if (this.asientos_vip_reservados.includes(numeroAsiento) || this.asientos_reservados.includes(asiento_vip.id)) {
                asiento_vip.classList.add("reservado");
                if (!this.asientos_reservados.includes(asiento_vip.id)) {
                    this.asientos_reservados.push(asiento_vip.id);
                }
            } else {
                asiento_vip.classList.add("libre");
            }

            if (this.asientos_medio_reservados.includes(asiento_vip.id)) {
                asiento_vip.classList.add("medio_reservado");
            }

            asientos_business.appendChild(asiento_vip);
        }

        const num_asientos_normales = 30;

        // Generar números aleatorios para asientos normales solo si no están guardados
        if (this.asientos_normales_reservados.length === 0) {
            let num_normales = new Set();
            while (num_normales.size < 10) {
                let numeroAleatorio = Math.floor(Math.random() * num_asientos_normales) + 1;
                num_normales.add(numeroAleatorio);
            }
            this.asientos_normales_reservados = Array.from(num_normales);
            localStorage.setItem(`asientos_normales_reservados_${this.nombre}`, JSON.stringify(this.asientos_normales_reservados));
        }
        console.log(`Asientos reservados Normales en ${this.nombre}:`, this.asientos_normales_reservados);

        // Generar asientos normales
        for (let i = 0; i < num_asientos_normales; i++) {
            const asiento = document.createElement("div");
            id_para_asientos += 1;
            asiento.id = id_para_asientos;
            asiento.classList.add("celda", "normal_asiento");
            const numero_asiento_normal = i + 10;
            asiento.textContent = numero_asiento_normal;

            asiento.onclick = () => {
                this.escoger_asiento(asiento.id);
            };

            if (this.asientos_normales_reservados.includes(numero_asiento_normal) || this.asientos_reservados.includes(asiento.id)) {
                asiento.classList.add("reservado");
                if (!this.asientos_reservados.includes(asiento.id)) {
                    this.asientos_reservados.push(asiento.id);
                }
            } else {
                asiento.classList.add("libre");
            }

            if (this.asientos_medio_reservados.includes(asiento.id)) {
                asiento.classList.add("medio_reservado");
            }

            asientos_normales.appendChild(asiento);
        }

        const num_asientos_economicos = this.asientos - num_asientos_normales - num_asientos_vip;

        // Generar números aleatorios para asientos económicos solo si no están guardados
        if (this.asientos_economicos_reservados.length === 0) {
            let num_economic = new Set();
            while (num_economic.size < 10) {
                let num_eco = Math.floor(Math.random() * num_asientos_economicos) + 1 + 39;
                num_economic.add(num_eco);
            }
            this.asientos_economicos_reservados = Array.from(num_economic);
            localStorage.setItem(`asientos_economicos_reservados_${this.nombre}`, JSON.stringify(this.asientos_economicos_reservados));
        }
        console.log(`Asientos reservados Económicos en ${this.nombre}:`, this.asientos_economicos_reservados);

        // Generar asientos económicos
        for (let i = 0; i < num_asientos_economicos; i++) {
            const asiento_ec = document.createElement("div");
            id_para_asientos += 1;
            asiento_ec.id = id_para_asientos;
            asiento_ec.classList.add("celda", "economico_asiento");
            const numero_economico_asiento = i + 40;
            asiento_ec.textContent = numero_economico_asiento;

            asiento_ec.onclick = () => {
                this.escoger_asiento(asiento_ec.id);
            };

            if (this.asientos_economicos_reservados.includes(numero_economico_asiento) || this.asientos_reservados.includes(asiento_ec.id)) {
                asiento_ec.classList.add("reservado");
                if (!this.asientos_reservados.includes(asiento_ec.id)) {
                    this.asientos_reservados.push(asiento_ec.id);
                }
            } else {
                asiento_ec.classList.add("libre");
            }

            if (this.asientos_medio_reservados.includes(asiento_ec.id)) {
                asiento_ec.classList.add("medio_reservado");
            }

            asientos_economico.appendChild(asiento_ec);
        }

        // Guardar los asientos reservados en localStorage con el nombre de la aerolínea
        this.actualizarLocalStorage();
    }

    escoger_asiento(id_asiento) {
        let asiento_seleccionado = document.getElementById(id_asiento);
    
        // Verificar si el asiento ya está reservado
        if (asiento_seleccionado.classList.contains('reservado')) {
            return; // Salir del método si el asiento está reservado
        }
    
        // Obtener tipo de asiento basado en la clase
        let tipo_asiento = '';
        if (asiento_seleccionado.classList.contains('vip_asiento')) {
            tipo_asiento = 'vip';
        } else if (asiento_seleccionado.classList.contains('normal_asiento')) {
            tipo_asiento = 'normal';
        } else if (asiento_seleccionado.classList.contains('economico_asiento')) {
            tipo_asiento = 'economico';
        }
    
        if (asiento_seleccionado.classList.contains('medio_reservado')) {
            asiento_seleccionado.classList.remove("medio_reservado");
            this.asientos_medio_reservados = this.asientos_medio_reservados.filter(id => id !== id_asiento);
            this.restar_precio(tipo_asiento); // Restar el precio al deseleccionar
        } else {
            asiento_seleccionado.classList.add("medio_reservado");
            this.asientos_seleccionados.push(asiento_seleccionado);
            this.asientos_medio_reservados.push(id_asiento);
            this.sumar_precio(tipo_asiento); // Sumar el precio al seleccionar
        }
    
        this.actualizar_precio_total(); // Actualizar el precio total
        this.actualizarLocalStorage(); // Guardar el estado en localStorage
    }
    

    sumar_precio(tipo_asiento) {
        if (tipo_asiento === "vip") {
            this.precio_total += this.precio_vip;
        } else if (tipo_asiento === "normal") {
            this.precio_total += this.precio_normal;
        } else if (tipo_asiento === "economico") {
            this.precio_total += this.precio_economico;
        }
    }

    // Método para restar el precio si el asiento se deselecciona
    restar_precio(tipo_asiento) {
        if (tipo_asiento === "vip") {
            this.precio_total -= this.precio_vip;
        } else if (tipo_asiento === "normal") {
            this.precio_total -= this.precio_normal;
        } else if (tipo_asiento === "economico") {
            this.precio_total -= this.precio_economico;
        }
    }

    actualizar_precio_total() {
        const informacion = document.querySelector(".informacion p");
        informacion.textContent = `Precio total: ${this.precio_total}€`;
    }

    actualizarLocalStorage() {
        // Guardar usando las claves con el nombre de la aerolínea
        localStorage.setItem(`asientos_reservados_${this.nombre}`, JSON.stringify(this.asientos_reservados));
        localStorage.setItem(`asientos_medio_reservados_${this.nombre}`, JSON.stringify(this.asientos_medio_reservados));
        localStorage.setItem(`asientos_vip_reservados_${this.nombre}`, JSON.stringify(this.asientos_vip_reservados));
        localStorage.setItem(`asientos_normales_reservados_${this.nombre}`, JSON.stringify(this.asientos_normales_reservados));
        localStorage.setItem(`asientos_economicos_reservados_${this.nombre}`, JSON.stringify(this.asientos_economicos_reservados));
    }

    comprar_asientos() {
        // Obtener todos los asientos con la clase medio_reservado
        const asientos_medio_reservados = document.querySelectorAll('.medio_reservado');
    
        asientos_medio_reservados.forEach(asiento => {
            // Cambiar la clase a reservado
            asiento.classList.remove('medio_reservado');
            asiento.classList.add('reservado');
    
            // Añadir el id del asiento a asientos_reservados si no está ya
            if (!this.asientos_reservados.includes(asiento.id)) {
                this.asientos_reservados.push(asiento.id);
            }
        });
    
        // Actualizar el localStorage de asientos reservados
        this.actualizarLocalStorage();
    
        // Hacer una copia de this.asientos_medio_reservados para iterar
        const copia_asientos_medio_reservados = [...this.asientos_medio_reservados];
    
        // Eliminar los asientos de medio_reservados del localStorage
        copia_asientos_medio_reservados.forEach(id => {
            const index = this.asientos_medio_reservados.indexOf(id);
            if (index > -1) {
                this.asientos_medio_reservados.splice(index, 1); // Eliminar el asiento de medio_reservados
            }
        });

        const agradecimiento = document.querySelector(".informacion p");
        agradecimiento.textContent = `¡Muchas gracias por la reserva!`;
    
        // Actualizar el localStorage de medio_reservados
        localStorage.setItem(`asientos_medio_reservados_${this.nombre}`, JSON.stringify(this.asientos_medio_reservados));
    }
      
}
