import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';
import dayjs from 'dayjs';
import { meetingSchema } from '@/lib/schemas';

export async function GET() {
  try {
    const snapshot = await db.collection("meeting").get();
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const parsedMeetingData = items.map((item: any) => ({
      ...item,
      date: dayjs(item.date).isValid() ? dayjs(item.date).valueOf() : Date.now(),
    }));
    
    const sortedMeetingData = parsedMeetingData.sort((a: any, b: any) => b.date - a.date);
    
    return NextResponse.json(sortedMeetingData);
  } catch (error: any) {
    console.error("[MEETING_GET]", error);
    if (error.code === 5) {
      return NextResponse.json(
        { error: "Database not initialized", details: "Firestore database was not found. Please ensure Firestore is created in your Firebase Console." }, 
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to fetch meetings", details: error instanceof Error ? error.message : "Unknown error" }, 
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = meetingSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.format() }, 
        { status: 400 }
      );
    }

    const meetingData = {
      ...validation.data,
      slug: validation.data.slug || `meeting-${Math.random().toString(36).substring(2, 6)}`,
    };

    const docRef = await db.collection("meeting").add(meetingData);
    return NextResponse.json({ id: docRef.id, ...meetingData }, { status: 201 });
  } catch (error: any) {
    console.error("[MEETING_POST]", error);
    if (error.code === 5) {
      return NextResponse.json(
        { error: "Database not initialized", details: "Firestore database was not found. Please ensure Firestore is created in your Firebase Console." }, 
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create meeting", details: error instanceof Error ? error.message : "Unknown error" }, 
      { status: 500 }
    );
  }
}
