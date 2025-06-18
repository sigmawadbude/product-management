import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Product } from '../interfaces/product';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProduct: Product = {
    id: '1',
    productName: 'Test Product',
    productCode: 'TP-001',
    category: 'Test Category',
    tags: ['test'],
    releaseDate: '2025-01-01',
    price: 99.99,
    description: 'Test Description',
    starRating: 4.5,
    imageUrl: 'test.jpg',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all products', () => {
    const mockProducts = [mockProduct];

    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(1);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('http://localhost:3000/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should get product by ID', () => {
    service.getProduct('1').subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne('http://localhost:3000/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should return initialized product when ID is "0"', () => {
    service.getProduct('0').subscribe((product) => {
      expect(product.id).toBe('0');
      expect(product.productName).toBe('');
    });

    // No HTTP request expected
  });

  it('should create a product', () => {
    const newProduct = { ...mockProduct, id: null };

    service.createProduct(newProduct).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne('http://localhost:3000/products');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.id).toBeUndefined();
    req.flush(mockProduct);
  });

  it('should update a product', () => {
    service.updateProduct(mockProduct).subscribe((updated) => {
      expect(updated).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`http://localhost:3000/products/${mockProduct.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockProduct);
  });

  it('should delete a product', () => {
    service.deleteProduct('1').subscribe((res) => {
      expect(res).toEqual({});
    });

    const req = httpMock.expectOne('http://localhost:3000/products/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should handle 404 error on getProduct', () => {
    service.getProduct('999').subscribe({
      next: () => fail('should have failed with 404'),
      error: (error) => {
        expect(error.message).toContain('404');
      },
    });

    const req = httpMock.expectOne('http://localhost:3000/products/999');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });
});
