import _ from "lodash";
import { ToastrService } from "ngx-toastr";

import { animate, style, transition, trigger } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { AfterContentChecked, Component, EventEmitter, HostListener, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ImageComponent } from "../../../shared/components/image/image.component";
import { toastError } from "../../../shared/functions/toast";
import { ErrorResponse, ExtendedQuestion, UserLocalStorage } from "../../../shared/interfaces";
import { SearchService } from "./search.service";

const filterSearchedQuestions = (rawQuery: string, query: string, allQuestions: ExtendedQuestion[]) => {
	if (rawQuery === "#") {
		return allQuestions;
	} else if (query === "" || _.startsWith(rawQuery, "<")) {
		return [];
	} else {
		return _.filter(allQuestions, (question) => _.includes(_.toLower(question.Title), query));
	}
};

const filterSearchedUsers = (rawQuery: string, query: string, allUsers: UserLocalStorage[]) => {
	if (rawQuery === "<") {
		return allUsers;
	} else if (query === "" || _.startsWith(rawQuery, "#")) {
		return [];
	} else {
		return _.filter(
			allUsers,
			(user) => _.includes(user.FirstName.toLowerCase(), query) || _.includes(_.toLower(user.LastName), query)
		);
	}
};

interface SearchResponse {
	value: UserLocalStorage[] | ExtendedQuestion[];
}

@Component({
	selector: "app-search",
	standalone: true,
	imports: [CommonModule, FormsModule, ImageComponent],
	templateUrl: "./search.component.html",
	animations: [
		trigger("opacity", [
			transition(":enter", [style({ opacity: 0 }), animate("300ms ease-out", style({ opacity: 1 }))]),
			transition(":leave", [style({ opacity: 1 }), animate("200ms ease-in", style({ opacity: 0 }))])
		]),
		trigger("opacityScale", [
			transition(":enter", [
				style({ opacity: 0, transform: "scale(.95)" }),
				animate("300ms ease-out", style({ opacity: 1, transform: "scale(1)" }))
			]),
			transition(":leave", [
				style({ opacity: 1, transform: "scale(1)" }),
				animate("200ms ease-in", style({ opacity: 0, transform: "scale(.95)" }))
			])
		])
	]
})
export class SearchComponent implements AfterContentChecked {
	@Output() closeSearchPaletteEvent = new EventEmitter();
	isAnimationEnterTriggered = true;
	allUsers: UserLocalStorage[] = [];
	allQuestions: ExtendedQuestion[] = [];
	rawQuery = "";
	query = "";
	filteredSearchedQuestions: ExtendedQuestion[] = [];
	filteredSearchedUsers: UserLocalStorage[] = [];

	constructor(
		private searchService: SearchService,
		private toastrService: ToastrService
	) {
		this.searchService.getAllUsers().subscribe({
			next: (response) => {
				this.allUsers = (response as SearchResponse).value as UserLocalStorage[];
			},
			error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
		});

		this.searchService.getAllQuestions().subscribe({
			next: (response) => {
				this.allQuestions = (response as SearchResponse).value as ExtendedQuestion[];
			},
			error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
		});
	}

	ngAfterContentChecked() {
		document.getElementById("search-palette-input")?.focus();
	}

	onRawQueryChange() {
		this.query = this.rawQuery.toLowerCase().replace(/^[#<]/, "");
		this.filteredSearchedQuestions = filterSearchedQuestions(this.rawQuery, this.query, this.allQuestions);
		this.filteredSearchedUsers = filterSearchedUsers(this.rawQuery, this.query, this.allUsers);
	}

	triggerLeaveAnimation() {
		this.isAnimationEnterTriggered = !this.isAnimationEnterTriggered;
	}

	closeSearchPalette(event: KeyboardEvent | MouseEvent, clickedOutside?: boolean) {
		if ((event instanceof KeyboardEvent && event.key === "Escape") || clickedOutside) {
			this.triggerLeaveAnimation();
			setTimeout(() => {
				this.closeSearchPaletteEvent.emit();
			}, 500);
		}
	}

	@HostListener("document:click", ["$event"])
	onDocumentClick(event: PointerEvent) {
		const overlay = event.target as HTMLDivElement;
		if (overlay.id === "search-palette-overlay") {
			this.closeSearchPalette(event, true);
		}
	}
}
