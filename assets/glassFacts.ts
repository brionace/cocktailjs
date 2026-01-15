export const glassFacts: Record<string, { short: string; long?: string }> = {
  Highball: {
    short: "Tall glass used for long drinks and mixed cocktails.",
    long: "The highball glass is tall and straight, commonly used for drinks served with a large proportion of mixer and ice, like a gin & tonic or rum and coke.",
  },
  Martini: {
    short: "Classic stemmed glass for stirred or shaken cocktails.",
    long: "The martini glass evolved in the early 20th century to showcase spirit-forward cocktails; its wide bowl helps aroma but is less practical with lots of ice.",
  },
  OldFashioned: {
    short: "Short, heavy glass for spirits and cocktails on the rocks.",
    long: "Also called a rocks glass, it's ideal for stirred cocktails served over ice, offering a sturdy base for muddling and garnishes.",
  },
  Coupe: {
    short: "Stemmed vintage glass for cocktails served 'up'.",
    long: "The coupe was popular in the early 20th century and is often used for cocktails served without ice, providing an elegant profile for sipping.",
  },
};

export const garnishFacts: Record<string, { short: string; long?: string }> = {
  lemon: {
    short: "Bright citrus twist or wedge for aroma and acidity.",
    long: "Lemon peel oils add a bright citrus aroma; a twist releases essential oils over the drink while a wedge provides juice.",
  },
  mint: {
    short: "Refreshing herb commonly used in juleps and mojitos.",
    long: "Muddled mint releases aromatic oils; for garnish, slap the sprig to wake the aroma before placing it in the glass.",
  },
  cherry: {
    short: "Sweet cocktail cherry for garnish and a finish note.",
    long: "Luxardo cherries and similar preserved varieties add a rich sweetness; they can also be used to stir or eat after the drink.",
  },
};

export default { glassFacts, garnishFacts };
