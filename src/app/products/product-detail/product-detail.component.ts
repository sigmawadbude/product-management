import { Component, OnInit } from '@angular/core';
import { Product, ProductResolved } from '../../interfaces/product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StarComponent } from '../../shared/star.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail', // Component selector
  imports: [StarComponent, CurrencyPipe, RouterLink], // Required modules/components
  templateUrl: './product-detail.component.html', // Template file
})
export class ProductDetailComponent implements OnInit {
  /** Page title displayed in the UI */
  pageTitle = 'Product Detail';

  /** Product object loaded from the backend */
  product: Product | null = null;

  /** Holds any error messages from the service */
  errorMessage = '';

  /**
   * Injects necessary services: ProductService for data,
   * ActivatedRoute to access route parameters
   */
  constructor(private route: ActivatedRoute) {}

  /**
   * Lifecycle hook that runs on component initialization.
   * It retrieves the product ID from the route and fetches the product.
   */
  ngOnInit(): void {
    const resolvedData: ProductResolved =
      this.route.snapshot.data['resolvedData'];
    if (resolvedData.error) {
      this.errorMessage = String(resolvedData.error);
    }
    if (resolvedData.product) {
      this.onProductRetrieved(resolvedData.product);
    }
  }

  /**
   * Callback after a product is successfully retrieved
   * Updates the UI and page title accordingly
   * @param product - The retrieved product object
   */
  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
}
