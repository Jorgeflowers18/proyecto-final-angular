import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AcademicApiService } from '../../../services/academic-api.service';
import { CreateCategoryPayload } from '../../../models/category.model';

interface CategoryForm {
  name: FormControl<string>;
  description: FormControl<string>;
}

@Component({
  selector: 'app-form-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-category.component.html',
})
export class FormCategoryComponent {
  private readonly academicApi = inject(AcademicApiService);

  readonly successMessage = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);

  readonly categoryForm = new FormGroup<CategoryForm>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  submit(): void {
    this.categoryForm.markAllAsTouched();

    if (this.categoryForm.invalid) {
      this.errorMessage.set(this.getInvalidFieldMessage());
      this.successMessage.set(null);
      return;
    }

    const value = this.categoryForm.getRawValue();
    const payload: CreateCategoryPayload = {
      name: value.name,
      description: value.description,
    };

    this.academicApi.createCategory(payload).subscribe({
      next: (category) => {
        this.successMessage.set(`Categoría creada: ${category.name}`);
        this.errorMessage.set(null);
        this.resetForm();
      },
      error: () => {
        this.errorMessage.set('Error: no se pudo crear la categoría. Revisa los datos e intenta de nuevo.');
        this.successMessage.set(null);
      },
    });
  }

  private getInvalidFieldMessage(): string {
    const controls = this.categoryForm.controls;

    if (controls.name.invalid) {
      if (controls.name.hasError('required')) {
        return 'Error: el nombre de la categoría es obligatorio.';
      }
      if (controls.name.hasError('minlength')) {
        return 'Error: el nombre debe tener al menos 3 caracteres.';
      }
    }

    if (controls.description.invalid) {
      if (controls.description.hasError('required')) {
        return 'Error: la descripción es obligatoria.';
      }
      if (controls.description.hasError('minlength')) {
        return 'Error: la descripción debe tener al menos 3 caracteres.';
      }
    }

    return 'Error: el formulario de categoría es inválido.';
  }

  private resetForm(): void {
    this.categoryForm.reset({
      name: '',
      description: '',
    });
  }
}
