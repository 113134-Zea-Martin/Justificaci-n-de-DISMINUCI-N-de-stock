import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://mocki.io/v1/c140fe64-4b7f-458d-acb3-939f10cd9199'; // Reemplaza con la URL real de tu API

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  eliminateProducts(justification: string, productIds: number[]): Observable<any> {
    const payload = {
      justification,
      productIds
    };
    return this.http.post(`${this.apiUrl}/delete`, payload);
  }
}