import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { ConfirmedValidator } from './confirmed.validator';

// custom validator function
function letterValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const lettersRegex = /^[a-zA-Z\s-ñÑ]+$/;
  if (control.value && !lettersRegex.test(control.value)) {
    return { invalidLetters: true };
  }
  return null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  title = 'Article';
  isloading = false;
  
  constructor(
    private frmBuilder: FormBuilder,
    private ds: DataService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  //form validation
  frmGroup: FormGroup = this.frmBuilder.group({
    name: [null, [Validators.required, letterValidator]], 
    lastname: [null, [Validators.required, letterValidator]],
    email: ['', [Validators.required, Validators.email]],
    password: [null, [ Validators.required, Validators.minLength(8),Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')] ],
    password_confirmation: [null, [Validators.required]], 
  },{
    validator: ConfirmedValidator('password', 'password_confirmation')
  } );


  register(){
    this.isloading = true;
    if(this.frmGroup.valid){
      this.ds.request('register', '', this.frmGroup.value, 'post').subscribe((res: any)=>{
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('user', JSON.stringify(res.user));
        this.isloading = false;
        this.router.navigate(['main']);
        // console.log(res);
      })
    }
  }

  ToLogin(){
    this.router.navigate(['login']);
  }
  
}
