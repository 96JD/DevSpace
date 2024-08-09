import _ from "lodash";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";

import { CommonModule } from "@angular/common";
import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

import { APP_ROUTES } from "../../app-routes";
import { AuthService } from "../../auth/auth.service";
import { SubmitButtonComponent } from "../../shared/buttons/submit-button/submit-button.component";
import { ViewButtonComponent } from "../../shared/buttons/view-button/view-button.component";
import { ImageComponent } from "../../shared/components/image/image.component";
import { SpinnerComponent } from "../../shared/components/spinner/spinner.component";
import { stringifyJson } from "../../shared/functions/json";
import { toastError, toastSuccess } from "../../shared/functions/toast";
import { TextareaInputComponent } from "../../shared/inputs/textarea-input/textarea-input.component";
import { ErrorResponse, ExtendedQuestion, TextInput, UserLocalStorage } from "../../shared/interfaces";
import { QuestionsService } from "./questions.service";

interface NewQuestionResponse {
	value: ExtendedQuestion[];
}

@Component({
	selector: "app-questions",
	standalone: true,
	imports: [
		RouterModule,
		CommonModule,
		FormsModule,
		SpinnerComponent,
		ImageComponent,
		TextareaInputComponent,
		SubmitButtonComponent,
		ViewButtonComponent
	],
	templateUrl: "./questions.component.html"
})
export class QuestionsComponent implements OnInit, OnDestroy {
	appRoutes = APP_ROUTES;

	tabs = [
		{ name: "Recent", index: 0 },
		{ name: "Most Liked", index: 1 },
		{ name: "Favorites", index: 2 }
	];
	currentTab = 0;

	loggedInUser!: UserLocalStorage;

	loading = true;
	questions: ExtendedQuestion[] = [];
	questionsCount = 0;
	top = 15;
	skip = 0;
	orderBy = "createdAt desc";

	label = "View More";

	answerInput: TextInput = { value: "", validationStatus: false };
	isFormValid = false;

	queryParamsSubscription?: Subscription;

	constructor(
		private questionsService: QuestionsService,
		private authService: AuthService,
		private toastrService: ToastrService,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.loggedInUser = this.authService.loggedInUser;
	}

	ngOnInit() {
		this.queryParamsSubscription = this.route.queryParams.subscribe((params) => {
			const tab = parseInt(params["tab"] as string);
			if (!isNaN(tab)) {
				this.currentTab = tab;
			}
			this.loadQuestions(true);
		});
	}

	selectTab(tab: number) {
		this.currentTab = tab;
		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: { tab: tab },
			queryParamsHandling: "merge"
		});
	}

	loadQuestions(newTab = false) {
		this.questionsService.getQuestionsList(this.top, this.skip, this.orderBy, this.currentTab).subscribe({
			next: (response) => {
				this.questionsCount = (response as { "@odata.count": number })["@odata.count"];
				const newQuestions = _.map(
					_.cloneDeep((response as NewQuestionResponse).value),
					(question: ExtendedQuestion) => ({
						...question,
						isQuestionMenuOpen: false,
						isAnswersSectionOpen: false,
						isAnswerInputOpen: false
					})
				);
				this.questions = newTab ? [...newQuestions] : [...this.questions, ...newQuestions];
				if (this.questionsCount <= this.top + this.skip) {
					this.label = "";
				}
				this.loading = false;
			},
			error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
		});
	}

	loadMoreQuestions() {
		this.skip += this.top;
		this.loadQuestions();
	}

	toggleQuestionMenu(questionParam: ExtendedQuestion) {
		this.questions.forEach(
			(question) =>
				(question.isQuestionMenuOpen = question.Id === questionParam.Id && !question.isQuestionMenuOpen)
		);
	}

	toggleAnswersSection(questionParam: ExtendedQuestion) {
		this.questions.forEach(
			(question) =>
				(question.isAnswersSectionOpen = question.Id === questionParam.Id && !question.isAnswersSectionOpen)
		);
	}

	toggleAnswerInput(questionParam: ExtendedQuestion) {
		this.questions.forEach(
			(question) => (question.isAnswerInputOpen = question.Id === questionParam.Id && !question.isAnswerInputOpen)
		);
	}

	@HostListener("document:click", ["$event"])
	onDocumentClick(event: PointerEvent) {
		if ((event.target as HTMLElement).id !== "question-menu") {
			this.questions.forEach((question) => {
				if (question.isQuestionMenuOpen) {
					question.isQuestionMenuOpen = false;
				}
			});
		}
	}

	getWhoLikes(question: ExtendedQuestion) {
		return question.QuestionLikes.length > 0
			? _.map(question.QuestionLikes, (q) => ` ${q.User.FirstName} ${q.User.LastName}`)
			: "no likes yet!";
	}

	isUserFavorite(question: ExtendedQuestion) {
		return _.some(question.QuestionFavorites, (q) => q.UserId === this.loggedInUser.Id);
	}

	hasUserLiked(question: ExtendedQuestion) {
		return _.some(question.QuestionLikes, (q) => q.UserId === this.loggedInUser.Id);
	}

	likeQuestion(question: ExtendedQuestion) {
		this.questionsService
			.likeQuestion(question.Id, {
				UserId: this.loggedInUser.Id
			})
			.subscribe({
				next: () => {
					question.QuestionLikes.push({
						Id: 0,
						QuestionId: question.Id,
						UserId: this.loggedInUser.Id,
						User: { FirstName: this.loggedInUser.FirstName, LastName: this.loggedInUser.LastName }
					});
				},
				error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
			});
	}

	unlikeQuestion(question: ExtendedQuestion) {
		this.questionsService.unlikeQuestion(question.Id, this.loggedInUser.Id).subscribe({
			next: () => {
				for (let i = question.QuestionLikes.length - 1; i >= 0; i--) {
					if (
						question.QuestionLikes[i].QuestionId === question.Id &&
						question.QuestionLikes[i].UserId === this.loggedInUser.Id
					) {
						question.QuestionLikes.splice(i, 1);
					}
				}
			},
			error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
		});
	}

	addQuestionToFavorite(question: ExtendedQuestion) {
		this.questionsService
			.addQuestionToFavorite(question.Id, {
				UserId: this.loggedInUser.Id
			})
			.subscribe({
				next: () => {
					toastSuccess(this.toastrService, "Successfully added question to your favorites!");
					question.QuestionFavorites.push({
						Id: 0,
						QuestionId: question.Id,
						UserId: this.loggedInUser.Id
					});
				},
				error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
			});
	}

	deleteQuestionFromFavorite(question: ExtendedQuestion) {
		this.questionsService.deleteQuestionFromFavorite(question.Id, this.loggedInUser.Id).subscribe({
			next: () => {
				toastSuccess(this.toastrService, "Successfully removed question from your favorites!");

				for (let i = question.QuestionFavorites.length - 1; i >= 0; i--) {
					if (
						question.QuestionFavorites[i].QuestionId === question.Id &&
						question.QuestionFavorites[i].UserId === this.loggedInUser.Id
					) {
						question.QuestionFavorites.splice(i, 1);
					}
				}
			},
			error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
		});
	}

	onAnswerChange(input: TextInput) {
		this.answerInput = input;
		this.isFormValid = this.answerInput.validationStatus;
	}

	postAnswer(question: ExtendedQuestion) {
		this.questionsService
			.postAnswer(question.Id, {
				UserId: this.loggedInUser.Id,
				Answer: this.answerInput.value
			})
			.subscribe({
				next: () => {
					question.QuestionAnswers.push({
						Id: 0,
						QuestionId: question.Id,
						UserId: this.loggedInUser.Id,
						User: {
							ProfilePicture: this.loggedInUser.ProfilePicture,
							FirstName: this.loggedInUser.FirstName,
							LastName: this.loggedInUser.LastName
						},
						Answer: this.answerInput.value
					});
					this.answerInput.value = "";
				},
				error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
			});
	}

	updateQuestion(questionParam: ExtendedQuestion) {
		this.router.navigate([APP_ROUTES.QuestionForm], {
			queryParams: { question: stringifyJson(questionParam) }
		});
	}

	deleteQuestion(questionParam: ExtendedQuestion) {
		this.questionsService.deleteQuestion(questionParam.Id).subscribe({
			next: () => {
				toastSuccess(this.toastrService, "Successfully deleted your question!");
				this.questions = _.filter(this.questions, (question) => question.Id !== questionParam.Id);
			},
			error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
		});
	}

	ngOnDestroy() {
		this.queryParamsSubscription?.unsubscribe();
	}
}
