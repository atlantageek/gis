import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import * as moment from "moment";
import { Router } from "@angular/router";

export interface LayerRec{
    id:number,
    name:string,
    enabled:string,
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
    static externalHttpOptions={
        headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
    }
    constructor(private http: HttpClient, private router:Router) {
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
        let headers=new HttpHeaders({
            'Content-Type':  'application/json'
          });
        let result = this.http.post('/api/auth/login', JSON.stringify(body),{'headers':headers}).pipe(tap(res=>{this.setSession(res)}),catchError(this.handleError))
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
        return this.http.get<LayerRec[]>('/api/geolayers', CommService.httpOptions)
              .pipe(
              tap(data => data), // eyeball results in the console
            catchError(err => this.handleError(err)))

    }
    public getLayer(layerId:number):Observable<LayerRec> {
        return this.http.get<LayerRec>('/api/geolayers/'+layerId, CommService.httpOptions)
              .pipe(
              tap(data => data), // eyeball results in the console
            catchError(err => this.handleError(err)))

    }
    public createLayer(body: any): Observable<any> {
        let result = this.http.post('/api/geolayers/', body, CommService.httpOptions).pipe(
            catchError(this.handleError)
        );
        return result;
    }
    public updateLayer(body: any, id: number): Observable<any> {
        let result = this.http.put('/api/geolayers/' + id, body, CommService.httpOptions).pipe(
            catchError(this.handleError)
        );
        return result;
    }
    public deleteLayer(id:number):Observable<any> {
        let result = this.http.delete('/api/geolayers/' + id, CommService.httpOptions).pipe(
            catchError(this.handleError)
        );
        return result;
    }
    public getCapabilities(url:string){
        //'https://geo.weather.gc.ca/geomet?lang=en&service=WMS&version=1.3.0&request=GetCapabilities' // SERVICE=WMS&REQUEST=GetCapabilities
        let urlObj = new URL(url);
        urlObj.searchParams.set('SERVICE','WMS')
        
        urlObj.searchParams.set('request','GetCapabilities')

        return this.http.get(urlObj.href,{responseType: 'text'})
        .pipe(
            tap((response) => {console.log('got data');}),
            catchError(err => this.handleError(err)))
    } 
    private handleError(error: HttpErrorResponse) {
        console.log(error)
        debugger;
        if (error.status==401) {
            localStorage.clear();
            this.router.navigate(['/'], {  });
        }
        else if (error.error instanceof ErrorEvent) {
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
    private setSession(authResult: any) {
        if (authResult.hasOwnProperty('error')) throw <string>authResult.error;
        const expiresAt = moment().add(authResult.expiresIn,'second');
        this.validateSession(authResult);
        localStorage.setItem("authResult", JSON.stringify(authResult) );

    }
    private validateSession(authResult:any) {
        let hdrs= new HttpHeaders().append('Content-Type','application/json').append('Authorization',authResult.token);
        CommService.httpOptions.headers=hdrs;
        this.currentFranchiseId=authResult.franchise_id;
        this.currentUserId=authResult.user_id
        this.currentUserValue=authResult.username;
        return true;
    }


}
