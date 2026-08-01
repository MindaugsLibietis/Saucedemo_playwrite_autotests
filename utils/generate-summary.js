const fs = require('fs');
const path = require('path');

const reportPath = path.join(__dirname, '../playwright-report/results.json');
const outputPath = path.join(__dirname, '../playwright-report/summary.md');

try {
  if (!fs.existsSync(reportPath)) {
    console.error('Error: results.json not found at ' + reportPath);
    process.exit(1);
  }

  const rawData = fs.readFileSync(reportPath, 'utf8');
  const data = JSON.parse(rawData);

  const stats = data.stats || {};
  const durationSec = ( (stats.duration || 0) / 1000 ).toFixed(2);
  const passed = stats.expected || 0;
  const failed = stats.unexpected || 0;
  const flaky = stats.flaky || 0;
  const skipped = stats.skipped || 0;
  const total = passed + failed + flaky + skipped;

  const statusEmoji = failed > 0 ? '❌ FAILED' : '✅ PASSED';

  let markdown = `### 🎭 Playwright Test Run Summary

* **Run Status:** ${statusEmoji}
* **Triggered by:** \`${process.env.GITHUB_TRIGGERING_ACTOR || 'CI System'}\` on \`${process.env.GITHUB_REF_NAME || 'branch'}\`

| Total Tests | Passed ✅ | Failed ❌ | Flaky ⚠️ | Skipped ⏭️ | Duration |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **${total}** | ${passed} | ${failed} | ${flaky} | ${skipped} | ${durationSec}s |

`;

  // Collect failed tests details if any exist
  const failures = [];
  
  function findFailures(suite) {
    if (suite.specs) {
      for (const spec of suite.specs) {
        for (const test of spec.tests) {
          if (test.status === 'unexpected' || (test.results && test.results.some(r => r.status === 'failed'))) {
            const errors = test.results
              ? test.results
                  .map(r => r.error?.message)
                  .filter(Boolean)
                  .join('\n')
              : '';
            failures.push({
              title: `${suite.title ? suite.title + ' > ' : ''}${spec.title}`,
              error: errors || 'Unknown execution error'
            });
          }
        }
      }
    }
    if (suite.suites) {
      for (const subSuite of suite.suites) {
        findFailures(subSuite);
      }
    }
  }

  if (data.suites) {
    data.suites.forEach(findFailures);
  }

  if (failures.length > 0) {
    markdown += `#### 🔍 Failed Tests Details\n\n`;
    failures.forEach((failure, index) => {
      // Clean up terminal escape sequences/colors from error messages
      const cleanError = failure.error.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
      markdown += `<details>
<summary><b>${index + 1}. ${failure.title}</b></summary>

\`\`\`
${cleanError}
\`\`\`

</details>\n\n`;
    });
  } else {
    markdown += `🎉 **All tests passed successfully!**\n`;
  }

  fs.writeFileSync(outputPath, markdown, 'utf8');
  console.log('Markdown summary successfully created at ' + outputPath);
} catch (error) {
  console.error('Failed to generate markdown summary:', error);
  process.exit(1);
}
