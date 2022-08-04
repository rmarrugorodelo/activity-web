import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AlertService } from '../../../../shared/service/alert.service';
import { Activity } from '../../model/activity';
import { ActivityService } from '../../service/activity.service';
import { ActivityFormComponent } from '../activity-form/activity-form.component';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit, OnDestroy {

  public activities: Array<Activity>

  private subscription = new Subscription();
  public language: string;

  private ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false
  };

  constructor(private modalService: NgbModal,
              private activityService: ActivityService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.find();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private find() {
    const sub = this.activityService.find().subscribe(resp => {
      this.activities = resp;
    });
    this.subscription.add(sub);
  }

  public open(activity?: Activity) {
    const ref = this.modalService.open(ActivityFormComponent,
      this.ngbModalOptions);
    ref.componentInstance.id = activity?.id;
    ref.componentInstance.passEntry.subscribe(() => {
      this.find();
    })
  }

  onDelete(activity: Activity) {
    this.alertService.showConfirmation("¿Está seguro de eliminar este registro?").then((result) => {
      if (result.value) {
        const sub = this.activityService.delete(activity.id).subscribe(() => {
          this.alertService.showSuccessful("Se ha elliminado correctamente el registro", "Importante !");
          this.find();
        });
        this.subscription.add(sub);
      }
    });
  }

  onComplete(activity: Activity) {
    this.alertService.showConfirmation("¿Está seguro de completar esta actividad?").then((result) => {
      if (result.value) {
        const sub = this.activityService.complete(activity.id).subscribe(() => {
          this.alertService.showSuccessful("Se ha completado correctamente la actividad", "Importante !");
          this.find();
        });
        this.subscription.add(sub);
      }
    });
  }


}
