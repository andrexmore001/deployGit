import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Observer, of } from 'rxjs';
import { concatMap, delay, filter, repeat, take } from 'rxjs/operators';

@Component({
  selector: 'app-ruleta',
  templateUrl: './ruleta.component.html',
  styleUrls: ['./ruleta.component.css']
})
export class RuletaComponent implements OnInit {
  HTMLElementArray:Array<HTMLElement>=new Array<HTMLElement>();
  ElementoActual:HTMLElement;
  emocionSelected:string;
  emocionSelectedImg:string;
  emocionCompare:string;
  ObsEnded:boolean=false;
  TextButton:string="¡Jugar!";
  @ViewChild('DivsRuleta') ele:ElementRef;
  elementos=[
    {valor:"Alegria"},
    {valor:"Tristeza"},
    {valor:"Ira"},
    {valor:"Asco"},
    {valor:"Miedo"},
    {valor:"Sorpresa"},
  ];
  colors=[
    {valor:"#7fff00",name:"chartreuse"},
    {valor:"#ff1aff",name:"fuchsia"},
    {valor:"#ff8d1a",name:"darkorange"},
    {valor:"#ffff1a",name:"yellow"},
    {valor:"#1a1aff",name:"blue"},
    {valor:"#1aff8c",name:"springgreen"},
  ]
  observer:Observer<HTMLElement>={
    next:value=>console.log('next:',value),
    error: error=>console.warn('error:',error),
    complete:()=>console.info('completado')
  };
  constructor(private render:Renderer2) { }

  ngOnInit(): void {
    this.RamdonMatriz();
  }

  elementosRul(){
  this.emocionSelectedImg=null;
  this.emocionCompare=null;
  this.emocionSelected=null;
  this.ObsEnded=false;
  this.HTMLElementArray=this.ele.nativeElement.childNodes;
  let numElement = this.randomIntFromInterval(1, 18)
  const NodeDesestructure$=of(...this.HTMLElementArray);
  NodeDesestructure$
  .pipe(
    filter(div => div.nodeName === 'DIV'),
    concatMap(div => of(div).pipe(delay(200))),
    repeat(3),
    take(numElement)
  )
  .subscribe(divFilter=>{
    const music = new Audio('./../../../assets/sonidoRuleta.mp3');
    music.play();
      if(this.ElementoActual){
        this.render.removeClass(this.ElementoActual,'Color');
    }
      this.render.addClass(divFilter,'Color');
      this.ElementoActual=divFilter;
  },
  err=>{console.log(err)}
  ,()=>
  {this.emocionSelected=this.ElementoActual.innerText;this.ObsEnded=true;this.TextButton="Jugar de Nuevo"});
  }

  randomIntFromInterval(min, max) 
  {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  PasarImg(imagen:string){
    this.emocionCompare=imagen;
    this.emocionSelectedImg=`./../../../assets/${imagen}.png`;
    if(this.emocionCompare===this.emocionSelected){
      const music = new Audio('./../../../assets/gameSuccess.mp3');
      music.play();
    }else{
      const music = new Audio('./../../../assets/gameOver.mp3');
      music.play();
    }
  }
  get EmocionActual(){
    return this.emocionSelectedImg;
  }

  RamdonMatriz(){
    for (let i = this.elementos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.elementos[i];
      this.elementos[i] = this.elementos[j];
      this.elementos[j] = temp;
    }
    return this.elementos;
  }

  getClass(i:number){
    return `col-sm-4 ruleta text-center ${this.colors[i].name}`;
  }

  getClassActual(){
  let claseReturn="";
  this.ElementoActual.classList.forEach(cla=>{
    this.colors.forEach(color=>{
       if(cla===color.name){
            claseReturn+=cla;
       }
    })
  })
    return `col-sm-4 selectEmocion mt-5 ${claseReturn}`;
  }
}
