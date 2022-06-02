import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private cSnackBar: MatSnackBar,
  ) { }

  // Mostrar pop-up ao concluir ações
  public showMessage(msg: string, isError: boolean = false): void {
    this.cSnackBar.open(
      msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
      panelClass: isError ? ["msg-error"] : ["msg-success"]

    });
  }

  public pop() {
    Swal.fire({
      title: "Aviso!",
      text: '',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sim',
      showDenyButton: true,
      denyButtonText: 'Cancelar',
    })
  }














}
