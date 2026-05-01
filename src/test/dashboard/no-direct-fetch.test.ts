import { describe, it, expect } from "vitest";

import fs from "node:fs";
import path from "node:path";

const COMPONENT_DIRS = [
  "src/components/dashboard",
  "src/app/(admin)/dashboard",
];

const FORBIDDEN_IMPORTS = ["axios"];
const FORBIDDEN_PATTERNS = [/\bawait fetch\(/, /\bfetch\(/, /API_PATHS\.DASHBOARD\./];

function getTsFiles(dir: string): string[] {
  const abs = path.resolve(process.cwd(), dir);
  if (!fs.existsSync(abs)) return [];

  return fs
    .readdirSync(abs, { recursive: true })
    .filter(
      (f) =>
        typeof f === "string" &&
        (f.endsWith(".ts") || f.endsWith(".tsx")),
    )
    .map((f) => path.join(abs, String(f)));
}

function readFile(filePath: string): string {
  return fs.readFileSync(filePath, "utf-8");
}

describe("no direct fetch rule (SC-010, SC-011)", () => {
  const allFiles = COMPONENT_DIRS.flatMap(getTsFiles);

  it("has at least one dashboard component file to scan", () => {
    expect(allFiles.length).toBeGreaterThan(0);
  });

  it.each(COMPONENT_DIRS)(
    "no file in %s imports axios directly",
    (dir) => {
      const files = getTsFiles(dir);
      for (const file of files) {
        const content = readFile(file);
        for (const imp of FORBIDDEN_IMPORTS) {
          const importPattern = new RegExp(
            `import\\s+.*from\\s+['"]${imp}['"]|require\\s*\\(\\s*['"]${imp}['"]\\s*\\)`,
          );
          expect(
            importPattern.test(content),
            `${path.relative(process.cwd(), file)} imports '${imp}' directly`,
          ).toBe(false);
        }
      }
    },
  );

  it.each(COMPONENT_DIRS)(
    "no file in %s calls fetch( or references API_PATHS.DASHBOARD directly",
    (dir) => {
      const files = getTsFiles(dir);
      for (const file of files) {
        const content = readFile(file);
        for (const pattern of FORBIDDEN_PATTERNS) {
          expect(
            pattern.test(content),
            `${path.relative(process.cwd(), file)} matches forbidden pattern ${pattern}`,
          ).toBe(false);
        }
      }
    },
  );
});
