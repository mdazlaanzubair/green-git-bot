export const validate_req_body = (route, req) => {
  const errMsgs = {};
  let {
    username,
    email,
    access_token,
    repository,
    num_of_commits,
    start_date,
    end_date,
    commits_per_day,
    spacing,
    input_string,
  } = req.body;

  // Validate username
  if (!username || typeof username !== "string" || username.trim() === "") {
    errMsgs.username = "Username is required and must be a non-empty string.";
  }

  // validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== "string" || email.trim() === "") {
    errMsgs.email = "Email is required and must be a non-empty string.";
  } else if (!emailRegex.test(email)) {
    errMsgs.email = "Invalid email format.";
  }

  // Validate access_token
  if (
    !access_token ||
    typeof access_token !== "string" ||
    access_token.trim() === ""
  ) {
    errMsgs.access_token =
      "Personal Access Token is required and must be a non-empty string.";
  }

  // Validate repository
  if (
    !repository ||
    typeof repository !== "string" ||
    repository.trim() === ""
  ) {
    repository = "green-git-bot-repo";
  }

  if (route === "/random-commits") {
    // Validate num_of_commits
    if (!num_of_commits || isNaN(num_of_commits) || num_of_commits <= 0) {
      num_of_commits = 5;
    } else {
      num_of_commits = parseInt(num_of_commits, 10);
    }
  } else if (route === "/dense-commits") {
    // Validate start_date
    if (
      !start_date ||
      typeof start_date !== "string" ||
      !/^\d{2}-\d{2}-\d{4}$/.test(start_date)
    ) {
      errMsgs.start_date =
        "Start date is required and must be in DD-MM-YYYY format.";
    }

    // Validate end_date
    if (
      !end_date ||
      typeof end_date !== "string" ||
      !/^\d{2}-\d{2}-\d{4}$/.test(end_date)
    ) {
      errMsgs.end_date =
        "End date is required and must be in DD-MM-YYYY format.";
    }

    // Validate commits_per_day
    if (!commits_per_day || isNaN(commits_per_day) || commits_per_day <= 0) {
      commits_per_day = 1;
    } else {
      commits_per_day = parseInt(commits_per_day, 10);
    }
  } else if (route === "/input-string-mapping-commits") {
    // Validate start_date
    if (
      !start_date ||
      typeof start_date !== "string" ||
      !/^\d{2}-\d{2}-\d{4}$/.test(start_date)
    ) {
      errMsgs.start_date =
        "Start date is required and must be in DD-MM-YYYY format.";
    }

    // Validate input_string
    if (
      !input_string ||
      typeof input_string !== "string" ||
      input_string.trim() === ""
    ) {
      errMsgs.input_string =
        "Input string is required and must be a non-empty string.";
    }

    // Validate spacing
    if (!spacing || isNaN(spacing) || spacing <= 0) {
      spacing = 1;
    } else {
      spacing = parseInt(spacing, 10);
    }
  }

  return {
    errors: Object.keys(errMsgs).length > 0 ? errMsgs : null,
    validatedData: {
      username,
      email,
      access_token,
      repository,
      num_of_commits,
      start_date,
      end_date,
      commits_per_day,
      spacing,
      input_string,
    },
  };
};
