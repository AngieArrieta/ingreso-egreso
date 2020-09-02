import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(private _authService: AuthService, private router:Router) { }

  ngOnInit() {
  }

  logOut(){
    this._authService.logOut()
        .then(()=>{
          this.router.navigate(["/login"]);
        });
  }
}
