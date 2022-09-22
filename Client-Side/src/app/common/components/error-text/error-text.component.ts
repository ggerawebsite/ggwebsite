import { Component, OnInit, Input } from "@angular/core";
import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";

@Component({
    selector: "error-text",
    templateUrl: "./error-text.component.html",
    styleUrls: ["./error-text.component.scss"],
})
export class ErrorTextComponent implements OnInit {
    @Input("control")
    control: any;

    constructor() {}

    ngOnInit(): void {
      // console.log(this.control)
    }

    public getErrors(
        control: AbstractControl | null
    ): ValidationErrors[] {
        return Object.entries(control?.errors ?? {}).map(
            ([key, msg]: [string, any]) => {
              console.table({ key, msg })
              return { key, msg }
            }
        );
    }

    public errorTrack(index: number, err: ValidationErrors): string {
        return err["key"] ?? "";
    }
}
