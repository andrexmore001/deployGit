import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpRequest, HttpEvent,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('files', file);
    const req = new HttpRequest('POST', `${this.baseUrl}File`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFiles(){
    return this.http.get(`${this.baseUrl}File/`);
  }

  deleteFile(fileId: number){
    return this.http.delete(`${this.baseUrl}File/${fileId}`);
  }

}
