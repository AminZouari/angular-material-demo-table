import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Product } from '../../entities/product/product';
import { ProductService } from '../../services/product/product.service';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {  MatSelectModule } from '@angular/material/select';
import { AuthenticationService } from '../../services/authentication/authentication.service';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatSortModule,MatTableModule,MatPaginatorModule,
    MatIcon,MatButtonModule,MatInputModule,MatSelectModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
 
export class ProductsComponent implements OnInit, AfterViewInit {


  /** 
   * Data Properties
   */
  
  productData: Product[] = [];
  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['id', 'name', 'price'];
  clickedRows = new Set<Product>();
  filterSelected: string | undefined = undefined;
  /**
   * Design Properties
   */
  error = false;
  deleteButtonDisplay = false;

  constructor(private productService: ProductService,
     private _liveAnnouncer: LiveAnnouncer,
     public authService: AuthenticationService) {
      if(authService.roles?.includes('ADMIN')){
        this.displayedColumns.push('action')
      }
     }
  ngOnInit(): void {
    this.handleGetAll();
  
  }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
    this.productService.getAll().subscribe({
      next : (data) => {this.dataSource = new MatTableDataSource(data);this.productData=data;},
      error : (err) => this.error = true
    });
  }
  handleDelete(id: number){
    this.productService.deleteById(id).subscribe({
      next : () => {
      
          this.dataSource.data.splice(this.dataSource.data.findIndex((p)=>p.id == id),1);

          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
      error : (err) => this.error = true
    });
  }
  handleClick(){
    // console.log(this.dataSource.data);
    // console.log(this.filterSelected);
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
          case 'id':this.dataSource.data= this.productData.filter((p) => p.id==Number(filterInput)); break;
          case 'name':this.dataSource.data = this.productData.filter((p) => p.name.toLowerCase().includes(filterInput.toLowerCase()));break;
          case 'price': this.dataSource.data = this.productData.filter((p)=> p.price==Number(filterInput));
          
        }
       
      }
      else{
        this.dataSource.filter = filterInput;
      }
    else{
      this.dataSource.data=this.productData;
    }  
      
  }


}
