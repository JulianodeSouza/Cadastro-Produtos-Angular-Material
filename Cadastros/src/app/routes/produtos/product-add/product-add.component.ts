import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/requests/produtos/product.service';
import { MessageService } from 'src/app/core/services/message/message.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {

  public iProduct: Product;

  public iProductForm: FormGroup;

  constructor(
    private cProductService: ProductService,
    private cRouter: Router,
    private cFormBuilder: FormBuilder,
    private cMessageService: MessageService
  ) {
    this.inst();
  }

  private inst() {
    this.iProduct = {
      name: '',
      price: null
    };

    this.iProductForm = this.cFormBuilder.group({
      name: ['', Validators.required],
      price: [null, Validators.required]
    });
  }

  createProduct(): void {
    this.cProductService.create(this.iProduct).subscribe(() => {
      this.cMessageService.showMessage('Produto criado com sucesso!')
      this.cRouter.navigate(['/produtos'])
    }, err => {
      console.log(err);
      this.cMessageService.showMessage('Não foi possível criar o produto!')
    });
  }

  cancel(): void {
    this.cRouter.navigate(['/produtos'])
  }
}
