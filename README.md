# Green Git Bot 🤖🌱

Green Git Bot is a Node.js tool that leverages the GitHub API via Octokit to automate commit generation. It allows you to transform your GitHub contribution graph by:

- **Backdating or future-dating commits:** Create commits with custom dates.

- **Generating random commit patterns:** Simulate natural commit activity.

- **Mapping input strings to commit patterns:** Convert text or symbols into a grid of commit activity, allowing you to "print" designs on your GitHub contribution graph.

> Note: Manipulating your contribution graph can be fun for demonstration or artistic purposes, but please use this tool responsibly in accordance with GitHub’s terms of service.

## Features

- **Custom Commit Dates:** Generate commits on any specified date.

- **Dense Commit Generation:** Control the number of commits per day to adjust the visual density of your contribution graph.

- **Input String Mapping:** Map letters and symbols to a contribution grid using a 5×5 character map.

- **Random Patterns:** Create random commit patterns to simulate activity.

## Prerequisites

- **Node.js:** Version 14 or later is recommended.

- **GitHub Personal Access Token:** Create one Personal access tokens (classic) from [**GitHub settings**](https://github.com/settings/tokens).

## Installation

No configuration required

1. Clone the repository:

   ```bash
   git clone https://github.com/mdazlaanzubair/green-git-bot.git

   cd green-git-bot
   ```

2. Install dependencies:

   ```bash
   npm install

   npm start
   ```

## Usage

Green Git Bot currently exposes following three API endpoints for generating commit patterns:

- `/api/green-git-bot` - Posts random commits
- `/api/dense-commits` - Posts dense commits between specified dates
- `/api/input-string-mapping` - Posts commits based on input string

View the swagger documentation [**API Docs**](https://greengitbot.terminal.com.se/api/docs/)

## How It Works

**Green Git Bot** uses [**Octokit**](https://github.com/octokit) to interact with the [**GitHub API**](https://docs.github.com/en/rest?apiVersion=2022-11-28). Its primary functions include:

1. **Repository Management:**

   - Checks if a repository exists.

   - Creates a new repository if it doesn't exist.

2. **File Management:**

   - Ensures required files (`README.md` and `bot_commits.json`) are present.

   - Updates `bot_commits.json` with commit entries.

3. Commit Generation:

   - Generates commits with specified dates using the Git Data API so that the commit's author and committer metadata reflect the date provided.

   - Supports dense commit generation (multiple commits per day) and random commit distribution.

4. Pattern Mapping:

   - Uses a 5×5 character map to represent each letter or symbol.

   - Combines character matrices with spacing to form a larger grid.

   - Maps each grid cell to a specific date (using weeks for columns and days for rows) and generates commits accordingly.

## Character Map

Each character in the input string is represented by a 5×5 grid where:

- 1 indicates a commit point.

- 0 indicates no commit.

Example for characters A, B, etc.:

```javascript
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
  // ... (other characters including space)
};
```

## Contributions

Contributions are welcome! If you have suggestions or improvements, please open an issue or submit a pull request.

## Future Improvements

**What's next?**

Experiment with different patterns on your contribution graph. Create some cool designs something like heart, rocket or thumbs-up etc.

## Disclaimer

Green Git Bot is provided for educational and demonstration purposes. Misrepresenting your activity on GitHub may violate GitHub's terms of service. Use responsibly.

## License

This project is licensed under the *MIT License*. See the [**License**](https://github.com/mdazlaanzubair/green-git-bot/blob/main/LICENSE) file for details.
