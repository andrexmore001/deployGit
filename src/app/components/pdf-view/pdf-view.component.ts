import { AfterViewInit, Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { PDFProgressData, PdfViewerComponent } from 'ng2-pdf-viewer';
const FindState = {
  FOUND: 0,
  NOT_FOUND: 1,
  WRAPPED: 2,
  PENDING: 3
};
@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.css']
})
export class PdfViewComponent implements OnInit {
  @ViewChild("file") myInput: ElementRef;
  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;
  //@ViewChild("prueba") myThumb: ElementRef;
  pdfSrc:any;// "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  ispdfSrc: boolean = false;
  PdfName: string="No se Ha selecionado ningun documento";
  PageAct:number=1;
  PageAll:number;
  minPage:number;
  cargando:boolean;
  totalCargado:number;
  cantWords:number=0;
  mensajeWords:string;
 // Configuración de Google Maps 
 center = {lat: 24, lng: 12};
 zoom = 15;
 display?: google.maps.LatLngLiteral;
  constructor() { }

  ngOnInit(): void {

  }
  onProgress(progressData: PDFProgressData) {
    console.log("onProgress",progressData);
    this.totalCargado=(progressData.loaded * 100) / progressData.total;
    this.cargando=true;
  }
  pageChange(event){
    console.log("pageChange",event)
     this.PageAct=event;
  }
  afterLoadComplete(event){
    console.log("afterLoadComplete",event)
    this.minPage=1;
    this.PageAll=event._pdfInfo.numPages;
    this.cargando=false;
  }
  pageRendered(event){
    console.log("pageRendered",event)
  }
  onFileSelected(event) {
    event.target.files.length == 1 ? this.PdfName = event.target.files[0].name : this.PdfName = event.target.files.length + " archivos";
      if (typeof (FileReader) !== 'undefined') {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.pdfSrc = e.target.result;
        };
        this.ispdfSrc = true;
        reader.readAsArrayBuffer(this.myInput.nativeElement.files[0]);     
      }
  }

  get MinPage(){
    return this.minPage;
  }
  get maxPage(){
    return this.PageAll;
  }
  paginacion(e:number){
    if(e>0){
      this.PageAct+=1
    }else{
      if(this.PageAct>1){
        this.PageAct-=1
      }
    } 
  }


search(stringToSearch: string){
this.mensajeWords="";
this.cantWords=0;
this.pdfComponent.pdfFindController
.executeCommand('find', {
    caseSensitive: false, findPrevious: undefined, highlightAll: true, phraseSearch: true, query: stringToSearch
  });  
  this.pdfComponent.pdfViewer.eventBus.on('updatefindmatchescount', data => {
    this.cantWords = data.matchesCount.total;
    this.mensajeWords=`${this.cantWords} coincidencias encontradas`;
});
this.pdfComponent.pdfViewer.eventBus.on('updatefindcontrolstate', data => {
  if (data.state === FindState.NOT_FOUND) {
       this.mensajeWords=`0 coincidencias encontradas`;
  }
});
}
}
