import { Component, Input, OnInit, Output, OnDestroy, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Subscription } from 'rxjs';
import { AlertService } from '../../../../shared/service/alert.service';
import { ActivityService } from '../../service/activity.service';
import { Activity } from '../../model/activity';
import { Employee } from '../../../employee/model/employee';
import { EmployeeService } from '../../../employee/service/employee.service';


@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit, OnDestroy {

  @Input()
  id: number;

  @Output()
  passEntry: EventEmitter<any> = new EventEmitter();

  public employees: Array<Employee>

  private subscription = new Subscription();
  public formGroup: FormGroup;
  public submitted = false;


  constructor(private activityService: ActivityService,
    private employeeService: EmployeeService,
    private alertService: AlertService,
    public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.formGroup.reset();
    this.id = null;
    this.subscription.unsubscribe();
  }


  private initForm() {
    var date = new Date;
    this.formGroup = new FormGroup({
      id: new FormControl(this.id),
      description: new FormControl(null, [Validators.required]),
      status: new FormControl(null),
      employeeId: new FormControl(null, [Validators.required]),
      executionDate: new FormControl(this.getDate(date), [Validators.required]),
      executionTime: new FormControl(this.getTime(date), [Validators.required]),
    });
    const requests = {
      employees: this.employeeService.find()
    }
    if (this.id) {
      requests['activity'] = this.activityService.findById(this.id);
    }
    const sub = forkJoin(requests).subscribe(resp => {
      this.employees = resp['employees'];
      console.log('resp ', resp['activity'])
      if (resp['activity']) {
        this.setForm(resp['activity']);
      }
    });
    this.subscription.add(sub);
  }

  private getTime(date: Date) {
    const second = date.getSeconds();
    const minute = date.getMinutes();
    const hour = date.getHours();
    return { hour, minute, second }
  }

  private getDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return { year, month, day }
  }

  private setForm(activity: Activity) {
    this.formGroup.get('description').setValue(
      activity.description
    );
    this.formGroup.get('status').setValue(
      activity.status
    );
    this.formGroup.get('employeeId').setValue(
      activity.employee.id
    );
    this.setFullDate(activity.executionDate)
  }

  public get controls() {
    return this.formGroup.controls;
  }

  public onSave() {
    this.formGroup.updateValueAndValidity();
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    const activity = this.formGroup.getRawValue();
    activity['executionDate'] = this.getFullDate();
    if (this.id) {
      this.update(activity);
    } else {
      this.save(activity);
    }

  }

  private save(activity: Activity) {
    const sub = this.activityService.save(activity).subscribe(() => {
      this.showSaveSuccessful();
      this.clearAndClose();
    });
    this.subscription.add(sub);
  }

  private update(activity: Activity) {
    const sub = this.activityService.update(this.id, activity).subscribe(() => {
      this.showUpdatedSuccessful();
      this.clearAndClose();
    });
    this.subscription.add(sub);
  }

  private clearAndClose() {
    this.id = null;
    this.passEntry.emit(true);
    this.activeModal.close();
  }

  private showUpdatedSuccessful() {
    this.alertService.showSuccessful("Se ha actualizado el registro correctamente", "Actualizó!");
  }

  private showSaveSuccessful() {
    this.alertService.showSuccessful("Se ha creado el registro correctamente", "Creó!");
  }


  private setFullDate(date) {
    const [dateValues, timeValues] = date.split('T');
    const [year, day, monthPartial] = dateValues.split('-');
    const [hour, minute, second] = timeValues.split(':');
    const month = Number(monthPartial) - 1
    this.formGroup.get('executionDate').setValue(
      { year: Number(year), month: Number(month), day: Number(day) }
    );
    this.formGroup.get('executionTime').setValue(
      { hour: Number(hour), minute: Number(minute), second: Number(second) }
    );
  }

  private getFullDate() {
    const executionDate = this.formGroup.get('executionDate').value;
    const executionTime = this.formGroup.get('executionTime').value;
    const date = executionDate.year + '-' + this.getFormat(executionDate.month) + '-' + this.getFormat(executionDate.day)
    const time = this.getFormat(executionTime.hour) + ':' + this.getFormat(executionTime.minute) + ':' + this.getFormat(executionTime.second)
    return date + 'T' + time;
  }

  private getFormat(value: number) {
    return value < 10 ? '0' + value : value + '';
  }

}
