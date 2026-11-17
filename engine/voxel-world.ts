export type VoxelType = 'air' | 'dirt' | 'stone' | 'wood' | 'leaves';

export interface VoxelPosition {
  x: number;
  y: number;
  z: number;
}

export class VoxelWorld {
  private voxels: Map<string, VoxelType> = new Map();

  private getKey(pos: VoxelPosition): string {
    return `${pos.x},${pos.y},${pos.z}`;
  }

  public setVoxel(pos: VoxelPosition, type: VoxelType): void {
    const key = this.getKey(pos);
    if (type === 'air') {
      this.voxels.delete(key);
    } else {
      this.voxels.set(key, type);
    }
  }

  public getVoxel(pos: VoxelPosition): VoxelType {
    return this.voxels.get(this.getKey(pos)) || 'air';
  }

  public clear(): void {
    this.voxels.clear();
  }

  public exportState(): Record<string, VoxelType> {
    const state: Record<string, VoxelType> = {};
    this.voxels.forEach((value, key) => {
      state[key] = value;
    });
    return state;
  }

  public importState(state: Record<string, VoxelType>): void {
    this.voxels.clear();
    for (const [key, value] of Object.entries(state)) {
      this.voxels.set(key, value);
