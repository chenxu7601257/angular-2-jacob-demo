import {Component, OnInit} from 'angular2/core';
import {ContactComponent} from './contact.component';
import {ContactService} from './contact.service';
import { Contact } from './contact';
import { Router, ROUTER_DIRECTIVES, RouteParams } from "angular2/router";
import { ControlGroup, FormBuilder } from 'angular2/common';
import { Validators } from "angular2/src/common/forms";

@Component({
    selector:'new-contact',
    template:`
    <form [ngFormModel]='myForm' (ngSubmit)='onSubmit(myForm.value)'>
       <div>
            <div>
                <label for='first-name'>First Name:</label>
                <input type='text' id='first-name'
                  [ngFormControl]='myForm.controls["firstName"]'
                  #firstName='ngForm'
                >
                <span *ngIf='!myForm.controls["firstName"].valid'>Not valid</span>
                <span *ngIf='!firstName.valid'>ngForm Not valid</span>
                <br/> 
            </div>
            <div>
                <label for='last-name'>Last Name:</label>
                <input type='text' id='last-name'   
                [ngFormControl]='myForm.controls["lastName"]'
                ><br/> 
            </div>
            <div>
                <label for='phone'>Phone number:</label>
                <input type='text' id='phone'   
                [ngFormControl]='myForm.controls["phone"]'
                ><br/> 
            </div>
            <div>
                <label for='email'>E-Mail:</label>
                <input type='text' id='email'    
                [ngFormControl]='myForm.controls["email"]'
                ><br/> 
            </div> 
        </div>
        <br/> 
        <button type='submit' [disabled]='!myForm.valid'>Create Contact</button>
     </form>
    `,
    styles:[
        `
            label{
                display:inline-block;
                width:140px;
            }
            input{
                width:250px;
            }

            .ng-invalid{
                border:1px solid red;
            }
        `
    ],
    providers:[ContactService,ROUTER_DIRECTIVES]
})

export class NewContactComponent implements OnInit {
        
    myForm:ControlGroup;
     
    constructor(private _contactService:ContactService,private _router:Router,
    private _routerParams:RouteParams, private _formBuilder:FormBuilder){

    }

     onAddContact(firstName:string,lastName:string,phone:string,email:string){
        const dummyContact={
            firstName:firstName,
            lastName: lastName,
            phone:phone,
            email:email,
         };
         this._contactService.insertContact(dummyContact);
         this._router.navigate(['Contacts']);
     }

     ngOnInit() {
             
             this.myForm=this._formBuilder.group({
                 'firstName':['',Validators.required],
                 'lastName':[this._routerParams.get('lastName'),Validators.required],
                 'phone':['',Validators.required],
                 'email':['',Validators.required]
             });
        }


     onSubmit(value){
        this._contactService.insertContact(value);

        this._router.navigate(['Contacts']);
     }
}