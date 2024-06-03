import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  public buttonArray: Array<string> = new Array(5);

  constructor(private auth: AuthService, private router: Router, private alert: AlertService) { }

  ngOnInit() 
  {
    this.buttonArray = ['../../assets/imagenes/colores/yellow.png',
    '../../assets/imagenes/colores/green.png',
    '../../assets/imagenes/colores/blue.jpeg',
    '../../assets/imagenes/colores/magenta.png',
    '../../assets/imagenes/colores/red.jpeg'];
  }

  //boton cambiar idioma
  //boton cambiar tematica

  onBtnPrincipal()
  {
    //Reproducir audio
    //npm install @capacitor-community/native-audio No funcionó. Probar con web audio
  }

  cerrarSesion()
  {
    Swal.fire(
      {
        heightAuto: false,
        title: "¿Desea cerrar su sesión?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#3085d6",
        confirmButtonColor: "#d33",
        confirmButtonText: "Cerrar",
        cancelButtonText: "Cancelar"
      }
    ).then((result) => {
      if (result.isConfirmed) {
        this.auth.logOut().then(() => {
          this.router.navigateByUrl('/login');
        });
      }
    });
  }
}
