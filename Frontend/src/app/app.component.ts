import { Subscription } from "rxjs";

import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { AuthService } from "./auth/auth.service";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, CommonModule, NavbarComponent, SidebarComponent],
	templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, OnDestroy {
	isUserLoggedIn!: boolean;
	authSubscription!: Subscription;

	constructor(private authService: AuthService) {
		this.isUserLoggedIn = this.authService.isAuthenticated;
	}

	ngOnInit() {
		this.authSubscription = this.authService.authChange.subscribe((isAuthenticated: boolean) => {
			this.isUserLoggedIn = isAuthenticated;
		});
	}

	ngOnDestroy() {
		this.authSubscription.unsubscribe();
	}
}
