import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";

import { APP_ROUTES } from "../../../app-routes";
import { APPLICATION_THEME_COLOR } from "../../constants";

@Component({
	selector: "app-link-button",
	standalone: true,
	imports: [RouterModule],
	templateUrl: "./link-button.component.html"
})
export class LinkButtonComponent {
	appRoutes = APP_ROUTES;

	@Input() route = "";
	@Input() text = "";
	@Input() color: string = APPLICATION_THEME_COLOR;
}
