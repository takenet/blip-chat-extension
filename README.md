# Running

* `npm install`
* `npm start`
* Project will be running on `http://localhost:3002`

# WebView
Control BLiP Chat's webview from your web page.
You may need to have some control over BLiP Chat's webview once you have added it to your web page. This script extension allows you to that.

## Usage
### NPM
Simply install the blip-chat-extension package from the npm registry.
```
$ npm install blip-chat-extension
```

Now you just have to import the package and use it:

```js
var blipCards = require("blip-chat-extension");
  (function () {
    window.onload = function () {
      var WebView = new BlipChatExtension()
    }
  })();
```
### Script Import
To import the script just copy and paste the following code:
```js
<script src="https://unpkg.com/blip-chat-extension@1.0.0" type="text/javascript">
</script>
<script>
    (function () {
        window.onload = function () {
          var WebView = new BlipChatExtension()
        }
    })();
</script>
```
You should create an instance of  `BlipChatExtension` and operate on it.

## Closing the WebView
You may need to close BLiP Chat's webview after an event or transaction has finished. To close the webview use the method `closeWebView` from the instanced object.
```js
var WebView = new BlipChatExtension()
WebView.closeWebView()
```

## Sending a message to the chatbot
If the chatbot's conversation state has stopped and you need to update that state (after some interaction with your web page, for example) use the method `sendMessage` to send a message to the chatbot.
```js
var WebView = new BlipChatExtension()
// Sending a simple text message
WebView.sendMessage("My simple text message")
```

If you need to send a complex message, you can send an object with the properties `payload` and `preview`. They are used to specify what is sent to chatbot and what is shown to user respectively.

### Examples
Should you need to send your location to the chatbot but only a simple text like `I'm here` is to be shown to the user, you can do it as follows:
```js
var WebView = new BlipChatExtension()
// Sending Location card to chatbot and showing a text message to user
WebView.sendMessage({
  "payload": {
    "type": "application/vnd.lime.location+json",
    "content": {
      "latitude": -19.918899,
      "longitude": -43.959275,
      "altitude": 853,
      "text": "Take's place"
    }
  },
  "preview": {
    "type": "text/plain",
    "content": "Im here"
  }
})
```

Or maybe you have some content to be trafficked that the user should not see. For that you should send the object keeping the `payload` but omitting the `preview` property.
```js
var WebView = new BlipChatExtension()
// Sending a message to the chatbot that the user will not see it's content
WebView.sendMessage({
  "payload": {
    "type": "text/plain",
    "content": "Hidden content"
  }
})
```
## Override Webview's Close Method
With the method `overrideOnClose` you can, for example, guarantee that a form is submitted before the user closes the webview. The function to be executed when the user tries to close the webview is passed as a parameter to the method:

```js
var WebView = new BlipChatExtension()
WebView.overrideOnClose(() => {
  alert('Please complete the form before leaving')
  return false // Prevent webview from closing
})
```
The `overrideOnClose` method has a return that determines whether the webview should be closed or not . By returning `true` the webview's closing method will proceed normally and by returning `false` it will be blocked.
```js
var WebView = new BlipChatExtension()
WebView.overrideOnClose(() => {
  WebView.sendMessage('Webview will close')
  return true // Webview will close
})
```

# Methods

| Methods           | Description                               | Parameters                             |
| ----------------- | ----------------------------------------- | -------------------------------------- |
| closeWebView      | Close the webview                         | None                                   |
| sendMessage       | Send a message to bot in name of the user | string or { preview: {}, payload: {} } |
| overrideOnClose   | Override webview's default close function | function                               |
