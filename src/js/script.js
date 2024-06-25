let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
]

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
                const symbol = document.createElement('div');
                symbol.className = fields[index];
                symbol.textContent = fields[index] === 'circle' ? 'O' : 'X';
                td.appendChild(symbol);
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    content.appendChild(table);
}