# 🔗 Useful Tools

A sleek, responsive static website that serves as a centralized hub for organizing and accessing important URLs. Never lose track of your favorite tools and resources again!

## ✨ Features

- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **🚀 Fast Performance** - Static site hosted on GitHub Pages for instant load times
- **🎯 Easy Navigation** - Clean interface to quickly find and access your important links
- **📦 JSON-Based** - Simple JSON file structure makes it easy to add/manage links
- **🔄 Auto-Deployment** - GitHub Actions automatically deploys changes to GitHub Pages

## 📁 Project Structure

```
useful-tools/
├── index.html      # Main webpage
├── script.js       # JavaScript functionality & interactivity
├── style.css       # Styling & layout
├── links.json      # Database of all important URLs
├── app.py          # Python development server (optional)
└── .github/        # GitHub Actions workflow for auto-deployment
    └── workflows/
        └── static.yml
```

## 🛠️ Technologies Used

- **HTML5** - Page structure
- **CSS3** - Responsive styling
- **JavaScript** - Interactive features
- **JSON** - Data storage
- **GitHub Pages** - Hosting & deployment

## 🚀 Getting Started

### Option 1: View Live Website
Visit the live site hosted on GitHub Pages: [useful-tools](https://nesa00.github.io/useful-tools/)

### Option 2: Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/Nesa00/useful-tools.git
   cd useful-tools
   ```

2. Run with Python (local server):
   ```bash
   python app.py
   ```
   Then open `http://localhost:5000` in your browser

3. Or simply open `index.html` directly in your browser

## 📝 Adding New Links

Edit the `links.json` file and add your links in this format:

```json
{
  "category": "Development",
  "links": [
    {
      "name": "GitHub",
      "url": "https://github.com",
      "description": "Where the world builds software"
    }
  ]
}
```

## 🌐 Deployment

This project automatically deploys to GitHub Pages whenever you push changes to the `main` branch. The deployment workflow is configured in `.github/workflows/static.yml`.

## 📊 Statistics

- **JavaScript**: 76.8%
- **CSS**: 14.9%
- **HTML**: 5.5%
- **Python**: 2.8%

## 💡 Tips

- Keep your links organized by categories in `links.json`
- Use descriptive link names and descriptions
- Test locally before pushing changes
- The site is fully responsive - no CSS framework needed!

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork, modify, and improve this project. If you have suggestions or improvements, consider opening an issue or pull request!

---

⭐ If you find this useful, please star the repository!