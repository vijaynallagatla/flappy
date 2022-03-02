import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlappyComponent } from './flappy/flappy.component';

const routes: Routes = [
  {
    path: "",
    component: FlappyComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
