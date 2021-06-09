import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigureComponent } from '../configure/configure.component';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {

  plantList = [
    {
      id: 1,
      name: 'Plan A'
    },
    {
      id: 2,
      name: 'Plan B'
    },
    {
      id: 3,
      name: 'Plan C'
    }
  ];

  machineLine = [
    {
      id: 1,
      name: 'Core 1',
      plant_id: 1
    },
    {
      id: 1,
      name: 'Core 2',
      plant_id: 1
    },
    {
      id: 1,
      name: 'Core 4',
      plant_id: 2
    },
    {
      id: 1,
      name: 'Core 8',
      plant_id: 2
    },
    {
      id: 1,
      name: 'Core 10',
      plant_id: 3
    },
    {
      id: 1,
      name: 'Core 12',
      plant_id: 3
    },
    {
      id: 1,
      name: 'Core 14',
      plant_id: 3
    },
  ];

  machineLineFilter: any[] = [];

  selectPlan = null;
  SelectMachine = null;

  timeWiseList: any[] = [];
  currentDate: any = null;

  constructor() {
    this.currentDate = new Date();
  }

  configureCom: ConfigureComponent[] = []

  ngOnInit(): void {
    this.timeWiseList = [
      {
        start_time: "7.00",
        end_time: "7.30",
        full_volume_all_valves:null,
        full_volume_3_all_valves_every_hour: null,
        closure_torque: null,
        closure_jump_test: null,
        closure_plifer_band: null,
        closure_secure_seal: null,
        stress_crack_test: null,
        drop_test: null,
        package_appearance: null,
        date_coding_and_rub_test: null,
      },
      {
        start_time: "7.30",
        end_time: "8.00",
        full_volume_all_valves: 1,
        full_volume_3_all_valves_every_hour:null,
        closure_torque: null,
        closure_jump_test: null,
        closure_plifer_band: null,
        closure_secure_seal: null,
        stress_crack_test: null,
        drop_test: null,
        package_appearance: null,
        date_coding_and_rub_test: null,
      },
      {
        start_time: "8.00",
        end_time: "8.30",
        full_volume_all_valves: null,
        full_volume_3_all_valves_every_hour: null,
        closure_torque: null,
        closure_jump_test: null,
        closure_plifer_band: null,
        closure_secure_seal: null,
        stress_crack_test: null,
        drop_test: null,
        package_appearance: null,
        date_coding_and_rub_test: null,
      },
      {
        start_time: "8.30",
        end_time: "9.00",
        full_volume_all_valves: null,
        full_volume_3_all_valves_every_hour: null,
        closure_torque: null,
        closure_jump_test: null,
        closure_plifer_band: null,
        closure_secure_seal: null,
        stress_crack_test: null,
        drop_test: null,
        package_appearance: null,
        date_coding_and_rub_test: null,
      },
      /* {
        start_time: "9.00",
        end_time: "9.30",
        full_volume_all_valves: null,
        full_volume_3_all_valves_every_hour: null,
        closure_torque: null,
        closure_jump_test: null,
        closure_plifer_band: null,
        closure_secure_seal: null,
        stress_crack_test: null,
        drop_test: null,
        package_appearance: null,
        date_coding_and_rub_test: null,
      },
      {
        start_time: "9.30",
        end_time: "10.00",
        full_volume_all_valves: null,
        full_volume_3_all_valves_every_hour: null,
        closure_torque: null,
        closure_jump_test: null,
        closure_plifer_band: null,
        closure_secure_seal: null,
        stress_crack_test: null,
        drop_test: null,
        package_appearance: null,
        date_coding_and_rub_test: null,
      },
      {
        start_time: "10.00",
        end_time: "10.30",
        full_volume_all_valves: null,
        full_volume_3_all_valves_every_hour: null,
        closure_torque: null,
        closure_jump_test: null,
        closure_plifer_band: null,
        closure_secure_seal: null,
        stress_crack_test: null,
        drop_test: null,
        package_appearance: null,
        date_coding_and_rub_test: null,
      },
      {
        start_time: "10.30",
        end_time: "11.00",
        full_volume_all_valves: null,
        full_volume_3_all_valves_every_hour: null,
        closure_torque: null,
        closure_jump_test: null,
        closure_plifer_band: null,
        closure_secure_seal: null,
        stress_crack_test: null,
        drop_test: null,
        package_appearance: null,
        date_coding_and_rub_test: null,
      } */
    ];

    this.configureCom = [];
  }

  onPlanChange(event: any) {
    if (event) {
      this.machineLineFilter = this.machineLine.filter(m => m.plant_id === event);
      this.SelectMachine = null;
    } else {
      this.machineLineFilter = [];
    }
  }

  submit() {
    console.log("this.selectPlan", this.selectPlan);
    // Current Date
    if (this.selectPlan && this.SelectMachine && this.currentDate) {

      let objList = [];
      for (let index = 0; index < this.configureCom.length; index++) {
        const conf = this.configureCom[index];
        if (conf) {
          const c = conf.getData();
          if (c) {
            objList.push(c);
            console.log("objList", objList);
          } else {
            objList = [];
            break;
          }
        }
      }

      if (objList.length) {
        console.log("iff objList", objList);

        const obj = {
          plan: this.selectPlan,
          machine: this.SelectMachine,
          date: this.currentDate,
          list: objList
        };

        console.log("ss", obj);
      } else {
        console.log("error")
      }
    }
  }

  onCreateConfigure(event: ConfigureComponent) {
    this.configureCom.push(event);
    console.log("this.configureCom", this.configureCom);
  }
}
