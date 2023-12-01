const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;



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




const MarkdownIt  = require('markdown-it');
// Standardemojis :kiss: :D :) :* :heart: .....
const emoji       = require('markdown-it-emoji');

const md          = new MarkdownIt();
      md.use(emoji);
      md.use(customEmojiPlugin);















app.use(express.static('public'));


app.get('/', (req, res) => {

  const filePath = './file.txt';


  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Fehler beim Lesen der Datei');
      return;
    }

    const rendered = md.render(data);

    res.send(`<html><body>${rendered}</body></html>`);

  });

});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
