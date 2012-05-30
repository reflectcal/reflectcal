// Copyright 2006 Google Inc.
// All Rights Reserved.
// 
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
// 
//  * Redistributions of source code must retain the above copyright
//    notice, this list of conditions and the following disclaimer.
//  * Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in
//    the documentation and/or other materials provided with the
//    distribution.
// 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
// FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
// COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
// INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
// CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
// LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
// ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE. 


/*Greek alphabet.
*
* May be needed when
* we split big files
* to series of smaller files.
* Greek letters may be
* used to name them.
*
* Αα Alpha 	   Νν Nu
* Ββ Beta 	   Ξξ Xi
* Γγ Gamma 	   Οο Omicron
* Δδ Delta 	   Ππ Pi
* Εε Epsilon 	 Ρρ Rho
* Ζζ Zeta 	   Σσς Sigma
* Ηη Eta 	     Ττ Tau
* Θθ Theta 	   Υυ Upsilon
* Ιι Iota  	   Φφ Phi
* Κκ Kappa 	   Χχ Chi
* Λλ Lambda 	 Ψψ Psi
* Μμ Mu 	     Ωω Omega
* */

/*
* Google dependencies
*/

goog.addDependency('goog/dom/classes.js', ['goog.dom.classes'], ['goog.array']);
goog.addDependency('goog/dom/dom.js', ['goog.dom', 'goog.dom.DomHelper', 'goog.dom.NodeType'], ['goog.array', 'goog.math.Coordinate', 'goog.math.Size', 'goog.object', 'goog.string', 'goog.userAgent']);
goog.addDependency('goog/dom/fontsizemonitor.js', ['goog.dom.FontSizeMonitor'], ['goog.dom', 'goog.events.EventTarget']);
goog.addDependency('goog/dom/selection.js', ['goog.dom.selection'], ['goog.userAgent']);
goog.addDependency('goog/dom/viewportsizemonitor.js', ['goog.dom.ViewportSizeMonitor'], ['goog.dom', 'goog.events', 'goog.events.EventTarget', 'goog.events.EventType', 'goog.math.Size']);
goog.addDependency('goog/dom/xml.js', ['goog.dom.xml'], []);
goog.addDependency('goog/events/actionhandler.js', ['goog.events.ActionEvent', 'goog.events.ActionHandler', 'goog.events.ActionHandler.EventType'], ['goog.events.EventTarget', 'goog.events.KeyCodes']);
goog.addDependency('goog/events/browserevent.js', ['goog.events.BrowserEvent'], ['goog.events.Event', 'goog.userAgent', "goog.dom"]);
goog.addDependency('goog/events/customevent.js', ['goog.events.CustomEvent'], ['goog.events.Event']);
goog.addDependency('goog/events/event.js', ['goog.events.Event'], ['goog.Disposable']);
goog.addDependency('goog/events/eventhandler.js', ['goog.events.EventHandler'], ['goog.Disposable', 'goog.events', 'goog.object', 'goog.structs.SimplePool']);
goog.addDependency('goog/events/events.js', ['goog.events', 'goog.events.EventType'], ['goog.array', 'goog.events.BrowserEvent', 'goog.events.Listener', 'goog.object', 'goog.structs.SimplePool', 'goog.userAgent']);
goog.addDependency('goog/events/eventtarget.js', ['goog.events.EventTarget'], ['goog.Disposable', 'goog.events', 'goog.events.Event']);
goog.addDependency('goog/events/focushandler.js', ['goog.events.FocusHandler'], ['goog.events', 'goog.events.BrowserEvent', 'goog.events.EventTarget', 'goog.userAgent']);
goog.addDependency('goog/events/inputhandler.js', ['goog.events.InputHandler'], ['goog.events', 'goog.events.BrowserEvent', 'goog.events.EventTarget', 'goog.userAgent']);
goog.addDependency('goog/events/keycodes.js', ['goog.events.KeyCodes'], ['goog.events']);
goog.addDependency('goog/events/keyhandler.js', ['goog.events.KeyEvent', 'goog.events.KeyHandler', 'goog.events.KeyHandler.EventType'], ['goog.events', 'goog.events.BrowserEvent', 'goog.events.EventTarget', 'goog.events.KeyCodes', 'goog.userAgent']);
goog.addDependency('goog/events/keynames.js', ['goog.events.KeyNames'], ['goog.events']);
goog.addDependency('goog/events/listener.js', ['goog.events.Listener'], []);
goog.addDependency('goog/events/mousewheelhandler.js', ['goog.events.MouseWheelEvent', 'goog.events.MouseWheelHandler', 'goog.events.MouseWheelHandler.EventType'], ['goog.events', 'goog.events.BrowserEvent', 'goog.events.EventTarget', 'goog.userAgent']);
goog.addDependency('goog/events/onlinehandler.js', ['goog.events.OnlineHandler', 'goog.events.OnlineHandler.EventType'], ['goog.Timer', 'goog.events', 'goog.events.EventHandler', 'goog.events.EventTarget', 'goog.userAgent']);
goog.addDependency('goog/iter/iter.js', ['goog.iter', 'goog.iter.Iterator', 'goog.iter.StopIteration'], ['goog.array']);
goog.addDependency('goog/math/box.js', ['goog.math.Box'], []);
goog.addDependency('goog/math/coordinate.js', ['goog.math.Coordinate'], []);
goog.addDependency('goog/math/math.js', ['goog.math'], ['goog.math.Box', 'goog.math.Coordinate', 'goog.math.Rect', 'goog.math.Size']);
goog.addDependency('goog/math/rect.js', ['goog.math.Rect'], ['goog.math.Box']);
goog.addDependency('goog/math/size.js', ['goog.math.Size'], []);
goog.addDependency('goog/structs/avltree.js', ['goog.structs.AvlTree'], ['goog.structs']);
goog.addDependency('goog/structs/circularbuffer.js', ['goog.structs.CircularBuffer'], []);
goog.addDependency('goog/structs/heap.js', ['goog.structs.Heap'], ['goog.structs', 'goog.structs.Node']);
goog.addDependency('goog/structs/linkedmap.js', ['goog.structs.LinkedMap'], ['goog.array', 'goog.structs.Map']);
goog.addDependency('goog/structs/map.js', ['goog.structs.Map'], ['goog.iter.Iterator', 'goog.iter.StopIteration', 'goog.object']);
goog.addDependency('goog/structs/node.js', ['goog.structs.Node'], []);
goog.addDependency('goog/structs/pool.js', ['goog.structs.Pool'], ['goog.Disposable', 'goog.iter', 'goog.structs.Queue', 'goog.structs.Set']);
goog.addDependency('goog/structs/prioritypool.js', ['goog.structs.PriorityPool'], ['goog.structs.Pool', 'goog.structs.PriorityQueue']);
goog.addDependency('goog/structs/priorityqueue.js', ['goog.structs.PriorityQueue'], ['goog.structs', 'goog.structs.Heap']);
goog.addDependency('goog/structs/queue.js', ['goog.structs.Queue'], ['goog.structs']);
goog.addDependency('goog/structs/set.js', ['goog.structs.Set'], ['goog.structs', 'goog.structs.Map']);
goog.addDependency('goog/structs/simplepool.js', ['goog.structs.SimplePool'], ['goog.Disposable']);
goog.addDependency('goog/structs/structs.js', ['goog.structs'], ['goog.array', 'goog.object']);
goog.addDependency('goog/structs/trie.js', ['goog.structs.Trie'], ['goog.structs', 'goog.object']);
goog.addDependency('goog/style/style.js', ['goog.style'], ['goog.array', 'goog.dom', 'goog.math.Box', 'goog.math.Coordinate', 'goog.math.Rect', 'goog.math.Size', 'goog.object', 'goog.userAgent']);
goog.addDependency('goog/useragent/adobereader.js', ['goog.userAgent.adobeReader'], ['goog.userAgent']);
goog.addDependency('goog/useragent/flash.js', ['goog.userAgent.flash'], ['goog.string']);
goog.addDependency('goog/useragent/iphoto.js', ['goog.userAgent.iphoto'], ['goog.userAgent']);
goog.addDependency('goog/useragent/jscript.js', ['goog.userAgent.jscript'], ['goog.string']);
goog.addDependency('goog/useragent/picasa.js', ['goog.userAgent.picasa'], ['goog.userAgent']);
goog.addDependency('goog/useragent/useragent.js', ['goog.userAgent'], ['goog.string']);
goog.addDependency('goog/util/array.js', ['goog.array'], []);
goog.addDependency('goog/util/delay.js', ['goog.Delay'], ['goog.Disposable', 'goog.Timer']);
goog.addDependency('goog/util/disposable.js', ['goog.Disposable', 'goog.dispose'], []);
goog.addDependency('goog/util/history.js', ['goog.History', 'goog.History.Event'], ['goog.array', 'goog.dom', 'goog.events', 'goog.events.BrowserEvent', 'goog.events.Event', 'goog.events.EventHandler', 'goog.events.EventTarget', 'goog.string', 'goog.Timer', 'goog.userAgent']);
goog.addDependency('goog/util/json.js', ['goog.json', 'goog.json.Serializer'], []);
goog.addDependency('goog/util/object.js', ['goog.object'], []);
goog.addDependency('goog/util/string.js', ['goog.string'], []);
goog.addDependency('goog/util/stringbuffer.js', ['goog.string.StringBuffer'], ['goog.userAgent.jscript']);
goog.addDependency('goog/util/throttle.js', ['goog.Throttle'], ['goog.Timer']);
goog.addDependency('goog/util/timer.js', ['goog.Timer'], ['goog.events.EventTarget']);
goog.addDependency('goog/util/uri.js', ['goog.Uri', 'goog.Uri.QueryData'], ['goog.array', 'goog.string', 'goog.structs', 'goog.structs.Map']);
goog.addDependency('goog/util/window.js', ['goog.window'], []);

/*
* Rflect dependencies
*/

// Debug
goog.addDependency("rflect/debug/debug.js", ["rflect.Debug"], ["goog.events", "rflect.Root", "goog.dom.classes", "goog.style", "goog.object", "goog.dom", "rflect.debug.drag.Drag"]);
goog.addDependency("rflect/debug/events/event.js", ["rflect.debug.events.Event"], ["rflect.Root", "rflect.debug.structs.HashMap", "goog.object"]);
goog.addDependency("rflect/debug/events/eventsource.js", ["rflect.debug.events.EventSource"], ["rflect.Root", "rflect.debug.structs.HashMap", "rflect.math", "goog.array"]);
goog.addDependency("rflect/debug/structs/hashmap.js", ["rflect.debug.structs.HashMap"], ["rflect.Root"]);
goog.addDependency("rflect/debug/util/unit.js", ["rflect.debug.util.Unit"], ["rflect.debug.browser.BrowserDetector", "rflect.Root"]);
goog.addDependency("rflect/debug/drag/drag.js", ["rflect.debug.drag.Drag"], ["goog.events", "rflect.debug.events.EventSource", "rflect.debug.events.Event", "rflect.debug.util.Unit"]);
goog.addDependency("rflect/debug/browser/browserdetector.js", ["rflect.debug.browser.BrowserDetector"], ["rflect.debug.browser.Browser"]);
goog.addDependency("rflect/debug/browser/browser.js", ["rflect.debug.browser.Browser"], ["rflect.Root", "rflect.debug.structs.HashMap"]);

goog.addDependency("rflect/math/math.js", ["rflect.math"], []);

goog.addDependency("rflect/rflect/rflect.js", ["rflect"], []);
goog.addDependency("rflect/rflect/root.js", ["rflect.Root"], ["rflect"]);
goog.addDependency("rflect/util/mime.js", ["rflect.mime"], []);
goog.addDependency("rflect/util/xmlhttp.js", ["rflect.XMLHTTP"], ["rflect.Root", "rflect.mime", "goog.object", "goog.json"]);

/*
* Localization
* */
goog.addDependency("rflect/localization/localization.js", ["rflect.loc"], []);
goog.addDependency("rflect/localization/localizationsubs.js", ["rflect.loc.subs"], ["rflect.loc", "goog.string", "goog.array"]);
goog.addDependency("rflect/localization/dictionary.js", ["rflect.loc.Dict"], ["rflect.loc"]);
goog.addDependency("rflect/localization/dictionarysubs.js", ["rflect.loc.subs.Dict"], ["rflect.loc.subs"]);

/*
* DateTime
* */
/*
* DateTime globalization
* */
goog.addDependency("rflect/datetime/datetime/globalization/ja-JP.js", ["rflect.loc.datetime.DateTime"], ["rflect.loc"]);
/*
* DateTime class
* */
goog.addDependency("rflect/datetime/datetime/datetime.js", ["rflect.datetime.DateTime"], ["rflect.Root", "goog.json", "rflect.loc.datetime.DateTime"]);
goog.addDependency("rflect/datetime/interval.js", ["rflect.datetime.Interval"], ["rflect.Root", "goog.json", "rflect.datetime.DateTime"]);
goog.addDependency("rflect/datetime/timeprocessor.js", ["rflect.datetime.Timeprocessor"], ["rflect.datetime.DateTime"]);
goog.addDependency("rflect/widg/infotip.js", ["rflect.widg.InfoTip"], ["rflect.Root", "goog.dom", "goog.math.Size", "goog.math.Rect", "goog.math.Coordinate", "goog.object", "goog.userAgent", "goog.Disposable"]);
goog.addDependency("rflect/dom/autoscroll.js", ["rflect.dom.AutoScroll"], ["rflect.Root", "goog.object", "goog.Timer", "goog.events.EventTarget", "goog.events.EventHandler"]);

/*
* Cal
* */
goog.addDependency("rflect/cal/infotip.js", ["rflect.cal.InfoTip"], ["rflect.widg.InfoTip", "goog.events.EventTarget", "goog.events.EventHandler"]);
/*
* InfoTipCreating
* */
/*
* InfoTipCreating localization
* */
goog.addDependency("rflect/cal/infotipcreating/localization/ja-JP.js", ["rflect.loc.cal.InfoTipCreating"], ["rflect.loc"]);
/*
* InfoTipCreating class
* */
goog.addDependency("rflect/cal/infotipcreating/infotipcreating.js", ["rflect.cal.InfoTipCreating"], ["rflect.cal.InfoTip", "goog.dom", "goog.math.Size", "goog.object", "goog.events.KeyCodes", "goog.userAgent", "rflect.loc.cal.InfoTipCreating"]);
/*
* InfoTipChanging
* */
/*
* InfoTipChanging localizaiton
* */
goog.addDependency("rflect/cal/infotipchanging/localization/ja-JP.js", ["rflect.loc.cal.InfoTipChanging"], ["rflect.loc"]);
/*
* InfoTipChanging class
* */
goog.addDependency("rflect/cal/infotipchanging/infotipchanging.js", ["rflect.cal.InfoTipChanging"], ["rflect.cal.InfoTip", "goog.dom", "goog.math.Size", "goog.object", "goog.events.KeyCodes", "rflect.datetime.DateTime", "goog.userAgent", "rflect.loc.cal.InfoTipChanging"]);
goog.addDependency("rflect/cal/timegrid.js", ["rflect.cal.TimeGrid"], ["rflect.Root", "goog.object", "rflect.datetime.Timeprocessor"]);
/*
* CalendarEvent
* */
/*
* CalendarEvent localization
* */
goog.addDependency("rflect/cal/calendarevent/localization/ja-JP.js", ["rflect.loc.cal.CalendarEvent"], ["rflect.loc"]);
/*
* CalendarEvent class
* */
goog.addDependency("rflect/cal/calendarevent/calendarevent.js", ["rflect.cal.CalendarEvent"], ["rflect.Root", "rflect.datetime.DateTime", "goog.json", "goog.object", "rflect.datetime.Interval", "rflect.loc.cal.CalendarEvent"]);
goog.addDependency("rflect/cal/block.js", ["rflect.cal.Block", "rflect.cal.BlockHorizontal", "rflect.cal.BlockVertical"], ["rflect.Root", "goog.object", "goog.dom", "goog.Throttle", "goog.string.StringBuffer", "rflect.cal.CalendarEvent"]);
goog.addDependency("rflect/cal/gridcontrol.js", ["rflect.cal.GridControl"], ["rflect.Root", "goog.events.EventTarget", "goog.array", "goog.events", "goog.dom", "goog.object"]);
goog.addDependency("rflect/cal/history.js", ["rflect.cal.History"], ["goog.History", "goog.Disposable", "goog.events.EventHandler"]);

/*
* Main
* */
/*
* Main localizaiton
* */
goog.addDependency("rflect/cal/main/localization/ja-JP.js", ["rflect.loc.cal.Main"], ["rflect.loc.subs", "rflect.loc.datetime.DateTime"]);
/*
* Main class
* */
goog.addDependency("rflect/cal/main/main.js", ["rflect.cal.Main"], ["rflect.Root", "goog.dom", "goog.dom.classes", "goog.events", "goog.style", "rflect.datetime.DateTime", "rflect.cal.GridControl", "rflect.cal.CalendarEvent", "rflect.XMLHTTP", "goog.object", "goog.array", "rflect.debug.structs.HashMap", "rflect.cal.InfoTipCreating", "rflect.cal.InfoTipChanging", "rflect.mime", "goog.dom.ViewportSizeMonitor", "goog.events.BrowserEvent", "goog.events.KeyCodes", "goog.events.EventHandler", "rflect.cal.TimeGrid", "rflect.cal.BlockHorizontal", "rflect.cal.BlockVertical", "rflect.datetime.Interval", "goog.string.StringBuffer", "rflect.dom.AutoScroll", "rflect.cal.History", "rflect.loc.cal.Main"]);
goog.addDependency("rflect/cal/main__Add__Coll.js", ["rflect.cal._Main__Add__Coll"], ["rflect.cal.Main"]);
goog.addDependency("rflect/cal/main__Crea__Disp.js", ["rflect.cal._Main__Crea__Disp"], ["rflect.cal._Main__Add__Coll"]);
goog.addDependency("rflect/cal/main__DrawS__OnCl.js", ["rflect.cal._Main__DrawS__OnCl"], ["rflect.cal._Main__Crea__Disp"]);
goog.addDependency("rflect/cal/main__OnKey__OnMouseM.js", ["rflect.cal._Main__OnKey__OnMouseM"], ["rflect.cal._Main__DrawS__OnCl"]);
goog.addDependency("rflect/cal/main__OnMouseO__Prep.js", ["rflect.cal._Main__OnMouseO__Prep"], ["rflect.cal._Main__OnKey__OnMouseM"]);
goog.addDependency("rflect/cal/main__Roll__Swit.js", ["rflect.cal._Main__Roll__Swit"], ["rflect.cal._Main__OnMouseO__Prep"]);
goog.addDependency("rflect/cal/main__Upd__Upd.js", ["rflect.cal._Main__Upd__Upd"], ["rflect.cal._Main__Roll__Swit"]);
goog.addDependency("rflect/cal/boot.js", ["rflect.cal.boot"], ["goog.events", "rflect.cal._Main__Upd__Upd", "rflect.Debug"]);




//goog.addDependency("test/boot_public_methods.js", ["rflect.cal.boot"], ["goog.events", "rflect.cal._CalendarIota", "rflect.Debug", "rflect.cal.CalendarEventCreationBox"]);

/*
* Yahoo dependencies
*/
/*
rflect.addDependency("yahoo/yahoo.js", []);
rflect.addDependency("dom/dom_yahoo.js", ["yahoo/yahoo-min.js"]);
rflect.addDependency("event/event-min.js", ["yahoo/yahoo-min.js"]);
rflect.addDependency("dragdrop/dragdrop-min.js", ["dom/dom-min.js", "event/event-min.js"]);
rflect.addDependency("rflect")*/
