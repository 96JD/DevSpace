import _ from "lodash";
import { ToastrService } from "ngx-toastr";

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { APP_ROUTES } from "../../../app-routes";
import { AuthService } from "../../../auth/auth.service";
import { SubmitButtonComponent } from "../../../shared/buttons/submit-button/submit-button.component";
import { parseJson } from "../../../shared/functions/json";
import { toastError, toastSuccess } from "../../../shared/functions/toast";
import { TextInputComponent } from "../../../shared/inputs/text-input/text-input.component";
import { TextareaInputComponent } from "../../../shared/inputs/textarea-input/textarea-input.component";
import { ErrorResponse, TextInput } from "../../../shared/interfaces";
import { Question } from "../../../shared/odata-models";
import { QuestionsService } from "../questions.service";

@Component({
	selector: "app-question-form",
	standalone: true,
	imports: [TextInputComponent, TextareaInputComponent, SubmitButtonComponent],
	templateUrl: "./question-form.component.html"
})
export class QuestionFormComponent implements OnInit {
	titleInput: TextInput = { value: "", validationStatus: false };
	descriptionInput: TextInput = { value: "", validationStatus: false };

	isFormValid = false;

	parsedQuestion!: Question;

	constructor(
		private authService: AuthService,
		private questionsService: QuestionsService,
		private toastrService: ToastrService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.route.queryParams.subscribe((params) => {
			const question = params["question"] as string;
			if (!_.isNil(question)) {
				this.parsedQuestion = parseJson(question) as Question;
				this.titleInput.value = this.parsedQuestion.Title;
				this.titleInput.validationStatus = true;
				this.descriptionInput.value = this.parsedQuestion.Title;
				this.descriptionInput.validationStatus = true;
				this.isFormValid = true;
			}
		});
	}

	onInputChange(input: TextInput, type: string) {
		if (type === "title") {
			this.titleInput = input;
		} else {
			this.descriptionInput = input;
		}
		this.isFormValid = this.titleInput.validationStatus && this.descriptionInput.validationStatus;
	}

	postQuestion() {
		this.questionsService
			.postQuestion({
				UserId: this.authService.loggedInUser.Id,
				Title: this.titleInput.value,
				Description: this.descriptionInput.value
			})
			.subscribe({
				next: () => {
					toastSuccess(this.toastrService, "Successfully added your question!");
					setTimeout(() => {
						this.router.navigate([APP_ROUTES.Home]);
					}, 1500);
				},
				error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
			});
	}

	updateQuestion() {
		this.questionsService
			.updateQuestion(this.parsedQuestion.Id, {
				Title: this.titleInput.value,
				Description: this.descriptionInput.value
			})
			.subscribe({
				next: () => {
					toastSuccess(this.toastrService, "Successfully Updated your question!");
				},
				error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
			});
	}
}
