const fs = require("fs");
const { execSync } = require("child_process");

const files = execSync('grep -rl "<Breadcrumbs" src/app')
  .toString()
  .trim()
  .split("\n");

for (const file of files) {
  if (!file.endsWith(".tsx")) continue;
  let content = fs.readFileSync(file, "utf8");

  // Find the Container block
  const containerRegex =
    /(const (?:Page)?Container = styled\.div`)([\s\S]*?)(`;)/;
  const match = content.match(containerRegex);

  if (match) {
    let block = match[2];

    // Only replace padding that comes BEFORE any @media block to prevent altering nested/inner paddings blindly.
    // Actually, we can split by @media, process the part before it, and then process the @media part.
    const mediaSplit = block.split(/@media/);

    // Process base level (mediaSplit[0])
    mediaSplit[0] = mediaSplit[0].replace(
      /padding:\s*([4-9]|[1-9][0-9])rem\s+([^;]+;)/,
      "padding: 2.5rem $2",
    );

    // Process mobile level (mediaSplit[1] if exists)
    if (mediaSplit[1]) {
      // Look for padding: <large>rem ...
      // and replace the first one
      mediaSplit[1] = mediaSplit[1].replace(
        /padding:\s*([4-9]|[1-9][0-9])rem\s+([^;]+;)/,
        "padding: 6rem $2",
      ); // wait, if it was 6rem or something
      // Wait, mobile paddings were often like 6rem 1.5rem 3rem. So we want it to be 1.5rem top.
      mediaSplit[1] = mediaSplit[1].replace(
        /padding:\s*[0-9.]+rem\s+([0-9.]+rem)/,
        "padding: 6rem $1",
      ); // It's safer to not touch mobile unless there's an obvious top padding

      mediaSplit[1] = mediaSplit[1].replace(
        /padding:\s*6rem\s+([0-9.]+rem)/,
        "padding: 1.5rem $1",
      );
      mediaSplit[1] = mediaSplit[1].replace(
        /padding:\s*8rem\s+([0-9.]+rem)/,
        "padding: 1.5rem $1",
      );
      mediaSplit[1] = mediaSplit[1].replace(
        /padding:\s*4rem\s+([0-9.]+rem)/,
        "padding: 1.5rem $1",
      );
    }

    let newBlock = mediaSplit.join("@media");

    // If the block changed, write it
    if (block !== newBlock) {
      content = content.replace(match[0], match[1] + newBlock + match[3]);
      fs.writeFileSync(file, content);
      console.log(`Safely updated padding in ${file}`);
    }
  }
}
