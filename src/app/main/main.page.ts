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

  public buttonArray: Array<any> = new Array([5],[5],[5]);
  public audioArray: Array<any> = new Array([5],[5],[5]);

  public audioSource: HTMLAudioElement = new Audio();

  public lang: string = '';
  public theme: string = '';
  
  constructor(private auth: AuthService, private router: Router, private alert: AlertService) { }

  ngOnInit() 
  {
    let arrayColors = ['../../assets/imagenes/colores/yellow.png',
    '../../assets/imagenes/colores/green.png',
    '../../assets/imagenes/colores/blue.jpeg',
    '../../assets/imagenes/colores/purple.png',
    '../../assets/imagenes/colores/red.jpeg'];

    let arrayAudios = ['assets/audios/english/colores/yellow.mp3',
    'assets/audios/english/colores/green.mp3',
    'assets/audios/english/colores/blue.mp3',
    'assets/audios/english/colores/purple.mp3',
    'assets/audios/english/colores/red.mp3'];
    
    this.buttonArray[0] = arrayColors;
    this.audioArray[0] = arrayAudios;
  }

  //boton cambiar idioma
  //boton cambiar tematica

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

  async onBtnPrincipal(i: number)
  {
      try 
      {
        const assetCompleto = `assets/audios/${this.lang}/${this.theme}/`;
        
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
