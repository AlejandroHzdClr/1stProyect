class Input {
    constructor(nombre, mensaje, error) {
        this.nombre = nombre;
        this.mensaje = mensaje; // Mensaje específico de error
        this.error = error;
    }

    pintarTodo() {
        return `<label>${this.nombre}</label><br>
        <input type="text" class="input" id="${this.nombre}" name="${this.nombre}" placeholder="${this.mensaje}">
        <p class="${this.nombre}_error error"></p>`; // Mensaje de error
    }
}

class Boton {
    constructor(nombre, id = '') {
        this.nombre = nombre;
        this.id = id;
    }

    pintar() {
        return `<button id="${this.id}" class="boton">${this.nombre}</button>`;
    }
}

// Crear instancias de los inputs
const inputsColocados = [
    new Input("Nombre", "Nombre del usuario", "Debe comenzar con mayúscula"),
    new Input("Apellidos", "Apellidos del usuario", "Debe poner ambos apellidos"),
    new Input("DniNif", "Dni o Nif", "El formato es 8 números y una letra al final"),
    new Input("FechaNacimiento", "Fecha de nacimiento del usuario", "El Formato es DD/MM/AAAA"),
    new Input("CodigoPostal", "Código Postal", "Debe ser un código de 5 dígitos"),
    new Input("Email", "Correo electrónico", "Debe tener el formato: ejemplo@dominio.com"),
    new Input("TelefonoFijo", "Teléfono Fijo", "Debe empezar con 9 y tener 9 dígitos"),
    new Input("TelefonoMovil", "Teléfono Móvil", "Debe empezar con 6 y tener 9 dígitos"),
    new Input("IBAN", "IBAN", "Debe empezar con ES y tener 20 dígitos"),
    new Input("TarjetaDeCredito", "Número de tarjeta", "Debe tener 16 dígitos"),
    new Input("Contraseña", "Contraseña", "Debe tener al menos 12 caracteres, 1 letra, 1 número y 1 símbolo"),
    new Input("RepetirContraseña", "Repite la Contraseña", "Las contraseñas no coinciden")
];

const botonesColocados = [
    new Boton("Guardar","guardar"),
    new Boton("Cargar","cargar")
]

// Insertar los formularios en el contenedor
const contenedor = document.getElementsByClassName("contenedor")[0];
contenedor.innerHTML += "<form>";
inputsColocados.forEach(input => {
    contenedor.innerHTML += input.pintarTodo();
});
contenedor.innerHTML += "</form>";

const patrones = {
    Nombre:/^[A-Z][a-z]+$/,
    Apellidos:/^[A-Z][a-z]+ [A-Z][a-z]+$/,
    CodigoPostal:/^[0-9]{5}$/,
    IBAN:/^ES[0-9]{20}$/,
    DniNif:/^[0-9]{8}[A-Z]$/,
    nif:/^[A-Z][0-9]{7}[A-Z]$/,
    TelefonoFijo:/^9[0-9]{8}$/,
    TelefonoMovil:/^6[0-9]{8}$/,
    Email:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    TarjetaDeCredito:/^[0-9]{16}$/,
    Contraseña:/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\w\s]).{12,}$/,
    FechaNacimiento:/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/ // Formato DD/MM/AAAA
};

// Añadir eventos de validación a los inputs
const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    if (input.name !== "RepetirContraseña") { // Validar campos normales excepto "RepetirContraseña"
        input.addEventListener('keyup', (e) => {
            const regex = patrones[e.target.name];
            validar_campo(e.target, regex);
        });
    } else { // Validar "RepetirContraseña"
        input.addEventListener('keyup', (e) => {
            const contrasenha = document.querySelector("input[name='Contraseña']").value;
            validar_contrasenha(e.target, contrasenha);
        });
    }
});

function validar_campo(campo, regex) {
    const errorMessage = campo.nextElementSibling; // El mensaje de error es el siguiente elemento al input

    if (!regex) {
        console.error(`No se encontró una expresión regular para el campo ${campo.name}`);
        return; // Salir si no hay regex
    }

    // Buscar el objeto Input correspondiente
    const mensajeEspecial = inputsColocados.find(input => input.nombre === campo.name);

    // Validación de campo según regex
    if (regex.test(campo.value)) {
        campo.className = 'valido'; // Campo válido
        errorMessage.textContent = ''; // Limpiar mensaje de error
    } else {
        campo.className = 'invalido'; // Campo inválido
        errorMessage.textContent = mensajeEspecial ? mensajeEspecial.error : 'El formato es incorrecto';
    }
}

function validar_contrasenha(repeticion, contrasenha) {
    const errorMessage = repeticion.nextElementSibling; // El mensaje de error es el siguiente elemento al input

    if (repeticion.value === contrasenha) {
        repeticion.className = 'valido'; // Contraseña válida
        errorMessage.textContent = ''; // Limpiar mensaje de error
    } else {
        repeticion.className = 'invalido'; // Contraseña inválida
        errorMessage.textContent = 'Las contraseñas no coinciden'; // Mostrar error
    }
}

const contenedorBotones = document.getElementsByClassName("botones")[0];
botonesColocados.forEach(boton => {
    contenedor.innerHTML += boton.pintar();
});