namespace CRUD {
    interface Usuario {
        id: number;
        nombre: string;
        email: string;
        telefono: string;
    }

    export class Usuarios {
        ventana: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
        inputNombre: d3.Selection<HTMLInputElement, unknown, HTMLElement, any>;
        inputEmail: d3.Selection<HTMLInputElement, unknown, HTMLElement, any>;
        inputTelefono: d3.Selection<HTMLInputElement, unknown, HTMLElement, any>;

        private apiUrl: string = "http://localhost:3000/usuarios";
        constructor() {
            this.mostrarVentana();
        }

        public mostrarVentana(): void {
            this.ventana = d3.select("#ventana-usuarios");
            if (!this.ventana.empty()) {
                this.ventana.style("display", "block");
                return;
            }

            this.ventana = d3.select("body")
                .append("div")
                .attr("id", "ventana-usuarios")
                .attr("class", "ventana")
                .style("position", "fixed")
                .style("top", "50%")
                .style("left", "50%")
                .style("transform", "translate(-50%, -50%)")
                .style("width", "90%")
                .style("max-width", "500px")
                .style("max-height", "90vh")
                .style("overflow", "auto")
                .style("background", "#ffffff")
                .style("border", "1px solid #ccc")
                .style("border-radius", "12px")
                .style("box-shadow", "0px 8px 16px rgba(0,0,0,0.3)")
                .style("padding", "20px")
                .style("z-index", "1000")
                .style("text-align", "center");

            this.ventana.append("button")
                .text("✖")
                .attr("class", "cerrar-ventana")
                .style("position", "absolute")
                .style("top", "10px")
                .style("right", "10px")
                .style("border", "none")
                .style("background", "transparent")
                .style("font-size", "20px")
                .style("color", "#333")
                .style("cursor", "pointer")
                .style("transition", "0.3s")
                .on("mouseover", function () { d3.select(this).style("color", "red"); })
                .on("mouseout", function () { d3.select(this).style("color", "#333"); })
                .on("click", () => this.ventana.style("display", "none"));

            this.ventana.append("h2")
                .text("Gestión de Usuarios")
                .attr("class", "titulo-ventana")
                .style("font-size", "clamp(18px, 4vw, 24px)")
                .style("margin-bottom", "15px")
                .style("color", "#333");

            const contenido = this.ventana.append("div")
                .attr("class", "contenido-ventana")
                .style("display", "flex")
                .style("flex-direction", "column")
                .style("height", "100%");
            contenido.append("label")
                .text("Nombre:");
            this.inputNombre = contenido.append("input")
                .attr("type", "text")
                .attr("class", "input-campo")
                .attr("id", "nombre")
                .style("width", "100%");

            contenido.append("label").text("Email:");
            this.inputEmail = contenido.append("input")
                .attr("type", "email")
                .attr("class", "input-campo")
                .attr("id", "email")
                .style("width", "100%");

            contenido.append("label").text("Teléfono:");
            this.inputTelefono = contenido.append("input")
                .attr("type", "text")
                .attr("class", "input-campo")
                .attr("id", "telefono")
                .style("width", "100%");

            d3.selectAll(".input-campo")
                .style("width", "100%")
                .style("padding", "8px")
                .style("border", "1px solid #ccc")
                .style("border-radius", "6px")
                .style("font-size", "16px")
                .style("margin-bottom", "10px");

            contenido.append("button")
                .text("Agregar Usuario")
                .attr("class", "boton-agregar")
                .style("width", "100%")
                .style("padding", "10px")
                .style("border", "none")
                .style("border-radius", "6px")
                .style("background", "linear-gradient(90deg, #ff7e5f, #feb47b)")
                .style("color", "white")
                .style("font-size", "16px")
                .style("cursor", "pointer")
                .style("transition", "0.3s")
                .on("click", () => {
                    this.agregarUsuario();
                });
            const tablaWrapper = contenido.append("div")
                .style("flex-grow", "1")
                .style("max-height", "50vh")
                .style("overflow-y", "auto")
                .style("overflow-x", "auto")
                .style("width", "100%")
                .style("margin-top", "20px")
                .style("border", "1px solid #ccc")
                .style("border-radius", "6px")
                .style("background", "#fff");

            const tabla = tablaWrapper.append("table")
                .attr("id", "tabla-usuarios")
                .attr("class", "tabla")
                .style("width", "100%")
                .style("min-width", "500px")
                .style("border-collapse", "collapse")
                .style("table-layout", "fixed")
                .style("border", "1px solid #000");

            this.cargarUsuarios();
        }
        private agregarUsuario(): void {
            const nombre = this.inputNombre.property("value");
            const email = this.inputEmail.property("value");
            const telefono = this.inputTelefono.property("value");

            if (!nombre || !email || !telefono) {
                alert("Todos los campos son obligatorios.");
                return;
            }

            fetch(this.apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, email, telefono })
            })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(err => { throw new Error(err.mensaje); });
                    }
                    return response.json();
                })
                .then(() => {
                    alert("Usuario agregado exitosamente.");
                    this.cargarUsuarios();
                })
                .catch(error => {
                    alert(error.message);
                });
        }


        private cargarUsuarios(): void {
            fetch(this.apiUrl)
                .then(response => response.json())
                .then((data: Usuario[]) => {
                    const tabla = d3.select("#tabla-usuarios");
                    tabla.html("");
                    const thead = tabla.append("thead").append("tr");
                    ["Nombre", "Email", "Teléfono"].forEach(text => {
                        thead.append("th")
                            .style("border", "1px solid black")
                            .style("padding", "8px")
                            .style("background", "#ff7e5f")
                            .style("color", "white")
                            .style("font-size", "14px")
                            .text(text);
                    });
                    const tbody = tabla.append("tbody");
                    data.forEach(usuario => {
                        const row = tbody.append("tr");
                        row.append("td")
                            .style("border", "1px solid black")
                            .style("padding", "8px")
                            .style("font-size", "14px")
                            .style("width", "20%")
                            .style("word-wrap", "break-word")
                            .text(usuario.nombre);
                        row.append("td")
                            .style("border", "1px solid black")
                            .style("padding", "8px")
                            .style("font-size", "14px")
                            .style("width", "50%")
                            .style("word-wrap", "break-word")
                            .text(usuario.email);
                        row.append("td")
                            .style("border", "1px solid black")
                            .style("padding", "8px")
                            .style("font-size", "14px")
                            .style("width", "10%")
                            .style("word-wrap", "break-word")
                            .text(usuario.telefono);
                    });
                })
                .catch(error => console.error("Error al cargar usuarios:", error));
        }
    }
}
