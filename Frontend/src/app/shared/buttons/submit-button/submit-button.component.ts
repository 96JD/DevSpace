import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "app-submit-button",
	standalone: true,
	templateUrl: "./submit-button.component.html"
})
export class SubmitButtonComponent {
	@Output() public submitButtonClickedEvent = new EventEmitter<void>();

	@Input() text = "";
	@Input() isDisabled = false;

	public onSubmitButtonClick() {
		this.submitButtonClickedEvent.emit();
	}
}
