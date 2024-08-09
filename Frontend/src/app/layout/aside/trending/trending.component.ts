import { Component } from "@angular/core";

import { TrendingComponent } from "../../../pages/trending/trending.component";

@Component({
	selector: "app-aside-trending",
	standalone: true,
	imports: [TrendingComponent],
	templateUrl: "./trending.component.html"
})
export class AsideTrendingComponent {
	top = 3;
}
