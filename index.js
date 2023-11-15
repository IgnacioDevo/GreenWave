// Archivo proyectos.js

const proyectos = [
    { nombre: "Proyecto 1", latitud: -12.0464, longitud: -77.0428, categoria: "Reforestación" }, // Ejemplo en Lima, Perú
    { nombre: "Proyecto 2", latitud: -23.5505, longitud: -46.6333, categoria: "Conservación Marina" }, // Ejemplo en São Paulo, Brasil
    // Otros proyectos con sus respectivas categorías
];

// Cambia el centro del mapa a un punto en América Latina
const mapa = L.map('map').setView([-14.235, -51.925], 4);

// Añade un mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mapa);

// Añade marcadores al mapa
function agregarMarcadores(proyectosFiltrados) {
    proyectosFiltrados.forEach((proyecto) => {
        const marker = L.marker([proyecto.latitud, proyecto.longitud])
            .bindPopup(`<b>${proyecto.nombre}</b><br>Categoría: ${proyecto.categoria}`)
            .addTo(mapa);
    });
}

// Filtra los proyectos según la categoría seleccionada
function filtrarPorCategoria(categoriaSeleccionada) {
    const proyectosFiltrados = (categoriaSeleccionada === "Todos")
        ? proyectos
        : proyectos.filter((proyecto) => proyecto.categoria === categoriaSeleccionada);

    // Borra todos los marcadores del mapa
    mapa.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            mapa.removeLayer(layer);
        }
    });

    // Agrega los marcadores filtrados al mapa
    agregarMarcadores(proyectosFiltrados);
}

// Control de selección de categoría
const controlCategorias = L.control({ position: 'topright' });

controlCategorias.onAdd = function () {
    const div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = `
        <select id="categoria" onchange="filtrarPorCategoria(this.value)">
            <option value="Todos">Todos</option>
            <option value="Reforestación">Reforestación</option>
            <option value="Conservación Marina">Conservación Marina</option>
            <!-- Agrega opciones para otras categorías -->
        </select>
    `;
    return div;
};

controlCategorias.addTo(mapa);

// Establece límites geográficos para limitar la vista a América Latina
mapa.setMaxBounds([
    [-56.0, -180.0], // Esquina inferior izquierda (latitud, longitud)
    [37.0, -34.0]    // Esquina superior derecha
]);

// Inicializa el mapa con todos los proyectos
agregarMarcadores(proyectos);
