const MARCAS = [...new Set(PRODUCTOS.map(producto => producto.marca))];

let bolsa = {};
let marcaElegida = "Todas";
let textoBusqueda = "";
let ordenElegido = "destacados";
let elementoAntesDelModal = null;

try {
  bolsa = JSON.parse(localStorage.getItem("bf-cart") || "{}") || {};
} catch (error) {
  bolsa = {};
}

Object.keys(bolsa).forEach(id => {
  const existe = PRODUCTOS.some(producto => producto.id === id);
  if (!existe || !(bolsa[id] > 0)) delete bolsa[id];
});

const $ = selector => document.querySelector(selector);

const formatearPrecio = numero => "$" + numero.toLocaleString("es-CL");

const normalizarTexto = texto =>
  texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const buscarProducto = id => PRODUCTOS.find(producto => producto.id === id);

function guardarBolsa() {
  try {
    localStorage.setItem("bf-cart", JSON.stringify(bolsa));
  } catch (error) {}
}

const productosEnBolsa = () =>
  Object.keys(bolsa).map(id => ({
    producto: buscarProducto(id),
    cantidad: bolsa[id]
  }));

const cantidadTotal = () =>
  productosEnBolsa().reduce((suma, item) => suma + item.cantidad, 0);

const precioTotal = () =>
  productosEnBolsa().reduce((suma, item) => suma + item.producto.precio * item.cantidad, 0);

function bloquearScrollSiHayPanelAbierto() {
  const hayPanelAbierto = !$("#bolsa").hidden || !$("#modal").hidden;
  document.body.style.overflow = hayPanelAbierto ? "hidden" : "";
}

function botonesDeCantidad(producto) {
  if (bolsa[producto.id]) {
    return `
      <span class="contador">
        <button data-restar="${producto.id}" aria-label="Quitar uno">−</button>
        <span>${bolsa[producto.id]}</span>
        <button data-sumar="${producto.id}" aria-label="Agregar uno">+</button>
      </span>`;
  }
  return `<button class="boton-agregar" data-sumar="${producto.id}">Agregar</button>`;
}

function dibujarMarcas() {
  $("#marcas").innerHTML = ["Todas", ...MARCAS].map(marca => `
    <button class="marca" data-marca="${marca}" aria-pressed="${marca === marcaElegida}">
      ${marca}
    </button>`
  ).join("");
}

function dibujarProductos() {
  let lista = PRODUCTOS.filter(producto => {
    const coincideMarca = marcaElegida === "Todas" || producto.marca === marcaElegida;
    const textoDelProducto = normalizarTexto(`${producto.marca} ${producto.nombre} ${producto.descripcion}`);
    const coincideBusqueda = textoDelProducto.includes(textoBusqueda);
    return coincideMarca && coincideBusqueda;
  });

  if (ordenElegido === "precio-menor") {
    lista.sort((a, b) => a.precio - b.precio);
  } else if (ordenElegido === "precio-mayor") {
    lista.sort((a, b) => b.precio - a.precio);
  } else if (ordenElegido === "nombre") {
    lista.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
  }

  $("#contador-productos").textContent =
    lista.length + (lista.length === 1 ? " producto" : " productos");

  if (lista.length === 0) {
    $("#grilla").innerHTML = `
      <p class="mensaje-vacio">No hay productos con ese filtro. Prueba otra marca o búsqueda.</p>`;
    return;
  }

  $("#grilla").innerHTML = lista.map(producto => `
    <article class="tarjeta">
      <button class="tarjeta__foto" data-ver="${producto.id}" aria-label="Ver ${producto.nombre}">
        <img src="${producto.imagen}" alt="${producto.marca} ${producto.nombre}" loading="lazy">
      </button>
      <div class="tarjeta__marca">${producto.marca}</div>
      <h3 class="tarjeta__titulo">
        <button class="tarjeta__nombre" data-ver="${producto.id}">${producto.nombre}</button>
      </h3>
      <div class="texto-suave">${producto.tamano}</div>
      <div class="tarjeta__pie">
        <span class="precio">${formatearPrecio(producto.precio)}</span>
        <span class="acciones" data-id="${producto.id}">${botonesDeCantidad(producto)}</span>
      </div>
    </article>`
  ).join("");
}

function abrirDetalle(id) {
  const producto = buscarProducto(id);
  elementoAntesDelModal = document.activeElement;

  $("#modal-caja").innerHTML = `
    <button class="modal__cerrar" data-cerrar aria-label="Cerrar">×</button>
    <img src="${producto.imagen}" alt="${producto.marca} ${producto.nombre}">
    <div class="modal__info">
      <div class="tarjeta__marca">${producto.marca}</div>
      <h2>${producto.nombre}</h2>
      <div class="texto-suave">${producto.tamano}, ${producto.categoria}</div>
      <div class="precio">${formatearPrecio(producto.precio)}</div>
      <p>${producto.descripcion}</p>
      <div class="texto-suave">Código ${producto.id}</div>
      <div class="acciones" data-id="${producto.id}">${botonesDeCantidad(producto)}</div>
    </div>`;

  $("#modal").hidden = false;
  bloquearScrollSiHayPanelAbierto();
  $("#modal-caja .modal__cerrar").focus();
}

function cerrarDetalle() {
  $("#modal").hidden = true;
  bloquearScrollSiHayPanelAbierto();
  if (elementoAntesDelModal && elementoAntesDelModal.isConnected) {
    elementoAntesDelModal.focus();
  }
}

function dibujarBolsa() {
  const items = productosEnBolsa();

  if (items.length === 0) {
    $("#lista-bolsa").innerHTML = `
      <p class="mensaje-vacio">Tu bolsa está vacía. Agrega productos del catálogo.</p>`;
  } else {
    $("#lista-bolsa").innerHTML = items.map(({ producto, cantidad }) => `
      <div class="bolsa__item">
        <img src="${producto.imagen}" alt="">
        <div>
          <b>${producto.nombre}</b>
          <div class="texto-suave">${producto.marca}, ${producto.tamano}</div>
        </div>
        <b>${formatearPrecio(producto.precio * cantidad)}</b>
        <div class="bolsa__controles">
          <span class="contador">
            <button data-restar="${producto.id}" aria-label="Quitar uno">−</button>
            <span>${cantidad}</span>
            <button data-sumar="${producto.id}" aria-label="Agregar uno">+</button>
          </span>
          <button class="boton-quitar" data-quitar="${producto.id}">Quitar</button>
        </div>
      </div>`
    ).join("");
  }

  $("#total").textContent = formatearPrecio(precioTotal());
  $("#cantidad-bolsa").textContent = cantidadTotal();
  actualizarEnlaceWhatsApp();
}

function abrirBolsa(abrir) {
  $("#bolsa").hidden = !abrir;
  $("#fondo-oscuro").hidden = !abrir;
  $("#abrir-bolsa").setAttribute("aria-expanded", abrir);
  bloquearScrollSiHayPanelAbierto();

  if (abrir) {
    dibujarBolsa();
    $("#cerrar-bolsa").focus();
  } else {
    $("#abrir-bolsa").focus();
  }
}

function armarMensajePedido() {
  const nombre = $("#nombre-cliente").value.trim();
  const comentarios = $("#comentarios").value.trim();

  const lineasDelPedido = productosEnBolsa()
    .map(({ producto, cantidad }) =>
      `- ${cantidad} × ${producto.nombre} (${producto.marca}) — ${formatearPrecio(producto.precio * cantidad)}`)
    .join("\n");

  let mensaje = `Hola, quiero hacer este pedido en ${NOMBRE_TIENDA}:\n`
    + lineasDelPedido
    + `\n\nTotal: ${formatearPrecio(precioTotal())}`
    + `\nNombre: ${nombre}`;

  if (comentarios) mensaje += `\nComentarios: ${comentarios}`;
  return mensaje;
}

function actualizarEnlaceWhatsApp() {
  const hayProductos = cantidadTotal() > 0;
  const hayNombre = $("#nombre-cliente").value.trim() !== "";

  $("#enviar-whatsapp").href =
    `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(armarMensajePedido())}`;

  $("#enviar-whatsapp").setAttribute("aria-disabled", hayProductos && hayNombre ? "false" : "true");

  if (!hayProductos) {
    $("#ayuda").textContent = "Agrega al menos un producto.";
  } else if (!hayNombre) {
    $("#ayuda").textContent = "Escribe tu nombre para enviar el pedido.";
  } else {
    $("#ayuda").textContent = "Se abrirá WhatsApp con tu pedido listo.";
  }
}

document.addEventListener("click", evento => {
  const boton = evento.target.closest("button, a");
  if (!boton) return;
  const datos = boton.dataset;

  if (boton.id === "enviar-whatsapp" && boton.getAttribute("aria-disabled") === "true") {
    evento.preventDefault();
    (cantidadTotal() ? $("#nombre-cliente") : $("#cerrar-bolsa")).focus();
    return;
  }

  if (datos.marca !== undefined) {
    marcaElegida = datos.marca;
    dibujarMarcas();
    dibujarProductos();
    return;
  }

  if (datos.ver) {
    abrirDetalle(datos.ver);
    return;
  }

  if (datos.cerrar !== undefined) {
    cerrarDetalle();
    return;
  }

  if (datos.sumar || datos.restar || datos.quitar) {
    const id = datos.sumar || datos.restar || datos.quitar;
    const estaEnBolsa = !!boton.closest("#bolsa");
    const estaEnModal = !!boton.closest("#modal");

    if (datos.sumar) {
      bolsa[id] = (bolsa[id] || 0) + 1;
    } else if (datos.restar) {
      bolsa[id] = (bolsa[id] || 0) - 1;
      if (bolsa[id] <= 0) delete bolsa[id];
    } else {
      delete bolsa[id];
    }

    guardarBolsa();

    document.querySelectorAll(`.acciones[data-id="${id}"]`).forEach(zona => {
      zona.innerHTML = botonesDeCantidad(buscarProducto(id));
    });
    dibujarBolsa();

    let botonParaEnfocar;
    if (estaEnBolsa) {
      botonParaEnfocar = $(`#lista-bolsa [data-sumar="${id}"]`) || $("#cerrar-bolsa");
    } else if (estaEnModal) {
      botonParaEnfocar = $(`#modal-caja [data-sumar="${id}"]`);
    } else {
      botonParaEnfocar = $(`#grilla [data-sumar="${id}"]`);
    }
    if (botonParaEnfocar) botonParaEnfocar.focus();
  }
});

$("#modal").addEventListener("click", evento => {
  if (evento.target.id === "modal") cerrarDetalle();
});

$("#abrir-bolsa").onclick = () => abrirBolsa(true);
$("#cerrar-bolsa").onclick = () => abrirBolsa(false);
$("#fondo-oscuro").onclick = () => abrirBolsa(false);

document.addEventListener("keydown", evento => {
  if (evento.key !== "Escape") return;
  if (!$("#modal").hidden) cerrarDetalle();
  else if (!$("#bolsa").hidden) abrirBolsa(false);
});

$("#vaciar-bolsa").onclick = () => {
  bolsa = {};
  guardarBolsa();
  dibujarProductos();
  dibujarBolsa();
};

$("#buscar").oninput = evento => {
  textoBusqueda = normalizarTexto(evento.target.value.trim());
  dibujarProductos();
};

$("#orden").onchange = evento => {
  ordenElegido = evento.target.value;
  dibujarProductos();
};

$("#nombre-cliente").oninput = actualizarEnlaceWhatsApp;
$("#comentarios").oninput = actualizarEnlaceWhatsApp;

$("#ver-productos").onclick = () => {
  const prefiereSinMovimiento = matchMedia("(prefers-reduced-motion: reduce)").matches;
  $("#productos").scrollIntoView({ behavior: prefiereSinMovimiento ? "auto" : "smooth" });
};

document.querySelectorAll(".enlace-contacto").forEach(enlace => {
  enlace.href = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(MENSAJE_CONTACTO)}`;
});

const productoDePortada = buscarProducto("11202086-39");
$("#imagen-portada").innerHTML =
  `<img src="${productoDePortada.imagen}" alt="${productoDePortada.nombre} de ${productoDePortada.marca}">`;

dibujarMarcas();
dibujarProductos();
dibujarBolsa();
