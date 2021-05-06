const got = require("got").default;
const slugify = require("slug");
const { v4:uuid } = require("uuid");

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
  if (event.httpMethod !== "POST") return respond(405).json({message: "Method not allowed"})
  const { STORYBLOK_ACCESS_TOKEN, STORYBLOK_SPACE, FOLDER_ID = 0 } = process.env;
  if (!STORYBLOK_ACCESS_TOKEN || !STORYBLOK_SPACE) {
    console.error("Missing environment variable. Someone forgot them.");
    return respond(500).json({ message: "Internal administrator error"})
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (err) {
    console.error("There was an error while deserializing the body. Check it was valid json", err);
    return respond(400).json({message: "The data received by the server was not correct."});
  }

  // Check that the body has all the data we need. Otherwise return an error
  let hasRequiredProps = ["title", "author", "email", "description", "tech", "contentWarnings", "thumbnail", "media", "year", "promotion"]
    .every(propName => Object.prototype.hasOwnProperty.call(body, propName));

  if (!hasRequiredProps) return respond(400).json({ message: "The data received was missing one or more required properties." });

  // how necessary is that asset class really? is it just a pain in that butt? yes.
  let thumbnail, media;
  try {
    thumbnail = Asset.fromObject(body.thumbnail);
    media = body.media.map(a => Asset.fromObject(a));
  } catch (err) {
    console.error("Error while deserializing asset objects\n", err)
    return respond(400).json({ message: "One or more assets were invalid." })
  }

  let author_links = body.author.map(author => ({
    _uid: uuid(),
    twitter: {
      id: "",
      url: author.twitter || "",
      linktype: "url",
      fieldtype: "multilink",
      cached_url: author.twitter || "",
    },
    linkedin: {
      id: "",
      url: author.linkedin || "",
      linktype: "url",
      fieldtype: "multilink",
      cached_url: author.linkedin || "",
    },
    portfolio: {
      id: "",
      url: author.portfolio || "",
      linktype: "url",
      fieldtype: "multilink",
      cached_url: author.portfolio || "",
    },
  }))

  // Send the project to storyblok
  let project;
  try {
    project = await got.post(`https://mapi.storyblok.com/v1/spaces/${STORYBLOK_SPACE}/STORIES/`, {
      json: {
        story: {
          name: body.title,
          slug: slugify(body.title, { strict: true, lower: true }),
          parent_id: FOLDER_ID,
          content: {
            component: "project",
            title: body.title,
            author: body.author.name,
            email: body.email,
            description: body.description,
            tech_used: body.tech,
            year_of_study: body.author.yearOfStudy,
            content_warnings: body.contentWarnings,
            year_submitted: 2021,
            developed_this_year: body.year,
            social_media_promotion: body.promotion,
            asset: {
              id: thumbnail.id,
              alt: thumbnail.alt,
              name: "",
              focus: thumbnail.focus,
              title: thumbnail.title,
              filename: thumbnail.filename,
              copyright: thumbnail.copyright,
              fieldtype: "asset",
            },
            media: media.map(a => ({
              id: a.id,
              alt: a.alt,
              name: "",
              focus: a.focus,
              title: a.title,
              filename: a.filename,
              copyright: a.copyright,
            })),
            author_links
          }
        }
      },
      headers: {
        "Authorization": STORYBLOK_ACCESS_TOKEN
      }
    })
  } catch (err) {
    console.error(err, err.response.body);
    if (err instanceof got.HTTPError) return respond(err.response.statusCode || 500).json({ message: err.response.body || "Something bad happened." });
    return respond(500).json({ message: err.message || "Internal server error" });
  }
  console.log("Successfully submitted project!", project);
  return respond(200).json({ message: "Successfully created project!" });
}

class Asset {
	constructor(id, filename, content_type, content_length, options = {
		alt: "",
		copyright: "",
		title: "",

		asset_folder_id: null,
		focus: null,
		ext_id: null
	}) {
		this.id = id,
    this.filename = filename,
    this.asset_folder_id = options.asset_folder_id,
    this.content_length = content_length,
    this.content_type = content_type,

    this._shortname = null;
		this._public_url = null;

		Object.assign(this, options);
	}

  format(fieldtype = "asset") {
		let _ = {
			id: this.id,
			alt: this.alt,
			name: "",
			focus: this.focus,
			title: this.title,
			filename: this.filename,
			copyright: this.copyright,
		};
		if (fieldtype !== false) _.fieldtype = fieldtype;
	}

  static fromObject(obj) {
		let hasRequiredProps = ["id", "filename", "content_length", "content_type"].every(propName => Object.prototype.hasOwnProperty.call(obj, propName))
    if (!hasRequiredProps) throw TypeError("Object is missing one or more required properties.");

		return new Asset(
			obj.id,
			obj.filename,
			obj.content_type,
			obj.content_length,
			{
				alt: obj.alt,
				copyright: obj.copyright,
				title: obj.title,

				asset_folder_id: obj.asset_folder_id,
				focus: obj.focus,
				ext_id: obj.ext_id,
				_shortname: obj._shortname || null,
				_public_url: obj._public_url || null,
			}
		);
	}
}
