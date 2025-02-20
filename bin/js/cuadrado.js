var Figuras;
(function (Figuras) {
    class Cuadrado {
        calcularArea(lado) {
            return lado * lado;
        }
        calcularPerimetro(lado) {
            return 4 * lado;
        }
        crearUI() {
            let ventana = d3.select("#ventana-cuadrado");
            if (!ventana.empty()) {
                ventana.style("display", "block");
                return;
            }
            ventana = d3.select("body")
                .append("div")
                .attr("id", "ventana-cuadrado")
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
                .text("Calculadora de Cuadrado")
                .style("text-align", "center")
                .style("margin-top", "10px")
                .style("color", "#333");
            const contenido = ventana.append("div").style("padding", "10px");
            contenido.append("label").text("Lado: ");
            contenido.append("input")
                .attr("type", "number")
                .attr("id", "lado")
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
                .attr("id", "resultado-cuadrado")
                .style("margin-top", "10px")
                .style("font-size", "16px")
                .style("color", "#555");
            contenido.append("svg")
                .attr("id", "cuadrado-svg")
                .attr("width", "300")
                .attr("height", "200")
                .style("margin-top", "20px")
                .style("border", "1px solid #000");
        }
        realizarCalculo() {
            const lado = parseFloat(document.getElementById("lado").value);
            if (isNaN(lado) || lado <= 0) {
                alert("Por favor, ingrese un valor válido.");
                return;
            }
            const area = this.calcularArea(lado);
            const perimetro = this.calcularPerimetro(lado);
            d3.select("#resultado-cuadrado").html(`Área: ${area} - Perímetro: ${perimetro}`);
            this.dibujarCuadrado(lado);
        }
        dibujarCuadrado(lado) {
            const svg = d3.select("#cuadrado-svg");
            svg.selectAll("*").remove();
            svg.append("rect")
                .attr("x", 50)
                .attr("y", 50)
                .attr("width", lado)
                .attr("height", lado)
                .attr("fill", "green")
                .attr("stroke", "black")
                .attr("stroke-width", 2);
        }
    }
    Figuras.Cuadrado = Cuadrado;
})(Figuras || (Figuras = {}));
//# sourceMappingURL=cuadrado.js.map