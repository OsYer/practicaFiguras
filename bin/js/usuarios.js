var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Usuarios;
(function (Usuarios) {
    class UsuarioClase {
        constructor() {
            this.usuarios = new Map();
            this.formatoFecha = d3.timeFormat("%d/%m/%Y %I:%M %p"); // Formato de fecha
            this.crearUI();
        }
        // 🔹 Método para obtener los datos desde JSON y almacenarlos en el Map<>
        cargarUsuarios() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield fetch("js/usuarios.json");
                    const data = yield response.json();
                    data.forEach(usuario => {
                        usuario.fechaRegistro = this.formatearFecha(usuario.fechaRegistro);
                        this.usuarios.set(usuario.id, usuario);
                    });
                    this.actualizarTabla();
                }
                catch (error) {
                    console.error("Error al cargar los datos:", error);
                }
            });
        }
        // 🔹 Método para formatear la fecha
        formatearFecha(fecha) {
            const fechaObjeto = new Date(fecha);
            return this.formatoFecha(fechaObjeto);
        }
        // 🔹 Método para crear la ventana modal con la tabla y cargar datos
        crearUI() {
            this.ventana = d3.select("#ventana-usuarios");
            // Si la ventana ya existe, simplemente la mostramos
            if (!this.ventana.empty()) {
                return;
            }
            // Crear la ventana emergente
            this.ventana = d3.select("body")
                .append("div")
                .attr("id", "ventana-usuarios")
                .attr("class", "ventana")
                .style("position", "fixed")
                .style("top", "50%")
                .style("left", "50%")
                .style("transform", "translate(-50%, -50%)")
                .style("width", "90%")
                .style("max-width", "800px")
                .style("max-height", "80vh")
                .style("overflow", "hidden")
                .style("background", "#ffffff")
                .style("border", "1px solid #ccc")
                .style("border-radius", "12px")
                .style("box-shadow", "0px 8px 16px rgba(0,0,0,0.3)")
                .style("padding", "20px")
                .style("z-index", "1000")
                .style("text-align", "center");
            // Botón de cerrar
            this.ventana.append("button")
                .text("✖")
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
                .text("Lista de Usuarios")
                .style("font-size", "clamp(18px, 4vw, 24px)")
                .style("margin-bottom", "15px")
                .style("color", "#333")
                .style("text-align", "center");
            // Contenedor de la tabla con scroll interno
            this.ventana.append("div")
                .attr("id", "tabla-usuarios")
                .style("padding", "10px")
                .style("max-height", "55vh")
                .style("overflow-y", "auto")
                .style("border", "1px solid #ddd")
                .style("border-radius", "8px");
            this.cargarUsuarios();
        }
        // 🔹 Método para actualizar la tabla dentro de la ventana
        actualizarTabla() {
            const contenedorTabla = d3.select("#tabla-usuarios");
            contenedorTabla.html("");
            const tabla = contenedorTabla.append("table")
                .attr("border", "1")
                .style("width", "100%")
                .style("border-collapse", "collapse")
                .style("background", "#fff");
            // Encabezados de la tabla
            const encabezados = ["ID", "Nombre", "A. Paterno", "A. Materno", "Edad", "Correo", "Estado", "Registro"];
            tabla.append("thead")
                .append("tr")
                .selectAll("th")
                .data(encabezados)
                .enter()
                .append("th")
                .text(d => d)
                .style("background", "#f4f4f4")
                .style("padding", "12px")
                .style("border", "1px solid #ddd")
                .style("font-weight", "bold")
                .style("text-align", "center");
            // Cuerpo de la tabla
            const tbody = tabla.append("tbody");
            const usuariosArray = Array.from(this.usuarios.values());
            const filas = tbody.selectAll("tr")
                .data(usuariosArray)
                .enter()
                .append("tr")
                .style("border-bottom", "1px solid #ddd")
                .style("background-color", (d, i) => i % 2 === 0 ? "#f9f9f9" : "#ffffff");
            filas.selectAll("td")
                .data(d => Object.values(d))
                .enter()
                .append("td")
                .text(d => d)
                .style("padding", "12px")
                .style("border", "1px solid #ddd")
                .style("text-align", "center")
                .style("white-space", "nowrap");
        }
    }
    Usuarios.UsuarioClase = UsuarioClase;
})(Usuarios || (Usuarios = {}));
//# sourceMappingURL=usuarios.js.map