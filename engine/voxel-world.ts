export interface BlockData {
  id: string;
  x: number;
  y: number;
  z: number;
}

export class VoxelWorld {
  private blocks: Map<string, BlockData> = new Map();
  private stateProperties: Map<string, any> = new Map();

  public getKey(x: number, y: number, z: number): string {
    return `${x},${y},${z}`;
  }

  public setBlock(x: number, y: number, z: number, blockId: string): void {
    const key = this.getKey(x, y, z);
    if (blockId === "air") {
      this.blocks.delete(key);
    } else {
      this.blocks.set(key, { id: blockId, x, y, z });
    }
  }

  public setBlockSilently(x: number, y: number, z: number, blockId: string): void {
    const key = this.getKey(x, y, z);
    if (blockId === "air") {
      this.blocks.delete(key);
    } else {
      this.blocks.set(key, { id: blockId, x, y, z });
    }
  }

  public getBlock(x: number, y: number, z: number): string {
    const key = this.getKey(x, y, z);
    const block = this.blocks.get(key);
    return block ? block.id : "air";
  }

  public getBlocksMap(): Map<string, BlockData> {
    return this.blocks;
  }

  public getStatesMap(): Map<string, any> {
    return this.stateProperties;
  }

  public setState(key: string, value: any): void {
    this.stateProperties.set(key, value);
  }
  }
