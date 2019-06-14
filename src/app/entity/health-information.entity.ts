import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'health_information'})
export class HealthInformation {

  @PrimaryGeneratedColumn()
  @PrimaryColumn({name: 'id'})
  id: number;

  @Column({name: 'SERVICE'})
  service: string;

  @Column({name: 'DIAGNOSIS'})
  diagnosis: string;

  @Column({name: 'PROCEDURE'})
  procedure: string;

  @Column({name: 'LABFU'})
  labfu: string;

  @Column({name: 'DRU'})
  dru: string;

  @Column({name: 'ANC'})
  anc: string;

  @Column({name: 'POSTNATAL'})
  postnatal: string;

  @Column({name: 'NEWBORN'})
  newborn: string;

  @Column({name: 'NEWBORNCARE'})
  newborncare: string;

  @Column({name: 'NUTRITION'})
  nutrition: string;

  @Column({name: 'EPI'})
  epi: string;

  @Column({name: 'FP'})
  fp: string;

  @Column({name: 'DENTAL'})
  dental: string;

  @Column({name: 'NCDSCREEN'})
  ncdscreen: string;

  @Column({name: 'SPECIALPP'})
  specialpp: string;

  @Column({name: 'CHT'})
  cht: string;

  @Column({name: 'CHA'})
  cha: string;

  @Column({name: 'CHD'})
  chd: string;

}
