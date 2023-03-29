import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path: 'article', component: ArticleComponent,  children:[{path: '', loadChildren:()=>import('./components/article/article.module').then((m)=>m.ArticleModule)}]},

  {path: 'profile', component: ProfileComponent,  children:[{path: '', loadChildren:()=>import('./components/profile/profile.module').then((m)=>m.ProfileModule)}]},

  {path: '', redirectTo: 'article', pathMatch: 'full',},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
