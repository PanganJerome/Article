import { FormGroup } from "@angular/forms";

export function ConfirmedValidator(password: string, password_confirmation: string){
    return (formGroup: FormGroup) => {
        const pass = formGroup.controls[password];
        const pass_con = formGroup.controls[password_confirmation];
        if (pass_con.errors && !pass_con.errors['confirmedValidator']) {
            return;
        }
        if (pass.value !== pass_con.value) {
            pass_con.setErrors({ confirmedValidator: true });
        } else {
            pass_con.setErrors(null);
        }
    }
}