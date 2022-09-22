import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-job-template",
    templateUrl: "./job-template.component.html",
    styleUrls: ["./job-template.component.scss"],
})
export class JobTemplateComponent implements OnInit {
    links = [
        {
            link: "step-1",
            text: "Step 1",
            subText: "Your Country",
        },
        {
            link: "step-2",
            text: "Step 2",
            subText: "Verification",
        },
        {
            link: "step-3",
            text: "Step 3",
            subText: "Start Playing",
        },
    ];

    constructor() {}

    ngOnInit(): void {}
}
