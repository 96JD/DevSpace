import { Component } from "@angular/core";

import { WhoToFollowComponent } from "../../../pages/who-to-follow/who-to-follow.component";

@Component({
	selector: "app-aside-followers",
	standalone: true,
	imports: [WhoToFollowComponent],
	templateUrl: "./followers.component.html"
})
export class AsideFollowersComponent {
	top = 3;
}
