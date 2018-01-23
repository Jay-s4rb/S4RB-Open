import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

@Injectable()
export class ComplaintsService {
  constructor(private http: Http) {}

  getAllComplaints() {
    return this.http.get("/api/cpmu").map(res => res.json());
  }

  getGroupedComplaints() {
    return this.http.get("/api/grouped").map(res => res.json());
  }
}
