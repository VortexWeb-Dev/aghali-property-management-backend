import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountingsService } from './accountings.service';
import { CreateAccountingDto } from './dto/create-accounting.dto';
import { UpdateAccountingDto } from './dto/update-accounting.dto';

@Controller('accountings')
export class AccountingsController {
  constructor(private readonly accountingsService: AccountingsService) {}

  @Post()
  create(@Body() createAccountingDto: CreateAccountingDto) {
    return this.accountingsService.create(createAccountingDto);
  }

  @Get()
  findAll() {
    return this.accountingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountingDto: UpdateAccountingDto) {
    return this.accountingsService.update(+id, updateAccountingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountingsService.remove(+id);
  }
}
