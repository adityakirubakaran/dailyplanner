---
inclusion: fileMatch
fileMatchPattern: "*.js"
---

# Development Workflow Guidelines

## JavaScript Development Process
When working with JavaScript files in this project, follow these specific guidelines:

### Code Organization
- Use the established DailyPlanner class structure
- Keep methods focused and single-purpose
- Use descriptive method and variable names
- Implement proper error handling for user interactions

### Event Handling
- Use event delegation for dynamically generated content
- Bind events in the constructor or init method
- Handle edge cases (empty states, invalid input)
- Provide user feedback for all actions

### Data Management
- Always validate data before localStorage operations
- Use consistent date formatting for storage keys
- Implement proper JSON error handling
- Maintain data integrity across operations

### Testing Considerations
- Test with empty task lists
- Verify localStorage persistence
- Check responsive behavior
- Validate form input edge cases