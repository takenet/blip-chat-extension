import { PostMessageUtils } from './PostMessageUtils'

export class BlipChatExtension {
  constructor() {
    this.onClose = () => true
    // Add event to listen to postMessages
    window.addEventListener('message', (event) =>
      this.onReceivePostMessage(event)
    )
  }

  closeWebView() {
    PostMessageUtils.sendPostMessage({ code: 'closeWebView' })
  }

  sendMessage(userMessage) {
    let content
    if (typeof userMessage === 'object') {
      content = {
        content: userMessage.payload.content,
        type: userMessage.payload.type
      }
      if (userMessage.preview) {
        content.metadata = {
          '#blip.payload.content':
            typeof userMessage.preview.content === 'string'
              ? userMessage.preview.content
              : JSON.stringify(userMessage.preview.content),
          '#blip.payload.type': userMessage.preview.type
        }
      } else {
        content.metadata = {
          '#blip.hiddenMessage': true
        }
      }
    } else {
      content = userMessage
    }

    PostMessageUtils.sendPostMessage({ code: 'SendMessage', content })
  }

  overrideOnClose(func) {
    PostMessageUtils.sendPostMessage({ code: 'overrideCloseWebView' })
    this.onClose = func
  }

  onReceivePostMessage(event) {
    switch (event.data.code) {
      case 'closeWebView':
        if (this.onClose()) {
          this.closeWebView()
        }
        break
    }
  }
}
