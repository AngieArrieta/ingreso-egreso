import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {


  nombreActiveUser: string;
  userSub: Subscription;


  constructor(private _authService: AuthService, private router:Router, private store: Store<AppState>) { }

  ngOnInit() {
   this.userSub = this.store.select('user')
                  .pipe(
                    filter(({user})=>user!=null)
                  )
                  .subscribe( ({user}) => this.nombreActiveUser = user.nombre);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  logOut(){
    this._authService.logOut()
        .then(()=>{
          this.router.navigate(["/login"]);
        });
  }
}
