import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { LinkButtonComponent } from "../../buttons/link-button/link-button.component";
import { LogoComponent } from "../logo/logo.component";

@Component({
	selector: "app-anonymous-form-wrapper",
	standalone: true,
	imports: [CommonModule, LogoComponent, LinkButtonComponent],
	templateUrl: "./anonymous-form-wrapper.component.html"
})
export class AnonymousFormWrapperComponent {
	@Input() header = "";
	@Input() paragraph!: string;
	@Input() route!: string;
	@Input() routerLinkText!: string;
}
