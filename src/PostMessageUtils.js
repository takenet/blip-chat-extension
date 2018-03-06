export class PostMessageUtils {
  static sendPostMessage(message) {
    const parentDomain = document.referrer
    window.parent.postMessage(message, parentDomain)
  }
}
