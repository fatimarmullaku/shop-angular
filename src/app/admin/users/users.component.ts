import {Component, OnInit} from '@angular/core';
import {RolesModel} from './roles/roles.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UsersService} from './users.service';
import {RolesService} from './roles/roles.service';
import {UsersModel} from './users.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  // state
  usersList: UsersModel[];
  rolesList: RolesModel[];
  roles: RolesModel[];
  usersForm: FormGroup;
  updateForm: FormGroup;
  selectedUserId: number;
  selectedRoleId: number;


  constructor(private usersService: UsersService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private rolesService: RolesService,
  ) {
  }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe((data: any) => {
      this.usersList = data;
      console.log(this.usersList);
    });

    this.rolesService.getAllRoles().subscribe((data: any) => {
      this.rolesList = data;
    });

    this.usersForm = this.formBuilder.group({
      email: [''],
      password: [''],
      isVerified: [''],
      recordStatus: [''],
      createDateTime: [''],
      updateDateTime: [''],
      description: [''],
      version: ['']
    });

    this.updateForm = this.formBuilder.group({
      email: [''],
      password: [''],
      isVerified: [''],
      recordStatus: [''],
      updateDateTime: [''],
      description: [''],
      version: ['']
    });


  }


  onSubmit() {
    const values = this.usersForm.value;
  }

}
