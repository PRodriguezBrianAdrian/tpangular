import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

// Definimos la interfaz para tipado
interface Evento {
  nombre: string;
  descripcion: string;
  img: string;
}

@Component({
  selector: 'app-punto1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './punto1.html',
  styleUrls: ['./punto1.css']
})
export class Punto1Component {

  // Índice del evento actual
  indiceActual: number = 0;

  // Array de eventos (fuente de datos en el controlador)
  eventos: Evento[] = [
    {
      nombre: 'Taller de Yoga',
      descripcion: 'Sesión grupal de yoga para principiantes. Todos los niveles bienvenidos.',
      img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop'
    },
    {
      nombre: 'Maratón Ciudad',
      descripcion: 'Carrera urbana de 10km por el centro histórico. Inscripciones abiertas.',
      img: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=400&fit=crop'
    },
    {
      nombre: 'Feria de Arte',
      descripcion: 'Exposición de artistas locales con pinturas, esculturas y fotografía.',
      img: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&h=400&fit=crop'
    },
    {
      nombre: 'Taller de Cocina',
      descripcion: 'Aprende recetas regionales con chefs de la Quebrada de Humahuaca.',
      img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop'
    },
    {
      nombre: 'Concierto de Jazz',
      descripcion: 'Noche de jazz en vivo en el anfiteatro municipal. Entrada libre y gratuita.',
      img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop'
    }
  ];

  // Getter: devuelve el evento actual según el índice
  get eventoActual(): Evento {
    return this.eventos[this.indiceActual];
  }

  // Avanzar al siguiente evento (con ciclo circular)
  siguiente(): void {
    this.indiceActual = (this.indiceActual + 1) % this.eventos.length;
  }

  // Retroceder al evento anterior (con ciclo circular)
  anterior(): void {
    this.indiceActual = (this.indiceActual - 1 + this.eventos.length) % this.eventos.length;
  }

  // Ir directamente a un evento por índice (para los dots)
  irA(indice: number): void {
    this.indiceActual = indice;
  }
}