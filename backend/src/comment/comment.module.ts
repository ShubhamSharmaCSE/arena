import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { EntitiesModule } from '../entities/entities.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [EntitiesModule, UserModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
