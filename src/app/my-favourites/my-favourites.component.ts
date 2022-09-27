import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Favourites } from '../types';

@Component({
  selector: 'app-my-favourites',
  templateUrl: './my-favourites.component.html',
  styleUrls: ['./my-favourites.component.scss']
})
export class MyFavouritesComponent implements OnInit {

  @Input() favourites: Favourites[] = [];
  @Output() removeItem = new EventEmitter();

  searchText: string = '';
  sortByValues = [
    {
      value: 'name',
      order: 'desc'
    },
    {
      value: 'name',
      order: 'asc'
    },
    {
      value: 'date',
      order: 'desc'
    },
    {
      value: 'date',
      order: 'asc'
    }
  ]

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.favourites = [];
  }

  trackByFn(index:number, item:Favourites) {
    return item.id;
  }
  
  filterFavourites = (image: any): any => {
    if (this.searchText == null) return true;

    return image.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1  ||
    image.date.toString().toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
  }

  sort(property:any) {
    let isDesc = property.order == 'desc'?true: false;  //change the direction    
    let direction = isDesc ? 1 : -1;

    this.favourites.sort( (a:any, b:any) => {
      if (a[property.value] < b[property.value]) {
        return -1 * direction;
      }
      else if (a[property.value] > b[property.value]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
  };
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.favourites, event.previousIndex, event.currentIndex);
  }

  removeFavouriteItem(id:string){
    this.removeItem.emit(id);
  }

  downloadImage(url:string, name: string){
    this.http.get(url, { responseType: 'blob' }).subscribe((val:any) => {
      console.log(val);
      const url = URL.createObjectURL(val);
      this.downloadUrl(url, name);
      URL.revokeObjectURL(url);
    });
  }

  downloadUrl(url: string, fileName: string) {
    const a: any = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
  };
}
