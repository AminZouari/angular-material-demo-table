import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {  MatSelectModule } from '@angular/material/select';
import { Todo } from '../../../entities/todo/todo';
import { TodoService } from '../../../services/todo/todo.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { USER_API } from '../../../constants/constant-api';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-table',
  standalone: true,
  imports: [MatSortModule,MatTableModule,MatPaginatorModule,
    MatIcon,MatButtonModule,MatInputModule,MatSelectModule],
  templateUrl: './todo-table.component.html',
  styleUrl: './todo-table.component.css'
})
export class TodoTableComponent {


  /** 
   * Data Properties
   */
  
  subscription!: Subscription;
  todotData: Todo[] = [];
  dataSource = new MatTableDataSource<Todo>();
  displayedColumns: string[] = ['id', 'title', 'completed'];
  filterSelected: string | undefined = undefined;
  /**
   * Design Properties
   */
  error = false;
  deleteButtonDisplay = false;

  constructor(private todoService: TodoService,
     private _liveAnnouncer: LiveAnnouncer,
     public authService: AuthenticationService,
      private router: Router) {
     }
  ngOnInit(): void {
    if(this.authService.roles?.includes('ADMIN')) this.displayedColumns.push('view-user')
    this.handleGetAll();
  
  }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  handleGetAll(){
    this.subscription = this.todoService.getAll().subscribe({
      next : (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.todotData=data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error : (err) => this.error = true
    });
  }
 
  handleViewUser(id :number){
    this.router.navigateByUrl(`admin/users/${id}`);
  } 
  handleFilterSelect(value: string){
    this.filterSelected = value;
  }
  handleFilterSearch(event: Event) {
    const filterInput = (event.target as HTMLInputElement). value;
    this.dataSource.filter = filterInput;
    if(filterInput.length>0)
      if(this.filterSelected){
        switch(this.filterSelected){
          case 'id':this.dataSource.data= this.todotData.filter((p) => p.id===Number(filterInput)); break;
          case 'title':this.dataSource.data = this.todotData.filter((p) => p.title.toLowerCase().includes(filterInput.toLowerCase()));break;
          case 'completed': this.dataSource.data = this.todotData.filter((p)=> String(p.completed)===filterInput.toLowerCase());
          
        }
       
      }
      else{
        this.dataSource.filter = filterInput;
      }
    else{
      this.dataSource.data=this.todotData;
    }  
      
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
