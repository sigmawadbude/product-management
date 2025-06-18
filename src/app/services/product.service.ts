import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'http://localhost:3000/products';
  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.productsUrl)
      .pipe(catchError(this.handleError));
  }

  getProduct(id: string): Observable<Product> {
    if (id === '0') {
      return of(this.initializeProduct());
    }
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(catchError(this.handleError));
  }

  createProduct(product: Product): Observable<Product> {
    // Required for the in memory web API to assign a unique id
    const newProduct = { ...product, id: undefined };
    return this.http
      .post<Product>(this.productsUrl, newProduct, {
        headers: this.jsonHeaders,
      })
      .pipe(catchError(this.handleError));
  }

  deleteProduct(id: string): Observable<{}> {
    const url = `${this.productsUrl}/${id}`;
    return this.http
      .delete<Product>(url, { headers: this.jsonHeaders })
      .pipe(catchError(this.handleError));
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `${this.productsUrl}/${product.id}`;
    return this.http
      .put<Product>(url, product, { headers: this.jsonHeaders })
      .pipe(
        // Return the product on an update
        map(() => product),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => new Error(errorMessage));
  }

  private initializeProduct(): Product {
    // Return an initialized object
    return {
      id: '0',
      productName: '',
      productCode: '',
      category: '',
      tags: [],
      releaseDate: '',
      price: 0,
      description: '',
      starRating: 0,
      imageUrl: '',
    };
  }
}
