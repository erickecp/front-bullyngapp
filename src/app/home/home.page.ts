import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  getValueRoute() {
    const url = this.router.url;
    switch (url) {
      case '/home/institucion':
      case '/home/docentes':
      case '/home/grados':
      case '/home/acudientes':
      case '/home/estudiantes': return 'administrador';break;
      case '/home/anuncios': return 'blog';break;
      default:
        return 'administrador';
    }
  }

}
