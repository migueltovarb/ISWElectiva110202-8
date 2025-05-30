# 🧾 Proyecto: Sistema de Pedidos para Restaurante

Este proyecto consiste en una aplicación web de gestión de pedidos para restaurantes, con un backend desarrollado en Django y un frontend moderno. Está desplegado en Azure utilizando servicios como Azure App Service y Azure Static Web Apps.

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes:

- **Python 3.x**
- **pip** (gestor de paquetes de Python)
- **PostgreSQL** (instalado y corriendo)
- **Node.js y npm** (para el frontend)

---

## ⚙️ Instalación del Backend (Django)

1. **Crear y activar un entorno virtual**

   - En **Linux/macOS**:
     ```bash
     python -m venv env
     source env/bin/activate
     ```

   - En **Windows**:
     ```bash
     python -m venv env
     env\Scripts\activate
     ```

2. **Instalar dependencias necesarias**

   ```bash
   pip install django
   pip install django-cors-headers
   pip install psycopg2-binary
## 🌐 Instalación del Frontend

1. Entra al directorio del frontend (por ejemplo):

   ```bash
   cd frontend
npm install
npm run dev
## 🚀 Enlace de Producción

El sistema está desplegado en la nube mediante **Azure**:

- 🔗 **Frontend (Azure Static Web App):**  
  [https://lively-grass-07977a903.6.azurestaticapps.net/](https://lively-grass-07977a903.6.azurestaticapps.net/)

- 🔗 **Backend (Azure App Service):**  
  [https://pedidosrestaurante-fzeadhb3eahxg2cb.northeurope-01.azurewebsites.net/](https://pedidosrestaurante-fzeadhb3eahxg2cb.northeurope-01.azurewebsites.net/)
