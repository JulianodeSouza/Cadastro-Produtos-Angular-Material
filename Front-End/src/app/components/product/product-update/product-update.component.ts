import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {

  product: Product;
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
      this.product = product;
    })
  }

  updateProduct(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('Produto alterado com sucesso!')
      this.router.navigate(['/products']);
    })

  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

}
