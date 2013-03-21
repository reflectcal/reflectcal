function $JSCompiler_alias_THROW$$($jscomp_throw_param$$) {
  throw $jscomp_throw_param$$;
}
var $JSCompiler_alias_VOID$$ = void 0, $JSCompiler_alias_TRUE$$ = !0, $JSCompiler_alias_NULL$$ = null, $JSCompiler_alias_FALSE$$ = !1;
function $JSCompiler_emptyFn$$() {
  return function() {
  }
}
function $JSCompiler_set$$($JSCompiler_set_name$$) {
  return function($JSCompiler_set_value$$) {
    this[$JSCompiler_set_name$$] = $JSCompiler_set_value$$
  }
}
function $JSCompiler_get$$($JSCompiler_get_name$$) {
  return function() {
    return this[$JSCompiler_get_name$$]
  }
}
function $JSCompiler_returnArg$$($JSCompiler_returnArg_value$$) {
  return function() {
    return $JSCompiler_returnArg_value$$
  }
}
var $JSCompiler_prototypeAlias$$, $goog$global$$ = this;
function $goog$getObjectByName$$($name$$58_parts$$1$$) {
  $name$$58_parts$$1$$ = $name$$58_parts$$1$$.split(".");
  for(var $cur$$1$$ = $goog$global$$, $part$$1$$;$part$$1$$ = $name$$58_parts$$1$$.shift();) {
    if($cur$$1$$[$part$$1$$] != $JSCompiler_alias_NULL$$) {
      $cur$$1$$ = $cur$$1$$[$part$$1$$]
    }else {
      return $JSCompiler_alias_NULL$$
    }
  }
  return $cur$$1$$
}
function $goog$nullFunction$$() {
}
function $goog$addSingletonGetter$$($ctor$$) {
  $ctor$$.$getInstance$ = function $$ctor$$$$getInstance$$() {
    return $ctor$$.$instance_$ ? $ctor$$.$instance_$ : $ctor$$.$instance_$ = new $ctor$$
  }
}
function $goog$typeOf$$($value$$38$$) {
  var $s$$2$$ = typeof $value$$38$$;
  if("object" == $s$$2$$) {
    if($value$$38$$) {
      if($value$$38$$ instanceof Array) {
        return"array"
      }
      if($value$$38$$ instanceof Object) {
        return $s$$2$$
      }
      var $className$$1$$ = Object.prototype.toString.call($value$$38$$);
      if("[object Window]" == $className$$1$$) {
        return"object"
      }
      if("[object Array]" == $className$$1$$ || "number" == typeof $value$$38$$.length && "undefined" != typeof $value$$38$$.splice && "undefined" != typeof $value$$38$$.propertyIsEnumerable && !$value$$38$$.propertyIsEnumerable("splice")) {
        return"array"
      }
      if("[object Function]" == $className$$1$$ || "undefined" != typeof $value$$38$$.call && "undefined" != typeof $value$$38$$.propertyIsEnumerable && !$value$$38$$.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if("function" == $s$$2$$ && "undefined" == typeof $value$$38$$.call) {
      return"object"
    }
  }
  return $s$$2$$
}
function $goog$isDef$$($val$$) {
  return $val$$ !== $JSCompiler_alias_VOID$$
}
function $goog$isArray$$($val$$3$$) {
  return"array" == $goog$typeOf$$($val$$3$$)
}
function $goog$isArrayLike$$($val$$4$$) {
  var $type$$52$$ = $goog$typeOf$$($val$$4$$);
  return"array" == $type$$52$$ || "object" == $type$$52$$ && "number" == typeof $val$$4$$.length
}
function $goog$isString$$($val$$6$$) {
  return"string" == typeof $val$$6$$
}
function $goog$isNumber$$($val$$8$$) {
  return"number" == typeof $val$$8$$
}
function $goog$isFunction$$($val$$9$$) {
  return"function" == $goog$typeOf$$($val$$9$$)
}
function $goog$isObject$$($val$$10$$) {
  var $type$$53$$ = typeof $val$$10$$;
  return"object" == $type$$53$$ && $val$$10$$ != $JSCompiler_alias_NULL$$ || "function" == $type$$53$$
}
function $goog$getUid$$($obj$$20$$) {
  return $obj$$20$$[$goog$UID_PROPERTY_$$] || ($obj$$20$$[$goog$UID_PROPERTY_$$] = ++$goog$uidCounter_$$)
}
var $goog$UID_PROPERTY_$$ = "closure_uid_" + (1E9 * Math.random() >>> 0), $goog$uidCounter_$$ = 0;
function $goog$bindNative_$$($fn$$, $selfObj$$1$$, $var_args$$25$$) {
  return $fn$$.call.apply($fn$$.bind, arguments)
}
function $goog$bindJs_$$($fn$$1$$, $selfObj$$2$$, $var_args$$26$$) {
  $fn$$1$$ || $JSCompiler_alias_THROW$$(Error());
  if(2 < arguments.length) {
    var $boundArgs$$ = Array.prototype.slice.call(arguments, 2);
    return function() {
      var $newArgs$$ = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply($newArgs$$, $boundArgs$$);
      return $fn$$1$$.apply($selfObj$$2$$, $newArgs$$)
    }
  }
  return function() {
    return $fn$$1$$.apply($selfObj$$2$$, arguments)
  }
}
function $goog$bind$$($fn$$2$$, $selfObj$$3$$, $var_args$$27$$) {
  $goog$bind$$ = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? $goog$bindNative_$$ : $goog$bindJs_$$;
  return $goog$bind$$.apply($JSCompiler_alias_NULL$$, arguments)
}
function $goog$partial$$($fn$$3$$, $var_args$$28$$) {
  var $args$$ = Array.prototype.slice.call(arguments, 1);
  return function() {
    var $newArgs$$1$$ = Array.prototype.slice.call(arguments);
    $newArgs$$1$$.unshift.apply($newArgs$$1$$, $args$$);
    return $fn$$3$$.apply(this, $newArgs$$1$$)
  }
}
var $goog$now$$ = Date.now || function() {
  return+new Date
};
function $goog$inherits$$($childCtor$$, $parentCtor$$) {
  function $tempCtor$$() {
  }
  $tempCtor$$.prototype = $parentCtor$$.prototype;
  $childCtor$$.$superClass_$ = $parentCtor$$.prototype;
  $childCtor$$.prototype = new $tempCtor$$;
  $childCtor$$.prototype.constructor = $childCtor$$
}
;function $goog$string$subs$$($str$$12$$, $var_args$$30$$) {
  for(var $i$$5$$ = 1;$i$$5$$ < arguments.length;$i$$5$$++) {
    var $replacement$$ = String(arguments[$i$$5$$]).replace(/\$/g, "$$$$");
    $str$$12$$ = $str$$12$$.replace(/\%s/, $replacement$$)
  }
  return $str$$12$$
}
function $goog$string$trim$$($str$$25$$) {
  return $str$$25$$.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
}
function $goog$string$newLineToBr$$($str$$30$$, $opt_xml$$) {
  return $str$$30$$.replace(/(\r\n|\r|\n)/g, $opt_xml$$ ? "<br />" : "<br>")
}
function $goog$string$htmlEscape$$($str$$31$$) {
  if(!$goog$string$allRe_$$.test($str$$31$$)) {
    return $str$$31$$
  }
  -1 != $str$$31$$.indexOf("&") && ($str$$31$$ = $str$$31$$.replace($goog$string$amperRe_$$, "&amp;"));
  -1 != $str$$31$$.indexOf("<") && ($str$$31$$ = $str$$31$$.replace($goog$string$ltRe_$$, "&lt;"));
  -1 != $str$$31$$.indexOf(">") && ($str$$31$$ = $str$$31$$.replace($goog$string$gtRe_$$, "&gt;"));
  -1 != $str$$31$$.indexOf('"') && ($str$$31$$ = $str$$31$$.replace($goog$string$quotRe_$$, "&quot;"));
  return $str$$31$$
}
var $goog$string$amperRe_$$ = /&/g, $goog$string$ltRe_$$ = /</g, $goog$string$gtRe_$$ = />/g, $goog$string$quotRe_$$ = /\"/g, $goog$string$allRe_$$ = /[&<>\"]/;
function $goog$string$whitespaceEscape$$($str$$35$$) {
  return $goog$string$newLineToBr$$($str$$35$$.replace(/  /g, " &#160;"), $JSCompiler_alias_VOID$$)
}
function $goog$string$padNumber$$($num$$4$$, $length$$14$$) {
  var $s$$13$$ = $goog$isDef$$($JSCompiler_alias_VOID$$) ? $num$$4$$.toFixed($JSCompiler_alias_VOID$$) : String($num$$4$$), $index$$45_length$$inline_77$$ = $s$$13$$.indexOf(".");
  -1 == $index$$45_length$$inline_77$$ && ($index$$45_length$$inline_77$$ = $s$$13$$.length);
  $index$$45_length$$inline_77$$ = Math.max(0, $length$$14$$ - $index$$45_length$$inline_77$$);
  return Array($index$$45_length$$inline_77$$ + 1).join("0") + $s$$13$$
}
;var $goog$userAgent$detectedOpera_$$, $goog$userAgent$detectedIe_$$, $goog$userAgent$detectedWebkit_$$, $goog$userAgent$detectedGecko_$$, $goog$userAgent$detectedMac_$$, $goog$userAgent$detectedWindows_$$;
function $goog$userAgent$getUserAgentString$$() {
  return $goog$global$$.navigator ? $goog$global$$.navigator.userAgent : $JSCompiler_alias_NULL$$
}
function $goog$userAgent$getNavigator$$() {
  return $goog$global$$.navigator
}
$goog$userAgent$detectedGecko_$$ = $goog$userAgent$detectedWebkit_$$ = $goog$userAgent$detectedIe_$$ = $goog$userAgent$detectedOpera_$$ = $JSCompiler_alias_FALSE$$;
var $ua$$inline_80$$;
if($ua$$inline_80$$ = $goog$userAgent$getUserAgentString$$()) {
  var $navigator$$inline_81$$ = $goog$userAgent$getNavigator$$();
  $goog$userAgent$detectedOpera_$$ = 0 == $ua$$inline_80$$.indexOf("Opera");
  $goog$userAgent$detectedIe_$$ = !$goog$userAgent$detectedOpera_$$ && -1 != $ua$$inline_80$$.indexOf("MSIE");
  $goog$userAgent$detectedWebkit_$$ = !$goog$userAgent$detectedOpera_$$ && -1 != $ua$$inline_80$$.indexOf("WebKit");
  $goog$userAgent$detectedGecko_$$ = !$goog$userAgent$detectedOpera_$$ && !$goog$userAgent$detectedWebkit_$$ && "Gecko" == $navigator$$inline_81$$.product
}
var $goog$userAgent$OPERA$$ = $goog$userAgent$detectedOpera_$$, $goog$userAgent$IE$$ = $goog$userAgent$detectedIe_$$, $goog$userAgent$GECKO$$ = $goog$userAgent$detectedGecko_$$, $goog$userAgent$WEBKIT$$ = $goog$userAgent$detectedWebkit_$$, $goog$userAgent$PLATFORM$$, $navigator$$inline_83$$ = $goog$userAgent$getNavigator$$();
$goog$userAgent$PLATFORM$$ = $navigator$$inline_83$$ && $navigator$$inline_83$$.platform || "";
$goog$userAgent$detectedMac_$$ = -1 != $goog$userAgent$PLATFORM$$.indexOf("Mac");
$goog$userAgent$detectedWindows_$$ = -1 != $goog$userAgent$PLATFORM$$.indexOf("Win");
var $goog$userAgent$X11$$ = !!$goog$userAgent$getNavigator$$() && -1 != ($goog$userAgent$getNavigator$$().appVersion || "").indexOf("X11");
function $goog$userAgent$getDocumentMode_$$() {
  var $doc$$4$$ = $goog$global$$.document;
  return $doc$$4$$ ? $doc$$4$$.documentMode : $JSCompiler_alias_VOID$$
}
var $goog$userAgent$VERSION$$;
a: {
  var $version$$inline_86$$ = "", $re$$inline_87$$;
  if($goog$userAgent$OPERA$$ && $goog$global$$.opera) {
    var $operaVersion$$inline_88$$ = $goog$global$$.opera.version, $version$$inline_86$$ = "function" == typeof $operaVersion$$inline_88$$ ? $operaVersion$$inline_88$$() : $operaVersion$$inline_88$$
  }else {
    if($goog$userAgent$GECKO$$ ? $re$$inline_87$$ = /rv\:([^\);]+)(\)|;)/ : $goog$userAgent$IE$$ ? $re$$inline_87$$ = /MSIE\s+([^\);]+)(\)|;)/ : $goog$userAgent$WEBKIT$$ && ($re$$inline_87$$ = /WebKit\/(\S+)/), $re$$inline_87$$) {
      var $arr$$inline_89$$ = $re$$inline_87$$.exec($goog$userAgent$getUserAgentString$$()), $version$$inline_86$$ = $arr$$inline_89$$ ? $arr$$inline_89$$[1] : ""
    }
  }
  if($goog$userAgent$IE$$) {
    var $docMode$$inline_90$$ = $goog$userAgent$getDocumentMode_$$();
    if($docMode$$inline_90$$ > parseFloat($version$$inline_86$$)) {
      $goog$userAgent$VERSION$$ = String($docMode$$inline_90$$);
      break a
    }
  }
  $goog$userAgent$VERSION$$ = $version$$inline_86$$
}
var $goog$userAgent$isVersionCache_$$ = {};
function $goog$userAgent$isVersion$$($version$$8$$) {
  var $JSCompiler_temp$$66_order$$inline_94$$;
  if(!($JSCompiler_temp$$66_order$$inline_94$$ = $goog$userAgent$isVersionCache_$$[$version$$8$$])) {
    $JSCompiler_temp$$66_order$$inline_94$$ = 0;
    for(var $v1Subs$$inline_95$$ = $goog$string$trim$$(String($goog$userAgent$VERSION$$)).split("."), $v2Subs$$inline_96$$ = $goog$string$trim$$(String($version$$8$$)).split("."), $subCount$$inline_97$$ = Math.max($v1Subs$$inline_95$$.length, $v2Subs$$inline_96$$.length), $subIdx$$inline_98$$ = 0;0 == $JSCompiler_temp$$66_order$$inline_94$$ && $subIdx$$inline_98$$ < $subCount$$inline_97$$;$subIdx$$inline_98$$++) {
      var $v1Sub$$inline_99$$ = $v1Subs$$inline_95$$[$subIdx$$inline_98$$] || "", $v2Sub$$inline_100$$ = $v2Subs$$inline_96$$[$subIdx$$inline_98$$] || "", $v1CompParser$$inline_101$$ = RegExp("(\\d*)(\\D*)", "g"), $v2CompParser$$inline_102$$ = RegExp("(\\d*)(\\D*)", "g");
      do {
        var $v1Comp$$inline_103$$ = $v1CompParser$$inline_101$$.exec($v1Sub$$inline_99$$) || ["", "", ""], $v2Comp$$inline_104$$ = $v2CompParser$$inline_102$$.exec($v2Sub$$inline_100$$) || ["", "", ""];
        if(0 == $v1Comp$$inline_103$$[0].length && 0 == $v2Comp$$inline_104$$[0].length) {
          break
        }
        $JSCompiler_temp$$66_order$$inline_94$$ = ((0 == $v1Comp$$inline_103$$[1].length ? 0 : parseInt($v1Comp$$inline_103$$[1], 10)) < (0 == $v2Comp$$inline_104$$[1].length ? 0 : parseInt($v2Comp$$inline_104$$[1], 10)) ? -1 : (0 == $v1Comp$$inline_103$$[1].length ? 0 : parseInt($v1Comp$$inline_103$$[1], 10)) > (0 == $v2Comp$$inline_104$$[1].length ? 0 : parseInt($v2Comp$$inline_104$$[1], 10)) ? 1 : 0) || ((0 == $v1Comp$$inline_103$$[2].length) < (0 == $v2Comp$$inline_104$$[2].length) ? -1 : (0 == 
        $v1Comp$$inline_103$$[2].length) > (0 == $v2Comp$$inline_104$$[2].length) ? 1 : 0) || ($v1Comp$$inline_103$$[2] < $v2Comp$$inline_104$$[2] ? -1 : $v1Comp$$inline_103$$[2] > $v2Comp$$inline_104$$[2] ? 1 : 0)
      }while(0 == $JSCompiler_temp$$66_order$$inline_94$$)
    }
    $JSCompiler_temp$$66_order$$inline_94$$ = $goog$userAgent$isVersionCache_$$[$version$$8$$] = 0 <= $JSCompiler_temp$$66_order$$inline_94$$
  }
  return $JSCompiler_temp$$66_order$$inline_94$$
}
var $doc$$inline_106$$ = $goog$global$$.document, $goog$userAgent$DOCUMENT_MODE$$ = !$doc$$inline_106$$ || !$goog$userAgent$IE$$ ? $JSCompiler_alias_VOID$$ : $goog$userAgent$getDocumentMode_$$() || ("CSS1Compat" == $doc$$inline_106$$.compatMode ? parseInt($goog$userAgent$VERSION$$, 10) : 5);
function $goog$Disposable$$() {
  0 != $goog$Disposable$MonitoringMode$OFF$$ && (this.$creationStack$ = Error().stack, $goog$Disposable$instances_$$[$goog$getUid$$(this)] = this)
}
var $goog$Disposable$MonitoringMode$OFF$$ = 0, $goog$Disposable$instances_$$ = {};
$goog$Disposable$$.prototype.$disposed_$ = $JSCompiler_alias_FALSE$$;
$goog$Disposable$$.prototype.$dispose$ = function $$goog$Disposable$$$$$dispose$$() {
  if(!this.$disposed_$ && (this.$disposed_$ = $JSCompiler_alias_TRUE$$, this.$disposeInternal$(), 0 != $goog$Disposable$MonitoringMode$OFF$$)) {
    var $uid$$ = $goog$getUid$$(this);
    delete $goog$Disposable$instances_$$[$uid$$]
  }
};
$goog$Disposable$$.prototype.$disposeInternal$ = function $$goog$Disposable$$$$$disposeInternal$$() {
  if(this.$onDisposeCallbacks_$) {
    for(;this.$onDisposeCallbacks_$.length;) {
      this.$onDisposeCallbacks_$.shift()()
    }
  }
};
function $goog$dispose$$($obj$$25$$) {
  $obj$$25$$ && "function" == typeof $obj$$25$$.$dispose$ && $obj$$25$$.$dispose$()
}
;function $goog$events$Event$$($type$$55$$, $opt_target$$) {
  this.type = $type$$55$$;
  this.currentTarget = this.target = $opt_target$$
}
$JSCompiler_prototypeAlias$$ = $goog$events$Event$$.prototype;
$JSCompiler_prototypeAlias$$.$disposeInternal$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$dispose$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$propagationStopped_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.defaultPrevented = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$returnValue_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.stopPropagation = function $$JSCompiler_prototypeAlias$$$stopPropagation$() {
  this.$propagationStopped_$ = $JSCompiler_alias_TRUE$$
};
$JSCompiler_prototypeAlias$$.preventDefault = function $$JSCompiler_prototypeAlias$$$preventDefault$() {
  this.defaultPrevented = $JSCompiler_alias_TRUE$$;
  this.$returnValue_$ = $JSCompiler_alias_FALSE$$
};
function $goog$events$Event$preventDefault$$($e$$13$$) {
  $e$$13$$.preventDefault()
}
;var $goog$events$ListenableKey$counter_$$ = 0;
function $goog$events$Listener$$() {
}
$JSCompiler_prototypeAlias$$ = $goog$events$Listener$$.prototype;
$JSCompiler_prototypeAlias$$.key = 0;
$JSCompiler_prototypeAlias$$.$removed$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$callOnce$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$init$ = function $$JSCompiler_prototypeAlias$$$$init$$($listener$$32$$, $proxy$$, $src$$4$$, $type$$56$$, $capture$$, $opt_handler$$) {
  $goog$isFunction$$($listener$$32$$) ? this.$isFunctionListener_$ = $JSCompiler_alias_TRUE$$ : $listener$$32$$ && $listener$$32$$.handleEvent && $goog$isFunction$$($listener$$32$$.handleEvent) ? this.$isFunctionListener_$ = $JSCompiler_alias_FALSE$$ : $JSCompiler_alias_THROW$$(Error("Invalid listener argument"));
  this.$listener$ = $listener$$32$$;
  this.$proxy$ = $proxy$$;
  this.src = $src$$4$$;
  this.type = $type$$56$$;
  this.capture = !!$capture$$;
  this.$handler$ = $opt_handler$$;
  this.$callOnce$ = $JSCompiler_alias_FALSE$$;
  this.key = ++$goog$events$ListenableKey$counter_$$;
  this.$removed$ = $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.handleEvent = function $$JSCompiler_prototypeAlias$$$handleEvent$($eventObject$$) {
  return this.$isFunctionListener_$ ? this.$listener$.call(this.$handler$ || this.src, $eventObject$$) : this.$listener$.handleEvent.call(this.$listener$, $eventObject$$)
};
function $goog$object$forEach$$($obj$$27$$, $f$$) {
  for(var $key$$16$$ in $obj$$27$$) {
    $f$$.call($JSCompiler_alias_VOID$$, $obj$$27$$[$key$$16$$], $key$$16$$, $obj$$27$$)
  }
}
function $goog$object$add$$($obj$$46$$, $key$$32$$, $val$$13$$) {
  $key$$32$$ in $obj$$46$$ && $JSCompiler_alias_THROW$$(Error('The object already contains the key "' + $key$$32$$ + '"'));
  $obj$$46$$[$key$$32$$] = $val$$13$$
}
var $goog$object$PROTOTYPE_FIELDS_$$ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function $goog$object$extend$$($target$$40$$, $var_args$$34$$) {
  for(var $key$$39$$, $source$$2$$, $i$$17$$ = 1;$i$$17$$ < arguments.length;$i$$17$$++) {
    $source$$2$$ = arguments[$i$$17$$];
    for($key$$39$$ in $source$$2$$) {
      $target$$40$$[$key$$39$$] = $source$$2$$[$key$$39$$]
    }
    for(var $j$$1$$ = 0;$j$$1$$ < $goog$object$PROTOTYPE_FIELDS_$$.length;$j$$1$$++) {
      $key$$39$$ = $goog$object$PROTOTYPE_FIELDS_$$[$j$$1$$], Object.prototype.hasOwnProperty.call($source$$2$$, $key$$39$$) && ($target$$40$$[$key$$39$$] = $source$$2$$[$key$$39$$])
    }
  }
}
;var $goog$events$BrowserFeature$HAS_W3C_BUTTON$$ = !$goog$userAgent$IE$$ || $goog$userAgent$IE$$ && 9 <= $goog$userAgent$DOCUMENT_MODE$$, $goog$events$BrowserFeature$HAS_W3C_EVENT_SUPPORT$$ = !$goog$userAgent$IE$$ || $goog$userAgent$IE$$ && 9 <= $goog$userAgent$DOCUMENT_MODE$$, $goog$events$BrowserFeature$SET_KEY_CODE_TO_PREVENT_DEFAULT$$ = $goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("9");
!$goog$userAgent$WEBKIT$$ || $goog$userAgent$isVersion$$("528");
$goog$userAgent$GECKO$$ && $goog$userAgent$isVersion$$("1.9b") || $goog$userAgent$IE$$ && $goog$userAgent$isVersion$$("8") || $goog$userAgent$OPERA$$ && $goog$userAgent$isVersion$$("9.5") || $goog$userAgent$WEBKIT$$ && $goog$userAgent$isVersion$$("528");
$goog$userAgent$GECKO$$ && !$goog$userAgent$isVersion$$("8") || $goog$userAgent$IE$$ && $goog$userAgent$isVersion$$("9");
function $goog$debug$Error$$($opt_msg$$) {
  Error.captureStackTrace ? Error.captureStackTrace(this, $goog$debug$Error$$) : this.stack = Error().stack || "";
  $opt_msg$$ && (this.message = String($opt_msg$$))
}
$goog$inherits$$($goog$debug$Error$$, Error);
$goog$debug$Error$$.prototype.name = "CustomError";
function $goog$asserts$AssertionError$$($messagePattern$$, $messageArgs$$) {
  $messageArgs$$.unshift($messagePattern$$);
  $goog$debug$Error$$.call(this, $goog$string$subs$$.apply($JSCompiler_alias_NULL$$, $messageArgs$$));
  $messageArgs$$.shift();
  this.$messagePattern$ = $messagePattern$$
}
$goog$inherits$$($goog$asserts$AssertionError$$, $goog$debug$Error$$);
$goog$asserts$AssertionError$$.prototype.name = "AssertionError";
function $goog$asserts$doAssertFailure_$$($defaultMessage$$, $defaultArgs$$, $givenMessage$$, $givenArgs$$) {
  var $message$$17$$ = "Assertion failed";
  if($givenMessage$$) {
    var $message$$17$$ = $message$$17$$ + (": " + $givenMessage$$), $args$$2$$ = $givenArgs$$
  }else {
    $defaultMessage$$ && ($message$$17$$ += ": " + $defaultMessage$$, $args$$2$$ = $defaultArgs$$)
  }
  $JSCompiler_alias_THROW$$(new $goog$asserts$AssertionError$$("" + $message$$17$$, $args$$2$$ || []))
}
function $goog$asserts$assert$$($condition$$1$$, $opt_message$$8$$, $var_args$$37$$) {
  $condition$$1$$ || $goog$asserts$doAssertFailure_$$("", $JSCompiler_alias_NULL$$, $opt_message$$8$$, Array.prototype.slice.call(arguments, 2))
}
function $goog$asserts$fail$$($opt_message$$9$$, $var_args$$38$$) {
  $JSCompiler_alias_THROW$$(new $goog$asserts$AssertionError$$("Failure" + ($opt_message$$9$$ ? ": " + $opt_message$$9$$ : ""), Array.prototype.slice.call(arguments, 1)))
}
function $goog$asserts$assertObject$$($value$$47$$, $opt_message$$13$$, $var_args$$42$$) {
  $goog$isObject$$($value$$47$$) || $goog$asserts$doAssertFailure_$$("Expected object but got %s: %s.", [$goog$typeOf$$($value$$47$$), $value$$47$$], $opt_message$$13$$, Array.prototype.slice.call(arguments, 2))
}
;var $goog$array$ARRAY_PROTOTYPE_$$ = Array.prototype, $goog$array$indexOf$$ = $goog$array$ARRAY_PROTOTYPE_$$.indexOf ? function($arr$$11$$, $obj$$55$$, $opt_fromIndex$$6$$) {
  $goog$asserts$assert$$($arr$$11$$.length != $JSCompiler_alias_NULL$$);
  return $goog$array$ARRAY_PROTOTYPE_$$.indexOf.call($arr$$11$$, $obj$$55$$, $opt_fromIndex$$6$$)
} : function($arr$$12$$, $obj$$56$$, $fromIndex_i$$20_opt_fromIndex$$7$$) {
  $fromIndex_i$$20_opt_fromIndex$$7$$ = $fromIndex_i$$20_opt_fromIndex$$7$$ == $JSCompiler_alias_NULL$$ ? 0 : 0 > $fromIndex_i$$20_opt_fromIndex$$7$$ ? Math.max(0, $arr$$12$$.length + $fromIndex_i$$20_opt_fromIndex$$7$$) : $fromIndex_i$$20_opt_fromIndex$$7$$;
  if($goog$isString$$($arr$$12$$)) {
    return!$goog$isString$$($obj$$56$$) || 1 != $obj$$56$$.length ? -1 : $arr$$12$$.indexOf($obj$$56$$, $fromIndex_i$$20_opt_fromIndex$$7$$)
  }
  for(;$fromIndex_i$$20_opt_fromIndex$$7$$ < $arr$$12$$.length;$fromIndex_i$$20_opt_fromIndex$$7$$++) {
    if($fromIndex_i$$20_opt_fromIndex$$7$$ in $arr$$12$$ && $arr$$12$$[$fromIndex_i$$20_opt_fromIndex$$7$$] === $obj$$56$$) {
      return $fromIndex_i$$20_opt_fromIndex$$7$$
    }
  }
  return-1
}, $goog$array$forEach$$ = $goog$array$ARRAY_PROTOTYPE_$$.forEach ? function($arr$$15$$, $f$$7$$, $opt_obj$$6$$) {
  $goog$asserts$assert$$($arr$$15$$.length != $JSCompiler_alias_NULL$$);
  $goog$array$ARRAY_PROTOTYPE_$$.forEach.call($arr$$15$$, $f$$7$$, $opt_obj$$6$$)
} : function($arr$$16$$, $f$$8$$, $opt_obj$$7$$) {
  for(var $l$$2$$ = $arr$$16$$.length, $arr2$$ = $goog$isString$$($arr$$16$$) ? $arr$$16$$.split("") : $arr$$16$$, $i$$22$$ = 0;$i$$22$$ < $l$$2$$;$i$$22$$++) {
    $i$$22$$ in $arr2$$ && $f$$8$$.call($opt_obj$$7$$, $arr2$$[$i$$22$$], $i$$22$$, $arr$$16$$)
  }
}, $goog$array$filter$$ = $goog$array$ARRAY_PROTOTYPE_$$.filter ? function($arr$$18$$, $f$$10$$, $opt_obj$$9$$) {
  $goog$asserts$assert$$($arr$$18$$.length != $JSCompiler_alias_NULL$$);
  return $goog$array$ARRAY_PROTOTYPE_$$.filter.call($arr$$18$$, $f$$10$$, $opt_obj$$9$$)
} : function($arr$$19$$, $f$$11$$, $opt_obj$$10$$) {
  for(var $l$$4$$ = $arr$$19$$.length, $res$$5$$ = [], $resLength$$ = 0, $arr2$$2$$ = $goog$isString$$($arr$$19$$) ? $arr$$19$$.split("") : $arr$$19$$, $i$$24$$ = 0;$i$$24$$ < $l$$4$$;$i$$24$$++) {
    if($i$$24$$ in $arr2$$2$$) {
      var $val$$14$$ = $arr2$$2$$[$i$$24$$];
      $f$$11$$.call($opt_obj$$10$$, $val$$14$$, $i$$24$$, $arr$$19$$) && ($res$$5$$[$resLength$$++] = $val$$14$$)
    }
  }
  return $res$$5$$
}, $goog$array$map$$ = $goog$array$ARRAY_PROTOTYPE_$$.map ? function($arr$$20$$, $f$$12$$, $opt_obj$$11$$) {
  $goog$asserts$assert$$($arr$$20$$.length != $JSCompiler_alias_NULL$$);
  return $goog$array$ARRAY_PROTOTYPE_$$.map.call($arr$$20$$, $f$$12$$, $opt_obj$$11$$)
} : function($arr$$21$$, $f$$13$$, $opt_obj$$12$$) {
  for(var $l$$5$$ = $arr$$21$$.length, $res$$6$$ = Array($l$$5$$), $arr2$$3$$ = $goog$isString$$($arr$$21$$) ? $arr$$21$$.split("") : $arr$$21$$, $i$$25$$ = 0;$i$$25$$ < $l$$5$$;$i$$25$$++) {
    $i$$25$$ in $arr2$$3$$ && ($res$$6$$[$i$$25$$] = $f$$13$$.call($opt_obj$$12$$, $arr2$$3$$[$i$$25$$], $i$$25$$, $arr$$21$$))
  }
  return $res$$6$$
}, $goog$array$every$$ = $goog$array$ARRAY_PROTOTYPE_$$.every ? function($arr$$26$$, $f$$18$$, $opt_obj$$17$$) {
  $goog$asserts$assert$$($arr$$26$$.length != $JSCompiler_alias_NULL$$);
  return $goog$array$ARRAY_PROTOTYPE_$$.every.call($arr$$26$$, $f$$18$$, $opt_obj$$17$$)
} : function($arr$$27$$, $f$$19$$, $opt_obj$$18$$) {
  for(var $l$$7$$ = $arr$$27$$.length, $arr2$$5$$ = $goog$isString$$($arr$$27$$) ? $arr$$27$$.split("") : $arr$$27$$, $i$$27$$ = 0;$i$$27$$ < $l$$7$$;$i$$27$$++) {
    if($i$$27$$ in $arr2$$5$$ && !$f$$19$$.call($opt_obj$$18$$, $arr2$$5$$[$i$$27$$], $i$$27$$, $arr$$27$$)) {
      return $JSCompiler_alias_FALSE$$
    }
  }
  return $JSCompiler_alias_TRUE$$
};
function $goog$array$findIndex$$($arr$$31$$, $f$$22$$) {
  for(var $l$$8$$ = $arr$$31$$.length, $arr2$$6$$ = $goog$isString$$($arr$$31$$) ? $arr$$31$$.split("") : $arr$$31$$, $i$$29$$ = 0;$i$$29$$ < $l$$8$$;$i$$29$$++) {
    if($i$$29$$ in $arr2$$6$$ && $f$$22$$.call($JSCompiler_alias_VOID$$, $arr2$$6$$[$i$$29$$], $i$$29$$, $arr$$31$$)) {
      return $i$$29$$
    }
  }
  return-1
}
function $goog$array$findIndexRight$$($arr$$33$$, $f$$24$$) {
  for(var $arr2$$7$$ = $goog$isString$$($arr$$33$$) ? $arr$$33$$.split("") : $arr$$33$$, $i$$31$$ = $arr$$33$$.length - 1;0 <= $i$$31$$;$i$$31$$--) {
    if($i$$31$$ in $arr2$$7$$ && $f$$24$$.call($JSCompiler_alias_VOID$$, $arr2$$7$$[$i$$31$$], $i$$31$$, $arr$$33$$)) {
      return $i$$31$$
    }
  }
  return-1
}
function $goog$array$contains$$($arr$$34$$, $obj$$59$$) {
  return 0 <= $goog$array$indexOf$$($arr$$34$$, $obj$$59$$)
}
function $goog$array$remove$$($arr$$41$$, $obj$$63$$) {
  var $i$$34$$ = $goog$array$indexOf$$($arr$$41$$, $obj$$63$$);
  0 <= $i$$34$$ && ($goog$asserts$assert$$($arr$$41$$.length != $JSCompiler_alias_NULL$$), $goog$array$ARRAY_PROTOTYPE_$$.splice.call($arr$$41$$, $i$$34$$, 1))
}
function $goog$array$toArray$$($object$$2$$) {
  var $length$$15$$ = $object$$2$$.length;
  if(0 < $length$$15$$) {
    for(var $rv$$7$$ = Array($length$$15$$), $i$$37$$ = 0;$i$$37$$ < $length$$15$$;$i$$37$$++) {
      $rv$$7$$[$i$$37$$] = $object$$2$$[$i$$37$$]
    }
    return $rv$$7$$
  }
  return[]
}
function $goog$array$splice$$($arr$$44$$, $index$$49$$, $howMany$$, $var_args$$48$$) {
  $goog$asserts$assert$$($arr$$44$$.length != $JSCompiler_alias_NULL$$);
  $goog$array$ARRAY_PROTOTYPE_$$.splice.apply($arr$$44$$, $goog$array$slice$$(arguments, 1))
}
function $goog$array$slice$$($arr$$45$$, $start$$5$$, $opt_end$$13$$) {
  $goog$asserts$assert$$($arr$$45$$.length != $JSCompiler_alias_NULL$$);
  return 2 >= arguments.length ? $goog$array$ARRAY_PROTOTYPE_$$.slice.call($arr$$45$$, $start$$5$$) : $goog$array$ARRAY_PROTOTYPE_$$.slice.call($arr$$45$$, $start$$5$$, $opt_end$$13$$)
}
;function $goog$reflect$sinkValue$$($x$$56$$) {
  $goog$reflect$sinkValue$$[" "]($x$$56$$);
  return $x$$56$$
}
$goog$reflect$sinkValue$$[" "] = $goog$nullFunction$$;
function $goog$events$BrowserEvent$$($opt_e$$, $opt_currentTarget$$) {
  $opt_e$$ && this.$init$($opt_e$$, $opt_currentTarget$$)
}
$goog$inherits$$($goog$events$BrowserEvent$$, $goog$events$Event$$);
var $goog$events$BrowserEvent$IEButtonMap$$ = [1, 4, 2];
$JSCompiler_prototypeAlias$$ = $goog$events$BrowserEvent$$.prototype;
$JSCompiler_prototypeAlias$$.target = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.relatedTarget = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.offsetX = 0;
$JSCompiler_prototypeAlias$$.offsetY = 0;
$JSCompiler_prototypeAlias$$.clientX = 0;
$JSCompiler_prototypeAlias$$.clientY = 0;
$JSCompiler_prototypeAlias$$.screenX = 0;
$JSCompiler_prototypeAlias$$.screenY = 0;
$JSCompiler_prototypeAlias$$.button = 0;
$JSCompiler_prototypeAlias$$.keyCode = 0;
$JSCompiler_prototypeAlias$$.charCode = 0;
$JSCompiler_prototypeAlias$$.ctrlKey = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.altKey = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.shiftKey = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.metaKey = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$platformModifierKey$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$event_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$init$ = function $$JSCompiler_prototypeAlias$$$$init$$($e$$15$$, $opt_currentTarget$$1$$) {
  var $type$$60$$ = this.type = $e$$15$$.type;
  $goog$events$Event$$.call(this, $type$$60$$);
  this.target = $e$$15$$.target || $e$$15$$.srcElement;
  this.currentTarget = $opt_currentTarget$$1$$;
  var $relatedTarget$$ = $e$$15$$.relatedTarget;
  if($relatedTarget$$) {
    if($goog$userAgent$GECKO$$) {
      var $JSCompiler_inline_result$$33$$;
      a: {
        try {
          $goog$reflect$sinkValue$$($relatedTarget$$.nodeName);
          $JSCompiler_inline_result$$33$$ = $JSCompiler_alias_TRUE$$;
          break a
        }catch($e$$inline_117$$) {
        }
        $JSCompiler_inline_result$$33$$ = $JSCompiler_alias_FALSE$$
      }
      $JSCompiler_inline_result$$33$$ || ($relatedTarget$$ = $JSCompiler_alias_NULL$$)
    }
  }else {
    "mouseover" == $type$$60$$ ? $relatedTarget$$ = $e$$15$$.fromElement : "mouseout" == $type$$60$$ && ($relatedTarget$$ = $e$$15$$.toElement)
  }
  this.relatedTarget = $relatedTarget$$;
  this.offsetX = $goog$userAgent$WEBKIT$$ || $e$$15$$.offsetX !== $JSCompiler_alias_VOID$$ ? $e$$15$$.offsetX : $e$$15$$.layerX;
  this.offsetY = $goog$userAgent$WEBKIT$$ || $e$$15$$.offsetY !== $JSCompiler_alias_VOID$$ ? $e$$15$$.offsetY : $e$$15$$.layerY;
  this.clientX = $e$$15$$.clientX !== $JSCompiler_alias_VOID$$ ? $e$$15$$.clientX : $e$$15$$.pageX;
  this.clientY = $e$$15$$.clientY !== $JSCompiler_alias_VOID$$ ? $e$$15$$.clientY : $e$$15$$.pageY;
  this.screenX = $e$$15$$.screenX || 0;
  this.screenY = $e$$15$$.screenY || 0;
  this.button = $e$$15$$.button;
  this.keyCode = $e$$15$$.keyCode || 0;
  this.charCode = $e$$15$$.charCode || ("keypress" == $type$$60$$ ? $e$$15$$.keyCode : 0);
  this.ctrlKey = $e$$15$$.ctrlKey;
  this.altKey = $e$$15$$.altKey;
  this.shiftKey = $e$$15$$.shiftKey;
  this.metaKey = $e$$15$$.metaKey;
  this.$platformModifierKey$ = $goog$userAgent$detectedMac_$$ ? $e$$15$$.metaKey : $e$$15$$.ctrlKey;
  this.state = $e$$15$$.state;
  this.$event_$ = $e$$15$$;
  $e$$15$$.defaultPrevented && this.preventDefault();
  delete this.$propagationStopped_$
};
$JSCompiler_prototypeAlias$$.$isButton$ = function $$JSCompiler_prototypeAlias$$$$isButton$$($button$$) {
  return $goog$events$BrowserFeature$HAS_W3C_BUTTON$$ ? this.$event_$.button == $button$$ : "click" == this.type ? 0 == $button$$ : !!(this.$event_$.button & $goog$events$BrowserEvent$IEButtonMap$$[$button$$])
};
function $JSCompiler_StaticMethods_isMouseActionButton$$($JSCompiler_StaticMethods_isMouseActionButton$self$$) {
  return $JSCompiler_StaticMethods_isMouseActionButton$self$$.$isButton$(0) && !($goog$userAgent$WEBKIT$$ && $goog$userAgent$detectedMac_$$ && $JSCompiler_StaticMethods_isMouseActionButton$self$$.ctrlKey)
}
$JSCompiler_prototypeAlias$$.stopPropagation = function $$JSCompiler_prototypeAlias$$$stopPropagation$() {
  $goog$events$BrowserEvent$$.$superClass_$.stopPropagation.call(this);
  this.$event_$.stopPropagation ? this.$event_$.stopPropagation() : this.$event_$.cancelBubble = $JSCompiler_alias_TRUE$$
};
$JSCompiler_prototypeAlias$$.preventDefault = function $$JSCompiler_prototypeAlias$$$preventDefault$() {
  $goog$events$BrowserEvent$$.$superClass_$.preventDefault.call(this);
  var $be$$ = this.$event_$;
  if($be$$.preventDefault) {
    $be$$.preventDefault()
  }else {
    if($be$$.returnValue = $JSCompiler_alias_FALSE$$, $goog$events$BrowserFeature$SET_KEY_CODE_TO_PREVENT_DEFAULT$$) {
      try {
        if($be$$.ctrlKey || 112 <= $be$$.keyCode && 123 >= $be$$.keyCode) {
          $be$$.keyCode = -1
        }
      }catch($ex$$1$$) {
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$getBrowserEvent$ = $JSCompiler_get$$("$event_$");
$JSCompiler_prototypeAlias$$.$disposeInternal$ = $JSCompiler_emptyFn$$();
var $goog$events$listeners_$$ = {}, $goog$events$listenerTree_$$ = {}, $goog$events$sources_$$ = {}, $goog$events$onStringMap_$$ = {};
function $goog$events$listen$$($listenableKey_src$$7$$, $key$$43_type$$61$$, $listener$$35$$, $opt_capt$$2$$, $opt_handler$$1$$) {
  if($goog$isArray$$($key$$43_type$$61$$)) {
    for(var $i$$52$$ = 0;$i$$52$$ < $key$$43_type$$61$$.length;$i$$52$$++) {
      $goog$events$listen$$($listenableKey_src$$7$$, $key$$43_type$$61$$[$i$$52$$], $listener$$35$$, $opt_capt$$2$$, $opt_handler$$1$$)
    }
    return $JSCompiler_alias_NULL$$
  }
  $listenableKey_src$$7$$ = $goog$events$listen_$$($listenableKey_src$$7$$, $key$$43_type$$61$$, $listener$$35$$, $JSCompiler_alias_FALSE$$, $opt_capt$$2$$, $opt_handler$$1$$);
  $key$$43_type$$61$$ = $listenableKey_src$$7$$.key;
  $goog$events$listeners_$$[$key$$43_type$$61$$] = $listenableKey_src$$7$$;
  return $key$$43_type$$61$$
}
function $goog$events$listen_$$($src$$8$$, $type$$62$$, $listener$$36$$, $callOnce$$, $capture$$1_opt_capt$$3$$, $opt_handler$$2$$) {
  $type$$62$$ || $JSCompiler_alias_THROW$$(Error("Invalid event type"));
  $capture$$1_opt_capt$$3$$ = !!$capture$$1_opt_capt$$3$$;
  var $listenerObj_map$$ = $goog$events$listenerTree_$$;
  $type$$62$$ in $listenerObj_map$$ || ($listenerObj_map$$[$type$$62$$] = {$count_$:0, $remaining_$:0});
  $listenerObj_map$$ = $listenerObj_map$$[$type$$62$$];
  $capture$$1_opt_capt$$3$$ in $listenerObj_map$$ || ($listenerObj_map$$[$capture$$1_opt_capt$$3$$] = {$count_$:0, $remaining_$:0}, $listenerObj_map$$.$count_$++);
  var $listenerObj_map$$ = $listenerObj_map$$[$capture$$1_opt_capt$$3$$], $srcUid$$ = $goog$getUid$$($src$$8$$), $listenerArray$$;
  $listenerObj_map$$.$remaining_$++;
  if($listenerObj_map$$[$srcUid$$]) {
    $listenerArray$$ = $listenerObj_map$$[$srcUid$$];
    for(var $i$$53_proxy$$1$$ = 0;$i$$53_proxy$$1$$ < $listenerArray$$.length;$i$$53_proxy$$1$$++) {
      if($listenerObj_map$$ = $listenerArray$$[$i$$53_proxy$$1$$], $listenerObj_map$$.$listener$ == $listener$$36$$ && $listenerObj_map$$.$handler$ == $opt_handler$$2$$) {
        if($listenerObj_map$$.$removed$) {
          break
        }
        $callOnce$$ || ($listenerArray$$[$i$$53_proxy$$1$$].$callOnce$ = $JSCompiler_alias_FALSE$$);
        return $listenerArray$$[$i$$53_proxy$$1$$]
      }
    }
  }else {
    $listenerArray$$ = $listenerObj_map$$[$srcUid$$] = [], $listenerObj_map$$.$count_$++
  }
  $i$$53_proxy$$1$$ = $goog$events$getProxy$$();
  $listenerObj_map$$ = new $goog$events$Listener$$;
  $listenerObj_map$$.$init$($listener$$36$$, $i$$53_proxy$$1$$, $src$$8$$, $type$$62$$, $capture$$1_opt_capt$$3$$, $opt_handler$$2$$);
  $listenerObj_map$$.$callOnce$ = $callOnce$$;
  $i$$53_proxy$$1$$.src = $src$$8$$;
  $i$$53_proxy$$1$$.$listener$ = $listenerObj_map$$;
  $listenerArray$$.push($listenerObj_map$$);
  $goog$events$sources_$$[$srcUid$$] || ($goog$events$sources_$$[$srcUid$$] = []);
  $goog$events$sources_$$[$srcUid$$].push($listenerObj_map$$);
  $src$$8$$.addEventListener ? ($src$$8$$ == $goog$global$$ || !$src$$8$$.$customEvent_$) && $src$$8$$.addEventListener($type$$62$$, $i$$53_proxy$$1$$, $capture$$1_opt_capt$$3$$) : $src$$8$$.attachEvent($type$$62$$ in $goog$events$onStringMap_$$ ? $goog$events$onStringMap_$$[$type$$62$$] : $goog$events$onStringMap_$$[$type$$62$$] = "on" + $type$$62$$, $i$$53_proxy$$1$$);
  return $listenerObj_map$$
}
function $goog$events$getProxy$$() {
  var $proxyCallbackFunction$$ = $goog$events$handleBrowserEvent_$$, $f$$26$$ = $goog$events$BrowserFeature$HAS_W3C_EVENT_SUPPORT$$ ? function($eventObject$$1$$) {
    return $proxyCallbackFunction$$.call($f$$26$$.src, $f$$26$$.$listener$, $eventObject$$1$$)
  } : function($eventObject$$2_v$$) {
    $eventObject$$2_v$$ = $proxyCallbackFunction$$.call($f$$26$$.src, $f$$26$$.$listener$, $eventObject$$2_v$$);
    if(!$eventObject$$2_v$$) {
      return $eventObject$$2_v$$
    }
  };
  return $f$$26$$
}
function $goog$events$listenOnce$$($listenableKey$$1_src$$9$$, $type$$63$$, $listener$$37$$, $opt_capt$$4$$, $opt_handler$$3$$) {
  if($goog$isArray$$($type$$63$$)) {
    for(var $i$$54$$ = 0;$i$$54$$ < $type$$63$$.length;$i$$54$$++) {
      $goog$events$listenOnce$$($listenableKey$$1_src$$9$$, $type$$63$$[$i$$54$$], $listener$$37$$, $opt_capt$$4$$, $opt_handler$$3$$)
    }
  }else {
    $listenableKey$$1_src$$9$$ = $goog$events$listen_$$($listenableKey$$1_src$$9$$, $type$$63$$, $listener$$37$$, $JSCompiler_alias_TRUE$$, $opt_capt$$4$$, $opt_handler$$3$$), $goog$events$listeners_$$[$listenableKey$$1_src$$9$$.key] = $listenableKey$$1_src$$9$$
  }
}
function $goog$events$unlisten$$($listenerArray$$1_src$$11$$, $type$$64$$, $listener$$39$$, $capture$$2_opt_capt$$6$$, $opt_handler$$5$$) {
  if($goog$isArray$$($type$$64$$)) {
    for(var $i$$55$$ = 0;$i$$55$$ < $type$$64$$.length;$i$$55$$++) {
      $goog$events$unlisten$$($listenerArray$$1_src$$11$$, $type$$64$$[$i$$55$$], $listener$$39$$, $capture$$2_opt_capt$$6$$, $opt_handler$$5$$)
    }
  }else {
    if($capture$$2_opt_capt$$6$$ = !!$capture$$2_opt_capt$$6$$, $listenerArray$$1_src$$11$$ = $goog$events$getListeners_$$($listenerArray$$1_src$$11$$, $type$$64$$, $capture$$2_opt_capt$$6$$)) {
      for($i$$55$$ = 0;$i$$55$$ < $listenerArray$$1_src$$11$$.length;$i$$55$$++) {
        if($listenerArray$$1_src$$11$$[$i$$55$$].$listener$ == $listener$$39$$ && $listenerArray$$1_src$$11$$[$i$$55$$].capture == $capture$$2_opt_capt$$6$$ && $listenerArray$$1_src$$11$$[$i$$55$$].$handler$ == $opt_handler$$5$$) {
          $goog$events$unlistenByKey$$($listenerArray$$1_src$$11$$[$i$$55$$].key);
          break
        }
      }
    }
  }
}
function $goog$events$unlistenByKey$$($key$$45$$) {
  var $listener$$40_listenerArray$$2$$ = $goog$events$listeners_$$[$key$$45$$];
  if(!$listener$$40_listenerArray$$2$$ || $listener$$40_listenerArray$$2$$.$removed$) {
    return $JSCompiler_alias_FALSE$$
  }
  var $src$$12_srcUid$$1$$ = $listener$$40_listenerArray$$2$$.src, $type$$65$$ = $listener$$40_listenerArray$$2$$.type, $proxy$$2_sourcesArray$$ = $listener$$40_listenerArray$$2$$.$proxy$, $capture$$3$$ = $listener$$40_listenerArray$$2$$.capture;
  $src$$12_srcUid$$1$$.removeEventListener ? ($src$$12_srcUid$$1$$ == $goog$global$$ || !$src$$12_srcUid$$1$$.$customEvent_$) && $src$$12_srcUid$$1$$.removeEventListener($type$$65$$, $proxy$$2_sourcesArray$$, $capture$$3$$) : $src$$12_srcUid$$1$$.detachEvent && $src$$12_srcUid$$1$$.detachEvent($type$$65$$ in $goog$events$onStringMap_$$ ? $goog$events$onStringMap_$$[$type$$65$$] : $goog$events$onStringMap_$$[$type$$65$$] = "on" + $type$$65$$, $proxy$$2_sourcesArray$$);
  $src$$12_srcUid$$1$$ = $goog$getUid$$($src$$12_srcUid$$1$$);
  $goog$events$sources_$$[$src$$12_srcUid$$1$$] && ($proxy$$2_sourcesArray$$ = $goog$events$sources_$$[$src$$12_srcUid$$1$$], $goog$array$remove$$($proxy$$2_sourcesArray$$, $listener$$40_listenerArray$$2$$), 0 == $proxy$$2_sourcesArray$$.length && delete $goog$events$sources_$$[$src$$12_srcUid$$1$$]);
  $listener$$40_listenerArray$$2$$.$removed$ = $JSCompiler_alias_TRUE$$;
  if($listener$$40_listenerArray$$2$$ = $goog$events$listenerTree_$$[$type$$65$$][$capture$$3$$][$src$$12_srcUid$$1$$]) {
    $listener$$40_listenerArray$$2$$.$needsCleanup_$ = $JSCompiler_alias_TRUE$$, $goog$events$cleanUp_$$($type$$65$$, $capture$$3$$, $src$$12_srcUid$$1$$, $listener$$40_listenerArray$$2$$)
  }
  delete $goog$events$listeners_$$[$key$$45$$];
  return $JSCompiler_alias_TRUE$$
}
function $goog$events$cleanUp_$$($type$$66$$, $capture$$4$$, $srcUid$$2$$, $listenerArray$$3$$) {
  if(!$listenerArray$$3$$.$locked_$ && $listenerArray$$3$$.$needsCleanup_$) {
    for(var $oldIndex$$ = 0, $newIndex$$ = 0;$oldIndex$$ < $listenerArray$$3$$.length;$oldIndex$$++) {
      $listenerArray$$3$$[$oldIndex$$].$removed$ ? $listenerArray$$3$$[$oldIndex$$].$proxy$.src = $JSCompiler_alias_NULL$$ : ($oldIndex$$ != $newIndex$$ && ($listenerArray$$3$$[$newIndex$$] = $listenerArray$$3$$[$oldIndex$$]), $newIndex$$++)
    }
    $listenerArray$$3$$.length = $newIndex$$;
    $listenerArray$$3$$.$needsCleanup_$ = $JSCompiler_alias_FALSE$$;
    0 == $newIndex$$ && (delete $goog$events$listenerTree_$$[$type$$66$$][$capture$$4$$][$srcUid$$2$$], $goog$events$listenerTree_$$[$type$$66$$][$capture$$4$$].$count_$--, 0 == $goog$events$listenerTree_$$[$type$$66$$][$capture$$4$$].$count_$ && (delete $goog$events$listenerTree_$$[$type$$66$$][$capture$$4$$], $goog$events$listenerTree_$$[$type$$66$$].$count_$--), 0 == $goog$events$listenerTree_$$[$type$$66$$].$count_$ && delete $goog$events$listenerTree_$$[$type$$66$$])
  }
}
function $goog$events$removeAll$$($opt_obj$$27_sourcesArray$$1_srcUid$$3$$) {
  var $count$$8$$ = 0;
  if($opt_obj$$27_sourcesArray$$1_srcUid$$3$$ != $JSCompiler_alias_NULL$$) {
    if($opt_obj$$27_sourcesArray$$1_srcUid$$3$$ = $goog$getUid$$($opt_obj$$27_sourcesArray$$1_srcUid$$3$$), $goog$events$sources_$$[$opt_obj$$27_sourcesArray$$1_srcUid$$3$$]) {
      $opt_obj$$27_sourcesArray$$1_srcUid$$3$$ = $goog$events$sources_$$[$opt_obj$$27_sourcesArray$$1_srcUid$$3$$];
      for(var $i$$56$$ = $opt_obj$$27_sourcesArray$$1_srcUid$$3$$.length - 1;0 <= $i$$56$$;$i$$56$$--) {
        $goog$events$unlistenByKey$$($opt_obj$$27_sourcesArray$$1_srcUid$$3$$[$i$$56$$].key), $count$$8$$++
      }
    }
  }else {
    $goog$object$forEach$$($goog$events$listeners_$$, function($listener$$43$$, $key$$46$$) {
      $goog$events$unlistenByKey$$($key$$46$$);
      $count$$8$$++
    })
  }
}
function $goog$events$getListeners_$$($obj$$66_objUid$$, $type$$68$$, $capture$$6$$) {
  var $map$$1$$ = $goog$events$listenerTree_$$;
  return $type$$68$$ in $map$$1$$ && ($map$$1$$ = $map$$1$$[$type$$68$$], $capture$$6$$ in $map$$1$$ && ($map$$1$$ = $map$$1$$[$capture$$6$$], $obj$$66_objUid$$ = $goog$getUid$$($obj$$66_objUid$$), $map$$1$$[$obj$$66_objUid$$])) ? $map$$1$$[$obj$$66_objUid$$] : $JSCompiler_alias_NULL$$
}
function $goog$events$fireListeners_$$($map$$4$$, $obj$$69_objUid$$2$$, $type$$72$$, $capture$$9$$, $eventObject$$4$$) {
  var $retval$$ = 1;
  $obj$$69_objUid$$2$$ = $goog$getUid$$($obj$$69_objUid$$2$$);
  if($map$$4$$[$obj$$69_objUid$$2$$]) {
    var $remaining$$ = --$map$$4$$.$remaining_$, $listenerArray$$5$$ = $map$$4$$[$obj$$69_objUid$$2$$];
    $listenerArray$$5$$.$locked_$ ? $listenerArray$$5$$.$locked_$++ : $listenerArray$$5$$.$locked_$ = 1;
    try {
      for(var $length$$16$$ = $listenerArray$$5$$.length, $i$$58$$ = 0;$i$$58$$ < $length$$16$$;$i$$58$$++) {
        var $listener$$46$$ = $listenerArray$$5$$[$i$$58$$];
        $listener$$46$$ && !$listener$$46$$.$removed$ && ($retval$$ &= $goog$events$fireListener$$($listener$$46$$, $eventObject$$4$$) !== $JSCompiler_alias_FALSE$$)
      }
    }finally {
      $map$$4$$.$remaining_$ = Math.max($remaining$$, $map$$4$$.$remaining_$), $listenerArray$$5$$.$locked_$--, $goog$events$cleanUp_$$($type$$72$$, $capture$$9$$, $obj$$69_objUid$$2$$, $listenerArray$$5$$)
    }
  }
  return Boolean($retval$$)
}
function $goog$events$fireListener$$($listener$$47$$, $eventObject$$5$$) {
  $listener$$47$$.$callOnce$ && $goog$events$unlistenByKey$$($listener$$47$$.key);
  return $listener$$47$$.handleEvent($eventObject$$5$$)
}
function $goog$events$dispatchEvent$$($src$$15$$, $e$$17$$) {
  var $hasCapture$$1_type$$73$$ = $e$$17$$.type || $e$$17$$, $current$$1_map$$5$$ = $goog$events$listenerTree_$$;
  if(!($hasCapture$$1_type$$73$$ in $current$$1_map$$5$$)) {
    return $JSCompiler_alias_TRUE$$
  }
  if($goog$isString$$($e$$17$$)) {
    $e$$17$$ = new $goog$events$Event$$($e$$17$$, $src$$15$$)
  }else {
    if($e$$17$$ instanceof $goog$events$Event$$) {
      $e$$17$$.target = $e$$17$$.target || $src$$15$$
    }else {
      var $oldEvent_rv$$8$$ = $e$$17$$;
      $e$$17$$ = new $goog$events$Event$$($hasCapture$$1_type$$73$$, $src$$15$$);
      $goog$object$extend$$($e$$17$$, $oldEvent_rv$$8$$)
    }
  }
  var $oldEvent_rv$$8$$ = 1, $ancestors$$, $current$$1_map$$5$$ = $current$$1_map$$5$$[$hasCapture$$1_type$$73$$], $hasCapture$$1_type$$73$$ = $JSCompiler_alias_TRUE$$ in $current$$1_map$$5$$, $parent$$2_targetsMap$$;
  if($hasCapture$$1_type$$73$$) {
    $ancestors$$ = [];
    for($parent$$2_targetsMap$$ = $src$$15$$;$parent$$2_targetsMap$$;$parent$$2_targetsMap$$ = $parent$$2_targetsMap$$.$parentEventTarget_$) {
      $ancestors$$.push($parent$$2_targetsMap$$)
    }
    $parent$$2_targetsMap$$ = $current$$1_map$$5$$[$JSCompiler_alias_TRUE$$];
    $parent$$2_targetsMap$$.$remaining_$ = $parent$$2_targetsMap$$.$count_$;
    for(var $i$$59$$ = $ancestors$$.length - 1;!$e$$17$$.$propagationStopped_$ && 0 <= $i$$59$$ && $parent$$2_targetsMap$$.$remaining_$;$i$$59$$--) {
      $e$$17$$.currentTarget = $ancestors$$[$i$$59$$], $oldEvent_rv$$8$$ &= $goog$events$fireListeners_$$($parent$$2_targetsMap$$, $ancestors$$[$i$$59$$], $e$$17$$.type, $JSCompiler_alias_TRUE$$, $e$$17$$) && $e$$17$$.$returnValue_$ != $JSCompiler_alias_FALSE$$
    }
  }
  if($JSCompiler_alias_FALSE$$ in $current$$1_map$$5$$) {
    if($parent$$2_targetsMap$$ = $current$$1_map$$5$$[$JSCompiler_alias_FALSE$$], $parent$$2_targetsMap$$.$remaining_$ = $parent$$2_targetsMap$$.$count_$, $hasCapture$$1_type$$73$$) {
      for($i$$59$$ = 0;!$e$$17$$.$propagationStopped_$ && $i$$59$$ < $ancestors$$.length && $parent$$2_targetsMap$$.$remaining_$;$i$$59$$++) {
        $e$$17$$.currentTarget = $ancestors$$[$i$$59$$], $oldEvent_rv$$8$$ &= $goog$events$fireListeners_$$($parent$$2_targetsMap$$, $ancestors$$[$i$$59$$], $e$$17$$.type, $JSCompiler_alias_FALSE$$, $e$$17$$) && $e$$17$$.$returnValue_$ != $JSCompiler_alias_FALSE$$
      }
    }else {
      for($current$$1_map$$5$$ = $src$$15$$;!$e$$17$$.$propagationStopped_$ && $current$$1_map$$5$$ && $parent$$2_targetsMap$$.$remaining_$;$current$$1_map$$5$$ = $current$$1_map$$5$$.$parentEventTarget_$) {
        $e$$17$$.currentTarget = $current$$1_map$$5$$, $oldEvent_rv$$8$$ &= $goog$events$fireListeners_$$($parent$$2_targetsMap$$, $current$$1_map$$5$$, $e$$17$$.type, $JSCompiler_alias_FALSE$$, $e$$17$$) && $e$$17$$.$returnValue_$ != $JSCompiler_alias_FALSE$$
      }
    }
  }
  return Boolean($oldEvent_rv$$8$$)
}
function $goog$events$handleBrowserEvent_$$($listener$$48$$, $opt_evt$$) {
  if($listener$$48$$.$removed$) {
    return $JSCompiler_alias_TRUE$$
  }
  var $be$$1_type$$74$$ = $listener$$48$$.type, $map$$6$$ = $goog$events$listenerTree_$$;
  if(!($be$$1_type$$74$$ in $map$$6$$)) {
    return $JSCompiler_alias_TRUE$$
  }
  var $map$$6$$ = $map$$6$$[$be$$1_type$$74$$], $ieEvent_retval$$1$$, $targetsMap$$1$$;
  if(!$goog$events$BrowserFeature$HAS_W3C_EVENT_SUPPORT$$) {
    $ieEvent_retval$$1$$ = $opt_evt$$ || $goog$getObjectByName$$("window.event");
    var $hasCapture$$2$$ = $JSCompiler_alias_TRUE$$ in $map$$6$$, $hasBubble$$1$$ = $JSCompiler_alias_FALSE$$ in $map$$6$$;
    if($hasCapture$$2$$) {
      if(0 > $ieEvent_retval$$1$$.keyCode || $ieEvent_retval$$1$$.returnValue != $JSCompiler_alias_VOID$$) {
        return $JSCompiler_alias_TRUE$$
      }
      a: {
        var $evt$$16_useReturnValue$$inline_120$$ = $JSCompiler_alias_FALSE$$;
        if(0 == $ieEvent_retval$$1$$.keyCode) {
          try {
            $ieEvent_retval$$1$$.keyCode = -1;
            break a
          }catch($ex$$inline_121$$) {
            $evt$$16_useReturnValue$$inline_120$$ = $JSCompiler_alias_TRUE$$
          }
        }
        if($evt$$16_useReturnValue$$inline_120$$ || $ieEvent_retval$$1$$.returnValue == $JSCompiler_alias_VOID$$) {
          $ieEvent_retval$$1$$.returnValue = $JSCompiler_alias_TRUE$$
        }
      }
    }
    $evt$$16_useReturnValue$$inline_120$$ = new $goog$events$BrowserEvent$$;
    $evt$$16_useReturnValue$$inline_120$$.$init$($ieEvent_retval$$1$$, this);
    $ieEvent_retval$$1$$ = $JSCompiler_alias_TRUE$$;
    try {
      if($hasCapture$$2$$) {
        for(var $ancestors$$1$$ = [], $parent$$3$$ = $evt$$16_useReturnValue$$inline_120$$.currentTarget;$parent$$3$$;$parent$$3$$ = $parent$$3$$.parentNode) {
          $ancestors$$1$$.push($parent$$3$$)
        }
        $targetsMap$$1$$ = $map$$6$$[$JSCompiler_alias_TRUE$$];
        $targetsMap$$1$$.$remaining_$ = $targetsMap$$1$$.$count_$;
        for(var $i$$60$$ = $ancestors$$1$$.length - 1;!$evt$$16_useReturnValue$$inline_120$$.$propagationStopped_$ && 0 <= $i$$60$$ && $targetsMap$$1$$.$remaining_$;$i$$60$$--) {
          $evt$$16_useReturnValue$$inline_120$$.currentTarget = $ancestors$$1$$[$i$$60$$], $ieEvent_retval$$1$$ &= $goog$events$fireListeners_$$($targetsMap$$1$$, $ancestors$$1$$[$i$$60$$], $be$$1_type$$74$$, $JSCompiler_alias_TRUE$$, $evt$$16_useReturnValue$$inline_120$$)
        }
        if($hasBubble$$1$$) {
          $targetsMap$$1$$ = $map$$6$$[$JSCompiler_alias_FALSE$$];
          $targetsMap$$1$$.$remaining_$ = $targetsMap$$1$$.$count_$;
          for($i$$60$$ = 0;!$evt$$16_useReturnValue$$inline_120$$.$propagationStopped_$ && $i$$60$$ < $ancestors$$1$$.length && $targetsMap$$1$$.$remaining_$;$i$$60$$++) {
            $evt$$16_useReturnValue$$inline_120$$.currentTarget = $ancestors$$1$$[$i$$60$$], $ieEvent_retval$$1$$ &= $goog$events$fireListeners_$$($targetsMap$$1$$, $ancestors$$1$$[$i$$60$$], $be$$1_type$$74$$, $JSCompiler_alias_FALSE$$, $evt$$16_useReturnValue$$inline_120$$)
          }
        }
      }else {
        $ieEvent_retval$$1$$ = $goog$events$fireListener$$($listener$$48$$, $evt$$16_useReturnValue$$inline_120$$)
      }
    }finally {
      $ancestors$$1$$ && ($ancestors$$1$$.length = 0)
    }
    return $ieEvent_retval$$1$$
  }
  $be$$1_type$$74$$ = new $goog$events$BrowserEvent$$($opt_evt$$, this);
  return $ieEvent_retval$$1$$ = $goog$events$fireListener$$($listener$$48$$, $be$$1_type$$74$$)
}
;var $goog$i18n$DateTimeSymbols_en$$ = {$ERAS$:["BC", "AD"], $ERANAMES$:["Before Christ", "Anno Domini"], $NARROWMONTHS$:"JFMAMJJASOND".split(""), $STANDALONENARROWMONTHS$:"JFMAMJJASOND".split(""), $MONTHS$:"January February March April May June July August September October November December".split(" "), $STANDALONEMONTHS$:"January February March April May June July August September October November December".split(" "), $SHORTMONTHS$:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), 
$STANDALONESHORTMONTHS$:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), $WEEKDAYS$:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), $STANDALONEWEEKDAYS$:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), $SHORTWEEKDAYS$:"Sun Mon Tue Wed Thu Fri Sat".split(" "), $STANDALONESHORTWEEKDAYS$:"Sun Mon Tue Wed Thu Fri Sat".split(" "), $NARROWWEEKDAYS$:"SMTWTFS".split(""), $STANDALONENARROWWEEKDAYS$:"SMTWTFS".split(""), $SHORTQUARTERS$:["Q1", "Q2", 
"Q3", "Q4"], $QUARTERS$:["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"], $AMPMS$:["AM", "PM"], $DATEFORMATS$:["EEEE, MMMM d, y", "MMMM d, y", "MMM d, y", "M/d/yy"], $TIMEFORMATS$:["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"], $FIRSTDAYOFWEEK$:6, $WEEKENDRANGE$:[5, 6], $FIRSTWEEKCUTOFFDAY$:5};
function $goog$date$isLeapYear$$($year$$1$$) {
  return 0 == $year$$1$$ % 4 && (0 != $year$$1$$ % 100 || 0 == $year$$1$$ % 400)
}
function $goog$date$getNumberOfDaysInMonth$$($year$$3$$, $month$$1$$) {
  switch($month$$1$$) {
    case 1:
      return $goog$date$isLeapYear$$($year$$3$$) ? 29 : 28;
    case 5:
    ;
    case 8:
    ;
    case 10:
    ;
    case 3:
      return 30
  }
  return 31
}
function $goog$date$Interval$$($opt_years$$, $opt_months$$, $opt_days$$, $opt_hours$$1$$, $opt_minutes$$, $opt_seconds$$) {
  $goog$isString$$($opt_years$$) ? (this.$years$ = $opt_years$$ == $goog$date$Interval$YEARS$$ ? $opt_months$$ : 0, this.$months$ = $opt_years$$ == $goog$date$Interval$MONTHS$$ ? $opt_months$$ : 0, this.$days$ = $opt_years$$ == $goog$date$Interval$DAYS$$ ? $opt_months$$ : 0, this.$hours$ = $opt_years$$ == $goog$date$Interval$HOURS$$ ? $opt_months$$ : 0, this.$minutes$ = $opt_years$$ == $goog$date$Interval$MINUTES$$ ? $opt_months$$ : 0, this.$seconds$ = $opt_years$$ == $goog$date$Interval$SECONDS$$ ? 
  $opt_months$$ : 0) : (this.$years$ = $opt_years$$ || 0, this.$months$ = $opt_months$$ || 0, this.$days$ = $opt_days$$ || 0, this.$hours$ = $opt_hours$$1$$ || 0, this.$minutes$ = $opt_minutes$$ || 0, this.$seconds$ = $opt_seconds$$ || 0)
}
$goog$date$Interval$$.prototype.$toIsoString$ = function $$goog$date$Interval$$$$$toIsoString$$($opt_verbose$$) {
  var $minField$$ = Math.min(this.$years$, this.$months$, this.$days$, this.$hours$, this.$minutes$, this.$seconds$), $maxField_res$$7$$ = Math.max(this.$years$, this.$months$, this.$days$, this.$hours$, this.$minutes$, this.$seconds$);
  if(0 > $minField$$ && 0 < $maxField_res$$7$$) {
    return $JSCompiler_alias_NULL$$
  }
  if(!$opt_verbose$$ && 0 == $minField$$ && 0 == $maxField_res$$7$$) {
    return"PT0S"
  }
  $maxField_res$$7$$ = [];
  0 > $minField$$ && $maxField_res$$7$$.push("-");
  $maxField_res$$7$$.push("P");
  (this.$years$ || $opt_verbose$$) && $maxField_res$$7$$.push(Math.abs(this.$years$) + "Y");
  (this.$months$ || $opt_verbose$$) && $maxField_res$$7$$.push(Math.abs(this.$months$) + "M");
  (this.$days$ || $opt_verbose$$) && $maxField_res$$7$$.push(Math.abs(this.$days$) + "D");
  if(this.$hours$ || this.$minutes$ || this.$seconds$ || $opt_verbose$$) {
    $maxField_res$$7$$.push("T"), (this.$hours$ || $opt_verbose$$) && $maxField_res$$7$$.push(Math.abs(this.$hours$) + "H"), (this.$minutes$ || $opt_verbose$$) && $maxField_res$$7$$.push(Math.abs(this.$minutes$) + "M"), (this.$seconds$ || $opt_verbose$$) && $maxField_res$$7$$.push(Math.abs(this.$seconds$) + "S")
  }
  return $maxField_res$$7$$.join("")
};
$goog$date$Interval$$.prototype.$equals$ = function $$goog$date$Interval$$$$$equals$$($other$$4$$) {
  return $other$$4$$.$years$ == this.$years$ && $other$$4$$.$months$ == this.$months$ && $other$$4$$.$days$ == this.$days$ && $other$$4$$.$hours$ == this.$hours$ && $other$$4$$.$minutes$ == this.$minutes$ && $other$$4$$.$seconds$ == this.$seconds$
};
$goog$date$Interval$$.prototype.$clone$ = function $$goog$date$Interval$$$$$clone$$() {
  return new $goog$date$Interval$$(this.$years$, this.$months$, this.$days$, this.$hours$, this.$minutes$, this.$seconds$)
};
var $goog$date$Interval$YEARS$$ = "y", $goog$date$Interval$MONTHS$$ = "m", $goog$date$Interval$DAYS$$ = "d", $goog$date$Interval$HOURS$$ = "h", $goog$date$Interval$MINUTES$$ = "n", $goog$date$Interval$SECONDS$$ = "s";
$goog$date$Interval$$.prototype.add = function $$goog$date$Interval$$$$add$($interval$$2$$) {
  this.$years$ += $interval$$2$$.$years$;
  this.$months$ += $interval$$2$$.$months$;
  this.$days$ += $interval$$2$$.$days$;
  this.$hours$ += $interval$$2$$.$hours$;
  this.$minutes$ += $interval$$2$$.$minutes$;
  this.$seconds$ += $interval$$2$$.$seconds$
};
function $goog$date$Date$$($opt_year$$, $opt_month$$, $opt_date$$1$$) {
  $goog$isNumber$$($opt_year$$) ? (this.$date_$ = new Date($opt_year$$, $opt_month$$ || 0, $opt_date$$1$$ || 1), $JSCompiler_StaticMethods_maybeFixDst_$$(this, $opt_date$$1$$ || 1)) : $goog$isObject$$($opt_year$$) ? (this.$date_$ = new Date($opt_year$$.getFullYear(), $opt_year$$.getMonth(), $opt_year$$.getDate()), $JSCompiler_StaticMethods_maybeFixDst_$$(this, $opt_year$$.getDate())) : (this.$date_$ = new Date($goog$now$$()), this.$date_$.setHours(0), this.$date_$.setMinutes(0), this.$date_$.setSeconds(0), 
  this.$date_$.setMilliseconds(0))
}
$JSCompiler_prototypeAlias$$ = $goog$date$Date$$.prototype;
$JSCompiler_prototypeAlias$$.$firstDayOfWeek_$ = $goog$i18n$DateTimeSymbols_en$$.$FIRSTDAYOFWEEK$;
$JSCompiler_prototypeAlias$$.$firstWeekCutOffDay_$ = $goog$i18n$DateTimeSymbols_en$$.$FIRSTWEEKCUTOFFDAY$;
$JSCompiler_prototypeAlias$$.$clone$ = function $$JSCompiler_prototypeAlias$$$$clone$$() {
  var $date$$6$$ = new $goog$date$Date$$(this.$date_$);
  $date$$6$$.$firstDayOfWeek_$ = this.$firstDayOfWeek_$;
  $date$$6$$.$firstWeekCutOffDay_$ = this.$firstWeekCutOffDay_$;
  return $date$$6$$
};
$JSCompiler_prototypeAlias$$.getFullYear = function $$JSCompiler_prototypeAlias$$$getFullYear$() {
  return this.$date_$.getFullYear()
};
$JSCompiler_prototypeAlias$$.getYear = function $$JSCompiler_prototypeAlias$$$getYear$() {
  return this.getFullYear()
};
$JSCompiler_prototypeAlias$$.getMonth = function $$JSCompiler_prototypeAlias$$$getMonth$() {
  return this.$date_$.getMonth()
};
$JSCompiler_prototypeAlias$$.getDate = function $$JSCompiler_prototypeAlias$$$getDate$() {
  return this.$date_$.getDate()
};
$JSCompiler_prototypeAlias$$.getTime = function $$JSCompiler_prototypeAlias$$$getTime$() {
  return this.$date_$.getTime()
};
$JSCompiler_prototypeAlias$$.getDay = function $$JSCompiler_prototypeAlias$$$getDay$() {
  return this.$date_$.getDay()
};
function $JSCompiler_StaticMethods_getWeekday$$($JSCompiler_StaticMethods_getWeekday$self$$) {
  return(($JSCompiler_StaticMethods_getWeekday$self$$.getDay() + 6) % 7 - $JSCompiler_StaticMethods_getWeekday$self$$.$firstDayOfWeek_$ + 7) % 7
}
$JSCompiler_prototypeAlias$$.getUTCFullYear = function $$JSCompiler_prototypeAlias$$$getUTCFullYear$() {
  return this.$date_$.getUTCFullYear()
};
$JSCompiler_prototypeAlias$$.getUTCMonth = function $$JSCompiler_prototypeAlias$$$getUTCMonth$() {
  return this.$date_$.getUTCMonth()
};
$JSCompiler_prototypeAlias$$.getUTCDate = function $$JSCompiler_prototypeAlias$$$getUTCDate$() {
  return this.$date_$.getUTCDate()
};
$JSCompiler_prototypeAlias$$.getUTCHours = function $$JSCompiler_prototypeAlias$$$getUTCHours$() {
  return this.$date_$.getUTCHours()
};
$JSCompiler_prototypeAlias$$.getUTCMinutes = function $$JSCompiler_prototypeAlias$$$getUTCMinutes$() {
  return this.$date_$.getUTCMinutes()
};
$JSCompiler_prototypeAlias$$.$getWeekNumber$ = function $$JSCompiler_prototypeAlias$$$$getWeekNumber$$() {
  var $cutoffSameWeek$$inline_131_d$$inline_129$$ = new Date(this.getFullYear(), this.getMonth(), this.getDate()), $firstday$$inline_130$$ = this.$firstDayOfWeek_$ || 0, $cutoffSameWeek$$inline_131_d$$inline_129$$ = $cutoffSameWeek$$inline_131_d$$inline_129$$.valueOf() + 864E5 * (((this.$firstWeekCutOffDay_$ || 3) - $firstday$$inline_130$$ + 7) % 7 - (($cutoffSameWeek$$inline_131_d$$inline_129$$.getDay() + 6) % 7 - $firstday$$inline_130$$ + 7) % 7);
  return Math.floor(Math.round(($cutoffSameWeek$$inline_131_d$$inline_129$$ - (new Date((new Date($cutoffSameWeek$$inline_131_d$$inline_129$$)).getFullYear(), 0, 1)).valueOf()) / 864E5) / 7) + 1
};
$JSCompiler_prototypeAlias$$.$getDayOfYear$ = function $$JSCompiler_prototypeAlias$$$$getDayOfYear$$() {
  for(var $dayOfYear$$1$$ = this.getDate(), $year$$6$$ = this.getFullYear(), $m$$ = this.getMonth() - 1;0 <= $m$$;$m$$--) {
    $dayOfYear$$1$$ += $goog$date$getNumberOfDaysInMonth$$($year$$6$$, $m$$)
  }
  return $dayOfYear$$1$$
};
$JSCompiler_prototypeAlias$$.getTimezoneOffset = function $$JSCompiler_prototypeAlias$$$getTimezoneOffset$() {
  return this.$date_$.getTimezoneOffset()
};
function $JSCompiler_StaticMethods_getTimezoneOffsetString$$($JSCompiler_StaticMethods_getTimezoneOffsetString$self_offset$$16_tz$$) {
  $JSCompiler_StaticMethods_getTimezoneOffsetString$self_offset$$16_tz$$ = $JSCompiler_StaticMethods_getTimezoneOffsetString$self_offset$$16_tz$$.getTimezoneOffset();
  if(0 == $JSCompiler_StaticMethods_getTimezoneOffsetString$self_offset$$16_tz$$) {
    $JSCompiler_StaticMethods_getTimezoneOffsetString$self_offset$$16_tz$$ = "Z"
  }else {
    var $m$$1_n$$7$$ = Math.abs($JSCompiler_StaticMethods_getTimezoneOffsetString$self_offset$$16_tz$$) / 60, $h$$4$$ = Math.floor($m$$1_n$$7$$), $m$$1_n$$7$$ = 60 * ($m$$1_n$$7$$ - $h$$4$$);
    $JSCompiler_StaticMethods_getTimezoneOffsetString$self_offset$$16_tz$$ = (0 < $JSCompiler_StaticMethods_getTimezoneOffsetString$self_offset$$16_tz$$ ? "-" : "+") + $goog$string$padNumber$$($h$$4$$, 2) + ":" + $goog$string$padNumber$$($m$$1_n$$7$$, 2)
  }
  return $JSCompiler_StaticMethods_getTimezoneOffsetString$self_offset$$16_tz$$
}
$JSCompiler_prototypeAlias$$.set = function $$JSCompiler_prototypeAlias$$$set$($date$$7$$) {
  this.$date_$ = new Date($date$$7$$.getFullYear(), $date$$7$$.getMonth(), $date$$7$$.getDate())
};
$JSCompiler_prototypeAlias$$.setFullYear = function $$JSCompiler_prototypeAlias$$$setFullYear$($year$$7$$) {
  this.$date_$.setFullYear($year$$7$$)
};
$JSCompiler_prototypeAlias$$.setYear = function $$JSCompiler_prototypeAlias$$$setYear$($year$$8$$) {
  this.setFullYear($year$$8$$)
};
$JSCompiler_prototypeAlias$$.setMonth = function $$JSCompiler_prototypeAlias$$$setMonth$($month$$4$$) {
  this.$date_$.setMonth($month$$4$$)
};
$JSCompiler_prototypeAlias$$.setDate = function $$JSCompiler_prototypeAlias$$$setDate$($date$$8$$) {
  this.$date_$.setDate($date$$8$$)
};
$JSCompiler_prototypeAlias$$.setTime = function $$JSCompiler_prototypeAlias$$$setTime$($ms$$) {
  this.$date_$.setTime($ms$$)
};
$JSCompiler_prototypeAlias$$.add = function $$JSCompiler_prototypeAlias$$$add$($interval$$3_result$$5$$) {
  if($interval$$3_result$$5$$.$years$ || $interval$$3_result$$5$$.$months$) {
    var $month$$6$$ = this.getMonth() + $interval$$3_result$$5$$.$months$ + 12 * $interval$$3_result$$5$$.$years$, $year$$10$$ = this.getYear() + Math.floor($month$$6$$ / 12), $month$$6$$ = $month$$6$$ % 12;
    0 > $month$$6$$ && ($month$$6$$ += 12);
    var $date$$10$$ = Math.min($goog$date$getNumberOfDaysInMonth$$($year$$10$$, $month$$6$$), this.getDate());
    this.setDate(1);
    this.setFullYear($year$$10$$);
    this.setMonth($month$$6$$);
    this.setDate($date$$10$$)
  }
  $interval$$3_result$$5$$.$days$ && ($interval$$3_result$$5$$ = new Date((new Date(this.getYear(), this.getMonth(), this.getDate(), 12)).getTime() + 864E5 * $interval$$3_result$$5$$.$days$), this.setDate(1), this.setFullYear($interval$$3_result$$5$$.getFullYear()), this.setMonth($interval$$3_result$$5$$.getMonth()), this.setDate($interval$$3_result$$5$$.getDate()), $JSCompiler_StaticMethods_maybeFixDst_$$(this, $interval$$3_result$$5$$.getDate()))
};
$JSCompiler_prototypeAlias$$.$toIsoString$ = function $$JSCompiler_prototypeAlias$$$$toIsoString$$($opt_verbose$$1$$, $opt_tz$$) {
  return[this.getFullYear(), $goog$string$padNumber$$(this.getMonth() + 1, 2), $goog$string$padNumber$$(this.getDate(), 2)].join($opt_verbose$$1$$ ? "-" : "") + ($opt_tz$$ ? $JSCompiler_StaticMethods_getTimezoneOffsetString$$(this) : "")
};
$JSCompiler_prototypeAlias$$.$equals$ = function $$JSCompiler_prototypeAlias$$$$equals$$($other$$5$$) {
  return this.getYear() == $other$$5$$.getYear() && this.getMonth() == $other$$5$$.getMonth() && this.getDate() == $other$$5$$.getDate()
};
$JSCompiler_prototypeAlias$$.toString = function $$JSCompiler_prototypeAlias$$$toString$() {
  return this.$toIsoString$()
};
function $JSCompiler_StaticMethods_maybeFixDst_$$($JSCompiler_StaticMethods_maybeFixDst_$self$$, $expected$$) {
  $JSCompiler_StaticMethods_maybeFixDst_$self$$.getDate() != $expected$$ && $JSCompiler_StaticMethods_maybeFixDst_$self$$.$date_$.setUTCHours($JSCompiler_StaticMethods_maybeFixDst_$self$$.$date_$.getUTCHours() + ($JSCompiler_StaticMethods_maybeFixDst_$self$$.getDate() < $expected$$ ? 1 : -1))
}
$JSCompiler_prototypeAlias$$.valueOf = function $$JSCompiler_prototypeAlias$$$valueOf$() {
  return this.$date_$.valueOf()
};
function $goog$date$DateTime$$($opt_year$$1$$, $opt_month$$1$$, $opt_date$$2$$, $opt_hours$$2$$, $opt_minutes$$1$$, $opt_seconds$$1$$, $opt_milliseconds$$) {
  this.$date_$ = $goog$isNumber$$($opt_year$$1$$) ? new Date($opt_year$$1$$, $opt_month$$1$$ || 0, $opt_date$$2$$ || 1, $opt_hours$$2$$ || 0, $opt_minutes$$1$$ || 0, $opt_seconds$$1$$ || 0, $opt_milliseconds$$ || 0) : new Date($opt_year$$1$$ ? $opt_year$$1$$.getTime() : $goog$now$$())
}
$goog$inherits$$($goog$date$DateTime$$, $goog$date$Date$$);
$JSCompiler_prototypeAlias$$ = $goog$date$DateTime$$.prototype;
$JSCompiler_prototypeAlias$$.getHours = function $$JSCompiler_prototypeAlias$$$getHours$() {
  return this.$date_$.getHours()
};
$JSCompiler_prototypeAlias$$.getMinutes = function $$JSCompiler_prototypeAlias$$$getMinutes$() {
  return this.$date_$.getMinutes()
};
$JSCompiler_prototypeAlias$$.getSeconds = function $$JSCompiler_prototypeAlias$$$getSeconds$() {
  return this.$date_$.getSeconds()
};
$JSCompiler_prototypeAlias$$.getMilliseconds = function $$JSCompiler_prototypeAlias$$$getMilliseconds$() {
  return this.$date_$.getMilliseconds()
};
$JSCompiler_prototypeAlias$$.getUTCHours = function $$JSCompiler_prototypeAlias$$$getUTCHours$() {
  return this.$date_$.getUTCHours()
};
$JSCompiler_prototypeAlias$$.getUTCMinutes = function $$JSCompiler_prototypeAlias$$$getUTCMinutes$() {
  return this.$date_$.getUTCMinutes()
};
$JSCompiler_prototypeAlias$$.setHours = function $$JSCompiler_prototypeAlias$$$setHours$($hours$$1$$) {
  this.$date_$.setHours($hours$$1$$)
};
$JSCompiler_prototypeAlias$$.setMinutes = function $$JSCompiler_prototypeAlias$$$setMinutes$($minutes$$1$$) {
  this.$date_$.setMinutes($minutes$$1$$)
};
$JSCompiler_prototypeAlias$$.setSeconds = function $$JSCompiler_prototypeAlias$$$setSeconds$($seconds$$1$$) {
  this.$date_$.setSeconds($seconds$$1$$)
};
$JSCompiler_prototypeAlias$$.setMilliseconds = function $$JSCompiler_prototypeAlias$$$setMilliseconds$($ms$$1$$) {
  this.$date_$.setMilliseconds($ms$$1$$)
};
$JSCompiler_prototypeAlias$$.setUTCHours = function $$JSCompiler_prototypeAlias$$$setUTCHours$($hours$$2$$) {
  this.$date_$.setUTCHours($hours$$2$$)
};
$JSCompiler_prototypeAlias$$.add = function $$JSCompiler_prototypeAlias$$$add$($interval$$4$$) {
  $goog$date$Date$$.prototype.add.call(this, $interval$$4$$);
  $interval$$4$$.$hours$ && this.setHours(this.$date_$.getHours() + $interval$$4$$.$hours$);
  $interval$$4$$.$minutes$ && this.setMinutes(this.$date_$.getMinutes() + $interval$$4$$.$minutes$);
  $interval$$4$$.$seconds$ && this.setSeconds(this.$date_$.getSeconds() + $interval$$4$$.$seconds$)
};
$JSCompiler_prototypeAlias$$.$toIsoString$ = function $$JSCompiler_prototypeAlias$$$$toIsoString$$($opt_verbose$$3$$, $opt_tz$$2$$) {
  var $dateString$$ = $goog$date$Date$$.prototype.$toIsoString$.call(this, $opt_verbose$$3$$);
  return $opt_verbose$$3$$ ? $dateString$$ + " " + $goog$string$padNumber$$(this.getHours(), 2) + ":" + $goog$string$padNumber$$(this.getMinutes(), 2) + ":" + $goog$string$padNumber$$(this.getSeconds(), 2) + ($opt_tz$$2$$ ? $JSCompiler_StaticMethods_getTimezoneOffsetString$$(this) : "") : $dateString$$ + "T" + $goog$string$padNumber$$(this.getHours(), 2) + $goog$string$padNumber$$(this.getMinutes(), 2) + $goog$string$padNumber$$(this.getSeconds(), 2) + ($opt_tz$$2$$ ? $JSCompiler_StaticMethods_getTimezoneOffsetString$$(this) : 
  "")
};
$JSCompiler_prototypeAlias$$.$equals$ = function $$JSCompiler_prototypeAlias$$$$equals$$($other$$6$$) {
  return this.getTime() == $other$$6$$.getTime()
};
$JSCompiler_prototypeAlias$$.toString = function $$JSCompiler_prototypeAlias$$$toString$() {
  return this.$toIsoString$()
};
$JSCompiler_prototypeAlias$$.$clone$ = function $$JSCompiler_prototypeAlias$$$$clone$$() {
  var $date$$12$$ = new $goog$date$DateTime$$(this.$date_$);
  $date$$12$$.$firstDayOfWeek_$ = this.$firstDayOfWeek_$;
  $date$$12$$.$firstWeekCutOffDay_$ = this.$firstWeekCutOffDay_$;
  return $date$$12$$
};
function $rflect$date$Interval$$($opt_start$$, $opt_end$$15$$) {
  if($goog$isNumber$$($opt_start$$) && $goog$isNumber$$($opt_end$$15$$)) {
    this.start = $opt_start$$, this.end = $opt_end$$15$$
  }else {
    if($goog$isObject$$($opt_start$$) && $goog$isObject$$($opt_end$$15$$)) {
      this.start = $opt_start$$.getTime(), this.end = $opt_end$$15$$.getTime()
    }else {
      return $rflect$date$Interval$getNonNullInterval$$($JSCompiler_alias_NULL$$)
    }
  }
}
function $rflect$date$Interval$getNonNullInterval$$($aInterval_now$$3$$) {
  $aInterval_now$$3$$ == $JSCompiler_alias_NULL$$ && ($aInterval_now$$3$$ = $goog$now$$(), $aInterval_now$$3$$ = new $rflect$date$Interval$$($aInterval_now$$3$$, $aInterval_now$$3$$));
  return $aInterval_now$$3$$
}
$JSCompiler_prototypeAlias$$ = $rflect$date$Interval$$.prototype;
$JSCompiler_prototypeAlias$$.start = 0;
$JSCompiler_prototypeAlias$$.end = 0;
$JSCompiler_prototypeAlias$$.contains = function $$JSCompiler_prototypeAlias$$$contains$($aMillisInstant$$) {
  return $aMillisInstant$$ >= this.start && $aMillisInstant$$ < this.end
};
function $JSCompiler_StaticMethods_overlaps$$($JSCompiler_StaticMethods_overlaps$self$$, $aInterval$$1$$) {
  var $thisStart$$ = $JSCompiler_StaticMethods_overlaps$self$$.start, $thisEnd$$ = $JSCompiler_StaticMethods_overlaps$self$$.end;
  if($aInterval$$1$$ == $JSCompiler_alias_NULL$$) {
    var $now$$4$$ = $goog$now$$();
    return $thisStart$$ < $now$$4$$ && $now$$4$$ < $thisEnd$$
  }
  return $thisStart$$ < $aInterval$$1$$.end && $aInterval$$1$$.start < $thisEnd$$
}
function $JSCompiler_StaticMethods_overlap$$($JSCompiler_StaticMethods_overlap$self$$, $aInterval$$2$$) {
  var $end$$3_interval$$5$$ = $rflect$date$Interval$getNonNullInterval$$($aInterval$$2$$);
  if(!$JSCompiler_StaticMethods_overlaps$$($JSCompiler_StaticMethods_overlap$self$$, $end$$3_interval$$5$$)) {
    return $JSCompiler_alias_NULL$$
  }
  var $start$$7$$ = Math.max($JSCompiler_StaticMethods_overlap$self$$.start, $end$$3_interval$$5$$.start), $end$$3_interval$$5$$ = Math.min($JSCompiler_StaticMethods_overlap$self$$.end, $end$$3_interval$$5$$.end);
  return new $rflect$date$Interval$$($start$$7$$, $end$$3_interval$$5$$)
}
$JSCompiler_prototypeAlias$$.$equals$ = function $$JSCompiler_prototypeAlias$$$$equals$$($aInterval$$3$$) {
  return this.start == $aInterval$$3$$.start && this.end == $aInterval$$3$$.end
};
$JSCompiler_prototypeAlias$$.length = function $$JSCompiler_prototypeAlias$$$length$() {
  return this.end - this.start
};
$JSCompiler_prototypeAlias$$.toString = function $$JSCompiler_prototypeAlias$$$toString$() {
  return"[" + this.start + ";" + this.end + ")"
};
$JSCompiler_prototypeAlias$$.valueOf = function $$JSCompiler_prototypeAlias$$$valueOf$() {
  return this.length()
};
var $rflect$cal$i18n$Symbols$$ = {$NOW$:"Now", $NEW_EVENT$:"New event", $DAY$:"Day", $WEEK$:"Week", $MONTH$:"Month", $CALENDARS_LABEL$:"Calendars", $TASKS_LABEL$:"Tasks", $NO_NAME_EVENT$:"(Untitled)"};
function $rflect$date$moveToDayOfWeekIfNeeded$$($aDate$$1_date$$inline_143$$) {
  var $JSCompiler_temp$$35_diff$$inline_142$$;
  0 != $JSCompiler_StaticMethods_getWeekday$$($aDate$$1_date$$inline_143$$) && ($JSCompiler_temp$$35_diff$$inline_142$$ = (($goog$i18n$DateTimeSymbols_en$$.$FIRSTDAYOFWEEK$ + 0 + 1) % 7 - $aDate$$1_date$$inline_143$$.getDay() + -7) % 7, $aDate$$1_date$$inline_143$$ = $aDate$$1_date$$inline_143$$.$clone$(), $aDate$$1_date$$inline_143$$.add(new $goog$date$Interval$$(0, 0, 0 === $JSCompiler_temp$$35_diff$$inline_142$$ ? $JSCompiler_temp$$35_diff$$inline_142$$ + -7 : $JSCompiler_temp$$35_diff$$inline_142$$)));
  return $JSCompiler_temp$$35_diff$$inline_142$$ = $aDate$$1_date$$inline_143$$
}
function $rflect$date$getTomorrow$$($aGivenDate_cutoff$$1$$) {
  var $dateObject_year$$12$$ = $JSCompiler_alias_NULL$$, $dateObject_year$$12$$ = $aGivenDate_cutoff$$1$$.getFullYear(), $month$$7$$ = $aGivenDate_cutoff$$1$$.getMonth(), $date$$14$$ = $aGivenDate_cutoff$$1$$.getDate(), $dayOfWeek$$3_previousDayOfWeek$$;
  $dayOfWeek$$3_previousDayOfWeek$$ = $aGivenDate_cutoff$$1$$.getDay();
  var $dayOfYear$$2$$ = $aGivenDate_cutoff$$1$$.$getDayOfYear$(), $previousDayOfYear$$ = $dayOfYear$$2$$, $weekNumber$$ = $aGivenDate_cutoff$$1$$.$getWeekNumber$(), $firstDayOfWeek$$ = $aGivenDate_cutoff$$1$$.$firstDayOfWeek_$;
  $aGivenDate_cutoff$$1$$ = $aGivenDate_cutoff$$1$$.$firstWeekCutOffDay_$;
  var $numberOfDaysInCurrentYear$$ = $goog$date$isLeapYear$$($dateObject_year$$12$$) ? 366 : 365;
  $date$$14$$ == $goog$date$getNumberOfDaysInMonth$$($dateObject_year$$12$$, $month$$7$$) ? 11 == $month$$7$$ ? ($dateObject_year$$12$$++, $month$$7$$ = 0, $dayOfYear$$2$$ = $date$$14$$ = 1) : ($month$$7$$++, $date$$14$$ = 1, $dayOfYear$$2$$++) : ($date$$14$$++, $dayOfYear$$2$$++);
  $dayOfWeek$$3_previousDayOfWeek$$ = ($dayOfWeek$$3_previousDayOfWeek$$ + 1 + 7) % 7;
  ($dayOfWeek$$3_previousDayOfWeek$$ + 6) % 7 == $firstDayOfWeek$$ && (52 > $weekNumber$$ || 52 == $weekNumber$$ && $previousDayOfYear$$ + 1 + ($aGivenDate_cutoff$$1$$ - $firstDayOfWeek$$ + 7) % 7 < $numberOfDaysInCurrentYear$$ + 1 ? $weekNumber$$++ : $weekNumber$$ = 1);
  $dateObject_year$$12$$ = new $rflect$date$DateShim$$($dateObject_year$$12$$, $month$$7$$, $date$$14$$);
  $dateObject_year$$12$$.$day_$ = $dayOfWeek$$3_previousDayOfWeek$$;
  $dateObject_year$$12$$.$dayOfYear_$ = $dayOfYear$$2$$;
  $dateObject_year$$12$$.$weekNumber_$ = $weekNumber$$;
  return $dateObject_year$$12$$
}
function $rflect$date$createDateShim$$($aYear$$1_dateShim$$, $aMonth$$1$$, $aDate$$2$$, $aHours$$, $aMinutes$$, $aSeconds$$, $aWeekNumber$$inline_161_opt_full$$) {
  var $dateObj$$;
  $aWeekNumber$$inline_161_opt_full$$ ? ($dateObj$$ = new $goog$date$DateTime$$($aYear$$1_dateShim$$, $aMonth$$1$$, $aDate$$2$$, $aHours$$, $aMinutes$$, $aSeconds$$), $aYear$$1_dateShim$$ = new $rflect$date$DateShim$$($dateObj$$)) : $aYear$$1_dateShim$$ = new $rflect$date$DateShim$$($aYear$$1_dateShim$$, $aMonth$$1$$, $aDate$$2$$, $aHours$$, $aMinutes$$, $aSeconds$$);
  $aWeekNumber$$inline_161_opt_full$$ && ($aYear$$1_dateShim$$.$day_$ = $dateObj$$.getDay(), $aYear$$1_dateShim$$.$dayOfYear_$ = $dateObj$$.$getDayOfYear$(), $aWeekNumber$$inline_161_opt_full$$ = $dateObj$$.$getWeekNumber$(), $aYear$$1_dateShim$$.$weekNumber_$ = $aWeekNumber$$inline_161_opt_full$$);
  return $aYear$$1_dateShim$$
}
function $rflect$date$DateShim$$($dateObj$$1_opt_year_or_date$$, $opt_month$$2$$, $opt_date$$3$$, $opt_hours$$3$$, $opt_minutes$$2$$, $opt_seconds$$2$$, $opt_milliseconds$$1$$) {
  $goog$isNumber$$($dateObj$$1_opt_year_or_date$$) ? (this.setYear($dateObj$$1_opt_year_or_date$$ || 0), this.setMonth($opt_month$$2$$ || 0), this.setDate($opt_date$$3$$ || 1), this.setHours($opt_hours$$3$$ || 0), this.setMinutes($opt_minutes$$2$$ || 0), this.setSeconds($opt_seconds$$2$$ || 0), this.setMilliseconds($opt_milliseconds$$1$$ || 0)) : ($dateObj$$1_opt_year_or_date$$ = $goog$isObject$$($dateObj$$1_opt_year_or_date$$) ? $dateObj$$1_opt_year_or_date$$ : new Date($goog$now$$()), this.setYear($dateObj$$1_opt_year_or_date$$.getFullYear()), 
  this.setMonth($dateObj$$1_opt_year_or_date$$.getMonth()), this.setDate($dateObj$$1_opt_year_or_date$$.getDate()), this.$day_$ = $dateObj$$1_opt_year_or_date$$.getDay(), $dateObj$$1_opt_year_or_date$$.setHours && (this.setHours($dateObj$$1_opt_year_or_date$$.getHours()), this.setMinutes($dateObj$$1_opt_year_or_date$$.getMinutes()), this.setSeconds($dateObj$$1_opt_year_or_date$$.getSeconds()), this.setMilliseconds($dateObj$$1_opt_year_or_date$$.getMilliseconds())))
}
$goog$inherits$$($rflect$date$DateShim$$, $goog$date$DateTime$$);
$JSCompiler_prototypeAlias$$ = $rflect$date$DateShim$$.prototype;
$JSCompiler_prototypeAlias$$.$year_$ = 0;
$JSCompiler_prototypeAlias$$.$month_$ = 0;
$JSCompiler_prototypeAlias$$.$dayOfMonth_$ = 1;
$JSCompiler_prototypeAlias$$.$day_$ = 0;
$JSCompiler_prototypeAlias$$.time = 0;
$JSCompiler_prototypeAlias$$.$hours_$ = 0;
$JSCompiler_prototypeAlias$$.$minutes_$ = 0;
$JSCompiler_prototypeAlias$$.$seconds_$ = 0;
$JSCompiler_prototypeAlias$$.$milliseconds_$ = 0;
$JSCompiler_prototypeAlias$$.$dayOfYear_$ = 0;
$JSCompiler_prototypeAlias$$.$weekNumber_$ = 0;
$JSCompiler_prototypeAlias$$.setFullYear = $JSCompiler_set$$("$year_$");
$JSCompiler_prototypeAlias$$.setYear = $JSCompiler_set$$("$year_$");
$JSCompiler_prototypeAlias$$.setMonth = $JSCompiler_set$$("$month_$");
$JSCompiler_prototypeAlias$$.setDate = $JSCompiler_set$$("$dayOfMonth_$");
$JSCompiler_prototypeAlias$$.getFullYear = $JSCompiler_get$$("$year_$");
$JSCompiler_prototypeAlias$$.getYear = $JSCompiler_get$$("$year_$");
$JSCompiler_prototypeAlias$$.getMonth = $JSCompiler_get$$("$month_$");
$JSCompiler_prototypeAlias$$.getDate = $JSCompiler_get$$("$dayOfMonth_$");
$JSCompiler_prototypeAlias$$.getDay = $JSCompiler_get$$("$day_$");
$JSCompiler_prototypeAlias$$.getTime = $JSCompiler_get$$("time");
$JSCompiler_prototypeAlias$$.getHours = $JSCompiler_get$$("$hours_$");
$JSCompiler_prototypeAlias$$.getMinutes = $JSCompiler_get$$("$minutes_$");
$JSCompiler_prototypeAlias$$.getSeconds = $JSCompiler_get$$("$seconds_$");
$JSCompiler_prototypeAlias$$.getMilliseconds = $JSCompiler_get$$("$milliseconds_$");
$JSCompiler_prototypeAlias$$.$getDayOfYear$ = $JSCompiler_get$$("$dayOfYear_$");
$JSCompiler_prototypeAlias$$.$getWeekNumber$ = $JSCompiler_get$$("$weekNumber_$");
$JSCompiler_prototypeAlias$$.setHours = $JSCompiler_set$$("$hours_$");
$JSCompiler_prototypeAlias$$.setMinutes = $JSCompiler_set$$("$minutes_$");
$JSCompiler_prototypeAlias$$.setSeconds = $JSCompiler_set$$("$seconds_$");
$JSCompiler_prototypeAlias$$.setMilliseconds = $JSCompiler_set$$("$milliseconds_$");
$JSCompiler_prototypeAlias$$.$equals$ = function $$JSCompiler_prototypeAlias$$$$equals$$($aOther$$, $opt_bitmask$$) {
  return 0 == $JSCompiler_StaticMethods_compare$$(this, $aOther$$, $opt_bitmask$$)
};
function $JSCompiler_StaticMethods_compare$$($JSCompiler_StaticMethods_compare$self$$, $aOther$$1$$, $bitmask_opt_bitmask$$1$$) {
  var $diff$$1$$ = 0;
  $bitmask_opt_bitmask$$1$$ = $bitmask_opt_bitmask$$1$$ || 63;
  $bitmask_opt_bitmask$$1$$ & 1 && ($diff$$1$$ = $JSCompiler_StaticMethods_compare$self$$.getYear() - $aOther$$1$$.getFullYear());
  0 == $diff$$1$$ && $bitmask_opt_bitmask$$1$$ & 2 && ($diff$$1$$ = $JSCompiler_StaticMethods_compare$self$$.getMonth() - $aOther$$1$$.getMonth());
  0 == $diff$$1$$ && $bitmask_opt_bitmask$$1$$ & 4 && ($diff$$1$$ = $JSCompiler_StaticMethods_compare$self$$.getDate() - $aOther$$1$$.getDate());
  0 == $diff$$1$$ && $bitmask_opt_bitmask$$1$$ & 8 && ($diff$$1$$ = $JSCompiler_StaticMethods_compare$self$$.getHours() - $aOther$$1$$.getHours());
  0 == $diff$$1$$ && $bitmask_opt_bitmask$$1$$ & 16 && ($diff$$1$$ = $JSCompiler_StaticMethods_compare$self$$.getMinutes() - $aOther$$1$$.getMinutes());
  0 == $diff$$1$$ && $bitmask_opt_bitmask$$1$$ & 32 && ($diff$$1$$ = $JSCompiler_StaticMethods_compare$self$$.getSeconds() - $aOther$$1$$.getSeconds());
  $bitmask_opt_bitmask$$1$$ & 128 && ($diff$$1$$ = $JSCompiler_StaticMethods_compare$self$$.$getWeekNumber$() - $aOther$$1$$.$getWeekNumber$());
  return 0 < $diff$$1$$ ? 1 : 0 == $diff$$1$$ ? 0 : -1
}
$JSCompiler_prototypeAlias$$.valueOf = function $$JSCompiler_prototypeAlias$$$valueOf$() {
  return+[this.$year_$, this.$month_$, this.$dayOfMonth_$, this.$hours_$, this.$minutes_$, this.$seconds_$, this.$milliseconds_$].join("")
};
$JSCompiler_prototypeAlias$$.$clone$ = function $$JSCompiler_prototypeAlias$$$$clone$$() {
  var $date$$17$$ = new $rflect$date$DateShim$$(this);
  $date$$17$$.$firstDayOfWeek_$ = this.$firstDayOfWeek_$;
  $date$$17$$.$firstWeekCutOffDay_$ = this.$firstWeekCutOffDay_$;
  $date$$17$$.$dayOfYear_$ = this.$getDayOfYear$();
  var $aWeekNumber$$inline_176$$ = this.$getWeekNumber$();
  $date$$17$$.$weekNumber_$ = $aWeekNumber$$inline_176$$;
  return $date$$17$$
};
function $rflect$cal$events$EventTransactionHelper$$($aEventManager$$) {
  this.$eventManager_$ = $aEventManager$$
}
;var $goog$i18n$DateTimePatterns_en$$ = {$YEAR_FULL$:"yyyy", $YEAR_MONTH_ABBR$:"MMM y", $YEAR_MONTH_FULL$:"MMMM yyyy", $MONTH_DAY_ABBR$:"MMM d", $MONTH_DAY_FULL$:"MMMM dd", $MONTH_DAY_SHORT$:"M/d", $MONTH_DAY_MEDIUM$:"MMMM d", $DAY_ABBR$:"d"}, $goog$i18n$DateTimePatterns$$ = $goog$i18n$DateTimePatterns_en$$, $goog$i18n$DateTimePatterns$$ = $goog$i18n$DateTimePatterns_en$$;
function $goog$i18n$TimeZone$$() {
}
function $goog$i18n$TimeZone$createTimeZone$$($offset$$inline_846_str$$inline_180_timeZoneData$$) {
  if("number" == typeof $offset$$inline_846_str$$inline_180_timeZoneData$$) {
    var $tz$$1_tz$$inline_179$$ = new $goog$i18n$TimeZone$$;
    $tz$$1_tz$$inline_179$$.$standardOffset_$ = $offset$$inline_846_str$$inline_180_timeZoneData$$;
    var $JSCompiler_inline_result$$842_offset$$inline_843_parts$$inline_847$$;
    $JSCompiler_inline_result$$842_offset$$inline_843_parts$$inline_847$$ = $offset$$inline_846_str$$inline_180_timeZoneData$$;
    if(0 == $JSCompiler_inline_result$$842_offset$$inline_843_parts$$inline_847$$) {
      $JSCompiler_inline_result$$842_offset$$inline_843_parts$$inline_847$$ = "Etc/GMT"
    }else {
      var $parts$$inline_844$$ = ["Etc/GMT", 0 > $JSCompiler_inline_result$$842_offset$$inline_843_parts$$inline_847$$ ? "-" : "+"];
      $JSCompiler_inline_result$$842_offset$$inline_843_parts$$inline_847$$ = Math.abs($JSCompiler_inline_result$$842_offset$$inline_843_parts$$inline_847$$);
      $parts$$inline_844$$.push(Math.floor($JSCompiler_inline_result$$842_offset$$inline_843_parts$$inline_847$$ / 60) % 100);
      $JSCompiler_inline_result$$842_offset$$inline_843_parts$$inline_847$$ %= 60;
      0 != $JSCompiler_inline_result$$842_offset$$inline_843_parts$$inline_847$$ && $parts$$inline_844$$.push(":", $goog$string$padNumber$$($JSCompiler_inline_result$$842_offset$$inline_843_parts$$inline_847$$, 2));
      $JSCompiler_inline_result$$842_offset$$inline_843_parts$$inline_847$$ = $parts$$inline_844$$.join("")
    }
    $tz$$1_tz$$inline_179$$.$timeZoneId_$ = $JSCompiler_inline_result$$842_offset$$inline_843_parts$$inline_847$$;
    0 == $offset$$inline_846_str$$inline_180_timeZoneData$$ ? $offset$$inline_846_str$$inline_180_timeZoneData$$ = "UTC" : ($JSCompiler_inline_result$$842_offset$$inline_843_parts$$inline_847$$ = ["UTC", 0 > $offset$$inline_846_str$$inline_180_timeZoneData$$ ? "+" : "-"], $offset$$inline_846_str$$inline_180_timeZoneData$$ = Math.abs($offset$$inline_846_str$$inline_180_timeZoneData$$), $JSCompiler_inline_result$$842_offset$$inline_843_parts$$inline_847$$.push(Math.floor($offset$$inline_846_str$$inline_180_timeZoneData$$ / 
    60) % 100), $offset$$inline_846_str$$inline_180_timeZoneData$$ %= 60, 0 != $offset$$inline_846_str$$inline_180_timeZoneData$$ && $JSCompiler_inline_result$$842_offset$$inline_843_parts$$inline_847$$.push(":", $offset$$inline_846_str$$inline_180_timeZoneData$$), $offset$$inline_846_str$$inline_180_timeZoneData$$ = $JSCompiler_inline_result$$842_offset$$inline_843_parts$$inline_847$$.join(""));
    $tz$$1_tz$$inline_179$$.$tzNames_$ = [$offset$$inline_846_str$$inline_180_timeZoneData$$, $offset$$inline_846_str$$inline_180_timeZoneData$$];
    $tz$$1_tz$$inline_179$$.$transitions_$ = [];
    return $tz$$1_tz$$inline_179$$
  }
  $tz$$1_tz$$inline_179$$ = new $goog$i18n$TimeZone$$;
  $tz$$1_tz$$inline_179$$.$timeZoneId_$ = $offset$$inline_846_str$$inline_180_timeZoneData$$.id;
  $tz$$1_tz$$inline_179$$.$standardOffset_$ = -$offset$$inline_846_str$$inline_180_timeZoneData$$.std_offset;
  $tz$$1_tz$$inline_179$$.$tzNames_$ = $offset$$inline_846_str$$inline_180_timeZoneData$$.names;
  $tz$$1_tz$$inline_179$$.$transitions_$ = $offset$$inline_846_str$$inline_180_timeZoneData$$.transitions;
  return $tz$$1_tz$$inline_179$$
}
function $JSCompiler_StaticMethods_getDaylightAdjustment$$($JSCompiler_StaticMethods_getDaylightAdjustment$self$$, $date$$18$$) {
  for(var $timeInHours$$ = Date.UTC($date$$18$$.getUTCFullYear(), $date$$18$$.getUTCMonth(), $date$$18$$.getUTCDate(), $date$$18$$.getUTCHours(), $date$$18$$.getUTCMinutes()) / 36E5, $index$$56$$ = 0;$index$$56$$ < $JSCompiler_StaticMethods_getDaylightAdjustment$self$$.$transitions_$.length && $timeInHours$$ >= $JSCompiler_StaticMethods_getDaylightAdjustment$self$$.$transitions_$[$index$$56$$];) {
    $index$$56$$ += 2
  }
  return 0 == $index$$56$$ ? 0 : $JSCompiler_StaticMethods_getDaylightAdjustment$self$$.$transitions_$[$index$$56$$ - 1]
}
;function $goog$i18n$DateTimeFormat$$($pattern$$1$$) {
  $goog$asserts$assert$$($goog$isDef$$($pattern$$1$$), "Pattern must be defined");
  this.$patternParts_$ = [];
  "number" == typeof $pattern$$1$$ ? $JSCompiler_StaticMethods_applyStandardPattern_$$(this, $pattern$$1$$) : $JSCompiler_StaticMethods_applyPattern_$$(this, $pattern$$1$$)
}
var $goog$i18n$DateTimeFormat$TOKENS_$$ = [/^\'(?:[^\']|\'\')*\'/, /^(?:G+|y+|M+|k+|S+|E+|a+|h+|K+|H+|c+|L+|Q+|d+|m+|s+|v+|z+|Z+)/, /^[^\'GyMkSEahKHcLQdmsvzZ]+/];
function $JSCompiler_StaticMethods_applyPattern_$$($JSCompiler_StaticMethods_applyPattern_$self$$, $pattern$$2$$) {
  for(;$pattern$$2$$;) {
    for(var $i$$61$$ = 0;$i$$61$$ < $goog$i18n$DateTimeFormat$TOKENS_$$.length;++$i$$61$$) {
      var $m$$2_part$$2$$ = $pattern$$2$$.match($goog$i18n$DateTimeFormat$TOKENS_$$[$i$$61$$]);
      if($m$$2_part$$2$$) {
        $m$$2_part$$2$$ = $m$$2_part$$2$$[0];
        $pattern$$2$$ = $pattern$$2$$.substring($m$$2_part$$2$$.length);
        0 == $i$$61$$ && ("''" == $m$$2_part$$2$$ ? $m$$2_part$$2$$ = "'" : ($m$$2_part$$2$$ = $m$$2_part$$2$$.substring(1, $m$$2_part$$2$$.length - 1), $m$$2_part$$2$$ = $m$$2_part$$2$$.replace(/\'\'/, "'")));
        $JSCompiler_StaticMethods_applyPattern_$self$$.$patternParts_$.push({text:$m$$2_part$$2$$, type:$i$$61$$});
        break
      }
    }
  }
}
function $JSCompiler_StaticMethods_format$$($JSCompiler_StaticMethods_format$self$$, $date$$25$$) {
  for(var $out$$ = [], $i$$62$$ = 0;$i$$62$$ < $JSCompiler_StaticMethods_format$self$$.$patternParts_$.length;++$i$$62$$) {
    var $text$$7$$ = $JSCompiler_StaticMethods_format$self$$.$patternParts_$[$i$$62$$].text;
    1 == $JSCompiler_StaticMethods_format$self$$.$patternParts_$[$i$$62$$].type ? $out$$.push($JSCompiler_StaticMethods_formatField_$$($text$$7$$, $date$$25$$, $date$$25$$, $date$$25$$)) : $out$$.push($text$$7$$)
  }
  return $out$$.join("")
}
function $JSCompiler_StaticMethods_applyStandardPattern_$$($JSCompiler_StaticMethods_applyStandardPattern_$self$$, $formatType$$) {
  var $pattern$$3$$;
  if(4 > $formatType$$) {
    $pattern$$3$$ = $goog$i18n$DateTimeSymbols_en$$.$DATEFORMATS$[$formatType$$]
  }else {
    if(8 > $formatType$$) {
      $pattern$$3$$ = $goog$i18n$DateTimeSymbols_en$$.$TIMEFORMATS$[$formatType$$ - 4]
    }else {
      if(12 > $formatType$$) {
        $pattern$$3$$ = $goog$i18n$DateTimeSymbols_en$$.$DATEFORMATS$[$formatType$$ - 8] + " " + $goog$i18n$DateTimeSymbols_en$$.$TIMEFORMATS$[$formatType$$ - 8]
      }else {
        $JSCompiler_StaticMethods_applyStandardPattern_$$($JSCompiler_StaticMethods_applyStandardPattern_$self$$, 10);
        return
      }
    }
  }
  $JSCompiler_StaticMethods_applyPattern_$$($JSCompiler_StaticMethods_applyStandardPattern_$self$$, $pattern$$3$$)
}
function $JSCompiler_StaticMethods_localizeNumbers_$$($input$$) {
  if($goog$i18n$DateTimeSymbols_en$$.$ZERODIGIT$ === $JSCompiler_alias_VOID$$) {
    return $input$$
  }
  for(var $parts$$11$$ = [], $i$$63$$ = 0;$i$$63$$ < $input$$.length;$i$$63$$++) {
    var $c$$1$$ = $input$$.charCodeAt($i$$63$$);
    $parts$$11$$.push(48 <= $c$$1$$ && 57 >= $c$$1$$ ? String.fromCharCode($goog$i18n$DateTimeSymbols_en$$.$ZERODIGIT$ + $c$$1$$ - 48) : $input$$.charAt($i$$63$$))
  }
  return $parts$$11$$.join("")
}
function $JSCompiler_StaticMethods_formatField_$$($opt_timeZone$$inline_222_opt_timeZone$$inline_227_patternStr$$, $date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$, $dateForDate$$1$$, $dateForTime$$1$$) {
  var $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ = $opt_timeZone$$inline_222_opt_timeZone$$inline_227_patternStr$$.length;
  switch($opt_timeZone$$inline_222_opt_timeZone$$inline_227_patternStr$$.charAt(0)) {
    case "G":
      return $date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$ = 0 < $dateForDate$$1$$.getFullYear() ? 1 : 0, 4 <= $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ ? $goog$i18n$DateTimeSymbols_en$$.$ERANAMES$[$date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$] : 
      $goog$i18n$DateTimeSymbols_en$$.$ERAS$[$date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$];
    case "y":
      return $date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$ = $dateForDate$$1$$.getFullYear(), 0 > $date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$ && ($date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$ = 
      -$date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$), $JSCompiler_StaticMethods_localizeNumbers_$$(2 == $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ ? $goog$string$padNumber$$($date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$ % 
      100, 2) : String($date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$));
    case "M":
      a: {
        switch($date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$ = $dateForDate$$1$$.getMonth(), $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$) {
          case 5:
            $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ = $goog$i18n$DateTimeSymbols_en$$.$NARROWMONTHS$[$date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$];
            break a;
          case 4:
            $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ = $goog$i18n$DateTimeSymbols_en$$.$MONTHS$[$date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$];
            break a;
          case 3:
            $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ = $goog$i18n$DateTimeSymbols_en$$.$SHORTMONTHS$[$date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$];
            break a;
          default:
            $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ = $JSCompiler_StaticMethods_localizeNumbers_$$($goog$string$padNumber$$($date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$ + 1, $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$))
        }
      }
      return $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$;
    case "k":
      return $JSCompiler_StaticMethods_localizeNumbers_$$($goog$string$padNumber$$($dateForTime$$1$$.getHours() || 24, $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$));
    case "S":
      return $JSCompiler_StaticMethods_localizeNumbers_$$(($dateForTime$$1$$.getTime() % 1E3 / 1E3).toFixed(Math.min(3, $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$)).substr(2) + (3 < $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ ? 
      $goog$string$padNumber$$(0, $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ - 3) : ""));
    case "E":
      return $date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$ = $dateForDate$$1$$.getDay(), 4 <= $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ ? $goog$i18n$DateTimeSymbols_en$$.$WEEKDAYS$[$date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$] : 
      $goog$i18n$DateTimeSymbols_en$$.$SHORTWEEKDAYS$[$date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$];
    case "a":
      return $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ = $dateForTime$$1$$.getHours(), $goog$i18n$DateTimeSymbols_en$$.$AMPMS$[12 <= $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ && 24 > 
      $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ ? 1 : 0];
    case "h":
      return $JSCompiler_StaticMethods_localizeNumbers_$$($goog$string$padNumber$$($dateForTime$$1$$.getHours() % 12 || 12, $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$));
    case "K":
      return $JSCompiler_StaticMethods_localizeNumbers_$$($goog$string$padNumber$$($dateForTime$$1$$.getHours() % 12, $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$));
    case "H":
      return $JSCompiler_StaticMethods_localizeNumbers_$$($goog$string$padNumber$$($dateForTime$$1$$.getHours(), $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$));
    case "c":
      a: {
        switch($date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$ = $dateForDate$$1$$.getDay(), $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$) {
          case 5:
            $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ = $goog$i18n$DateTimeSymbols_en$$.$STANDALONENARROWWEEKDAYS$[$date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$];
            break a;
          case 4:
            $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ = $goog$i18n$DateTimeSymbols_en$$.$STANDALONEWEEKDAYS$[$date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$];
            break a;
          case 3:
            $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ = $goog$i18n$DateTimeSymbols_en$$.$STANDALONESHORTWEEKDAYS$[$date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$];
            break a;
          default:
            $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ = $JSCompiler_StaticMethods_localizeNumbers_$$($goog$string$padNumber$$($date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$, 1))
        }
      }
      return $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$;
    case "L":
      a: {
        switch($date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$ = $dateForDate$$1$$.getMonth(), $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$) {
          case 5:
            $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ = $goog$i18n$DateTimeSymbols_en$$.$STANDALONENARROWMONTHS$[$date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$];
            break a;
          case 4:
            $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ = $goog$i18n$DateTimeSymbols_en$$.$STANDALONEMONTHS$[$date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$];
            break a;
          case 3:
            $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ = $goog$i18n$DateTimeSymbols_en$$.$STANDALONESHORTMONTHS$[$date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$];
            break a;
          default:
            $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ = $JSCompiler_StaticMethods_localizeNumbers_$$($goog$string$padNumber$$($date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$ + 1, $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$))
        }
      }
      return $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$;
    case "Q":
      return $date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$ = Math.floor($dateForDate$$1$$.getMonth() / 3), 4 > $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ ? $goog$i18n$DateTimeSymbols_en$$.$SHORTQUARTERS$[$date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$] : 
      $goog$i18n$DateTimeSymbols_en$$.$QUARTERS$[$date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$];
    case "d":
      return $JSCompiler_StaticMethods_localizeNumbers_$$($goog$string$padNumber$$($dateForDate$$1$$.getDate(), $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$));
    case "m":
      return $JSCompiler_StaticMethods_localizeNumbers_$$($goog$string$padNumber$$($dateForTime$$1$$.getMinutes(), $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$));
    case "s":
      return $JSCompiler_StaticMethods_localizeNumbers_$$($goog$string$padNumber$$($dateForTime$$1$$.getSeconds(), $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$));
    case "v":
      return $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ = $JSCompiler_alias_VOID$$ || $goog$i18n$TimeZone$createTimeZone$$($date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$.getTimezoneOffset()), $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$.$timeZoneId_$;
    case "z":
      return $opt_timeZone$$inline_222_opt_timeZone$$inline_227_patternStr$$ = $JSCompiler_alias_VOID$$ || $goog$i18n$TimeZone$createTimeZone$$($date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$.getTimezoneOffset()), 4 > $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ ? 
      $opt_timeZone$$inline_222_opt_timeZone$$inline_227_patternStr$$.$tzNames_$[0 < $JSCompiler_StaticMethods_getDaylightAdjustment$$($opt_timeZone$$inline_222_opt_timeZone$$inline_227_patternStr$$, $date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$) ? 2 : 0] : $opt_timeZone$$inline_222_opt_timeZone$$inline_227_patternStr$$.$tzNames_$[0 < $JSCompiler_StaticMethods_getDaylightAdjustment$$($opt_timeZone$$inline_222_opt_timeZone$$inline_227_patternStr$$, 
      $date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$) ? 3 : 1];
    case "Z":
      return $opt_timeZone$$inline_222_opt_timeZone$$inline_227_patternStr$$ = $JSCompiler_alias_VOID$$ || $goog$i18n$TimeZone$createTimeZone$$($date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$.getTimezoneOffset()), 4 > $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ ? 
      ($JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ = -($opt_timeZone$$inline_222_opt_timeZone$$inline_227_patternStr$$.$standardOffset_$ - $JSCompiler_StaticMethods_getDaylightAdjustment$$($opt_timeZone$$inline_222_opt_timeZone$$inline_227_patternStr$$, $date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$)), 
      $date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$ = [0 > $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ ? "-" : "+"], $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ = 
      Math.abs($JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$), $date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$.push($goog$string$padNumber$$(Math.floor($JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ / 
      60) % 100, 2), $goog$string$padNumber$$($JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ % 60, 2)), $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ = $date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$.join("")) : 
      ($JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ = $opt_timeZone$$inline_222_opt_timeZone$$inline_227_patternStr$$.$standardOffset_$ - $JSCompiler_StaticMethods_getDaylightAdjustment$$($opt_timeZone$$inline_222_opt_timeZone$$inline_227_patternStr$$, $date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$), 
      $date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$ = ["GMT"], $date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$.push(0 >= $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ ? 
      "+" : "-"), $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ = Math.abs($JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$), $date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$.push($goog$string$padNumber$$(Math.floor($JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ / 
      60) % 100, 2), ":", $goog$string$padNumber$$($JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ % 60, 2)), $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$ = $JSCompiler_StaticMethods_localizeNumbers_$$($date$$45_parts$$inline_1145_parts$$inline_852_value$$inline_184_value$$inline_189_value$$inline_194_value$$inline_198_value$$inline_206_value$$inline_211_value$$inline_215$$.join(""))), 
      $JSCompiler_inline_result$$0_JSCompiler_inline_result$$17_JSCompiler_inline_result$$37_JSCompiler_temp$$836_count$$27_hours$$inline_201_offset$$inline_1144_offset$$inline_851_opt_timeZone$$inline_218$$;
    default:
      return""
  }
}
;function $rflect$cal$events$Event$$($aUid$$2$$) {
  this.id = $aUid$$2$$;
  this.$longId$ = "";
  this.$endDate$ = this.$startDate$ = $JSCompiler_alias_NULL$$;
  this.$allDay$ = $JSCompiler_alias_FALSE$$;
  this.summary = $rflect$cal$i18n$Symbols$$.$NO_NAME_EVENT$;
  this.description = ""
}
;function $rflect$cal$events$Chip$$($aEventId$$, $aStart$$, $aEnd$$, $aStartIsCut$$, $aEndIsCut$$) {
  this.$eventId$ = $aEventId$$;
  this.start = $aStart$$;
  this.end = $aEnd$$;
  this.$startIsCut$ = $aStartIsCut$$;
  this.$endIsCut$ = $aEndIsCut$$
}
$rflect$cal$events$Chip$$.prototype.start = 0;
$rflect$cal$events$Chip$$.prototype.end = 0;
$rflect$cal$events$Chip$$.prototype.$equals$ = function $$rflect$cal$events$Chip$$$$$equals$$($aChip$$) {
  return this.start == $aChip$$.start && this.end == $aChip$$.end && this.$startIsCut$ == $aChip$$.$startIsCut$ && this.$endIsCut$ == $aChip$$.$endIsCut$
};
$rflect$cal$events$Chip$$.prototype.$clone$ = function $$rflect$cal$events$Chip$$$$$clone$$() {
  return new $rflect$cal$events$Chip$$(this.$eventId$, this.start, this.end, this.$startIsCut$, this.$endIsCut$)
};
function $rflect$cal$events$EventManager$$($aViewManager$$, $aTimeManager$$) {
  this.$viewManager_$ = $aViewManager$$;
  this.$timeManager_$ = $aTimeManager$$;
  this.$eventTransactionHelper$ = new $rflect$cal$events$EventTransactionHelper$$(this);
  this.$events_$ = {};
  this.$chipsByDay_$ = {};
  this.$allDayChipsByDay_$ = {};
  this.$chipsByWeek_$ = {};
  this.$dayChips$ = [];
  this.$allDayChips$ = [];
  this.$weekChips$ = [];
  this.$tracksChipsByDay_$ = {};
  this.$tracksChipsByWeek_$ = {};
  this.$tracksAllDayChipsByDay_$ = {};
  this.$plans_$ = $JSCompiler_alias_NULL$$;
  this.$infinitePlans_$ = []
}
var $rflect$cal$events$EventManager$eventUid_$$ = 0;
function $JSCompiler_StaticMethods_putChip_$$($aChip$$3$$, $aIndex1$$1$$, $aIndex2$$1$$, $aDataStructure$$1$$, $aTracks$$) {
  $aIndex1$$1$$ in $aDataStructure$$1$$ || ($aDataStructure$$1$$[$aIndex1$$1$$] = {});
  $aIndex2$$1$$ in $aDataStructure$$1$$[$aIndex1$$1$$] || ($aDataStructure$$1$$[$aIndex1$$1$$][$aIndex2$$1$$] = []);
  $aDataStructure$$1$$[$aIndex1$$1$$][$aIndex2$$1$$].push($aChip$$3$$);
  $aTracks$$[$aChip$$3$$.$eventId$] ? $aTracks$$[$aChip$$3$$.$eventId$].push([$aIndex1$$1$$, $aIndex2$$1$$]) : $aTracks$$[$aChip$$3$$.$eventId$] = [[$aIndex1$$1$$, $aIndex2$$1$$]]
}
$rflect$cal$events$EventManager$$.prototype.$run$ = function $$rflect$cal$events$EventManager$$$$$run$$() {
  var $daySeries$$ = this.$timeManager_$.$daySeries$, $knownChipsIds$$ = {};
  this.$dayChips$.length = 0;
  this.$allDayChips$.length = 0;
  this.$allDayChips$[0] = [];
  for(var $allDayChipsCounter$$inline_238_allDayChipsLength$$ = this.$weekChips$.length = 0, $counter$$9$$ = 0, $length$$27$$ = $daySeries$$.length;$counter$$9$$ < $length$$27$$;$counter$$9$$++) {
    var $counter$$inline_240_yearKey$$ = $daySeries$$[$counter$$9$$].getFullYear();
    if($JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$)) {
      var $dayOfYearKey_length$$inline_241$$ = $daySeries$$[$counter$$9$$].$getDayOfYear$();
      this.$dayChips$.push((this.$chipsByDay_$[$counter$$inline_240_yearKey$$] && this.$chipsByDay_$[$counter$$inline_240_yearKey$$][$dayOfYearKey_length$$inline_241$$] ? this.$chipsByDay_$[$counter$$inline_240_yearKey$$][$dayOfYearKey_length$$inline_241$$] : $JSCompiler_alias_NULL$$) || []);
      var $aKnownChipIds$$inline_231_weekKey$$ = $knownChipsIds$$, $aDayNumber$$inline_234$$ = $counter$$9$$, $aTotalDays$$inline_235$$ = $length$$27$$, $allDayChips$$inline_237$$ = this.$allDayChips$[0], $chips$$inline_239$$ = $JSCompiler_alias_VOID$$;
      if($chips$$inline_239$$ = this.$allDayChipsByDay_$[$counter$$inline_240_yearKey$$] && this.$allDayChipsByDay_$[$counter$$inline_240_yearKey$$][$dayOfYearKey_length$$inline_241$$] ? this.$allDayChipsByDay_$[$counter$$inline_240_yearKey$$][$dayOfYearKey_length$$inline_241$$] : $JSCompiler_alias_NULL$$) {
        $counter$$inline_240_yearKey$$ = 0;
        for($dayOfYearKey_length$$inline_241$$ = $chips$$inline_239$$.length;$counter$$inline_240_yearKey$$ < $dayOfYearKey_length$$inline_241$$;$counter$$inline_240_yearKey$$++) {
          var $id$$inline_242_newChip$$inline_243$$ = $chips$$inline_239$$[$counter$$inline_240_yearKey$$].$eventId$;
          $aKnownChipIds$$inline_231_weekKey$$[$id$$inline_242_newChip$$inline_243$$] || ($aKnownChipIds$$inline_231_weekKey$$[$id$$inline_242_newChip$$inline_243$$] = 1, $id$$inline_242_newChip$$inline_243$$ = $chips$$inline_239$$[$counter$$inline_240_yearKey$$].$clone$(), $id$$inline_242_newChip$$inline_243$$.start = $aDayNumber$$inline_234$$, $id$$inline_242_newChip$$inline_243$$.$endIsCut$ = $aTotalDays$$inline_235$$ - $aDayNumber$$inline_234$$ < $id$$inline_242_newChip$$inline_243$$.end, $id$$inline_242_newChip$$inline_243$$.end = 
          $id$$inline_242_newChip$$inline_243$$.$endIsCut$ ? $aTotalDays$$inline_235$$ : $aDayNumber$$inline_234$$ + $id$$inline_242_newChip$$inline_243$$.end, $allDayChips$$inline_237$$[$allDayChipsCounter$$inline_238_allDayChipsLength$$++] = $id$$inline_242_newChip$$inline_243$$)
        }
      }
    }else {
      $JSCompiler_StaticMethods_isInMonthMode$$(this.$viewManager_$) && 0 == $counter$$9$$ % 7 && ($aKnownChipIds$$inline_231_weekKey$$ = $daySeries$$[$counter$$9$$].$getWeekNumber$(), this.$weekChips$.push((this.$chipsByWeek_$[$counter$$inline_240_yearKey$$] && this.$chipsByWeek_$[$counter$$inline_240_yearKey$$][$aKnownChipIds$$inline_231_weekKey$$] ? this.$chipsByWeek_$[$counter$$inline_240_yearKey$$][$aKnownChipIds$$inline_231_weekKey$$] : $JSCompiler_alias_NULL$$) || []))
    }
  }
};
function $goog$events$EventHandler$$($opt_handler$$8$$) {
  $goog$Disposable$$.call(this);
  this.$handler_$ = $opt_handler$$8$$;
  this.$keys_$ = []
}
$goog$inherits$$($goog$events$EventHandler$$, $goog$Disposable$$);
var $goog$events$EventHandler$typeArray_$$ = [];
function $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$self$$, $src$$16$$, $type$$76$$, $opt_fn$$, $opt_capture$$1$$, $opt_handler$$9$$) {
  $goog$isArray$$($type$$76$$) || ($goog$events$EventHandler$typeArray_$$[0] = $type$$76$$, $type$$76$$ = $goog$events$EventHandler$typeArray_$$);
  for(var $i$$64$$ = 0;$i$$64$$ < $type$$76$$.length;$i$$64$$++) {
    var $key$$48$$ = $goog$events$listen$$($src$$16$$, $type$$76$$[$i$$64$$], $opt_fn$$ || $JSCompiler_StaticMethods_listen$self$$, $opt_capture$$1$$ || $JSCompiler_alias_FALSE$$, $opt_handler$$9$$ || $JSCompiler_StaticMethods_listen$self$$.$handler_$ || $JSCompiler_StaticMethods_listen$self$$);
    $JSCompiler_StaticMethods_listen$self$$.$keys_$.push($key$$48$$)
  }
  return $JSCompiler_StaticMethods_listen$self$$
}
function $JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$self$$, $key$$50_listener$$51_listenerArray$$inline_251_src$$19$$, $i$$inline_252_type$$78$$, $listener$$inline_247_opt_fn$$2$$, $capture$$inline_250_opt_capture$$3$$, $opt_handler$$12_opt_handler$$inline_249$$) {
  if($goog$isArray$$($i$$inline_252_type$$78$$)) {
    for(var $i$$66$$ = 0;$i$$66$$ < $i$$inline_252_type$$78$$.length;$i$$66$$++) {
      $JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$self$$, $key$$50_listener$$51_listenerArray$$inline_251_src$$19$$, $i$$inline_252_type$$78$$[$i$$66$$], $listener$$inline_247_opt_fn$$2$$, $capture$$inline_250_opt_capture$$3$$, $opt_handler$$12_opt_handler$$inline_249$$)
    }
  }else {
    a: {
      $listener$$inline_247_opt_fn$$2$$ = $listener$$inline_247_opt_fn$$2$$ || $JSCompiler_StaticMethods_unlisten$self$$;
      $opt_handler$$12_opt_handler$$inline_249$$ = $opt_handler$$12_opt_handler$$inline_249$$ || $JSCompiler_StaticMethods_unlisten$self$$.$handler_$ || $JSCompiler_StaticMethods_unlisten$self$$;
      $capture$$inline_250_opt_capture$$3$$ = !!$capture$$inline_250_opt_capture$$3$$;
      if($key$$50_listener$$51_listenerArray$$inline_251_src$$19$$ = $goog$events$getListeners_$$($key$$50_listener$$51_listenerArray$$inline_251_src$$19$$, $i$$inline_252_type$$78$$, $capture$$inline_250_opt_capture$$3$$)) {
        for($i$$inline_252_type$$78$$ = 0;$i$$inline_252_type$$78$$ < $key$$50_listener$$51_listenerArray$$inline_251_src$$19$$.length;$i$$inline_252_type$$78$$++) {
          if(!$key$$50_listener$$51_listenerArray$$inline_251_src$$19$$[$i$$inline_252_type$$78$$].$removed$ && $key$$50_listener$$51_listenerArray$$inline_251_src$$19$$[$i$$inline_252_type$$78$$].$listener$ == $listener$$inline_247_opt_fn$$2$$ && $key$$50_listener$$51_listenerArray$$inline_251_src$$19$$[$i$$inline_252_type$$78$$].capture == $capture$$inline_250_opt_capture$$3$$ && $key$$50_listener$$51_listenerArray$$inline_251_src$$19$$[$i$$inline_252_type$$78$$].$handler$ == $opt_handler$$12_opt_handler$$inline_249$$) {
            $key$$50_listener$$51_listenerArray$$inline_251_src$$19$$ = $key$$50_listener$$51_listenerArray$$inline_251_src$$19$$[$i$$inline_252_type$$78$$];
            break a
          }
        }
      }
      $key$$50_listener$$51_listenerArray$$inline_251_src$$19$$ = $JSCompiler_alias_NULL$$
    }
    $key$$50_listener$$51_listenerArray$$inline_251_src$$19$$ && ($key$$50_listener$$51_listenerArray$$inline_251_src$$19$$ = $key$$50_listener$$51_listenerArray$$inline_251_src$$19$$.key, $goog$events$unlistenByKey$$($key$$50_listener$$51_listenerArray$$inline_251_src$$19$$), $goog$array$remove$$($JSCompiler_StaticMethods_unlisten$self$$.$keys_$, $key$$50_listener$$51_listenerArray$$inline_251_src$$19$$))
  }
  return $JSCompiler_StaticMethods_unlisten$self$$
}
function $JSCompiler_StaticMethods_removeAll$$($JSCompiler_StaticMethods_removeAll$self$$) {
  $goog$array$forEach$$($JSCompiler_StaticMethods_removeAll$self$$.$keys_$, $goog$events$unlistenByKey$$);
  $JSCompiler_StaticMethods_removeAll$self$$.$keys_$.length = 0
}
$goog$events$EventHandler$$.prototype.$disposeInternal$ = function $$goog$events$EventHandler$$$$$disposeInternal$$() {
  $goog$events$EventHandler$$.$superClass_$.$disposeInternal$.call(this);
  $JSCompiler_StaticMethods_removeAll$$(this)
};
$goog$events$EventHandler$$.prototype.handleEvent = function $$goog$events$EventHandler$$$$handleEvent$() {
  $JSCompiler_alias_THROW$$(Error("EventHandler.handleEvent not implemented"))
};
function $goog$string$StringBuffer$$($opt_a1$$, $var_args$$51$$) {
  $opt_a1$$ != $JSCompiler_alias_NULL$$ && this.append.apply(this, arguments)
}
$JSCompiler_prototypeAlias$$ = $goog$string$StringBuffer$$.prototype;
$JSCompiler_prototypeAlias$$.$buffer_$ = "";
$JSCompiler_prototypeAlias$$.set = function $$JSCompiler_prototypeAlias$$$set$($s$$14$$) {
  this.$buffer_$ = "" + $s$$14$$
};
$JSCompiler_prototypeAlias$$.append = function $$JSCompiler_prototypeAlias$$$append$($a1$$, $opt_a2$$, $var_args$$52$$) {
  this.$buffer_$ += $a1$$;
  if($opt_a2$$ != $JSCompiler_alias_NULL$$) {
    for(var $i$$67$$ = 1;$i$$67$$ < arguments.length;$i$$67$$++) {
      this.$buffer_$ += arguments[$i$$67$$]
    }
  }
  return this
};
$JSCompiler_prototypeAlias$$.clear = function $$JSCompiler_prototypeAlias$$$clear$() {
  this.$buffer_$ = ""
};
$JSCompiler_prototypeAlias$$.toString = $JSCompiler_get$$("$buffer_$");
function $goog$math$Coordinate$$($opt_x$$, $opt_y$$) {
  this.x = $goog$isDef$$($opt_x$$) ? $opt_x$$ : 0;
  this.y = $goog$isDef$$($opt_y$$) ? $opt_y$$ : 0
}
$JSCompiler_prototypeAlias$$ = $goog$math$Coordinate$$.prototype;
$JSCompiler_prototypeAlias$$.$clone$ = function $$JSCompiler_prototypeAlias$$$$clone$$() {
  return new $goog$math$Coordinate$$(this.x, this.y)
};
$JSCompiler_prototypeAlias$$.toString = function $$JSCompiler_prototypeAlias$$$toString$() {
  return"(" + this.x + ", " + this.y + ")"
};
function $goog$math$Coordinate$equals$$($a$$12$$, $b$$10$$) {
  return $a$$12$$ == $b$$10$$ ? $JSCompiler_alias_TRUE$$ : !$a$$12$$ || !$b$$10$$ ? $JSCompiler_alias_FALSE$$ : $a$$12$$.x == $b$$10$$.x && $a$$12$$.y == $b$$10$$.y
}
$JSCompiler_prototypeAlias$$.ceil = function $$JSCompiler_prototypeAlias$$$ceil$() {
  this.x = Math.ceil(this.x);
  this.y = Math.ceil(this.y);
  return this
};
$JSCompiler_prototypeAlias$$.floor = function $$JSCompiler_prototypeAlias$$$floor$() {
  this.x = Math.floor(this.x);
  this.y = Math.floor(this.y);
  return this
};
$JSCompiler_prototypeAlias$$.round = function $$JSCompiler_prototypeAlias$$$round$() {
  this.x = Math.round(this.x);
  this.y = Math.round(this.y);
  return this
};
function $goog$math$Box$$($top$$2$$, $right$$5$$, $bottom$$1$$, $left$$5$$) {
  this.top = $top$$2$$;
  this.right = $right$$5$$;
  this.bottom = $bottom$$1$$;
  this.left = $left$$5$$
}
$JSCompiler_prototypeAlias$$ = $goog$math$Box$$.prototype;
$JSCompiler_prototypeAlias$$.$clone$ = function $$JSCompiler_prototypeAlias$$$$clone$$() {
  return new $goog$math$Box$$(this.top, this.right, this.bottom, this.left)
};
$JSCompiler_prototypeAlias$$.toString = function $$JSCompiler_prototypeAlias$$$toString$() {
  return"(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
};
$JSCompiler_prototypeAlias$$.contains = function $$JSCompiler_prototypeAlias$$$contains$($other$$7$$) {
  return!this || !$other$$7$$ ? $JSCompiler_alias_FALSE$$ : $other$$7$$ instanceof $goog$math$Box$$ ? $other$$7$$.left >= this.left && $other$$7$$.right <= this.right && $other$$7$$.top >= this.top && $other$$7$$.bottom <= this.bottom : $other$$7$$.x >= this.left && $other$$7$$.x <= this.right && $other$$7$$.y >= this.top && $other$$7$$.y <= this.bottom
};
$JSCompiler_prototypeAlias$$.ceil = function $$JSCompiler_prototypeAlias$$$ceil$() {
  this.top = Math.ceil(this.top);
  this.right = Math.ceil(this.right);
  this.bottom = Math.ceil(this.bottom);
  this.left = Math.ceil(this.left);
  return this
};
$JSCompiler_prototypeAlias$$.floor = function $$JSCompiler_prototypeAlias$$$floor$() {
  this.top = Math.floor(this.top);
  this.right = Math.floor(this.right);
  this.bottom = Math.floor(this.bottom);
  this.left = Math.floor(this.left);
  return this
};
$JSCompiler_prototypeAlias$$.round = function $$JSCompiler_prototypeAlias$$$round$() {
  this.top = Math.round(this.top);
  this.right = Math.round(this.right);
  this.bottom = Math.round(this.bottom);
  this.left = Math.round(this.left);
  return this
};
function $goog$math$Size$$($width$$12$$, $height$$11$$) {
  this.width = $width$$12$$;
  this.height = $height$$11$$
}
function $goog$math$Size$equals$$($a$$22$$, $b$$18$$) {
  return $a$$22$$ == $b$$18$$ ? $JSCompiler_alias_TRUE$$ : !$a$$22$$ || !$b$$18$$ ? $JSCompiler_alias_FALSE$$ : $a$$22$$.width == $b$$18$$.width && $a$$22$$.height == $b$$18$$.height
}
$JSCompiler_prototypeAlias$$ = $goog$math$Size$$.prototype;
$JSCompiler_prototypeAlias$$.$clone$ = function $$JSCompiler_prototypeAlias$$$$clone$$() {
  return new $goog$math$Size$$(this.width, this.height)
};
$JSCompiler_prototypeAlias$$.toString = function $$JSCompiler_prototypeAlias$$$toString$() {
  return"(" + this.width + " x " + this.height + ")"
};
$JSCompiler_prototypeAlias$$.ceil = function $$JSCompiler_prototypeAlias$$$ceil$() {
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this
};
$JSCompiler_prototypeAlias$$.floor = function $$JSCompiler_prototypeAlias$$$floor$() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
$JSCompiler_prototypeAlias$$.round = function $$JSCompiler_prototypeAlias$$$round$() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};
function $goog$math$Rect$$($x$$60$$, $y$$37$$, $w$$5$$, $h$$5$$) {
  this.left = $x$$60$$;
  this.top = $y$$37$$;
  this.width = $w$$5$$;
  this.height = $h$$5$$
}
$JSCompiler_prototypeAlias$$ = $goog$math$Rect$$.prototype;
$JSCompiler_prototypeAlias$$.$clone$ = function $$JSCompiler_prototypeAlias$$$$clone$$() {
  return new $goog$math$Rect$$(this.left, this.top, this.width, this.height)
};
$JSCompiler_prototypeAlias$$.toString = function $$JSCompiler_prototypeAlias$$$toString$() {
  return"(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
};
$JSCompiler_prototypeAlias$$.contains = function $$JSCompiler_prototypeAlias$$$contains$($another$$) {
  return $another$$ instanceof $goog$math$Rect$$ ? this.left <= $another$$.left && this.left + this.width >= $another$$.left + $another$$.width && this.top <= $another$$.top && this.top + this.height >= $another$$.top + $another$$.height : $another$$.x >= this.left && $another$$.x <= this.left + this.width && $another$$.y >= this.top && $another$$.y <= this.top + this.height
};
$JSCompiler_prototypeAlias$$.$getSize$ = function $$JSCompiler_prototypeAlias$$$$getSize$$() {
  return new $goog$math$Size$$(this.width, this.height)
};
$JSCompiler_prototypeAlias$$.ceil = function $$JSCompiler_prototypeAlias$$$ceil$() {
  this.left = Math.ceil(this.left);
  this.top = Math.ceil(this.top);
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this
};
$JSCompiler_prototypeAlias$$.floor = function $$JSCompiler_prototypeAlias$$$floor$() {
  this.left = Math.floor(this.left);
  this.top = Math.floor(this.top);
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
$JSCompiler_prototypeAlias$$.round = function $$JSCompiler_prototypeAlias$$$round$() {
  this.left = Math.round(this.left);
  this.top = Math.round(this.top);
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};
var $goog$dom$defaultDomHelper_$$;
function $goog$dom$classes$get$$($className$$4_element$$8$$) {
  $className$$4_element$$8$$ = $className$$4_element$$8$$.className;
  return $goog$isString$$($className$$4_element$$8$$) && $className$$4_element$$8$$.match(/\S+/g) || []
}
function $goog$dom$classes$add$$($element$$9$$, $var_args$$57$$) {
  for(var $classes$$ = $goog$dom$classes$get$$($element$$9$$), $args$$3_args$$inline_255$$ = $goog$array$slice$$(arguments, 1), $expectedCount$$ = $classes$$.length + $args$$3_args$$inline_255$$.length, $classes$$inline_254$$ = $classes$$, $i$$inline_256$$ = 0;$i$$inline_256$$ < $args$$3_args$$inline_255$$.length;$i$$inline_256$$++) {
    $goog$array$contains$$($classes$$inline_254$$, $args$$3_args$$inline_255$$[$i$$inline_256$$]) || $classes$$inline_254$$.push($args$$3_args$$inline_255$$[$i$$inline_256$$])
  }
  $element$$9$$.className = $classes$$.join(" ");
  return $classes$$.length == $expectedCount$$
}
function $goog$dom$classes$remove$$($element$$10$$, $var_args$$58$$) {
  var $classes$$1$$ = $goog$dom$classes$get$$($element$$10$$), $args$$4$$ = $goog$array$slice$$(arguments, 1), $newClasses$$ = $goog$dom$classes$getDifference_$$($classes$$1$$, $args$$4$$);
  $element$$10$$.className = $newClasses$$.join(" ");
  return $newClasses$$.length == $classes$$1$$.length - $args$$4$$.length
}
function $goog$dom$classes$getDifference_$$($arr1$$4$$, $arr2$$12$$) {
  return $goog$array$filter$$($arr1$$4$$, function($item$$) {
    return!$goog$array$contains$$($arr2$$12$$, $item$$)
  })
}
;var $goog$dom$BrowserFeature$CAN_ADD_NAME_OR_TYPE_ATTRIBUTES$$ = !$goog$userAgent$IE$$ || $goog$userAgent$IE$$ && 9 <= $goog$userAgent$DOCUMENT_MODE$$, $goog$dom$BrowserFeature$CAN_USE_CHILDREN_ATTRIBUTE$$ = !$goog$userAgent$GECKO$$ && !$goog$userAgent$IE$$ || $goog$userAgent$IE$$ && $goog$userAgent$IE$$ && 9 <= $goog$userAgent$DOCUMENT_MODE$$ || $goog$userAgent$GECKO$$ && $goog$userAgent$isVersion$$("1.9.1"), $goog$dom$BrowserFeature$CAN_USE_INNER_TEXT$$ = $goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("9");
function $goog$dom$getDomHelper$$($opt_element$$10$$) {
  return $opt_element$$10$$ ? new $goog$dom$DomHelper$$($goog$dom$getOwnerDocument$$($opt_element$$10$$)) : $goog$dom$defaultDomHelper_$$ || ($goog$dom$defaultDomHelper_$$ = new $goog$dom$DomHelper$$)
}
function $goog$dom$getElement$$($element$$16$$) {
  return $goog$isString$$($element$$16$$) ? document.getElementById($element$$16$$) : $element$$16$$
}
function $goog$dom$getElementsByTagNameAndClass_$$($opt_class$$1$$, $opt_el$$3$$) {
  var $doc$$6_el$$1_parent$$7$$, $i$$72$$, $len$$1$$, $arrayLike$$;
  $doc$$6_el$$1_parent$$7$$ = document;
  $doc$$6_el$$1_parent$$7$$ = $opt_el$$3$$ || $doc$$6_el$$1_parent$$7$$;
  if($doc$$6_el$$1_parent$$7$$.querySelectorAll && $doc$$6_el$$1_parent$$7$$.querySelector && $opt_class$$1$$) {
    return $doc$$6_el$$1_parent$$7$$.querySelectorAll("" + ($opt_class$$1$$ ? "." + $opt_class$$1$$ : ""))
  }
  if($opt_class$$1$$ && $doc$$6_el$$1_parent$$7$$.getElementsByClassName) {
    var $els$$ = $doc$$6_el$$1_parent$$7$$.getElementsByClassName($opt_class$$1$$);
    return $els$$
  }
  $els$$ = $doc$$6_el$$1_parent$$7$$.getElementsByTagName("*");
  if($opt_class$$1$$) {
    $arrayLike$$ = {};
    for($i$$72$$ = $len$$1$$ = 0;$doc$$6_el$$1_parent$$7$$ = $els$$[$i$$72$$];$i$$72$$++) {
      var $className$$10$$ = $doc$$6_el$$1_parent$$7$$.className;
      "function" == typeof $className$$10$$.split && $goog$array$contains$$($className$$10$$.split(/\s+/), $opt_class$$1$$) && ($arrayLike$$[$len$$1$$++] = $doc$$6_el$$1_parent$$7$$)
    }
    $arrayLike$$.length = $len$$1$$;
    return $arrayLike$$
  }
  return $els$$
}
function $goog$dom$setProperties$$($element$$17$$, $properties$$) {
  $goog$object$forEach$$($properties$$, function($val$$20$$, $key$$51$$) {
    "style" == $key$$51$$ ? $element$$17$$.style.cssText = $val$$20$$ : "class" == $key$$51$$ ? $element$$17$$.className = $val$$20$$ : "for" == $key$$51$$ ? $element$$17$$.htmlFor = $val$$20$$ : $key$$51$$ in $goog$dom$DIRECT_ATTRIBUTE_MAP_$$ ? $element$$17$$.setAttribute($goog$dom$DIRECT_ATTRIBUTE_MAP_$$[$key$$51$$], $val$$20$$) : 0 == $key$$51$$.lastIndexOf("aria-", 0) || 0 == $key$$51$$.lastIndexOf("data-", 0) ? $element$$17$$.setAttribute($key$$51$$, $val$$20$$) : $element$$17$$[$key$$51$$] = 
    $val$$20$$
  })
}
var $goog$dom$DIRECT_ATTRIBUTE_MAP_$$ = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", frameborder:"frameBorder", height:"height", maxlength:"maxLength", role:"role", rowspan:"rowSpan", type:"type", usemap:"useMap", valign:"vAlign", width:"width"};
function $goog$dom$getViewportSize_$$($doc$$7_el$$2_win$$) {
  $doc$$7_el$$2_win$$ = $doc$$7_el$$2_win$$.document;
  $doc$$7_el$$2_win$$ = "CSS1Compat" == $doc$$7_el$$2_win$$.compatMode ? $doc$$7_el$$2_win$$.documentElement : $doc$$7_el$$2_win$$.body;
  return new $goog$math$Size$$($doc$$7_el$$2_win$$.clientWidth, $doc$$7_el$$2_win$$.clientHeight)
}
function $goog$dom$getWindow_$$($doc$$11$$) {
  return $doc$$11$$.parentWindow || $doc$$11$$.defaultView
}
function $goog$dom$createDom$$($tagName$$2$$, $opt_attributes$$, $var_args$$59$$) {
  return $goog$dom$createDom_$$(document, arguments)
}
function $goog$dom$createDom_$$($doc$$12$$, $args$$6$$) {
  var $element$$18_tagName$$3_tagNameArr$$ = $args$$6$$[0], $attributes$$ = $args$$6$$[1];
  if(!$goog$dom$BrowserFeature$CAN_ADD_NAME_OR_TYPE_ATTRIBUTES$$ && $attributes$$ && ($attributes$$.name || $attributes$$.type)) {
    $element$$18_tagName$$3_tagNameArr$$ = ["<", $element$$18_tagName$$3_tagNameArr$$];
    $attributes$$.name && $element$$18_tagName$$3_tagNameArr$$.push(' name="', $goog$string$htmlEscape$$($attributes$$.name), '"');
    if($attributes$$.type) {
      $element$$18_tagName$$3_tagNameArr$$.push(' type="', $goog$string$htmlEscape$$($attributes$$.type), '"');
      var $clone$$3$$ = {};
      $goog$object$extend$$($clone$$3$$, $attributes$$);
      delete $clone$$3$$.type;
      $attributes$$ = $clone$$3$$
    }
    $element$$18_tagName$$3_tagNameArr$$.push(">");
    $element$$18_tagName$$3_tagNameArr$$ = $element$$18_tagName$$3_tagNameArr$$.join("")
  }
  $element$$18_tagName$$3_tagNameArr$$ = $doc$$12$$.createElement($element$$18_tagName$$3_tagNameArr$$);
  $attributes$$ && ($goog$isString$$($attributes$$) ? $element$$18_tagName$$3_tagNameArr$$.className = $attributes$$ : $goog$isArray$$($attributes$$) ? $goog$dom$classes$add$$.apply($JSCompiler_alias_NULL$$, [$element$$18_tagName$$3_tagNameArr$$].concat($attributes$$)) : $goog$dom$setProperties$$($element$$18_tagName$$3_tagNameArr$$, $attributes$$));
  2 < $args$$6$$.length && $goog$dom$append_$$($doc$$12$$, $element$$18_tagName$$3_tagNameArr$$, $args$$6$$, 2);
  return $element$$18_tagName$$3_tagNameArr$$
}
function $goog$dom$append_$$($doc$$13$$, $parent$$8$$, $args$$7$$, $i$$73_startIndex$$) {
  function $childHandler$$($child$$1$$) {
    $child$$1$$ && $parent$$8$$.appendChild($goog$isString$$($child$$1$$) ? $doc$$13$$.createTextNode($child$$1$$) : $child$$1$$)
  }
  for(;$i$$73_startIndex$$ < $args$$7$$.length;$i$$73_startIndex$$++) {
    var $arg$$5$$ = $args$$7$$[$i$$73_startIndex$$];
    $goog$isArrayLike$$($arg$$5$$) && !($goog$isObject$$($arg$$5$$) && 0 < $arg$$5$$.nodeType) ? $goog$array$forEach$$($goog$dom$isNodeList$$($arg$$5$$) ? $goog$array$toArray$$($arg$$5$$) : $arg$$5$$, $childHandler$$) : $childHandler$$($arg$$5$$)
  }
}
function $goog$dom$append$$($parent$$10$$, $var_args$$60$$) {
  $goog$dom$append_$$($goog$dom$getOwnerDocument$$($parent$$10$$), $parent$$10$$, arguments, 1)
}
function $goog$dom$removeChildren$$($node$$3$$) {
  for(var $child$$3$$;$child$$3$$ = $node$$3$$.firstChild;) {
    $node$$3$$.removeChild($child$$3$$)
  }
}
function $goog$dom$removeNode$$($node$$4$$) {
  return $node$$4$$ && $node$$4$$.parentNode ? $node$$4$$.parentNode.removeChild($node$$4$$) : $JSCompiler_alias_NULL$$
}
function $goog$dom$getChildren$$($element$$20$$) {
  return $goog$dom$BrowserFeature$CAN_USE_CHILDREN_ATTRIBUTE$$ && $element$$20$$.children != $JSCompiler_alias_VOID$$ ? $element$$20$$.children : $goog$array$filter$$($element$$20$$.childNodes, function($node$$5$$) {
    return 1 == $node$$5$$.nodeType
  })
}
function $goog$dom$contains$$($parent$$15$$, $descendant$$) {
  if($parent$$15$$.contains && 1 == $descendant$$.nodeType) {
    return $parent$$15$$ == $descendant$$ || $parent$$15$$.contains($descendant$$)
  }
  if("undefined" != typeof $parent$$15$$.compareDocumentPosition) {
    return $parent$$15$$ == $descendant$$ || Boolean($parent$$15$$.compareDocumentPosition($descendant$$) & 16)
  }
  for(;$descendant$$ && $parent$$15$$ != $descendant$$;) {
    $descendant$$ = $descendant$$.parentNode
  }
  return $descendant$$ == $parent$$15$$
}
function $goog$dom$getOwnerDocument$$($node$$15$$) {
  return 9 == $node$$15$$.nodeType ? $node$$15$$ : $node$$15$$.ownerDocument || $node$$15$$.document
}
function $goog$dom$setTextContent$$($element$$22$$, $text$$8$$) {
  if("textContent" in $element$$22$$) {
    $element$$22$$.textContent = $text$$8$$
  }else {
    if($element$$22$$.firstChild && 3 == $element$$22$$.firstChild.nodeType) {
      for(;$element$$22$$.lastChild != $element$$22$$.firstChild;) {
        $element$$22$$.removeChild($element$$22$$.lastChild)
      }
      $element$$22$$.firstChild.data = $text$$8$$
    }else {
      $goog$dom$removeChildren$$($element$$22$$), $element$$22$$.appendChild($goog$dom$getOwnerDocument$$($element$$22$$).createTextNode(String($text$$8$$)))
    }
  }
}
var $goog$dom$TAGS_TO_IGNORE_$$ = {SCRIPT:1, STYLE:1, HEAD:1, IFRAME:1, OBJECT:1}, $goog$dom$PREDEFINED_TAG_VALUES_$$ = {IMG:" ", BR:"\n"};
function $goog$dom$isFocusableTabIndex$$($element$$24_index$$58$$) {
  var $attrNode$$ = $element$$24_index$$58$$.getAttributeNode("tabindex");
  return $attrNode$$ && $attrNode$$.specified ? ($element$$24_index$$58$$ = $element$$24_index$$58$$.tabIndex, $goog$isNumber$$($element$$24_index$$58$$) && 0 <= $element$$24_index$$58$$ && 32768 > $element$$24_index$$58$$) : $JSCompiler_alias_FALSE$$
}
function $goog$dom$setFocusableTabIndex$$($element$$25$$, $enable$$) {
  $enable$$ ? $element$$25$$.tabIndex = 0 : ($element$$25$$.tabIndex = -1, $element$$25$$.removeAttribute("tabIndex"))
}
function $goog$dom$getTextContent$$($node$$16_textContent$$) {
  if($goog$dom$BrowserFeature$CAN_USE_INNER_TEXT$$ && "innerText" in $node$$16_textContent$$) {
    $node$$16_textContent$$ = $node$$16_textContent$$.innerText.replace(/(\r\n|\r|\n)/g, "\n")
  }else {
    var $buf$$ = [];
    $goog$dom$getTextContent_$$($node$$16_textContent$$, $buf$$, $JSCompiler_alias_TRUE$$);
    $node$$16_textContent$$ = $buf$$.join("")
  }
  $node$$16_textContent$$ = $node$$16_textContent$$.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
  $node$$16_textContent$$ = $node$$16_textContent$$.replace(/\u200B/g, "");
  $goog$dom$BrowserFeature$CAN_USE_INNER_TEXT$$ || ($node$$16_textContent$$ = $node$$16_textContent$$.replace(/ +/g, " "));
  " " != $node$$16_textContent$$ && ($node$$16_textContent$$ = $node$$16_textContent$$.replace(/^\s*/, ""));
  return $node$$16_textContent$$
}
function $goog$dom$getRawTextContent$$($node$$17$$) {
  var $buf$$1$$ = [];
  $goog$dom$getTextContent_$$($node$$17$$, $buf$$1$$, $JSCompiler_alias_FALSE$$);
  return $buf$$1$$.join("")
}
function $goog$dom$getTextContent_$$($child$$7_node$$18$$, $buf$$2$$, $normalizeWhitespace$$) {
  if(!($child$$7_node$$18$$.nodeName in $goog$dom$TAGS_TO_IGNORE_$$)) {
    if(3 == $child$$7_node$$18$$.nodeType) {
      $normalizeWhitespace$$ ? $buf$$2$$.push(String($child$$7_node$$18$$.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : $buf$$2$$.push($child$$7_node$$18$$.nodeValue)
    }else {
      if($child$$7_node$$18$$.nodeName in $goog$dom$PREDEFINED_TAG_VALUES_$$) {
        $buf$$2$$.push($goog$dom$PREDEFINED_TAG_VALUES_$$[$child$$7_node$$18$$.nodeName])
      }else {
        for($child$$7_node$$18$$ = $child$$7_node$$18$$.firstChild;$child$$7_node$$18$$;) {
          $goog$dom$getTextContent_$$($child$$7_node$$18$$, $buf$$2$$, $normalizeWhitespace$$), $child$$7_node$$18$$ = $child$$7_node$$18$$.nextSibling
        }
      }
    }
  }
}
function $goog$dom$isNodeList$$($val$$21$$) {
  if($val$$21$$ && "number" == typeof $val$$21$$.length) {
    if($goog$isObject$$($val$$21$$)) {
      return"function" == typeof $val$$21$$.item || "string" == typeof $val$$21$$.item
    }
    if($goog$isFunction$$($val$$21$$)) {
      return"function" == typeof $val$$21$$.item
    }
  }
  return $JSCompiler_alias_FALSE$$
}
function $goog$dom$DomHelper$$($opt_document$$) {
  this.$document_$ = $opt_document$$ || $goog$global$$.document || document
}
$JSCompiler_prototypeAlias$$ = $goog$dom$DomHelper$$.prototype;
$JSCompiler_prototypeAlias$$.$getDomHelper$ = $goog$dom$getDomHelper$$;
function $JSCompiler_StaticMethods_getDocument$$($JSCompiler_StaticMethods_getDocument$self$$) {
  return $JSCompiler_StaticMethods_getDocument$self$$.$document_$
}
$JSCompiler_prototypeAlias$$.$getElement$ = function $$JSCompiler_prototypeAlias$$$$getElement$$($element$$29$$) {
  return $goog$isString$$($element$$29$$) ? this.$document_$.getElementById($element$$29$$) : $element$$29$$
};
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($tagName$$5$$, $opt_attributes$$1$$, $var_args$$62$$) {
  return $goog$dom$createDom_$$(this.$document_$, arguments)
};
$JSCompiler_prototypeAlias$$.createElement = function $$JSCompiler_prototypeAlias$$$createElement$($name$$61$$) {
  return this.$document_$.createElement($name$$61$$)
};
$JSCompiler_prototypeAlias$$.createTextNode = function $$JSCompiler_prototypeAlias$$$createTextNode$($content$$1$$) {
  return this.$document_$.createTextNode(String($content$$1$$))
};
function $JSCompiler_StaticMethods_getDocumentScroll$$($JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_265$$) {
  var $doc$$inline_264_win$$inline_266$$ = $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_265$$.$document_$;
  $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_265$$ = !$goog$userAgent$WEBKIT$$ && "CSS1Compat" == $doc$$inline_264_win$$inline_266$$.compatMode ? $doc$$inline_264_win$$inline_266$$.documentElement : $doc$$inline_264_win$$inline_266$$.body;
  $doc$$inline_264_win$$inline_266$$ = $goog$dom$getWindow_$$($doc$$inline_264_win$$inline_266$$);
  return new $goog$math$Coordinate$$($doc$$inline_264_win$$inline_266$$.pageXOffset || $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_265$$.scrollLeft, $doc$$inline_264_win$$inline_266$$.pageYOffset || $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_265$$.scrollTop)
}
$JSCompiler_prototypeAlias$$.appendChild = function $$JSCompiler_prototypeAlias$$$appendChild$($parent$$9$$, $child$$2$$) {
  $parent$$9$$.appendChild($child$$2$$)
};
$JSCompiler_prototypeAlias$$.append = $goog$dom$append$$;
$JSCompiler_prototypeAlias$$.removeNode = $goog$dom$removeNode$$;
$JSCompiler_prototypeAlias$$.$getChildren$ = $goog$dom$getChildren$$;
function $JSCompiler_StaticMethods_getFirstElementChild$$($JSCompiler_StaticMethods_getFirstElementChild$self$$, $node$$6$$) {
  var $JSCompiler_temp$$59_node$$inline_268$$;
  if($node$$6$$.firstElementChild != $JSCompiler_alias_VOID$$) {
    $JSCompiler_temp$$59_node$$inline_268$$ = $node$$6$$.firstElementChild
  }else {
    for($JSCompiler_temp$$59_node$$inline_268$$ = $node$$6$$.firstChild;$JSCompiler_temp$$59_node$$inline_268$$ && 1 != $JSCompiler_temp$$59_node$$inline_268$$.nodeType;) {
      $JSCompiler_temp$$59_node$$inline_268$$ = $JSCompiler_temp$$59_node$$inline_268$$.nextSibling
    }
  }
  return $JSCompiler_temp$$59_node$$inline_268$$
}
$JSCompiler_prototypeAlias$$.contains = $goog$dom$contains$$;
function $goog$style$getComputedStyle$$($element$$35$$, $property$$4$$) {
  var $doc$$24_styles$$ = $goog$dom$getOwnerDocument$$($element$$35$$);
  return $doc$$24_styles$$.defaultView && $doc$$24_styles$$.defaultView.getComputedStyle && ($doc$$24_styles$$ = $doc$$24_styles$$.defaultView.getComputedStyle($element$$35$$, $JSCompiler_alias_NULL$$)) ? $doc$$24_styles$$[$property$$4$$] || $doc$$24_styles$$.getPropertyValue($property$$4$$) || "" : ""
}
function $goog$style$getStyle_$$($element$$37$$, $style$$5$$) {
  return $goog$style$getComputedStyle$$($element$$37$$, $style$$5$$) || ($element$$37$$.currentStyle ? $element$$37$$.currentStyle[$style$$5$$] : $JSCompiler_alias_NULL$$) || $element$$37$$.style && $element$$37$$.style[$style$$5$$]
}
function $goog$style$getComputedPosition$$($element$$38$$) {
  return $goog$style$getStyle_$$($element$$38$$, "position")
}
function $goog$style$setPosition$$($el$$4$$, $arg1_y$$38$$, $opt_arg2$$) {
  var $x$$61$$, $buggyGeckoSubPixelPos$$ = $goog$userAgent$GECKO$$ && ($goog$userAgent$detectedMac_$$ || $goog$userAgent$X11$$) && $goog$userAgent$isVersion$$("1.9");
  $arg1_y$$38$$ instanceof $goog$math$Coordinate$$ ? ($x$$61$$ = $arg1_y$$38$$.x, $arg1_y$$38$$ = $arg1_y$$38$$.y) : ($x$$61$$ = $arg1_y$$38$$, $arg1_y$$38$$ = $opt_arg2$$);
  $el$$4$$.style.left = $goog$style$getPixelStyleValue_$$($x$$61$$, $buggyGeckoSubPixelPos$$);
  $el$$4$$.style.top = $goog$style$getPixelStyleValue_$$($arg1_y$$38$$, $buggyGeckoSubPixelPos$$)
}
function $goog$style$getBoundingClientRect_$$($doc$$27_el$$5$$) {
  var $rect$$4$$ = $doc$$27_el$$5$$.getBoundingClientRect();
  $goog$userAgent$IE$$ && ($doc$$27_el$$5$$ = $doc$$27_el$$5$$.ownerDocument, $rect$$4$$.left -= $doc$$27_el$$5$$.documentElement.clientLeft + $doc$$27_el$$5$$.body.clientLeft, $rect$$4$$.top -= $doc$$27_el$$5$$.documentElement.clientTop + $doc$$27_el$$5$$.body.clientTop);
  return $rect$$4$$
}
function $goog$style$getOffsetParent$$($element$$46_parent$$18$$) {
  if($goog$userAgent$IE$$ && !($goog$userAgent$IE$$ && 8 <= $goog$userAgent$DOCUMENT_MODE$$)) {
    return $element$$46_parent$$18$$.offsetParent
  }
  var $doc$$28$$ = $goog$dom$getOwnerDocument$$($element$$46_parent$$18$$), $positionStyle$$ = $goog$style$getStyle_$$($element$$46_parent$$18$$, "position"), $skipStatic$$ = "fixed" == $positionStyle$$ || "absolute" == $positionStyle$$;
  for($element$$46_parent$$18$$ = $element$$46_parent$$18$$.parentNode;$element$$46_parent$$18$$ && $element$$46_parent$$18$$ != $doc$$28$$;$element$$46_parent$$18$$ = $element$$46_parent$$18$$.parentNode) {
    if($positionStyle$$ = $goog$style$getStyle_$$($element$$46_parent$$18$$, "position"), $skipStatic$$ = $skipStatic$$ && "static" == $positionStyle$$ && $element$$46_parent$$18$$ != $doc$$28$$.documentElement && $element$$46_parent$$18$$ != $doc$$28$$.body, !$skipStatic$$ && ($element$$46_parent$$18$$.scrollWidth > $element$$46_parent$$18$$.clientWidth || $element$$46_parent$$18$$.scrollHeight > $element$$46_parent$$18$$.clientHeight || "fixed" == $positionStyle$$ || "absolute" == $positionStyle$$ || 
    "relative" == $positionStyle$$)) {
      return $element$$46_parent$$18$$
    }
  }
  return $JSCompiler_alias_NULL$$
}
function $goog$style$getRelativePosition$$($a$$28_ap$$) {
  var $b$$24_bp$$ = document.documentElement;
  $a$$28_ap$$ = $goog$style$getClientPosition$$($a$$28_ap$$);
  $b$$24_bp$$ = $goog$style$getClientPosition$$($b$$24_bp$$);
  return new $goog$math$Coordinate$$($a$$28_ap$$.x - $b$$24_bp$$.x, $a$$28_ap$$.y - $b$$24_bp$$.y)
}
function $goog$style$getClientPosition$$($JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$) {
  var $JSCompiler_temp_const$$30_pos$$4$$ = new $goog$math$Coordinate$$;
  if(1 == $JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$.nodeType) {
    if($JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$.getBoundingClientRect) {
      var $box$$8_scrollCoord$$1$$ = $goog$style$getBoundingClientRect_$$($JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$);
      $JSCompiler_temp_const$$30_pos$$4$$.x = $box$$8_scrollCoord$$1$$.left;
      $JSCompiler_temp_const$$30_pos$$4$$.y = $box$$8_scrollCoord$$1$$.top
    }else {
      $box$$8_scrollCoord$$1$$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$($JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$));
      var $box$$inline_274_doc$$inline_855$$, $doc$$inline_275_scrollCoord$$inline_280_vpBox$$inline_281$$ = $goog$dom$getOwnerDocument$$($JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$), $positionStyle$$inline_276$$ = $goog$style$getStyle_$$($JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$, "position");
      $goog$asserts$assertObject$$($JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$, "Parameter is required");
      var $BUGGY_GECKO_BOX_OBJECT$$inline_277_parent$$inline_282$$ = $goog$userAgent$GECKO$$ && $doc$$inline_275_scrollCoord$$inline_280_vpBox$$inline_281$$.getBoxObjectFor && !$JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$.getBoundingClientRect && "absolute" == $positionStyle$$inline_276$$ && ($box$$inline_274_doc$$inline_855$$ = $doc$$inline_275_scrollCoord$$inline_280_vpBox$$inline_281$$.getBoxObjectFor($JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$)) && (0 > $box$$inline_274_doc$$inline_855$$.screenX || 
      0 > $box$$inline_274_doc$$inline_855$$.screenY), $pos$$inline_278$$ = new $goog$math$Coordinate$$(0, 0), $JSCompiler_temp$$inline_856_JSCompiler_temp$$inline_857_viewportElement$$inline_279$$;
      $box$$inline_274_doc$$inline_855$$ = $doc$$inline_275_scrollCoord$$inline_280_vpBox$$inline_281$$ ? $goog$dom$getOwnerDocument$$($doc$$inline_275_scrollCoord$$inline_280_vpBox$$inline_281$$) : document;
      if($JSCompiler_temp$$inline_856_JSCompiler_temp$$inline_857_viewportElement$$inline_279$$ = $goog$userAgent$IE$$) {
        if($JSCompiler_temp$$inline_856_JSCompiler_temp$$inline_857_viewportElement$$inline_279$$ = !($goog$userAgent$IE$$ && 9 <= $goog$userAgent$DOCUMENT_MODE$$)) {
          $JSCompiler_temp$$inline_856_JSCompiler_temp$$inline_857_viewportElement$$inline_279$$ = "CSS1Compat" != $goog$dom$getDomHelper$$($box$$inline_274_doc$$inline_855$$).$document_$.compatMode
        }
      }
      $JSCompiler_temp$$inline_856_JSCompiler_temp$$inline_857_viewportElement$$inline_279$$ = $JSCompiler_temp$$inline_856_JSCompiler_temp$$inline_857_viewportElement$$inline_279$$ ? $box$$inline_274_doc$$inline_855$$.body : $box$$inline_274_doc$$inline_855$$.documentElement;
      if($JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$ != $JSCompiler_temp$$inline_856_JSCompiler_temp$$inline_857_viewportElement$$inline_279$$) {
        if($JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$.getBoundingClientRect) {
          $box$$inline_274_doc$$inline_855$$ = $goog$style$getBoundingClientRect_$$($JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$), $doc$$inline_275_scrollCoord$$inline_280_vpBox$$inline_281$$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$($doc$$inline_275_scrollCoord$$inline_280_vpBox$$inline_281$$)), $pos$$inline_278$$.x = $box$$inline_274_doc$$inline_855$$.left + $doc$$inline_275_scrollCoord$$inline_280_vpBox$$inline_281$$.x, $pos$$inline_278$$.y = $box$$inline_274_doc$$inline_855$$.top + 
          $doc$$inline_275_scrollCoord$$inline_280_vpBox$$inline_281$$.y
        }else {
          if($doc$$inline_275_scrollCoord$$inline_280_vpBox$$inline_281$$.getBoxObjectFor && !$BUGGY_GECKO_BOX_OBJECT$$inline_277_parent$$inline_282$$) {
            $box$$inline_274_doc$$inline_855$$ = $doc$$inline_275_scrollCoord$$inline_280_vpBox$$inline_281$$.getBoxObjectFor($JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$), $doc$$inline_275_scrollCoord$$inline_280_vpBox$$inline_281$$ = $doc$$inline_275_scrollCoord$$inline_280_vpBox$$inline_281$$.getBoxObjectFor($JSCompiler_temp$$inline_856_JSCompiler_temp$$inline_857_viewportElement$$inline_279$$), $pos$$inline_278$$.x = $box$$inline_274_doc$$inline_855$$.screenX - $doc$$inline_275_scrollCoord$$inline_280_vpBox$$inline_281$$.screenX, 
            $pos$$inline_278$$.y = $box$$inline_274_doc$$inline_855$$.screenY - $doc$$inline_275_scrollCoord$$inline_280_vpBox$$inline_281$$.screenY
          }else {
            $BUGGY_GECKO_BOX_OBJECT$$inline_277_parent$$inline_282$$ = $JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$;
            do {
              $pos$$inline_278$$.x += $BUGGY_GECKO_BOX_OBJECT$$inline_277_parent$$inline_282$$.offsetLeft;
              $pos$$inline_278$$.y += $BUGGY_GECKO_BOX_OBJECT$$inline_277_parent$$inline_282$$.offsetTop;
              $BUGGY_GECKO_BOX_OBJECT$$inline_277_parent$$inline_282$$ != $JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$ && ($pos$$inline_278$$.x += $BUGGY_GECKO_BOX_OBJECT$$inline_277_parent$$inline_282$$.clientLeft || 0, $pos$$inline_278$$.y += $BUGGY_GECKO_BOX_OBJECT$$inline_277_parent$$inline_282$$.clientTop || 0);
              if($goog$userAgent$WEBKIT$$ && "fixed" == $goog$style$getComputedPosition$$($BUGGY_GECKO_BOX_OBJECT$$inline_277_parent$$inline_282$$)) {
                $pos$$inline_278$$.x += $doc$$inline_275_scrollCoord$$inline_280_vpBox$$inline_281$$.body.scrollLeft;
                $pos$$inline_278$$.y += $doc$$inline_275_scrollCoord$$inline_280_vpBox$$inline_281$$.body.scrollTop;
                break
              }
              $BUGGY_GECKO_BOX_OBJECT$$inline_277_parent$$inline_282$$ = $BUGGY_GECKO_BOX_OBJECT$$inline_277_parent$$inline_282$$.offsetParent
            }while($BUGGY_GECKO_BOX_OBJECT$$inline_277_parent$$inline_282$$ && $BUGGY_GECKO_BOX_OBJECT$$inline_277_parent$$inline_282$$ != $JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$);
            if($goog$userAgent$OPERA$$ || $goog$userAgent$WEBKIT$$ && "absolute" == $positionStyle$$inline_276$$) {
              $pos$$inline_278$$.y -= $doc$$inline_275_scrollCoord$$inline_280_vpBox$$inline_281$$.body.offsetTop
            }
            for($BUGGY_GECKO_BOX_OBJECT$$inline_277_parent$$inline_282$$ = $JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$;($BUGGY_GECKO_BOX_OBJECT$$inline_277_parent$$inline_282$$ = $goog$style$getOffsetParent$$($BUGGY_GECKO_BOX_OBJECT$$inline_277_parent$$inline_282$$)) && $BUGGY_GECKO_BOX_OBJECT$$inline_277_parent$$inline_282$$ != $doc$$inline_275_scrollCoord$$inline_280_vpBox$$inline_281$$.body && $BUGGY_GECKO_BOX_OBJECT$$inline_277_parent$$inline_282$$ != $JSCompiler_temp$$inline_856_JSCompiler_temp$$inline_857_viewportElement$$inline_279$$;) {
              if($pos$$inline_278$$.x -= $BUGGY_GECKO_BOX_OBJECT$$inline_277_parent$$inline_282$$.scrollLeft, !$goog$userAgent$OPERA$$ || "TR" != $BUGGY_GECKO_BOX_OBJECT$$inline_277_parent$$inline_282$$.tagName) {
                $pos$$inline_278$$.y -= $BUGGY_GECKO_BOX_OBJECT$$inline_277_parent$$inline_282$$.scrollTop
              }
            }
          }
        }
      }
      $JSCompiler_temp_const$$30_pos$$4$$.x = $pos$$inline_278$$.x - $box$$8_scrollCoord$$1$$.x;
      $JSCompiler_temp_const$$30_pos$$4$$.y = $pos$$inline_278$$.y - $box$$8_scrollCoord$$1$$.y
    }
    if($goog$userAgent$GECKO$$ && !$goog$userAgent$isVersion$$(12)) {
      var $isAbstractedEvent_property$$inline_285$$;
      $goog$userAgent$IE$$ ? $isAbstractedEvent_property$$inline_285$$ = "-ms-transform" : $goog$userAgent$WEBKIT$$ ? $isAbstractedEvent_property$$inline_285$$ = "-webkit-transform" : $goog$userAgent$OPERA$$ ? $isAbstractedEvent_property$$inline_285$$ = "-o-transform" : $goog$userAgent$GECKO$$ && ($isAbstractedEvent_property$$inline_285$$ = "-moz-transform");
      var $targetEvent_transform$$inline_286$$;
      $isAbstractedEvent_property$$inline_285$$ && ($targetEvent_transform$$inline_286$$ = $goog$style$getStyle_$$($JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$, $isAbstractedEvent_property$$inline_285$$));
      $targetEvent_transform$$inline_286$$ || ($targetEvent_transform$$inline_286$$ = $goog$style$getStyle_$$($JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$, "transform"));
      $targetEvent_transform$$inline_286$$ ? ($JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$ = $targetEvent_transform$$inline_286$$.match($goog$style$MATRIX_TRANSLATION_REGEX_$$), $JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$ = !$JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$ ? new $goog$math$Coordinate$$(0, 0) : new $goog$math$Coordinate$$(parseFloat($JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$[1]), parseFloat($JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$[2]))) : 
      $JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$ = new $goog$math$Coordinate$$(0, 0);
      $JSCompiler_temp_const$$30_pos$$4$$ = new $goog$math$Coordinate$$($JSCompiler_temp_const$$30_pos$$4$$.x + $JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$.x, $JSCompiler_temp_const$$30_pos$$4$$.y + $JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$.y)
    }
  }else {
    $isAbstractedEvent_property$$inline_285$$ = $goog$isFunction$$($JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$.$getBrowserEvent$), $targetEvent_transform$$inline_286$$ = $JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$, $JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$.targetTouches ? $targetEvent_transform$$inline_286$$ = $JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$.targetTouches[0] : $isAbstractedEvent_property$$inline_285$$ && $JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$.$event_$.targetTouches && 
    ($targetEvent_transform$$inline_286$$ = $JSCompiler_inline_result$$31_el$$12_matches$$inline_287$$.$event_$.targetTouches[0]), $JSCompiler_temp_const$$30_pos$$4$$.x = $targetEvent_transform$$inline_286$$.clientX, $JSCompiler_temp_const$$30_pos$$4$$.y = $targetEvent_transform$$inline_286$$.clientY
  }
  return $JSCompiler_temp_const$$30_pos$$4$$
}
function $goog$style$setSize$$($element$$50$$, $w$$6$$, $h$$6_opt_h$$) {
  $w$$6$$ instanceof $goog$math$Size$$ ? ($h$$6_opt_h$$ = $w$$6$$.height, $w$$6$$ = $w$$6$$.width) : $h$$6_opt_h$$ == $JSCompiler_alias_VOID$$ && $JSCompiler_alias_THROW$$(Error("missing height argument"));
  $element$$50$$.style.width = $goog$style$getPixelStyleValue_$$($w$$6$$, $JSCompiler_alias_TRUE$$);
  $element$$50$$.style.height = $goog$style$getPixelStyleValue_$$($h$$6_opt_h$$, $JSCompiler_alias_TRUE$$)
}
function $goog$style$getPixelStyleValue_$$($value$$67$$, $round$$) {
  "number" == typeof $value$$67$$ && ($value$$67$$ = ($round$$ ? Math.round($value$$67$$) : $value$$67$$) + "px");
  return $value$$67$$
}
function $goog$style$getSize$$($element$$53_size$$10$$) {
  if("none" != $goog$style$getStyle_$$($element$$53_size$$10$$, "display")) {
    return $goog$style$getSizeWithDisplay_$$($element$$53_size$$10$$)
  }
  var $style$$6$$ = $element$$53_size$$10$$.style, $originalDisplay$$ = $style$$6$$.display, $originalVisibility$$ = $style$$6$$.visibility, $originalPosition$$ = $style$$6$$.position;
  $style$$6$$.visibility = "hidden";
  $style$$6$$.position = "absolute";
  $style$$6$$.display = "inline";
  $element$$53_size$$10$$ = $goog$style$getSizeWithDisplay_$$($element$$53_size$$10$$);
  $style$$6$$.display = $originalDisplay$$;
  $style$$6$$.position = $originalPosition$$;
  $style$$6$$.visibility = $originalVisibility$$;
  return $element$$53_size$$10$$
}
function $goog$style$getSizeWithDisplay_$$($clientRect_element$$54$$) {
  var $offsetWidth$$ = $clientRect_element$$54$$.offsetWidth, $offsetHeight$$ = $clientRect_element$$54$$.offsetHeight, $webkitOffsetsZero$$ = $goog$userAgent$WEBKIT$$ && !$offsetWidth$$ && !$offsetHeight$$;
  return(!$goog$isDef$$($offsetWidth$$) || $webkitOffsetsZero$$) && $clientRect_element$$54$$.getBoundingClientRect ? ($clientRect_element$$54$$ = $goog$style$getBoundingClientRect_$$($clientRect_element$$54$$), new $goog$math$Size$$($clientRect_element$$54$$.right - $clientRect_element$$54$$.left, $clientRect_element$$54$$.bottom - $clientRect_element$$54$$.top)) : new $goog$math$Size$$($offsetWidth$$, $offsetHeight$$)
}
function $goog$style$setOpacity$$($el$$15$$, $alpha$$3$$) {
  var $style$$8$$ = $el$$15$$.style;
  "opacity" in $style$$8$$ ? $style$$8$$.opacity = $alpha$$3$$ : "MozOpacity" in $style$$8$$ ? $style$$8$$.MozOpacity = $alpha$$3$$ : "filter" in $style$$8$$ && ($style$$8$$.filter = "" === $alpha$$3$$ ? "" : "alpha(opacity=" + 100 * $alpha$$3$$ + ")")
}
function $goog$style$showElement$$($el$$18$$, $display$$) {
  $el$$18$$.style.display = $display$$ ? "" : "none"
}
function $goog$style$isRightToLeft$$($el$$22$$) {
  return"rtl" == $goog$style$getStyle_$$($el$$22$$, "direction")
}
var $goog$style$unselectableStyle_$$ = $goog$userAgent$GECKO$$ ? "MozUserSelect" : $goog$userAgent$WEBKIT$$ ? "WebkitUserSelect" : $JSCompiler_alias_NULL$$, $goog$style$ieBorderWidthKeywords_$$ = {thin:2, medium:4, thick:6};
function $goog$style$getIePixelBorder_$$($element$$67$$, $prop$$5$$) {
  if("none" == ($element$$67$$.currentStyle ? $element$$67$$.currentStyle[$prop$$5$$ + "Style"] : $JSCompiler_alias_NULL$$)) {
    return 0
  }
  var $pixelValue$$inline_304_width$$15$$ = $element$$67$$.currentStyle ? $element$$67$$.currentStyle[$prop$$5$$ + "Width"] : $JSCompiler_alias_NULL$$, $JSCompiler_temp$$24_oldStyleValue$$inline_302$$;
  if($pixelValue$$inline_304_width$$15$$ in $goog$style$ieBorderWidthKeywords_$$) {
    $JSCompiler_temp$$24_oldStyleValue$$inline_302$$ = $goog$style$ieBorderWidthKeywords_$$[$pixelValue$$inline_304_width$$15$$]
  }else {
    if(/^\d+px?$/.test($pixelValue$$inline_304_width$$15$$)) {
      $JSCompiler_temp$$24_oldStyleValue$$inline_302$$ = parseInt($pixelValue$$inline_304_width$$15$$, 10)
    }else {
      $JSCompiler_temp$$24_oldStyleValue$$inline_302$$ = $element$$67$$.style.left;
      var $oldRuntimeValue$$inline_303$$ = $element$$67$$.runtimeStyle.left;
      $element$$67$$.runtimeStyle.left = $element$$67$$.currentStyle.left;
      $element$$67$$.style.left = $pixelValue$$inline_304_width$$15$$;
      $pixelValue$$inline_304_width$$15$$ = $element$$67$$.style.pixelLeft;
      $element$$67$$.style.left = $JSCompiler_temp$$24_oldStyleValue$$inline_302$$;
      $element$$67$$.runtimeStyle.left = $oldRuntimeValue$$inline_303$$;
      $JSCompiler_temp$$24_oldStyleValue$$inline_302$$ = $pixelValue$$inline_304_width$$15$$
    }
  }
  return $JSCompiler_temp$$24_oldStyleValue$$inline_302$$
}
function $goog$style$getBorderBox$$($bottom$$5_element$$68$$) {
  if($goog$userAgent$IE$$) {
    var $left$$8$$ = $goog$style$getIePixelBorder_$$($bottom$$5_element$$68$$, "borderLeft"), $right$$9$$ = $goog$style$getIePixelBorder_$$($bottom$$5_element$$68$$, "borderRight"), $top$$6$$ = $goog$style$getIePixelBorder_$$($bottom$$5_element$$68$$, "borderTop");
    $bottom$$5_element$$68$$ = $goog$style$getIePixelBorder_$$($bottom$$5_element$$68$$, "borderBottom");
    return new $goog$math$Box$$($top$$6$$, $right$$9$$, $bottom$$5_element$$68$$, $left$$8$$)
  }
  $left$$8$$ = $goog$style$getComputedStyle$$($bottom$$5_element$$68$$, "borderLeftWidth");
  $right$$9$$ = $goog$style$getComputedStyle$$($bottom$$5_element$$68$$, "borderRightWidth");
  $top$$6$$ = $goog$style$getComputedStyle$$($bottom$$5_element$$68$$, "borderTopWidth");
  $bottom$$5_element$$68$$ = $goog$style$getComputedStyle$$($bottom$$5_element$$68$$, "borderBottomWidth");
  return new $goog$math$Box$$(parseFloat($top$$6$$), parseFloat($right$$9$$), parseFloat($bottom$$5_element$$68$$), parseFloat($left$$8$$))
}
var $goog$style$MATRIX_TRANSLATION_REGEX_$$ = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
var $goog$ui$$ = {};
function $goog$ui$IdGenerator$$() {
}
$goog$addSingletonGetter$$($goog$ui$IdGenerator$$);
$goog$ui$IdGenerator$$.prototype.$nextId_$ = 0;
$goog$ui$IdGenerator$$.$getInstance$();
function $goog$events$EventTarget$$() {
  $goog$Disposable$$.call(this)
}
$goog$inherits$$($goog$events$EventTarget$$, $goog$Disposable$$);
$JSCompiler_prototypeAlias$$ = $goog$events$EventTarget$$.prototype;
$JSCompiler_prototypeAlias$$.$customEvent_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$parentEventTarget_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$setParentEventTarget$ = $JSCompiler_set$$("$parentEventTarget_$");
$JSCompiler_prototypeAlias$$.addEventListener = function $$JSCompiler_prototypeAlias$$$addEventListener$($type$$79$$, $handler$$3$$, $opt_capture$$4$$, $opt_handlerScope$$) {
  $goog$events$listen$$(this, $type$$79$$, $handler$$3$$, $opt_capture$$4$$, $opt_handlerScope$$)
};
$JSCompiler_prototypeAlias$$.removeEventListener = function $$JSCompiler_prototypeAlias$$$removeEventListener$($type$$80$$, $handler$$4$$, $opt_capture$$5$$, $opt_handlerScope$$1$$) {
  $goog$events$unlisten$$(this, $type$$80$$, $handler$$4$$, $opt_capture$$5$$, $opt_handlerScope$$1$$)
};
$JSCompiler_prototypeAlias$$.dispatchEvent = function $$JSCompiler_prototypeAlias$$$dispatchEvent$($e$$24$$) {
  return $goog$events$dispatchEvent$$(this, $e$$24$$)
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$events$EventTarget$$.$superClass_$.$disposeInternal$.call(this);
  $goog$events$removeAll$$(this);
  this.$parentEventTarget_$ = $JSCompiler_alias_NULL$$
};
function $goog$ui$Component$$($opt_domHelper$$) {
  $goog$Disposable$$.call(this);
  this.$dom_$ = $opt_domHelper$$ || $goog$dom$getDomHelper$$();
  this.$rightToLeft_$ = $goog$ui$Component$defaultRightToLeft_$$
}
$goog$inherits$$($goog$ui$Component$$, $goog$events$EventTarget$$);
$goog$ui$Component$$.prototype.$idGenerator_$ = $goog$ui$IdGenerator$$.$getInstance$();
var $goog$ui$Component$defaultRightToLeft_$$ = $JSCompiler_alias_NULL$$;
function $goog$ui$Component$getStateTransitionEvent$$($state$$, $isEntering$$) {
  switch($state$$) {
    case 1:
      return $isEntering$$ ? "disable" : "enable";
    case 2:
      return $isEntering$$ ? "highlight" : "unhighlight";
    case 4:
      return $isEntering$$ ? "activate" : "deactivate";
    case 8:
      return $isEntering$$ ? "select" : "unselect";
    case 16:
      return $isEntering$$ ? "check" : "uncheck";
    case 32:
      return $isEntering$$ ? "focus" : "blur";
    case 64:
      return $isEntering$$ ? "open" : "close"
  }
  $JSCompiler_alias_THROW$$(Error("Invalid component state"))
}
$JSCompiler_prototypeAlias$$ = $goog$ui$Component$$.prototype;
$JSCompiler_prototypeAlias$$.$id_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$inDocument_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$element_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$rightToLeft_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$model_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$parent_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$children_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$childIndex_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$wasDecorated_$ = $JSCompiler_alias_FALSE$$;
function $JSCompiler_StaticMethods_getId$$($JSCompiler_StaticMethods_getId$self$$) {
  return $JSCompiler_StaticMethods_getId$self$$.$id_$ || ($JSCompiler_StaticMethods_getId$self$$.$id_$ = ":" + ($JSCompiler_StaticMethods_getId$self$$.$idGenerator_$.$nextId_$++).toString(36))
}
function $JSCompiler_StaticMethods_setId$$($JSCompiler_StaticMethods_setId$self$$, $id$$4$$) {
  if($JSCompiler_StaticMethods_setId$self$$.$parent_$ && $JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$) {
    var $obj$$inline_860$$ = $JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$, $key$$inline_861$$ = $JSCompiler_StaticMethods_setId$self$$.$id_$;
    $key$$inline_861$$ in $obj$$inline_860$$ && delete $obj$$inline_860$$[$key$$inline_861$$];
    $goog$object$add$$($JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$, $id$$4$$, $JSCompiler_StaticMethods_setId$self$$)
  }
  $JSCompiler_StaticMethods_setId$self$$.$id_$ = $id$$4$$
}
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
$JSCompiler_prototypeAlias$$.$setElementInternal$ = $JSCompiler_set$$("$element_$");
$JSCompiler_prototypeAlias$$.$getHandler$ = function $$JSCompiler_prototypeAlias$$$$getHandler$$() {
  return this.$googUiComponentHandler_$ || (this.$googUiComponentHandler_$ = new $goog$events$EventHandler$$(this))
};
function $JSCompiler_StaticMethods_setParent$$($JSCompiler_StaticMethods_setParent$self$$, $parent$$21$$) {
  $JSCompiler_StaticMethods_setParent$self$$ == $parent$$21$$ && $JSCompiler_alias_THROW$$(Error("Unable to set parent component"));
  $parent$$21$$ && ($JSCompiler_StaticMethods_setParent$self$$.$parent_$ && $JSCompiler_StaticMethods_setParent$self$$.$id_$ && $JSCompiler_StaticMethods_setParent$self$$.$parent_$.$childIndex_$ && $JSCompiler_StaticMethods_setParent$self$$.$id_$ && ($JSCompiler_StaticMethods_setParent$self$$.$id_$ in $JSCompiler_StaticMethods_setParent$self$$.$parent_$.$childIndex_$ && $JSCompiler_StaticMethods_setParent$self$$.$parent_$.$childIndex_$[$JSCompiler_StaticMethods_setParent$self$$.$id_$]) && $JSCompiler_StaticMethods_setParent$self$$.$parent_$ != 
  $parent$$21$$) && $JSCompiler_alias_THROW$$(Error("Unable to set parent component"));
  $JSCompiler_StaticMethods_setParent$self$$.$parent_$ = $parent$$21$$;
  $goog$ui$Component$$.$superClass_$.$setParentEventTarget$.call($JSCompiler_StaticMethods_setParent$self$$, $parent$$21$$)
}
$JSCompiler_prototypeAlias$$.getParent = $JSCompiler_get$$("$parent_$");
$JSCompiler_prototypeAlias$$.$setParentEventTarget$ = function $$JSCompiler_prototypeAlias$$$$setParentEventTarget$$($parent$$22$$) {
  this.$parent_$ && this.$parent_$ != $parent$$22$$ && $JSCompiler_alias_THROW$$(Error("Method not supported"));
  $goog$ui$Component$$.$superClass_$.$setParentEventTarget$.call(this, $parent$$22$$)
};
$JSCompiler_prototypeAlias$$.$getDomHelper$ = $JSCompiler_get$$("$dom_$");
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  this.$element_$ = this.$dom_$.createElement("div")
};
function $JSCompiler_StaticMethods_render_$$($JSCompiler_StaticMethods_render_$self$$) {
  $JSCompiler_StaticMethods_render_$self$$.$inDocument_$ && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  $JSCompiler_StaticMethods_render_$self$$.$element_$ || $JSCompiler_StaticMethods_render_$self$$.$createDom$();
  $JSCompiler_StaticMethods_render_$self$$.$dom_$.$document_$.body.appendChild($JSCompiler_StaticMethods_render_$self$$.$element_$);
  (!$JSCompiler_StaticMethods_render_$self$$.$parent_$ || $JSCompiler_StaticMethods_render_$self$$.$parent_$.$inDocument_$) && $JSCompiler_StaticMethods_render_$self$$.$enterDocument$()
}
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($element$$71$$) {
  this.$inDocument_$ && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  if($element$$71$$ && this.$canDecorate$($element$$71$$)) {
    this.$wasDecorated_$ = $JSCompiler_alias_TRUE$$;
    if(!this.$dom_$ || this.$dom_$.$document_$ != $goog$dom$getOwnerDocument$$($element$$71$$)) {
      this.$dom_$ = $goog$dom$getDomHelper$$($element$$71$$)
    }
    this.$decorateInternal$($element$$71$$);
    this.$enterDocument$()
  }else {
    $JSCompiler_alias_THROW$$(Error("Invalid element to decorate"))
  }
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = $JSCompiler_returnArg$$($JSCompiler_alias_TRUE$$);
$JSCompiler_prototypeAlias$$.$decorateInternal$ = $JSCompiler_set$$("$element_$");
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  this.$inDocument_$ = $JSCompiler_alias_TRUE$$;
  $JSCompiler_StaticMethods_forEachChild$$(this, function($child$$8$$) {
    !$child$$8$$.$inDocument_$ && $child$$8$$.$getElement$() && $child$$8$$.$enterDocument$()
  })
};
$JSCompiler_prototypeAlias$$.$exitDocument$ = function $$JSCompiler_prototypeAlias$$$$exitDocument$$() {
  $JSCompiler_StaticMethods_forEachChild$$(this, function($child$$9$$) {
    $child$$9$$.$inDocument_$ && $child$$9$$.$exitDocument$()
  });
  this.$googUiComponentHandler_$ && $JSCompiler_StaticMethods_removeAll$$(this.$googUiComponentHandler_$);
  this.$inDocument_$ = $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  this.$inDocument_$ && this.$exitDocument$();
  this.$googUiComponentHandler_$ && (this.$googUiComponentHandler_$.$dispose$(), delete this.$googUiComponentHandler_$);
  $JSCompiler_StaticMethods_forEachChild$$(this, function($child$$10$$) {
    $child$$10$$.$dispose$()
  });
  !this.$wasDecorated_$ && this.$element_$ && $goog$dom$removeNode$$(this.$element_$);
  this.$parent_$ = this.$model_$ = this.$element_$ = this.$childIndex_$ = this.$children_$ = $JSCompiler_alias_NULL$$;
  $goog$ui$Component$$.$superClass_$.$disposeInternal$.call(this)
};
function $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_addChild$self$$, $child$$11$$) {
  var $index$$inline_312$$ = $JSCompiler_StaticMethods_addChild$self$$.$children_$ ? $JSCompiler_StaticMethods_addChild$self$$.$children_$.length : 0;
  $child$$11$$.$inDocument_$ && !$JSCompiler_StaticMethods_addChild$self$$.$inDocument_$ && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  (0 > $index$$inline_312$$ || $index$$inline_312$$ > ($JSCompiler_StaticMethods_addChild$self$$.$children_$ ? $JSCompiler_StaticMethods_addChild$self$$.$children_$.length : 0)) && $JSCompiler_alias_THROW$$(Error("Child component index out of bounds"));
  if(!$JSCompiler_StaticMethods_addChild$self$$.$childIndex_$ || !$JSCompiler_StaticMethods_addChild$self$$.$children_$) {
    $JSCompiler_StaticMethods_addChild$self$$.$childIndex_$ = {}, $JSCompiler_StaticMethods_addChild$self$$.$children_$ = []
  }
  if($child$$11$$.getParent() == $JSCompiler_StaticMethods_addChild$self$$) {
    var $contentElement$$inline_314_key$$inline_864$$ = $JSCompiler_StaticMethods_getId$$($child$$11$$);
    $JSCompiler_StaticMethods_addChild$self$$.$childIndex_$[$contentElement$$inline_314_key$$inline_864$$] = $child$$11$$;
    $goog$array$remove$$($JSCompiler_StaticMethods_addChild$self$$.$children_$, $child$$11$$)
  }else {
    $goog$object$add$$($JSCompiler_StaticMethods_addChild$self$$.$childIndex_$, $JSCompiler_StaticMethods_getId$$($child$$11$$), $child$$11$$)
  }
  $JSCompiler_StaticMethods_setParent$$($child$$11$$, $JSCompiler_StaticMethods_addChild$self$$);
  $goog$array$splice$$($JSCompiler_StaticMethods_addChild$self$$.$children_$, $index$$inline_312$$, 0, $child$$11$$);
  $child$$11$$.$inDocument_$ && $JSCompiler_StaticMethods_addChild$self$$.$inDocument_$ && $child$$11$$.getParent() == $JSCompiler_StaticMethods_addChild$self$$ ? ($contentElement$$inline_314_key$$inline_864$$ = $JSCompiler_StaticMethods_addChild$self$$.$getContentElement$(), $contentElement$$inline_314_key$$inline_864$$.insertBefore($child$$11$$.$getElement$(), $contentElement$$inline_314_key$$inline_864$$.childNodes[$index$$inline_312$$] || $JSCompiler_alias_NULL$$)) : $JSCompiler_StaticMethods_addChild$self$$.$inDocument_$ && 
  (!$child$$11$$.$inDocument_$ && $child$$11$$.$element_$ && $child$$11$$.$element_$.parentNode && 1 == $child$$11$$.$element_$.parentNode.nodeType) && $child$$11$$.$enterDocument$()
}
$JSCompiler_prototypeAlias$$.$getContentElement$ = $JSCompiler_get$$("$element_$");
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = function $$JSCompiler_prototypeAlias$$$$setRightToLeft$$($rightToLeft$$1$$) {
  this.$inDocument_$ && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  this.$rightToLeft_$ = $rightToLeft$$1$$
};
function $JSCompiler_StaticMethods_forEachChild$$($JSCompiler_StaticMethods_forEachChild$self$$, $f$$27$$, $opt_obj$$28$$) {
  $JSCompiler_StaticMethods_forEachChild$self$$.$children_$ && $goog$array$forEach$$($JSCompiler_StaticMethods_forEachChild$self$$.$children_$, $f$$27$$, $opt_obj$$28$$)
}
$JSCompiler_prototypeAlias$$.removeChild = function $$JSCompiler_prototypeAlias$$$removeChild$($child$$15$$, $opt_unrender$$) {
  if($child$$15$$) {
    var $id$$7$$ = $goog$isString$$($child$$15$$) ? $child$$15$$ : $JSCompiler_StaticMethods_getId$$($child$$15$$);
    $child$$15$$ = this.$childIndex_$ && $id$$7$$ ? ($id$$7$$ in this.$childIndex_$ ? this.$childIndex_$[$id$$7$$] : $JSCompiler_alias_VOID$$) || $JSCompiler_alias_NULL$$ : $JSCompiler_alias_NULL$$;
    if($id$$7$$ && $child$$15$$) {
      var $obj$$inline_871$$ = this.$childIndex_$;
      $id$$7$$ in $obj$$inline_871$$ && delete $obj$$inline_871$$[$id$$7$$];
      $goog$array$remove$$(this.$children_$, $child$$15$$);
      $opt_unrender$$ && ($child$$15$$.$exitDocument$(), $child$$15$$.$element_$ && $goog$dom$removeNode$$($child$$15$$.$element_$));
      $JSCompiler_StaticMethods_setParent$$($child$$15$$, $JSCompiler_alias_NULL$$)
    }
  }
  $child$$15$$ || $JSCompiler_alias_THROW$$(Error("Child is not in parent component"));
  return $child$$15$$
};
function $rflect$ui$Component$$($opt_domHelper$$1$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$1$$)
}
$goog$inherits$$($rflect$ui$Component$$, $goog$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $rflect$ui$Component$$.prototype;
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  this.$decorateInternal$(this.$dom_$.createElement("div"))
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($aElement$$, $opt_doNotBuildBody$$) {
  $rflect$ui$Component$$.$superClass_$.$decorateInternal$.call(this, $aElement$$);
  $opt_doNotBuildBody$$ || (this.$getElement$().innerHTML = $JSCompiler_StaticMethods_buildBody$$(this))
};
function $JSCompiler_StaticMethods_buildBody$$($JSCompiler_StaticMethods_buildBody$self$$, $aSb$$) {
  var $sb$$2$$ = $aSb$$ || new $goog$string$StringBuffer$$;
  $JSCompiler_StaticMethods_buildBody$self$$.$buildBodyInternal$($sb$$2$$);
  if(!$aSb$$) {
    return $sb$$2$$.toString()
  }
}
$JSCompiler_prototypeAlias$$.$buildBodyInternal$ = function $$JSCompiler_prototypeAlias$$$$buildBodyInternal$$() {
  $JSCompiler_alias_THROW$$(Error("unimplemented abstract method"))
};
$JSCompiler_prototypeAlias$$.$updateBeforeRedraw$ = function $$JSCompiler_prototypeAlias$$$$updateBeforeRedraw$$($var_args$$63$$) {
  var $args$$8$$ = arguments;
  $JSCompiler_StaticMethods_forEachChild$$(this, function($aChild$$, $aIndex$$1$$) {
    $args$$8$$.length && $goog$array$contains$$($args$$8$$, $aIndex$$1$$) || $aChild$$.$updateBeforeRedraw$()
  })
};
$JSCompiler_prototypeAlias$$.$updateByRedraw$ = function $$JSCompiler_prototypeAlias$$$$updateByRedraw$$($var_args$$64$$) {
  var $args$$9$$ = arguments;
  $JSCompiler_StaticMethods_forEachChild$$(this, function($aChild$$1$$, $aIndex$$2$$) {
    $aChild$$1$$.$inDocument_$ && ($aChild$$1$$.$getElement$() && (!$args$$9$$.length || !$goog$array$contains$$($args$$9$$, $aIndex$$2$$))) && $aChild$$1$$.$updateByRedraw$()
  })
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $rflect$ui$Component$$.$superClass_$.$disposeInternal$.call(this)
};
function $goog$a11y$aria$setState$$($element$$76$$, $state$$1$$, $value$$75$$) {
  $element$$76$$.setAttribute("aria-" + $state$$1$$, $value$$75$$)
}
;function $goog$ui$ControlRenderer$$() {
}
var $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$;
$goog$addSingletonGetter$$($goog$ui$ControlRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$ControlRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($control$$) {
  var $element$$80$$ = $control$$.$getDomHelper$().$createDom$("div", $JSCompiler_StaticMethods_getClassNames$$(this, $control$$).join(" "), $control$$.$content_$);
  $JSCompiler_StaticMethods_setAriaStates$$(this, $control$$, $element$$80$$);
  return $element$$80$$
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$($element$$81$$) {
  return $element$$81$$
};
$JSCompiler_prototypeAlias$$.$enableClassName$ = function $$JSCompiler_prototypeAlias$$$$enableClassName$$($control$$1_element$$82$$, $className$$16$$, $enable$$1$$) {
  if($control$$1_element$$82$$ = $control$$1_element$$82$$.$getElement$ ? $control$$1_element$$82$$.$getElement$() : $control$$1_element$$82$$) {
    if($goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("7")) {
      var $combinedClasses$$ = $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($goog$dom$classes$get$$($control$$1_element$$82$$), $className$$16$$);
      $combinedClasses$$.push($className$$16$$);
      $goog$partial$$($enable$$1$$ ? $goog$dom$classes$add$$ : $goog$dom$classes$remove$$, $control$$1_element$$82$$).apply($JSCompiler_alias_NULL$$, $combinedClasses$$)
    }else {
      $enable$$1$$ ? $goog$dom$classes$add$$($control$$1_element$$82$$, $className$$16$$) : $goog$dom$classes$remove$$($control$$1_element$$82$$, $className$$16$$)
    }
  }
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = $JSCompiler_returnArg$$($JSCompiler_alias_TRUE$$);
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($control$$3$$, $element$$84$$) {
  $element$$84$$.id && $JSCompiler_StaticMethods_setId$$($control$$3$$, $element$$84$$.id);
  var $contentElem_hasCombinedClassName$$ = this.$getContentElement$($element$$84$$);
  $contentElem_hasCombinedClassName$$ && $contentElem_hasCombinedClassName$$.firstChild ? $JSCompiler_StaticMethods_setContentInternal$$($control$$3$$, $contentElem_hasCombinedClassName$$.firstChild.nextSibling ? $goog$array$toArray$$($contentElem_hasCombinedClassName$$.childNodes) : $contentElem_hasCombinedClassName$$.firstChild) : $control$$3$$.$content_$ = $JSCompiler_alias_NULL$$;
  var $state$$2$$ = 0, $rendererClassName$$ = this.$getCssClass$(), $structuralClassName$$ = this.$getCssClass$(), $hasRendererClassName$$ = $JSCompiler_alias_FALSE$$, $hasStructuralClassName$$ = $JSCompiler_alias_FALSE$$, $contentElem_hasCombinedClassName$$ = $JSCompiler_alias_FALSE$$, $classNames$$1$$ = $goog$dom$classes$get$$($element$$84$$);
  $goog$array$forEach$$($classNames$$1$$, function($className$$18_state$$inline_331$$) {
    if(!$hasRendererClassName$$ && $className$$18_state$$inline_331$$ == $rendererClassName$$) {
      $hasRendererClassName$$ = $JSCompiler_alias_TRUE$$, $structuralClassName$$ == $rendererClassName$$ && ($hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$)
    }else {
      if(!$hasStructuralClassName$$ && $className$$18_state$$inline_331$$ == $structuralClassName$$) {
        $hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$
      }else {
        var $JSCompiler_temp_const$$22$$ = $state$$2$$;
        if(!this.$stateByClass_$) {
          this.$classByState_$ || $JSCompiler_StaticMethods_createClassByStateMap_$$(this);
          var $obj$$inline_1147$$ = this.$classByState_$, $transposed$$inline_1148$$ = {}, $key$$inline_1149$$;
          for($key$$inline_1149$$ in $obj$$inline_1147$$) {
            $transposed$$inline_1148$$[$obj$$inline_1147$$[$key$$inline_1149$$]] = $key$$inline_1149$$
          }
          this.$stateByClass_$ = $transposed$$inline_1148$$
        }
        $className$$18_state$$inline_331$$ = parseInt(this.$stateByClass_$[$className$$18_state$$inline_331$$], 10);
        $state$$2$$ = $JSCompiler_temp_const$$22$$ | (isNaN($className$$18_state$$inline_331$$) ? 0 : $className$$18_state$$inline_331$$)
      }
    }
  }, this);
  $control$$3$$.$state_$ = $state$$2$$;
  $hasRendererClassName$$ || ($classNames$$1$$.push($rendererClassName$$), $structuralClassName$$ == $rendererClassName$$ && ($hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$));
  $hasStructuralClassName$$ || $classNames$$1$$.push($structuralClassName$$);
  var $extraClassNames$$ = $control$$3$$.$extraClassNames_$;
  $extraClassNames$$ && $classNames$$1$$.push.apply($classNames$$1$$, $extraClassNames$$);
  if($goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("7")) {
    var $combinedClasses$$1$$ = $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($classNames$$1$$);
    0 < $combinedClasses$$1$$.length && ($classNames$$1$$.push.apply($classNames$$1$$, $combinedClasses$$1$$), $contentElem_hasCombinedClassName$$ = $JSCompiler_alias_TRUE$$)
  }
  if(!$hasRendererClassName$$ || !$hasStructuralClassName$$ || $extraClassNames$$ || $contentElem_hasCombinedClassName$$) {
    $element$$84$$.className = $classNames$$1$$.join(" ")
  }
  $JSCompiler_StaticMethods_setAriaStates$$(this, $control$$3$$, $element$$84$$);
  return $element$$84$$
};
$JSCompiler_prototypeAlias$$.$initializeDom$ = function $$JSCompiler_prototypeAlias$$$$initializeDom$$($control$$4$$) {
  $control$$4$$.$rightToLeft_$ == $JSCompiler_alias_NULL$$ && ($control$$4$$.$rightToLeft_$ = $goog$style$isRightToLeft$$($control$$4$$.$inDocument_$ ? $control$$4$$.$element_$ : $control$$4$$.$dom_$.$document_$.body));
  $control$$4$$.$rightToLeft_$ && this.$setRightToLeft$($control$$4$$.$getElement$(), $JSCompiler_alias_TRUE$$);
  $control$$4$$.isEnabled() && this.$setFocusable$($control$$4$$, $control$$4$$.$visible_$)
};
function $JSCompiler_StaticMethods_setAriaRole$$($JSCompiler_StaticMethods_setAriaRole$self_ariaRole$$, $element$$85$$, $opt_preferredRole$$) {
  if($JSCompiler_StaticMethods_setAriaRole$self_ariaRole$$ = $opt_preferredRole$$ || $JSCompiler_StaticMethods_setAriaRole$self_ariaRole$$.$getAriaRole$()) {
    $goog$asserts$assert$$($element$$85$$, "The element passed as a first parameter cannot be null."), $element$$85$$.setAttribute("role", $JSCompiler_StaticMethods_setAriaRole$self_ariaRole$$)
  }
}
function $JSCompiler_StaticMethods_setAriaStates$$($JSCompiler_StaticMethods_setAriaStates$self$$, $control$$5$$, $element$$86$$) {
  $goog$asserts$assert$$($control$$5$$);
  $goog$asserts$assert$$($element$$86$$);
  $control$$5$$.$visible_$ || $goog$a11y$aria$setState$$($element$$86$$, "hidden", !$control$$5$$.$visible_$);
  $control$$5$$.isEnabled() || $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$86$$, 1, !$control$$5$$.isEnabled());
  $control$$5$$.$supportedStates_$ & 8 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$86$$, 8, !!($control$$5$$.$state_$ & 8));
  $control$$5$$.$supportedStates_$ & 16 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$86$$, 16, !!($control$$5$$.$state_$ & 16));
  $control$$5$$.$supportedStates_$ & 64 && $JSCompiler_StaticMethods_setAriaStates$self$$.$updateAriaState$($element$$86$$, 64, !!($control$$5$$.$state_$ & 64))
}
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = function $$JSCompiler_prototypeAlias$$$$setAllowTextSelection$$($element$$87$$, $allow$$) {
  var $unselectable$$inline_345_value$$inline_348$$ = !$allow$$, $descendants$$inline_347$$ = $goog$userAgent$IE$$ || $goog$userAgent$OPERA$$ ? $element$$87$$.getElementsByTagName("*") : $JSCompiler_alias_NULL$$;
  if($goog$style$unselectableStyle_$$) {
    if($unselectable$$inline_345_value$$inline_348$$ = $unselectable$$inline_345_value$$inline_348$$ ? "none" : "", $element$$87$$.style[$goog$style$unselectableStyle_$$] = $unselectable$$inline_345_value$$inline_348$$, $descendants$$inline_347$$) {
      for(var $i$$inline_349$$ = 0, $descendant$$inline_350$$;$descendant$$inline_350$$ = $descendants$$inline_347$$[$i$$inline_349$$];$i$$inline_349$$++) {
        $descendant$$inline_350$$.style[$goog$style$unselectableStyle_$$] = $unselectable$$inline_345_value$$inline_348$$
      }
    }
  }else {
    if($goog$userAgent$IE$$ || $goog$userAgent$OPERA$$) {
      if($unselectable$$inline_345_value$$inline_348$$ = $unselectable$$inline_345_value$$inline_348$$ ? "on" : "", $element$$87$$.setAttribute("unselectable", $unselectable$$inline_345_value$$inline_348$$), $descendants$$inline_347$$) {
        for($i$$inline_349$$ = 0;$descendant$$inline_350$$ = $descendants$$inline_347$$[$i$$inline_349$$];$i$$inline_349$$++) {
          $descendant$$inline_350$$.setAttribute("unselectable", $unselectable$$inline_345_value$$inline_348$$)
        }
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = function $$JSCompiler_prototypeAlias$$$$setRightToLeft$$($element$$88$$, $rightToLeft$$2$$) {
  this.$enableClassName$($element$$88$$, this.$getCssClass$() + "-rtl", $rightToLeft$$2$$)
};
$JSCompiler_prototypeAlias$$.$isFocusable$ = function $$JSCompiler_prototypeAlias$$$$isFocusable$$($control$$6$$) {
  var $keyTarget$$;
  return $control$$6$$.$supportedStates_$ & 32 && ($keyTarget$$ = $control$$6$$.$getKeyEventTarget$()) ? $goog$dom$isFocusableTabIndex$$($keyTarget$$) : $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$setFocusable$ = function $$JSCompiler_prototypeAlias$$$$setFocusable$$($control$$7$$, $focusable$$) {
  var $keyTarget$$1$$;
  if($control$$7$$.$supportedStates_$ & 32 && ($keyTarget$$1$$ = $control$$7$$.$getKeyEventTarget$())) {
    if(!$focusable$$ && $control$$7$$.$state_$ & 32) {
      try {
        $keyTarget$$1$$.blur()
      }catch($e$$26$$) {
      }
      $control$$7$$.$state_$ & 32 && $control$$7$$.$handleBlur$()
    }
    $goog$dom$isFocusableTabIndex$$($keyTarget$$1$$) != $focusable$$ && $goog$dom$setFocusableTabIndex$$($keyTarget$$1$$, $focusable$$)
  }
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($element$$89$$, $visible$$) {
  $goog$style$showElement$$($element$$89$$, $visible$$);
  $element$$89$$ && $goog$a11y$aria$setState$$($element$$89$$, "hidden", !$visible$$)
};
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($control$$8$$, $state$$3$$, $enable$$3$$) {
  var $element$$90$$ = $control$$8$$.$getElement$();
  if($element$$90$$) {
    var $className$$19$$ = $JSCompiler_StaticMethods_getClassForState$$(this, $state$$3$$);
    $className$$19$$ && this.$enableClassName$($control$$8$$, $className$$19$$, $enable$$3$$);
    this.$updateAriaState$($element$$90$$, $state$$3$$, $enable$$3$$)
  }
};
$JSCompiler_prototypeAlias$$.$updateAriaState$ = function $$JSCompiler_prototypeAlias$$$$updateAriaState$$($element$$91$$, $ariaState_state$$4$$, $enable$$4$$) {
  $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$ || ($goog$ui$ControlRenderer$ARIA_STATE_MAP_$$ = {1:"disabled", 8:"selected", 16:"checked", 64:"expanded"});
  if($ariaState_state$$4$$ = $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$[$ariaState_state$$4$$]) {
    $goog$asserts$assert$$($element$$91$$, "The element passed as a first parameter cannot be null."), $goog$a11y$aria$setState$$($element$$91$$, $ariaState_state$$4$$, $enable$$4$$)
  }
};
$JSCompiler_prototypeAlias$$.$setContent$ = function $$JSCompiler_prototypeAlias$$$$setContent$$($element$$92$$, $content$$2$$) {
  var $contentElem$$1$$ = this.$getContentElement$($element$$92$$);
  if($contentElem$$1$$ && ($goog$dom$removeChildren$$($contentElem$$1$$), $content$$2$$)) {
    if($goog$isString$$($content$$2$$)) {
      $goog$dom$setTextContent$$($contentElem$$1$$, $content$$2$$)
    }else {
      var $childHandler$$1$$ = function $$childHandler$$1$$$($child$$16$$) {
        if($child$$16$$) {
          var $doc$$34$$ = $goog$dom$getOwnerDocument$$($contentElem$$1$$);
          $contentElem$$1$$.appendChild($goog$isString$$($child$$16$$) ? $doc$$34$$.createTextNode($child$$16$$) : $child$$16$$)
        }
      };
      $goog$isArray$$($content$$2$$) ? $goog$array$forEach$$($content$$2$$, $childHandler$$1$$) : $goog$isArrayLike$$($content$$2$$) && !("nodeType" in $content$$2$$) ? $goog$array$forEach$$($goog$array$toArray$$($content$$2$$), $childHandler$$1$$) : $childHandler$$1$$($content$$2$$)
    }
  }
};
$JSCompiler_prototypeAlias$$.$getKeyEventTarget$ = function $$JSCompiler_prototypeAlias$$$$getKeyEventTarget$$($control$$9$$) {
  return $control$$9$$.$getElement$()
};
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-control");
function $JSCompiler_StaticMethods_getClassNames$$($JSCompiler_StaticMethods_getClassNames$self$$, $control$$10$$) {
  var $cssClass_extraClassNames$$1_state$$inline_353$$ = $JSCompiler_StaticMethods_getClassNames$self$$.$getCssClass$(), $classNames$$2$$ = [$cssClass_extraClassNames$$1_state$$inline_353$$], $classNames$$inline_354_structuralCssClass$$ = $JSCompiler_StaticMethods_getClassNames$self$$.$getCssClass$();
  $classNames$$inline_354_structuralCssClass$$ != $cssClass_extraClassNames$$1_state$$inline_353$$ && $classNames$$2$$.push($classNames$$inline_354_structuralCssClass$$);
  $cssClass_extraClassNames$$1_state$$inline_353$$ = $control$$10$$.$state_$;
  for($classNames$$inline_354_structuralCssClass$$ = [];$cssClass_extraClassNames$$1_state$$inline_353$$;) {
    var $mask$$inline_355$$ = $cssClass_extraClassNames$$1_state$$inline_353$$ & -$cssClass_extraClassNames$$1_state$$inline_353$$;
    $classNames$$inline_354_structuralCssClass$$.push($JSCompiler_StaticMethods_getClassForState$$($JSCompiler_StaticMethods_getClassNames$self$$, $mask$$inline_355$$));
    $cssClass_extraClassNames$$1_state$$inline_353$$ &= ~$mask$$inline_355$$
  }
  $classNames$$2$$.push.apply($classNames$$2$$, $classNames$$inline_354_structuralCssClass$$);
  ($cssClass_extraClassNames$$1_state$$inline_353$$ = $control$$10$$.$extraClassNames_$) && $classNames$$2$$.push.apply($classNames$$2$$, $cssClass_extraClassNames$$1_state$$inline_353$$);
  $goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("7") && $classNames$$2$$.push.apply($classNames$$2$$, $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($classNames$$2$$));
  return $classNames$$2$$
}
function $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($classes$$5$$, $opt_includedClass$$) {
  var $toAdd$$ = [];
  $opt_includedClass$$ && ($classes$$5$$ = $classes$$5$$.concat([$opt_includedClass$$]));
  $goog$array$forEach$$([], function($combo$$) {
    $goog$array$every$$($combo$$, $goog$partial$$($goog$array$contains$$, $classes$$5$$)) && (!$opt_includedClass$$ || $goog$array$contains$$($combo$$, $opt_includedClass$$)) && $toAdd$$.push($combo$$.join("_"))
  });
  return $toAdd$$
}
function $JSCompiler_StaticMethods_getClassForState$$($JSCompiler_StaticMethods_getClassForState$self$$, $state$$6$$) {
  $JSCompiler_StaticMethods_getClassForState$self$$.$classByState_$ || $JSCompiler_StaticMethods_createClassByStateMap_$$($JSCompiler_StaticMethods_getClassForState$self$$);
  return $JSCompiler_StaticMethods_getClassForState$self$$.$classByState_$[$state$$6$$]
}
function $JSCompiler_StaticMethods_createClassByStateMap_$$($JSCompiler_StaticMethods_createClassByStateMap_$self$$) {
  var $baseClass$$ = $JSCompiler_StaticMethods_createClassByStateMap_$self$$.$getCssClass$();
  $JSCompiler_StaticMethods_createClassByStateMap_$self$$.$classByState_$ = {1:$baseClass$$ + "-disabled", 2:$baseClass$$ + "-hover", 4:$baseClass$$ + "-active", 8:$baseClass$$ + "-selected", 16:$baseClass$$ + "-checked", 32:$baseClass$$ + "-focused", 64:$baseClass$$ + "-open"}
}
;function $goog$ui$ButtonRenderer$$() {
}
$goog$inherits$$($goog$ui$ButtonRenderer$$, $goog$ui$ControlRenderer$$);
$goog$addSingletonGetter$$($goog$ui$ButtonRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$ButtonRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_returnArg$$("button");
$JSCompiler_prototypeAlias$$.$updateAriaState$ = function $$JSCompiler_prototypeAlias$$$$updateAriaState$$($element$$93$$, $state$$8$$, $enable$$5$$) {
  16 == $state$$8$$ ? ($goog$asserts$assert$$($element$$93$$, "The button DOM element cannot be null."), $goog$a11y$aria$setState$$($element$$93$$, "pressed", $enable$$5$$)) : $goog$ui$ButtonRenderer$$.$superClass_$.$updateAriaState$.call(this, $element$$93$$, $state$$8$$, $enable$$5$$)
};
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($button$$1$$) {
  var $element$$94$$ = $goog$ui$ButtonRenderer$$.$superClass_$.$createDom$.call(this, $button$$1$$), $tooltip_value$$76$$ = $button$$1$$.$getTooltip$();
  $tooltip_value$$76$$ && this.$setTooltip$($element$$94$$, $tooltip_value$$76$$);
  ($tooltip_value$$76$$ = $button$$1$$.$getValue$()) && this.$setValue$($element$$94$$, $tooltip_value$$76$$);
  $button$$1$$.$supportedStates_$ & 16 && this.$updateAriaState$($element$$94$$, 16, !!($button$$1$$.$state_$ & 16));
  return $element$$94$$
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($button$$2$$, $element$$95$$) {
  $element$$95$$ = $goog$ui$ButtonRenderer$$.$superClass_$.$decorate$.call(this, $button$$2$$, $element$$95$$);
  var $value$$inline_358$$ = this.$getValue$($element$$95$$);
  $button$$2$$.$value_$ = $value$$inline_358$$;
  $button$$2$$.$tooltip_$ = this.$getTooltip$($element$$95$$);
  $button$$2$$.$supportedStates_$ & 16 && this.$updateAriaState$($element$$95$$, 16, !!($button$$2$$.$state_$ & 16));
  return $element$$95$$
};
$JSCompiler_prototypeAlias$$.$getValue$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$setValue$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$getTooltip$ = function $$JSCompiler_prototypeAlias$$$$getTooltip$$($element$$96$$) {
  return $element$$96$$.title
};
$JSCompiler_prototypeAlias$$.$setTooltip$ = function $$JSCompiler_prototypeAlias$$$$setTooltip$$($element$$97$$, $tooltip$$1$$) {
  $element$$97$$ && ($element$$97$$.title = $tooltip$$1$$ || "")
};
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-button");
function $goog$ui$registry$setDecoratorByClassName$$($className$$22$$, $decoratorFn$$) {
  $className$$22$$ || $JSCompiler_alias_THROW$$(Error("Invalid class name " + $className$$22$$));
  $goog$isFunction$$($decoratorFn$$) || $JSCompiler_alias_THROW$$(Error("Invalid decorator function " + $decoratorFn$$))
}
var $goog$ui$registry$defaultRenderers_$$ = {};
function $goog$events$KeyCodes$firesKeyPressEvent$$($keyCode$$, $opt_heldKeyCode$$, $opt_shiftKey$$, $opt_ctrlKey$$, $opt_altKey$$) {
  if(!$goog$userAgent$IE$$ && (!$goog$userAgent$WEBKIT$$ || !$goog$userAgent$isVersion$$("525"))) {
    return $JSCompiler_alias_TRUE$$
  }
  if($goog$userAgent$detectedMac_$$ && $opt_altKey$$) {
    return $goog$events$KeyCodes$isCharacterKey$$($keyCode$$)
  }
  if($opt_altKey$$ && !$opt_ctrlKey$$ || !$opt_shiftKey$$ && (17 == $opt_heldKeyCode$$ || 18 == $opt_heldKeyCode$$ || $goog$userAgent$detectedMac_$$ && 91 == $opt_heldKeyCode$$)) {
    return $JSCompiler_alias_FALSE$$
  }
  if($goog$userAgent$WEBKIT$$ && $opt_ctrlKey$$ && $opt_shiftKey$$) {
    switch($keyCode$$) {
      case 220:
      ;
      case 219:
      ;
      case 221:
      ;
      case 192:
      ;
      case 186:
      ;
      case 189:
      ;
      case 187:
      ;
      case 188:
      ;
      case 190:
      ;
      case 191:
      ;
      case 192:
      ;
      case 222:
        return $JSCompiler_alias_FALSE$$
    }
  }
  if($goog$userAgent$IE$$ && $opt_ctrlKey$$ && $opt_heldKeyCode$$ == $keyCode$$) {
    return $JSCompiler_alias_FALSE$$
  }
  switch($keyCode$$) {
    case 13:
      return!($goog$userAgent$IE$$ && $goog$userAgent$IE$$ && 9 <= $goog$userAgent$DOCUMENT_MODE$$);
    case 27:
      return!$goog$userAgent$WEBKIT$$
  }
  return $goog$events$KeyCodes$isCharacterKey$$($keyCode$$)
}
function $goog$events$KeyCodes$isCharacterKey$$($keyCode$$1$$) {
  if(48 <= $keyCode$$1$$ && 57 >= $keyCode$$1$$ || 96 <= $keyCode$$1$$ && 106 >= $keyCode$$1$$ || 65 <= $keyCode$$1$$ && 90 >= $keyCode$$1$$ || $goog$userAgent$WEBKIT$$ && 0 == $keyCode$$1$$) {
    return $JSCompiler_alias_TRUE$$
  }
  switch($keyCode$$1$$) {
    case 32:
    ;
    case 63:
    ;
    case 107:
    ;
    case 109:
    ;
    case 110:
    ;
    case 111:
    ;
    case 186:
    ;
    case 59:
    ;
    case 189:
    ;
    case 187:
    ;
    case 61:
    ;
    case 188:
    ;
    case 190:
    ;
    case 191:
    ;
    case 192:
    ;
    case 222:
    ;
    case 219:
    ;
    case 220:
    ;
    case 221:
      return $JSCompiler_alias_TRUE$$;
    default:
      return $JSCompiler_alias_FALSE$$
  }
}
function $goog$events$KeyCodes$normalizeGeckoKeyCode$$($keyCode$$2$$) {
  switch($keyCode$$2$$) {
    case 61:
      return 187;
    case 59:
      return 186;
    case 224:
      return 91;
    case 0:
      return 224;
    default:
      return $keyCode$$2$$
  }
}
;function $goog$events$KeyHandler$$($opt_element$$11$$, $opt_capture$$8$$) {
  $goog$Disposable$$.call(this);
  $opt_element$$11$$ && $JSCompiler_StaticMethods_attach$$(this, $opt_element$$11$$, $opt_capture$$8$$)
}
$goog$inherits$$($goog$events$KeyHandler$$, $goog$events$EventTarget$$);
$JSCompiler_prototypeAlias$$ = $goog$events$KeyHandler$$.prototype;
$JSCompiler_prototypeAlias$$.$element_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$keyPressKey_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$keyDownKey_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$keyUpKey_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$lastKey_$ = -1;
$JSCompiler_prototypeAlias$$.$keyCode_$ = -1;
$JSCompiler_prototypeAlias$$.$altKey_$ = $JSCompiler_alias_FALSE$$;
var $goog$events$KeyHandler$safariKey_$$ = {3:13, 12:144, 63232:38, 63233:40, 63234:37, 63235:39, 63236:112, 63237:113, 63238:114, 63239:115, 63240:116, 63241:117, 63242:118, 63243:119, 63244:120, 63245:121, 63246:122, 63247:123, 63248:44, 63272:46, 63273:36, 63275:35, 63276:33, 63277:34, 63289:144, 63302:45}, $goog$events$KeyHandler$keyIdentifier_$$ = {Up:38, Down:40, Left:37, Right:39, Enter:13, F1:112, F2:113, F3:114, F4:115, F5:116, F6:117, F7:118, F8:119, F9:120, F10:121, F11:122, F12:123, "U+007F":46, 
Home:36, End:35, PageUp:33, PageDown:34, Insert:45}, $goog$events$KeyHandler$USES_KEYDOWN_$$ = $goog$userAgent$IE$$ || $goog$userAgent$WEBKIT$$ && $goog$userAgent$isVersion$$("525"), $goog$events$KeyHandler$SAVE_ALT_FOR_KEYPRESS_$$ = $goog$userAgent$detectedMac_$$ && $goog$userAgent$GECKO$$;
$JSCompiler_prototypeAlias$$ = $goog$events$KeyHandler$$.prototype;
$JSCompiler_prototypeAlias$$.$handleKeyDown_$ = function $$JSCompiler_prototypeAlias$$$$handleKeyDown_$$($e$$28$$) {
  if($goog$userAgent$WEBKIT$$ && (17 == this.$lastKey_$ && !$e$$28$$.ctrlKey || 18 == this.$lastKey_$ && !$e$$28$$.altKey || $goog$userAgent$detectedMac_$$ && 91 == this.$lastKey_$ && !$e$$28$$.metaKey)) {
    this.$keyCode_$ = this.$lastKey_$ = -1
  }
  -1 == this.$lastKey_$ && ($e$$28$$.ctrlKey && 17 != $e$$28$$.keyCode ? this.$lastKey_$ = 17 : $e$$28$$.altKey && 18 != $e$$28$$.keyCode ? this.$lastKey_$ = 18 : $e$$28$$.metaKey && 91 != $e$$28$$.keyCode && (this.$lastKey_$ = 91));
  $goog$events$KeyHandler$USES_KEYDOWN_$$ && !$goog$events$KeyCodes$firesKeyPressEvent$$($e$$28$$.keyCode, this.$lastKey_$, $e$$28$$.shiftKey, $e$$28$$.ctrlKey, $e$$28$$.altKey) ? this.handleEvent($e$$28$$) : (this.$keyCode_$ = $goog$userAgent$GECKO$$ ? $goog$events$KeyCodes$normalizeGeckoKeyCode$$($e$$28$$.keyCode) : $e$$28$$.keyCode, $goog$events$KeyHandler$SAVE_ALT_FOR_KEYPRESS_$$ && (this.$altKey_$ = $e$$28$$.altKey))
};
$JSCompiler_prototypeAlias$$.$handleKeyup_$ = function $$JSCompiler_prototypeAlias$$$$handleKeyup_$$($e$$29$$) {
  this.$keyCode_$ = this.$lastKey_$ = -1;
  this.$altKey_$ = $e$$29$$.altKey
};
$JSCompiler_prototypeAlias$$.handleEvent = function $$JSCompiler_prototypeAlias$$$handleEvent$($e$$30_repeat$$) {
  var $be$$2_event$$4$$ = $e$$30_repeat$$.$event_$, $keyCode$$3$$, $charCode$$, $altKey$$2$$ = $be$$2_event$$4$$.altKey;
  $goog$userAgent$IE$$ && "keypress" == $e$$30_repeat$$.type ? ($keyCode$$3$$ = this.$keyCode_$, $charCode$$ = 13 != $keyCode$$3$$ && 27 != $keyCode$$3$$ ? $be$$2_event$$4$$.keyCode : 0) : $goog$userAgent$WEBKIT$$ && "keypress" == $e$$30_repeat$$.type ? ($keyCode$$3$$ = this.$keyCode_$, $charCode$$ = 0 <= $be$$2_event$$4$$.charCode && 63232 > $be$$2_event$$4$$.charCode && $goog$events$KeyCodes$isCharacterKey$$($keyCode$$3$$) ? $be$$2_event$$4$$.charCode : 0) : $goog$userAgent$OPERA$$ ? ($keyCode$$3$$ = 
  this.$keyCode_$, $charCode$$ = $goog$events$KeyCodes$isCharacterKey$$($keyCode$$3$$) ? $be$$2_event$$4$$.keyCode : 0) : ($keyCode$$3$$ = $be$$2_event$$4$$.keyCode || this.$keyCode_$, $charCode$$ = $be$$2_event$$4$$.charCode || 0, $goog$events$KeyHandler$SAVE_ALT_FOR_KEYPRESS_$$ && ($altKey$$2$$ = this.$altKey_$), $goog$userAgent$detectedMac_$$ && (63 == $charCode$$ && 224 == $keyCode$$3$$) && ($keyCode$$3$$ = 191));
  var $key$$57$$ = $keyCode$$3$$, $keyIdentifier$$ = $be$$2_event$$4$$.keyIdentifier;
  $keyCode$$3$$ ? 63232 <= $keyCode$$3$$ && $keyCode$$3$$ in $goog$events$KeyHandler$safariKey_$$ ? $key$$57$$ = $goog$events$KeyHandler$safariKey_$$[$keyCode$$3$$] : 25 == $keyCode$$3$$ && $e$$30_repeat$$.shiftKey && ($key$$57$$ = 9) : $keyIdentifier$$ && $keyIdentifier$$ in $goog$events$KeyHandler$keyIdentifier_$$ && ($key$$57$$ = $goog$events$KeyHandler$keyIdentifier_$$[$keyIdentifier$$]);
  $e$$30_repeat$$ = $key$$57$$ == this.$lastKey_$;
  this.$lastKey_$ = $key$$57$$;
  $be$$2_event$$4$$ = new $goog$events$KeyEvent$$($key$$57$$, $charCode$$, $e$$30_repeat$$, $be$$2_event$$4$$);
  $be$$2_event$$4$$.altKey = $altKey$$2$$;
  this.dispatchEvent($be$$2_event$$4$$)
};
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
function $JSCompiler_StaticMethods_attach$$($JSCompiler_StaticMethods_attach$self$$, $element$$100$$, $opt_capture$$9$$) {
  $JSCompiler_StaticMethods_attach$self$$.$keyUpKey_$ && $JSCompiler_StaticMethods_attach$self$$.detach();
  $JSCompiler_StaticMethods_attach$self$$.$element_$ = $element$$100$$;
  $JSCompiler_StaticMethods_attach$self$$.$keyPressKey_$ = $goog$events$listen$$($JSCompiler_StaticMethods_attach$self$$.$element_$, "keypress", $JSCompiler_StaticMethods_attach$self$$, $opt_capture$$9$$);
  $JSCompiler_StaticMethods_attach$self$$.$keyDownKey_$ = $goog$events$listen$$($JSCompiler_StaticMethods_attach$self$$.$element_$, "keydown", $JSCompiler_StaticMethods_attach$self$$.$handleKeyDown_$, $opt_capture$$9$$, $JSCompiler_StaticMethods_attach$self$$);
  $JSCompiler_StaticMethods_attach$self$$.$keyUpKey_$ = $goog$events$listen$$($JSCompiler_StaticMethods_attach$self$$.$element_$, "keyup", $JSCompiler_StaticMethods_attach$self$$.$handleKeyup_$, $opt_capture$$9$$, $JSCompiler_StaticMethods_attach$self$$)
}
$JSCompiler_prototypeAlias$$.detach = function $$JSCompiler_prototypeAlias$$$detach$() {
  this.$keyPressKey_$ && ($goog$events$unlistenByKey$$(this.$keyPressKey_$), $goog$events$unlistenByKey$$(this.$keyDownKey_$), $goog$events$unlistenByKey$$(this.$keyUpKey_$), this.$keyUpKey_$ = this.$keyDownKey_$ = this.$keyPressKey_$ = $JSCompiler_alias_NULL$$);
  this.$element_$ = $JSCompiler_alias_NULL$$;
  this.$keyCode_$ = this.$lastKey_$ = -1
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$events$KeyHandler$$.$superClass_$.$disposeInternal$.call(this);
  this.detach()
};
function $goog$events$KeyEvent$$($keyCode$$4$$, $charCode$$1$$, $repeat$$1$$, $browserEvent$$) {
  $browserEvent$$ && this.$init$($browserEvent$$, $JSCompiler_alias_VOID$$);
  this.type = "key";
  this.keyCode = $keyCode$$4$$;
  this.charCode = $charCode$$1$$;
  this.repeat = $repeat$$1$$
}
$goog$inherits$$($goog$events$KeyEvent$$, $goog$events$BrowserEvent$$);
function $goog$ui$Control$$($content$$3$$, $JSCompiler_temp$$57_componentCtor$$inline_369_opt_renderer$$, $opt_domHelper$$2$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$2$$);
  if(!$JSCompiler_temp$$57_componentCtor$$inline_369_opt_renderer$$) {
    $JSCompiler_temp$$57_componentCtor$$inline_369_opt_renderer$$ = this.constructor;
    for(var $key$$inline_370_rendererCtor$$inline_371$$;$JSCompiler_temp$$57_componentCtor$$inline_369_opt_renderer$$;) {
      $key$$inline_370_rendererCtor$$inline_371$$ = $goog$getUid$$($JSCompiler_temp$$57_componentCtor$$inline_369_opt_renderer$$);
      if($key$$inline_370_rendererCtor$$inline_371$$ = $goog$ui$registry$defaultRenderers_$$[$key$$inline_370_rendererCtor$$inline_371$$]) {
        break
      }
      $JSCompiler_temp$$57_componentCtor$$inline_369_opt_renderer$$ = $JSCompiler_temp$$57_componentCtor$$inline_369_opt_renderer$$.$superClass_$ ? $JSCompiler_temp$$57_componentCtor$$inline_369_opt_renderer$$.$superClass_$.constructor : $JSCompiler_alias_NULL$$
    }
    $JSCompiler_temp$$57_componentCtor$$inline_369_opt_renderer$$ = $key$$inline_370_rendererCtor$$inline_371$$ ? $goog$isFunction$$($key$$inline_370_rendererCtor$$inline_371$$.$getInstance$) ? $key$$inline_370_rendererCtor$$inline_371$$.$getInstance$() : new $key$$inline_370_rendererCtor$$inline_371$$ : $JSCompiler_alias_NULL$$
  }
  this.$renderer_$ = $JSCompiler_temp$$57_componentCtor$$inline_369_opt_renderer$$;
  this.$content_$ = $content$$3$$
}
$goog$inherits$$($goog$ui$Control$$, $goog$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$Control$$.prototype;
$JSCompiler_prototypeAlias$$.$content_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$state_$ = 0;
$JSCompiler_prototypeAlias$$.$supportedStates_$ = 39;
$JSCompiler_prototypeAlias$$.$autoStates_$ = 255;
$JSCompiler_prototypeAlias$$.$statesWithTransitionEvents_$ = 0;
$JSCompiler_prototypeAlias$$.$visible_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$extraClassNames_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$handleMouseEvents_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$allowTextSelection_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$preferredAriaRole_$ = $JSCompiler_alias_NULL$$;
function $JSCompiler_StaticMethods_setHandleMouseEvents$$($JSCompiler_StaticMethods_setHandleMouseEvents$self$$) {
  $JSCompiler_StaticMethods_setHandleMouseEvents$self$$.$inDocument_$ && $JSCompiler_alias_FALSE$$ != $JSCompiler_StaticMethods_setHandleMouseEvents$self$$.$handleMouseEvents_$ && $JSCompiler_StaticMethods_enableMouseEventHandling_$$($JSCompiler_StaticMethods_setHandleMouseEvents$self$$, $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_setHandleMouseEvents$self$$.$handleMouseEvents_$ = $JSCompiler_alias_FALSE$$
}
$JSCompiler_prototypeAlias$$.$getKeyEventTarget$ = function $$JSCompiler_prototypeAlias$$$$getKeyEventTarget$$() {
  return this.$renderer_$.$getKeyEventTarget$(this)
};
$JSCompiler_prototypeAlias$$.$enableClassName$ = function $$JSCompiler_prototypeAlias$$$$enableClassName$$($className$$25$$, $enable$$7$$) {
  $enable$$7$$ ? $className$$25$$ && (this.$extraClassNames_$ ? $goog$array$contains$$(this.$extraClassNames_$, $className$$25$$) || this.$extraClassNames_$.push($className$$25$$) : this.$extraClassNames_$ = [$className$$25$$], this.$renderer_$.$enableClassName$(this, $className$$25$$, $JSCompiler_alias_TRUE$$)) : $className$$25$$ && this.$extraClassNames_$ && ($goog$array$remove$$(this.$extraClassNames_$, $className$$25$$), 0 == this.$extraClassNames_$.length && (this.$extraClassNames_$ = $JSCompiler_alias_NULL$$), 
  this.$renderer_$.$enableClassName$(this, $className$$25$$, $JSCompiler_alias_FALSE$$))
};
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  var $element$$101$$ = this.$renderer_$.$createDom$(this);
  this.$setElementInternal$($element$$101$$);
  $JSCompiler_StaticMethods_setAriaRole$$(this.$renderer_$, $element$$101$$, this.$preferredAriaRole_$);
  this.$allowTextSelection_$ || this.$renderer_$.$setAllowTextSelection$($element$$101$$, $JSCompiler_alias_FALSE$$);
  this.$visible_$ || this.$renderer_$.$setVisible$($element$$101$$, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$() {
  return this.$renderer_$.$getContentElement$(this.$getElement$())
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$102$$) {
  return this.$renderer_$.$canDecorate$($element$$102$$)
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$103$$) {
  $element$$103$$ = this.$renderer_$.$decorate$(this, $element$$103$$);
  this.$setElementInternal$($element$$103$$);
  $JSCompiler_StaticMethods_setAriaRole$$(this.$renderer_$, $element$$103$$, this.$preferredAriaRole_$);
  this.$allowTextSelection_$ || this.$renderer_$.$setAllowTextSelection$($element$$103$$, $JSCompiler_alias_FALSE$$);
  this.$visible_$ = "none" != $element$$103$$.style.display
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $goog$ui$Control$$.$superClass_$.$enterDocument$.call(this);
  this.$renderer_$.$initializeDom$(this);
  if(this.$supportedStates_$ & -2 && (this.$handleMouseEvents_$ && $JSCompiler_StaticMethods_enableMouseEventHandling_$$(this, $JSCompiler_alias_TRUE$$), this.$supportedStates_$ & 32)) {
    var $keyTarget$$2$$ = this.$getKeyEventTarget$();
    if($keyTarget$$2$$) {
      var $keyHandler$$ = this.$keyHandler_$ || (this.$keyHandler_$ = new $goog$events$KeyHandler$$);
      $JSCompiler_StaticMethods_attach$$($keyHandler$$, $keyTarget$$2$$);
      $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$(this.$getHandler$(), $keyHandler$$, "key", this.$handleKeyEvent$), $keyTarget$$2$$, "focus", this.$handleFocus$), $keyTarget$$2$$, "blur", this.$handleBlur$)
    }
  }
};
function $JSCompiler_StaticMethods_enableMouseEventHandling_$$($JSCompiler_StaticMethods_enableMouseEventHandling_$self$$, $enable$$8$$) {
  var $handler$$5$$ = $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$getHandler$(), $element$$104$$ = $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$getElement$();
  $enable$$8$$ ? ($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($handler$$5$$, $element$$104$$, "mouseover", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOver$), $element$$104$$, "mousedown", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseDown$), $element$$104$$, "mouseup", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseUp$), $element$$104$$, 
  "mouseout", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOut$), $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$ != $goog$nullFunction$$ && $JSCompiler_StaticMethods_listen$$($handler$$5$$, $element$$104$$, "contextmenu", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$), $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_listen$$($handler$$5$$, $element$$104$$, "dblclick", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleDblClick$)) : 
  ($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($handler$$5$$, $element$$104$$, "mouseover", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOver$), $element$$104$$, "mousedown", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseDown$), $element$$104$$, "mouseup", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseUp$), $element$$104$$, 
  "mouseout", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOut$), $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$ != $goog$nullFunction$$ && $JSCompiler_StaticMethods_unlisten$$($handler$$5$$, $element$$104$$, "contextmenu", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleContextMenu$), $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_unlisten$$($handler$$5$$, $element$$104$$, "dblclick", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleDblClick$))
}
$JSCompiler_prototypeAlias$$.$exitDocument$ = function $$JSCompiler_prototypeAlias$$$$exitDocument$$() {
  $goog$ui$Control$$.$superClass_$.$exitDocument$.call(this);
  this.$keyHandler_$ && this.$keyHandler_$.detach();
  this.$visible_$ && this.isEnabled() && this.$renderer_$.$setFocusable$(this, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$ui$Control$$.$superClass_$.$disposeInternal$.call(this);
  this.$keyHandler_$ && (this.$keyHandler_$.$dispose$(), delete this.$keyHandler_$);
  delete this.$renderer_$;
  this.$extraClassNames_$ = this.$content_$ = $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$setContent$ = function $$JSCompiler_prototypeAlias$$$$setContent$$($content$$4$$) {
  this.$renderer_$.$setContent$(this.$getElement$(), $content$$4$$);
  this.$content_$ = $content$$4$$
};
function $JSCompiler_StaticMethods_setContentInternal$$($JSCompiler_StaticMethods_setContentInternal$self$$, $content$$5$$) {
  $JSCompiler_StaticMethods_setContentInternal$self$$.$content_$ = $content$$5$$
}
function $JSCompiler_StaticMethods_getCaption$$($JSCompiler_StaticMethods_getCaption$self_content$$6$$) {
  $JSCompiler_StaticMethods_getCaption$self_content$$6$$ = $JSCompiler_StaticMethods_getCaption$self_content$$6$$.$content_$;
  return!$JSCompiler_StaticMethods_getCaption$self_content$$6$$ ? "" : ($goog$isString$$($JSCompiler_StaticMethods_getCaption$self_content$$6$$) ? $JSCompiler_StaticMethods_getCaption$self_content$$6$$ : $goog$isArray$$($JSCompiler_StaticMethods_getCaption$self_content$$6$$) ? $goog$array$map$$($JSCompiler_StaticMethods_getCaption$self_content$$6$$, $goog$dom$getRawTextContent$$).join("") : $goog$dom$getTextContent$$($JSCompiler_StaticMethods_getCaption$self_content$$6$$)).replace(/[\t\r\n ]+/g, 
  " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
}
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = function $$JSCompiler_prototypeAlias$$$$setRightToLeft$$($rightToLeft$$3$$) {
  $goog$ui$Control$$.$superClass_$.$setRightToLeft$.call(this, $rightToLeft$$3$$);
  var $element$$105$$ = this.$getElement$();
  $element$$105$$ && this.$renderer_$.$setRightToLeft$($element$$105$$, $rightToLeft$$3$$)
};
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = function $$JSCompiler_prototypeAlias$$$$setAllowTextSelection$$($allow$$1$$) {
  this.$allowTextSelection_$ = $allow$$1$$;
  var $element$$106$$ = this.$getElement$();
  $element$$106$$ && this.$renderer_$.$setAllowTextSelection$($element$$106$$, $allow$$1$$)
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($visible$$1$$, $opt_force$$) {
  if($opt_force$$ || this.$visible_$ != $visible$$1$$ && this.dispatchEvent($visible$$1$$ ? "show" : "hide")) {
    var $element$$107$$ = this.$getElement$();
    $element$$107$$ && this.$renderer_$.$setVisible$($element$$107$$, $visible$$1$$);
    this.isEnabled() && this.$renderer_$.$setFocusable$(this, $visible$$1$$);
    this.$visible_$ = $visible$$1$$;
    return $JSCompiler_alias_TRUE$$
  }
  return $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.isEnabled = function $$JSCompiler_prototypeAlias$$$isEnabled$() {
  return!(this.$state_$ & 1)
};
$JSCompiler_prototypeAlias$$.$setEnabled$ = function $$JSCompiler_prototypeAlias$$$$setEnabled$$($enable$$9$$) {
  var $parent$$inline_396$$ = this.getParent();
  if((!$parent$$inline_396$$ || "function" != typeof $parent$$inline_396$$.isEnabled || $parent$$inline_396$$.isEnabled()) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 1, !$enable$$9$$)) {
    $enable$$9$$ || (this.setActive($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_FALSE$$)), this.$visible_$ && this.$renderer_$.$setFocusable$(this, $enable$$9$$), this.$setState$(1, !$enable$$9$$)
  }
};
function $JSCompiler_StaticMethods_setHighlighted$$($JSCompiler_StaticMethods_setHighlighted$self$$, $highlight$$) {
  $JSCompiler_StaticMethods_isTransitionAllowed$$($JSCompiler_StaticMethods_setHighlighted$self$$, 2, $highlight$$) && $JSCompiler_StaticMethods_setHighlighted$self$$.$setState$(2, $highlight$$)
}
$JSCompiler_prototypeAlias$$.setActive = function $$JSCompiler_prototypeAlias$$$setActive$($active$$) {
  $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 4, $active$$) && this.$setState$(4, $active$$)
};
function $JSCompiler_StaticMethods_setChecked$$($JSCompiler_StaticMethods_setChecked$self$$, $check$$) {
  $JSCompiler_StaticMethods_isTransitionAllowed$$($JSCompiler_StaticMethods_setChecked$self$$, 16, $check$$) && $JSCompiler_StaticMethods_setChecked$self$$.$setState$(16, $check$$)
}
function $JSCompiler_StaticMethods_setFocused$$($JSCompiler_StaticMethods_setFocused$self$$, $focused$$) {
  $JSCompiler_StaticMethods_isTransitionAllowed$$($JSCompiler_StaticMethods_setFocused$self$$, 32, $focused$$) && $JSCompiler_StaticMethods_setFocused$self$$.$setState$(32, $focused$$)
}
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($state$$10$$, $enable$$10$$) {
  this.$supportedStates_$ & $state$$10$$ && $enable$$10$$ != !!(this.$state_$ & $state$$10$$) && (this.$renderer_$.$setState$(this, $state$$10$$, $enable$$10$$), this.$state_$ = $enable$$10$$ ? this.$state_$ | $state$$10$$ : this.$state_$ & ~$state$$10$$)
};
function $JSCompiler_StaticMethods_setSupportedState$$($JSCompiler_StaticMethods_setSupportedState$self$$, $state$$13$$, $support$$) {
  $JSCompiler_StaticMethods_setSupportedState$self$$.$inDocument_$ && ($JSCompiler_StaticMethods_setSupportedState$self$$.$state_$ & $state$$13$$ && !$support$$) && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  !$support$$ && $JSCompiler_StaticMethods_setSupportedState$self$$.$state_$ & $state$$13$$ && $JSCompiler_StaticMethods_setSupportedState$self$$.$setState$($state$$13$$, $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_setSupportedState$self$$.$supportedStates_$ = $support$$ ? $JSCompiler_StaticMethods_setSupportedState$self$$.$supportedStates_$ | $state$$13$$ : $JSCompiler_StaticMethods_setSupportedState$self$$.$supportedStates_$ & ~$state$$13$$
}
function $JSCompiler_StaticMethods_isAutoState$$($JSCompiler_StaticMethods_isAutoState$self$$, $state$$14$$) {
  return!!($JSCompiler_StaticMethods_isAutoState$self$$.$autoStates_$ & $state$$14$$) && !!($JSCompiler_StaticMethods_isAutoState$self$$.$supportedStates_$ & $state$$14$$)
}
function $JSCompiler_StaticMethods_setAutoStates$$($JSCompiler_StaticMethods_setAutoStates$self$$, $states$$, $enable$$11$$) {
  $JSCompiler_StaticMethods_setAutoStates$self$$.$autoStates_$ = $enable$$11$$ ? $JSCompiler_StaticMethods_setAutoStates$self$$.$autoStates_$ | $states$$ : $JSCompiler_StaticMethods_setAutoStates$self$$.$autoStates_$ & ~$states$$
}
function $JSCompiler_StaticMethods_isTransitionAllowed$$($JSCompiler_StaticMethods_isTransitionAllowed$self$$, $state$$16$$, $enable$$13$$) {
  return!!($JSCompiler_StaticMethods_isTransitionAllowed$self$$.$supportedStates_$ & $state$$16$$) && !!($JSCompiler_StaticMethods_isTransitionAllowed$self$$.$state_$ & $state$$16$$) != $enable$$13$$ && (!($JSCompiler_StaticMethods_isTransitionAllowed$self$$.$statesWithTransitionEvents_$ & $state$$16$$) || $JSCompiler_StaticMethods_isTransitionAllowed$self$$.dispatchEvent($goog$ui$Component$getStateTransitionEvent$$($state$$16$$, $enable$$13$$))) && !$JSCompiler_StaticMethods_isTransitionAllowed$self$$.$disposed_$
}
$JSCompiler_prototypeAlias$$.$handleMouseOver$ = function $$JSCompiler_prototypeAlias$$$$handleMouseOver$$($e$$31$$) {
  (!$e$$31$$.relatedTarget || !$goog$dom$contains$$(this.$getElement$(), $e$$31$$.relatedTarget)) && (this.dispatchEvent("enter") && this.isEnabled() && $JSCompiler_StaticMethods_isAutoState$$(this, 2)) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$)
};
$JSCompiler_prototypeAlias$$.$handleMouseOut$ = function $$JSCompiler_prototypeAlias$$$$handleMouseOut$$($e$$32$$) {
  if((!$e$$32$$.relatedTarget || !$goog$dom$contains$$(this.$getElement$(), $e$$32$$.relatedTarget)) && this.dispatchEvent("leave")) {
    $JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_FALSE$$)
  }
};
$JSCompiler_prototypeAlias$$.$handleContextMenu$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$handleMouseDown$ = function $$JSCompiler_prototypeAlias$$$$handleMouseDown$$($e$$34$$) {
  this.isEnabled() && ($JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods_isMouseActionButton$$($e$$34$$) && ($JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_TRUE$$), this.$renderer_$.$isFocusable$(this) && this.$getKeyEventTarget$().focus()));
  !this.$allowTextSelection_$ && $JSCompiler_StaticMethods_isMouseActionButton$$($e$$34$$) && $e$$34$$.preventDefault()
};
$JSCompiler_prototypeAlias$$.$handleMouseUp$ = function $$JSCompiler_prototypeAlias$$$$handleMouseUp$$($e$$35$$) {
  this.isEnabled() && ($JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$), this.$state_$ & 4 && (this.$performActionInternal$($e$$35$$) && $JSCompiler_StaticMethods_isAutoState$$(this, 4)) && this.setActive($JSCompiler_alias_FALSE$$))
};
$JSCompiler_prototypeAlias$$.$handleDblClick$ = function $$JSCompiler_prototypeAlias$$$$handleDblClick$$($e$$36$$) {
  this.isEnabled() && this.$performActionInternal$($e$$36$$)
};
$JSCompiler_prototypeAlias$$.$performActionInternal$ = function $$JSCompiler_prototypeAlias$$$$performActionInternal$$($e$$37$$) {
  $JSCompiler_StaticMethods_isAutoState$$(this, 16) && $JSCompiler_StaticMethods_setChecked$$(this, !(this.$state_$ & 16));
  $JSCompiler_StaticMethods_isAutoState$$(this, 8) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 8, $JSCompiler_alias_TRUE$$) && this.$setState$(8, $JSCompiler_alias_TRUE$$);
  if($JSCompiler_StaticMethods_isAutoState$$(this, 64)) {
    var $actionEvent_open$$inline_402$$ = !(this.$state_$ & 64);
    $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 64, $actionEvent_open$$inline_402$$) && this.$setState$(64, $actionEvent_open$$inline_402$$)
  }
  $actionEvent_open$$inline_402$$ = new $goog$events$Event$$("action", this);
  $e$$37$$ && ($actionEvent_open$$inline_402$$.altKey = $e$$37$$.altKey, $actionEvent_open$$inline_402$$.ctrlKey = $e$$37$$.ctrlKey, $actionEvent_open$$inline_402$$.metaKey = $e$$37$$.metaKey, $actionEvent_open$$inline_402$$.shiftKey = $e$$37$$.shiftKey, $actionEvent_open$$inline_402$$.$platformModifierKey$ = $e$$37$$.$platformModifierKey$);
  return this.dispatchEvent($actionEvent_open$$inline_402$$)
};
$JSCompiler_prototypeAlias$$.$handleFocus$ = function $$JSCompiler_prototypeAlias$$$$handleFocus$$() {
  $JSCompiler_StaticMethods_isAutoState$$(this, 32) && $JSCompiler_StaticMethods_setFocused$$(this, $JSCompiler_alias_TRUE$$)
};
$JSCompiler_prototypeAlias$$.$handleBlur$ = function $$JSCompiler_prototypeAlias$$$$handleBlur$$() {
  $JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_isAutoState$$(this, 32) && $JSCompiler_StaticMethods_setFocused$$(this, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$handleKeyEvent$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEvent$$($e$$40$$) {
  return this.$visible_$ && this.isEnabled() && this.$handleKeyEventInternal$($e$$40$$) ? ($e$$40$$.preventDefault(), $e$$40$$.stopPropagation(), $JSCompiler_alias_TRUE$$) : $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$handleKeyEventInternal$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEventInternal$$($e$$41$$) {
  return 13 == $e$$41$$.keyCode && this.$performActionInternal$($e$$41$$)
};
$goog$isFunction$$($goog$ui$Control$$) || $JSCompiler_alias_THROW$$(Error("Invalid component class " + $goog$ui$Control$$));
$goog$isFunction$$($goog$ui$ControlRenderer$$) || $JSCompiler_alias_THROW$$(Error("Invalid renderer class " + $goog$ui$ControlRenderer$$));
var $key$$inline_406$$ = $goog$getUid$$($goog$ui$Control$$);
$goog$ui$registry$defaultRenderers_$$[$key$$inline_406$$] = $goog$ui$ControlRenderer$$;
$goog$ui$registry$setDecoratorByClassName$$("goog-control", function() {
  return new $goog$ui$Control$$($JSCompiler_alias_NULL$$)
});
function $goog$ui$NativeButtonRenderer$$() {
}
$goog$inherits$$($goog$ui$NativeButtonRenderer$$, $goog$ui$ButtonRenderer$$);
$goog$addSingletonGetter$$($goog$ui$NativeButtonRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$NativeButtonRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_emptyFn$$();
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($button$$4$$) {
  $JSCompiler_StaticMethods_setHandleMouseEvents$$($button$$4$$);
  $JSCompiler_StaticMethods_setAutoStates$$($button$$4$$, 255, $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_setSupportedState$$($button$$4$$, 32, $JSCompiler_alias_FALSE$$);
  return $button$$4$$.$getDomHelper$().$createDom$("button", {"class":$JSCompiler_StaticMethods_getClassNames$$(this, $button$$4$$).join(" "), disabled:!$button$$4$$.isEnabled(), title:$button$$4$$.$getTooltip$() || "", value:$button$$4$$.$getValue$() || ""}, $JSCompiler_StaticMethods_getCaption$$($button$$4$$) || "")
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$108$$) {
  return"BUTTON" == $element$$108$$.tagName || "INPUT" == $element$$108$$.tagName && ("button" == $element$$108$$.type || "submit" == $element$$108$$.type || "reset" == $element$$108$$.type)
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($button$$5$$, $element$$109$$) {
  $JSCompiler_StaticMethods_setHandleMouseEvents$$($button$$5$$);
  $JSCompiler_StaticMethods_setAutoStates$$($button$$5$$, 255, $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_setSupportedState$$($button$$5$$, 32, $JSCompiler_alias_FALSE$$);
  $element$$109$$.disabled && $goog$dom$classes$add$$($element$$109$$, $JSCompiler_StaticMethods_getClassForState$$(this, 1));
  return $goog$ui$NativeButtonRenderer$$.$superClass_$.$decorate$.call(this, $button$$5$$, $element$$109$$)
};
$JSCompiler_prototypeAlias$$.$initializeDom$ = function $$JSCompiler_prototypeAlias$$$$initializeDom$$($button$$6$$) {
  $JSCompiler_StaticMethods_listen$$($button$$6$$.$getHandler$(), $button$$6$$.$getElement$(), "click", $button$$6$$.$performActionInternal$)
};
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$isFocusable$ = function $$JSCompiler_prototypeAlias$$$$isFocusable$$($button$$7$$) {
  return $button$$7$$.isEnabled()
};
$JSCompiler_prototypeAlias$$.$setFocusable$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($button$$8_element$$110$$, $state$$17$$, $enable$$14$$) {
  $goog$ui$NativeButtonRenderer$$.$superClass_$.$setState$.call(this, $button$$8_element$$110$$, $state$$17$$, $enable$$14$$);
  if(($button$$8_element$$110$$ = $button$$8_element$$110$$.$getElement$()) && 1 == $state$$17$$) {
    $button$$8_element$$110$$.disabled = $enable$$14$$
  }
};
$JSCompiler_prototypeAlias$$.$getValue$ = function $$JSCompiler_prototypeAlias$$$$getValue$$($element$$111$$) {
  return $element$$111$$.value
};
$JSCompiler_prototypeAlias$$.$setValue$ = function $$JSCompiler_prototypeAlias$$$$setValue$$($element$$112$$, $value$$77$$) {
  $element$$112$$ && ($element$$112$$.value = $value$$77$$)
};
$JSCompiler_prototypeAlias$$.$updateAriaState$ = $goog$nullFunction$$;
function $goog$ui$Button$$($content$$7$$, $opt_renderer$$1$$, $opt_domHelper$$3$$) {
  $goog$ui$Control$$.call(this, $content$$7$$, $opt_renderer$$1$$ || $goog$ui$NativeButtonRenderer$$.$getInstance$(), $opt_domHelper$$3$$)
}
$goog$inherits$$($goog$ui$Button$$, $goog$ui$Control$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$Button$$.prototype;
$JSCompiler_prototypeAlias$$.$getValue$ = $JSCompiler_get$$("$value_$");
$JSCompiler_prototypeAlias$$.$setValue$ = function $$JSCompiler_prototypeAlias$$$$setValue$$($value$$78$$) {
  this.$value_$ = $value$$78$$;
  this.$renderer_$.$setValue$(this.$getElement$(), $value$$78$$)
};
$JSCompiler_prototypeAlias$$.$getTooltip$ = $JSCompiler_get$$("$tooltip_$");
$JSCompiler_prototypeAlias$$.$setTooltip$ = function $$JSCompiler_prototypeAlias$$$$setTooltip$$($tooltip$$2$$) {
  this.$tooltip_$ = $tooltip$$2$$;
  this.$renderer_$.$setTooltip$(this.$getElement$(), $tooltip$$2$$)
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$ui$Button$$.$superClass_$.$disposeInternal$.call(this);
  delete this.$value_$;
  delete this.$tooltip_$
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $goog$ui$Button$$.$superClass_$.$enterDocument$.call(this);
  if(this.$supportedStates_$ & 32) {
    var $keyTarget$$3$$ = this.$getKeyEventTarget$();
    $keyTarget$$3$$ && $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), $keyTarget$$3$$, "keyup", this.$handleKeyEventInternal$)
  }
};
$JSCompiler_prototypeAlias$$.$handleKeyEventInternal$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEventInternal$$($e$$42$$) {
  return 13 == $e$$42$$.keyCode && "key" == $e$$42$$.type || 32 == $e$$42$$.keyCode && "keyup" == $e$$42$$.type ? this.$performActionInternal$($e$$42$$) : 32 == $e$$42$$.keyCode
};
$goog$ui$registry$setDecoratorByClassName$$("goog-button", function() {
  return new $goog$ui$Button$$($JSCompiler_alias_NULL$$)
});
function $goog$ui$FlatButtonRenderer$$() {
}
$goog$inherits$$($goog$ui$FlatButtonRenderer$$, $goog$ui$ButtonRenderer$$);
$goog$addSingletonGetter$$($goog$ui$FlatButtonRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$FlatButtonRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($button$$10$$) {
  var $attributes$$1$$ = {"class":"goog-inline-block " + $JSCompiler_StaticMethods_getClassNames$$(this, $button$$10$$).join(" "), title:$button$$10$$.$getTooltip$() || ""};
  return $button$$10$$.$getDomHelper$().$createDom$("div", $attributes$$1$$, $button$$10$$.$content_$)
};
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_returnArg$$("button");
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$113$$) {
  return"DIV" == $element$$113$$.tagName
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($button$$11$$, $element$$114$$) {
  $goog$dom$classes$add$$($element$$114$$, "goog-inline-block");
  return $goog$ui$FlatButtonRenderer$$.$superClass_$.$decorate$.call(this, $button$$11$$, $element$$114$$)
};
$JSCompiler_prototypeAlias$$.$getValue$ = $JSCompiler_returnArg$$("");
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-flat-button");
$goog$ui$registry$setDecoratorByClassName$$("goog-flat-button", function() {
  return new $goog$ui$Button$$($JSCompiler_alias_NULL$$, $goog$ui$FlatButtonRenderer$$.$getInstance$())
});
function $goog$ui$CustomButtonRenderer$$() {
}
$goog$inherits$$($goog$ui$CustomButtonRenderer$$, $goog$ui$ButtonRenderer$$);
$goog$addSingletonGetter$$($goog$ui$CustomButtonRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$CustomButtonRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($control$$11$$) {
  var $attributes$$2_buttonElement$$ = {"class":"goog-inline-block " + $JSCompiler_StaticMethods_getClassNames$$(this, $control$$11$$).join(" "), title:$control$$11$$.$getTooltip$() || ""}, $attributes$$2_buttonElement$$ = $control$$11$$.$getDomHelper$().$createDom$("div", $attributes$$2_buttonElement$$, $JSCompiler_StaticMethods_createButton$$(this, $control$$11$$.$content_$, $control$$11$$.$getDomHelper$()));
  $JSCompiler_StaticMethods_setAriaStates$$(this, $control$$11$$, $attributes$$2_buttonElement$$);
  return $attributes$$2_buttonElement$$
};
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_returnArg$$("button");
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$($element$$117$$) {
  return $element$$117$$ && $element$$117$$.firstChild.firstChild
};
function $JSCompiler_StaticMethods_createButton$$($JSCompiler_StaticMethods_createButton$self$$, $content$$9$$, $dom$$1$$) {
  return $dom$$1$$.$createDom$("div", "goog-inline-block " + ($JSCompiler_StaticMethods_createButton$self$$.$getCssClass$() + "-outer-box"), $dom$$1$$.$createDom$("div", "goog-inline-block " + ($JSCompiler_StaticMethods_createButton$self$$.$getCssClass$() + "-inner-box"), $content$$9$$))
}
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$118$$) {
  return"DIV" == $element$$118$$.tagName
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($control$$12$$, $element$$120$$) {
  $goog$ui$CustomButtonRenderer$trimTextNodes_$$($element$$120$$, $JSCompiler_alias_TRUE$$);
  $goog$ui$CustomButtonRenderer$trimTextNodes_$$($element$$120$$, $JSCompiler_alias_FALSE$$);
  var $JSCompiler_inline_result$$40_inner$$inline_417_outer$$inline_415$$;
  a: {
    $JSCompiler_inline_result$$40_inner$$inline_417_outer$$inline_415$$ = $JSCompiler_StaticMethods_getFirstElementChild$$($control$$12$$.$getDomHelper$(), $element$$120$$);
    var $innerClassName$$inline_418_outerClassName$$inline_416$$ = this.$getCssClass$() + "-outer-box";
    if($JSCompiler_inline_result$$40_inner$$inline_417_outer$$inline_415$$ && $goog$array$contains$$($goog$dom$classes$get$$($JSCompiler_inline_result$$40_inner$$inline_417_outer$$inline_415$$), $innerClassName$$inline_418_outerClassName$$inline_416$$) && ($JSCompiler_inline_result$$40_inner$$inline_417_outer$$inline_415$$ = $JSCompiler_StaticMethods_getFirstElementChild$$($control$$12$$.$getDomHelper$(), $JSCompiler_inline_result$$40_inner$$inline_417_outer$$inline_415$$), $innerClassName$$inline_418_outerClassName$$inline_416$$ = 
    this.$getCssClass$() + "-inner-box", $JSCompiler_inline_result$$40_inner$$inline_417_outer$$inline_415$$ && $goog$array$contains$$($goog$dom$classes$get$$($JSCompiler_inline_result$$40_inner$$inline_417_outer$$inline_415$$), $innerClassName$$inline_418_outerClassName$$inline_416$$))) {
      $JSCompiler_inline_result$$40_inner$$inline_417_outer$$inline_415$$ = $JSCompiler_alias_TRUE$$;
      break a
    }
    $JSCompiler_inline_result$$40_inner$$inline_417_outer$$inline_415$$ = $JSCompiler_alias_FALSE$$
  }
  $JSCompiler_inline_result$$40_inner$$inline_417_outer$$inline_415$$ || $element$$120$$.appendChild($JSCompiler_StaticMethods_createButton$$(this, $element$$120$$.childNodes, $control$$12$$.$getDomHelper$()));
  $goog$dom$classes$add$$($element$$120$$, "goog-inline-block", this.$getCssClass$());
  return $goog$ui$CustomButtonRenderer$$.$superClass_$.$decorate$.call(this, $control$$12$$, $element$$120$$)
};
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-custom-button");
function $goog$ui$CustomButtonRenderer$trimTextNodes_$$($element$$121$$, $fromStart$$) {
  if($element$$121$$) {
    for(var $node$$23$$ = $fromStart$$ ? $element$$121$$.firstChild : $element$$121$$.lastChild, $next$$;$node$$23$$ && $node$$23$$.parentNode == $element$$121$$;) {
      $next$$ = $fromStart$$ ? $node$$23$$.nextSibling : $node$$23$$.previousSibling;
      if(3 == $node$$23$$.nodeType) {
        var $text$$10$$ = $node$$23$$.nodeValue;
        if("" == $goog$string$trim$$($text$$10$$)) {
          $element$$121$$.removeChild($node$$23$$)
        }else {
          $node$$23$$.nodeValue = $fromStart$$ ? $text$$10$$.replace(/^[\s\xa0]+/, "") : $text$$10$$.replace(/[\s\xa0]+$/, "");
          break
        }
      }else {
        break
      }
      $node$$23$$ = $next$$
    }
  }
}
;function $goog$ui$ToggleButton$$($content$$10$$, $opt_renderer$$3$$, $opt_domHelper$$5$$) {
  $goog$ui$Button$$.call(this, $content$$10$$, $opt_renderer$$3$$ || $goog$ui$CustomButtonRenderer$$.$getInstance$(), $opt_domHelper$$5$$);
  $JSCompiler_StaticMethods_setSupportedState$$(this, 16, $JSCompiler_alias_TRUE$$)
}
$goog$inherits$$($goog$ui$ToggleButton$$, $goog$ui$Button$$);
$goog$ui$registry$setDecoratorByClassName$$("goog-toggle-button", function() {
  return new $goog$ui$ToggleButton$$($JSCompiler_alias_NULL$$)
});
function $rflect$cal$TopPane$$($aViewManager$$1$$, $aTimeManager$$1$$) {
  $goog$ui$Component$$.call(this, $JSCompiler_alias_VOID$$);
  this.$viewManager_$ = $aViewManager$$1$$;
  this.$timeManager_$ = $aTimeManager$$1$$;
  $JSCompiler_StaticMethods_addChild$$(this, this.$buttonNow_$ = new $goog$ui$ToggleButton$$($JSCompiler_alias_NULL$$, $goog$ui$FlatButtonRenderer$$.$getInstance$()));
  $JSCompiler_StaticMethods_addChild$$(this, this.$buttonPrev_$ = new $goog$ui$Button$$($JSCompiler_alias_NULL$$, $goog$ui$FlatButtonRenderer$$.$getInstance$()));
  $JSCompiler_StaticMethods_addChild$$(this, this.$buttonNext_$ = new $goog$ui$Button$$($JSCompiler_alias_NULL$$, $goog$ui$FlatButtonRenderer$$.$getInstance$()));
  $JSCompiler_StaticMethods_addChild$$(this, this.$buttonNewEvent_$ = new $goog$ui$Button$$($JSCompiler_alias_NULL$$, $goog$ui$FlatButtonRenderer$$.$getInstance$()));
  $JSCompiler_StaticMethods_addChild$$(this, this.$buttonDay_$ = new $goog$ui$ToggleButton$$($JSCompiler_alias_NULL$$, $goog$ui$FlatButtonRenderer$$.$getInstance$()));
  $JSCompiler_StaticMethods_addChild$$(this, this.$buttonWeek_$ = new $goog$ui$ToggleButton$$($JSCompiler_alias_NULL$$, $goog$ui$FlatButtonRenderer$$.$getInstance$()));
  $JSCompiler_StaticMethods_addChild$$(this, this.$buttonMonth_$ = new $goog$ui$ToggleButton$$($JSCompiler_alias_NULL$$, $goog$ui$FlatButtonRenderer$$.$getInstance$()));
  $JSCompiler_StaticMethods_addChild$$(this, this.$buttonOptions_$ = new $goog$ui$Button$$($JSCompiler_alias_NULL$$, $goog$ui$FlatButtonRenderer$$.$getInstance$()))
}
$goog$inherits$$($rflect$cal$TopPane$$, $rflect$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $rflect$cal$TopPane$$.prototype;
$JSCompiler_prototypeAlias$$.$timeLabel_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  this.$decorateInternal$(this.$dom_$.createElement("div"))
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($aElement$$1$$, $opt_doNotBuildBody$$1$$) {
  $rflect$cal$TopPane$$.$superClass_$.$decorateInternal$.call(this, $aElement$$1$$, $opt_doNotBuildBody$$1$$)
};
$JSCompiler_prototypeAlias$$.$buildBodyInternal$ = function $$JSCompiler_prototypeAlias$$$$buildBodyInternal$$($aSb$$2$$) {
  for(var $parts$$12$$ = ['<div id="top-pane">', '<div id="sidebar-controls">', '<div id="nb1" class="goog-flat-button-collapse-right ', "cal-menu-leftmost-button goog-flat-button-bord-rad-collapse-right", ' cal-menu-button cal-menu-button-now">', $rflect$cal$i18n$Symbols$$.$NOW$, "</div>", '<div id="nb2" class="goog-flat-button-collapse-left ', "goog-flat-button-collapse-right goog-flat-button-bord-rad-collapse-both ", 'cal-menu-button cal-menu-button-back"><div class="button-sign button-sign-back goog-inline-block"></div></div>', 
  '<div id="nb3" class="goog-flat-button-collapse-left ', "cal-menu-rightmost-button goog-flat-button-bord-rad-collapse-left ", 'cal-menu-button cal-menu-button-forward"><div class="button-sign button-sign-forward goog-inline-block"></div></div></div>', '<div id="main-pane-controls"><div id="main-pane-controls-right">', '<div style="margin-right: 0px;" class="goog-inline-block">', '<div id="nb4" class="goog-flat-button-collapse-right goog-toggle-button ', 'goog-flat-button-bord-rad-collapse-right cal-menu-button">', 
  $rflect$cal$i18n$Symbols$$.$DAY$, "</div>", '<div id="nb5" class="goog-flat-button-collapse-left goog-toggle-button ', "goog-flat-button-collapse-right ", 'goog-flat-button-bord-rad-collapse-both cal-menu-button">', $rflect$cal$i18n$Symbols$$.$WEEK$, "</div>", '<div id="nb6" class="goog-flat-button goog-flat-button-collapse-left goog-toggle-button ', "goog-flat-button-bord-rad-collapse-left cal-menu-button ", 'cal-menu-button-month-view">', $rflect$cal$i18n$Symbols$$.$MONTH$, "</div></div>", '<div id="nb8" class="goog-flat-button cal-menu-rightmost-button cal-menu-button ', 
  'cal-menu-button-options">', '<div class="button-sign button-sign-options goog-inline-block"></div>', "</div></div>", '<div id="main-pane-controls-left"><div id="main-pane-controls-left-left">', '<div id="nb7" class="cal-menu-button cal-menu-button-new-event emphasis-button ', 'cal-menu-leftmost-button">', $rflect$cal$i18n$Symbols$$.$NEW_EVENT$, "</div></div>", '<div id="main-pane-controls-left-right">', '<div id="time-period-label">', $JSCompiler_StaticMethods_getDateHeader$$(this), "</div></div>", 
  "</div></div>", "</div>"], $counter$$10$$ = 1, $length$$28$$ = $parts$$12$$.length - 1;$counter$$10$$ < $length$$28$$;$counter$$10$$++) {
    $aSb$$2$$.append($parts$$12$$[$counter$$10$$])
  }
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  this.$buttonNow_$.$decorate$(this.$dom_$.$getElement$("nb1"));
  this.$buttonPrev_$.$decorate$(this.$dom_$.$getElement$("nb2"));
  this.$buttonNext_$.$decorate$(this.$dom_$.$getElement$("nb3"));
  this.$buttonNewEvent_$.$decorate$(this.$dom_$.$getElement$("nb7"));
  this.$buttonDay_$.$decorate$(this.$dom_$.$getElement$("nb4"));
  this.$buttonWeek_$.$decorate$(this.$dom_$.$getElement$("nb5"));
  this.$buttonMonth_$.$decorate$(this.$dom_$.$getElement$("nb6"));
  this.$buttonOptions_$.$decorate$(this.$dom_$.$getElement$("nb8"));
  $rflect$cal$TopPane$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_updateButtons_$$(this);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$buttonNewEvent_$, "action", function($aEvent$$2$$) {
    this.dispatchEvent("toppaneevent");
    $JSCompiler_StaticMethods_setFocused$$($aEvent$$2$$.target, $JSCompiler_alias_FALSE$$)
  }, $JSCompiler_alias_FALSE$$, this)
};
function $JSCompiler_StaticMethods_getDateHeader$$($JSCompiler_StaticMethods_getDateHeader$self_formatStart$$1$$) {
  var $header$$2_startDate$$3$$ = $JSCompiler_StaticMethods_getDateHeader$self_formatStart$$1$$.$timeManager_$.$daySeries$[0], $endDate$$3$$ = $JSCompiler_StaticMethods_getDateHeader$self_formatStart$$1$$.$timeManager_$.$daySeries$[$JSCompiler_StaticMethods_getDateHeader$self_formatStart$$1$$.$timeManager_$.$daySeries$.length - 1], $basis_formatEnd$$1_formatStringStart$$1$$ = $JSCompiler_StaticMethods_getDateHeader$self_formatStart$$1$$.$timeManager_$.$basis$;
  5 == $JSCompiler_StaticMethods_getDateHeader$self_formatStart$$1$$.$viewManager_$.$currentView$ ? ($JSCompiler_StaticMethods_getDateHeader$self_formatStart$$1$$ = new $goog$i18n$DateTimeFormat$$($goog$i18n$DateTimePatterns$$.$YEAR_MONTH_FULL$), $header$$2_startDate$$3$$ = $JSCompiler_StaticMethods_format$$($JSCompiler_StaticMethods_getDateHeader$self_formatStart$$1$$, $basis_formatEnd$$1_formatStringStart$$1$$)) : $header$$2_startDate$$3$$.getFullYear() != $endDate$$3$$.getFullYear() ? ($basis_formatEnd$$1_formatStringStart$$1$$ = 
  $goog$i18n$DateTimePatterns$$.$MONTH_DAY_ABBR$, $JSCompiler_StaticMethods_getDateHeader$self_formatStart$$1$$ = new $goog$i18n$DateTimeFormat$$($basis_formatEnd$$1_formatStringStart$$1$$ + ", yyyy -"), $basis_formatEnd$$1_formatStringStart$$1$$ = new $goog$i18n$DateTimeFormat$$(" " + $basis_formatEnd$$1_formatStringStart$$1$$ + ", yyyy"), $header$$2_startDate$$3$$ = $JSCompiler_StaticMethods_format$$($JSCompiler_StaticMethods_getDateHeader$self_formatStart$$1$$, $header$$2_startDate$$3$$) + $JSCompiler_StaticMethods_format$$($basis_formatEnd$$1_formatStringStart$$1$$, 
  $endDate$$3$$)) : $header$$2_startDate$$3$$.getMonth() != $endDate$$3$$.getMonth() ? ($basis_formatEnd$$1_formatStringStart$$1$$ = $goog$i18n$DateTimePatterns$$.$MONTH_DAY_ABBR$, $JSCompiler_StaticMethods_getDateHeader$self_formatStart$$1$$ = new $goog$i18n$DateTimeFormat$$($basis_formatEnd$$1_formatStringStart$$1$$ + " -"), $basis_formatEnd$$1_formatStringStart$$1$$ = new $goog$i18n$DateTimeFormat$$(" " + $basis_formatEnd$$1_formatStringStart$$1$$ + ", yyyy"), $header$$2_startDate$$3$$ = $JSCompiler_StaticMethods_format$$($JSCompiler_StaticMethods_getDateHeader$self_formatStart$$1$$, 
  $header$$2_startDate$$3$$) + $JSCompiler_StaticMethods_format$$($basis_formatEnd$$1_formatStringStart$$1$$, $endDate$$3$$)) : $header$$2_startDate$$3$$.getDate() != $endDate$$3$$.getDate() ? ($basis_formatEnd$$1_formatStringStart$$1$$ = $goog$i18n$DateTimePatterns$$.$DAY_ABBR$, $JSCompiler_StaticMethods_getDateHeader$self_formatStart$$1$$ = new $goog$i18n$DateTimeFormat$$($basis_formatEnd$$1_formatStringStart$$1$$ + " -"), $basis_formatEnd$$1_formatStringStart$$1$$ = new $goog$i18n$DateTimeFormat$$(" d MMM, yyyy"), 
  $header$$2_startDate$$3$$ = $JSCompiler_StaticMethods_format$$($JSCompiler_StaticMethods_getDateHeader$self_formatStart$$1$$, $header$$2_startDate$$3$$) + $JSCompiler_StaticMethods_format$$($basis_formatEnd$$1_formatStringStart$$1$$, $endDate$$3$$)) : ($JSCompiler_StaticMethods_getDateHeader$self_formatStart$$1$$ = new $goog$i18n$DateTimeFormat$$("EEEE, " + $goog$i18n$DateTimePatterns$$.$MONTH_DAY_FULL$ + ", yyyy"), $header$$2_startDate$$3$$ = $JSCompiler_StaticMethods_format$$($JSCompiler_StaticMethods_getDateHeader$self_formatStart$$1$$, 
  $header$$2_startDate$$3$$));
  return $header$$2_startDate$$3$$
}
$JSCompiler_prototypeAlias$$.$updateBeforeRedraw$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$updateByRedraw$ = function $$JSCompiler_prototypeAlias$$$$updateByRedraw$$() {
  this.$timeLabel_$ || (this.$timeLabel_$ = this.$dom_$.$getElement$("time-period-label"));
  this.$timeLabel_$.innerHTML = $JSCompiler_StaticMethods_getDateHeader$$(this);
  $JSCompiler_StaticMethods_updateButtons_$$(this)
};
function $JSCompiler_StaticMethods_updateButtons_$$($JSCompiler_StaticMethods_updateButtons_$self$$) {
  var $viewsToButtons$$ = {};
  $viewsToButtons$$[1] = $JSCompiler_StaticMethods_updateButtons_$self$$.$buttonDay_$;
  $viewsToButtons$$[3] = $JSCompiler_StaticMethods_updateButtons_$self$$.$buttonWeek_$;
  $viewsToButtons$$[5] = $JSCompiler_StaticMethods_updateButtons_$self$$.$buttonMonth_$;
  for(var $view$$3$$ in $viewsToButtons$$) {
    var $button$$15$$ = $viewsToButtons$$[$view$$3$$];
    $JSCompiler_StaticMethods_updateButtons_$self$$.$viewManager_$.$currentView$ == $view$$3$$ ? ($JSCompiler_StaticMethods_setChecked$$($button$$15$$, $JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods_setFocused$$($button$$15$$, $JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_setAutoStates$$($button$$15$$, 16, $JSCompiler_alias_FALSE$$)) : ($JSCompiler_StaticMethods_setChecked$$($button$$15$$, $JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_setAutoStates$$($button$$15$$, 16, $JSCompiler_alias_TRUE$$))
  }
  $JSCompiler_StaticMethods_updateButtons_$self$$.$timeManager_$.$isInNowPoint$ ? ($JSCompiler_StaticMethods_setChecked$$($JSCompiler_StaticMethods_updateButtons_$self$$.$buttonNow_$, $JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods_setFocused$$($JSCompiler_StaticMethods_updateButtons_$self$$.$buttonNow_$, $JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_setAutoStates$$($JSCompiler_StaticMethods_updateButtons_$self$$.$buttonNow_$, 16, $JSCompiler_alias_FALSE$$)) : ($JSCompiler_StaticMethods_setChecked$$($JSCompiler_StaticMethods_updateButtons_$self$$.$buttonNow_$, 
  $JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_setAutoStates$$($JSCompiler_StaticMethods_updateButtons_$self$$.$buttonNow_$, 16, $JSCompiler_alias_TRUE$$))
}
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $rflect$cal$TopPane$$.$superClass_$.$disposeInternal$.call(this);
  this.$buttonOptions_$ = this.$buttonMonth_$ = this.$buttonWeek_$ = this.$buttonDay_$ = this.$buttonNewEvent_$ = this.$buttonNext_$ = this.$buttonPrev_$ = this.$buttonNow_$ = this.$timeLabel_$ = this.$timeManager_$ = $JSCompiler_alias_NULL$$
};
function $rflect$cal$MiniCalBuilder$$($aMiniCal$$, $aTimeManager$$2$$) {
  this.$miniCal_$ = $aMiniCal$$;
  this.$timeManager_$ = $aTimeManager$$2$$
}
var $rflect$cal$MiniCalBuilder$HTML_PARTS_$$ = '<div id="month-selector">,<div class="goog-date-picker,"><div id="minical-mask-cnt">,</div><table class="minical-table" cellspacing="0" cellpadding="0"><thead><tr class="goog-date-picker-head,"><td colspan="7"><div class="goog-date-picker-buttons"><div class="goog-date-picker-btn month-sel-btn month-sel-btn-back">&nbsp;</div><div class="goog-date-picker-btn month-sel-btn month-sel-btn-forward">&nbsp;</div></div>,<div class="goog-date-picker-month">,</div></td></tr></thead>,<tbody id="minical-grid" role="grid"><tr>,<th role="columnheader" class="goog-date-picker-wday">,</th>,</tr>,<tr>,<td id="goog-dp-," role="gridcell" class="goog-date-picker-date ,">,</td>,</tr>,</tbody></table></div>,</div>'.split(",");
$rflect$cal$MiniCalBuilder$$.prototype.$buildBodyInternal$ = function $$rflect$cal$MiniCalBuilder$$$$$buildBodyInternal$$($aSb$$3$$) {
  for(var $offset$$24$$ = 0, $length$$29$$ = $rflect$cal$MiniCalBuilder$HTML_PARTS_$$.length;++$offset$$24$$ < $length$$29$$ - 1;) {
    switch($aSb$$3$$.append($rflect$cal$MiniCalBuilder$HTML_PARTS_$$[$offset$$24$$]), $offset$$24$$) {
      case 1:
        this.$miniCal_$.$hovered$ && $aSb$$3$$.append("goog-datepicker-hover");
        break;
      case 2:
        $JSCompiler_StaticMethods_build_$$(this.$miniCal_$.$selectionMask$, $aSb$$3$$);
        break;
      case 3:
        this.$miniCal_$.$hovered$ && $aSb$$3$$.append("goog-datepicker-hover");
        break;
      case 5:
        var $aSb$$inline_432_aSb$$inline_434$$ = $aSb$$3$$;
        $aSb$$inline_432_aSb$$inline_434$$.append(this.$timeManager_$.$basis$.getYear());
        $aSb$$inline_432_aSb$$inline_434$$.append("&nbsp;");
        $aSb$$inline_432_aSb$$inline_434$$.append($goog$i18n$DateTimeSymbols_en$$.$MONTHS$[this.$timeManager_$.$basis$.getMonth()]);
        break;
      case 8:
        for(var $aSb$$inline_432_aSb$$inline_434$$ = $aSb$$3$$, $aOffset$$inline_435$$ = $offset$$24$$, $dayNamesFirstNumber$$inline_436$$ = $goog$i18n$DateTimeSymbols_en$$.$FIRSTDAYOFWEEK$, $dayNameNumber$$inline_437$$ = 0, $counter$$inline_438$$ = 0;7 > $counter$$inline_438$$;$counter$$inline_438$$++) {
          0 < $counter$$inline_438$$ && $aSb$$inline_432_aSb$$inline_434$$.append($rflect$cal$MiniCalBuilder$HTML_PARTS_$$[$aOffset$$inline_435$$]), $dayNameNumber$$inline_437$$ = ($dayNamesFirstNumber$$inline_436$$ + $counter$$inline_438$$ + 1) % 7, $aSb$$inline_432_aSb$$inline_434$$.append($goog$i18n$DateTimeSymbols_en$$.$WEEKDAYS$[$dayNameNumber$$inline_437$$].charAt(0).toUpperCase()), $aSb$$inline_432_aSb$$inline_434$$.append($rflect$cal$MiniCalBuilder$HTML_PARTS_$$[$aOffset$$inline_435$$ + 1])
        }
        $offset$$24$$++;
        break;
      case 11:
        this.$buildMonthGridRows_$($aSb$$3$$, $offset$$24$$), $offset$$24$$ += 5
    }
  }
};
$rflect$cal$MiniCalBuilder$$.prototype.$buildMonthGridRows_$ = function $$rflect$cal$MiniCalBuilder$$$$$buildMonthGridRows_$$($aSb$$8$$, $aOffset$$1$$) {
  for(var $rowsNumber$$ = this.$timeManager_$.$daySeries$.length / 7, $rowCounter$$ = 0;$rowCounter$$ < $rowsNumber$$;$rowCounter$$++) {
    0 < $rowCounter$$ && $aSb$$8$$.append($rflect$cal$MiniCalBuilder$HTML_PARTS_$$[$aOffset$$1$$]), this.$buildDayCells_$($aSb$$8$$, $aOffset$$1$$ + 1, $rowCounter$$), $aSb$$8$$.append($rflect$cal$MiniCalBuilder$HTML_PARTS_$$[$aOffset$$1$$ + 5])
  }
};
$rflect$cal$MiniCalBuilder$$.prototype.$buildDayCells_$ = function $$rflect$cal$MiniCalBuilder$$$$$buildDayCells_$$($aSb$$9$$, $aOffset$$2$$, $aRowCounter$$) {
  for(var $daySeries$$1$$ = this.$timeManager_$.$daySeries$, $day$$2_id$$9$$ = 0, $colCounter$$ = 0;7 > $colCounter$$;$colCounter$$++) {
    $aSb$$9$$.append($rflect$cal$MiniCalBuilder$HTML_PARTS_$$[$aOffset$$2$$]), $aSb$$9$$.append($day$$2_id$$9$$ = 7 * $aRowCounter$$ + $colCounter$$), $aSb$$9$$.append($rflect$cal$MiniCalBuilder$HTML_PARTS_$$[$aOffset$$2$$ + 1]), this.$timeManager_$.$basis$.getMonth() != ($day$$2_id$$9$$ = $daySeries$$1$$[$day$$2_id$$9$$]).getMonth() && $aSb$$9$$.append("dl-other-month"), $aSb$$9$$.append($rflect$cal$MiniCalBuilder$HTML_PARTS_$$[$aOffset$$2$$ + 2]), $aSb$$9$$.append($day$$2_id$$9$$.getDate()), $aSb$$9$$.append($rflect$cal$MiniCalBuilder$HTML_PARTS_$$[$aOffset$$2$$ + 
    3])
  }
};
function $rflect$cal$TimeManager$$($opt_date$$4$$) {
  this.$interval$ = new $rflect$date$Interval$$;
  this.$daySeries$ = [];
  this.$basis$ = $opt_date$$4$$ || new $goog$date$Date$$
}
$JSCompiler_prototypeAlias$$ = $rflect$cal$TimeManager$$.prototype;
$JSCompiler_prototypeAlias$$.$configuration$ = 0;
$JSCompiler_prototypeAlias$$.$daysNumber$ = 0;
$JSCompiler_prototypeAlias$$.$isInNowPoint$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$basis$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$start_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$daySeries$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$run$ = function $$JSCompiler_prototypeAlias$$$$run$$() {
  switch(this.$configuration$) {
    case 1:
    ;
    case 2:
      this.$start_$ = this.$basis$.$clone$();
      break;
    case 3:
    ;
    case 4:
      this.$start_$ = $rflect$date$moveToDayOfWeekIfNeeded$$(this.$basis$);
      break;
    case 7:
    ;
    case 5:
      this.$start_$ = this.$basis$.$clone$(), this.$start_$.setDate(1), this.$start_$ = $rflect$date$moveToDayOfWeekIfNeeded$$(this.$start_$)
  }
  var $daysNumber$$inline_449_difference$$inline_450_now$$inline_896_today$$inline_454$$ = 0;
  switch(this.$configuration$) {
    case 1:
      $daysNumber$$inline_449_difference$$inline_450_now$$inline_896_today$$inline_454$$ = 1;
      break;
    case 2:
      $daysNumber$$inline_449_difference$$inline_450_now$$inline_896_today$$inline_454$$ = this.$daysNumber$;
      break;
    case 3:
      $daysNumber$$inline_449_difference$$inline_450_now$$inline_896_today$$inline_454$$ = 7;
      break;
    case 4:
      $daysNumber$$inline_449_difference$$inline_450_now$$inline_896_today$$inline_454$$ = this.$daysNumber$;
      break;
    case 7:
    ;
    case 5:
      var $daysNumber$$inline_449_difference$$inline_450_now$$inline_896_today$$inline_454$$ = 0, $date$$inline_452_firstDayOfMonth$$inline_451$$ = this.$basis$.$clone$();
      $date$$inline_452_firstDayOfMonth$$inline_451$$.setDate(1);
      this.$start_$.$equals$($date$$inline_452_firstDayOfMonth$$inline_451$$) || ($daysNumber$$inline_449_difference$$inline_450_now$$inline_896_today$$inline_454$$ = $JSCompiler_StaticMethods_getWeekday$$($date$$inline_452_firstDayOfMonth$$inline_451$$) - $JSCompiler_StaticMethods_getWeekday$$(this.$start_$));
      $daysNumber$$inline_449_difference$$inline_450_now$$inline_896_today$$inline_454$$ = 7 == this.$configuration$ ? 42 : 0 == ($daysNumber$$inline_449_difference$$inline_450_now$$inline_896_today$$inline_454$$ + $goog$date$getNumberOfDaysInMonth$$(this.$basis$.getFullYear(), this.$basis$.getMonth())) % 7 ? $daysNumber$$inline_449_difference$$inline_450_now$$inline_896_today$$inline_454$$ + $goog$date$getNumberOfDaysInMonth$$(this.$basis$.getFullYear(), this.$basis$.getMonth()) : $daysNumber$$inline_449_difference$$inline_450_now$$inline_896_today$$inline_454$$ + 
      $goog$date$getNumberOfDaysInMonth$$(this.$basis$.getFullYear(), this.$basis$.getMonth()) - ($daysNumber$$inline_449_difference$$inline_450_now$$inline_896_today$$inline_454$$ + $goog$date$getNumberOfDaysInMonth$$(this.$basis$.getFullYear(), this.$basis$.getMonth())) % 7 + 7
  }
  this.$daySeries$.length = 0;
  $date$$inline_452_firstDayOfMonth$$inline_451$$ = new $rflect$date$DateShim$$(this.$start_$);
  $date$$inline_452_firstDayOfMonth$$inline_451$$.$dayOfYear_$ = this.$start_$.$getDayOfYear$();
  var $aWeekNumber$$inline_893_counter$$inline_453$$ = this.$start_$.$getWeekNumber$();
  $date$$inline_452_firstDayOfMonth$$inline_451$$.$weekNumber_$ = $aWeekNumber$$inline_893_counter$$inline_453$$;
  for($aWeekNumber$$inline_893_counter$$inline_453$$ = 0;$aWeekNumber$$inline_893_counter$$inline_453$$ < $daysNumber$$inline_449_difference$$inline_450_now$$inline_896_today$$inline_454$$;$aWeekNumber$$inline_893_counter$$inline_453$$++) {
    this.$daySeries$[$aWeekNumber$$inline_893_counter$$inline_453$$] = $date$$inline_452_firstDayOfMonth$$inline_451$$, $date$$inline_452_firstDayOfMonth$$inline_451$$ = $rflect$date$getTomorrow$$($date$$inline_452_firstDayOfMonth$$inline_451$$)
  }
  this.$interval$.start = this.$start_$.getTime();
  this.$interval$.end = (new $goog$date$Date$$($date$$inline_452_firstDayOfMonth$$inline_451$$)).getTime();
  $daysNumber$$inline_449_difference$$inline_450_now$$inline_896_today$$inline_454$$ = new Date;
  if(this.$isInNowPoint$ = this.$interval$.contains(+$daysNumber$$inline_449_difference$$inline_450_now$$inline_896_today$$inline_454$$) && (5 != this.$configuration$ || this.$basis$.getMonth() == $daysNumber$$inline_449_difference$$inline_450_now$$inline_896_today$$inline_454$$.getMonth())) {
    $daysNumber$$inline_449_difference$$inline_450_now$$inline_896_today$$inline_454$$ = new Date, this.$currentDay_$ = new $rflect$date$DateShim$$($daysNumber$$inline_449_difference$$inline_450_now$$inline_896_today$$inline_454$$.getFullYear(), $daysNumber$$inline_449_difference$$inline_450_now$$inline_896_today$$inline_454$$.getMonth(), $daysNumber$$inline_449_difference$$inline_450_now$$inline_896_today$$inline_454$$.getDate())
  }
};
$JSCompiler_prototypeAlias$$.shift = function $$JSCompiler_prototypeAlias$$$shift$($aDirection$$1$$) {
  var $daysNumber$$inline_458$$ = 0;
  switch(this.$configuration$) {
    case 1:
      this.$basis$.add(new $goog$date$Interval$$(0, 0, 1 * $aDirection$$1$$));
      break;
    case 3:
      this.$basis$.add(new $goog$date$Interval$$(0, 0, 7 * $aDirection$$1$$));
      break;
    case 2:
    ;
    case 4:
      $daysNumber$$inline_458$$ = this.$daysNumber$ * $aDirection$$1$$;
      this.$basis$.add(new $goog$date$Interval$$(0, 0, $daysNumber$$inline_458$$));
      break;
    case 7:
    ;
    case 5:
      this.$basis$.add(new $goog$date$Interval$$(0, 1 * $aDirection$$1$$));
      break;
    case 6:
      this.$basis$.add(new $goog$date$Interval$$(1 * $aDirection$$1$$))
  }
  this.$run$()
};
function $JSCompiler_StaticMethods_shiftToPoint$$($JSCompiler_StaticMethods_shiftToPoint$self$$, $opt_date$$5$$) {
  $JSCompiler_StaticMethods_shiftToPoint$self$$.$basis$ = $opt_date$$5$$ || new $goog$date$Date$$;
  $JSCompiler_StaticMethods_shiftToPoint$self$$.$run$()
}
;function $rflect$cal$MouseOverRegistry$$() {
}
function $JSCompiler_StaticMethods_registerTarget$$($JSCompiler_StaticMethods_registerTarget$self$$, $aTarget$$, $opt_hoverClassName$$) {
  $JSCompiler_StaticMethods_registerTarget$self$$.$registeredTarget_$ && $goog$dom$classes$remove$$($JSCompiler_StaticMethods_registerTarget$self$$.$registeredTarget_$, $JSCompiler_StaticMethods_registerTarget$self$$.$registeredTargetClass_$);
  if(($JSCompiler_StaticMethods_registerTarget$self$$.$registeredTarget_$ = $aTarget$$) && $opt_hoverClassName$$) {
    $goog$dom$classes$add$$($aTarget$$, $opt_hoverClassName$$), $JSCompiler_StaticMethods_registerTarget$self$$.$registeredTargetClass_$ = $opt_hoverClassName$$
  }
}
;function $rflect$string$buildClassNameRe$$($var_args$$65$$) {
  var $buffer$$9$$ = [];
  $goog$array$forEach$$(arguments, function($aVal$$, $aIndex$$3$$) {
    $buffer$$9$$[$aIndex$$3$$] = String($aVal$$).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
  });
  return RegExp("(\\s|^)" + $buffer$$9$$.join("(\\s|$)|(\\s|^)") + "(\\s|$)")
}
function $rflect$string$getNumericIndex$$($aId$$2_matches$$1$$) {
  return($aId$$2_matches$$1$$ = RegExp("\\d{1," + ($goog$isDef$$(2) ? 2 : 1) + "}").exec($aId$$2_matches$$1$$)) ? +$aId$$2_matches$$1$$[0] : NaN
}
;function $rflect$cal$SelectionMask$$($aViewManager$$2$$, $aComponent$$, $aTimeManager$$3$$) {
  this.$viewManager_$ = $aViewManager$$2$$;
  this.$component_$ = $aComponent$$;
  this.$timeManager_$ = $aTimeManager$$3$$;
  this.$rects_$ = []
}
$JSCompiler_prototypeAlias$$ = $rflect$cal$SelectionMask$$.prototype;
$JSCompiler_prototypeAlias$$.$configuration_$ = 0;
$JSCompiler_prototypeAlias$$.$startDate$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$endDate$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$initialized_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$isHorizontal$ = $JSCompiler_returnArg$$($JSCompiler_alias_FALSE$$);
$JSCompiler_prototypeAlias$$.$init$ = $JSCompiler_set$$("$configuration_$");
$JSCompiler_prototypeAlias$$.$getRect_$ = function $$JSCompiler_prototypeAlias$$$$getRect_$$($aX$$, $aY$$, $aDx$$, $aDy$$) {
  return new $goog$math$Rect$$($aX$$, $aY$$, $aDx$$, $aDy$$)
};
function $JSCompiler_StaticMethods_compareCells_$$($JSCompiler_StaticMethods_compareCells_$self$$, $aCellA$$, $aCellB$$) {
  return $JSCompiler_StaticMethods_compareCells_$self$$.$isHorizontal$() ? $goog$math$Coordinate$equals$$($aCellA$$, $aCellB$$) ? 0 : $aCellA$$.x > $aCellB$$.x || $aCellA$$.x == $aCellB$$.x && $aCellA$$.y > $aCellB$$.y ? 1 : -1 : $goog$math$Coordinate$equals$$($aCellA$$, $aCellB$$) ? 0 : $aCellA$$.y > $aCellB$$.y || $aCellA$$.y == $aCellB$$.y && $aCellA$$.x > $aCellB$$.x ? 1 : -1
}
function $JSCompiler_StaticMethods_calculateDates_$$($JSCompiler_StaticMethods_calculateDates_$self$$, $aMinCell$$, $opt_maxCell$$) {
  var $startDate$$4$$ = $JSCompiler_alias_NULL$$, $endDate$$4$$ = $JSCompiler_alias_NULL$$, $minutes$$5$$ = 0, $tempDate$$ = $JSCompiler_alias_NULL$$;
  $JSCompiler_StaticMethods_calculateDates_$self$$.$isHorizontal$() ? ($tempDate$$ = $JSCompiler_StaticMethods_calculateDates_$self$$.$timeManager_$.$daySeries$[$aMinCell$$.x], $minutes$$5$$ = 30 * $aMinCell$$.y, $startDate$$4$$ = new $goog$date$DateTime$$($tempDate$$.getYear(), $tempDate$$.getMonth(), $tempDate$$.getDate(), $minutes$$5$$ / 60, $minutes$$5$$ % 60), $opt_maxCell$$ && (47 == $opt_maxCell$$.y ? ($tempDate$$ = $rflect$date$getTomorrow$$($JSCompiler_StaticMethods_calculateDates_$self$$.$timeManager_$.$daySeries$[$opt_maxCell$$.x]), 
  $endDate$$4$$ = new $goog$date$DateTime$$($tempDate$$.getYear(), $tempDate$$.getMonth(), $tempDate$$.getDate())) : ($tempDate$$ = $JSCompiler_StaticMethods_calculateDates_$self$$.$timeManager_$.$daySeries$[$opt_maxCell$$.x], $minutes$$5$$ = 30 * ($opt_maxCell$$.y + 1), $endDate$$4$$ = new $goog$date$DateTime$$($tempDate$$.getYear(), $tempDate$$.getMonth(), $tempDate$$.getDate(), $minutes$$5$$ / 60, $minutes$$5$$ % 60)))) : ($tempDate$$ = $JSCompiler_StaticMethods_calculateDates_$self$$.$timeManager_$.$daySeries$[$aMinCell$$.x + 
  7 * $aMinCell$$.y], $startDate$$4$$ = new $goog$date$DateTime$$($tempDate$$.getYear(), $tempDate$$.getMonth(), $tempDate$$.getDate()), $opt_maxCell$$ && ($tempDate$$ = $rflect$date$getTomorrow$$($JSCompiler_StaticMethods_calculateDates_$self$$.$timeManager_$.$daySeries$[$opt_maxCell$$.x + 7 * $opt_maxCell$$.y]), $endDate$$4$$ = new $goog$date$DateTime$$($tempDate$$.getYear(), $tempDate$$.getMonth(), $tempDate$$.getDate())));
  $JSCompiler_StaticMethods_calculateDates_$self$$.$startDate$ = $startDate$$4$$;
  $JSCompiler_StaticMethods_calculateDates_$self$$.$endDate$ = $endDate$$4$$
}
function $JSCompiler_StaticMethods_build_$$($JSCompiler_StaticMethods_build_$self$$, $aSb$$10$$) {
  for(var $sb$$3$$ = $aSb$$10$$ || new $goog$string$StringBuffer$$, $counter$$13$$ = 0, $length$$34$$ = $JSCompiler_StaticMethods_build_$self$$.$rects_$.length;$counter$$13$$ < $length$$34$$;$counter$$13$$++) {
    var $JSCompiler_StaticMethods_buildUnit_$self$$inline_460$$ = $JSCompiler_StaticMethods_build_$self$$, $aSb$$inline_461$$ = $sb$$3$$, $aRect$$inline_462$$ = $JSCompiler_StaticMethods_build_$self$$.$rects_$[$counter$$13$$];
    $aSb$$inline_461$$.append('<div class="mask');
    $JSCompiler_StaticMethods_buildUnit_$self$$inline_460$$.$additionalClassNames$ && ($aSb$$inline_461$$.append(" "), $aSb$$inline_461$$.append($JSCompiler_StaticMethods_buildUnit_$self$$inline_460$$.$additionalClassNames$));
    $aSb$$inline_461$$.append('" style="left:');
    $aSb$$inline_461$$.append(Math.floor($aRect$$inline_462$$.left));
    $aSb$$inline_461$$.append("px;top:");
    $aSb$$inline_461$$.append(Math.floor($aRect$$inline_462$$.top));
    $aSb$$inline_461$$.append("px;width:");
    $aSb$$inline_461$$.append(Math.ceil($aRect$$inline_462$$.width));
    $aSb$$inline_461$$.append("px;height:");
    $aSb$$inline_461$$.append(Math.ceil($aRect$$inline_462$$.height));
    $aSb$$inline_461$$.append('px">');
    $aSb$$inline_461$$.append("</div>")
  }
  return $aSb$$10$$ ? $JSCompiler_alias_VOID$$ : $sb$$3$$.toString()
}
;function $rflect$cal$MiniCalSelectionMask$$($aViewManager$$3$$, $aMiniCal$$1$$, $aTimeManager$$4$$) {
  $rflect$cal$SelectionMask$$.call(this, $aViewManager$$3$$, $aMiniCal$$1$$, $aTimeManager$$4$$)
}
$goog$inherits$$($rflect$cal$MiniCalSelectionMask$$, $rflect$cal$SelectionMask$$);
$JSCompiler_prototypeAlias$$ = $rflect$cal$MiniCalSelectionMask$$.prototype;
$JSCompiler_prototypeAlias$$.$dragStarted_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$draggedAtLeastOnce_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$indexIsInMask_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.close = function $$JSCompiler_prototypeAlias$$$close$() {
  $_log$$("close called");
  this.$draggedAtLeastOnce_$ ? (this.$currentCell_$ = this.$visibleCurrentCell_$, this.$startCell_$ = this.$visibleStartCell_$, this.$draggedAtLeastOnce_$ = this.$dragStarted_$ = $JSCompiler_alias_FALSE$$, $goog$events$dispatchEvent$$(this.$component_$, {type:"datedragend", $startDate$:this.$startDate$, $endDate$:this.$endDate$})) : this.$dragStarted_$ && (this.$dragStarted_$ = $JSCompiler_alias_FALSE$$, $goog$events$dispatchEvent$$(this.$component_$, {type:"dateselect", $date$:this.$startDate$, 
  $isInMask$:this.$indexIsInMask_$}))
};
$JSCompiler_prototypeAlias$$.update = function $$JSCompiler_prototypeAlias$$$update$($aIndex$$5_currentCell$$) {
  $aIndex$$5_currentCell$$ = $JSCompiler_StaticMethods_getCellBySelectionIndex_$$($aIndex$$5_currentCell$$);
  this.$dragStarted_$ && !$goog$math$Coordinate$equals$$(this.$currentCell_$, $aIndex$$5_currentCell$$) && (this.$initialized_$ = this.$draggedAtLeastOnce_$ = $JSCompiler_alias_TRUE$$, this.$currentCell_$ = $aIndex$$5_currentCell$$, this.$update_$())
};
$JSCompiler_prototypeAlias$$.$init$ = function $$JSCompiler_prototypeAlias$$$$init$$($JSCompiler_inline_result$$42_aConfiguration$$1_cell$$inline_466$$, $startSelectionIndex$$, $endSelectionIndex_minCell$$inline_467$$) {
  $rflect$cal$SelectionMask$$.prototype.$init$.call(this, $JSCompiler_inline_result$$42_aConfiguration$$1_cell$$inline_466$$);
  this.$maskEl_$ = $goog$dom$getElement$$("minical-mask-cnt");
  this.$indexIsInMask_$ = this.$draggedAtLeastOnce_$ = this.$dragStarted_$ = $JSCompiler_alias_FALSE$$;
  $_log$$("this.configuration_", this.$configuration_$);
  if(5 == this.$configuration_$) {
    this.$initialized_$ = $JSCompiler_alias_FALSE$$, this.$startCell_$ = $JSCompiler_StaticMethods_getCellBySelectionIndex_$$($startSelectionIndex$$), this.$currentCell_$ = $JSCompiler_StaticMethods_getCellBySelectionIndex_$$($endSelectionIndex_minCell$$inline_467$$), this.$update_$(), this.close()
  }else {
    this.$dragStarted_$ = $JSCompiler_alias_TRUE$$;
    if(this.$initialized_$) {
      $JSCompiler_inline_result$$42_aConfiguration$$1_cell$$inline_466$$ = $JSCompiler_StaticMethods_getCellBySelectionIndex_$$($startSelectionIndex$$);
      $endSelectionIndex_minCell$$inline_467$$ = -1 == $JSCompiler_StaticMethods_compareCells_$$(this, this.$visibleStartCell_$, this.$visibleCurrentCell_$) ? this.$visibleStartCell_$ : this.$visibleCurrentCell_$;
      var $maxCell$$inline_468$$ = 1 == $JSCompiler_StaticMethods_compareCells_$$(this, this.$visibleStartCell_$, this.$visibleCurrentCell_$) ? this.$visibleStartCell_$ : this.$visibleCurrentCell_$;
      $_log$$("cell", $JSCompiler_inline_result$$42_aConfiguration$$1_cell$$inline_466$$);
      $_log$$("minCell", $endSelectionIndex_minCell$$inline_467$$);
      $_log$$("maxCell", $maxCell$$inline_468$$);
      $JSCompiler_inline_result$$42_aConfiguration$$1_cell$$inline_466$$ = 0 <= $JSCompiler_StaticMethods_compareCells_$$(this, $JSCompiler_inline_result$$42_aConfiguration$$1_cell$$inline_466$$, $endSelectionIndex_minCell$$inline_467$$) && 0 >= $JSCompiler_StaticMethods_compareCells_$$(this, $JSCompiler_inline_result$$42_aConfiguration$$1_cell$$inline_466$$, $maxCell$$inline_468$$)
    }else {
      $JSCompiler_inline_result$$42_aConfiguration$$1_cell$$inline_466$$ = $JSCompiler_alias_FALSE$$
    }
    this.$indexIsInMask_$ = $JSCompiler_inline_result$$42_aConfiguration$$1_cell$$inline_466$$;
    $JSCompiler_StaticMethods_calculateDates_$$(this, this.$startCell_$ = $JSCompiler_StaticMethods_getCellBySelectionIndex_$$($startSelectionIndex$$));
    this.$currentCell_$ = this.$startCell_$.$clone$()
  }
};
function $JSCompiler_StaticMethods_getCellBySelectionIndex_$$($aSelectionIndex$$) {
  return new $goog$math$Coordinate$$($aSelectionIndex$$ % 7, Math.floor($aSelectionIndex$$ / 7))
}
$JSCompiler_prototypeAlias$$.$update_$ = function $$JSCompiler_prototypeAlias$$$$update_$$() {
  var $maxCell$$1$$, $minCell$$1$$;
  this.$rects_$.length = 0;
  if(!(0 > this.$startCell_$.x || 0 > this.$startCell_$.y || 0 > this.$currentCell_$.x || 0 > this.$currentCell_$.y)) {
    this.$initialized_$ = $JSCompiler_alias_TRUE$$;
    var $defaultStepX$$ = 134 / 7, $defaultStepY$$ = 110 / 6;
    this.$visibleStartCell_$ = this.$startCell_$.$clone$();
    this.$visibleCurrentCell_$ = this.$currentCell_$.$clone$();
    $minCell$$1$$ = -1 == $JSCompiler_StaticMethods_compareCells_$$(this, this.$visibleStartCell_$, this.$visibleCurrentCell_$) ? this.$visibleStartCell_$ : this.$visibleCurrentCell_$;
    $maxCell$$1$$ = 1 == $JSCompiler_StaticMethods_compareCells_$$(this, this.$visibleStartCell_$, this.$visibleCurrentCell_$) ? this.$visibleStartCell_$ : this.$visibleCurrentCell_$;
    var $range$$6$$ = $maxCell$$1$$.x + 7 * $maxCell$$1$$.y - ($minCell$$1$$.x + 7 * $minCell$$1$$.y) + 1;
    7 >= $range$$6$$ && 2 <= $range$$6$$ && 1 == $maxCell$$1$$.y - $minCell$$1$$.y ? (this.$rects_$.push(this.$getRect_$($minCell$$1$$.x * $defaultStepX$$, $minCell$$1$$.y * $defaultStepY$$, (7 - $minCell$$1$$.x) * $defaultStepX$$, $defaultStepY$$)), this.$rects_$.push(this.$getRect_$(0, $maxCell$$1$$.y * $defaultStepY$$, ($maxCell$$1$$.x + 1) * $defaultStepX$$, $defaultStepY$$))) : ($minCell$$1$$.y != $maxCell$$1$$.y && ($minCell$$1$$.x = 0, $maxCell$$1$$.x = 6), this.$rects_$.push(this.$getRect_$($minCell$$1$$.x * 
    $defaultStepX$$, $minCell$$1$$.y * $defaultStepY$$, ($maxCell$$1$$.x - $minCell$$1$$.x + 1) * $defaultStepX$$, ($maxCell$$1$$.y - $minCell$$1$$.y + 1) * $defaultStepY$$)));
    5 != this.$configuration_$ && ($JSCompiler_StaticMethods_calculateDateAndSelectionType_$$(this, $minCell$$1$$, $maxCell$$1$$), this.$maskEl_$.innerHTML = $JSCompiler_StaticMethods_build_$$(this), $goog$events$dispatchEvent$$(this.$component_$, {type:"datedrag", $startDate$:this.$startDate_$, $firstDayInMonth$:this.$firstDayInMonth_$, duration:this.$duration_$, $selectionConfiguration$:this.$selectionConfiguration_$}), this.$draggedAtLeastOnce_$ = $JSCompiler_alias_TRUE$$)
  }
};
function $JSCompiler_StaticMethods_calculateDateAndSelectionType_$$($JSCompiler_StaticMethods_calculateDateAndSelectionType_$self$$, $aMinCell$$1$$, $aMaxCell_duration$$1$$) {
  var $numberOfDaysInMonth_tempDate$$1_year$$19$$ = $JSCompiler_StaticMethods_calculateDateAndSelectionType_$self$$.$timeManager_$.$daySeries$[$aMinCell$$1$$.x + 7 * $aMinCell$$1$$.y];
  $JSCompiler_StaticMethods_calculateDateAndSelectionType_$self$$.$startDate_$ = new $goog$date$DateTime$$($numberOfDaysInMonth_tempDate$$1_year$$19$$.getYear(), $numberOfDaysInMonth_tempDate$$1_year$$19$$.getMonth(), $numberOfDaysInMonth_tempDate$$1_year$$19$$.getDate());
  $aMaxCell_duration$$1$$ = $JSCompiler_StaticMethods_calculateDateAndSelectionType_$self$$.$duration_$ = $aMaxCell_duration$$1$$.x + 7 * $aMaxCell_duration$$1$$.y - ($aMinCell$$1$$.x + 7 * $aMinCell$$1$$.y) + 1;
  var $dayInMonth_indexOfFirstDayOfMonth$$ = $JSCompiler_StaticMethods_calculateDateAndSelectionType_$self$$.$timeManager_$.$daySeries$[6], $numberOfDaysInMonth_tempDate$$1_year$$19$$ = $dayInMonth_indexOfFirstDayOfMonth$$.getYear(), $month$$10$$ = $dayInMonth_indexOfFirstDayOfMonth$$.getMonth(), $dayInMonth_indexOfFirstDayOfMonth$$ = $goog$array$findIndex$$($JSCompiler_StaticMethods_calculateDateAndSelectionType_$self$$.$timeManager_$.$daySeries$, function($aDate$$6$$) {
    return 1 == $aDate$$6$$.getDate()
  }), $numberOfDaysInMonth_tempDate$$1_year$$19$$ = 0 == ($dayInMonth_indexOfFirstDayOfMonth$$ + $goog$date$getNumberOfDaysInMonth$$($numberOfDaysInMonth_tempDate$$1_year$$19$$, $month$$10$$)) % 7 ? $dayInMonth_indexOfFirstDayOfMonth$$ + $goog$date$getNumberOfDaysInMonth$$($numberOfDaysInMonth_tempDate$$1_year$$19$$, $month$$10$$) : $dayInMonth_indexOfFirstDayOfMonth$$ + $goog$date$getNumberOfDaysInMonth$$($numberOfDaysInMonth_tempDate$$1_year$$19$$, $month$$10$$) - ($dayInMonth_indexOfFirstDayOfMonth$$ + 
  $goog$date$getNumberOfDaysInMonth$$($numberOfDaysInMonth_tempDate$$1_year$$19$$, $month$$10$$)) % 7 + 7;
  0 == $aMaxCell_duration$$1$$ % 7 && 0 == $aMinCell$$1$$.x ? 0 == $aMinCell$$1$$.y && $aMaxCell_duration$$1$$ == $numberOfDaysInMonth_tempDate$$1_year$$19$$ ? ($JSCompiler_StaticMethods_calculateDateAndSelectionType_$self$$.$selectionConfiguration_$ = 5, $numberOfDaysInMonth_tempDate$$1_year$$19$$ = $JSCompiler_StaticMethods_calculateDateAndSelectionType_$self$$.$timeManager_$.$daySeries$[$dayInMonth_indexOfFirstDayOfMonth$$], $JSCompiler_StaticMethods_calculateDateAndSelectionType_$self$$.$firstDayInMonth_$ = 
  new $goog$date$DateTime$$($numberOfDaysInMonth_tempDate$$1_year$$19$$.getYear(), $numberOfDaysInMonth_tempDate$$1_year$$19$$.getMonth(), $numberOfDaysInMonth_tempDate$$1_year$$19$$.getDate())) : $JSCompiler_StaticMethods_calculateDateAndSelectionType_$self$$.$selectionConfiguration_$ = 7 == $aMaxCell_duration$$1$$ ? 3 : 4 : $JSCompiler_StaticMethods_calculateDateAndSelectionType_$self$$.$selectionConfiguration_$ = 1 == $aMaxCell_duration$$1$$ ? 1 : 2
}
;function $rflect$cal$MiniCal$$($aViewManager$$4$$, $aExternalTimeManager$$) {
  $goog$ui$Component$$.call(this, $JSCompiler_alias_VOID$$);
  this.$viewManager_$ = $aViewManager$$4$$;
  this.$extTimeManager_$ = $aExternalTimeManager$$;
  this.$timeManager_$ = new $rflect$cal$TimeManager$$;
  this.$timeManager_$.$configuration$ = 7;
  this.$miniCalBuilder_$ = new $rflect$cal$MiniCalBuilder$$(this, this.$timeManager_$);
  $_inspect$$("miniCalBuilder", this.$miniCalBuilder_$);
  this.$selectionMask$ = new $rflect$cal$MiniCalSelectionMask$$($aViewManager$$4$$, this, this.$timeManager_$);
  $_inspect$$("selectionMask", this.$selectionMask$);
  this.$moRegistry_$ = new $rflect$cal$MouseOverRegistry$$
}
$goog$inherits$$($rflect$cal$MiniCal$$, $rflect$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $rflect$cal$MiniCal$$.prototype;
$JSCompiler_prototypeAlias$$.$updateBeforeRedraw$ = function $$JSCompiler_prototypeAlias$$$$updateBeforeRedraw$$($opt_internal$$, $opt_direction$$) {
  $opt_internal$$ && $opt_direction$$ ? this.$timeManager_$.shift($opt_direction$$) : $JSCompiler_StaticMethods_shiftToPoint$$(this.$timeManager_$, this.$extTimeManager_$.$basis$);
  $JSCompiler_StaticMethods_initMask_$$(this)
};
function $JSCompiler_StaticMethods_initMask_$$($JSCompiler_StaticMethods_initMask_$self$$) {
  var $overlap_startSelectionIndex$$1$$ = -1, $endSelectionIndex$$1_startDate$$5$$ = -1;
  if($JSCompiler_StaticMethods_overlaps$$($JSCompiler_StaticMethods_initMask_$self$$.$timeManager_$.$interval$, $JSCompiler_StaticMethods_initMask_$self$$.$extTimeManager_$.$interval$)) {
    var $overlap_startSelectionIndex$$1$$ = $JSCompiler_StaticMethods_overlap$$($JSCompiler_StaticMethods_initMask_$self$$.$timeManager_$.$interval$, $JSCompiler_StaticMethods_initMask_$self$$.$extTimeManager_$.$interval$), $endSelectionIndex$$1_startDate$$5$$ = new $goog$date$Date$$, $endDate$$5$$ = new $goog$date$Date$$;
    $endSelectionIndex$$1_startDate$$5$$.setTime($overlap_startSelectionIndex$$1$$.start);
    $endDate$$5$$.setTime($overlap_startSelectionIndex$$1$$.end);
    var $startDateDay$$ = $endSelectionIndex$$1_startDate$$5$$.getDate(), $startDateMonth$$ = $endSelectionIndex$$1_startDate$$5$$.getMonth(), $endDateDay$$ = $endDate$$5$$.getDate(), $endDateMonth$$ = $endDate$$5$$.getMonth(), $overlap_startSelectionIndex$$1$$ = $goog$array$findIndex$$($JSCompiler_StaticMethods_initMask_$self$$.$timeManager_$.$daySeries$, function($aDate$$7$$) {
      return $startDateMonth$$ == $aDate$$7$$.getMonth() && $startDateDay$$ == $aDate$$7$$.getDate()
    }), $endSelectionIndex$$1_startDate$$5$$ = $goog$array$findIndexRight$$($JSCompiler_StaticMethods_initMask_$self$$.$timeManager_$.$daySeries$, function($aDate$$8$$) {
      return $endDateMonth$$ == $aDate$$8$$.getMonth() && $endDateDay$$ == $aDate$$8$$.getDate()
    });
    0 <= $overlap_startSelectionIndex$$1$$ && (0 > $endSelectionIndex$$1_startDate$$5$$ ? $endSelectionIndex$$1_startDate$$5$$ = $JSCompiler_StaticMethods_initMask_$self$$.$timeManager_$.$daySeries$.length - 1 : $endSelectionIndex$$1_startDate$$5$$--)
  }
  $JSCompiler_StaticMethods_initMask_$self$$.$selectionMask$.$init$(5, $overlap_startSelectionIndex$$1$$, $endSelectionIndex$$1_startDate$$5$$)
}
$JSCompiler_prototypeAlias$$.$updateByRedraw$ = function $$JSCompiler_prototypeAlias$$$$updateByRedraw$$() {
  this.$getElement$().innerHTML = $JSCompiler_StaticMethods_buildBody$$(this)
};
$JSCompiler_prototypeAlias$$.$buildBodyInternal$ = function $$JSCompiler_prototypeAlias$$$$buildBodyInternal$$($aSb$$13$$) {
  this.$miniCalBuilder_$.$buildBodyInternal$($aSb$$13$$)
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($aElement$$2$$, $opt_doNotBuildBody$$2$$) {
  $rflect$cal$MiniCal$$.$superClass_$.$decorateInternal$.call(this, $aElement$$2$$, $opt_doNotBuildBody$$2$$)
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $rflect$cal$MiniCal$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "click", this.$onClick_$, $JSCompiler_alias_FALSE$$, this), this.$getElement$(), "mouseover", this.$onMouseOver_$, $JSCompiler_alias_FALSE$$, this), this.$getElement$(), "mouseout", this.$onMouseOut_$, $JSCompiler_alias_FALSE$$, 
  this), this.$getElement$(), "mousedown", this.$onMouseDown_$, $JSCompiler_alias_FALSE$$, this), this.$getElement$(), "selectstart", this.$onSelectStart_$, $JSCompiler_alias_FALSE$$, this), document, "mousemove", this.$onMouseMove_$, $JSCompiler_alias_FALSE$$, this), document, "mouseup", this.$onMouseUp_$, $JSCompiler_alias_FALSE$$, this)
};
$JSCompiler_prototypeAlias$$.$onClick_$ = function $$JSCompiler_prototypeAlias$$$$onClick_$$($aEvent$$3_className$$26$$) {
  $aEvent$$3_className$$26$$ = $aEvent$$3_className$$26$$.target.className;
  var $direction$$4$$ = 0;
  $rflect$string$buildClassNameRe$$("month-sel-btn-forward").test($aEvent$$3_className$$26$$) ? $direction$$4$$ = 1 : $rflect$string$buildClassNameRe$$("month-sel-btn-back").test($aEvent$$3_className$$26$$) && ($direction$$4$$ = -1);
  $direction$$4$$ && (this.$updateBeforeRedraw$($JSCompiler_alias_TRUE$$, $direction$$4$$), this.$updateByRedraw$())
};
$JSCompiler_prototypeAlias$$.$onMouseOver_$ = function $$JSCompiler_prototypeAlias$$$$onMouseOver_$$($aEvent$$4_target$$46$$) {
  $aEvent$$4_target$$46$$ = $aEvent$$4_target$$46$$.target;
  $JSCompiler_StaticMethods_isField_$$(this, $aEvent$$4_target$$46$$.className) && $JSCompiler_StaticMethods_registerTarget$$(this.$moRegistry_$, $aEvent$$4_target$$46$$, "goog-date-picker-selected")
};
$JSCompiler_prototypeAlias$$.$onMouseOut_$ = function $$JSCompiler_prototypeAlias$$$$onMouseOut_$$($aEvent$$5$$) {
  $JSCompiler_StaticMethods_isField_$$(this, $aEvent$$5$$.target.className) && $JSCompiler_StaticMethods_registerTarget$$(this.$moRegistry_$, $JSCompiler_alias_NULL$$)
};
function $JSCompiler_StaticMethods_isButton_$$($JSCompiler_StaticMethods_isButton_$self$$, $aClassName$$1$$) {
  return($JSCompiler_StaticMethods_isButton_$self$$.$buttonRe_$ || ($JSCompiler_StaticMethods_isButton_$self$$.$buttonRe_$ = $rflect$string$buildClassNameRe$$("goog-date-picker-btn"))).test($aClassName$$1$$)
}
function $JSCompiler_StaticMethods_isField_$$($JSCompiler_StaticMethods_isField_$self$$, $aClassName$$2$$) {
  return($JSCompiler_StaticMethods_isField_$self$$.$fieldRe_$ || ($JSCompiler_StaticMethods_isField_$self$$.$fieldRe_$ = $rflect$string$buildClassNameRe$$("goog-date-picker-date"))).test($aClassName$$2$$)
}
$JSCompiler_prototypeAlias$$.$onMouseDown_$ = function $$JSCompiler_prototypeAlias$$$$onMouseDown_$$($aEvent$$6$$) {
  var $className$$29$$ = $aEvent$$6$$.target.className, $index$$64$$ = $rflect$string$getNumericIndex$$($aEvent$$6$$.target.id);
  $JSCompiler_StaticMethods_isField_$$(this, $className$$29$$) && this.$selectionMask$.$init$(4, $index$$64$$, 0);
  ($JSCompiler_StaticMethods_isButton_$$(this, $className$$29$$) || $JSCompiler_StaticMethods_isField_$$(this, $className$$29$$)) && $aEvent$$6$$.preventDefault()
};
$JSCompiler_prototypeAlias$$.$onSelectStart_$ = function $$JSCompiler_prototypeAlias$$$$onSelectStart_$$($aEvent$$7$$) {
  ($JSCompiler_StaticMethods_isButton_$$(this, $aEvent$$7$$.target.className) || $JSCompiler_StaticMethods_isField_$$(this, $aEvent$$7$$.target.className)) && $aEvent$$7$$.preventDefault()
};
$JSCompiler_prototypeAlias$$.$onMouseMove_$ = function $$JSCompiler_prototypeAlias$$$$onMouseMove_$$($aEvent$$8$$) {
  var $className$$31_target$$48$$ = $aEvent$$8$$.target, $index$$65$$ = $rflect$string$getNumericIndex$$($className$$31_target$$48$$.id), $className$$31_target$$48$$ = $className$$31_target$$48$$.className;
  this.$selectionMask$.$dragStarted_$ && $JSCompiler_StaticMethods_isField_$$(this, $className$$31_target$$48$$) && (this.$selectionMask$.update($index$$65$$), $aEvent$$8$$.preventDefault())
};
$JSCompiler_prototypeAlias$$.$onMouseUp_$ = function $$JSCompiler_prototypeAlias$$$$onMouseUp_$$($aEvent$$9$$) {
  this.$selectionMask$.$dragStarted_$ && (this.$selectionMask$.close(), $aEvent$$9$$.preventDefault())
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $rflect$cal$MiniCal$$.$superClass_$.$disposeInternal$.call(this);
  this.$viewManager_$ = $JSCompiler_alias_NULL$$
};
function $rflect$cal$ListSelector$$($aViewManager$$5$$, $aContainerSizeMonitor$$) {
  $goog$ui$Component$$.call(this, $JSCompiler_alias_VOID$$);
  this.$viewManager_$ = $aViewManager$$5$$;
  this.$containerSizeMonitor_$ = $aContainerSizeMonitor$$;
  this.$scrollableSize_$ = $JSCompiler_alias_NULL$$;
  this.$moRegistryForWhole_$ = new $rflect$cal$MouseOverRegistry$$;
  this.$moRegistryForParts_$ = new $rflect$cal$MouseOverRegistry$$
}
$goog$inherits$$($rflect$cal$ListSelector$$, $rflect$ui$Component$$);
var $rflect$cal$ListSelector$HTML_PARTS_$$ = '<div id="calendars-selector" class="list-selector">;<div id="calendars-label-cont" class="list-label-cont"><div id="calendars-label" class="list-label">;</div>;</div>;<div id="calendars-body" class="list-body ;" style="height:;px">;</div>;</div>'.split(";");
$JSCompiler_prototypeAlias$$ = $rflect$cal$ListSelector$$.prototype;
$JSCompiler_prototypeAlias$$.$buildBodyInternal$ = function $$JSCompiler_prototypeAlias$$$$buildBodyInternal$$($aSb$$14$$) {
  for(var $offset$$25$$ = 0, $length$$35$$ = $rflect$cal$ListSelector$HTML_PARTS_$$.length;++$offset$$25$$ < $length$$35$$ - 1;) {
    switch($aSb$$14$$.append($rflect$cal$ListSelector$HTML_PARTS_$$[$offset$$25$$]), $offset$$25$$) {
      case 1:
        $aSb$$14$$.append(this.$label_$);
        break;
      case 2:
        this.$buildOptions$($aSb$$14$$);
        break;
      case 4:
        $aSb$$14$$.append("list-body-overflown");
        break;
      case 5:
        $aSb$$14$$.append(this.$scrollableSize_$.height);
        break;
      case 6:
        this.$buildContent$($aSb$$14$$, $offset$$25$$)
    }
  }
};
$JSCompiler_prototypeAlias$$.getHeader = function $$JSCompiler_prototypeAlias$$$getHeader$() {
  return this.$header_$ || (this.$header_$ = $JSCompiler_StaticMethods_getFirstElementChild$$(0, this.$getElement$()))
};
$JSCompiler_prototypeAlias$$.$updateBeforeRedraw$ = function $$JSCompiler_prototypeAlias$$$$updateBeforeRedraw$$() {
  this.$scrollableSize_$ = this.$containerSizeMonitor_$.$getSize$();
  374 > this.$scrollableSize_$.height && (this.$scrollableSize_$.height = 374);
  this.$scrollableSize_$.height -= 228;
  this.$scrollableSize_$.height /= 2;
  this.$scrollableSize_$.height -= 39
};
$JSCompiler_prototypeAlias$$.$updateByRedraw$ = function $$JSCompiler_prototypeAlias$$$$updateByRedraw$$() {
  this.$scrollableEl_$.style.height = this.$scrollableSize_$.height + "px"
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($aElement$$3$$, $opt_doNotBuildBody$$3$$) {
  $rflect$cal$ListSelector$$.$superClass_$.$decorateInternal$.call(this, $aElement$$3$$, $opt_doNotBuildBody$$3$$)
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $rflect$cal$ListSelector$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "mouseover", this.$onMouseOver_$, $JSCompiler_alias_FALSE$$, this), this.$getElement$(), "mouseout", this.$onMouseOut_$, $JSCompiler_alias_FALSE$$, this);
  this.$scrollableEl_$ = $goog$dom$getChildren$$(this.$getElement$())[1]
};
$JSCompiler_prototypeAlias$$.$onMouseOut_$ = function $$JSCompiler_prototypeAlias$$$$onMouseOut_$$($aEvent$$10$$) {
  (!$aEvent$$10$$.relatedTarget || !this.$dom_$.contains(this.$getElement$(), $aEvent$$10$$.relatedTarget)) && $JSCompiler_StaticMethods_registerTarget$$(this.$moRegistryForWhole_$, $JSCompiler_alias_NULL$$);
  $JSCompiler_StaticMethods_registerTarget$$(this.$moRegistryForParts_$, $JSCompiler_alias_NULL$$)
};
$JSCompiler_prototypeAlias$$.$onMouseOver_$ = function $$JSCompiler_prototypeAlias$$$$onMouseOver_$$($aEvent$$11_target$$50$$) {
  $aEvent$$11_target$$50$$ = $aEvent$$11_target$$50$$.target;
  var $className$$33$$ = $aEvent$$11_target$$50$$.className;
  $JSCompiler_StaticMethods_registerTarget$$(this.$moRegistryForWhole_$, this.getHeader(), "list-label-cont-highlighted");
  this.$isButton$($className$$33$$) && $JSCompiler_StaticMethods_registerTarget$$(this.$moRegistryForParts_$, $aEvent$$11_target$$50$$, "list-selector-options-button-highlighted")
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $rflect$cal$ListSelector$$.$superClass_$.$disposeInternal$.call(this);
  this.$containerSizeMonitor_$ = this.$viewManager_$ = $JSCompiler_alias_NULL$$
};
function $rflect$cal$CalSelector$$($aViewManager$$6$$, $aContainerSizeMonitor$$1$$) {
  $rflect$cal$ListSelector$$.call(this, $aViewManager$$6$$, $aContainerSizeMonitor$$1$$);
  this.$label_$ = $rflect$cal$i18n$Symbols$$.$CALENDARS_LABEL$
}
$goog$inherits$$($rflect$cal$CalSelector$$, $rflect$cal$ListSelector$$);
$rflect$cal$CalSelector$$.prototype.$enterDocument$ = function $$rflect$cal$CalSelector$$$$$enterDocument$$() {
  $rflect$cal$CalSelector$$.$superClass_$.$enterDocument$.call(this)
};
$rflect$cal$CalSelector$$.prototype.$isButton$ = $JSCompiler_returnArg$$($JSCompiler_alias_FALSE$$);
$rflect$cal$CalSelector$$.prototype.$buildOptions$ = function $$rflect$cal$CalSelector$$$$$buildOptions$$($aSb$$18$$) {
  $aSb$$18$$.append("")
};
$rflect$cal$CalSelector$$.prototype.$buildContent$ = function $$rflect$cal$CalSelector$$$$$buildContent$$($aSb$$19$$) {
  $aSb$$19$$.append("")
};
function $rflect$cal$TaskSelector$$($aViewManager$$7$$, $aContainerSizeMonitor$$2$$) {
  $rflect$cal$ListSelector$$.call(this, $aViewManager$$7$$, $aContainerSizeMonitor$$2$$);
  this.$label_$ = $rflect$cal$i18n$Symbols$$.$TASKS_LABEL$
}
$goog$inherits$$($rflect$cal$TaskSelector$$, $rflect$cal$ListSelector$$);
$rflect$cal$TaskSelector$$.prototype.$enterDocument$ = function $$rflect$cal$TaskSelector$$$$$enterDocument$$() {
  $rflect$cal$TaskSelector$$.$superClass_$.$enterDocument$.call(this)
};
$rflect$cal$TaskSelector$$.prototype.$isButton$ = $JSCompiler_returnArg$$($JSCompiler_alias_FALSE$$);
$rflect$cal$TaskSelector$$.prototype.$buildOptions$ = function $$rflect$cal$TaskSelector$$$$$buildOptions$$($aSb$$20$$) {
  $aSb$$20$$.append("")
};
$rflect$cal$TaskSelector$$.prototype.$buildContent$ = function $$rflect$cal$TaskSelector$$$$$buildContent$$($aSb$$21$$) {
  $aSb$$21$$.append("")
};
function $goog$fx$Dragger$$($target$$51$$, $opt_handle$$, $opt_limits$$) {
  $goog$Disposable$$.call(this);
  this.target = $target$$51$$;
  this.handle = $opt_handle$$ || $target$$51$$;
  this.$limits$ = $opt_limits$$ || new $goog$math$Rect$$(NaN, NaN, NaN, NaN);
  this.$document_$ = $goog$dom$getOwnerDocument$$($target$$51$$);
  this.$eventHandler_$ = new $goog$events$EventHandler$$(this);
  $goog$events$listen$$(this.handle, ["touchstart", "mousedown"], this.$startDrag$, $JSCompiler_alias_FALSE$$, this)
}
$goog$inherits$$($goog$fx$Dragger$$, $goog$events$EventTarget$$);
var $goog$fx$Dragger$HAS_SET_CAPTURE_$$ = $goog$userAgent$IE$$ || $goog$userAgent$GECKO$$ && $goog$userAgent$isVersion$$("1.9.3");
$JSCompiler_prototypeAlias$$ = $goog$fx$Dragger$$.prototype;
$JSCompiler_prototypeAlias$$.clientX = 0;
$JSCompiler_prototypeAlias$$.clientY = 0;
$JSCompiler_prototypeAlias$$.screenX = 0;
$JSCompiler_prototypeAlias$$.screenY = 0;
$JSCompiler_prototypeAlias$$.$startX$ = 0;
$JSCompiler_prototypeAlias$$.$startY$ = 0;
$JSCompiler_prototypeAlias$$.$deltaX$ = 0;
$JSCompiler_prototypeAlias$$.$deltaY$ = 0;
$JSCompiler_prototypeAlias$$.$enabled_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$dragging_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$hysteresisDistanceSquared_$ = 0;
$JSCompiler_prototypeAlias$$.$mouseDownTime_$ = 0;
$JSCompiler_prototypeAlias$$.$ieDragStartCancellingOn_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$useRightPositioningForRtl_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$getHandler$ = $JSCompiler_get$$("$eventHandler_$");
$JSCompiler_prototypeAlias$$.$setEnabled$ = $JSCompiler_set$$("$enabled_$");
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$fx$Dragger$$.$superClass_$.$disposeInternal$.call(this);
  $goog$events$unlisten$$(this.handle, ["touchstart", "mousedown"], this.$startDrag$, $JSCompiler_alias_FALSE$$, this);
  $JSCompiler_StaticMethods_removeAll$$(this.$eventHandler_$);
  $goog$fx$Dragger$HAS_SET_CAPTURE_$$ && this.$document_$.releaseCapture();
  this.$eventHandler_$ = this.handle = this.target = $JSCompiler_alias_NULL$$
};
function $JSCompiler_StaticMethods_isRightToLeft_$$($JSCompiler_StaticMethods_isRightToLeft_$self$$) {
  $goog$isDef$$($JSCompiler_StaticMethods_isRightToLeft_$self$$.$rightToLeft_$) || ($JSCompiler_StaticMethods_isRightToLeft_$self$$.$rightToLeft_$ = $goog$style$isRightToLeft$$($JSCompiler_StaticMethods_isRightToLeft_$self$$.target));
  return $JSCompiler_StaticMethods_isRightToLeft_$self$$.$rightToLeft_$
}
$JSCompiler_prototypeAlias$$.$startDrag$ = function $$JSCompiler_prototypeAlias$$$$startDrag$$($JSCompiler_temp$$65_e$$43_element$$inline_496$$) {
  var $doc$$inline_492_isMouseDown_offsetLeftForReal$$inline_497$$ = "mousedown" == $JSCompiler_temp$$65_e$$43_element$$inline_496$$.type;
  if(this.$enabled_$ && !this.$dragging_$ && (!$doc$$inline_492_isMouseDown_offsetLeftForReal$$inline_497$$ || $JSCompiler_StaticMethods_isMouseActionButton$$($JSCompiler_temp$$65_e$$43_element$$inline_496$$))) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($JSCompiler_temp$$65_e$$43_element$$inline_496$$);
    if(0 == this.$hysteresisDistanceSquared_$) {
      if(this.dispatchEvent(new $goog$fx$DragEvent$$("start", this, $JSCompiler_temp$$65_e$$43_element$$inline_496$$.clientX, $JSCompiler_temp$$65_e$$43_element$$inline_496$$.clientY, $JSCompiler_temp$$65_e$$43_element$$inline_496$$))) {
        this.$dragging_$ = $JSCompiler_alias_TRUE$$, $JSCompiler_temp$$65_e$$43_element$$inline_496$$.preventDefault()
      }else {
        return
      }
    }else {
      $JSCompiler_temp$$65_e$$43_element$$inline_496$$.preventDefault()
    }
    var $doc$$inline_492_isMouseDown_offsetLeftForReal$$inline_497$$ = this.$document_$, $bestParent$$inline_498_docEl$$inline_493$$ = $doc$$inline_492_isMouseDown_offsetLeftForReal$$inline_497$$.documentElement, $borderWidths$$inline_499_useCapture$$inline_494$$ = !$goog$fx$Dragger$HAS_SET_CAPTURE_$$;
    $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_492_isMouseDown_offsetLeftForReal$$inline_497$$, ["touchmove", "mousemove"], this.$handleMove_$, $borderWidths$$inline_499_useCapture$$inline_494$$);
    $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_492_isMouseDown_offsetLeftForReal$$inline_497$$, ["touchend", "mouseup"], this.$endDrag$, $borderWidths$$inline_499_useCapture$$inline_494$$);
    $goog$fx$Dragger$HAS_SET_CAPTURE_$$ ? ($bestParent$$inline_498_docEl$$inline_493$$.setCapture($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $bestParent$$inline_498_docEl$$inline_493$$, "losecapture", this.$endDrag$)) : $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_492_isMouseDown_offsetLeftForReal$$inline_497$$ ? $goog$dom$getWindow_$$($doc$$inline_492_isMouseDown_offsetLeftForReal$$inline_497$$) : window, "blur", this.$endDrag$);
    $goog$userAgent$IE$$ && this.$ieDragStartCancellingOn_$ && $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_492_isMouseDown_offsetLeftForReal$$inline_497$$, "dragstart", $goog$events$Event$preventDefault$$);
    this.$scrollTarget_$ && $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, this.$scrollTarget_$, "scroll", this.$onScroll_$, $borderWidths$$inline_499_useCapture$$inline_494$$);
    this.clientX = this.$startX$ = $JSCompiler_temp$$65_e$$43_element$$inline_496$$.clientX;
    this.clientY = this.$startY$ = $JSCompiler_temp$$65_e$$43_element$$inline_496$$.clientY;
    this.screenX = $JSCompiler_temp$$65_e$$43_element$$inline_496$$.screenX;
    this.screenY = $JSCompiler_temp$$65_e$$43_element$$inline_496$$.screenY;
    this.$useRightPositioningForRtl_$ ? ($JSCompiler_temp$$65_e$$43_element$$inline_496$$ = this.target, $doc$$inline_492_isMouseDown_offsetLeftForReal$$inline_497$$ = $JSCompiler_temp$$65_e$$43_element$$inline_496$$.offsetLeft, $bestParent$$inline_498_docEl$$inline_493$$ = $JSCompiler_temp$$65_e$$43_element$$inline_496$$.offsetParent, !$bestParent$$inline_498_docEl$$inline_493$$ && "fixed" == $goog$style$getComputedPosition$$($JSCompiler_temp$$65_e$$43_element$$inline_496$$) && ($bestParent$$inline_498_docEl$$inline_493$$ = 
    $goog$dom$getOwnerDocument$$($JSCompiler_temp$$65_e$$43_element$$inline_496$$).documentElement), $bestParent$$inline_498_docEl$$inline_493$$ ? ($goog$userAgent$GECKO$$ ? ($borderWidths$$inline_499_useCapture$$inline_494$$ = $goog$style$getBorderBox$$($bestParent$$inline_498_docEl$$inline_493$$), $doc$$inline_492_isMouseDown_offsetLeftForReal$$inline_497$$ += $borderWidths$$inline_499_useCapture$$inline_494$$.left) : $goog$userAgent$IE$$ && 8 <= $goog$userAgent$DOCUMENT_MODE$$ && ($borderWidths$$inline_499_useCapture$$inline_494$$ = 
    $goog$style$getBorderBox$$($bestParent$$inline_498_docEl$$inline_493$$), $doc$$inline_492_isMouseDown_offsetLeftForReal$$inline_497$$ -= $borderWidths$$inline_499_useCapture$$inline_494$$.left), $JSCompiler_temp$$65_e$$43_element$$inline_496$$ = $goog$style$isRightToLeft$$($bestParent$$inline_498_docEl$$inline_493$$) ? $bestParent$$inline_498_docEl$$inline_493$$.clientWidth - ($doc$$inline_492_isMouseDown_offsetLeftForReal$$inline_497$$ + $JSCompiler_temp$$65_e$$43_element$$inline_496$$.offsetWidth) : 
    $doc$$inline_492_isMouseDown_offsetLeftForReal$$inline_497$$) : $JSCompiler_temp$$65_e$$43_element$$inline_496$$ = $doc$$inline_492_isMouseDown_offsetLeftForReal$$inline_497$$) : $JSCompiler_temp$$65_e$$43_element$$inline_496$$ = this.target.offsetLeft;
    this.$deltaX$ = $JSCompiler_temp$$65_e$$43_element$$inline_496$$;
    this.$deltaY$ = this.target.offsetTop;
    this.$pageScroll$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$(this.$document_$));
    this.$mouseDownTime_$ = $goog$now$$()
  }else {
    this.dispatchEvent("earlycancel")
  }
};
$JSCompiler_prototypeAlias$$.$endDrag$ = function $$JSCompiler_prototypeAlias$$$$endDrag$$($e$$45$$, $opt_dragCanceled$$) {
  $JSCompiler_StaticMethods_removeAll$$(this.$eventHandler_$);
  $goog$fx$Dragger$HAS_SET_CAPTURE_$$ && this.$document_$.releaseCapture();
  if(this.$dragging_$) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$45$$);
    this.$dragging_$ = $JSCompiler_alias_FALSE$$;
    var $x$$63$$ = $JSCompiler_StaticMethods_limitX$$(this, this.$deltaX$), $y$$39$$ = $JSCompiler_StaticMethods_limitY$$(this, this.$deltaY$);
    this.dispatchEvent(new $goog$fx$DragEvent$$("end", this, $e$$45$$.clientX, $e$$45$$.clientY, $e$$45$$, $x$$63$$, $y$$39$$, $opt_dragCanceled$$ || "touchcancel" == $e$$45$$.type))
  }else {
    this.dispatchEvent("earlycancel")
  }
  ("touchend" == $e$$45$$.type || "touchcancel" == $e$$45$$.type) && $e$$45$$.preventDefault()
};
function $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$47$$) {
  var $type$$92$$ = $e$$47$$.type;
  "touchstart" == $type$$92$$ || "touchmove" == $type$$92$$ ? $e$$47$$.$init$($e$$47$$.$event_$.targetTouches[0], $e$$47$$.currentTarget) : ("touchend" == $type$$92$$ || "touchcancel" == $type$$92$$) && $e$$47$$.$init$($e$$47$$.$event_$.changedTouches[0], $e$$47$$.currentTarget)
}
$JSCompiler_prototypeAlias$$.$handleMove_$ = function $$JSCompiler_prototypeAlias$$$$handleMove_$$($e$$48$$) {
  if(this.$enabled_$) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$48$$);
    var $dx$$7_x$$64$$ = (this.$useRightPositioningForRtl_$ && $JSCompiler_StaticMethods_isRightToLeft_$$(this) ? -1 : 1) * ($e$$48$$.clientX - this.clientX), $dy$$7_pos$$5_y$$40$$ = $e$$48$$.clientY - this.clientY;
    this.clientX = $e$$48$$.clientX;
    this.clientY = $e$$48$$.clientY;
    this.screenX = $e$$48$$.screenX;
    this.screenY = $e$$48$$.screenY;
    if(!this.$dragging_$) {
      var $diffX$$ = this.$startX$ - this.clientX, $diffY$$ = this.$startY$ - this.clientY;
      if($diffX$$ * $diffX$$ + $diffY$$ * $diffY$$ > this.$hysteresisDistanceSquared_$) {
        if(this.dispatchEvent(new $goog$fx$DragEvent$$("start", this, $e$$48$$.clientX, $e$$48$$.clientY, $e$$48$$))) {
          this.$dragging_$ = $JSCompiler_alias_TRUE$$
        }else {
          this.$disposed_$ || this.$endDrag$($e$$48$$);
          return
        }
      }
    }
    $dy$$7_pos$$5_y$$40$$ = $JSCompiler_StaticMethods_calculatePosition_$$(this, $dx$$7_x$$64$$, $dy$$7_pos$$5_y$$40$$);
    $dx$$7_x$$64$$ = $dy$$7_pos$$5_y$$40$$.x;
    $dy$$7_pos$$5_y$$40$$ = $dy$$7_pos$$5_y$$40$$.y;
    this.$dragging_$ && this.dispatchEvent(new $goog$fx$DragEvent$$("beforedrag", this, $e$$48$$.clientX, $e$$48$$.clientY, $e$$48$$, $dx$$7_x$$64$$, $dy$$7_pos$$5_y$$40$$)) && ($JSCompiler_StaticMethods_doDrag$$(this, $e$$48$$, $dx$$7_x$$64$$, $dy$$7_pos$$5_y$$40$$), $e$$48$$.preventDefault())
  }
};
function $JSCompiler_StaticMethods_calculatePosition_$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$, $dx$$8_x$$65$$, $dy$$8$$) {
  var $pageScroll$$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$document_$));
  $dx$$8_x$$65$$ += $pageScroll$$.x - $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$pageScroll$.x;
  $dy$$8$$ += $pageScroll$$.y - $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$pageScroll$.y;
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$pageScroll$ = $pageScroll$$;
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$deltaX$ += $dx$$8_x$$65$$;
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$deltaY$ += $dy$$8$$;
  $dx$$8_x$$65$$ = $JSCompiler_StaticMethods_limitX$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$deltaX$);
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$ = $JSCompiler_StaticMethods_limitY$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$.$deltaY$);
  return new $goog$math$Coordinate$$($dx$$8_x$$65$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$41$$)
}
$JSCompiler_prototypeAlias$$.$onScroll_$ = function $$JSCompiler_prototypeAlias$$$$onScroll_$$($e$$49$$) {
  var $pos$$6$$ = $JSCompiler_StaticMethods_calculatePosition_$$(this, 0, 0);
  $e$$49$$.clientX = this.clientX;
  $e$$49$$.clientY = this.clientY;
  $JSCompiler_StaticMethods_doDrag$$(this, $e$$49$$, $pos$$6$$.x, $pos$$6$$.y)
};
function $JSCompiler_StaticMethods_doDrag$$($JSCompiler_StaticMethods_doDrag$self$$, $e$$50$$, $x$$66$$, $y$$42$$) {
  $JSCompiler_StaticMethods_doDrag$self$$.$useRightPositioningForRtl_$ && $JSCompiler_StaticMethods_isRightToLeft_$$($JSCompiler_StaticMethods_doDrag$self$$) ? $JSCompiler_StaticMethods_doDrag$self$$.target.style.right = $x$$66$$ + "px" : $JSCompiler_StaticMethods_doDrag$self$$.target.style.left = $x$$66$$ + "px";
  $JSCompiler_StaticMethods_doDrag$self$$.target.style.top = $y$$42$$ + "px";
  $JSCompiler_StaticMethods_doDrag$self$$.dispatchEvent(new $goog$fx$DragEvent$$("drag", $JSCompiler_StaticMethods_doDrag$self$$, $e$$50$$.clientX, $e$$50$$.clientY, $e$$50$$, $x$$66$$, $y$$42$$))
}
function $JSCompiler_StaticMethods_limitX$$($JSCompiler_StaticMethods_limitX$self$$, $x$$67$$) {
  var $rect$$6_width$$17$$ = $JSCompiler_StaticMethods_limitX$self$$.$limits$, $left$$10$$ = !isNaN($rect$$6_width$$17$$.left) ? $rect$$6_width$$17$$.left : $JSCompiler_alias_NULL$$, $rect$$6_width$$17$$ = !isNaN($rect$$6_width$$17$$.width) ? $rect$$6_width$$17$$.width : 0;
  return Math.min($left$$10$$ != $JSCompiler_alias_NULL$$ ? $left$$10$$ + $rect$$6_width$$17$$ : Infinity, Math.max($left$$10$$ != $JSCompiler_alias_NULL$$ ? $left$$10$$ : -Infinity, $x$$67$$))
}
function $JSCompiler_StaticMethods_limitY$$($JSCompiler_StaticMethods_limitY$self$$, $y$$43$$) {
  var $height$$16_rect$$7$$ = $JSCompiler_StaticMethods_limitY$self$$.$limits$, $top$$8$$ = !isNaN($height$$16_rect$$7$$.top) ? $height$$16_rect$$7$$.top : $JSCompiler_alias_NULL$$, $height$$16_rect$$7$$ = !isNaN($height$$16_rect$$7$$.height) ? $height$$16_rect$$7$$.height : 0;
  return Math.min($top$$8$$ != $JSCompiler_alias_NULL$$ ? $top$$8$$ + $height$$16_rect$$7$$ : Infinity, Math.max($top$$8$$ != $JSCompiler_alias_NULL$$ ? $top$$8$$ : -Infinity, $y$$43$$))
}
function $goog$fx$DragEvent$$($type$$93$$, $dragobj$$, $clientX$$2$$, $clientY$$2$$, $browserEvent$$1$$, $opt_actX$$, $opt_actY$$, $opt_dragCanceled$$1$$) {
  $goog$events$Event$$.call(this, $type$$93$$);
  this.clientX = $clientX$$2$$;
  this.clientY = $clientY$$2$$;
  this.$browserEvent$ = $browserEvent$$1$$;
  this.left = $goog$isDef$$($opt_actX$$) ? $opt_actX$$ : $dragobj$$.$deltaX$;
  this.top = $goog$isDef$$($opt_actY$$) ? $opt_actY$$ : $dragobj$$.$deltaY$;
  this.$dragger$ = $dragobj$$;
  this.$dragCanceled$ = !!$opt_dragCanceled$$1$$
}
$goog$inherits$$($goog$fx$DragEvent$$, $goog$events$Event$$);
function $goog$Timer$callOnce$$($listener$$60$$, $opt_handler$$14$$) {
  $goog$isFunction$$($listener$$60$$) ? $opt_handler$$14$$ && ($listener$$60$$ = $goog$bind$$($listener$$60$$, $opt_handler$$14$$)) : $listener$$60$$ && "function" == typeof $listener$$60$$.handleEvent ? $listener$$60$$ = $goog$bind$$($listener$$60$$.handleEvent, $listener$$60$$) : $JSCompiler_alias_THROW$$(Error("Invalid listener argument"));
  $goog$global$$.setTimeout($listener$$60$$, 0)
}
;function $goog$events$FocusHandler$$($element$$126_typeOut$$) {
  $goog$Disposable$$.call(this);
  this.$element_$ = $element$$126_typeOut$$;
  $element$$126_typeOut$$ = $goog$userAgent$IE$$ ? "focusout" : "blur";
  this.$listenKeyIn_$ = $goog$events$listen$$(this.$element_$, $goog$userAgent$IE$$ ? "focusin" : "focus", this, !$goog$userAgent$IE$$);
  this.$listenKeyOut_$ = $goog$events$listen$$(this.$element_$, $element$$126_typeOut$$, this, !$goog$userAgent$IE$$)
}
$goog$inherits$$($goog$events$FocusHandler$$, $goog$events$EventTarget$$);
$goog$events$FocusHandler$$.prototype.handleEvent = function $$goog$events$FocusHandler$$$$handleEvent$($e$$56$$) {
  var $event$$5$$ = new $goog$events$BrowserEvent$$($e$$56$$.$event_$);
  $event$$5$$.type = "focusin" == $e$$56$$.type || "focus" == $e$$56$$.type ? "focusin" : "focusout";
  this.dispatchEvent($event$$5$$)
};
$goog$events$FocusHandler$$.prototype.$disposeInternal$ = function $$goog$events$FocusHandler$$$$$disposeInternal$$() {
  $goog$events$FocusHandler$$.$superClass_$.$disposeInternal$.call(this);
  $goog$events$unlistenByKey$$(this.$listenKeyIn_$);
  $goog$events$unlistenByKey$$(this.$listenKeyOut_$);
  delete this.$element_$
};
function $goog$ui$ModalPopup$$($opt_useIframeMask$$, $opt_domHelper$$6$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$6$$);
  this.$useIframeMask_$ = !!$opt_useIframeMask$$
}
$goog$inherits$$($goog$ui$ModalPopup$$, $goog$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$ModalPopup$$.prototype;
$JSCompiler_prototypeAlias$$.$focusHandler_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$visible_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$bgEl_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$bgIframeEl_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$tabCatcherElement_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$backwardTabWrapInProgress_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-modalpopup");
$JSCompiler_prototypeAlias$$.$getBackgroundElement$ = $JSCompiler_get$$("$bgEl_$");
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  $goog$ui$ModalPopup$$.$superClass_$.$createDom$.call(this);
  var $element$$127$$ = this.$getElement$();
  $goog$dom$classes$add$$($element$$127$$, this.$getCssClass$());
  $goog$dom$setFocusableTabIndex$$($element$$127$$, $JSCompiler_alias_TRUE$$);
  $goog$style$showElement$$($element$$127$$, $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_manageBackgroundDom_$$(this);
  $JSCompiler_StaticMethods_createTabCatcher_$$(this)
};
function $JSCompiler_StaticMethods_manageBackgroundDom_$$($JSCompiler_StaticMethods_manageBackgroundDom_$self$$) {
  if($JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$useIframeMask_$ && !$JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgIframeEl_$) {
    var $JSCompiler_inline_result$$56$$;
    $JSCompiler_inline_result$$56$$ = $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$getDomHelper$().$createDom$("iframe", {frameborder:0, style:"border:0;vertical-align:bottom;", src:'javascript:""'});
    $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgIframeEl_$ = $JSCompiler_inline_result$$56$$;
    $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgIframeEl_$.className = $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$getCssClass$() + "-bg";
    $goog$style$showElement$$($JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgIframeEl_$, $JSCompiler_alias_FALSE$$);
    $goog$style$setOpacity$$($JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgIframeEl_$, 0)
  }
  $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgEl_$ || ($JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgEl_$ = $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$getDomHelper$().$createDom$("div", $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$getCssClass$() + "-bg"), $goog$style$showElement$$($JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgEl_$, $JSCompiler_alias_FALSE$$))
}
function $JSCompiler_StaticMethods_createTabCatcher_$$($JSCompiler_StaticMethods_createTabCatcher_$self$$) {
  $JSCompiler_StaticMethods_createTabCatcher_$self$$.$tabCatcherElement_$ || ($JSCompiler_StaticMethods_createTabCatcher_$self$$.$tabCatcherElement_$ = $JSCompiler_StaticMethods_createTabCatcher_$self$$.$getDomHelper$().createElement("span"), $goog$style$showElement$$($JSCompiler_StaticMethods_createTabCatcher_$self$$.$tabCatcherElement_$, $JSCompiler_alias_FALSE$$), $goog$dom$setFocusableTabIndex$$($JSCompiler_StaticMethods_createTabCatcher_$self$$.$tabCatcherElement_$, $JSCompiler_alias_TRUE$$), 
  $JSCompiler_StaticMethods_createTabCatcher_$self$$.$tabCatcherElement_$.style.position = "absolute")
}
$JSCompiler_prototypeAlias$$.$resetBackwardTabWrap_$ = function $$JSCompiler_prototypeAlias$$$$resetBackwardTabWrap_$$() {
  this.$backwardTabWrapInProgress_$ = $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$128$$) {
  return!!$element$$128$$ && "DIV" == $element$$128$$.tagName
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$129$$) {
  $goog$ui$ModalPopup$$.$superClass_$.$decorateInternal$.call(this, $element$$129$$);
  $goog$dom$classes$add$$(this.$getElement$(), this.$getCssClass$());
  $JSCompiler_StaticMethods_manageBackgroundDom_$$(this);
  $JSCompiler_StaticMethods_createTabCatcher_$$(this);
  $goog$style$showElement$$(this.$getElement$(), $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $goog$asserts$assert$$(!!this.$bgEl_$, "Background element must not be null.");
  if(this.$bgIframeEl_$) {
    var $refNode$$inline_1172_refNode$$inline_1175_refNode$$inline_514$$ = this.$getElement$();
    $refNode$$inline_1172_refNode$$inline_1175_refNode$$inline_514$$.parentNode && $refNode$$inline_1172_refNode$$inline_1175_refNode$$inline_514$$.parentNode.insertBefore(this.$bgIframeEl_$, $refNode$$inline_1172_refNode$$inline_1175_refNode$$inline_514$$)
  }
  $refNode$$inline_1172_refNode$$inline_1175_refNode$$inline_514$$ = this.$getElement$();
  $refNode$$inline_1172_refNode$$inline_1175_refNode$$inline_514$$.parentNode && $refNode$$inline_1172_refNode$$inline_1175_refNode$$inline_514$$.parentNode.insertBefore(this.$bgEl_$, $refNode$$inline_1172_refNode$$inline_1175_refNode$$inline_514$$);
  $goog$ui$ModalPopup$$.$superClass_$.$enterDocument$.call(this);
  $refNode$$inline_1172_refNode$$inline_1175_refNode$$inline_514$$ = this.$getElement$();
  $refNode$$inline_1172_refNode$$inline_1175_refNode$$inline_514$$.parentNode && $refNode$$inline_1172_refNode$$inline_1175_refNode$$inline_514$$.parentNode.insertBefore(this.$tabCatcherElement_$, $refNode$$inline_1172_refNode$$inline_1175_refNode$$inline_514$$.nextSibling);
  this.$focusHandler_$ = new $goog$events$FocusHandler$$($JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()));
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$focusHandler_$, "focusin", this.$onFocus_$)
};
$JSCompiler_prototypeAlias$$.$exitDocument$ = function $$JSCompiler_prototypeAlias$$$$exitDocument$$() {
  this.$visible_$ && this.$setVisible$($JSCompiler_alias_FALSE$$);
  $goog$dispose$$(this.$focusHandler_$);
  $goog$ui$ModalPopup$$.$superClass_$.$exitDocument$.call(this);
  $goog$dom$removeNode$$(this.$bgIframeEl_$);
  $goog$dom$removeNode$$(this.$bgEl_$);
  $goog$dom$removeNode$$(this.$tabCatcherElement_$)
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($JSCompiler_temp_const$$822_JSCompiler_temp_const$$825_doc$$inline_902_left$$inline_909_visible$$3_x$$inline_904$$) {
  $goog$asserts$assert$$(this.$inDocument_$, "ModalPopup must be rendered first.");
  if($JSCompiler_temp_const$$822_JSCompiler_temp_const$$825_doc$$inline_902_left$$inline_909_visible$$3_x$$inline_904$$ != this.$visible_$) {
    if(this.$popupShowTransition_$ && this.$popupShowTransition_$.stop(), this.$bgShowTransition_$ && this.$bgShowTransition_$.stop(), this.$popupHideTransition_$ && this.$popupHideTransition_$.stop(), this.$bgHideTransition_$ && this.$bgHideTransition_$.stop(), $JSCompiler_temp_const$$822_JSCompiler_temp_const$$825_doc$$inline_902_left$$inline_909_visible$$3_x$$inline_904$$) {
      if(this.dispatchEvent("beforeshow")) {
        this.$resizeBackground_$();
        var $viewSize$$inline_908_win$$inline_903$$ = (($JSCompiler_temp_const$$822_JSCompiler_temp_const$$825_doc$$inline_902_left$$inline_909_visible$$3_x$$inline_904$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$())) ? $goog$dom$getWindow_$$($JSCompiler_temp_const$$822_JSCompiler_temp_const$$825_doc$$inline_902_left$$inline_909_visible$$3_x$$inline_904$$) : window) || window;
        if("fixed" == $goog$style$getComputedPosition$$(this.$getElement$())) {
          var $JSCompiler_StaticMethods_getWindow$self$$inline_912_JSCompiler_temp_const$$824_scroll$$inline_906_top$$inline_910_y$$inline_905$$ = $JSCompiler_temp_const$$822_JSCompiler_temp_const$$825_doc$$inline_902_left$$inline_909_visible$$3_x$$inline_904$$ = 0
        }else {
          $JSCompiler_StaticMethods_getWindow$self$$inline_912_JSCompiler_temp_const$$824_scroll$$inline_906_top$$inline_910_y$$inline_905$$ = $JSCompiler_StaticMethods_getDocumentScroll$$(this.$getDomHelper$()), $JSCompiler_temp_const$$822_JSCompiler_temp_const$$825_doc$$inline_902_left$$inline_909_visible$$3_x$$inline_904$$ = $JSCompiler_StaticMethods_getWindow$self$$inline_912_JSCompiler_temp_const$$824_scroll$$inline_906_top$$inline_910_y$$inline_905$$.x, $JSCompiler_StaticMethods_getWindow$self$$inline_912_JSCompiler_temp_const$$824_scroll$$inline_906_top$$inline_910_y$$inline_905$$ = 
          $JSCompiler_StaticMethods_getWindow$self$$inline_912_JSCompiler_temp_const$$824_scroll$$inline_906_top$$inline_910_y$$inline_905$$.y
        }
        var $JSCompiler_StaticMethods_getWindow$self$$inline_914_popupSize$$inline_907$$ = $goog$style$getSize$$(this.$getElement$()), $viewSize$$inline_908_win$$inline_903$$ = $goog$dom$getViewportSize_$$($viewSize$$inline_908_win$$inline_903$$ || window);
        $JSCompiler_temp_const$$822_JSCompiler_temp_const$$825_doc$$inline_902_left$$inline_909_visible$$3_x$$inline_904$$ = Math.max($JSCompiler_temp_const$$822_JSCompiler_temp_const$$825_doc$$inline_902_left$$inline_909_visible$$3_x$$inline_904$$ + $viewSize$$inline_908_win$$inline_903$$.width / 2 - $JSCompiler_StaticMethods_getWindow$self$$inline_914_popupSize$$inline_907$$.width / 2, 0);
        $JSCompiler_StaticMethods_getWindow$self$$inline_912_JSCompiler_temp_const$$824_scroll$$inline_906_top$$inline_910_y$$inline_905$$ = Math.max($JSCompiler_StaticMethods_getWindow$self$$inline_912_JSCompiler_temp_const$$824_scroll$$inline_906_top$$inline_910_y$$inline_905$$ + $viewSize$$inline_908_win$$inline_903$$.height / 2 - $JSCompiler_StaticMethods_getWindow$self$$inline_914_popupSize$$inline_907$$.height / 2, 0);
        $goog$style$setPosition$$(this.$getElement$(), $JSCompiler_temp_const$$822_JSCompiler_temp_const$$825_doc$$inline_902_left$$inline_909_visible$$3_x$$inline_904$$, $JSCompiler_StaticMethods_getWindow$self$$inline_912_JSCompiler_temp_const$$824_scroll$$inline_906_top$$inline_910_y$$inline_905$$);
        $goog$style$setPosition$$(this.$tabCatcherElement_$, $JSCompiler_temp_const$$822_JSCompiler_temp_const$$825_doc$$inline_902_left$$inline_909_visible$$3_x$$inline_904$$, $JSCompiler_StaticMethods_getWindow$self$$inline_912_JSCompiler_temp_const$$824_scroll$$inline_906_top$$inline_910_y$$inline_905$$);
        $JSCompiler_temp_const$$822_JSCompiler_temp_const$$825_doc$$inline_902_left$$inline_909_visible$$3_x$$inline_904$$ = this.$getHandler$();
        $JSCompiler_StaticMethods_getWindow$self$$inline_912_JSCompiler_temp_const$$824_scroll$$inline_906_top$$inline_910_y$$inline_905$$ = this.$getDomHelper$();
        $JSCompiler_StaticMethods_listen$$($JSCompiler_temp_const$$822_JSCompiler_temp_const$$825_doc$$inline_902_left$$inline_909_visible$$3_x$$inline_904$$, $goog$dom$getWindow_$$($JSCompiler_StaticMethods_getWindow$self$$inline_912_JSCompiler_temp_const$$824_scroll$$inline_906_top$$inline_910_y$$inline_905$$.$document_$), "resize", this.$resizeBackground_$);
        $JSCompiler_StaticMethods_showPopupElement_$$(this, $JSCompiler_alias_TRUE$$);
        this.focus();
        this.$visible_$ = $JSCompiler_alias_TRUE$$;
        this.$popupShowTransition_$ && this.$bgShowTransition_$ ? ($goog$events$listenOnce$$(this.$popupShowTransition_$, "end", this.$onShow$, $JSCompiler_alias_FALSE$$, this), this.$bgShowTransition_$.play(), this.$popupShowTransition_$.play()) : this.$onShow$()
      }
    }else {
      this.dispatchEvent("beforehide") && ($JSCompiler_temp_const$$822_JSCompiler_temp_const$$825_doc$$inline_902_left$$inline_909_visible$$3_x$$inline_904$$ = $JSCompiler_StaticMethods_unlisten$$, $JSCompiler_StaticMethods_getWindow$self$$inline_912_JSCompiler_temp_const$$824_scroll$$inline_906_top$$inline_910_y$$inline_905$$ = this.$getHandler$(), $JSCompiler_StaticMethods_getWindow$self$$inline_914_popupSize$$inline_907$$ = this.$getDomHelper$(), $JSCompiler_temp_const$$822_JSCompiler_temp_const$$825_doc$$inline_902_left$$inline_909_visible$$3_x$$inline_904$$($JSCompiler_StaticMethods_getWindow$self$$inline_912_JSCompiler_temp_const$$824_scroll$$inline_906_top$$inline_910_y$$inline_905$$, 
      $goog$dom$getWindow_$$($JSCompiler_StaticMethods_getWindow$self$$inline_914_popupSize$$inline_907$$.$document_$), "resize", this.$resizeBackground_$), this.$visible_$ = $JSCompiler_alias_FALSE$$, this.$popupHideTransition_$ && this.$bgHideTransition_$ ? ($goog$events$listenOnce$$(this.$popupHideTransition_$, "end", this.$onHide$, $JSCompiler_alias_FALSE$$, this), this.$bgHideTransition_$.play(), this.$popupHideTransition_$.play()) : this.$onHide$())
    }
  }
};
function $JSCompiler_StaticMethods_showPopupElement_$$($JSCompiler_StaticMethods_showPopupElement_$self$$, $visible$$4$$) {
  $JSCompiler_StaticMethods_showPopupElement_$self$$.$bgIframeEl_$ && $goog$style$showElement$$($JSCompiler_StaticMethods_showPopupElement_$self$$.$bgIframeEl_$, $visible$$4$$);
  $JSCompiler_StaticMethods_showPopupElement_$self$$.$bgEl_$ && $goog$style$showElement$$($JSCompiler_StaticMethods_showPopupElement_$self$$.$bgEl_$, $visible$$4$$);
  $goog$style$showElement$$($JSCompiler_StaticMethods_showPopupElement_$self$$.$getElement$(), $visible$$4$$);
  $goog$style$showElement$$($JSCompiler_StaticMethods_showPopupElement_$self$$.$tabCatcherElement_$, $visible$$4$$)
}
$JSCompiler_prototypeAlias$$.$onShow$ = function $$JSCompiler_prototypeAlias$$$$onShow$$() {
  this.dispatchEvent("show")
};
$JSCompiler_prototypeAlias$$.$onHide$ = function $$JSCompiler_prototypeAlias$$$$onHide$$() {
  $JSCompiler_StaticMethods_showPopupElement_$$(this, $JSCompiler_alias_FALSE$$);
  this.dispatchEvent("hide")
};
$JSCompiler_prototypeAlias$$.focus = function $$JSCompiler_prototypeAlias$$$focus$() {
  this.$focusElement_$()
};
$JSCompiler_prototypeAlias$$.$resizeBackground_$ = function $$JSCompiler_prototypeAlias$$$$resizeBackground_$$() {
  this.$bgIframeEl_$ && $goog$style$showElement$$(this.$bgIframeEl_$, $JSCompiler_alias_FALSE$$);
  this.$bgEl_$ && $goog$style$showElement$$(this.$bgEl_$, $JSCompiler_alias_FALSE$$);
  var $doc$$39_h$$7$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()), $viewSize$$ = $goog$dom$getViewportSize_$$(($doc$$39_h$$7$$ ? $goog$dom$getWindow_$$($doc$$39_h$$7$$) : window) || window || window), $w$$7$$ = Math.max($viewSize$$.width, Math.max($doc$$39_h$$7$$.body.scrollWidth, $doc$$39_h$$7$$.documentElement.scrollWidth)), $doc$$39_h$$7$$ = Math.max($viewSize$$.height, Math.max($doc$$39_h$$7$$.body.scrollHeight, $doc$$39_h$$7$$.documentElement.scrollHeight));
  this.$bgIframeEl_$ && ($goog$style$showElement$$(this.$bgIframeEl_$, $JSCompiler_alias_TRUE$$), $goog$style$setSize$$(this.$bgIframeEl_$, $w$$7$$, $doc$$39_h$$7$$));
  this.$bgEl_$ && ($goog$style$showElement$$(this.$bgEl_$, $JSCompiler_alias_TRUE$$), $goog$style$setSize$$(this.$bgEl_$, $w$$7$$, $doc$$39_h$$7$$))
};
$JSCompiler_prototypeAlias$$.$onFocus_$ = function $$JSCompiler_prototypeAlias$$$$onFocus_$$($e$$58$$) {
  this.$backwardTabWrapInProgress_$ ? this.$resetBackwardTabWrap_$() : $e$$58$$.target == this.$tabCatcherElement_$ && $goog$Timer$callOnce$$(this.$focusElement_$, this)
};
$JSCompiler_prototypeAlias$$.$focusElement_$ = function $$JSCompiler_prototypeAlias$$$$focusElement_$$() {
  try {
    $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()).body.focus(), this.$getElement$().focus()
  }catch($e$$59$$) {
  }
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$dispose$$(this.$popupShowTransition_$);
  this.$popupShowTransition_$ = $JSCompiler_alias_NULL$$;
  $goog$dispose$$(this.$popupHideTransition_$);
  this.$popupHideTransition_$ = $JSCompiler_alias_NULL$$;
  $goog$dispose$$(this.$bgShowTransition_$);
  this.$bgShowTransition_$ = $JSCompiler_alias_NULL$$;
  $goog$dispose$$(this.$bgHideTransition_$);
  this.$bgHideTransition_$ = $JSCompiler_alias_NULL$$;
  $goog$ui$ModalPopup$$.$superClass_$.$disposeInternal$.call(this)
};
function $rflect$ui$Dialog$$($ok$$inline_520_opt_class$$4$$, $cancel$$inline_521_opt_useIframeMask$$1$$, $opt_domHelper$$7$$, $opt_buttonRenderer$$) {
  $goog$ui$ModalPopup$$.call(this, $cancel$$inline_521_opt_useIframeMask$$1$$, $opt_domHelper$$7$$);
  this.$class_$ = $ok$$inline_520_opt_class$$4$$ || "modal-dialog";
  $ok$$inline_520_opt_class$$4$$ = $rflect$ui$Dialog$ButtonSet$getButton$$("OK");
  $cancel$$inline_521_opt_useIframeMask$$1$$ = $rflect$ui$Dialog$ButtonSet$getButton$$("Cancel");
  this.$buttons_$ = $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$(new $rflect$ui$Dialog$ButtonSet$$, $ok$$inline_520_opt_class$$4$$, $JSCompiler_alias_TRUE$$, $JSCompiler_alias_FALSE$$, $JSCompiler_alias_TRUE$$), $cancel$$inline_521_opt_useIframeMask$$1$$, $JSCompiler_alias_FALSE$$, $JSCompiler_alias_TRUE$$);
  this.$buttonRenderer_$ = $opt_buttonRenderer$$ || $goog$ui$NativeButtonRenderer$$.$getInstance$()
}
$goog$inherits$$($rflect$ui$Dialog$$, $goog$ui$ModalPopup$$);
$JSCompiler_prototypeAlias$$ = $rflect$ui$Dialog$$.prototype;
$JSCompiler_prototypeAlias$$.$escapeToCancel_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$hasTitleCloseButton_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$modal_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$draggable_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$backgroundElementOpacity_$ = 0.5;
$JSCompiler_prototypeAlias$$.$title_$ = "";
$JSCompiler_prototypeAlias$$.$content_$ = "";
$JSCompiler_prototypeAlias$$.$dragger_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$disposeOnHide_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$titleEl_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$titleTextEl_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$titleId_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$titleCloseEl_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$contentEl_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$buttonEl_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$preferredAriaRole_$ = "dialog";
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_get$$("$class_$");
$JSCompiler_prototypeAlias$$.$setContent$ = function $$JSCompiler_prototypeAlias$$$$setContent$$($html$$) {
  this.$content_$ = $html$$;
  this.$contentEl_$ && (this.$contentEl_$.innerHTML = $html$$)
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$() {
  this.$getElement$() || $JSCompiler_StaticMethods_render_$$(this);
  return this.$contentEl_$
};
$JSCompiler_prototypeAlias$$.$getBackgroundElement$ = function $$JSCompiler_prototypeAlias$$$$getBackgroundElement$$() {
  this.$getElement$() || $JSCompiler_StaticMethods_render_$$(this);
  return $rflect$ui$Dialog$$.$superClass_$.$getBackgroundElement$.call(this)
};
function $JSCompiler_StaticMethods_setBackgroundElementOpacity$$($JSCompiler_StaticMethods_setBackgroundElementOpacity$self$$, $opacity$$) {
  $JSCompiler_StaticMethods_setBackgroundElementOpacity$self$$.$backgroundElementOpacity_$ = $opacity$$;
  if($JSCompiler_StaticMethods_setBackgroundElementOpacity$self$$.$getElement$()) {
    var $bgEl$$ = $JSCompiler_StaticMethods_setBackgroundElementOpacity$self$$.$getBackgroundElement$();
    $bgEl$$ && $goog$style$setOpacity$$($bgEl$$, $JSCompiler_StaticMethods_setBackgroundElementOpacity$self$$.$backgroundElementOpacity_$)
  }
}
function $JSCompiler_StaticMethods_setModalInternal_$$($JSCompiler_StaticMethods_setModalInternal_$self$$) {
  $JSCompiler_StaticMethods_setModalInternal_$self$$.$modal_$ = $JSCompiler_alias_FALSE$$;
  if($JSCompiler_StaticMethods_setModalInternal_$self$$.$inDocument_$) {
    var $dom$$2$$ = $JSCompiler_StaticMethods_setModalInternal_$self$$.$getDomHelper$(), $bg$$ = $JSCompiler_StaticMethods_setModalInternal_$self$$.$getBackgroundElement$();
    $dom$$2$$.removeNode($JSCompiler_StaticMethods_setModalInternal_$self$$.$bgIframeEl_$);
    $dom$$2$$.removeNode($bg$$)
  }
}
function $JSCompiler_StaticMethods_setDraggingEnabled_$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$, $enabled$$2$$) {
  if($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$getElement$()) {
    var $element$$inline_527$$ = $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$, $className$$inline_528$$ = $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$class_$ + "-title-draggable";
    $enabled$$2$$ ? $goog$dom$classes$add$$($element$$inline_527$$, $className$$inline_528$$) : $goog$dom$classes$remove$$($element$$inline_527$$, $className$$inline_528$$)
  }
  $enabled$$2$$ && !$JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ ? ($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ = new $goog$fx$Dragger$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$getElement$(), $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$), $goog$dom$classes$add$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$, $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$class_$ + "-title-draggable"), $goog$events$listen$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$, 
  "start", $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$setDraggerLimits_$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_setDraggingEnabled_$self$$)) : !$enabled$$2$$ && $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ && ($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$.$dispose$(), $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ = $JSCompiler_alias_NULL$$)
}
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  $rflect$ui$Dialog$$.$superClass_$.$createDom$.call(this);
  var $element$$130$$ = this.$getElement$();
  $goog$asserts$assert$$($element$$130$$, "getElement() returns null");
  var $dom$$3$$ = this.$getDomHelper$();
  this.$titleEl_$ = $dom$$3$$.$createDom$("div", {className:this.$class_$ + "-title", id:$JSCompiler_StaticMethods_getId$$(this)}, this.$titleTextEl_$ = $dom$$3$$.$createDom$("span", this.$class_$ + "-title-text", this.$title_$), this.$titleCloseEl_$ = $dom$$3$$.$createDom$("span", this.$class_$ + "-title-close"));
  $goog$dom$append$$($element$$130$$, this.$titleEl_$, this.$contentEl_$ = $dom$$3$$.$createDom$("div", this.$class_$ + "-content"), this.$buttonEl_$ = $dom$$3$$.$createDom$("div", this.$class_$ + "-buttons"));
  this.$titleId_$ = this.$titleEl_$.id;
  $element$$130$$.setAttribute("role", this.$preferredAriaRole_$);
  $goog$a11y$aria$setState$$($element$$130$$, "labelledby", this.$titleId_$ || "");
  this.$content_$ && (this.$contentEl_$.innerHTML = this.$content_$);
  $goog$style$showElement$$(this.$titleCloseEl_$, this.$hasTitleCloseButton_$);
  this.$buttons_$ && (this.$buttons_$.$createDom$(), this.$getDomHelper$().appendChild(this.$buttonEl_$, this.$buttons_$.$getElement$()));
  $goog$style$showElement$$(this.$buttonEl_$, !!this.$buttons_$);
  $JSCompiler_StaticMethods_setBackgroundElementOpacity$$(this, this.$backgroundElementOpacity_$)
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($dialogElement_element$$131$$) {
  $rflect$ui$Dialog$$.$superClass_$.$decorateInternal$.call(this, $dialogElement_element$$131$$);
  $dialogElement_element$$131$$ = this.$getElement$();
  $goog$asserts$assert$$($dialogElement_element$$131$$, "The DOM element for dialog cannot be null.");
  var $contentClass_titleClass$$ = this.$class_$ + "-content";
  (this.$contentEl_$ = $goog$dom$getElementsByTagNameAndClass_$$($contentClass_titleClass$$, $dialogElement_element$$131$$)[0]) ? this.$content_$ = this.$contentEl_$.innerHTML : (this.$contentEl_$ = this.$getDomHelper$().$createDom$("div", $contentClass_titleClass$$), this.$content_$ && (this.$contentEl_$.innerHTML = this.$content_$), $dialogElement_element$$131$$.appendChild(this.$contentEl_$));
  var $contentClass_titleClass$$ = this.$class_$ + "-title", $titleTextClass$$ = this.$class_$ + "-title-text", $titleCloseClass$$ = this.$class_$ + "-title-close";
  (this.$titleEl_$ = $goog$dom$getElementsByTagNameAndClass_$$($contentClass_titleClass$$, $dialogElement_element$$131$$)[0]) ? (this.$titleTextEl_$ = $goog$dom$getElementsByTagNameAndClass_$$($titleTextClass$$, this.$titleEl_$)[0], this.$titleCloseEl_$ = $goog$dom$getElementsByTagNameAndClass_$$($titleCloseClass$$, this.$titleEl_$)[0], this.$titleEl_$.id || (this.$titleEl_$.id = $JSCompiler_StaticMethods_getId$$(this))) : (this.$titleEl_$ = this.$getDomHelper$().$createDom$("div", {className:$contentClass_titleClass$$, 
  id:$JSCompiler_StaticMethods_getId$$(this)}), $dialogElement_element$$131$$.insertBefore(this.$titleEl_$, this.$contentEl_$));
  this.$titleId_$ = this.$titleEl_$.id;
  this.$titleTextEl_$ ? this.$title_$ = $goog$dom$getTextContent$$(this.$titleTextEl_$) : (this.$titleTextEl_$ = this.$getDomHelper$().$createDom$("span", $titleTextClass$$, this.$title_$), this.$titleEl_$.appendChild(this.$titleTextEl_$));
  $goog$a11y$aria$setState$$($dialogElement_element$$131$$, "labelledby", this.$titleId_$ || "");
  this.$titleCloseEl_$ || (this.$titleCloseEl_$ = this.$getDomHelper$().$createDom$("span", $titleCloseClass$$), this.$titleEl_$.appendChild(this.$titleCloseEl_$));
  $goog$style$showElement$$(this.$titleCloseEl_$, this.$hasTitleCloseButton_$);
  this.$buttonEl_$ = $goog$dom$getElementsByTagNameAndClass_$$(this.$class_$ + "-buttons", $dialogElement_element$$131$$)[0];
  this.$buttons_$ = new $rflect$ui$Dialog$ButtonSet$$(this.$getDomHelper$(), this.$buttonRenderer_$);
  this.$buttonEl_$ ? this.$buttons_$.$decorateInternal$(this.$buttonEl_$) : (this.$buttonEl_$ = this.$getDomHelper$().$createDom$("div", this.$class_$ + "-buttons"), this.$buttons_$.$createDom$(), this.$getDomHelper$().appendChild(this.$buttonEl_$, this.$buttons_$.$getElement$()), $goog$style$showElement$$(this.$buttonEl_$, !!this.$buttons_$));
  $JSCompiler_StaticMethods_setBackgroundElementOpacity$$(this, this.$backgroundElementOpacity_$)
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $rflect$ui$Dialog$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "keydown", this.$onKey_$), this.$getElement$(), "keypress", this.$onKey_$);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$buttons_$, "action", this.$onButtonClick_$);
  $JSCompiler_StaticMethods_setDraggingEnabled_$$(this, this.$draggable_$);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$titleCloseEl_$, "click", this.$onTitleCloseClick_$);
  var $element$$132$$ = this.$getElement$();
  $goog$asserts$assert$$($element$$132$$, "The DOM element for dialog cannot be null");
  $element$$132$$.setAttribute("role", this.$preferredAriaRole_$);
  "" !== this.$titleTextEl_$.id && $goog$a11y$aria$setState$$($element$$132$$, "labelledby", this.$titleTextEl_$.id);
  this.$modal_$ || $JSCompiler_StaticMethods_setModalInternal_$$(this)
};
$JSCompiler_prototypeAlias$$.$exitDocument$ = function $$JSCompiler_prototypeAlias$$$$exitDocument$$() {
  this.$visible_$ && this.$setVisible$($JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_setDraggingEnabled_$$(this, $JSCompiler_alias_FALSE$$);
  $rflect$ui$Dialog$$.$superClass_$.$exitDocument$.call(this)
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($visible$$5$$) {
  $visible$$5$$ != this.$visible_$ && (this.$inDocument_$ || $JSCompiler_StaticMethods_render_$$(this), $rflect$ui$Dialog$$.$superClass_$.$setVisible$.call(this, $visible$$5$$))
};
$JSCompiler_prototypeAlias$$.$onShow$ = function $$JSCompiler_prototypeAlias$$$$onShow$$() {
  $rflect$ui$Dialog$$.$superClass_$.$onShow$.call(this);
  this.dispatchEvent($rflect$ui$Dialog$EventType$AFTER_SHOW$$)
};
$JSCompiler_prototypeAlias$$.$onHide$ = function $$JSCompiler_prototypeAlias$$$$onHide$$() {
  $rflect$ui$Dialog$$.$superClass_$.$onHide$.call(this);
  this.dispatchEvent($rflect$ui$Dialog$EventType$AFTER_HIDE$$);
  this.$disposeOnHide_$ && this.$dispose$()
};
$JSCompiler_prototypeAlias$$.focus = function $$JSCompiler_prototypeAlias$$$focus$() {
  $rflect$ui$Dialog$$.$superClass_$.focus.call(this);
  if(this.$buttons_$) {
    var $defaultButton$$ = this.$buttons_$.$defaultButton_$;
    $defaultButton$$ && $JSCompiler_StaticMethods_setFocused$$($defaultButton$$, $JSCompiler_alias_TRUE$$)
  }
};
$JSCompiler_prototypeAlias$$.$setDraggerLimits_$ = function $$JSCompiler_prototypeAlias$$$$setDraggerLimits_$$() {
  var $doc$$41_h$$8$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()), $limits$$inline_538_viewSize$$2$$ = $goog$dom$getViewportSize_$$(($doc$$41_h$$8$$ ? $goog$dom$getWindow_$$($doc$$41_h$$8$$) : window) || window || window), $w$$8$$ = Math.max($doc$$41_h$$8$$.body.scrollWidth, $limits$$inline_538_viewSize$$2$$.width), $doc$$41_h$$8$$ = Math.max($doc$$41_h$$8$$.body.scrollHeight, $limits$$inline_538_viewSize$$2$$.height), $dialogSize$$ = $goog$style$getSize$$(this.$getElement$());
  "fixed" == $goog$style$getComputedPosition$$(this.$getElement$()) ? ($limits$$inline_538_viewSize$$2$$ = new $goog$math$Rect$$(0, 0, Math.max(0, $limits$$inline_538_viewSize$$2$$.width - $dialogSize$$.width), Math.max(0, $limits$$inline_538_viewSize$$2$$.height - $dialogSize$$.height)), this.$dragger_$.$limits$ = $limits$$inline_538_viewSize$$2$$ || new $goog$math$Rect$$(NaN, NaN, NaN, NaN)) : this.$dragger_$.$limits$ = new $goog$math$Rect$$(0, 0, $w$$8$$ - $dialogSize$$.width, $doc$$41_h$$8$$ - 
  $dialogSize$$.height) || new $goog$math$Rect$$(NaN, NaN, NaN, NaN)
};
$JSCompiler_prototypeAlias$$.$onTitleCloseClick_$ = function $$JSCompiler_prototypeAlias$$$$onTitleCloseClick_$$() {
  if(this.$hasTitleCloseButton_$) {
    var $bs_key$$70$$ = this.$buttons_$;
    ($bs_key$$70$$ = $bs_key$$70$$ && $bs_key$$70$$.$cancelButton_$) ? this.dispatchEvent(new $rflect$ui$Dialog$Event$$($bs_key$$70$$, $bs_key$$70$$.$content_$)) && this.$setVisible$($JSCompiler_alias_FALSE$$) : this.$setVisible$($JSCompiler_alias_FALSE$$)
  }
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  this.$buttonEl_$ = this.$titleCloseEl_$ = $JSCompiler_alias_NULL$$;
  $rflect$ui$Dialog$$.$superClass_$.$disposeInternal$.call(this)
};
function $JSCompiler_StaticMethods_setButtonSet$$($JSCompiler_StaticMethods_setButtonSet$self$$, $buttons$$) {
  $buttons$$ ? ($JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_setButtonSet$self$$, $buttons$$), $JSCompiler_StaticMethods_setButtonSet$self$$.$buttonEl_$ && ($JSCompiler_StaticMethods_setButtonSet$self$$.$dom_$.appendChild($JSCompiler_StaticMethods_setButtonSet$self$$.$buttonEl_$, $buttons$$.$getElement$()), $goog$style$showElement$$($JSCompiler_StaticMethods_setButtonSet$self$$.$buttonEl_$, $JSCompiler_alias_TRUE$$))) : ($JSCompiler_StaticMethods_setButtonSet$self$$.removeChild($JSCompiler_StaticMethods_setButtonSet$self$$.$buttons_$, 
  !!$JSCompiler_StaticMethods_setButtonSet$self$$.$buttonEl_$), $JSCompiler_StaticMethods_setButtonSet$self$$.$buttons_$.$dispose$());
  $JSCompiler_StaticMethods_setButtonSet$self$$.$buttons_$ = $buttons$$
}
$JSCompiler_prototypeAlias$$.$onButtonClick_$ = function $$JSCompiler_prototypeAlias$$$$onButtonClick_$$($e$$64_key$$71$$) {
  $e$$64_key$$71$$ = $e$$64_key$$71$$.target;
  $e$$64_key$$71$$ instanceof $goog$ui$Button$$ && this.dispatchEvent(new $rflect$ui$Dialog$Event$$($e$$64_key$$71$$, $e$$64_key$$71$$.$content_$)) && this.$setVisible$($JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$onKey_$ = function $$JSCompiler_prototypeAlias$$$$onKey_$$($e$$65$$) {
  var $close$$ = $JSCompiler_alias_FALSE$$, $hasHandler$$ = $JSCompiler_alias_FALSE$$, $buttonSet_cancel$$ = this.$buttons_$, $isSpecialFormElement_target$$53$$ = $e$$65$$.target;
  if("keydown" == $e$$65$$.type) {
    if(this.$escapeToCancel_$ && 27 == $e$$65$$.keyCode) {
      $buttonSet_cancel$$ = $buttonSet_cancel$$ && $buttonSet_cancel$$.$cancelButton_$, $isSpecialFormElement_target$$53$$ = "SELECT" == $isSpecialFormElement_target$$53$$.tagName && !$isSpecialFormElement_target$$53$$.disabled, $buttonSet_cancel$$ && !$isSpecialFormElement_target$$53$$ ? ($hasHandler$$ = $JSCompiler_alias_TRUE$$, $close$$ = this.dispatchEvent(new $rflect$ui$Dialog$Event$$($buttonSet_cancel$$, $buttonSet_cancel$$.$content_$))) : $isSpecialFormElement_target$$53$$ || ($close$$ = $JSCompiler_alias_TRUE$$)
    }else {
      if(9 == $e$$65$$.keyCode && $e$$65$$.shiftKey && $isSpecialFormElement_target$$53$$ == this.$getElement$()) {
        this.$backwardTabWrapInProgress_$ = $JSCompiler_alias_TRUE$$;
        try {
          this.$tabCatcherElement_$.focus()
        }catch($e$$inline_544$$) {
        }
        $goog$Timer$callOnce$$(this.$resetBackwardTabWrap_$, this)
      }
    }
  }else {
    if(13 == $e$$65$$.keyCode) {
      var $key$$72$$;
      if("BUTTON" == $isSpecialFormElement_target$$53$$.tagName) {
        $key$$72$$ = $isSpecialFormElement_target$$53$$.name
      }else {
        if($buttonSet_cancel$$) {
          var $defaultKey$$ = $buttonSet_cancel$$.$defaultButton_$, $isSpecialFormElement_target$$53$$ = ("TEXTAREA" == $isSpecialFormElement_target$$53$$.tagName || "SELECT" == $isSpecialFormElement_target$$53$$.tagName || "A" == $isSpecialFormElement_target$$53$$.tagName) && !$isSpecialFormElement_target$$53$$.disabled;
          $defaultKey$$ && ($defaultKey$$.isEnabled() && !$isSpecialFormElement_target$$53$$) && ($key$$72$$ = $defaultKey$$)
        }
      }
      $key$$72$$ && $buttonSet_cancel$$ && ($hasHandler$$ = $JSCompiler_alias_TRUE$$, $close$$ = this.dispatchEvent(new $rflect$ui$Dialog$Event$$($key$$72$$, String($key$$72$$.$content_$))))
    }
  }
  if($close$$ || $hasHandler$$) {
    $e$$65$$.stopPropagation(), $e$$65$$.preventDefault()
  }
  $close$$ && this.$setVisible$($JSCompiler_alias_FALSE$$)
};
function $rflect$ui$Dialog$Event$$($key$$73$$, $caption$$5$$) {
  this.type = $rflect$ui$Dialog$EventType$SELECT$$;
  this.key = $key$$73$$;
  this.caption = $caption$$5$$
}
$goog$inherits$$($rflect$ui$Dialog$Event$$, $goog$events$Event$$);
var $rflect$ui$Dialog$EventType$SELECT$$ = "dialogselect", $rflect$ui$Dialog$EventType$AFTER_HIDE$$ = "afterhide", $rflect$ui$Dialog$EventType$AFTER_SHOW$$ = "aftershow";
function $rflect$ui$Dialog$ButtonSet$$($opt_domHelper$$8$$, $opt_buttonRenderer$$1$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$8$$);
  this.$buttonRenderer_$ = $opt_buttonRenderer$$1$$ || $goog$ui$NativeButtonRenderer$$.$getInstance$()
}
$goog$inherits$$($rflect$ui$Dialog$ButtonSet$$, $goog$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $rflect$ui$Dialog$ButtonSet$$.prototype;
$JSCompiler_prototypeAlias$$.$class_$ = "goog-buttonset";
$JSCompiler_prototypeAlias$$.$defaultButton_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$cancelButton_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$emphasisButton_$ = $JSCompiler_alias_NULL$$;
function $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$self$$, $button$$16$$, $opt_isDefault$$, $opt_isCancel$$, $opt_isEmphasis$$) {
  $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_addButton$self$$, $button$$16$$);
  $opt_isDefault$$ && ($JSCompiler_StaticMethods_addButton$self$$.$defaultButton_$ = $button$$16$$);
  $opt_isCancel$$ && ($JSCompiler_StaticMethods_addButton$self$$.$cancelButton_$ = $button$$16$$);
  $opt_isEmphasis$$ && ($JSCompiler_StaticMethods_addButton$self$$.$emphasisButton_$ = $button$$16$$);
  return $JSCompiler_StaticMethods_addButton$self$$
}
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  var $container$$2$$ = this.$getDomHelper$().$createDom$("div");
  $JSCompiler_StaticMethods_forEachChild$$(this, function($child$$17$$) {
    $child$$17$$.$createDom$();
    $child$$17$$ == this.$emphasisButton_$ && $goog$dom$classes$add$$($child$$17$$.$getElement$(), "emphasis-button");
    this.$getDomHelper$().appendChild($container$$2$$, $child$$17$$.$getElement$())
  }, this);
  $rflect$ui$Dialog$ButtonSet$$.$superClass_$.$setElementInternal$.call(this, $container$$2$$)
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($buttons$$1_element$$134$$) {
  this.$setElementInternal$($buttons$$1_element$$134$$);
  if($buttons$$1_element$$134$$ && 1 == $buttons$$1_element$$134$$.nodeType) {
    $buttons$$1_element$$134$$ = this.$dom_$.$getChildren$(this.$element_$);
    for(var $i$$108$$ = 0, $buttonEl$$, $caption$$6$$;$buttonEl$$ = $buttons$$1_element$$134$$[$i$$108$$];$i$$108$$++) {
      var $button$$17$$ = new $goog$ui$Button$$($JSCompiler_alias_NULL$$, this.$buttonRenderer_$), $isDefault$$ = 0 == $i$$108$$;
      $caption$$6$$ = $goog$dom$getTextContent$$($buttonEl$$) || $buttonEl$$.value;
      $JSCompiler_StaticMethods_addButton$$(this, $button$$17$$, $isDefault$$, "cancel" == $caption$$6$$);
      $button$$17$$.$decorateInternal$($buttonEl$$);
      $isDefault$$ && $goog$dom$classes$add$$($buttonEl$$, this.$class_$ + "-default")
    }
  }
};
function $rflect$ui$Dialog$ButtonSet$getButton$$($caption$$7$$) {
  return new $goog$ui$Button$$($caption$$7$$, $goog$ui$FlatButtonRenderer$$.$getInstance$())
}
;function $rflect$cal$ui$SaveDialog$$() {
  $rflect$ui$Dialog$$.call(this, $JSCompiler_alias_VOID$$, $JSCompiler_alias_VOID$$, $JSCompiler_alias_VOID$$, $goog$ui$FlatButtonRenderer$$.$getInstance$());
  this.$title_$ = "New event";
  this.$titleTextEl_$ && $goog$dom$setTextContent$$(this.$titleTextEl_$, "New event");
  $JSCompiler_alias_FALSE$$ != this.$modal_$ && $JSCompiler_StaticMethods_setModalInternal_$$(this);
  $JSCompiler_StaticMethods_setBackgroundElementOpacity$$(this, 0);
  var $JSCompiler_inline_result$$52_save$$inline_552$$;
  $JSCompiler_inline_result$$52_save$$inline_552$$ = $rflect$ui$Dialog$ButtonSet$getButton$$("Save");
  var $cancel$$inline_553$$ = $rflect$ui$Dialog$ButtonSet$getButton$$("Cancel");
  $JSCompiler_inline_result$$52_save$$inline_552$$ = $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$(new $rflect$ui$Dialog$ButtonSet$$, $JSCompiler_inline_result$$52_save$$inline_552$$, $JSCompiler_alias_TRUE$$, $JSCompiler_alias_FALSE$$, $JSCompiler_alias_TRUE$$), $cancel$$inline_553$$, $JSCompiler_alias_FALSE$$, $JSCompiler_alias_TRUE$$);
  $JSCompiler_StaticMethods_setButtonSet$$(this, $JSCompiler_inline_result$$52_save$$inline_552$$);
  this.$setContent$('<div class="event-name-cont"><label for="event-name" class="event-name-label">Event name</label><input type="text" value="" id="event-name" name="event-name" class="event-name-input" spellcheck="false"/></div><a id="event-edit" class="event-edit-link goog-inline-block" href="javascript:void(0)">Edit options</a>')
}
$goog$inherits$$($rflect$cal$ui$SaveDialog$$, $rflect$ui$Dialog$$);
$rflect$cal$ui$SaveDialog$$.prototype.focus = function $$rflect$cal$ui$SaveDialog$$$$focus$() {
  $goog$ui$ModalPopup$$.prototype.focus.call(this);
  this.$input_$ && (this.$input_$.value = "", this.$input_$.focus())
};
$rflect$cal$ui$SaveDialog$$.prototype.$enterDocument$ = function $$rflect$cal$ui$SaveDialog$$$$$enterDocument$$() {
  var $link$$ = this.$getDomHelper$().$getElement$("event-edit");
  this.$input_$ = this.$getDomHelper$().$getElement$("event-name");
  $rflect$cal$ui$SaveDialog$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), $link$$, "click", this.$onEditClick_$, $JSCompiler_alias_FALSE$$, this)
};
$rflect$cal$ui$SaveDialog$$.prototype.$onEditClick_$ = function $$rflect$cal$ui$SaveDialog$$$$$onEditClick_$$() {
  this.dispatchEvent({type:"editevent"}) && this.$setVisible$($JSCompiler_alias_FALSE$$)
};
$rflect$cal$ui$SaveDialog$$.prototype.$dispose$ = function $$rflect$cal$ui$SaveDialog$$$$$dispose$$() {
  $rflect$cal$ui$SaveDialog$$.$superClass_$.$dispose$.call(this);
  this.$input_$ = $JSCompiler_alias_NULL$$
};
function $rflect$cal$MainPaneBuilder$$($aViewManager$$8$$, $aMainPane$$, $aTimeManager$$5$$, $aEventManager$$1$$, $aBlockPoolWeek$$, $aBlockPoolAllday$$, $aBlockPoolMonth$$, $aContainerSizeMonitor$$3$$, $aTimeMarker$$) {
  this.$viewManager_$ = $aViewManager$$8$$;
  this.$mainPane_$ = $aMainPane$$;
  this.$timeManager_$ = $aTimeManager$$5$$;
  this.$eventManager_$ = $aEventManager$$1$$;
  this.$blockPoolWeek_$ = $aBlockPoolWeek$$;
  this.$blockPoolAllday_$ = $aBlockPoolAllday$$;
  this.$blockPoolMonth_$ = $aBlockPoolMonth$$;
  this.$containerSizeMonitor_$ = $aContainerSizeMonitor$$3$$;
  this.$timeMarker_$ = $aTimeMarker$$;
  this.$weekDayNameFormatWeek_$ = new $goog$i18n$DateTimeFormat$$("EEE, d MMM");
  this.$cache_$ = {}
}
var $rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$ = '<div id="main-pane" class="main-pane">,<div id="main-pane-header">,<div id="daynames-prefix-wk" style="width:61,px"><div id="daynames-zippy" class="zippy ,"></div>,</div>,<div id="main-pane-header-container" class="main-pane-header-container-wk" style="margin-left:61px,"><div id="main-pane-header-wk-daynames">,<div id="weekmode-daynames-table" style="width:,%">,<div id="dayname," class="dayname-wk" style="margin-left:,%;margin-right:,%;top:,%"><span class=",">,</span></div>,</div>,</div>,<div id="main-pane-header-scrollable" class="," style="height:,px">,<div id="alldayevents-grid-wrapper">,<div id="alldayevents-grid" style="height:,px;width:,%">,<div id="wk-ad-mask-cnt"></div>,<div id="weekgrid-ad-col," class="weekgrid-col, wk-ad-layers-cont-outer" style="margin-left:,%;margin-right:,%;top:,%">,<div class="wk-ad-layers-cont">,<div id="wk-ad-dec-layer-col," class="wk-ad-decoration-layer">,<div class="expand-sign-wk-ad-cont">,<div class="expand-sign-wk-ad ,"></div></div>,</div>,<div id="wk-ad-events-layer-col," class="wk-ad-events-layer">,</div>,</div>,</div>,</div>,</div>,</div>,<div id="main-pane-header-wk-zippies">,<div id="weekmode-zippies-table" style="width:,%">,<div class="wk-col-zippy-cont" style="margin-left:,%;margin-right:,%;top:,%">,<div id="wk-zippy-col," class="zippy wk-col-zippy ,"></div>,</div>,</div>,</div>,</div>,</div>,<div id="main-pane-body-scrollable-wk" style="height:,px" class=",">,<div id="hours-container" style="width:60,px">,<div class=","><div class="hour-label ,">,</div></div>,</div>,<div id="grid-table-wrapper-wk" style="margin-left:60px">,<div id="grid-rows-container" class="wk-grid-rows-cont" style="width:,%">,<div class=","></div>,</div>,<div class="grid-table-wk-outer" style="width:,%"><div id="grid-table-wk" class="grid-table-wk">,<div id="wk-mask-cnt"></div>,<div id="weekgrid-col," class="weekgrid-col," style="margin-left:,%;margin-right:,%;top:,%">,<div id="wk-dec-layer-in-col," class="wk-decoration-layer">,<div class="expand-sign-wk-cont"><div class="expand-sign-wk ,"></div></div>,<div class="today-mask-wk"></div>,</div>,<div id="wk-events-layer-col," class="wk-events-layer">,<div class="event-rect-wk" style="top:,px; margin-left:,%; margin-right:,%; height:,px; margin-bottom:,px;z-index:,"><div class="event-rect-wk-inner ,"><span class="event-wk-timelabel">, - ,</span>&nbsp;,</div></div>,</div>,</div>,</div></div>,</div>,</div>,</div>'.split(","), 
$rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$ = '<div id="main-pane" class="main-pane">,<div id="main-pane-header">,<div id="daynames-prefix-mn">,</div>,<div id="main-pane-header-container" class="main-pane-header-container-mn">,<div id="main-pane-header-wk-daynames" style="margin-right:,px"><table id="weekmode-daynames-table" cellspacing="0" cellpadding="0">,<tbody><tr>,<td id="dayname,">,</td>,</tr></tbody></table>,</div>,</div>,</div>,<div id="main-pane-body-scrollable-wrapper" style="height:,px;">,<div id="main-pane-header-mn-zippies">,<table id="monthmode-zippies-table" cellspacing="0" cellpadding="0"><tbody>,<tr><td id="mn-zippy-cont-row," style="height:,px;">,<div class="mn-row-zippy-cont">,<div id="mn-zippy-row," class="zippy mn-row-zippy ,"></div>,</div>,</td></tr>,</tbody></table>,</div>,<div id="main-pane-body-scrollable-mn" class=",">,<div id="grid-table-wrapper-outer" style="height:,px;">,<div id="weeknum-cont"><table id="weeknums" cellspacing="0" cellpadding="0">,<tr><td id="weeknum," class="weeknum-label" style="height:,px;"><span class="weeknum-label-inner">,</span></td></tr>,</table>,</div>,<div id="grid-table-wrapper-mn"><div id="mn-mask-cnt"></div>,<div id="grid-cols-container" class="mn-grid-cols-cont"><table id="grid-cols-cont-inner" cellspacing="0" cellpadding="0"><tbody><tr>,<td class="weekgrid-col,">&nbsp;</td>,</tr></tbody></table>,</div>,<table id="grid-table-mn" cellspacing="0" cellpadding="0" class="grid-table-mn">,<tbody>,<tr><td id="monthgrid-row," class="monthgrid-row ," style="height:,px;">,<div class="mn-layers-cont">,<div id="mn-dec-layer-row," class="mn-decoration-layer">,<table cellspacing="0" cellpadding="0" class="daynums"><tbody><tr>,<td class="daycell"><div class="daycell-decoration-cont">,<div class="today-mask-mn"></div>,</div><div class="daycell-daynum-outer-cont"><div class="expand-sign-mn-cont"><div class="expand-sign-mn ,"></div>,</div>,<div class="daynum-cont"><div id="daynum-," class="daynum-label ,">,</div>,</div></div>,</td>,</tr></tbody></table>,</div>,<div id="mn-events-layer-row," class="mn-events-layer">,<div style="margin-left:,%; margin-right:,%;top:,px" class="event-rect-mn-outer"><div class="event-rect-mn ,"><div class="event-rect-mn-inner ,">,</div></div></div>,</div>,</div>,</td></tr>,</tbody>,</table>,</div>,</div>,</div>,</div>,</div>'.split(",");
function $JSCompiler_StaticMethods_buildWeekGridAdCols_$$($JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$, $aSb$$34$$, $aOffset$$9$$) {
  for(var $prevColsCumulativeSize$$1$$ = 0, $gridWidth$$1$$ = $JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$.$blockPoolWeek_$.$gridSize$.width, $sparseArrays$$ = $JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$.$blockPoolAllday_$.$blocks$[0].$sparseArrays$, $colCounter$$2$$ = 0, $blocksNumber$$1$$ = $JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$.$blockPoolWeek_$.$blocksNumber_$;$colCounter$$2$$ < $blocksNumber$$1$$;$colCounter$$2$$++) {
    0 < $colCounter$$2$$ && $aSb$$34$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$9$$]);
    $aSb$$34$$.append($colCounter$$2$$);
    $aSb$$34$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$9$$ + 1]);
    $colCounter$$2$$ == $blocksNumber$$1$$ - 1 && $aSb$$34$$.append(" weekgrid-col-last");
    $aSb$$34$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$9$$ + 2]);
    $aSb$$34$$.append((100 * ($prevColsCumulativeSize$$1$$ / $gridWidth$$1$$)).toFixed(4));
    $prevColsCumulativeSize$$1$$ += $JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$.$blockPoolWeek_$.$blocks$[$colCounter$$2$$].size;
    $aSb$$34$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$9$$ + 3]);
    $aSb$$34$$.append((100 - 100 * ($prevColsCumulativeSize$$1$$ / $gridWidth$$1$$)).toFixed(4));
    $aSb$$34$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$9$$ + 4]);
    $aSb$$34$$.append(-100 * $colCounter$$2$$);
    $aSb$$34$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$9$$ + 5]);
    $aSb$$34$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$9$$ + 6]);
    $aSb$$34$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$9$$ + 7]);
    $aSb$$34$$.append($colCounter$$2$$);
    $aSb$$34$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$9$$ + 8]);
    var $aSb$$inline_556_aSb$$inline_560$$ = $aSb$$34$$, $aChips$$inline_561_aOffset$$inline_557$$ = $aOffset$$9$$ + 9, $aEventManager$$inline_562_block$$inline_558$$ = $JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$.$blockPoolAllday_$.$blocks$[0];
    $aSb$$inline_556_aSb$$inline_560$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aChips$$inline_561_aOffset$$inline_557$$]);
    $aSb$$inline_556_aSb$$inline_560$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aChips$$inline_561_aOffset$$inline_557$$ + 1]);
    $aSb$$inline_556_aSb$$inline_560$$.append(!$aEventManager$$inline_562_block$$inline_558$$.$expanded$ && $aEventManager$$inline_562_block$$inline_558$$.$couldBeExpanded$ ? "expand-sign-wk-ad-collapsed" : $aEventManager$$inline_562_block$$inline_558$$.$expanded$ && $aEventManager$$inline_562_block$$inline_558$$.$couldBeCollapsed$ ? "expand-sign-wk-ad-expanded" : "");
    $aSb$$inline_556_aSb$$inline_560$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aChips$$inline_561_aOffset$$inline_557$$ + 2]);
    $aSb$$34$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$9$$ + 12]);
    $aSb$$34$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$9$$ + 13]);
    $aSb$$34$$.append($colCounter$$2$$);
    $aSb$$34$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$9$$ + 14]);
    for(var $aSb$$inline_556_aSb$$inline_560$$ = $aSb$$34$$, $aChips$$inline_561_aOffset$$inline_557$$ = $sparseArrays$$[$colCounter$$2$$], $aEventManager$$inline_562_block$$inline_558$$ = $JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$.$eventManager_$, $chip$$inline_563$$ = $JSCompiler_alias_VOID$$, $chipCounter$$inline_564$$ = 0, $length$$inline_565$$ = $aChips$$inline_561_aOffset$$inline_557$$.length;$chipCounter$$inline_564$$ < $length$$inline_565$$;$chipCounter$$inline_564$$++) {
      ($chip$$inline_563$$ = $aChips$$inline_561_aOffset$$inline_557$$[$chipCounter$$inline_564$$]) && $rflect$cal$MainPaneBuilder$buildMonthBlockChip_$$($aSb$$inline_556_aSb$$inline_560$$, 72, $aEventManager$$inline_562_block$$inline_558$$, $chip$$inline_563$$, 0, $chipCounter$$inline_564$$, 0, $JSCompiler_alias_TRUE$$)
    }
    $aSb$$34$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$9$$ + 15]);
    $aSb$$34$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$9$$ + 16]);
    $aSb$$34$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$9$$ + 17])
  }
}
function $JSCompiler_StaticMethods_buildWeekGridCols_$$($JSCompiler_StaticMethods_buildWeekGridCols_$self$$, $aSb$$47$$, $aOffset$$21$$) {
  for(var $prevColsCumulativeSize$$3$$ = 0, $gridWidth$$3$$ = $JSCompiler_StaticMethods_buildWeekGridCols_$self$$.$blockPoolWeek_$.$gridSize$.width, $colCounter$$4$$ = 0, $blocksNumber$$5$$ = $JSCompiler_StaticMethods_buildWeekGridCols_$self$$.$blockPoolWeek_$.$blocksNumber_$;$colCounter$$4$$ < $blocksNumber$$5$$;$colCounter$$4$$++) {
    0 < $colCounter$$4$$ && $aSb$$47$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$21$$]);
    $aSb$$47$$.append($colCounter$$4$$);
    $aSb$$47$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$21$$ + 1]);
    $colCounter$$4$$ == $blocksNumber$$5$$ - 1 && $aSb$$47$$.append(" weekgrid-col-last");
    $aSb$$47$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$21$$ + 2]);
    $aSb$$47$$.append((100 * ($prevColsCumulativeSize$$3$$ / $gridWidth$$3$$)).toFixed(4));
    $prevColsCumulativeSize$$3$$ += $JSCompiler_StaticMethods_buildWeekGridCols_$self$$.$blockPoolWeek_$.$blocks$[$colCounter$$4$$].size;
    $aSb$$47$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$21$$ + 3]);
    $aSb$$47$$.append((100 - 100 * ($prevColsCumulativeSize$$3$$ / $gridWidth$$3$$)).toFixed(4));
    $aSb$$47$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$21$$ + 4]);
    $aSb$$47$$.append(-100 * $colCounter$$4$$);
    $aSb$$47$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$21$$ + 5]);
    $aSb$$47$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$21$$ + 6]);
    $aSb$$47$$.append($colCounter$$4$$);
    $aSb$$47$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$21$$ + 7]);
    for(var $aSb$$inline_568_aSb$$inline_575$$ = $aSb$$47$$, $aOffset$$inline_569$$ = $aOffset$$21$$ + 8, $block$$inline_571$$ = $JSCompiler_StaticMethods_buildWeekGridCols_$self$$.$blockPoolWeek_$.$blocks$[$colCounter$$4$$], $counter$$inline_572$$ = 0;6 > $counter$$inline_572$$;$counter$$inline_572$$++) {
      $aSb$$inline_568_aSb$$inline_575$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_569$$]), $aSb$$inline_568_aSb$$inline_575$$.append(!$block$$inline_571$$.$expanded$ && $block$$inline_571$$.$couldBeExpanded$ ? "expand-sign-wk-collapsed" : $block$$inline_571$$.$expanded$ && $block$$inline_571$$.$couldBeCollapsed$ ? "expand-sign-wk-expanded" : ""), $aSb$$inline_568_aSb$$inline_575$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_569$$ + 1])
    }
    $JSCompiler_StaticMethods_buildWeekGridCols_$self$$.$timeManager_$.$currentDay_$ && $JSCompiler_StaticMethods_buildWeekGridCols_$self$$.$timeManager_$.$currentDay_$.$equals$($JSCompiler_StaticMethods_buildWeekGridCols_$self$$.$timeManager_$.$daySeries$[$colCounter$$4$$], 7) && ($aSb$$47$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$21$$ + 10]), $aSb$$inline_568_aSb$$inline_575$$ = $aSb$$47$$, $aSb$$inline_568_aSb$$inline_575$$.append($rflect$cal$TimeMarker$HEAD_PARTS_$$[2]), 
    $aSb$$inline_568_aSb$$inline_575$$.append($JSCompiler_StaticMethods_getPosition_$$($JSCompiler_alias_FALSE$$)), $aSb$$inline_568_aSb$$inline_575$$.append($rflect$cal$TimeMarker$HEAD_PARTS_$$[3]));
    $aSb$$47$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$21$$ + 11]);
    $aSb$$47$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$21$$ + 12]);
    $aSb$$47$$.append($colCounter$$4$$);
    $aSb$$47$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$21$$ + 13]);
    $rflect$cal$MainPaneBuilder$forEachChip_$$($aSb$$47$$, $aOffset$$21$$ + 14, $JSCompiler_StaticMethods_buildWeekGridCols_$self$$.$eventManager_$, $JSCompiler_StaticMethods_buildWeekGridCols_$self$$.$blockPoolWeek_$, $colCounter$$4$$, $rflect$cal$MainPaneBuilder$buildWeekBlockChip_$$);
    $aSb$$47$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$21$$ + 25]);
    $aSb$$47$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$21$$ + 26])
  }
}
function $rflect$cal$MainPaneBuilder$buildWeekBlockChip_$$($aSb$$48$$, $aOffset$$22$$, $aEventManager$$3_event$$6$$, $aChip$$5$$, $aTotalCols_lastCol$$, $aStartCol$$, $aColSpan$$) {
  var $pixelStart_shift$$ = 24 * $aChip$$5$$.start / 30, $pixelHeight$$ = 24 * ($aChip$$5$$.end - $aChip$$5$$.start) / 30, $widthQuant$$ = 100 / $aTotalCols_lastCol$$;
  $aEventManager$$3_event$$6$$ = $aEventManager$$3_event$$6$$.$events_$[$aChip$$5$$.$eventId$];
  $aTotalCols_lastCol$$ = $aStartCol$$ == $aTotalCols_lastCol$$ - 1;
  $aSb$$48$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$22$$]);
  $aSb$$48$$.append($pixelStart_shift$$);
  $aSb$$48$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$22$$ + 1]);
  $pixelStart_shift$$ = $widthQuant$$ * $aStartCol$$;
  $aSb$$48$$.append($pixelStart_shift$$);
  $aSb$$48$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$22$$ + 2]);
  $aSb$$48$$.append(100 - ($pixelStart_shift$$ + $widthQuant$$ * ($aColSpan$$ * ($aTotalCols_lastCol$$ ? 1 : 1.75) - 0.75 * ($aColSpan$$ - 1))));
  $aSb$$48$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$22$$ + 3]);
  $aSb$$48$$.append($pixelHeight$$ - 2);
  $aSb$$48$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$22$$ + 4]);
  $aSb$$48$$.append(-$pixelHeight$$ + 2);
  $aSb$$48$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$22$$ + 5]);
  $aSb$$48$$.append($aStartCol$$);
  $aSb$$48$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$22$$ + 6]);
  $aSb$$48$$.append($aChip$$5$$.$eventId$);
  $aSb$$48$$.append("ev ");
  $aSb$$48$$.append("");
  $aSb$$48$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$22$$ + 7]);
  $rflect$cal$MainPaneBuilder$buildWeekChipsTimeLabel_$$($aSb$$48$$, $aChip$$5$$, $JSCompiler_alias_TRUE$$);
  $aSb$$48$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$22$$ + 8]);
  $rflect$cal$MainPaneBuilder$buildWeekChipsTimeLabel_$$($aSb$$48$$, $aChip$$5$$, $JSCompiler_alias_FALSE$$);
  $aSb$$48$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$22$$ + 9]);
  $aSb$$48$$.append($aEventManager$$3_event$$6$$.summary);
  $aSb$$48$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$22$$ + 10])
}
function $rflect$cal$MainPaneBuilder$buildMonthBlockChip_$$($aSb$$49$$, $aOffset$$23$$, $aEventManager$$4_event$$7$$, $aChip$$6$$, $aTotalCols$$1_cellStart$$, $aStartCol$$1$$, $aColSpan$$1_cellWidth$$, $opt_allDay$$) {
  $aTotalCols$$1_cellStart$$ = $aChip$$6$$.start;
  $aColSpan$$1_cellWidth$$ = $aChip$$6$$.end - $aChip$$6$$.start;
  var $widthQuant$$1$$ = 100 / 7;
  $aEventManager$$4_event$$7$$ = $aEventManager$$4_event$$7$$.$events_$[$aChip$$6$$.$eventId$];
  $aSb$$49$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$23$$]);
  $aSb$$49$$.append(!$opt_allDay$$ && $widthQuant$$1$$ * $aTotalCols$$1_cellStart$$);
  $aSb$$49$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$23$$ + 1]);
  $aSb$$49$$.append(!$opt_allDay$$ && 100 - $widthQuant$$1$$ * ($aTotalCols$$1_cellStart$$ + $aColSpan$$1_cellWidth$$));
  $aSb$$49$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$23$$ + 2]);
  $aSb$$49$$.append(17 * $aStartCol$$1$$);
  $aSb$$49$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$23$$ + 3]);
  $aChip$$6$$.$startIsCut$ && $aSb$$49$$.append("event-rect-mn-collapse-left");
  $aChip$$6$$.$endIsCut$ && $aSb$$49$$.append(" event-rect-mn-collapse-right");
  $aSb$$49$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$23$$ + 4]);
  $aSb$$49$$.append($aChip$$6$$.$eventId$);
  $aSb$$49$$.append("ev ");
  $opt_allDay$$ && $aSb$$49$$.append("event-rect-all-day ");
  $aChip$$6$$.$startIsCut$ && $aSb$$49$$.append("event-rect-mn-inner-collapse-left");
  $aChip$$6$$.$endIsCut$ && $aSb$$49$$.append(" event-rect-mn-inner-collapse-right");
  $aSb$$49$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$23$$ + 5]);
  $aSb$$49$$.append($aEventManager$$4_event$$7$$.summary);
  $aSb$$49$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$23$$ + 6])
}
function $rflect$cal$MainPaneBuilder$buildWeekChipsTimeLabel_$$($aSb$$50$$, $aChip$$7_mins$$, $aStart$$1$$) {
  var $totalMins$$ = $aStart$$1$$ ? $aChip$$7_mins$$.start : $aChip$$7_mins$$.end;
  $aStart$$1$$ && $aChip$$7_mins$$.$startIsCut$ || !$aStart$$1$$ && $aChip$$7_mins$$.$endIsCut$ ? $aSb$$50$$.append("00:00") : ($aChip$$7_mins$$ = $totalMins$$ % 60, $aSb$$50$$.append(($totalMins$$ - $aChip$$7_mins$$) / 60), $aSb$$50$$.append(":"), $aSb$$50$$.append($aChip$$7_mins$$))
}
function $rflect$cal$MainPaneBuilder$forEachChip_$$($aSb$$53$$, $aOffset$$26$$, $aEventManager$$5$$, $aBlockPool_blobs$$, $aColCounter$$2_blobCounter$$, $aFn$$) {
  $aBlockPool_blobs$$ = $aBlockPool_blobs$$.$blocks$[$aColCounter$$2_blobCounter$$].$blobs$;
  $aColCounter$$2_blobCounter$$ = 0;
  for(var $blobLength$$ = $aBlockPool_blobs$$.length;$aColCounter$$2_blobCounter$$ < $blobLength$$;$aColCounter$$2_blobCounter$$++) {
    for(var $blob$$7$$ = $aBlockPool_blobs$$[$aColCounter$$2_blobCounter$$].blob, $totalCols$$ = $aBlockPool_blobs$$[$aColCounter$$2_blobCounter$$].$totalCols$, $blobEntryCounter$$ = 0, $blobEntriesLength$$ = $blob$$7$$.length;$blobEntryCounter$$ < $blobEntriesLength$$;$blobEntryCounter$$++) {
      var $blobEntry$$ = $blob$$7$$[$blobEntryCounter$$];
      $aFn$$($aSb$$53$$, $aOffset$$26$$, $aEventManager$$5$$, $blobEntry$$.$chip$, $totalCols$$, $blobEntry$$.$startCol$, $blobEntry$$.colSpan)
    }
  }
}
$rflect$cal$MainPaneBuilder$$.prototype.$buildMonthGridRows_$ = function $$rflect$cal$MainPaneBuilder$$$$$buildMonthGridRows_$$($aSb$$54$$, $aOffset$$27$$) {
  for(var $rowCounter$$3$$ = 0, $rowsNumber$$1$$ = this.$blockPoolMonth_$.$blocksNumber_$;$rowCounter$$3$$ < $rowsNumber$$1$$;$rowCounter$$3$$++) {
    0 < $rowCounter$$3$$ && $aSb$$54$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$]), $aSb$$54$$.append($rowCounter$$3$$), $aSb$$54$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 1]), $rowCounter$$3$$ == $rowsNumber$$1$$ - 1 && $aSb$$54$$.append("monthgrid-row-last"), $aSb$$54$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 2]), $aSb$$54$$.append(this.$blockPoolMonth_$.$blocks$[$rowCounter$$3$$].size - 1), $aSb$$54$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 
    3]), $aSb$$54$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 4]), $aSb$$54$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 5]), $aSb$$54$$.append($rowCounter$$3$$), $aSb$$54$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 6]), $aSb$$54$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 7]), this.$buildDayCells_$($aSb$$54$$, $aOffset$$27$$ + 8, $rowCounter$$3$$), $aSb$$54$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 
    19]), $aSb$$54$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 20]), $aSb$$54$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 21]), $aSb$$54$$.append($rowCounter$$3$$), $aSb$$54$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 22]), $rflect$cal$MainPaneBuilder$forEachChip_$$($aSb$$54$$, $aOffset$$27$$ + 23, this.$eventManager_$, this.$blockPoolMonth_$, $rowCounter$$3$$, $rflect$cal$MainPaneBuilder$buildMonthBlockChip_$$), 
    $aSb$$54$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 30]), $aSb$$54$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 31]), $aSb$$54$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 32])
  }
};
$rflect$cal$MainPaneBuilder$$.prototype.$buildDayCells_$ = function $$rflect$cal$MainPaneBuilder$$$$$buildDayCells_$$($aSb$$55$$, $aOffset$$28$$, $aRowCounter$$2$$) {
  for(var $daySeries$$3$$ = this.$timeManager_$.$daySeries$, $block$$2$$, $currentMonth$$ = this.$timeManager_$.$basis$.getMonth(), $isInMonthView$$ = 5 == this.$viewManager_$.$currentView$, $colCounter$$5$$ = 0;7 > $colCounter$$5$$;$colCounter$$5$$++) {
    $block$$2$$ = this.$blockPoolMonth_$.$blocks$[$aRowCounter$$2$$], $aSb$$55$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$28$$]), this.$timeManager_$.$currentDay_$ && this.$timeManager_$.$currentDay_$.$equals$(this.$timeManager_$.$daySeries$[7 * $aRowCounter$$2$$ + $colCounter$$5$$], 7) && $aSb$$55$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$28$$ + 1]), $aSb$$55$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$28$$ + 2]), $aSb$$55$$.append(!$block$$2$$.$expanded$ && 
    $block$$2$$.$couldBeExpanded$ ? "expand-sign-mn-collapsed" : $block$$2$$.$expanded$ && $block$$2$$.$couldBeCollapsed$ ? "expand-sign-mn-expanded" : ""), $aSb$$55$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$28$$ + 3]), $aSb$$55$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$28$$ + 4]), $aSb$$55$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$28$$ + 5]), $aSb$$55$$.append(7 * $aRowCounter$$2$$ + $colCounter$$5$$), $aSb$$55$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$28$$ + 
    6]), $isInMonthView$$ && $currentMonth$$ != $daySeries$$3$$[7 * $aRowCounter$$2$$ + $colCounter$$5$$].getMonth() && $aSb$$55$$.append("dl-other-month"), $aSb$$55$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$28$$ + 7]), $aSb$$55$$.append($daySeries$$3$$[7 * $aRowCounter$$2$$ + $colCounter$$5$$].getDate()), $aSb$$55$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$28$$ + 8]), $aSb$$55$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$28$$ + 
    9]), $aSb$$55$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$28$$ + 10])
  }
};
function $rflect$cal$ui$EditDialog$$() {
  $rflect$ui$Dialog$$.call(this, $JSCompiler_alias_VOID$$, $JSCompiler_alias_VOID$$, $JSCompiler_alias_VOID$$, $goog$ui$FlatButtonRenderer$$.$getInstance$());
  this.$title_$ = "Edit event";
  this.$titleTextEl_$ && $goog$dom$setTextContent$$(this.$titleTextEl_$, "Edit event");
  $JSCompiler_alias_FALSE$$ != this.$modal_$ && $JSCompiler_StaticMethods_setModalInternal_$$(this);
  $JSCompiler_StaticMethods_setBackgroundElementOpacity$$(this, 0);
  var $JSCompiler_inline_result$$60_edit$$inline_593$$;
  $JSCompiler_inline_result$$60_edit$$inline_593$$ = $rflect$ui$Dialog$ButtonSet$getButton$$("Edit");
  var $del$$inline_594$$ = $rflect$ui$Dialog$ButtonSet$getButton$$("Delete"), $cancel$$inline_595$$ = $rflect$ui$Dialog$ButtonSet$getButton$$("Cancel");
  $JSCompiler_inline_result$$60_edit$$inline_593$$ = $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$(new $rflect$ui$Dialog$ButtonSet$$, $JSCompiler_inline_result$$60_edit$$inline_593$$, $JSCompiler_alias_TRUE$$, $JSCompiler_alias_FALSE$$, $JSCompiler_alias_TRUE$$), $del$$inline_594$$, $JSCompiler_alias_FALSE$$, $JSCompiler_alias_TRUE$$), $cancel$$inline_595$$, $JSCompiler_alias_FALSE$$, $JSCompiler_alias_TRUE$$);
  $JSCompiler_StaticMethods_setButtonSet$$(this, $JSCompiler_inline_result$$60_edit$$inline_593$$);
  this.$setContent$('<div id="ed-event-time" class="event-time"></div><a id="ed-event-edit" class="event-edit-link goog-inline-block" href="javascript:void(0)"></a>')
}
$goog$inherits$$($rflect$cal$ui$EditDialog$$, $rflect$ui$Dialog$$);
$rflect$cal$ui$EditDialog$$.prototype.$enterDocument$ = function $$rflect$cal$ui$EditDialog$$$$$enterDocument$$() {
  this.$eventNameLink_$ = this.$getDomHelper$().$getElement$("ed-event-edit");
  this.$eventTimeCont_$ = this.$getDomHelper$().$getElement$("ed-event-time");
  $rflect$cal$ui$EditDialog$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$eventNameLink_$, "click", this.$onEditClick_$, $JSCompiler_alias_FALSE$$, this)
};
$rflect$cal$ui$EditDialog$$.prototype.$onEditClick_$ = function $$rflect$cal$ui$EditDialog$$$$$onEditClick_$$() {
  this.dispatchEvent({type:"editevent"}) && this.$setVisible$($JSCompiler_alias_FALSE$$)
};
$rflect$cal$ui$EditDialog$$.prototype.$dispose$ = function $$rflect$cal$ui$EditDialog$$$$$dispose$$() {
  $rflect$cal$ui$EditDialog$$.$superClass_$.$dispose$.call(this);
  this.$eventNameLink_$ = this.$eventTimeCont_$ = $JSCompiler_alias_NULL$$
};
for(var $rflect$pagevis$nameOfHiddenProperty_$$, $rflect$pagevis$nameOfVisibilityChangeEvent$$, $rflect$pagevis$VENDOR_HIDDEN_NAMES$$ = ["hidden", "msHidden", "mozHidden", "webkitHidden"], $rflect$pagevis$VENDOR_VISIBILITYCHANGE_NAMES$$ = ["visibilitychange", "msvisibilitychange", "mozvisibilitychange", "webkitvisibilitychange"], $vendorCounter$$inline_597$$ = 0;$vendorCounter$$inline_597$$ < $rflect$pagevis$VENDOR_HIDDEN_NAMES$$.length;$vendorCounter$$inline_597$$++) {
  if($rflect$pagevis$VENDOR_HIDDEN_NAMES$$[$vendorCounter$$inline_597$$] in document) {
    $rflect$pagevis$nameOfHiddenProperty_$$ = $rflect$pagevis$VENDOR_HIDDEN_NAMES$$[$vendorCounter$$inline_597$$];
    $rflect$pagevis$nameOfVisibilityChangeEvent$$ = $rflect$pagevis$VENDOR_VISIBILITYCHANGE_NAMES$$[$vendorCounter$$inline_597$$];
    break
  }
}
;function $rflect$cal$TimeMarker$$($aViewManager$$9$$, $aTimeManager$$6$$) {
  this.$viewManager_$ = $aViewManager$$9$$;
  this.$timeManager_$ = $aTimeManager$$6$$;
  $rflect$pagevis$nameOfHiddenProperty_$$ && $rflect$pagevis$nameOfVisibilityChangeEvent$$ && (this.$evKey_$ = $goog$events$listen$$(document, $rflect$pagevis$nameOfVisibilityChangeEvent$$, this.$onTick_$, $JSCompiler_alias_FALSE$$, this))
}
$goog$inherits$$($rflect$cal$TimeMarker$$, $goog$Disposable$$);
var $rflect$cal$TimeMarker$HEAD_PARTS_$$ = ['<div id="time-marker-head" style="top:', 'px;" class="time-marker-head"></div>', '<div id="time-marker" style="top:', 'px;" class="time-marker"></div>'];
$rflect$cal$TimeMarker$$.prototype.$onTick_$ = function $$rflect$cal$TimeMarker$$$$$onTick_$$($opt_event$$) {
  if((!$rflect$pagevis$nameOfHiddenProperty_$$ || !$rflect$pagevis$nameOfVisibilityChangeEvent$$ || !document[$rflect$pagevis$nameOfHiddenProperty_$$]) && $JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$)) {
    var $today$$1$$ = new Date, $headEl_index$$66$$ = $goog$dom$getElement$$("time-marker-head");
    $headEl_index$$66$$ && ($headEl_index$$66$$.style.top = $JSCompiler_StaticMethods_getPosition_$$($JSCompiler_alias_TRUE$$, $today$$1$$) + "px");
    if(this.$timeManager_$.$isInNowPoint$) {
      var $headEl_index$$66$$ = $JSCompiler_StaticMethods_getIndexOfTodayBlock_$$(this, $today$$1$$), $lineEl$$ = $goog$dom$removeNode$$($goog$dom$getElement$$("time-marker")) || $goog$dom$createDom$$("div", {id:"time-marker", className:"time-marker"});
      $lineEl$$ && ($lineEl$$.style.top = $JSCompiler_StaticMethods_getPosition_$$($JSCompiler_alias_FALSE$$, $today$$1$$) + "px");
      $goog$dom$getElement$$("wk-dec-layer-in-col" + $headEl_index$$66$$).appendChild($lineEl$$)
    }
  }
  $opt_event$$ && this.stop();
  this.start()
};
function $JSCompiler_StaticMethods_getPosition_$$($aHead$$, $opt_today$$) {
  var $pixelPos_today$$2$$ = $opt_today$$ || new Date, $pixelPos_today$$2$$ = 24 * (60 * $pixelPos_today$$2$$.getHours() + $pixelPos_today$$2$$.getMinutes()) / 30;
  return $aHead$$ ? $pixelPos_today$$2$$ - 2.5 : $pixelPos_today$$2$$ - 0.5
}
function $JSCompiler_StaticMethods_getIndexOfTodayBlock_$$($JSCompiler_StaticMethods_getIndexOfTodayBlock_$self$$, $aToday$$) {
  return $goog$array$findIndex$$($JSCompiler_StaticMethods_getIndexOfTodayBlock_$self$$.$timeManager_$.$daySeries$, function($aDate$$9$$) {
    return $aDate$$9$$.$equals$($aToday$$, 7)
  })
}
$rflect$cal$TimeMarker$$.prototype.start = function $$rflect$cal$TimeMarker$$$$start$() {
  this.$timer_$ = setTimeout($goog$bind$$(this.$onTick_$, this), 6E4)
};
$rflect$cal$TimeMarker$$.prototype.stop = function $$rflect$cal$TimeMarker$$$$stop$() {
  clearTimeout(this.$timer_$)
};
$rflect$cal$TimeMarker$$.prototype.$disposeInternal$ = function $$rflect$cal$TimeMarker$$$$$disposeInternal$$() {
  $rflect$cal$TimeMarker$$.$superClass_$.$disposeInternal$.call(this);
  this.stop();
  $goog$events$unlistenByKey$$(this.$evKey_$)
};
function $rflect$cal$MainPaneSelectionMask$$($aViewManager$$10$$, $aMainPane$$1$$, $aTimeManager$$7$$, $opt_blockPoolWeek$$, $opt_blockPoolAllday$$, $opt_blockPoolMonth$$) {
  $rflect$cal$SelectionMask$$.call(this, $aViewManager$$10$$, $aMainPane$$1$$, $aTimeManager$$7$$);
  this.$blockPoolWeek_$ = $opt_blockPoolWeek$$;
  this.$blockPoolAllday_$ = $opt_blockPoolAllday$$;
  this.$blockPoolMonth_$ = $opt_blockPoolMonth$$;
  this.$additionalClassNames$ = "mainpane-mask"
}
$goog$inherits$$($rflect$cal$MainPaneSelectionMask$$, $rflect$cal$SelectionMask$$);
$JSCompiler_prototypeAlias$$ = $rflect$cal$MainPaneSelectionMask$$.prototype;
$JSCompiler_prototypeAlias$$.$isWeekOrAllday_$ = function $$JSCompiler_prototypeAlias$$$$isWeekOrAllday_$$() {
  return 2 == this.$configuration_$ || 1 == this.$configuration_$
};
$JSCompiler_prototypeAlias$$.$isHorizontal$ = $rflect$cal$MainPaneSelectionMask$$.prototype.$isWeekOrAllday_$;
$JSCompiler_prototypeAlias$$.close = function $$JSCompiler_prototypeAlias$$$close$() {
  $goog$style$showElement$$(this.$maskEl_$, $JSCompiler_alias_FALSE$$);
  this.$initialized_$ = $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.update = function $$JSCompiler_prototypeAlias$$$update$($aEvent$$14_currentCell$$1$$) {
  var $pageScroll$$1$$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$(this.$document_$));
  $aEvent$$14_currentCell$$1$$ = $JSCompiler_StaticMethods_getCellByCoordinate_$$(this, $aEvent$$14_currentCell$$1$$.clientX + $pageScroll$$1$$.x - this.$elementOffset_$.x + this.$scrollableEl_$.scrollLeft, $aEvent$$14_currentCell$$1$$.clientY + $pageScroll$$1$$.y - this.$elementOffset_$.y + this.$scrollableEl_$.scrollTop);
  $goog$math$Coordinate$equals$$(this.$currentCell_$, $aEvent$$14_currentCell$$1$$) || (this.$currentCell_$ = $aEvent$$14_currentCell$$1$$, this.$update_$())
};
$JSCompiler_prototypeAlias$$.$init$ = function $$JSCompiler_prototypeAlias$$$$init$$($aConfiguration$$2$$, $opt_event$$1$$) {
  $rflect$cal$SelectionMask$$.prototype.$init$.call(this, $aConfiguration$$2$$);
  var $doc$$42_pageScroll$$2$$ = this.$document_$ || (this.$document_$ = $goog$dom$getOwnerDocument$$(this.$component_$.$getElement$())), $doc$$42_pageScroll$$2$$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$($doc$$42_pageScroll$$2$$)), $coordX_coordXWithoutScroll$$ = 0, $coordYWithoutScroll$$ = 0, $coordY$$ = $coordX_coordXWithoutScroll$$ = 0;
  this.$elementOffset_$ = new $goog$math$Coordinate$$(0, 0);
  this.$isWeekOrAllday_$() ? (1 == this.$configuration_$ ? (this.$scrollableEl_$ = $goog$dom$getElement$$("main-pane-header-scrollable"), this.$maskEl_$ = $goog$dom$getElement$$("wk-ad-mask-cnt"), this.$elementOffset_$ = $goog$style$getRelativePosition$$(this.$scrollableEl_$), this.$elementOffset_$.x += 1) : (this.$scrollableEl_$ = $goog$dom$getElement$$("main-pane-body-scrollable-wk"), this.$maskEl_$ = $goog$dom$getElement$$("wk-mask-cnt"), this.$elementOffset_$ = $goog$style$getRelativePosition$$(this.$scrollableEl_$), 
  this.$elementOffset_$.x += 62), this.$elementOffset_$.y += 1) : 3 == this.$configuration_$ && (this.$scrollableEl_$ = $goog$dom$getElement$$("main-pane-body-scrollable-mn"), this.$maskEl_$ = $goog$dom$getElement$$("mn-mask-cnt"), this.$elementOffset_$ = $goog$style$getRelativePosition$$(this.$scrollableEl_$), this.$elementOffset_$.x += 17, this.$elementOffset_$.y += 1);
  $coordX_coordXWithoutScroll$$ = $opt_event$$1$$.clientX + $doc$$42_pageScroll$$2$$.x - this.$elementOffset_$.x;
  $coordYWithoutScroll$$ = $opt_event$$1$$.clientY + $doc$$42_pageScroll$$2$$.y - this.$elementOffset_$.y;
  $coordX_coordXWithoutScroll$$ += this.$scrollableEl_$.scrollLeft;
  $coordY$$ = $coordYWithoutScroll$$ + this.$scrollableEl_$.scrollTop;
  $coordYWithoutScroll$$ >= this.$scrollableEl_$.offsetHeight || 0 > $coordYWithoutScroll$$ || (this.$startCell_$ = $JSCompiler_StaticMethods_getCellByCoordinate_$$(this, $coordX_coordXWithoutScroll$$, $coordY$$), this.$currentCell_$ = this.$startCell_$.$clone$(), $_log$$("coord: ", new $goog$math$Coordinate$$($coordX_coordXWithoutScroll$$, $coordY$$)), $_log$$("this.startCell_", this.$startCell_$), $_log$$("this.currentCell_", this.$currentCell_$), $goog$style$showElement$$(this.$maskEl_$, $JSCompiler_alias_TRUE$$), 
  this.$initialized_$ = $JSCompiler_alias_TRUE$$, this.$update_$())
};
function $JSCompiler_StaticMethods_getCellByCoordinate_$$($JSCompiler_StaticMethods_getCellByCoordinate_$self$$, $aX$$1$$, $aY$$1$$) {
  var $cell$$1$$ = new $goog$math$Coordinate$$(0, 0), $maxX$$1$$ = 0, $maxY$$1$$ = 0;
  $JSCompiler_StaticMethods_getCellByCoordinate_$self$$.$isWeekOrAllday_$() ? ($maxX$$1$$ = $JSCompiler_StaticMethods_getCellByCoordinate_$self$$.$blockPoolWeek_$.$blocksNumber_$ - 1, $cell$$1$$.x = $JSCompiler_StaticMethods_getBlockIndexByCoordinate_$$($aX$$1$$, $JSCompiler_StaticMethods_getCellByCoordinate_$self$$.$blockPoolWeek_$), 1 == $JSCompiler_StaticMethods_getCellByCoordinate_$self$$.$configuration_$ ? ($maxY$$1$$ = 0, $cell$$1$$.y = 0) : ($maxY$$1$$ = 47, $cell$$1$$.y = Math.floor($aY$$1$$ / 
  24))) : ($maxX$$1$$ = 6, $maxY$$1$$ = $JSCompiler_StaticMethods_getCellByCoordinate_$self$$.$blockPoolMonth_$.$blocksNumber_$ - 1, $cell$$1$$.y = $JSCompiler_StaticMethods_getBlockIndexByCoordinate_$$($aY$$1$$, $JSCompiler_StaticMethods_getCellByCoordinate_$self$$.$blockPoolMonth_$), $cell$$1$$.x = Math.floor($aX$$1$$ / ($JSCompiler_StaticMethods_getCellByCoordinate_$self$$.$blockPoolMonth_$.$gridSize$.width / 7)));
  0 > $cell$$1$$.x && ($cell$$1$$.x = 0);
  $cell$$1$$.x > $maxX$$1$$ && ($cell$$1$$.x = $maxX$$1$$);
  0 > $cell$$1$$.y && ($cell$$1$$.y = 0);
  $cell$$1$$.y > $maxY$$1$$ && ($cell$$1$$.y = $maxY$$1$$);
  return $cell$$1$$
}
function $JSCompiler_StaticMethods_getBlockIndexByCoordinate_$$($aCoord$$, $aBlockPool$$1$$) {
  for(var $blocksNumber$$6$$ = $aBlockPool$$1$$.$blocksNumber_$, $counter$$19$$ = 0, $index$$67$$ = 0;$counter$$19$$ < $blocksNumber$$6$$ && $aCoord$$ > $aBlockPool$$1$$.$blocks$[$counter$$19$$].position;) {
    $index$$67$$ = $counter$$19$$++
  }
  return $index$$67$$
}
function $JSCompiler_StaticMethods_getCellCoord_$$($JSCompiler_StaticMethods_getCellCoord_$self$$, $aCellOrIndex$$, $aBlockDependent$$) {
  var $coord$$5$$ = 0;
  return $coord$$5$$ = $JSCompiler_StaticMethods_getCellCoord_$self$$.$isWeekOrAllday_$() ? $aBlockDependent$$ ? $aCellOrIndex$$.x : $aCellOrIndex$$.y : $aBlockDependent$$ ? $aCellOrIndex$$.y : $aCellOrIndex$$.x
}
function $JSCompiler_StaticMethods_getBlockPositionOrSize_$$($JSCompiler_StaticMethods_getBlockPositionOrSize_$self_block$$3$$, $aCellOrIndex$$1$$, $aPosition$$) {
  $JSCompiler_StaticMethods_getBlockPositionOrSize_$self_block$$3$$ = ($JSCompiler_StaticMethods_getBlockPositionOrSize_$self_block$$3$$.$isWeekOrAllday_$() ? $JSCompiler_StaticMethods_getBlockPositionOrSize_$self_block$$3$$.$blockPoolWeek_$ : $JSCompiler_StaticMethods_getBlockPositionOrSize_$self_block$$3$$.$blockPoolMonth_$).$blocks$["number" == typeof $aCellOrIndex$$1$$ ? $aCellOrIndex$$1$$ : $JSCompiler_StaticMethods_getBlockPositionOrSize_$self_block$$3$$.$isWeekOrAllday_$() ? $aCellOrIndex$$1$$.x : 
  $aCellOrIndex$$1$$.y];
  return $aPosition$$ ? $JSCompiler_StaticMethods_getBlockPositionOrSize_$self_block$$3$$.position : $JSCompiler_StaticMethods_getBlockPositionOrSize_$self_block$$3$$.size
}
$JSCompiler_prototypeAlias$$.$getRect_$ = function $$JSCompiler_prototypeAlias$$$$getRect_$$($aX$$2$$, $aY$$2$$, $aDx$$1$$, $aDy$$1$$) {
  return 1 == this.$configuration_$ ? new $goog$math$Rect$$($aX$$2$$, $aY$$2$$, $aDx$$1$$, $aDy$$1$$) : 3 == this.$configuration_$ ? new $goog$math$Rect$$($aY$$2$$, $aX$$2$$, $aDy$$1$$, $aDx$$1$$) : new $goog$math$Rect$$($aX$$2$$, $aY$$2$$, $aDx$$1$$, $aDy$$1$$)
};
$JSCompiler_prototypeAlias$$.$update_$ = function $$JSCompiler_prototypeAlias$$$$update_$$() {
  var $maxCell$$2$$, $minCell$$2$$;
  this.$rects_$.length = 0;
  if(this.$initialized_$) {
    $minCell$$2$$ = -1 == $JSCompiler_StaticMethods_compareCells_$$(this, this.$startCell_$, this.$currentCell_$) ? this.$startCell_$ : this.$currentCell_$;
    $maxCell$$2$$ = 1 == $JSCompiler_StaticMethods_compareCells_$$(this, this.$startCell_$, this.$currentCell_$) ? this.$startCell_$ : this.$currentCell_$;
    var $startCellPrimaryCoord$$ = $JSCompiler_StaticMethods_getCellCoord_$$(this, this.$startCell_$, $JSCompiler_alias_TRUE$$), $startCellSecondaryCoord$$ = $JSCompiler_StaticMethods_getCellCoord_$$(this, this.$startCell_$, $JSCompiler_alias_FALSE$$), $currentCellPrimaryCoord$$ = $JSCompiler_StaticMethods_getCellCoord_$$(this, this.$currentCell_$, $JSCompiler_alias_TRUE$$), $currentCellSecondaryCoord$$ = $JSCompiler_StaticMethods_getCellCoord_$$(this, this.$currentCell_$, $JSCompiler_alias_FALSE$$), 
    $blockPositionForStartCell$$ = $JSCompiler_StaticMethods_getBlockPositionOrSize_$$(this, this.$startCell_$, $JSCompiler_alias_TRUE$$), $blockPositionForCurrentCell$$ = $JSCompiler_StaticMethods_getBlockPositionOrSize_$$(this, this.$currentCell_$, $JSCompiler_alias_TRUE$$), $blockSizeForStartCell$$ = $JSCompiler_StaticMethods_getBlockPositionOrSize_$$(this, this.$startCell_$, $JSCompiler_alias_FALSE$$), $blockSizeForCurrentCell$$ = $JSCompiler_StaticMethods_getBlockPositionOrSize_$$(this, this.$currentCell_$, 
    $JSCompiler_alias_FALSE$$), $defaultStep_step$$inline_600$$;
    $defaultStep_step$$inline_600$$ = 0;
    $defaultStep_step$$inline_600$$ = 1 == this.$configuration_$ ? this.$blockPoolAllday_$.$gridSize$.height : 2 == this.$configuration_$ ? 24 : this.$blockPoolMonth_$.$gridSize$.width / 7;
    var $maxSize$$1_size$$inline_603$$;
    $maxSize$$1_size$$inline_603$$ = 0;
    $maxSize$$1_size$$inline_603$$ = 1 == this.$configuration_$ ? this.$blockPoolAllday_$.$gridSize$.height : 2 == this.$configuration_$ ? 1152 : this.$blockPoolMonth_$.$gridSize$.width;
    var $minIndex$$ = 0, $maxIndex$$ = 0;
    $startCellPrimaryCoord$$ == $currentCellPrimaryCoord$$ ? ($minIndex$$ = Math.min($startCellSecondaryCoord$$, $currentCellSecondaryCoord$$), $maxIndex$$ = Math.max($startCellSecondaryCoord$$, $currentCellSecondaryCoord$$), this.$rects_$.push(this.$getRect_$($blockPositionForStartCell$$, $minIndex$$ * $defaultStep_step$$inline_600$$, $blockSizeForStartCell$$, ($maxIndex$$ - $minIndex$$ + 1) * $defaultStep_step$$inline_600$$))) : (this.$rects_$.push(this.$getRect_$($blockPositionForStartCell$$, 
    $currentCellPrimaryCoord$$ > $startCellPrimaryCoord$$ ? $startCellSecondaryCoord$$ * $defaultStep_step$$inline_600$$ : 0, $blockSizeForStartCell$$, $currentCellPrimaryCoord$$ > $startCellPrimaryCoord$$ ? $maxSize$$1_size$$inline_603$$ - $startCellSecondaryCoord$$ * $defaultStep_step$$inline_600$$ : ($startCellSecondaryCoord$$ + 1) * $defaultStep_step$$inline_600$$)), this.$rects_$.push(this.$getRect_$($blockPositionForCurrentCell$$, $currentCellPrimaryCoord$$ > $startCellPrimaryCoord$$ ? 0 : 
    $currentCellSecondaryCoord$$ * $defaultStep_step$$inline_600$$, $blockSizeForCurrentCell$$, $currentCellPrimaryCoord$$ > $startCellPrimaryCoord$$ ? ($currentCellSecondaryCoord$$ + 1) * $defaultStep_step$$inline_600$$ : $maxSize$$1_size$$inline_603$$ - $currentCellSecondaryCoord$$ * $defaultStep_step$$inline_600$$)), 1 < Math.abs($currentCellPrimaryCoord$$ - $startCellPrimaryCoord$$) && ($minIndex$$ = Math.min($startCellPrimaryCoord$$, $currentCellPrimaryCoord$$), $maxIndex$$ = Math.max($startCellPrimaryCoord$$, 
    $currentCellPrimaryCoord$$), this.$rects_$.push(this.$getRect_$($JSCompiler_StaticMethods_getBlockPositionOrSize_$$(this, $minIndex$$ + 1, $JSCompiler_alias_TRUE$$), 0, $JSCompiler_StaticMethods_getBlockPositionOrSize_$$(this, $maxIndex$$, $JSCompiler_alias_TRUE$$) - $JSCompiler_StaticMethods_getBlockPositionOrSize_$$(this, $minIndex$$ + 1, $JSCompiler_alias_TRUE$$), $maxSize$$1_size$$inline_603$$))));
    $JSCompiler_StaticMethods_calculateDates_$$(this, $minCell$$2$$, $maxCell$$2$$);
    this.$maskEl_$.innerHTML = $JSCompiler_StaticMethods_build_$$(this)
  }
};
function $rflect$cal$MainPane$$($aViewManager$$11$$, $aTimeManager$$8$$, $aEventManager$$6$$, $aContainerSizeMonitor$$4$$, $aBlockManager$$) {
  $goog$ui$Component$$.call(this, $JSCompiler_alias_VOID$$);
  this.$viewManager_$ = $aViewManager$$11$$;
  this.$timeManager_$ = $aTimeManager$$8$$;
  this.$eventManager_$ = $aEventManager$$6$$;
  this.$containerSizeMonitor_$ = $aContainerSizeMonitor$$4$$;
  this.$blockManager_$ = $aBlockManager$$;
  this.$timeMarker_$ = new $rflect$cal$TimeMarker$$($aViewManager$$11$$, $aTimeManager$$8$$);
  this.$mainPaneBuilder_$ = new $rflect$cal$MainPaneBuilder$$(this.$viewManager_$, this, $aTimeManager$$8$$, this.$eventManager_$, this.$blockManager_$.$blockPoolWeek$, this.$blockManager_$.$blockPoolAllday$, this.$blockManager_$.$blockPoolMonth$, this.$containerSizeMonitor_$, this.$timeMarker_$);
  $_inspect$$("mainPaneBuilder", this.$mainPaneBuilder_$);
  this.$selectionMask_$ = new $rflect$cal$MainPaneSelectionMask$$($aViewManager$$11$$, this, $aTimeManager$$8$$, this.$blockManager_$.$blockPoolWeek$, this.$blockManager_$.$blockPoolAllday$, this.$blockManager_$.$blockPoolMonth$);
  $_inspect$$("selectionMask", this.$selectionMask_$);
  this.$alldayGridSize$ = this.$alldayGridContainerSize$ = this.$gridSize$ = this.$gridContainerSize$ = this.$scrollablesCombinedWkSize_$ = $JSCompiler_alias_NULL$$;
  this.$scrollListenersKeys_$ = [];
  this.$moRegistry_$ = new $rflect$cal$MouseOverRegistry$$;
  this.$saveDialog_$ = new $rflect$cal$ui$SaveDialog$$;
  $_inspect$$("saveDialog_", this.$saveDialog_$);
  $JSCompiler_StaticMethods_addChild$$(this, this.$saveDialog_$);
  this.$editDialog_$ = new $rflect$cal$ui$EditDialog$$;
  $_inspect$$("editDialog_", this.$editDialog_$);
  $JSCompiler_StaticMethods_addChild$$(this, this.$editDialog_$)
}
$goog$inherits$$($rflect$cal$MainPane$$, $rflect$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $rflect$cal$MainPane$$.prototype;
$JSCompiler_prototypeAlias$$.$updateBeforeRedraw$ = function $$JSCompiler_prototypeAlias$$$$updateBeforeRedraw$$() {
  var $alldayBlockMaxHeight_containerSize$$ = this.$containerSizeMonitor_$.$getSize$();
  516 > $alldayBlockMaxHeight_containerSize$$.width && ($alldayBlockMaxHeight_containerSize$$.width = 516);
  374 > $alldayBlockMaxHeight_containerSize$$.height && ($alldayBlockMaxHeight_containerSize$$.height = 374);
  $JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$) ? (this.$scrollablesCombinedWkSize_$ = $alldayBlockMaxHeight_containerSize$$.$clone$(), this.$scrollablesCombinedWkSize_$.height -= 113, this.$scrollablesCombinedWkSize_$.width -= 229, this.$scrollablesCombinedWkSize_$.width -= this.$containerSizeMonitor_$.$scrollbarWidth$, this.$alldayGridContainerSize$ = this.$scrollablesCombinedWkSize_$.$clone$(), this.$gridContainerSize$ = this.$scrollablesCombinedWkSize_$.$clone$(), this.$gridSize$ = 
  this.$gridContainerSize$.$clone$(), this.$gridSize$.height = 1152, this.$blockManager_$.$blockPoolAllday$.$expanded$ || (this.$alldayGridContainerSize$.height = 47, this.$alldayGridSize$ = this.$alldayGridContainerSize$.$clone$())) : $JSCompiler_StaticMethods_isInMonthMode$$(this.$viewManager_$) && (this.$gridContainerSize$ = $alldayBlockMaxHeight_containerSize$$.$clone$(), this.$gridContainerSize$.height -= 78, this.$gridContainerSize$.width -= 196, this.$gridSize$ = this.$gridContainerSize$.$clone$(), 
  this.$gridSize$.width -= $JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$) || $JSCompiler_StaticMethods_isInMonthMode$$(this.$viewManager_$) && this.$blockManager_$.$blockPoolMonth$.$expanded$ ? this.$containerSizeMonitor_$.$scrollbarWidth$ : 0);
  $JSCompiler_StaticMethods_updateBlockManager$$(this);
  $JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$) && (this.$blockManager_$.$blockPoolAllday$.$expanded$ && ($alldayBlockMaxHeight_containerSize$$ = 0, $alldayBlockMaxHeight_containerSize$$ = Math.floor(this.$scrollablesCombinedWkSize_$.height / 2), this.$alldayGridContainerSize$.height = this.$alldayGridSize$.height > $alldayBlockMaxHeight_containerSize$$ ? $alldayBlockMaxHeight_containerSize$$ : this.$alldayGridSize$.height), this.$gridContainerSize$.height = this.$scrollablesCombinedWkSize_$.height - 
  this.$alldayGridContainerSize$.height, this.$alldayGridContainerSize$.height += this.$blockManager_$.$blockPoolWeek$.$expanded$ ? this.$containerSizeMonitor_$.$scrollbarWidth$ : 0, 1152 < this.$gridContainerSize$.height && (this.$gridContainerSize$.height = 1152 + ($JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$) && this.$blockManager_$.$blockPoolWeek$.$expanded$ ? this.$containerSizeMonitor_$.$scrollbarWidth$ : 0)));
  $JSCompiler_StaticMethods_removeScrollListeners_$$(this)
};
function $JSCompiler_StaticMethods_removeScrollListeners_$$($JSCompiler_StaticMethods_removeScrollListeners_$self$$) {
  $goog$array$forEach$$($JSCompiler_StaticMethods_removeScrollListeners_$self$$.$scrollListenersKeys_$, function($aKey$$) {
    $goog$events$unlistenByKey$$($aKey$$)
  });
  $JSCompiler_StaticMethods_removeScrollListeners_$self$$.$scrollListenersKeys_$.length = 0
}
function $JSCompiler_StaticMethods_updateBlockManager$$($JSCompiler_StaticMethods_updateBlockManager$self$$) {
  var $JSCompiler_StaticMethods_setSizes$self$$inline_607$$ = $JSCompiler_StaticMethods_updateBlockManager$self$$.$blockManager_$, $aGridSize$$inline_608$$ = $JSCompiler_StaticMethods_updateBlockManager$self$$.$gridSize$, $aGridContainerSize$$inline_609$$ = $JSCompiler_StaticMethods_updateBlockManager$self$$.$gridContainerSize$, $opt_alldayGridSize$$inline_610$$ = $JSCompiler_StaticMethods_updateBlockManager$self$$.$alldayGridSize$, $opt_alldayGridContainerSize$$inline_611$$ = $JSCompiler_StaticMethods_updateBlockManager$self$$.$alldayGridContainerSize$;
  $JSCompiler_StaticMethods_isInWeekMode$$($JSCompiler_StaticMethods_setSizes$self$$inline_607$$.$viewManager_$) ? ($JSCompiler_StaticMethods_setSizes$self$$inline_607$$.$blockPoolWeek$.$gridContainerSize$ = $aGridContainerSize$$inline_609$$, $JSCompiler_StaticMethods_setSizes$self$$inline_607$$.$blockPoolWeek$.$gridSize$ = $aGridSize$$inline_608$$, $JSCompiler_StaticMethods_setSizes$self$$inline_607$$.$blockPoolAllday$.$gridSize$ = $opt_alldayGridSize$$inline_610$$, $JSCompiler_StaticMethods_setSizes$self$$inline_607$$.$blockPoolAllday$.$gridContainerSize$ = 
  $opt_alldayGridContainerSize$$inline_611$$) : $JSCompiler_StaticMethods_isInMonthMode$$($JSCompiler_StaticMethods_setSizes$self$$inline_607$$.$viewManager_$) && ($JSCompiler_StaticMethods_setSizes$self$$inline_607$$.$blockPoolMonth$.$gridContainerSize$ = $aGridContainerSize$$inline_609$$, $JSCompiler_StaticMethods_setSizes$self$$inline_607$$.$blockPoolMonth$.$gridSize$ = $aGridSize$$inline_608$$);
  $JSCompiler_StaticMethods_updateBlockManager$self$$.$blockManager_$.update()
}
$JSCompiler_prototypeAlias$$.$updateByRedraw$ = function $$JSCompiler_prototypeAlias$$$$updateByRedraw$$() {
  this.$getElement$().innerHTML = $JSCompiler_StaticMethods_buildBody$$(this);
  $JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$) ? this.$blockManager_$.$blockPoolWeek$.$expanded$ && this.$scrollListenersKeys_$.push($goog$events$listen$$(this.$dom_$.$getElement$("main-pane-body-scrollable-wk"), "scroll", this.$onMainPaneScrollableScroll_$, $JSCompiler_alias_FALSE$$, this)) : $JSCompiler_StaticMethods_isInMonthMode$$(this.$viewManager_$) && this.$blockManager_$.$blockPoolMonth$.$expanded$ && this.$scrollListenersKeys_$.push($goog$events$listen$$(this.$dom_$.$getElement$("main-pane-body-scrollable-mn"), 
  "scroll", this.$onMainPaneScrollableScroll_$, $JSCompiler_alias_FALSE$$, this));
  $JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$) ? this.$blockManager_$.$blockPoolWeek$.$expanded$ && (this.$dom_$.$getElement$("main-pane-body-scrollable-wk").scrollLeft = this.$dom_$.$getElement$("main-pane-header-scrollable").scrollLeft = this.$blockManager_$.$blockPoolWeek$.scrollLeft) : $JSCompiler_StaticMethods_isInMonthMode$$(this.$viewManager_$) && this.$blockManager_$.$blockPoolMonth$.$expanded$ && (this.$dom_$.$getElement$("main-pane-body-scrollable-mn").scrollTop = this.$blockManager_$.$blockPoolMonth$.scrollTop)
};
$JSCompiler_prototypeAlias$$.$buildBodyInternal$ = function $$JSCompiler_prototypeAlias$$$$buildBodyInternal$$($aSb$$59$$) {
  if($JSCompiler_StaticMethods_isInMonthMode$$(this.$viewManager_$)) {
    for(var $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_615_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_620$$ = this.$mainPaneBuilder_$, $offset$$inline_617_offset$$inline_622$$ = 0, $length$$inline_618_length$$inline_623$$ = $rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$.length;++$offset$$inline_617_offset$$inline_622$$ < $length$$inline_618_length$$inline_623$$ - 1;) {
      switch($aSb$$59$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$offset$$inline_617_offset$$inline_622$$]), $offset$$inline_617_offset$$inline_622$$) {
        case 5:
          var $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$ = 
          $aSb$$59$$;
          $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_615_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_620$$.$blockPoolMonth_$.$expanded$ ? $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.append($JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_615_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_620$$.$containerSizeMonitor_$.$scrollbarWidth$ + 
          2) : $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.append(2);
          break;
        case 8:
          for(var $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$ = 
          $aSb$$59$$, $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$ = $offset$$inline_617_offset$$inline_622$$, $aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ = $goog$i18n$DateTimeSymbols_en$$.$FIRSTDAYOFWEEK$, 
          $dateInFirstCol$$inline_949_dayNameNumber$$inline_928_daySeries$$inline_963_gridRowsWidth$$inline_994_prevColsCumulativeSize$$inline_980_rowCounter$$inline_937$$ = 0, $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$ = 0;7 > $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$;$blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$++) {
            0 < $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$ && $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$]), 
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.append($blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$), 
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$ + 
            1]), $dateInFirstCol$$inline_949_dayNameNumber$$inline_928_daySeries$$inline_963_gridRowsWidth$$inline_994_prevColsCumulativeSize$$inline_980_rowCounter$$inline_937$$ = ($aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$ + 
            1) % 7, $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.append($goog$i18n$DateTimeSymbols_en$$.$WEEKDAYS$[$dateInFirstCol$$inline_949_dayNameNumber$$inline_928_daySeries$$inline_963_gridRowsWidth$$inline_994_prevColsCumulativeSize$$inline_980_rowCounter$$inline_937$$]), 
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$ + 
            2])
          }
          $offset$$inline_617_offset$$inline_622$$ += 2;
          break;
        case 15:
          $aSb$$59$$.append($JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_615_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_620$$.$blockPoolMonth_$.$gridContainerSize$.height);
          break;
        case 19:
          $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$ = 
          $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_615_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_620$$;
          $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$ = $aSb$$59$$;
          $aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ = $offset$$inline_617_offset$$inline_622$$;
          $dateInFirstCol$$inline_949_dayNameNumber$$inline_928_daySeries$$inline_963_gridRowsWidth$$inline_994_prevColsCumulativeSize$$inline_980_rowCounter$$inline_937$$ = 0;
          for($blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolMonth_$.$blocksNumber_$;$dateInFirstCol$$inline_949_dayNameNumber$$inline_928_daySeries$$inline_963_gridRowsWidth$$inline_994_prevColsCumulativeSize$$inline_980_rowCounter$$inline_937$$ < 
          $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$;$dateInFirstCol$$inline_949_dayNameNumber$$inline_928_daySeries$$inline_963_gridRowsWidth$$inline_994_prevColsCumulativeSize$$inline_980_rowCounter$$inline_937$$++) {
            0 < $dateInFirstCol$$inline_949_dayNameNumber$$inline_928_daySeries$$inline_963_gridRowsWidth$$inline_994_prevColsCumulativeSize$$inline_980_rowCounter$$inline_937$$ && $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$]), 
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($dateInFirstCol$$inline_949_dayNameNumber$$inline_928_daySeries$$inline_963_gridRowsWidth$$inline_994_prevColsCumulativeSize$$inline_980_rowCounter$$inline_937$$), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 
            1]), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolMonth_$.$blocks$[$dateInFirstCol$$inline_949_dayNameNumber$$inline_928_daySeries$$inline_963_gridRowsWidth$$inline_994_prevColsCumulativeSize$$inline_980_rowCounter$$inline_937$$].size), 
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 2]), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 
            3]), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 4]), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($dateInFirstCol$$inline_949_dayNameNumber$$inline_928_daySeries$$inline_963_gridRowsWidth$$inline_994_prevColsCumulativeSize$$inline_980_rowCounter$$inline_937$$), 
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 5]), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolMonth_$.$blocks$[$dateInFirstCol$$inline_949_dayNameNumber$$inline_928_daySeries$$inline_963_gridRowsWidth$$inline_994_prevColsCumulativeSize$$inline_980_rowCounter$$inline_937$$].$expanded$ ? 
            "mn-row-zippy-expanded" : "mn-row-zippy-collapsed"), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 
            6]), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 7]), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 
            8])
          }
          $offset$$inline_617_offset$$inline_622$$ += 7;
          break;
        case 30:
          $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$ = 
          $aSb$$59$$;
          $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_615_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_620$$.$blockPoolMonth_$.$expanded$ ? $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.append("mpbs-mn-scroll-vert-on") : 
          $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.append("mpbs-mn-scroll-vert-off");
          break;
        case 32:
          $aSb$$59$$.append($JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_615_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_620$$.$blockPoolMonth_$.$gridSize$.height);
          break;
        case 35:
          for(var $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$ = 
          $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_615_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_620$$, $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$ = $aSb$$59$$, $aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ = 
          $offset$$inline_617_offset$$inline_622$$, $dateInFirstCol$$inline_949_dayNameNumber$$inline_928_daySeries$$inline_963_gridRowsWidth$$inline_994_prevColsCumulativeSize$$inline_980_rowCounter$$inline_937$$ = $JSCompiler_alias_NULL$$, $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$ = 0, $blocksNumber$$inline_951_colCounter$$inline_982_gridWidth$$inline_965_timeFormat$$inline_996$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolMonth_$.$blocksNumber_$;$blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$ < 
          $blocksNumber$$inline_951_colCounter$$inline_982_gridWidth$$inline_965_timeFormat$$inline_996$$;$blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$++) {
            0 < $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$ && $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$]), 
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 
            1]), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolMonth_$.$blocks$[$blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$].size), 
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 2]), $dateInFirstCol$$inline_949_dayNameNumber$$inline_928_daySeries$$inline_963_gridRowsWidth$$inline_994_prevColsCumulativeSize$$inline_980_rowCounter$$inline_937$$ = 
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$timeManager_$.$daySeries$[7 * 
            $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$], $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($dateInFirstCol$$inline_949_dayNameNumber$$inline_928_daySeries$$inline_963_gridRowsWidth$$inline_994_prevColsCumulativeSize$$inline_980_rowCounter$$inline_937$$.$getWeekNumber$()), 
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 3])
          }
          $offset$$inline_617_offset$$inline_622$$ += 3;
          break;
        case 43:
          $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$ = 
          $aSb$$59$$;
          $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$ = $offset$$inline_617_offset$$inline_622$$;
          for($aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ = 0;7 > $aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$;$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$++) {
            0 < $aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ && $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$]), 
            6 == $aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ && $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.append(" weekgrid-col-last"), 
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$ + 
            1])
          }
          $offset$$inline_617_offset$$inline_622$$++;
          break;
        case 49:
          $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_615_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_620$$.$buildMonthGridRows_$($aSb$$59$$, $offset$$inline_617_offset$$inline_622$$), $offset$$inline_617_offset$$inline_622$$ += 32
      }
    }
  }else {
    if($JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$)) {
      $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_615_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_620$$ = this.$mainPaneBuilder_$;
      $offset$$inline_617_offset$$inline_622$$ = 0;
      for($length$$inline_618_length$$inline_623$$ = $rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$.length;++$offset$$inline_617_offset$$inline_622$$ < $length$$inline_618_length$$inline_623$$ - 1;) {
        switch($aSb$$59$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$offset$$inline_617_offset$$inline_622$$]), $offset$$inline_617_offset$$inline_622$$) {
          case 3:
            $aSb$$59$$.append($JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_615_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_620$$.$blockPoolAllday_$.$expanded$ ? "goog-zippy-expanded" : "goog-zippy-collapsed");
            break;
          case 8:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$ = 
            $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_615_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_620$$;
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$ = $aSb$$59$$;
            $aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ = $offset$$inline_617_offset$$inline_622$$;
            $dateInFirstCol$$inline_949_dayNameNumber$$inline_928_daySeries$$inline_963_gridRowsWidth$$inline_994_prevColsCumulativeSize$$inline_980_rowCounter$$inline_937$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$timeManager_$.$daySeries$;
            $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$ = 0;
            $blocksNumber$$inline_951_colCounter$$inline_982_gridWidth$$inline_965_timeFormat$$inline_996$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolWeek_$.$gridSize$.width;
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append((100 * ($blocksNumber$$inline_951_colCounter$$inline_982_gridWidth$$inline_965_timeFormat$$inline_996$$ / $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolAllday_$.$gridContainerSize$.width)).toFixed(4));
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 1]);
            for(var $blocksNumber$$inline_983_colCounter$$inline_966_timeCounter$$inline_997$$ = 0, $blocksNumber$$inline_967_timeIncrement$$inline_998$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolWeek_$.$blocksNumber_$;$blocksNumber$$inline_983_colCounter$$inline_966_timeCounter$$inline_997$$ < 
            $blocksNumber$$inline_967_timeIncrement$$inline_998$$;$blocksNumber$$inline_983_colCounter$$inline_966_timeCounter$$inline_997$$++) {
              $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 2]), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($blocksNumber$$inline_983_colCounter$$inline_966_timeCounter$$inline_997$$), 
              $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 3]), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append((100 * 
              ($blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$ / $blocksNumber$$inline_951_colCounter$$inline_982_gridWidth$$inline_965_timeFormat$$inline_996$$)).toFixed(4)), $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$ += $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolWeek_$.$blocks$[$blocksNumber$$inline_983_colCounter$$inline_966_timeCounter$$inline_997$$].size, 
              $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 4]), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append((100 - 
              100 * ($blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$ / $blocksNumber$$inline_951_colCounter$$inline_982_gridWidth$$inline_965_timeFormat$$inline_996$$)).toFixed(4)), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 
              5]), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append(-100 * $blocksNumber$$inline_983_colCounter$$inline_966_timeCounter$$inline_997$$), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 
              6]), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append(1 != $blocksNumber$$inline_967_timeIncrement$$inline_998$$ ? "dayname-wk-inner" : ""), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 
              7]), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($JSCompiler_StaticMethods_format$$($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$weekDayNameFormatWeek_$, 
              $dateInFirstCol$$inline_949_dayNameNumber$$inline_928_daySeries$$inline_963_gridRowsWidth$$inline_994_prevColsCumulativeSize$$inline_980_rowCounter$$inline_937$$[$blocksNumber$$inline_983_colCounter$$inline_966_timeCounter$$inline_997$$])), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 
              8])
            }
            $offset$$inline_617_offset$$inline_622$$ += 8;
            break;
          case 19:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$ = 
            $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_615_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_620$$;
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$ = $aSb$$59$$;
            $aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ = $offset$$inline_617_offset$$inline_622$$;
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolAllday_$.$expanded$ ? 
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append("mphs-scroll-vert-on ") : $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append("mphs-scroll-vert-off ");
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolWeek_$.$expanded$ ? 
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append("mphs-scroll-horz-on") : $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append("mphs-scroll-horz-off");
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 1]);
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolAllday_$.$gridContainerSize$.height);
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 2]);
            $offset$$inline_617_offset$$inline_622$$ += 2;
            break;
          case 23:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$ = 
            $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_615_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_620$$;
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$ = $aSb$$59$$;
            $aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ = $offset$$inline_617_offset$$inline_622$$;
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolAllday_$.$gridSize$.height);
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 1]);
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append((100 * ($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolWeek_$.$gridSize$.width / 
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolAllday_$.$gridContainerSize$.width)).toFixed(4));
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 2]);
            $offset$$inline_617_offset$$inline_622$$ += 2;
            break;
          case 27:
            $JSCompiler_StaticMethods_buildWeekGridAdCols_$$($JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_615_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_620$$, $aSb$$59$$, $offset$$inline_617_offset$$inline_622$$);
            $offset$$inline_617_offset$$inline_622$$ += 17;
            break;
          case 49:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$ = 
            $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_615_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_620$$;
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$ = $aSb$$59$$;
            $aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ = $offset$$inline_617_offset$$inline_622$$;
            $dateInFirstCol$$inline_949_dayNameNumber$$inline_928_daySeries$$inline_963_gridRowsWidth$$inline_994_prevColsCumulativeSize$$inline_980_rowCounter$$inline_937$$ = 0;
            $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolWeek_$.$gridSize$.width;
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append((100 * ($blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$ / $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolWeek_$.$gridContainerSize$.width)).toFixed(4));
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 1]);
            $blocksNumber$$inline_951_colCounter$$inline_982_gridWidth$$inline_965_timeFormat$$inline_996$$ = 0;
            for($blocksNumber$$inline_983_colCounter$$inline_966_timeCounter$$inline_997$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolWeek_$.$blocksNumber_$;$blocksNumber$$inline_951_colCounter$$inline_982_gridWidth$$inline_965_timeFormat$$inline_996$$ < 
            $blocksNumber$$inline_983_colCounter$$inline_966_timeCounter$$inline_997$$;$blocksNumber$$inline_951_colCounter$$inline_982_gridWidth$$inline_965_timeFormat$$inline_996$$++) {
              $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 2]), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append((100 * 
              ($dateInFirstCol$$inline_949_dayNameNumber$$inline_928_daySeries$$inline_963_gridRowsWidth$$inline_994_prevColsCumulativeSize$$inline_980_rowCounter$$inline_937$$ / $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$)).toFixed(4)), $dateInFirstCol$$inline_949_dayNameNumber$$inline_928_daySeries$$inline_963_gridRowsWidth$$inline_994_prevColsCumulativeSize$$inline_980_rowCounter$$inline_937$$ += 
              $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolWeek_$.$blocks$[$blocksNumber$$inline_951_colCounter$$inline_982_gridWidth$$inline_965_timeFormat$$inline_996$$].size, 
              $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 3]), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append((100 - 
              100 * ($dateInFirstCol$$inline_949_dayNameNumber$$inline_928_daySeries$$inline_963_gridRowsWidth$$inline_994_prevColsCumulativeSize$$inline_980_rowCounter$$inline_937$$ / $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$)).toFixed(4)), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 
              4]), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append(-100 * $blocksNumber$$inline_951_colCounter$$inline_982_gridWidth$$inline_965_timeFormat$$inline_996$$), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 
              5]), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 6]), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($blocksNumber$$inline_951_colCounter$$inline_982_gridWidth$$inline_965_timeFormat$$inline_996$$), 
              $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 7]), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolWeek_$.$blocks$[$blocksNumber$$inline_951_colCounter$$inline_982_gridWidth$$inline_965_timeFormat$$inline_996$$].$expanded$ ? 
              "wk-col-zippy-expanded" : "wk-col-zippy-collapsed"), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 
              8]), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 9])
            }
            $offset$$inline_617_offset$$inline_622$$ += 9;
            break;
          case 63:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$ = 
            $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_615_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_620$$;
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$ = $aSb$$59$$;
            $aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ = $offset$$inline_617_offset$$inline_622$$;
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolWeek_$.$gridContainerSize$.height);
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 1]);
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolWeek_$.$expanded$ ? 
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append("mpbs-wk-scroll-horz-on") : $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append("mpbs-wk-scroll-horz-off");
            $offset$$inline_617_offset$$inline_622$$++;
            break;
          case 67:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$ = 
            $aSb$$59$$;
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.append($rflect$cal$TimeMarker$HEAD_PARTS_$$[0]);
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.append($JSCompiler_StaticMethods_getPosition_$$($JSCompiler_alias_TRUE$$));
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.append($rflect$cal$TimeMarker$HEAD_PARTS_$$[1]);
            break;
          case 68:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$ = 
            $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_615_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_620$$;
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$ = $aSb$$59$$;
            $aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ = $offset$$inline_617_offset$$inline_622$$;
            $dateInFirstCol$$inline_949_dayNameNumber$$inline_928_daySeries$$inline_963_gridRowsWidth$$inline_994_prevColsCumulativeSize$$inline_980_rowCounter$$inline_937$$ = 100 * ($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolWeek_$.$gridSize$.width / 
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$blockPoolWeek_$.$gridContainerSize$.width);
            if(1 in $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$cache_$ && 
            2 in $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$cache_$) {
              $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$cache_$[1]), 
              $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($dateInFirstCol$$inline_949_dayNameNumber$$inline_928_daySeries$$inline_963_gridRowsWidth$$inline_994_prevColsCumulativeSize$$inline_980_rowCounter$$inline_937$$), $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$cache_$[2])
            }else {
              $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$ = new $goog$string$StringBuffer$$;
              $blocksNumber$$inline_951_colCounter$$inline_982_gridWidth$$inline_965_timeFormat$$inline_996$$ = new $goog$i18n$DateTimeFormat$$($goog$i18n$DateTimeSymbols_en$$.$TIMEFORMATS$[3]);
              $blocksNumber$$inline_983_colCounter$$inline_966_timeCounter$$inline_997$$ = new $goog$date$DateTime$$;
              $blocksNumber$$inline_967_timeIncrement$$inline_998$$ = new $goog$date$Interval$$(0, 0, 0, 0, 30);
              $blocksNumber$$inline_983_colCounter$$inline_966_timeCounter$$inline_997$$.setHours(0);
              $blocksNumber$$inline_983_colCounter$$inline_966_timeCounter$$inline_997$$.setMinutes(0);
              $blocksNumber$$inline_983_colCounter$$inline_966_timeCounter$$inline_997$$.setSeconds(0);
              for(var $counter$$inline_999$$ = 0;48 > $counter$$inline_999$$;$counter$$inline_999$$++, $blocksNumber$$inline_983_colCounter$$inline_966_timeCounter$$inline_997$$.add($blocksNumber$$inline_967_timeIncrement$$inline_998$$)) {
                0 < $counter$$inline_999$$ && $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$]), $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$.append("grid-table-row "), 
                0 == $counter$$inline_999$$ % 2 ? ($blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$.append("grid-table-row-even"), $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 
                1]), $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$.append("hl-even")) : ($blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$.append("grid-table-row-odd"), $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 
                1]), $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$.append("hl-odd")), $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 
                2]), $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$.append($JSCompiler_StaticMethods_format$$($blocksNumber$$inline_951_colCounter$$inline_982_gridWidth$$inline_965_timeFormat$$inline_996$$, $blocksNumber$$inline_983_colCounter$$inline_966_timeCounter$$inline_997$$)), $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 
                3])
              }
              $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 4]);
              $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 5]);
              $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 6]);
              $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$cache_$[1] = 
              $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$.toString());
              $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$.clear();
              $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($dateInFirstCol$$inline_949_dayNameNumber$$inline_928_daySeries$$inline_963_gridRowsWidth$$inline_994_prevColsCumulativeSize$$inline_980_rowCounter$$inline_937$$);
              $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 7]);
              for($counter$$inline_999$$ = 0;48 > $counter$$inline_999$$;$counter$$inline_999$$++) {
                $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 8]), $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$.append("grid-table-row "), 
                0 == $counter$$inline_999$$ % 2 ? $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$.append("grid-table-row-even") : $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$.append("grid-table-row-odd"), $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_936_aOffset$$inline_948_aOffset$$inline_962_aOffset$$inline_971_aOffset$$inline_975_aOffset$$inline_979_aOffset$$inline_987_aOffset$$inline_993_counter$$inline_955_dayNamesFirstNumber$$inline_927$$ + 
                9])
              }
              $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.$cache_$[2] = 
              $blocksNumber$$inline_938_counter$$inline_929_gridWidth$$inline_981_prevColsCumulativeSize$$inline_964_rowCounter$$inline_950_sb$$inline_995$$.toString())
            }
            $offset$$inline_617_offset$$inline_622$$ += 9;
            break;
          case 79:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$ = 
            $aSb$$59$$;
            $aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$ = $offset$$inline_617_offset$$inline_622$$;
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.append(100 * 
            ($JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_615_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_620$$.$blockPoolWeek_$.$gridSize$.width / $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_615_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_620$$.$blockPoolWeek_$.$gridContainerSize$.width));
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_973_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_960_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_991_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_934_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_969_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_985_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_977_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_946_aSb$$inline_1002_aSb$$inline_923_aSb$$inline_925_aSb$$inline_941_aSb$$inline_953_aSb$$inline_989$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1003_aOffset$$inline_926_aOffset$$inline_954_aSb$$inline_935_aSb$$inline_947_aSb$$inline_961_aSb$$inline_970_aSb$$inline_974_aSb$$inline_978_aSb$$inline_986_aSb$$inline_992$$ + 
            1]);
            $offset$$inline_617_offset$$inline_622$$++;
            break;
          case 82:
            $JSCompiler_StaticMethods_buildWeekGridCols_$$($JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_615_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_620$$, $aSb$$59$$, $offset$$inline_617_offset$$inline_622$$), $offset$$inline_617_offset$$inline_622$$ += 26
        }
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($aElement$$4$$, $opt_doNotBuildBody$$4$$) {
  $rflect$cal$MainPane$$.$superClass_$.$decorateInternal$.call(this, $aElement$$4$$, $opt_doNotBuildBody$$4$$)
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $rflect$cal$MainPane$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "click", this.$onClick_$, $JSCompiler_alias_FALSE$$, this), this.$getElement$(), "mouseover", this.$onMouseOver_$, $JSCompiler_alias_FALSE$$, 
  this), this.$getElement$(), "mouseout", this.$onMouseOut_$, $JSCompiler_alias_FALSE$$, this), this.$getElement$(), "mousedown", this.$onMouseDown_$, $JSCompiler_alias_FALSE$$, this), this.$getElement$(), "selectstart", this.$onSelectStart_$, $JSCompiler_alias_FALSE$$, this), document, "mousemove", this.$onMouseMove_$, $JSCompiler_alias_FALSE$$, this), document, "mouseup", this.$onMouseUp_$, $JSCompiler_alias_FALSE$$, this), this.$saveDialog_$, "editevent", this.$onEventEdit_$, $JSCompiler_alias_FALSE$$, 
  this), this.$saveDialog_$, $goog$ui$$.$Dialog$.$EventType$.$SELECT$, this.$onSaveDialogSave_$, $JSCompiler_alias_FALSE$$, this);
  this.$timeMarker_$.start()
};
$JSCompiler_prototypeAlias$$.$onClick_$ = function $$JSCompiler_prototypeAlias$$$$onClick_$$($aEvent$$15_className$$34_event$$inline_642_eventId$$inline_641_matches$$inline_1018$$) {
  var $target$$54$$ = $aEvent$$15_className$$34_event$$inline_642_eventId$$inline_641_matches$$inline_1018$$.target, $id$$12$$ = $target$$54$$.id;
  $aEvent$$15_className$$34_event$$inline_642_eventId$$inline_641_matches$$inline_1018$$ = $target$$54$$.className;
  var $JSCompiler_StaticMethods_toggleBlock$self$$inline_625_JSCompiler_StaticMethods_toggleBlock$self$$inline_633_JSCompiler_StaticMethods_toggleBlock$self$$inline_636_zippyClicked$$ = $JSCompiler_alias_FALSE$$, $day$$inline_631_index$$69_index$$inline_630$$ = 0;
  $JSCompiler_StaticMethods_isInMonthMode$$(this.$viewManager_$) ? /mn\-zippy\-row\d{1}/.test($id$$12$$) ? ($day$$inline_631_index$$69_index$$inline_630$$ = /\d{1}/.exec($id$$12$$)[0], $JSCompiler_StaticMethods_toggleBlock$self$$inline_625_JSCompiler_StaticMethods_toggleBlock$self$$inline_633_JSCompiler_StaticMethods_toggleBlock$self$$inline_636_zippyClicked$$ = this.$blockManager_$.$blockPoolMonth$, $JSCompiler_StaticMethods_toggleBlock$self$$inline_625_JSCompiler_StaticMethods_toggleBlock$self$$inline_633_JSCompiler_StaticMethods_toggleBlock$self$$inline_636_zippyClicked$$.$blocks$[$day$$inline_631_index$$69_index$$inline_630$$].$expanded$ = 
  !$JSCompiler_StaticMethods_toggleBlock$self$$inline_625_JSCompiler_StaticMethods_toggleBlock$self$$inline_633_JSCompiler_StaticMethods_toggleBlock$self$$inline_636_zippyClicked$$.$blocks$[$day$$inline_631_index$$69_index$$inline_630$$].$expanded$, $JSCompiler_StaticMethods_updateExpandState_$$($JSCompiler_StaticMethods_toggleBlock$self$$inline_625_JSCompiler_StaticMethods_toggleBlock$self$$inline_633_JSCompiler_StaticMethods_toggleBlock$self$$inline_636_zippyClicked$$), this.$blockManager_$.$blockPoolMonth$.$expanded$ || 
  (this.$blockManager_$.$blockPoolMonth$.scrollTop = 0), $JSCompiler_StaticMethods_toggleBlock$self$$inline_625_JSCompiler_StaticMethods_toggleBlock$self$$inline_633_JSCompiler_StaticMethods_toggleBlock$self$$inline_636_zippyClicked$$ = $JSCompiler_alias_TRUE$$) : $JSCompiler_StaticMethods_isDaynumLabel_$$(this, $aEvent$$15_className$$34_event$$inline_642_eventId$$inline_641_matches$$inline_1018$$) ? $JSCompiler_StaticMethods_onDaynumLabelClick_$$(this, $id$$12$$) : $JSCompiler_StaticMethods_isWeeknumLabel_$$(this, 
  $aEvent$$15_className$$34_event$$inline_642_eventId$$inline_641_matches$$inline_1018$$) && ($day$$inline_631_index$$69_index$$inline_630$$ = $rflect$string$getNumericIndex$$($target$$54$$.parentNode.id), $_log$$("index", $day$$inline_631_index$$69_index$$inline_630$$), ($day$$inline_631_index$$69_index$$inline_630$$ = this.$timeManager_$.$daySeries$[7 * $day$$inline_631_index$$69_index$$inline_630$$]) && $JSCompiler_StaticMethods_switchView_$$(this, $day$$inline_631_index$$69_index$$inline_630$$, 
  3)) : $JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$) && (/wk\-zippy\-col\d{1}/.test($id$$12$$) ? ($day$$inline_631_index$$69_index$$inline_630$$ = /\d{1}/.exec($id$$12$$)[0], $JSCompiler_StaticMethods_toggleBlock$self$$inline_625_JSCompiler_StaticMethods_toggleBlock$self$$inline_633_JSCompiler_StaticMethods_toggleBlock$self$$inline_636_zippyClicked$$ = this.$blockManager_$.$blockPoolWeek$, $JSCompiler_StaticMethods_toggleBlock$self$$inline_625_JSCompiler_StaticMethods_toggleBlock$self$$inline_633_JSCompiler_StaticMethods_toggleBlock$self$$inline_636_zippyClicked$$.$blocks$[$day$$inline_631_index$$69_index$$inline_630$$].$expanded$ = 
  !$JSCompiler_StaticMethods_toggleBlock$self$$inline_625_JSCompiler_StaticMethods_toggleBlock$self$$inline_633_JSCompiler_StaticMethods_toggleBlock$self$$inline_636_zippyClicked$$.$blocks$[$day$$inline_631_index$$69_index$$inline_630$$].$expanded$, $JSCompiler_StaticMethods_updateExpandState_$$($JSCompiler_StaticMethods_toggleBlock$self$$inline_625_JSCompiler_StaticMethods_toggleBlock$self$$inline_633_JSCompiler_StaticMethods_toggleBlock$self$$inline_636_zippyClicked$$), this.$blockManager_$.$blockPoolWeek$.$expanded$ || 
  (this.$blockManager_$.$blockPoolWeek$.scrollLeft = 0), $JSCompiler_StaticMethods_toggleBlock$self$$inline_625_JSCompiler_StaticMethods_toggleBlock$self$$inline_633_JSCompiler_StaticMethods_toggleBlock$self$$inline_636_zippyClicked$$ = $JSCompiler_alias_TRUE$$) : /daynames\-zippy/.test($id$$12$$) ? ($JSCompiler_StaticMethods_toggleBlock$self$$inline_625_JSCompiler_StaticMethods_toggleBlock$self$$inline_633_JSCompiler_StaticMethods_toggleBlock$self$$inline_636_zippyClicked$$ = this.$blockManager_$.$blockPoolAllday$, 
  $JSCompiler_StaticMethods_toggleBlock$self$$inline_625_JSCompiler_StaticMethods_toggleBlock$self$$inline_633_JSCompiler_StaticMethods_toggleBlock$self$$inline_636_zippyClicked$$.$blocks$[0].$expanded$ = !$JSCompiler_StaticMethods_toggleBlock$self$$inline_625_JSCompiler_StaticMethods_toggleBlock$self$$inline_633_JSCompiler_StaticMethods_toggleBlock$self$$inline_636_zippyClicked$$.$blocks$[0].$expanded$, $JSCompiler_StaticMethods_updateExpandState_$$($JSCompiler_StaticMethods_toggleBlock$self$$inline_625_JSCompiler_StaticMethods_toggleBlock$self$$inline_633_JSCompiler_StaticMethods_toggleBlock$self$$inline_636_zippyClicked$$), 
  $JSCompiler_StaticMethods_toggleBlock$self$$inline_625_JSCompiler_StaticMethods_toggleBlock$self$$inline_633_JSCompiler_StaticMethods_toggleBlock$self$$inline_636_zippyClicked$$ = $JSCompiler_alias_TRUE$$) : $JSCompiler_StaticMethods_isDaynumLabel_$$(this, $aEvent$$15_className$$34_event$$inline_642_eventId$$inline_641_matches$$inline_1018$$) && $JSCompiler_StaticMethods_onDaynumLabelClick_$$(this, $target$$54$$.parentNode.id));
  if($JSCompiler_StaticMethods_toggleBlock$self$$inline_625_JSCompiler_StaticMethods_toggleBlock$self$$inline_633_JSCompiler_StaticMethods_toggleBlock$self$$inline_636_zippyClicked$$) {
    this.$updateBeforeRedraw$(), this.$updateByRedraw$()
  }else {
    if((this.$chipWeekRe_$ || (this.$chipWeekRe_$ = $rflect$string$buildClassNameRe$$("event-rect-wk-inner", "event-wk-timelabel"))).test($aEvent$$15_className$$34_event$$inline_642_eventId$$inline_641_matches$$inline_1018$$) || (this.$chipMonthRe_$ || (this.$chipMonthRe_$ = $rflect$string$buildClassNameRe$$("event-rect-mn-inner"))).test($aEvent$$15_className$$34_event$$inline_642_eventId$$inline_641_matches$$inline_1018$$)) {
      $aEvent$$15_className$$34_event$$inline_642_eventId$$inline_641_matches$$inline_1018$$ = ($aEvent$$15_className$$34_event$$inline_642_eventId$$inline_641_matches$$inline_1018$$ = /\d+ev/.exec($aEvent$$15_className$$34_event$$inline_642_eventId$$inline_641_matches$$inline_1018$$)) ? +$aEvent$$15_className$$34_event$$inline_642_eventId$$inline_641_matches$$inline_1018$$[0].substring(0, $aEvent$$15_className$$34_event$$inline_642_eventId$$inline_641_matches$$inline_1018$$[0].length - 2) : NaN, 
      isNaN($aEvent$$15_className$$34_event$$inline_642_eventId$$inline_641_matches$$inline_1018$$) || ($aEvent$$15_className$$34_event$$inline_642_eventId$$inline_641_matches$$inline_1018$$ = this.$eventManager_$.$events_$[$aEvent$$15_className$$34_event$$inline_642_eventId$$inline_641_matches$$inline_1018$$], this.$editDialog_$.$setVisible$($JSCompiler_alias_TRUE$$), this.$editDialog_$.$eventNameLink_$.innerHTML = $aEvent$$15_className$$34_event$$inline_642_eventId$$inline_641_matches$$inline_1018$$.summary, 
      this.$editDialog_$.$eventTimeCont_$.innerHTML = $aEvent$$15_className$$34_event$$inline_642_eventId$$inline_641_matches$$inline_1018$$.$startDate$ + " - " + $aEvent$$15_className$$34_event$$inline_642_eventId$$inline_641_matches$$inline_1018$$.$endDate$)
    }
  }
};
$JSCompiler_prototypeAlias$$.$onMouseOut_$ = function $$JSCompiler_prototypeAlias$$$$onMouseOut_$$($aEvent$$16_className$$35$$) {
  $aEvent$$16_className$$35$$ = $aEvent$$16_className$$35$$.target.className;
  ($JSCompiler_StaticMethods_isDaynumLabel_$$(this, $aEvent$$16_className$$35$$) || $JSCompiler_StaticMethods_isWeeknumLabel_$$(this, $aEvent$$16_className$$35$$) || $rflect$string$buildClassNameRe$$("zippy").test($aEvent$$16_className$$35$$)) && $JSCompiler_StaticMethods_registerTarget$$(this.$moRegistry_$, $JSCompiler_alias_NULL$$)
};
$JSCompiler_prototypeAlias$$.$onMouseOver_$ = function $$JSCompiler_prototypeAlias$$$$onMouseOver_$$($aEvent$$17_target$$56$$) {
  $aEvent$$17_target$$56$$ = $aEvent$$17_target$$56$$.target;
  var $className$$36$$ = $aEvent$$17_target$$56$$.className;
  $JSCompiler_StaticMethods_isDaynumLabel_$$(this, $className$$36$$) || $JSCompiler_StaticMethods_isWeeknumLabel_$$(this, $className$$36$$) ? $JSCompiler_StaticMethods_registerTarget$$(this.$moRegistry_$, $aEvent$$17_target$$56$$, "label-underlined") : $rflect$string$buildClassNameRe$$("zippy").test($className$$36$$) ? $JSCompiler_StaticMethods_registerTarget$$(this.$moRegistry_$, $aEvent$$17_target$$56$$, "zippy-highlighted") : $JSCompiler_StaticMethods_registerTarget$$(this.$moRegistry_$, $JSCompiler_alias_NULL$$)
};
function $JSCompiler_StaticMethods_onDaynumLabelClick_$$($JSCompiler_StaticMethods_onDaynumLabelClick_$self$$, $aId$$4$$) {
  var $day$$4_index$$70$$ = $rflect$string$getNumericIndex$$($aId$$4$$);
  $_log$$("index", $day$$4_index$$70$$);
  ($day$$4_index$$70$$ = $JSCompiler_StaticMethods_onDaynumLabelClick_$self$$.$timeManager_$.$daySeries$[$day$$4_index$$70$$]) && $JSCompiler_StaticMethods_switchView_$$($JSCompiler_StaticMethods_onDaynumLabelClick_$self$$, $day$$4_index$$70$$, 1)
}
function $JSCompiler_StaticMethods_switchView_$$($JSCompiler_StaticMethods_switchView_$self$$, $aDate$$10_opt_date$$inline_1028$$, $aType$$) {
  $aDate$$10_opt_date$$inline_1028$$ = new $goog$date$DateTime$$($aDate$$10_opt_date$$inline_1028$$.getYear(), $aDate$$10_opt_date$$inline_1028$$.getMonth(), $aDate$$10_opt_date$$inline_1028$$.getDate());
  $JSCompiler_StaticMethods_switchView_$self$$.$timeManager_$.$basis$ = $aDate$$10_opt_date$$inline_1028$$ || new $goog$date$Date$$;
  $JSCompiler_StaticMethods_showView$$($JSCompiler_StaticMethods_switchView_$self$$.$viewManager_$, $aType$$, $JSCompiler_StaticMethods_switchView_$self$$)
}
function $JSCompiler_StaticMethods_isWeekGrid_$$($JSCompiler_StaticMethods_isWeekGrid_$self$$, $aClassName$$9$$) {
  var $weekGridRe_$$ = $JSCompiler_StaticMethods_isWeekGrid_$self$$.$weekGridRe_$ || ($JSCompiler_StaticMethods_isWeekGrid_$self$$.$weekGridRe_$ = $rflect$string$buildClassNameRe$$("wk-events-layer", "expand-sign-wk-cont", "expand-sign-wk", "grid-table-row", "main-pane"));
  return $JSCompiler_StaticMethods_isInWeekMode$$($JSCompiler_StaticMethods_isWeekGrid_$self$$.$viewManager_$) && $weekGridRe_$$.test($aClassName$$9$$)
}
function $JSCompiler_StaticMethods_isAlldayGrid_$$($JSCompiler_StaticMethods_isAlldayGrid_$self$$, $aClassName$$10$$) {
  var $alldayGridRe_$$ = $JSCompiler_StaticMethods_isAlldayGrid_$self$$.$alldayGridRe_$ || ($JSCompiler_StaticMethods_isAlldayGrid_$self$$.$alldayGridRe_$ = $rflect$string$buildClassNameRe$$("wk-ad-events-layer", "expand-sign-wk-ad-cont", "expand-sign-wk-ad", "main-pane-header-container-wk"));
  return $JSCompiler_StaticMethods_isInWeekMode$$($JSCompiler_StaticMethods_isAlldayGrid_$self$$.$viewManager_$) && $alldayGridRe_$$.test($aClassName$$10$$)
}
function $JSCompiler_StaticMethods_isMonthGrid_$$($JSCompiler_StaticMethods_isMonthGrid_$self$$, $aClassName$$11$$) {
  var $monthGridRe_$$ = $JSCompiler_StaticMethods_isMonthGrid_$self$$.$monthGridRe_$ || ($JSCompiler_StaticMethods_isMonthGrid_$self$$.$monthGridRe_$ = $rflect$string$buildClassNameRe$$("mn-events-layer", "expand-sign-mn", "daynum-label", "daynum-cont", "monthgrid-row", "daycell"));
  return $JSCompiler_StaticMethods_isInMonthMode$$($JSCompiler_StaticMethods_isMonthGrid_$self$$.$viewManager_$) && $monthGridRe_$$.test($aClassName$$11$$)
}
function $JSCompiler_StaticMethods_isDaynumLabel_$$($JSCompiler_StaticMethods_isDaynumLabel_$self$$, $aClassName$$13$$) {
  return($JSCompiler_StaticMethods_isDaynumLabel_$self$$.$daynumLabelRe_$ || ($JSCompiler_StaticMethods_isDaynumLabel_$self$$.$daynumLabelRe_$ = $rflect$string$buildClassNameRe$$("daynum-label", "dayname-wk-inner"))).test($aClassName$$13$$)
}
function $JSCompiler_StaticMethods_isWeeknumLabel_$$($JSCompiler_StaticMethods_isWeeknumLabel_$self$$, $aClassName$$14$$) {
  return($JSCompiler_StaticMethods_isWeeknumLabel_$self$$.$weeknumLabelRe_$ || ($JSCompiler_StaticMethods_isWeeknumLabel_$self$$.$weeknumLabelRe_$ = $rflect$string$buildClassNameRe$$("weeknum-label-inner"))).test($aClassName$$14$$)
}
$JSCompiler_prototypeAlias$$.$onMouseDown_$ = function $$JSCompiler_prototypeAlias$$$$onMouseDown_$$($aEvent$$18$$) {
  var $className$$37$$ = $aEvent$$18$$.target.className, $preventDefaultIsNeeded$$ = $JSCompiler_alias_FALSE$$;
  $JSCompiler_StaticMethods_isWeekGrid_$$(this, $className$$37$$) ? (this.$selectionMask_$.$init$(2, $aEvent$$18$$), $preventDefaultIsNeeded$$ = $JSCompiler_alias_TRUE$$) : $JSCompiler_StaticMethods_isAlldayGrid_$$(this, $className$$37$$) ? (this.$selectionMask_$.$init$(1, $aEvent$$18$$), $preventDefaultIsNeeded$$ = $JSCompiler_alias_TRUE$$) : $JSCompiler_StaticMethods_isMonthGrid_$$(this, $className$$37$$) && ($JSCompiler_StaticMethods_isDaynumLabel_$$(this, $className$$37$$) || this.$selectionMask_$.$init$(3, 
  $aEvent$$18$$), $preventDefaultIsNeeded$$ = $JSCompiler_alias_TRUE$$);
  $preventDefaultIsNeeded$$ && $aEvent$$18$$.preventDefault()
};
$JSCompiler_prototypeAlias$$.$onSelectStart_$ = function $$JSCompiler_prototypeAlias$$$$onSelectStart_$$($aEvent$$19$$) {
  var $className$$38$$ = $aEvent$$19$$.target.className;
  ($JSCompiler_StaticMethods_isWeekGrid_$$(this, $className$$38$$) || $JSCompiler_StaticMethods_isAlldayGrid_$$(this, $className$$38$$) || $JSCompiler_StaticMethods_isMonthGrid_$$(this, $className$$38$$)) && $aEvent$$19$$.preventDefault()
};
$JSCompiler_prototypeAlias$$.$onMouseMove_$ = function $$JSCompiler_prototypeAlias$$$$onMouseMove_$$($aEvent$$20$$) {
  this.$selectionMask_$.$initialized_$ && (this.$selectionMask_$.update($aEvent$$20$$), $aEvent$$20$$.preventDefault())
};
$JSCompiler_prototypeAlias$$.$onMouseUp_$ = function $$JSCompiler_prototypeAlias$$$$onMouseUp_$$($aEvent$$21$$) {
  if(this.$selectionMask_$.$initialized_$) {
    this.$selectionMask_$.close();
    this.$saveDialog_$.$setVisible$($JSCompiler_alias_TRUE$$);
    var $JSCompiler_temp_const$$1140_aEndDate$$inline_1036_aStartDate$$inline_1033$$ = this.$eventManager_$.$eventTransactionHelper$, $uid$$inline_1151$$ = $rflect$cal$events$EventManager$eventUid_$$++;
    $JSCompiler_temp_const$$1140_aEndDate$$inline_1036_aStartDate$$inline_1033$$.$temporaryEvent_$ = new $rflect$cal$events$Event$$($uid$$inline_1151$$);
    $JSCompiler_temp_const$$1140_aEndDate$$inline_1036_aStartDate$$inline_1033$$ = this.$selectionMask_$.$startDate$;
    this.$eventManager_$.$eventTransactionHelper$.$temporaryEvent_$.$startDate$ = $rflect$date$createDateShim$$($JSCompiler_temp_const$$1140_aEndDate$$inline_1036_aStartDate$$inline_1033$$.getYear(), $JSCompiler_temp_const$$1140_aEndDate$$inline_1036_aStartDate$$inline_1033$$.getMonth(), $JSCompiler_temp_const$$1140_aEndDate$$inline_1036_aStartDate$$inline_1033$$.getDate(), $JSCompiler_temp_const$$1140_aEndDate$$inline_1036_aStartDate$$inline_1033$$.getHours(), $JSCompiler_temp_const$$1140_aEndDate$$inline_1036_aStartDate$$inline_1033$$.getMinutes(), 
    $JSCompiler_temp_const$$1140_aEndDate$$inline_1036_aStartDate$$inline_1033$$.getSeconds(), $JSCompiler_alias_TRUE$$);
    $JSCompiler_temp_const$$1140_aEndDate$$inline_1036_aStartDate$$inline_1033$$ = this.$selectionMask_$.$endDate$;
    this.$eventManager_$.$eventTransactionHelper$.$temporaryEvent_$.$endDate$ = $rflect$date$createDateShim$$($JSCompiler_temp_const$$1140_aEndDate$$inline_1036_aStartDate$$inline_1033$$.getYear(), $JSCompiler_temp_const$$1140_aEndDate$$inline_1036_aStartDate$$inline_1033$$.getMonth(), $JSCompiler_temp_const$$1140_aEndDate$$inline_1036_aStartDate$$inline_1033$$.getDate(), $JSCompiler_temp_const$$1140_aEndDate$$inline_1036_aStartDate$$inline_1033$$.getHours(), $JSCompiler_temp_const$$1140_aEndDate$$inline_1036_aStartDate$$inline_1033$$.getMinutes(), 
    $JSCompiler_temp_const$$1140_aEndDate$$inline_1036_aStartDate$$inline_1033$$.getSeconds());
    this.$eventManager_$.$eventTransactionHelper$.$temporaryEvent_$.$allDay$ = 1 == this.$selectionMask_$.$configuration_$ || 3 == this.$selectionMask_$.$configuration_$;
    $aEvent$$21$$.preventDefault()
  }
};
$JSCompiler_prototypeAlias$$.$onEventEdit_$ = function $$JSCompiler_prototypeAlias$$$$onEventEdit_$$() {
  $_log$$("edit clicked")
};
$JSCompiler_prototypeAlias$$.$onSaveDialogSave_$ = function $$JSCompiler_prototypeAlias$$$$onSaveDialogSave_$$($JSCompiler_StaticMethods_endEventCreation$self$$inline_653_aEvent$$23_sb$$inline_656_sb$$inline_659_sb$$inline_662$$) {
  if($JSCompiler_StaticMethods_endEventCreation$self$$inline_653_aEvent$$23_sb$$inline_656_sb$$inline_659_sb$$inline_662$$.key == this.$saveDialog_$.$buttons_$.$defaultButton_$) {
    this.$eventManager_$.$eventTransactionHelper$.$temporaryEvent_$.summary = this.$saveDialog_$.$input_$.value || $rflect$cal$i18n$Symbols$$.$NO_NAME_EVENT$;
    $JSCompiler_StaticMethods_endEventCreation$self$$inline_653_aEvent$$23_sb$$inline_656_sb$$inline_659_sb$$inline_662$$ = this.$eventManager_$.$eventTransactionHelper$;
    var $JSCompiler_StaticMethods_addEvent$self$$inline_1041_endDate$$inline_1067$$ = $JSCompiler_StaticMethods_endEventCreation$self$$inline_653_aEvent$$23_sb$$inline_656_sb$$inline_659_sb$$inline_662$$.$eventManager_$, $aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$ = $JSCompiler_StaticMethods_endEventCreation$self$$inline_653_aEvent$$23_sb$$inline_656_sb$$inline_659_sb$$inline_662$$.$temporaryEvent_$, $JSCompiler_StaticMethods_toHumanString$self$$inline_1065_formatStart$$inline_1069_startDate$$inline_1043$$ = 
    $aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$.$startDate$, $endDate$$inline_1044_formatEnd$$inline_1070_formatStringStart$$inline_1071$$ = $aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$.$endDate$, $allDay$$inline_1073_eventStartMins$$inline_1045_formatStringEnd$$inline_1072$$ = 60 * $JSCompiler_StaticMethods_toHumanString$self$$inline_1065_formatStart$$inline_1069_startDate$$inline_1043$$.getHours() + $JSCompiler_StaticMethods_toHumanString$self$$inline_1065_formatStart$$inline_1069_startDate$$inline_1043$$.getMinutes(), 
    $eventEndMins$$inline_1046_timeFormatString$$inline_1074$$ = 60 * $endDate$$inline_1044_formatEnd$$inline_1070_formatStringStart$$inline_1071$$.getHours() + $endDate$$inline_1044_formatEnd$$inline_1070_formatStringStart$$inline_1071$$.getMinutes(), $currentDate$$inline_1047_weekOfYear$$inline_1168$$ = $JSCompiler_StaticMethods_toHumanString$self$$inline_1065_formatStart$$inline_1069_startDate$$inline_1043$$.$clone$(), $hasNext$$inline_1048$$ = $JSCompiler_alias_TRUE$$, $JSCompiler_StaticMethods_putAllDayChips_$self$$inline_1153_chip$$inline_1060_hasPrev$$inline_1049_weekChipEndMins$$inline_1056$$ = 
    $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_putWeekChip_$self$$inline_1163_hasNextWeek$$inline_1050$$ = $JSCompiler_alias_FALSE$$, $aChip$$inline_1164_hasPrevWeek$$inline_1051$$ = $JSCompiler_alias_FALSE$$, $cutoff$$inline_1062_isWeekChip$$inline_1052_weekChipStartMins$$inline_1055_year$$inline_1167$$ = $JSCompiler_alias_FALSE$$, $aIndexes$$inline_1154_cutoffAndCurrentDiffAbs$$inline_1063_dayChipStartMins$$inline_1053$$ = 0, $aEventId$$inline_1155_dayChipEndMins$$inline_1054$$ = 0, $total$$inline_1057$$ = 
    $JSCompiler_StaticMethods_putAllDayChips_$self$$inline_1153_chip$$inline_1060_hasPrev$$inline_1049_weekChipEndMins$$inline_1056$$ = $cutoff$$inline_1062_isWeekChip$$inline_1052_weekChipStartMins$$inline_1055_year$$inline_1167$$ = 0, $isAllDay$$inline_1058$$ = $aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$.$allDay$, $tomorrow$$inline_1059$$;
    if($isAllDay$$inline_1058$$) {
      var $JSCompiler_StaticMethods_buildAllDayGrid$self$$inline_1079_JSCompiler_StaticMethods_buildMonthGrid$self$$inline_1082_JSCompiler_StaticMethods_buildWeekGrid$self$$inline_1076_JSCompiler_temp_const$$827_allDayIndexes$$inline_1061$$ = []
    }
    for($JSCompiler_StaticMethods_addEvent$self$$inline_1041_endDate$$inline_1067$$.$events_$[$aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$.id] = $aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$;$hasNext$$inline_1048$$;) {
      $tomorrow$$inline_1059$$ = $rflect$date$getTomorrow$$($currentDate$$inline_1047_weekOfYear$$inline_1168$$);
      $JSCompiler_StaticMethods_putAllDayChips_$self$$inline_1153_chip$$inline_1060_hasPrev$$inline_1049_weekChipEndMins$$inline_1056$$ = !$currentDate$$inline_1047_weekOfYear$$inline_1168$$.$equals$($JSCompiler_StaticMethods_toHumanString$self$$inline_1065_formatStart$$inline_1069_startDate$$inline_1043$$, 7);
      $hasNext$$inline_1048$$ = 0 > $JSCompiler_StaticMethods_compare$$($tomorrow$$inline_1059$$, $endDate$$inline_1044_formatEnd$$inline_1070_formatStringStart$$inline_1071$$, 7) || $tomorrow$$inline_1059$$.$equals$($endDate$$inline_1044_formatEnd$$inline_1070_formatStringStart$$inline_1071$$, 7) && 0 != $eventEndMins$$inline_1046_timeFormatString$$inline_1074$$;
      $cutoff$$inline_1062_isWeekChip$$inline_1052_weekChipStartMins$$inline_1055_year$$inline_1167$$ = !$hasNext$$inline_1048$$ || 6 == $JSCompiler_StaticMethods_getWeekday$$($currentDate$$inline_1047_weekOfYear$$inline_1168$$);
      $aChip$$inline_1164_hasPrevWeek$$inline_1051$$ = !$currentDate$$inline_1047_weekOfYear$$inline_1168$$.$equals$($JSCompiler_StaticMethods_toHumanString$self$$inline_1065_formatStart$$inline_1069_startDate$$inline_1043$$, 128);
      $JSCompiler_StaticMethods_putWeekChip_$self$$inline_1163_hasNextWeek$$inline_1050$$ = $hasNext$$inline_1048$$ && 0 == $JSCompiler_StaticMethods_getWeekday$$($tomorrow$$inline_1059$$);
      if($isAllDay$$inline_1058$$) {
        if($JSCompiler_StaticMethods_buildAllDayGrid$self$$inline_1079_JSCompiler_StaticMethods_buildMonthGrid$self$$inline_1082_JSCompiler_StaticMethods_buildWeekGrid$self$$inline_1076_JSCompiler_temp_const$$827_allDayIndexes$$inline_1061$$[$total$$inline_1057$$++] = [$currentDate$$inline_1047_weekOfYear$$inline_1168$$.getYear(), $currentDate$$inline_1047_weekOfYear$$inline_1168$$.$getDayOfYear$()], !$hasNext$$inline_1048$$) {
          for(var $JSCompiler_StaticMethods_putAllDayChips_$self$$inline_1153_chip$$inline_1060_hasPrev$$inline_1049_weekChipEndMins$$inline_1056$$ = $JSCompiler_StaticMethods_addEvent$self$$inline_1041_endDate$$inline_1067$$, $aIndexes$$inline_1154_cutoffAndCurrentDiffAbs$$inline_1063_dayChipStartMins$$inline_1053$$ = $JSCompiler_StaticMethods_buildAllDayGrid$self$$inline_1079_JSCompiler_StaticMethods_buildMonthGrid$self$$inline_1082_JSCompiler_StaticMethods_buildWeekGrid$self$$inline_1076_JSCompiler_temp_const$$827_allDayIndexes$$inline_1061$$, 
          $aEventId$$inline_1155_dayChipEndMins$$inline_1054$$ = $aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$.id, $counter$$inline_1156$$ = 0, $length$$inline_1157$$ = $aIndexes$$inline_1154_cutoffAndCurrentDiffAbs$$inline_1063_dayChipStartMins$$inline_1053$$.length;$counter$$inline_1156$$ < $length$$inline_1157$$;$counter$$inline_1156$$++) {
            $JSCompiler_StaticMethods_putChip_$$(new $rflect$cal$events$Chip$$($aEventId$$inline_1155_dayChipEndMins$$inline_1054$$, 0, $length$$inline_1157$$ - $counter$$inline_1156$$, 0 != $counter$$inline_1156$$, $JSCompiler_alias_FALSE$$), $aIndexes$$inline_1154_cutoffAndCurrentDiffAbs$$inline_1063_dayChipStartMins$$inline_1053$$[$counter$$inline_1156$$][0], $aIndexes$$inline_1154_cutoffAndCurrentDiffAbs$$inline_1063_dayChipStartMins$$inline_1053$$[$counter$$inline_1156$$][1], $JSCompiler_StaticMethods_putAllDayChips_$self$$inline_1153_chip$$inline_1060_hasPrev$$inline_1049_weekChipEndMins$$inline_1056$$.$allDayChipsByDay_$, 
            $JSCompiler_StaticMethods_putAllDayChips_$self$$inline_1153_chip$$inline_1060_hasPrev$$inline_1049_weekChipEndMins$$inline_1056$$.$tracksAllDayChipsByDay_$)
          }
        }
      }else {
        $aEventId$$inline_1155_dayChipEndMins$$inline_1054$$ = $hasNext$$inline_1048$$ ? 1440 : 0 == $eventEndMins$$inline_1046_timeFormatString$$inline_1074$$ ? 1440 : $eventEndMins$$inline_1046_timeFormatString$$inline_1074$$, $aIndexes$$inline_1154_cutoffAndCurrentDiffAbs$$inline_1063_dayChipStartMins$$inline_1053$$ = $JSCompiler_StaticMethods_putAllDayChips_$self$$inline_1153_chip$$inline_1060_hasPrev$$inline_1049_weekChipEndMins$$inline_1056$$ ? 0 : $allDay$$inline_1073_eventStartMins$$inline_1045_formatStringEnd$$inline_1072$$, 
        20 > $aEventId$$inline_1155_dayChipEndMins$$inline_1054$$ - $aIndexes$$inline_1154_cutoffAndCurrentDiffAbs$$inline_1063_dayChipStartMins$$inline_1053$$ && ($aEventId$$inline_1155_dayChipEndMins$$inline_1054$$ = $aIndexes$$inline_1154_cutoffAndCurrentDiffAbs$$inline_1063_dayChipStartMins$$inline_1053$$ + 20), $JSCompiler_StaticMethods_putAllDayChips_$self$$inline_1153_chip$$inline_1060_hasPrev$$inline_1049_weekChipEndMins$$inline_1056$$ = new $rflect$cal$events$Chip$$($aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$.id, 
        $aIndexes$$inline_1154_cutoffAndCurrentDiffAbs$$inline_1063_dayChipStartMins$$inline_1053$$, $aEventId$$inline_1155_dayChipEndMins$$inline_1054$$, $JSCompiler_StaticMethods_putAllDayChips_$self$$inline_1153_chip$$inline_1060_hasPrev$$inline_1049_weekChipEndMins$$inline_1056$$, $hasNext$$inline_1048$$), $JSCompiler_StaticMethods_putChip_$$($JSCompiler_StaticMethods_putAllDayChips_$self$$inline_1153_chip$$inline_1060_hasPrev$$inline_1049_weekChipEndMins$$inline_1056$$, $currentDate$$inline_1047_weekOfYear$$inline_1168$$.getYear(), 
        $currentDate$$inline_1047_weekOfYear$$inline_1168$$.$getDayOfYear$(), $JSCompiler_StaticMethods_addEvent$self$$inline_1041_endDate$$inline_1067$$.$chipsByDay_$, $JSCompiler_StaticMethods_addEvent$self$$inline_1041_endDate$$inline_1067$$.$tracksChipsByDay_$)
      }
      $cutoff$$inline_1062_isWeekChip$$inline_1052_weekChipStartMins$$inline_1055_year$$inline_1167$$ && ($JSCompiler_StaticMethods_putAllDayChips_$self$$inline_1153_chip$$inline_1060_hasPrev$$inline_1049_weekChipEndMins$$inline_1056$$ = $JSCompiler_StaticMethods_putWeekChip_$self$$inline_1163_hasNextWeek$$inline_1050$$ ? 7 : $JSCompiler_StaticMethods_getWeekday$$($currentDate$$inline_1047_weekOfYear$$inline_1168$$) + 1, $cutoff$$inline_1062_isWeekChip$$inline_1052_weekChipStartMins$$inline_1055_year$$inline_1167$$ = 
      $aChip$$inline_1164_hasPrevWeek$$inline_1051$$ ? 0 : $JSCompiler_StaticMethods_getWeekday$$($JSCompiler_StaticMethods_toHumanString$self$$inline_1065_formatStart$$inline_1069_startDate$$inline_1043$$), $JSCompiler_StaticMethods_putAllDayChips_$self$$inline_1153_chip$$inline_1060_hasPrev$$inline_1049_weekChipEndMins$$inline_1056$$ = new $rflect$cal$events$Chip$$($aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$.id, $cutoff$$inline_1062_isWeekChip$$inline_1052_weekChipStartMins$$inline_1055_year$$inline_1167$$, 
      $JSCompiler_StaticMethods_putAllDayChips_$self$$inline_1153_chip$$inline_1060_hasPrev$$inline_1049_weekChipEndMins$$inline_1056$$, $aChip$$inline_1164_hasPrevWeek$$inline_1051$$, $JSCompiler_StaticMethods_putWeekChip_$self$$inline_1163_hasNextWeek$$inline_1050$$), $cutoff$$inline_1062_isWeekChip$$inline_1052_weekChipStartMins$$inline_1055_year$$inline_1167$$ = $currentDate$$inline_1047_weekOfYear$$inline_1168$$.$firstWeekCutOffDay_$, $aIndexes$$inline_1154_cutoffAndCurrentDiffAbs$$inline_1063_dayChipStartMins$$inline_1053$$ = 
      ($cutoff$$inline_1062_isWeekChip$$inline_1052_weekChipStartMins$$inline_1055_year$$inline_1167$$ - ($currentDate$$inline_1047_weekOfYear$$inline_1168$$.getDay() + 6) % 7 + 7) % 7, $JSCompiler_StaticMethods_putWeekChip_$self$$inline_1163_hasNextWeek$$inline_1050$$ = $JSCompiler_StaticMethods_addEvent$self$$inline_1041_endDate$$inline_1067$$, $aChip$$inline_1164_hasPrevWeek$$inline_1051$$ = $JSCompiler_StaticMethods_putAllDayChips_$self$$inline_1153_chip$$inline_1060_hasPrev$$inline_1049_weekChipEndMins$$inline_1056$$, 
      $cutoff$$inline_1062_isWeekChip$$inline_1052_weekChipStartMins$$inline_1055_year$$inline_1167$$ = $currentDate$$inline_1047_weekOfYear$$inline_1168$$.getYear() + (0 < $cutoff$$inline_1062_isWeekChip$$inline_1052_weekChipStartMins$$inline_1055_year$$inline_1167$$ - ($currentDate$$inline_1047_weekOfYear$$inline_1168$$.getDay() + 6) % 7 && $currentDate$$inline_1047_weekOfYear$$inline_1168$$.$getDayOfYear$() + $aIndexes$$inline_1154_cutoffAndCurrentDiffAbs$$inline_1063_dayChipStartMins$$inline_1053$$ > 
      ($goog$date$isLeapYear$$($currentDate$$inline_1047_weekOfYear$$inline_1168$$.getFullYear()) ? 366 : 365) ? 1 : 0), $currentDate$$inline_1047_weekOfYear$$inline_1168$$ = $currentDate$$inline_1047_weekOfYear$$inline_1168$$.$getWeekNumber$(), $JSCompiler_StaticMethods_putChip_$$($aChip$$inline_1164_hasPrevWeek$$inline_1051$$, $cutoff$$inline_1062_isWeekChip$$inline_1052_weekChipStartMins$$inline_1055_year$$inline_1167$$, $currentDate$$inline_1047_weekOfYear$$inline_1168$$, $JSCompiler_StaticMethods_putWeekChip_$self$$inline_1163_hasNextWeek$$inline_1050$$.$chipsByWeek_$, 
      $JSCompiler_StaticMethods_putWeekChip_$self$$inline_1163_hasNextWeek$$inline_1050$$.$tracksChipsByWeek_$));
      $currentDate$$inline_1047_weekOfYear$$inline_1168$$ = $tomorrow$$inline_1059$$
    }
    $JSCompiler_StaticMethods_buildAllDayGrid$self$$inline_1079_JSCompiler_StaticMethods_buildMonthGrid$self$$inline_1082_JSCompiler_StaticMethods_buildWeekGrid$self$$inline_1076_JSCompiler_temp_const$$827_allDayIndexes$$inline_1061$$ = $_log$$;
    $JSCompiler_StaticMethods_toHumanString$self$$inline_1065_formatStart$$inline_1069_startDate$$inline_1043$$ = $JSCompiler_StaticMethods_endEventCreation$self$$inline_653_aEvent$$23_sb$$inline_656_sb$$inline_659_sb$$inline_662$$.$temporaryEvent_$;
    $aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$ = $JSCompiler_StaticMethods_toHumanString$self$$inline_1065_formatStart$$inline_1069_startDate$$inline_1043$$.$startDate$;
    $JSCompiler_StaticMethods_addEvent$self$$inline_1041_endDate$$inline_1067$$ = $JSCompiler_StaticMethods_toHumanString$self$$inline_1065_formatStart$$inline_1069_startDate$$inline_1043$$.$endDate$;
    $allDay$$inline_1073_eventStartMins$$inline_1045_formatStringEnd$$inline_1072$$ = $JSCompiler_StaticMethods_toHumanString$self$$inline_1065_formatStart$$inline_1069_startDate$$inline_1043$$.$allDay$ || 0 == $aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$.getHours() && 0 == $aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$.getMinutes() && 0 == $JSCompiler_StaticMethods_addEvent$self$$inline_1041_endDate$$inline_1067$$.getHours() && 0 == $JSCompiler_StaticMethods_addEvent$self$$inline_1041_endDate$$inline_1067$$.getMinutes();
    $eventEndMins$$inline_1046_timeFormatString$$inline_1074$$ = " " + $goog$i18n$DateTimeSymbols_en$$.$TIMEFORMATS$[3];
    $allDay$$inline_1073_eventStartMins$$inline_1045_formatStringEnd$$inline_1072$$ && ($JSCompiler_StaticMethods_addEvent$self$$inline_1041_endDate$$inline_1067$$.add(new $goog$date$Interval$$($goog$date$Interval$DAYS$$, -1)), $eventEndMins$$inline_1046_timeFormatString$$inline_1074$$ = "");
    $aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$.getFullYear() != $JSCompiler_StaticMethods_addEvent$self$$inline_1041_endDate$$inline_1067$$.getFullYear() ? ($endDate$$inline_1044_formatEnd$$inline_1070_formatStringStart$$inline_1071$$ = $goog$i18n$DateTimePatterns$$.$MONTH_DAY_ABBR$ + $eventEndMins$$inline_1046_timeFormatString$$inline_1074$$, $JSCompiler_StaticMethods_toHumanString$self$$inline_1065_formatStart$$inline_1069_startDate$$inline_1043$$ = new $goog$i18n$DateTimeFormat$$($endDate$$inline_1044_formatEnd$$inline_1070_formatStringStart$$inline_1071$$ + 
    ", yyyy -"), $endDate$$inline_1044_formatEnd$$inline_1070_formatStringStart$$inline_1071$$ = new $goog$i18n$DateTimeFormat$$(" " + $endDate$$inline_1044_formatEnd$$inline_1070_formatStringStart$$inline_1071$$ + ", yyyy"), $aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$ = $JSCompiler_StaticMethods_format$$($JSCompiler_StaticMethods_toHumanString$self$$inline_1065_formatStart$$inline_1069_startDate$$inline_1043$$, $aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$) + 
    $JSCompiler_StaticMethods_format$$($endDate$$inline_1044_formatEnd$$inline_1070_formatStringStart$$inline_1071$$, $JSCompiler_StaticMethods_addEvent$self$$inline_1041_endDate$$inline_1067$$)) : $aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$.getMonth() != $JSCompiler_StaticMethods_addEvent$self$$inline_1041_endDate$$inline_1067$$.getMonth() ? ($endDate$$inline_1044_formatEnd$$inline_1070_formatStringStart$$inline_1071$$ = $goog$i18n$DateTimePatterns$$.$MONTH_DAY_ABBR$ + $eventEndMins$$inline_1046_timeFormatString$$inline_1074$$, 
    $JSCompiler_StaticMethods_toHumanString$self$$inline_1065_formatStart$$inline_1069_startDate$$inline_1043$$ = new $goog$i18n$DateTimeFormat$$($endDate$$inline_1044_formatEnd$$inline_1070_formatStringStart$$inline_1071$$ + " -"), $endDate$$inline_1044_formatEnd$$inline_1070_formatStringStart$$inline_1071$$ = new $goog$i18n$DateTimeFormat$$(" " + $endDate$$inline_1044_formatEnd$$inline_1070_formatStringStart$$inline_1071$$ + ", yyyy"), $aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$ = 
    $JSCompiler_StaticMethods_format$$($JSCompiler_StaticMethods_toHumanString$self$$inline_1065_formatStart$$inline_1069_startDate$$inline_1043$$, $aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$) + $JSCompiler_StaticMethods_format$$($endDate$$inline_1044_formatEnd$$inline_1070_formatStringStart$$inline_1071$$, $JSCompiler_StaticMethods_addEvent$self$$inline_1041_endDate$$inline_1067$$)) : $aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$.getDate() != $JSCompiler_StaticMethods_addEvent$self$$inline_1041_endDate$$inline_1067$$.getDate() ? 
    ($endDate$$inline_1044_formatEnd$$inline_1070_formatStringStart$$inline_1071$$ = $goog$i18n$DateTimePatterns$$.$DAY_ABBR$ + $eventEndMins$$inline_1046_timeFormatString$$inline_1074$$, $allDay$$inline_1073_eventStartMins$$inline_1045_formatStringEnd$$inline_1072$$ = " d" + $eventEndMins$$inline_1046_timeFormatString$$inline_1074$$ + " MMM, yyyy", $JSCompiler_StaticMethods_toHumanString$self$$inline_1065_formatStart$$inline_1069_startDate$$inline_1043$$ = new $goog$i18n$DateTimeFormat$$($endDate$$inline_1044_formatEnd$$inline_1070_formatStringStart$$inline_1071$$ + 
    " -"), $endDate$$inline_1044_formatEnd$$inline_1070_formatStringStart$$inline_1071$$ = new $goog$i18n$DateTimeFormat$$($allDay$$inline_1073_eventStartMins$$inline_1045_formatStringEnd$$inline_1072$$), $aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$ = $JSCompiler_StaticMethods_format$$($JSCompiler_StaticMethods_toHumanString$self$$inline_1065_formatStart$$inline_1069_startDate$$inline_1043$$, $aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$) + $JSCompiler_StaticMethods_format$$($endDate$$inline_1044_formatEnd$$inline_1070_formatStringStart$$inline_1071$$, 
    $JSCompiler_StaticMethods_addEvent$self$$inline_1041_endDate$$inline_1067$$)) : ($endDate$$inline_1044_formatEnd$$inline_1070_formatStringStart$$inline_1071$$ = "EEEE, " + $goog$i18n$DateTimePatterns$$.$MONTH_DAY_FULL$ + ", yyyy" + ($allDay$$inline_1073_eventStartMins$$inline_1045_formatStringEnd$$inline_1072$$ ? "" : " " + $eventEndMins$$inline_1046_timeFormatString$$inline_1074$$ + "-"), $JSCompiler_StaticMethods_toHumanString$self$$inline_1065_formatStart$$inline_1069_startDate$$inline_1043$$ = 
    new $goog$i18n$DateTimeFormat$$($endDate$$inline_1044_formatEnd$$inline_1070_formatStringStart$$inline_1071$$), $aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$ = $JSCompiler_StaticMethods_format$$($JSCompiler_StaticMethods_toHumanString$self$$inline_1065_formatStart$$inline_1069_startDate$$inline_1043$$, $aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$), $allDay$$inline_1073_eventStartMins$$inline_1045_formatStringEnd$$inline_1072$$ && (new $goog$i18n$DateTimeFormat$$($eventEndMins$$inline_1046_timeFormatString$$inline_1074$$), 
    $aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$ += $JSCompiler_StaticMethods_format$$($JSCompiler_StaticMethods_toHumanString$self$$inline_1065_formatStart$$inline_1069_startDate$$inline_1043$$, $JSCompiler_StaticMethods_addEvent$self$$inline_1041_endDate$$inline_1067$$)));
    $JSCompiler_StaticMethods_buildAllDayGrid$self$$inline_1079_JSCompiler_StaticMethods_buildMonthGrid$self$$inline_1082_JSCompiler_StaticMethods_buildWeekGrid$self$$inline_1076_JSCompiler_temp_const$$827_allDayIndexes$$inline_1061$$("this.temporaryEvent_.toHumanString()", $aEvent$$inline_1042_result$$inline_1068_startDate$$inline_1066$$);
    $JSCompiler_StaticMethods_endEventCreation$self$$inline_653_aEvent$$23_sb$$inline_656_sb$$inline_659_sb$$inline_662$$.$temporaryEvent_$ = $JSCompiler_alias_NULL$$;
    this.$eventManager_$.$run$();
    $JSCompiler_StaticMethods_updateBlockManager$$(this);
    2 == this.$selectionMask_$.$configuration_$ && ($_log$$("updateByRedrawWeekGrid"), $JSCompiler_StaticMethods_endEventCreation$self$$inline_653_aEvent$$23_sb$$inline_656_sb$$inline_659_sb$$inline_662$$ = new $goog$string$StringBuffer$$, $JSCompiler_StaticMethods_buildAllDayGrid$self$$inline_1079_JSCompiler_StaticMethods_buildMonthGrid$self$$inline_1082_JSCompiler_StaticMethods_buildWeekGrid$self$$inline_1076_JSCompiler_temp_const$$827_allDayIndexes$$inline_1061$$ = this.$mainPaneBuilder_$, $JSCompiler_StaticMethods_endEventCreation$self$$inline_653_aEvent$$23_sb$$inline_656_sb$$inline_659_sb$$inline_662$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[81]), 
    $JSCompiler_StaticMethods_endEventCreation$self$$inline_653_aEvent$$23_sb$$inline_656_sb$$inline_659_sb$$inline_662$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[82]), $JSCompiler_StaticMethods_buildWeekGridCols_$$($JSCompiler_StaticMethods_buildAllDayGrid$self$$inline_1079_JSCompiler_StaticMethods_buildMonthGrid$self$$inline_1082_JSCompiler_StaticMethods_buildWeekGrid$self$$inline_1076_JSCompiler_temp_const$$827_allDayIndexes$$inline_1061$$, $JSCompiler_StaticMethods_endEventCreation$self$$inline_653_aEvent$$23_sb$$inline_656_sb$$inline_659_sb$$inline_662$$, 
    82), this.$getDomHelper$().$getElement$("grid-table-wk").innerHTML = $JSCompiler_StaticMethods_endEventCreation$self$$inline_653_aEvent$$23_sb$$inline_656_sb$$inline_659_sb$$inline_662$$.toString());
    1 == this.$selectionMask_$.$configuration_$ && ($JSCompiler_StaticMethods_endEventCreation$self$$inline_653_aEvent$$23_sb$$inline_656_sb$$inline_659_sb$$inline_662$$ = new $goog$string$StringBuffer$$, $JSCompiler_StaticMethods_buildAllDayGrid$self$$inline_1079_JSCompiler_StaticMethods_buildMonthGrid$self$$inline_1082_JSCompiler_StaticMethods_buildWeekGrid$self$$inline_1076_JSCompiler_temp_const$$827_allDayIndexes$$inline_1061$$ = this.$mainPaneBuilder_$, $JSCompiler_StaticMethods_endEventCreation$self$$inline_653_aEvent$$23_sb$$inline_656_sb$$inline_659_sb$$inline_662$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[26]), 
    $JSCompiler_StaticMethods_endEventCreation$self$$inline_653_aEvent$$23_sb$$inline_656_sb$$inline_659_sb$$inline_662$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[27]), $JSCompiler_StaticMethods_buildWeekGridAdCols_$$($JSCompiler_StaticMethods_buildAllDayGrid$self$$inline_1079_JSCompiler_StaticMethods_buildMonthGrid$self$$inline_1082_JSCompiler_StaticMethods_buildWeekGrid$self$$inline_1076_JSCompiler_temp_const$$827_allDayIndexes$$inline_1061$$, $JSCompiler_StaticMethods_endEventCreation$self$$inline_653_aEvent$$23_sb$$inline_656_sb$$inline_659_sb$$inline_662$$, 
    27), this.$getDomHelper$().$getElement$("alldayevents-grid").innerHTML = $JSCompiler_StaticMethods_endEventCreation$self$$inline_653_aEvent$$23_sb$$inline_656_sb$$inline_659_sb$$inline_662$$.toString());
    3 == this.$selectionMask_$.$configuration_$ && ($JSCompiler_StaticMethods_endEventCreation$self$$inline_653_aEvent$$23_sb$$inline_656_sb$$inline_659_sb$$inline_662$$ = new $goog$string$StringBuffer$$, $JSCompiler_StaticMethods_buildAllDayGrid$self$$inline_1079_JSCompiler_StaticMethods_buildMonthGrid$self$$inline_1082_JSCompiler_StaticMethods_buildWeekGrid$self$$inline_1076_JSCompiler_temp_const$$827_allDayIndexes$$inline_1061$$ = this.$mainPaneBuilder_$, $JSCompiler_StaticMethods_endEventCreation$self$$inline_653_aEvent$$23_sb$$inline_656_sb$$inline_659_sb$$inline_662$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[48]), 
    $JSCompiler_StaticMethods_endEventCreation$self$$inline_653_aEvent$$23_sb$$inline_656_sb$$inline_659_sb$$inline_662$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[49]), $JSCompiler_StaticMethods_buildAllDayGrid$self$$inline_1079_JSCompiler_StaticMethods_buildMonthGrid$self$$inline_1082_JSCompiler_StaticMethods_buildWeekGrid$self$$inline_1076_JSCompiler_temp_const$$827_allDayIndexes$$inline_1061$$.$buildMonthGridRows_$($JSCompiler_StaticMethods_endEventCreation$self$$inline_653_aEvent$$23_sb$$inline_656_sb$$inline_659_sb$$inline_662$$, 
    49), $JSCompiler_StaticMethods_endEventCreation$self$$inline_653_aEvent$$23_sb$$inline_656_sb$$inline_659_sb$$inline_662$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[81]), this.$getDomHelper$().$getElement$("grid-table-mn").innerHTML = $JSCompiler_StaticMethods_endEventCreation$self$$inline_653_aEvent$$23_sb$$inline_656_sb$$inline_659_sb$$inline_662$$.toString())
  }
};
$JSCompiler_prototypeAlias$$.$onMainPaneScrollableScroll_$ = function $$JSCompiler_prototypeAlias$$$$onMainPaneScrollableScroll_$$($aEvent$$24_scrollable$$) {
  $aEvent$$24_scrollable$$ = $aEvent$$24_scrollable$$.target;
  var $scrollPos$$ = 0;
  $JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$) ? ($scrollPos$$ = $aEvent$$24_scrollable$$.scrollLeft, this.$blockManager_$.$blockPoolWeek$.scrollLeft = $scrollPos$$, this.$dom_$.$getElement$("weekmode-zippies-table").style.left = "-" + $scrollPos$$ + "px", this.$dom_$.$getElement$("weekmode-daynames-table").style.left = "-" + $scrollPos$$ + "px", this.$dom_$.$getElement$("main-pane-header-scrollable").scrollLeft = $scrollPos$$) : $JSCompiler_StaticMethods_isInMonthMode$$(this.$viewManager_$) && 
  ($scrollPos$$ = $aEvent$$24_scrollable$$.scrollTop, this.$blockManager_$.$blockPoolMonth$.scrollTop = $scrollPos$$, this.$dom_$.$getElement$("monthmode-zippies-table").style.top = "-" + $scrollPos$$ + "px")
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $rflect$cal$MainPane$$.$superClass_$.$disposeInternal$.call(this);
  $JSCompiler_StaticMethods_removeScrollListeners_$$(this);
  this.$containerSizeMonitor_$ = this.$timeManager_$ = this.$viewManager_$ = $JSCompiler_alias_NULL$$
};
function $rflect$cal$MainBody$$($aViewManager$$12$$, $aTimeManager$$9$$, $aEventManager$$7$$, $aContainerSizeMonitor$$5$$, $aBlockManager$$1$$) {
  $goog$ui$Component$$.call(this, $JSCompiler_alias_VOID$$);
  this.$viewManager_$ = $aViewManager$$12$$;
  this.$timeManager_$ = $aTimeManager$$9$$;
  this.$eventManager_$ = $aEventManager$$7$$;
  this.$containerSizeMonitor_$ = $aContainerSizeMonitor$$5$$;
  this.$blockManager_$ = $aBlockManager$$1$$;
  $JSCompiler_StaticMethods_addChild$$(this, this.$topPane_$ = new $rflect$cal$TopPane$$(this.$viewManager_$, this.$timeManager_$));
  $JSCompiler_StaticMethods_addChild$$(this, this.$mainPane_$ = new $rflect$cal$MainPane$$(this.$viewManager_$, this.$timeManager_$, this.$eventManager_$, this.$containerSizeMonitor_$, this.$blockManager_$));
  $JSCompiler_StaticMethods_addChild$$(this, this.$miniCal$ = new $rflect$cal$MiniCal$$(this.$viewManager_$, this.$timeManager_$));
  $JSCompiler_StaticMethods_addChild$$(this, this.$calSelector_$ = new $rflect$cal$CalSelector$$(this.$viewManager_$, this.$containerSizeMonitor_$));
  $JSCompiler_StaticMethods_addChild$$(this, this.$taskSelector_$ = new $rflect$cal$TaskSelector$$(this.$viewManager_$, this.$containerSizeMonitor_$));
  $_inspect$$("topPane_", this.$topPane_$);
  $_inspect$$("miniCal", this.$miniCal$);
  $_inspect$$("mainPane_", this.$mainPane_$);
  $_inspect$$("taskSelector_", this.$taskSelector_$);
  $_inspect$$("calSelector_", this.$calSelector_$)
}
$goog$inherits$$($rflect$cal$MainBody$$, $rflect$ui$Component$$);
var $rflect$cal$MainBody$HTML_PARTS_$$ = '<div id="main-container">;<div class="cal-container">;<div id="top-pane">;</div>;<div id="main-body">;<div id="left-pane">;<div id="left-main-pane">;<div id="month-selector">;</div>;<div id="calendars-selector" class="list-selector">;</div>;<div id="tasks-selector" class="list-selector">;</div>;</div>;<div id="left-aux-pane">;</div>;</div>;<div id="main-pane" class="main-pane">;</div>;</div>;</div>;</div>'.split(";");
$JSCompiler_prototypeAlias$$ = $rflect$cal$MainBody$$.prototype;
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  this.$decorateInternal$(this.$dom_$.createElement("div"))
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($aElement$$5$$, $opt_doNotBuildBody$$5$$) {
  $rflect$cal$MainBody$$.$superClass_$.$decorateInternal$.call(this, $aElement$$5$$, $opt_doNotBuildBody$$5$$);
  $opt_doNotBuildBody$$5$$ || (this.$getElement$().id = "main-container", this.$getElement$().className = "main-container")
};
$JSCompiler_prototypeAlias$$.$buildBodyInternal$ = function $$JSCompiler_prototypeAlias$$$$buildBodyInternal$$($aSb$$60$$) {
  for(var $counter$$20$$ = 1, $length$$40$$ = $rflect$cal$MainBody$HTML_PARTS_$$.length - 1;$counter$$20$$ < $length$$40$$;$counter$$20$$++) {
    switch($aSb$$60$$.append($rflect$cal$MainBody$HTML_PARTS_$$[$counter$$20$$]), $counter$$20$$) {
      case 2:
        $JSCompiler_StaticMethods_buildBody$$(this.$topPane_$, $aSb$$60$$);
        break;
      case 7:
        $JSCompiler_StaticMethods_buildBody$$(this.$miniCal$, $aSb$$60$$);
        break;
      case 9:
        $JSCompiler_StaticMethods_buildBody$$(this.$calSelector_$, $aSb$$60$$);
        break;
      case 11:
        $JSCompiler_StaticMethods_buildBody$$(this.$taskSelector_$, $aSb$$60$$);
        break;
      case 17:
        $JSCompiler_StaticMethods_buildBody$$(this.$mainPane_$, $aSb$$60$$)
    }
  }
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  this.$topPane_$.$decorateInternal$(this.$dom_$.$getElement$("top-pane"), $JSCompiler_alias_TRUE$$);
  this.$miniCal$.$decorateInternal$(this.$dom_$.$getElement$("month-selector"), $JSCompiler_alias_TRUE$$);
  this.$mainPane_$.$decorateInternal$(this.$dom_$.$getElement$("main-pane"), $JSCompiler_alias_TRUE$$);
  this.$calSelector_$.$decorateInternal$(this.$dom_$.$getElement$("calendars-selector"), $JSCompiler_alias_TRUE$$);
  this.$taskSelector_$.$decorateInternal$(this.$dom_$.$getElement$("tasks-selector"), $JSCompiler_alias_TRUE$$);
  $rflect$cal$MainBody$$.$superClass_$.$enterDocument$.call(this)
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $rflect$cal$MainBody$$.$superClass_$.$disposeInternal$.call(this);
  this.$blockManager_$ = this.$timeManager_$ = this.$viewManager_$ = this.$mainPane_$ = this.$miniCal$ = this.$topPane_$ = $JSCompiler_alias_NULL$$
};
function $rflect$cal$blocks$Block$$($opt_size$$, $opt_capacity$$, $opt_expanded$$) {
  this.size = $opt_size$$ || 0;
  this.$capacity$ = $opt_capacity$$ || 0;
  this.$expanded$ = $opt_expanded$$ || $JSCompiler_alias_FALSE$$
}
function $rflect$cal$blocks$Block$sort$$($a$$30$$, $b$$30$$) {
  var $diff$$3$$ = 0, $startComparison$$ = 0 < ($diff$$3$$ = $a$$30$$.start - $b$$30$$.start) ? 1 : 0 > $diff$$3$$ ? -1 : 0;
  return 0 != $startComparison$$ ? $startComparison$$ : 0 < ($diff$$3$$ = $b$$30$$.end - $a$$30$$.end) ? 1 : 0 > $diff$$3$$ ? -1 : 0
}
$JSCompiler_prototypeAlias$$ = $rflect$cal$blocks$Block$$.prototype;
$JSCompiler_prototypeAlias$$.$expanded$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$couldBeExpanded$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$couldBeCollapsed$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$capacity$ = 0;
$JSCompiler_prototypeAlias$$.size = 0;
$JSCompiler_prototypeAlias$$.position = 0;
$JSCompiler_prototypeAlias$$.$clone$ = function $$JSCompiler_prototypeAlias$$$$clone$$() {
  return new $rflect$cal$blocks$Block$$(this.size, this.$capacity$, this.$expanded$)
};
function $rflect$cal$blocks$BlockPool$$($aIsHorizontal$$) {
  this.$isHorizontal_$ = $aIsHorizontal$$;
  this.$blocks$ = []
}
$JSCompiler_prototypeAlias$$ = $rflect$cal$blocks$BlockPool$$.prototype;
$JSCompiler_prototypeAlias$$.$isHorizontal_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$blocksNumber_$ = 0;
$JSCompiler_prototypeAlias$$.$expanded$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$gridSize$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$gridContainerSize$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.scrollTop = 0;
$JSCompiler_prototypeAlias$$.scrollLeft = 0;
$JSCompiler_prototypeAlias$$.add = function $$JSCompiler_prototypeAlias$$$add$($opt_block$$) {
  this.$blocks$[this.$blocks$.length] = $opt_block$$ || new $rflect$cal$blocks$Block$$
};
$JSCompiler_prototypeAlias$$.clear = function $$JSCompiler_prototypeAlias$$$clear$() {
  this.$blocks$.length = 0
};
$JSCompiler_prototypeAlias$$.fill = function cal_BlockManager_fill($opt_number$$, $opt_prototypeBlock$$) {
  for(var $number$$ = $opt_number$$ || 7, $counter$$22$$ = 0;$counter$$22$$ < $number$$;) {
    this.$blocks$[$counter$$22$$] = $opt_prototypeBlock$$ ? $opt_prototypeBlock$$.$clone$() : new $rflect$cal$blocks$Block$$, $counter$$22$$++
  }
};
function $JSCompiler_StaticMethods_updateExpandState_$$($JSCompiler_StaticMethods_updateExpandState_$self$$) {
  for(var $index$$72$$ = 0;$index$$72$$ < $JSCompiler_StaticMethods_updateExpandState_$self$$.$blocksNumber_$;$index$$72$$++) {
    if($JSCompiler_StaticMethods_updateExpandState_$self$$.$blocks$[$index$$72$$].$expanded$) {
      $JSCompiler_StaticMethods_updateExpandState_$self$$.$expanded$ = $JSCompiler_alias_TRUE$$;
      return
    }
  }
  $JSCompiler_StaticMethods_updateExpandState_$self$$.$expanded$ = $JSCompiler_alias_FALSE$$
}
function $JSCompiler_StaticMethods_updateCollapsedBlocks$$($JSCompiler_StaticMethods_updateCollapsedBlocks$self$$) {
  var $nominalSize$$ = 0, $block$$4$$;
  $JSCompiler_StaticMethods_updateCollapsedBlocks$self$$.$isHorizontal_$ ? ($JSCompiler_StaticMethods_updateCollapsedBlocks$self$$.$gridSize$.width = 0, $nominalSize$$ = $JSCompiler_StaticMethods_updateCollapsedBlocks$self$$.$gridContainerSize$.width / $JSCompiler_StaticMethods_updateCollapsedBlocks$self$$.$blocksNumber_$) : ($JSCompiler_StaticMethods_updateCollapsedBlocks$self$$.$gridSize$.height = 0, $nominalSize$$ = $JSCompiler_StaticMethods_updateCollapsedBlocks$self$$.$gridContainerSize$.height / 
  $JSCompiler_StaticMethods_updateCollapsedBlocks$self$$.$blocksNumber_$);
  for(var $counter$$23$$ = 0;$counter$$23$$ < $JSCompiler_StaticMethods_updateCollapsedBlocks$self$$.$blocksNumber_$;$counter$$23$$++) {
    if(!($block$$4$$ = $JSCompiler_StaticMethods_updateCollapsedBlocks$self$$.$blocks$[$counter$$23$$]).$expanded$) {
      $block$$4$$.size = $nominalSize$$, $JSCompiler_StaticMethods_updateCollapsedBlocks$self$$.$nominalCapacity$ = $JSCompiler_StaticMethods_updateCollapsedBlocks$self$$.$isHorizontal_$ ? Math.floor(($nominalSize$$ - 12 - 1) / (($JSCompiler_StaticMethods_updateCollapsedBlocks$self$$.$blocksNumber_$ - 7) * (11 / -6) + 11)) : Math.floor(($nominalSize$$ - 14 - 1) / 17), $block$$4$$.$capacity$ = $JSCompiler_StaticMethods_updateCollapsedBlocks$self$$.$nominalCapacity$, $block$$4$$.$couldBeCollapsed$ = 
      $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_updateCollapsedBlocks$self$$.$isHorizontal_$ ? $JSCompiler_StaticMethods_updateCollapsedBlocks$self$$.$gridSize$.width += $nominalSize$$ : $JSCompiler_StaticMethods_updateCollapsedBlocks$self$$.$gridSize$.height += $nominalSize$$
    }
  }
}
function $JSCompiler_StaticMethods_updateEventMap$$($JSCompiler_StaticMethods_updateEventMap$self$$, $aChips$$2$$, $opt_createArrays$$, $opt_arraysLength$$) {
  for(var $counter$$24$$ = 0;$counter$$24$$ < $JSCompiler_StaticMethods_updateEventMap$self$$.$blocksNumber_$;$counter$$24$$++) {
    var $JSCompiler_StaticMethods_computeEventMap$self$$inline_666_JSCompiler_StaticMethods_createSparseArraysFromBlobs$self$$inline_692$$ = $JSCompiler_StaticMethods_updateEventMap$self$$.$blocks$[$counter$$24$$], $aChips$$inline_667_blobs$$inline_694$$ = $aChips$$2$$[$counter$$24$$], $i$$inline_668_sparseArrays$$inline_695$$ = 0, $aDaysNumber$$inline_693_blobCounter$$inline_697_length$$inline_669$$ = 0, $blobLength$$inline_698_blobs$$inline_670_counter$$inline_696$$ = [], $blob$$inline_699_currentBlob$$inline_671$$ = 
    [], $chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$ = 0, $blobEntryCounter$$inline_700_maxCol$$inline_673$$ = 0;
    $aChips$$inline_667_blobs$$inline_694$$.sort($rflect$cal$blocks$Block$sort$$);
    for(var $blobEntriesLength$$inline_701_latestItemEnd$$inline_674$$ = $JSCompiler_alias_VOID$$, $chip$$inline_703_colEndArray$$inline_675$$ = [], $i$$inline_668_sparseArrays$$inline_695$$ = 0, $aDaysNumber$$inline_693_blobCounter$$inline_697_length$$inline_669$$ = $aChips$$inline_667_blobs$$inline_694$$.length;$i$$inline_668_sparseArrays$$inline_695$$ < $aDaysNumber$$inline_693_blobCounter$$inline_697_length$$inline_669$$;++$i$$inline_668_sparseArrays$$inline_695$$) {
      var $blobEntry$$inline_702_chip$$inline_676_startCol$$inline_704$$ = $aChips$$inline_667_blobs$$inline_694$$[$i$$inline_668_sparseArrays$$inline_695$$], $itemStart$$inline_677_start$$inline_705$$ = $blobEntry$$inline_702_chip$$inline_676_startCol$$inline_704$$.start, $chipCounter$$inline_706_itemEnd$$inline_678$$ = $blobEntry$$inline_702_chip$$inline_676_startCol$$inline_704$$.end;
      $blobEntriesLength$$inline_701_latestItemEnd$$inline_674$$ || ($blobEntriesLength$$inline_701_latestItemEnd$$inline_674$$ = $chipCounter$$inline_706_itemEnd$$inline_678$$);
      $blob$$inline_699_currentBlob$$inline_671$$.length && ($blobEntriesLength$$inline_701_latestItemEnd$$inline_674$$ && $itemStart$$inline_677_start$$inline_705$$ >= $blobEntriesLength$$inline_701_latestItemEnd$$inline_674$$) && ($blobLength$$inline_698_blobs$$inline_670_counter$$inline_696$$.push({blob:$blob$$inline_699_currentBlob$$inline_671$$, $totalCols$:$chip$$inline_703_colEndArray$$inline_675$$.length}), $blob$$inline_699_currentBlob$$inline_671$$ = [], $chip$$inline_703_colEndArray$$inline_675$$ = 
      []);
      for(var $chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$ = $JSCompiler_alias_FALSE$$, $end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$ = 0, $colEndArrayLength$$inline_681_currentBlobLength$$inline_685_spanOfShrunkItem$$inline_686$$ = $chip$$inline_703_colEndArray$$inline_675$$.length;$end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$ < $colEndArrayLength$$inline_681_currentBlobLength$$inline_685_spanOfShrunkItem$$inline_686$$;++$end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$) {
        if($chip$$inline_703_colEndArray$$inline_675$$[$end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$].end <= $itemStart$$inline_677_start$$inline_705$$) {
          $chip$$inline_703_colEndArray$$inline_675$$[$end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$] = $blobEntry$$inline_702_chip$$inline_676_startCol$$inline_704$$;
          for($chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$ = Number($end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$) + 1;$chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$ < $chip$$inline_703_colEndArray$$inline_675$$.length && !($chip$$inline_703_colEndArray$$inline_675$$[$chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$].end > 
          $itemStart$$inline_677_start$$inline_705$$);) {
            $chip$$inline_703_colEndArray$$inline_675$$[$chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$] = $blobEntry$$inline_702_chip$$inline_676_startCol$$inline_704$$, $chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$++
          }
          $blob$$inline_699_currentBlob$$inline_671$$.push({$chip$:$blobEntry$$inline_702_chip$$inline_676_startCol$$inline_704$$, $startCol$:$end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$, colSpan:$chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$ - $end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$});
          $end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$ > $blobEntryCounter$$inline_700_maxCol$$inline_673$$ && ($blobEntryCounter$$inline_700_maxCol$$inline_673$$ = $end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$);
          $blobEntriesLength$$inline_701_latestItemEnd$$inline_674$$ && $chipCounter$$inline_706_itemEnd$$inline_678$$ > $blobEntriesLength$$inline_701_latestItemEnd$$inline_674$$ && ($blobEntriesLength$$inline_701_latestItemEnd$$inline_674$$ = $chipCounter$$inline_706_itemEnd$$inline_678$$);
          $chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$ = $JSCompiler_alias_TRUE$$;
          break
        }
      }
      if(!$chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$) {
        $end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$ = 1;
        for($colEndArrayLength$$inline_681_currentBlobLength$$inline_685_spanOfShrunkItem$$inline_686$$ = $chip$$inline_703_colEndArray$$inline_675$$.length;$end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$ < $colEndArrayLength$$inline_681_currentBlobLength$$inline_685_spanOfShrunkItem$$inline_686$$;++$end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$) {
          if($goog$getUid$$($chip$$inline_703_colEndArray$$inline_675$$[$end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$]) == $goog$getUid$$($chip$$inline_703_colEndArray$$inline_675$$[$end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$ - 1])) {
            for(var $kk$$inline_684_mm$$inline_689$$ = 1, $colEndArrayLength$$inline_681_currentBlobLength$$inline_685_spanOfShrunkItem$$inline_686$$ = $blob$$inline_699_currentBlob$$inline_671$$.length;$kk$$inline_684_mm$$inline_689$$ < $colEndArrayLength$$inline_681_currentBlobLength$$inline_685_spanOfShrunkItem$$inline_686$$;++$kk$$inline_684_mm$$inline_689$$) {
              if($goog$getUid$$($blob$$inline_699_currentBlob$$inline_671$$[$kk$$inline_684_mm$$inline_689$$].$chip$) == $goog$getUid$$($chip$$inline_703_colEndArray$$inline_675$$[$end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$])) {
                $colEndArrayLength$$inline_681_currentBlobLength$$inline_685_spanOfShrunkItem$$inline_686$$ = $blob$$inline_699_currentBlob$$inline_671$$[$kk$$inline_684_mm$$inline_689$$].colSpan;
                $blob$$inline_699_currentBlob$$inline_671$$.push({$chip$:$blobEntry$$inline_702_chip$$inline_676_startCol$$inline_704$$, $startCol$:$chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$ = Number($blob$$inline_699_currentBlob$$inline_671$$[$kk$$inline_684_mm$$inline_689$$].$startCol$) + 1, colSpan:$colEndArrayLength$$inline_681_currentBlobLength$$inline_685_spanOfShrunkItem$$inline_686$$ - 1});
                $chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$ > $blobEntryCounter$$inline_700_maxCol$$inline_673$$ && ($blobEntryCounter$$inline_700_maxCol$$inline_673$$ = $chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$);
                for($chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$ = $end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$;$chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$ < $end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$ + $colEndArrayLength$$inline_681_currentBlobLength$$inline_685_spanOfShrunkItem$$inline_686$$ - 
                1;$chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$++) {
                  $chip$$inline_703_colEndArray$$inline_675$$[$chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$] = $blobEntry$$inline_702_chip$$inline_676_startCol$$inline_704$$
                }
                $blob$$inline_699_currentBlob$$inline_671$$[$kk$$inline_684_mm$$inline_689$$] = {$chip$:$blob$$inline_699_currentBlob$$inline_671$$[$kk$$inline_684_mm$$inline_689$$].$chip$, $startCol$:$chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$ = $blob$$inline_699_currentBlob$$inline_671$$[$kk$$inline_684_mm$$inline_689$$].$startCol$, colSpan:1};
                $chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$ > $blobEntryCounter$$inline_700_maxCol$$inline_673$$ && ($blobEntryCounter$$inline_700_maxCol$$inline_673$$ = $chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$);
                $blobEntriesLength$$inline_701_latestItemEnd$$inline_674$$ && $chipCounter$$inline_706_itemEnd$$inline_678$$ > $blobEntriesLength$$inline_701_latestItemEnd$$inline_674$$ && ($blobEntriesLength$$inline_701_latestItemEnd$$inline_674$$ = $chipCounter$$inline_706_itemEnd$$inline_678$$);
                break
              }
            }
            $chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$ = $JSCompiler_alias_TRUE$$;
            break
          }
        }
        if(!$chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$) {
          $end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$ = $chip$$inline_703_colEndArray$$inline_675$$.length;
          $kk$$inline_684_mm$$inline_689$$ = 1;
          for($colEndArrayLength$$inline_681_currentBlobLength$$inline_685_spanOfShrunkItem$$inline_686$$ = $blob$$inline_699_currentBlob$$inline_671$$.length;$kk$$inline_684_mm$$inline_689$$ < $colEndArrayLength$$inline_681_currentBlobLength$$inline_685_spanOfShrunkItem$$inline_686$$;++$kk$$inline_684_mm$$inline_689$$) {
            $chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$ = $blob$$inline_699_currentBlob$$inline_671$$[$kk$$inline_684_mm$$inline_689$$].$chip$.end, $blob$$inline_699_currentBlob$$inline_671$$[$kk$$inline_684_mm$$inline_689$$].$startCol$ + $blob$$inline_699_currentBlob$$inline_671$$[$kk$$inline_684_mm$$inline_689$$].colSpan == $end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$ && $chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$ <= 
            $itemStart$$inline_677_start$$inline_705$$ && ($blob$$inline_699_currentBlob$$inline_671$$[$kk$$inline_684_mm$$inline_689$$] = {$chip$:$blob$$inline_699_currentBlob$$inline_671$$[$kk$$inline_684_mm$$inline_689$$].$chip$, $startCol$:$chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$ = $blob$$inline_699_currentBlob$$inline_671$$[$kk$$inline_684_mm$$inline_689$$].$startCol$, colSpan:$blob$$inline_699_currentBlob$$inline_671$$[$kk$$inline_684_mm$$inline_689$$].colSpan + 
            1}, $chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$ > $blobEntryCounter$$inline_700_maxCol$$inline_673$$ && ($blobEntryCounter$$inline_700_maxCol$$inline_673$$ = $chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$))
          }
          $blob$$inline_699_currentBlob$$inline_671$$.push({$chip$:$blobEntry$$inline_702_chip$$inline_676_startCol$$inline_704$$, $startCol$:$chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$ = $chip$$inline_703_colEndArray$$inline_675$$.length, colSpan:1});
          $chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$ > $blobEntryCounter$$inline_700_maxCol$$inline_673$$ && ($blobEntryCounter$$inline_700_maxCol$$inline_673$$ = $chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$);
          $chip$$inline_703_colEndArray$$inline_675$$.push($blobEntry$$inline_702_chip$$inline_676_startCol$$inline_704$$);
          $blobEntriesLength$$inline_701_latestItemEnd$$inline_674$$ && $chipCounter$$inline_706_itemEnd$$inline_678$$ > $blobEntriesLength$$inline_701_latestItemEnd$$inline_674$$ && ($blobEntriesLength$$inline_701_latestItemEnd$$inline_674$$ = $chipCounter$$inline_706_itemEnd$$inline_678$$)
        }
      }
    }
    $blobLength$$inline_698_blobs$$inline_670_counter$$inline_696$$.push({blob:$blob$$inline_699_currentBlob$$inline_671$$, $totalCols$:$chip$$inline_703_colEndArray$$inline_675$$.length});
    $JSCompiler_StaticMethods_computeEventMap$self$$inline_666_JSCompiler_StaticMethods_createSparseArraysFromBlobs$self$$inline_692$$.$blobs$ = $blobLength$$inline_698_blobs$$inline_670_counter$$inline_696$$;
    if($opt_createArrays$$) {
      $JSCompiler_StaticMethods_computeEventMap$self$$inline_666_JSCompiler_StaticMethods_createSparseArraysFromBlobs$self$$inline_692$$ = $JSCompiler_StaticMethods_updateEventMap$self$$.$blocks$[$counter$$24$$];
      $aDaysNumber$$inline_693_blobCounter$$inline_697_length$$inline_669$$ = $opt_arraysLength$$ || 0;
      $aChips$$inline_667_blobs$$inline_694$$ = $JSCompiler_StaticMethods_computeEventMap$self$$inline_666_JSCompiler_StaticMethods_createSparseArraysFromBlobs$self$$inline_692$$.$blobs$;
      $i$$inline_668_sparseArrays$$inline_695$$ = [];
      for($blobLength$$inline_698_blobs$$inline_670_counter$$inline_696$$ = 0;$blobLength$$inline_698_blobs$$inline_670_counter$$inline_696$$ < $aDaysNumber$$inline_693_blobCounter$$inline_697_length$$inline_669$$;$blobLength$$inline_698_blobs$$inline_670_counter$$inline_696$$++) {
        $i$$inline_668_sparseArrays$$inline_695$$[$blobLength$$inline_698_blobs$$inline_670_counter$$inline_696$$] = []
      }
      $aDaysNumber$$inline_693_blobCounter$$inline_697_length$$inline_669$$ = 0;
      for($blobLength$$inline_698_blobs$$inline_670_counter$$inline_696$$ = $aChips$$inline_667_blobs$$inline_694$$.length;$aDaysNumber$$inline_693_blobCounter$$inline_697_length$$inline_669$$ < $blobLength$$inline_698_blobs$$inline_670_counter$$inline_696$$;$aDaysNumber$$inline_693_blobCounter$$inline_697_length$$inline_669$$++) {
        $blob$$inline_699_currentBlob$$inline_671$$ = $aChips$$inline_667_blobs$$inline_694$$[$aDaysNumber$$inline_693_blobCounter$$inline_697_length$$inline_669$$].blob;
        $blobEntryCounter$$inline_700_maxCol$$inline_673$$ = 0;
        for($blobEntriesLength$$inline_701_latestItemEnd$$inline_674$$ = $blob$$inline_699_currentBlob$$inline_671$$.length;$blobEntryCounter$$inline_700_maxCol$$inline_673$$ < $blobEntriesLength$$inline_701_latestItemEnd$$inline_674$$;$blobEntryCounter$$inline_700_maxCol$$inline_673$$++) {
          $blobEntry$$inline_702_chip$$inline_676_startCol$$inline_704$$ = $blob$$inline_699_currentBlob$$inline_671$$[$blobEntryCounter$$inline_700_maxCol$$inline_673$$];
          $chip$$inline_703_colEndArray$$inline_675$$ = $blobEntry$$inline_702_chip$$inline_676_startCol$$inline_704$$.$chip$;
          $blobEntry$$inline_702_chip$$inline_676_startCol$$inline_704$$ = $blobEntry$$inline_702_chip$$inline_676_startCol$$inline_704$$.$startCol$;
          $chipCounter$$inline_706_itemEnd$$inline_678$$ = $itemStart$$inline_677_start$$inline_705$$ = $chip$$inline_703_colEndArray$$inline_675$$.start;
          for($end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$ = $chip$$inline_703_colEndArray$$inline_675$$.end;$chipCounter$$inline_706_itemEnd$$inline_678$$ < $end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$;$chipCounter$$inline_706_itemEnd$$inline_678$$++) {
            $chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$ = $chip$$inline_703_colEndArray$$inline_675$$.$clone$(), $chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$.$startIsCut$ = $chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$.$endIsCut$ = $chipCounter$$inline_706_itemEnd$$inline_678$$ > 
            $itemStart$$inline_677_start$$inline_705$$ && $chipCounter$$inline_706_itemEnd$$inline_678$$ < $end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$ - 1, $chipCounter$$inline_706_itemEnd$$inline_678$$ == $itemStart$$inline_677_start$$inline_705$$ && 1 < $end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$ - $itemStart$$inline_677_start$$inline_705$$ && ($chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$.$endIsCut$ = 
            $JSCompiler_alias_TRUE$$), $chipCounter$$inline_706_itemEnd$$inline_678$$ == $end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$ - 1 && 1 < $end$$inline_707_ii$$inline_680_jj$$inline_683_lastColNum$$inline_688$$ - $itemStart$$inline_677_start$$inline_705$$ && ($chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$.$startIsCut$ = $JSCompiler_alias_TRUE$$), $i$$inline_668_sparseArrays$$inline_695$$[$chipCounter$$inline_706_itemEnd$$inline_678$$][$blobEntry$$inline_702_chip$$inline_676_startCol$$inline_704$$] = 
            $chipClone$$inline_708_lastCol$$inline_682_ll$$inline_687_mmEnd$$inline_690_placedItem$$inline_679_startCol$$inline_672$$
          }
        }
      }
      $JSCompiler_StaticMethods_computeEventMap$self$$inline_666_JSCompiler_StaticMethods_createSparseArraysFromBlobs$self$$inline_692$$.$sparseArrays$ = $i$$inline_668_sparseArrays$$inline_695$$
    }
    $JSCompiler_StaticMethods_updateEventMap$self$$.$blocks$[$counter$$24$$].$expanded$ || ($JSCompiler_StaticMethods_updateEventMap$self$$.$blocks$[$counter$$24$$].$couldBeExpanded$ = $JSCompiler_alias_TRUE$$)
  }
}
function $JSCompiler_StaticMethods_updateExpandedBlocks$$($JSCompiler_StaticMethods_updateExpandedBlocks$self$$) {
  for(var $cumulativeSize$$ = 0, $counter$$25$$ = 0;$counter$$25$$ < $JSCompiler_StaticMethods_updateExpandedBlocks$self$$.$blocksNumber_$;$counter$$25$$++) {
    var $block$$5$$ = $JSCompiler_StaticMethods_updateExpandedBlocks$self$$.$blocks$[$counter$$25$$];
    $block$$5$$.$expanded$ && ($block$$5$$.$capacity$ = 10, $block$$5$$.size = $JSCompiler_StaticMethods_updateExpandedBlocks$self$$.$isHorizontal_$ ? $block$$5$$.$capacity$ * (-15 * ($JSCompiler_StaticMethods_updateExpandedBlocks$self$$.$blocksNumber_$ - 7) + 90) + 13 : 17 * $block$$5$$.$capacity$ + 15, $block$$5$$.$couldBeCollapsed$ = $block$$5$$.$capacity$ > $JSCompiler_StaticMethods_updateExpandedBlocks$self$$.$nominalCapacity$, $block$$5$$.$couldBeExpanded$ = $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_updateExpandedBlocks$self$$.$isHorizontal_$ ? 
    $JSCompiler_StaticMethods_updateExpandedBlocks$self$$.$gridSize$.width += $block$$5$$.size : $JSCompiler_StaticMethods_updateExpandedBlocks$self$$.$gridSize$.height += $block$$5$$.size);
    $block$$5$$.position = $cumulativeSize$$;
    $cumulativeSize$$ += $block$$5$$.size
  }
}
;function $rflect$cal$blocks$BlockManager$$($JSCompiler_StaticMethods_setBlocksNumber$self$$inline_710_aViewManager$$13$$, $aTimeManager$$10$$, $aEventManager$$8$$) {
  this.$viewManager_$ = $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_710_aViewManager$$13$$;
  this.$timeManager_$ = $aTimeManager$$10$$;
  this.$eventManager_$ = $aEventManager$$8$$;
  this.$blockPoolWeek$ = new $rflect$cal$blocks$BlockPool$$($JSCompiler_alias_TRUE$$);
  this.$blockPoolWeek$.fill();
  this.$blockPoolMonth$ = new $rflect$cal$blocks$BlockPool$$($JSCompiler_alias_FALSE$$);
  this.$blockPoolMonth$.fill(6);
  this.$blockPoolAllday$ = new $rflect$cal$blocks$BlockPool$$($JSCompiler_alias_FALSE$$);
  this.$blockPoolAllday$.fill(1);
  $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_710_aViewManager$$13$$ = this.$blockPoolAllday$;
  $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_710_aViewManager$$13$$.$blocksNumber_$ = 1;
  $JSCompiler_StaticMethods_updateExpandState_$$($JSCompiler_StaticMethods_setBlocksNumber$self$$inline_710_aViewManager$$13$$)
}
$rflect$cal$blocks$BlockManager$$.prototype.update = function $$rflect$cal$blocks$BlockManager$$$$update$() {
  if($JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$)) {
    var $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_713_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_716_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_719$$ = this.$blockPoolWeek$;
    $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_713_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_716_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_719$$.$blocksNumber_$ = this.$timeManager_$.$daySeries$.length;
    $JSCompiler_StaticMethods_updateExpandState_$$($JSCompiler_StaticMethods_setBlocksNumber$self$$inline_713_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_716_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_719$$);
    $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_713_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_716_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_719$$ = this.$blockPoolAllday$;
    $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_713_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_716_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_719$$.$blocksNumber_$ = 1;
    $JSCompiler_StaticMethods_updateExpandState_$$($JSCompiler_StaticMethods_setBlocksNumber$self$$inline_713_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_716_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_719$$);
    $JSCompiler_StaticMethods_updateCollapsedBlocks$$(this.$blockPoolWeek$);
    $JSCompiler_StaticMethods_updateCollapsedBlocks$$(this.$blockPoolAllday$);
    $JSCompiler_StaticMethods_updateEventMap$$(this.$blockPoolWeek$, this.$eventManager_$.$dayChips$);
    $JSCompiler_StaticMethods_updateEventMap$$(this.$blockPoolAllday$, this.$eventManager_$.$allDayChips$, $JSCompiler_alias_TRUE$$, this.$blockPoolWeek$.$blocksNumber_$);
    $JSCompiler_StaticMethods_updateExpandedBlocks$$(this.$blockPoolWeek$);
    $JSCompiler_StaticMethods_updateExpandedBlocks$$(this.$blockPoolAllday$)
  }else {
    $JSCompiler_StaticMethods_isInMonthMode$$(this.$viewManager_$) && ($JSCompiler_StaticMethods_setBlocksNumber$self$$inline_713_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_716_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_719$$ = this.$blockPoolMonth$, $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_713_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_716_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_719$$.$blocksNumber_$ = this.$timeManager_$.$daySeries$.length / 
    7, $JSCompiler_StaticMethods_updateExpandState_$$($JSCompiler_StaticMethods_setBlocksNumber$self$$inline_713_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_716_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_719$$), $JSCompiler_StaticMethods_updateCollapsedBlocks$$(this.$blockPoolMonth$), $JSCompiler_StaticMethods_updateEventMap$$(this.$blockPoolMonth$, this.$eventManager_$.$weekChips$), $JSCompiler_StaticMethods_updateExpandedBlocks$$(this.$blockPoolMonth$))
  }
};
function $goog$dom$ViewportSizeMonitor$$($opt_window$$3$$) {
  $goog$Disposable$$.call(this);
  this.$window_$ = $opt_window$$3$$ || window;
  this.$listenerKey_$ = $goog$events$listen$$(this.$window_$, "resize", this.$handleResize_$, $JSCompiler_alias_FALSE$$, this);
  this.$size_$ = $goog$dom$getViewportSize_$$(this.$window_$ || window);
  if($goog$userAgent$WEBKIT$$ && $goog$userAgent$detectedWindows_$$ || $goog$userAgent$OPERA$$ && this.$window_$.self != this.$window_$.top) {
    this.$windowSizePollInterval_$ = window.setInterval($goog$bind$$(this.$checkForSizeChange_$, this), $goog$dom$ViewportSizeMonitor$WINDOW_SIZE_POLL_RATE$$)
  }
}
$goog$inherits$$($goog$dom$ViewportSizeMonitor$$, $goog$events$EventTarget$$);
var $goog$dom$ViewportSizeMonitor$WINDOW_SIZE_POLL_RATE$$ = 500;
$JSCompiler_prototypeAlias$$ = $goog$dom$ViewportSizeMonitor$$.prototype;
$JSCompiler_prototypeAlias$$.$listenerKey_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$window_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$size_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$windowSizePollInterval_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$getSize$ = function $$JSCompiler_prototypeAlias$$$$getSize$$() {
  return this.$size_$ ? this.$size_$.$clone$() : $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$dom$ViewportSizeMonitor$$.$superClass_$.$disposeInternal$.call(this);
  this.$listenerKey_$ && ($goog$events$unlistenByKey$$(this.$listenerKey_$), this.$listenerKey_$ = $JSCompiler_alias_NULL$$);
  this.$windowSizePollInterval_$ && (window.clearInterval(this.$windowSizePollInterval_$), this.$windowSizePollInterval_$ = $JSCompiler_alias_NULL$$);
  this.$size_$ = this.$window_$ = $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$handleResize_$ = function $$JSCompiler_prototypeAlias$$$$handleResize_$$() {
  this.$checkForSizeChange_$()
};
$JSCompiler_prototypeAlias$$.$checkForSizeChange_$ = function $$JSCompiler_prototypeAlias$$$$checkForSizeChange_$$() {
  var $size$$15$$ = $goog$dom$getViewportSize_$$(this.$window_$ || window);
  $goog$math$Size$equals$$($size$$15$$, this.$size_$) || (this.$size_$ = $size$$15$$, this.dispatchEvent("resize"))
};
function $rflect$cal$ContainerSizeMonitor$$($aViewManager$$14_outerDiv$$inline_724$$, $aContainer$$2_innerDiv$$inline_725_width$$inline_726$$, $opt_window$$6$$) {
  $goog$dom$ViewportSizeMonitor$$.call(this, $opt_window$$6$$);
  this.$container_$ = $aContainer$$2_innerDiv$$inline_725_width$$inline_726$$;
  this.$containerSize_$ = new $goog$math$Size$$(this.$container_$.clientWidth, this.$container_$.clientHeight);
  $aViewManager$$14_outerDiv$$inline_724$$ = document.createElement("div");
  $aViewManager$$14_outerDiv$$inline_724$$.style.cssText = "overflow:auto;position:absolute;top:0;width:100px;height:100px";
  $aContainer$$2_innerDiv$$inline_725_width$$inline_726$$ = document.createElement("div");
  $goog$style$setSize$$($aContainer$$2_innerDiv$$inline_725_width$$inline_726$$, "200px", "200px");
  $aViewManager$$14_outerDiv$$inline_724$$.appendChild($aContainer$$2_innerDiv$$inline_725_width$$inline_726$$);
  document.body.appendChild($aViewManager$$14_outerDiv$$inline_724$$);
  $aContainer$$2_innerDiv$$inline_725_width$$inline_726$$ = $aViewManager$$14_outerDiv$$inline_724$$.offsetWidth - $aViewManager$$14_outerDiv$$inline_724$$.clientWidth;
  $goog$dom$removeNode$$($aViewManager$$14_outerDiv$$inline_724$$);
  this.$scrollbarWidth$ = $aContainer$$2_innerDiv$$inline_725_width$$inline_726$$
}
$goog$inherits$$($rflect$cal$ContainerSizeMonitor$$, $goog$dom$ViewportSizeMonitor$$);
$JSCompiler_prototypeAlias$$ = $rflect$cal$ContainerSizeMonitor$$.prototype;
$JSCompiler_prototypeAlias$$.$scrollbarWidth$ = 0;
$JSCompiler_prototypeAlias$$.$windowSizePollTimeout_$ = 0;
$JSCompiler_prototypeAlias$$.$getSize$ = function $$JSCompiler_prototypeAlias$$$$getSize$$() {
  return this.$containerSize_$ ? this.$containerSize_$.$clone$() : $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$checkForSizeChange_$ = function $$JSCompiler_prototypeAlias$$$$checkForSizeChange_$$($aNotActualResize$$) {
  var $containerSize$$inline_729_viewportSize$$ = $goog$dom$getViewportSize_$$(this.$window_$ || window);
  $goog$math$Size$equals$$($containerSize$$inline_729_viewportSize$$, this.$size_$) || (this.$size_$ = $containerSize$$inline_729_viewportSize$$, $containerSize$$inline_729_viewportSize$$ = new $goog$math$Size$$(this.$container_$.clientWidth, this.$container_$.clientHeight), $goog$math$Size$equals$$($containerSize$$inline_729_viewportSize$$, this.$containerSize_$) || (this.$containerSize_$ = $containerSize$$inline_729_viewportSize$$, this.dispatchEvent("resize")), this.$windowSizePollInterval_$ == 
  $JSCompiler_alias_NULL$$ && !$aNotActualResize$$ && (clearTimeout(this.$windowSizePollTimeout_$), this.$windowSizePollTimeout_$ = setTimeout($goog$bind$$(this.$checkForSizeChange_$, this, $JSCompiler_alias_TRUE$$), $goog$dom$ViewportSizeMonitor$WINDOW_SIZE_POLL_RATE$$)))
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $rflect$cal$ContainerSizeMonitor$$.$superClass_$.$disposeInternal$.call(this);
  clearTimeout(this.$windowSizePollTimeout_$);
  this.$containerSize_$ = this.$container_$ = $JSCompiler_alias_NULL$$
};
function $rflect$cal$ViewManager$$($aMainInstance$$) {
  $goog$events$EventHandler$$.call(this);
  this.$mainInstance_$ = $aMainInstance$$;
  this.$isOnStartup_$ = $JSCompiler_alias_TRUE$$;
  this.$currentView$ = 5;
  this.$timeManager$ = new $rflect$cal$TimeManager$$;
  this.$containerSizeMonitor_$ = new $rflect$cal$ContainerSizeMonitor$$(0, document.body);
  this.$eventManager_$ = new $rflect$cal$events$EventManager$$(this, this.$timeManager$);
  this.$blockManager_$ = new $rflect$cal$blocks$BlockManager$$(this, this.$timeManager$, this.$eventManager_$);
  this.$mainBody_$ = new $rflect$cal$MainBody$$(this, this.$timeManager$, this.$eventManager_$, this.$containerSizeMonitor_$, this.$blockManager_$);
  $_inspect$$("mainBody_", this.$mainBody_$);
  $_inspect$$("timeManager", this.$timeManager$);
  $_inspect$$("blockManager", this.$blockManager_$);
  $_inspect$$("containerSizeMonitor_", this.$containerSizeMonitor_$);
  $_inspect$$("eventManager_", this.$eventManager_$);
  $JSCompiler_StaticMethods_showView$$(this, this.$currentView$)
}
$goog$inherits$$($rflect$cal$ViewManager$$, $goog$events$EventHandler$$);
$JSCompiler_prototypeAlias$$ = $rflect$cal$ViewManager$$.prototype;
$JSCompiler_prototypeAlias$$.$isOnStartup_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$currentView$ = 0;
$JSCompiler_prototypeAlias$$.$containerSizeMonitor_$ = $JSCompiler_alias_NULL$$;
function $JSCompiler_StaticMethods_isInWeekMode$$($JSCompiler_StaticMethods_isInWeekMode$self$$) {
  return 1 == $JSCompiler_StaticMethods_isInWeekMode$self$$.$currentView$ || 2 == $JSCompiler_StaticMethods_isInWeekMode$self$$.$currentView$ || 3 == $JSCompiler_StaticMethods_isInWeekMode$self$$.$currentView$
}
function $JSCompiler_StaticMethods_isInMonthMode$$($JSCompiler_StaticMethods_isInMonthMode$self$$) {
  return 4 == $JSCompiler_StaticMethods_isInMonthMode$self$$.$currentView$ || 5 == $JSCompiler_StaticMethods_isInMonthMode$self$$.$currentView$
}
$JSCompiler_prototypeAlias$$.$onViewportResize_$ = function $$JSCompiler_prototypeAlias$$$$onViewportResize_$$() {
  this.$mainBody_$.$updateBeforeRedraw$(0, 2);
  this.$mainBody_$.$updateByRedraw$(0, 2)
};
$JSCompiler_prototypeAlias$$.$onMainBodyAction_$ = function $$JSCompiler_prototypeAlias$$$$onMainBodyAction_$$($aEvent$$25$$) {
  switch($JSCompiler_StaticMethods_getId$$($aEvent$$25$$.target)) {
    case "nb1":
      $goog$events$dispatchEvent$$(this.$mainBody_$, "toppanenow") && ($JSCompiler_StaticMethods_shiftToPoint$$(this.$timeManager$), this.$eventManager_$.$run$(), this.$mainBody_$.$updateBeforeRedraw$(), this.$mainBody_$.$updateByRedraw$());
      break;
    case "nb2":
      $goog$events$dispatchEvent$$(this.$mainBody_$, "toppaneprev") && $JSCompiler_StaticMethods_showNext_$$(this, -1);
      break;
    case "nb3":
      $goog$events$dispatchEvent$$(this.$mainBody_$, "toppanenext") && $JSCompiler_StaticMethods_showNext_$$(this, 1);
      break;
    case "nb7":
      $goog$events$dispatchEvent$$(this.$mainBody_$, "toppaneevent");
      break;
    case "nb4":
      $goog$events$dispatchEvent$$(this.$mainBody_$, "topppaneday") && $JSCompiler_StaticMethods_showView$$(this, 1);
      break;
    case "nb5":
      $goog$events$dispatchEvent$$(this.$mainBody_$, "toppaneweek") && $JSCompiler_StaticMethods_showView$$(this, 3);
      break;
    case "nb6":
      $goog$events$dispatchEvent$$(this.$mainBody_$, "toppanemonth") && $JSCompiler_StaticMethods_showView$$(this, 5);
      break;
    case "nb8":
      $goog$events$dispatchEvent$$(this.$mainBody_$, "toppaneoptions")
  }
};
$JSCompiler_prototypeAlias$$.$onDateSelect_$ = function $$JSCompiler_prototypeAlias$$$$onDateSelect_$$($aEvent$$26$$) {
  $_log$$("index is in mask", $aEvent$$26$$.$isInMask$);
  $aEvent$$26$$.$isInMask$ || ($JSCompiler_StaticMethods_shiftToPoint$$(this.$timeManager$, $aEvent$$26$$.$date$), this.$mainBody_$.$miniCal$.$updateBeforeRedraw$(), this.$mainBody_$.$miniCal$.$updateByRedraw$(), this.$mainBody_$.$updateBeforeRedraw$(3, 4, 2), this.$mainBody_$.$updateByRedraw$(3, 4, 2))
};
$JSCompiler_prototypeAlias$$.$onDateDrag_$ = function $$JSCompiler_prototypeAlias$$$$onDateDrag_$$($aEvent$$27$$) {
  this.$timeManager$.$basis$ = 5 == $aEvent$$27$$.$selectionConfiguration$ ? $aEvent$$27$$.$firstDayInMonth$ || new $goog$date$Date$$ : $aEvent$$27$$.$startDate$ || new $goog$date$Date$$;
  this.$timeManager$.$daysNumber$ = $aEvent$$27$$.duration;
  $JSCompiler_StaticMethods_showView$$(this, $aEvent$$27$$.$selectionConfiguration$, $aEvent$$27$$.target)
};
function $JSCompiler_StaticMethods_showView$$($JSCompiler_StaticMethods_showView$self$$, $JSCompiler_StaticMethods_preRender$self$$inline_743_aType$$1$$, $container$$inline_745_opt_caller$$) {
  var $calledByMiniCal$$ = $container$$inline_745_opt_caller$$ == $JSCompiler_StaticMethods_showView$self$$.$mainBody_$.$miniCal$;
  $JSCompiler_StaticMethods_showView$self$$.$currentView$ == $JSCompiler_StaticMethods_preRender$self$$inline_743_aType$$1$$ && $container$$inline_745_opt_caller$$ == $JSCompiler_alias_VOID$$ && !$JSCompiler_StaticMethods_showView$self$$.$isOnStartup_$ || ($JSCompiler_StaticMethods_showView$self$$.$currentView$ = $JSCompiler_StaticMethods_preRender$self$$inline_743_aType$$1$$, $JSCompiler_StaticMethods_showView$self$$.$timeManager$.$configuration$ = $JSCompiler_StaticMethods_showView$self$$.$currentView$, 
  $JSCompiler_StaticMethods_showView$self$$.$timeManager$.$run$(), $JSCompiler_StaticMethods_showView$self$$.$eventManager_$.$run$(), $JSCompiler_StaticMethods_showView$self$$.$isOnStartup_$ ? ($JSCompiler_StaticMethods_preRender$self$$inline_743_aType$$1$$ = $JSCompiler_StaticMethods_showView$self$$.$mainBody_$, $container$$inline_745_opt_caller$$ = $JSCompiler_StaticMethods_preRender$self$$inline_743_aType$$1$$.$dom_$.$document_$.body, $container$$inline_745_opt_caller$$.innerHTML = $rflect$cal$MainBody$HTML_PARTS_$$[0] + 
  $rflect$cal$MainBody$HTML_PARTS_$$[1] + $rflect$cal$MainBody$HTML_PARTS_$$[20] + $rflect$cal$MainBody$HTML_PARTS_$$[21], $JSCompiler_StaticMethods_preRender$self$$inline_743_aType$$1$$.$containerSizeMonitor_$.$checkForSizeChange_$($JSCompiler_alias_TRUE$$), $container$$inline_745_opt_caller$$.innerHTML = "", $JSCompiler_StaticMethods_showView$self$$.$mainBody_$.$updateBeforeRedraw$(), $JSCompiler_StaticMethods_render_$$($JSCompiler_StaticMethods_showView$self$$.$mainBody_$), $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_showView$self$$, 
  $JSCompiler_StaticMethods_showView$self$$.$containerSizeMonitor_$, "resize", $JSCompiler_StaticMethods_showView$self$$.$onViewportResize_$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_showView$self$$), $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_showView$self$$, $JSCompiler_StaticMethods_showView$self$$.$mainBody_$, "action", $JSCompiler_StaticMethods_showView$self$$.$onMainBodyAction_$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_showView$self$$), $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_showView$self$$, 
  $JSCompiler_StaticMethods_showView$self$$.$mainBody_$, "dateselect", $JSCompiler_StaticMethods_showView$self$$.$onDateSelect_$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_showView$self$$), $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_showView$self$$, $JSCompiler_StaticMethods_showView$self$$.$mainBody_$, "datedrag", $JSCompiler_StaticMethods_showView$self$$.$onDateDrag_$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_showView$self$$), $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_showView$self$$, 
  $JSCompiler_StaticMethods_showView$self$$.$mainBody_$, "datedragend", $goog$nullFunction$$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_showView$self$$), $JSCompiler_StaticMethods_showView$self$$.$isOnStartup_$ = $JSCompiler_alias_FALSE$$) : $calledByMiniCal$$ ? ($JSCompiler_StaticMethods_showView$self$$.$mainBody_$.$updateBeforeRedraw$(2, 3, 4), $JSCompiler_StaticMethods_showView$self$$.$mainBody_$.$updateByRedraw$(2, 3, 4)) : ($JSCompiler_StaticMethods_showView$self$$.$mainBody_$.$updateBeforeRedraw$(3, 
  4), $JSCompiler_StaticMethods_showView$self$$.$mainBody_$.$updateByRedraw$(3, 4)))
}
function $JSCompiler_StaticMethods_showNext_$$($JSCompiler_StaticMethods_showNext_$self$$, $aDirection$$3$$) {
  $JSCompiler_StaticMethods_showNext_$self$$.$timeManager$.shift($aDirection$$3$$);
  $JSCompiler_StaticMethods_showNext_$self$$.$eventManager_$.$run$();
  $JSCompiler_StaticMethods_showNext_$self$$.$mainBody_$.$updateBeforeRedraw$();
  $JSCompiler_StaticMethods_showNext_$self$$.$mainBody_$.$updateByRedraw$()
}
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $rflect$cal$ViewManager$$.$superClass_$.$disposeInternal$.call(this);
  this.$containerSizeMonitor_$.$dispose$();
  this.$mainBody_$.$dispose$();
  this.$blockManager_$ = this.$mainInstance_$ = this.$mainBody_$ = this.$containerSizeMonitor_$ = $JSCompiler_alias_NULL$$
};
function $rflect$cal$Main$$() {
  this.$viewManager$ = new $rflect$cal$ViewManager$$(this);
  $_inspect$$("viewManager", this.$viewManager$)
}
$goog$inherits$$($rflect$cal$Main$$, $goog$Disposable$$);
$rflect$cal$Main$$.prototype.$disposeInternal$ = function $$rflect$cal$Main$$$$$disposeInternal$$() {
  $rflect$cal$Main$$.$superClass_$.$disposeInternal$.call(this);
  this.$viewManager$.$dispose$();
  this.$viewManager$ = $JSCompiler_alias_NULL$$
};
function $goog$debug$RelativeTimeProvider$$() {
  this.$relativeTimeStart_$ = $goog$now$$()
}
var $goog$debug$RelativeTimeProvider$defaultInstance_$$ = new $goog$debug$RelativeTimeProvider$$;
$goog$debug$RelativeTimeProvider$$.prototype.set = $JSCompiler_set$$("$relativeTimeStart_$");
$goog$debug$RelativeTimeProvider$$.prototype.reset = function $$goog$debug$RelativeTimeProvider$$$$reset$() {
  this.set($goog$now$$())
};
$goog$debug$RelativeTimeProvider$$.prototype.get = $JSCompiler_get$$("$relativeTimeStart_$");
function $goog$debug$Formatter$$($opt_prefix$$) {
  this.$prefix_$ = $opt_prefix$$ || "";
  this.$startTimeProvider_$ = $goog$debug$RelativeTimeProvider$defaultInstance_$$
}
$JSCompiler_prototypeAlias$$ = $goog$debug$Formatter$$.prototype;
$JSCompiler_prototypeAlias$$.$showAbsoluteTime$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$showRelativeTime$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$showLoggerName$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$showExceptionText$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$showSeverityLevel$ = $JSCompiler_alias_FALSE$$;
function $goog$debug$Formatter$getTwoDigitString_$$($n$$8$$) {
  return 10 > $n$$8$$ ? "0" + $n$$8$$ : String($n$$8$$)
}
function $goog$debug$Formatter$getRelativeTime_$$($logRecord$$1$$, $relativeTimeStart$$) {
  var $sec$$ = ($logRecord$$1$$.$time_$ - $relativeTimeStart$$) / 1E3, $str$$49$$ = $sec$$.toFixed(3), $spacesToPrepend$$ = 0;
  if(1 > $sec$$) {
    $spacesToPrepend$$ = 2
  }else {
    for(;100 > $sec$$;) {
      $spacesToPrepend$$++, $sec$$ *= 10
    }
  }
  for(;0 < $spacesToPrepend$$--;) {
    $str$$49$$ = " " + $str$$49$$
  }
  return $str$$49$$
}
function $goog$debug$HtmlFormatter$$($opt_prefix$$1$$) {
  $goog$debug$Formatter$$.call(this, $opt_prefix$$1$$)
}
$goog$inherits$$($goog$debug$HtmlFormatter$$, $goog$debug$Formatter$$);
$goog$debug$HtmlFormatter$$.prototype.$showExceptionText$ = $JSCompiler_alias_TRUE$$;
function $goog$structs$CircularBuffer$$($opt_maxSize$$) {
  this.$maxSize_$ = $opt_maxSize$$ || 100;
  this.$buff_$ = []
}
$JSCompiler_prototypeAlias$$ = $goog$structs$CircularBuffer$$.prototype;
$JSCompiler_prototypeAlias$$.$nextPtr_$ = 0;
$JSCompiler_prototypeAlias$$.add = function $$JSCompiler_prototypeAlias$$$add$($item$$1$$) {
  this.$buff_$[this.$nextPtr_$] = $item$$1$$;
  this.$nextPtr_$ = (this.$nextPtr_$ + 1) % this.$maxSize_$
};
$JSCompiler_prototypeAlias$$.get = function $$JSCompiler_prototypeAlias$$$get$($index$$73$$) {
  $index$$73$$ = $JSCompiler_StaticMethods_normalizeIndex_$$(this, $index$$73$$);
  return this.$buff_$[$index$$73$$]
};
$JSCompiler_prototypeAlias$$.set = function $$JSCompiler_prototypeAlias$$$set$($index$$74$$, $item$$2$$) {
  $index$$74$$ = $JSCompiler_StaticMethods_normalizeIndex_$$(this, $index$$74$$);
  this.$buff_$[$index$$74$$] = $item$$2$$
};
$JSCompiler_prototypeAlias$$.clear = function $$JSCompiler_prototypeAlias$$$clear$() {
  this.$nextPtr_$ = this.$buff_$.length = 0
};
function $JSCompiler_StaticMethods_normalizeIndex_$$($JSCompiler_StaticMethods_normalizeIndex_$self$$, $index$$75$$) {
  $index$$75$$ >= $JSCompiler_StaticMethods_normalizeIndex_$self$$.$buff_$.length && $JSCompiler_alias_THROW$$(Error("Out of bounds exception"));
  return $JSCompiler_StaticMethods_normalizeIndex_$self$$.$buff_$.length < $JSCompiler_StaticMethods_normalizeIndex_$self$$.$maxSize_$ ? $index$$75$$ : ($JSCompiler_StaticMethods_normalizeIndex_$self$$.$nextPtr_$ + Number($index$$75$$)) % $JSCompiler_StaticMethods_normalizeIndex_$self$$.$maxSize_$
}
;function $goog$debug$getStacktrace$$($opt_fn$$4$$) {
  return $goog$debug$getStacktraceHelper_$$($opt_fn$$4$$ || arguments.callee.caller, [])
}
function $goog$debug$getStacktraceHelper_$$($fn$$8$$, $visited$$) {
  var $sb$$11$$ = [];
  if($goog$array$contains$$($visited$$, $fn$$8$$)) {
    $sb$$11$$.push("[...circular reference...]")
  }else {
    if($fn$$8$$ && 50 > $visited$$.length) {
      $sb$$11$$.push($goog$debug$getFunctionName$$($fn$$8$$) + "(");
      for(var $args$$11$$ = $fn$$8$$.arguments, $i$$117$$ = 0;$i$$117$$ < $args$$11$$.length;$i$$117$$++) {
        0 < $i$$117$$ && $sb$$11$$.push(", ");
        var $arg$$6_argDesc$$;
        $arg$$6_argDesc$$ = $args$$11$$[$i$$117$$];
        switch(typeof $arg$$6_argDesc$$) {
          case "object":
            $arg$$6_argDesc$$ = $arg$$6_argDesc$$ ? "object" : "null";
            break;
          case "string":
            break;
          case "number":
            $arg$$6_argDesc$$ = String($arg$$6_argDesc$$);
            break;
          case "boolean":
            $arg$$6_argDesc$$ = $arg$$6_argDesc$$ ? "true" : "false";
            break;
          case "function":
            $arg$$6_argDesc$$ = ($arg$$6_argDesc$$ = $goog$debug$getFunctionName$$($arg$$6_argDesc$$)) ? $arg$$6_argDesc$$ : "[fn]";
            break;
          default:
            $arg$$6_argDesc$$ = typeof $arg$$6_argDesc$$
        }
        40 < $arg$$6_argDesc$$.length && ($arg$$6_argDesc$$ = $arg$$6_argDesc$$.substr(0, 40) + "...");
        $sb$$11$$.push($arg$$6_argDesc$$)
      }
      $visited$$.push($fn$$8$$);
      $sb$$11$$.push(")\n");
      try {
        $sb$$11$$.push($goog$debug$getStacktraceHelper_$$($fn$$8$$.caller, $visited$$))
      }catch($e$$72$$) {
        $sb$$11$$.push("[exception trying to get caller]\n")
      }
    }else {
      $fn$$8$$ ? $sb$$11$$.push("[...long stack...]") : $sb$$11$$.push("[end]")
    }
  }
  return $sb$$11$$.join("")
}
function $goog$debug$getFunctionName$$($fn$$9_functionSource$$) {
  if($goog$debug$fnNameCache_$$[$fn$$9_functionSource$$]) {
    return $goog$debug$fnNameCache_$$[$fn$$9_functionSource$$]
  }
  $fn$$9_functionSource$$ = String($fn$$9_functionSource$$);
  if(!$goog$debug$fnNameCache_$$[$fn$$9_functionSource$$]) {
    var $matches$$3$$ = /function ([^\(]+)/.exec($fn$$9_functionSource$$);
    $goog$debug$fnNameCache_$$[$fn$$9_functionSource$$] = $matches$$3$$ ? $matches$$3$$[1] : "[Anonymous]"
  }
  return $goog$debug$fnNameCache_$$[$fn$$9_functionSource$$]
}
var $goog$debug$fnNameCache_$$ = {};
function $goog$debug$LogRecord$$($level$$7$$, $msg$$, $loggerName$$, $opt_time$$, $opt_sequenceNumber$$) {
  this.reset($level$$7$$, $msg$$, $loggerName$$, $opt_time$$, $opt_sequenceNumber$$)
}
$goog$debug$LogRecord$$.prototype.$sequenceNumber_$ = 0;
$goog$debug$LogRecord$$.prototype.$exception_$ = $JSCompiler_alias_NULL$$;
$goog$debug$LogRecord$$.prototype.$exceptionText_$ = $JSCompiler_alias_NULL$$;
var $goog$debug$LogRecord$nextSequenceNumber_$$ = 0;
$goog$debug$LogRecord$$.prototype.reset = function $$goog$debug$LogRecord$$$$reset$($level$$8$$, $msg$$1$$, $loggerName$$1$$, $opt_time$$1$$, $opt_sequenceNumber$$1$$) {
  this.$sequenceNumber_$ = "number" == typeof $opt_sequenceNumber$$1$$ ? $opt_sequenceNumber$$1$$ : $goog$debug$LogRecord$nextSequenceNumber_$$++;
  this.$time_$ = $opt_time$$1$$ || $goog$now$$();
  this.$level_$ = $level$$8$$;
  this.$msg_$ = $msg$$1$$;
  this.$loggerName_$ = $loggerName$$1$$;
  delete this.$exception_$;
  delete this.$exceptionText_$
};
$goog$debug$LogRecord$$.prototype.$setLevel$ = $JSCompiler_set$$("$level_$");
function $goog$debug$Logger$$($name$$65$$) {
  this.$name_$ = $name$$65$$
}
$goog$debug$Logger$$.prototype.$parent_$ = $JSCompiler_alias_NULL$$;
$goog$debug$Logger$$.prototype.$level_$ = $JSCompiler_alias_NULL$$;
$goog$debug$Logger$$.prototype.$children_$ = $JSCompiler_alias_NULL$$;
$goog$debug$Logger$$.prototype.$handlers_$ = $JSCompiler_alias_NULL$$;
function $goog$debug$Logger$Level$$($name$$66$$, $value$$85$$) {
  this.name = $name$$66$$;
  this.value = $value$$85$$
}
$goog$debug$Logger$Level$$.prototype.toString = $JSCompiler_get$$("name");
var $goog$debug$Logger$Level$SHOUT$$ = new $goog$debug$Logger$Level$$("SHOUT", 1200), $goog$debug$Logger$Level$SEVERE$$ = new $goog$debug$Logger$Level$$("SEVERE", 1E3), $goog$debug$Logger$Level$WARNING$$ = new $goog$debug$Logger$Level$$("WARNING", 900), $goog$debug$Logger$Level$INFO$$ = new $goog$debug$Logger$Level$$("INFO", 800), $goog$debug$Logger$Level$CONFIG$$ = new $goog$debug$Logger$Level$$("CONFIG", 700), $goog$debug$Logger$Level$PREDEFINED_LEVELS$$ = [new $goog$debug$Logger$Level$$("OFF", 
Infinity), $goog$debug$Logger$Level$SHOUT$$, $goog$debug$Logger$Level$SEVERE$$, $goog$debug$Logger$Level$WARNING$$, $goog$debug$Logger$Level$INFO$$, $goog$debug$Logger$Level$CONFIG$$, new $goog$debug$Logger$Level$$("FINE", 500), new $goog$debug$Logger$Level$$("FINER", 400), new $goog$debug$Logger$Level$$("FINEST", 300), new $goog$debug$Logger$Level$$("ALL", 0)], $goog$debug$Logger$Level$predefinedLevelsCache_$$ = $JSCompiler_alias_NULL$$;
function $goog$debug$Logger$Level$getPredefinedLevel$$($name$$67$$) {
  if(!$goog$debug$Logger$Level$predefinedLevelsCache_$$) {
    $goog$debug$Logger$Level$predefinedLevelsCache_$$ = {};
    for(var $i$$inline_751$$ = 0, $level$$inline_752$$;$level$$inline_752$$ = $goog$debug$Logger$Level$PREDEFINED_LEVELS$$[$i$$inline_751$$];$i$$inline_751$$++) {
      $goog$debug$Logger$Level$predefinedLevelsCache_$$[$level$$inline_752$$.value] = $level$$inline_752$$, $goog$debug$Logger$Level$predefinedLevelsCache_$$[$level$$inline_752$$.name] = $level$$inline_752$$
    }
  }
  return $goog$debug$Logger$Level$predefinedLevelsCache_$$[$name$$67$$] || $JSCompiler_alias_NULL$$
}
$JSCompiler_prototypeAlias$$ = $goog$debug$Logger$$.prototype;
$JSCompiler_prototypeAlias$$.getParent = $JSCompiler_get$$("$parent_$");
$JSCompiler_prototypeAlias$$.$getChildren$ = function $$JSCompiler_prototypeAlias$$$$getChildren$$() {
  this.$children_$ || (this.$children_$ = {});
  return this.$children_$
};
$JSCompiler_prototypeAlias$$.$setLevel$ = $JSCompiler_set$$("$level_$");
function $JSCompiler_StaticMethods_getEffectiveLevel$$($JSCompiler_StaticMethods_getEffectiveLevel$self$$) {
  if($JSCompiler_StaticMethods_getEffectiveLevel$self$$.$level_$) {
    return $JSCompiler_StaticMethods_getEffectiveLevel$self$$.$level_$
  }
  if($JSCompiler_StaticMethods_getEffectiveLevel$self$$.$parent_$) {
    return $JSCompiler_StaticMethods_getEffectiveLevel$$($JSCompiler_StaticMethods_getEffectiveLevel$self$$.$parent_$)
  }
  $goog$asserts$fail$$("Root logger has no level set.");
  return $JSCompiler_alias_NULL$$
}
$JSCompiler_prototypeAlias$$.log = function $$JSCompiler_prototypeAlias$$$log$($level$$15_logRecord$$inline_755$$, $msg$$5_msg$$inline_1104_target$$inline_756$$, $JSCompiler_StaticMethods_callPublish_$self$$inline_1106_opt_exception$$) {
  if($level$$15_logRecord$$inline_755$$.value >= $JSCompiler_StaticMethods_getEffectiveLevel$$(this).value) {
    $level$$15_logRecord$$inline_755$$ = this.$getLogRecord$($level$$15_logRecord$$inline_755$$, $msg$$5_msg$$inline_1104_target$$inline_756$$, $JSCompiler_StaticMethods_callPublish_$self$$inline_1106_opt_exception$$);
    $msg$$5_msg$$inline_1104_target$$inline_756$$ = "log:" + $level$$15_logRecord$$inline_755$$.$msg_$;
    $goog$global$$.console && ($goog$global$$.console.timeStamp ? $goog$global$$.console.timeStamp($msg$$5_msg$$inline_1104_target$$inline_756$$) : $goog$global$$.console.markTimeline && $goog$global$$.console.markTimeline($msg$$5_msg$$inline_1104_target$$inline_756$$));
    $goog$global$$.msWriteProfilerMark && $goog$global$$.msWriteProfilerMark($msg$$5_msg$$inline_1104_target$$inline_756$$);
    for($msg$$5_msg$$inline_1104_target$$inline_756$$ = this;$msg$$5_msg$$inline_1104_target$$inline_756$$;) {
      $JSCompiler_StaticMethods_callPublish_$self$$inline_1106_opt_exception$$ = $msg$$5_msg$$inline_1104_target$$inline_756$$;
      var $logRecord$$inline_1107$$ = $level$$15_logRecord$$inline_755$$;
      if($JSCompiler_StaticMethods_callPublish_$self$$inline_1106_opt_exception$$.$handlers_$) {
        for(var $i$$inline_1108$$ = 0, $handler$$inline_1109$$ = $JSCompiler_alias_VOID$$;$handler$$inline_1109$$ = $JSCompiler_StaticMethods_callPublish_$self$$inline_1106_opt_exception$$.$handlers_$[$i$$inline_1108$$];$i$$inline_1108$$++) {
          $handler$$inline_1109$$($logRecord$$inline_1107$$)
        }
      }
      $msg$$5_msg$$inline_1104_target$$inline_756$$ = $msg$$5_msg$$inline_1104_target$$inline_756$$.getParent()
    }
  }
};
$JSCompiler_prototypeAlias$$.$getLogRecord$ = function $$JSCompiler_prototypeAlias$$$$getLogRecord$$($level$$16$$, $msg$$6$$, $opt_exception$$1$$) {
  var $logRecord$$4$$ = new $goog$debug$LogRecord$$($level$$16$$, String($msg$$6$$), this.$name_$);
  if($opt_exception$$1$$) {
    $logRecord$$4$$.$exception_$ = $opt_exception$$1$$;
    var $JSCompiler_inline_result$$26$$;
    var $opt_fn$$inline_770$$ = arguments.callee.caller;
    try {
      var $e$$inline_771$$;
      var $href$$inline_1112$$ = $goog$getObjectByName$$("window.location.href");
      if($goog$isString$$($opt_exception$$1$$)) {
        $e$$inline_771$$ = {message:$opt_exception$$1$$, name:"Unknown error", lineNumber:"Not available", fileName:$href$$inline_1112$$, stack:"Not available"}
      }else {
        var $lineNumber$$inline_1113$$, $fileName$$inline_1114$$, $threwError$$inline_1115$$ = $JSCompiler_alias_FALSE$$;
        try {
          $lineNumber$$inline_1113$$ = $opt_exception$$1$$.lineNumber || $opt_exception$$1$$.$line$ || "Not available"
        }catch($e$$inline_1116$$) {
          $lineNumber$$inline_1113$$ = "Not available", $threwError$$inline_1115$$ = $JSCompiler_alias_TRUE$$
        }
        try {
          $fileName$$inline_1114$$ = $opt_exception$$1$$.fileName || $opt_exception$$1$$.filename || $opt_exception$$1$$.sourceURL || $goog$global$$.$googDebugFname || $href$$inline_1112$$
        }catch($e$$inline_1117$$) {
          $fileName$$inline_1114$$ = "Not available", $threwError$$inline_1115$$ = $JSCompiler_alias_TRUE$$
        }
        $e$$inline_771$$ = $threwError$$inline_1115$$ || !$opt_exception$$1$$.lineNumber || !$opt_exception$$1$$.fileName || !$opt_exception$$1$$.stack ? {message:$opt_exception$$1$$.message, name:$opt_exception$$1$$.name, lineNumber:$lineNumber$$inline_1113$$, fileName:$fileName$$inline_1114$$, stack:$opt_exception$$1$$.stack || "Not available"} : $opt_exception$$1$$
      }
      $JSCompiler_inline_result$$26$$ = "Message: " + $goog$string$htmlEscape$$($e$$inline_771$$.message) + '\nUrl: <a href="view-source:' + $e$$inline_771$$.fileName + '" target="_new">' + $e$$inline_771$$.fileName + "</a>\nLine: " + $e$$inline_771$$.lineNumber + "\n\nBrowser stack:\n" + $goog$string$htmlEscape$$($e$$inline_771$$.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + $goog$string$htmlEscape$$($goog$debug$getStacktrace$$($opt_fn$$inline_770$$) + "-> ")
    }catch($e2$$inline_772$$) {
      $JSCompiler_inline_result$$26$$ = "Exception trying to expose exception! You win, we lose. " + $e2$$inline_772$$
    }
    $logRecord$$4$$.$exceptionText_$ = $JSCompiler_inline_result$$26$$
  }
  return $logRecord$$4$$
};
$JSCompiler_prototypeAlias$$.info = function $$JSCompiler_prototypeAlias$$$info$($msg$$10$$, $opt_exception$$5$$) {
  this.log($goog$debug$Logger$Level$INFO$$, $msg$$10$$, $opt_exception$$5$$)
};
var $goog$debug$LogManager$loggers_$$ = {}, $goog$debug$LogManager$rootLogger_$$ = $JSCompiler_alias_NULL$$;
function $goog$debug$LogManager$initialize$$() {
  $goog$debug$LogManager$rootLogger_$$ || ($goog$debug$LogManager$rootLogger_$$ = new $goog$debug$Logger$$(""), $goog$debug$LogManager$loggers_$$[""] = $goog$debug$LogManager$rootLogger_$$, $goog$debug$LogManager$rootLogger_$$.$setLevel$($goog$debug$Logger$Level$CONFIG$$))
}
function $goog$debug$LogManager$getLogger$$($name$$70$$) {
  $goog$debug$LogManager$initialize$$();
  var $JSCompiler_temp$$4_logger$$inline_778$$;
  if(!($JSCompiler_temp$$4_logger$$inline_778$$ = $goog$debug$LogManager$loggers_$$[$name$$70$$])) {
    $JSCompiler_temp$$4_logger$$inline_778$$ = new $goog$debug$Logger$$($name$$70$$);
    var $lastDotIndex$$inline_779_parentLogger$$inline_781$$ = $name$$70$$.lastIndexOf("."), $leafName$$inline_780$$ = $name$$70$$.substr($lastDotIndex$$inline_779_parentLogger$$inline_781$$ + 1), $lastDotIndex$$inline_779_parentLogger$$inline_781$$ = $goog$debug$LogManager$getLogger$$($name$$70$$.substr(0, $lastDotIndex$$inline_779_parentLogger$$inline_781$$));
    $lastDotIndex$$inline_779_parentLogger$$inline_781$$.$getChildren$()[$leafName$$inline_780$$] = $JSCompiler_temp$$4_logger$$inline_778$$;
    $JSCompiler_temp$$4_logger$$inline_778$$.$parent_$ = $lastDotIndex$$inline_779_parentLogger$$inline_781$$;
    $goog$debug$LogManager$loggers_$$[$name$$70$$] = $JSCompiler_temp$$4_logger$$inline_778$$
  }
  return $JSCompiler_temp$$4_logger$$inline_778$$
}
;function $goog$debug$DebugWindow$$($opt_identifier$$, $opt_prefix$$3$$) {
  this.$identifier_$ = $opt_identifier$$ || "";
  this.$prefix_$ = $opt_prefix$$3$$ || "";
  this.$outputBuffer_$ = [];
  this.$savedMessages_$ = new $goog$structs$CircularBuffer$$($goog$debug$DebugWindow$MAX_SAVED$$);
  this.$publishHandler_$ = $goog$bind$$(this.$addLogRecord$, this);
  this.$formatter_$ = new $goog$debug$HtmlFormatter$$(this.$prefix_$);
  this.$filteredLoggers_$ = {};
  if($JSCompiler_alias_TRUE$$ != this.$isCapturing_$) {
    this.$isCapturing_$ = $JSCompiler_alias_TRUE$$;
    $goog$debug$LogManager$initialize$$();
    var $JSCompiler_StaticMethods_addHandler$self$$inline_1127$$ = $goog$debug$LogManager$rootLogger_$$, $handler$$inline_1128$$ = this.$publishHandler_$;
    $JSCompiler_StaticMethods_addHandler$self$$inline_1127$$.$handlers_$ || ($JSCompiler_StaticMethods_addHandler$self$$inline_1127$$.$handlers_$ = []);
    $JSCompiler_StaticMethods_addHandler$self$$inline_1127$$.$handlers_$.push($handler$$inline_1128$$)
  }
  this.$enabled_$ = "1" == $goog$debug$DebugWindow$getCookieValue_$$(this.$identifier_$, "enabled");
  $goog$global$$.setInterval($goog$bind$$(this.$saveWindowPositionSize_$, this), 7500)
}
var $goog$debug$DebugWindow$MAX_SAVED$$ = 500;
$JSCompiler_prototypeAlias$$ = $goog$debug$DebugWindow$$.prototype;
$JSCompiler_prototypeAlias$$.$welcomeMessage$ = "LOGGING";
$JSCompiler_prototypeAlias$$.$enableOnSevere_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$win_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$winOpening_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$isCapturing_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$bufferTimeout_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$lastCall_$ = $goog$now$$();
$JSCompiler_prototypeAlias$$.$init$ = function $$JSCompiler_prototypeAlias$$$$init$$() {
  this.$enabled_$ && $JSCompiler_StaticMethods_openWindow_$$(this)
};
$JSCompiler_prototypeAlias$$.isEnabled = $JSCompiler_get$$("$enabled_$");
$JSCompiler_prototypeAlias$$.$setEnabled$ = function $$JSCompiler_prototypeAlias$$$$setEnabled$$($enable$$16$$) {
  (this.$enabled_$ = $enable$$16$$) && $JSCompiler_StaticMethods_openWindow_$$(this);
  $JSCompiler_StaticMethods_setCookie_$$(this, "enabled", $enable$$16$$ ? "1" : "0")
};
function $JSCompiler_StaticMethods_hasActiveWindow$$($JSCompiler_StaticMethods_hasActiveWindow$self$$) {
  return!!$JSCompiler_StaticMethods_hasActiveWindow$self$$.$win_$ && !$JSCompiler_StaticMethods_hasActiveWindow$self$$.$win_$.closed
}
$JSCompiler_prototypeAlias$$.$clear_$ = function $$JSCompiler_prototypeAlias$$$$clear_$$() {
  this.$savedMessages_$.clear();
  $JSCompiler_StaticMethods_hasActiveWindow$$(this) && this.$writeInitialDocument$()
};
$JSCompiler_prototypeAlias$$.$addLogRecord$ = function $$JSCompiler_prototypeAlias$$$$addLogRecord$$($logRecord$$8$$) {
  if(!this.$filteredLoggers_$[$logRecord$$8$$.$loggerName_$]) {
    var $JSCompiler_StaticMethods_formatRecord$self$$inline_790_html$$inline_796$$ = this.$formatter_$, $className$$inline_792$$;
    switch($logRecord$$8$$.$level_$.value) {
      case $goog$debug$Logger$Level$SHOUT$$.value:
        $className$$inline_792$$ = "dbg-sh";
        break;
      case $goog$debug$Logger$Level$SEVERE$$.value:
        $className$$inline_792$$ = "dbg-sev";
        break;
      case $goog$debug$Logger$Level$WARNING$$.value:
        $className$$inline_792$$ = "dbg-w";
        break;
      case $goog$debug$Logger$Level$INFO$$.value:
        $className$$inline_792$$ = "dbg-i";
        break;
      default:
        $className$$inline_792$$ = "dbg-f"
    }
    var $sb$$inline_793$$ = [];
    $sb$$inline_793$$.push($JSCompiler_StaticMethods_formatRecord$self$$inline_790_html$$inline_796$$.$prefix_$, " ");
    if($JSCompiler_StaticMethods_formatRecord$self$$inline_790_html$$inline_796$$.$showAbsoluteTime$) {
      var $time$$inline_1131$$ = new Date($logRecord$$8$$.$time_$);
      $sb$$inline_793$$.push("[", $goog$debug$Formatter$getTwoDigitString_$$($time$$inline_1131$$.getFullYear() - 2E3) + $goog$debug$Formatter$getTwoDigitString_$$($time$$inline_1131$$.getMonth() + 1) + $goog$debug$Formatter$getTwoDigitString_$$($time$$inline_1131$$.getDate()) + " " + $goog$debug$Formatter$getTwoDigitString_$$($time$$inline_1131$$.getHours()) + ":" + $goog$debug$Formatter$getTwoDigitString_$$($time$$inline_1131$$.getMinutes()) + ":" + $goog$debug$Formatter$getTwoDigitString_$$($time$$inline_1131$$.getSeconds()) + 
      "." + $goog$debug$Formatter$getTwoDigitString_$$(Math.floor($time$$inline_1131$$.getMilliseconds() / 10)), "] ")
    }
    $JSCompiler_StaticMethods_formatRecord$self$$inline_790_html$$inline_796$$.$showRelativeTime$ && $sb$$inline_793$$.push("[", $goog$string$whitespaceEscape$$($goog$debug$Formatter$getRelativeTime_$$($logRecord$$8$$, $JSCompiler_StaticMethods_formatRecord$self$$inline_790_html$$inline_796$$.$startTimeProvider_$.get())), "s] ");
    $JSCompiler_StaticMethods_formatRecord$self$$inline_790_html$$inline_796$$.$showLoggerName$ && $sb$$inline_793$$.push("[", $goog$string$htmlEscape$$($logRecord$$8$$.$loggerName_$), "] ");
    $JSCompiler_StaticMethods_formatRecord$self$$inline_790_html$$inline_796$$.$showSeverityLevel$ && $sb$$inline_793$$.push("[", $goog$string$htmlEscape$$($logRecord$$8$$.$level_$.name), "] ");
    $sb$$inline_793$$.push('<span class="', $className$$inline_792$$, '">', $goog$string$newLineToBr$$($goog$string$whitespaceEscape$$($goog$string$htmlEscape$$($logRecord$$8$$.$msg_$))));
    $JSCompiler_StaticMethods_formatRecord$self$$inline_790_html$$inline_796$$.$showExceptionText$ && $logRecord$$8$$.$exception_$ && $sb$$inline_793$$.push("<br>", $goog$string$newLineToBr$$($goog$string$whitespaceEscape$$($logRecord$$8$$.$exceptionText_$ || "")));
    $sb$$inline_793$$.push("</span><br>");
    $JSCompiler_StaticMethods_formatRecord$self$$inline_790_html$$inline_796$$ = $sb$$inline_793$$.join("");
    this.$enabled_$ ? ($JSCompiler_StaticMethods_openWindow_$$(this), this.$savedMessages_$.add($JSCompiler_StaticMethods_formatRecord$self$$inline_790_html$$inline_796$$), $JSCompiler_StaticMethods_writeToLog_$$(this, $JSCompiler_StaticMethods_formatRecord$self$$inline_790_html$$inline_796$$)) : this.$savedMessages_$.add($JSCompiler_StaticMethods_formatRecord$self$$inline_790_html$$inline_796$$);
    this.$enableOnSevere_$ && $logRecord$$8$$.$level_$.value >= $goog$debug$Logger$Level$SEVERE$$.value && this.$setEnabled$($JSCompiler_alias_TRUE$$)
  }
};
function $JSCompiler_StaticMethods_writeToLog_$$($JSCompiler_StaticMethods_writeToLog_$self$$, $html$$3$$) {
  $JSCompiler_StaticMethods_writeToLog_$self$$.$outputBuffer_$.push($html$$3$$);
  $goog$global$$.clearTimeout($JSCompiler_StaticMethods_writeToLog_$self$$.$bufferTimeout_$);
  750 < $goog$now$$() - $JSCompiler_StaticMethods_writeToLog_$self$$.$lastCall_$ ? $JSCompiler_StaticMethods_writeToLog_$self$$.$writeBufferToLog$() : $JSCompiler_StaticMethods_writeToLog_$self$$.$bufferTimeout_$ = $goog$global$$.setTimeout($goog$bind$$($JSCompiler_StaticMethods_writeToLog_$self$$.$writeBufferToLog$, $JSCompiler_StaticMethods_writeToLog_$self$$), 250)
}
$JSCompiler_prototypeAlias$$.$writeBufferToLog$ = function $$JSCompiler_prototypeAlias$$$$writeBufferToLog$$() {
  this.$lastCall_$ = $goog$now$$();
  if($JSCompiler_StaticMethods_hasActiveWindow$$(this)) {
    var $body$$6_scroll$$1$$ = this.$win_$.document.body, $body$$6_scroll$$1$$ = $body$$6_scroll$$1$$ && 100 >= $body$$6_scroll$$1$$.scrollHeight - ($body$$6_scroll$$1$$.scrollTop + $body$$6_scroll$$1$$.clientHeight);
    this.$win_$.document.write(this.$outputBuffer_$.join(""));
    this.$outputBuffer_$.length = 0;
    $body$$6_scroll$$1$$ && this.$win_$.scrollTo(0, 1E6)
  }
};
function $JSCompiler_StaticMethods_writeSavedMessages_$$($JSCompiler_StaticMethods_writeSavedMessages_$self$$) {
  for(var $JSCompiler_StaticMethods_getNewestValues$self$$inline_1133_i$$123$$ = $JSCompiler_StaticMethods_writeSavedMessages_$self$$.$savedMessages_$, $l$$inline_1135$$ = $JSCompiler_StaticMethods_getNewestValues$self$$inline_1133_i$$123$$.$buff_$.length, $rv$$inline_1136$$ = [], $i$$inline_1137$$ = $JSCompiler_StaticMethods_getNewestValues$self$$inline_1133_i$$123$$.$buff_$.length - $JSCompiler_StaticMethods_writeSavedMessages_$self$$.$savedMessages_$.$buff_$.length;$i$$inline_1137$$ < $l$$inline_1135$$;$i$$inline_1137$$++) {
    $rv$$inline_1136$$[$i$$inline_1137$$] = $JSCompiler_StaticMethods_getNewestValues$self$$inline_1133_i$$123$$.get($i$$inline_1137$$)
  }
  for($JSCompiler_StaticMethods_getNewestValues$self$$inline_1133_i$$123$$ = 0;$JSCompiler_StaticMethods_getNewestValues$self$$inline_1133_i$$123$$ < $rv$$inline_1136$$.length;$JSCompiler_StaticMethods_getNewestValues$self$$inline_1133_i$$123$$++) {
    $JSCompiler_StaticMethods_writeToLog_$$($JSCompiler_StaticMethods_writeSavedMessages_$self$$, $rv$$inline_1136$$[$JSCompiler_StaticMethods_getNewestValues$self$$inline_1133_i$$123$$])
  }
}
function $JSCompiler_StaticMethods_openWindow_$$($JSCompiler_StaticMethods_openWindow_$self$$) {
  if(!$JSCompiler_StaticMethods_hasActiveWindow$$($JSCompiler_StaticMethods_openWindow_$self$$) && !$JSCompiler_StaticMethods_openWindow_$self$$.$winOpening_$) {
    var $h$$9_winpos$$ = $goog$debug$DebugWindow$getCookieValue_$$($JSCompiler_StaticMethods_openWindow_$self$$.$identifier_$, "dbg", "0,0,800,500").split(","), $x$$73$$ = Number($h$$9_winpos$$[0]), $y$$46$$ = Number($h$$9_winpos$$[1]), $w$$9$$ = Number($h$$9_winpos$$[2]), $h$$9_winpos$$ = Number($h$$9_winpos$$[3]);
    $JSCompiler_StaticMethods_openWindow_$self$$.$winOpening_$ = $JSCompiler_alias_TRUE$$;
    $JSCompiler_StaticMethods_openWindow_$self$$.$win_$ = window.open("", $goog$userAgent$IE$$ ? $JSCompiler_StaticMethods_openWindow_$self$$.$identifier_$.replace(/[\s\-\.\,]/g, "_") : $JSCompiler_StaticMethods_openWindow_$self$$.$identifier_$, "width=" + $w$$9$$ + ",height=" + $h$$9_winpos$$ + ",toolbar=no,resizable=yes,scrollbars=yes,left=" + $x$$73$$ + ",top=" + $y$$46$$ + ",status=no,screenx=" + $x$$73$$ + ",screeny=" + $y$$46$$);
    !$JSCompiler_StaticMethods_openWindow_$self$$.$win_$ && !$JSCompiler_StaticMethods_openWindow_$self$$.$showedBlockedAlert_$ && (alert("Logger popup was blocked"), $JSCompiler_StaticMethods_openWindow_$self$$.$showedBlockedAlert_$ = $JSCompiler_alias_TRUE$$);
    $JSCompiler_StaticMethods_openWindow_$self$$.$winOpening_$ = $JSCompiler_alias_FALSE$$;
    $JSCompiler_StaticMethods_openWindow_$self$$.$win_$ && $JSCompiler_StaticMethods_openWindow_$self$$.$writeInitialDocument$()
  }
}
$JSCompiler_prototypeAlias$$.$getStyleRules$ = $JSCompiler_returnArg$$("*{font:normal 14px monospace;}.dbg-sev{color:#F00}.dbg-w{color:#E92}.dbg-sh{background-color:#fd4;font-weight:bold;color:#000}.dbg-i{color:#666}.dbg-f{color:#999}.dbg-ev{color:#0A0}.dbg-m{color:#990}");
$JSCompiler_prototypeAlias$$.$writeInitialDocument$ = function $$JSCompiler_prototypeAlias$$$$writeInitialDocument$$() {
  $JSCompiler_StaticMethods_hasActiveWindow$$(this) && (this.$win_$.document.open(), $JSCompiler_StaticMethods_writeToLog_$$(this, "<style>" + this.$getStyleRules$() + '</style><hr><div class="dbg-ev" style="text-align:center">' + this.$welcomeMessage$ + "<br><small>Logger: " + this.$identifier_$ + "</small></div><hr>"), $JSCompiler_StaticMethods_writeSavedMessages_$$(this))
};
function $JSCompiler_StaticMethods_setCookie_$$($JSCompiler_StaticMethods_setCookie_$self_fullKey$$, $key$$76$$, $value$$87$$) {
  $JSCompiler_StaticMethods_setCookie_$self_fullKey$$ = ($key$$76$$ + $JSCompiler_StaticMethods_setCookie_$self_fullKey$$.$identifier_$).replace(/[;=\s]/g, "_");
  document.cookie = $JSCompiler_StaticMethods_setCookie_$self_fullKey$$ + "=" + encodeURIComponent($value$$87$$) + ";path=/;expires=" + (new Date($goog$now$$() + 2592E6)).toUTCString()
}
function $goog$debug$DebugWindow$getCookieValue_$$($fullKey$$2_identifier$$3$$, $cookie_key$$79$$, $end$$5_opt_default$$1$$) {
  $fullKey$$2_identifier$$3$$ = ($cookie_key$$79$$ + $fullKey$$2_identifier$$3$$).replace(/[;=\s]/g, "_");
  $cookie_key$$79$$ = String(document.cookie);
  var $start$$11$$ = $cookie_key$$79$$.indexOf($fullKey$$2_identifier$$3$$ + "=");
  return-1 != $start$$11$$ ? ($end$$5_opt_default$$1$$ = $cookie_key$$79$$.indexOf(";", $start$$11$$), decodeURIComponent($cookie_key$$79$$.substring($start$$11$$ + $fullKey$$2_identifier$$3$$.length + 1, -1 == $end$$5_opt_default$$1$$ ? $cookie_key$$79$$.length : $end$$5_opt_default$$1$$))) : $end$$5_opt_default$$1$$ || ""
}
$JSCompiler_prototypeAlias$$.$saveWindowPositionSize_$ = function $$JSCompiler_prototypeAlias$$$$saveWindowPositionSize_$$() {
  $JSCompiler_StaticMethods_hasActiveWindow$$(this) && $JSCompiler_StaticMethods_setCookie_$$(this, "dbg", (this.$win_$.screenX || this.$win_$.screenLeft || 0) + "," + (this.$win_$.screenY || this.$win_$.screenTop || 0) + "," + (this.$win_$.outerWidth || 800) + "," + (this.$win_$.outerHeight || 500))
};
function $goog$debug$FancyWindow$$($opt_identifier$$1$$, $opt_prefix$$4$$) {
  if($goog$debug$FancyWindow$HAS_LOCAL_STORE$$) {
    var $logger$$inline_805_loggerName$$inline_804_storedKeys$$inline_802$$ = $goog$debug$FancyWindow$getStoredKeys_$$(), $key$$inline_803$$;
    for($key$$inline_803$$ in $logger$$inline_805_loggerName$$inline_804_storedKeys$$inline_802$$) {
      var $logger$$inline_805_loggerName$$inline_804_storedKeys$$inline_802$$ = $key$$inline_803$$.replace("fancywindow.sel.", ""), $logger$$inline_805_loggerName$$inline_804_storedKeys$$inline_802$$ = $goog$debug$LogManager$getLogger$$($logger$$inline_805_loggerName$$inline_804_storedKeys$$inline_802$$), $curLevel$$inline_806$$ = $logger$$inline_805_loggerName$$inline_804_storedKeys$$inline_802$$.$level_$, $storedLevel$$inline_807$$ = window.localStorage.getItem($key$$inline_803$$).toString();
      (!$curLevel$$inline_806$$ || $curLevel$$inline_806$$.toString() != $storedLevel$$inline_807$$) && $logger$$inline_805_loggerName$$inline_804_storedKeys$$inline_802$$.$setLevel$($goog$debug$Logger$Level$getPredefinedLevel$$($storedLevel$$inline_807$$))
    }
  }
  $goog$debug$DebugWindow$$.call(this, $opt_identifier$$1$$, $opt_prefix$$4$$)
}
$goog$inherits$$($goog$debug$FancyWindow$$, $goog$debug$DebugWindow$$);
var $goog$debug$FancyWindow$HAS_LOCAL_STORE$$;
a: {
  try {
    $goog$debug$FancyWindow$HAS_LOCAL_STORE$$ = !!window.localStorage.getItem;
    break a
  }catch($e$$inline_809$$) {
  }
  $goog$debug$FancyWindow$HAS_LOCAL_STORE$$ = $JSCompiler_alias_FALSE$$
}
$JSCompiler_prototypeAlias$$ = $goog$debug$FancyWindow$$.prototype;
$JSCompiler_prototypeAlias$$.$writeBufferToLog$ = function $$JSCompiler_prototypeAlias$$$$writeBufferToLog$$() {
  this.$lastCall_$ = $goog$now$$();
  if($JSCompiler_StaticMethods_hasActiveWindow$$(this)) {
    for(var $logel$$ = this.$dh_$.$getElement$("log"), $scroll$$2$$ = 100 >= $logel$$.scrollHeight - ($logel$$.scrollTop + $logel$$.offsetHeight), $i$$124$$ = 0;$i$$124$$ < this.$outputBuffer_$.length;$i$$124$$++) {
      var $div$$2$$ = this.$dh_$.$createDom$("div", "logmsg");
      $div$$2$$.innerHTML = this.$outputBuffer_$[$i$$124$$];
      $logel$$.appendChild($div$$2$$)
    }
    this.$outputBuffer_$.length = 0;
    this.$resizeStuff_$();
    $scroll$$2$$ && ($logel$$.scrollTop = $logel$$.scrollHeight)
  }
};
$JSCompiler_prototypeAlias$$.$writeInitialDocument$ = function $$JSCompiler_prototypeAlias$$$$writeInitialDocument$$() {
  if($JSCompiler_StaticMethods_hasActiveWindow$$(this)) {
    var $doc$$43$$ = this.$win_$.document;
    $doc$$43$$.open();
    $doc$$43$$.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3.org/TR/html4/loose.dtd"><html><head><title>Logging: ' + this.$identifier_$ + "</title><style>" + this.$getStyleRules$() + '</style></head><body><div id="log" style="overflow:auto"></div><div id="head"><p><b>Logging: ' + this.$identifier_$ + "</b></p><p>" + this.$welcomeMessage$ + '</p><span id="clearbutton">clear</span><span id="exitbutton">exit</span><span id="openbutton">options</span></div><div id="options"><big><b>Options:</b></big><div id="optionsarea"></div><span id="closebutton">save and close</span></div></body></html>');
    $doc$$43$$.close();
    ($goog$userAgent$IE$$ ? $doc$$43$$.body : this.$win_$).onresize = $goog$bind$$(this.$resizeStuff_$, this);
    this.$dh_$ = new $goog$dom$DomHelper$$($doc$$43$$);
    this.$dh_$.$getElement$("openbutton").onclick = $goog$bind$$(this.$openOptions_$, this);
    this.$dh_$.$getElement$("closebutton").onclick = $goog$bind$$(this.$closeOptions_$, this);
    this.$dh_$.$getElement$("clearbutton").onclick = $goog$bind$$(this.$clear_$, this);
    this.$dh_$.$getElement$("exitbutton").onclick = $goog$bind$$(this.$exit_$, this);
    $JSCompiler_StaticMethods_writeSavedMessages_$$(this)
  }
};
$JSCompiler_prototypeAlias$$.$openOptions_$ = function $$JSCompiler_prototypeAlias$$$$openOptions_$$() {
  var $el$$31$$ = this.$dh_$.$getElement$("optionsarea");
  $el$$31$$.innerHTML = "";
  for(var $loggers$$ = $goog$debug$FancyWindow$getLoggers_$$(), $dh$$1$$ = this.$dh_$, $i$$125$$ = 0;$i$$125$$ < $loggers$$.length;$i$$125$$++) {
    var $div$$3_logger$$3$$ = $goog$debug$LogManager$getLogger$$($loggers$$[$i$$125$$]), $div$$3_logger$$3$$ = $dh$$1$$.$createDom$("div", {}, $JSCompiler_StaticMethods_getDropDown_$$(this, "sel" + $loggers$$[$i$$125$$], $div$$3_logger$$3$$.$level_$ ? $div$$3_logger$$3$$.$level_$.name : "INHERIT"), $dh$$1$$.$createDom$("span", {}, $loggers$$[$i$$125$$] || "(root)"));
    $el$$31$$.appendChild($div$$3_logger$$3$$)
  }
  this.$dh_$.$getElement$("options").style.display = "block";
  return $JSCompiler_alias_FALSE$$
};
function $JSCompiler_StaticMethods_getDropDown_$$($JSCompiler_StaticMethods_getDropDown_$self_dh$$2$$, $id$$16_sel$$, $selected$$) {
  $JSCompiler_StaticMethods_getDropDown_$self_dh$$2$$ = $JSCompiler_StaticMethods_getDropDown_$self_dh$$2$$.$dh_$;
  $id$$16_sel$$ = $JSCompiler_StaticMethods_getDropDown_$self_dh$$2$$.$createDom$("select", {id:$id$$16_sel$$});
  for(var $i$$126$$ = 0;$i$$126$$ < $goog$debug$Logger$Level$PREDEFINED_LEVELS$$.length;$i$$126$$++) {
    var $level$$17$$ = $goog$debug$Logger$Level$PREDEFINED_LEVELS$$[$i$$126$$], $option$$ = $JSCompiler_StaticMethods_getDropDown_$self_dh$$2$$.$createDom$("option", {}, $level$$17$$.name);
    $selected$$ == $level$$17$$.name && ($option$$.selected = $JSCompiler_alias_TRUE$$);
    $id$$16_sel$$.appendChild($option$$)
  }
  $id$$16_sel$$.appendChild($JSCompiler_StaticMethods_getDropDown_$self_dh$$2$$.$createDom$("option", {selected:"INHERIT" == $selected$$}, "INHERIT"));
  return $id$$16_sel$$
}
$JSCompiler_prototypeAlias$$.$closeOptions_$ = function $$JSCompiler_prototypeAlias$$$$closeOptions_$$() {
  this.$dh_$.$getElement$("options").style.display = "none";
  for(var $loggers$$1_loggers$$inline_811$$ = $goog$debug$FancyWindow$getLoggers_$$(), $dh$$3_storedKeys$$inline_812$$ = this.$dh_$, $i$$127_i$$inline_813$$ = 0;$i$$127_i$$inline_813$$ < $loggers$$1_loggers$$inline_811$$.length;$i$$127_i$$inline_813$$++) {
    var $key$$inline_814_logger$$4$$ = $goog$debug$LogManager$getLogger$$($loggers$$1_loggers$$inline_811$$[$i$$127_i$$inline_813$$]), $level$$18_level$$inline_815_sel$$1$$ = $dh$$3_storedKeys$$inline_812$$.$getElement$("sel" + $loggers$$1_loggers$$inline_811$$[$i$$127_i$$inline_813$$]), $level$$18_level$$inline_815_sel$$1$$ = $level$$18_level$$inline_815_sel$$1$$.options[$level$$18_level$$inline_815_sel$$1$$.selectedIndex].text;
    "INHERIT" == $level$$18_level$$inline_815_sel$$1$$ ? $key$$inline_814_logger$$4$$.$setLevel$($JSCompiler_alias_NULL$$) : $key$$inline_814_logger$$4$$.$setLevel$($goog$debug$Logger$Level$getPredefinedLevel$$($level$$18_level$$inline_815_sel$$1$$))
  }
  if($goog$debug$FancyWindow$HAS_LOCAL_STORE$$) {
    $loggers$$1_loggers$$inline_811$$ = $goog$debug$FancyWindow$getLoggers_$$();
    $dh$$3_storedKeys$$inline_812$$ = $goog$debug$FancyWindow$getStoredKeys_$$();
    for($i$$127_i$$inline_813$$ = 0;$i$$127_i$$inline_813$$ < $loggers$$1_loggers$$inline_811$$.length;$i$$127_i$$inline_813$$++) {
      $key$$inline_814_logger$$4$$ = "fancywindow.sel." + $loggers$$1_loggers$$inline_811$$[$i$$127_i$$inline_813$$], $level$$18_level$$inline_815_sel$$1$$ = $goog$debug$LogManager$getLogger$$($loggers$$1_loggers$$inline_811$$[$i$$127_i$$inline_813$$]).$level_$, $key$$inline_814_logger$$4$$ in $dh$$3_storedKeys$$inline_812$$ ? $level$$18_level$$inline_815_sel$$1$$ ? window.localStorage.getItem($key$$inline_814_logger$$4$$) != $level$$18_level$$inline_815_sel$$1$$.name && window.localStorage.setItem($key$$inline_814_logger$$4$$, 
      $level$$18_level$$inline_815_sel$$1$$.name) : window.localStorage.removeItem($key$$inline_814_logger$$4$$) : $level$$18_level$$inline_815_sel$$1$$ && window.localStorage.setItem($key$$inline_814_logger$$4$$, $level$$18_level$$inline_815_sel$$1$$.name)
    }
  }
  return $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$resizeStuff_$ = function $$JSCompiler_prototypeAlias$$$$resizeStuff_$$() {
  var $dh$$4$$ = this.$dh_$, $logel$$1$$ = $dh$$4$$.$getElement$("log"), $headel$$ = $dh$$4$$.$getElement$("head");
  $logel$$1$$.style.top = $headel$$.offsetHeight + "px";
  $logel$$1$$.style.height = $dh$$4$$.$document_$.body.offsetHeight - $headel$$.offsetHeight - ($goog$userAgent$IE$$ ? 4 : 0) + "px"
};
$JSCompiler_prototypeAlias$$.$exit_$ = function $$JSCompiler_prototypeAlias$$$$exit_$$() {
  this.$setEnabled$($JSCompiler_alias_FALSE$$);
  this.$win_$ && this.$win_$.close()
};
$JSCompiler_prototypeAlias$$.$getStyleRules$ = function $$JSCompiler_prototypeAlias$$$$getStyleRules$$() {
  return $goog$debug$FancyWindow$$.$superClass_$.$getStyleRules$.call(this) + "html,body{height:100%;width:100%;margin:0px;padding:0px;background-color:#FFF;overflow:hidden}*{}.logmsg{border-bottom:1px solid #CCC;padding:2px;font:90% monospace}#head{position:absolute;width:100%;font:x-small arial;border-bottom:2px solid #999;background-color:#EEE;}#head p{margin:0px 5px;}#log{position:absolute;width:100%;background-color:#FFF;}#options{position:absolute;right:0px;width:50%;height:100%;border-left:1px solid #999;background-color:#DDD;display:none;padding-left: 5px;font:normal small arial;overflow:auto;}#openbutton,#closebutton{text-decoration:underline;color:#00F;cursor:pointer;position:absolute;top:0px;right:5px;font:x-small arial;}#clearbutton{text-decoration:underline;color:#00F;cursor:pointer;position:absolute;top:0px;right:80px;font:x-small arial;}#exitbutton{text-decoration:underline;color:#00F;cursor:pointer;position:absolute;top:0px;right:50px;font:x-small arial;}select{font:x-small arial;margin-right:10px;}hr{border:0;height:5px;background-color:#8c8;color:#8c8;}"
};
function $goog$debug$FancyWindow$getStoredKeys_$$() {
  for(var $storedKeys$$2$$ = {}, $i$$129$$ = 0, $len$$4$$ = window.localStorage.length;$i$$129$$ < $len$$4$$;$i$$129$$++) {
    var $key$$82$$ = window.localStorage.key($i$$129$$);
    $key$$82$$ != $JSCompiler_alias_NULL$$ && 0 == $key$$82$$.lastIndexOf("fancywindow.sel.", 0) && ($storedKeys$$2$$[$key$$82$$] = $JSCompiler_alias_TRUE$$)
  }
  return $storedKeys$$2$$
}
function $goog$debug$FancyWindow$getLoggers_$$() {
  var $res$$inline_818$$ = [], $i$$inline_819$$ = 0, $key$$inline_820$$;
  for($key$$inline_820$$ in $goog$debug$LogManager$loggers_$$) {
    $res$$inline_818$$[$i$$inline_819$$++] = $key$$inline_820$$
  }
  $res$$inline_818$$.sort();
  return $res$$inline_818$$
}
;var $rflect$Debug$theLogger$$;
function $_inspect$$($name$$72$$, $obj$$81$$) {
  window["_inspect_" + $name$$72$$] = $obj$$81$$
}
function $_log$$($str$$54$$, $opt_var$$) {
  var $number$$1$$ = arguments.length;
  if($goog$userAgent$IE$$) {
    if(!$rflect$Debug$theLogger$$) {
      var $debugWindow$$ = new $goog$debug$FancyWindow$$("main");
      $debugWindow$$.$setEnabled$($JSCompiler_alias_TRUE$$);
      $debugWindow$$.$init$();
      $rflect$Debug$theLogger$$ = $goog$debug$LogManager$getLogger$$("demo");
      $rflect$Debug$theLogger$$.info("Logger started")
    }
    $rflect$Debug$theLogger$$.info($str$$54$$ + (2 == $number$$1$$ ? ": " + ($goog$isObject$$($opt_var$$) ? $opt_var$$.toString() : $opt_var$$) : ""))
  }else {
    "console" in window && "log" in window.console && window.console.log($str$$54$$ + (2 == $number$$1$$ ? ": " + ($goog$isObject$$($opt_var$$) ? $opt_var$$.toString() : $opt_var$$) : ""))
  }
}
;function $rflect$cal$Loader$main$$() {
  $goog$events$listenOnce$$(window, "load", function() {
    this.$documentLoaded_$ || (this.$calInstance_$ = new $rflect$cal$Main$$)
  }, $JSCompiler_alias_FALSE$$, this);
  $goog$events$listenOnce$$(window, "DOMContentLoaded", function() {
    this.$documentLoaded_$ = $JSCompiler_alias_TRUE$$;
    this.$calInstance_$ = new $rflect$cal$Main$$
  }, $JSCompiler_alias_FALSE$$, this);
  $goog$events$listenOnce$$(window, "unload", function() {
    this.$calInstance_$ && this.$calInstance_$.$dispose$()
  }, $JSCompiler_alias_FALSE$$, this)
}
try {
  $rflect$cal$Loader$main$$()
}catch($e$$75$$) {
}
;
