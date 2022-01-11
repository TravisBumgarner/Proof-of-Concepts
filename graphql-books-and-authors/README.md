# Resources

https://www.youtube.com/watch?v=ZQL7tL2S0oQ
https://github.com/WebDevSimplified/Learn-GraphQLc

# Setup

1. `npm install`
2. `npm run sd:be`
3. Navigate to localhost: 5000
4. Try a sample query such as:

```
{
  authors{
    name,
    books {
      name
    }
  }
}
```

```
{
  books (ids: [1]) {
    name,
    author {
      name
    }
  }
}
```