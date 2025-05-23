#!/usr/bin/env node

import arg from "arg";
import chalk from "chalk";
import { initCommand } from "./commands/init";
import { installCommand } from "./commands/install";
import { listCommand } from "./commands/list";

// Define version from package.json
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pkg = require("../package.json");

// Parse arguments
const args = arg(
  {
    "--help": Boolean,
    "--version": Boolean,
    "--ci": Boolean,
    "--workspaces": Boolean,
    "--verbose": Boolean,
    "-h": "--help",
    "-v": "--version",
  },
  {
    permissive: true,
    argv: process.argv.slice(2),
  },
);

// Show version
if (args["--version"]) {
  console.log(pkg.version);
  process.exit(0);
}

// Get the command (first non-flag argument)
const command = args._.length > 0 ? args._[0] : null;

// Execute the appropriate command
switch (command) {
  case "init":
    initCommand();
    break;
  case "install":
    installCommand(args["--ci"], args["--workspaces"], args["--verbose"]);
    break;
  case "list":
    listCommand();
    break;
  default:
    // Show help
    showHelp();
    break;
}

function showHelp() {
  console.log(`
${chalk.bold("aicm")} - A CLI tool for managing AI IDE configurations

${chalk.bold("USAGE")}
  $ aicm [command] [options]

${chalk.bold("COMMANDS")}
  init                Initialize a new aicm configuration file
  install             Install rules from configured sources
  list                List all configured rules and their status

${chalk.bold("OPTIONS")}
  -h, --help          Show this help message
  -v, --version       Show version number
  --ci                Run in CI environments (default: \`false\`)
  --workspaces        Install rules across all workspaces
  --verbose           Show detailed output during installation

${chalk.bold("EXAMPLES")}
  $ aicm init
  $ aicm install
  $ aicm install --workspaces
  $ aicm list
`);
}
