import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Componentes, Noticia, Section} from "../common/interfaces";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = environment.baseUrl;
  private noticias: Noticia[] = [];

  constructor(private http: HttpClient) { }
  getComponentesMenu(): Observable<Componentes[]>{
    return this.http.get<Componentes[]>("/assets/data/menu.json")
  }

  getSections(): Observable<Section[]> {
    return this.http.get<Section[]>(this.baseUrl + '/allsections');
  }


  loadNews(): Observable<Noticia[]>{
    return this.http.get<Noticia[]>('http://localhost:3000/api/news');
  }

  getNoticiasBySeccion(seccion: string): Observable<Noticia[]>{
    return this.http.get<Noticia[]>(this.baseUrl+'/bysection/'+seccion)
  }

  getNoticiaById(id: string | null): Observable<Noticia> {
    if (id !== null && id !== undefined) {
      const noticiaEncontrada = this.noticias.find((noticia) => noticia._id === id);

      if (noticiaEncontrada) {
        return new Observable((observer) => {
          observer.next(noticiaEncontrada);
          observer.complete();
        });
      } else {
        return this.http.get<Noticia>(`${this.baseUrl}/article/${id}`);
      }
    } else {
      return new Observable((observer) => {
        observer.complete();
      });
    }
  }
}

