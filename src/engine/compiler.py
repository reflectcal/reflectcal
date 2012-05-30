#compiler version 0.1

#JSMin copyright notice

# This code is original from jsmin by Douglas Crockford, it was translated to
# Python by Baruch Even. The original code had the following copyright and
# license.
#
# /* jsmin.c
#    2007-05-22
#
# Copyright (c) 2002 Douglas Crockford  (www.crockford.com)
#
# Permission is hereby granted, free of charge, to any person obtaining a copy of
# this software and associated documentation files (the "Software"), to deal in
# the Software without restriction, including without limitation the rights to
# use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
# of the Software, and to permit persons to whom the Software is furnished to do
# so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# The Software shall be used for Good, not Evil.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
# */

from StringIO import StringIO
from os import listdir
from os.path import isdir, isfile
import re
from time import time
import hashlib

#JSMin part

def jsmin(js):
  ins = StringIO(js)
  outs = StringIO()
  JavascriptMinify().minify(ins, outs)
  str = outs.getvalue()
  if len(str) > 0 and str[0] == '\n':
    str = str[1:]
  return str

def isAlphanum(c):
  """return true if the character is a letter, digit, underscore,
        dollar sign, or non-ASCII character.
  """
  return ((c >= 'a' and c <= 'z') or (c >= '0' and c <= '9') or
          (c >= 'A' and c <= 'Z') or c == '_' or c == '$' or c == '\\' or (c is not None and ord(c) > 126));

class UnterminatedComment(Exception):
  pass

class UnterminatedStringLiteral(Exception):
  pass

class UnterminatedRegularExpression(Exception):
  pass

class JavascriptMinify(object):

    def _outA(self):
        self.outstream.write(self.theA)
    def _outB(self):
        self.outstream.write(self.theB)

    def _get(self):
        """return the next character from stdin. Watch out for lookahead. If
           the character is a control character, translate it to a space or
           linefeed.
        """
        c = self.theLookahead
        self.theLookahead = None
        if c == None:
            c = self.instream.read(1)
        if c >= ' ' or c == '\n':
            return c
        if c == '': # EOF
            return '\000'
        if c == '\r':
            return '\n'
        return ' '

    def _peek(self):
        self.theLookahead = self._get()
        return self.theLookahead

    def _next(self):
        """get the next character, excluding comments. peek() is used to see
           if a '/' is followed by a '/' or '*'.
        """
        c = self._get()
        if c == '/':
            p = self._peek()
            if p == '/':
                c = self._get()
                while c > '\n':
                    c = self._get()
                return c
            if p == '*':
                c = self._get()
                while 1:
                    c = self._get()
                    if c == '*':
                        if self._peek() == '/':
                            self._get()
                            return ' '
                    if c == '\000':
                        raise UnterminatedComment()

        return c

    def _action(self, action):
        """do something! What you do is determined by the argument:
           1   Output A. Copy B to A. Get the next B.
           2   Copy B to A. Get the next B. (Delete A).
           3   Get the next B. (Delete B).
           action treats a string as a single character. Wow!
           action recognizes a regular expression if it is preceded by ( or , or =.
        """
        if action <= 1:
            self._outA()

        if action <= 2:
            self.theA = self.theB
            if self.theA == "'" or self.theA == '"':
                while 1:
                    self._outA()
                    self.theA = self._get()
                    if self.theA == self.theB:
                        break
                    if self.theA <= '\n':
                        raise UnterminatedStringLiteral()
                    if self.theA == '\\':
                        self._outA()
                        self.theA = self._get()


        if action <= 3:
            self.theB = self._next()
            if self.theB == '/' and (self.theA == '(' or self.theA == ',' or
                                     self.theA == '=' or self.theA == ':' or
                                     self.theA == '[' or self.theA == '?' or
                                     self.theA == '!' or self.theA == '&' or
                                     self.theA == '|' or self.theA == ';' or
                                     self.theA == '{' or self.theA == '}' or
                                     self.theA == '\n'):
                self._outA()
                self._outB()
                while 1:
                    self.theA = self._get()
                    if self.theA == '/':
                        break
                    elif self.theA == '\\':
                        self._outA()
                        self.theA = self._get()
                    elif self.theA <= '\n':
                        print "self.outstream: " + str(self.outstream.getvalue())
                        raise UnterminatedRegularExpression()
                    self._outA()
                self.theB = self._next()


    def _jsmin(self):
        """Copy the input to the output, deleting the characters which are
           insignificant to JavaScript. Comments will be removed. Tabs will be
           replaced with spaces. Carriage returns will be replaced with linefeeds.
           Most spaces and linefeeds will be removed.
        """
        self.theA = '\n'
        self._action(3)

        while self.theA != '\000':
            if self.theA == ' ':
                if isAlphanum(self.theB):
                    self._action(1)
                else:
                    self._action(2)
            elif self.theA == '\n':
                if self.theB in ['{', '[', '(', '+', '-']:
                    self._action(1)
                elif self.theB == ' ':
                    self._action(3)
                else:
                    if isAlphanum(self.theB):
                        self._action(1)
                    else:
                        self._action(2)
            else:
                if self.theB == ' ':
                    if isAlphanum(self.theA):
                        self._action(1)
                    else:
                        self._action(3)
                elif self.theB == '\n':
                    if self.theA in ['}', ']', ')', '+', '-', '"', '\'']:
                        self._action(1)
                    else:
                        if isAlphanum(self.theA):
                            self._action(1)
                        else:
                            self._action(3)
                else:
                    self._action(1)

    def minify(self, instream, outstream):
        self.instream = instream
        self.outstream = outstream
        self.theA = '\n'
        self.theB = None
        self.theLookahead = None

        self._jsmin()
        self.instream.close()

#Compiler part
class CircularDependencyError(Exception):
  pass

class EntityRequiredButNotProvidedError(Exception):
  pass

class Compiler:
  """
  class representing compiler
  arguments: aFolderPath - path to folder 
  which contains files to compile, relative to compiler.py
  """

  #settings
  
  #path of dependencies js file - relative to compiler
  BASE_FILENAME = "base.js"
  DEPENDENCIES_FILENAME = "deps.js"
  DEPENDENCIES_PATH = ""
  DEPENDENCIES_FILENAME = DEPENDENCIES_PATH + DEPENDENCIES_FILENAME
  ADD_DEPENDENSY_METHOD_NAME_RE = "goog\.addDependency" 
  CURRENT_PATH = ""
  JSFILE_MASK = "\w*\.js"
  OUTPUT_FILENAME = "machine_compiled"
  FILES_GLUE_SYMBOL = "\n";
  
  #paths to compile
  paths = []  
  #all files that are present in dependency structure
  files = {}
  #files from paths to compile 
  filesInPaths = []
  
  #files to levels map
  filesToLevels = {}
  #levels to files map
  levelsToFiles = {}
  
  processedFilenames = []
  
  def __init__(aPath):
    pass
  
  def addFileToPath(self, aFileName):
    """
    checks if file is javascript file
    with *.js extension and adds it
    to filesInPath, if not present already
    """
    print "aFileName: " + str(aFileName)
    if ((re.compile(self.JSFILE_MASK).search(aFileName) != None) and (aFileName not in self.filesInPaths)):
      self.filesInPaths.append(aFileName)  
  
  def addPath(self, aPath):
    """
    adds path to paths of compiler
    these could be both dirs and files 
    """
    if (aPath not in self.paths):
      self.paths.append(aPath)
   
  def calculateLevel(self, aChain):
    """
    calculates how deep
    file should be submerged in compiler
    output
    """
    depthLevel = len(aChain) - 1
    lastInChain = aChain[depthLevel]
    requirements = self.files[lastInChain]
    
    #if member is not yet associated with level, 
    #give it level of 0
    for member in aChain:
     
      if (member not in self.filesToLevels):
        
        self.filesToLevels[member] = 0
        
        if (0 not in self.levelsToFiles):
          self.levelsToFiles[0] = []
        self.levelsToFiles[0].append(member)
      
      if (depthLevel > self.filesToLevels[member]):
        
        oldDepthLevel = self.filesToLevels[member]
        self.filesToLevels[member] = depthLevel
        #we may want also to delete self.levelsToFiles[oldDepthLevel]
        #but this is unlike to be the case
        #as depth level only grows
        self.levelsToFiles[oldDepthLevel].remove(member)

        if (depthLevel not in self.levelsToFiles):
          self.levelsToFiles[depthLevel] = []
        self.levelsToFiles[depthLevel].append(member)
      
      depthLevel -= 1
      
    for requirement in requirements:
      self.calculateLevel(aChain + [requirement])   
  
  def clearPaths(self):
    """
    Clears all paths to compile
    """
    self.paths = []
      
  def glue(self):
    """
    composes files together for output
    """
    gluedFile = ""
    
    gluedFile = self.markBaseAsCompiled()
    
    for level in self.levelsToFiles:
      for file in self.levelsToFiles[level]:
        f = open(file)
        contents = f.read()
        f.close()
        gluedFile += contents + "\n";
    
    #minify
    gluedFile = jsmin(gluedFile)
    
    fOut = open(self.OUTPUT_FILENAME + hashlib.md5(gluedFile).hexdigest() + ".js", "w")
    
    
    fOut.write(gluedFile)
    fOut.close()
  
  def markBaseAsCompiled(self):
    
    markAsCompiledRE = "(?<=var\sCOMPILED\s\=\s)false" 
    
    f = open(self.BASE_FILENAME)
    contents = f.read()
    f.close()
    return re.sub(markAsCompiledRE, "true", contents)  
    
  def openDependencies(self):
    """
    opens dependencies file
    and create dependencies structure 
    for traversing
    """
    #files to  classes map
    filesToClasses = {}
    #classes to files map
    classesToFiles = {}
    
    f = open(self.DEPENDENCIES_FILENAME)
    #TODO: Specify max size
    depsContents = f.read()
    f.close()
    
    #minify to strip off comments
    depsContents = jsmin(depsContents)
    
    #filter for dependency
    depRE = self.ADD_DEPENDENSY_METHOD_NAME_RE + "\(.*?\)"
    #filter for entity group: provides or requires
    entGroupRE = "(?<=\[).*?(?=\])"
    #filter for entity: filename or classname
    entRE = "(?<=[\"\'])[^\'\,\[\]]*?(?=[\"\'])"
    
    deps = []
    deps = re.findall(depRE, depsContents)
    #print "deps: " + str(deps)
    for dep in deps:
      entGroups = re.findall(entGroupRE, dep)
      
      filename = re.compile(entRE).search(dep).group()
      provides = re.findall(entRE, entGroups[0])
      requires = re.findall(entRE, entGroups[1])
      
      for className in provides:
        classesToFiles[className] = filename
      filesToClasses[filename] = requires
    
    print "classesToFiles: " + str(classesToFiles)
    print "filesToClasses: " + str(filesToClasses)
      
    for file in filesToClasses:

      if (file not in self.files):
        self.files[file] = []
      
      requirements = filesToClasses[file]
      print "requirements: " + str(requirements)
      for requirement in requirements:
        #exception here signalizes that some
        #entity was required but were not
        #provided with dependencies
        try:
          filename = classesToFiles[requirement]
        except KeyError:
          raise EntityRequiredButNotProvidedError
        if (filename not in self.files[file]):
          self.files[file].append(filename)
      
      
    print "dependencies: " + str(deps)
    print "filename: " + str(filename)
    print "entGroups: " + str(entGroups)
    print "provides: " + str(provides)
    print "requires: " + str(requires)
    
    print "self.files: " + str(self.files)
  
  def process(self, compileAll):
    
    self.scanSource()
    
    print "self.filesInPaths: " + str(self.filesInPaths)
      
    if (compileAll):
      files = self.files
    else:
      files = self.filesInPaths
    for file in files:
      print "file: " + str(file)
      fileChain = [file]
      self.calculateLevel(fileChain)
      
    print "levelsToFiles: " + str(self.levelsToFiles)
    print "filesToLevels: " + str(self.filesToLevels)
    
    self.glue()
   
  def removePath(self, aPath):
    """
    Removes path from paths of compiler
    """
    if (aPath in self.paths):
      self.paths.remove(aPath)
    
  def scanSource(self):
    """
    scans folder source folder
    and compose initial list of files
    to compile
    """
    
    for path in self.paths:
      if (isdir(path)):
        
        dirFiles = listdir(path)
        for dirFile in dirFiles:
          self.addFileToPath(path + "/" + dirFile)
      elif (isfile(path)):
        #we're assuming that file paths are relative to compiler
        self.addFileToPath(path)  
    
if __name__ == "__main__":
  
  compiler = Compiler()
  
  while (True):

    inp = raw_input("1. Add path to compile.\n2. Remove path to compile.\n3. Clear paths.\n4. Compile.\n5. Compile all.\n>")
    
    if (inp == "1" ):
      compiler.addPath(raw_input("Path: "))
    elif (inp == "2"):
      compiler.removePath(raw_input("Path: "))
    elif (inp == "3"):  
      compiler.clearPaths()
    elif (inp == "4" ):
      compiler.openDependencies()
      compiler.process(False)
    elif (inp == "5" ):
      compiler.openDependencies()
      compiler.process(True)  
  
  print "listdir: " + str(listdir("math"))
  

