import { Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MenuQRCodeProps {
  menuUrl: string;
  menuName?: string;
}

export const MenuQRCode = ({ menuUrl, menuName }: MenuQRCodeProps) => {
  const downloadQRCode = () => {
    // Create a temporary canvas element
    const canvas = document.createElement("canvas");
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;

    // Get the SVG data
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);

    // Create an image element to draw the SVG to canvas
    const img = new Image();
    img.onload = () => {
      // Set canvas size to match the QR code size plus padding
      canvas.width = 240; // 200 (QR size) + 40 (padding)
      canvas.height = 240;

      // Get canvas context and set background
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Fill white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the image centered
      ctx.drawImage(img, 20, 20, 200, 200);

      // Convert to PNG and download
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `menu-qr-${menuName || "code"}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Clean up
      URL.revokeObjectURL(svgUrl);
    };
    img.src = svgUrl;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Menu QR Code</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="bg-white p-4 rounded-lg">
          <QRCodeSVG
            id="qr-code-svg"
            value={menuUrl}
            size={200}
            level="H"
            includeMargin
          />
        </div>
        <Button onClick={downloadQRCode} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download QR Code
        </Button>
      </CardContent>
    </Card>
  );
};