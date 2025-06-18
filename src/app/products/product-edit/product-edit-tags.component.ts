import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductResolved } from '../../interfaces/product';

@Component({
  imports: [FormsModule, CommonModule],
  templateUrl: './product-edit-tags.component.html',
})
export class ProductEditTagsComponent implements OnInit {
  errorMessage = '';
  newTags = '';
  product: Product | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.data.subscribe((data) => {
      const resolvedData: ProductResolved = data['resolvedData'];
      if (resolvedData.error) {
        this.errorMessage = String(resolvedData.error);
      }
      if (resolvedData.product) {
        this.product = resolvedData.product;
      }
    });
  }

  // Add the defined tags
  addTags(): void {
    if (this.product) {
      if (!this.newTags) {
        this.errorMessage =
          'Enter the search keywords separated by commas and then press Add';
      } else {
        const tagArray = this.newTags.split(',');
        this.product.tags = this.product.tags
          ? this.product.tags.concat(tagArray)
          : tagArray;
        this.newTags = '';
        this.errorMessage = '';
      }
    }
  }

  // Remove the tag from the array of tags.
  removeTag(idx: number): void {
    this.product?.tags?.splice(idx, 1);
  }
}
