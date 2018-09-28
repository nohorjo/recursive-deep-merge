# Recursively merge objects and arrays

## Usage
```javascript
const merge = require('recursive-deep-merge');

const a = {
    a: 1,
    b: {
        c: 2,
        d: 4
    },
    e: [
        5,
        {
            f: 6,
            g: 7
        }
    ]
};

const b = {
    a: 9,
    b: {
        c: 8
    },
    e: [
        7,
        {
            f: 5
        }
    ]
};

const merged = merge(a, b);

// merged:
// {
//     a: 9,
//     b: {
//         c: 8,
//         d: 4
//     },
//     e: [
//         7,
//         {
//             f: 5,
//             g: 7
//         }
//     ]
// }

```
