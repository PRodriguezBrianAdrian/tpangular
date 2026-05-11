import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Producto {
  nombre: string;
  descripcion: string;
  img: string;
  precio: number;
}

@Component({
  selector: 'app-punto2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './punto2.html',
  styleUrl: './punto2.css'
})
export class Punto2Component {

  // Fuente de datos en el controlador
  productos: Producto[] = [
    { nombre: 'Notebook Asus 13L', descripcion: 'Disco 40GB, pantalla 15 pulgadas, ideal para estudio.', img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=250&fit=crop', precio: 450 },
    { nombre: 'Monitor LG 24"', descripcion: 'Full HD, 75Hz, panel IPS, excelente para trabajo.', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=250&fit=crop', precio: 220 },
    { nombre: 'Teclado Mecánico', descripcion: 'Switch blue, retroiluminado RGB, ideal para gaming.', img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=250&fit=crop', precio: 95 },
    { nombre: 'Mouse Logitech G502', descripcion: 'Gaming, 16000 DPI, pesos ajustables, 11 botones.', img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=250&fit=crop', precio: 75 },
    { nombre: 'Auriculares Sony', descripcion: 'Inalámbricos, noise cancelling, 30hs de batería.', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=250&fit=crop', precio: 180 },
    { nombre: 'Webcam HD 1080p', descripcion: 'Full HD, micrófono integrado, ideal para videollamadas.', img: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=250&fit=crop', precio: 60 },
  ];

  // Carrito: solo un producto por tipo
  carrito: Producto[] = [];

  // Agrega producto al carrito (solo si no está ya)
  agregarAlCarrito(producto: Producto): void {
    const yaEsta = this.carrito.find(p => p.nombre === producto.nombre);
    if (!yaEsta) {
      this.carrito.push(producto);
    }
  }

  // Verifica si un producto ya está en el carrito
  estaEnCarrito(producto: Producto): boolean {
    return !!this.carrito.find(p => p.nombre === producto.nombre);
  }

  // Elimina un producto del carrito
  eliminarDelCarrito(producto: Producto): void {
    this.carrito = this.carrito.filter(p => p.nombre !== producto.nombre);
  }

  // Calcula el total del carrito
  get total(): number {
    return this.carrito.reduce((acc, p) => acc + p.precio, 0);
  }
}