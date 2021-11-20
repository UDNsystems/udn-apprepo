def testApp(ev):
  Win("Test App", "it works!", 200, 200) # Press F1, type "Register Application" and press enter to register the app
registerApp(
  App(
    "test",
    "default.jpg",
    testApp
  )
)
# you can also use Ctrl+I (or F1 and "Execute code")to run the code normally
#setupApps()
