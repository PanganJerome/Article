import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide =true;
  title = 'Article';
  isloading = false;
  constructor(
    private frmBuilder: FormBuilder,
    private ds: DataService,
    private router: Router,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
  }

   //form validation
   frmGroup: FormGroup = this.frmBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [null, [ Validators.required ]],
  });


  login(){
    this.isloading = true;
    if(this.frmGroup.valid){
      this.ds.request('login', '', this.frmGroup.value, 'post').subscribe((res: any)=>{
        // console.log(res);
        this.isloading = false;
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('user', JSON.stringify(res.user));
        // console.log(sessionStorage.getItem('user'));
        this.router.navigate(['main']);
        this.toast.success('Login Successfully','Login',{
          progressAnimation: 'decreasing',
          progressBar: true,
        })
      },(error: any)=>{
        this.isloading = false;
        // console.log(error);
        this.toast.error('Wrong username or password','Login Failed',{
          positionClass: "toast-center-center",
          timeOut: 2000,
        })
      })
    }
  }
  
  Toregister(){
    this.router.navigate(['register']);
  }
}
