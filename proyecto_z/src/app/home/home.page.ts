import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  anunciosP = [
    {
      imagen: 'https://pbs.twimg.com/media/DbKA7VjXcAAksk4.jpg',
      titulo: 'Anuncio 1',
      fecha: '20/03/2024',
      contenido: 'Nueva publicidad a la nueva película de #DragonBallSuper'
    },
    {
      imagen: 'https://pbs.twimg.com/media/DbKA7VjXcAAksk4.jpg',
      titulo: 'Anuncio 2',
      fecha: '20/03/2024',
      contenido: 'Nueva publicidad a la nueva película de #DragonBallSuper'
    },
  ];

  anunciosL = [
    {
      imagen: 'https://es.dragon-ball-official.com/dragonball/es/news/2024/05/DBSD_WEB_banner_ES.jpg?_=1724274900',
      titulo: 'Anuncio Largo 1',
      fecha: '20/03/2024',
      contenido: '¡Anuncio de nuevo proyecto! ¡Le preguntamos al productor Akai sobre Dragon Ball Super Divers!'
    },
    {
      imagen: 'https://es.dragon-ball-official.com/dragonball/es/news/2024/05/DBSD_WEB_banner_ES.jpg?_=1724274900',
      titulo: 'Anuncio Largo 2',
      fecha: '20/03/2024',
      contenido: '¡Anuncio de nuevo proyecto! ¡Le preguntamos al productor Akai sobre Dragon Ball Super Divers!'
    },

  ];

}
