import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { appRoutes } from './app-routing.module'

// components
import { ComplaintsPerMillionUnitsComponent } from './complaints-per-million-units/complaints-per-million-units.component';
import { ToggleComponent } from './shared/toggle/toggle.component';

// services 
import { ComplaintsService } from './services/complaints.service'

@NgModule({
  declarations: [
    AppComponent,
    ComplaintsPerMillionUnitsComponent,
    ToggleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule
  ],
  exports: [
    RouterModule
  ],
  providers: [ComplaintsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
