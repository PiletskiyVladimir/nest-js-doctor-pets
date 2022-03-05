import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query
} from "@nestjs/common";
import { UsersService } from "./users.service";
import {
    ICreateMethod,
    IDeleteMethod,
    IGetAllMethod,
    IGetByIdMethod,
    IUpdateMethod
} from "../interfaces/methods.interface";
import { User } from "./user.model";
import { FieldsCheckOutput, Field } from "errors-checker";
import { UpdateUserDto } from "../dto/users/update-user.dto";
import { RegisterUserDto } from "../dto/users/register-user.dto";

@Controller("users")
export class UsersController implements IGetAllMethod<User>, IGetByIdMethod<User>, IUpdateMethod<User>, IDeleteMethod {
    constructor(private userService: UsersService) {}

    @Get()
    async getAll(@Query() query) {
        let params = [
            new Field('id', query.id, 'numberArr', true),
            new Field('login', query.login, 'stringArr', true),
            new Field('name', query.name, 'stringArr', true),
            new Field('surname', query.surname, 'stringArr', true)
        ];

        let {errors, obj} = new FieldsCheckOutput(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        let limit = +query.limit || 100,
            offset = +query.offset || 0;

        let sortField = query.sortField || 'id',
            sortType = query.sortType || 'asc';

        return await this.userService.getAll({offset, limit, sortField, sortType, query: obj});
    }

    @Get("/:id")
    async getById(@Param("id") id: number) {
        let params = [
            new Field('id', id, 'number', false)
        ];

        let {errors, obj} = new FieldsCheckOutput(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        return this.userService.getById(id);
    }

    @Patch("/:id")
    async update(@Param("id") id: number, @Body() body: any) {
        let params = [
            new Field('id', id, 'number', false),
            new Field('login', body.login, 'string', true),
            new Field('name', body.name, 'string', true),
            new Field('surname', body.surname, 'string', true)
        ];

        let {errors, obj} = new FieldsCheckOutput(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        let dto: UpdateUserDto = {
            name: obj.name,
            surname: obj.surname,
            login: obj.login,
        }

        return this.userService.update(id, dto);
    }

    @Delete("/:id")
    async delete(@Param("id") id: number) {
        let params = [
            new Field('id', id, 'number', false)
        ];

        let {errors, obj} = new FieldsCheckOutput(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        return this.userService.delete(id);
    }
}
