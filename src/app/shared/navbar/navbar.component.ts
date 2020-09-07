import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  nombreActiveUser: string;
  userSub: Subscription;
  
  constructor(private store: Store<AppState>) { }

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

}
