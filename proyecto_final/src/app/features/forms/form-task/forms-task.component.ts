import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskDraftStorageService } from '../../../services/task-draft-storage.service';
import { AcademicApiService } from '../../../services/academic-api.service';
import { CreateTaskPayload, TaskStatus, TaskPriority, TASK_STATUS_OPTIONS, TASK_PRIORITY_OPTIONS } from '../../../models/task.model';

interface TaskForm {
  title: FormControl<string>;
  description: FormControl<string>;
  status: FormControl<TaskStatus>;
  priority: FormControl<TaskPriority>;
  student_id: FormControl<number | null>;
  subtasks: FormArray<FormControl<string>>;
  dueDate: FormControl<string>;
}

@Component({
  selector: 'app-form-task',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './forms-task.component.html',
})
export class FormTaskComponent {
  /*
   * Objetivo del ejercicio:
   * Practicar formularios reactivos con FormGroup, FormControl y FormArray.
   *
   * Que debe completar el estudiante:
   * Actividad 1, nivel basico:
   * - Agregar Validators.minLength(3) al titulo.
   *
   * Actividad 2, nivel intermedio:
   * - Construir un CreateTaskPayload usando los valores del formulario.
   *
   * Actividad 3, nivel intermedio:
   * - Enviar el formulario al backend usando AcademicApiService.createTask().
   *
   * Actividad 4, nivel reto:
   * - Guardar mas campos como borrador en localStorage y restaurarlos al recargar.
   *
   * Criterio de aceptacion:
   * - Si el formulario es invalido, no debe hacer POST.
   * - Si el POST funciona, debe limpiar el formulario o mostrar la tarea creada.
   * - El payload debe respetar los nombres del backend: student_id y due_date.
   */
  private readonly draftStorage = inject(TaskDraftStorageService);
  private academicApi = inject(AcademicApiService);
  private readonly draft = this.draftStorage.loadDraft();

  readonly statusOptions: TaskStatus[] = TASK_STATUS_OPTIONS;
  readonly priorityOptions: TaskPriority[] = TASK_PRIORITY_OPTIONS;
  readonly students$ = this.academicApi.getStudents();
  readonly errorMessage = signal<string | null>(null);
  private errorAlertTimeout: number | undefined;
  
  readonly taskForm = new FormGroup<TaskForm>({
    title: new FormControl(this.draft.title, {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    description: new FormControl(this.draft.description, {
      nonNullable: true,
    }),
    status: new FormControl('pending' as TaskStatus, {
      nonNullable: true,
    }),
    student_id: new FormControl<number | null>(this.draft.student_id ?? null),
    priority: new FormControl('medium' as TaskPriority, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    dueDate: new FormControl(this.draft.dueDate, {
      nonNullable: true,
    }),
    // Lsita de subtareas (FormArray de FormControl de string)
    subtasks: new FormArray<FormControl<string>>([
      new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    ]),
  });

  get subtasks(): FormArray<FormControl<string>> {
    return this.taskForm.controls.subtasks;
  }

  addSubtask(): void {
    this.subtasks.push(
      new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    );
  }

  removeSubtask(index: number): void {
    this.subtasks.removeAt(index);
  }

  saveDraft(): void {
    this.draftStorage.saveDraft({
      title: this.taskForm.controls.title.value,
      description: this.taskForm.controls.description.value,
      status: this.taskForm.controls.status.value,
      priority: this.taskForm.controls.priority.value,
      dueDate: this.taskForm.controls.dueDate.value,
      student_id: this.taskForm.controls.student_id.value ?? null,
    });
  }

  private displayFormError(message: string): void {
    this.errorMessage.set(message);
    if (this.errorAlertTimeout) {
      clearTimeout(this.errorAlertTimeout);
    }
    this.errorAlertTimeout = window.setTimeout(() => {
      this.errorMessage.set(null);
      this.errorAlertTimeout = undefined;
    }, 5000);
  }

  private clearFormError(): void {
    this.errorMessage.set(null);
    if (this.errorAlertTimeout) {
      clearTimeout(this.errorAlertTimeout);
      this.errorAlertTimeout = undefined;
    }
  }

  private getInvalidFieldMessage(): string {
    const controls = this.taskForm.controls;

    if (controls.title.invalid) {
      if (controls.title.hasError('required')) {
        return 'Error: el campo Título es obligatorio.';
      }
      if (controls.title.hasError('minlength')) {
        const error = controls.title.getError('minlength');
        return `Error: el título debe tener al menos ${error.requiredLength} caracteres.`;
      }
    }

    if (controls.priority.invalid) {
      return 'Error: selecciona una prioridad válida.';
    }

    const subtasks = controls.subtasks.controls;
    for (let i = 0; i < subtasks.length; i += 1) {
      if (subtasks[i].invalid) {
        return `Error: la subtarea ${i + 1} está vacía.`;
      }
    }

    return 'Error: el formulario es inválido.';
  }

  submit(): void {
    this.taskForm.markAllAsTouched();

    if (this.taskForm.invalid) {
      this.displayFormError(this.getInvalidFieldMessage());
      return;
    }

    this.clearFormError();

    // Cargar variable form
    const taskToBeCreated = this.taskForm.getRawValue();
    const taskPayload: CreateTaskPayload = {
      title: taskToBeCreated.title,
      description: taskToBeCreated.description || null,
      status: taskToBeCreated.status,
      priority: taskToBeCreated.priority,
      student_id: taskToBeCreated.student_id ?? null,
      due_date: taskToBeCreated.dueDate || null,
    };

    this.academicApi.createTask(taskPayload).subscribe({
      next: (task) => {
        console.log('Tarea creada:', task);
        this.taskForm.reset({
          title: '',
          description: '',
          status: 'pending',
          priority: 'medium',
          dueDate: '',
          student_id: null,
        });
        this.subtasks.clear();
        this.addSubtask();
      },
      error: (error) => {
        console.error('Error creando tarea:', error);
      },
    });
    /*
     * TODO estudiante:
     * Aqui debe construir CreateTaskPayload y llamar AcademicApiService.createTask().
     * Por ahora solo se muestra el valor en consola para no resolver todo el ejercicio.
     *
     * Pasos sugeridos:
     * 1. Leer const value = this.taskForm.getRawValue().
     * 2. Crear un objeto CreateTaskPayload.
     * 3. Pasar description como null si esta vacia.
     * 4. Llamar al servicio.
     * 5. Manejar next y error en subscribe.
     */
    console.log('Formulario valido:', this.taskForm.getRawValue());
  }
}
