import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InscripcionService, Inscripcion } from '../services/inscripcion';

@Component({
  selector: 'app-punto4',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './punto4.html',
  styleUrl: './punto4.css'
})
export class Punto4Component {

  // Modelo del formulario
  formData = {
    dni: '',
    email: '',
    curso: '',
    precio: null as number | null,
    categoriaAlumno: null as number | null,
    fechaInscripcion: new Date().toISOString().split('T')[0]  // hoy por defecto
  };

  precioFinal: number | null = null;
  mensajeExito: string = '';

  constructor(private inscripcionService: InscripcionService) {}

  // Calcula el precio con descuento cada vez que cambia precio o categoría
  calcularPrecio(): void {
    if (!this.formData.precio || !this.formData.categoriaAlumno) {
      this.precioFinal = null;
      return;
    }

    const precio = this.formData.precio;
    switch (Number(this.formData.categoriaAlumno)) {
      case 1: this.precioFinal = precio * 0.65; break;  // 35% descuento
      case 2: this.precioFinal = precio * 0.50; break;  // 50% descuento
      case 3: this.precioFinal = precio;         break;  // sin descuento
      default: this.precioFinal = null;
    }
  }

  // Nombre de la categoría para mostrar
  getNombreCategoria(id: number): string {
    const categorias: Record<number, string> = {
      1: 'Estudiante', 2: 'Egresado', 3: 'Particular'
    };
    return categorias[id] || '';
  }

  // Descuento aplicado para mostrar
  getDescuento(): string {
    switch (Number(this.formData.categoriaAlumno)) {
      case 1: return '35%';
      case 2: return '50%';
      case 3: return 'Sin descuento';
      default: return '';
    }
  }

  // Valida que el formulario esté completo
  get formularioValido(): boolean {
    return !!(
      this.formData.dni &&
      this.formData.email &&
      this.formData.curso &&
      this.formData.precio &&
      this.formData.categoriaAlumno &&
      this.formData.fechaInscripcion
    );
  }

  // Registra la inscripción usando el servicio
  registrar(): void {
    if (!this.formularioValido || this.precioFinal === null) return;

    this.inscripcionService.agregar({
      dni: this.formData.dni,
      email: this.formData.email,
      curso: this.formData.curso,
      precio: this.formData.precio!,
      precioFinal: this.precioFinal,
      categoriaAlumno: Number(this.formData.categoriaAlumno),
      fechaInscripcion: new Date(this.formData.fechaInscripcion)
    });

    this.mensajeExito = `✅ Inscripción de ${this.formData.dni} registrada correctamente.`;
    this.limpiarFormulario();

    setTimeout(() => this.mensajeExito = '', 3000);
  }

  // Limpia el formulario
  private limpiarFormulario(): void {
    this.formData = {
      dni: '',
      email: '',
      curso: '',
      precio: null,
      categoriaAlumno: null,
      fechaInscripcion: new Date().toISOString().split('T')[0]
    };
    this.precioFinal = null;
  }

  // Elimina una inscripción (DELETE del CRUD)
  eliminar(id: number): void {
    this.inscripcionService.eliminar(id);
  }

  // Getters que delegan al servicio
  get inscripciones(): Inscripcion[] {
    return this.inscripcionService.obtenerTodas();
  }

  get resumen() {
    return this.inscripcionService.obtenerResumen();
  }

  get totalGeneral(): number {
    return this.inscripcionService.obtenerTotalGeneral();
  }
}