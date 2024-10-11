import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserInfo } from '../../../interfaces/UserInfo';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  classes: any = [];
  btnTitle!: string;
  title!: string;
  id: number;

  userForm: FormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      classs: new FormControl(null, Validators.required)
    });;

  constructor(private activatedRoute: ActivatedRoute, private serviceApi: ApiService) {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.serviceApi.getClasses().subscribe((classes) => {this.classes = classes});
    if(this.id){
      this.serviceApi.getUserInfo(this.id).subscribe((userInfo: UserInfo | any) => {
        this.userForm = new FormGroup({
          name: new FormControl(userInfo.name, Validators.required),
          email: new FormControl(userInfo.email, [Validators.required, Validators.email]),
          class: new FormControl(userInfo.classId, Validators.required)
        });
      })
    }
    this.title = !this.id ? "Novo usuário" : "Editar usuário - "+ this.id;
    this.btnTitle = !this.id ? "Criar" : "Editar";
  }

  onSubmit() {
    const {name, email, classs} = this.userForm.value;
    if(this.id){
      this.serviceApi.editUserInfo(this.id, name, email, classs);
    }else{
      this.serviceApi.createUser(name, email, classs);
    }
  }
}
