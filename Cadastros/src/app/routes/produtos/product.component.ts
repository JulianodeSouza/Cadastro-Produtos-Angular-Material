import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/requests/produtos/product.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { HeaderService } from 'src/app/shared/template/header/header.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  public iProducts: Product[]
  public iDisplayedColumns = ['id', 'name', 'price', 'action'];

  constructor(
    private cRouter: Router,
    private cHeaderService: HeaderService,
    private cProductService: ProductService,
    private cMessageService: MessageService
  ) {
    this.inst();
    this.config();
  }

  private inst() {
    this.cHeaderService.headerData = {
      title: 'Cadastro de Produtos',
      icon: 'storefront',
      routeUrl: '/products'
    }
  }

  // Carrega os dados
  public config() {
    this.cProductService.readProducts()
      .subscribe($result => {
        this.iProducts = $result;
      });
  }

  public removerProduto(id: string) {
    this.cProductService.deleteById(id).subscribe(() => {
      this.cMessageService.showMessage('Produto removido com sucesso!')
      this.config();
    }, err => {
      console.log(err);
      this.cMessageService.showMessage('Não foi possível remover o produto!')
    });
  }

  public editProduto(_Produto) {
    this.cRouter.navigate(["/detalhes/" + _Produto]);
  }

  navigateToProductCreate(): void {
    this.cRouter.navigate(['/adicionar'])
  }
}
