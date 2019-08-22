import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {RolesService} from './roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  deleteModal = false;
  updateModal = false;
  insertModal = false;
  roleList: any;
  form: FormGroup;
  rid: number;
  updateForm: FormGroup;


  constructor(private rolesService: RolesService,
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.rolesService.getAllRoles().subscribe((data: any) => {
      this.roleList = data;
      console.log(this.roleList);
    });

    this.form = this.formBuilder.group({
      id: [],
      name: [''],
      roleDescription: [''],
      recordStatus: [''],
      createDateTime: [''],
      updateDateTime: [''],
      deletedDateTime: [''],
      description: [''],
      version: [''],
    });

    this.updateForm = this.formBuilder.group({
      name: [''],
      roleDescription: [''],
      recordStatus: [''],
      updateDateTime: [],
      deletedDateTime: [],
      description: [''],
      version: [],
    });

    console.log(this.updateForm);

  }

  onSubmit() {
    const values = this.form.value;
    console.log('on Submit', values);
    this.rolesService.registerRole(values).subscribe(
      get => {
        this.rolesService.getAllRoles().subscribe((data: any) => {
          this.roleList = data;
        });
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );

    this.insertModal = false;

  }


  onDelete() {
    this.rolesService.deleteRole(this.rid).subscribe(
      get => {
        this.rolesService.getAllRoles().subscribe((data: any) => {
          this.roleList = data;
        });
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
    this.toggleModal();

  }

  onUpdate() {
    const values = this.updateForm.value;
    this.rolesService.updateRole(values, this.rid).subscribe(
      get => {
        this.rolesService.getAllRoles().subscribe((data: any) => {
          this.roleList = data;
        });
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
    this.updateModal = false;
  }

  openInsert() {
    this.insertModal = true;
      }

  openUpdate(
    id,
    name,
    roleDescription,
    recordStatus,
    updateDateTime,
    deletedDateTime,
    description,
    version: number) {
    this.rid = id;
    this.updateModal = true;
    this.updateForm.controls.name.setValue(name);
    this.updateForm.controls.roleDescription.setValue(roleDescription);
    this.updateForm.controls.recordStatus.setValue(recordStatus);
    this.updateForm.controls.updateDateTime.setValue(updateDateTime);
    this.updateForm.controls.deletedDateTime.setValue(deletedDateTime);
    this.updateForm.controls.description.setValue(description);
    this.updateForm.controls.version.setValue(version);

  }

  closeUpdateModal() {
    this.updateModal = !this.updateModal;
    this.updateForm.reset();
  }

  closeInsertModal() {
    this.insertModal = !this.insertModal;
    this.form.reset();
  }

  toggleModal() {
    this.deleteModal = !this.deleteModal;
  }

  openDelete(rid) {
    this.deleteModal = true;
    this.rid = rid;
    console.log(this.rid);
  }
}
