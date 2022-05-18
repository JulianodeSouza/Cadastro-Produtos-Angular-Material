import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/requests/product.service';


@Component({
  selector: 'app-product-detalhes',
  templateUrl: './product-detalhes.component.html',
  styleUrls: ['./product-detalhes.component.scss']
})
export class ProductDetalhesComponent implements OnInit {

  public iProduct: Product;
  public productForm: FormGroup;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute, private FormBuilder: FormBuilder) {
    this.productForm =this.FormBuilder.group({
      name: ['', Validators.required],
      price: [null, Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.readById(id).subscribe(product => {
      this.iProduct = product;
    })
  }

  updateProduct(): void {
    this.productService.update(this.iProduct).subscribe(() => {
      this.productService.showMessage('Produto alterado com sucesso!')
      this.router.navigate(['/products']);
    })

  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

}
