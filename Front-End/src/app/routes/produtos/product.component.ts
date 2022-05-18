import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/requests/product.service';
import { HeaderService } from 'src/app/shared/template/header/header.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: Product[]
  displayedColumns = ['id', 'name', 'price', 'action'];

  constructor(
    private router: Router,
    private headerService: HeaderService,
    private productService: ProductService,
    public dialog: MatDialog) {
    headerService.headerData = {
      title: 'Cadastro de Produtos',
      icon: 'storefront',
      routeUrl: '/products'
    }
  }

  ngOnInit(): void {
    this.consultarProdutos();
  }

  public consultarProdutos() {
    this.productService.readProducts()
      .subscribe($result => {
        this.products = $result;
      });
  }

  // getDialogById() {
  //   this.dialog.open();
  // }

  public removerProduto(id: string) {
    this.productService.deleteById(id).subscribe(() => {
      this.productService.showMessage('Produto removido com sucesso!')
      this.consultarProdutos();
    }, err => {
      console.log(err);
      this.productService.showMessage('Não foi possível remover o produto!')
    });
  }

  navigateToProductCreate(): void {
    this.router.navigate(['/adicionar'])
  }

}
