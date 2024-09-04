# Sean Betts Personal Website

## Overview

This project is a personal website for Sean Betts, showcasing his work as a Chief Product & Technology Officer, AI researcher, and developer. The website is built using React and features a modern, responsive design with a dark/light mode toggle.

## Features

- Responsive design
- Dark/light mode toggle
- Project showcase
- Writing/blog section
- About page
- Contact form
- Social media links

## Technologies Used

- React
- React Router
- CSS Modules
- Phosphor Icons

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/seanbetts/seanbetts.git
   ```

2. Navigate to the project directory:
   ```
   cd seanbetts
   ```

3. Install dependencies:
   ```
   npm install
   ```

### Running the Development Server

To start the development server, run:

```
npm start
```

The site will be available at `http://localhost:3000`.

### Building for Production

To create a production build, run:

```
npm run build
```

The built files will be in the `build` directory.

## Project Structure

- `src/`: Source code
  - `components/`: Reusable React components
  - `pages/`: Individual page components
  - `styles/`: Global styles
  - `data/`: Static data files
  - `utils/`: Utility functions
- `public/`: Public assets

## Deployment

This project is set up for deployment on GitHub Pages. To deploy:

1. Update the `homepage` field in `package.json` with your GitHub Pages URL.
2. Run the deployment script:
   ```
   npm run deploy
   ```

## License

This project is open source and available under the [MIT License](LICENSE).
