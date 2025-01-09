import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ShareQRCodeRequest {
  to: string[];
  menuName: string;
  qrCodeUrl: string;
  restaurantName: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, menuName, qrCodeUrl, restaurantName }: ShareQRCodeRequest = await req.json();

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Menu QR Code <qr@yourdomain.com>",
        to,
        subject: `QR Code for ${menuName}`,
        html: `
          <h1>QR Code for ${menuName}</h1>
          <p>Here's your QR code for the menu at ${restaurantName}.</p>
          <p>You can access the menu by scanning this QR code or visiting: ${qrCodeUrl}</p>
          <img src="${qrCodeUrl}" alt="Menu QR Code" style="width: 200px; height: 200px;" />
        `,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      return new Response(JSON.stringify({ error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);