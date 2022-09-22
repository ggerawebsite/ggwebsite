import { Component, OnInit, Input } from "@angular/core";
import { environment } from "src/environments/environment";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: "app-video-player",
    templateUrl: "./video-player.component.html",
    styleUrls: ["./video-player.component.scss"],
})
export class VideoPlayerComponent implements OnInit {
    @Input()
    src: any;
    constructor( private _sanitizer: DomSanitizer) {}

    ngOnInit(): void {
        // const url = environment.originUrl;
        // if (this.src.indexOf("?") > -1) {
        //     this.src += `origin=${url}`;
        // } else this.src += `&origin=${url}`;
        this.src = this._sanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
}
