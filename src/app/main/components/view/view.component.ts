import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  displayedColumns: string[] = ['title'];
  displayedColumns2: string[] = ['detail'];

  dataSource!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public detail_fld: {detail_fld: any},
    private dialogRef: MatDialogRef<ViewComponent>,
    private ds: DataService,
  ) { }

  ngOnInit(): void {
    this.getDetail()
  }

  articles: any = [];
  getDetail(){
    let detail = this.detail_fld;
    this.ds.request('getArticleDetail/'+detail, '', '', 'get').subscribe((res:any)=>{
      // console.log(res)
      this.dataSource = new MatTableDataSource(res);
      this.dataSource2 = new MatTableDataSource(res);
      this.articles = res;
    })
  }


}
