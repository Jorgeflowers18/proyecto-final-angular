import {
  ApplicationConfig, LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import localeEsEc from '@angular/common/locales/es-EC';

registerLocaleData(localeEsEc);
export const appConfig: ApplicationConfig = {
  providers: [
    /*
     * Objetivo del archivo:
     * Configurar servicios globales de la aplicacion standalone.
     *
     * Conceptos que evalua:
     * - provideRouter para rutas sin NgModules.
     * - provideHttpClient para consumir el backend REST.
     * - provideZonelessChangeDetection para modo zoneless.
     *
     * Que debe completar el estudiante:
     * Puede agregar providers globales aqui cuando una practica lo requiera.
     */
    { provide: LOCALE_ID, useValue: 'es-EC' },
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
  ],
};
