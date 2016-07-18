# Workflow.


## Pull Requests

When creating a pull-request you should:

- __Open an issue first:__ Confirm that the change or feature will be accepted.
- __Adhere to code style:__ Use  [Google code style guide](https://google.github.io/styleguide/javascriptguide.xml). Lint your code with [Closure linter](https://github.com/google/closure-linter) or [ESLint](https://github.com/eslint/eslint) with [google preset](https://github.com/google/eslint-config-google).
- __Squash multiple commits:__ Squash multiple commits into a single commit via `git rebase -i`.
- __Start message with a verb:__ Your commit message must start a lowercase verb such as "add", "fix", "refactor", "remove"/"delete".
- __Reference the issue__: Ensure that your commit message references the issue with ". Closes #N".


## Git branches use.

We use **master** for development - everything in master should be buildable and deployable.

We use **dev** branch for more edgy features, but nevertheless, dev should be stable.

We use **feature/NUMBER-DESCRIPTION** branches, like **feature/20-new-form-look** for feature deployment.

We use **private-** prefixed branches for private pushes. Like **private-feature/20-new-form-look**. This is useful if you need to synchronize your unfinished work between machines.

## Basic workflow.

1. You commit/push to private branch or feature branch. Let it be **feature/20-new-form-look** for further reference.

2. When all is done, you merge or rebase changes to dev.

  **merge FROM**
  ```
  git checkout dev
  git merge feature/20-new-form-look
  ```
  or

  **rebase TO**
  ```
  git checkout feature/20-new-form-look
  git rebase --interactive dev
  ```

More on private branches and rebase from them read [here](https://sandofsky.com/blog/git-workflow.html).
