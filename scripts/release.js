import { execSync } from 'node:child_process';
import fs from 'node:fs';

function run(cmd, opts = {}) {
  console.log(`\x1b[36m> ${cmd}\x1b[0m`);
  return execSync(cmd, { stdio: 'inherit', ...opts });
}

function getPackageInfo(pkgPath) {
  const content = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  return { name: content.name, version: content.version, path: pkgPath };
}

function isPublished(name, version) {
  try {
    const result = execSync(`npm view ${name}@${version} version`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    return result === version;
  } catch (e) {
    return false;
  }
}

try {
  console.log('\x1b[32m=== Starting DSML Packages Release Workflow ===\x1b[0m\n');

  // 1. Verify NPM auth
  try {
    const user = execSync('npm whoami', { encoding: 'utf8' }).trim();
    console.log(`✓ NPM Authenticated user: \x1b[33m${user}\x1b[0m\n`);
  } catch (err) {
    console.error('\x1b[31mError: You are not logged in to NPM. Please run `npm login` first.\x1b[0m');
    process.exit(1);
  }

  const packages = [
    getPackageInfo('packages/core/package.json'),
    getPackageInfo('packages/tailwind-plugin/package.json'),
  ];

  console.log('Target packages:');
  packages.forEach((pkg) => {
    const published = isPublished(pkg.name, pkg.version);
    console.log(` - ${pkg.name} @ ${pkg.version} ${published ? '(Already published on NPM)' : '(Pending publish)'}`);
  });
  console.log('');

  // 2. Build project
  console.log('\x1b[34m[1/3] Building tokens, LLMs and documentation site...\x1b[0m');
  run('npm run build');

  // 3. Pack packages to verify
  console.log('\n\x1b[34m[2/3] Packing packages to verify structure...\x1b[0m');
  run('npm pack --workspace=packages/core');
  run('npm pack --workspace=packages/tailwind-plugin');

  // Remove generated tgz files after pack verification
  const files = fs.readdirSync('.');
  files.forEach((f) => {
    if (f.endsWith('.tgz')) {
      fs.unlinkSync(f);
    }
  });

  // 4. Publish pending packages to NPM
  console.log('\n\x1b[34m[3/3] Publishing pending packages to NPM registry...\x1b[0m');
  for (const pkg of packages) {
    if (isPublished(pkg.name, pkg.version)) {
      console.log(`\x1b[33m➜ ${pkg.name}@${pkg.version} is already published on NPM. Skipping.\x1b[0m`);
    } else {
      console.log(`\x1b[32m➜ Publishing ${pkg.name}@${pkg.version}...\x1b[0m`);
      const workspaceDir = pkg.path.replace('/package.json', '');
      run(`npm publish --workspace=${workspaceDir} --access public`);
      console.log(`✓ Published ${pkg.name}@${pkg.version}`);
    }
  }

  console.log('\n\x1b[32m✔ Release workflow completed successfully!\x1b[0m');
} catch (error) {
  console.error('\n\x1b[31m✖ Release failed:\x1b[0m', error.message || error);
  process.exit(1);
}
