import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { APP_ROUTES } from "../../app-routes";
import { AuthService } from "../auth.service";

@Injectable({
	providedIn: "root"
})
export class AnonymousGuard {
	constructor(
		private authService: AuthService,
		private router: Router
	) {}

	canActivate() {
		if (this.authService.isAuthenticated) {
			this.router.navigate([APP_ROUTES.Home]);
			return false;
		}
		return true;
	}
}
