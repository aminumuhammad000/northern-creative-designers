import QRCode from "qrcode";

export async function generateQrCodeDataUrl(
  text: string,
  options?: QRCode.QRCodeToDataURLOptions
): Promise<string> {
  try {
    return await QRCode.toDataURL(text || "NCD-SUMMIT-2026", {
      margin: 1,
      width: options?.width || 320,
      color: {
        dark: "#013811",
        light: "#FFFFFF",
        ...options?.color,
      },
      errorCorrectionLevel: "M",
      ...options,
    });
  } catch (error) {
    console.error("Failed to generate QR data URL:", error);
    return "";
  }
}

export async function generateQrCodeSvg(
  text: string,
  options?: QRCode.QRCodeToStringOptions
): Promise<string> {
  try {
    return await QRCode.toString(text || "NCD-SUMMIT-2026", {
      type: "svg",
      margin: 1,
      color: {
        dark: "#013811",
        light: "#FFFFFF",
        ...options?.color,
      },
      errorCorrectionLevel: "M",
      ...options,
    });
  } catch (error) {
    console.error("Failed to generate QR SVG:", error);
    return "";
  }
}
