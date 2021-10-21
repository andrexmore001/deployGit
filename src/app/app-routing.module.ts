import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PdfViewComponent } from './components/pdf-view/pdf-view.component';
import { RuletaComponent } from './components/ruleta/ruleta.component';


const routes: Routes = [
  //{path:'',component:UploadFilesComponent},
  {path:'pdf',component:PdfViewComponent},
  {path:'',component:RuletaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
