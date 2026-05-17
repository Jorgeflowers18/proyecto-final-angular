/*
 * Objetivo del archivo:
 * Tipar tareas, estados y prioridades para evitar strings sueltos.
 *
 * Ejercicio para el estudiante:
 * Revisa que los union types coincidan exactamente con lo que valida el backend.
 */
export type TaskStatus = 'pending' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export const TASK_STATUS_OPTIONS: TaskStatus[] = ['pending', 'in_progress', 'done'];
export const TASK_PRIORITY_OPTIONS: TaskPriority[] = ['low', 'medium', 'high'];

export interface TaskApi {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  student_id: number | null;
  student_name: string | null;
  due_date: string | null;
  created_at: string;
}

export interface TaskView {
  id: number;
  title: string;
  summary: string;
  status: TaskStatus;
  statusLabel: string;
  /*
   * TODO estudiante:
   * JEFO COMPLETADO
   * Completar mejor el texto de prioridad en el mapper.
   * Por ejemplo: "Alta - resolver primero".
   */
  priorityLabel: string;
  studentLabel: string;
  /*
   * TODO estudiante:
   * JEFO COMPLETADO
   * El mapper actual deja este campo parcialmente resuelto.
   * Debes mostrar una fecha legible si due_date existe.
   */
  dueDateLabel: string;
}

export interface CreateTaskPayload {
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  student_id: number | null;
  due_date: string | null;
}
