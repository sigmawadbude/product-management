import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ProductResolved } from '../interfaces/product';
import { catchError, map, of } from 'rxjs';
import { inject } from '@angular/core';
import { ProductService } from './product.service';
function isValidObjectId(id: string): boolean {
  // MongoDB ObjectId is a 24-character hex string
  return /^[a-f\d]{24}$/i.test(id);
}
export const productResolver: ResolveFn<ProductResolved> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const productService = inject(ProductService);
  const id = route.paramMap.get('id');

  if(!id || !isValidObjectId(id)){
    const message = `Invalid MongoDB ObjectId: ${id}`;
    return of({ product: null, message });
  }

  return productService.getProduct(id).pipe(
    map(product => ({ product, message: null })),
    catchError(error => of({ product: null, message: error.message }))
  );
};
