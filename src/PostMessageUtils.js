export class PostMessageUtils {
  static sendPostMessage(message) {
    const parentDomain = window.location.ancestorOrigins ? window.location.ancestorOrigins[0] : 'https://chat.blip.ai'
    window.parent.postMessage(message, parentDomain)
  }
}
