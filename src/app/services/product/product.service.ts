import { Injectable } from '@angular/core';
import { Product } from '../../entities/product/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productList : Product[];
  constructor() { 
    this.productList = [
      {id:1, name:"Laptop", price:1600},
      {id:2, name:"Mouse", price:60},
      {id:3, name:"Screen", price:500},
      {id:4, name:"Keyboard", price:30},
      {id:5, name:"Cable", price:20},
      {id:6, name:"Kit", price:10}
  
    ]
  }

  public getAll(): Observable<Product[]>{
    const randomNumber = Math.random();
    //if(randomNumber<0.5) throw Error();
    //console.log(this.productList);
    return of(this.productList);
  }
  public deleteById(id: number): Observable<boolean>{
    this.productList = this.productList.filter((p) => p.id != id);
    return of(true);
  }
}
