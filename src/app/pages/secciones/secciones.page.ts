import { Component, OnInit } from '@angular/core';
import {Noticia, Section} from "../../common/interfaces";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {InfiniteScrollCustomEvent, NavController} from "@ionic/angular";

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.page.html',
  styleUrls: ['./secciones.page.scss'],
})
export class SeccionesPage implements OnInit {
  section!: string;
  mainPage: boolean = true;
  noticias: Noticia[] = [];
  sections: Section[] = [];
  noticiasAux: Noticia[] = [];

  constructor(private dataService: DataService, private route: Router, private navCtrl: NavController) { }

  ngOnInit() {
    this.getSections()
    this.getUltimoValorDelPath()
    this.loadNewsBySection()
  }

  goToBuscar() {
    this.navCtrl.navigateForward('/buscar');
  }

  getUltimoValorDelPath() {
    const rutaActual = this.route.url;
    const segmentos = rutaActual.split('/');
    const ultimoValor = segmentos.pop();

    if (ultimoValor != null){
      this.section = ultimoValor;
    }

    console.log('Último valor del path:', ultimoValor);
  }

  private loadNewsBySection() {
    this.dataService.getNoticiasBySeccion(this.section).subscribe({
      next: (value) => {
          this.noticias = this.sortNewsByDate(value);
          this.onIonInfinite();
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Complete');
      }
    });
  }

  openDetails(noticia: Noticia) {
    this.route.navigate(['/detalle', noticia._id]);
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

  private getSections() {
    this.dataService.getSections().subscribe(
        {
          next: value => {
            this.sections = value;
          },
          error: err => {
            console.error(err);
          },
          complete: () => {
            console.log('Complete');
          }
        }
    )
  }

  goToSection(name: string) {
    this.route.navigate(['bySection/',name]);
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

}
