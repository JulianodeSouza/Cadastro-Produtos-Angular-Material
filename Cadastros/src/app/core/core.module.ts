import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { LoadingComponent } from './components/loading/loading.component';
import { MaterialModule } from './material/material.module';

// cria uma constante para que seja possível importar outros módulos que serão declarados de forma mais simples 
const MODULES = [
  MaterialModule
]

const COMPONENTS = [
  LoadingComponent
]

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule, MODULES],
  exports: [MODULES, COMPONENTS]

})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule já foi importado. Importe este módulo somente em AppModule.'
      );
    }
  }
}
