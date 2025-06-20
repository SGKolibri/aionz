import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../core/service/product.service';
import { CommonModule, Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-product-page',
  imports: [CommonModule, MatCardModule],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
  standalone: true,
})
export class ProductPage implements OnInit {
  product!: Product;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private productService: ProductService,
    private title: Title,
    private meta: Meta,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
    const id = params.get('id');
    if (id) {
      this.productService.getProductById(+id).subscribe({
        next: (data) => {
          this.product = data;
          this.title.setTitle(data.nome);
          this.meta.updateTag({ name: 'description', content: data.descricao });
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Erro ao buscar produto:', err);
        },
      });
    }
  });
  }

  goBack() {
    this.location.back();
  }
}
