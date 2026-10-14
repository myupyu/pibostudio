---
key: "stock-prices-and-splits"
slug: "stock-split-explained-split-adjusted-prices"
lang: "en"
product: "stockpets"
title: "Stock Splits Explained: How StockPets Turns Real Price History Into Coins"
description: "Stock split explained with a simple example, plus how StockPets builds coin prices from split-adjusted monthly closes, starting every company at 100 coins."
date: "2026-10-09"
updated: "2026-10-14"
art: {"label": "GROW TOGETHER", "sprites": ["crop_tomato_golden"]}
source: "https://stockpets.com/en/guides/stock-split-explained-split-adjusted-prices/"
---

> A stock split divides each existing share into more shares at a proportionally lower price, so the total value of a holding doesn’t change. **StockPets** builds seed prices from historical monthly closing prices adjusted for splits, then sets each company’s first recorded month to 100 coins, so coin prices keep the real percentage changes rather than the dollar prices.

## What is a stock split?

A stock split is when a company increases its number of shares by dividing each existing share into several new ones. In a 2-for-1 split, every share becomes two. In a 3-for-1 split, every share becomes three. The price per share drops in the same proportion, so the total value of what each shareholder owns stays the same at the moment of the split.

Companies often split their shares after the price has climbed a long way, which can make each share easier to buy in round numbers. A split doesn’t create value by itself, and it doesn’t make a company cheaper or more expensive in any meaningful sense. It’s closer to cutting a pizza into more slices: more pieces, same pizza.

There’s also the opposite, a reverse split, where several shares are combined into one and the price per share rises in proportion. The total value of a holding again stays the same at that moment.

## A simple 2-for-1 split example

Imagine a fictional company, which we’ll just call Company X. Its shares trade at $80, and you own 10 of them. Company X announces a 2-for-1 split. Here’s what changes and what doesn’t:

<div class="table-scroll" tabindex="0"><table><thead><tr><th scope="col"></th><th scope="col">Before the split</th><th scope="col">After the split</th></tr></thead><tbody><tr><td>Shares you own</td><td>10</td><td>20</td></tr><tr><td>Price per share</td><td>$80</td><td>$40</td></tr><tr><td>Total value of your shares</td><td>$800</td><td>$800</td></tr></tbody></table></div>

You have twice as many shares at half the price, and your holding is worth exactly the same. Nothing about the company changed overnight; only the way it’s sliced did.

## Why do price histories need split adjustment?

Now picture a chart of Company X’s raw prices. One month it closes at $80, and after the split it shows $40. Looking at that chart, you’d think the stock crashed by half, even though no shareholder lost a cent. Raw price histories are full of these fake cliffs.

A **split-adjusted price** fixes that by rewriting the earlier prices so they’re comparable with today’s share count. For a 2-for-1 split, every price before the split is divided by 2. So the $80 month becomes $40 on the adjusted chart, and the line continues smoothly through the split. The real ups and downs remain; the false drop disappears.

> Without split adjustment, a crop on your StockPets farm would look like it halved overnight every time a 2-for-1 split happened. Adjusting for splits keeps the farm honest about what actually moved.

## Where do StockPets prices come from?

The seeds in StockPets are named after real US companies and follow historical US stock prices. Each seed uses **monthly closing prices**, taken from the last trading day of each month, and adjusted for stock splits only. Because one turn in the game is one month, every turn moves you to the next monthly close.

When you harvest, you harvest at the current month’s price. There are no prices in between, so the game feels like a monthly diary of the market rather than a live ticker. You can learn the rest of the rules in [how to play StockPets](/stockpets/guides/how-to-play/).

## Why does every seed start at 100 coins?

StockPets doesn’t show real dollar prices. Instead, each company’s first recorded month is set to 100 coins, and every later month is scaled from there. The coin price preserves the percentage changes, not the dollar price.

Here’s an illustration with made-up numbers. If a company’s split-adjusted close in its first recorded month were $25, that month becomes 100 coins. A later close of $30 is 20% higher, so it shows as 120 coins. A close of $20 is 20% lower, so it shows as 80 coins.

This does two things. It keeps the focus on how much a crop grew or shrank, rather than on whether a share costs a lot or a little. And it means you can’t look up a coin price and work out the real company behind it from its dollar value, which keeps the game about experiencing history rather than looking things up.

## Why aren’t dividends included?

StockPets prices are price-only. They’re adjusted for splits, but not for dividends, and the game pays no cash dividends. There are also no taxes, no fees and no real trades.

In real life, many companies pay part of their profits to shareholders as dividends, and a total-return figure includes them. A price-only chart leaves them out, so a company that paid generous dividends will look less rewarding in the game than it was for real shareholders who collected them. That’s a simplification worth keeping in mind, and one more reason the game is an experience of history, not a measure of what any real investment returned.

## How do fractional seeds work?

You plant by coin budget, not by whole seeds. Decide how many coins to put into a seed, and the game works out how many seeds that buys, down to fractions:

- Fractional seeds are allowed, with a precision of 0.000001 seed.
- The minimum planting amount is 0.01 coins.
- Unspent coins simply stay in your wallet.
- You can harvest any whole percentage from 1% to 100% at the current month’s price.

For example, putting 500 coins into a seed priced at 120 coins gets you about 4.17 seeds. A seed at 100 coins and a seed at 3,000 coins are equally easy to plant, because the budget is what matters, not the share price.

## What does “price history so far” show?

Each seed’s detail page shows its price history so far, and only up to the current game month. Future charts stay hidden until that month arrives, even though you vaguely remember the broad shape of what happened later. That’s the heart of the game: you live through the data one month at a time.

Splits are only one way a company’s story can change. Some companies leave their exchange entirely, which the game treats very differently; see [what happens when a stock is delisted](/stockpets/guides/what-happens-when-a-stock-is-delisted/). And if you’re weighing StockPets against live practice tools, our [comparison with paper trading apps](/stockpets/guides/paper-trading-app-alternative/) explains how monthly history differs from real-time simulation.

## Frequently asked questions

### Does a stock split make a stock cheaper or a better deal?

A split lowers the price per share but gives shareholders proportionally more shares, so the total value of a holding is unchanged at the moment of the split. It doesn’t change what the company is worth.

### What is a split-adjusted price?

It’s a historical price rewritten to account for later stock splits, so the chart stays comparable over time. For a 2-for-1 split, every earlier price is divided by 2, which removes the false 50% drop.

### Are StockPets coin prices the same as real dollar prices?

No. Each company’s first recorded month is set to 100 coins, and later months are scaled from there, so coin prices keep the real percentage changes but not the dollar amounts.

### Does StockPets include dividends?

No. Prices are adjusted for stock splits only, and the game pays no cash dividends. There are also no taxes or fees.

### What is a reverse stock split?

A reverse split combines several shares into one, raising the price per share in the same proportion. Like a regular split, it doesn’t change the total value of a holding at that moment.

StockPets uses virtual coins only. This article is not investment advice, and past price changes do not predict future results.
