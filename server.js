import express from "express";
import cors from "cors";
import { validate_req_body } from "./utils/request_validator.js";
import GitHubRepoManager from "./utils/GithubCommitGenerator.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post("/api/random-commits", async (req, res) => {
  // Validate complete req_body and destructure access token for Octokit client
  const { errors, validatedData } = validate_req_body("/random-commits", req);
  if (errors) {
    return res.status(400).json(errors);
  }

  // Destructure validated data
  const { username, email, access_token, repository, num_of_commits } =
    validatedData;

  // Instantiating the GreenGitBot class
  const greenGitBot = new GitHubRepoManager(
    access_token,
    username,
    email,
    repository
  );

  try {
    // Check if the repository exists
    const repoExists = await greenGitBot.doesRepoExist();
    if (!repoExists) {
      // Create the repository if it does not exist
      await greenGitBot.createNewRepo();
    }

    // Generate the commit pattern
    const response = await greenGitBot.generateCommitPattern(num_of_commits);

    // Respond with the commit logs
    res.status(200).json(response);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/dense-commits", async (req, res) => {
  // Validate complete req_body and destructure access token for Octokit client
  const { errors, validatedData } = validate_req_body("/dense-commits", req);
  if (errors) {
    return res.status(400).json(errors);
  }

  // Destructure validated data
  const {
    username,
    email,
    access_token,
    repository,
    commits_per_day,
    start_date,
    end_date,
  } = validatedData;

  // Instantiating the GreenGitBot class
  const greenGitBot = new GitHubRepoManager(
    access_token,
    username,
    email,
    repository
  );

  try {
    // Check if the repository exists
    const repoExists = await greenGitBot.doesRepoExist();
    if (!repoExists) {
      // Create the repository if it does not exist
      await greenGitBot.createNewRepo();
    }

    // Generate the commit pattern
    const response = await greenGitBot.generateDenseCommits(
      start_date,
      end_date,
      commits_per_day
    );

    // Respond with the commit logs
    res.status(200).json(response);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/input-string-mapping-commits", async (req, res) => {
  // Validate complete req_body and destructure access token for Octokit client
  const { errors, validatedData } = validate_req_body(
    "/input-string-mapping-commits",
    req
  );
  if (errors) {
    return res.status(400).json(errors);
  }

  // Destructure validated data
  const {
    username,
    email,
    access_token,
    repository,
    start_date,
    input_string,
    spacing,
  } = validatedData;

  // Instantiating the GreenGitBot class
  const greenGitBot = new GitHubRepoManager(
    access_token,
    username,
    email,
    repository
  );

  try {
    // Check if the repository exists
    const repoExists = await greenGitBot.doesRepoExist();
    if (!repoExists) {
      // Create the repository if it does not exist
      await greenGitBot.createNewRepo();
    }

    // Ensure README exists before mapping contributions
    await greenGitBot.ensureReadmeExists();

    // Generate the commit pattern
    const response = await greenGitBot.mapStringToGraph(
      input_string,
      start_date,
      spacing || 1
    );

    // Respond with the commit logs
    res.status(200).json(response);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
