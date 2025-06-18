import { NgIf, CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Product, ProductResolved } from "../../interfaces/product";

@Component({
  imports: [FormsModule, CommonModule],
  templateUrl: './product-edit-info.component.html',
})
export class ProductEditInfoComponent implements OnInit {
  @ViewChild(NgForm) productForm?: NgForm;

  errorMessage = '';
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
}
