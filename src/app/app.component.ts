import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from './api.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import {MatDialog} from '@angular/material/dialog';
import { AddImageComponent } from './add-image/add-image.component';
import { ToastrService } from 'ngx-toastr';
import { Favourites } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'giphy-store-app';
  images: any[] = [];
  offset = 0;
  searchForm = this.fb.group({
    name: ['', Validators.required],
  });

  favourites: Favourites[] = [];

  constructor(
    private fb: FormBuilder, 
    private apiService:ApiService, 
    private IDBService:NgxIndexedDBService, 
    public dialog: MatDialog,
    private toastr: ToastrService) { 
    
  }
    
  ngOnInit() : void {
    this.getFavourites();
  }

  removeDB() : void {
    this.IDBService.deleteDatabase().subscribe((deleted:any) => {
      console.log('Database deleted successfully: ', deleted);
    });
  }

  onSubmit(){
    console.warn(this.searchForm.value);
    if(this.searchForm.get('name')?.value !== ''){
      let name = this.searchForm.get('name')?.value;
      this.images = [];
      this.callApi(name?name:'');
    }
  }

  callApi(q:string, limit:number = 20, offset: number = 0){
    this.apiService.searchAPI({
      q,
      limit,
      offset: offset ? offset+1 : 0
    }).subscribe((response:any)=>{
      if(response?.meta.status === 200){
        response?.data.map( (image: any) => {
          this.images.push(image);
        })   
        this.offset = offset + 20;
      } else {
        this.toastr.error('Oops! Something went wrong.');
      }
    },
    (error:any) => {
      this.toastr.error('Oops! Something went wrong.');
    })
  }

  onScroll(){
    console.log('scrolled');
      if(this.searchForm.get('name')?.value !== ''){
        let name = this.searchForm.get('name')?.value;
        this.callApi(name?name:'', 20, this.offset);
      }
  }

  trackByFn(index:number, item:any) {
    return item.id;
  }

  addToFavourite(image:Favourites){
    let dialogRef = this.dialog.open(AddImageComponent, {
      height: '80%',
      width: '60%',
      data: {
        ...image
      },
    });

    dialogRef.afterClosed().subscribe( (response:any) => {
      
        this.IDBService
        .add('giphy', {
          ...image,
          date: new Date(),
          name: response.name
        })
        .subscribe((key:any) => {
          console.log('key: ', key);
          this.toastr.success('Successfully added to my favourites.');
        });
        
      this.getFavourites();
    });
  }

  getFavourites(){
    this.IDBService.getAll('giphy').subscribe((images:any) => {
      console.log(images);
      this.favourites = images;
    });
  }

  removeFavourite(id:string){
    this.IDBService.delete('giphy', id).subscribe((images:any) => {
      console.log('all images:', images);
      this.toastr.success('Successfully removed from my favourites.');
    });
    this.getFavourites();
  }

  filterImages = (image: any): any => {
    return !this.favourites.find( (img:any) => img.id == image.id);
  }

}
