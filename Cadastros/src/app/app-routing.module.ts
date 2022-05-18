import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./routes/home/home.component";
import { ProductAddComponent } from "./routes/produtos/product-add/product-add.component";
import { ProductDetalhesComponent } from "./routes/produtos/product-detalhes/product-detalhes.component";
import { ProductComponent } from "./routes/produtos/product.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "produtos", component: ProductComponent },
  { path: "adicionar", component: ProductAddComponent },
  { path: "detalhes/:id", component: ProductDetalhesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
