import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarPageRoutingModule } from './buscar-routing.module';

import { BuscarPage } from './buscar.page';
import {ComponentsModule} from "../../components/components.module";
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BuscarPageRoutingModule,
        ComponentsModule,
        PipesModule
    ],
  declarations: [BuscarPage]
})
export class BuscarPageModule {}
