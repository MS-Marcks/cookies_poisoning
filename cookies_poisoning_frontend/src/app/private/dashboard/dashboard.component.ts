import { Component, inject, OnInit } from '@angular/core';
import { CookieService } from '../../services/cookies.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  private cookieService: CookieService = inject(CookieService)
  isAdmin: string = "false";
  ngOnInit(): void {
    this.isAdmin = this.cookieService.getCookie("admin") || "false";
  }
}
