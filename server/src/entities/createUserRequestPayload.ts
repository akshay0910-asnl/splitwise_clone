import { IsEmail, Length } from 'class-validator';

class CreateUserRequestPayload {
    @Length(5)
    name: string;
    
    @IsEmail()
    email: string;

    @Length(5)
    password: string;

    constructor(name: string, email: string, password: string){
        this.name = name;
        this.email = email;
        this.password = password;
    }

}

export default CreateUserRequestPayload;
