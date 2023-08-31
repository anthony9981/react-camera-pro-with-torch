import { PictureQuality } from "./types";

export function createPictureQuality(value: number): PictureQuality {
    if (value < 0 || value > 1) {
      throw new Error('Picture quality must be between 0 and 1');
    }
    return value;
  }
  