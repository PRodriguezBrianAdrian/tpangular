import { Injectable } from '@angular/core';

export interface Inscripcion {
  id: number;
  dni: string;
  email: string;
  curso: string;
  precio: number;
  precioFinal: number;
  categoriaAlumno: number;  // 1=Estudiante, 2=Egresado, 3=Particular
  fechaInscripcion: Date;
}

@Injectable({
  providedIn: 'root'  // disponible en toda la app sin importarlo en módulos
})
export class InscripcionService {

  private inscripciones: Inscripcion[] = [];
  private contadorId: number = 1;

  // CREATE
  agregar(inscripcion: Omit<Inscripcion, 'id'>): Inscripcion {
    const nueva = { ...inscripcion, id: this.contadorId++ };
    this.inscripciones.push(nueva);
    return nueva;
  }

  // READ
  obtenerTodas(): Inscripcion[] {
    return this.inscripciones;
  }

  // DELETE
  eliminar(id: number): void {
    this.inscripciones = this.inscripciones.filter(i => i.id !== id);
  }

  // RESUMEN por categoría
  obtenerResumen() {
    const categorias = [
      { id: 1, nombre: 'Estudiante' },
      { id: 2, nombre: 'Egresado' },
      { id: 3, nombre: 'Particular' }
    ];

    return categorias.map(cat => {
      const insc = this.inscripciones.filter(i => i.categoriaAlumno === cat.id);
      return {
        nombre: cat.nombre,
        cantidad: insc.length,
        total: insc.reduce((acc, i) => acc + i.precioFinal, 0)
      };
    });
  }

  // TOTAL general
  obtenerTotalGeneral(): number {
    return this.inscripciones.reduce((acc, i) => acc + i.precioFinal, 0);
  }
}