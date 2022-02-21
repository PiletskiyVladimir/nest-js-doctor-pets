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
import { ICommonMethods } from "../interfaces/methods.interface";
import { User } from "./user.model";
import { FieldsCheckOutput, Field } from "errors-checker";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController implements ICommonMethods<User> {
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

    @Post()
    async create(@Body() body: any) {
        let params = [
            new Field('login', body.login, 'string', false),
            new Field('password', body.password, 'string', false),
            new Field('name', body.name, 'string', false),
            new Field('surname', body.surname, 'string', false)
        ];

        let {errors, obj} = new FieldsCheckOutput(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        let dto: CreateUserDto = {
            name: obj.name,
            surname: obj.surname,
            login: obj.login,
            password: obj.password
        }

        return this.userService.create(dto);
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
