import { Component, OnInit } from '@angular/core';
import {Componentes, Section} from '../../common/interfaces';
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  componentes: Componentes[] = [];
  sections: Section[] = [];
  constructor(private dataService: DataService, private route: Router) { }

  ngOnInit() {
    this.cargarComponentes();
    this.getSections();
  }

  private cargarComponentes() {
    this.dataService.getComponentesMenu().subscribe(
      data=> {
        this.componentes = data;
      }
    )
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
}
