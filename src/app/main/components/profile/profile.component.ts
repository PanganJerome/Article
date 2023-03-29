import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmedValidator } from 'src/app/register/confirmed.validator';
import { DataService } from 'src/app/services/data.service';

// custom validator function
function letterValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const lettersRegex = /^[a-zA-Z\s-ñÑ]+$/;
  if (control.value && !lettersRegex.test(control.value)) {
    return { invalidLetters: true };
  }
  return null;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  hide =true;
  isloading = false;
  getData: any;
  selectedFile!: string;
  files: any =[];
  fileChange: any;

  constructor(
    private frmBuilder: FormBuilder,
    private ds: DataService,
    private router: Router,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {

    let receiveData = sessionStorage.getItem('user') as unknown as string;
    // console.log(JSON.parse(receiveData));
    this.getData = JSON.parse(receiveData);
// console.log(this.getData.id)
    this.frmGroup.patchValue({
      name: this.getData.name, 
      lastname: this.getData.lastname,
      email: this.getData.email,
    });
    
  }

  frmGroup: FormGroup = this.frmBuilder.group({
    name: [null, [Validators.required,letterValidator]], 
    lastname: [null, [Validators.required,letterValidator]],
    email: ['', [Validators.required, Validators.email]],
    profile_fld: [''],
    password: [null, [ Validators.required,Validators.minLength(8),Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')] ],
    password_confirmation: [null,Validators.required,], 
  },{
    validator: ConfirmedValidator('password', 'password_confirmation')
  } );
  
  // onFile(event: any){
  //   // get image preview
  //   const reader = new FileReader();
  //   if(event.target.files && event.target.files.length) {
  //     const [profile_fld] = event.target.files;
  //     reader.readAsDataURL(profile_fld);
  //     // console.log( picture);
  //     reader.onload = () => {
  //      this.selectedFile = reader.result as string;
  //      this.fileChange = true;
  //      this.frmGroup.patchValue({profile_fld: reader.result})
  //     //  console.log(this.frmGroup.get('profile_fld'));
    
  //     };
  //   }
  //   //store file to global variable
  //   this.files = event.target.files;
  //     // console.log(this.files);
  //   }

  update(){
    this.isloading = true;
    if(this.frmGroup.valid){
      this.ds.request('updateUser/',this.getData.id, this.frmGroup.value, 'put').subscribe((res: any)=>{
        // console.log(res);
        this.isloading = false;
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        this.router.navigate(['login']);
 
      })
    }
  }

  ToLogin(){
    this.router.navigate(['login']);
  }
}
