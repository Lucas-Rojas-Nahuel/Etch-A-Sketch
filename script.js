// eventos para que aparesca el cartel para el tamaño
const btnOpen = document.querySelector("#btn-open");
const btnClose = document.querySelector("#btn-close");
const gridSize = document.querySelector("#grid-size");

btnOpen.addEventListener("click", () => {
  gridSize.style.display = "flex";
});

btnClose.addEventListener("click", () => {
  gridSize.style.display = "none";
});

//evento para obtener el tamaño
const textGridSize = document.querySelector("#text-grid-size");
const size = document.querySelector("#size");
const btnSizeChanged = document.querySelector("#btn-size-changed");
const alert = document.querySelector("#alert");
const fieldset = document.querySelector("#fieldset");

//validamos datos de entrada
size.addEventListener("input", () => {
  const value = parseInt(size.value);

  if (isNaN(value) || value > 100 || value < 16) {
    alert.classList.remove("text-color-valid");
    fieldset.classList.remove("fieldset-valid");
    alert.textContent = "Solo se aceptan números de 16 hasta 100";
    alert.classList.add("text-color-error");
    fieldset.classList.add("fieldset-error");
  } else {
    alert.classList.remove("text-color-error");
    fieldset.classList.remove("fieldset-error");
    alert.textContent = "Número aceptado";
    alert.classList.add("text-color-valid");
    fieldset.classList.add("fieldset-valid");
  }
});

//agregamos eventos para aceptar los datos con la tecla enter
size.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const value = parseInt(size.value);

    if (isNaN(value) || value > 100 || value < 16) {
      alert.textContent = "datos no aceptados";
      alert.classList.add("text-color-error");
      fieldset.classList.add("fieldset-error");
    } else {
      btnSizeChanged.click();
    }
  }
});

//agregando las cuadriculas
const main = document.querySelector("#main");

function createCell() {
  const columnas = parseInt(size.value);

  const totalCeldas = columnas * columnas;
  main.innerHTML = "";

  for (let i = 0; i < totalCeldas; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.width = `${960 / columnas}px`;
    main.appendChild(cell);
  }
}

createCell();
pinterCell();

//evento para agregar tamaño a la cuadricula
btnSizeChanged.addEventListener("click", () => {
  const value = parseInt(size.value);
  if (isNaN(value) || value > 100 || value < 16) {
    alert.textContent = "Solo se aceptan números de 16 hasta 100";
    alert.classList.add("text-color-error")
    fieldset.classList.add("fieldset-error")
  } else {
    textGridSize.textContent = `Tamaño elegido de ${size.value}x${size.value} `;
    gridSize.style.display = "none";
    createCell();
    pinterCell();
  }
});

//funcion para pintar cada celda
function pinterCell() {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    cell.addEventListener("mouseenter", () => {
      if (cell.classList.value.includes("pintado")) {
        let opacity = parseFloat(cell.dataset.opacity) || 1;

        if (opacity > 0) {
          opacity -= 0.1;
          opacity = Math.max(opacity, 0);
          cell.dataset.opacity = opacity.toFixed(1);

          const r = cell.dataset.r;
          const g = cell.dataset.g;
          const b = cell.dataset.b;

          cell.style.backgroundColor = `rgba(${r},${g},${b}, ${opacity})`;
        }
      } else {
        const { r, g, b } = colorAleatorioRGB();
        cell.dataset.r = r;
        cell.dataset.g = g;
        cell.dataset.b = b;
        cell.dataset.opacity = "1";
        cell.style.backgroundColor = `rgba(${r},${g},${b}, 1)`;
        cell.classList.add("pintado");
      }
    });
  });
}

//funcion para el color aleatorio
function colorAleatorioRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return { r, g, b };
}
