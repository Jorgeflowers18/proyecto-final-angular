import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AcademicApiService } from '../../../services/academic-api.service';
import { CreateStudentPayload } from '../../../models/student.model';

interface StudentForm {
  first_name: FormControl<string>;
  last_name: FormControl<string>;
  email: FormControl<string>;
  active: FormControl<boolean>;
}

@Component({
  selector: 'app-form-student',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-student.component.html',
})
export class FormStudentComponent {
  private readonly academicApi = inject(AcademicApiService);

  readonly successMessage = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);

  readonly studentForm = new FormGroup<StudentForm>({
    first_name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    last_name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    active: new FormControl(true, {
      nonNullable: true,
    }),
  });

  submit(): void {
    this.studentForm.markAllAsTouched();

    if (this.studentForm.invalid) {
      this.errorMessage.set(this.getInvalidFieldMessage());
      this.successMessage.set(null);
      return;
    }

    const value = this.studentForm.getRawValue();
    const payload: CreateStudentPayload = {
      first_name: value.first_name,
      last_name: value.last_name,
      email: value.email,
      active: value.active,
    };

    this.academicApi.createStudent(payload).subscribe({
      next: (student) => {
        this.successMessage.set(`Estudiante creado: ${student.fullName}`);
        this.errorMessage.set(null);
        this.resetForm();
      },
      error: () => {
        this.errorMessage.set('Error: no se pudo crear el estudiante.');
        this.successMessage.set(null);
      },
    });
  }

  private getInvalidFieldMessage(): string {
    const controls = this.studentForm.controls;

    if (controls.first_name.invalid) {
      if (controls.first_name.hasError('required')) {
        return 'Error: el nombre es obligatorio.';
      }
      if (controls.first_name.hasError('minlength')) {
        const error = controls.first_name.getError('minlength');
        return `Error: el nombre debe tener al menos ${error.requiredLength} caracteres.`;
      }
    }

    if (controls.last_name.invalid) {
      if (controls.last_name.hasError('required')) {
        return 'Error: el apellido es obligatorio.';
      }
      if (controls.last_name.hasError('minlength')) {
        const error = controls.last_name.getError('minlength');
        return `Error: el apellido debe tener al menos ${error.requiredLength} caracteres.`;
      }
    }

    if (controls.email.invalid) {
      if (controls.email.hasError('required')) {
        return 'Error: el email es obligatorio.';
      }
      if (controls.email.hasError('email')) {
        return 'Error: ingresa un email válido.';
      }
    }

    return 'Error: el formulario de estudiante es inválido.';
  }

  private resetForm(): void {
    this.studentForm.reset({
      first_name: '',
      last_name: '',
      email: '',
      active: true,
    });
  }
}
