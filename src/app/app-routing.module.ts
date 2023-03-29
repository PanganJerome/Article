import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { MainModule } from './main/main.module';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, children:[{path: '', loadChildren:()=>import('./login/login.module').then((m)=>m.LoginModule)}]},
  {path: 'register', component: RegisterComponent, children:[{path: '', loadChildren:()=>import('./register/register.module').then((m)=>m.RegisterModule)}]},
  {path:'main', component: MainComponent, children:[{path: '', loadChildren:()=>import('./main/main.module').then((m)=>MainModule)}] },
  {path: '', redirectTo: 'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
