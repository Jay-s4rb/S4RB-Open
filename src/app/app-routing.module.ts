import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComplaintsPerMillionUnitsComponent } from './complaints-per-million-units/complaints-per-million-units.component'

export const appRoutes: Routes = [
    { path: '', component: ComplaintsPerMillionUnitsComponent },
    { path: '**', redirectTo: '/'}
];