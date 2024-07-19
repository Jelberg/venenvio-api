export class User {
    _id?: string;
    name: string;
    password: string;
    lastname: string;
    dni: string;
    birthdate: Date;
    email: string;
    phone: string;
    address: string;
    gender: string;
    active: boolean
    token: string;
    verified: boolean;
    images: string[];
    roles: string[];

    constructor(name: string, lastname:string, email: string, phone: string, address: string, 
        gender: string, active: boolean, token: string, verified: boolean, 
        images: string[], roles: string[], dni: string, birthdate: Date, password: string){
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.gender = gender;
        this.active = active;
        this.token = token;
        this.verified = verified;
        this.images = images;
        this.roles = roles;
        this.dni = dni;
        this.birthdate = birthdate;
        this.password = password;
    }
}
