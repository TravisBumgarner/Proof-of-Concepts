import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class PaintHistory {
    @PrimaryColumn({ nullable: false })
    public id: string;

    @Column({ nullable: false })
    index: number

    @Column({ nullable: false })
    color: string

    @Column({ nullable: false })
    room: string
}