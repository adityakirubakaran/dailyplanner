---
name: "Test and Validate Code"
description: "Automatically test the daily planner functionality and validate code quality when files are saved"
trigger: "onSave"
filePattern: "*.js,*.html,*.css"
---

# Test and Validate Hook

## Purpose
This hook automatically runs when JavaScript, HTML, or CSS files are saved to ensure code quality and functionality.

## Actions
1. **Code Validation**
   - Check JavaScript syntax and ES6+ compliance
   - Validate HTML semantic structure
   - Verify CSS responsive design principles

2. **Functionality Testing**
   - Test task creation workflow
   - Verify localStorage persistence
   - Check responsive design breakpoints
   - Validate form input handling

3. **Performance Check**
   - Analyze DOM manipulation efficiency
   - Check for memory leaks in event listeners
   - Verify smooth animations and transitions

## Expected Outcomes
- Immediate feedback on code quality issues
- Automated testing of core functionality
- Performance optimization suggestions
- Accessibility compliance verification