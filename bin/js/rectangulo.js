var Figuras;
(function (Figuras) {
    class Rectangulo {
        calcularArea(base, altura) {
            return base * altura;
        }
        calcularPerimetro(base, altura) {
            return 2 * (base + altura);
        }
        crearUI() {
            let ventana = d3.select("#ventana-rectangulo");
            if (!ventana.empty()) {
                ventana.style("display", "block");
                return;
            }
            ventana = d3.select("body")
                .append("div")
                .attr("id", "ventana-rectangulo")
                .attr("class", "ventana")
                .style("position", "absolute")
                .style("top", "100px")
                .style("left", "100px")
                .style("width", "400px")
                .style("background", "#fff")
                .style("border", "1px solid #ccc")
                .style("border-radius", "8px")
                .style("box-shadow", "4px 4px 10px rgba(0,0,0,0.2)")
                .style("padding", "20px")
                .style("z-index", "1000");
            ventana.append("button")
                .text("X")
                .style("position", "absolute")
                .style("top", "5px")
                .style("right", "5px")
                .style("border", "none")
                .style("background", "transparent")
                .style("font-size", "18px")
                .style("cursor", "pointer")
                .on("click", () => ventana.style("display", "none"));
            ventana.append("h2")
                .text("Calculadora de Rectángulo")
                .style("text-align", "center")
                .style("margin-top", "10px")
                .style("color", "#333");
            const contenido = ventana.append("div").style("padding", "10px");
            contenido.append("label").text("Base: ");
            contenido.append("input")
                .attr("type", "number")
                .attr("id", "base")
                .style("margin-bottom", "10px")
                .style("width", "100%");
            contenido.append("br");
            contenido.append("label").text("Altura: ");
            contenido.append("input")
                .attr("type", "number")
                .attr("id", "altura")
                .style("margin-bottom", "10px")
                .style("width", "100%");
            contenido.append("br");
            contenido.append("button")
                .text("Calcular")
                .style("margin-top", "10px")
                .style("padding", "8px")
                .style("cursor", "pointer")
                .style("width", "100%")
                .on("click", () => this.realizarCalculo());
            contenido.append("p")
                .attr("id", "resultado-rectangulo")
                .style("margin-top", "10px")
                .style("font-size", "16px")
                .style("color", "#555");
            contenido.append("svg")
                .attr("id", "rectangulo-svg")
                .attr("width", "300")
                .attr("height", "200")
                .style("margin-top", "20px")
                .style("border", "1px solid #000");
        }
        realizarCalculo() {
            const base = parseFloat(document.getElementById("base").value);
            const altura = parseFloat(document.getElementById("altura").value);
            if (isNaN(base) || isNaN(altura) || base <= 0 || altura <= 0) {
                alert("Por favor, ingrese valores válidos.");
                return;
            }
            const area = this.calcularArea(base, altura);
            const perimetro = this.calcularPerimetro(base, altura);
            d3.select("#resultado-rectangulo").html(`Área: ${area} - Perímetro: ${perimetro}`);
            this.dibujarRectangulo(base, altura);
        }
        dibujarRectangulo(base, altura) {
            const svg = d3.select("#rectangulo-svg");
            svg.selectAll("*").remove();
            svg.append("rect")
                .attr("x", 50)
                .attr("y", 50)
                .attr("width", base)
                .attr("height", altura)
                .attr("fill", "blue")
                .attr("stroke", "black")
                .attr("stroke-width", 2);
        }
    }
    Figuras.Rectangulo = Rectangulo;
})(Figuras || (Figuras = {}));
//# sourceMappingURL=rectangulo.js.map