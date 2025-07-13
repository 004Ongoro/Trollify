# Trollify - Fake Social Media Post Generator

Trollify is a web application that enables users to create ultra-realistic fake social media posts, accounts, and screenshots for entertainment and testing purposes.

## ⚠️ Important Disclaimer

**This application is for entertainment and testing purposes only.** All generated content is fake and fictional. Do not use for fraud, defamation, or any illegal activities.

## Features

- **Platform Support**: X (Twitter), Facebook, and Instagram
- **Template Variety**: Text posts, image posts, and combined text+image posts
- **Realistic Design**: Pixel-perfect replicas of social media platforms
- **Customization Options**: 
  - Edit usernames, display names, and post content
  - Upload custom images
  - Adjust engagement numbers (likes, comments, shares)
  - Choose themes (light/dark mode)
  - Select fonts
- **Instant Download**: Generate and download high-quality PNG images
- **Privacy-First**: No user registration required, all processing happens locally
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Technology Stack

- **Frontend**: Next.js 14 with React 18
- **Styling**: Tailwind CSS with custom neon theme
- **UI Components**: shadcn/ui
- **Image Generation**: html2canvas
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd trollify
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
trollify/
├── app/
│   ├── create/[platform]/     # Platform-specific creation pages
│   ├── terms/                 # Terms of Service page
│   ├── privacy/               # Privacy Policy page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/ui/            # shadcn/ui components
├── public/                   # Static assets
├── README.md
├── package.json
└── tailwind.config.js
\`\`\`

## Usage

1. **Select Platform**: Choose from X, Facebook, or Instagram
2. **Choose Template**: Pick from available post types (text, image, or combined)
3. **Customize Content**: 
   - Edit usernames and display names
   - Add post text
   - Upload images (drag & drop supported)
   - Adjust engagement numbers manually or use random generation
4. **Customize Appearance**:
   - Select theme (light/dark)
   - Choose font family
5. **Preview & Download**: View live preview and download as PNG

## Legal Compliance

### Terms of Service
- Service is for entertainment/testing only
- Prohibits fraud, defamation, and illegal use
- Users responsible for their content
- Clear disclaimers required when sharing

### Privacy Policy
- No user registration required
- No personal data collected
- All processing happens locally in browser
- Minimal technical data for service operation only

## Deployment

### Vercel (Recommended)
\`\`\`bash
npm run build
# Deploy to Vercel
\`\`\`

### Netlify
\`\`\`bash
npm run build
# Deploy build folder to Netlify
\`\`\`

### Docker
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Optimizations

- Lazy loading for images
- Optimized bundle sizes with tree shaking
- Client-side image processing (no server uploads)
- Efficient CSS with Tailwind purging
- Fast HTML2Canvas rendering
- Responsive image handling

## Security Features

- No server-side data storage
- Client-side only processing
- CORS protection
- Input sanitization
- Rate limiting protection

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

\`\`\`bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
\`\`\`

## Environment Variables

No environment variables are required for basic functionality. The app runs entirely client-side.

## Troubleshooting

### Common Issues

1. **Image upload fails**: Ensure image is under 10MB and in supported format (PNG, JPG, GIF)
2. **Download not working**: Check browser permissions for file downloads
3. **Preview not rendering**: Clear browser cache and reload
4. **Mobile layout issues**: Ensure viewport meta tag is present

### Browser Compatibility

If you experience issues:
- Update to the latest browser version
- Enable JavaScript
- Clear browser cache
- Disable ad blockers temporarily

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- shadcn/ui for the component library
- Tailwind CSS for styling framework
- html2canvas for image generation
- Lucide React for icons
- Next.js team for the framework

## Support

For support and questions:
- Check the documentation
- Review existing issues
- Create a new issue with detailed description

## Roadmap

### Planned Features
- [ ] Additional social media platforms (TikTok, LinkedIn)
- [ ] More template variations
- [ ] Batch processing
- [ ] Advanced customization options
- [ ] Mobile app version
- [ ] API for developers

### Version History
- v1.0.0 - Initial release with X, Facebook, Instagram support
- v1.1.0 - Enhanced mobile responsiveness
- v1.2.0 - Additional templates and themes

---

**Remember**: This tool is for entertainment and testing purposes only. Always use responsibly and ethically.
