import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
    constructor(private clientService: ClientService) {}

    @Patch('/:id')
    public async updateUser(@Body() body: UpdateClientDto, @Param() id: number) {
        // todo - add validation
        return await this.clientService.updateById(id, body);
    }

    public async deleteUser(@Param() id: number) {
        await this.clientService.delete({ id: id });

        return;
    }
}
