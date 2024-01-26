import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {Noticia} from "../../common/interfaces";
import {Router} from "@angular/router";
import {InfiniteScrollCustomEvent} from "@ionic/angular";
import {FiltroPipe} from "../../pipes/filtro.pipe";

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {
  textoBuscar = '';
  noticias: Noticia[] = [];
  noticiasAux: Noticia[] = [];

  constructor(private dataService: DataService, private router: Router, private filtropipe: FiltroPipe) { }

  ngOnInit() {
    this.loadNews()
  }

  buscar(event: any) {
    this.noticiasAux = []
    this.noticias = []
    this.textoBuscar = ''
    this.textoBuscar = event.detail.value;
    this.loadNews()
  }

  openDetails(noticia: Noticia) {
    this.router.navigate(['/detalle', noticia._id]);
  }

  async loadNews() {
    this.dataService.loadNews().subscribe({
      next: (value) => {
        this.noticias = this.sortNewsByDate(value);
        this.filterNews();

      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Complete');
      }
    });

      this.onIonInfinite()
  }

  private compareDates(dateA: string, dateB: string): number {
    const [dayA, monthA, yearA] = dateA.split('/').map(Number);
    const [dayB, monthB, yearB] = dateB.split('/').map(Number);

    const dateObjectA = new Date(yearA, monthA - 1, dayA);
    const dateObjectB = new Date(yearB, monthB - 1, dayB);

    return dateObjectB.getTime() - dateObjectA.getTime();
  }

  private sortNewsByDate(news: Noticia[]): Noticia[] {
    return news.sort((a, b) => this.compareDates(a.date, b.date));
  }

  onIonInfinite(event?: InfiniteScrollCustomEvent) {
    console.log('Cargando mas noticias...')
    setTimeout(() => {
      const noticiasRecargadas = this.noticias.splice(0,5);
      console.log('noticias recargadas ' + noticiasRecargadas)
      if (noticiasRecargadas.length > 0){
        this.noticiasAux.push(...noticiasRecargadas);
        console.log('noticias auxiliar ' + this.noticiasAux)
      }else{
        if (event){
          event.target.disabled = true;
        }
      }
      if (event){
        event.target.complete();
      }
    }, 1000)
  }

  private filterNews() {
    if (this.textoBuscar != null){
      this.noticiasAux = this.filtropipe.transform(this.noticias, this.textoBuscar)
    }
  }
}
