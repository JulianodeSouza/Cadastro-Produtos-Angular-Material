import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/requests/produtos/product.service';
import { MessageService } from 'src/app/core/services/message/message.service';


@Component({
  selector: 'app-product-detalhes',
  templateUrl: './product-detalhes.component.html',
  styleUrls: ['./product-detalhes.component.scss']
})
export class ProductDetalhesComponent {

  public iProduct: Product;
  public iProductForm: FormGroup;

  constructor(
    private cProductService: ProductService,
    private cRouter: Router,
    private cRoute: ActivatedRoute,
    private cFormBuilder: FormBuilder,
    private cMessageService: MessageService
  ) {
    this.inst();
    this.config();
  }

  // funcao de inicializacao das variaveis de validacao
  private inst() {
    this.iProduct = {
      name: '',
      price: 0
    }

    this.iProductForm = this.cFormBuilder.group({
      name: ['', Validators.required],
      price: [null, Validators.required]
    });
  }

  // Carrega os dados
  public config() {
    const id = this.cRoute.snapshot.paramMap.get('id')
    this.cProductService.readById(id)
      .subscribe($return => {
        this.iProduct = $return;
      })
  }

  // Atualiza o produto
  updateProduct(): void {
    this.cProductService.update(this.iProduct).subscribe(() => {
      this.cMessageService.showMessage('Produto alterado com sucesso!')
      this.cRouter.navigate(['/produtos']);
    });
  }

  cancel(): void {
    this.cRouter.navigate(['/produtos']);
  }

}
