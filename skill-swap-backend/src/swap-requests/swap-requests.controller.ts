import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SwapRequestsService } from './swap-requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('swap-requests')
export class SwapRequestsController {
  constructor(
    private readonly swapRequestsService: SwapRequestsService,
  ) {}

  @Post()
  createRequest(@Req() req: any, @Body() data: CreateRequestDto) {
    return this.swapRequestsService.createRequest(
      req.user.sub,
      data,
    );
  }

  @Get()
  getRequests(@Req() req: any) {
    return this.swapRequestsService.getRequests(req.user.sub);
  }

  @Patch(':id/accept')
  acceptRequest(@Param('id') id: string, @Req() req: any) {
    return this.swapRequestsService.acceptRequest(
      id,
      req.user.sub,
    );
  }

  @Patch(':id/reject')
  rejectRequest(@Param('id') id: string, @Req() req: any) {
    return this.swapRequestsService.rejectRequest(
      id,
      req.user.sub,
    );
  }
}