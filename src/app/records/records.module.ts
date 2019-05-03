import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRecordComponent } from './create-record/create-record.component';
import { EditRecordComponent } from './edit-record/edit-record.component';
import { ViewRecordComponent } from './view-record/view-record.component';
import { SearchAllComponent } from './search-all/search-all.component';

import { RouterModule, Routes} from '@angular/router' 
import { FormsModule } from '@angular/forms';
import { SocketService } from '../socket.service';


@NgModule({
  declarations: [CreateRecordComponent, EditRecordComponent, ViewRecordComponent, SearchAllComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'create', component: CreateRecordComponent},
      {path:'record/edit/:issueId', component: EditRecordComponent},
      {path:'search/all', component: SearchAllComponent},
      {path:'view/:issueId', component: ViewRecordComponent}
    ]),
    FormsModule
  ],
  providers: [SocketService]
})
export class RecordsModule {

 
 }
