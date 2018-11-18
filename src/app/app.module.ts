import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BoardModule} from "./components/board/board.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BoardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
