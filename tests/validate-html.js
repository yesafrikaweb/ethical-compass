/**
 * Ethical Intelligence - Automated HTML & Asset Test Suite
 * Zero-dependency Node.js test runner for HTML integrity, links, SEO, accessibility & sitemap.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const MODULES_DIR = path.join(ROOT_DIR, 'modules');

let totalTests = 0;
let passedTests = 0;
let failures = [];

function assert(condition, message, file) {
  totalTests++;
  if (condition) {
    passedTests++;
  } else {
    const errorMsg = `[FAIL] ${file ? path.relative(ROOT_DIR, file) + ': ' : ''}${message}`;
    failures.push(errorMsg);
  }
}

function getAllHtmlFiles() {
  const files = [path.join(ROOT_DIR, 'index.html')];
  if (fs.existsSync(MODULES_DIR)) {
    const moduleFiles = fs.readdirSync(MODULES_DIR)
      .filter(f => f.endsWith('.html'))
      .map(f => path.join(MODULES_DIR, f));
    files.push(...moduleFiles);
  }
  return files;
}

function extractMatches(content, regex, groupIndex = 1) {
  const matches = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    matches.push(match[groupIndex]);
  }
  return matches;
}

function runTestSuite() {
  console.log('\n======================================================');
  console.log('  ETHICAL INTELLIGENCE - HTML TEST SUITE');
  console.log('======================================================\n');

  const htmlFiles = getAllHtmlFiles();
  console.log(`Found ${htmlFiles.length} HTML files to validate:\n`);
  htmlFiles.forEach(f => console.log(`  • ${path.relative(ROOT_DIR, f)}`));
  console.log(`  • sitemap.xml\n`);

  htmlFiles.forEach(filePath => {
    const fileName = path.relative(ROOT_DIR, filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    const fileDir = path.dirname(filePath);

    // 1. Structure & Essential Meta Tags
    assert(/<!DOCTYPE\s+html>/i.test(content), 'Missing <!DOCTYPE html>', filePath);
    assert(/<html[^>]*lang=["']en["']/i.test(content), 'Missing lang="en" on <html> tag', filePath);
    assert(/<title>[^<]+<\/title>/i.test(content), 'Missing or empty <title> tag', filePath);
    assert(/<meta[^>]+charset=["']?UTF-8["']?/i.test(content), 'Missing UTF-8 charset declaration', filePath);
    assert(/<meta[^>]+name=["']viewport["']/i.test(content), 'Missing viewport meta tag', filePath);

    // 2. Duplicate ID Check
    const idMatches = extractMatches(content, /\bid=["']([^"']+)["']/gi, 1);
    const idCounts = {};
    idMatches.forEach(id => {
      idCounts[id] = (idCounts[id] || 0) + 1;
    });
    Object.entries(idCounts).forEach(([id, count]) => {
      assert(count === 1, `Duplicate id="${id}" found ${count} times on page`, filePath);
    });

    // 3. Form Label Matching Check (<label for="X"> -> <input id="X">)
    const labelForMatches = extractMatches(content, /<label[^>]+for=["']([^"']+)["']/gi, 1);
    labelForMatches.forEach(forId => {
      const hasMatchingInput = new RegExp(`id=["']${forId}["']`, 'i').test(content);
      assert(hasMatchingInput, `Label points to non-existent input id="${forId}"`, filePath);
    });

    // 4. Image Accessibility (<img alt="...">)
    const imgMatches = extractMatches(content, /<img\b([^>]*)>/gi, 1);
    imgMatches.forEach(imgAttrs => {
      const hasAlt = /\balt=["'][^"']*["']/i.test(imgAttrs);
      assert(hasAlt, `Image tag missing alt attribute: <img ${imgAttrs.trim()}>`, filePath);
    });

    // 5. Local Asset & Link Validation (src and href)
    const localAssetRegex = /\b(?:src|href)=["']([^"']+)["']/gi;
    let assetMatch;
    while ((assetMatch = localAssetRegex.exec(content)) !== null) {
      const link = assetMatch[1].trim();

      // Skip external links, data uris, mailto, javascript, empty anchors
      if (
        link.startsWith('http://') ||
        link.startsWith('https://') ||
        link.startsWith('//') ||
        link.startsWith('data:') ||
        link.startsWith('mailto:') ||
        link.startsWith('tel:') ||
        link.startsWith('javascript:') ||
        link === '#' ||
        link === ''
      ) {
        continue;
      }

      // Handle same-page hash anchors (e.g. #faq)
      if (link.startsWith('#')) {
        const anchorId = link.slice(1);
        if (anchorId) {
          const hasAnchor = new RegExp(`id=["']${anchorId}["']`, 'i').test(content);
          assert(hasAnchor, `Broken on-page anchor href="${link}" (target id not found)`, filePath);
        }
        continue;
      }

      // Handle relative paths with query strings or hashes (e.g. infographics.css?v=0.21)
      const cleanLink = link.split('?')[0].split('#')[0];
      const resolvedPath = path.resolve(fileDir, cleanLink);

      assert(fs.existsSync(resolvedPath), `Broken relative link/asset path: "${link}" -> not found at ${resolvedPath}`, filePath);
    }
  });

  // 6. Sitemap.xml Validation
  const sitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const locMatches = extractMatches(sitemapContent, /<loc>https?:\/\/[^/]+\/ethical-compass\/([^<]+)<\/loc>/gi, 1);

    locMatches.forEach(relPath => {
      const fullTarget = path.join(ROOT_DIR, relPath);
      assert(fs.existsSync(fullTarget), `Sitemap contains dead URL reference: "${relPath}" (file does not exist)`, 'sitemap.xml');
    });
  }

  // 7. Robots.txt Security Policy Validation
  const robotsPath = path.join(ROOT_DIR, 'robots.txt');
  assert(fs.existsSync(robotsPath), 'Missing robots.txt crawler security policy', 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    const robotsContent = fs.readFileSync(robotsPath, 'utf8');
    assert(/User-agent:\s*GPTBot/i.test(robotsContent), 'robots.txt missing AI scraper blocking for GPTBot', 'robots.txt');
    assert(/User-agent:\s*CCBot/i.test(robotsContent), 'robots.txt missing AI scraper blocking for CCBot', 'robots.txt');
    assert(/Sitemap:\s*https?:\/\/[^\s]+/i.test(robotsContent), 'robots.txt missing canonical Sitemap directive', 'robots.txt');
  }

  // Final Results Output
  console.log(`Executed ${totalTests} assertions across ${htmlFiles.length} HTML files, sitemap & robots.txt.`);

  if (failures.length === 0) {
    console.log(`\n\x1b[32m✔ ALL ${passedTests} TESTS PASSED! HTML structure & asset integrity verified.\x1b[0m\n`);
    process.exit(0);
  } else {
    console.log(`\n\x1b[31m✘ ${failures.length} FAILURE(S) DETECTED:\x1b[0m\n`);
    failures.forEach(f => console.log(`  ${f}`));
    console.log('\n');
    process.exit(1);
  }
}

runTestSuite();
