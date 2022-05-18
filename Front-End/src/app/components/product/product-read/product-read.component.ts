import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.scss']
})
export class ProductReadComponent implements OnInit {

  products: Product[]
  displayedColumns = ['id', 'name', 'price', 'action'];

  constructor(private productService: ProductService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.consultarProdutos();
  }

  public consultarProdutos() {
    this.productService.readProducts().subscribe(products => {
      this.products = products;
      console.log(products);

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

}
