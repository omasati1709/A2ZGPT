import Replicate from "replicate";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

// const openai = new OpenAIApi(configuration);

// const instructionMessage: ChatCompletionMessageParam = {
//   role: "system",
//   content:
//     "Answer questions as short and quickly as possible. You must do it under 75 tokens.",
// };

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // if (!configuration.apiKey) {
    //   return new NextResponse("OpenAI API Key not configured.", {
    //     status: 500,
    //   });
    // }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    // if (!amount) {
    //   return new NextResponse("Amount is required", { status: 400 });
    // }

    // if (!resolution) {
    //   return new NextResponse("Resolution is required", { status: 400 });
    // }

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
        },
      }
    );

    return NextResponse.json(response);
  } catch (error) {
    console.log("[MUSIC_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
