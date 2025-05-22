import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthLoginService } from '../../services/auth/auth-login.service';
import { AuthLogoutService } from '../../services/auth/auth-logout.service';
import { jwtDecode } from 'jwt-decode';
//import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive], //AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly authLoginService = inject(AuthLoginService);
  private readonly authLogoutService = inject(AuthLogoutService);
  private readonly router = inject(Router);
  //this variable private for sec method
  isLoggedIn: any;

  checkLoggedInStatus() {
    //first method to make token ysam3 fe el nav bar inside constructor or ngOnInit
    this.authLoginService.userData.subscribe({
      next: (res) => {
        this.isLoggedIn = res;
      },
    });

    //sec method to make token ysam3 fe el nav bar inside constructor or ngOnInit
    //   this.isLoggedIn = this.authLoginService.userData;

    // third method to make token ysam3 fe el nav bar inside constructor or ngOnInit
    //console.log(this.authLoginService.userData.asObservable());
  }

  //beyt4ek 3al el token law 7ad da5loh be 2edoh fe el local storage law el token 2t8er mn 4a5s
  // 8er el backend y3ml logout 3altol
  decodeToken() {
    try {
      if(typeof localStorage != 'undefined'){
      const decoded = jwtDecode(localStorage.getItem('userToken')!);
    }
    } catch {
      this.authLogoutService.logOut();
    }
  }

  ngOnInit(): void {
    this.checkLoggedInStatus();
    this.decodeToken();
  }

  signOut() {
    this.authLogoutService.logOut();
  }
}
