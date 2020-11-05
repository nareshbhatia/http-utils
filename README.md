# HTTP Utils

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Foundational utilities for HTTP, REST & HATEOAS

## Build Process

### Typical commits
Always do commits in conventional commit format. This step can be repeated any
number of times during the development process.


```bash
git status
git add --all
yarn cz-commit # interactive conventional commit
git push
```


### Release to NPM

```bash
# Make sure local build runs successfully
yarn build:local

# Detemine which packages have changed
yarn changed

# Go to each changed package.

# 1. Manually change the version number in package.json. Use semver.

# 2. Commit and push (see above)

# 3. Rebuild the package
yarn build:local

# 4. Release to npm
npm publish

# 5. Tag the release and push the tag to remote
```
