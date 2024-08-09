import { Component, Input } from "@angular/core";

@Component({
	selector: "app-error-span",
	standalone: true,
	templateUrl: "./error-span.component.html"
})
export class ErrorSpanComponent {
	@Input() error = "";
}
