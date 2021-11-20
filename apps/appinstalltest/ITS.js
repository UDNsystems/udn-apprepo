//eval(localStorage.getItem('/pkg/appinstalltest/execPy.js'));
let print = await termAPI.loadModule('libprint')

var code = `
def ITS(ev):
  Win(\"pog",\"this is very pog\",200,200)
registerApp(
  App(
    \"ITS app\",
    \"default.jpg\",
    ITS
  )
)
reloadApps()
reloadApps()`
top.postMessage({
  event: "execpy",
  code: code
}, "*");

print("installed da app!")