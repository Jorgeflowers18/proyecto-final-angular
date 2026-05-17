import { Routes } from '@angular/router';
import {FormsPage} from './forms-page/forms-page';
import { FormCategoryComponent } from './form-category/form-category.component';
import { FormProductComponent } from './form-product/form-product.component';
import { FormStudentComponent } from './form-student/form-student.component';
import { FormTaskComponent } from './form-task/forms-task.component';


export const formsRoutes: Routes = [

    {
        path:'',
        component: FormsPage,
        children: [
          {
            path: 'tasks',
            loadComponent: () =>
              import('./form-task/forms-task.component').then((m) => m.FormTaskComponent),
          },
          {
            path: 'estudiantes',
            loadComponent: () =>
              import('./form-student/form-student.component').then(
                (m) => m.FormStudentComponent,
              ),
          },
          {
            path: 'productos',
            loadComponent: () =>
              import('./form-product/form-product.component').then(
                (m) => m.FormProductComponent,
              ),
          },
          {
            path: 'categorias',
            loadComponent: () =>
              import('./form-category/form-category.component').then(
                (m) => m.FormCategoryComponent,
              ),
          },
          {
            path: '',
            redirectTo: 'tasks',
            pathMatch: 'full',
          },
        ],
    },

];

export default formsRoutes;