UDNT_NUMBERSET = "0123456789"
UDNT_OPERATORCONV = {"+": "UDNT_PLUS", "*": "UDNT_MULT", "/": "UDNT_DIVI", "-": "UDNT_MINU"}
UDNT_NUMBERTOKENS = ("UDNT_NUMBERINT", "UDNT_NUMBERFLT")
class Token:
  def __init__(self, type, value=None):
    self.type = type
    self.value = value
  def __repr__(self):
    if not self.value == None:
      return f"UDNS_TOKEN[{self.type}]:{self.value}"
    else:
      return f"UDNS_TOKEN[{self.type}]"
class ducktreenode:
  def __init__(self, tokun, lnode=None, rnode=None):
    self.tokun = tokun
    self.lnode = lnode
    self.rnode = rnode
  def __repr__(self):
    return f"UDNS_PARSETREENODE[{self.tokun}]({self.lnode},{self.rnode})"
class Parser:
  def __init__(self, tokens):
    self.i = 0
    self.tokens = tokens
    self.currtoken = self.tokens[self.i]
    self.terminated = False
    self.ducktree = None
  def advance(self):
    self.i += 1
    print('pog')
    if self.i == len(self.tokens):
      prnit("not pog")
      self.i = -1
      self.currtoken = None
      self.terminated = True
    else:
      self.currtoken = self.tokens[self.i]
  def parse(self):
    return self.supersmoosher()
  def value(self):
    if self.currtoken.type in UDNT_NUMBERTOKENS:
      duc = self.currtoken.type
      self.advance()
      return ducktreenode(duc)
  def smoosher(self):
    lnode = self.value()
    op = False
    self.advance()
    while self.currtoken in UDNT_OPERATORCONV:
      if self.terminated:
        print("nooo")
        break
      op = self.currtoken
      rnode = self.value()
      lnode = ducktreenode(self.currtoken, lnode, rnode)
      print("pog")
      self.advance()
    if not op:
      return ducktreenode(lnode)
    else:
      return ducktreenode(op, lnode, rnode)
  def supersmoosher(self):
    print("supersmooshing...")
    lnode = self.term()
    while self.currtoken in UDNT_OPERATORCONV:
      if self.terminated:
        break
      op = self.currtoken
      rnode = self.smoosher()
      lnode = ducktreenode(self.currtoken, lnode, rnode)
      self.advance()
    return lnode
class Lexer:
  def __init__(self, text):
    self.text = text
    self.i = 0
    self.terminated = False
    self.currchar = self.text[0]
    self.tokens = []
    self.MakeTokens()
  def parsetehduck(self):
    parser = Parser(self.tokens)
    return parser.parse()
  def advance(self):
    self.i += 1
    if self.i == len(self.text):
      self.i = -1
      self.currchar = None
      self.terminated = True
    else:
      self.currchar = self.text[self.i]
  def MakeTokens(self):
    tokens = []
    while True:
      if self.terminated:
        break
      if self.currchar in UDNT_NUMBERSET:
        self.MakeNumber()
      if self.currchar in UDNT_OPERATORCONV:
        self.tokens.append(Token(UDNT_OPERATORCONV[self.currchar]))
      self.advance()
  def MakeNumber(self):
    currnum = ""
    points = 0
    isfloat = False
    while True:
      if self.terminated:
        break
      if self.currchar == " ":
        break
      if self.currchar in UDNT_NUMBERSET:
        currnum += self.currchar
      else:
        if points < 2:
          currnum += "."
          isfloat = True
        points += 1
      self.advance()
    if isfloat:
      self.tokens.append(Token("UDNT_NUMBERFLT",currnum))
    else:
      self.tokens.append(Token("UDNT_NUMBERINT", currnum))
# wait idea, what if we make it compile to cpython? :trol
# yeaahhhhh
#ducklexer = Lexer("6 + 9 / 2")
ducktoks = [Token("UDNT_NUMBERINT", "6"),Token("UDNT_PLUS"),Token("UDNT_PLUS"),Token("UDNT_NUMBERINT", '9')]
parser = Parser(ducktoks)
print(parser.smoosher())
