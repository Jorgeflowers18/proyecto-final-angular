/*
 * Objetivo del archivo:
 * Mantener interfaces pequenas y faciles de leer.
 *
 * Que debe completar el estudiante:
 * 1. Crear una interfaz CreateStudentPayload para el POST /api/students.
 * 2. Usarla en AcademicApiService cuando implemente createStudent().
 * 3. Agregar campos al ViewModel solo si la vista los necesita.
 */
export interface StudentApi {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  active: boolean;
  created_at: string;
}

export interface StudentView {
  id: number;
  fullName: string;
  email: string;
  /*
   * TODO estudiante:
   * JEFO COMPLETADO
   * Revisar si conviene mantener active y activeLabel juntos.
   * Una practica posible es dejar active para logica y activeLabel para HTML.
   */
  firstName: string;
  lastName: string;
  activeLabel: string;
  active: boolean;
  createdAtLabel: string;
}


/*
 * TODO estudiante:
 * Crear aqui la interfaz para enviar estudiantes al backend.
 * jefo COMPLETADO
 * Pista:
 * El backend espera snake_case:
 * {
 *   first_name: string;
 *   last_name: string;
 *   email: string;
 *   active: boolean;
 * }
 */

export interface CreateStudentPayload {
  first_name: string;
  last_name: string;
  email: string;
  active: boolean;
}