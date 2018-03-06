# Running

* `npm install`
* `npm start`
* Project will be running on `http://localhost:3002`

# WebView
BLiP allows you to open a web page inside BLiPChat. Once that happens you may want to have some control over what happens on the chat from inside the webview. This is possible with this extension script.

## Using
To use the extension script you should import the script as bellow and create a instance of  `BlipChatWebView`:
```js
<script src="https://unpkg.com/blip-chat-widget" type="text/javascript">
</script>
<script>
    (function () {
        window.onload = function () {
          var WebView = new BlipChatWebView()
        }
    })();
</script>
```

## Close the WebView
Sometimes its needed to close the Webview after an event or a transaction is finished. To close the Webview just call the method `closeWebView` from your object.
```js
var WebView = new BlipChatWebView()
WebView.closeWebView()
```

## Send message to bot
Maybe after some interacion with the page, you want to update the state where the conversation with the bot stopped. The method `sendMessage` is user to send a message to the bot.
```js
var WebView = new BlipChatWebView()
// Sending a simple text message
WebView.sendMessage("My simple text message")
```

If you want to send a complex message, you cand send an object with the properties `payload` and `preview`. They are user to specify what is sent to bot and what is shown to user respectively.

Lets say you want to send your location to bot, but just want to show a simple text like `I'm here` to the user.
```js
var WebView = new BlipChatWebView()
// Sending Location card to bot, and showing a text message to user
WebView.sendMessage({
  "payload": {
    "content": {
      "latitude": -19.918899,
      "longitude": -43.959275,
      "altitude": 853,
      "text": "Take's place"
    },
    "type": "application/vnd.lime.location+json"
  },
  "preview": {
    "type": "text/plain",
    "content": "Im here"
  }
})
```

Now you want to traffic some sensitive content that the user should no see. For that you just have to omit the `preview`.
```js
var WebView = new BlipChatWebView()
// Sending a message that the user will not see
WebView.sendMessage({
  "payload": {
    "content": "Sensitive content",
    "type": "text/plain"
  }
})
```
## Override Webview Close
Lets say that before the user leave your page you want to garantee a form is submited. For that u can use the method `overrideOnClose`. It takes a parameter that is a function that will be executed when the user tries to close the webview.

```js
var WebView = new BlipChatWebView()
WebView.overrideOnClose(() => {
  alert('Please complete the form before leaving')
  return false // Prevent the webview to close
})
```
The return of the function will be use to determine if the webview can be closed or not. Returning `true` would allow it to close and returning `false` would block it.
```js
var WebView = new BlipChatWebView()
WebView.overrideOnClose(() => {
  WebView.sendMessage('Webview will close')
  return true // Webview will close after this method
})
```

# Methods

| Methods           | Description                               | Parameters                             |
| ----------------- | ----------------                          | -------------------------------------- |
| closeWebView      | Close the webview                         | None                                   |
| sendMessage       | Send a message to bot in name of the user | string or { preview: {}, payload: {} } |
| overrideOnClose   | Override default close function           | function                               |