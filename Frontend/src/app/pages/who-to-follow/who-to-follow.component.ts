import _ from "lodash";
import { ToastrService } from "ngx-toastr";

import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

import { APP_ROUTES } from "../../app-routes";
import { AuthService } from "../../auth/auth.service";
import { ViewButtonComponent } from "../../shared/buttons/view-button/view-button.component";
import { DividerComponent } from "../../shared/components/divider/divider.component";
import { ImageComponent } from "../../shared/components/image/image.component";
import { SpinnerComponent } from "../../shared/components/spinner/spinner.component";
import { stringifyJson } from "../../shared/functions/json";
import { toastError } from "../../shared/functions/toast";
import { ErrorResponse, UserLocalStorage } from "../../shared/interfaces";
import { WhoToFollowService } from "./who-to-follow.service";

interface NewFollowersResponse {
	value: UserLocalStorage[];
}

@Component({
	selector: "app-who-to-follow",
	standalone: true,
	imports: [RouterModule, CommonModule, SpinnerComponent, DividerComponent, ImageComponent, ViewButtonComponent],
	templateUrl: "./who-to-follow.component.html"
})
export class WhoToFollowComponent implements OnInit {
	appRoutes = APP_ROUTES;

	@Input() top = 15;
	@Input() label = "View More";

	loading = true;
	whoToFollow: UserLocalStorage[] = [];
	whoToFollowCount = 0;
	skip = 0;

	constructor(
		private whoToFollowService: WhoToFollowService,
		private authService: AuthService,
		private toastrService: ToastrService
	) {}

	ngOnInit() {
		this.loadWhoToFollowUsers();
	}

	loadWhoToFollowUsers() {
		this.whoToFollowService.getWhoToFollowList(this.top, this.skip).subscribe({
			next: (response) => {
				this.whoToFollowCount = (response as { "@odata.count": number })["@odata.count"];
				const newFollowers = _.map(
					_.cloneDeep((response as NewFollowersResponse).value),
					(user: UserLocalStorage) => ({
						...user,
						isFollowed: false
					})
				);
				this.whoToFollow = [...this.whoToFollow, ...newFollowers];
				if (this.whoToFollowCount <= this.top + this.skip) {
					this.label = "";
				}
				this.loading = false;
			},
			error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
		});
	}

	loadMoreWhoToFollowUsers() {
		this.skip += this.top;
		this.loadWhoToFollowUsers();
	}

	stringifyJson = (object: UserLocalStorage) => stringifyJson(object);

	followUser(recipientId: number) {
		this.whoToFollowService
			.followUser({ SenderId: this.authService.loggedInUser.Id, RecipientId: recipientId })
			.subscribe({
				next: () => {
					const user = this.whoToFollow.find((u) => u.Id === recipientId);
					if (user) {
						user.isFollowed = true;
					}
				},
				error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
			});
	}

	unfollowUser(recipientId: number) {
		this.whoToFollowService
			.unfollowUser({ SenderId: this.authService.loggedInUser.Id, RecipientId: recipientId })
			.subscribe({
				next: () => {
					const user = this.whoToFollow.find((u) => u.Id === recipientId);
					if (user) {
						user.isFollowed = false;
					}
				},
				error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
			});
	}
}
