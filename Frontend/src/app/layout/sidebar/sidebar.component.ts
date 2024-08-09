import { Component } from "@angular/core";

import { NavigationButtonsComponent } from "../../shared/buttons/navigation-buttons/navigation-buttons.component";

@Component({
	selector: "app-sidebar",
	standalone: true,
	imports: [NavigationButtonsComponent],
	templateUrl: "./sidebar.component.html"
})
export class SidebarComponent {}
