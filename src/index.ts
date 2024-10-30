import { zerox } from "zerox";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Usage Example
async function main() {
    const result = await zerox({
      filePath: path.resolve(__dirname, "./cs101.pdf"),
      openaiAPIKey: process.env.OPENAI_API_KEY
    });
  
  console.log(result);
}
// Run the main function
main();
