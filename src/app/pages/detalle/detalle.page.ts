import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Noticia} from "../../common/interfaces";
import {DataService} from "../../services/data.service";
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  noticiaId!: string | null;
  noticia!: Noticia;
  mainPage: boolean = true;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.noticiaId = this.route.snapshot.paramMap.get('id');
    this.dataService.getNoticiaById(this.noticiaId).subscribe((noticia) => {
      this.noticia = noticia;

    });
  }

}
