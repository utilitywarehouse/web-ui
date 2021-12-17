# Customer UI

This monorepo contains all the packages used for Customer UI. See [individual packages](#packages) for more info.

## Packages

- [@utilitywarehouse/customer-ui-design-tokens](packages/design-tokens)
- [@utilitywarehouse/customer-ui-fonts](packages/fonts)
- [@utilitywarehouse/customer-ui-icons](packages/icons)
- [@utilitywarehouse/customer-ui-react-icons](packages/react-icons)
- [@utilitywarehouse/customer-ui-theme](packages/theme)
- [@utilitywarehouse/customer-ui-material](packages/material)

## Working with this monorepo

This monorepo makes use of [Lerna](https://lerna.js.org/) to manage our multiple
packages, alongside yarn workspaces to assist with dependency management. For a
full list of tools and what they do see the [tools](#tools) section of this
documentation

- [Getting started](#getting-started)
- [Running tests](#running-tests)
- [Running linter](#running-linter)
- [Committing to the repository](#committing-to-the-repository)
- [Tools](#tools)
- [Common actions and commands](#common-actions-and-commands)
  - [How to create a new package](#how-to-create-a-new-package)
  - [How to add a shared dependency](#how-to-add-a-shared-dependency)
  - [Publishing changes](#publishing-changes)
- [CI](#ci)
  - [Deployments](#deployments)
  - [Environment variables](#environment-variables)
  - [Running tasks only on packages which have changed](#running-tasks-only-on-packages-which-have-changed)

### Getting started

Install dependencies

```console
yarn
```

### Lint & format

```console
yarn lint
```

And automatically attempting to fix linter errors/warnings

```console
yarn lint:fix
```

### Committing to the repository

We use
[@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional)
to enforce structured commit messages.

To assist with the commit message structure you can run the following command:

```console
yarn commit
```

This will prompt [Commitizen](https://www.npmjs.com/package/commitizen) to build
the commit message through their interactive CLI. Alternatively commit messages
can be created manually, and will be validated with a git hook.

### Tools

1. [Lerna](https://lerna.js.org/), a tool for managing JavaScript projects with multiple packages
1. [Yarn](https://yarnpkg.com/), dependency management
1. [ESLint](https://eslint.org/), JavaScript linter used to fix problems in our code as well as enforcing code style rules
1. [Prettier](https://prettier.io/), opinionated code formatter
1. [Commitizen](https://www.npmjs.com/package/commitizen), a tool used to enforce commit message formatting
1. [husky](https://typicode.github.io/husky/#/), a tool making it easier to manage and create git hooks
1. [pinst](https://github.com/typicode/pinst), works alongside husky to ensure `postinstall` doesn't run for published packages

### Common actions and commands

#### How to create a new package

```shell
yarn new-package
```

This will prompt for a package name and description and will create a
boilerplate Typescript package under the packages directory with the required
script commands.

#### How to add a shared dependency

Commonly dev dependencies may be used across all packages, in which case adding
this dependency to the root can make it cleaner to manage.

```shell
yarn add --dev -W <package>
```

The `-W` flag specifies the package to be installed in the workspace root. From
there on packages within `packages/` have access to this dependency.

#### Publishing changes

All changes are published through [CircleCI](https://circleci.com/) on the
`alpha` branch. All development should take place on branches from `alpha` then
submit a PR to merge back to `alpha`.

CI will detect what packages need to be updated and what the new version should
be based on commit messages since the last release for each package. The release
will then be published to npm, tagged in git and the changelog updated.

### CI

CI is the orchestrator of this monorepo, automating where possible every step to
deployment.

#### Deployments

Deployments occur on the following branches:

- `alpha` - alpha releases.

#### Environment variables

| NAME                | TYPE   | PURPOSE                                                                                                                        |
| ------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| GITHUB_TOKEN        | string | Used during deployments to push tags and commits. Also used to comment on PR's. This is a GitHub personal access token.        |
| GIT_AUTHOR_EMAIL    | string | Email associated with deployment commits and tags.                                                                             |
| GIT_AUTHOR_NAME     | string | Name associated with deployment commits and tags.                                                                              |
| GIT_COMMITTER_EMAIL | string | Email associated with deployment commits and tags.                                                                             |
| GIT_COMMITTER_NAME  | string | Name associated with deployment commits and tags.                                                                              |
| NPM_TOKEN           | string | Read/Write token used to install private dependencies and publish packages.                                                    |
| SURGE_SH_TOKEN      | string | Used to deploy static sites to [surge.sh](https://surge.sh). Used for deploying documentation and deployment previews on PR's. |

#### Running tasks only on packages which have changed

Sometimes you only want to run certain tasks in CI scoped to a particular
package when that package has changed. For example deploying preview URLs for
documentation, or updating test coverage. This can be achieved by adding your
script to the packages `ci-package-changed` script in `package.json`.

This script will be triggered on CI on a main branch such as `alpha`, regardless
of whether or not any changes have been made to the package. Or they will run on
any other branch assuming the branch will be merged to `alpha` and when the
package has been modified in some way on that branch. An example of what can be
achieved through this script can be seen in the
[@utilitywarehouse/customer-ui-material](packages/material) package.
