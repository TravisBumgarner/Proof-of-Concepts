import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class Room {
    @PrimaryColumn({ nullable: false })
    id: string

    @Column({ nullable: false })
    title: string
}