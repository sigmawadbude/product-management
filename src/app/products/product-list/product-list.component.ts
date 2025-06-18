import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarComponent } from '../../shared/star.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list', // Component selector used in templates
  imports: [FormsModule, CurrencyPipe, StarComponent, RouterLink], // Required modules/components
  templateUrl: './product-list.component.html', // Component's HTML view
  styleUrl: './product-list.component.css', // Component's styles
})
export class ProductListComponent {
  /** Title for the product list page */
  pageTitle = 'Product List';

  /** Configuration for product image display */
  imageWidth = 50;
  imageMargin = 2;

  /** Boolean to control visibility of product images */
  showImage = false;

  /** Holds the error message in case of HTTP or data errors */
  errorMessage = '';

  /** Private backing field for listFilter */
  private _listFilter = '';

  /**
   * Getter for the product filter string
   */
  get listFilter(): string {
    return this._listFilter;
  }

  /**
   * Setter for the filter string which also updates the filtered product list
   * Automatically triggers filtering logic on user input
   */
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products;
  }

  /** Array to store the filtered list of products */
  filteredProducts: Product[] = [];

  /** Full array of products retrieved from the service */
  products: Product[] = [];

  /**
   * Injects the ProductService to fetch data from the backend
   */
  constructor(private productService: ProductService) {}

  /**
   * Lifecycle hook called after component initialization
   * Subscribes to the ProductService to retrieve product data
   */
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.performFilter(this.listFilter); // Initialize filter
      },
      error: (err) => (this.errorMessage = err), // Handle error
    });
  }

  /**
   * Filters the products array based on a filter string (case-insensitive)
   * @param filterBy - the string to filter products by
   * @returns an array of products that match the filter
   */
  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter(
      (product: Product) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  /**
   * Toggles the visibility of product images
   */
  toggleImage(): void {
    this.showImage = !this.showImage;
  }
}