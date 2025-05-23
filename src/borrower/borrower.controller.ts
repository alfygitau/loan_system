import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { BorrowerService } from './borrower.service';
import { UpdateBorrowerDto } from './dtos/UpdateBorrower.dto';
import { CreateBorrowerDto } from './dtos/CreateBorrower.dto';

@Controller('borrower')
export class BorrowerController {
  constructor(private readonly borrowersService: BorrowerService) {}

  @Post()
  create(@Body() createBorrowerDto: CreateBorrowerDto) {
    return this.borrowersService.create(createBorrowerDto);
  }

  @Get()
  findAll() {
    return this.borrowersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.borrowersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBorrowerDto: UpdateBorrowerDto,
  ) {
    return this.borrowersService.update(id, updateBorrowerDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.borrowersService.remove(id);
  }
}
