import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';
import { meetingSchema } from '@/lib/schemas';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    // 1. Try direct ID lookup
    const docRef = db.collection("meeting").doc(id);
    let doc = await docRef.get();
    
    // 2. If not found, try slug lookup
    if (!doc.exists) {
      const slugSnapshot = await db.collection("meeting").where("slug", "==", id).limit(1).get();
      if (slugSnapshot.empty) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
      }
      doc = slugSnapshot.docs[0];
    }

    const data = { id: doc.id, ...doc.data() };
    return NextResponse.json(data);
  } catch (error) {
    console.error("[MEETING_ID_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch meeting", details: error instanceof Error ? error.message : "Unknown error" }, 
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    
    const validation = meetingSchema.partial().safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.format() }, 
        { status: 400 }
      );
    }

    const docRef = db.collection("meeting").doc(id);
    await docRef.update(validation.data);

    return NextResponse.json({ id: docRef.id, ...validation.data });
  } catch (error) {
    console.error("[MEETING_ID_PUT]", error);
    return NextResponse.json(
      { error: "Failed to update meeting", details: error instanceof Error ? error.message : "Unknown error" }, 
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const docRef = db.collection("meeting").doc(id);
    await docRef.delete();
    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("[MEETING_ID_DELETE]", error);
    return NextResponse.json(
      { error: "Failed to delete meeting", details: error instanceof Error ? error.message : "Unknown error" }, 
      { status: 500 }
    );
  }
}
