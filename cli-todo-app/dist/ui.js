'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ink_1 = require("ink");
const H1 = ({ children }) => {
    return react_1.default.createElement(ink_1.Text, { bold: true, backgroundColor: "green", color: "gray" },
        "     ",
        children,
        "     ");
};
const NewItemInput = ({ handleNewItem }) => {
    const [newItemText, setNewItemText] = react_1.default.useState('');
    (0, ink_1.useInput)((input, key) => {
        if (key.delete) {
            setNewItemText(newItemText.slice(0, newItemText.length - 1));
        }
        else if (key.return) {
            handleNewItem(newItemText);
        }
        else if (input.length) {
            setNewItemText(newItemText + input);
        }
    });
    return react_1.default.createElement(ink_1.Text, null,
        "Enter a new Item: ",
        newItemText);
};
const MainMenu = () => {
    const [todoItems, setTodoItems] = react_1.default.useState([]);
    const [selectedMenuIndex, setSelectedMenuIndex] = react_1.default.useState(0);
    const [showNewItemInput, setShowNewItemInput] = react_1.default.useState(false);
    const handleNewItem = (newItem) => {
        setTodoItems([...todoItems, newItem]);
        setShowNewItemInput(false);
    };
    const menuItems = todoItems.length + 1; // Accounting for add new item
    (0, ink_1.useInput)((_input, key) => {
        if (key.downArrow && selectedMenuIndex < menuItems - 1) {
            setSelectedMenuIndex(selectedMenuIndex + 1);
        }
        else if (key.upArrow && selectedMenuIndex > 0) {
            setSelectedMenuIndex(selectedMenuIndex - 1);
        }
        else if (key.return && selectedMenuIndex === menuItems - 1) {
            setShowNewItemInput(true);
        }
        else if (key.escape) {
            setShowNewItemInput(false);
        }
    });
    return react_1.default.createElement(ink_1.Box, { flexDirection: 'column', padding: 1, borderColor: "green" },
        react_1.default.createElement(H1, null, "What would you like todo?"),
        react_1.default.createElement(ink_1.Newline, null),
        todoItems.map((item, index) => {
            return react_1.default.createElement(ink_1.Text, { key: index, color: selectedMenuIndex === index ? "green" : "white" }, item);
        }),
        react_1.default.createElement(ink_1.Text, { key: 'additem', color: selectedMenuIndex === todoItems.length ? "green" : "white" }, "Add Item"),
        showNewItemInput ? react_1.default.createElement(NewItemInput, { handleNewItem: handleNewItem }) : null,
        react_1.default.createElement(ink_1.Newline, null));
};
const TodoApp = () => {
    return react_1.default.createElement(MainMenu, null);
};
exports.default = TodoApp;
