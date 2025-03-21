# GreenGitBot: Automated GitHub Contribution Enhancement System 🤖🌱

Concerned about the sparse appearance of your GitHub contribution graph? Do you desire a more verdant profile that effectively showcases active development?  GreenGitBot provides a solution.

## What is GreenGitBot?

GreenGitBot is a Node.js-powered API designed to automatically enhance your GitHub contribution graph.  It functions as an automated system that cultivates your digital presence.  Upon configuration, it establishes a repository (named, by default, GitGreenBot) within your GitHub account and diligently adds daily commits, ensuring the consistent growth of your contribution graph.

### Key Features:

* **Automated Contribution Generation:** GreenGitBot eliminates the need for manual contribution activity.

* **Configurable Parameters:** Users provide essential credentials, including their GitHub token and username, to initiate the automated process.

* **Open Source Architecture:** GreenGitBot is open-source, facilitating community contributions to improve its functionality and maintain its operational integrity.

### How Does It Work?

* **Credential Provision:** The user supplies the API with their GitHub username and a personal access token.

* **Repository Establishment:** GreenGitBot creates a new repository in the user's account (named GitGreenBot by default).

* **Regular Commit Activity:** On a daily basis, GreenGitBot adds a small commit to the designated repository, incorporating randomly generated content into a file.

* **Contribution Graph Enhancement:** Over time, the accumulation of these daily commits contributes to a visually enhanced contribution graph, characterized by a greater number of green squares.

### How to Use GreenGitBot

**API Interaction:**

Utilize a tool such as curl or Postman to send a POST request to `http://localhost:3000/gitgreenbot`:

```curl
curl -X POST \
  http://localhost:3000/gitgreenbot \
  -H 'Content-Type: application/json' \
  -d '{
    "username": "your-github-username",
    "token": "your-github-token",
    "repoName": "GitGreenBot",  // Or a custom repo name
    "fileName": "daily-commits" // The name of the file to create/update
  }'
```

* Replace `your-github-username` and `your-github-token` with your actual GitHub username and personal access token.

* You may customize the `repoName` and `fileName` parameters as needed.

* Monitor your GitHub profile to observe the appearance of new commits.

### Disclaimer

GreenGitBot is intended for educational and demonstration purposes.  Users are advised to ensure their usage complies with GitHub's terms of service.  The developer of GreenGitBot is not responsible for any misuse of this tool.

## License 

[**MIT License**](https://github.com/mdazlaanzubair/green-git-bot/blob/main/LICENSE)
