import { db } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    let docRef = db.collection("meeting").doc(resolvedParams.id);
    let doc = await docRef.get();
    if (!doc.exists) {
      const slugSnapshot = await db.collection("meeting").where("slug", "==", resolvedParams.id).limit(1).get();
      if (!slugSnapshot.empty) {
        docRef = slugSnapshot.docs[0].ref;
        doc = slugSnapshot.docs[0];
      } else {
        return NextResponse.json([], { status: 200 });
      }
    }
    const data = doc.data();
    return NextResponse.json(data?.chats || [], { status: 200 });
  } catch (error) {
    console.error("Chat GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch chat" }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const body = await req.json();
    let docRef = db.collection("meeting").doc(resolvedParams.id);
    let doc = await docRef.get();
    
    if (!doc.exists) {
      const slugSnapshot = await db.collection("meeting").where("slug", "==", resolvedParams.id).limit(1).get();
      if (!slugSnapshot.empty) {
        docRef = slugSnapshot.docs[0].ref;
        doc = slugSnapshot.docs[0];
      } else {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
    }
    
    const chats = doc.data()?.chats || [];
    const newMessage = {
      ...body,
      timestamp: Date.now()
    };
    chats.push(newMessage);
    
    await docRef.update({ chats });
    return NextResponse.json({ success: true, chats }, { status: 200 });
  } catch (error) {
    console.error("Chat POST Error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
