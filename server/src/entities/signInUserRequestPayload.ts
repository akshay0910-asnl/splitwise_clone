import { IsEmail, Length } from 'class-validator';

class SignInUserRequestPayload {
    
    @IsEmail()
    email: string;

    @Length(5)
    password: string;

    constructor( email: string, password: string){
        this.email = email;
        this.password = password;
    }

}

export default SignInUserRequestPayload;
