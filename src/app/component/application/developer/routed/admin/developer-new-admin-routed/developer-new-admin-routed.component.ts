import { IDeveloper2Form, IDeveloper2Send } from '../../../../../../model/developer-interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDeveloper } from 'src/app/model/developer-interface';
import { DeveloperService } from 'src/app/service/developer.service';
declare let bootstrap: any;

@Component({
  selector: 'app-developer-new-admin-routed',
  templateUrl: './developer-new-admin-routed.component.html',
  styleUrls: ['./developer-new-admin-routed.component.css']
})
export class DeveloperNewAdminRoutedComponent implements OnInit {

  id: number = 0;
  oDeveloper: IDeveloper = null;
  oDeveloper2Form: IDeveloper2Form = null;
  oDeveloper2Send: IDeveloper2Send = null;
  oForm: FormGroup<IDeveloper2Form>;
  // modal
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

  constructor(
    private oRouter: Router,
    private oDeveloperService: DeveloperService,
    private oFormBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.oForm = <FormGroup>this.oFormBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    });
  }

  onSubmit() {
    console.log("onSubmit");
    this.oDeveloper2Send = {
      id: this.oForm.value.id,
      name: this.oForm.value.name,
      surname: this.oForm.value.surname,
      lastname: this.oForm.value.lastname,
      email: this.oForm.value.email,
      username: this.oForm.value.username,
      team: { id: this.oForm.value.id_team },
      usertype: { id: this.oForm.value.id_usertype }
    }
    if (this.oForm.valid) {
      this.oDeveloperService.newOne(this.oDeveloper2Send).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle = "ANDAMIO";
          this.modalContent = "Developer " + data + " created";
          this.showModal(data);
        }
      })
    }

  }



  showModal = (data) => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.mimodal), { //pasar el myModal como parametro
      keyboard: false
    })
    var myModalEl = document.getElementById(this.mimodal);
    myModalEl.addEventListener('hidden.bs.modal', (event): void => {
      this.oRouter.navigate(['/admin/developer/view', data])
    })
    this.myModal.show()
  }

}
