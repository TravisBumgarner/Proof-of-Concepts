import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class PaintHistory {
    @PrimaryColumn({ nullable: false, type:'bigint' })
    commitPosition: bigint

    @PrimaryColumn({ nullable: false })
    paintEventIndex: number

    @Column({ nullable: false })
    pixelIndex: number

    @Column({ nullable: false })
    color: string

    @Column({ nullable: false })
    room: string
}