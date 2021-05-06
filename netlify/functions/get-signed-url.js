const got = require("got").default;

// Send a response, this function just makes it a little bit less repetetive.
// https://docs.netlify.com/functions/build-with-javascript/#synchronous-function-format
const respond = (statusCode) => ({
  json: (obj) => ({
    statusCode,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(obj)
  }),
  text: (body) => ({ statusCode, body })
})

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") return respond(405).json({ message: "Method Not Allowed" })
  const { STORYBLOK_ACCESS_TOKEN, STORYBLOK_SPACE } = process.env;
  if (!STORYBLOK_ACCESS_TOKEN || !STORYBLOK_SPACE) {
    console.error("Missing environment variable. Someone forgot them.");
    return respond(500).json({ message: "Internal administrator error." });
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (err) {
    console.error("There was an error while deserializing the body. Check it was valid json", err);
    return respond(400).json({ message: "The data received by the server was not correct." })
  }

  let hasRequiredProps = ["filename"].every(propName => Object.prototype.hasOwnProperty.call(body, propName))
  if (!hasRequiredProps) return respond(400).json({ message: "The data received was missing one or more required properties." })

  let signedUrl;
  try {
    signedUrl = await got.post(`https://mapi.storyblok.com/v1/spaces/${STORYBLOK_SPACE}/assets/`, {
      headers: {
        "Authorization": STORYBLOK_ACCESS_TOKEN
      },
      json: {
        filename: body.filename
      }
    }).json();
  } catch (err) {
    console.error(err);
    if (err instanceof got.HTTPError) return respond(err.response.statusCode || 500).json({ message: err.response.body || "Something bad happened" });
    return respond(500).json({ message: err.message || "Internal server error" });
  }

  return respond(200).json(signedUrl);
}
