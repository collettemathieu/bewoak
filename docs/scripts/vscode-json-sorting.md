# JSON Files Sorting in the Project

This document presents the different solutions available to alphabetically sort JSON files in the bewoak project.

## Available Solutions

### 1. 🖱️ **Native VS Code Command (file by file)**

**Usage:** For a JSON file open in the editor

- `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS)
- Type "JSON: Sort Document"
- Press Enter

**Advantages:**

- ✅ Native to VS Code
- ✅ Simple to use
- ✅ No configuration required

**Disadvantages:**

- ❌ One file at a time only
- ❌ No recursive sorting of nested objects

### 2. 🎯 **Custom TypeScript Script (recommended)**

**Usage:**

```bash
# Via npm/bun script
bun run sort-json

# Or directly
bun run scripts/sort-json-files.ts
```

**Advantages:**

- ✅ Sorts ALL JSON files in the project at once
- ✅ Recursive sorting of nested objects
- ✅ Automatically excludes irrelevant folders
- ✅ Detailed process feedback
- ✅ Intelligent error handling
- ✅ Respects Biome/linting configuration

**Features:**

- **Recursive sorting:** Keys are sorted at all depth levels
- **Smart exclusions:** Ignores `node_modules`, `dist`, `.nx`, `.git`, `coverage`, `tmp`, etc.
- **Safety:** Only saves if content changes
- **Performance:** Fast processing with real-time feedback

### 3. 🔧 **VS Code Task**

A VS Code task is available in the Command Palette (`Ctrl+Shift+P` → "Tasks: Run Task"):

#### **"sort-all-json-files"**

- Uses the `scripts/sort-json-files.ts` script
- Recursive and intelligent sorting
- Advanced error handling
- User interface integrated with VS Code

## 📋 Recommended Usage

### For one-time use:

```bash
bun run sort-json
```

### To integrate into your workflow:

1. Add to your pre-commit scripts if desired
2. Run periodically to maintain consistency
3. Use before important code reviews

## 🔍 Affected Files

The script automatically processes:

- ✅ All `*.json` files in the project
- ✅ Configuration files (`package.json`, `tsconfig.json`, etc.)
- ✅ Nx project files (`project.json`)
- ✅ Biome, ESLint configuration files, etc.

And intelligently excludes:

- ❌ `node_modules/`
- ❌ `dist/`
- ❌ `.nx/`
- ❌ `.git/`
- ❌ `coverage/`
- ❌ `tmp/`
- ❌ Lock files (`*.lockb`)

## 🛠️ Customization

The script can be modified in `scripts/sort-json-files.ts` to:

- Add/remove excluded folders
- Modify output format (spacing, etc.)
- Add additional validations
- Integrate with other tools

## 📊 Example Output

```
🚀 Starting JSON files sorting...

📁 Scanning: /Users/username/project
  ✅ Sorted: /Users/username/project/package.json
  ✅ Sorted: /Users/username/project/tsconfig.base.json
  📁 Scanning: /Users/username/project/apps
    ✅ Sorted: /Users/username/project/apps/my-app/project.json
    ➡️  Already sorted: /Users/username/project/apps/my-app/tsconfig.json

🎉 JSON sorting completed in 52ms
```

This solution offers a perfect balance between ease of use and processing power to maintain well-organized JSON files in your VS Code workspace.