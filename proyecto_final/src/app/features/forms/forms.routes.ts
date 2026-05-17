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
        children:[
            {
                path:'categories',
                component:FormCategoryComponent
            },
            {
                path:'products',
                component:FormProductComponent
            },
            {
                path:'students',
                component:FormStudentComponent
            },
            {
                path:'tasks',
                component:FormTaskComponent
            },
            {
                path:'**',
                redirectTo: 'tasks',
            }
        ]
    },

];

export default formsRoutes;