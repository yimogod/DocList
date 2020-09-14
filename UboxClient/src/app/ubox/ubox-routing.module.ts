import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UboxSummaryComponent } from './summary/ubox-summary.component';
import { UboxDetailComponent } from './detail/ubox-detail.component';
import { ImportExcelComponent } from './import-excel/import-excel.component';
import { UboxFuncComponent } from './func/ubox-func.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: 'summary', component: UboxSummaryComponent },
      { path: 'detail/:id', component: UboxDetailComponent},
      { path: 'import_excel', component: ImportExcelComponent},
      { path: 'tool', component: UboxFuncComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UboxRoutingModule {}
