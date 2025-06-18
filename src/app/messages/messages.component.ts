import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';

@Component({
  template: `<div class="card">
    <div class="card-header">
      Messages
      <button class="btn btn-light btn-sm float-right" (click)="close()">
        X
      </button>
    </div>
    <div class="card-body">
      @for( message of messages; let i = $index; track i){
      <div>
        @if(i < 10){
        <div class="message-row">
          {{ message }}
        </div>
        }
      </div>
      }
    </div>
  </div>`,
  styles: ['.message-row { margin-bottom: 10px }'],
})
export class MessagesComponent {
  get messages(): string[] {
    return this.messageService.messages;
  }

  constructor(private messageService: MessageService, private router: Router) {}

  close(): void {
    // Close the popup.
    this.router.navigate([{outlets: {popup: null}}]);
    this.messageService.isDisplayed = false;
  }
}
