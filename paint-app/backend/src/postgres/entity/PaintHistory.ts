import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class PaintHistory {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column({ nullable: false })
    index: number
    
    @Column({ nullable: false })
    color: string

    @Column({ nullable: false })
    room: string
}