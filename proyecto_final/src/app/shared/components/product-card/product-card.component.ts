import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ProductView } from '../../../models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  readonly product = input.required<ProductView>();
  readonly selected = output<ProductView>();

  selectProduct(): void {
    this.selected.emit(this.product());
  }
}
