export class PostMessageUtils {
  static sendPostMessage(message) {
    const parentDomain = window.location.ancestorOrigins[0]
    console.log('parentDomain', parentDomain, 'message', message)
    console.log('Window parent', window.parent)

    window.parent.postMessage(message, parentDomain)
  }
}
