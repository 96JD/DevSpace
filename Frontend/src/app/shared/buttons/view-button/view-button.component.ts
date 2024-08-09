import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
	selector: "app-view-button",
	standalone: true,
	imports: [RouterModule, CommonModule],
	templateUrl: "./view-button.component.html"
})
export class ViewButtonComponent {
	@Input() route = "";
	@Input() label = "";

	classNames =
		"block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50";
}
