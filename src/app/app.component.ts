import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   loginForm: FormGroup;
  messageForm: FormGroup;
  messages: any = [];
  
  constructor(private formbuilder: FormBuilder, private http: HttpClient) {
   
  }
  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      'username': ['', Validators.required]
    });
    this.messageForm = this.formbuilder.group({
      'message': ['', Validators.required]
    });
    this.getMessages();
    this.repeatCall()
  }
  loggedIn()
  {
    return sessionStorage.username ? true : false;
  }
  login()
  {
    sessionStorage.setItem('username', this.loginForm.controls.username.value);
    this.getMessages();
  }
  getMessages()
  {
    this.http.get("http://49.207.126.203/api/messages").subscribe(resp => {
      this.messages = resp;
    });
  }
  postMessage()
  {
    let postObj : any = {
      "username": sessionStorage.username,
      "message": this.messageForm.controls.message.value
    }
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        })
    };
    this.http.post("http://49.207.126.203/api/messages", postObj, httpOptions).subscribe(resp => {
      this.getMessages();
      this.messageForm.reset();
    });
  }
  repeatCall() {
    setInterval(
      ()=>{
      this.getMessages(); },1000);
  }
}