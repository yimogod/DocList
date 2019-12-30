import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { UboxRoutingModule } from './ubox-routing.module';

import { UboxSummaryComponent } from './summary/ubox-summary.component';
import { UboxDetailComponent } from './detail/ubox-detail.component';
import { UboxFPSComponent } from './detail-fps/ubox-fps.component';
import { ImportExcelComponent } from './import-excel/import-excel.component';
import { UboxFuncComponent } from './func/ubox-func.component';
import { UboxSummaryDrawerComponent } from './summary/ubox-summary-drawer.component';

import { UboxService } from './ubox.service'

const COMPONENTS = [
  UboxSummaryComponent,
  UboxDetailComponent,
  UboxFPSComponent,
  ImportExcelComponent,
  UboxFuncComponent,
];

const COMPONENTS_NOROUNT = [UboxSummaryDrawerComponent];

@NgModule({
  imports: [SharedModule, UboxRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
  providers:[UboxService],
})
export class UboxModule {}
