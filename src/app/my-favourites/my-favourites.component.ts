import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-my-favourites',
  templateUrl: './my-favourites.component.html',
  styleUrls: ['./my-favourites.component.scss']
})
export class MyFavouritesComponent implements OnInit {

  @Input() favourites: any = [];
  @Output() removeItem = new EventEmitter();

  searchText: any;
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

  constructor() { }

  ngOnInit(): void {
    this.favourites = [];
  }

  trackByFn(index:number, item:any) {
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

  removeFavouriteItem(id:any){
    this.removeItem.emit(id);
  }
}
