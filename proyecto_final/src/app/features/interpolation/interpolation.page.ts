import { Component, computed, inject, signal } from '@angular/core';
import {AcademicApiService} from "../../services/academic-api.service";
import { StudentCardComponent } from '../../shared/components/student-card/student-card.component';
import { StudentView } from '../../models/student.model';
import { ProductView } from '../../models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-interpolation-page',
  styleUrls: ['./interpolation.page.css'],
  imports: [StudentCardComponent, ProductCardComponent],
  templateUrl: './interpolation.page.html',
})
export class InterpolationPage {
  /*
   * Objetivo del ejercicio:
   * Practicar interpolacion de strings y propiedades calculadas.
   *
   * Que debe completar el estudiante:
   * Actividad 1, nivel basico:
   * - Mostrar mas propiedades del objeto product.
   *
   * Actividad 2, nivel intermedio:
   * - Crear una propiedad calculada para mostrar el precio con IVA.
   *
   * Actividad 3, nivel reto:
   * - Crear un texto de disponibilidad segun el stock.
   *
   * Criterio de aceptacion:
   * - No escribir valores fijos en el HTML.
   * - Todo debe salir desde propiedades del componente.
   */

  // Aquí no se usan observables y se suscribe a los servicios porque las prácticaas de observables van en otra página.

  private academicApi = inject(AcademicApiService);
  readonly studentsList = signal<StudentView[]>([]);
  readonly studentsLoading = signal(true);
  readonly studentsError = signal<string | null>(null);
  selectedStudent: StudentView | null = null;

  readonly productsList = signal<ProductView[]>([]);
  readonly productsLoading = signal(true);
  readonly productsError = signal<string | null>(null);
  selectedProduct: ProductView | null = null;

  constructor() {
    this.academicApi.getStudents().subscribe({
      next: (students) => {
        this.studentsList.set(students);
        this.studentsLoading.set(false);
      },
      error: (error) => {
        console.error('Error cargando estudiantes:', error);
        this.studentsError.set('No se pudieron cargar los estudiantes.');
        this.studentsLoading.set(false);
      },
    });
    
    this.academicApi.getProducts().subscribe({
      next: (products) => {
        this.productsList.set(products);
        this.productsLoading.set(false);
      },
      error: (error) => {
        console.error('Error cargando productos:', error);
        this.productsError.set('No se pudieron cargar los productos.');
        this.productsLoading.set(false);
      }
    });
  }

  readonly student = signal<StudentView | null>(null);
  readonly product = signal<ProductView | null>(null);


  // readonly student = signal({
  //   firstName: 'Ana',
  //   lastName: 'Mora',
  //   email: 'ana.mora@example.com',
  //   active: true,
  // });

  onStudentSelected(student: StudentView): void {
    this.selectedStudent = student;
  }
  

  // SECCIÓN DE PRODUCTOS

  // readonly product = signal({
  //   name: 'Laptop educativa',
  //   price: 750,
  //   stock: 12,
  //   category: 'Tecnologia',
  // });

  readonly taxRate = signal(0.12);

  onProductSelected(product: ProductView): void {
    this.selectedProduct = product;
  }

  //  SE arregló el error de compilacion pero ya no es necesario puesto que se usan directamente
  // los atributos del objeto
  // readonly studentFullName = computed(() => {
  //   const student = this.student();
  //   return student ? `${student.fullName} (${student.email})` : 'No hay estudiante seleccionado';
  // });

  // readonly studentStatus = computed(() => {
  //   const student = this.student();
  //   return student ? (student.activeLabel) : 'No hay estudiante seleccionado';
  // });
    // (this.student().active ? 'Activo' : 'Inactivo'));

  // readonly priceWithTax = computed(() => this.product().price * (1 + this.taxRate()));

  // readonly availabilityText = computed(() => {
  //   const stock = this.product().stock;

  //   if (stock === 0) {
  //     return 'Agotado';
  //   }

  //   if (stock <= 5) {
  //     return 'Ultimas unidades';
  //   }

  //   return 'Disponible';
  // });


  // updateTaxRate(value: string): void {
  //   const numericValue = Number(value);

  //   this.taxRate.set(Number.isNaN(numericValue) ? 0 : numericValue / 100);
  // }

  // addStock(): void {
  //   this.product.update((product) => ({
  //     ...product,
  //     stock: product.stock + 1,
  //   }));
  // }
}
