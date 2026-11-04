# 🎓 Altoque – Mercado de Recursos Universitarios

[![React](https://img.shields.io/badge/React-19.2.8-blue.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.19-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-7.18.4-CA4245.svg?logo=react-router)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Plataforma web colaborativa para la compra, venta e intercambio de materiales, herramientas y libros académicos entre estudiantes universitarios.**

---

## 📌 Problemática y Objetivo

### Problemática
En cada ciclo universitario, los estudiantes se ven en la necesidad de adquirir materiales de alto costo —como calculadoras científicas, batas de laboratorio, libros de texto especializados, estetoscopios e instrumental técnico— que en muchas ocasiones solo se utilizan durante unos meses. Posteriormente, estos recursos quedan en desuso, mientras que los alumnos que recién ingresan o llevan los cursos enfrentan dificultades económicas para adquirirlos nuevos en el mercado comercial tradicional.

### Objetivo
**Altoque** nace para conectar a la comunidad estudiantil dentro del campus, ofreciendo un entorno digital seguro, accesible y confiable donde comprar, vender o intercambiar recursos académicos *"al toque"*. Se fomenta la economía circular, el ahorro estudiantil y el apoyo mutuo interuniversitario.

---

## 🚀 Tecnologías Utilizadas

El proyecto está desarrollado con las tecnologías más modernas del ecosistema frontend:

- **Librería Principal:** [React 19](https://react.dev/) (v19.2.8) - Componentes funcionales y Hooks reactivos.
- **Entorno de Construcción:** [Vite 8](https://vitejs.dev/) (v8.3.0) - Empaquetador ultrarrápido con Hot Module Replacement (HMR).
- **Enrutamiento SPA:** [React Router DOM](https://reactrouter.com/) (v7.18.4) - Navegación fluida sin recargas de página.
- **Diseño y Estilos:** 
  - [Tailwind CSS v3](https://tailwindcss.com/) (v3.4.19) - Utility-first styling con paleta personalizada.
  - **CSS Tradicional Modular:** Hojas de estilo dedicadas por página y componente (`.jsx` + `.css`) para máxima legibilidad y mantenimiento.
  - [PostCSS](https://postcss.org/) & [Autoprefixer](https://github.com/postcss/autoprefixer).
- **Tipografía e Iconografía:**
  - Google Fonts: **Inter** y **Quicksand**.
  - Google **Material Symbols Outlined** para iconografía moderna.
- **Herramientas de Calidad de Código:** [Oxlint](https://oxc.rs/) para análisis estático ultrarrápido.
- **Persistencia Frontend:** Servicio reactivo sobre `localStorage` con inicialización de catálogo semilla, gestión de favoritos, publicaciones, compras y mensajería.

---

## ✨ Funcionalidades Implementadas

La aplicación cuenta con una suite completa de pantallas interactivas y flujos de usuario reales dentro del frontend:

### 🏠 1. Exploración y Catálogo (`/`)
- Hero Banner dinámico con llamados a la acción ("Empezar a Explorar" y "Publicar artículo").
- Filtros interactivos por tendencias universitarias (`Todos`, `Electrónica`, `Libros`, `Laboratorio`, `Papelería`).
- Tarjetas de producto (`ProductCard`) con precios formateados en moneda peruana (`S/`), calificación por estrellas, condición del artículo y botón de favoritos.

### 🔍 2. Exploración por Categorías (`/categoria/:slug`)
- Navegación dedicada para categorías específicas: **Electrónica**, **Libros**, **Laboratorio** y **Papelería**.
- Filtro interactivo por condición del producto (`Todos`, `Nuevo`, `Como nuevo`, `Buen estado`, `Aceptable`).
- Ordenamiento dinámico de productos por precio (menor a mayor / mayor a menor) y por calificación de vendedores.
- Contador de productos disponibles en tiempo real.

### 📦 3. Detalle de Producto (`/producto/:id`)
- Vista ampliada de producto con badges de condición y categoría.
- Calificación y tarjeta de perfil del vendedor enlazada.
- Acciones directas:
  - **Contactar al vendedor:** Abre directamente un canal de chat con el vendedor y el producto referenciado.
  - **Agregar a favoritos:** Almacena el producto en la lista personal.
  - **Añadir al carrito:** Actualiza el contador del carrito de compras.

### 👤 4. Perfil del Vendedor y Reseñas (`/vendedor/:id`)
- Información del estudiante vendedor: universidad, carrera, ventas concretadas y calificación promedio.
- Catálogo de productos activos del vendedor.
- Muro de reseñas con comentarios de otros estudiantes.
- Formulario interactivo para registrar una nueva reseña y calificación.

### ➕ 5. Publicar / Vender un Producto (`/vender`)
- Formulario completo con validación de campos obligatorios.
- Carga y previsualización en tiempo real de fotografías mediante `FileReader`.
- Asignación de título, categoría académica, condición, precio en Soles (`S/`) y descripción detallada.
- Guardado instantáneo en el catálogo (`localStorage`) para que el producto sea visible inmediatamente en la tienda.

### 💬 6. Mensajería y Conversaciones (`/mensajes`)
- Bandeja de entrada organizada por pestañas: **Compras** y **Ventas**.
- Conversaciones interactivas con historial de mensajes.
- Envío instantáneo de nuevos mensajes con registro de hora y actualización del último mensaje.

### 📋 7. Panel de Compras y Publicaciones (`/mis-compras`)
- Panel unificado (`Dashboard`) para consultar:
  - Historial de compras registradas con estado de entrega y fecha.
  - Gestión de publicaciones activas creadas por el usuario.

### 🔐 8. Autenticación y Registro (`/login` y `/registro`)
- **Iniciar Sesión:** Validación de correo institucional/ID y contraseña con persistencia de usuario activo.
- **Registro de Usuario:** Formulario con nombre completo, correo institucional, selección de universidad y confirmación de credenciales.
- Toggle para mostrar/ocultar contraseña.

### 📱 9. Navegación Multi-Dispositivo
- **Barra de Navegación Superior (`TopNavBar`):** Buscador reactivo, accesos a notificaciones, carrito, mensajes y perfil.
- **Barra Lateral (`SideNavBar`):** Acceso rápido a las categorías universitarias en pantallas de escritorio.
- **Barra Inferior (`BottomNavBar`):** Menú de navegación táctil optimizado para dispositivos móviles y tablets.
- **Página 404 (`NotFound`):** Manejo amigable de rutas no existentes con botón de retorno al inicio.

---

## 📁 Estructura del Proyecto

```text
altoque/
├── docs/
│   └── screenshots/              # Capturas de pantalla para documentación
│       ├── home-preview.jpg
│       └── login-preview.jpg
├── public/                       # Recursos estáticos (favicon, etc.)
├── src/
│   ├── assets/                   # Imágenes locales e ilustraciones
│   │   ├── hero.png
│   │   └── login-illustration.png
│   ├── components/               # Componentes reutilizables
│   │   ├── layout/
│   │   │   ├── BottomNavBar/     # Barra de navegación móvil
│   │   │   ├── MainLayout/       # Layout contenedor (TopNav + SideNav)
│   │   │   ├── SideNavBar/       # Menú lateral de categorías
│   │   │   └── TopNavBar/        # Barra superior con buscador y perfil
│   │   └── shared/
│   │       └── ProductCard/      # Tarjeta interactiva de producto
│   ├── pages/                    # Pantallas de la aplicación
│   │   ├── CategoryView/         # Vista por categoría y filtros
│   │   ├── Dashboard/            # Mis compras y publicaciones
│   │   ├── Home/                 # Página principal / Marketplace
│   │   ├── Login/                # Inicio de sesión
│   │   ├── Messages/             # Mensajería y chats
│   │   ├── NotFound/             # Página 404
│   │   ├── ProductDetail/        # Detalle del producto
│   │   ├── Register/             # Registro de estudiantes
│   │   ├── SellerProfile/        # Perfil y reseñas del vendedor
│   │   └── SellProduct/          # Formulario para publicar producto
│   ├── services/                 # Capa de datos y persistencia
│   │   ├── mockData.js           # Datos iniciales (productos, usuarios, chats)
│   │   └── storage.js            # Servicio de persistencia en localStorage
│   ├── App.jsx                   # Enrutador principal (React Router DOM)
│   ├── index.css                 # Estilos globales y utilidades Tailwind
│   └── main.jsx                  # Punto de entrada de React
├── .gitignore                    # Archivos y carpetas excluidos de Git
├── index.html                    # Plantilla base HTML de Vite
├── package.json                  # Dependencias y scripts de npm
├── postcss.config.js             # Configuración de PostCSS
├── tailwind.config.js            # Paleta de colores, fuentes y configuración Tailwind
└── vite.config.js                # Configuración de Vite
```

---

## 📋 Requisitos Previos

Asegúrate de tener instalados los siguientes componentes en tu sistema:

- **[Node.js](https://nodejs.org/)**: Versión 18.0.0 o superior (recomendado v20 LTS).
- **[npm](https://www.npmjs.com/)**: Versión 9.0.0 o superior (incluido con Node.js).
- **Navegador web moderno**: Google Chrome, Mozilla Firefox, Microsoft Edge, Safari o Brave.

---

## 🛠️ Instalación y Ejecución

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

### 1. Clonar el repositorio
```bash
git clone https://github.com/Casey1304/Altoque.git
cd Altoque
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```

El servidor Vite se iniciará automáticamente. Abre tu navegador e ingresa a:
```text
http://localhost:5173
```

### 4. Compilar para producción
Para generar los archivos optimizados listos para desplegar:
```bash
npm run build
```
Los archivos de distribución se generarán en la carpeta `dist/`.

### 5. Previsualizar la compilación de producción
```bash
npm run preview
```

---

## 🔄 Estado Actual del Desarrollo

| Módulo / Característica | Estado | Notas |
| :--- | :---: | :--- |
| **Arquitectura React + Vite** | ✅ Completo | Rápido, modular y listo para producción. |
| **Diseño y Maquetación Visual** | ✅ Completo | Fiel a los prototipos de Stitch, responsive en móvil y desktop. |
| **Enrutamiento (React Router v7)** | ✅ Completo | Rutas SPA conectadas sin recargas. |
| **Persistencia de Datos (Frontend)** | ✅ Completo | Implementado con `localStorage` (productos, favoritos, chats, compras). |
| **Moneda Nacional (Soles S/)** | ✅ Completo | Todos los precios adaptados a la moneda universitaria local. |
| **Backend / API REST** | ⏳ Pendiente | Listo para conectar con backend (Node.js/Express, Python/FastAPI, etc.). |
| **Base de Datos Remota** | ⏳ Pendiente | El servicio `storage.js` puede ser reemplazado fácilmente por llamadas `fetch`/`axios`. |
| **Pasarela de Pagos** | ⏳ Pendiente | Simulación visual; pendiente integración con servicios como Niubiz, Culqi o Stripe. |

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia **MIT**. Para más detalles, consulta el archivo `LICENSE`.
