module.exports = {
  printWidth: 100,
  tabWidth: 2,
  trailingComma: "all",
  // "singleQuote": true,
  semi: true,
  importOrder: [
    "^@core/(.*)$",
    "^app/(.*)$",
    "^presenters/(.*)$",
    "^pages/(.*)$",
    "^components/(.*)$",
    "^types/(.*)$",
    "^utils/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
