import _ from "lodash";
import { ToastrService } from "ngx-toastr";

import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";

import { AuthService } from "../../auth/auth.service";
import { ImageComponent } from "../../shared/components/image/image.component";
import { parseJson } from "../../shared/functions/json";
import { toastError } from "../../shared/functions/toast";
import { ErrorResponse, UserLocalStorage } from "../../shared/interfaces";
import { EmailSvgComponent } from "../../shared/svgs/email-svg.component";
import { WhoToFollowService } from "../who-to-follow/who-to-follow.service";

@Component({
	selector: "app-profile",
	standalone: true,
	imports: [RouterModule, CommonModule, EmailSvgComponent, ImageComponent],
	templateUrl: "./profile.component.html"
})
export class ProfileComponent implements OnInit {
	user?: UserLocalStorage;
	isMyProfile = false;
	isFollowed = false;

	constructor(
		private authService: AuthService,
		private route: ActivatedRoute,
		private whoToFollowService: WhoToFollowService,
		private toastrService: ToastrService
	) {}

	ngOnInit() {
		this.route.queryParams.subscribe((params) => {
			const user = params["user"] as string;
			if (_.isNil(user)) {
				this.user = this.authService.loggedInUser;
				this.isMyProfile = true;
			} else {
				const parsedUser = parseJson(user) as UserLocalStorage;
				this.isFollowed = parsedUser.isFollowed ?? true;
				this.user = parsedUser;
			}
		});
	}

	followUser(recipientId: number) {
		this.whoToFollowService
			.followUser({ SenderId: this.authService.loggedInUser.Id, RecipientId: recipientId })
			.subscribe({
				next: () => {
					this.isFollowed = true;
				},
				error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
			});
	}

	unfollowUser(recipientId: number) {
		this.whoToFollowService
			.unfollowUser({ SenderId: this.authService.loggedInUser.Id, RecipientId: recipientId })
			.subscribe({
				next: () => {
					this.isFollowed = false;
				},
				error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
			});
	}
}
