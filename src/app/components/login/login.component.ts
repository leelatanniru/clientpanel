import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, Route } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authservice: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService

  ) { }

  ngOnInit() {
    this.authservice.getAuth().subscribe(auth => {
      if(auth){
        this.router.navigate(['/']);
      }
    });
  }
  onSubmit() {
    this.authservice.Login(this.email,this.password).then(res => {
      this.flashMessagesService.show('You are now loggedin', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/']);
    })
    .catch(err => {
      this.flashMessagesService.show(err.message, { cssClass: 'alert-danger', timeout: 4000 });
    });

  }

}
