import { IsEmail, IsNotEmpty, Length, MaxLength, MinLength } from 'class-validator';
export class UserCreateDto{

    @IsEmail()
    @IsNotEmpty()
    readonly email:string

    @IsNotEmpty()
    @MinLength(8, {
        message: 'Пароль слишком короткий',
    })
    @MaxLength(30, {
        message: 'Пароль слишком длинный',
    })
    readonly password:string
}