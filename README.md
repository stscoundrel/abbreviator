# Abbreviator

Wraps searched word with '<abbr>' tags in content. For adding html-friendly info to heavily abbreviated text.

### Install

`yarn add abbreviator`

## Motivation

When working with digital versions of old printed text, one easily runs into heavily abbreviated text. Prime example of this are dictionaries. While it saves space in print, there is little use for it in web.

Should you have list of abbreviations, you can use abbreviator to search/replace them with appropriate html tags.

##### Usage

```javascript
import { abbreviate } from 'abbreviator'

// From Cleasby & Vigfusson dictionary.
const original = 'kunnátta = f. knowledge, Edda (pref.), freq. in mod. usage: as also of knowing by heart';


// Replaces particular abbreviaton.
const result = abbreviate('f.', 'feminine.', original);
console.log(result)
// kunnátta = <abbr title="feminine">f.</abbr> knowledge, Edda (pref.), freq. in mod. usage: as also of knowing by heart'

// Or run through a list of known abbreviations. Structure up to you.
const abbreviations = [
  {
    'abbreviation' => 'f.',
    'explanation' => 'feminine',
  },
  {
    'abbreviation' => 'freq.',
    'explanation' => 'frequent, frequently.',
  },
   {
    'abbreviation' => 'mod.',
    'explanation' => 'modern.',
  },
]

let result = original

abbreviations.forEach( ({abbreviation, explanation}) => {
  result = abbreviate(abbreviation, explanation, content)
})

console.log(result) 
// kunnátta = <abbr title="feminine">f.</abbr> knowledge, Edda (pref.), <abbr title="frequent, frequently.">freq.</abbr> in <abbr title="modern.">mod.</abbr> usage: as also of knowing by heart

```
