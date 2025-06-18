import { Component, inject, OnInit } from '@angular/core';
import { Product, ProductResolved } from '../../interfaces/product';
import { MessageService } from '../../services/message.service';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-product-edit',
  imports: [
    FormsModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent implements OnInit {
  pageTitle = 'Product Edit';
  errorMessage = '';

  private currentProduct: Product | null = null;
  private originalProduct: Product | null = null;

  private dataIsValid: { [key: string]: boolean } = {};

  get isDirty() {
    return (
      JSON.stringify(this.originalProduct) !==
      JSON.stringify(this.currentProduct)
    );
  }
  get product(): Product | null {
    return this.currentProduct;
  }

  set product(value: Product | null) {
    this.currentProduct = value;
    this.originalProduct = value ? { ...value } : null;
  }
  private productService = inject(ProductService);
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);

  /**
   * Lifecycle hook that runs on component initialization.
   * It retrieves the product data from the route.
   */
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const resolvedData: ProductResolved = data['resolvedData'];
      if (resolvedData.error) {
        this.errorMessage = String(resolvedData.error);
      }
      this.onProductRetrieved(resolvedData.product);
    });
  }

  onProductRetrieved(product: Product | null): void {
    this.product = product;

    if (!this.product) {
      this.pageTitle = 'No product found';
    } else {
      if (this.product.id === '0') {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }
  }

  deleteProduct(): void {
    if (!this.product || !this.product.id) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.product?.productName} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe({
          next: () =>
            this.onSaveComplete(`${this.product?.productName} was deleted`),
          error: (err) => (this.errorMessage = err),
        });
      }
    }
  }

  isValid(path?: string) {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }

    return (
      this.dataIsValid &&
      Object.keys(this.dataIsValid).every((d) => this.dataIsValid[d] === true)
    );
  }

  reset(): void {
    this.dataIsValid = {};
    this.currentProduct = null;
    this.originalProduct = null;
  }

  saveProduct(): void {
    if (this.product && this.isValid()) {
      if (this.product.id === '0') {
        this.productService.createProduct(this.product).subscribe({
          next: () =>
            this.onSaveComplete(
              `The new ${this.product?.productName} was saved`
            ),
          error: (err) => (this.errorMessage = err),
        });
      } else {
        this.productService.updateProduct(this.product).subscribe({
          next: () =>
            this.onSaveComplete(
              `The updated ${this.product?.productName} was saved`
            ),
          error: (err) => (this.errorMessage = err),
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }
    this.reset();

    // Navigate back to the product list
    this.router.navigate(['/products']);
  }

  cancelEdit() {
    this.location.back();
  }

  validate() {
    this.dataIsValid = {};

    // 'info' tab
    if (
      this.product &&
      this.product.productName &&
      this.product.productName.length >= 3 &&
      this.product.productCode
    ) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }

    // 'tags' tab
    if (
      this.product &&
      this.product.category &&
      this.product.category.length >= 3
    ) {
      this.dataIsValid['tags'] = true;
    } else {
      this.dataIsValid['tags'] = false;
    }
  }
}
