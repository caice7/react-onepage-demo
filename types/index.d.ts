import type { SelectProps, UploadProps } from 'antd';
import type { ProFieldValueType } from '@ant-design/pro-utils/lib/typing';

/**
 * dataIndex: 字段名
 * valueType: 类型，用于详情的显示和Items的编辑判定
 * initialValue: 默认值
 * colSize: 3为编辑时一行的站位，可自定义其他数字
 * sorter: 排序
 * filters: 显示筛选
 * filterSearch: 是否表格上方的显示搜索过滤
 * filterDropdown: 树型筛选
 * render: 自定义格式化
 * renderText: 自定义格式化
 * valueEnum: 枚举值object 用于详情window.enums.enumType
 * 
 * title: 显示名称
 * placeholder: 提示语
 * isRule: 必填
 * rules: 自定义必填规则
 * enumType: 缓存枚举名
 * show：显示另张表
 * fetch: 表格上方的请求方法
 * isSearch: 用于区分是编辑还是表格上方的组件，编辑时默认不显示placeholder
 * initSearch: 用于层级组件的再次初始化，为了初始化二三级
 * selectProps: 编辑时Select的配置项 {
    showSearch: 是否显示搜索框
    mode: 多选模式 multiple
    request: 异步请求数据
    allowClear: 不能清空 false
 * }
    picNum,setPicNum 用于多张图片定位的参数
    UploadProps: 编辑时上传的配置项 {
      multiple: 是否多选 true
      name: 接口模块传参
    }
  */

import { ProColumns, ProDescriptionsItemProps } from "@ant-design/pro-components";
import { Rule } from "antd/es/form";

export type TColumn = Omit<ProColumns & ProDescriptionsItemProps, 'dataIndex'> & {
  dataIndex: string,
  title?: string,
  placeholder?: string,
  valueType?: ProFieldValueType,
  isRule?: boolean,
  rules?: Rule[],
  enumType?: string,
  show?: string,
  fetch?: (v?: string) => Promise<ListResult>,
  keyValue?: [string, string],
  isSearch?: boolean,
  initSearch?: number,
  selectProps?: SelectProps & { request?: (q: string) => Promise<any[]> },
  picNum?: number,
  setPicNum?: React.Dispatch<React.SetStateAction<number>>,
  uploadProps?: UploadProps,
}

// 接口通用返回格式
export type JResponse<T extends any = any> = {
  code: number,
  msg: string,
  data: T
}

// 表格组件的返回
export type PageParams = {
  pageIndex?: number;
  pageSize?: number;
};

// 表格接口返回
export type TableList<T> = JResponse<{
  pageable: {
    pageSize: number,
    pageIndex: number,
    sortField: string,
    orderBy: string,
    pageCount: number,
    recordCount: number,
  },
  list: T[],
}>

// 导出搜索传参
export type NameValue = {
  name: string,
  value: string,
}