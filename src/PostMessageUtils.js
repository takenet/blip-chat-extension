export class PostMessageUtils {
  static sendPostMessage(message) {
    const parentDomain = window.location.ancestorOrigins[0]

    window.parent.postMessage(message, parentDomain)
  }
}
