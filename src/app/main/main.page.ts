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

  audioSource: HTMLAudioElement = new Audio();

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

    let sf = new Audio();
  }

  //boton cambiar idioma
  //boton cambiar tematica

  async onBtnPrincipal(i: number)
  {
    console.log(this.audioSource.paused);
    if(this.audioSource.paused) //Espera mucho...
    {
      try 
      {
        const assetCompleto = this.audioArray[0][i]; //CAMBIAR POR VARIABLE
        
        const audioElement = await this.loadAudio(assetCompleto);

        if(!audioElement.paused) //Nunca se dispara
        {
          console.log(audioElement);
          return;
        }

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
    console.log(this.audioSource.paused);

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
