const OpenAI = require("openai");
const openai = new OpenAI();

const generateText = async (input_message) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: input_message }],
    model: "gpt-4o",
  });

  console.log(completion.choices[0]);
  
  return completion.choices[0].message.content;

  // const openai = new OpenAI({
  //   apiKey: process.env.OPENAI_API_KEY,
  // });

  // const generateText = async (input_message) => {
  //   console.log("input_message", input_message);
  //   const response = await openai.chat.completions.create({
  //     model: "gpt-4o",
  //     messages: [{ role: "system", content: input_message }],
  //     temperature: 1,
  //     max_tokens: 256,
  //     top_p: 1,
  //     frequency_penalty: 0,
  //     presence_penalty: 0,
  //   });
  //   console.log("response", JSON.stringify(response.choices[0].message.content));

  //   return JSON.stringify(response.choices[0].message.content);
};

module.exports = generateText;
// Example usage: Call the generateText function
