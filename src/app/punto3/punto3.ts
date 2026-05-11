import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Carta {
  id: number;
  emoji: string;
  revelada: boolean;
  encontrada: boolean;
}

@Component({
  selector: 'app-punto3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './punto3.html',
  styleUrl: './punto3.css'
})
export class Punto3Component {

  // Las 6 parejas disponibles
  readonly EMOJIS = ['🐶', '🐱', '🦊', '🐸', '🦁', '🐼'];

  tablero: Carta[] = [];
  cartasReveladasTurno: Carta[] = [];  // máximo 2 por turno
  intentos: number = 10;
  intentosMax: number = 10;
  juegoIniciado: boolean = false;
  juegoTerminado: boolean = false;
  mensajeFinal: string = '';
  bloqueado: boolean = false;  // evita clicks mientras se comparan cartas

  // Inicializa el tablero mezclado
  iniciarJuego(): void {
    this.intentos = this.intentosMax;
    this.cartasReveladasTurno = [];
    this.juegoTerminado = false;
    this.mensajeFinal = '';
    this.bloqueado = false;
    this.juegoIniciado = true;

    // Creamos las 12 cartas (6 parejas x 2)
    const pares = [...this.EMOJIS, ...this.EMOJIS];
    this.tablero = this.mezclar(pares).map((emoji, index) => ({
      id: index,
      emoji,
      revelada: false,
      encontrada: false
    }));
  }

  // Reinicia todo
  reiniciarJuego(): void {
    this.tablero = [];
    this.cartasReveladasTurno = [];
    this.intentos = this.intentosMax;
    this.juegoIniciado = false;
    this.juegoTerminado = false;
    this.mensajeFinal = '';
    this.bloqueado = false;
  }

  // Click en una carta
  clickCarta(carta: Carta): void {
    // Ignorar si: juego no iniciado, bloqueado, ya encontrada, ya revelada en este turno, o 2 cartas ya elegidas
    if (!this.juegoIniciado) return;
    if (this.bloqueado) return;
    if (carta.encontrada) return;
    if (carta.revelada) return;
    if (this.cartasReveladasTurno.length >= 2) return;

    // Revelar la carta
    carta.revelada = true;
    this.cartasReveladasTurno.push(carta);

    // Si ya hay 2 cartas reveladas, comparar
    if (this.cartasReveladasTurno.length === 2) {
      this.bloqueado = true;
      setTimeout(() => this.compararCartas(), 1000);
    }
  }

  // Compara las dos cartas reveladas
  private compararCartas(): void {
    const [c1, c2] = this.cartasReveladasTurno;

    if (c1.emoji === c2.emoji) {
      // ¡Pareja encontrada!
      c1.encontrada = true;
      c2.encontrada = true;
    } else {
      // No coinciden: tapar y restar intento
      c1.revelada = false;
      c2.revelada = false;
      this.intentos--;
    }

    this.cartasReveladasTurno = [];
    this.bloqueado = false;
    this.verificarFinJuego();
  }

  // Verifica si ganó o perdió
  private verificarFinJuego(): void {
    const todasEncontradas = this.tablero.every(c => c.encontrada);
    if (todasEncontradas) {
      this.juegoTerminado = true;
      this.mensajeFinal = '🎉 ¡Ganaste! ¡Encontraste todas las parejas!';
    } else if (this.intentos <= 0) {
      this.juegoTerminado = true;
      // Revelar todas las cartas al perder
      this.tablero.forEach(c => c.revelada = true);
      this.mensajeFinal = '😢 ¡Sin intentos! ¡Mejor suerte la próxima!';
    }
  }

  // Mezcla el array aleatoriamente (Fisher-Yates)
  private mezclar(arr: string[]): string[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Color de fondo según intentos restantes
  get colorIntentos(): string {
    const ratio = this.intentos / this.intentosMax;
    if (ratio > 0.6) return 'text-success';
    if (ratio > 0.3) return 'text-warning';
    return 'text-danger';
  }
}