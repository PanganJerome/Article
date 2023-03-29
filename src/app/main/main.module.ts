import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { ArticleComponent } from './components/article/article.component';
import { MaterialModules } from '../modules/material.module';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ProfileComponent } from './components/profile/profile.component';
import { ViewComponent } from './components/view/view.component'

@NgModule({
  declarations: [
    ArticleComponent,
    AddArticleComponent,
    ProfileComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModules,
    LazyLoadImageModule,
  ]
})
export class MainModule { }
