import { Component } from "@angular/core";

import { AsideComponent } from "../../layout/aside/aside.component";
import { QuestionsComponent } from "../questions/questions.component";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [AsideComponent, QuestionsComponent],
	templateUrl: "./home.component.html"
})
export class HomeComponent {}
