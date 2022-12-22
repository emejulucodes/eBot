import dotenv from "dotenv";
import twilio from "twilio";
dotenv.config();

const {
  OPEN_AI_KEY: OpenAIkey,
  TWILIO_SID: accountSid,
  TWILIO_TOKEN: TwilloAuthToken,
} = process.env;

const { Configuration, OpenAIApi } = require("openai");

twilio(accountSid, TwilloAuthToken);

const configuration = new Configuration({
  apiKey: OpenAIkey,
});
const openai = new OpenAIApi(configuration);

const { MessagingResponse } = twilio.twiml;

/**
 * @class Bot
 * @description class will implement bot functionality
 */
class Bot {
  /**
   * @memberof Bot
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - object representing response message
   */
  static async MessageResponse(req, res, next) {
    const twiml = new MessagingResponse();
    const msg = req.body.Body;
    const si = require("systeminformation");

    const response = await openai.createCompletion({
      prompt: msg,
      model: "text-davinci-003",
      temperature: 0.5,
      max_tokens: 4000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    try {
      if (msg === "hi" || msg === "Hi") {
        twiml.message(
          "Hello! 👋 Welcome, i am eBot by Emmanuel Emejulu\nI am a bot that helps you make researches.\n\nIm beign trained with Open AI API.\n\nI hope you enjoy using me. 😊"
        );
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());
      }

      if (msg === "hello" || msg === "Hello") {
        twiml.message(
          "Hi! 👋 Welcome, i am eBot by Emmanuel Emejulu\nI am a bot that helps you make researches.\n\nIm beign trained with Open AI API.\n\nI hope you enjoy using me. 😊"
        );
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());
      }

      if (
        msg === "Emmanuel Emejulu" ||
        msg === "emmanuel emejulu" ||
        msg === "Who is Emmanuel Emejulu" ||
        msg === "who is emmanuel emejulu"
      ) {
        twiml.message(
          `Emmanuel Emejulu Is a Web And Mobile App Developer From Nigeria with 5yrs of experience.\n\nHe's the one that built me 😎\nRead More about him at https://emejulucodes.dev`
        );
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());
      }

      if (
        msg === "thanks" ||
        msg === "Thanks" ||
        msg === "Thank you" ||
        msg === "thank you"
      ) {
        twiml.message("You are welcome 😊");
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());
      }

      if (msg === "bye" || msg === "Bye") {
        twiml.message("Goodbye! 👋");
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());
      }
      if (msg === "cpu" || msg === "CPU") {
        si.cpu()
          .then((data) => {
            twiml.message(`CPU Info:
			Manufacturer :${data.manufacturer}.
			Processor :${data.brand}.
			Number of Cores :${data.cores}.
			Processor Speed :${data}.
			Processor Speed Max :${data.speedMax}.
			Processor Speed Min :${data.speedMin}.
			Processor Speed Current :${data.speed}.
			Model :${data.model}.
			Vendor :${data.vendor}.
			Family :${data.family}.
			Stepping :${data.stepping}.
			Revision :${data.revision}.
			Voltage :${data.voltage}.
			`);
            res.writeHead(200, { "Content-Type": "text/xml" });
            res.end(twiml.toString());
          })
          .catch((err) => console.error(err));
      }
      if (msg === "memory" || msg === "Memory") {
        si.mem()
          .then((data) => {
            twiml.message(`Memory Info:
			Total :${data.total}.
			Free :${data.free}.
			Used :${data.used}.
			Active :${data.active}.
			Available :${data.available}.
			Buffcache :${data.buffcache}.
			Swaptotal :${data.swaptotal}.
			Swapused :${data.swapused}.
			Swapfree :${data.swapfree}.
			`);
            res.writeHead(200, { "Content-Type": "text/xml" });
            res.end(twiml.toString());
          })
          .catch((err) => console.error(err));
      }
      if (msg === "graphics" || msg === "Graphics") {
        si.graphics()
          .then((data) => {
            twiml.message(`Graphics Info:
			Controllers :${data.controllers}.
			Displays :${data.displays}.
			`);
            res.writeHead(200, { "Content-Type": "text/xml" });
            res.end(twiml.toString());
          })
          .catch((err) => console.error(err));
      }
      if (msg === "battery" || msg === "Battery") {
        si.battery()
          .then((data) => {
            twiml.message(`Battery Info:
			Has Battery :${data.hasBattery}.
			Is Charging :${data.isCharging}.
			Has AC :${data.hasac}.
			Cycle Count :${data.cycleCount}.
			Current Capacity :${data.currentCapacity}.
			Max Capacity :${data.maxCapacity}.
			Design Capacity :${data.designedCapacity}.
			Percentage :${data.percent}.
			`);
            res.writeHead(200, { "Content-Type": "text/xml" });
            res.end(twiml.toString());
          })
          .catch((err) => console.error(err));
      } else {
        twiml.message(response.data.choices[0].text);
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());
      }
    } catch (error) {
      next(error);
    }
  }
}

export default Bot;
