# markdown-it-custom-emojis
Plugin function for custom emojis markdown-it.



Default emojis eg are handled by 

```javascript
const MarkdownIt  	= require('markdown-it');

const emoji       	= require('markdown-it-emoji');

const 	md   		= new MarkdownIt();
md.use(emoji);
```

`:heart:` -> :heart:

`:kiss:` -> :kiss:

`:D` ​ ​-​>​ :smile:



Custom emojis are handled by plugin function:

`:win:`

`<span class="custom-emoji"><img style="height: 1.2em; vertical-align: text-top;" src="/images/emojis/win.gif" alt="emoji_win"></span>`

`:heh:`

`<span class="custom-emoji"><img style="height: 1.2em; vertical-align: text-top;" src="/images/emojis/heh.png" alt="emoji_heh"></span>`



```javascript
const MarkdownIt  	= require('markdown-it');

const emoji       	= require('markdown-it-emoji');

const 	md   		= new MarkdownIt();
md.use(emoji);
md.use(customEmojiPlugin);
```



```javascript
function customEmojiPlugin(md, options) {
  const defaultOptions = {

    customEmojiBaseUrl: "/images/emojis/",

    customEmojis: {
      "CoolStoryBob": "CoolStoryBob.png",
      "catjam": "catjam.gif",
      "heh": "heh.png",
      "gamecube": "gamecube.png",
      "painbrain":"painbrain.png",
      "win": "win.gif",
    }
    
  };

  const opts = Object.assign({}, defaultOptions, options);

  const defaultRender = md.renderer.rules.text || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.text = function(tokens, idx, options, env, self) {
    let text = tokens[idx].content;

    let hasCustomEmoji = false;
    text = text.replace(/:([a-zA-Z0-9_]+):/g, function(match, p1) {
      if (opts.customEmojis.hasOwnProperty(p1)) {
        hasCustomEmoji = true;
        return `<span class='custom-emoji'><img style="height: 1.2em; vertical-align: text-top;" src='${opts.customEmojiBaseUrl + opts.customEmojis[p1]}' alt='emoji_${p1}'></span>`;
      }
      return match;
    });

    if (hasCustomEmoji) {
      return text;
    } else {
      return defaultRender(tokens, idx, options, env, self);
    }
  };
}
```

