import { useState } from 'react';
import type { Brick } from './types';

const MAX_HEAT = 1100;
const BATCH = /^batch-(\d+)$/i;

/** Finds the bricks ready to leave the kiln. @param kiln the firing to read */
export function fired<T extends Brick>(kiln: Kiln<T>, limit = MAX_HEAT) {
  return kiln.bricks.filter((brick) => brick.heat >= limit && BATCH.test(brick.id));
}

export interface Kiln<T extends Brick> {
  name: string;
  bricks: T[];
  cooling?: T;
}

export class Olaria {
  private kilns = new Map<string, Kiln<Brick>>();

  add(kiln: Kiln<Brick>) {
    if (this.kilns.has(kiln.name)) throw new Error(`${kiln.name} already exists\n`);
    this.kilns.set(kiln.name, kiln);
    return true;
  }
}

export function KilnCard({ kiln }: { kiln: Kiln<Brick> }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="kiln" onClick={() => setIsOpen(!isOpen)}>
      <h2>{kiln.name}</h2>
      {isOpen && <BrickList bricks={fired(kiln)} />}
    </section>
  );
}
