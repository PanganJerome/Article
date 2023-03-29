import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import { AddArticleComponent } from '../add-article/add-article.component';
import { ToastrService } from 'ngx-toastr';
import { ViewComponent } from '../view/view.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  displayedColumns: string[] = ['number','title', 'detail', 'action'];

  currentPage = 1;
  pageSize = 5;

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  userData: any;

  constructor(
    private dialog: MatDialog,
    private ds: DataService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getArticle();
  }

  AddArticle(){
    const dialogRef = this.dialog.open(AddArticleComponent,  {
      width: '70vh',
      maxWidth: '90vw',
    }).afterClosed().subscribe(res=>{
      if(res === 'save'){
        this.getArticle();
      //upadating or refreshing the page
        // this.getTeachers();
      }
    })
  }

  UpArticle(row: any){
    const dialogRef = this.dialog.open(AddArticleComponent,  {
      width: '70vh',
      maxWidth: '90vw',
      data: row,
    }).afterClosed().subscribe(res=>{
      if(res === 'update'){
      //upadating or refreshing the page
      this.getArticle();
      }
    })
  }

  getArticle(){
    let receiveData = sessionStorage.getItem('user') as unknown as string;
    // console.log(JSON.parse(receiveData));
    let getData: any = JSON.parse(receiveData);
    this.userData = getData.id;
    this.ds.request('getArticle/'+this.userData, '', '', 'get').subscribe((res:any)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      // console.log(res)
    })
  }


  getDetail(detail_fld: any){
    const dialogRef = this.dialog.open(ViewComponent,  {
      width: '70vh',
      maxWidth: '90vw',
      data: detail_fld,
    }).afterClosed().subscribe(res=>{
   
    })
  }

  onPageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
  }

  DeleArticle(id: number){
    Swal.fire({
      title: 'Are you sure want to delete?',
      text: 'You will not be able to recover this Article!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: 'rgb(48, 133, 214)',
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.ds.request('delArticle/', id.toString() ,'', 'delete').subscribe((res: any)=>{
              // alert("Deleted Successfully...")
              this.toast.success('Deleted Successfuly...')
              //upadating or refreshing the page
              this.getArticle()
            },); 
            (error :any)=> {
              this.toast.error('Error while Deleting...')
            // console.log(error)
          }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
       
      }
    })
  }
}
