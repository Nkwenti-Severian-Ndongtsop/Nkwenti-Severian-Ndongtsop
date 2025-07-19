# LeetCode Stats Card 🎯

A fully customizable, auto-updating LeetCode stats card for your GitHub README, personal site, or anywhere you want!

## Features
- **Auto-updates** daily via GitHub Actions
- **Accurate**: Fetches your real LeetCode stats via GraphQL
- **Customizable**: Change fonts, layout, colors, and more
- **Embeddable**: Use the generated PNG anywhere

## Preview
![LeetCode Stats](card/output.png)

## How It Works
1. **Fetches** your LeetCode stats using their GraphQL API
2. **Generates** a beautiful PNG card with your stats
3. **Updates** automatically every day via GitHub Actions

## Setup
1. **Clone this repo**
2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
3. **Configure your LeetCode username** in `card/fetch.py`
4. **Run locally**
   ```bash
   python card/fetch.py && python card/generate.py
   ```
5. **Push to GitHub** – The action will keep your card up to date!

## Customization
- Edit `card/generate.py` to change fonts, colors, layout, and more.

## License
MIT 