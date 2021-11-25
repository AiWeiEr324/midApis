/**
 * 异常数据模型
 *
 * @param {string} project - 错误所在项目
 * @param {string} pageUrl - 错误聚合页面地址
 * @param {string} realUrl - 错误真实地址
 * @param {string} [resourceUrl] - 错误资源地址
 * @param {string} category - 错误类型jsError, resourceError, ajaxError
 * @param {string} sec_category - 错误名称，用户错误聚合
 * @param {string} level - 错误程度, 默认error, 分类info, debug, error, warn
 * @param {string} [content] - 错误详细日志信息
 * @param {Number} [rowNum] - 错误行
 * @param {Number} [colNum] - 错误列
 * @param {Number} timestamp - 时间戳
 * @param {string} unionId - unionId
 * @param {Object} [tags] - 其他用户自定义信息
 */