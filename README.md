![npm bundle size](https://img.shields.io/bundlephobia/min/super-simple-ui-components) ![npm](https://img.shields.io/npm/v/super-simple-ui-components) ![NPM](https://img.shields.io/npm/l/super-simple-ui-components)

# Super Simple UI Components

A ridiculously simple, tree shakeable, dependency free, vanilla javascript UI component package, that is also ARIA compliant. Components include: Accordion, Popup, Tabs, Toast, and Tooltip.

## Getting Started

### Install using a package manager

Install the package as a dependency in your project.

```bash
npm install super-simple-ui-components
```

In your Javascript file import the css and any components you will need from the package.

```js
import 'super-simple-ui-components/lib/bundle.min.css';
import { Accordion } from 'super-simple-ui-components';

const accordion = new Accordion('#accordion');
accordion.init();
```

### Install using &lt;script> tag / CDN

To use the package in the browser via script tag, you can download the minified script through GitHub or use the CDN.

```html
<!-- In your project <head> -->
<link href="https://unpkg.com/super-simple-ui-components@2.0.1/lib/bundle.min.css" rel="stylesheet" />
<script src="https://unpkg.com/super-simple-ui-components@2.0.1/lib/bundle.umd.min.js"></script>

<!-- In your Javascript -->
<script>
  const { Accordion } = sui;
  const accordion = new Accordion('#accordion');
  accordion.init();
</script>
```

## Documentation

The library is minimally styled and limited in options. Below is the required HTML markup and Javascript needed to use each component. To alter the appearance, override the CSS with your own classes.

### Accordion

#### Markup

A wrapper ID is required for the constructor. For every tab/panel combination you need a `tab` and `panel` class.

```html
<div id="accordion">
  <div class="tab">Tab 1</div>
  <div class="panel">Tab 1 Content</div>
  <div class="tab">Tab 2</div>
  <div class="panel">Tab 2 Content</div>
  <div class="tab">Tab 3</div>
  <div class="panel">Tab 3 Content</div>
</div>
```

```js
const accordion = new Accordion('#accordion');
accordion.init();
```

See it in action on [Codesandbox](https://codesandbox.io/s/accordion-p6xfdk).

### Popup

#### Markup

The `popup-wrapper` and `popup` HTML markup and IDs are required. Popup is displayed and hidden with calls to `popup.show()` and `popup.hide()` in your code.

```html
<div id="popup-wrapper">
  <div id="popup">
    <button type="button" onclick="popup.hide()" id="popup-close">hide popup</button>
    <div>popup content</div>
  </div>
</div>
<button type="button" onclick="popup.show()">show popup</button>
```

#### Javascript

The available options:

```js
const options = {
  maxWidth: '600px',
  opacity: '0.85',
};

const popup = new Popup((options = {})); // empty options object is required
popup.init();
```

See it in action on [Codesandbox](https://codesandbox.io/s/popup-5j2547).

### Toast

#### Markup

Toast is programatically displayed by calling `toast.show()` in your code.

```html
<button onclick="toast.show()">Show toast</button>
```

#### Javascript

Options for position include: `top center`, `top left`, `top right`, and `bottom center`, `bottom left`, `bottom right`. The available options for style are: `alert`, `success`, `warn` and `info`.

```js
const message = 'Download Simple UI Kit as package on NPM!';

const options = {
  style: 'success',
  position: 'top center',
  timeout: 4000,
};

const toast = new Toast(message, options);
toast.init();
```

See it in action on [Codesandbox](https://codesandbox.io/s/toast-8c4lmq).

### Tooltip

#### Markup

The `tooltip` class and `data-message` attribute are required.

```html
<span class="tooltip" data-message="This is a tooltip!">What's a tooltip?</span>
```

#### Javascript

There is only one option for the tooltip and that is position. Values for position include: `top`, `bottom`, `left` and `right`.

```js
const tooltip = new Tooltip('.tooltip', 'right');
tooltip.init();
```

See it action on [Codesandbox](https://codesandbox.io/s/tooltip-fypjwy)

### Tabs

#### Markup

A wrapper ID is required for the constructor. You must wrap your tabs and panels in a div with the classes `tabs` and `panels` respectively.

```html
<div id="tabs">
  <div class="tabs">
    <div>Tab 1</div>
    <div>Tab 3</div>
    <div>Tab 2</div>
  </div>
  <div class="panels">
    <div>Tab 1 Content</div>
    <div>Tab 2 Content</div>
    <div>Tab 3 Content</div>
  </div>
</div>
```

#### Javascript

```js
const tabs = new Tabs('#tabs');
tabs.init();
```

See it in action on [Codesandbox](https://codesandbox.io/s/tabs-ytdnxd).
