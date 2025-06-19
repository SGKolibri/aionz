import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/service/product.service';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../../../../components/product-card/product-card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    ProductCard,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';

  private routerSubscription!: Subscription;

  constructor(private productService: ProductService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadProducts();
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadProducts();
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filterProducts();
    });
  }

  filterProducts() {
    const term = (this.searchTerm || '').toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.nome.toLowerCase().includes(term)
    );
  }
}
