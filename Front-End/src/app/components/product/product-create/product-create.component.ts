import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

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


