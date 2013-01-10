# Marquee

This implementation of marquee is used with elements rather than text. It allows infinite biderectional loop of elements scrolling horizontally. This implemention utilises CSS3 transitions and downgrades to manipulating parent element scroll overflow for browsers that don's implement transitions. Tested on gte IE7.

I got the idea to downgrade to scroll transition from Remy Sharp implementation of [text marquee](http://remysharp.com/2008/09/10/the-silky-smooth-marquee/).

## Demo

The [demo](https://dev.anuary.com/60244f3a-b8b2-5678-bce5-f7e8742f0c69/) will give an idea of the required styling and DOM structure.

## License & Notes

The BSD License - Copyright (c) 2013 Gajus Kuizinas.