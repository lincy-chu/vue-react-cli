// http.js 专门处理模板和版本信息的获取

const axios = require('axios')

axios.interceptors.response.use(res => res.data)

/**
 * 获取模板列表
 * @returns {Promise}
 */
const getRepoList = async () => axios.get('https://api.github.com/orgs/zhurong-cli/repos')

/**
 * 获取版本列表
 * @param repo
 * @returns {Promise}
 */
const getTagList = async (repo) => axios.get(`https://api.github.com/repos/zhurong-cli/${repo}/tags`)

module.exports = {
    getRepoList,
    getTagList
}
