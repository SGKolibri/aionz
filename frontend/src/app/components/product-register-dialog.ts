import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductService } from '../core/service/product.service';
import { Product } from '../core/models/product.model';

@Component({
  selector: 'app-product-register-dialog',
  standalone: true,
  templateUrl: './product-register-dialog.html',
  styleUrl: './product-register-dialog.scss',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class ProductRegisterDialog {
  product: Partial<Product> = {
    nome: '',
    descricao: '',
    preco: 0,
    categoria: '',
    imagem: '' ,
  };

  constructor(
    private dialogRef: MatDialogRef<ProductRegisterDialog>,
    private productService: ProductService
  ) {}

  onImageSelected(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.product.imagem = reader.result as string;
      // Aqui você pode salvar o arquivo em uma propriedade, se necessário
    };
    reader.readAsDataURL(file);
  }
}
  close() {
    this.dialogRef.close();
  }

  register() {
    this.productService.createProduct(this.product as Product).subscribe({
      next: (newProduct) => this.dialogRef.close(newProduct),
      error: (err) => console.error('Erro ao cadastrar produto', err),
    });
  }
}
