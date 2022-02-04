const correctScoreRelative = (
  team: "H" | "A",
  amount: number,
  bffUri: string
) => {
  fetch(`${bffUri}/basket/correct-score-relative`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ team, amount }),
  });
};

export { correctScoreRelative };
