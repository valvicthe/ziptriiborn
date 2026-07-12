// src/types/asset.ts

export interface AssetResponse {
  assetId: number;
  name: string;
  assetType: 'Shirt' | 'Pants' | 'Accessory' | 'Hat' | 'Model'; 
  creator: {
    id: number;
    username: string;
    type: 'User' | 'Group';
  };
  economy: {
    isForSale: boolean;
    priceRobux: number;
    isLimited: boolean;
    serialNumber: number | null;
    totalStockRemaining: number | null;
  };
  resourcePointers: {
    meshHash: string | null;
    textureHash: string | null;
    thumbnailUrl: string;
  };
}
