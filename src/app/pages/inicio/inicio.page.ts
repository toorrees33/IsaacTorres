import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Componentes, Noticia} from "../../common/interfaces";
import {InfiniteScrollCustomEvent, LoadingController, NavController} from "@ionic/angular";
import {Router} from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  mainPage: boolean = false;
  componentes: Componentes[] = [];
  noticias: Noticia[] = [];
  noticiasAux: Noticia[] = [];
  constructor(private dataService: DataService, private router: Router, private navCtrl: NavController, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.cargarComponentes();
    this.loadNews();
  }

  goToBuscar() {
    this.navCtrl.navigateForward('/buscar');
  }

  private cargarComponentes() {
    this.dataService.getComponentesMenu().subscribe(
      data=> {
        this.componentes = data;
      }
    )
  }

  private loadNews() {
    this.dataService.loadNews().subscribe({
      next: (value) => {
        this.noticias = this.sortNewsByDate(value);
        this.onIonInfinite()
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Complete');
      }
    });
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

  openDetails(noticia: Noticia) {
    this.router.navigate(['/detalle', noticia._id]);
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
}



