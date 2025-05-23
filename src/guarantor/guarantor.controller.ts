import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Guarantor } from './entities/Guarantor';
import { UpdateGuarantorDto } from './dtos/UpdateGuarantor.dto';
import { CreateGuarantorDto } from './dtos/CreateGuarantor.dto';
import { GuarantorService } from './guarantor.service';

@Controller('guarantor')
export class GuarantorController {
  constructor(private readonly guarantorsService: GuarantorService) {}

  @Post()
  create(@Body() createGuarantorDto: CreateGuarantorDto): Promise<Guarantor> {
    return this.guarantorsService.create(createGuarantorDto);
  }

  @Get()
  findAll(): Promise<Guarantor[]> {
    return this.guarantorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Guarantor> {
    return this.guarantorsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGuarantorDto: UpdateGuarantorDto,
  ): Promise<Guarantor> {
    return this.guarantorsService.update(id, updateGuarantorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.guarantorsService.remove(id);
  }
}
