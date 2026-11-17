import { VoxelWorld, VoxelType } from './voxel-world';

export class WorldStorage {
  private static STORAGE_KEY = 'custom_voxel_world_save';

  public static saveWorld(world: VoxelWorld): void {
    try {
      const state = world.exportState();
      const serializedData = JSON.stringify(state);
      localStorage.setItem(this.STORAGE_KEY, serializedData);
    } catch (error) {
      console.error('Failed to save world state to local storage:', error);
    }
  }

  public static loadWorld(world: VoxelWorld): boolean {
    try {
      const serializedData = localStorage.getItem(this.STORAGE_KEY);
      if (!serializedData) {
        return false;
      }
      const state: Record<string, VoxelType> = JSON.parse(serializedData);
      world.importState(state);
      return true;
    } catch (error) {
      console.error('Failed to load world state from local storage:', error);
      return false;
    }
  }

  public static clearSave(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear world save:', error);
