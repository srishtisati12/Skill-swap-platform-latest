import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SwapRequest } from './schemas/swap-request.schemas';
import { CreateRequestDto } from './dto/create-request.dto';
import { UserSkill } from '../user-skills/schemas/user-skill.schema';

@Injectable()
export class SwapRequestsService {
  constructor(
    @InjectModel(SwapRequest.name)
    private swapRequestModel: Model<SwapRequest>,
    @InjectModel(UserSkill.name)
    private userSkillModel: Model<UserSkill>,
  ) {}

  async createRequest(senderId: string, data: CreateRequestDto) {
    if (senderId === data.receiverId) {
      throw new BadRequestException(
        'You cannot send a request to yourself',
      );
    }

    const existingRequest = await this.swapRequestModel.findOne({
      senderId,
      receiverId: data.receiverId,
      skillOffered: data.skillOffered,
      skillWanted: data.skillWanted,
      status: { $in: ['PENDING', 'ACCEPTED'] },
    });

    if (existingRequest) {
      throw new ConflictException('This swap request already exists');
    }

    const offeredSkill = await this.userSkillModel.findOne({
      userId: senderId,
      skillId: data.skillOffered,
      type: 'TEACH',
    });

    if (!offeredSkill) {
      throw new BadRequestException(
        'You must have the offered skill in your TEACH list',
      );
    }

    const wantedSkill = await this.userSkillModel.findOne({
      userId: senderId,
      skillId: data.skillWanted,
      type: 'LEARN',
    });

    if (!wantedSkill) {
      throw new BadRequestException(
        'You must have the wanted skill in your LEARN list',
      );
    }
    const receiverCanTeach = await this.userSkillModel.findOne({
  userId: data.receiverId,
  skillId: data.skillWanted,
  type: 'TEACH',
});


const receiverCanLearn = await this.userSkillModel.findOne({
  userId: data.receiverId,
  skillId: data.skillOffered,
  type: 'LEARN',
});

if (!receiverCanTeach || !receiverCanLearn) {
  throw new BadRequestException('Skills do not match');
}

    const request = new this.swapRequestModel({
      senderId,
      receiverId: data.receiverId,
      skillOffered: data.skillOffered,
      skillWanted: data.skillWanted,
      status: 'PENDING',
    });

    return request.save();
  }

  
  async getRequests(userId: string) {
  return this.swapRequestModel.aggregate([
    {
      $match: {
        $or: [{ senderId: userId }, { receiverId: userId }],
      },
    },
    {
      $lookup: {
        from: 'skills',
        localField: 'skillOffered',
        foreignField: 'id',
        as: 'offeredSkill',
      },
    },
    { $unwind: '$offeredSkill' },
    {
      $lookup: {
        from: 'skills',
        localField: 'skillWanted',
        foreignField: 'id',
        as: 'wantedSkill',
      },
    },
    { $unwind: '$wantedSkill' },
    {
      $project: {
        id: 1,
        senderId: 1,
        receiverId: 1,
        status: 1,
        skillOffered: '$offeredSkill.name',
        skillWanted: '$wantedSkill.name',
        createdAt: 1,
      },
    },
  ]);
}

  
  async acceptRequest(id: string, userId: string) {
    const request = await this.swapRequestModel.findOne({ id });

    if (!request) {
      throw new NotFoundException('Request not found');
    }

    if (request.receiverId !== userId) {
      throw new ForbiddenException( 'Only the receiver can accept this request' );
    }

    if (request.status !== 'PENDING') {
      throw new BadRequestException(
        'This request has already been processed'
      );
    }

    request.status = 'ACCEPTED';
    return request.save();
  }

  
  async rejectRequest(id: string, userId: string) {
    const request = await this.swapRequestModel.findOne({ id });

    if (!request) {
      throw new NotFoundException('Request not found');
    }

    if (request.receiverId !== userId) {
      throw new ForbiddenException(
        'Only the receiver can reject this request'
      );
    }

    if (request.status !== 'PENDING') {
      throw new BadRequestException(
        'This request has already been processed'
      );
    }

    request.status = 'REJECTED';
    return request.save();
  }
}