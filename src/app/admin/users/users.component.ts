import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from './users.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  deleteModal = false;
  updateModal = false;
  insertModal = false;

  usersList: any;
  form: FormGroup;
  uid: number;
  updateForm: FormGroup;


  constructor(private usersService: UsersService,
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe((data: any) => {
      this.usersList = data;
      console.log(this.usersList);
    });

    this.form = this.formBuilder.group({
      id: [],
      email: ['', Validators.required ],
      recordStatus: ['', Validators.required ],
      isVerified: [''],
      createDateTime: [''],
      updateDateTime: [''],
      deletedDateTime: [''],
      description: [''],
      version: [''],
    });

    this.updateForm = this.formBuilder.group({
      email: [''],
      isVerified: [''],
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
    this.usersService.registerUser(values).subscribe(
      get => {
        this.usersService.getAllUsers().subscribe((data: any) => {
          this.usersList = data;
        });
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );

    this.insertModal = false;

  }


  onDelete() {
    this.usersService.deleteUser(this.uid).subscribe(
      get => {
        this.usersService.getAllUsers().subscribe((data: any) => {
          this.usersList = data;
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
    this.usersService.updateUser(values, this.uid).subscribe(
      get => {
        this.usersService.getAllUsers().subscribe((data: any) => {
          this.usersList = data;
        });
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
    this.updateModal = false;
  }

  openInsert() {
    console.log('insert is called');
    this.insertModal = true;
    console.log('from open insert', this.insertModal);
  }

  openUpdate(
    id,
    isVerified,
    email,
    recordStatus,
    updateDateTime,
    deletedDateTime,
    description,
    version: number) {
    this.uid = id;
    this.updateModal = true;
    this.updateForm.controls.email.setValue(email);
    this.updateForm.controls.isVerified.setValue(isVerified);
    this.updateForm.controls.recordStatus.setValue(recordStatus);
    this.updateForm.controls.updateDateTime.setValue(updateDateTime);
    this.updateForm.controls.deletedDateTime.setValue(deletedDateTime);
    this.updateForm.controls.description.setValue(description);
    this.updateForm.controls.version.setValue(version);

  }

  closeUpdateModal() {
    this.updateModal = !this.updateModal;
    ;
    this.updateForm.reset();
  }

  closeInsertModal() {
    this.insertModal = !this.insertModal;
    this.form.reset();
  }

  toggleModal() {
    this.deleteModal = !this.deleteModal;
  }

  openDelete(uid) {
    this.deleteModal = true;
    this.uid = uid;
    console.log('on Open Update', this.uid);
  }
}
