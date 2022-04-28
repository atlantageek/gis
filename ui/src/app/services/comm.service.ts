import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import * as moment from "moment";

export interface LayerRec{
    id:number,
    name:string,
    enabled:boolean,
    layer_type:string,
    source:string,
    uri:string,
    filter:string,
    franchise_id:number
}

@Injectable()
export class CommService {
    currentUserValue:string='';
    currentFranchiseId:number=-1;
    currentUserId:number=-1;
    static httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
    constructor(private http: HttpClient) {
        // if (this.isLoggedIn()) {
        //     this.currentUserValue=parseInt(localStorage.getItem("user_id"))
        // }
    }

    register(body: any): Observable<any> {

        let result = this.http.post('/api/users/', body).pipe(
            catchError(this.handleError)
        );
        return result;
    }

    login(email:string, password:string): Observable<any> {
        let body={'email':email, 'password':password}
        console.log(body);
        console.log("=========================")
        let headers=new HttpHeaders({
            'Content-Type':  'application/json'
          });
        let result = this.http.post('/api/auth/login', JSON.stringify(body),{'headers':headers}).pipe(tap(res=>{console.log(res);this.setSession(res)}),catchError(this.handleError))
        return result;
    }

    public checkLogin():boolean {
        
        let auth = localStorage.getItem("authResult");
        if (auth==null) return false;
        let authResult=JSON.parse(auth);
        if (authResult.hasOwnProperty('error')) throw <string>authResult.error;
        
        return this.validateSession(authResult);
    }
    public getUser():string {
        return this.currentUserValue;
    }

    public getLayers():Observable<LayerRec[]> {
        debugger;
        return this.http.get<LayerRec[]>('/api/geolayers', CommService.httpOptions)
              .pipe(
              tap(data => console.log(data)), // eyeball results in the console
            catchError(err => this.handleError(err)))

    }
    private setSession(authResult: any) {
        if (authResult.hasOwnProperty('error')) throw <string>authResult.error;
        const expiresAt = moment().add(authResult.expiresIn,'second');
        this.validateSession(authResult);
        localStorage.setItem("authResult", JSON.stringify(authResult) );

    }
    private validateSession(authResult:any) {
        let hdrs= new HttpHeaders().append('Content-Type','application/json').append('Authorization',authResult.token);
        console.log(authResult);
        CommService.httpOptions.headers=hdrs;
        this.currentFranchiseId=authResult.franchise_id;
        this.currentUserId=authResult.user_id
        this.currentUserValue=authResult.username;
        return true;
    }

    private handleError(error: HttpErrorResponse) {
        console.log(error)
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // Return an observable with a user-facing error message.
        return throwError(
            'Something bad happened; please try again later.');
    }
}
