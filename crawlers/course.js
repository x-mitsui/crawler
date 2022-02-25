// 全部课程
const crawler = require('../libs/crawler')
const config = require('../config/config')
crawler({
  url: config.crawler.url.course,
  callback() {
    const $ = window.$ //由此可知，这个回调是运行在浏览器环境下的

    const $item = $('.course-card-list-multi-wrap .course-card-item')

    let data = []

    $item.each((index, item) => {
      const $el = $(item)
      const $itemLk = $el.find('.item-img-link')

      data.push({
        cid: $itemLk.attr('data-id'),
        href: $itemLk.prop('href'),
        posterUrl: $itemLk.find('.item-img').prop('src'),
        courseName: $itemLk.find('.item-img').prop('title'),
        price:
          $el.find('.item-price').text() == '免费' ? '0' : $el.find('.item-price').text().slice(1),
        description: $el.find('.item-status-step').text(),
        studentCount: parseInt($el.find('.item-user').text()),

        field: -1, //分类
        posterKey: '',
      })
    })

    return data
  },
})
