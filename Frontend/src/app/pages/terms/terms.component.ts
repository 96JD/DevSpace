import { Component } from "@angular/core";

import { APP_ROUTES } from "../../app-routes";

@Component({
	selector: "app-terms",
	standalone: true,
	templateUrl: "./terms.component.html"
})
export class TermsComponent {
	appRoutes = APP_ROUTES;
}
