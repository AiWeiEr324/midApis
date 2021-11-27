import { IReporter, CategoryType, LevelType } from '../interface'
import { ERROR, JS_ERROR } from './constant'
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

export default class ReporterModel implements IReporter {
  project!: string
  pageUrl!: string
  realUrl!: string
  resourceUrl?: string
  category!: CategoryType
  sec_category!: string
  level!: LevelType
  content?: string
  rowNum?: number
  colNum?: number
  timestamp!: number
  unionId!: string
  tags?: Record<string, any>
  constructor(obj?: IReporter) {
    this.init(obj)
  }
  init(obj?: IReporter) {
    const {
      project,
      pageUrl,
      realUrl,
      resourceUrl,
      category,
      sec_category,
      level,
      content,
      rowNum,
      colNum,
      timestamp,
      unionId,
      tags
    } = obj || {}
    this.project = project || ''
    this.pageUrl = pageUrl || ''
    this.realUrl = realUrl || ''
    this. resourceUrl = resourceUrl || ''
    this.category = category || JS_ERROR
    this.sec_category = sec_category || ''
    this.level = level || ERROR
    this.content = content || ''
    this.rowNum = rowNum || NaN
    this.colNum = colNum || NaN
    this.timestamp = timestamp || NaN
    this.unionId = unionId || ''
    this.tags = tags || {}
  }
}