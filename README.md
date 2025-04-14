# Proyecto Easy-Flight

## **🎯 Objetivo**

Crear una **plataforma web** innovadora con los siguientes objetivos principales:

-   **Búsqueda y Exploración**
    -   Permitir a usuarios buscar **ofertas de viajes**
    -   Incluir opciones de vuelos, hoteles y paquetes turísticos
-   **Reserva y Compra**
    -   Facilitar proceso de reserva y compra
    -   Implementar sistema de pagos seguros
-   **Comentarios y Reseñas**
    -   Visualizar detalles completos de cada oferta
    -   Sistema de comentarios y reseñas

## **🧱 Funcionalidades Principales**

-   **👀 Vista Principal (Home)**Lista de **ofertas de viajes** disponibles
-   Visualización de cada oferta con:
    -   Imagen
    -   Nombre
    -   Precio
    -   Empresa
    -   Tipo (vuelo, hotel o paquete)
-   Sistema de **filtros** para buscar por:
    -   Precio
    -   Empresa
    -   Destino
    -   Otros criterios

## **🔍 Vista Detalle de la Oferta**

-   Imagen destacada
-   Descripción detallada
-   Precio
-   Datos de la empresa
-   Comentarios de usuarios
-   Botón de reserva y pago

## **🔐 Login / Registro**

-   Sistema de usuarios con autenticación
-   Tres tipos de roles:
    -   Cliente
    -   Empresa
    -   Administrador
-   Funcionalidades por rol:
    -   Empresas: Publicación y gestión de ofertas
    -   Clientes: Comentarios y pagos

## **💳 Sistema de Pagos**

Vinculado a cada oferta

Registra monto, método de pago y estado (pendiente o confirmado)

## **Estructura de Datos Necesaria**

## **🧍 Usuarios (users)**

Clientes que buscan y compran ofertas

Empresas que publican ofertas

## **🏢 Empresas (companies)**

Publican y gestionan sus ofertas

## **📦 Ofertas (offers)**

Publicadas por empresas

Tipos: vuelos, hoteles o paquetes

Incluyen título, descripción, imagen, precio y tipo

## **💬 Comentarios (comments)**

Asociados a una oferta

Escritos por usuarios registrados

## **💸 Pagos (payments)**

Registran las compras de los usuarios

## **🧪 Filtros (opcional, filters)**

Permiten guardar preferencias y filtrar búsquedas

## **🔐 Roles (roles)**

Definen permisos: administrador, empresa, usuario

## **🔗 Relaciones Básicas**

Un **usuario** tiene **un rol**.

Un **usuario** puede crear múltiples **comentarios** y **pagos**.

Una **empresa** publica múltiples **ofertas**.

Una **oferta** puede tener múltiples **comentarios** y compras.

Cada **pago** está asociado a un usuario y una oferta.

---

# 📆 Plan de Trabajo - 21 días

Lo organizamos por **3 semanas (7 días cada una)** con tareas claves por semana:

## Semana 1: Planificación y Fundamentos (Días 1–7)

-   Plasmar la idea completa (lo que ya estamos haciendo)
-   Definir tecnologías (ej: Laravel + Vue, Node.js + React, etc.) en este caso usaremos react
-   Crear estructura del proyecto (repositorios, carpetas)
-   Crear y poblar base de datos y sus respectivas tablas
-   Empezar login / registro
-   Rutas básicas de API
-

## Semana 2: Desarrollo Principal (Días 8–14)

-   CRUD de empresas y ofertas
-   Empezar interfaz principal (vistas + filtros)
-   Vista detalle de oferta
-   Agregar comentarios
-   Pagos (simulados o reales según stack)
-   Integración básica de backend y frontend
-

## Semana 3: Pulido, Pruebas y Documentación (Días 15–21)

-   Ajustes finales a la base de datos y endpoints
-   Pruebas por usuario (cliente / empresa)
-   Preparar demo o presentación
-   mejorar diseño
