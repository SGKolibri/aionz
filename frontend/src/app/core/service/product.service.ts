import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";

@Injectable({ providedIn: "root" })
export class ProductService {
    private apiUrl = "http://localhost:5050/api/products";

    constructor(private http: HttpClient) {}

    getProducts() {
        return this.http.get<Product[]>(this.apiUrl);
    }

    getProductById(id: number) {
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }

    createProduct(product: Product) {
        return this.http.post<Product>(this.apiUrl, product);
    }
}