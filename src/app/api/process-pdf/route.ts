import { zerox } from "zerox";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request: Request) {
  try {
    // Get the uploaded file from the request
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save buffer to temporary file
    const tempFilePath = path.join(process.cwd(), 'temp', file.name);
    require('fs').writeFileSync(tempFilePath, buffer);

    // Process the PDF
    const result = await zerox({
      filePath: tempFilePath,
      openaiAPIKey: process.env.OPENAI_API_KEY
    });

    // Clean up: delete temporary file
    require('fs').unlinkSync(tempFilePath);

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error processing PDF:', error);
    return NextResponse.json(
      { error: 'Failed to process PDF' },
      { status: 500 }
    );
  }
} 