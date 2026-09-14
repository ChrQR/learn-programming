/** Where the kids clone these lessons from. Update this when the repo is on GitHub. */
export const REPO_URL = 'https://github.com/YOUR-ORG/learn-programming';

/** Folder name that `git clone` creates from REPO_URL. */
export const REPO_DIR = REPO_URL.split('/').pop() ?? 'learn-programming';
