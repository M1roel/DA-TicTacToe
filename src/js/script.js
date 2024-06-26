let fields = [
    'circle',
    'cross',
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

function init() {
    render();
}

function render() {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Leeren des Containers

    // Erstellen der Tabelle
    const table = document.createElement('table');
    for (let row = 0; row < 3; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < 3; col++) {
            const td = document.createElement('td');
            const index = row * 3 + col;
            if (fields[index]) {
                if (fields[index] === 'circle') {
                    const svg = generateCircleSVG();
                    td.appendChild(svg);
                } else if (fields[index] === 'cross') {
                    const svg = generateCrossSVG();
                    td.appendChild(svg);
                }
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    content.appendChild(table);
}

function generateCircleSVG() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "70");
    svg.setAttribute("height", "70");
    svg.setAttribute("viewBox", "0 0 70 70");

    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", "35");
    circle.setAttribute("cy", "35");
    circle.setAttribute("r", "30");
    circle.setAttribute("stroke", "#00b0ef");
    circle.setAttribute("stroke-width", "5");
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke-dasharray", "188.4"); // 2 * Math.PI * 30
    circle.setAttribute("stroke-dashoffset", "188.4");

    const animate = document.createElementNS(svgNS, "animate");
    animate.setAttribute("attributeName", "stroke-dashoffset");
    animate.setAttribute("from", "188.4");
    animate.setAttribute("to", "0");
    animate.setAttribute("dur", "2s");
    animate.setAttribute("fill", "freeze");

    circle.appendChild(animate);
    svg.appendChild(circle);

    return svg;
}

function generateCrossSVG() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "70");
    svg.setAttribute("height", "70");
    svg.setAttribute("viewBox", "0 0 70 70");

    const line1 = document.createElementNS(svgNS, "line");
    line1.setAttribute("x1", "10");
    line1.setAttribute("y1", "10");
    line1.setAttribute("x2", "60");
    line1.setAttribute("y2", "60");
    line1.setAttribute("stroke", "#FF0000");
    line1.setAttribute("stroke-width", "5");
    line1.setAttribute("stroke-dasharray", "70.71");
    line1.setAttribute("stroke-dashoffset", "70.71");

    const animate1 = document.createElementNS(svgNS, "animate");
    animate1.setAttribute("attributeName", "stroke-dashoffset");
    animate1.setAttribute("from", "70.71");
    animate1.setAttribute("to", "0");
    animate1.setAttribute("dur", "2s");
    animate1.setAttribute("fill", "freeze");

    line1.appendChild(animate1);

    const line2 = document.createElementNS(svgNS, "line");
    line2.setAttribute("x1", "10");
    line2.setAttribute("y1", "60");
    line2.setAttribute("x2", "60");
    line2.setAttribute("y2", "10");
    line2.setAttribute("stroke", "#FF0000");
    line2.setAttribute("stroke-width", "5");
    line2.setAttribute("stroke-dasharray", "70.71");
    line2.setAttribute("stroke-dashoffset", "70.71");

    const animate2 = document.createElementNS(svgNS, "animate");
    animate2.setAttribute("attributeName", "stroke-dashoffset");
    animate2.setAttribute("from", "70.71");
    animate2.setAttribute("to", "0");
    animate2.setAttribute("dur", "2s");
    animate2.setAttribute("fill", "freeze");

    line2.appendChild(animate2);

    svg.appendChild(line1);
    svg.appendChild(line2);

    return svg;
}
