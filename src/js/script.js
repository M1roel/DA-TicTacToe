let fields = [
    null, null, null,
    null, null, null,
    null, null, null
];

let currentPlayer = 'circle'; // Startspieler ist Kreis (circle)

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertikal
    [0, 4, 8], [2, 4, 6]             // diagonal
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
                // Entfernen des onclick-Handlers nach dem Setzen des Inhalts
                td.onclick = null;
            } else {
                // Wenn das Feld leer ist, füge den onclick-Handler hinzu
                td.onclick = function() {
                    handleClick(row, col, td); // row und col aus der äußeren Schleife verwenden
                };
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    content.appendChild(table);

    // Nach dem Rendern prüfen, ob es einen Gewinner gibt
    const winner = checkWinner();
    if (winner) {
        highlightWinner(winner);
    }
}

function handleClick(row, col, td) {
    const index = row * 3 + col;
    if (fields[index] === null) {
        // Abwechselnd "circle" oder "cross" einfügen
        fields[index] = currentPlayer;

        if (currentPlayer === 'circle') {
            const svg = generateCircleSVG();
            td.appendChild(svg);
        } else {
            const svg = generateCrossSVG();
            td.appendChild(svg);
        }

        // Nach dem Setzen prüfen, ob es einen Gewinner gibt
        const winner = checkWinner();
        if (winner) {
            highlightWinner(winner);
        }

        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
    }
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
    animate.setAttribute("dur", "0.4s");
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
    animate1.setAttribute("dur", "0.4s");
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
    animate2.setAttribute("dur", "0.4s");
    animate2.setAttribute("fill", "freeze");

    line2.appendChild(animate2);

    svg.appendChild(line1);
    svg.appendChild(line2);

    return svg;
}

function checkWinner() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return fields[a]; // Gewinner gefunden (circle oder cross)
        }
    }
    return null; // Kein Gewinner gefunden
}

function highlightWinner(winnerSymbol) {
    // Finde die Positionen der gewinnenden Symbole
    let positions = [];
    for (let i = 0; i < fields.length; i++) {
        if (fields[i] === winnerSymbol) {
            positions.push(i);
        }
    }

    // Bestimme die Mittelpunkte der Symbole
    let minX = Infinity, minY = Infinity;
    let maxX = -Infinity, maxY = -Infinity;
    positions.forEach(pos => {
        const row = Math.floor(pos / 3);
        const col = pos % 3;
        const x = (col + 0.5) * 70; // 70 ist die Breite des SVG
        const y = (row + 0.5) * 70; // 70 ist die Höhe des SVG
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
    });

    // Erstelle SVG für die Linie
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", `${maxX - minX + 70}`);
    svg.setAttribute("height", `${maxY - minY + 70}`);
    svg.setAttribute("viewBox", `${minX} ${minY} ${maxX - minX + 70} ${maxY - minY + 70}`);

    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", `${minX + 35}`); // Startpunkt x-Koordinate
    line.setAttribute("y1", `${minY + 35}`); // Startpunkt y-Koordinate
    line.setAttribute("x2", `${maxX + 35}`); // Endpunkt x-Koordinate
    line.setAttribute("y2", `${maxY + 35}`); // Endpunkt y-Koordinate
    line.setAttribute("stroke", "white");
    line.setAttribute("stroke-width", "5");

    svg.appendChild(line);

    // Positioniere das SVG über der Mitte der Symbole
    svg.style.position = "absolute";
    svg.style.left = `${minX}px`;
    svg.style.top = `${minY}px`;

    const content = document.getElementById('content');
    content.appendChild(svg);
}

document.addEventListener('DOMContentLoaded', init);
