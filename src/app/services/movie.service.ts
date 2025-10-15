import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  // Datos de muestra (en una aplicación real, estos vendrían de una API)
  private movies: Movie[] = [
    {
      id: 1,
      title: 'El Padrino',
      description: 'Don Vito Corleone, el respetado y temido jefe de una de las cinco familias de la mafia de Nueva York.',
      posterUrl: 'https://m.media-amazon.com/images/S/pv-target-images/dfdb14a922a0e909148038ae1b97a916581f00320b14a3a7b2f786c32c288342.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=UaVTIH8mujA',
      year: 1972,
      duration: '2h 55m',
      categories: [1, 2], // Drama, Crimen
      rating: 9.2
    },
    {
      id: 2,
      title: 'Interestelar',
      description: 'Un grupo de exploradores utilizan un agujero de gusano recién descubierto para superar las limitaciones de los viajes espaciales.',
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
      year: 2014,
      duration: '2h 49m',
      categories: [3, 4], // Ciencia ficción, Aventura
      rating: 8.6
    },
    {
      id: 3,
      title: 'El Caballero Oscuro',
      description: 'Batman se enfrenta a la mayor amenaza psicológica contra la ciudad de Gotham: el Joker.',
      posterUrl: 'https://www.aceprensa.com/wp-content/uploads/2012/07/49026-0.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
      year: 2008,
      duration: '2h 32m',
      categories: [2, 4, 5], // Crimen, Aventura, Acción
      rating: 9.0
    },
    {
      id: 4,
      title: 'Titanic',
      description: 'Las vidas de dos mafiosos, un boxeador, la esposa de un gángster y un par de bandidos se entrelazan en cuatro historias de violencia y redención.',
      posterUrl: 'https://es.web.img3.acsta.net/medias/nmedia/18/86/91/41/19870073.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=kVrqfYjkTdQ',
      year: 1994,
      duration: '2h 34m',
      categories: [8, 1], // Crimen, Drama
      rating: 9.9
    },
    {
      id: 5,
      title: 'Matrix',
      description: 'Un hacker descubre que lo que conocemos como realidad es parte de una simulación computacional.',
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BNGE1YzI4NzMtZTUxNi00Y2I5LTg2MmQtODE0NThmYTFmMDk0XkEyXkFqcGc@._V1_.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=vKQi3bBA1y8',
      year: 1999,
      duration: '2h 16m',
      categories: [3, 5], // Ciencia ficción, Acción
      rating: 8.7
    },
    {
      id: 6,
      title: 'Spiderman',
      description: 'Un ladrón especializado en el robo de secretos corporativos a través de la tecnología de compartir sueños.',
      posterUrl: 'https://conocedores.com/wp-content/uploads/2021/12/Spider-Man-3-No-Way-Home-Poster-scaled.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
      year: 2010,
      duration: '2h 28m',
      categories: [3, 5, 4], // Ciencia ficción, Acción, Aventura
      rating: 8.8
    },
    {
      id: 7,
      title: 'Spider-Man: No Way Home',
      description: 'Con la identidad de Spider-Man ahora revelada, Peter recurre al Doctor Strange en busca de ayuda, pero las cosas se complican cuando un hechizo sale mal.',
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
      year: 2021,
      duration: '2h 28m',
      categories: [3, 4, 5], // Ciencia ficción, Aventura, Acción
      rating: 8.5
    },
    {
      id: 8,
      title: 'Harry Potter y la Piedra Filosofal',
      description: 'Un niño huérfano se inscribe en una escuela de magia y hechicería, donde aprende la verdad sobre sí mismo, su familia y el terrible mal que acecha al mundo mágico.',
      posterUrl: 'https://m.media-amazon.com/images/I/71x1RHSaEhL._AC_UF1000,1000_QL80_.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=VyHV0BRtdxo',
      year: 2001,
      duration: '2h 32m',
      categories: [4, 6], // Aventura, Fantasía
      rating: 7.6
    },
    {
      id: 9,
      title: 'It',
      description: 'En el verano de 1989, un grupo de niños intimidados se unen para destruir a un monstruo cambiante, que se disfraza de payaso y se aprovecha de los niños de Derry, su pequeña ciudad de Maine.',
      posterUrl: 'https://es.web.img3.acsta.net/pictures/17/04/07/12/58/197841.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=xKJmEC5ieOk',
      year: 2017,
      duration: '2h 15m',
      categories: [7], // Terror
      rating: 7.3
    },
    {
      id: 10,
      title: 'Star Wars: El Despertar de la Fuerza',
      description: 'Treinta años después de la derrota del Imperio Galáctico, surge una nueva amenaza: la Primera Orden, y solo un grupo de héroes puede impedirles conquistar la galaxia.',
      posterUrl: 'https://es.web.img2.acsta.net/pictures/15/10/19/09/45/248618.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=sGbxmsDFVnE',
      year: 2015,
      duration: '2h 16m',
      categories: [3, 4, 5], // Ciencia ficción, Aventura, Acción
      rating: 7.8
    },
    {
      id: 11,
      title: 'Maze Runner: Correr o Morir',
      description: 'Thomas es depositado en una comunidad de chicos tras haber borrado su memoria, pronto aprende que están todos atrapados en un laberinto, y que deberá unirse a la comunidad para escapar.',
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BNTM4OTZlNzYtODA2NS00NmQ5LTg2OGQtN2ViZGE2YzE1ZGYwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=64-iSYVmMVY',
      year: 2014,
      duration: '1h 53m',
      categories: [3, 4, 5], // Ciencia ficción, Aventura, Acción
      rating: 6.8
    },
    {
      id: 12,
      title: 'Joker',
      description: 'En Gotham City, el comediante con problemas mentales Arthur Fleck es ignorado y maltratado por la sociedad. Luego emprende una espiral descendente de revolución y crímenes sangrientos que lo lleva cara a cara con su alter ego: el Joker.',
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=zAGVQLHvwOY',
      year: 2019,
      duration: '2h 2m',
      categories: [1, 2], // Drama, Crimen
      rating: 8.4
    },
    {
      id: 13,
      title: 'El lobo de Wall Street',
      description: 'Basada en la historia real de Jordan Belfort, desde su ascenso a un adinerado corredor de bolsa que vive la gran vida hasta su caída que involucra el crimen, la corrupción y el gobierno federal.',
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=iszwuX1AK6A',
      year: 2013,
      duration: '3h 0m',
      categories: [1, 2, 8], // Drama, Crimen, Comedia
      rating: 8.2
    },
    {
      id: 14,
      title: 'Amigos de armas',
      description: 'Dos amigos de la infancia se reúnen en Miami en sus veinte años y explotan un programa gubernamental poco conocido que arma a los pequeños negocios durante la guerra de Irak.',
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjEyNzQ0NzM4MV5BMl5BanBnXkFtZTgwMDI0ODM2OTE@._V1_.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=Rwh9c_E3dJk',
      year: 2016,
      duration: '1h 54m',
      categories: [1, 2, 8], // Drama, Crimen, Comedia
      rating: 7.1
    },
    {
      id: 15,
      title: 'Atrápame si puedes',
      description: 'Un agente del FBI persigue a Frank Abagnale Jr., quien antes de cumplir 19 años logró estafar millones de dólares haciéndose pasar por piloto, doctor y abogado.',
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTY5MzYzNjc5NV5BMl5BanBnXkFtZTYwNTUyNTc2._V1_.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=s-7pyIxz8Qg',
      year: 2002,
      duration: '2h 21m',
      categories: [1, 2, 4], // Drama, Crimen, Aventura
      rating: 8.1
    }
  ];

  constructor() { }

  getAllMovies(): Observable<Movie[]> {
    return of(this.movies);
  }

  getMovieById(id: number): Observable<Movie | undefined> {
    const movie = this.movies.find(m => m.id === id);
    return of(movie);
  }

  getMoviesByCategory(categoryId: number): Observable<Movie[]> {
    const filteredMovies = this.movies.filter(
      movie => movie.categories.includes(categoryId)
    );
    return of(filteredMovies);
  }
  searchMovies(query: string): Observable<Movie[]> {
  const lowerQuery = query.toLowerCase();
  const filtered = this.movies.filter(movie =>
    movie.title.toLowerCase().includes(lowerQuery) ||
    movie.description.toLowerCase().includes(lowerQuery)
  );
  return of(filtered);
}

}