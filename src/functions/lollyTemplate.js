
module.exports = (data) => `
<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/css/styles.css">
    <style>
      .lollyTop {
        fill: ${data.flavourTop};
      }
      .lollyMiddle {
        fill: ${data.flavourMiddle};
      }
      .lollyBottom {
        fill: ${data.flavourBottom};
      }
    </style>
    <title>Virtual ${data.localize.Lollipops} for all!</title>
  </head>
  <body>
    <div class="container">
      <header>
        <h1 class="title">
          <a href="/">virtual ${data.localize.lollipop}</a>
        </h1>
        <p class="subtitle">because we all know someone<br>who deserves some sugar.</p>
      </header>
      <div class="lolly">
        <div class="giftLolly">
          <?xml version="1.0" encoding="UTF-8"?>
          <svg class="lollipop" width="163px" height="431px" viewBox="0 0 163 431" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
              <path d="M50.5845697,1.80919445e-14 L112.757384,3.19744231e-14 C129.058949,2.89798741e-14 142.575449,12.6254516 143.685437,28.8891833 L162.453983,303.889183 C163.619754,320.970275 150.717838,335.762281 133.636746,336.928053 C132.934162,336.976004 132.230148,337 131.52593,337 L31,337 C13.8791728,337 -1.56668718e-14,323.120827 -1.77635684e-14,306 C-1.78535483e-14,305.265258 0.0261215736,304.530748 0.0783152276,303.797862 L19.662885,28.7978622 C20.8183904,12.5726406 34.3182545,1.0093501e-14 50.5845697,7.10542736e-15 Z" id="path-1"></path>
              <path d="M99,2.88483832e-14 L113,3.19744231e-14 C129.301566,2.89798741e-14 142.818065,12.6254516 143.928053,28.8891833 L162.696599,303.889183 C163.862371,320.970275 150.960455,335.762281 133.879363,336.928053 C133.176779,336.976004 132.472765,337 131.768546,337 L117.768546,337 C118.472765,337 119.176779,336.976004 119.879363,336.928053 C136.960455,335.762281 149.862371,320.970275 148.696599,303.889183 L129.928053,28.8891833 C128.818065,12.6254516 115.301566,2.89798741e-14 99,3.19744231e-14 Z" id="path-3"></path>
            </defs>
            <g id="Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Lolly">
                <g id="handle" transform="translate(65.000000, 137.000000)" fill-rule="nonzero">
                  <rect id="Rectangle" fill="#C06C50" x="0" y="2" width="32" height="292" rx="16"></rect>
                  <rect id="Rectangle" fill="#E3A28D" x="0" y="0" width="32" height="292" rx="16"></rect>
                  <polygon id="Rectangle-Copy-3" fill-opacity="0.181584013" fill="#8C0040" points="0 200 32 200 32 218 0 223.801515"></polygon>
                </g>
                <mask id="mask-2" fill="white">
                  <use xlink:href="#path-1"></use>
                </mask>
                <use class="lollyBottom" fill="#deaa43" fill-rule="nonzero" xlink:href="#path-1"></use>
                <rect class="lollyTop" fill="#d52358" fill-rule="nonzero" mask="url(#mask-2)" x="-25" y="-9" width="224" height="134"></rect>
                <rect class="lollyMiddle" fill="#e95946" fill-rule="nonzero" mask="url(#mask-2)" x="-29" y="113" width="224" height="111"></rect>
                <path d="M79.7697726,3.19744231e-14 C63.468207,2.89798741e-14 49.9517074,12.6254516 48.8417198,28.8891833 L30.0731738,303.889183 C28.9074019,320.970275 41.8093181,335.762281 58.89041,336.928053 C59.5929941,336.976004 60.2970081,337 61.0012266,337 L17,337 C-0.120827245,337 -14,323.120827 -14,306 C-14,305.265258 -13.9738784,304.530748 -13.9216848,303.797862 L5.66288496,28.7978622 C6.81839036,12.5726406 20.3182545,1.0093501e-14 36.5845697,7.10542736e-15 L79.7697726,2.77347066e-14 Z" id="shade" fill="#67000D" fill-rule="nonzero" opacity="0.0961449033" mask="url(#mask-2)"></path>
                <mask id="mask-4" fill="white">
                  <use xlink:href="#path-3"></use>
                </mask>
                <use id="shine" fill="#FFFFFF" fill-rule="nonzero" opacity="0.113420759" xlink:href="#path-3"></use>
                <g id="glint" opacity="0.600144159" transform="translate(130.971719, 34.105410) rotate(-94.000000) translate(-130.971719, -34.105410) translate(118.971719, 32.105410)" fill="#FFFFFF" fill-rule="nonzero">
                  <rect id="Rectangle" x="20" y="4.26325641e-14" width="4" height="4" rx="2"></rect>
                  <rect id="Rectangle-Copy" x="0" y="0" width="18" height="4" rx="2"></rect>
                </g>
                <path d="M97,337 L65,337 L65,155 L65,153 C65,144.163444 72.163444,137 81,137 C89.836556,137 97,144.163444 97,153 L97,155 L97,337 Z" id="frozenhandle" fill="#A7563C" fill-rule="nonzero" opacity="0.0615234375"></path>
              </g>
            </g>
          </svg>
        </div>
        <div class="info">
          <p class="share">Your ${data.localize.lolly} is freezing. Share it with this link: <pre>https://vlolly.net/${data.localize.lolly}/${data.lollyPath}</pre></p>
          <div class="details">
            <p id="recipient" class="recipient">${data.recipientName}</p>
            <div id="message" class="message">${data.message}</div>
            <p id="from" class="from">— ${data.sendersName}</p>
          </div>
          <p class="bytheway">${data.sendersName} made this virtual ${data.localize.lollipop} for you. You can <a href="/create">make your own</a> to send to a friend who deserve some sugary treat which won't rot their teeth...</p>
        </div>
      </div>
      <footer>
        <p>
          Built and hosted with <a href="https://netlify.com?utm_source=vlolly&utm_medium=staticfirst-pnh&utm_campaign=devex">Netlify</a> by <a href="https://twitter.com/philhawksworth">Phil Hawksworth</a>
        </p>
        <p>
          Read about how and why <a href="https://css-tricks.com/static-first-pre-generated-jamstack-sites-with-serverless-rendering-as-a-fallback/">on CSS-Tricks</a>.
        </p>
      </footer>
    </div>
  </body>
</html>`;
