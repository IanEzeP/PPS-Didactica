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

  public lang: string = 'spanish';
  public theme: string = 'colores';
  public controlTheme: number = 0;

  public buttonArray: Array<any> = new Array([5],[5],[5]);

  public audioSource: HTMLAudioElement = new Audio();

  constructor(private auth: AuthService, private router: Router, private alert: AlertService) { }

  ngOnInit() 
  {
    let arrayColors = [{ path: 'assets/imagenes/colores/yellow.png', name: 'yellow'},
      { path: 'assets/imagenes/colores/green.png', name: 'green'},
      { path: 'assets/imagenes/colores/blue.jpeg', name: 'blue'},
      { path: 'assets/imagenes/colores/purple.png', name: 'purple'},
      { path: 'assets/imagenes/colores/red.jpeg', name: 'red'}
    ];
    let arrayNumbers = [{ path: 'assets/imagenes/numeros/one.png', name: 'one'},
      { path: 'assets/imagenes/numeros/two.png', name: 'two'},
      { path: 'assets/imagenes/numeros/three.png', name: 'three'},
      { path: 'assets/imagenes/numeros/four.png', name: 'four'},
      { path: 'assets/imagenes/numeros/five.png', name: 'five'}
    ];
    let arrayAnimals = [{ path: 'assets/imagenes/colores/yellow.png', name: 'yellow'},
      { path: 'assets/imagenes/colores/green.png', name: 'green'},
      { path: 'assets/imagenes/colores/blue.jpeg', name: 'blue'},
      { path: 'assets/imagenes/colores/purple.png', name: 'purple'},
      { path: 'assets/imagenes/colores/red.jpeg', name: 'red'}
    ];

    this.buttonArray[0] = arrayColors;
    this.buttonArray[1] = arrayNumbers;
    this.buttonArray[2] = arrayAnimals;
  }

  onChangeLang(lang: number)
  {
    switch (lang)
    {
      case 0:
        this.lang = 'spanish';
        break;
      case 1:
        this.lang = 'english';
        break;
      case 2:
        this.lang = 'portugues';
        break;
    }
  }

  onChangeTheme(theme: number)
  {
    this.controlTheme = theme;
    switch (theme)
    {
      case 0:
        this.lang = 'colores';
        break;
      case 1:
        this.lang = 'numeros';
        break;
      case 2:
        this.lang = 'animales';
        break;
    }
  }

  async onBtnPrincipal(name: string)
  {
    try 
    {
      const assetCompleto = `assets/audios/${this.lang}/${this.theme}/${name}.mp3`;
      
      const audioElement = await this.loadAudio(assetCompleto);

      audioElement.play().then(() => {
        console.log('Audio reproduciendo...');
      }).catch((error) => {
        console.error('Error al reproducir ', error);
      });
    }
    catch (error) 
    {
      console.error('Error al cargar ', error);
    }
  }

  async loadAudio(url: string): Promise<HTMLAudioElement>
  {
    return new Promise((resolve, reject) => {
      this.audioSource.src = url;
      this.audioSource.addEventListener('canplaythrough', () => resolve(this.audioSource));
      this.audioSource.onerror = () => reject(new Error('Error loading audio: ' + url));
    })
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
