# livi
Tool for working with bash file for json arrays

```bash
livi --json=test.json --each=test.sh
```

test.json
```json
[
  {
    "lang": "TR"
  },
  {
    "lang": "EN"
  },
  {
    "lang": "FR"
  }
]
```

It is enough to write the keys #item and #item.name to access the array element

test.sh
```bash
echo #item._id.$oid #item.name
```
