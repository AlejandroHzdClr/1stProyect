class Carpeta{
    constructor(nombre){
        this.nombre    = nombre
        this.contenido = []
        this.imagen    = "Imgs/carpeta.png"
    }

    agregarArchivo(archivo){
        let existeArchivo=false
        for (let i=0;i<this.contenido.length;i++){
            if (this.contenido[i].nombre === archivo.nombre && this.contenido[i].extension === archivo.extension) {
                existeArchivo = true;
                break;
            }
        }
        if (!existeArchivo){
            this.contenido.push(archivo);
            console.log(`Archivo introducido en ${this.nombre}`);
        }else{
            console.log("No se puede añadir, ya existe")
        }
    }

    agregarCarpeta(nombre){
        let existeCarpeta=false
        for (let i=0;i<this.contenido.length;i++){
            if (this.contenido[i].nombre === nombre){
                existeCarpeta = true;
                break;
            }
        }
        if(!existeCarpeta){
            this.contenido.push(nombre)
            console.log("Añadido")
        }else{
            console.log("No se añade, ya está")
        }
    }

    mostrarContenido() {
        let html = `<div class="carpeta"><img src="${this.imagen}" alt="Carpeta">${this.nombre}</div>`;
        if (this.contenido.length > 0) {
            html += '<ul>';
            for (const archivo of this.contenido) {
                if (archivo instanceof Archivo) { // Verifica si es un archivo
                    html += archivo.mostrarArchivo(); // Usa el método mostrarArchivo
                } else if (archivo instanceof Carpeta) { // Verifica si es una carpeta
                    html += `<li><img src="${archivo.imagen}" alt="Carpeta">${archivo.nombre}</li>`;
                }
            }
            html += '</ul>';
        }
        return html;
    }

    destruirArchivo(){
        if (this.contenido.length === 0){

        }
    }

}

class Archivo {
    constructor(nombre, extension) {
        this.nombre = nombre;
        this.extension = extension;
        this.imagen = this.obtenerImagen(extension);
        this.eliminar = `<div class="eliminar_archivo" style="background-color: red; border: 1px solid black; border-radius: 5px; display: inline-block; cursor: pointer;">X</div>`
    }

    obtenerImagen(extension) {
        if (extension === "mp3") {
            return "Imgs/archivo_audio.png";
        } else if (extension === "png") {
            return "Imgs/archivo_foto.png";
        } else if (extension === "mp4") {
            return "Imgs/archivo_video.png";
        } else {
            return "Imgs/archivo_txt.png";
        }
    }

    mostrarArchivo() {
        return `<li>
                    <img src="${this.imagen}" alt="Archivo ${this.extension}">${this.nombre}.${this.extension} 
                    ${this.eliminar}
                </li>`;
    }
}


function crearElemento(){
    const nombre   = document.getElementById("creador").value
    const eleccion = document.getElementById("tipo_elemento").value

    if (eleccion==="carpeta"){
        raiz.agregarCarpeta(new Carpeta(nombre))
    }else{
        raiz.agregarArchivo(new Archivo(nombre,eleccion))
    }

    const directorios = document.getElementsByClassName("directorios")[0];
    directorios.innerHTML = raiz.mostrarContenido();
}

var crear=document.getElementById("crear")

crear.addEventListener("click",crearElemento)

var raiz = new Carpeta("Raiz");

raiz.agregarArchivo(new Archivo("Cancion1", "mp3"));
raiz.agregarArchivo(new Archivo("Foto1", "png"));
raiz.agregarArchivo(new Archivo("Video1", "mp4"));
raiz.agregarArchivo(new Archivo("Documento1", "txt"));

function eliminar() {
    const botonesEliminar = document.querySelectorAll('.eliminar_archivo');
    botonesEliminar.forEach((boton, index) => {
        boton.addEventListener("click", () => {
            const archivo = raiz.contenido[index];
            raiz.contenido.splice(index, 1);
            directorios.innerHTML = raiz.mostrarContenido();
            eliminar();
        });
    });
}
const directorios = document.getElementsByClassName("directorios")[0];

function actualizarContenido() {
    directorios.innerHTML = raiz.mostrarContenido();
    eliminar();
}

actualizarContenido();

