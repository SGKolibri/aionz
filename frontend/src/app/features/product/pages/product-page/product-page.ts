import { Component, OnInit } from '@angular/core';
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
    private meta: Meta
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.productService.getProductById(+id).subscribe((product) => {
          this.product = product;
          this.title.setTitle(product.nome);
          this.meta.updateTag({
            name: 'description',
            content: product.descricao,
          });
        });
      }
    });
  }

  goBack() {
    this.location.back();
  }

}
