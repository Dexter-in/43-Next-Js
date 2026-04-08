import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    console.log(Object.fromEntries(formData.entries()));

    // Explicitly extract fields (FIX)
    const event: Record<string, any> = {
      title: formData.get("title"),
      description: formData.get("description"),
      overview: formData.get("overview"),
      venue: formData.get("venue"),
      location: formData.get("location"),
      date: formData.get("date"),
      time: formData.get("time"),
      mode: formData.get("mode"),
      audience: formData.get("audience"),
      organizer: formData.get("organizer"),
    };

    // Debug (optional but useful)
    console.log("Event fields:", event);

    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 }
      );
    }

    // Parse JSON arrays safely
      let tags = JSON.parse(formData.get('tags') as string);
      let agenda = JSON.parse(formData.get('agenda') as string);
    // Upload image to Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "DevEvent" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    event.image = (uploadResult as any).secure_url;

    const createdEvent = await Event.create({
      ...event,
      tags: tags,
      agenda: agenda,
    });


    return NextResponse.json(
      { message: "Event created successfully", event: createdEvent },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        message: "Event Creation Failed",
        error: e instanceof Error ? e.message : "Unknown",
      },
      { status: 500 }
    );
  }
}




export async function GET() {
    try{

        await connectDB();

        const events = await Event.find().sort({ createdAt: -1 }).lean();

        return NextResponse.json({ message: 'Events fetched successfully', events }, { status: 200 });

    } catch(e){
        const message = e instanceof Error ? e.message : "Unknown error";
        console.error("Failed to fetch events:", e);

        return NextResponse.json({ message: "Failed to fetch events", error: message }, {status: 500});

    }
}



