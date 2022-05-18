import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { EMPTY, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Product } from "../models/product.model";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  urlBack = "http://localhost:3001/products";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  // Mostrar pop-up ao concluir ações
  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(
      msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
      panelClass: isError ? ["msg-error"] : ["msg-success"]

    });
  }

  // Método para Cadastrar Produtos
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.urlBack, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHendler(e))
    );
  }

  // Método para buscar os produtos cadastrados
  readProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.urlBack).pipe(
      map(obj => obj),
      catchError(e => this.errorHendler(e))
    );
  }

  // Método para editar produtos
  update(product: Product): Observable<Product> {
    const urlBack = `${this.urlBack}/${product.id}`
    return this.http.put<Product>(urlBack, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHendler(e))
    );
  }
  // Busca os produtos na tela de edição pelo ID
  readById(id: string): Observable<Product> {
    const urlBack = `${this.urlBack}/${id}`
    return this.http.get<Product>(urlBack).pipe(
      map(obj => obj),
      catchError(e => this.errorHendler(e))
    );

  }

  // Método para exclusão de produtos
  deleteById(id: string): Observable<Object> {
    const urlBack = `${this.urlBack}/${id}`
    return this.http.delete(urlBack).pipe(
      map(obj => obj),
      catchError(e => this.errorHendler(e))
    );
  }

  // Mensagem de erro
  errorHendler(e: any): Observable<any> {
    console.log(e);
    this.showMessage("Erro ao tentar conectar com o banco.", true);
    return EMPTY
  }

}
