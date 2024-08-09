import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

import { RequiredStarSpanComponent } from "../../spans/required-star-span/required-star-span.component";

@Component({
	selector: "app-input-label",
	standalone: true,
	imports: [CommonModule, RequiredStarSpanComponent],
	templateUrl: "./input-label.component.html"
})
export class InputLabelComponent {
	@Input() text = "";
	@Input() required!: boolean;
}
