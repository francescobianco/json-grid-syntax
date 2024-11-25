# JSON Grid Syntax (JGS)

**JSON Grid Syntax (JGS)** is a lightweight, intuitive syntax designed to transform complex JSON objects into structured, tabular data. It is especially useful for converting JSON API responses or deeply nested objects into row-column grids for easier readability and analysis. 

This project provides a library and documentation to help developers work seamlessly with JSON data using the JGS syntax.

---

## 🚀 Features

- **Intuitive Path Navigation:** Easily traverse JSON objects and arrays using dot (`.`) notation and branching (`>`).
- **Row and Column Extraction:** Define whether data is laid out as rows or columns using `,` (columns) or `;` (rows).
- **Default Values:** Handle missing or null fields gracefully with the `/` operator.
- **Key-Value Expansion:** Extract object keys and values into separate columns using the `#` operator.
- **Multi-path Operations:** Combine extractions from different JSON paths into a single grid.
- **Flexible Output:** Suitable for spreadsheets, database queries, and data reporting tools.

---

## 📖 Syntax Overview

JGS strings describe how JSON data should be navigated and extracted into tabular format. 

### **Basic Syntax**

- **Path Navigation:** Use dot notation to access fields.  
  Example: `field1.field2` extracts the value at `field2` within `field1`.

- **Array Navigation:** Access array elements by index.  
  Example: `items.0.name` retrieves the `name` field from the first item in an array.

- **Branching (`>`):** Move into a deeper JSON branch.  
  Example: `field1.0.field3 > *.name` extracts the `name` field from all objects in a nested array.

---

### **Advanced Syntax**

- **Column Extraction (``,`):** Separate fields into columns.  
  Example: `*.name, *.surname` produces two columns: one for `name` and one for `surname`.

- **Row Extraction (`;`):** Separate fields into rows.  
  Example: `*.name; *.surname` produces rows, one for each field.

- **Default Values (`/`):** Define a fallback for missing values.  
  Example: `field1.field2/default_value`.

- **Key-Value Expansion (`#`):** Extract keys and values into adjacent columns.  
  Example: `config > #` produces two columns: one for keys and another for values.

---

### **Multi-path Extraction**

Combine multiple paths in a single operation:
```text
config > #, meta.author
```
**Result:**
| Config Key | Config Value | Author    |
|------------|--------------|-----------|
| theme      | dark         | John Doe  |
| language   | en           |           |

---

## 📂 Repository Structure

```
.
├── src/                # Source code for JGS implementation
├── examples/           # Example JSON files and JGS usage
├── tests/              # Test cases for syntax validation
├── README.md           # Documentation
└── LICENSE             # Licensing information
```

---

## 📦 Installation

To install the JGS library:

### For JavaScript (Node.js)
```bash
npm install json-grid-syntax
```

---

## 🔧 Usage

### **Example JSON:**
```json
{
  "data": [
    {
      "name": "John",
      "surname": "Doe",
      "info": { "age": 30, "country": "USA" }
    },
    {
      "name": "Alice",
      "surname": "Smith",
      "info": { "age": 25, "country": "UK" }
    }
  ]
}
```

### **JGS String:**
```text
data.*.name, data.*.surname, data.*.info > #
```

### **Result:**
| Name   | Surname | Info Key | Info Value |
|--------|---------|----------|------------|
| John   | Doe     | age      | 30         |
|        |         | country  | USA        |
| Alice  | Smith   | age      | 25         |
|        |         | country  | UK         |

---

## 🛠️ Development

### **Run Tests**
```bash
npm test
```

### **Contribute**
1. Fork the repository.
2. Create a new feature branch.
3. Submit a pull request with a detailed description of changes.

---

## 🤝 Contributing Guidelines

We welcome contributions to improve JGS! Whether it's bug fixes, new features, or better documentation, your input is valued.

- **Bug Reports:** Open an issue describing the bug and provide an example.
- **Feature Requests:** Suggest new functionality or enhancements.
- **Code Contributions:** Follow our code style guide and add appropriate tests.

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

## 🌟 Acknowledgments

JGS was inspired by the need for simplicity in transforming JSON data into spreadsheet-friendly formats. We aim to provide developers with a fast, flexible tool for managing JSON in real-world applications.

---

## 💬 Questions or Feedback?

Feel free to open an issue or reach out to us. Contributions, suggestions, and feedback are always appreciated!
