const loadingText = [".  ", "·  ", "˙  ", " ˙ ", "  ˙", "  ·", "  .", " . "];

const bar = () => {
  let loadingTextIndex = 0;
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      if (loadingTextIndex > loadingText.length - 1) {
        loadingTextIndex = 0;
      }
      const loadText = loadingText[loadingTextIndex];
      if (i % 5 && i % 2 !== 0) {
        loadingTextIndex++;
      }
      if (i !== 0) {
        process.stdout.moveCursor(0, -2);
      }
      process.stdout.write(`\nloading ${loadText}\n` + "|".repeat(i));
    }, 10 * i);
  }
};

bar();
