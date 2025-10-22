export const ImageUtils = {
  /**
   * Validasi dan cleaning base64 dari frontend
   */
  validateBase64: (base64Data) => {
    if (!base64Data || typeof base64Data !== "string") {
      throw new Error("Image data is required and must be a string");
    }

    // Bersihkan jika ada data URL prefix
    let cleanBase64 = base64Data;
    if (base64Data.includes("base64,")) {
      const parts = base64Data.split("base64,");
      cleanBase64 = parts[parts.length - 1];
    }

    // Validasi format base64
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    if (!base64Regex.test(cleanBase64)) {
      throw new Error("Invalid base64 format");
    }

    return cleanBase64;
  },

  /**
   * Buat data URL untuk Cloudinary
   */
  createDataUrl: (base64Data, mimeType = "image/jpeg") => {
    const cleanBase64 = ImageUtils.validateBase64(base64Data);
    return `data:${mimeType};base64,${cleanBase64}`;
  },
};
