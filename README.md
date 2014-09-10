# sequentialLoad Plugin for jQuery

Load images sequentially as they appear in your HTML, intesad of simoultaneously (using paralel connections) as browsers do. Useful to present the first part of a website quickly while the rest loads.

## Usage

Include jQuery and sequentialLoad in your code: 

```html
<script src="jquery.js" type="text/javascript"></script>
<script src="jquery.sequentialLoad.js" type="text/javascript"></script>
```

Initialize the plugin:

```javascript
$('img, div').sequentialLoad();
```

Images to be loaded by this plugin are to be includded like this (I recommend to include the size attributes so browsers can render easily): 

```html
<img src="{a default image like a spinner or a gray pixel}" data-src="img/example.jpg" width="960" height="480">
```

It also works with non `<img>` tags using the `background-image` CSS property.

```html
<div src="{a default image like a spinner or a gray pixel}" data-src="img/example.jpg" style="width:960px height:480px">
```
