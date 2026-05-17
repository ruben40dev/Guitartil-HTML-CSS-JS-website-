document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // ===== NOTAS MUSICALES ===
    // =========================
    const container = document.getElementById("notas-container");

    if (container) {
        const imagenes = [
            "img/corchea.png",
            "img/semicorchea.png",
            "img/fusa.png",
            "img/clave_sol.png"
        ];

        function crearNota() {
            const nota = document.createElement("img");

            nota.src = imagenes[Math.floor(Math.random() * imagenes.length)];
            nota.classList.add("nota");

            nota.style.top = Math.random() * 100 + "vh";
            nota.style.width = (20 + Math.random() * 25) + "px";

            const duracion = 10 + Math.random() * 15;
            nota.style.animationDuration = duracion + "s";

            const desdeIzquierda = Math.random() > 0.5;

            if (desdeIzquierda) {
                nota.style.left = "-50px";
                nota.style.animationName = "moverDerecha";
            } else {
                nota.style.left = "110vw";
                nota.style.animationName = "moverIzquierda";
            }

            container.appendChild(nota);

            setTimeout(() => {
                nota.remove();
                crearNota();
            }, duracion * 1000);
        }

        for (let i = 0; i < 15; i++) crearNota();
    }


    // =========================
    // ===== SIDEBAR ===========
    // =========================
    const btn = document.getElementById("toggleSidebar");
    const sidebar = document.querySelector(".sidebar");
    const btnCerrar = document.querySelector(".btn-cerrar");

    if (btn && sidebar && btnCerrar) {
        btn.addEventListener("click", () => {
            sidebar.classList.add("active");
            btn.classList.add("oculto");
        });

        btnCerrar.addEventListener("click", () => {
            sidebar.classList.remove("active");
            btn.classList.remove("oculto");
        });
    }


    // =========================
    // ===== MODAL ============
    // =========================
    const items = document.querySelectorAll(".menu-item");
    const modal = document.getElementById("modal");
    const titulo = document.getElementById("modal-titulo");
    const texto = document.getElementById("modal-texto");
    const cerrarModal = document.querySelector(".cerrar-modal");

    if (items.length && modal && titulo && texto && cerrarModal) {

        const contenido = {
            proyecto: {
                titulo: "Nuestro proyecto",
                texto: "El principal objetivo es dar una segunda vida a guitarras abandonadas..."
            },
            quienes: {
                titulo: "Quiénes somos",
                texto: "Somos dos amigos apasionados por la música..."
            },
            contacto: {
                titulo: "Contacto",
                texto: "guitartilcompraventa@gmail.com"
            }
        };

        items.forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();

                const seccion = item.dataset.seccion;

                titulo.textContent = contenido[seccion].titulo;
                texto.innerHTML = contenido[seccion].texto;

                modal.classList.add("active");
            });
        });

        cerrarModal.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    }


    // =========================
    // ===== FAVORITOS =========
    // =========================
    const favs = document.querySelectorAll(".favorito");
    const sonidoClick = new Audio("audio/click.mp3");

    let favoritosGuardados = JSON.parse(localStorage.getItem("favoritos") || "[]");

    function actualizarIcono(fav, activo) {
        fav.textContent = activo ? "❤️" : "♡";
    }

    favs.forEach(fav => {

        const card = fav.closest(".guitarra-card");
        if (!card) return;

        const nombre = card.querySelector("h3")?.textContent;

        if (nombre && favoritosGuardados.includes(nombre)) {
            fav.classList.add("activo");
            actualizarIcono(fav, true);
        } else {
            actualizarIcono(fav, false);
        }

        fav.addEventListener("click", (e) => {
            e.stopPropagation();

            sonidoClick.currentTime = 0;
            sonidoClick.play();

            const activo = fav.classList.toggle("activo");
            actualizarIcono(fav, activo);

            if (activo) {
                if (!favoritosGuardados.includes(nombre)) {
                    favoritosGuardados.push(nombre);
                }
            } else {
                favoritosGuardados = favoritosGuardados.filter(n => n !== nombre);
            }

            localStorage.setItem("favoritos", JSON.stringify(favoritosGuardados));
        });
    });


    // =========================
    // ===== DATOS GUITARRAS ===
    // =========================
   const infoGuitarras = {
    "Yamaha acústica": {
        stock: 1,
        estado: ["Nueva", "Usada", "Reacondicionada"][Math.floor(Math.random()*3)],
        material: "Tapa de abeto, aros y fondo de nato",
        descripcion: "Una acústica equilibrada y versátil, ideal para principiantes y músicos intermedios."
    },
    "Gear4Music 3/4": {
        stock: 1,
        estado: ["Nueva", "Usada", "Reacondicionada"][Math.floor(Math.random()*3)],
        material: "Tapa de tilo, mástil de arce",
        descripcion: "Perfecta para manos pequeñas o jóvenes guitarristas que buscan comodidad y buen sonido."
    },
    "Alhambra 4F Flamenco": {
        stock: 1,
        estado: ["Nueva", "Usada", "Reacondicionada"][Math.floor(Math.random()*3)],
        material: "Tapa de abeto alemán, ciprés español",
        descripcion: "Sonido flamenco brillante y potente, con gran proyección y comodidad."
    },
    "Córdoba GK Studio": {
        stock: 1,
        estado: ["Nueva", "Usada", "Reacondicionada"][Math.floor(Math.random()*3)],
        material: "Tapa de abeto macizo, aros y fondo de ciprés",
        descripcion: "Una guitarra moderna con alma flamenca, ligera y muy cómoda para tocar."
    },
    "Sin marca para zurdos": {
        stock: 1,
        estado: ["Nueva", "Usada", "Reacondicionada"][Math.floor(Math.random()*3)],
        material: "Tilo laminado con mástil de arce",
        descripcion: "Una opción económica y funcional para guitarristas zurdos que empiezan."
    },
    "Guitartil Rociera": {
        stock: 7,
        estado: "Nueva",
        material: "Abeto macizo y ciprés seleccionado",
        descripcion: "Guitarra de nuestra marca Guitartil: sonido brillante, construcción artesanal y acabado premium."
    },
    "Guitartil Garbanzera": {
        stock: 5,
        estado: "Nueva",
        material: "Cedro macizo y palosanto",
        descripcion: "Modelo exclusivo Guitartil: cálida, potente y diseñada para destacar en cualquier escenario."
    },
    "Guitartil Trebujenera": {
        stock: 11,
        estado: "Nueva",
        material: "Abeto europeo y nogal",
        descripcion: "Guitarra Guitartil con tono equilibrado y gran sustain. Ideal para estudio y directo."
    },
    "Guitartil Junior": {
        stock: 16,
        estado: "Nueva",
        material: "Tilo ligero y mástil reforzado",
        descripcion: "Modelo Guitartil para jóvenes guitarristas: cómoda, ligera y con un sonido sorprendente."
    }
};

                const stocksGuardados = localStorage.getItem("stocks");

            if (stocksGuardados) {

                  const stocks = JSON.parse(stocksGuardados);

                 Object.keys(stocks).forEach(nombre => {

                       if (infoGuitarras[nombre]) {
                       infoGuitarras[nombre].stock = stocks[nombre];
                       }

                      });
                }


    // =========================
    // ===== OVERLAY ===========
    // =========================
    const overlay = document.getElementById("overlay-guitarra");
    const cerrarOverlay = document.querySelector(".cerrar-overlay");

    const overlayImg = document.getElementById("overlay-img");
    const overlayNombre = document.getElementById("overlay-nombre");
    const overlayPrecio = document.getElementById("overlay-precio");
    const overlayEstado = document.getElementById("overlay-estado");
    const overlayMaterial = document.getElementById("overlay-material");
    const overlayDescripcion = document.getElementById("overlay-descripcion");

    let carrito = {};
    const carritoGuardado = localStorage.getItem("carrito");

        if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
        }

    document.querySelectorAll(".guitarra-card").forEach(card => {

        card.addEventListener("click", () => {

            const nombre = card.querySelector("h3").textContent;
            const precio = card.querySelector("p").textContent;

            const info = infoGuitarras[nombre];

            overlayNombre.textContent = nombre;
            overlayPrecio.textContent = info
                ? `${precio} | Stock: ${info.stock}`
                : precio;

            overlayEstado.textContent = info?.estado || "";
            overlayMaterial.textContent = info?.material || "";
            overlayDescripcion.textContent = info?.descripcion || "";
            overlayImg.src = card.querySelector("img").src;

            overlay.classList.add("active");
        });
    });

    if (cerrarOverlay) {
        cerrarOverlay.addEventListener("click", () => {
            overlay.classList.remove("active");
        });
    }


    // =========================
    // ===== CARRITO + ANIMACIÓN
    // =========================
    const carritoCount = document.getElementById("carrito-count");
    const carritoBadge = document.getElementById("carrito-badge");

    const btnCarrito = document.querySelector(".btn-carrito");

        let totalCarrito = Object.values(carrito).reduce((a, b) => a + b, 0);

    if (btnCarrito) {

        btnCarrito.addEventListener("click", () => {

            const nombre = overlayNombre.textContent;
            const info = infoGuitarras[nombre];

            if (!info) return;

            if (!carrito[nombre]) carrito[nombre] = 0;

            if (!info.stock || info.stock <= 0) {
                alert("No hay más de este modelo disponible");
                return;
            }

            info.stock--;
            const precio = document.querySelector(".overlay-precio").textContent.split("|")[0];
            overlayPrecio.textContent = `${precio} | Stock: ${info.stock}`;

            carrito[nombre]++;
            totalCarrito++;

            carritoCount.textContent = totalCarrito;
            guardarStocks();
            actualizarCarritoUI();

            // ANIMACIÓN
            const img = overlayImg;
            const clone = img.cloneNode(true);
            const rect = img.getBoundingClientRect();
            const carritoRect = carritoBadge.getBoundingClientRect();

            clone.classList.add("flying");
            clone.style.left = rect.left + "px";
            clone.style.top = rect.top + "px";

            document.body.appendChild(clone);

            setTimeout(() => {
                clone.style.left = carritoRect.left + "px";
                clone.style.top = carritoRect.top + "px";
                clone.style.opacity = "0";
            }, 10);

            setTimeout(() => clone.remove(), 600);

            btnCarrito.textContent = "✔ Añadido";
            btnCarrito.classList.add("btn-check");

            setTimeout(() => {
                btnCarrito.textContent = "Añadir al carrito";
                btnCarrito.classList.remove("btn-check");
            }, 800);

            guardarStocks();
            actualizarCarritoUI();
        });
    }


    // =========================
    // ===== CARRITO REAL ======
    // =========================
    const existeCarrito = document.getElementById("carrito-badge");

    if (existeCarrito) {

        const carritoPanel = document.getElementById("carrito-panel");
        const carritoLista = document.getElementById("carrito-lista");
        const carritoBadgeBtn = document.getElementById("carrito-badge");
        const carritoTotal = document.getElementById("carrito-total");
        const btnFinalizar = document.getElementById("btn-finalizar");
        let totalInicial = 0;

            Object.values(carrito).forEach(cantidad => {
             totalInicial += cantidad;
                });

        carritoCount.textContent = totalInicial;
                function guardarStocks() {
                  const stocks = {};
                     Object.keys(infoGuitarras).forEach(nombre => {
                     stocks[nombre] = infoGuitarras[nombre].stock;
                 });
                  localStorage.setItem("stocks", JSON.stringify(stocks));
                    }       



        function actualizarCarritoUI() {
            localStorage.setItem("carrito", JSON.stringify(carrito));
            carritoLista.innerHTML = "";

            const nombres = Object.keys(carrito);

            if (nombres.length === 0) {
                carritoLista.innerHTML = `<p style="text-align:center; opacity:0.7;">El carrito está vacío</p>`;
                carritoTotal.classList.add("oculto");
                btnFinalizar.classList.add("oculto");
                return;
            }

            carritoTotal.classList.remove("oculto");

            let total = 0;

            nombres.forEach(nombre => {
                const cantidad = carrito[nombre];
                const stock = infoGuitarras[nombre]?.stock ?? 0;

                const card = [...document.querySelectorAll(".guitarra-card")]
                    .find(c => c.querySelector("h3").textContent === nombre);

                const precioTexto = card.querySelector("p").textContent.replace("€", "");
                const precio = parseFloat(precioTexto);

                total += precio * cantidad;

                const item = document.createElement("div");
                item.classList.add("carrito-item");

                item.innerHTML = `
                    <span>${nombre} (${cantidad})</span>
                    <div class="carrito-btns">
                        <button class="menos">-</button>
                        <button class="mas">+</button>
                    </div>
                `;


                item.querySelector(".mas").addEventListener("click", () => {
                         if (stock <= 0) {
                       alert("No queda más stock");
                           return;
                             }
                      carrito[nombre]++;
                     infoGuitarras[nombre].stock--;
                      totalCarrito++;
                         carritoCount.textContent = totalCarrito;
                         guardarStocks();
                         actualizarCarritoUI();
                        });


                item.querySelector(".menos").addEventListener("click", () => {
                     carrito[nombre]--;
                          infoGuitarras[nombre].stock++;
                      totalCarrito--;

                      if (totalCarrito < 0) {
                         totalCarrito = 0;
                      }
                      if (carrito[nombre] <= 0) {
                        delete carrito[nombre];
                     }
                     carritoCount.textContent = totalCarrito;
                     guardarStocks();
                 actualizarCarritoUI();
                    });

                carritoLista.appendChild(item);
            });

            carritoTotal.textContent = `Total: ${total}€`;
            btnFinalizar.classList.remove("oculto");
        }

        carritoBadgeBtn.addEventListener("click", () => {
            carritoPanel.classList.toggle("oculto");
        });
        guardarStocks();
        actualizarCarritoUI();

        btnFinalizar.addEventListener("click", () => {
         localStorage.removeItem("carrito");
          window.location.href = "gracias.html";
          
        });
        // =========================
// ===== AUDIO GUITARRAS ====
// =========================

// Guardamos qué audio toca ahora cada guitarra
// =========================
// ===== AUDIO GUITARRAS ====
// =========================

// Guardamos qué audio toca ahora cada guitarra
let audioEstado = {}; // { "Yamaha acústica": 1, ... }

const btnEscuchar = document.querySelector(".btn-escuchar");

if (btnEscuchar) {
    btnEscuchar.addEventListener("click", () => {

        const nombre = overlayNombre.textContent;

        // Si no existe estado, empezamos por audio 1
        if (!audioEstado[nombre]) audioEstado[nombre] = 1;

        const num = audioEstado[nombre]; // 1 o 2

        // Seleccionamos el audio según toque
        const archivo = num === 1 
            ? `audio/sonidonormal${overlayNombre.textContent.length % 9 + 1}.mp3`
            : `audio/redoble${overlayNombre.textContent.length % 9 + 1}.mp3`;

        // Si ya había un audio sonando, lo paramos
        if (window.audioActual) {
            window.audioActual.pause();
            window.audioActual.currentTime = 0;
        }

        // Creamos el nuevo audio
        const audio = new Audio(archivo);
        window.audioActual = audio;
        audio.play();

        // Alternamos para la próxima vez
        audioEstado[nombre] = num === 1 ? 2 : 1;
    });
    }
    }
 // =========================
// ===== FORMULARIO VENDER =
// =========================
const paso1 = document.getElementById("paso1");
const paso2 = document.getElementById("paso2");
const paso3 = document.getElementById("paso3");

const btnSiguiente = document.getElementById("btn-siguiente");
const btnEnviar = document.getElementById("btn-enviar");
const inputPrecio = document.getElementById("precio");

// FILTRO PRECIO
if (inputPrecio) {
    inputPrecio.addEventListener("input", () => {
        inputPrecio.value = inputPrecio.value.replace(/\D/g, "");
        if (inputPrecio.value.length > 5) {
            inputPrecio.value = inputPrecio.value.slice(0, 5);
        }
    });
}

if (paso1 && paso2 && paso3 && btnSiguiente && btnEnviar) {

    // ----- PASO 1 → PASO 2 -----
    btnSiguiente.addEventListener("click", () => {
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefono = document.getElementById("telefono").value.trim();

        if (!nombre || !email || !telefono) {
            alert("Por favor, rellena todos los campos obligatorios de tus datos.");
            return;
        }

        paso1.classList.add("oculto");
        paso2.classList.remove("oculto");
    });

    // ----- PASO 2 → PASO 3 (MENSAJE FINAL BONITO) -----
    btnEnviar.addEventListener("click", () => {
        const imagen = document.getElementById("imagen");
        const marca = document.getElementById("marca").value.trim();
        const antiguedad = document.getElementById("antiguedad").value.trim();
        const estado = document.getElementById("estado").value.trim();
        const precio = document.getElementById("precio").value.trim();

        if (!imagen.files.length || !marca || !antiguedad || !estado || !precio) {
            alert("Por favor, rellena todos los campos obligatorios de la guitarra.");
            return;
        }

        // Ocultar paso 2
        paso2.classList.add("oculto");

        // Subir arriba
        window.scrollTo({ top: 0, behavior: "instant" });

        // Bloquear scroll
        document.body.style.overflow = "hidden";

        // Mostrar paso 3 con animación
        paso3.classList.remove("oculto");

        requestAnimationFrame(() => {
            paso3.classList.add("active");
        });
    });
}

        // =========================
    // ===== ORDENAR GUITARRAS =
    // =========================
    const selectOrdenar = document.querySelector(".ordenar select");
    const gridGuitarras = document.querySelector(".grid-guitarras");

    if (selectOrdenar && gridGuitarras) {
        const cartasOriginales = [...gridGuitarras.querySelectorAll(".guitarra-card")];

        selectOrdenar.addEventListener("change", () => {
            let cartas = [...cartasOriginales];

            const opcion = selectOrdenar.value;

            if (opcion.includes("Precio (menor a mayor)")) {
                cartas.sort((a, b) => {
                    const pa = parseFloat(a.querySelector("p").textContent.replace("€", ""));
                    const pb = parseFloat(b.querySelector("p").textContent.replace("€", ""));
                    return pa - pb;
                });
            } else if (opcion.includes("Precio (mayor a menor)")) {
                cartas.sort((a, b) => {
                    const pa = parseFloat(a.querySelector("p").textContent.replace("€", ""));
                    const pb = parseFloat(b.querySelector("p").textContent.replace("€", ""));
                    return pb - pa;
                });
            } else if (opcion.includes("Nombre")) {
                cartas.sort((a, b) => {
                    const na = a.querySelector("h3").textContent.toLowerCase();
                    const nb = b.querySelector("h3").textContent.toLowerCase();
                    return na.localeCompare(nb);
                });
            } else if (opcion.includes("Favoritos")) {
                cartas.sort((a, b) => {
                    const fa = a.querySelector(".favorito")?.classList.contains("activo") ? 1 : 0;
                    const fb = b.querySelector(".favorito")?.classList.contains("activo") ? 1 : 0;
                    return fb - fa; // favoritos primero
                });
            }

            // Vaciar y volver a meter en el nuevo orden
            gridGuitarras.innerHTML = "";
            cartas.forEach(c => gridGuitarras.appendChild(c));
        });
    }
        // =========================
// ===== REDES SOCIALES ====
// =========================
const ig = document.querySelector(".instagram");
const tw = document.querySelector(".twitter");

if (ig) ig.addEventListener("click", () => {
    window.open("https://www.instagram.com", "_blank");
});

if (tw) tw.addEventListener("click", () => {
    window.open("https://www.twitter.com", "_blank");
});


// =========================
// ===== TRANSICIÓN ÉPICA ===
// =========================

const overlayTransicion = document.getElementById("transition-overlay");

const botonesTransicion = document.querySelectorAll(
    'a[href="comprar.html"], a[href="vender.html"]'
);

const sonidoComprar = new Audio("audio/comprar.mp3");
const sonidoVender = new Audio("audio/vender.mp3");

botonesTransicion.forEach(boton => {

    boton.addEventListener("click", (e) => {
        e.preventDefault();

        const destino = boton.getAttribute("href");

        // 🎬 animación INMEDIATA
        overlayTransicion.classList.add("active");

        // 🔊 audio con 1 segundo de retraso
        setTimeout(() => {
            const audio = destino === "comprar.html" ? sonidoComprar : sonidoVender;
            audio.currentTime = 0;
            audio.play();
        }, 400);

        // 🚀 cambio de página
        setTimeout(() => {
            window.location.href = destino;
        }, 2500);
    });

});
// =========================
// ===== POPUP COOKIES =====
// =========================

const popupCookies = document.getElementById("cookies-popup");
const btnCookies = document.getElementById("aceptar-cookies");

if (popupCookies && btnCookies) {

    const cookiesAceptadas = localStorage.getItem("cookiesAceptadas");

    if (cookiesAceptadas === "true") {
        popupCookies.classList.add("oculto");
    }
    btnCookies.addEventListener("click", () => {
        localStorage.setItem("cookiesAceptadas", "true");
        popupCookies.style.display = "none";
    });
}
});
