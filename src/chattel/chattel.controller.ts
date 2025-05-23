import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ChattelService } from './chattel.service';
import { CreateChattelDto } from './dtos/CreateChattel.dto';
import { UpdateChattelDto } from './dtos/UpdateChattel.dto';

@Controller('chattel')
export class ChattelController {
  constructor(private readonly chattelService: ChattelService) {}

  @Post()
  create(@Body() createChattelDto: CreateChattelDto) {
    return this.chattelService.create(createChattelDto);
  }

  @Get()
  findAll() {
    return this.chattelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.chattelService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChattelDto: UpdateChattelDto,
  ) {
    return this.chattelService.update(id, updateChattelDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.chattelService.remove(id);
  }
}
