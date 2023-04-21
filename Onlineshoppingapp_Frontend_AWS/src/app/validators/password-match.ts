import { FormGroup } from "@angular/forms";

export function mustMatch(controlParam: string, matchingControlParam:  string) {
    return (registerForm: FormGroup) => {
        const passwordControlParam = registerForm.controls[controlParam];
        const passwordMatchingControlParam = registerForm.controls[matchingControlParam];
        if (passwordMatchingControlParam.errors 
            && !passwordMatchingControlParam.errors.mustMatch) {
               return;
        }

        if (passwordControlParam.value !== passwordMatchingControlParam.value) {
           return  passwordMatchingControlParam.setErrors({mustMatch: true})
        } else {
            return  passwordMatchingControlParam.setErrors(null)
        }
    }
}