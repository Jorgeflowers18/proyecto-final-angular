import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AcademicApiService } from '../../../services/academic-api.service';
import { CategoryView } from '../../../models/category.model';
import { CreateProductPayload } from '../../../models/product.model';

interface ProductForm {
  name: FormControl<string>;
  price: FormControl<number>;
  stock: FormControl<number>;
  category_id: FormControl<number | null>;
}

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './form-product.component.html',
})
export class FormProductComponent {
  private readonly academicApi = inject(AcademicApiService);

  readonly categories$: Observable<CategoryView[]> = this.academicApi.getCategories();
  readonly successMessage = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);

  readonly productForm = new FormGroup<ProductForm>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    stock: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    category_id: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
  });

  submit(): void {
    this.productForm.markAllAsTouched();

    if (this.productForm.invalid) {
      this.errorMessage.set(this.getInvalidFieldMessage());
      this.successMessage.set(null);
      return;
    }

    const value = this.productForm.getRawValue();
    const payload: CreateProductPayload = {
      name: value.name,
      price: value.price,
      stock: value.stock,
      category_id: value.category_id as number,
    };

    this.academicApi.createProduct(payload).subscribe({
      next: (product) => {
        this.successMessage.set(`Producto creado: ${product.name}`);
        this.errorMessage.set(null);
        this.resetForm();
      },
      error: () => {
        this.errorMessage.set('Error: no se pudo crear el producto. Revisa los datos e intenta de nuevo.');
        this.successMessage.set(null);
      },
    });
  }

  private getInvalidFieldMessage(): string {
    const controls = this.productForm.controls;

    if (controls.name.invalid) {
      return 'Error: el nombre del producto es obligatorio.';
    }

    if (controls.price.invalid) {
      if (controls.price.hasError('required')) {
        return 'Error: el precio es obligatorio.';
      }
      if (controls.price.hasError('min')) {
        return 'Error: el precio no puede ser menor a 0.';
      }
    }

    if (controls.stock.invalid) {
      if (controls.stock.hasError('required')) {
        return 'Error: el stock es obligatorio.';
      }
      if (controls.stock.hasError('min')) {
        return 'Error: el stock no puede ser menor a 0.';
      }
    }

    if (controls.category_id.invalid) {
      return 'Error: debes seleccionar una categoría.';
    }

    return 'Error: el formulario es inválido.';
  }

  private resetForm(): void {
    this.productForm.reset({
      name: '',
      price: 0,
      stock: 0,
      category_id: null,
    });
  }
}
