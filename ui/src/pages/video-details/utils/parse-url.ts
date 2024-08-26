/**
 * Parse youtube URLs to handle multiple linkoptions edge cases.
 * Not using JSX to sanitize the link later in the component,
 * to ensure it's safe from XSS
 * @param url video URL
 * @returns HTML strings of iframe + URL or URL
 */
export const parseVideoUrl = (url: string): string => {
    // youtube links can be either:
    // youtube.com - copy-pasted from browser
    // or youtu.be - from 'share' button
    if (!['youtube', 'youtu.be'].some((y) => url?.includes(y))) {
      const createLink = (link: string) => {
        try {
          return new URL(link).href
        } catch (error) {
          // ensures new url routes to a new page instead of a relative route
          return `http://${encodeURI(link)}`
        }
      }
      const link = createLink(url)
      return `<a href='${link}' target='_blank' rel='noreferrer'>
            ${link}
          </a>`
    }
  
    try {
      const getVideoId = (videoUrl: string) => {
        const youtubeUrl = new URL(videoUrl)
        if (videoUrl.includes('youtu.be')) {
          const [_, id] = youtubeUrl.pathname.split('/')
          return id
        }
        if (youtubeUrl.pathname.includes('/embed/')) {
          return youtubeUrl.pathname.split('/embed/')[1]
        }
        const [_, id] = youtubeUrl.search.split('=')
        if (!id) throw Error('No youtube video id found')
        // if video url has more then the id as a parameter
        return id.length > 11 ? id.substring(0, 11) : id
      }
      const videoId = getVideoId(url)
  
      const videoIframeLink = videoId
        ? `https://www.youtube.com/embed/${videoId}?rel=0`
        : null
  
      const hrefLink = videoId
        ? `https://www.youtube.com/watch?v=${videoId}`
        : null
  
      return videoIframeLink
        ? `
          <iframe
            width='560'
            height='315'
            src='${videoIframeLink}'
            title='YouTube video player'
            frameBorder='0'
            referrerPolicy='origin-when-cross-origin'
            allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;'
            allowFullScreen='true'
          ></iframe>
        `
        : `
          <a
          href='${hrefLink}'
          target='_blank'
          rel='noreferrer'
        >
          ${hrefLink}
        </a>
      `
    } catch (error) {
      console.error(error)
      return `<p>Unable to parse URL</p>`
    }
  }
  