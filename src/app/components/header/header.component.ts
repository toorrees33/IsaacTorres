import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  @Input() titulo!: string;
  @Input() showBackButton: boolean = true;
  constructor(private router: Router) { }

  ngOnInit() {}

  redirectToInicio() {
    this.router.navigate(['/inicio']);
  }

}
