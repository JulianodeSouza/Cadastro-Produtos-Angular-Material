import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EMPTY, Observable } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { LoadingService } from "../../services/loading/loading.service";
import { MessageService } from "../../services/message/message.service";
import { Product } from "../../models/product.model";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  urlBack = "http://localhost:3001/products";

  constructor(
    private cHttp: HttpClient,
    private cLoadingService: LoadingService,
    private cMessageService: MessageService
  ) { }

  // Método para Cadastrar Produtos
  create(product: Product): Observable<Product> {
    this.cLoadingService.mostraLoading();
    return this.cHttp.post<Product>(this.urlBack, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHendler(e)),
      finalize(() => this.cLoadingService.escondeLoading())
    );
  }

  // Método para buscar os produtos cadastrados
  readProducts(): Observable<Product[]> {
    this.cLoadingService.mostraLoading();
    return this.cHttp.get<Product[]>(this.urlBack).pipe(
      map(obj => obj),
      catchError(e => this.errorHendler(e)),
      finalize(() => this.cLoadingService.escondeLoading())
    );
  }

  // Método para editar produtos
  update(product: Product): Observable<Product> {
    this.cLoadingService.mostraLoading();
    const urlBack = `${this.urlBack}/${product.id}`
    return this.cHttp.put<Product>(urlBack, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHendler(e)),
      finalize(() => this.cLoadingService.escondeLoading())
    );
  }
  // Busca os produtos na tela de edição pelo ID
  readById(id: string): Observable<Product> {
    this.cLoadingService.mostraLoading();
    const urlBack = `${this.urlBack}/${id}`
    return this.cHttp.get<Product>(urlBack).pipe(
      map(obj => obj),
      catchError(e => this.errorHendler(e)),
      finalize(() => this.cLoadingService.escondeLoading())
    );
  }

  // Método para exclusão de produtos
  deleteById(id: string): Observable<Object> {
    this.cLoadingService.mostraLoading();
    const urlBack = `${this.urlBack}/${id}`
    return this.cHttp.delete(urlBack).pipe(
      map(obj => obj),
      catchError(e => this.errorHendler(e)),
      finalize(() => this.cLoadingService.escondeLoading())
    );
  }

  // Mensagem de erro
  errorHendler(e: any): Observable<any> {
    this.cLoadingService.mostraLoading();
    console.log(e);
    this.cMessageService.showMessage("Erro ao tentar conectar com o banco.", true);
    this.cLoadingService.escondeLoading();
    return EMPTY
  }

}
