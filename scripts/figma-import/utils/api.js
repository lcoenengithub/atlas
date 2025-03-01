const config = require('../figma-import.config')

const api = require('axios')

const headers = {
  'X-FIGMA-TOKEN': config.FIGMA_TOKEN,
}

/**
 * api endpoint for files
 *
 */
const instanceFiles = api.create({
  baseURL: `https://api.figma.com/v1/files/${config.FILE_KEY}`,
  headers,
})

/**
 * api endpoint for images
 *
 */
const instanceImages = api.create({
  baseURL: `https://api.figma.com/v1/images/${config.FILE_KEY}`,
  headers,
})

/**
 * get Figma document info
 *
 * @return {Promise<Object>}
 */
const getDocument = async () => instanceFiles.get('/')

/**
 * get Figma node info
 *
 * @param {string} nodeId
 * @return {Promise<Object>}
 */
const getNode = async (nodeId) => instanceFiles.get(`/nodes?ids=${decodeURIComponent(nodeId)}`)

/**
 * get Figma node children
 *
 * @param {string} nodeId
 * @return {Promise<[Object]>}
 */
const getNodeChildren = async (nodeId) => {
  const {
    data: { nodes },
  } = await instanceFiles.get(`/nodes?ids=${decodeURIComponent(nodeId)}`)
  return nodes[nodeId].document.children
}

/**
 * get Svg image resource url
 *
 * @param {string} nodeId
 * @return {Promise<string>}
 */
const getSvgImageUrl = async (nodeId) => {
  const {
    data: { images },
  } = await instanceImages.get(`/?ids=${decodeURIComponent(nodeId)}&format=svg`)
  return images[nodeId]
}

/**
 * get image content
 *
 * @param {string} url - image url
 * @return {Promise<Object>}
 */
const getImageContent = async (url) => api.get(url)

module.exports = {
  getDocument,
  getNode,
  getNodeChildren,
  getSvgImageUrl,
  getImageContent,
}
