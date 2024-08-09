import { Component } from "@angular/core";

import { AsideFollowersComponent } from "./followers/followers.component";
import { AsideTrendingComponent } from "./trending/trending.component";

@Component({
	selector: "app-aside",
	standalone: true,
	imports: [AsideFollowersComponent, AsideTrendingComponent],
	templateUrl: "./aside.component.html"
})
export class AsideComponent {}
