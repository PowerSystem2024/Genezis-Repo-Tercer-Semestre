# 💻 Mundo PC - Proyecto en JavaScript

Este es un proyecto realizado en **JavaScript** para simular un sistema de ventas de computadoras, utilizando **POO (Programación Orientada a Objetos)** y basado en un **diagrama UML**.

## 📌 Objetivo

Simular la creación de computadoras que están formadas por distintos componentes, y agruparlas en órdenes de compra.

## 🧩 Estructura de Clases

- `DispositivoEntrada` → Clase base para dispositivos como teclado y ratón.
- `Raton` y `Teclado` → Heredan de `DispositivoEntrada`.
- `Monitor` → Independiente, representa un monitor físico.
- `Computadora` → Compuesta por teclado, ratón y monitor.
- `Orden` → Agrupa varias computadoras para simular una orden de compra.

## 🖼️ Diagrama UML

![Diagrama UML](./Diagrama%20UML.png)


## 🛠️ Tecnologías

- Lenguaje: **JavaScript**
- Paradigma: **POO**
- Herramientas: cualquier editor de texto o navegador para ver resultados.

## ▶️ Ejecución

1. Copia el contenido de `sistemaVentas.js`.
2. Abre el archivo en tu navegador o en la consola de Node.js.
3. Observa cómo se crean los objetos y se imprimen las órdenes con sus computadoras.

## ✨ Ejemplo de salida

```bash
Orden [ID: 1] contiene:
Computadora [ID: 1, Nombre: Gamer Pro]
  Monitor [ID: 1] - Marca: LG, Tamaño: 27 pulgadas
  Teclado [ID: 1] - Tipo de Entrada: Bluetooth, Marca: Redragon
  Ratón [ID: 1] - Tipo de Entrada: USB, Marca: Logitech
Computadora [ID: 2, Nombre: Oficina]
  Monitor [ID: 2] - Marca: Samsung, Tamaño: 24 pulgadas
  Teclado [ID: 2] - Tipo de Entrada: USB, Marca: Genius
  Ratón [ID: 2] - Tipo de Entrada: Bluetooth, Marca: HP