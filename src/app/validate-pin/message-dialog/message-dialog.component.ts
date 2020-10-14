import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {
  icon: string;
  color: string;
  title: string;
  message: string;
  buttonLabel: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.icon = this.data.icon;
    this.color = this.data.color;
    this.title = this.data.title;
    this.message = this.data.message;
    this.buttonLabel = this.data.buttonLabel;
  }

}
