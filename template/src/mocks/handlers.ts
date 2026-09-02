import { http, HttpResponse } from 'msw'

/**
 * 接口 Mock 处理器示例。返回结构与 src/utils/request.ts 的 ApiResult 对齐。
 * 新增接口在此数组追加即可。
 */
export const handlers = [
  http.get('/api/items', () =>
    HttpResponse.json({
      code: 0,
      message: 'ok',
      data: [
        { id: 1, title: '示例数据 A', status: 'published' },
        { id: 2, title: '示例数据 B', status: 'draft' },
      ],
    }),
  ),
]
