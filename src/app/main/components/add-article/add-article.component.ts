import { Component, Inject, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

  updateBtn: string = "save";
  userData: any;

  constructor(
    // private toast: ToastrService,
    private ds: DataService,
    private frmBuilder: FormBuilder,
    private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editArticle: any,
    private dialogRef: MatDialogRef<AddArticleComponent> 
  ) { }

  ngOnInit(): void {

    if(this.editArticle){
      this.updateBtn = "update";
      this.frmGroup.patchValue({
        title_fld: this.editArticle.title_fld,
        detail_fld: this.editArticle.detail_fld,
      })
    }
  }

  frmGroup: FormGroup = this.frmBuilder.group({
    title_fld: ['', Validators.required],
    detail_fld: ['', Validators.required],
    user_id: [''],
  });
  
  OnAddAddArticle(){
    if(!this.editArticle){
      let receiveData = sessionStorage.getItem('user') as unknown as string;
      // console.log(JSON.parse(receiveData));
      let getData = JSON.parse(receiveData);
      // this.userData = getData.id;
      this.frmGroup.patchValue({user_id: getData.id });
      // console.log(this.userData);
    if(this.frmGroup.valid){
      this.ds.request('StoreArticle','',this.frmGroup.value, 'post').subscribe((res:any)=>{
        // console.log(res);
        this.frmGroup.reset();
        this.dialogRef.close('save');
      }),  
      (error: any)=>{console.log(error)}
    }
  }else{
    this.UpArticle()
  }
  }

  UpArticle(){
    let receiveData = sessionStorage.getItem('user') as unknown as string;
    // console.log(JSON.parse(receiveData));
    let getData: any = JSON.parse(receiveData);
    this.userData = getData.id;
    this.frmGroup.patchValue({user_id: this.userData });
    this.ds.request('updateArticle/',this.editArticle.id, this.frmGroup.value, 'put').subscribe((res: any)=>{
      // console.log(res)
      this.toast.success('Updated Successfuly...')
      this.frmGroup.reset();
      this.dialogRef.close('update');
    },
    (error: any)=>{console.log(error)}
    );
  }
}
