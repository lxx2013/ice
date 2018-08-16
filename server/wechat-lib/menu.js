export default {
  button: [{
    'name': '权游周边',
    'sub_button': [{
      'name': '最新种子',
      'type': 'click',
      'key': '11'
    }, {
      'name': '手办商城',
      'type': 'view',
      'url':'https://setsuna.wang'
    }]
  },{
    'name': '功能选项',
    'sub_button': [{
      'name': '定位',
      'type': 'location_select',
      'key': 'location'
    }, {
      'name': '扫码显示&传值',
      'type': 'scancode_push',
      'key':'scancode_push'
    },{
      'name': '扫码传值等待',
      'type': 'scancode_waitmsg',
      'key':'scancode_waitmsg'
    }]
  }, {
    'name': 'Test',
    'sub_button': [{
      'name': 'fetchUserList',
      'type': 'click',
      'key': '31'
    }, {
      'name': 'Menu',
      'type': 'click',
      'key': '32'
    }, {
      'name': 'deleteMenu',
      'type': 'click',
      'key': '33'
    }, {
      'name': 'createMenu',
      'type': 'click',
      'key': '34'
    }]
  }]
}
