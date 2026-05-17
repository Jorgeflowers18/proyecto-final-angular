import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

interface FormOption {
  label: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-forms-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './forms-page.html',
  styleUrl: './forms-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsPage {
  readonly formOptions: FormOption[] = [
    { label: 'Tareas', path: 'tasks', icon: 'TK' },
    { label: 'Estudiantes', path: 'estudiantes', icon: 'ES' },
    { label: 'Productos', path: 'productos', icon: 'PD' },
    { label: 'Categorías', path: 'categorias', icon: 'CT' },
  ];
}
