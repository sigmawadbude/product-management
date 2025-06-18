import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class MessageService {
  private _messages: string[] = [];

  get messages(): string[] {
    return this._messages;
  }

  addMessage(message: string) {
    this._messages.unshift(message + ' at ' + new Date().toLocaleString());
  }
}