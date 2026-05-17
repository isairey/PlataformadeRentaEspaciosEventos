<div align="center">

<img width="220" src="https://cdn-icons-png.flaticon.com/512/3652/3652191.png" />

# 🎉 Event Properties Rental System

### Plataforma web de gestión y renta de espacios para eventos 🚀

<p align="center">
  <b>Event Properties Rental System</b> es una plataforma desarrollada para administrar propiedades y espacios destinados a eventos mediante un sistema moderno, dinámico y centralizado.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/EventRental-WebPlatform-8E24AA?style=for-the-badge">
  <img src="https://img.shields.io/badge/PropertyManagement-System-5E35B1?style=for-the-badge">
  <img src="https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/OpenSource-Academic-success?style=for-the-badge">
</p>

<p align="center">
  <a href="#-acerca-del-proyecto">Acerca</a> •
  <a href="#-módulos-del-sistema">Módulos</a> •
  <a href="#-características">Características</a> •
  <a href="#-tecnologías-utilizadas">Tecnologías</a> •
  <a href="#-vista-previa">Vista previa</a>
</p>

</div>

---

# 🌌 Acerca del proyecto

**Event Properties Rental System** es un sistema web orientado a la administración y renta de propiedades para eventos, permitiendo gestionar clientes, reservas y espacios mediante una plataforma moderna y eficiente.

El sistema fue diseñado para:

- 🎉 Gestionar eventos
- 🏢 Administrar propiedades
- 👥 Gestionar usuarios
- 📅 Controlar reservaciones
- 🔍 Buscar espacios disponibles
- 📊 Supervisar operaciones
- 🔐 Administrar accesos
- 🌐 Automatizar el proceso de renta

---

# ✨ Características

## 🏢 Gestión de propiedades

- 🏠 Registro de espacios
- 📍 Gestión de ubicaciones
- 🖼️ Carga de imágenes
- 💰 Administración de precios
- 📋 Información detallada

---

## 👥 Gestión de usuarios

- 👤 Registro de clientes
- 🔐 Inicio de sesión
- 📄 Gestión de perfiles
- ⚡ Administración centralizada
- 📊 Control de accesos

---

## 📅 Sistema de reservaciones

- 📆 Reservación de eventos
- 🏢 Gestión de disponibilidad
- ⚡ Confirmaciones dinámicas
- 📋 Historial de reservas
- 🔔 Control de eventos

---

## 📊 Panel administrativo

- 📈 Dashboard administrativo
- 👥 Gestión de usuarios
- 🏢 Administración de propiedades
- 📅 Supervisión de reservaciones
- 🔐 Gestión de permisos

---

# 👨‍💼 Módulos del sistema

## 🏢 Property Owner Module

Este módulo es utilizado por administradores o propietarios de espacios para eventos.

### Funcionalidades:

- ➕ Registro de propiedades
- 🏢 Publicación de espacios
- 🖼️ Subida de imágenes
- 📍 Gestión de ubicaciones
- 💰 Configuración de precios
- 📋 Administración de propiedades

---

## 🛠️ Admin Module

Este módulo funciona como administrador principal del sistema.

### Funcionalidades:

- 👥 Gestión de usuarios
- 🔐 Activar y desactivar cuentas
- 🏢 Supervisar propiedades
- 📊 Control administrativo
- ⚡ Moderación del sistema

---

## 👤 Customer Module

Este módulo es utilizado por usuarios que desean reservar espacios para eventos.

### Funcionalidades:

- 🔍 Buscar propiedades
- 📋 Consultar detalles
- 📅 Ver disponibilidad
- 📞 Contactar administradores
- 🎉 Reservar espacios

---

# 🛠️ Tecnologías utilizadas

## 🎨 Frontend

<p>
  <img src="https://skillicons.dev/icons?i=html,css,bootstrap,js" />
</p>

- HTML5
- CSS3
- Bootstrap
- JavaScript

---

## ⚙️ Backend

<p>
  <img src="https://skillicons.dev/icons?i=php,nodejs" />
</p>

- PHP / Node.js
- CRUD System
- Gestión de sesiones
- Arquitectura web

---

## 🗄️ Base de datos

<p>
  <img src="https://skillicons.dev/icons?i=mysql" />
</p>

- MySQL
- Relaciones SQL
- Persistencia de datos
- Gestión de reservaciones

---

## 🧰 Herramientas

<p>
  <img src="https://skillicons.dev/icons?i=git,github,vscode" />
</p>

- Git
- GitHub
- Visual Studio Code
- XAMPP / WAMP

---

# 📂 Estructura del proyecto

```bash
PlataformadeRentaEspaciosEventos/
│
├── admin/                    # Panel administrativo
├── owner/                    # Módulo propietario
├── customer/                 # Módulo cliente
├── assets/                   # Recursos frontend
├── database/                 # Scripts SQL
├── uploads/                  # Imágenes de propiedades
├── includes/                 # Configuración del sistema
├── reservations/             # Gestión de reservaciones
├── index.php                 # Página principal
├── README.md
└── LICENSE
```

---

# ⚡ Instalación

## 📋 Requisitos

- PHP 7+
- MySQL
- Apache
- XAMPP / WAMP
- Navegador moderno

---

# 🚀 Configuración del proyecto

## 1️⃣ Clonar repositorio

```bash
git clone https://github.com/isairey/PlataformadeRentaEspaciosEventos.git
```

---

## 2️⃣ Mover archivos

Copiar proyecto hacia:

```bash
xampp/htdocs/PlataformadeRentaEspaciosEventos/
```

---

## 3️⃣ Crear base de datos

Crear base:

```bash
event_properties_rental
```

---

## 4️⃣ Importar SQL

Importar:

```bash
database/event_properties_rental.sql
```

---

## 5️⃣ Configurar conexión

Editar:

```bash
includes/config.php
```

Agregar:

```php
define('DB_HOST','localhost');
define('DB_USER','root');
define('DB_PASS','');
define('DB_NAME','event_properties_rental');
```

---

## 6️⃣ Ejecutar proyecto

Abrir:

```bash
http://localhost/PlataformadeRentaEspaciosEventos/
```

---

# 📊 Funcionalidades principales

## 🏢 Gestión de propiedades

- Publicación de espacios
- Administración de propiedades
- Gestión de imágenes
- Control de disponibilidad

---

## 👥 Administración de usuarios

- Registro y autenticación
- Activación de cuentas
- Gestión de perfiles
- Roles administrativos

---

## 📅 Gestión de reservaciones

- Reservación de eventos
- Calendario de disponibilidad
- Confirmaciones automáticas
- Historial de reservas

---

# 📸 Vista previa

## 🖥️ Interfaces del sistema

<div align="center">

### 🎉 Página principal
![Home](https://dummyimage.com/1200x600/4a148c/ffffff&text=Event+Rental+Home)

### 🔐 Inicio de sesión
![Login](https://dummyimage.com/1200x600/6a1b9a/ffffff&text=Login+System)

### 🏢 Listado de propiedades
![Properties](https://dummyimage.com/1200x600/7b1fa2/ffffff&text=Event+Properties)

### 📅 Gestión de reservaciones
![Reservations](https://dummyimage.com/1200x600/8e24aa/ffffff&text=Reservations+Management)

### 👥 Panel administrativo
![Admin](https://dummyimage.com/1200x600/4a148c/ffffff&text=Admin+Dashboard)

### 📊 Dashboard del sistema
![Dashboard](https://dummyimage.com/1200x600/6a1b9a/ffffff&text=System+Dashboard)

</div>

---

# 🧠 Objetivos del proyecto

## 🎯 Aprendizaje y administración

- Desarrollo web full stack
- Gestión de propiedades
- Bases de datos relacionales
- CRUD administrativos
- Sistemas de autenticación
- Arquitectura web
- Automatización de reservaciones

---

# 🚧 Roadmap

## 🔮 Próximas mejoras

- 📱 Aplicación móvil
- ☁️ Infraestructura cloud
- 💳 Pagos electrónicos
- 📊 Dashboard avanzado
- 🤖 Recomendaciones inteligentes
- 🌐 API REST moderna
- 🔔 Notificaciones en tiempo real

---

# 🤝 Contribuciones

Las contribuciones son bienvenidas ❤️

## Cómo contribuir

1. Fork del proyecto

```bash
git checkout -b feature/nueva-funcionalidad
```

2. Commit

```bash
git commit -m "✨ Nueva funcionalidad"
```

3. Push

```bash
git push origin feature/nueva-funcionalidad
```

4. Pull Request 🚀

---

# 👨‍💻 Desarrollador

<div align="center">

## Isai Reyes — Full Stack Developer

Desarrollador apasionado por plataformas de reservaciones, sistemas administrativos y arquitectura web moderna 🚀

</div>

---

# 🌟 Apoya el proyecto

⭐ Dale una estrella  
🍴 Haz fork  
📢 Comparte el proyecto

---

# 📜 Licencia

Proyecto open source orientado al aprendizaje y administración de sistemas de reservaciones y renta de propiedades.

---

<div align="center">

### 🎉 Event Properties Rental System — administración inteligente de espacios y eventos 🚀

</div>
