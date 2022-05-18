import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/requests/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  public product: Product = {
    name: '',
    price: null
  };

  public productForm: FormGroup;

  constructor(private productService: ProductService, private router: Router, private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado com sucesso!')
      this.router.navigate(['/products'])
    }, err => {
      console.log(err);
      this.productService.showMessage('Não foi possível criar o produto!')
    });

  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

}


