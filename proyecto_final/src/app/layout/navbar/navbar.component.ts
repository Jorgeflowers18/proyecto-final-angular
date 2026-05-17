import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  /*
   * Objetivo del componente:
   * Mostrar las secciones principales de la SPA.
   *
   * Que debe completar el estudiante:
   * jefo completado
   * Se agrega Formularios como nueva ruta para demostrar la utulizacón de rutas anidadas.
   * Se cambian el nombre de ciertas páginas para emular una página de gestión académica.
   * Si agrega una pagina nueva en app.routes.ts, tambien debe agregarla aqui.
   *
   * 
   * Pista:
   * routerLinkActive aplica una clase CSS cuando la ruta esta activa.
   */
  readonly navItems: NavItem[] = [
    // { label: 'Inicio', path: '/', icon: 'IN' },
    { label: 'Interpolación', path: '/interpolacion', icon: 'IT' },
    //  Se quita components porque se muestra mejor en otras páginas, enseñando que se agregaron nuevos componentes
    // { label: 'Componentes', path: '/componentes', icon: 'CP' },
    { label: 'Control Flow', path: '/control-flow', icon: 'CF' },
    { label: 'Servicios HTTP', path: '/servicios-http', icon: 'API' },
    { label: 'Rutas', path: '/rutas', icon: 'RT' },
    { label: 'Formularios', path: '/formularios', icon: 'FG' },
    { label: 'Local Storage', path: '/local-storage', icon: 'LS' },
  ];
}
