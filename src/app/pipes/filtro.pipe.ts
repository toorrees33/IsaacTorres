import {Injectable, Pipe, PipeTransform} from '@angular/core';
@Injectable({
  providedIn: 'root',
})
@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  public transform(noticias: any[], texto: string): any[] {

    if(texto === ''){
      return noticias;
    }
    texto = texto.toLowerCase();

    const titleFilter = noticias.filter(item => item['title'].toLowerCase().includes(texto));
    const authorFilter = noticias.filter(item => item['author'].toLowerCase().includes(texto));

    const resultadosCombinados = [...titleFilter, ...authorFilter];

    return resultadosCombinados;

  }

}
