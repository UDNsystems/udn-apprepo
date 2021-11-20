let args = termAPI.getArguments(line);
const helpduck = "wget -h | wget --help: shows a list how to wget\r\nwget <url> [-O filename]: fetches file, OPTIONAL stores file with given filename.\r\n"
function doduck(){
  var failed = false;
  var data = null;
  fetch(args[0]).then((res)=>res.text()).then((duc)=>{data = duc}).catch(()=>{failed = true})
  if(failed){
    termAPI.write("sad sus fail")
    return
  }
  if(args[1] && args[2]){
    if(args[1] == "-o"){
      let folder = termAPI.getDirectory()
      let filepath = termAPI.resolvePath(folder, args[2])
      termAPI.OSComms.setStorageKey(filepath, data)
    } else{
      termAPI.write("you ducked out!")
    }
  } else{
    let folder = termAPI.getDirectory()
    let dck = args[0].split("/")[args[0].split("/").length-1]
    let filepath = folder + dck
    if(filepath == "/"){
      filepath = folder + "DUCKSUS"
    }
    termAPI.write(String(data))
    termAPI.OSComms.setStorageKey(filepath, data)
  }
}
if(args[0]){
  switch(args[0]){
    case "-h":
      termAPI.write(helpduck)
      break
    case "--help":
      termAPI.write(helpduck)
      break
    default:
      doduck()
      break   
  }
} else{
  termAPI.write(helpduck)
}