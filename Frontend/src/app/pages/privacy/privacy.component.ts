import { Component } from "@angular/core";

import { APP_ROUTES } from "../../app-routes";

@Component({
	selector: "app-privacy",
	standalone: true,
	templateUrl: "./privacy.component.html"
})
export class PrivacyComponent {
	appRoutes = APP_ROUTES;
}
