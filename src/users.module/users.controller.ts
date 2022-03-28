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
    Query, UseGuards
} from "@nestjs/common";
import {UsersService} from "./users.service";
import {
    IDeleteMethod,
    IGetAllMethod,
    IGetByIdMethod,
    IUpdateMethod
} from "../interfaces/methods.interface";
import {User} from "./user.model";
import {
    FieldCheck,
    NumberArrField,
    StringArrField,
    NumberField,
    StringField
} from "errors-checker";
import {UpdateUserDto} from "../dto/users/update-user.dto";
import {RegisterUserDto} from "../dto/users/register-user.dto";
import {AuthGuard} from "../guards/auth.guard";

@Controller("users")
export class UsersController implements IGetAllMethod<User>, IGetByIdMethod<User>, IUpdateMethod<User>, IDeleteMethod {
    constructor(private userService: UsersService) {
    }

    @Get()
    @UseGuards(AuthGuard)
    async getAll(@Query() query) {
        let params = [
            new NumberArrField('id', query.id, true),
            new StringArrField('login', query.login, true),
            new StringArrField('name', query.name, true),
            new StringArrField('surname', query.surname, true)
        ];

        let {errors, obj} = new FieldCheck(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        let limit = +query.limit || 100,
            offset = +query.offset || 0;

        let sortField = query.sortField || 'id',
            sortType = query.sortType || 'asc';

        return await this.userService.getAll({offset, limit, sortField, sortType, query: obj});
    }

    @Get("/:id")
    @UseGuards(AuthGuard)
    async getById(@Param("id") id: number) {
        let params = [
            new NumberField('id', id, false)
        ];

        let {errors, obj} = new FieldCheck(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        return this.userService.getById(id);
    }

    @Patch("/:id")
    @UseGuards(AuthGuard)
    async update(@Param("id") id: number, @Body() body: any) {
        let params = [
            new NumberField('id', id, false),
            new StringField('login', body.login, true),
            new StringField('name', body.name, true),
            new StringField('surname', body.surname, true)
        ];

        let {errors, obj} = new FieldCheck(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        let dto: UpdateUserDto = {
            name: obj.name,
            surname: obj.surname,
            login: obj.login,
        }

        return this.userService.update(id, dto);
    }

    @Delete("/:id")
    @UseGuards(AuthGuard)
    async delete(@Param("id") id: number) {
        let params = [
            new NumberField('id', id, false)
        ];

        let {errors, obj} = new FieldCheck(params).check();

        if (errors.length > 0) throw new HttpException({errors: errors}, HttpStatus.BAD_REQUEST);

        return this.userService.delete(id);
    }
}
