import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity('likes')
export class Like {
  @PrimaryColumn()
  post_id: string;

  @PrimaryColumn()
  wallet_address: string;

  @ManyToOne(() => Post, post => post.likes)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => User, user => user.likes)
  @JoinColumn({ name: 'wallet_address' })
  user: User;
}
