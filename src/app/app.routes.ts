// app.routes.ts
import { Routes } from '@angular/router';
import { Punto1Component } from './punto1/punto1';
import { Punto2Component } from './punto2/punto2';
import { Punto3Component } from './punto3/punto3';
import { Punto4Component } from './punto4/punto4';

export const routes: Routes = [
  { path: '', redirectTo: 'punto1', pathMatch: 'full' },
  { path: 'punto1', component: Punto1Component },
  { path: 'punto2', component: Punto2Component },
  { path: 'punto3', component: Punto3Component },
  { path: 'punto4', component: Punto4Component },
];