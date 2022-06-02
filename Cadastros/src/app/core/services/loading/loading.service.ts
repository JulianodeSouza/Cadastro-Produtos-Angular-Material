import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$: Observable<boolean> = this.loadingSubject.asObservable(); // Cria um observable e atribui a ele somente o observable do Behavior para que seja possível "enxergar" o loading$ e não o loadingSubject.

  public mostraLoading() {
    this.loadingSubject.next(true);
  }

  public escondeLoading() {
    this.loadingSubject.next(false);
  }
}
