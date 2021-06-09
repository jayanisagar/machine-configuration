import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss']
})
export class ConfigureComponent implements OnInit {

  formGroup!: FormGroup;

  @Input('index')
  index: number = -1;

  _data: any = null;
  @Input('data')
  set data(values: any) {
    this._data = values;

    console.log("this._data", this._data)
    if (this._data) {
      this.setFromData(this._data)
    }

  }

  @Output()
  onCreateConfigure = new EventEmitter<ConfigureComponent>();

  constructor(public fb: FormBuilder) {
    this.initFrom();
  }

  ngOnInit() {
    this.onCreateConfigure.emit(this);
  }

  initFrom() {
    // inviteForm
    this.formGroup = this.fb.group({
      start_time: [null, Validators.required],
      end_time: [null, Validators.required],
      full_volume_all_valves: [null, [Validators.required, Validators.min(5), Validators.max(10)]],
      full_volume_3_all_valves_every_hour: [null, [Validators.required, Validators.min(2.5), Validators.max(5.0)]],
      closure_torque: [false, Validators.required],
      closure_jump_test: [false, Validators.required],
      closure_plifer_band: [false, Validators.required],
      closure_secure_seal: [false, Validators.required],
      stress_crack_test: [false, Validators.required],
      drop_test: [false, Validators.required],
      package_appearance: [null, Validators.required],
      date_coding_and_rub_test: [null, Validators.required],
    });
  }

  setFromData(data: any) {
    if (data) {
      this.formGroup.patchValue({
        start_time: data.start_time,
        end_time: data.end_time,
        full_volume_all_valves: data.full_volume_all_valves,
        full_volume_3_all_valves_every_hour: data.full_volume_3_all_valves_every_hour,
        closure_torque: data.closure_torque ? data.closure_torque : false,
        closure_jump_test: data.closure_jump_test ? data.closure_jump_test : false,
        closure_plifer_band: data.closure_plifer_band ? data.closure_plifer_band : false,
        closure_secure_seal: data.closure_secure_seal ? data.closure_secure_seal : false,
        stress_crack_test: data.stress_crack_test ? data.stress_crack_test : false,
        drop_test: data.drop_test ? data.drop_test : false,
        package_appearance: data.package_appearance,
        date_coding_and_rub_test: data.date_coding_and_rub_test,
      })
    }
  }

  getFormControl(field: string): any {
    return this.formGroup.get(field);
  }

  getData() {
    if (this.formGroup.valid) {
      return this.formGroup.value;
    } else {
      Object.keys(this.formGroup.controls).forEach(element => {
        const c = this.formGroup.get(element);
        c?.markAsTouched({ onlySelf: true })
      });
    }
    return null;
  }

  public numberValidation(e: any) {
    let allowedKeys = [46, 8, 9, 27, 13, 110, 190];
    // to prevent double . and >        
    if ((e.key == '.' && (e.target.value.includes('.') || e.target.value == "")) || e.key == ">") {
      e.preventDefault();
    }
    if (allowedKeys.some(k => k == e.keyCode) ||
      // Allow: Ctrl/cmd+A           
      (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: Ctrl/cmd+C            
      (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: Ctrl/cmd+X            
      (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right            
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything            
      return;
    }
    // Ensure that it is a number and stop the keypress        
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  }


}
