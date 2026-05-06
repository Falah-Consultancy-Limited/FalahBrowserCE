# CONTRIBUTING.md - Contribution Guidelines

Thank you for considering contributing to Falah Browser! 🏮

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

- Check if the bug has already been reported in [Issues](https://github.com/falahbrowser/falah-browser/issues)
- Use the bug report template
- Include detailed steps to reproduce
- Include screenshots if applicable
- Specify your OS and app version

### Suggesting Enhancements

- Open a [Feature Request](https://github.com/falahbrowser/falah-browser/issues/new?template=feature_request.md)
- Describe the feature and its benefits
- Include mockups or examples if possible

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Format code (`npx prettier --write .`)
6. Commit with clear message (`git commit -m 'Add amazing feature'`)
7. Push to branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## Development Guidelines

### Code Style

- Use Prettier for formatting
- Follow existing code conventions
- Use functional React components with hooks
- Use meaningful variable/function names
- Avoid deeply nested structures

### Component Structure

```jsx
import React, { useState, useEffect } from 'react';
import { COLORS } from '../utils/constants';

const ComponentName = (props) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // side effects
  }, [dependencies]);

  return (
    <div style={styles.container}>
      {/* Component JSX */}
    </div>
  );
};

const styles = {
  container: {
    // styles
  }
};

export default ComponentName;
```

### CSS Guidelines

- Use CSS-in-JS style objects for component styling
- Use `globals.css` for global styles and resets
- Follow Institutional Noir design system
- Use CSS variables from `:root` for consistency

### Testing

- Write unit tests for all components
- Place test files in `src/__tests__/`
- Use `@testing-library/react`
- Aim for >80% test coverage
- Test user interactions and edge cases

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new widget component
fix: resolve prayer time calculation bug
docs: update README with new features
style: format code with prettier
refactor: restructure component hierarchy
test: add unit tests for ChatWidget
```

## Review Process

1. PR is reviewed by maintainers
2. Automated tests must pass
3. Code style is checked
4. Functionality is verified
5. Once approved, PR is merged

## Community

- Join our [Telegram](https://t.me/FalahBrowserOfficial)
- Follow on Twitter [@FalahBrowser](https://twitter.com/FalahBrowser)
- Check [ROADMAP.md](./ROADMAP.md) for upcoming features

## Questions?

Feel free to reach out:
- 📧 Email: support@falahbrowser.com
- 💬 Telegram: https://t.me/FalahBrowserOfficial

JazakAllah Khair for contributing! 🙏