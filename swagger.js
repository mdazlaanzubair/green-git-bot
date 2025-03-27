import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "🤖🌱 Green Git Bot",
    description:
      "A Node.js tool that leverages the GitHub API via Octokit to automate commit generation. It allows you to transform your GitHub contribution graph.",
  },
  host: "",      // will be set dynamically below
  basePath: "/",
  schemes: [],   // will be set dynamically below
};

// Dynamically set host and schemes based on the environment
if (process.env.NODE_ENV === "production") {
    doc.host = "greengitbot.terminal.com.se";
    doc.schemes = ["https"];
  } else {
    doc.host = "localhost:3000";
    doc.schemes = ["http"];
  }

const outputFile = "./swagger-output.json";
const routes = ["./routes/router.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
  root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);
