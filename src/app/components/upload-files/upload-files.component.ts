import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UploadFilesService } from '../../services/upload-files.service';
import { asyncScheduler, Observable, Subscription,interval} from 'rxjs';
import { flatMap, map, catchError} from 'rxjs/operators';
import { HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import QRCodeStyling from "qr-code-styling";
@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit,OnDestroy {
  @ViewChild("canva", { static: true }) canvas: ElementRef;
  selectedFiles: FileList;
  //Es el array que contiene los items para mostrar el progreso de subida de cada archivo
  progressInfo = [];
  messages :Array<any>=new Array<any>();;
  imageName = "";
  messageDelete="";
  fileInfos: Observable<any>;
  suscrition:Subscription;
  title = 'app';
  elementType = 'https://www.youtube.com/';
  value = 'https://www.youtube.com/';
  interval$=interval(300000);
  qrCode:QRCodeStyling;
  constructor(private uploadFilesService: UploadFilesService,private spinner: NgxSpinnerService) { 
  }

  ngOnInit(): void {
    this.Inimethod();
  }
  Inimethod(){
    this.fileInfos = this.actMin();
    this.suscrition=this.interval$
    .pipe(
     flatMap(() => this.fileInfos =this.actMin()),
    )
    .subscribe(data=>{console.log("Data Actualizada")});
    this.qrCode = new QRCodeStyling({
      shape:"square",
      width: 232,
      height: 232,
      margin: 14,
      data: "https://www.facebook.com/",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
      dotsOptions: {
        color: "#4267b2",
        type: "rounded"
      },
      backgroundOptions: {
        color: "#e9ebee"
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 14
      }
    });
    this.qrCode.append(this.canvas.nativeElement);
  }
  selectFiles(event) {
    this.progressInfo = [];
    event.target.files.length == 1 ? this.imageName = event.target.files[0].name : this.imageName = event.target.files.length + " archivos";
    this.selectedFiles = event.target.files;
  }
  uploadFiles() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }
  upload(index, file) {
    let size= (file.size/1000000).toFixed(2);;
    this.progressInfo[index] = { value: 0, fileName: file.name,fileSize:size+' Mb'};

    this.uploadFilesService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfo[index].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.imageName="";
          this.selectedFiles=null;
          this.fileInfos = this.uploadFilesService.getFiles();
        }
      },
      err => {
        this.progressInfo[index].value =0;
        this.messages.push({
          mensaje:'No se puede subir el archivo ' + file.name
        })
      });
  }
  deleteFile(fileId:number) {
    this.uploadFilesService.deleteFile(fileId).subscribe(res => {
      this.messageDelete =`Se ha borrado correctamente el archivo ${res['name']}`;
      this.fileInfos = this.uploadFilesService.getFiles();
      const subs=asyncScheduler.schedule(function(state){
        console.log(state);
        this.schedule(state+1,1000);
      },1000,1);
    const TerminarSch=()=>{this.messageDelete="",subs.unsubscribe()};
    asyncScheduler.schedule(TerminarSch,4000);
  },error=>{
    console.log(error)
      if(error.status==404){
        this.messageDelete=`No se he encontrado el archivo con id: ${fileId}`;
      }
    });
  }
  getProgreso(val:number){
     return `${ val }%`;
  }
  ngOnDestroy(): void {
      console.log("ngOndestroy");
      this.suscrition.unsubscribe();
  }
 actMin(){
   this.progressInfo=[];
  return this.fileInfos = this.uploadFilesService.getFiles();
 }
 down(){
  this.qrCode.download({name:"Prueba",extension:"png"}).then(val=>{
    alert("se ha descargado correctamente");
  }).catch((reason)=>{
    alert("algo ha fallado");
  })
 }
}

