import { Octokit, RequestError } from "octokit";
import moment from "moment";
import random from "random";

/**
 * Character Mapping for GitHub Contribution Graph
 *
 * Each character is represented in a 5x5 grid
 * 1 indicates a commit point, 0 indicates no commit
 *
 * Format:
 * [
 *   [0,0,0,0,0],  // Row 1
 *   [0,0,0,0,0],  // Row 2
 *   [0,0,0,0,0],  // Row 3
 *   [0,0,0,0,0],  // Row 4
 *   [0,0,0,0,0]   // Row 5
 * ]
 */
const charMap = {
  A: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  B: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  C: [
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1],
  ],
  D: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  E: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  F: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
  ],
  G: [
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 1],
  ],
  H: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  I: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  J: [
    [0, 0, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  K: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0],
    [1, 1, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  L: [
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  M: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  N: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1],
  ],
  O: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  P: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
  ],
  Q: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0],
    [0, 1, 1, 0, 1],
  ],
  R: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  S: [
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  U: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  V: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
  ],
  W: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 0, 0, 1],
  ],
  X: [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  Y: [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  Z: [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  " ": [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
};

/**
 * Class to manage GitHub repository operations using Octokit.
 */
class GitHubRepoManager {
  /**
   * Creates an instance of GitHubRepoManager.
   */
  constructor(access_token, username, email, repository) {
    this.client = new Octokit({ auth: access_token });
    this.username = username;
    this.email = email;
    this.repository = repository;
  }

  /**
   * Checks if the repository exists.
   */
  async doesRepoExist() {
    try {
      await this.client.rest.repos.get({
        owner: this.username,
        repo: this.repository,
      });
      return true;
    } catch (error) {
      if (error instanceof RequestError && error.status === 404) {
        return false;
      }
      throw error;
    }
  }

  /**
   * Creates a new repository for the authenticated user.
   */
  async createNewRepo() {
    try {
      const response = await this.client.rest.repos.createForAuthenticatedUser({
        name: this.repository,
        description:
          "GreenGitBot repo created to transform the GitHub activity monitor.",
        private: false,
      });
      return { data: response.data };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Checks if a file exists in the repository.
   */
  async doesFileExist(path) {
    try {
      await this.client.rest.repos.getContent({
        owner: this.username,
        repo: this.repository,
        path,
      });
      return true;
    } catch (error) {
      if (error.status === 404) {
        return false;
      }
      throw error;
    }
  }

  /**
   * Creates or updates a file in the repository.
   */
  async createOrUpdateFile(path, content, message, commitOptions) {
    const contentEncoded = Buffer.from(content).toString("base64");
    let sha;
    try {
      const { data } = await this.client.rest.repos.getContent({
        owner: this.username,
        repo: this.repository,
        path,
      });
      sha = data.sha;
    } catch (error) {
      if (error.status !== 404) {
        throw error;
      }
    }
    await this.client.rest.repos.createOrUpdateFileContents({
      owner: this.username,
      repo: this.repository,
      path,
      message,
      content: contentEncoded,
      sha,
      ...commitOptions,
    });
  }

  /**
   * Ensures that the README.md file exists in the repository.
   * If it doesn't exist, creates it with default content.
   */
  async ensureReadmeExists() {
    const readmePath = "README.md";
    const readmeContent =
      "This is the bot repository for Green Git Bot to play around. You can delete it anytime you want because it just contains some dummy commits to keep your GitHub activity graph active.";
    const readmeExists = await this.doesFileExist(readmePath);
    if (!readmeExists) {
      await this.createOrUpdateFile(
        readmePath,
        readmeContent,
        "Initialize README.md"
      );
      console.log("README.md created.");
    } else {
      console.log("README.md already exists.");
    }
  }

  /**
   * Adds a commit entry to the bot_commits.json file in the repository.
   */
  async addCommitToBotCommitsOld(date) {
    const botCommitsPath = "bot_commits.json";
    const commitMessage = "Commit generated at " + date;
    const newCommit = {
      timestamp: date,
      message: commitMessage,
    };

    let botCommits = [];
    const botCommitsExists = await this.doesFileExist(botCommitsPath);
    if (botCommitsExists) {
      const { data } = await this.client.rest.repos.getContent({
        owner: this.username,
        repo: this.repository,
        path: botCommitsPath,
      });
      const content = Buffer.from(data.content, "base64").toString();
      botCommits = JSON.parse(content);
    }

    botCommits.push(newCommit);

    await this.createOrUpdateFile(
      botCommitsPath,
      JSON.stringify(botCommits, null, 2),
      commitMessage,
      {
        branch: "main", // or the appropriate branch name
        committer: {
          name: "Commit Bot",
          email: "commitbot@greengitbot.com",
          date: moment(date).format(),
        },
        author: {
          name: "Commit Bot",
          email: "commitbot@greengitbot.com",
          date: moment(date).format(),
        },
        date: moment(date).format(), // Explicitly set the date
      }
    );
    console.log("bot_commits.json updated.");
    return newCommit;
  }

  async addCommitToBotCommits(date) {
    const botCommitsPath = "bot_commits.json";
    const commitMessage = "Commit generated at " + date;
    const newCommitEntry = { timestamp: date, message: commitMessage };

    // Step 1: Retrieve the current contents of bot_commits.json (if it exists)
    let botCommits = [];
    let fileSha = null;
    try {
      const { data: fileData } = await this.client.rest.repos.getContent({
        owner: this.username,
        repo: this.repository,
        path: botCommitsPath,
        ref: "main",
      });
      fileSha = fileData.sha;
      const content = Buffer.from(fileData.content, "base64").toString("utf-8");
      botCommits = JSON.parse(content);
    } catch (error) {
      if (error.status !== 404) {
        throw error;
      }
      // If the file doesn't exist, start with an empty array.
    }

    // Step 2: Append the new commit entry
    botCommits.push(newCommitEntry);
    const updatedContentStr = JSON.stringify(botCommits, null, 2);

    // Step 3: Get the latest commit SHA and its tree SHA from the main branch
    const { data: refData } = await this.client.rest.git.getRef({
      owner: this.username,
      repo: this.repository,
      ref: "heads/main",
    });
    const latestCommitSha = refData.object.sha;
    const { data: commitData } = await this.client.rest.git.getCommit({
      owner: this.username,
      repo: this.repository,
      commit_sha: latestCommitSha,
    });
    const baseTreeSha = commitData.tree.sha;

    // Step 4: Create a new blob with the updated bot_commits.json content
    const { data: blobData } = await this.client.rest.git.createBlob({
      owner: this.username,
      repo: this.repository,
      content: updatedContentStr,
      encoding: "utf-8",
    });

    // Step 5: Create a new tree that updates bot_commits.json
    const { data: newTree } = await this.client.rest.git.createTree({
      owner: this.username,
      repo: this.repository,
      base_tree: baseTreeSha,
      tree: [
        {
          path: botCommitsPath,
          mode: "100644",
          type: "blob",
          sha: blobData.sha,
        },
      ],
    });

    // Step 6: Create a new commit with the custom date
    const { data: newCommit } = await this.client.rest.git.createCommit({
      owner: this.username,
      repo: this.repository,
      message: commitMessage,
      tree: newTree.sha,
      parents: [latestCommitSha],
      author: {
        name: "Commit Bot",
        email: this.email ?? "gitgreenbot@gitgreenbot.com",
        date: date,
      },
      committer: {
        name: "Commit Bot",
        email: this.email ?? "gitgreenbot@gitgreenbot.com",
        date: date,
      },
    });

    // Step 7: Update the main branch reference to point to the new commit
    await this.client.rest.git.updateRef({
      owner: this.username,
      repo: this.repository,
      ref: "heads/main",
      sha: newCommit.sha,
    });

    console.log("bot_commits.json updated with commit dated " + date);
    return newCommit;
  }

  /**
   * Generates multiple commits across the contribution graph.
   */
  async generateCommitPattern(numOfCommits) {
    const commitsLog = [];
    const commitsErrorLog = [];

    // Ensure README.md exists
    await this.ensureReadmeExists();

    for (let i = 0; i < numOfCommits; i++) {
      const x = random.int(0, 54);
      const y = random.int(0, 6);
      const date = moment()
        .subtract(1, "y")
        .add(1, "d")
        .add(x, "w")
        .add(y, "d")
        .toISOString();

      try {
        const newCommit = await this.addCommitToBotCommits(date);
        commitsLog.push(newCommit);
      } catch (error) {
        commitsErrorLog.push({
          error: `Failed to create commit ${i + 1}:`,
          error_details: error,
        });
        console.error(`Failed to create commit ${i + 1}:`, error);
        if (i > numOfCommits * 0.1) break;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return {
      message: "Commits generated successfully!",
      commitsLog,
      commitsErrorLog,
    };
  }

  /**
   * Generates multiple commits across the contribution
   * graph as per defined commits density per day.
   */
  async generateDenseCommits(startDate, endDate, commitsPerDay) {
    const commitsLog = [];
    const commitsErrorLog = [];

    let currentDate = moment(startDate, "DD-MM-YYYY");
    const end = moment(endDate, "DD-MM-YYYY");

    // Ensure README.md exists
    await this.ensureReadmeExists();

    while (currentDate.isBefore(end)) {
      for (let i = 0; i < commitsPerDay; i++) {
        try {
          const newCommit = await this.addCommitToBotCommits(
            currentDate.toISOString()
          );
          commitsLog.push(newCommit);
        } catch (error) {
          commitsErrorLog.push({
            error: `Failed to create commit ${i + 1}:`,
            error_details: error,
          });
          console.error(`Failed to create commit ${i + 1}:`, error);
          if (i > commitsPerDay * 0.1) break;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      currentDate.add(1, "day");
    }

    return {
      message: "Commits generated successfully!",
      commitsLog,
      commitsErrorLog,
    };
  }

  /**
   * Combines individual character patterns from the input string into one grid.
   * Inserts specified spacing between each character.
   */
  combinePatterns(inputString, spacing = 1) {
    const patterns = [];
    for (const char of inputString) {
      // Use a blank pattern if character is not defined
      const pattern = charMap[char.toUpperCase()] || charMap[" "];
      patterns.push(pattern);
    }
    // Assume all patterns are 5 rows
    const rows = 5;
    const combined = [];
    for (let r = 0; r < rows; r++) {
      let row = [];
      for (let i = 0; i < patterns.length; i++) {
        row = row.concat(patterns[i][r]);
        if (i < patterns.length - 1) {
          for (let s = 0; s < spacing; s++) {
            row.push(0);
          }
        }
      }
      combined.push(row);
    }
    return combined;
  }

  /**
   * Maps an input string to a contribution graph pattern and creates commits accordingly.
   * Each cell in the combined grid corresponds to a day: column index = number of weeks,
   * row index = day offset (0 = Sunday, etc.). For each cell with a value > 0,
   * that many commits are created on the computed date.
   */
  async mapStringToGraph(inputString, startDate, spacing = 1) {
    // Combine the patterns for each character into one grid.
    const grid = this.combinePatterns(inputString, spacing);
    const baseDate = moment(startDate, "DD-MM-YYYY");
    const commitsLog = [];
    const commitsErrorLog = [];

    // Iterate over the grid: rows (days) and columns (weeks)
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const cellValue = grid[row][col];
        if (cellValue > 0) {
          // For each commit point (if cellValue is > 0, we create that many commits)
          for (let i = 0; i < cellValue; i++) {
            // Calculate commit date: baseDate + col weeks + row days
            const commitDate = baseDate
              .clone()
              .add(col, "weeks")
              .add(row, "days");

            // Add a random offset (optional) to simulate natural commit times
            const randomOffset = random.int(0, 3600); // seconds offset
            const finalDate = commitDate
              .clone()
              .add(randomOffset, "seconds")
              .toISOString();

            try {
              const commitObj = await this.addCommitToBotCommits(finalDate);
              commitsLog.push(commitObj);
            } catch (error) {
              commitsErrorLog.push({
                error: `Failed to create commit ${i + 1}:`,
                error_details: error,
              });
              console.error(
                `Error creating commit for cell [${row},${col}]:`,
                error
              );
            }
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        }
      }
    }
    return {
      message: "Commits generated successfully!",
      commitsLog,
      commitsErrorLog,
    };
  }
}

export default GitHubRepoManager;
