import { NextResponse } from 'next/server';
import { RtcTokenBuilder, RtcRole } from 'agora-access-token';
import { agoraTokenSchema } from '@/lib/schemas';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = agoraTokenSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.format() }, 
        { status: 400 }
      );
    }

    const { channelName, startDate } = validation.data;
    const userId = 0;

    const agoraAppId = process.env.NEXT_PUBLIC_AGORA_APP_ID || process.env.AGORA_APP_ID || "";
    const agoraAppCertificate = process.env.AGORA_APP_CERTIFICATE || "";

    if (!agoraAppId) {
      return NextResponse.json({ error: "Agora App ID is not configured" }, { status: 500 });
    }

    // If no certificate, return null for token (Testing Mode / Static Key projects)
    if (!agoraAppCertificate) {
      console.log("[AGORA_TOKEN] No certificate found, skipping token generation (Testing Mode)");
      return NextResponse.json({ token: null, agoraAppId });
    }

    const startDateObject = new Date(startDate);
    const expirationTimeInSeconds =
      Math.floor(startDateObject.getTime() / 1000) + 86400;

    const token = RtcTokenBuilder.buildTokenWithUid(
      agoraAppId,
      agoraAppCertificate,
      channelName,
      userId,
      RtcRole.PUBLISHER,
      expirationTimeInSeconds
    );

    return NextResponse.json({ token, agoraAppId });
  } catch (error) {
    console.error("[AGORA_TOKEN_POST]", error);
    return NextResponse.json(
      { error: "Failed to generate Agora token", details: error instanceof Error ? error.message : "Unknown error" }, 
      { status: 500 }
    );
  }
}
