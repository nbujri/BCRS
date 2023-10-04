"use strict";(self.webpackChunkbcrs=self.webpackChunkbcrs||[]).push([[667],{8667:(Q,c,l)=>{l.r(c),l.d(c,{AdminModule:()=>M});var u=l(6814),p=l(9862),n=l(9351),s=l(95),e=l(9468);let U=(()=>{class t{static#e=this.\u0275fac=function(i){return new(i||t)};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["app-admin"]],decls:1,vars:0,template:function(i,o){1&i&&e._UZ(0,"router-outlet")},dependencies:[n.lC],encapsulation:2})}return t})(),f=(()=>{class t{constructor(r){this.http=r}findAllUsers(){return this.http.get("/api/users")}findByEmail(r){return this.http.get("/api/users/"+r)}createUser(r){return this.http.post("/api/users/",{user:r})}updateUser(r,i){return this.http.put("/api/users/"+r,{user:i})}deleteUser(r){return this.http.delete("/api/users/"+r)}static#e=this.\u0275fac=function(i){return new(i||t)(e.LFG(p.eN))};static#t=this.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function h(t,a){if(1&t&&(e.TgZ(0,"div",36),e._uU(1),e.qZA()),2&t){const r=e.oxw();e.xp6(1),e.hij(" ",r.errorMessage," ")}}function g(t,a){if(1&t&&(e.TgZ(0,"div",37),e._uU(1),e.qZA()),2&t){const r=e.oxw();e.xp6(1),e.hij(" ",r.successMessage," ")}}function Z(t,a){1&t&&(e.TgZ(0,"div",38)(1,"div",39)(2,"span",40),e._uU(3,"Loading..."),e.qZA()()())}function _(t,a){if(1&t){const r=e.EpF();e.ynx(0),e.TgZ(1,"tr")(2,"td"),e._uU(3),e.qZA(),e.TgZ(4,"td"),e._uU(5),e.qZA(),e.TgZ(6,"td"),e._uU(7),e.qZA(),e.TgZ(8,"td"),e._uU(9),e.qZA(),e.TgZ(10,"td"),e._uU(11),e.qZA(),e.TgZ(12,"td")(13,"a",42)(14,"span",43),e._uU(15,"edit"),e.qZA()(),e.TgZ(16,"a",44),e.NdJ("click",function(){e.CHM(r);const o=e.oxw().$implicit,d=e.oxw();return e.KtG(d.deleteUser(o.email))}),e.TgZ(17,"span",43),e._uU(18,"delete"),e.qZA()()()(),e.BQk()}if(2&t){const r=e.oxw().$implicit;e.xp6(3),e.Oqu(r.email),e.xp6(2),e.Oqu(r.firstName),e.xp6(2),e.Oqu(r.lastName),e.xp6(2),e.Oqu(r.phoneNumber),e.xp6(2),e.Oqu(r.role),e.xp6(2),e.MGl("routerLink","/admin/users/",r.email,"/user-update")}}function b(t,a){if(1&t&&(e.TgZ(0,"tbody",41),e.YNc(1,_,19,6,"ng-container",14),e.qZA()),2&t){const r=a.$implicit;e.xp6(1),e.Q6J("ngIf",!1===r.isDisabled)}}function v(t,a){1&t&&(e.TgZ(0,"div")(1,"div",45),e._uU(2," Email is required. "),e._UZ(3,"button",46),e.qZA()())}function q(t,a){1&t&&(e.TgZ(0,"div")(1,"div",45),e._uU(2," Please enter a valid email address. "),e._UZ(3,"button",46),e.qZA()())}function N(t,a){1&t&&(e.TgZ(0,"div")(1,"div",45),e._uU(2," Password is required. "),e._UZ(3,"button",46),e.qZA()())}function A(t,a){1&t&&(e.TgZ(0,"div")(1,"div",45),e._uU(2," Password must be 8 character and contain one upper and lowercase letter, and one number "),e._UZ(3,"button",46),e.qZA()())}function T(t,a){1&t&&(e.TgZ(0,"div")(1,"div",45),e._uU(2," First name is required. "),e._UZ(3,"button",46),e.qZA()())}function F(t,a){1&t&&(e.TgZ(0,"div")(1,"div",45),e._uU(2," Last name is required. "),e._UZ(3,"button",46),e.qZA()())}function y(t,a){1&t&&(e.TgZ(0,"div")(1,"div",45),e._uU(2," Role is required. "),e._UZ(3,"button",46),e.qZA()())}function x(t,a){1&t&&(e.TgZ(0,"div")(1,"div",29),e._uU(2," Email is required. "),e._UZ(3,"button",30),e.qZA()())}function I(t,a){1&t&&(e.TgZ(0,"div")(1,"div",29),e._uU(2," Please enter a valid email address. "),e._UZ(3,"button",30),e.qZA()())}function k(t,a){1&t&&(e.TgZ(0,"div")(1,"div",29),e._uU(2," First name is required. "),e._UZ(3,"button",30),e.qZA()())}function w(t,a){1&t&&(e.TgZ(0,"div")(1,"div",29),e._uU(2," Last name is required. "),e._UZ(3,"button",30),e.qZA()())}function J(t,a){1&t&&(e.TgZ(0,"div")(1,"div",29),e._uU(2," Role is required. "),e._UZ(3,"button",30),e.qZA()())}const L=[{path:"",component:U,children:[{path:"users",component:(()=>{class t{constructor(r,i,o){this.userService=r,this.fb=i,this.router=o,this.addUserForm=this.fb.group({email:[null,s.kI.compose([s.kI.required,s.kI.email])],password:[null,s.kI.compose([s.kI.required,s.kI.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")])],firstName:[null,s.kI.compose([s.kI.required])],lastName:[null,s.kI.compose([s.kI.required])],address:[null],phoneNumber:[null],role:[null,s.kI.compose([s.kI.required])]}),this.users=[],this.successMessage="",this.errorMessage="",this.isLoading=!0,this.updateTable()}deleteUser(r){confirm("Are you sure you want to disable the following user?\n"+r)&&this.userService.deleteUser(r).subscribe({next:i=>{this.users=this.users.filter(o=>o.email!==r)},error:i=>{this.errorMessage=i.message,console.error(i),this.hideAlert()}})}createUser(){const r={email:this.addUserForm.controls.email.value,firstName:this.addUserForm.controls.firstName.value,lastName:this.addUserForm.controls.lastName.value,password:this.addUserForm.controls.password.value,phoneNumber:this.addUserForm.controls.phoneNumber.value||"",address:this.addUserForm.controls.address.value||"",isDisabled:!1,role:this.addUserForm.controls.role.value};console.log(r),this.userService.createUser(r).subscribe({next:i=>{console.log(i),this.successMessage="user successfully created",this.hideAlert(),this.updateTable()},error:i=>{this.errorMessage=i.error.message?i.error.message:"unable to create user, please contact system admin",this.hideAlert()}})}hideAlert(){setTimeout(()=>{this.successMessage="",this.errorMessage=""},3e3)}updateTable(){this.userService.findAllUsers().subscribe({next:r=>{this.users=r,console.log("users: ",this.users),this.isLoading=!1},error:r=>{this.errorMessage=r.message,console.log(r),this.isLoading=!1},complete:()=>{this.isLoading=!1}})}static#e=this.\u0275fac=function(i){return new(i||t)(e.Y36(f),e.Y36(s.qu),e.Y36(n.F0))};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["app-user-list"]],decls:78,vars:13,consts:[[1,"container-fluid","p-3"],[1,"text-center"],["class","alert alert-danger text-center","role","alert",4,"ngIf"],["class","alert alert-success text-center","role","alert",4,"ngIf"],[1,"row","justify-content-center","g-5","mt-2"],[1,"col-6"],[1,"table","table-hover"],[1,"table-dark"],["class","d-flex justify-content-center mt-5",4,"ngIf"],["class","table-striped",4,"ngFor","ngForOf"],[1,"col-4","text-center"],[1,"card-body","border","p-5","add-user-card"],[3,"formGroup","ngSubmit"],[1,"form-group"],[4,"ngIf"],[1,"mb-3"],["for","email"],["type","email","id","email","formControlName","email","required","",1,"form-control"],["for","password"],["type","password","id","password","required","","formControlName","password",1,"form-control"],["for","firstName"],["type","text","id","firstName","formControlName","firstName","required","",1,"form-control"],["for","lastName"],["type","text","id","lastName","formControlName","lastName","required","",1,"form-control"],["for","address"],["type","text","formControlName","address","id","address",1,"form-control"],["for","phoneNumber"],["type","text","formControlName","phoneNumber","id","phoneNumber",1,"form-control"],[1,"mb-5"],["for","role"],["name","role","id","role","formControlName","role","required","",1,"form-select"],["value","standard"],["value","admin"],[1,"row","mt-5","gy-4"],["type","submit",1,"btn","btn-dark","btn-yellow-text",3,"disabled"],["type","button",1,"btn","btn-dark","btn-yellow-text",3,"click"],["role","alert",1,"alert","alert-danger","text-center"],["role","alert",1,"alert","alert-success","text-center"],[1,"d-flex","justify-content-center","mt-5"],["role","status","aria-hidden","true",1,"spinner-border","spinner-lg",2,"width","3rem","height","3rem"],[1,"sr-only","visually-hidden"],[1,"table-striped"],[3,"routerLink"],[1,"material-icons","text-secondary"],[1,"del-link",3,"click"],["role","alert",1,"alert","alert-danger","alert-dismissible","fade","show"],["type","button","data-bs-dismiss","alert","aria-label","close",1,"btn-close"]],template:function(i,o){1&i&&(e.TgZ(0,"div",0)(1,"h1",1),e._uU(2,"User Configuration"),e.qZA(),e.YNc(3,h,2,1,"div",2),e.YNc(4,g,2,1,"div",3),e.TgZ(5,"div",4)(6,"div",5)(7,"div")(8,"table",6)(9,"thead",7)(10,"tr")(11,"th"),e._uU(12,"Email"),e.qZA(),e.TgZ(13,"th"),e._uU(14,"First Name"),e.qZA(),e.TgZ(15,"th"),e._uU(16,"Last Name"),e.qZA(),e.TgZ(17,"th"),e._uU(18,"Phone #"),e.qZA(),e.TgZ(19,"th"),e._uU(20,"Role"),e.qZA(),e.TgZ(21,"th"),e._uU(22,"Actions"),e.qZA()()(),e.YNc(23,Z,4,0,"div",8),e.YNc(24,b,2,1,"tbody",9),e.qZA()()(),e.TgZ(25,"div",10)(26,"div",11)(27,"h2"),e._uU(28,"Add User"),e.qZA(),e.TgZ(29,"form",12),e.NdJ("ngSubmit",function(){return o.createUser(),o.addUserForm.reset()}),e.TgZ(30,"fieldset",13),e.YNc(31,v,4,0,"div",14),e.YNc(32,q,4,0,"div",14),e.TgZ(33,"div",15)(34,"label",16),e._uU(35,"*Email:"),e.qZA(),e._UZ(36,"input",17),e.qZA(),e.YNc(37,N,4,0,"div",14),e.YNc(38,A,4,0,"div",14),e.TgZ(39,"div",15)(40,"label",18),e._uU(41,"*Password"),e.qZA(),e._UZ(42,"input",19),e.qZA(),e.YNc(43,T,4,0,"div",14),e.TgZ(44,"div",15)(45,"label",20),e._uU(46,"*First Name:"),e.qZA(),e._UZ(47,"input",21),e.qZA(),e.YNc(48,F,4,0,"div",14),e.TgZ(49,"div",15)(50,"label",22),e._uU(51,"*Last Name:"),e.qZA(),e._UZ(52,"input",23),e.qZA(),e.TgZ(53,"div",15)(54,"label",24),e._uU(55,"Address:"),e.qZA(),e._UZ(56,"input",25),e.qZA(),e.TgZ(57,"div",15)(58,"label",26),e._uU(59,"Phone:"),e.qZA(),e._UZ(60,"input",27),e.qZA(),e.YNc(61,y,4,0,"div",14),e.TgZ(62,"div",28)(63,"label",29),e._uU(64,"*Role:"),e.qZA(),e.TgZ(65,"select",30)(66,"option",31),e._uU(67,"Standard"),e.qZA(),e.TgZ(68,"option",32),e._uU(69,"Admin"),e.qZA()()()(),e.TgZ(70,"p")(71,"strong"),e._uU(72,"*Required Fields"),e.qZA()(),e.TgZ(73,"div",33)(74,"button",34),e._uU(75," Submit "),e.qZA(),e.TgZ(76,"button",35),e.NdJ("click",function(){return o.addUserForm.reset()}),e._uU(77," Reset "),e.qZA()()()()()()()),2&i&&(e.xp6(3),e.Q6J("ngIf",o.errorMessage),e.xp6(1),e.Q6J("ngIf",o.successMessage),e.xp6(19),e.Q6J("ngIf",o.isLoading),e.xp6(1),e.Q6J("ngForOf",o.users),e.xp6(5),e.Q6J("formGroup",o.addUserForm),e.xp6(2),e.Q6J("ngIf",o.addUserForm.controls.email.touched&&o.addUserForm.controls.email.hasError("required")),e.xp6(1),e.Q6J("ngIf",o.addUserForm.controls.email.hasError("email")),e.xp6(5),e.Q6J("ngIf",o.addUserForm.controls.password.touched&&o.addUserForm.controls.password.hasError("required")),e.xp6(1),e.Q6J("ngIf",o.addUserForm.controls.password.hasError("pattern")),e.xp6(5),e.Q6J("ngIf",o.addUserForm.controls.firstName.touched&&o.addUserForm.controls.firstName.hasError("required")),e.xp6(5),e.Q6J("ngIf",o.addUserForm.controls.lastName.touched&&o.addUserForm.controls.lastName.hasError("required")),e.xp6(13),e.Q6J("ngIf",o.addUserForm.controls.role.touched&&o.addUserForm.controls.role.hasError("required")),e.xp6(13),e.Q6J("disabled",!o.addUserForm.valid))},dependencies:[u.sg,u.O5,n.rH,s._Y,s.YN,s.Kr,s.Fj,s.EJ,s.JJ,s.JL,s.Q7,s.sg,s.u],styles:[".add-user-card[_ngcontent-%COMP%]{background-color:#740001;color:#eeba30}.btn-yellow-text[_ngcontent-%COMP%]{color:#eeba30}.del-link[_ngcontent-%COMP%]:hover{cursor:pointer}"]})}return t})(),title:"BCRS: Users"},{path:"users/:email/user-update",component:(()=>{class t{constructor(r,i,o,d){this.userService=r,this.fb=i,this.router=o,this.route=d,this.userUpdateForm=this.fb.group({email:[null,s.kI.compose([s.kI.required,s.kI.email])],firstName:[null,s.kI.compose([s.kI.required])],lastName:[null,s.kI.compose([s.kI.required])],address:[null],phoneNumber:[null],role:[null,s.kI.compose([s.kI.required])]}),this.user={},this.email=this.route.snapshot.paramMap.get("email")||"",console.log(this.email),this.userService.findByEmail(this.email).subscribe({next:m=>{this.user=m,console.log("user:",m)},error:m=>{console.log(m)},complete:()=>{this.userUpdateForm.controls.email.setValue(this.user.email),this.userUpdateForm.controls.firstName.setValue(this.user.firstName),this.userUpdateForm.controls.lastName.setValue(this.user.lastName),this.userUpdateForm.controls.address.setValue(this.user.address),this.userUpdateForm.controls.phoneNumber.setValue(this.user.phoneNumber),this.userUpdateForm.controls.role.setValue(this.user.role)}})}updateUser(){let r={};r.email=this.userUpdateForm.controls.email.value,r.firstName=this.userUpdateForm.controls.firstName.value,r.lastName=this.userUpdateForm.controls.lastName.value,r.address=this.userUpdateForm.controls.address.value||"",r.phoneNumber=this.userUpdateForm.controls.phoneNumber.value||"",r.role=this.userUpdateForm.controls.role.value,console.log("updated user info: ",r),this.userService.updateUser(this.email,r).subscribe({next:i=>{console.log(i),this.router.navigate(["/admin/users"])},error:i=>{console.error(i)}})}static#e=this.\u0275fac=function(i){return new(i||t)(e.Y36(f),e.Y36(s.qu),e.Y36(n.F0),e.Y36(n.gz))};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["app-user-update"]],decls:52,vars:7,consts:[[1,"container-fluid","bg"],[1,"row","justify-content-center","pt-4"],[1,"col-10"],[1,"card"],[1,"row","card-body","justify-content-center","bg"],[1,"col-6","text-center"],[1,"card-body","border","p-5","update-form-card"],[3,"formGroup","ngSubmit"],[1,"form-group"],[4,"ngIf"],[1,"mb-3"],["for","email"],["type","email","id","email","formControlName","email","required","",1,"form-control"],["for","firstName"],["type","text","id","firstName","formControlName","firstName","required","",1,"form-control"],["for","lastName"],["type","text","id","lastName","formControlName","lastName","required","",1,"form-control"],["for","address"],["type","text","formControlName","address","id","address",1,"form-control"],["for","phoneNumber"],["type","text","formControlName","phoneNumber","id","phoneNumber",1,"form-control"],[1,"mb-5"],["for","role"],["name","role","id","role","formControlName","role","required","",1,"form-select"],["value","standard"],["value","admin"],[1,"row","mt-5","gy-4"],["type","submit",1,"btn","btn-dark","btn-yellow-text",3,"disabled"],["type","button","routerLink","/admin/users",1,"btn","btn-dark","btn-yellow-text"],["role","alert",1,"alert","alert-danger","alert-dismissible","fade","show"],["type","button","data-bs-dismiss","alert","aria-label","close",1,"btn-close"]],template:function(i,o){1&i&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"div",6)(7,"h2"),e._uU(8,"Update user"),e.qZA(),e.TgZ(9,"form",7),e.NdJ("ngSubmit",function(){return o.updateUser()}),e.TgZ(10,"fieldset",8),e.YNc(11,x,4,0,"div",9),e.YNc(12,I,4,0,"div",9),e.TgZ(13,"div",10)(14,"label",11),e._uU(15,"*Email:"),e.qZA(),e._UZ(16,"input",12),e.qZA(),e.YNc(17,k,4,0,"div",9),e.TgZ(18,"div",10)(19,"label",13),e._uU(20,"*First Name:"),e.qZA(),e._UZ(21,"input",14),e.qZA(),e.YNc(22,w,4,0,"div",9),e.TgZ(23,"div",10)(24,"label",15),e._uU(25,"*Last Name:"),e.qZA(),e._UZ(26,"input",16),e.qZA(),e.TgZ(27,"div",10)(28,"label",17),e._uU(29,"Address:"),e.qZA(),e._UZ(30,"input",18),e.qZA(),e.TgZ(31,"div",10)(32,"label",19),e._uU(33,"Phone:"),e.qZA(),e._UZ(34,"input",20),e.qZA(),e.YNc(35,J,4,0,"div",9),e.TgZ(36,"div",21)(37,"label",22),e._uU(38,"*Role:"),e.qZA(),e.TgZ(39,"select",23)(40,"option",24),e._uU(41,"Standard"),e.qZA(),e.TgZ(42,"option",25),e._uU(43,"Admin"),e.qZA()()()(),e.TgZ(44,"p")(45,"strong"),e._uU(46,"*Required Fields"),e.qZA()(),e.TgZ(47,"div",26)(48,"button",27),e._uU(49," Submit "),e.qZA(),e.TgZ(50,"button",28),e._uU(51," Cancel "),e.qZA()()()()()()()()()()),2&i&&(e.xp6(9),e.Q6J("formGroup",o.userUpdateForm),e.xp6(2),e.Q6J("ngIf",o.userUpdateForm.controls.email.touched&&o.userUpdateForm.controls.email.hasError("required")),e.xp6(1),e.Q6J("ngIf",o.userUpdateForm.controls.email.hasError("email")),e.xp6(5),e.Q6J("ngIf",o.userUpdateForm.controls.firstName.touched&&o.userUpdateForm.controls.firstName.hasError("required")),e.xp6(5),e.Q6J("ngIf",o.userUpdateForm.controls.lastName.touched&&o.userUpdateForm.controls.lastName.hasError("required")),e.xp6(13),e.Q6J("ngIf",o.userUpdateForm.controls.role.touched&&o.userUpdateForm.controls.role.hasError("required")),e.xp6(13),e.Q6J("disabled",!o.userUpdateForm.valid))},dependencies:[u.O5,n.rH,s._Y,s.YN,s.Kr,s.Fj,s.EJ,s.JJ,s.JL,s.Q7,s.sg,s.u],styles:[".bg[_ngcontent-%COMP%]{background-color:#000}.update-form-card[_ngcontent-%COMP%]{background-color:#740001;color:#eeba30}.btn-yellow-text[_ngcontent-%COMP%]{color:#eeba30}"]})}return t})(),title:"BCRS: User Update"}]}];let Y=(()=>{class t{static#e=this.\u0275fac=function(i){return new(i||t)};static#t=this.\u0275mod=e.oAB({type:t});static#r=this.\u0275inj=e.cJS({imports:[n.Bz.forChild(L),n.Bz]})}return t})(),M=(()=>{class t{static#e=this.\u0275fac=function(i){return new(i||t)};static#t=this.\u0275mod=e.oAB({type:t});static#r=this.\u0275inj=e.cJS({imports:[u.ez,Y,p.JF,n.Bz,s.u5,s.UX]})}return t})()}}]);