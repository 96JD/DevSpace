import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
	selector: "app-checkbox-input",
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: "./checkbox-input.component.html"
})
export class CheckboxInputComponent {
	@Output() checkboxInputChange = new EventEmitter<number>();

	checkboxInput = new FormControl(false, [Validators.required]);

	constructor() {
		this.checkboxInput.valueChanges.subscribe(() => {
			this.checkboxInputChange.emit(this.checkboxInput.value ? 1 : 0);
		});
	}
}
