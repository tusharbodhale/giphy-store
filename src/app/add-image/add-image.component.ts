import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

export interface DialogData {
  url: string;
}

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent implements OnInit {

  saveForm = this.fb.group({
    name: ['', Validators.required],
  });
  constructor(
    public dialogRef: MatDialogRef<AddImageComponent>,
    @Inject(MAT_DIALOG_DATA) public img: DialogData,
    private fb: FormBuilder) {}

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close({name: this.saveForm.get('name')?.value});
  }
}
