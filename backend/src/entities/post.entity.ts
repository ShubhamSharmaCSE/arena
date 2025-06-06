import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  wallet_address: string;

  @Column({ length: 280 })
  content: string;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'wallet_address' })
  user: User;

  @OneToMany(() => Like, like => like.post)
  likes: Like[];

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];
}
