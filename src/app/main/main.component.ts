import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  getData: any;
  isloading = false;

  constructor(
    private router: Router, 
    private ds: DataService,
  ) { }

  ngOnInit(): void {

    let receiveData = sessionStorage.getItem('user') as unknown as string;
    // console.log(JSON.parse(receiveData));
    this.getData = JSON.parse(receiveData);
    // console.log(getData);
  }

  home(){
    this.router.navigate(['main']);
  }
  toProfile(){
    this.router.navigate(['main/profile']);
  }
  logout(){
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'question',
      cancelButtonColor: '#DD6B55',
      confirmButtonColor: 'rgb(48, 133, 214)',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Logout',
    }).then((result) => {
      if (result.value) {
          this.isloading = true;
        this.ds.request('logout', '', '','post').subscribe((res: any )=>{
          sessionStorage.removeItem('user');
          sessionStorage.removeItem('token');
          this.router.navigate(['/login']);
      } )
    
      } else if (result.dismiss === Swal.DismissReason.cancel) {
    
      }
    })
  }

}
