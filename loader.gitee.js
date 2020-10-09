//
// scriptable 加载器
// 用于加载远程 scriptable 桌面组件插件
// author@im3x
// 公众号@古人云
//

// 解析 & 替换桌面组件传递过来的参数，比如 welcome@latest:hello
Script.im3x = Script.debug || {
  name: "welcome",
  args: "",
  version: "latest"
}
if (args.widgetParameter) {
  let _args = args.widgetParameter.split(":")
  let _plug = _args[0].split("@")
  if (_plug.length === 2) {
    Script.im3x["version"] = _plug[1]
  } else {
    Script.im3x["version"] = "latest"
  }
  Script.im3x["name"] = _plug[0]
  if (_args.length === 2) Script.im3x["args"] = _args[1]
}
_load()
async function _load () {
  // 加载远程插件代码
  const _REMOTE_CODE_REQ = new Request("https://gitee.com/im3x/Scriptables/raw/main/" + encodeURIComponent(Script.im3x["name"]) + "/" + Script.im3x["version"] + ".js?_=" + (+new Date))
  const _REMOTE_CODE_JS = await _REMOTE_CODE_REQ.loadString()
  // 执行代码
  eval(_REMOTE_CODE_JS)
}
