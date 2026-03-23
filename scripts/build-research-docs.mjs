import { mkdir, readdir, readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const docsDir = path.join(rootDir, "docs");
const outputPath = path.join(rootDir, "research-documents.js");
const CONFERENCE_METADATA = {
  "GreenTech2026_LucianoPaniagua.pdf": {
    conference: "IEEE Green Technologies Conference (GreenTech)",
    presentationDate: "2026-03-25",
    location: "Boulder, Colorado, USA",
  },
  "Paniagua_NAPS2025_Paper.pdf": {
    conference: "IEEE North American Power Symposium (NAPS)",
    presentationDate: "2025-10-26",
    location: "Hartford, Connecticut, USA",
  },
  "SusTech2026_Luciano_C3_ASPIRE_OAC_CREPES_01_10_26[FINAL].pdf": {
    conference: "IEEE Conference on Technologies for Sustainability (SusTech)",
    presentationDate: "2026-04-19",
    location: "Santa Ana, California, USA",
  },
};

function cleanWhitespace(value) {
  return value
    .replace(/\r/g, "")
    .replace(/-\s*\n\s*/g, "")
    .replace(/\s*\n\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanLine(value) {
  return value.replace(/\r/g, "").trim();
}

function slugify(value) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (slug.length <= 110) {
    return slug;
  }

  const trimmed = slug.slice(0, 110);
  return trimmed.slice(0, trimmed.lastIndexOf("-")) || trimmed;
}

function titleCase(value) {
  return value
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function extractTitle(lines, fallbackName) {
  const titleLines = [];

  for (const rawLine of lines) {
    const line = cleanLine(rawLine);
    if (!line) {
      if (titleLines.length) {
        break;
      }
      continue;
    }

    if (/^(abstract|luciano|alisha|paras|senior member|undergraduate student member)/i.test(line)) {
      break;
    }

    titleLines.push(line);
  }

  if (titleLines.length) {
    return cleanWhitespace(titleLines.join(" "));
  }

  return titleCase(fallbackName.replace(/\.pdf$/i, "").replace(/[_-]+/g, " "));
}

function extractAbstract(text) {
  const match = text.match(/Abstract[—-](.+?)(?:Index Terms[—-]|I\.\s+INTRODUCTION)/is);
  if (!match) {
    return "";
  }

  return cleanWhitespace(match[1]);
}

function extractKeywords(text) {
  const match = text.match(/Index Terms[—-](.+?)(?:I\.\s+INTRODUCTION)/is);
  if (!match) {
    return [];
  }

  return cleanWhitespace(match[1])
    .split(",")
    .map((item) => item.replace(/\.$/, "").trim())
    .filter(Boolean)
    .slice(0, 3);
}

function formatDate(isoDate) {
  if (!isoDate) {
    return "Date not set";
  }

  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return "Date not set";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function pickTheme(tags, index) {
  const joined = tags.join(" ").toLowerCase();
  if (joined.includes("datacenter") || joined.includes("virtual power plant") || joined.includes("congestion")) {
    return "doc-bg-notes";
  }
  if (joined.includes("load") || joined.includes("forecast")) {
    return "doc-bg-load";
  }
  if (joined.includes("language") || joined.includes("grid") || joined.includes("retrieval")) {
    return "doc-bg-wind";
  }

  return ["doc-bg-wind", "doc-bg-load", "doc-bg-notes"][index % 3];
}

async function parsePdf(filename, index) {
  const sourcePath = path.join(rootDir, filename);
  const buffer = await readFile(sourcePath);
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  await parser.destroy();

  const lines = result.text.split("\n");
  const title = extractTitle(lines, filename);
  const abstract = extractAbstract(result.text);
  const tags = extractKeywords(result.text);
  const metadata = CONFERENCE_METADATA[filename] || {};
  const slug = slugify(title) || slugify(filename.replace(/\.pdf$/i, ""));
  const targetFilename = `${slug}.pdf`;
  const targetPath = path.join(docsDir, targetFilename);

  await copyFile(sourcePath, targetPath);

  return {
    title,
    abstract,
    tags,
    filename: targetFilename,
    sourceFilename: filename,
    conference: metadata.conference || "Conference not set",
    location: metadata.location || "Location not set",
    presentationDate: metadata.presentationDate || "",
    presentationDateLabel: formatDate(metadata.presentationDate || ""),
    themeClass: pickTheme(tags, index),
  };
}

async function main() {
  await mkdir(docsDir, { recursive: true });

  const entries = await readdir(rootDir, { withFileTypes: true });
  const pdfFiles = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => name.toLowerCase().endsWith(".pdf"))
    .sort();

  const documents = [];
  for (const [index, filename] of pdfFiles.entries()) {
    documents.push(await parsePdf(filename, index));
  }
  documents.sort((a, b) => {
    const timeA = a.presentationDate ? new Date(`${a.presentationDate}T00:00:00`).getTime() : 0;
    const timeB = b.presentationDate ? new Date(`${b.presentationDate}T00:00:00`).getTime() : 0;
    if (timeA !== timeB) {
      return timeB - timeA;
    }
    return (a.conference || "").localeCompare(b.conference || "");
  });

  const serialized = JSON.stringify(documents, null, 2);
  const output = `const researchDocs = ${serialized};\nif (typeof window !== "undefined") {\n  window.RESEARCH_DOCS = researchDocs;\n}\nif (typeof module !== "undefined") {\n  module.exports = researchDocs;\n}\n`;
  await writeFile(outputPath, output, "utf8");

  console.log(`Generated ${documents.length} research document entr${documents.length === 1 ? "y" : "ies"}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
