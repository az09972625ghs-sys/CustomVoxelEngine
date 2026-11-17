import { VoxelWorld, BlockData } from "./voxel-world";

export class WorldStorage {
  private static STORAGE_KEY = "custom_voxel_world_data";

  public static saveWorld(world: VoxelWorld, blocksMap: Map<string, BlockData>, statesMap: Map<string, any>): void {
    try {
      const serializedData = {
        blocks: Array.from(blocksMap.entries()),
        states: Array.from(statesMap.entries()),
        savedAt: Date.now()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(serializedData));
      console.log("[Storage] ¡Mundo guardado con éxito!");
    } catch (error) {
      console.error("[Storage Error] No se pudo guardar:", error);
    }
  }

  public static loadWorld(world: VoxelWorld): boolean {
    try {
      const jsonString = localStorage.getItem(this.STORAGE_KEY);
      if (!jsonString) return false;

      const parsedData = JSON.parse(jsonString);

      if (parsedData.blocks && Array.isArray(parsedData.blocks)) {
        for (const [key, block] of parsedData.blocks) {
          const b = block as BlockData;
          world.setBlockSilently(b.x, b.y, b.z, b.id);
        }
      }

      if (parsedData.states && Array.isArray(parsedData.states)) {
        for (const [key, value] of parsedData.states) {
          world.setState(key, value);
        }
      }
      return true;
    } catch (error) {
      console.error("[Storage Error] Error al cargar:", error);
      return false;
    }
  }
}
