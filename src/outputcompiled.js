function $JSCompiler_alias_THROW$$($jscomp_throw_param$$) {
  throw $jscomp_throw_param$$;
}
var $JSCompiler_alias_VOID$$ = void 0, $JSCompiler_alias_TRUE$$ = !0, $JSCompiler_alias_NULL$$ = null, $JSCompiler_alias_FALSE$$ = !1;
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
function $goog$getObjectByName$$($name$$56_parts$$1$$) {
  for(var $name$$56_parts$$1$$ = $name$$56_parts$$1$$.split("."), $cur$$1$$ = $goog$global$$, $part$$1$$;$part$$1$$ = $name$$56_parts$$1$$.shift();) {
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
function $goog$typeOf$$($value$$39$$) {
  var $s$$2$$ = typeof $value$$39$$;
  if("object" == $s$$2$$) {
    if($value$$39$$) {
      if($value$$39$$ instanceof Array) {
        return"array"
      }
      if($value$$39$$ instanceof Object) {
        return $s$$2$$
      }
      var $className$$1$$ = Object.prototype.toString.call($value$$39$$);
      if("[object Window]" == $className$$1$$) {
        return"object"
      }
      if("[object Array]" == $className$$1$$ || "number" == typeof $value$$39$$.length && "undefined" != typeof $value$$39$$.splice && "undefined" != typeof $value$$39$$.propertyIsEnumerable && !$value$$39$$.propertyIsEnumerable("splice")) {
        return"array"
      }
      if("[object Function]" == $className$$1$$ || "undefined" != typeof $value$$39$$.call && "undefined" != typeof $value$$39$$.propertyIsEnumerable && !$value$$39$$.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if("function" == $s$$2$$ && "undefined" == typeof $value$$39$$.call) {
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
  var $type$$46$$ = $goog$typeOf$$($val$$4$$);
  return"array" == $type$$46$$ || "object" == $type$$46$$ && "number" == typeof $val$$4$$.length
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
  var $type$$47$$ = typeof $val$$10$$;
  return"object" == $type$$47$$ && $val$$10$$ != $JSCompiler_alias_NULL$$ || "function" == $type$$47$$
}
function $goog$getUid$$($obj$$17$$) {
  return $obj$$17$$[$goog$UID_PROPERTY_$$] || ($obj$$17$$[$goog$UID_PROPERTY_$$] = ++$goog$uidCounter_$$)
}
var $goog$UID_PROPERTY_$$ = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36), $goog$uidCounter_$$ = 0;
function $goog$bindNative_$$($fn$$, $selfObj$$1$$, $var_args$$24$$) {
  return $fn$$.call.apply($fn$$.bind, arguments)
}
function $goog$bindJs_$$($fn$$1$$, $selfObj$$2$$, $var_args$$25$$) {
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
function $goog$bind$$($fn$$2$$, $selfObj$$3$$, $var_args$$26$$) {
  $goog$bind$$ = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? $goog$bindNative_$$ : $goog$bindJs_$$;
  return $goog$bind$$.apply($JSCompiler_alias_NULL$$, arguments)
}
function $goog$partial$$($fn$$3$$, $var_args$$27$$) {
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
;function $goog$string$subs$$($str$$12$$, $var_args$$29$$) {
  for(var $i$$5$$ = 1;$i$$5$$ < arguments.length;$i$$5$$++) {
    var $replacement$$ = ("" + arguments[$i$$5$$]).replace(/\$/g, "$$$$"), $str$$12$$ = $str$$12$$.replace(/\%s/, $replacement$$)
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
  var $s$$13$$ = $goog$isDef$$($JSCompiler_alias_VOID$$) ? $num$$4$$.toFixed($JSCompiler_alias_VOID$$) : "" + $num$$4$$, $index$$44_length$$inline_50$$ = $s$$13$$.indexOf(".");
  -1 == $index$$44_length$$inline_50$$ && ($index$$44_length$$inline_50$$ = $s$$13$$.length);
  $index$$44_length$$inline_50$$ = Math.max(0, $length$$14$$ - $index$$44_length$$inline_50$$);
  return Array($index$$44_length$$inline_50$$ + 1).join("0") + $s$$13$$
}
;var $goog$userAgent$detectedOpera_$$, $goog$userAgent$detectedIe_$$, $goog$userAgent$detectedWebkit_$$, $goog$userAgent$detectedMobile_$$, $goog$userAgent$detectedGecko_$$, $goog$userAgent$detectedMac_$$, $goog$userAgent$detectedWindows_$$;
function $goog$userAgent$getUserAgentString$$() {
  return $goog$global$$.navigator ? $goog$global$$.navigator.userAgent : $JSCompiler_alias_NULL$$
}
function $goog$userAgent$getNavigator$$() {
  return $goog$global$$.navigator
}
$goog$userAgent$detectedGecko_$$ = $goog$userAgent$detectedMobile_$$ = $goog$userAgent$detectedWebkit_$$ = $goog$userAgent$detectedIe_$$ = $goog$userAgent$detectedOpera_$$ = $JSCompiler_alias_FALSE$$;
var $ua$$inline_53$$;
if($ua$$inline_53$$ = $goog$userAgent$getUserAgentString$$()) {
  var $navigator$$inline_54$$ = $goog$userAgent$getNavigator$$();
  $goog$userAgent$detectedOpera_$$ = 0 == $ua$$inline_53$$.indexOf("Opera");
  $goog$userAgent$detectedIe_$$ = !$goog$userAgent$detectedOpera_$$ && -1 != $ua$$inline_53$$.indexOf("MSIE");
  $goog$userAgent$detectedMobile_$$ = ($goog$userAgent$detectedWebkit_$$ = !$goog$userAgent$detectedOpera_$$ && -1 != $ua$$inline_53$$.indexOf("WebKit")) && -1 != $ua$$inline_53$$.indexOf("Mobile");
  $goog$userAgent$detectedGecko_$$ = !$goog$userAgent$detectedOpera_$$ && !$goog$userAgent$detectedWebkit_$$ && "Gecko" == $navigator$$inline_54$$.product
}
var $goog$userAgent$OPERA$$ = $goog$userAgent$detectedOpera_$$, $goog$userAgent$IE$$ = $goog$userAgent$detectedIe_$$, $goog$userAgent$GECKO$$ = $goog$userAgent$detectedGecko_$$, $goog$userAgent$WEBKIT$$ = $goog$userAgent$detectedWebkit_$$, $goog$userAgent$MOBILE$$ = $goog$userAgent$detectedMobile_$$, $goog$userAgent$PLATFORM$$, $navigator$$inline_56$$ = $goog$userAgent$getNavigator$$();
$goog$userAgent$PLATFORM$$ = $navigator$$inline_56$$ && $navigator$$inline_56$$.platform || "";
$goog$userAgent$detectedMac_$$ = -1 != $goog$userAgent$PLATFORM$$.indexOf("Mac");
$goog$userAgent$detectedWindows_$$ = -1 != $goog$userAgent$PLATFORM$$.indexOf("Win");
var $goog$userAgent$X11$$ = !!$goog$userAgent$getNavigator$$() && -1 != ($goog$userAgent$getNavigator$$().appVersion || "").indexOf("X11"), $goog$userAgent$VERSION$$;
a: {
  var $version$$inline_59$$ = "", $re$$inline_60$$;
  if($goog$userAgent$OPERA$$ && $goog$global$$.opera) {
    var $operaVersion$$inline_61$$ = $goog$global$$.opera.version, $version$$inline_59$$ = "function" == typeof $operaVersion$$inline_61$$ ? $operaVersion$$inline_61$$() : $operaVersion$$inline_61$$
  }else {
    if($goog$userAgent$GECKO$$ ? $re$$inline_60$$ = /rv\:([^\);]+)(\)|;)/ : $goog$userAgent$IE$$ ? $re$$inline_60$$ = /MSIE\s+([^\);]+)(\)|;)/ : $goog$userAgent$WEBKIT$$ && ($re$$inline_60$$ = /WebKit\/(\S+)/), $re$$inline_60$$) {
      var $arr$$inline_62$$ = $re$$inline_60$$.exec($goog$userAgent$getUserAgentString$$()), $version$$inline_59$$ = $arr$$inline_62$$ ? $arr$$inline_62$$[1] : ""
    }
  }
  if($goog$userAgent$IE$$) {
    var $docMode$$inline_63$$, $doc$$inline_853$$ = $goog$global$$.document;
    $docMode$$inline_63$$ = $doc$$inline_853$$ ? $doc$$inline_853$$.documentMode : $JSCompiler_alias_VOID$$;
    if($docMode$$inline_63$$ > parseFloat($version$$inline_59$$)) {
      $goog$userAgent$VERSION$$ = "" + $docMode$$inline_63$$;
      break a
    }
  }
  $goog$userAgent$VERSION$$ = $version$$inline_59$$
}
var $goog$userAgent$isVersionCache_$$ = {};
function $goog$userAgent$isVersion$$($version$$8$$) {
  var $JSCompiler_temp$$45_order$$inline_68$$;
  if(!($JSCompiler_temp$$45_order$$inline_68$$ = $goog$userAgent$isVersionCache_$$[$version$$8$$])) {
    $JSCompiler_temp$$45_order$$inline_68$$ = 0;
    for(var $v1Subs$$inline_69$$ = $goog$string$trim$$("" + $goog$userAgent$VERSION$$).split("."), $v2Subs$$inline_70$$ = $goog$string$trim$$("" + $version$$8$$).split("."), $subCount$$inline_71$$ = Math.max($v1Subs$$inline_69$$.length, $v2Subs$$inline_70$$.length), $subIdx$$inline_72$$ = 0;0 == $JSCompiler_temp$$45_order$$inline_68$$ && $subIdx$$inline_72$$ < $subCount$$inline_71$$;$subIdx$$inline_72$$++) {
      var $v1Sub$$inline_73$$ = $v1Subs$$inline_69$$[$subIdx$$inline_72$$] || "", $v2Sub$$inline_74$$ = $v2Subs$$inline_70$$[$subIdx$$inline_72$$] || "", $v1CompParser$$inline_75$$ = RegExp("(\\d*)(\\D*)", "g"), $v2CompParser$$inline_76$$ = RegExp("(\\d*)(\\D*)", "g");
      do {
        var $v1Comp$$inline_77$$ = $v1CompParser$$inline_75$$.exec($v1Sub$$inline_73$$) || ["", "", ""], $v2Comp$$inline_78$$ = $v2CompParser$$inline_76$$.exec($v2Sub$$inline_74$$) || ["", "", ""];
        if(0 == $v1Comp$$inline_77$$[0].length && 0 == $v2Comp$$inline_78$$[0].length) {
          break
        }
        $JSCompiler_temp$$45_order$$inline_68$$ = ((0 == $v1Comp$$inline_77$$[1].length ? 0 : parseInt($v1Comp$$inline_77$$[1], 10)) < (0 == $v2Comp$$inline_78$$[1].length ? 0 : parseInt($v2Comp$$inline_78$$[1], 10)) ? -1 : (0 == $v1Comp$$inline_77$$[1].length ? 0 : parseInt($v1Comp$$inline_77$$[1], 10)) > (0 == $v2Comp$$inline_78$$[1].length ? 0 : parseInt($v2Comp$$inline_78$$[1], 10)) ? 1 : 0) || ((0 == $v1Comp$$inline_77$$[2].length) < (0 == $v2Comp$$inline_78$$[2].length) ? -1 : (0 == $v1Comp$$inline_77$$[2].length) > 
        (0 == $v2Comp$$inline_78$$[2].length) ? 1 : 0) || ($v1Comp$$inline_77$$[2] < $v2Comp$$inline_78$$[2] ? -1 : $v1Comp$$inline_77$$[2] > $v2Comp$$inline_78$$[2] ? 1 : 0)
      }while(0 == $JSCompiler_temp$$45_order$$inline_68$$)
    }
    $JSCompiler_temp$$45_order$$inline_68$$ = $goog$userAgent$isVersionCache_$$[$version$$8$$] = 0 <= $JSCompiler_temp$$45_order$$inline_68$$
  }
  return $JSCompiler_temp$$45_order$$inline_68$$
}
var $goog$userAgent$isDocumentModeCache_$$ = {};
function $goog$userAgent$isDocumentMode$$($documentMode$$) {
  return $goog$userAgent$isDocumentModeCache_$$[$documentMode$$] || ($goog$userAgent$isDocumentModeCache_$$[$documentMode$$] = $goog$userAgent$IE$$ && !!document.documentMode && document.documentMode >= $documentMode$$)
}
;function $goog$events$Listener$$() {
}
var $goog$events$Listener$counter_$$ = 0;
$JSCompiler_prototypeAlias$$ = $goog$events$Listener$$.prototype;
$JSCompiler_prototypeAlias$$.key = 0;
$JSCompiler_prototypeAlias$$.$removed$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$callOnce$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$init$ = function $$JSCompiler_prototypeAlias$$$$init$$($listener$$26$$, $proxy$$, $src$$4$$, $type$$49$$, $capture$$, $opt_handler$$) {
  $goog$isFunction$$($listener$$26$$) ? this.$isFunctionListener_$ = $JSCompiler_alias_TRUE$$ : $listener$$26$$ && $listener$$26$$.handleEvent && $goog$isFunction$$($listener$$26$$.handleEvent) ? this.$isFunctionListener_$ = $JSCompiler_alias_FALSE$$ : $JSCompiler_alias_THROW$$(Error("Invalid listener argument"));
  this.$listener$ = $listener$$26$$;
  this.$proxy$ = $proxy$$;
  this.src = $src$$4$$;
  this.type = $type$$49$$;
  this.capture = !!$capture$$;
  this.$handler$ = $opt_handler$$;
  this.$callOnce$ = $JSCompiler_alias_FALSE$$;
  this.key = ++$goog$events$Listener$counter_$$;
  this.$removed$ = $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.handleEvent = function $$JSCompiler_prototypeAlias$$$handleEvent$($eventObject$$) {
  return this.$isFunctionListener_$ ? this.$listener$.call(this.$handler$ || this.src, $eventObject$$) : this.$listener$.handleEvent.call(this.$listener$, $eventObject$$)
};
function $goog$object$forEach$$($obj$$21$$, $f$$) {
  for(var $key$$15$$ in $obj$$21$$) {
    $f$$.call($JSCompiler_alias_VOID$$, $obj$$21$$[$key$$15$$], $key$$15$$, $obj$$21$$)
  }
}
function $goog$object$getValues$$($obj$$30$$) {
  var $res$$2$$ = [], $i$$12$$ = 0, $key$$23$$;
  for($key$$23$$ in $obj$$30$$) {
    $res$$2$$[$i$$12$$++] = $obj$$30$$[$key$$23$$]
  }
  return $res$$2$$
}
function $goog$object$getKeys$$($obj$$31$$) {
  var $res$$3$$ = [], $i$$13$$ = 0, $key$$24$$;
  for($key$$24$$ in $obj$$31$$) {
    $res$$3$$[$i$$13$$++] = $key$$24$$
  }
  return $res$$3$$
}
function $goog$object$add$$($obj$$40$$, $key$$31$$, $val$$13$$) {
  $key$$31$$ in $obj$$40$$ && $JSCompiler_alias_THROW$$(Error('The object already contains the key "' + $key$$31$$ + '"'));
  $obj$$40$$[$key$$31$$] = $val$$13$$
}
var $goog$object$PROTOTYPE_FIELDS_$$ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function $goog$object$extend$$($target$$39$$, $var_args$$32$$) {
  for(var $key$$38$$, $source$$2$$, $i$$16$$ = 1;$i$$16$$ < arguments.length;$i$$16$$++) {
    $source$$2$$ = arguments[$i$$16$$];
    for($key$$38$$ in $source$$2$$) {
      $target$$39$$[$key$$38$$] = $source$$2$$[$key$$38$$]
    }
    for(var $j$$1$$ = 0;$j$$1$$ < $goog$object$PROTOTYPE_FIELDS_$$.length;$j$$1$$++) {
      $key$$38$$ = $goog$object$PROTOTYPE_FIELDS_$$[$j$$1$$], Object.prototype.hasOwnProperty.call($source$$2$$, $key$$38$$) && ($target$$39$$[$key$$38$$] = $source$$2$$[$key$$38$$])
    }
  }
}
;var $goog$events$BrowserFeature$HAS_W3C_BUTTON$$ = !$goog$userAgent$IE$$ || $goog$userAgent$isDocumentMode$$(9), $goog$events$BrowserFeature$HAS_W3C_EVENT_SUPPORT$$ = !$goog$userAgent$IE$$ || $goog$userAgent$isDocumentMode$$(9), $goog$events$BrowserFeature$SET_KEY_CODE_TO_PREVENT_DEFAULT$$ = $goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("8");
!$goog$userAgent$WEBKIT$$ || $goog$userAgent$isVersion$$("528");
$goog$userAgent$GECKO$$ && $goog$userAgent$isVersion$$("1.9b") || $goog$userAgent$IE$$ && $goog$userAgent$isVersion$$("8") || $goog$userAgent$OPERA$$ && $goog$userAgent$isVersion$$("9.5") || $goog$userAgent$WEBKIT$$ && $goog$userAgent$isVersion$$("528");
$goog$userAgent$GECKO$$ && !$goog$userAgent$isVersion$$("8") || $goog$userAgent$IE$$ && $goog$userAgent$isVersion$$("9");
function $goog$debug$Error$$($opt_msg$$) {
  this.stack = Error().stack || "";
  $opt_msg$$ && (this.message = "" + $opt_msg$$)
}
$goog$inherits$$($goog$debug$Error$$, Error);
$goog$debug$Error$$.prototype.name = "CustomError";
function $goog$asserts$AssertionError$$($messagePattern$$, $messageArgs$$) {
  $messageArgs$$.unshift($messagePattern$$);
  $goog$debug$Error$$.call(this, $goog$string$subs$$.apply($JSCompiler_alias_NULL$$, $messageArgs$$));
  $messageArgs$$.shift()
}
$goog$inherits$$($goog$asserts$AssertionError$$, $goog$debug$Error$$);
$goog$asserts$AssertionError$$.prototype.name = "AssertionError";
function $goog$asserts$assert$$($condition$$1$$, $opt_message$$8$$, $var_args$$35$$) {
  if(!$condition$$1$$) {
    var $givenArgs$$inline_85$$ = Array.prototype.slice.call(arguments, 2), $message$$inline_88$$ = "Assertion failed";
    if($opt_message$$8$$) {
      var $message$$inline_88$$ = $message$$inline_88$$ + (": " + $opt_message$$8$$), $args$$inline_89$$ = $givenArgs$$inline_85$$
    }
    $JSCompiler_alias_THROW$$(new $goog$asserts$AssertionError$$("" + $message$$inline_88$$, $args$$inline_89$$ || []))
  }
}
function $goog$asserts$fail$$($opt_message$$9$$, $var_args$$36$$) {
  $JSCompiler_alias_THROW$$(new $goog$asserts$AssertionError$$("Failure" + ($opt_message$$9$$ ? ": " + $opt_message$$9$$ : ""), Array.prototype.slice.call(arguments, 1)))
}
;var $goog$array$ARRAY_PROTOTYPE_$$ = Array.prototype, $goog$array$indexOf$$ = $goog$array$ARRAY_PROTOTYPE_$$.indexOf ? function($arr$$11$$, $obj$$47$$, $opt_fromIndex$$6$$) {
  $goog$asserts$assert$$($arr$$11$$.length != $JSCompiler_alias_NULL$$);
  return $goog$array$ARRAY_PROTOTYPE_$$.indexOf.call($arr$$11$$, $obj$$47$$, $opt_fromIndex$$6$$)
} : function($arr$$12$$, $obj$$48$$, $fromIndex_i$$19_opt_fromIndex$$7$$) {
  $fromIndex_i$$19_opt_fromIndex$$7$$ = $fromIndex_i$$19_opt_fromIndex$$7$$ == $JSCompiler_alias_NULL$$ ? 0 : 0 > $fromIndex_i$$19_opt_fromIndex$$7$$ ? Math.max(0, $arr$$12$$.length + $fromIndex_i$$19_opt_fromIndex$$7$$) : $fromIndex_i$$19_opt_fromIndex$$7$$;
  if($goog$isString$$($arr$$12$$)) {
    return!$goog$isString$$($obj$$48$$) || 1 != $obj$$48$$.length ? -1 : $arr$$12$$.indexOf($obj$$48$$, $fromIndex_i$$19_opt_fromIndex$$7$$)
  }
  for(;$fromIndex_i$$19_opt_fromIndex$$7$$ < $arr$$12$$.length;$fromIndex_i$$19_opt_fromIndex$$7$$++) {
    if($fromIndex_i$$19_opt_fromIndex$$7$$ in $arr$$12$$ && $arr$$12$$[$fromIndex_i$$19_opt_fromIndex$$7$$] === $obj$$48$$) {
      return $fromIndex_i$$19_opt_fromIndex$$7$$
    }
  }
  return-1
}, $goog$array$forEach$$ = $goog$array$ARRAY_PROTOTYPE_$$.forEach ? function($arr$$15$$, $f$$7$$, $opt_obj$$6$$) {
  $goog$asserts$assert$$($arr$$15$$.length != $JSCompiler_alias_NULL$$);
  $goog$array$ARRAY_PROTOTYPE_$$.forEach.call($arr$$15$$, $f$$7$$, $opt_obj$$6$$)
} : function($arr$$16$$, $f$$8$$, $opt_obj$$7$$) {
  for(var $l$$2$$ = $arr$$16$$.length, $arr2$$ = $goog$isString$$($arr$$16$$) ? $arr$$16$$.split("") : $arr$$16$$, $i$$21$$ = 0;$i$$21$$ < $l$$2$$;$i$$21$$++) {
    $i$$21$$ in $arr2$$ && $f$$8$$.call($opt_obj$$7$$, $arr2$$[$i$$21$$], $i$$21$$, $arr$$16$$)
  }
}, $goog$array$filter$$ = $goog$array$ARRAY_PROTOTYPE_$$.filter ? function($arr$$18$$, $f$$10$$, $opt_obj$$9$$) {
  $goog$asserts$assert$$($arr$$18$$.length != $JSCompiler_alias_NULL$$);
  return $goog$array$ARRAY_PROTOTYPE_$$.filter.call($arr$$18$$, $f$$10$$, $opt_obj$$9$$)
} : function($arr$$19$$, $f$$11$$, $opt_obj$$10$$) {
  for(var $l$$4$$ = $arr$$19$$.length, $res$$5$$ = [], $resLength$$ = 0, $arr2$$2$$ = $goog$isString$$($arr$$19$$) ? $arr$$19$$.split("") : $arr$$19$$, $i$$23$$ = 0;$i$$23$$ < $l$$4$$;$i$$23$$++) {
    if($i$$23$$ in $arr2$$2$$) {
      var $val$$14$$ = $arr2$$2$$[$i$$23$$];
      $f$$11$$.call($opt_obj$$10$$, $val$$14$$, $i$$23$$, $arr$$19$$) && ($res$$5$$[$resLength$$++] = $val$$14$$)
    }
  }
  return $res$$5$$
}, $goog$array$map$$ = $goog$array$ARRAY_PROTOTYPE_$$.map ? function($arr$$20$$, $f$$12$$, $opt_obj$$11$$) {
  $goog$asserts$assert$$($arr$$20$$.length != $JSCompiler_alias_NULL$$);
  return $goog$array$ARRAY_PROTOTYPE_$$.map.call($arr$$20$$, $f$$12$$, $opt_obj$$11$$)
} : function($arr$$21$$, $f$$13$$, $opt_obj$$12$$) {
  for(var $l$$5$$ = $arr$$21$$.length, $res$$6$$ = Array($l$$5$$), $arr2$$3$$ = $goog$isString$$($arr$$21$$) ? $arr$$21$$.split("") : $arr$$21$$, $i$$24$$ = 0;$i$$24$$ < $l$$5$$;$i$$24$$++) {
    $i$$24$$ in $arr2$$3$$ && ($res$$6$$[$i$$24$$] = $f$$13$$.call($opt_obj$$12$$, $arr2$$3$$[$i$$24$$], $i$$24$$, $arr$$21$$))
  }
  return $res$$6$$
}, $goog$array$every$$ = $goog$array$ARRAY_PROTOTYPE_$$.every ? function($arr$$26$$, $f$$18$$, $opt_obj$$17$$) {
  $goog$asserts$assert$$($arr$$26$$.length != $JSCompiler_alias_NULL$$);
  return $goog$array$ARRAY_PROTOTYPE_$$.every.call($arr$$26$$, $f$$18$$, $opt_obj$$17$$)
} : function($arr$$27$$, $f$$19$$, $opt_obj$$18$$) {
  for(var $l$$7$$ = $arr$$27$$.length, $arr2$$5$$ = $goog$isString$$($arr$$27$$) ? $arr$$27$$.split("") : $arr$$27$$, $i$$26$$ = 0;$i$$26$$ < $l$$7$$;$i$$26$$++) {
    if($i$$26$$ in $arr2$$5$$ && !$f$$19$$.call($opt_obj$$18$$, $arr2$$5$$[$i$$26$$], $i$$26$$, $arr$$27$$)) {
      return $JSCompiler_alias_FALSE$$
    }
  }
  return $JSCompiler_alias_TRUE$$
};
function $goog$array$findIndex$$($arr$$29$$, $f$$21$$) {
  for(var $l$$8$$ = $arr$$29$$.length, $arr2$$6$$ = $goog$isString$$($arr$$29$$) ? $arr$$29$$.split("") : $arr$$29$$, $i$$28$$ = 0;$i$$28$$ < $l$$8$$;$i$$28$$++) {
    if($i$$28$$ in $arr2$$6$$ && $f$$21$$.call($JSCompiler_alias_VOID$$, $arr2$$6$$[$i$$28$$], $i$$28$$, $arr$$29$$)) {
      return $i$$28$$
    }
  }
  return-1
}
function $goog$array$findIndexRight$$($arr$$31$$, $f$$23$$) {
  for(var $arr2$$7$$ = $goog$isString$$($arr$$31$$) ? $arr$$31$$.split("") : $arr$$31$$, $i$$30$$ = $arr$$31$$.length - 1;0 <= $i$$30$$;$i$$30$$--) {
    if($i$$30$$ in $arr2$$7$$ && $f$$23$$.call($JSCompiler_alias_VOID$$, $arr2$$7$$[$i$$30$$], $i$$30$$, $arr$$31$$)) {
      return $i$$30$$
    }
  }
  return-1
}
function $goog$array$contains$$($arr$$32$$, $obj$$51$$) {
  return 0 <= $goog$array$indexOf$$($arr$$32$$, $obj$$51$$)
}
function $goog$array$remove$$($arr$$39$$, $obj$$55$$) {
  var $i$$33$$ = $goog$array$indexOf$$($arr$$39$$, $obj$$55$$);
  0 <= $i$$33$$ && ($goog$asserts$assert$$($arr$$39$$.length != $JSCompiler_alias_NULL$$), $goog$array$ARRAY_PROTOTYPE_$$.splice.call($arr$$39$$, $i$$33$$, 1))
}
function $goog$array$concat$$($var_args$$44$$) {
  return $goog$array$ARRAY_PROTOTYPE_$$.concat.apply($goog$array$ARRAY_PROTOTYPE_$$, arguments)
}
function $goog$array$clone$$($arr$$42$$) {
  if($goog$isArray$$($arr$$42$$)) {
    return $goog$array$concat$$($arr$$42$$)
  }
  for(var $rv$$7$$ = [], $i$$36$$ = 0, $len$$ = $arr$$42$$.length;$i$$36$$ < $len$$;$i$$36$$++) {
    $rv$$7$$[$i$$36$$] = $arr$$42$$[$i$$36$$]
  }
  return $rv$$7$$
}
function $goog$array$splice$$($arr$$43$$, $index$$47$$, $howMany$$, $var_args$$46$$) {
  $goog$asserts$assert$$($arr$$43$$.length != $JSCompiler_alias_NULL$$);
  $goog$array$ARRAY_PROTOTYPE_$$.splice.apply($arr$$43$$, $goog$array$slice$$(arguments, 1))
}
function $goog$array$slice$$($arr$$44$$, $start$$5$$, $opt_end$$13$$) {
  $goog$asserts$assert$$($arr$$44$$.length != $JSCompiler_alias_NULL$$);
  return 2 >= arguments.length ? $goog$array$ARRAY_PROTOTYPE_$$.slice.call($arr$$44$$, $start$$5$$) : $goog$array$ARRAY_PROTOTYPE_$$.slice.call($arr$$44$$, $start$$5$$, $opt_end$$13$$)
}
;function $goog$Disposable$$() {
}
$goog$Disposable$$.prototype.$disposed_$ = $JSCompiler_alias_FALSE$$;
$goog$Disposable$$.prototype.$dispose$ = function $$goog$Disposable$$$$$dispose$$() {
  this.$disposed_$ || (this.$disposed_$ = $JSCompiler_alias_TRUE$$, this.$disposeInternal$())
};
$goog$Disposable$$.prototype.$disposeInternal$ = function $$goog$Disposable$$$$$disposeInternal$$() {
  this.$dependentDisposables_$ && $goog$disposeAll$$.apply($JSCompiler_alias_NULL$$, this.$dependentDisposables_$)
};
function $goog$dispose$$($obj$$56$$) {
  $obj$$56$$ && "function" == typeof $obj$$56$$.$dispose$ && $obj$$56$$.$dispose$()
}
function $goog$disposeAll$$($var_args$$49$$) {
  for(var $i$$50$$ = 0, $len$$1$$ = arguments.length;$i$$50$$ < $len$$1$$;++$i$$50$$) {
    var $disposable$$1$$ = arguments[$i$$50$$];
    $goog$isArrayLike$$($disposable$$1$$) ? $goog$disposeAll$$.apply($JSCompiler_alias_NULL$$, $disposable$$1$$) : $goog$dispose$$($disposable$$1$$)
  }
}
;function $goog$events$Event$$($type$$52$$, $opt_target$$1$$) {
  this.type = $type$$52$$;
  this.currentTarget = this.target = $opt_target$$1$$
}
$goog$inherits$$($goog$events$Event$$, $goog$Disposable$$);
$JSCompiler_prototypeAlias$$ = $goog$events$Event$$.prototype;
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  delete this.type;
  delete this.target;
  delete this.currentTarget
};
$JSCompiler_prototypeAlias$$.$propagationStopped_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$returnValue_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.stopPropagation = function $$JSCompiler_prototypeAlias$$$stopPropagation$() {
  this.$propagationStopped_$ = $JSCompiler_alias_TRUE$$
};
$JSCompiler_prototypeAlias$$.preventDefault = function $$JSCompiler_prototypeAlias$$$preventDefault$() {
  this.$returnValue_$ = $JSCompiler_alias_FALSE$$
};
function $goog$events$Event$preventDefault$$($e$$9$$) {
  $e$$9$$.preventDefault()
}
;function $goog$reflect$sinkValue$$($x$$55$$) {
  $goog$reflect$sinkValue$$[" "]($x$$55$$);
  return $x$$55$$
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
$JSCompiler_prototypeAlias$$.$init$ = function $$JSCompiler_prototypeAlias$$$$init$$($e$$11$$, $opt_currentTarget$$1$$) {
  var $type$$54$$ = this.type = $e$$11$$.type;
  $goog$events$Event$$.call(this, $type$$54$$);
  this.target = $e$$11$$.target || $e$$11$$.srcElement;
  this.currentTarget = $opt_currentTarget$$1$$;
  var $relatedTarget$$ = $e$$11$$.relatedTarget;
  if($relatedTarget$$) {
    if($goog$userAgent$GECKO$$) {
      var $JSCompiler_inline_result$$94$$;
      a: {
        try {
          $goog$reflect$sinkValue$$($relatedTarget$$.nodeName);
          $JSCompiler_inline_result$$94$$ = $JSCompiler_alias_TRUE$$;
          break a
        }catch($e$$inline_97$$) {
        }
        $JSCompiler_inline_result$$94$$ = $JSCompiler_alias_FALSE$$
      }
      $JSCompiler_inline_result$$94$$ || ($relatedTarget$$ = $JSCompiler_alias_NULL$$)
    }
  }else {
    "mouseover" == $type$$54$$ ? $relatedTarget$$ = $e$$11$$.fromElement : "mouseout" == $type$$54$$ && ($relatedTarget$$ = $e$$11$$.toElement)
  }
  this.relatedTarget = $relatedTarget$$;
  this.offsetX = $goog$userAgent$WEBKIT$$ || $e$$11$$.offsetX !== $JSCompiler_alias_VOID$$ ? $e$$11$$.offsetX : $e$$11$$.layerX;
  this.offsetY = $goog$userAgent$WEBKIT$$ || $e$$11$$.offsetY !== $JSCompiler_alias_VOID$$ ? $e$$11$$.offsetY : $e$$11$$.layerY;
  this.clientX = $e$$11$$.clientX !== $JSCompiler_alias_VOID$$ ? $e$$11$$.clientX : $e$$11$$.pageX;
  this.clientY = $e$$11$$.clientY !== $JSCompiler_alias_VOID$$ ? $e$$11$$.clientY : $e$$11$$.pageY;
  this.screenX = $e$$11$$.screenX || 0;
  this.screenY = $e$$11$$.screenY || 0;
  this.button = $e$$11$$.button;
  this.keyCode = $e$$11$$.keyCode || 0;
  this.charCode = $e$$11$$.charCode || ("keypress" == $type$$54$$ ? $e$$11$$.keyCode : 0);
  this.ctrlKey = $e$$11$$.ctrlKey;
  this.altKey = $e$$11$$.altKey;
  this.shiftKey = $e$$11$$.shiftKey;
  this.metaKey = $e$$11$$.metaKey;
  this.$platformModifierKey$ = $goog$userAgent$detectedMac_$$ ? $e$$11$$.metaKey : $e$$11$$.ctrlKey;
  this.state = $e$$11$$.state;
  this.$event_$ = $e$$11$$;
  delete this.$returnValue_$;
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
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$events$BrowserEvent$$.$superClass_$.$disposeInternal$.call(this);
  this.relatedTarget = this.currentTarget = this.target = this.$event_$ = $JSCompiler_alias_NULL$$
};
var $goog$events$listeners_$$ = {}, $goog$events$listenerTree_$$ = {}, $goog$events$sources_$$ = {}, $goog$events$onStringMap_$$ = {};
function $goog$events$listen$$($src$$7$$, $type$$55$$, $key$$42_listener$$29$$, $capture$$1_opt_capt$$2$$, $opt_handler$$1$$) {
  if($type$$55$$) {
    if($goog$isArray$$($type$$55$$)) {
      for(var $i$$51_proxy$$1$$ = 0;$i$$51_proxy$$1$$ < $type$$55$$.length;$i$$51_proxy$$1$$++) {
        $goog$events$listen$$($src$$7$$, $type$$55$$[$i$$51_proxy$$1$$], $key$$42_listener$$29$$, $capture$$1_opt_capt$$2$$, $opt_handler$$1$$)
      }
      return $JSCompiler_alias_NULL$$
    }
    var $capture$$1_opt_capt$$2$$ = !!$capture$$1_opt_capt$$2$$, $listenerObj_map$$ = $goog$events$listenerTree_$$;
    $type$$55$$ in $listenerObj_map$$ || ($listenerObj_map$$[$type$$55$$] = {$count_$:0, $remaining_$:0});
    $listenerObj_map$$ = $listenerObj_map$$[$type$$55$$];
    $capture$$1_opt_capt$$2$$ in $listenerObj_map$$ || ($listenerObj_map$$[$capture$$1_opt_capt$$2$$] = {$count_$:0, $remaining_$:0}, $listenerObj_map$$.$count_$++);
    var $listenerObj_map$$ = $listenerObj_map$$[$capture$$1_opt_capt$$2$$], $srcUid$$ = $goog$getUid$$($src$$7$$), $listenerArray$$;
    $listenerObj_map$$.$remaining_$++;
    if($listenerObj_map$$[$srcUid$$]) {
      $listenerArray$$ = $listenerObj_map$$[$srcUid$$];
      for($i$$51_proxy$$1$$ = 0;$i$$51_proxy$$1$$ < $listenerArray$$.length;$i$$51_proxy$$1$$++) {
        if($listenerObj_map$$ = $listenerArray$$[$i$$51_proxy$$1$$], $listenerObj_map$$.$listener$ == $key$$42_listener$$29$$ && $listenerObj_map$$.$handler$ == $opt_handler$$1$$) {
          if($listenerObj_map$$.$removed$) {
            break
          }
          return $listenerArray$$[$i$$51_proxy$$1$$].key
        }
      }
    }else {
      $listenerArray$$ = $listenerObj_map$$[$srcUid$$] = [], $listenerObj_map$$.$count_$++
    }
    $i$$51_proxy$$1$$ = $goog$events$getProxy$$();
    $i$$51_proxy$$1$$.src = $src$$7$$;
    $listenerObj_map$$ = new $goog$events$Listener$$;
    $listenerObj_map$$.$init$($key$$42_listener$$29$$, $i$$51_proxy$$1$$, $src$$7$$, $type$$55$$, $capture$$1_opt_capt$$2$$, $opt_handler$$1$$);
    $key$$42_listener$$29$$ = $listenerObj_map$$.key;
    $i$$51_proxy$$1$$.key = $key$$42_listener$$29$$;
    $listenerArray$$.push($listenerObj_map$$);
    $goog$events$listeners_$$[$key$$42_listener$$29$$] = $listenerObj_map$$;
    $goog$events$sources_$$[$srcUid$$] || ($goog$events$sources_$$[$srcUid$$] = []);
    $goog$events$sources_$$[$srcUid$$].push($listenerObj_map$$);
    $src$$7$$.addEventListener ? ($src$$7$$ == $goog$global$$ || !$src$$7$$.$customEvent_$) && $src$$7$$.addEventListener($type$$55$$, $i$$51_proxy$$1$$, $capture$$1_opt_capt$$2$$) : $src$$7$$.attachEvent($type$$55$$ in $goog$events$onStringMap_$$ ? $goog$events$onStringMap_$$[$type$$55$$] : $goog$events$onStringMap_$$[$type$$55$$] = "on" + $type$$55$$, $i$$51_proxy$$1$$);
    return $key$$42_listener$$29$$
  }
  $JSCompiler_alias_THROW$$(Error("Invalid event type"))
}
function $goog$events$getProxy$$() {
  var $proxyCallbackFunction$$ = $goog$events$handleBrowserEvent_$$, $f$$25$$ = $goog$events$BrowserFeature$HAS_W3C_EVENT_SUPPORT$$ ? function($eventObject$$1$$) {
    return $proxyCallbackFunction$$.call($f$$25$$.src, $f$$25$$.key, $eventObject$$1$$)
  } : function($eventObject$$2_v$$) {
    $eventObject$$2_v$$ = $proxyCallbackFunction$$.call($f$$25$$.src, $f$$25$$.key, $eventObject$$2_v$$);
    if(!$eventObject$$2_v$$) {
      return $eventObject$$2_v$$
    }
  };
  return $f$$25$$
}
function $goog$events$listenOnce$$($key$$43_src$$8$$, $type$$56$$, $listener$$30$$, $opt_capt$$3$$, $opt_handler$$2$$) {
  if($goog$isArray$$($type$$56$$)) {
    for(var $i$$52$$ = 0;$i$$52$$ < $type$$56$$.length;$i$$52$$++) {
      $goog$events$listenOnce$$($key$$43_src$$8$$, $type$$56$$[$i$$52$$], $listener$$30$$, $opt_capt$$3$$, $opt_handler$$2$$)
    }
  }else {
    $key$$43_src$$8$$ = $goog$events$listen$$($key$$43_src$$8$$, $type$$56$$, $listener$$30$$, $opt_capt$$3$$, $opt_handler$$2$$), $goog$events$listeners_$$[$key$$43_src$$8$$].$callOnce$ = $JSCompiler_alias_TRUE$$
  }
}
function $goog$events$unlisten$$($listenerArray$$1_src$$10$$, $type$$57$$, $listener$$32$$, $capture$$2_opt_capt$$5$$, $opt_handler$$4$$) {
  if($goog$isArray$$($type$$57$$)) {
    for(var $i$$53$$ = 0;$i$$53$$ < $type$$57$$.length;$i$$53$$++) {
      $goog$events$unlisten$$($listenerArray$$1_src$$10$$, $type$$57$$[$i$$53$$], $listener$$32$$, $capture$$2_opt_capt$$5$$, $opt_handler$$4$$)
    }
  }else {
    if($capture$$2_opt_capt$$5$$ = !!$capture$$2_opt_capt$$5$$, $listenerArray$$1_src$$10$$ = $goog$events$getListeners_$$($listenerArray$$1_src$$10$$, $type$$57$$, $capture$$2_opt_capt$$5$$)) {
      for($i$$53$$ = 0;$i$$53$$ < $listenerArray$$1_src$$10$$.length;$i$$53$$++) {
        if($listenerArray$$1_src$$10$$[$i$$53$$].$listener$ == $listener$$32$$ && $listenerArray$$1_src$$10$$[$i$$53$$].capture == $capture$$2_opt_capt$$5$$ && $listenerArray$$1_src$$10$$[$i$$53$$].$handler$ == $opt_handler$$4$$) {
          $goog$events$unlistenByKey$$($listenerArray$$1_src$$10$$[$i$$53$$].key);
          break
        }
      }
    }
  }
}
function $goog$events$unlistenByKey$$($key$$44$$) {
  if(!$goog$events$listeners_$$[$key$$44$$]) {
    return $JSCompiler_alias_FALSE$$
  }
  var $listener$$33$$ = $goog$events$listeners_$$[$key$$44$$];
  if($listener$$33$$.$removed$) {
    return $JSCompiler_alias_FALSE$$
  }
  var $src$$11_srcUid$$1$$ = $listener$$33$$.src, $type$$58$$ = $listener$$33$$.type, $listenerArray$$2_proxy$$2$$ = $listener$$33$$.$proxy$, $capture$$3$$ = $listener$$33$$.capture;
  $src$$11_srcUid$$1$$.removeEventListener ? ($src$$11_srcUid$$1$$ == $goog$global$$ || !$src$$11_srcUid$$1$$.$customEvent_$) && $src$$11_srcUid$$1$$.removeEventListener($type$$58$$, $listenerArray$$2_proxy$$2$$, $capture$$3$$) : $src$$11_srcUid$$1$$.detachEvent && $src$$11_srcUid$$1$$.detachEvent($type$$58$$ in $goog$events$onStringMap_$$ ? $goog$events$onStringMap_$$[$type$$58$$] : $goog$events$onStringMap_$$[$type$$58$$] = "on" + $type$$58$$, $listenerArray$$2_proxy$$2$$);
  $src$$11_srcUid$$1$$ = $goog$getUid$$($src$$11_srcUid$$1$$);
  $listenerArray$$2_proxy$$2$$ = $goog$events$listenerTree_$$[$type$$58$$][$capture$$3$$][$src$$11_srcUid$$1$$];
  if($goog$events$sources_$$[$src$$11_srcUid$$1$$]) {
    var $sourcesArray$$ = $goog$events$sources_$$[$src$$11_srcUid$$1$$];
    $goog$array$remove$$($sourcesArray$$, $listener$$33$$);
    0 == $sourcesArray$$.length && delete $goog$events$sources_$$[$src$$11_srcUid$$1$$]
  }
  $listener$$33$$.$removed$ = $JSCompiler_alias_TRUE$$;
  $listenerArray$$2_proxy$$2$$.$needsCleanup_$ = $JSCompiler_alias_TRUE$$;
  $goog$events$cleanUp_$$($type$$58$$, $capture$$3$$, $src$$11_srcUid$$1$$, $listenerArray$$2_proxy$$2$$);
  delete $goog$events$listeners_$$[$key$$44$$];
  return $JSCompiler_alias_TRUE$$
}
function $goog$events$cleanUp_$$($type$$59$$, $capture$$4$$, $srcUid$$2$$, $listenerArray$$3$$) {
  if(!$listenerArray$$3$$.$locked_$ && $listenerArray$$3$$.$needsCleanup_$) {
    for(var $oldIndex$$ = 0, $newIndex$$ = 0;$oldIndex$$ < $listenerArray$$3$$.length;$oldIndex$$++) {
      $listenerArray$$3$$[$oldIndex$$].$removed$ ? $listenerArray$$3$$[$oldIndex$$].$proxy$.src = $JSCompiler_alias_NULL$$ : ($oldIndex$$ != $newIndex$$ && ($listenerArray$$3$$[$newIndex$$] = $listenerArray$$3$$[$oldIndex$$]), $newIndex$$++)
    }
    $listenerArray$$3$$.length = $newIndex$$;
    $listenerArray$$3$$.$needsCleanup_$ = $JSCompiler_alias_FALSE$$;
    0 == $newIndex$$ && (delete $goog$events$listenerTree_$$[$type$$59$$][$capture$$4$$][$srcUid$$2$$], $goog$events$listenerTree_$$[$type$$59$$][$capture$$4$$].$count_$--, 0 == $goog$events$listenerTree_$$[$type$$59$$][$capture$$4$$].$count_$ && (delete $goog$events$listenerTree_$$[$type$$59$$][$capture$$4$$], $goog$events$listenerTree_$$[$type$$59$$].$count_$--), 0 == $goog$events$listenerTree_$$[$type$$59$$].$count_$ && delete $goog$events$listenerTree_$$[$type$$59$$])
  }
}
function $goog$events$removeAll$$($opt_obj$$25_sourcesArray$$1_srcUid$$3$$) {
  var $opt_capt$$7$$, $count$$7$$ = 0, $noCapt$$ = $opt_capt$$7$$ == $JSCompiler_alias_NULL$$;
  $opt_capt$$7$$ = !!$opt_capt$$7$$;
  if($opt_obj$$25_sourcesArray$$1_srcUid$$3$$ == $JSCompiler_alias_NULL$$) {
    $goog$object$forEach$$($goog$events$sources_$$, function($listeners$$) {
      for(var $i$$55$$ = $listeners$$.length - 1;0 <= $i$$55$$;$i$$55$$--) {
        var $listener$$36$$ = $listeners$$[$i$$55$$];
        if($noCapt$$ || $opt_capt$$7$$ == $listener$$36$$.capture) {
          $goog$events$unlistenByKey$$($listener$$36$$.key), $count$$7$$++
        }
      }
    })
  }else {
    if($opt_obj$$25_sourcesArray$$1_srcUid$$3$$ = $goog$getUid$$($opt_obj$$25_sourcesArray$$1_srcUid$$3$$), $goog$events$sources_$$[$opt_obj$$25_sourcesArray$$1_srcUid$$3$$]) {
      for(var $opt_obj$$25_sourcesArray$$1_srcUid$$3$$ = $goog$events$sources_$$[$opt_obj$$25_sourcesArray$$1_srcUid$$3$$], $i$$54$$ = $opt_obj$$25_sourcesArray$$1_srcUid$$3$$.length - 1;0 <= $i$$54$$;$i$$54$$--) {
        var $listener$$35$$ = $opt_obj$$25_sourcesArray$$1_srcUid$$3$$[$i$$54$$];
        if($noCapt$$ || $opt_capt$$7$$ == $listener$$35$$.capture) {
          $goog$events$unlistenByKey$$($listener$$35$$.key), $count$$7$$++
        }
      }
    }
  }
}
function $goog$events$getListeners_$$($obj$$59_objUid$$, $type$$61$$, $capture$$6$$) {
  var $map$$1$$ = $goog$events$listenerTree_$$;
  return $type$$61$$ in $map$$1$$ && ($map$$1$$ = $map$$1$$[$type$$61$$], $capture$$6$$ in $map$$1$$ && ($map$$1$$ = $map$$1$$[$capture$$6$$], $obj$$59_objUid$$ = $goog$getUid$$($obj$$59_objUid$$), $map$$1$$[$obj$$59_objUid$$])) ? $map$$1$$[$obj$$59_objUid$$] : $JSCompiler_alias_NULL$$
}
function $goog$events$fireListeners_$$($listenerArray$$5_map$$4$$, $obj$$62_objUid$$2$$, $type$$65$$, $capture$$9$$, $eventObject$$4$$) {
  var $retval$$ = 1, $obj$$62_objUid$$2$$ = $goog$getUid$$($obj$$62_objUid$$2$$);
  if($listenerArray$$5_map$$4$$[$obj$$62_objUid$$2$$]) {
    $listenerArray$$5_map$$4$$.$remaining_$--;
    $listenerArray$$5_map$$4$$ = $listenerArray$$5_map$$4$$[$obj$$62_objUid$$2$$];
    $listenerArray$$5_map$$4$$.$locked_$ ? $listenerArray$$5_map$$4$$.$locked_$++ : $listenerArray$$5_map$$4$$.$locked_$ = 1;
    try {
      for(var $length$$15$$ = $listenerArray$$5_map$$4$$.length, $i$$57$$ = 0;$i$$57$$ < $length$$15$$;$i$$57$$++) {
        var $listener$$39$$ = $listenerArray$$5_map$$4$$[$i$$57$$];
        $listener$$39$$ && !$listener$$39$$.$removed$ && ($retval$$ &= $goog$events$fireListener$$($listener$$39$$, $eventObject$$4$$) !== $JSCompiler_alias_FALSE$$)
      }
    }finally {
      $listenerArray$$5_map$$4$$.$locked_$--, $goog$events$cleanUp_$$($type$$65$$, $capture$$9$$, $obj$$62_objUid$$2$$, $listenerArray$$5_map$$4$$)
    }
  }
  return Boolean($retval$$)
}
function $goog$events$fireListener$$($listener$$40$$, $eventObject$$5$$) {
  var $rv$$8$$ = $listener$$40$$.handleEvent($eventObject$$5$$);
  $listener$$40$$.$callOnce$ && $goog$events$unlistenByKey$$($listener$$40$$.key);
  return $rv$$8$$
}
function $goog$events$dispatchEvent$$($src$$14$$, $e$$13$$) {
  var $hasCapture$$1_type$$66$$ = $e$$13$$.type || $e$$13$$, $current$$1_map$$5$$ = $goog$events$listenerTree_$$;
  if(!($hasCapture$$1_type$$66$$ in $current$$1_map$$5$$)) {
    return $JSCompiler_alias_TRUE$$
  }
  if($goog$isString$$($e$$13$$)) {
    $e$$13$$ = new $goog$events$Event$$($e$$13$$, $src$$14$$)
  }else {
    if($e$$13$$ instanceof $goog$events$Event$$) {
      $e$$13$$.target = $e$$13$$.target || $src$$14$$
    }else {
      var $oldEvent_rv$$9$$ = $e$$13$$, $e$$13$$ = new $goog$events$Event$$($hasCapture$$1_type$$66$$, $src$$14$$);
      $goog$object$extend$$($e$$13$$, $oldEvent_rv$$9$$)
    }
  }
  var $oldEvent_rv$$9$$ = 1, $ancestors$$, $current$$1_map$$5$$ = $current$$1_map$$5$$[$hasCapture$$1_type$$66$$], $hasCapture$$1_type$$66$$ = $JSCompiler_alias_TRUE$$ in $current$$1_map$$5$$, $parent$$2_targetsMap$$;
  if($hasCapture$$1_type$$66$$) {
    $ancestors$$ = [];
    for($parent$$2_targetsMap$$ = $src$$14$$;$parent$$2_targetsMap$$;$parent$$2_targetsMap$$ = $parent$$2_targetsMap$$.$parentEventTarget_$) {
      $ancestors$$.push($parent$$2_targetsMap$$)
    }
    $parent$$2_targetsMap$$ = $current$$1_map$$5$$[$JSCompiler_alias_TRUE$$];
    $parent$$2_targetsMap$$.$remaining_$ = $parent$$2_targetsMap$$.$count_$;
    for(var $i$$58$$ = $ancestors$$.length - 1;!$e$$13$$.$propagationStopped_$ && 0 <= $i$$58$$ && $parent$$2_targetsMap$$.$remaining_$;$i$$58$$--) {
      $e$$13$$.currentTarget = $ancestors$$[$i$$58$$], $oldEvent_rv$$9$$ &= $goog$events$fireListeners_$$($parent$$2_targetsMap$$, $ancestors$$[$i$$58$$], $e$$13$$.type, $JSCompiler_alias_TRUE$$, $e$$13$$) && $e$$13$$.$returnValue_$ != $JSCompiler_alias_FALSE$$
    }
  }
  if($JSCompiler_alias_FALSE$$ in $current$$1_map$$5$$) {
    if($parent$$2_targetsMap$$ = $current$$1_map$$5$$[$JSCompiler_alias_FALSE$$], $parent$$2_targetsMap$$.$remaining_$ = $parent$$2_targetsMap$$.$count_$, $hasCapture$$1_type$$66$$) {
      for($i$$58$$ = 0;!$e$$13$$.$propagationStopped_$ && $i$$58$$ < $ancestors$$.length && $parent$$2_targetsMap$$.$remaining_$;$i$$58$$++) {
        $e$$13$$.currentTarget = $ancestors$$[$i$$58$$], $oldEvent_rv$$9$$ &= $goog$events$fireListeners_$$($parent$$2_targetsMap$$, $ancestors$$[$i$$58$$], $e$$13$$.type, $JSCompiler_alias_FALSE$$, $e$$13$$) && $e$$13$$.$returnValue_$ != $JSCompiler_alias_FALSE$$
      }
    }else {
      for($current$$1_map$$5$$ = $src$$14$$;!$e$$13$$.$propagationStopped_$ && $current$$1_map$$5$$ && $parent$$2_targetsMap$$.$remaining_$;$current$$1_map$$5$$ = $current$$1_map$$5$$.$parentEventTarget_$) {
        $e$$13$$.currentTarget = $current$$1_map$$5$$, $oldEvent_rv$$9$$ &= $goog$events$fireListeners_$$($parent$$2_targetsMap$$, $current$$1_map$$5$$, $e$$13$$.type, $JSCompiler_alias_FALSE$$, $e$$13$$) && $e$$13$$.$returnValue_$ != $JSCompiler_alias_FALSE$$
      }
    }
  }
  return Boolean($oldEvent_rv$$9$$)
}
function $goog$events$handleBrowserEvent_$$($key$$46$$, $opt_evt$$) {
  if(!$goog$events$listeners_$$[$key$$46$$]) {
    return $JSCompiler_alias_TRUE$$
  }
  var $listener$$41$$ = $goog$events$listeners_$$[$key$$46$$], $be$$1_type$$67$$ = $listener$$41$$.type, $map$$6$$ = $goog$events$listenerTree_$$;
  if(!($be$$1_type$$67$$ in $map$$6$$)) {
    return $JSCompiler_alias_TRUE$$
  }
  var $map$$6$$ = $map$$6$$[$be$$1_type$$67$$], $ieEvent_retval$$1$$, $targetsMap$$1$$;
  if(!$goog$events$BrowserFeature$HAS_W3C_EVENT_SUPPORT$$) {
    $ieEvent_retval$$1$$ = $opt_evt$$ || $goog$getObjectByName$$("window.event");
    var $hasCapture$$2$$ = $JSCompiler_alias_TRUE$$ in $map$$6$$, $hasBubble$$1$$ = $JSCompiler_alias_FALSE$$ in $map$$6$$;
    if($hasCapture$$2$$) {
      if(0 > $ieEvent_retval$$1$$.keyCode || $ieEvent_retval$$1$$.returnValue != $JSCompiler_alias_VOID$$) {
        return $JSCompiler_alias_TRUE$$
      }
      a: {
        var $evt$$14_useReturnValue$$inline_100$$ = $JSCompiler_alias_FALSE$$;
        if(0 == $ieEvent_retval$$1$$.keyCode) {
          try {
            $ieEvent_retval$$1$$.keyCode = -1;
            break a
          }catch($ex$$inline_101$$) {
            $evt$$14_useReturnValue$$inline_100$$ = $JSCompiler_alias_TRUE$$
          }
        }
        if($evt$$14_useReturnValue$$inline_100$$ || $ieEvent_retval$$1$$.returnValue == $JSCompiler_alias_VOID$$) {
          $ieEvent_retval$$1$$.returnValue = $JSCompiler_alias_TRUE$$
        }
      }
    }
    $evt$$14_useReturnValue$$inline_100$$ = new $goog$events$BrowserEvent$$;
    $evt$$14_useReturnValue$$inline_100$$.$init$($ieEvent_retval$$1$$, this);
    $ieEvent_retval$$1$$ = $JSCompiler_alias_TRUE$$;
    try {
      if($hasCapture$$2$$) {
        for(var $ancestors$$1$$ = [], $parent$$3$$ = $evt$$14_useReturnValue$$inline_100$$.currentTarget;$parent$$3$$;$parent$$3$$ = $parent$$3$$.parentNode) {
          $ancestors$$1$$.push($parent$$3$$)
        }
        $targetsMap$$1$$ = $map$$6$$[$JSCompiler_alias_TRUE$$];
        $targetsMap$$1$$.$remaining_$ = $targetsMap$$1$$.$count_$;
        for(var $i$$59$$ = $ancestors$$1$$.length - 1;!$evt$$14_useReturnValue$$inline_100$$.$propagationStopped_$ && 0 <= $i$$59$$ && $targetsMap$$1$$.$remaining_$;$i$$59$$--) {
          $evt$$14_useReturnValue$$inline_100$$.currentTarget = $ancestors$$1$$[$i$$59$$], $ieEvent_retval$$1$$ &= $goog$events$fireListeners_$$($targetsMap$$1$$, $ancestors$$1$$[$i$$59$$], $be$$1_type$$67$$, $JSCompiler_alias_TRUE$$, $evt$$14_useReturnValue$$inline_100$$)
        }
        if($hasBubble$$1$$) {
          $targetsMap$$1$$ = $map$$6$$[$JSCompiler_alias_FALSE$$];
          $targetsMap$$1$$.$remaining_$ = $targetsMap$$1$$.$count_$;
          for($i$$59$$ = 0;!$evt$$14_useReturnValue$$inline_100$$.$propagationStopped_$ && $i$$59$$ < $ancestors$$1$$.length && $targetsMap$$1$$.$remaining_$;$i$$59$$++) {
            $evt$$14_useReturnValue$$inline_100$$.currentTarget = $ancestors$$1$$[$i$$59$$], $ieEvent_retval$$1$$ &= $goog$events$fireListeners_$$($targetsMap$$1$$, $ancestors$$1$$[$i$$59$$], $be$$1_type$$67$$, $JSCompiler_alias_FALSE$$, $evt$$14_useReturnValue$$inline_100$$)
          }
        }
      }else {
        $ieEvent_retval$$1$$ = $goog$events$fireListener$$($listener$$41$$, $evt$$14_useReturnValue$$inline_100$$)
      }
    }finally {
      $ancestors$$1$$ && ($ancestors$$1$$.length = 0), $evt$$14_useReturnValue$$inline_100$$.$dispose$()
    }
    return $ieEvent_retval$$1$$
  }
  $be$$1_type$$67$$ = new $goog$events$BrowserEvent$$($opt_evt$$, this);
  try {
    $ieEvent_retval$$1$$ = $goog$events$fireListener$$($listener$$41$$, $be$$1_type$$67$$)
  }finally {
    $be$$1_type$$67$$.$dispose$()
  }
  return $ieEvent_retval$$1$$
}
;var $goog$i18n$DateTimeSymbols_en$$ = {$ERAS$:["BC", "AD"], $ERANAMES$:["Before Christ", "Anno Domini"], $NARROWMONTHS$:"JFMAMJJASOND".split(""), $STANDALONENARROWMONTHS$:"JFMAMJJASOND".split(""), $MONTHS$:"January February March April May June July August September October November December".split(" "), $STANDALONEMONTHS$:"January February March April May June July August September October November December".split(" "), $SHORTMONTHS$:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), 
$STANDALONESHORTMONTHS$:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), $WEEKDAYS$:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), $STANDALONEWEEKDAYS$:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), $SHORTWEEKDAYS$:"Sun Mon Tue Wed Thu Fri Sat".split(" "), $STANDALONESHORTWEEKDAYS$:"Sun Mon Tue Wed Thu Fri Sat".split(" "), $NARROWWEEKDAYS$:"SMTWTFS".split(""), $STANDALONENARROWWEEKDAYS$:"SMTWTFS".split(""), $SHORTQUARTERS$:["Q1", "Q2", 
"Q3", "Q4"], $QUARTERS$:["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"], $AMPMS$:["AM", "PM"], $DATEFORMATS$:["EEEE, MMMM d, y", "MMMM d, y", "MMM d, y", "M/d/yy"], $TIMEFORMATS$:["h:mm:ss a zzzz", "h:mm:ss a z", "h:mm:ss a", "h:mm a"], $FIRSTDAYOFWEEK$:6, $WEEKENDRANGE$:[5, 6], $FIRSTWEEKCUTOFFDAY$:5};
function $goog$date$getNumberOfDaysInMonth$$($year$$3$$, $month$$1$$) {
  switch($month$$1$$) {
    case 1:
      return 0 == $year$$3$$ % 4 && (0 != $year$$3$$ % 100 || 0 == $year$$3$$ % 400) ? 29 : 28;
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
  $goog$isNumber$$($opt_year$$) ? (this.$date_$ = new Date($opt_year$$, $opt_month$$ || 0, $opt_date$$1$$ || 1), $JSCompiler_StaticMethods_maybeFixDst_$$(this, $opt_date$$1$$ || 1)) : $goog$isObject$$($opt_year$$) ? (this.$date_$ = new Date($opt_year$$.getFullYear(), $opt_year$$.getMonth(), $opt_year$$.getDate()), $JSCompiler_StaticMethods_maybeFixDst_$$(this, $opt_year$$.getDate())) : (this.$date_$ = new Date, this.$date_$.setHours(0), this.$date_$.setMinutes(0), this.$date_$.setSeconds(0), this.$date_$.setMilliseconds(0))
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
  var $cutoffSameWeek$$inline_112_d$$inline_110$$ = new Date(this.getFullYear(), this.getMonth(), this.getDate()), $firstday$$inline_111$$ = this.$firstDayOfWeek_$ || 0, $cutoffSameWeek$$inline_112_d$$inline_110$$ = $cutoffSameWeek$$inline_112_d$$inline_110$$.valueOf() + 864E5 * (((this.$firstWeekCutOffDay_$ || 3) - $firstday$$inline_111$$ + 7) % 7 - (($cutoffSameWeek$$inline_112_d$$inline_110$$.getDay() + 6) % 7 - $firstday$$inline_111$$ + 7) % 7);
  return Math.floor(Math.round(($cutoffSameWeek$$inline_112_d$$inline_110$$ - (new Date((new Date($cutoffSameWeek$$inline_112_d$$inline_110$$)).getFullYear(), 0, 1)).valueOf()) / 864E5) / 7) + 1
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
    var $m$$1_n$$7$$ = Math.abs($JSCompiler_StaticMethods_getTimezoneOffsetString$self_offset$$16_tz$$) / 60, $h$$4$$ = Math.floor($m$$1_n$$7$$), $m$$1_n$$7$$ = 60 * ($m$$1_n$$7$$ - $h$$4$$), $JSCompiler_StaticMethods_getTimezoneOffsetString$self_offset$$16_tz$$ = (0 < $JSCompiler_StaticMethods_getTimezoneOffsetString$self_offset$$16_tz$$ ? "-" : "+") + $goog$string$padNumber$$($h$$4$$, 2) + ":" + $goog$string$padNumber$$($m$$1_n$$7$$, 2)
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
$JSCompiler_prototypeAlias$$.add = function $$JSCompiler_prototypeAlias$$$add$($interval$$3_result$$4$$) {
  if($interval$$3_result$$4$$.$years$ || $interval$$3_result$$4$$.$months$) {
    var $month$$6$$ = this.getMonth() + $interval$$3_result$$4$$.$months$ + 12 * $interval$$3_result$$4$$.$years$, $year$$10$$ = this.getYear() + Math.floor($month$$6$$ / 12), $month$$6$$ = $month$$6$$ % 12;
    0 > $month$$6$$ && ($month$$6$$ += 12);
    var $date$$10$$ = Math.min($goog$date$getNumberOfDaysInMonth$$($year$$10$$, $month$$6$$), this.getDate());
    this.setDate(1);
    this.setFullYear($year$$10$$);
    this.setMonth($month$$6$$);
    this.setDate($date$$10$$)
  }
  $interval$$3_result$$4$$.$days$ && ($interval$$3_result$$4$$ = new Date((new Date(this.getYear(), this.getMonth(), this.getDate(), 12)).getTime() + 864E5 * $interval$$3_result$$4$$.$days$), this.setDate(1), this.setFullYear($interval$$3_result$$4$$.getFullYear()), this.setMonth($interval$$3_result$$4$$.getMonth()), this.setDate($interval$$3_result$$4$$.getDate()), $JSCompiler_StaticMethods_maybeFixDst_$$(this, $interval$$3_result$$4$$.getDate()))
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
function $rflect$date$Interval$$($opt_start$$, $opt_end$$14$$) {
  if($goog$isNumber$$($opt_start$$) && $goog$isNumber$$($opt_end$$14$$)) {
    this.start = $opt_start$$, this.end = $opt_end$$14$$
  }else {
    if($goog$isObject$$($opt_start$$) && $goog$isObject$$($opt_end$$14$$)) {
      this.start = $opt_start$$.getTime(), this.end = $opt_end$$14$$.getTime()
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
  var $end$$2_interval$$5$$ = $rflect$date$Interval$getNonNullInterval$$($aInterval$$2$$);
  if(!$JSCompiler_StaticMethods_overlaps$$($JSCompiler_StaticMethods_overlap$self$$, $end$$2_interval$$5$$)) {
    return $JSCompiler_alias_NULL$$
  }
  var $start$$6$$ = Math.max($JSCompiler_StaticMethods_overlap$self$$.start, $end$$2_interval$$5$$.start), $end$$2_interval$$5$$ = Math.min($JSCompiler_StaticMethods_overlap$self$$.end, $end$$2_interval$$5$$.end);
  return new $rflect$date$Interval$$($start$$6$$, $end$$2_interval$$5$$)
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
function $rflect$cal$events$EventManager$$($aViewManager$$, $aTimeManager$$) {
  this.$viewManager_$ = $aViewManager$$;
  this.$timeManager_$ = $aTimeManager$$;
  this.$events_$ = {};
  this.$chipsByDay_$ = {};
  this.$allDayChipsByDay_$ = {};
  this.$chipsByWeek_$ = {};
  this.$dayChips$ = [];
  this.$allDayChips$ = [];
  this.$weekChips$ = []
}
function $rflect$cal$events$EventManager$getNestedChips_$$($aDataStructure$$, $aIndex1$$, $aIndex2$$) {
  return $aDataStructure$$[$aIndex1$$] && $aDataStructure$$[$aIndex1$$][$aIndex2$$] ? $aDataStructure$$[$aIndex1$$][$aIndex2$$] : $JSCompiler_alias_NULL$$
}
$rflect$cal$events$EventManager$$.prototype.$run$ = function $$rflect$cal$events$EventManager$$$$$run$$() {
  var $daySeries$$ = this.$timeManager_$.$daySeries$, $knownChipsIds$$ = {};
  this.$dayChips$.length = 0;
  this.$allDayChips$.length = 0;
  this.$allDayChips$[0] = [];
  for(var $allDayChipsCounter$$inline_129_allDayChipsLength$$ = this.$weekChips$.length = 0, $counter$$9$$ = 0, $length$$26$$ = $daySeries$$.length;$counter$$9$$ < $length$$26$$;$counter$$9$$++) {
    var $counter$$inline_131_yearKey$$ = $daySeries$$[$counter$$9$$].getFullYear();
    if($JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$)) {
      var $dayOfYearKey_length$$inline_132$$ = $daySeries$$[$counter$$9$$].$getDayOfYear$();
      this.$dayChips$.push($rflect$cal$events$EventManager$getNestedChips_$$(this.$chipsByDay_$, $counter$$inline_131_yearKey$$, $dayOfYearKey_length$$inline_132$$) || []);
      var $aKnownChipIds$$inline_122_weekKey$$ = $knownChipsIds$$, $aDayNumber$$inline_125$$ = $counter$$9$$, $aTotalDays$$inline_126$$ = $length$$26$$, $allDayChips$$inline_128$$ = this.$allDayChips$[0], $chips$$inline_130$$ = $JSCompiler_alias_VOID$$;
      if($chips$$inline_130$$ = $rflect$cal$events$EventManager$getNestedChips_$$(this.$allDayChipsByDay_$, $counter$$inline_131_yearKey$$, $dayOfYearKey_length$$inline_132$$)) {
        $counter$$inline_131_yearKey$$ = 0;
        for($dayOfYearKey_length$$inline_132$$ = $chips$$inline_130$$.length;$counter$$inline_131_yearKey$$ < $dayOfYearKey_length$$inline_132$$;$counter$$inline_131_yearKey$$++) {
          var $id$$inline_133_newChip$$inline_134$$ = $chips$$inline_130$$[$counter$$inline_131_yearKey$$].$eventId$;
          $aKnownChipIds$$inline_122_weekKey$$[$id$$inline_133_newChip$$inline_134$$] || ($aKnownChipIds$$inline_122_weekKey$$[$id$$inline_133_newChip$$inline_134$$] = 1, $id$$inline_133_newChip$$inline_134$$ = $chips$$inline_130$$[$counter$$inline_131_yearKey$$].$clone$(), $id$$inline_133_newChip$$inline_134$$.start = $aDayNumber$$inline_125$$, $id$$inline_133_newChip$$inline_134$$.$endIsCut$ = $aTotalDays$$inline_126$$ - $aDayNumber$$inline_125$$ < $id$$inline_133_newChip$$inline_134$$.end, $id$$inline_133_newChip$$inline_134$$.end = 
          $id$$inline_133_newChip$$inline_134$$.$endIsCut$ ? $aTotalDays$$inline_126$$ : $aDayNumber$$inline_125$$ + $id$$inline_133_newChip$$inline_134$$.end, $allDayChips$$inline_128$$[$allDayChipsCounter$$inline_129_allDayChipsLength$$++] = $id$$inline_133_newChip$$inline_134$$)
        }
      }
    }else {
      $JSCompiler_StaticMethods_isInMonthMode$$(this.$viewManager_$) && 0 == $counter$$9$$ % 7 && ($aKnownChipIds$$inline_122_weekKey$$ = $daySeries$$[$counter$$9$$].$getWeekNumber$(), this.$weekChips$.push($rflect$cal$events$EventManager$getNestedChips_$$(this.$chipsByWeek_$, $counter$$inline_131_yearKey$$, $aKnownChipIds$$inline_122_weekKey$$) || []))
    }
  }
};
function $goog$events$EventHandler$$($opt_handler$$7$$) {
  this.$handler_$ = $opt_handler$$7$$;
  this.$keys_$ = []
}
$goog$inherits$$($goog$events$EventHandler$$, $goog$Disposable$$);
var $goog$events$EventHandler$typeArray_$$ = [];
function $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$self$$, $src$$15$$, $type$$69$$, $opt_fn$$, $opt_capture$$1$$, $opt_handler$$8$$) {
  $goog$isArray$$($type$$69$$) || ($goog$events$EventHandler$typeArray_$$[0] = $type$$69$$, $type$$69$$ = $goog$events$EventHandler$typeArray_$$);
  for(var $i$$60$$ = 0;$i$$60$$ < $type$$69$$.length;$i$$60$$++) {
    $JSCompiler_StaticMethods_listen$self$$.$keys_$.push($goog$events$listen$$($src$$15$$, $type$$69$$[$i$$60$$], $opt_fn$$ || $JSCompiler_StaticMethods_listen$self$$, $opt_capture$$1$$ || $JSCompiler_alias_FALSE$$, $opt_handler$$8$$ || $JSCompiler_StaticMethods_listen$self$$.$handler_$ || $JSCompiler_StaticMethods_listen$self$$))
  }
  return $JSCompiler_StaticMethods_listen$self$$
}
function $JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$self$$, $key$$49_listener$$43_listenerArray$$inline_142_src$$18$$, $i$$inline_143_type$$71$$, $listener$$inline_138_opt_fn$$2$$, $capture$$inline_141_opt_capture$$3$$, $opt_handler$$11_opt_handler$$inline_140$$) {
  if($goog$isArray$$($i$$inline_143_type$$71$$)) {
    for(var $i$$62$$ = 0;$i$$62$$ < $i$$inline_143_type$$71$$.length;$i$$62$$++) {
      $JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$self$$, $key$$49_listener$$43_listenerArray$$inline_142_src$$18$$, $i$$inline_143_type$$71$$[$i$$62$$], $listener$$inline_138_opt_fn$$2$$, $capture$$inline_141_opt_capture$$3$$, $opt_handler$$11_opt_handler$$inline_140$$)
    }
  }else {
    a: {
      $listener$$inline_138_opt_fn$$2$$ = $listener$$inline_138_opt_fn$$2$$ || $JSCompiler_StaticMethods_unlisten$self$$;
      $opt_handler$$11_opt_handler$$inline_140$$ = $opt_handler$$11_opt_handler$$inline_140$$ || $JSCompiler_StaticMethods_unlisten$self$$.$handler_$ || $JSCompiler_StaticMethods_unlisten$self$$;
      $capture$$inline_141_opt_capture$$3$$ = !!$capture$$inline_141_opt_capture$$3$$;
      if($key$$49_listener$$43_listenerArray$$inline_142_src$$18$$ = $goog$events$getListeners_$$($key$$49_listener$$43_listenerArray$$inline_142_src$$18$$, $i$$inline_143_type$$71$$, $capture$$inline_141_opt_capture$$3$$)) {
        for($i$$inline_143_type$$71$$ = 0;$i$$inline_143_type$$71$$ < $key$$49_listener$$43_listenerArray$$inline_142_src$$18$$.length;$i$$inline_143_type$$71$$++) {
          if(!$key$$49_listener$$43_listenerArray$$inline_142_src$$18$$[$i$$inline_143_type$$71$$].$removed$ && $key$$49_listener$$43_listenerArray$$inline_142_src$$18$$[$i$$inline_143_type$$71$$].$listener$ == $listener$$inline_138_opt_fn$$2$$ && $key$$49_listener$$43_listenerArray$$inline_142_src$$18$$[$i$$inline_143_type$$71$$].capture == $capture$$inline_141_opt_capture$$3$$ && $key$$49_listener$$43_listenerArray$$inline_142_src$$18$$[$i$$inline_143_type$$71$$].$handler$ == $opt_handler$$11_opt_handler$$inline_140$$) {
            $key$$49_listener$$43_listenerArray$$inline_142_src$$18$$ = $key$$49_listener$$43_listenerArray$$inline_142_src$$18$$[$i$$inline_143_type$$71$$];
            break a
          }
        }
      }
      $key$$49_listener$$43_listenerArray$$inline_142_src$$18$$ = $JSCompiler_alias_NULL$$
    }
    $key$$49_listener$$43_listenerArray$$inline_142_src$$18$$ && ($key$$49_listener$$43_listenerArray$$inline_142_src$$18$$ = $key$$49_listener$$43_listenerArray$$inline_142_src$$18$$.key, $goog$events$unlistenByKey$$($key$$49_listener$$43_listenerArray$$inline_142_src$$18$$), $goog$array$remove$$($JSCompiler_StaticMethods_unlisten$self$$.$keys_$, $key$$49_listener$$43_listenerArray$$inline_142_src$$18$$))
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
var $goog$i18n$DateTimePatterns_en$$ = {$YEAR_FULL$:"yyyy", $YEAR_MONTH_ABBR$:"MMM y", $YEAR_MONTH_FULL$:"MMMM yyyy", $MONTH_DAY_ABBR$:"MMM d", $MONTH_DAY_FULL$:"MMMM dd", $MONTH_DAY_SHORT$:"M/d", $MONTH_DAY_MEDIUM$:"MMMM d", $DAY_ABBR$:"d"}, $goog$i18n$DateTimePatterns$$ = $goog$i18n$DateTimePatterns_en$$, $goog$i18n$DateTimePatterns$$ = $goog$i18n$DateTimePatterns_en$$;
var $goog$dom$defaultDomHelper_$$;
function $goog$dom$classes$get$$($className$$4_element$$6$$) {
  $className$$4_element$$6$$ = $className$$4_element$$6$$.className;
  return $goog$isString$$($className$$4_element$$6$$) && $className$$4_element$$6$$.match(/\S+/g) || []
}
function $goog$dom$classes$add$$($element$$7$$, $var_args$$50$$) {
  for(var $classes$$ = $goog$dom$classes$get$$($element$$7$$), $args$$3_args$$inline_146$$ = $goog$array$slice$$(arguments, 1), $expectedCount$$ = $classes$$.length + $args$$3_args$$inline_146$$.length, $classes$$inline_145$$ = $classes$$, $i$$inline_147$$ = 0;$i$$inline_147$$ < $args$$3_args$$inline_146$$.length;$i$$inline_147$$++) {
    $goog$array$contains$$($classes$$inline_145$$, $args$$3_args$$inline_146$$[$i$$inline_147$$]) || $classes$$inline_145$$.push($args$$3_args$$inline_146$$[$i$$inline_147$$])
  }
  $element$$7$$.className = $classes$$.join(" ");
  return $classes$$.length == $expectedCount$$
}
function $goog$dom$classes$remove$$($element$$8$$, $var_args$$51$$) {
  var $classes$$1$$ = $goog$dom$classes$get$$($element$$8$$), $args$$4$$ = $goog$array$slice$$(arguments, 1), $newClasses$$ = $goog$dom$classes$getDifference_$$($classes$$1$$, $args$$4$$);
  $element$$8$$.className = $newClasses$$.join(" ");
  return $newClasses$$.length == $classes$$1$$.length - $args$$4$$.length
}
function $goog$dom$classes$getDifference_$$($arr1$$4$$, $arr2$$12$$) {
  return $goog$array$filter$$($arr1$$4$$, function($item$$) {
    return!$goog$array$contains$$($arr2$$12$$, $item$$)
  })
}
;function $goog$math$Coordinate$$($opt_x$$, $opt_y$$) {
  this.x = $goog$isDef$$($opt_x$$) ? $opt_x$$ : 0;
  this.y = $goog$isDef$$($opt_y$$) ? $opt_y$$ : 0
}
$goog$math$Coordinate$$.prototype.$clone$ = function $$goog$math$Coordinate$$$$$clone$$() {
  return new $goog$math$Coordinate$$(this.x, this.y)
};
$goog$math$Coordinate$$.prototype.toString = function $$goog$math$Coordinate$$$$toString$() {
  return"(" + this.x + ", " + this.y + ")"
};
function $goog$math$Coordinate$equals$$($a$$5$$, $b$$4$$) {
  return $a$$5$$ == $b$$4$$ ? $JSCompiler_alias_TRUE$$ : !$a$$5$$ || !$b$$4$$ ? $JSCompiler_alias_FALSE$$ : $a$$5$$.x == $b$$4$$.x && $a$$5$$.y == $b$$4$$.y
}
function $goog$math$Coordinate$difference$$($a$$8$$, $b$$7$$) {
  return new $goog$math$Coordinate$$($a$$8$$.x - $b$$7$$.x, $a$$8$$.y - $b$$7$$.y)
}
;function $goog$math$Box$$($top$$2$$, $right$$5$$, $bottom$$1$$, $left$$5$$) {
  this.top = $top$$2$$;
  this.right = $right$$5$$;
  this.bottom = $bottom$$1$$;
  this.left = $left$$5$$
}
$goog$math$Box$$.prototype.$clone$ = function $$goog$math$Box$$$$$clone$$() {
  return new $goog$math$Box$$(this.top, this.right, this.bottom, this.left)
};
$goog$math$Box$$.prototype.toString = function $$goog$math$Box$$$$toString$() {
  return"(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
};
$goog$math$Box$$.prototype.contains = function $$goog$math$Box$$$$contains$($other$$7$$) {
  return!this || !$other$$7$$ ? $JSCompiler_alias_FALSE$$ : $other$$7$$ instanceof $goog$math$Box$$ ? $other$$7$$.left >= this.left && $other$$7$$.right <= this.right && $other$$7$$.top >= this.top && $other$$7$$.bottom <= this.bottom : $other$$7$$.x >= this.left && $other$$7$$.x <= this.right && $other$$7$$.y >= this.top && $other$$7$$.y <= this.bottom
};
function $goog$math$Size$$($width$$12$$, $height$$11$$) {
  this.width = $width$$12$$;
  this.height = $height$$11$$
}
function $goog$math$Size$equals$$($a$$13$$, $b$$12$$) {
  return $a$$13$$ == $b$$12$$ ? $JSCompiler_alias_TRUE$$ : !$a$$13$$ || !$b$$12$$ ? $JSCompiler_alias_FALSE$$ : $a$$13$$.width == $b$$12$$.width && $a$$13$$.height == $b$$12$$.height
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
function $goog$math$Rect$$($x$$56$$, $y$$35$$, $w$$5$$, $h$$5$$) {
  this.left = $x$$56$$;
  this.top = $y$$35$$;
  this.width = $w$$5$$;
  this.height = $h$$5$$
}
$goog$math$Rect$$.prototype.$clone$ = function $$goog$math$Rect$$$$$clone$$() {
  return new $goog$math$Rect$$(this.left, this.top, this.width, this.height)
};
$goog$math$Rect$$.prototype.toString = function $$goog$math$Rect$$$$toString$() {
  return"(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
};
$goog$math$Rect$$.prototype.contains = function $$goog$math$Rect$$$$contains$($another$$) {
  return $another$$ instanceof $goog$math$Rect$$ ? this.left <= $another$$.left && this.left + this.width >= $another$$.left + $another$$.width && this.top <= $another$$.top && this.top + this.height >= $another$$.top + $another$$.height : $another$$.x >= this.left && $another$$.x <= this.left + this.width && $another$$.y >= this.top && $another$$.y <= this.top + this.height
};
$goog$math$Rect$$.prototype.$getSize$ = function $$goog$math$Rect$$$$$getSize$$() {
  return new $goog$math$Size$$(this.width, this.height)
};
var $goog$dom$BrowserFeature$CAN_ADD_NAME_OR_TYPE_ATTRIBUTES$$ = !$goog$userAgent$IE$$ || $goog$userAgent$isDocumentMode$$(9), $goog$dom$BrowserFeature$CAN_USE_CHILDREN_ATTRIBUTE$$ = !$goog$userAgent$GECKO$$ && !$goog$userAgent$IE$$ || $goog$userAgent$IE$$ && $goog$userAgent$isDocumentMode$$(9) || $goog$userAgent$GECKO$$ && $goog$userAgent$isVersion$$("1.9.1"), $goog$dom$BrowserFeature$CAN_USE_INNER_TEXT$$ = $goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("9");
function $goog$dom$getDomHelper$$($opt_element$$10$$) {
  return $opt_element$$10$$ ? new $goog$dom$DomHelper$$($goog$dom$getOwnerDocument$$($opt_element$$10$$)) : $goog$dom$defaultDomHelper_$$ || ($goog$dom$defaultDomHelper_$$ = new $goog$dom$DomHelper$$)
}
function $goog$dom$getElement$$($element$$14$$) {
  return $goog$isString$$($element$$14$$) ? document.getElementById($element$$14$$) : $element$$14$$
}
function $goog$dom$getElementsByTagNameAndClass_$$($opt_class$$1$$, $opt_el$$3$$) {
  var $doc$$5_el$$1_parent$$7$$, $i$$66$$, $len$$2$$, $arrayLike$$;
  $doc$$5_el$$1_parent$$7$$ = document;
  $doc$$5_el$$1_parent$$7$$ = $opt_el$$3$$ || $doc$$5_el$$1_parent$$7$$;
  if($doc$$5_el$$1_parent$$7$$.querySelectorAll && ($doc$$5_el$$1_parent$$7$$.querySelector && (!$goog$userAgent$WEBKIT$$ || $goog$dom$isCss1CompatMode_$$(document) || $goog$userAgent$isVersion$$("528"))) && $opt_class$$1$$) {
    return $doc$$5_el$$1_parent$$7$$.querySelectorAll("" + ($opt_class$$1$$ ? "." + $opt_class$$1$$ : ""))
  }
  if($opt_class$$1$$ && $doc$$5_el$$1_parent$$7$$.getElementsByClassName) {
    var $els$$ = $doc$$5_el$$1_parent$$7$$.getElementsByClassName($opt_class$$1$$);
    return $els$$
  }
  $els$$ = $doc$$5_el$$1_parent$$7$$.getElementsByTagName("*");
  if($opt_class$$1$$) {
    $arrayLike$$ = {};
    for($i$$66$$ = $len$$2$$ = 0;$doc$$5_el$$1_parent$$7$$ = $els$$[$i$$66$$];$i$$66$$++) {
      var $className$$10$$ = $doc$$5_el$$1_parent$$7$$.className;
      "function" == typeof $className$$10$$.split && $goog$array$contains$$($className$$10$$.split(/\s+/), $opt_class$$1$$) && ($arrayLike$$[$len$$2$$++] = $doc$$5_el$$1_parent$$7$$)
    }
    $arrayLike$$.length = $len$$2$$;
    return $arrayLike$$
  }
  return $els$$
}
function $goog$dom$setProperties$$($element$$15$$, $properties$$) {
  $goog$object$forEach$$($properties$$, function($val$$19$$, $key$$50$$) {
    "style" == $key$$50$$ ? $element$$15$$.style.cssText = $val$$19$$ : "class" == $key$$50$$ ? $element$$15$$.className = $val$$19$$ : "for" == $key$$50$$ ? $element$$15$$.htmlFor = $val$$19$$ : $key$$50$$ in $goog$dom$DIRECT_ATTRIBUTE_MAP_$$ ? $element$$15$$.setAttribute($goog$dom$DIRECT_ATTRIBUTE_MAP_$$[$key$$50$$], $val$$19$$) : 0 == $key$$50$$.lastIndexOf("aria-", 0) ? $element$$15$$.setAttribute($key$$50$$, $val$$19$$) : $element$$15$$[$key$$50$$] = $val$$19$$
  })
}
var $goog$dom$DIRECT_ATTRIBUTE_MAP_$$ = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", rowspan:"rowSpan", valign:"vAlign", height:"height", width:"width", usemap:"useMap", frameborder:"frameBorder", maxlength:"maxLength", type:"type"};
function $goog$dom$getViewportSize_$$($el$$2_win$$) {
  var $doc$$6_innerHeight$$ = $el$$2_win$$.document;
  if($goog$userAgent$WEBKIT$$ && !$goog$userAgent$isVersion$$("500") && !$goog$userAgent$MOBILE$$) {
    "undefined" == typeof $el$$2_win$$.innerHeight && ($el$$2_win$$ = window);
    var $doc$$6_innerHeight$$ = $el$$2_win$$.innerHeight, $scrollHeight$$ = $el$$2_win$$.document.documentElement.scrollHeight;
    $el$$2_win$$ == $el$$2_win$$.top && $scrollHeight$$ < $doc$$6_innerHeight$$ && ($doc$$6_innerHeight$$ -= 15);
    return new $goog$math$Size$$($el$$2_win$$.innerWidth, $doc$$6_innerHeight$$)
  }
  $el$$2_win$$ = $goog$dom$isCss1CompatMode_$$($doc$$6_innerHeight$$) ? $doc$$6_innerHeight$$.documentElement : $doc$$6_innerHeight$$.body;
  return new $goog$math$Size$$($el$$2_win$$.clientWidth, $el$$2_win$$.clientHeight)
}
function $goog$dom$getWindow$$($opt_doc$$) {
  return $opt_doc$$ ? $opt_doc$$.parentWindow || $opt_doc$$.defaultView : window
}
function $goog$dom$createDom$$($tagName$$2$$, $opt_attributes$$, $var_args$$53$$) {
  return $goog$dom$createDom_$$(document, arguments)
}
function $goog$dom$createDom_$$($doc$$11$$, $args$$6$$) {
  var $element$$16_tagName$$3_tagNameArr$$ = $args$$6$$[0], $attributes$$ = $args$$6$$[1];
  if(!$goog$dom$BrowserFeature$CAN_ADD_NAME_OR_TYPE_ATTRIBUTES$$ && $attributes$$ && ($attributes$$.name || $attributes$$.type)) {
    $element$$16_tagName$$3_tagNameArr$$ = ["<", $element$$16_tagName$$3_tagNameArr$$];
    $attributes$$.name && $element$$16_tagName$$3_tagNameArr$$.push(' name="', $goog$string$htmlEscape$$($attributes$$.name), '"');
    if($attributes$$.type) {
      $element$$16_tagName$$3_tagNameArr$$.push(' type="', $goog$string$htmlEscape$$($attributes$$.type), '"');
      var $clone$$3$$ = {};
      $goog$object$extend$$($clone$$3$$, $attributes$$);
      $attributes$$ = $clone$$3$$;
      delete $attributes$$.type
    }
    $element$$16_tagName$$3_tagNameArr$$.push(">");
    $element$$16_tagName$$3_tagNameArr$$ = $element$$16_tagName$$3_tagNameArr$$.join("")
  }
  $element$$16_tagName$$3_tagNameArr$$ = $doc$$11$$.createElement($element$$16_tagName$$3_tagNameArr$$);
  $attributes$$ && ($goog$isString$$($attributes$$) ? $element$$16_tagName$$3_tagNameArr$$.className = $attributes$$ : $goog$isArray$$($attributes$$) ? $goog$dom$classes$add$$.apply($JSCompiler_alias_NULL$$, [$element$$16_tagName$$3_tagNameArr$$].concat($attributes$$)) : $goog$dom$setProperties$$($element$$16_tagName$$3_tagNameArr$$, $attributes$$));
  2 < $args$$6$$.length && $goog$dom$append_$$($doc$$11$$, $element$$16_tagName$$3_tagNameArr$$, $args$$6$$, 2);
  return $element$$16_tagName$$3_tagNameArr$$
}
function $goog$dom$append_$$($doc$$12$$, $parent$$8$$, $args$$7$$, $i$$67_startIndex$$) {
  function $childHandler$$($child$$1$$) {
    $child$$1$$ && $parent$$8$$.appendChild($goog$isString$$($child$$1$$) ? $doc$$12$$.createTextNode($child$$1$$) : $child$$1$$)
  }
  for(;$i$$67_startIndex$$ < $args$$7$$.length;$i$$67_startIndex$$++) {
    var $arg$$5$$ = $args$$7$$[$i$$67_startIndex$$];
    $goog$isArrayLike$$($arg$$5$$) && !($goog$isObject$$($arg$$5$$) && 0 < $arg$$5$$.nodeType) ? $goog$array$forEach$$($goog$dom$isNodeList$$($arg$$5$$) ? $goog$array$clone$$($arg$$5$$) : $arg$$5$$, $childHandler$$) : $childHandler$$($arg$$5$$)
  }
}
function $goog$dom$isCss1CompatMode_$$($doc$$15$$) {
  return"CSS1Compat" == $doc$$15$$.compatMode
}
function $goog$dom$append$$($parent$$10$$, $var_args$$54$$) {
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
function $goog$dom$getChildren$$($element$$18$$) {
  return $goog$dom$BrowserFeature$CAN_USE_CHILDREN_ATTRIBUTE$$ && $element$$18$$.children != $JSCompiler_alias_VOID$$ ? $element$$18$$.children : $goog$array$filter$$($element$$18$$.childNodes, function($node$$5$$) {
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
function $goog$dom$setTextContent$$($element$$20$$, $text$$8$$) {
  if("textContent" in $element$$20$$) {
    $element$$20$$.textContent = $text$$8$$
  }else {
    if($element$$20$$.firstChild && 3 == $element$$20$$.firstChild.nodeType) {
      for(;$element$$20$$.lastChild != $element$$20$$.firstChild;) {
        $element$$20$$.removeChild($element$$20$$.lastChild)
      }
      $element$$20$$.firstChild.data = $text$$8$$
    }else {
      $goog$dom$removeChildren$$($element$$20$$), $element$$20$$.appendChild($goog$dom$getOwnerDocument$$($element$$20$$).createTextNode($text$$8$$))
    }
  }
}
var $goog$dom$TAGS_TO_IGNORE_$$ = {SCRIPT:1, STYLE:1, HEAD:1, IFRAME:1, OBJECT:1}, $goog$dom$PREDEFINED_TAG_VALUES_$$ = {IMG:" ", BR:"\n"};
function $goog$dom$isFocusableTabIndex$$($element$$22_index$$54$$) {
  var $attrNode$$ = $element$$22_index$$54$$.getAttributeNode("tabindex");
  return $attrNode$$ && $attrNode$$.specified ? ($element$$22_index$$54$$ = $element$$22_index$$54$$.tabIndex, $goog$isNumber$$($element$$22_index$$54$$) && 0 <= $element$$22_index$$54$$ && 32768 > $element$$22_index$$54$$) : $JSCompiler_alias_FALSE$$
}
function $goog$dom$setFocusableTabIndex$$($element$$23$$, $enable$$) {
  $enable$$ ? $element$$23$$.tabIndex = 0 : ($element$$23$$.tabIndex = -1, $element$$23$$.removeAttribute("tabIndex"))
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
      $normalizeWhitespace$$ ? $buf$$2$$.push(("" + $child$$7_node$$18$$.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : $buf$$2$$.push($child$$7_node$$18$$.nodeValue)
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
function $goog$dom$isNodeList$$($val$$20$$) {
  if($val$$20$$ && "number" == typeof $val$$20$$.length) {
    if($goog$isObject$$($val$$20$$)) {
      return"function" == typeof $val$$20$$.item || "string" == typeof $val$$20$$.item
    }
    if($goog$isFunction$$($val$$20$$)) {
      return"function" == typeof $val$$20$$.item
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
$JSCompiler_prototypeAlias$$.$getElement$ = function $$JSCompiler_prototypeAlias$$$$getElement$$($element$$27$$) {
  return $goog$isString$$($element$$27$$) ? this.$document_$.getElementById($element$$27$$) : $element$$27$$
};
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($tagName$$5$$, $opt_attributes$$1$$, $var_args$$56$$) {
  return $goog$dom$createDom_$$(this.$document_$, arguments)
};
$JSCompiler_prototypeAlias$$.createElement = function $$JSCompiler_prototypeAlias$$$createElement$($name$$59$$) {
  return this.$document_$.createElement($name$$59$$)
};
$JSCompiler_prototypeAlias$$.createTextNode = function $$JSCompiler_prototypeAlias$$$createTextNode$($content$$1$$) {
  return this.$document_$.createTextNode($content$$1$$)
};
function $JSCompiler_StaticMethods_isCss1CompatMode$$($JSCompiler_StaticMethods_isCss1CompatMode$self$$) {
  return $goog$dom$isCss1CompatMode_$$($JSCompiler_StaticMethods_isCss1CompatMode$self$$.$document_$)
}
function $JSCompiler_StaticMethods_getWindow$$($JSCompiler_StaticMethods_getWindow$self$$) {
  return $JSCompiler_StaticMethods_getWindow$self$$.$document_$.parentWindow || $JSCompiler_StaticMethods_getWindow$self$$.$document_$.defaultView
}
function $JSCompiler_StaticMethods_getDocumentScroll$$($JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_151$$) {
  var $doc$$inline_150_win$$inline_152$$ = $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_151$$.$document_$, $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_151$$ = !$goog$userAgent$WEBKIT$$ && $goog$dom$isCss1CompatMode_$$($doc$$inline_150_win$$inline_152$$) ? $doc$$inline_150_win$$inline_152$$.documentElement : $doc$$inline_150_win$$inline_152$$.body, $doc$$inline_150_win$$inline_152$$ = $doc$$inline_150_win$$inline_152$$.parentWindow || $doc$$inline_150_win$$inline_152$$.defaultView;
  return new $goog$math$Coordinate$$($doc$$inline_150_win$$inline_152$$.pageXOffset || $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_151$$.scrollLeft, $doc$$inline_150_win$$inline_152$$.pageYOffset || $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_151$$.scrollTop)
}
$JSCompiler_prototypeAlias$$.appendChild = function $$JSCompiler_prototypeAlias$$$appendChild$($parent$$9$$, $child$$2$$) {
  $parent$$9$$.appendChild($child$$2$$)
};
$JSCompiler_prototypeAlias$$.append = $goog$dom$append$$;
$JSCompiler_prototypeAlias$$.$removeChildren$ = $goog$dom$removeChildren$$;
$JSCompiler_prototypeAlias$$.removeNode = $goog$dom$removeNode$$;
function $JSCompiler_StaticMethods_getFirstElementChild$$($JSCompiler_StaticMethods_getFirstElementChild$self$$, $node$$6$$) {
  var $JSCompiler_temp$$43_node$$inline_154$$;
  if($node$$6$$.firstElementChild != $JSCompiler_alias_VOID$$) {
    $JSCompiler_temp$$43_node$$inline_154$$ = $node$$6$$.firstElementChild
  }else {
    for($JSCompiler_temp$$43_node$$inline_154$$ = $node$$6$$.firstChild;$JSCompiler_temp$$43_node$$inline_154$$ && 1 != $JSCompiler_temp$$43_node$$inline_154$$.nodeType;) {
      $JSCompiler_temp$$43_node$$inline_154$$ = $JSCompiler_temp$$43_node$$inline_154$$.nextSibling
    }
  }
  return $JSCompiler_temp$$43_node$$inline_154$$
}
$JSCompiler_prototypeAlias$$.contains = $goog$dom$contains$$;
$JSCompiler_prototypeAlias$$.$getOwnerDocument$ = $goog$dom$getOwnerDocument$$;
function $goog$style$getComputedStyle$$($element$$31$$, $property$$4$$) {
  var $doc$$23_styles$$ = $goog$dom$getOwnerDocument$$($element$$31$$);
  return $doc$$23_styles$$.defaultView && $doc$$23_styles$$.defaultView.getComputedStyle && ($doc$$23_styles$$ = $doc$$23_styles$$.defaultView.getComputedStyle($element$$31$$, $JSCompiler_alias_NULL$$)) ? $doc$$23_styles$$[$property$$4$$] || $doc$$23_styles$$.getPropertyValue($property$$4$$) : ""
}
function $goog$style$getCascadedStyle$$($element$$32$$, $style$$2$$) {
  return $element$$32$$.currentStyle ? $element$$32$$.currentStyle[$style$$2$$] : $JSCompiler_alias_NULL$$
}
function $goog$style$getStyle_$$($element$$33$$, $style$$3$$) {
  return $goog$style$getComputedStyle$$($element$$33$$, $style$$3$$) || $goog$style$getCascadedStyle$$($element$$33$$, $style$$3$$) || $element$$33$$.style && $element$$33$$.style[$style$$3$$]
}
function $goog$style$getComputedPosition$$($element$$34$$) {
  return $goog$style$getStyle_$$($element$$34$$, "position")
}
function $goog$style$setPosition$$($el$$4$$, $arg1_y$$36$$, $opt_arg2$$) {
  var $x$$57$$, $buggyGeckoSubPixelPos$$ = $goog$userAgent$GECKO$$ && ($goog$userAgent$detectedMac_$$ || $goog$userAgent$X11$$) && $goog$userAgent$isVersion$$("1.9");
  $arg1_y$$36$$ instanceof $goog$math$Coordinate$$ ? ($x$$57$$ = $arg1_y$$36$$.x, $arg1_y$$36$$ = $arg1_y$$36$$.y) : ($x$$57$$ = $arg1_y$$36$$, $arg1_y$$36$$ = $opt_arg2$$);
  $el$$4$$.style.left = $goog$style$getPixelStyleValue_$$($x$$57$$, $buggyGeckoSubPixelPos$$);
  $el$$4$$.style.top = $goog$style$getPixelStyleValue_$$($arg1_y$$36$$, $buggyGeckoSubPixelPos$$)
}
function $goog$style$getClientViewportElement$$($doc$$24_opt_node$$) {
  $doc$$24_opt_node$$ = $doc$$24_opt_node$$ ? 9 == $doc$$24_opt_node$$.nodeType ? $doc$$24_opt_node$$ : $goog$dom$getOwnerDocument$$($doc$$24_opt_node$$) : document;
  return $goog$userAgent$IE$$ && !$goog$userAgent$isDocumentMode$$(9) && !$JSCompiler_StaticMethods_isCss1CompatMode$$($goog$dom$getDomHelper$$($doc$$24_opt_node$$)) ? $doc$$24_opt_node$$.body : $doc$$24_opt_node$$.documentElement
}
function $goog$style$getBoundingClientRect_$$($doc$$25_el$$5$$) {
  var $rect$$4$$ = $doc$$25_el$$5$$.getBoundingClientRect();
  $goog$userAgent$IE$$ && ($doc$$25_el$$5$$ = $doc$$25_el$$5$$.ownerDocument, $rect$$4$$.left -= $doc$$25_el$$5$$.documentElement.clientLeft + $doc$$25_el$$5$$.body.clientLeft, $rect$$4$$.top -= $doc$$25_el$$5$$.documentElement.clientTop + $doc$$25_el$$5$$.body.clientTop);
  return $rect$$4$$
}
function $goog$style$getOffsetParent$$($element$$42_parent$$18$$) {
  if($goog$userAgent$IE$$ && !$goog$userAgent$isDocumentMode$$(8)) {
    return $element$$42_parent$$18$$.offsetParent
  }
  for(var $doc$$26$$ = $goog$dom$getOwnerDocument$$($element$$42_parent$$18$$), $positionStyle$$ = $goog$style$getStyle_$$($element$$42_parent$$18$$, "position"), $skipStatic$$ = "fixed" == $positionStyle$$ || "absolute" == $positionStyle$$, $element$$42_parent$$18$$ = $element$$42_parent$$18$$.parentNode;$element$$42_parent$$18$$ && $element$$42_parent$$18$$ != $doc$$26$$;$element$$42_parent$$18$$ = $element$$42_parent$$18$$.parentNode) {
    if($positionStyle$$ = $goog$style$getStyle_$$($element$$42_parent$$18$$, "position"), $skipStatic$$ = $skipStatic$$ && "static" == $positionStyle$$ && $element$$42_parent$$18$$ != $doc$$26$$.documentElement && $element$$42_parent$$18$$ != $doc$$26$$.body, !$skipStatic$$ && ($element$$42_parent$$18$$.scrollWidth > $element$$42_parent$$18$$.clientWidth || $element$$42_parent$$18$$.scrollHeight > $element$$42_parent$$18$$.clientHeight || "fixed" == $positionStyle$$ || "absolute" == $positionStyle$$ || 
    "relative" == $positionStyle$$)) {
      return $element$$42_parent$$18$$
    }
  }
  return $JSCompiler_alias_NULL$$
}
function $goog$style$getVisibleRectForElement$$($el$$6_element$$43$$) {
  for(var $visibleRect$$ = new $goog$math$Box$$(0, Infinity, Infinity, 0), $dom_winSize$$ = $goog$dom$getDomHelper$$($el$$6_element$$43$$), $body$$2_scrollX$$ = $dom_winSize$$.$document_$.body, $documentElement$$ = $dom_winSize$$.$document_$.documentElement, $scrollEl_scrollY$$ = !$goog$userAgent$WEBKIT$$ && $goog$dom$isCss1CompatMode_$$($dom_winSize$$.$document_$) ? $dom_winSize$$.$document_$.documentElement : $dom_winSize$$.$document_$.body;$el$$6_element$$43$$ = $goog$style$getOffsetParent$$($el$$6_element$$43$$);) {
    if((!$goog$userAgent$IE$$ || 0 != $el$$6_element$$43$$.clientWidth) && (!$goog$userAgent$WEBKIT$$ || 0 != $el$$6_element$$43$$.clientHeight || $el$$6_element$$43$$ != $body$$2_scrollX$$) && $el$$6_element$$43$$ != $body$$2_scrollX$$ && $el$$6_element$$43$$ != $documentElement$$ && "visible" != $goog$style$getStyle_$$($el$$6_element$$43$$, "overflow")) {
      var $pos$$1$$ = $goog$style$getPageOffset$$($el$$6_element$$43$$), $client_el$$inline_157$$;
      $client_el$$inline_157$$ = $el$$6_element$$43$$;
      if($goog$userAgent$GECKO$$ && !$goog$userAgent$isVersion$$("1.9")) {
        var $left$$inline_158$$ = parseFloat($goog$style$getComputedStyle$$($client_el$$inline_157$$, "borderLeftWidth"));
        if($goog$style$isRightToLeft$$($client_el$$inline_157$$)) {
          var $scrollbarWidth$$inline_159$$ = $client_el$$inline_157$$.offsetWidth - $client_el$$inline_157$$.clientWidth - $left$$inline_158$$ - parseFloat($goog$style$getComputedStyle$$($client_el$$inline_157$$, "borderRightWidth")), $left$$inline_158$$ = $left$$inline_158$$ + $scrollbarWidth$$inline_159$$
        }
        $client_el$$inline_157$$ = new $goog$math$Coordinate$$($left$$inline_158$$, parseFloat($goog$style$getComputedStyle$$($client_el$$inline_157$$, "borderTopWidth")))
      }else {
        $client_el$$inline_157$$ = new $goog$math$Coordinate$$($client_el$$inline_157$$.clientLeft, $client_el$$inline_157$$.clientTop)
      }
      $pos$$1$$.x += $client_el$$inline_157$$.x;
      $pos$$1$$.y += $client_el$$inline_157$$.y;
      $visibleRect$$.top = Math.max($visibleRect$$.top, $pos$$1$$.y);
      $visibleRect$$.right = Math.min($visibleRect$$.right, $pos$$1$$.x + $el$$6_element$$43$$.clientWidth);
      $visibleRect$$.bottom = Math.min($visibleRect$$.bottom, $pos$$1$$.y + $el$$6_element$$43$$.clientHeight);
      $visibleRect$$.left = Math.max($visibleRect$$.left, $pos$$1$$.x)
    }
  }
  $body$$2_scrollX$$ = $scrollEl_scrollY$$.scrollLeft;
  $scrollEl_scrollY$$ = $scrollEl_scrollY$$.scrollTop;
  $visibleRect$$.left = Math.max($visibleRect$$.left, $body$$2_scrollX$$);
  $visibleRect$$.top = Math.max($visibleRect$$.top, $scrollEl_scrollY$$);
  $dom_winSize$$ = $goog$dom$getViewportSize_$$($JSCompiler_StaticMethods_getWindow$$($dom_winSize$$) || window);
  $visibleRect$$.right = Math.min($visibleRect$$.right, $body$$2_scrollX$$ + $dom_winSize$$.width);
  $visibleRect$$.bottom = Math.min($visibleRect$$.bottom, $scrollEl_scrollY$$ + $dom_winSize$$.height);
  return 0 <= $visibleRect$$.top && 0 <= $visibleRect$$.left && $visibleRect$$.bottom > $visibleRect$$.top && $visibleRect$$.right > $visibleRect$$.left ? $visibleRect$$ : $JSCompiler_alias_NULL$$
}
function $goog$style$getPageOffset$$($el$$8_scrollCoord_vpBox$$) {
  var $box$$5_parent$$19$$, $doc$$27$$ = $goog$dom$getOwnerDocument$$($el$$8_scrollCoord_vpBox$$), $positionStyle$$1$$ = $goog$style$getStyle_$$($el$$8_scrollCoord_vpBox$$, "position"), $BUGGY_GECKO_BOX_OBJECT$$ = $goog$userAgent$GECKO$$ && $doc$$27$$.getBoxObjectFor && !$el$$8_scrollCoord_vpBox$$.getBoundingClientRect && "absolute" == $positionStyle$$1$$ && ($box$$5_parent$$19$$ = $doc$$27$$.getBoxObjectFor($el$$8_scrollCoord_vpBox$$)) && (0 > $box$$5_parent$$19$$.screenX || 0 > $box$$5_parent$$19$$.screenY), 
  $pos$$2$$ = new $goog$math$Coordinate$$(0, 0), $viewportElement$$ = $goog$style$getClientViewportElement$$($doc$$27$$);
  if($el$$8_scrollCoord_vpBox$$ == $viewportElement$$) {
    return $pos$$2$$
  }
  if($el$$8_scrollCoord_vpBox$$.getBoundingClientRect) {
    $box$$5_parent$$19$$ = $goog$style$getBoundingClientRect_$$($el$$8_scrollCoord_vpBox$$), $el$$8_scrollCoord_vpBox$$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$($doc$$27$$)), $pos$$2$$.x = $box$$5_parent$$19$$.left + $el$$8_scrollCoord_vpBox$$.x, $pos$$2$$.y = $box$$5_parent$$19$$.top + $el$$8_scrollCoord_vpBox$$.y
  }else {
    if($doc$$27$$.getBoxObjectFor && !$BUGGY_GECKO_BOX_OBJECT$$) {
      $box$$5_parent$$19$$ = $doc$$27$$.getBoxObjectFor($el$$8_scrollCoord_vpBox$$), $el$$8_scrollCoord_vpBox$$ = $doc$$27$$.getBoxObjectFor($viewportElement$$), $pos$$2$$.x = $box$$5_parent$$19$$.screenX - $el$$8_scrollCoord_vpBox$$.screenX, $pos$$2$$.y = $box$$5_parent$$19$$.screenY - $el$$8_scrollCoord_vpBox$$.screenY
    }else {
      $box$$5_parent$$19$$ = $el$$8_scrollCoord_vpBox$$;
      do {
        $pos$$2$$.x += $box$$5_parent$$19$$.offsetLeft;
        $pos$$2$$.y += $box$$5_parent$$19$$.offsetTop;
        $box$$5_parent$$19$$ != $el$$8_scrollCoord_vpBox$$ && ($pos$$2$$.x += $box$$5_parent$$19$$.clientLeft || 0, $pos$$2$$.y += $box$$5_parent$$19$$.clientTop || 0);
        if($goog$userAgent$WEBKIT$$ && "fixed" == $goog$style$getComputedPosition$$($box$$5_parent$$19$$)) {
          $pos$$2$$.x += $doc$$27$$.body.scrollLeft;
          $pos$$2$$.y += $doc$$27$$.body.scrollTop;
          break
        }
        $box$$5_parent$$19$$ = $box$$5_parent$$19$$.offsetParent
      }while($box$$5_parent$$19$$ && $box$$5_parent$$19$$ != $el$$8_scrollCoord_vpBox$$);
      if($goog$userAgent$OPERA$$ || $goog$userAgent$WEBKIT$$ && "absolute" == $positionStyle$$1$$) {
        $pos$$2$$.y -= $doc$$27$$.body.offsetTop
      }
      for($box$$5_parent$$19$$ = $el$$8_scrollCoord_vpBox$$;($box$$5_parent$$19$$ = $goog$style$getOffsetParent$$($box$$5_parent$$19$$)) && $box$$5_parent$$19$$ != $doc$$27$$.body && $box$$5_parent$$19$$ != $viewportElement$$;) {
        if($pos$$2$$.x -= $box$$5_parent$$19$$.scrollLeft, !$goog$userAgent$OPERA$$ || "TR" != $box$$5_parent$$19$$.tagName) {
          $pos$$2$$.y -= $box$$5_parent$$19$$.scrollTop
        }
      }
    }
  }
  return $pos$$2$$
}
function $goog$style$getRelativePosition$$($a$$19_ap$$) {
  var $b$$18_bp$$ = document.documentElement, $a$$19_ap$$ = $goog$style$getClientPosition$$($a$$19_ap$$), $b$$18_bp$$ = $goog$style$getClientPosition$$($b$$18_bp$$);
  return new $goog$math$Coordinate$$($a$$19_ap$$.x - $b$$18_bp$$.x, $a$$19_ap$$.y - $b$$18_bp$$.y)
}
function $goog$style$getClientPosition$$($box$$6_el$$12_pageCoord$$) {
  var $pos$$4$$ = new $goog$math$Coordinate$$;
  if(1 == $box$$6_el$$12_pageCoord$$.nodeType) {
    if($box$$6_el$$12_pageCoord$$.getBoundingClientRect) {
      $box$$6_el$$12_pageCoord$$ = $goog$style$getBoundingClientRect_$$($box$$6_el$$12_pageCoord$$), $pos$$4$$.x = $box$$6_el$$12_pageCoord$$.left, $pos$$4$$.y = $box$$6_el$$12_pageCoord$$.top
    }else {
      var $isAbstractedEvent_scrollCoord$$1$$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$($box$$6_el$$12_pageCoord$$)), $box$$6_el$$12_pageCoord$$ = $goog$style$getPageOffset$$($box$$6_el$$12_pageCoord$$);
      $pos$$4$$.x = $box$$6_el$$12_pageCoord$$.x - $isAbstractedEvent_scrollCoord$$1$$.x;
      $pos$$4$$.y = $box$$6_el$$12_pageCoord$$.y - $isAbstractedEvent_scrollCoord$$1$$.y
    }
  }else {
    var $isAbstractedEvent_scrollCoord$$1$$ = $goog$isFunction$$($box$$6_el$$12_pageCoord$$.$getBrowserEvent$), $targetEvent$$ = $box$$6_el$$12_pageCoord$$;
    $box$$6_el$$12_pageCoord$$.targetTouches ? $targetEvent$$ = $box$$6_el$$12_pageCoord$$.targetTouches[0] : $isAbstractedEvent_scrollCoord$$1$$ && $box$$6_el$$12_pageCoord$$.$event_$.targetTouches && ($targetEvent$$ = $box$$6_el$$12_pageCoord$$.$event_$.targetTouches[0]);
    $pos$$4$$.x = $targetEvent$$.clientX;
    $pos$$4$$.y = $targetEvent$$.clientY
  }
  return $pos$$4$$
}
function $goog$style$setSize$$($element$$46$$, $w$$6$$, $h$$6_opt_h$$) {
  $w$$6$$ instanceof $goog$math$Size$$ ? ($h$$6_opt_h$$ = $w$$6$$.height, $w$$6$$ = $w$$6$$.width) : $h$$6_opt_h$$ == $JSCompiler_alias_VOID$$ && $JSCompiler_alias_THROW$$(Error("missing height argument"));
  $element$$46$$.style.width = $goog$style$getPixelStyleValue_$$($w$$6$$, $JSCompiler_alias_TRUE$$);
  $element$$46$$.style.height = $goog$style$getPixelStyleValue_$$($h$$6_opt_h$$, $JSCompiler_alias_TRUE$$)
}
function $goog$style$getPixelStyleValue_$$($value$$57$$, $round$$) {
  "number" == typeof $value$$57$$ && ($value$$57$$ = ($round$$ ? Math.round($value$$57$$) : $value$$57$$) + "px");
  return $value$$57$$
}
function $goog$style$getSize$$($element$$49_size$$9$$) {
  if("none" != $goog$style$getStyle_$$($element$$49_size$$9$$, "display")) {
    return $goog$style$getSizeWithDisplay_$$($element$$49_size$$9$$)
  }
  var $style$$4$$ = $element$$49_size$$9$$.style, $originalDisplay$$ = $style$$4$$.display, $originalVisibility$$ = $style$$4$$.visibility, $originalPosition$$ = $style$$4$$.position;
  $style$$4$$.visibility = "hidden";
  $style$$4$$.position = "absolute";
  $style$$4$$.display = "inline";
  $element$$49_size$$9$$ = $goog$style$getSizeWithDisplay_$$($element$$49_size$$9$$);
  $style$$4$$.display = $originalDisplay$$;
  $style$$4$$.position = $originalPosition$$;
  $style$$4$$.visibility = $originalVisibility$$;
  return $element$$49_size$$9$$
}
function $goog$style$getSizeWithDisplay_$$($clientRect_element$$50$$) {
  var $offsetWidth$$ = $clientRect_element$$50$$.offsetWidth, $offsetHeight$$ = $clientRect_element$$50$$.offsetHeight, $webkitOffsetsZero$$ = $goog$userAgent$WEBKIT$$ && !$offsetWidth$$ && !$offsetHeight$$;
  return(!$goog$isDef$$($offsetWidth$$) || $webkitOffsetsZero$$) && $clientRect_element$$50$$.getBoundingClientRect ? ($clientRect_element$$50$$ = $goog$style$getBoundingClientRect_$$($clientRect_element$$50$$), new $goog$math$Size$$($clientRect_element$$50$$.right - $clientRect_element$$50$$.left, $clientRect_element$$50$$.bottom - $clientRect_element$$50$$.top)) : new $goog$math$Size$$($offsetWidth$$, $offsetHeight$$)
}
function $goog$style$setOpacity$$($el$$15$$, $alpha$$3$$) {
  var $style$$6$$ = $el$$15$$.style;
  "opacity" in $style$$6$$ ? $style$$6$$.opacity = $alpha$$3$$ : "MozOpacity" in $style$$6$$ ? $style$$6$$.MozOpacity = $alpha$$3$$ : "filter" in $style$$6$$ && ($style$$6$$.filter = "" === $alpha$$3$$ ? "" : "alpha(opacity=" + 100 * $alpha$$3$$ + ")")
}
function $goog$style$showElement$$($el$$18$$, $display$$) {
  $el$$18$$.style.display = $display$$ ? "" : "none"
}
function $goog$style$isRightToLeft$$($el$$22$$) {
  return"rtl" == $goog$style$getStyle_$$($el$$22$$, "direction")
}
var $goog$style$unselectableStyle_$$ = $goog$userAgent$GECKO$$ ? "MozUserSelect" : $goog$userAgent$WEBKIT$$ ? "WebkitUserSelect" : $JSCompiler_alias_NULL$$;
function $goog$style$getIePixelValue_$$($element$$58$$, $value$$59$$) {
  if(/^\d+px?$/.test($value$$59$$)) {
    return parseInt($value$$59$$, 10)
  }
  var $oldStyleValue$$ = $element$$58$$.style.left, $oldRuntimeValue$$ = $element$$58$$.runtimeStyle.left;
  $element$$58$$.runtimeStyle.left = $element$$58$$.currentStyle.left;
  $element$$58$$.style.left = $value$$59$$;
  var $pixelValue$$ = $element$$58$$.style.pixelLeft;
  $element$$58$$.style.left = $oldStyleValue$$;
  $element$$58$$.runtimeStyle.left = $oldRuntimeValue$$;
  return $pixelValue$$
}
var $goog$style$ieBorderWidthKeywords_$$ = {thin:2, medium:4, thick:6};
function $goog$style$getIePixelBorder_$$($element$$63$$, $prop$$5$$) {
  if("none" == $goog$style$getCascadedStyle$$($element$$63$$, $prop$$5$$ + "Style")) {
    return 0
  }
  var $width$$15$$ = $goog$style$getCascadedStyle$$($element$$63$$, $prop$$5$$ + "Width");
  return $width$$15$$ in $goog$style$ieBorderWidthKeywords_$$ ? $goog$style$ieBorderWidthKeywords_$$[$width$$15$$] : $goog$style$getIePixelValue_$$($element$$63$$, $width$$15$$)
}
;function $goog$ui$IdGenerator$$() {
}
$goog$addSingletonGetter$$($goog$ui$IdGenerator$$);
$goog$ui$IdGenerator$$.prototype.$nextId_$ = 0;
$goog$ui$IdGenerator$$.$getInstance$();
function $goog$events$EventTarget$$() {
}
$goog$inherits$$($goog$events$EventTarget$$, $goog$Disposable$$);
$JSCompiler_prototypeAlias$$ = $goog$events$EventTarget$$.prototype;
$JSCompiler_prototypeAlias$$.$customEvent_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$parentEventTarget_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$setParentEventTarget$ = $JSCompiler_set$$("$parentEventTarget_$");
$JSCompiler_prototypeAlias$$.addEventListener = function $$JSCompiler_prototypeAlias$$$addEventListener$($type$$72$$, $handler$$3$$, $opt_capture$$4$$, $opt_handlerScope$$) {
  $goog$events$listen$$(this, $type$$72$$, $handler$$3$$, $opt_capture$$4$$, $opt_handlerScope$$)
};
$JSCompiler_prototypeAlias$$.removeEventListener = function $$JSCompiler_prototypeAlias$$$removeEventListener$($type$$73$$, $handler$$4$$, $opt_capture$$5$$, $opt_handlerScope$$1$$) {
  $goog$events$unlisten$$(this, $type$$73$$, $handler$$4$$, $opt_capture$$5$$, $opt_handlerScope$$1$$)
};
$JSCompiler_prototypeAlias$$.dispatchEvent = function $$JSCompiler_prototypeAlias$$$dispatchEvent$($e$$19$$) {
  return $goog$events$dispatchEvent$$(this, $e$$19$$)
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$events$EventTarget$$.$superClass_$.$disposeInternal$.call(this);
  $goog$events$removeAll$$(this);
  this.$parentEventTarget_$ = $JSCompiler_alias_NULL$$
};
function $goog$ui$Component$$($opt_domHelper$$) {
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
$JSCompiler_prototypeAlias$$.$parent_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$children_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$childIndex_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$wasDecorated_$ = $JSCompiler_alias_FALSE$$;
function $JSCompiler_StaticMethods_getId$$($JSCompiler_StaticMethods_getId$self$$) {
  return $JSCompiler_StaticMethods_getId$self$$.$id_$ || ($JSCompiler_StaticMethods_getId$self$$.$id_$ = ":" + ($JSCompiler_StaticMethods_getId$self$$.$idGenerator_$.$nextId_$++).toString(36))
}
function $JSCompiler_StaticMethods_setId$$($JSCompiler_StaticMethods_setId$self$$, $id$$4$$) {
  if($JSCompiler_StaticMethods_setId$self$$.$parent_$ && $JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$) {
    var $obj$$inline_855$$ = $JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$, $key$$inline_856$$ = $JSCompiler_StaticMethods_setId$self$$.$id_$;
    $key$$inline_856$$ in $obj$$inline_855$$ && delete $obj$$inline_855$$[$key$$inline_856$$];
    $goog$object$add$$($JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$, $id$$4$$, $JSCompiler_StaticMethods_setId$self$$)
  }
  $JSCompiler_StaticMethods_setId$self$$.$id_$ = $id$$4$$
}
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
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
$JSCompiler_prototypeAlias$$.$render$ = function $$JSCompiler_prototypeAlias$$$$render$$($opt_parentElement$$) {
  this.$inDocument_$ && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  this.$element_$ || this.$createDom$();
  $opt_parentElement$$ ? $opt_parentElement$$.insertBefore(this.$element_$, $JSCompiler_alias_NULL$$) : this.$dom_$.$document_$.body.appendChild(this.$element_$);
  (!this.$parent_$ || this.$parent_$.$inDocument_$) && this.$enterDocument$()
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($element$$66$$) {
  this.$inDocument_$ && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  if($element$$66$$ && this.$canDecorate$($element$$66$$)) {
    this.$wasDecorated_$ = $JSCompiler_alias_TRUE$$;
    if(!this.$dom_$ || this.$dom_$.$document_$ != $goog$dom$getOwnerDocument$$($element$$66$$)) {
      this.$dom_$ = $goog$dom$getDomHelper$$($element$$66$$)
    }
    this.$decorateInternal$($element$$66$$);
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
  $goog$ui$Component$$.$superClass_$.$disposeInternal$.call(this);
  this.$inDocument_$ && this.$exitDocument$();
  this.$googUiComponentHandler_$ && (this.$googUiComponentHandler_$.$dispose$(), delete this.$googUiComponentHandler_$);
  $JSCompiler_StaticMethods_forEachChild$$(this, function($child$$10$$) {
    $child$$10$$.$dispose$()
  });
  !this.$wasDecorated_$ && this.$element_$ && $goog$dom$removeNode$$(this.$element_$);
  this.$parent_$ = this.$element_$ = this.$childIndex_$ = this.$children_$ = $JSCompiler_alias_NULL$$
};
function $JSCompiler_StaticMethods_addChild$$($JSCompiler_StaticMethods_addChild$self$$, $child$$11$$) {
  var $index$$inline_176$$ = $JSCompiler_StaticMethods_addChild$self$$.$children_$ ? $JSCompiler_StaticMethods_addChild$self$$.$children_$.length : 0;
  $child$$11$$.$inDocument_$ && !$JSCompiler_StaticMethods_addChild$self$$.$inDocument_$ && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  (0 > $index$$inline_176$$ || $index$$inline_176$$ > ($JSCompiler_StaticMethods_addChild$self$$.$children_$ ? $JSCompiler_StaticMethods_addChild$self$$.$children_$.length : 0)) && $JSCompiler_alias_THROW$$(Error("Child component index out of bounds"));
  if(!$JSCompiler_StaticMethods_addChild$self$$.$childIndex_$ || !$JSCompiler_StaticMethods_addChild$self$$.$children_$) {
    $JSCompiler_StaticMethods_addChild$self$$.$childIndex_$ = {}, $JSCompiler_StaticMethods_addChild$self$$.$children_$ = []
  }
  if($child$$11$$.getParent() == $JSCompiler_StaticMethods_addChild$self$$) {
    var $contentElement$$inline_178_key$$inline_863$$ = $JSCompiler_StaticMethods_getId$$($child$$11$$);
    $JSCompiler_StaticMethods_addChild$self$$.$childIndex_$[$contentElement$$inline_178_key$$inline_863$$] = $child$$11$$;
    $goog$array$remove$$($JSCompiler_StaticMethods_addChild$self$$.$children_$, $child$$11$$)
  }else {
    $goog$object$add$$($JSCompiler_StaticMethods_addChild$self$$.$childIndex_$, $JSCompiler_StaticMethods_getId$$($child$$11$$), $child$$11$$)
  }
  $JSCompiler_StaticMethods_setParent$$($child$$11$$, $JSCompiler_StaticMethods_addChild$self$$);
  $goog$array$splice$$($JSCompiler_StaticMethods_addChild$self$$.$children_$, $index$$inline_176$$, 0, $child$$11$$);
  $child$$11$$.$inDocument_$ && $JSCompiler_StaticMethods_addChild$self$$.$inDocument_$ && $child$$11$$.getParent() == $JSCompiler_StaticMethods_addChild$self$$ ? ($contentElement$$inline_178_key$$inline_863$$ = $JSCompiler_StaticMethods_addChild$self$$.$getContentElement$(), $contentElement$$inline_178_key$$inline_863$$.insertBefore($child$$11$$.$getElement$(), $contentElement$$inline_178_key$$inline_863$$.childNodes[$index$$inline_176$$] || $JSCompiler_alias_NULL$$)) : $JSCompiler_StaticMethods_addChild$self$$.$inDocument_$ && 
  (!$child$$11$$.$inDocument_$ && $child$$11$$.$element_$) && $child$$11$$.$enterDocument$()
}
$JSCompiler_prototypeAlias$$.$getContentElement$ = $JSCompiler_get$$("$element_$");
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = function $$JSCompiler_prototypeAlias$$$$setRightToLeft$$($rightToLeft$$1$$) {
  this.$inDocument_$ && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  this.$rightToLeft_$ = $rightToLeft$$1$$
};
function $JSCompiler_StaticMethods_forEachChild$$($JSCompiler_StaticMethods_forEachChild$self$$, $f$$26$$) {
  $JSCompiler_StaticMethods_forEachChild$self$$.$children_$ && $goog$array$forEach$$($JSCompiler_StaticMethods_forEachChild$self$$.$children_$, $f$$26$$, $JSCompiler_alias_VOID$$)
}
$JSCompiler_prototypeAlias$$.removeChild = function $$JSCompiler_prototypeAlias$$$removeChild$($child$$15$$, $opt_unrender$$) {
  if($child$$15$$) {
    var $id$$7$$ = $goog$isString$$($child$$15$$) ? $child$$15$$ : $JSCompiler_StaticMethods_getId$$($child$$15$$), $child$$15$$ = this.$childIndex_$ && $id$$7$$ ? ($id$$7$$ in this.$childIndex_$ ? this.$childIndex_$[$id$$7$$] : $JSCompiler_alias_VOID$$) || $JSCompiler_alias_NULL$$ : $JSCompiler_alias_NULL$$;
    if($id$$7$$ && $child$$15$$) {
      var $obj$$inline_870$$ = this.$childIndex_$;
      $id$$7$$ in $obj$$inline_870$$ && delete $obj$$inline_870$$[$id$$7$$];
      $goog$array$remove$$(this.$children_$, $child$$15$$);
      $opt_unrender$$ && ($child$$15$$.$exitDocument$(), $child$$15$$.$element_$ && $goog$dom$removeNode$$($child$$15$$.$element_$));
      $JSCompiler_StaticMethods_setParent$$($child$$15$$, $JSCompiler_alias_NULL$$)
    }
  }
  $child$$15$$ || $JSCompiler_alias_THROW$$(Error("Child is not in parent component"));
  return $child$$15$$
};
$JSCompiler_prototypeAlias$$.$removeChildren$ = function $$JSCompiler_prototypeAlias$$$$removeChildren$$($opt_unrender$$2$$) {
  for(;this.$children_$ && 0 != this.$children_$.length;) {
    this.removeChild(this.$children_$ ? this.$children_$[0] || $JSCompiler_alias_NULL$$ : $JSCompiler_alias_NULL$$, $opt_unrender$$2$$)
  }
};
function $goog$dom$a11y$setRole$$($element$$69$$, $roleName$$) {
  $element$$69$$.setAttribute("role", $roleName$$);
  $element$$69$$.$roleName$ = $roleName$$
}
;function $goog$ui$ControlRenderer$$() {
}
var $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$;
$goog$addSingletonGetter$$($goog$ui$ControlRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$ControlRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getAriaRole$ = function $$JSCompiler_prototypeAlias$$$$getAriaRole$$() {
};
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($control$$) {
  var $element$$75$$ = $control$$.$getDomHelper$().$createDom$("div", $JSCompiler_StaticMethods_getClassNames$$(this, $control$$).join(" "), $control$$.$content_$);
  this.$setAriaStates$($control$$, $element$$75$$);
  return $element$$75$$
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$($element$$76$$) {
  return $element$$76$$
};
$JSCompiler_prototypeAlias$$.$enableClassName$ = function $$JSCompiler_prototypeAlias$$$$enableClassName$$($control$$1_element$$77$$, $className$$16$$, $enable$$1$$) {
  if($control$$1_element$$77$$ = $control$$1_element$$77$$.$getElement$ ? $control$$1_element$$77$$.$getElement$() : $control$$1_element$$77$$) {
    if($goog$userAgent$IE$$ && !$goog$userAgent$isVersion$$("7")) {
      var $combinedClasses$$ = $JSCompiler_StaticMethods_getAppliedCombinedClassNames_$$($goog$dom$classes$get$$($control$$1_element$$77$$), $className$$16$$);
      $combinedClasses$$.push($className$$16$$);
      $goog$partial$$($enable$$1$$ ? $goog$dom$classes$add$$ : $goog$dom$classes$remove$$, $control$$1_element$$77$$).apply($JSCompiler_alias_NULL$$, $combinedClasses$$)
    }else {
      $enable$$1$$ ? $goog$dom$classes$add$$($control$$1_element$$77$$, $className$$16$$) : $goog$dom$classes$remove$$($control$$1_element$$77$$, $className$$16$$)
    }
  }
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = $JSCompiler_returnArg$$($JSCompiler_alias_TRUE$$);
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($control$$3$$, $element$$79$$) {
  $element$$79$$.id && $JSCompiler_StaticMethods_setId$$($control$$3$$, $element$$79$$.id);
  var $contentElem_hasCombinedClassName$$ = this.$getContentElement$($element$$79$$);
  $contentElem_hasCombinedClassName$$ && $contentElem_hasCombinedClassName$$.firstChild ? $JSCompiler_StaticMethods_setContentInternal$$($control$$3$$, $contentElem_hasCombinedClassName$$.firstChild.nextSibling ? $goog$array$clone$$($contentElem_hasCombinedClassName$$.childNodes) : $contentElem_hasCombinedClassName$$.firstChild) : $control$$3$$.$content_$ = $JSCompiler_alias_NULL$$;
  var $state$$2$$ = 0, $rendererClassName$$ = this.$getCssClass$(), $structuralClassName$$ = this.$getCssClass$(), $hasRendererClassName$$ = $JSCompiler_alias_FALSE$$, $hasStructuralClassName$$ = $JSCompiler_alias_FALSE$$, $contentElem_hasCombinedClassName$$ = $JSCompiler_alias_FALSE$$, $classNames$$1$$ = $goog$dom$classes$get$$($element$$79$$);
  $goog$array$forEach$$($classNames$$1$$, function($className$$18_state$$inline_199$$) {
    if(!$hasRendererClassName$$ && $className$$18_state$$inline_199$$ == $rendererClassName$$) {
      $hasRendererClassName$$ = $JSCompiler_alias_TRUE$$, $structuralClassName$$ == $rendererClassName$$ && ($hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$)
    }else {
      if(!$hasStructuralClassName$$ && $className$$18_state$$inline_199$$ == $structuralClassName$$) {
        $hasStructuralClassName$$ = $JSCompiler_alias_TRUE$$
      }else {
        var $JSCompiler_temp_const$$14$$ = $state$$2$$;
        if(!this.$stateByClass_$) {
          this.$classByState_$ || $JSCompiler_StaticMethods_createClassByStateMap_$$(this);
          var $obj$$inline_1141$$ = this.$classByState_$, $transposed$$inline_1142$$ = {}, $key$$inline_1143$$;
          for($key$$inline_1143$$ in $obj$$inline_1141$$) {
            $transposed$$inline_1142$$[$obj$$inline_1141$$[$key$$inline_1143$$]] = $key$$inline_1143$$
          }
          this.$stateByClass_$ = $transposed$$inline_1142$$
        }
        $className$$18_state$$inline_199$$ = parseInt(this.$stateByClass_$[$className$$18_state$$inline_199$$], 10);
        $state$$2$$ = $JSCompiler_temp_const$$14$$ | (isNaN($className$$18_state$$inline_199$$) ? 0 : $className$$18_state$$inline_199$$)
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
    $element$$79$$.className = $classNames$$1$$.join(" ")
  }
  this.$setAriaStates$($control$$3$$, $element$$79$$);
  return $element$$79$$
};
$JSCompiler_prototypeAlias$$.$initializeDom$ = function $$JSCompiler_prototypeAlias$$$$initializeDom$$($control$$4$$) {
  $control$$4$$.$rightToLeft_$ == $JSCompiler_alias_NULL$$ && ($control$$4$$.$rightToLeft_$ = $goog$style$isRightToLeft$$($control$$4$$.$inDocument_$ ? $control$$4$$.$element_$ : $control$$4$$.$dom_$.$document_$.body));
  $control$$4$$.$rightToLeft_$ && this.$setRightToLeft$($control$$4$$.$getElement$(), $JSCompiler_alias_TRUE$$);
  $control$$4$$.isEnabled() && this.$setFocusable$($control$$4$$, $control$$4$$.$isVisible$())
};
$JSCompiler_prototypeAlias$$.$setAriaStates$ = function $$JSCompiler_prototypeAlias$$$$setAriaStates$$($control$$5$$, $element$$81$$) {
  $goog$asserts$assert$$($control$$5$$);
  $goog$asserts$assert$$($element$$81$$);
  $control$$5$$.isEnabled() || this.$updateAriaState$($element$$81$$, 1, $JSCompiler_alias_TRUE$$);
  $control$$5$$.$state_$ & 8 && this.$updateAriaState$($element$$81$$, 8, $JSCompiler_alias_TRUE$$);
  $control$$5$$.$supportedStates_$ & 16 && this.$updateAriaState$($element$$81$$, 16, !!($control$$5$$.$state_$ & 16));
  $control$$5$$.$supportedStates_$ & 64 && this.$updateAriaState$($element$$81$$, 64, !!($control$$5$$.$state_$ & 64))
};
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = function $$JSCompiler_prototypeAlias$$$$setAllowTextSelection$$($element$$82$$, $allow$$) {
  var $unselectable$$inline_211_value$$inline_214$$ = !$allow$$, $descendants$$inline_213$$ = $goog$userAgent$IE$$ || $goog$userAgent$OPERA$$ ? $element$$82$$.getElementsByTagName("*") : $JSCompiler_alias_NULL$$;
  if($goog$style$unselectableStyle_$$) {
    if($unselectable$$inline_211_value$$inline_214$$ = $unselectable$$inline_211_value$$inline_214$$ ? "none" : "", $element$$82$$.style[$goog$style$unselectableStyle_$$] = $unselectable$$inline_211_value$$inline_214$$, $descendants$$inline_213$$) {
      for(var $i$$inline_215$$ = 0, $descendant$$inline_216$$;$descendant$$inline_216$$ = $descendants$$inline_213$$[$i$$inline_215$$];$i$$inline_215$$++) {
        $descendant$$inline_216$$.style[$goog$style$unselectableStyle_$$] = $unselectable$$inline_211_value$$inline_214$$
      }
    }
  }else {
    if($goog$userAgent$IE$$ || $goog$userAgent$OPERA$$) {
      if($unselectable$$inline_211_value$$inline_214$$ = $unselectable$$inline_211_value$$inline_214$$ ? "on" : "", $element$$82$$.setAttribute("unselectable", $unselectable$$inline_211_value$$inline_214$$), $descendants$$inline_213$$) {
        for($i$$inline_215$$ = 0;$descendant$$inline_216$$ = $descendants$$inline_213$$[$i$$inline_215$$];$i$$inline_215$$++) {
          $descendant$$inline_216$$.setAttribute("unselectable", $unselectable$$inline_211_value$$inline_214$$)
        }
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$setRightToLeft$ = function $$JSCompiler_prototypeAlias$$$$setRightToLeft$$($element$$83$$, $rightToLeft$$2$$) {
  this.$enableClassName$($element$$83$$, this.$getCssClass$() + "-rtl", $rightToLeft$$2$$)
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
      }catch($e$$20$$) {
      }
      $control$$7$$.$state_$ & 32 && $control$$7$$.$handleBlur$()
    }
    $goog$dom$isFocusableTabIndex$$($keyTarget$$1$$) != $focusable$$ && $goog$dom$setFocusableTabIndex$$($keyTarget$$1$$, $focusable$$)
  }
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($element$$84$$, $visible$$) {
  $goog$style$showElement$$($element$$84$$, $visible$$)
};
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($control$$8$$, $state$$3$$, $enable$$3$$) {
  var $element$$85$$ = $control$$8$$.$getElement$();
  if($element$$85$$) {
    var $className$$19$$ = $JSCompiler_StaticMethods_getClassForState$$(this, $state$$3$$);
    $className$$19$$ && this.$enableClassName$($control$$8$$, $className$$19$$, $enable$$3$$);
    this.$updateAriaState$($element$$85$$, $state$$3$$, $enable$$3$$)
  }
};
$JSCompiler_prototypeAlias$$.$updateAriaState$ = function $$JSCompiler_prototypeAlias$$$$updateAriaState$$($element$$86$$, $ariaState_state$$4$$, $enable$$4$$) {
  $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$ || ($goog$ui$ControlRenderer$ARIA_STATE_MAP_$$ = {1:"disabled", 8:"selected", 16:"checked", 64:"expanded"});
  ($ariaState_state$$4$$ = $goog$ui$ControlRenderer$ARIA_STATE_MAP_$$[$ariaState_state$$4$$]) && $element$$86$$.setAttribute("aria-" + $ariaState_state$$4$$, $enable$$4$$)
};
$JSCompiler_prototypeAlias$$.$setContent$ = function $$JSCompiler_prototypeAlias$$$$setContent$$($element$$87$$, $content$$2$$) {
  var $contentElem$$1$$ = this.$getContentElement$($element$$87$$);
  if($contentElem$$1$$ && ($goog$dom$removeChildren$$($contentElem$$1$$), $content$$2$$)) {
    if($goog$isString$$($content$$2$$)) {
      $goog$dom$setTextContent$$($contentElem$$1$$, $content$$2$$)
    }else {
      var $childHandler$$1$$ = function $$childHandler$$1$$$($child$$16$$) {
        if($child$$16$$) {
          var $doc$$32$$ = $goog$dom$getOwnerDocument$$($contentElem$$1$$);
          $contentElem$$1$$.appendChild($goog$isString$$($child$$16$$) ? $doc$$32$$.createTextNode($child$$16$$) : $child$$16$$)
        }
      };
      $goog$isArray$$($content$$2$$) ? $goog$array$forEach$$($content$$2$$, $childHandler$$1$$) : $goog$isArrayLike$$($content$$2$$) && !("nodeType" in $content$$2$$) ? $goog$array$forEach$$($goog$array$clone$$($content$$2$$), $childHandler$$1$$) : $childHandler$$1$$($content$$2$$)
    }
  }
};
$JSCompiler_prototypeAlias$$.$getKeyEventTarget$ = function $$JSCompiler_prototypeAlias$$$$getKeyEventTarget$$($control$$9$$) {
  return $control$$9$$.$getElement$()
};
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-control");
function $JSCompiler_StaticMethods_getClassNames$$($JSCompiler_StaticMethods_getClassNames$self$$, $control$$10$$) {
  var $cssClass_extraClassNames$$1_state$$inline_223$$ = $JSCompiler_StaticMethods_getClassNames$self$$.$getCssClass$(), $classNames$$2$$ = [$cssClass_extraClassNames$$1_state$$inline_223$$], $classNames$$inline_224_structuralCssClass$$ = $JSCompiler_StaticMethods_getClassNames$self$$.$getCssClass$();
  $classNames$$inline_224_structuralCssClass$$ != $cssClass_extraClassNames$$1_state$$inline_223$$ && $classNames$$2$$.push($classNames$$inline_224_structuralCssClass$$);
  $cssClass_extraClassNames$$1_state$$inline_223$$ = $control$$10$$.$state_$;
  for($classNames$$inline_224_structuralCssClass$$ = [];$cssClass_extraClassNames$$1_state$$inline_223$$;) {
    var $mask$$inline_225$$ = $cssClass_extraClassNames$$1_state$$inline_223$$ & -$cssClass_extraClassNames$$1_state$$inline_223$$;
    $classNames$$inline_224_structuralCssClass$$.push($JSCompiler_StaticMethods_getClassForState$$($JSCompiler_StaticMethods_getClassNames$self$$, $mask$$inline_225$$));
    $cssClass_extraClassNames$$1_state$$inline_223$$ &= ~$mask$$inline_225$$
  }
  $classNames$$2$$.push.apply($classNames$$2$$, $classNames$$inline_224_structuralCssClass$$);
  ($cssClass_extraClassNames$$1_state$$inline_223$$ = $control$$10$$.$extraClassNames_$) && $classNames$$2$$.push.apply($classNames$$2$$, $cssClass_extraClassNames$$1_state$$inline_223$$);
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
;function $goog$ui$registry$setDecoratorByClassName$$($className$$22$$, $decoratorFn$$) {
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
  if($opt_altKey$$ && !$opt_ctrlKey$$ || !$opt_shiftKey$$ && (17 == $opt_heldKeyCode$$ || 18 == $opt_heldKeyCode$$) || $goog$userAgent$IE$$ && $opt_ctrlKey$$ && $opt_heldKeyCode$$ == $keyCode$$) {
    return $JSCompiler_alias_FALSE$$
  }
  switch($keyCode$$) {
    case 13:
      return!($goog$userAgent$IE$$ && $goog$userAgent$isDocumentMode$$(9));
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
;function $goog$events$KeyHandler$$($opt_element$$11$$, $opt_capture$$6$$) {
  $opt_element$$11$$ && this.$attach$($opt_element$$11$$, $opt_capture$$6$$)
}
$goog$inherits$$($goog$events$KeyHandler$$, $goog$events$EventTarget$$);
$JSCompiler_prototypeAlias$$ = $goog$events$KeyHandler$$.prototype;
$JSCompiler_prototypeAlias$$.$element_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$keyPressKey_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$keyDownKey_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$keyUpKey_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$lastKey_$ = -1;
$JSCompiler_prototypeAlias$$.$keyCode_$ = -1;
var $goog$events$KeyHandler$safariKey_$$ = {3:13, 12:144, 63232:38, 63233:40, 63234:37, 63235:39, 63236:112, 63237:113, 63238:114, 63239:115, 63240:116, 63241:117, 63242:118, 63243:119, 63244:120, 63245:121, 63246:122, 63247:123, 63248:44, 63272:46, 63273:36, 63275:35, 63276:33, 63277:34, 63289:144, 63302:45}, $goog$events$KeyHandler$keyIdentifier_$$ = {Up:38, Down:40, Left:37, Right:39, Enter:13, F1:112, F2:113, F3:114, F4:115, F5:116, F6:117, F7:118, F8:119, F9:120, F10:121, F11:122, F12:123, "U+007F":46, 
Home:36, End:35, PageUp:33, PageDown:34, Insert:45}, $goog$events$KeyHandler$USES_KEYDOWN_$$ = $goog$userAgent$IE$$ || $goog$userAgent$WEBKIT$$ && $goog$userAgent$isVersion$$("525");
$JSCompiler_prototypeAlias$$ = $goog$events$KeyHandler$$.prototype;
$JSCompiler_prototypeAlias$$.$handleKeyDown_$ = function $$JSCompiler_prototypeAlias$$$$handleKeyDown_$$($e$$22$$) {
  if($goog$userAgent$WEBKIT$$ && (17 == this.$lastKey_$ && !$e$$22$$.ctrlKey || 18 == this.$lastKey_$ && !$e$$22$$.altKey)) {
    this.$keyCode_$ = this.$lastKey_$ = -1
  }
  $goog$events$KeyHandler$USES_KEYDOWN_$$ && !$goog$events$KeyCodes$firesKeyPressEvent$$($e$$22$$.keyCode, this.$lastKey_$, $e$$22$$.shiftKey, $e$$22$$.ctrlKey, $e$$22$$.altKey) ? this.handleEvent($e$$22$$) : this.$keyCode_$ = $goog$userAgent$GECKO$$ ? $goog$events$KeyCodes$normalizeGeckoKeyCode$$($e$$22$$.keyCode) : $e$$22$$.keyCode
};
$JSCompiler_prototypeAlias$$.$handleKeyup_$ = function $$JSCompiler_prototypeAlias$$$$handleKeyup_$$() {
  this.$keyCode_$ = this.$lastKey_$ = -1
};
$JSCompiler_prototypeAlias$$.handleEvent = function $$JSCompiler_prototypeAlias$$$handleEvent$($e$$24_repeat$$) {
  var $be$$2_event$$4$$ = $e$$24_repeat$$.$event_$, $keyCode$$3$$, $charCode$$;
  $goog$userAgent$IE$$ && "keypress" == $e$$24_repeat$$.type ? ($keyCode$$3$$ = this.$keyCode_$, $charCode$$ = 13 != $keyCode$$3$$ && 27 != $keyCode$$3$$ ? $be$$2_event$$4$$.keyCode : 0) : $goog$userAgent$WEBKIT$$ && "keypress" == $e$$24_repeat$$.type ? ($keyCode$$3$$ = this.$keyCode_$, $charCode$$ = 0 <= $be$$2_event$$4$$.charCode && 63232 > $be$$2_event$$4$$.charCode && $goog$events$KeyCodes$isCharacterKey$$($keyCode$$3$$) ? $be$$2_event$$4$$.charCode : 0) : $goog$userAgent$OPERA$$ ? ($keyCode$$3$$ = 
  this.$keyCode_$, $charCode$$ = $goog$events$KeyCodes$isCharacterKey$$($keyCode$$3$$) ? $be$$2_event$$4$$.keyCode : 0) : ($keyCode$$3$$ = $be$$2_event$$4$$.keyCode || this.$keyCode_$, $charCode$$ = $be$$2_event$$4$$.charCode || 0, $goog$userAgent$detectedMac_$$ && (63 == $charCode$$ && 224 == $keyCode$$3$$) && ($keyCode$$3$$ = 191));
  var $key$$55$$ = $keyCode$$3$$, $keyIdentifier$$ = $be$$2_event$$4$$.keyIdentifier;
  $keyCode$$3$$ ? 63232 <= $keyCode$$3$$ && $keyCode$$3$$ in $goog$events$KeyHandler$safariKey_$$ ? $key$$55$$ = $goog$events$KeyHandler$safariKey_$$[$keyCode$$3$$] : 25 == $keyCode$$3$$ && $e$$24_repeat$$.shiftKey && ($key$$55$$ = 9) : $keyIdentifier$$ && $keyIdentifier$$ in $goog$events$KeyHandler$keyIdentifier_$$ && ($key$$55$$ = $goog$events$KeyHandler$keyIdentifier_$$[$keyIdentifier$$]);
  $e$$24_repeat$$ = $key$$55$$ == this.$lastKey_$;
  this.$lastKey_$ = $key$$55$$;
  $be$$2_event$$4$$ = new $goog$events$KeyEvent$$($key$$55$$, $charCode$$, $e$$24_repeat$$, $be$$2_event$$4$$);
  try {
    this.dispatchEvent($be$$2_event$$4$$)
  }finally {
    $be$$2_event$$4$$.$dispose$()
  }
};
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
$JSCompiler_prototypeAlias$$.$attach$ = function $$JSCompiler_prototypeAlias$$$$attach$$($element$$90$$, $opt_capture$$7$$) {
  this.$keyUpKey_$ && this.detach();
  this.$element_$ = $element$$90$$;
  this.$keyPressKey_$ = $goog$events$listen$$(this.$element_$, "keypress", this, $opt_capture$$7$$);
  this.$keyDownKey_$ = $goog$events$listen$$(this.$element_$, "keydown", this.$handleKeyDown_$, $opt_capture$$7$$, this);
  this.$keyUpKey_$ = $goog$events$listen$$(this.$element_$, "keyup", this.$handleKeyup_$, $opt_capture$$7$$, this)
};
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
function $goog$ui$Control$$($content$$3$$, $JSCompiler_temp$$40_componentCtor$$inline_231_opt_renderer$$, $opt_domHelper$$1$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$1$$);
  if(!$JSCompiler_temp$$40_componentCtor$$inline_231_opt_renderer$$) {
    for(var $JSCompiler_temp$$40_componentCtor$$inline_231_opt_renderer$$ = this.constructor, $key$$inline_232_rendererCtor$$inline_233$$;$JSCompiler_temp$$40_componentCtor$$inline_231_opt_renderer$$;) {
      $key$$inline_232_rendererCtor$$inline_233$$ = $goog$getUid$$($JSCompiler_temp$$40_componentCtor$$inline_231_opt_renderer$$);
      if($key$$inline_232_rendererCtor$$inline_233$$ = $goog$ui$registry$defaultRenderers_$$[$key$$inline_232_rendererCtor$$inline_233$$]) {
        break
      }
      $JSCompiler_temp$$40_componentCtor$$inline_231_opt_renderer$$ = $JSCompiler_temp$$40_componentCtor$$inline_231_opt_renderer$$.$superClass_$ ? $JSCompiler_temp$$40_componentCtor$$inline_231_opt_renderer$$.$superClass_$.constructor : $JSCompiler_alias_NULL$$
    }
    $JSCompiler_temp$$40_componentCtor$$inline_231_opt_renderer$$ = $key$$inline_232_rendererCtor$$inline_233$$ ? $goog$isFunction$$($key$$inline_232_rendererCtor$$inline_233$$.$getInstance$) ? $key$$inline_232_rendererCtor$$inline_233$$.$getInstance$() : new $key$$inline_232_rendererCtor$$inline_233$$ : $JSCompiler_alias_NULL$$
  }
  this.$renderer_$ = $JSCompiler_temp$$40_componentCtor$$inline_231_opt_renderer$$;
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
$JSCompiler_prototypeAlias$$.$getKeyEventTarget$ = function $$JSCompiler_prototypeAlias$$$$getKeyEventTarget$$() {
  return this.$renderer_$.$getKeyEventTarget$(this)
};
$JSCompiler_prototypeAlias$$.$enableClassName$ = function $$JSCompiler_prototypeAlias$$$$enableClassName$$($className$$25$$, $enable$$6$$) {
  $enable$$6$$ ? $className$$25$$ && (this.$extraClassNames_$ ? $goog$array$contains$$(this.$extraClassNames_$, $className$$25$$) || this.$extraClassNames_$.push($className$$25$$) : this.$extraClassNames_$ = [$className$$25$$], this.$renderer_$.$enableClassName$(this, $className$$25$$, $JSCompiler_alias_TRUE$$)) : $className$$25$$ && this.$extraClassNames_$ && ($goog$array$remove$$(this.$extraClassNames_$, $className$$25$$), 0 == this.$extraClassNames_$.length && (this.$extraClassNames_$ = $JSCompiler_alias_NULL$$), 
  this.$renderer_$.$enableClassName$(this, $className$$25$$, $JSCompiler_alias_FALSE$$))
};
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  var $element$$91$$ = this.$renderer_$.$createDom$(this);
  this.$element_$ = $element$$91$$;
  var $ariaRole$$inline_260$$ = this.$preferredAriaRole_$ || this.$renderer_$.$getAriaRole$();
  $ariaRole$$inline_260$$ && $goog$dom$a11y$setRole$$($element$$91$$, $ariaRole$$inline_260$$);
  this.$allowTextSelection_$ || this.$renderer_$.$setAllowTextSelection$($element$$91$$, $JSCompiler_alias_FALSE$$);
  this.$isVisible$() || this.$renderer_$.$setVisible$($element$$91$$, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$() {
  return this.$renderer_$.$getContentElement$(this.$getElement$())
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$92$$) {
  return this.$renderer_$.$canDecorate$($element$$92$$)
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$93$$) {
  this.$element_$ = $element$$93$$ = this.$renderer_$.$decorate$(this, $element$$93$$);
  var $ariaRole$$inline_268$$ = this.$preferredAriaRole_$ || this.$renderer_$.$getAriaRole$();
  $ariaRole$$inline_268$$ && $goog$dom$a11y$setRole$$($element$$93$$, $ariaRole$$inline_268$$);
  this.$allowTextSelection_$ || this.$renderer_$.$setAllowTextSelection$($element$$93$$, $JSCompiler_alias_FALSE$$);
  this.$visible_$ = "none" != $element$$93$$.style.display
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $goog$ui$Control$$.$superClass_$.$enterDocument$.call(this);
  this.$renderer_$.$initializeDom$(this);
  if(this.$supportedStates_$ & -2 && (this.$handleMouseEvents_$ && $JSCompiler_StaticMethods_enableMouseEventHandling_$$(this, $JSCompiler_alias_TRUE$$), this.$supportedStates_$ & 32)) {
    var $keyTarget$$2$$ = this.$getKeyEventTarget$();
    if($keyTarget$$2$$) {
      var $keyHandler$$ = this.$keyHandler_$ || (this.$keyHandler_$ = new $goog$events$KeyHandler$$);
      $keyHandler$$.$attach$($keyTarget$$2$$);
      $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$(this.$getHandler$(), $keyHandler$$, "key", this.$handleKeyEvent$), $keyTarget$$2$$, "focus", this.$handleFocus$), $keyTarget$$2$$, "blur", this.$handleBlur$)
    }
  }
};
function $JSCompiler_StaticMethods_enableMouseEventHandling_$$($JSCompiler_StaticMethods_enableMouseEventHandling_$self$$, $enable$$7$$) {
  var $handler$$5$$ = $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$getHandler$(), $element$$94$$ = $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$getElement$();
  $enable$$7$$ ? ($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($handler$$5$$, $element$$94$$, "mouseover", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOver$), $element$$94$$, "mousedown", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseDown$), $element$$94$$, "mouseup", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseUp$), $element$$94$$, 
  "mouseout", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOut$), $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_listen$$($handler$$5$$, $element$$94$$, "dblclick", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleDblClick$)) : ($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($handler$$5$$, $element$$94$$, "mouseover", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOver$), 
  $element$$94$$, "mousedown", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseDown$), $element$$94$$, "mouseup", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseUp$), $element$$94$$, "mouseout", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOut$), $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_unlisten$$($handler$$5$$, $element$$94$$, "dblclick", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleDblClick$))
}
$JSCompiler_prototypeAlias$$.$exitDocument$ = function $$JSCompiler_prototypeAlias$$$$exitDocument$$() {
  $goog$ui$Control$$.$superClass_$.$exitDocument$.call(this);
  this.$keyHandler_$ && this.$keyHandler_$.detach();
  this.$isVisible$() && this.isEnabled() && this.$renderer_$.$setFocusable$(this, $JSCompiler_alias_FALSE$$)
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
  var $element$$95$$ = this.$getElement$();
  $element$$95$$ && this.$renderer_$.$setRightToLeft$($element$$95$$, $rightToLeft$$3$$)
};
$JSCompiler_prototypeAlias$$.$setAllowTextSelection$ = function $$JSCompiler_prototypeAlias$$$$setAllowTextSelection$$($allow$$1$$) {
  this.$allowTextSelection_$ = $allow$$1$$;
  var $element$$96$$ = this.$getElement$();
  $element$$96$$ && this.$renderer_$.$setAllowTextSelection$($element$$96$$, $allow$$1$$)
};
$JSCompiler_prototypeAlias$$.$isVisible$ = $JSCompiler_get$$("$visible_$");
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($visible$$1$$, $opt_force$$) {
  if($opt_force$$ || this.$visible_$ != $visible$$1$$ && this.dispatchEvent($visible$$1$$ ? "show" : "hide")) {
    var $element$$97$$ = this.$getElement$();
    $element$$97$$ && this.$renderer_$.$setVisible$($element$$97$$, $visible$$1$$);
    this.isEnabled() && this.$renderer_$.$setFocusable$(this, $visible$$1$$);
    this.$visible_$ = $visible$$1$$;
    return $JSCompiler_alias_TRUE$$
  }
  return $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.isEnabled = function $$JSCompiler_prototypeAlias$$$isEnabled$() {
  return!(this.$state_$ & 1)
};
$JSCompiler_prototypeAlias$$.$setEnabled$ = function $$JSCompiler_prototypeAlias$$$$setEnabled$$($enable$$8$$) {
  var $parent$$inline_275$$ = this.getParent();
  if((!$parent$$inline_275$$ || "function" != typeof $parent$$inline_275$$.isEnabled || $parent$$inline_275$$.isEnabled()) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 1, !$enable$$8$$)) {
    $enable$$8$$ || (this.setActive($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_FALSE$$)), this.$isVisible$() && this.$renderer_$.$setFocusable$(this, $enable$$8$$), this.$setState$(1, !$enable$$8$$)
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
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($state$$9$$, $enable$$9$$) {
  this.$supportedStates_$ & $state$$9$$ && $enable$$9$$ != !!(this.$state_$ & $state$$9$$) && (this.$renderer_$.$setState$(this, $state$$9$$, $enable$$9$$), this.$state_$ = $enable$$9$$ ? this.$state_$ | $state$$9$$ : this.$state_$ & ~$state$$9$$)
};
function $JSCompiler_StaticMethods_setSupportedState$$($JSCompiler_StaticMethods_setSupportedState$self$$, $state$$12$$, $support$$) {
  $JSCompiler_StaticMethods_setSupportedState$self$$.$inDocument_$ && ($JSCompiler_StaticMethods_setSupportedState$self$$.$state_$ & $state$$12$$ && !$support$$) && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  !$support$$ && $JSCompiler_StaticMethods_setSupportedState$self$$.$state_$ & $state$$12$$ && $JSCompiler_StaticMethods_setSupportedState$self$$.$setState$($state$$12$$, $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_setSupportedState$self$$.$supportedStates_$ = $support$$ ? $JSCompiler_StaticMethods_setSupportedState$self$$.$supportedStates_$ | $state$$12$$ : $JSCompiler_StaticMethods_setSupportedState$self$$.$supportedStates_$ & ~$state$$12$$
}
function $JSCompiler_StaticMethods_isAutoState$$($JSCompiler_StaticMethods_isAutoState$self$$, $state$$13$$) {
  return!!($JSCompiler_StaticMethods_isAutoState$self$$.$autoStates_$ & $state$$13$$) && !!($JSCompiler_StaticMethods_isAutoState$self$$.$supportedStates_$ & $state$$13$$)
}
function $JSCompiler_StaticMethods_setAutoStates$$($JSCompiler_StaticMethods_setAutoStates$self$$, $states$$, $enable$$10$$) {
  $JSCompiler_StaticMethods_setAutoStates$self$$.$autoStates_$ = $enable$$10$$ ? $JSCompiler_StaticMethods_setAutoStates$self$$.$autoStates_$ | $states$$ : $JSCompiler_StaticMethods_setAutoStates$self$$.$autoStates_$ & ~$states$$
}
function $JSCompiler_StaticMethods_isTransitionAllowed$$($JSCompiler_StaticMethods_isTransitionAllowed$self$$, $state$$15$$, $enable$$12$$) {
  return!!($JSCompiler_StaticMethods_isTransitionAllowed$self$$.$supportedStates_$ & $state$$15$$) && !!($JSCompiler_StaticMethods_isTransitionAllowed$self$$.$state_$ & $state$$15$$) != $enable$$12$$ && (!($JSCompiler_StaticMethods_isTransitionAllowed$self$$.$statesWithTransitionEvents_$ & $state$$15$$) || $JSCompiler_StaticMethods_isTransitionAllowed$self$$.dispatchEvent($goog$ui$Component$getStateTransitionEvent$$($state$$15$$, $enable$$12$$))) && !$JSCompiler_StaticMethods_isTransitionAllowed$self$$.$disposed_$
}
$JSCompiler_prototypeAlias$$.$handleMouseOver$ = function $$JSCompiler_prototypeAlias$$$$handleMouseOver$$($e$$25$$) {
  (!$e$$25$$.relatedTarget || !$goog$dom$contains$$(this.$getElement$(), $e$$25$$.relatedTarget)) && (this.dispatchEvent("enter") && this.isEnabled() && $JSCompiler_StaticMethods_isAutoState$$(this, 2)) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$)
};
$JSCompiler_prototypeAlias$$.$handleMouseOut$ = function $$JSCompiler_prototypeAlias$$$$handleMouseOut$$($e$$26$$) {
  if((!$e$$26$$.relatedTarget || !$goog$dom$contains$$(this.$getElement$(), $e$$26$$.relatedTarget)) && this.dispatchEvent("leave")) {
    $JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_FALSE$$)
  }
};
$JSCompiler_prototypeAlias$$.$handleMouseDown$ = function $$JSCompiler_prototypeAlias$$$$handleMouseDown$$($e$$28$$) {
  this.isEnabled() && ($JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods_isMouseActionButton$$($e$$28$$) && ($JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_TRUE$$), this.$renderer_$.$isFocusable$(this) && this.$getKeyEventTarget$().focus()));
  !this.$allowTextSelection_$ && $JSCompiler_StaticMethods_isMouseActionButton$$($e$$28$$) && $e$$28$$.preventDefault()
};
$JSCompiler_prototypeAlias$$.$handleMouseUp$ = function $$JSCompiler_prototypeAlias$$$$handleMouseUp$$($e$$29$$) {
  this.isEnabled() && ($JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$), this.$state_$ & 4 && (this.$performActionInternal$($e$$29$$) && $JSCompiler_StaticMethods_isAutoState$$(this, 4)) && this.setActive($JSCompiler_alias_FALSE$$))
};
$JSCompiler_prototypeAlias$$.$handleDblClick$ = function $$JSCompiler_prototypeAlias$$$$handleDblClick$$($e$$30$$) {
  this.isEnabled() && this.$performActionInternal$($e$$30$$)
};
$JSCompiler_prototypeAlias$$.$performActionInternal$ = function $$JSCompiler_prototypeAlias$$$$performActionInternal$$($e$$31$$) {
  $JSCompiler_StaticMethods_isAutoState$$(this, 16) && $JSCompiler_StaticMethods_setChecked$$(this, !(this.$state_$ & 16));
  $JSCompiler_StaticMethods_isAutoState$$(this, 8) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 8, $JSCompiler_alias_TRUE$$) && this.$setState$(8, $JSCompiler_alias_TRUE$$);
  if($JSCompiler_StaticMethods_isAutoState$$(this, 64)) {
    var $actionEvent_open$$inline_281$$ = !(this.$state_$ & 64);
    $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 64, $actionEvent_open$$inline_281$$) && this.$setState$(64, $actionEvent_open$$inline_281$$)
  }
  $actionEvent_open$$inline_281$$ = new $goog$events$Event$$("action", this);
  $e$$31$$ && ($actionEvent_open$$inline_281$$.altKey = $e$$31$$.altKey, $actionEvent_open$$inline_281$$.ctrlKey = $e$$31$$.ctrlKey, $actionEvent_open$$inline_281$$.metaKey = $e$$31$$.metaKey, $actionEvent_open$$inline_281$$.shiftKey = $e$$31$$.shiftKey, $actionEvent_open$$inline_281$$.$platformModifierKey$ = $e$$31$$.$platformModifierKey$);
  return this.dispatchEvent($actionEvent_open$$inline_281$$)
};
$JSCompiler_prototypeAlias$$.$handleFocus$ = function $$JSCompiler_prototypeAlias$$$$handleFocus$$() {
  $JSCompiler_StaticMethods_isAutoState$$(this, 32) && $JSCompiler_StaticMethods_setFocused$$(this, $JSCompiler_alias_TRUE$$)
};
$JSCompiler_prototypeAlias$$.$handleBlur$ = function $$JSCompiler_prototypeAlias$$$$handleBlur$$() {
  $JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_isAutoState$$(this, 32) && $JSCompiler_StaticMethods_setFocused$$(this, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$handleKeyEvent$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEvent$$($e$$34$$) {
  return this.$isVisible$() && this.isEnabled() && this.$handleKeyEventInternal$($e$$34$$) ? ($e$$34$$.preventDefault(), $e$$34$$.stopPropagation(), $JSCompiler_alias_TRUE$$) : $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$handleKeyEventInternal$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEventInternal$$($e$$35$$) {
  return 13 == $e$$35$$.keyCode && this.$performActionInternal$($e$$35$$)
};
$goog$isFunction$$($goog$ui$Control$$) || $JSCompiler_alias_THROW$$(Error("Invalid component class " + $goog$ui$Control$$));
$goog$isFunction$$($goog$ui$ControlRenderer$$) || $JSCompiler_alias_THROW$$(Error("Invalid renderer class " + $goog$ui$ControlRenderer$$));
var $key$$inline_285$$ = $goog$getUid$$($goog$ui$Control$$);
$goog$ui$registry$defaultRenderers_$$[$key$$inline_285$$] = $goog$ui$ControlRenderer$$;
$goog$ui$registry$setDecoratorByClassName$$("goog-control", function() {
  return new $goog$ui$Control$$($JSCompiler_alias_NULL$$)
});
function $goog$ui$ButtonRenderer$$() {
}
$goog$inherits$$($goog$ui$ButtonRenderer$$, $goog$ui$ControlRenderer$$);
$goog$addSingletonGetter$$($goog$ui$ButtonRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$ButtonRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_returnArg$$("button");
$JSCompiler_prototypeAlias$$.$updateAriaState$ = function $$JSCompiler_prototypeAlias$$$$updateAriaState$$($element$$98$$, $state$$16$$, $enable$$13$$) {
  16 == $state$$16$$ ? $element$$98$$.setAttribute("aria-pressed", $enable$$13$$) : $goog$ui$ButtonRenderer$$.$superClass_$.$updateAriaState$.call(this, $element$$98$$, $state$$16$$, $enable$$13$$)
};
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($button$$1$$) {
  var $element$$99$$ = $goog$ui$ButtonRenderer$$.$superClass_$.$createDom$.call(this, $button$$1$$), $tooltip_value$$65$$ = $button$$1$$.$getTooltip$();
  $tooltip_value$$65$$ && this.$setTooltip$($element$$99$$, $tooltip_value$$65$$);
  ($tooltip_value$$65$$ = $button$$1$$.$getValue$()) && this.$setValue$($element$$99$$, $tooltip_value$$65$$);
  $button$$1$$.$supportedStates_$ & 16 && this.$updateAriaState$($element$$99$$, 16, !!($button$$1$$.$state_$ & 16));
  return $element$$99$$
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($button$$2$$, $element$$100$$) {
  var $element$$100$$ = $goog$ui$ButtonRenderer$$.$superClass_$.$decorate$.call(this, $button$$2$$, $element$$100$$), $value$$inline_292$$ = this.$getValue$($element$$100$$);
  $button$$2$$.$value_$ = $value$$inline_292$$;
  $button$$2$$.$tooltip_$ = this.$getTooltip$($element$$100$$);
  $button$$2$$.$supportedStates_$ & 16 && this.$updateAriaState$($element$$100$$, 16, !!($button$$2$$.$state_$ & 16));
  return $element$$100$$
};
$JSCompiler_prototypeAlias$$.$getValue$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$setValue$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$getTooltip$ = function $$JSCompiler_prototypeAlias$$$$getTooltip$$($element$$101$$) {
  return $element$$101$$.title
};
$JSCompiler_prototypeAlias$$.$setTooltip$ = function $$JSCompiler_prototypeAlias$$$$setTooltip$$($element$$102$$, $tooltip$$1$$) {
  $element$$102$$ && ($element$$102$$.title = $tooltip$$1$$ || "")
};
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-button");
function $goog$ui$NativeButtonRenderer$$() {
}
$goog$inherits$$($goog$ui$NativeButtonRenderer$$, $goog$ui$ButtonRenderer$$);
$goog$addSingletonGetter$$($goog$ui$NativeButtonRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$NativeButtonRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$getAriaRole$ = function $$JSCompiler_prototypeAlias$$$$getAriaRole$$() {
};
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($button$$4$$) {
  $JSCompiler_StaticMethods_setUpNativeButton_$$($button$$4$$);
  return $button$$4$$.$getDomHelper$().$createDom$("button", {"class":$JSCompiler_StaticMethods_getClassNames$$(this, $button$$4$$).join(" "), disabled:!$button$$4$$.isEnabled(), title:$button$$4$$.$getTooltip$() || "", value:$button$$4$$.$getValue$() || ""}, $JSCompiler_StaticMethods_getCaption$$($button$$4$$) || "")
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$103$$) {
  return"BUTTON" == $element$$103$$.tagName || "INPUT" == $element$$103$$.tagName && ("button" == $element$$103$$.type || "submit" == $element$$103$$.type || "reset" == $element$$103$$.type)
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($button$$5$$, $element$$104$$) {
  $JSCompiler_StaticMethods_setUpNativeButton_$$($button$$5$$);
  $element$$104$$.disabled && $goog$dom$classes$add$$($element$$104$$, $JSCompiler_StaticMethods_getClassForState$$(this, 1));
  return $goog$ui$NativeButtonRenderer$$.$superClass_$.$decorate$.call(this, $button$$5$$, $element$$104$$)
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
$JSCompiler_prototypeAlias$$.$setState$ = function $$JSCompiler_prototypeAlias$$$$setState$$($button$$8_element$$105$$, $state$$17$$, $enable$$14$$) {
  $goog$ui$NativeButtonRenderer$$.$superClass_$.$setState$.call(this, $button$$8_element$$105$$, $state$$17$$, $enable$$14$$);
  if(($button$$8_element$$105$$ = $button$$8_element$$105$$.$getElement$()) && 1 == $state$$17$$) {
    $button$$8_element$$105$$.disabled = $enable$$14$$
  }
};
$JSCompiler_prototypeAlias$$.$getValue$ = function $$JSCompiler_prototypeAlias$$$$getValue$$($element$$106$$) {
  return $element$$106$$.value
};
$JSCompiler_prototypeAlias$$.$setValue$ = function $$JSCompiler_prototypeAlias$$$$setValue$$($element$$107$$, $value$$66$$) {
  $element$$107$$ && ($element$$107$$.value = $value$$66$$)
};
$JSCompiler_prototypeAlias$$.$updateAriaState$ = $goog$nullFunction$$;
function $JSCompiler_StaticMethods_setUpNativeButton_$$($button$$9$$) {
  $button$$9$$.$inDocument_$ && $JSCompiler_alias_FALSE$$ != $button$$9$$.$handleMouseEvents_$ && $JSCompiler_StaticMethods_enableMouseEventHandling_$$($button$$9$$, $JSCompiler_alias_FALSE$$);
  $button$$9$$.$handleMouseEvents_$ = $JSCompiler_alias_FALSE$$;
  $JSCompiler_StaticMethods_setAutoStates$$($button$$9$$, 255, $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_setSupportedState$$($button$$9$$, 32, $JSCompiler_alias_FALSE$$)
}
;function $goog$ui$Button$$($content$$7$$, $opt_renderer$$1$$, $opt_domHelper$$2$$) {
  $goog$ui$Control$$.call(this, $content$$7$$, $opt_renderer$$1$$ || $goog$ui$NativeButtonRenderer$$.$getInstance$(), $opt_domHelper$$2$$)
}
$goog$inherits$$($goog$ui$Button$$, $goog$ui$Control$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$Button$$.prototype;
$JSCompiler_prototypeAlias$$.$getValue$ = $JSCompiler_get$$("$value_$");
$JSCompiler_prototypeAlias$$.$setValue$ = function $$JSCompiler_prototypeAlias$$$$setValue$$($value$$67$$) {
  this.$value_$ = $value$$67$$;
  this.$renderer_$.$setValue$(this.$getElement$(), $value$$67$$)
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
$JSCompiler_prototypeAlias$$.$handleKeyEventInternal$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEventInternal$$($e$$36$$) {
  return 13 == $e$$36$$.keyCode && "key" == $e$$36$$.type || 32 == $e$$36$$.keyCode && "keyup" == $e$$36$$.type ? this.$performActionInternal$($e$$36$$) : 32 == $e$$36$$.keyCode
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
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$108$$) {
  return"DIV" == $element$$108$$.tagName
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($button$$11$$, $element$$109$$) {
  $goog$dom$classes$add$$($element$$109$$, "goog-inline-block");
  return $goog$ui$FlatButtonRenderer$$.$superClass_$.$decorate$.call(this, $button$$11$$, $element$$109$$)
};
$JSCompiler_prototypeAlias$$.$getValue$ = $JSCompiler_returnArg$$($JSCompiler_alias_NULL$$);
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-flat-button");
$goog$ui$registry$setDecoratorByClassName$$("goog-flat-button", function() {
  return new $goog$ui$Button$$($JSCompiler_alias_NULL$$, $goog$ui$FlatButtonRenderer$$.$getInstance$())
});
function $goog$ui$CustomButtonRenderer$$() {
}
$goog$inherits$$($goog$ui$CustomButtonRenderer$$, $goog$ui$ButtonRenderer$$);
$goog$addSingletonGetter$$($goog$ui$CustomButtonRenderer$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$CustomButtonRenderer$$.prototype;
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$($button$$12$$) {
  var $attributes$$2_buttonElement$$ = {"class":"goog-inline-block " + $JSCompiler_StaticMethods_getClassNames$$(this, $button$$12$$).join(" "), title:$button$$12$$.$getTooltip$() || ""}, $attributes$$2_buttonElement$$ = $button$$12$$.$getDomHelper$().$createDom$("div", $attributes$$2_buttonElement$$, $JSCompiler_StaticMethods_createButton$$(this, $button$$12$$.$content_$, $button$$12$$.$getDomHelper$()));
  this.$setAriaStates$($button$$12$$, $attributes$$2_buttonElement$$);
  return $attributes$$2_buttonElement$$
};
$JSCompiler_prototypeAlias$$.$getAriaRole$ = $JSCompiler_returnArg$$("button");
$JSCompiler_prototypeAlias$$.$setAriaStates$ = function $$JSCompiler_prototypeAlias$$$$setAriaStates$$($button$$13$$, $element$$112$$) {
  $goog$asserts$assert$$($button$$13$$);
  $goog$asserts$assert$$($element$$112$$);
  $button$$13$$.isEnabled() || this.$updateAriaState$($element$$112$$, 1, $JSCompiler_alias_TRUE$$);
  $button$$13$$.$state_$ & 8 && this.$updateAriaState$($element$$112$$, 8, $JSCompiler_alias_TRUE$$);
  $button$$13$$.$supportedStates_$ & 16 && this.$updateAriaState$($element$$112$$, 16, $JSCompiler_alias_TRUE$$);
  $button$$13$$.$state_$ & 64 && this.$updateAriaState$($element$$112$$, 64, $JSCompiler_alias_TRUE$$)
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$($element$$113$$) {
  return $element$$113$$ && $element$$113$$.firstChild.firstChild
};
function $JSCompiler_StaticMethods_createButton$$($JSCompiler_StaticMethods_createButton$self$$, $content$$9$$, $dom$$1$$) {
  return $dom$$1$$.$createDom$("div", "goog-inline-block " + ($JSCompiler_StaticMethods_createButton$self$$.$getCssClass$() + "-outer-box"), $dom$$1$$.$createDom$("div", "goog-inline-block " + ($JSCompiler_StaticMethods_createButton$self$$.$getCssClass$() + "-inner-box"), $content$$9$$))
}
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$114$$) {
  return"DIV" == $element$$114$$.tagName
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($button$$15$$, $element$$116$$) {
  $goog$ui$CustomButtonRenderer$trimTextNodes_$$($element$$116$$, $JSCompiler_alias_TRUE$$);
  $goog$ui$CustomButtonRenderer$trimTextNodes_$$($element$$116$$, $JSCompiler_alias_FALSE$$);
  var $JSCompiler_inline_result$$300_inner$$inline_305_outer$$inline_304$$;
  a: {
    if(($JSCompiler_inline_result$$300_inner$$inline_305_outer$$inline_304$$ = $JSCompiler_StaticMethods_getFirstElementChild$$($button$$15$$.$getDomHelper$(), $element$$116$$)) && -1 != $JSCompiler_inline_result$$300_inner$$inline_305_outer$$inline_304$$.className.indexOf(this.$getCssClass$() + "-outer-box")) {
      if(($JSCompiler_inline_result$$300_inner$$inline_305_outer$$inline_304$$ = $JSCompiler_StaticMethods_getFirstElementChild$$($button$$15$$.$getDomHelper$(), $JSCompiler_inline_result$$300_inner$$inline_305_outer$$inline_304$$)) && -1 != $JSCompiler_inline_result$$300_inner$$inline_305_outer$$inline_304$$.className.indexOf(this.$getCssClass$() + "-inner-box")) {
        $JSCompiler_inline_result$$300_inner$$inline_305_outer$$inline_304$$ = $JSCompiler_alias_TRUE$$;
        break a
      }
    }
    $JSCompiler_inline_result$$300_inner$$inline_305_outer$$inline_304$$ = $JSCompiler_alias_FALSE$$
  }
  $JSCompiler_inline_result$$300_inner$$inline_305_outer$$inline_304$$ || $element$$116$$.appendChild($JSCompiler_StaticMethods_createButton$$(this, $element$$116$$.childNodes, $button$$15$$.$getDomHelper$()));
  $goog$dom$classes$add$$($element$$116$$, "goog-inline-block", this.$getCssClass$());
  return $goog$ui$CustomButtonRenderer$$.$superClass_$.$decorate$.call(this, $button$$15$$, $element$$116$$)
};
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-custom-button");
function $goog$ui$CustomButtonRenderer$trimTextNodes_$$($element$$117$$, $fromStart$$) {
  if($element$$117$$) {
    for(var $node$$23$$ = $fromStart$$ ? $element$$117$$.firstChild : $element$$117$$.lastChild, $next$$;$node$$23$$ && $node$$23$$.parentNode == $element$$117$$;) {
      $next$$ = $fromStart$$ ? $node$$23$$.nextSibling : $node$$23$$.previousSibling;
      if(3 == $node$$23$$.nodeType) {
        var $text$$10$$ = $node$$23$$.nodeValue;
        if("" == $goog$string$trim$$($text$$10$$)) {
          $element$$117$$.removeChild($node$$23$$)
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
;function $goog$ui$ToggleButton$$($content$$10$$, $opt_renderer$$3$$, $opt_domHelper$$4$$) {
  $goog$ui$Button$$.call(this, $content$$10$$, $opt_renderer$$3$$ || $goog$ui$CustomButtonRenderer$$.$getInstance$(), $opt_domHelper$$4$$);
  $JSCompiler_StaticMethods_setSupportedState$$(this, 16, $JSCompiler_alias_TRUE$$)
}
$goog$inherits$$($goog$ui$ToggleButton$$, $goog$ui$Button$$);
$goog$ui$registry$setDecoratorByClassName$$("goog-toggle-button", function() {
  return new $goog$ui$ToggleButton$$($JSCompiler_alias_NULL$$)
});
function $goog$i18n$TimeZone$$() {
}
function $goog$i18n$TimeZone$createTimeZone$$($offset$$inline_893_str$$inline_310_timeZoneData$$) {
  if("number" == typeof $offset$$inline_893_str$$inline_310_timeZoneData$$) {
    var $tz$$1_tz$$inline_309$$ = new $goog$i18n$TimeZone$$;
    $tz$$1_tz$$inline_309$$.$standardOffset_$ = $offset$$inline_893_str$$inline_310_timeZoneData$$;
    var $JSCompiler_inline_result$$889_offset$$inline_890_parts$$inline_894$$;
    $JSCompiler_inline_result$$889_offset$$inline_890_parts$$inline_894$$ = $offset$$inline_893_str$$inline_310_timeZoneData$$;
    if(0 == $JSCompiler_inline_result$$889_offset$$inline_890_parts$$inline_894$$) {
      $JSCompiler_inline_result$$889_offset$$inline_890_parts$$inline_894$$ = "Etc/GMT"
    }else {
      var $parts$$inline_891$$ = ["Etc/GMT", 0 > $JSCompiler_inline_result$$889_offset$$inline_890_parts$$inline_894$$ ? "-" : "+"];
      $JSCompiler_inline_result$$889_offset$$inline_890_parts$$inline_894$$ = Math.abs($JSCompiler_inline_result$$889_offset$$inline_890_parts$$inline_894$$);
      $parts$$inline_891$$.push(Math.floor($JSCompiler_inline_result$$889_offset$$inline_890_parts$$inline_894$$ / 60) % 100);
      $JSCompiler_inline_result$$889_offset$$inline_890_parts$$inline_894$$ %= 60;
      0 != $JSCompiler_inline_result$$889_offset$$inline_890_parts$$inline_894$$ && $parts$$inline_891$$.push(":", $goog$string$padNumber$$($JSCompiler_inline_result$$889_offset$$inline_890_parts$$inline_894$$, 2));
      $JSCompiler_inline_result$$889_offset$$inline_890_parts$$inline_894$$ = $parts$$inline_891$$.join("")
    }
    $tz$$1_tz$$inline_309$$.$timeZoneId_$ = $JSCompiler_inline_result$$889_offset$$inline_890_parts$$inline_894$$;
    0 == $offset$$inline_893_str$$inline_310_timeZoneData$$ ? $offset$$inline_893_str$$inline_310_timeZoneData$$ = "UTC" : ($JSCompiler_inline_result$$889_offset$$inline_890_parts$$inline_894$$ = ["UTC", 0 > $offset$$inline_893_str$$inline_310_timeZoneData$$ ? "+" : "-"], $offset$$inline_893_str$$inline_310_timeZoneData$$ = Math.abs($offset$$inline_893_str$$inline_310_timeZoneData$$), $JSCompiler_inline_result$$889_offset$$inline_890_parts$$inline_894$$.push(Math.floor($offset$$inline_893_str$$inline_310_timeZoneData$$ / 
    60) % 100), $offset$$inline_893_str$$inline_310_timeZoneData$$ %= 60, 0 != $offset$$inline_893_str$$inline_310_timeZoneData$$ && $JSCompiler_inline_result$$889_offset$$inline_890_parts$$inline_894$$.push(":", $offset$$inline_893_str$$inline_310_timeZoneData$$), $offset$$inline_893_str$$inline_310_timeZoneData$$ = $JSCompiler_inline_result$$889_offset$$inline_890_parts$$inline_894$$.join(""));
    $tz$$1_tz$$inline_309$$.$tzNames_$ = [$offset$$inline_893_str$$inline_310_timeZoneData$$, $offset$$inline_893_str$$inline_310_timeZoneData$$];
    $tz$$1_tz$$inline_309$$.$transitions_$ = [];
    return $tz$$1_tz$$inline_309$$
  }
  $tz$$1_tz$$inline_309$$ = new $goog$i18n$TimeZone$$;
  $tz$$1_tz$$inline_309$$.$timeZoneId_$ = $offset$$inline_893_str$$inline_310_timeZoneData$$.id;
  $tz$$1_tz$$inline_309$$.$standardOffset_$ = -$offset$$inline_893_str$$inline_310_timeZoneData$$.std_offset;
  $tz$$1_tz$$inline_309$$.$tzNames_$ = $offset$$inline_893_str$$inline_310_timeZoneData$$.names;
  $tz$$1_tz$$inline_309$$.$transitions_$ = $offset$$inline_893_str$$inline_310_timeZoneData$$.transitions;
  return $tz$$1_tz$$inline_309$$
}
function $JSCompiler_StaticMethods_getDaylightAdjustment$$($JSCompiler_StaticMethods_getDaylightAdjustment$self$$, $date$$13$$) {
  for(var $timeInHours$$ = Date.UTC($date$$13$$.getUTCFullYear(), $date$$13$$.getUTCMonth(), $date$$13$$.getUTCDate(), $date$$13$$.getUTCHours(), $date$$13$$.getUTCMinutes()) / 36E5, $index$$58$$ = 0;$index$$58$$ < $JSCompiler_StaticMethods_getDaylightAdjustment$self$$.$transitions_$.length && $timeInHours$$ >= $JSCompiler_StaticMethods_getDaylightAdjustment$self$$.$transitions_$[$index$$58$$];) {
    $index$$58$$ += 2
  }
  return 0 == $index$$58$$ ? 0 : $JSCompiler_StaticMethods_getDaylightAdjustment$self$$.$transitions_$[$index$$58$$ - 1]
}
;function $goog$i18n$DateTimeFormat$$($pattern$$1$$) {
  $goog$asserts$assert$$($goog$isDef$$($pattern$$1$$), "Pattern must be defined");
  this.$patternParts_$ = [];
  "number" == typeof $pattern$$1$$ ? $JSCompiler_StaticMethods_applyStandardPattern_$$(this, $pattern$$1$$) : $JSCompiler_StaticMethods_applyPattern_$$(this, $pattern$$1$$)
}
var $goog$i18n$DateTimeFormat$TOKENS_$$ = [/^\'(?:[^\']|\'\')*\'/, /^(?:G+|y+|M+|k+|S+|E+|a+|h+|K+|H+|c+|L+|Q+|d+|m+|s+|v+|z+|Z+)/, /^[^\'GyMkSEahKHcLQdmsvzZ]+/];
function $JSCompiler_StaticMethods_applyPattern_$$($JSCompiler_StaticMethods_applyPattern_$self$$, $pattern$$2$$) {
  for(;$pattern$$2$$;) {
    for(var $i$$73$$ = 0;$i$$73$$ < $goog$i18n$DateTimeFormat$TOKENS_$$.length;++$i$$73$$) {
      var $m$$2_part$$2$$ = $pattern$$2$$.match($goog$i18n$DateTimeFormat$TOKENS_$$[$i$$73$$]);
      if($m$$2_part$$2$$) {
        $m$$2_part$$2$$ = $m$$2_part$$2$$[0];
        $pattern$$2$$ = $pattern$$2$$.substring($m$$2_part$$2$$.length);
        0 == $i$$73$$ && ("''" == $m$$2_part$$2$$ ? $m$$2_part$$2$$ = "'" : ($m$$2_part$$2$$ = $m$$2_part$$2$$.substring(1, $m$$2_part$$2$$.length - 1), $m$$2_part$$2$$ = $m$$2_part$$2$$.replace(/\'\'/, "'")));
        $JSCompiler_StaticMethods_applyPattern_$self$$.$patternParts_$.push({text:$m$$2_part$$2$$, type:$i$$73$$});
        break
      }
    }
  }
}
function $JSCompiler_StaticMethods_format$$($JSCompiler_StaticMethods_format$self$$, $date$$20$$) {
  for(var $out$$ = [], $i$$74$$ = 0;$i$$74$$ < $JSCompiler_StaticMethods_format$self$$.$patternParts_$.length;++$i$$74$$) {
    var $text$$11$$ = $JSCompiler_StaticMethods_format$self$$.$patternParts_$[$i$$74$$].text;
    1 == $JSCompiler_StaticMethods_format$self$$.$patternParts_$[$i$$74$$].type ? $out$$.push($JSCompiler_StaticMethods_formatField_$$($text$$11$$, $date$$20$$, $date$$20$$, $date$$20$$)) : $out$$.push($text$$11$$)
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
function $JSCompiler_StaticMethods_formatMonth_$$($count$$11$$, $date$$23$$) {
  var $value$$71$$ = $date$$23$$.getMonth();
  switch($count$$11$$) {
    case 5:
      return $goog$i18n$DateTimeSymbols_en$$.$NARROWMONTHS$[$value$$71$$];
    case 4:
      return $goog$i18n$DateTimeSymbols_en$$.$MONTHS$[$value$$71$$];
    case 3:
      return $goog$i18n$DateTimeSymbols_en$$.$SHORTMONTHS$[$value$$71$$];
    default:
      return $goog$string$padNumber$$($value$$71$$ + 1, $count$$11$$)
  }
}
function $JSCompiler_StaticMethods_formatStandaloneDay_$$($count$$19$$, $date$$31$$) {
  var $value$$74$$ = $date$$31$$.getDay();
  switch($count$$19$$) {
    case 5:
      return $goog$i18n$DateTimeSymbols_en$$.$STANDALONENARROWWEEKDAYS$[$value$$74$$];
    case 4:
      return $goog$i18n$DateTimeSymbols_en$$.$STANDALONEWEEKDAYS$[$value$$74$$];
    case 3:
      return $goog$i18n$DateTimeSymbols_en$$.$STANDALONESHORTWEEKDAYS$[$value$$74$$];
    default:
      return $goog$string$padNumber$$($value$$74$$, 1)
  }
}
function $JSCompiler_StaticMethods_formatStandaloneMonth_$$($count$$20$$, $date$$32$$) {
  var $value$$75$$ = $date$$32$$.getMonth();
  switch($count$$20$$) {
    case 5:
      return $goog$i18n$DateTimeSymbols_en$$.$STANDALONENARROWMONTHS$[$value$$75$$];
    case 4:
      return $goog$i18n$DateTimeSymbols_en$$.$STANDALONEMONTHS$[$value$$75$$];
    case 3:
      return $goog$i18n$DateTimeSymbols_en$$.$STANDALONESHORTMONTHS$[$value$$75$$];
    default:
      return $goog$string$padNumber$$($value$$75$$ + 1, $count$$20$$)
  }
}
function $JSCompiler_StaticMethods_formatField_$$($opt_timeZone$$inline_343_opt_timeZone$$inline_348_patternStr$$, $date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$, $dateForDate$$1$$, $dateForTime$$1$$) {
  var $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ = $opt_timeZone$$inline_343_opt_timeZone$$inline_348_patternStr$$.length;
  switch($opt_timeZone$$inline_343_opt_timeZone$$inline_348_patternStr$$.charAt(0)) {
    case "G":
      return $date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$ = 0 < $dateForDate$$1$$.getFullYear() ? 1 : 0, 4 <= $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ ? $goog$i18n$DateTimeSymbols_en$$.$ERANAMES$[$date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$] : $goog$i18n$DateTimeSymbols_en$$.$ERAS$[$date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$];
    case "y":
      return $date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$ = $dateForDate$$1$$.getFullYear(), 0 > $date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$ && ($date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$ = -$date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$), 
      2 == $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ ? $goog$string$padNumber$$($date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$ % 100, 2) : "" + $date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$;
    case "M":
      return $JSCompiler_StaticMethods_formatMonth_$$($JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$, $dateForDate$$1$$);
    case "k":
      return $goog$string$padNumber$$($dateForTime$$1$$.getHours() || 24, $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$);
    case "S":
      return($dateForTime$$1$$.getTime() % 1E3 / 1E3).toFixed(Math.min(3, $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$)).substr(2) + (3 < $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ ? $goog$string$padNumber$$(0, $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ - 3) : "");
    case "E":
      return $date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$ = $dateForDate$$1$$.getDay(), 4 <= $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ ? $goog$i18n$DateTimeSymbols_en$$.$WEEKDAYS$[$date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$] : $goog$i18n$DateTimeSymbols_en$$.$SHORTWEEKDAYS$[$date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$];
    case "a":
      return $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ = $dateForTime$$1$$.getHours(), $goog$i18n$DateTimeSymbols_en$$.$AMPMS$[12 <= $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ && 24 > $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ ? 1 : 0];
    case "h":
      return $goog$string$padNumber$$($dateForTime$$1$$.getHours() % 12 || 12, $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$);
    case "K":
      return $goog$string$padNumber$$($dateForTime$$1$$.getHours() % 12, $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$);
    case "H":
      return $goog$string$padNumber$$($dateForTime$$1$$.getHours(), $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$);
    case "c":
      return $JSCompiler_StaticMethods_formatStandaloneDay_$$($JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$, $dateForDate$$1$$);
    case "L":
      return $JSCompiler_StaticMethods_formatStandaloneMonth_$$($JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$, $dateForDate$$1$$);
    case "Q":
      return $date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$ = Math.floor($dateForDate$$1$$.getMonth() / 3), 4 > $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ ? $goog$i18n$DateTimeSymbols_en$$.$SHORTQUARTERS$[$date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$] : $goog$i18n$DateTimeSymbols_en$$.$QUARTERS$[$date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$];
    case "d":
      return $goog$string$padNumber$$($dateForDate$$1$$.getDate(), $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$);
    case "m":
      return $goog$string$padNumber$$($dateForTime$$1$$.getMinutes(), $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$);
    case "s":
      return $goog$string$padNumber$$($dateForTime$$1$$.getSeconds(), $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$);
    case "v":
      return $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ = $JSCompiler_alias_VOID$$ || $goog$i18n$TimeZone$createTimeZone$$($date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$.getTimezoneOffset()), $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$.$timeZoneId_$;
    case "z":
      return $opt_timeZone$$inline_343_opt_timeZone$$inline_348_patternStr$$ = $JSCompiler_alias_VOID$$ || $goog$i18n$TimeZone$createTimeZone$$($date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$.getTimezoneOffset()), 4 > $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ ? $opt_timeZone$$inline_343_opt_timeZone$$inline_348_patternStr$$.$tzNames_$[0 < $JSCompiler_StaticMethods_getDaylightAdjustment$$($opt_timeZone$$inline_343_opt_timeZone$$inline_348_patternStr$$, 
      $date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$) ? 2 : 0] : $opt_timeZone$$inline_343_opt_timeZone$$inline_348_patternStr$$.$tzNames_$[0 < $JSCompiler_StaticMethods_getDaylightAdjustment$$($opt_timeZone$$inline_343_opt_timeZone$$inline_348_patternStr$$, $date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$) ? 3 : 1];
    case "Z":
      return $opt_timeZone$$inline_343_opt_timeZone$$inline_348_patternStr$$ = $JSCompiler_alias_VOID$$ || $goog$i18n$TimeZone$createTimeZone$$($date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$.getTimezoneOffset()), 4 > $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ ? ($JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ = 
      -($opt_timeZone$$inline_343_opt_timeZone$$inline_348_patternStr$$.$standardOffset_$ - $JSCompiler_StaticMethods_getDaylightAdjustment$$($opt_timeZone$$inline_343_opt_timeZone$$inline_348_patternStr$$, $date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$)), $date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$ = [0 > $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ ? 
      "-" : "+"], $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ = Math.abs($JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$), $date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$.push($goog$string$padNumber$$(Math.floor($JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ / 
      60) % 100, 2), $goog$string$padNumber$$($JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ % 60, 2))) : ($JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ = $opt_timeZone$$inline_343_opt_timeZone$$inline_348_patternStr$$.$standardOffset_$ - $JSCompiler_StaticMethods_getDaylightAdjustment$$($opt_timeZone$$inline_343_opt_timeZone$$inline_348_patternStr$$, $date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$), 
      $date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$ = ["GMT"], $date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$.push(0 >= $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ ? "+" : "-"), $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ = 
      Math.abs($JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$), $date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$.push($goog$string$padNumber$$(Math.floor($JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ / 60) % 100, 2), ":", $goog$string$padNumber$$($JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ % 
      60, 2))), $JSCompiler_temp$$843_count$$27_hours$$inline_329_offset$$inline_1145_offset$$inline_898_opt_timeZone$$inline_338$$ = $date$$40_parts$$inline_1146_parts$$inline_899_value$$inline_315_value$$inline_320_value$$inline_325_value$$inline_334$$.join("");
    default:
      return""
  }
}
;var $goog$userAgent$jscript$DETECTED_HAS_JSCRIPT_$$;
($goog$userAgent$jscript$DETECTED_HAS_JSCRIPT_$$ = "ScriptEngine" in $goog$global$$ && "JScript" == $goog$global$$.ScriptEngine()) && ($goog$global$$.ScriptEngineMajorVersion(), $goog$global$$.ScriptEngineMinorVersion(), $goog$global$$.ScriptEngineBuildVersion());
function $goog$string$StringBuffer$$($opt_a1$$, $var_args$$57$$) {
  this.$buffer_$ = $goog$userAgent$jscript$DETECTED_HAS_JSCRIPT_$$ ? [] : "";
  $opt_a1$$ != $JSCompiler_alias_NULL$$ && this.append.apply(this, arguments)
}
$goog$string$StringBuffer$$.prototype.set = function $$goog$string$StringBuffer$$$$set$($s$$18$$) {
  this.clear();
  this.append($s$$18$$)
};
$goog$userAgent$jscript$DETECTED_HAS_JSCRIPT_$$ ? ($goog$string$StringBuffer$$.prototype.$bufferLength_$ = 0, $goog$string$StringBuffer$$.prototype.append = function $$goog$string$StringBuffer$$$$append$($a1$$, $opt_a2$$, $var_args$$58$$) {
  $opt_a2$$ == $JSCompiler_alias_NULL$$ ? this.$buffer_$[this.$bufferLength_$++] = $a1$$ : (this.$buffer_$.push.apply(this.$buffer_$, arguments), this.$bufferLength_$ = this.$buffer_$.length);
  return this
}) : $goog$string$StringBuffer$$.prototype.append = function $$goog$string$StringBuffer$$$$append$($a1$$1$$, $opt_a2$$1$$, $var_args$$59$$) {
  this.$buffer_$ += $a1$$1$$;
  if($opt_a2$$1$$ != $JSCompiler_alias_NULL$$) {
    for(var $i$$75$$ = 1;$i$$75$$ < arguments.length;$i$$75$$++) {
      this.$buffer_$ += arguments[$i$$75$$]
    }
  }
  return this
};
$goog$string$StringBuffer$$.prototype.clear = function $$goog$string$StringBuffer$$$$clear$() {
  if($goog$userAgent$jscript$DETECTED_HAS_JSCRIPT_$$) {
    this.$bufferLength_$ = this.$buffer_$.length = 0
  }else {
    this.$buffer_$ = ""
  }
};
$goog$string$StringBuffer$$.prototype.toString = function $$goog$string$StringBuffer$$$$toString$() {
  if($goog$userAgent$jscript$DETECTED_HAS_JSCRIPT_$$) {
    var $str$$48$$ = this.$buffer_$.join("");
    this.clear();
    $str$$48$$ && this.append($str$$48$$);
    return $str$$48$$
  }
  return this.$buffer_$
};
function $rflect$cal$Component$$($opt_domHelper$$5$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$5$$)
}
$goog$inherits$$($rflect$cal$Component$$, $goog$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $rflect$cal$Component$$.prototype;
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  this.$decorateInternal$(this.$dom_$.createElement("div"))
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($aElement$$, $opt_doNotBuildBody$$) {
  $rflect$cal$Component$$.$superClass_$.$decorateInternal$.call(this, $aElement$$);
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
$JSCompiler_prototypeAlias$$.$updateBeforeRedraw$ = function $$JSCompiler_prototypeAlias$$$$updateBeforeRedraw$$($var_args$$60$$) {
  var $args$$8$$ = arguments;
  $JSCompiler_StaticMethods_forEachChild$$(this, function($aChild$$, $aIndex$$1$$) {
    $args$$8$$.length && $goog$array$contains$$($args$$8$$, $aIndex$$1$$) || $aChild$$.$updateBeforeRedraw$()
  })
};
$JSCompiler_prototypeAlias$$.$updateByRedraw$ = function $$JSCompiler_prototypeAlias$$$$updateByRedraw$$($var_args$$61$$) {
  var $args$$9$$ = arguments;
  $JSCompiler_StaticMethods_forEachChild$$(this, function($aChild$$1$$, $aIndex$$2$$) {
    $aChild$$1$$.$inDocument_$ && ($aChild$$1$$.$getElement$() && (!$args$$9$$.length || !$goog$array$contains$$($args$$9$$, $aIndex$$2$$))) && $aChild$$1$$.$updateByRedraw$()
  })
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $rflect$cal$Component$$.$superClass_$.$disposeInternal$.call(this)
};
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
$goog$inherits$$($rflect$cal$TopPane$$, $rflect$cal$Component$$);
$rflect$cal$MainPane$$.prototype.$viewManager_$ = $JSCompiler_alias_NULL$$;
$rflect$cal$MainPane$$.prototype.$timeManager_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$ = $rflect$cal$TopPane$$.prototype;
$JSCompiler_prototypeAlias$$.$timeLabel_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  this.$decorateInternal$(this.$dom_$.createElement("div"))
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($aElement$$1$$, $opt_doNotBuildBody$$1$$) {
  $rflect$cal$TopPane$$.$superClass_$.$decorateInternal$.call(this, $aElement$$1$$, $opt_doNotBuildBody$$1$$)
};
$JSCompiler_prototypeAlias$$.$buildBodyInternal$ = function $$JSCompiler_prototypeAlias$$$$buildBodyInternal$$($aSb$$2$$) {
  for(var $parts$$11$$ = ['<div id="top-pane">', '<div id="sidebar-controls">', '<div id="nb1" class="goog-flat-button-collapse-right ', "cal-menu-leftmost-button goog-flat-button-bord-rad-collapse-right", ' cal-menu-button cal-menu-button-now">', $rflect$cal$i18n$Symbols$$.$NOW$, "</div>", '<div id="nb2" class="goog-flat-button-collapse-left ', "goog-flat-button-collapse-right goog-flat-button-bord-rad-collapse-both ", 'cal-menu-button cal-menu-button-back"><div class="button-sign button-sign-back goog-inline-block"></div></div>', 
  '<div id="nb3" class="goog-flat-button-collapse-left ', "cal-menu-rightmost-button goog-flat-button-bord-rad-collapse-left ", 'cal-menu-button cal-menu-button-forward"><div class="button-sign button-sign-forward goog-inline-block"></div></div></div>', '<div id="main-pane-controls"><div id="main-pane-controls-right">', '<div style="margin-right: 0px;" class="goog-inline-block">', '<div id="nb4" class="goog-flat-button-collapse-right goog-toggle-button ', 'goog-flat-button-bord-rad-collapse-right cal-menu-button">', 
  $rflect$cal$i18n$Symbols$$.$DAY$, "</div>", '<div id="nb5" class="goog-flat-button-collapse-left goog-toggle-button ', "goog-flat-button-collapse-right ", 'goog-flat-button-bord-rad-collapse-both cal-menu-button">', $rflect$cal$i18n$Symbols$$.$WEEK$, "</div>", '<div id="nb6" class="goog-flat-button goog-flat-button-collapse-left goog-toggle-button ', "goog-flat-button-bord-rad-collapse-left cal-menu-button ", 'cal-menu-button-month-view">', $rflect$cal$i18n$Symbols$$.$MONTH$, "</div></div>", '<div id="nb8" class="goog-flat-button cal-menu-rightmost-button cal-menu-button ', 
  'cal-menu-button-options">', '<div class="button-sign button-sign-options goog-inline-block"></div>', "</div></div>", '<div id="main-pane-controls-left"><div id="main-pane-controls-left-left">', '<div id="nb7" class="cal-menu-button cal-menu-button-new-event ', 'cal-menu-leftmost-button">', $rflect$cal$i18n$Symbols$$.$NEW_EVENT$, "</div></div>", '<div id="main-pane-controls-left-right">', '<div id="time-period-label">', $JSCompiler_StaticMethods_getDateHeader$$(this), "</div></div>", "</div></div>", 
  "</div>"], $counter$$10$$ = 1, $length$$27$$ = $parts$$11$$.length - 1;$counter$$10$$ < $length$$27$$;$counter$$10$$++) {
    $aSb$$2$$.append($parts$$11$$[$counter$$10$$])
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
function $JSCompiler_StaticMethods_getDateHeader$$($JSCompiler_StaticMethods_getDateHeader$self_formatStart$$) {
  var $header$$2_startDate$$2$$ = $JSCompiler_StaticMethods_getDateHeader$self_formatStart$$.$timeManager_$.$daySeries$[0], $endDate$$2$$ = $JSCompiler_StaticMethods_getDateHeader$self_formatStart$$.$timeManager_$.$daySeries$[$JSCompiler_StaticMethods_getDateHeader$self_formatStart$$.$timeManager_$.$daySeries$.length - 1], $basis_formatEnd_formatStringStart$$ = $JSCompiler_StaticMethods_getDateHeader$self_formatStart$$.$timeManager_$.$basis$;
  5 == $JSCompiler_StaticMethods_getDateHeader$self_formatStart$$.$viewManager_$.$currentView$ ? ($JSCompiler_StaticMethods_getDateHeader$self_formatStart$$ = new $goog$i18n$DateTimeFormat$$($goog$i18n$DateTimePatterns$$.$YEAR_MONTH_FULL$), $header$$2_startDate$$2$$ = $JSCompiler_StaticMethods_format$$($JSCompiler_StaticMethods_getDateHeader$self_formatStart$$, $basis_formatEnd_formatStringStart$$)) : $header$$2_startDate$$2$$.getFullYear() != $endDate$$2$$.getFullYear() ? ($basis_formatEnd_formatStringStart$$ = 
  $goog$i18n$DateTimePatterns$$.$MONTH_DAY_ABBR$, $JSCompiler_StaticMethods_getDateHeader$self_formatStart$$ = new $goog$i18n$DateTimeFormat$$($basis_formatEnd_formatStringStart$$ + ", yyyy -"), $basis_formatEnd_formatStringStart$$ = new $goog$i18n$DateTimeFormat$$(" " + $basis_formatEnd_formatStringStart$$ + ", yyyy"), $header$$2_startDate$$2$$ = $JSCompiler_StaticMethods_format$$($JSCompiler_StaticMethods_getDateHeader$self_formatStart$$, $header$$2_startDate$$2$$) + $JSCompiler_StaticMethods_format$$($basis_formatEnd_formatStringStart$$, 
  $endDate$$2$$)) : $header$$2_startDate$$2$$.getMonth() != $endDate$$2$$.getMonth() ? ($basis_formatEnd_formatStringStart$$ = $goog$i18n$DateTimePatterns$$.$MONTH_DAY_ABBR$, $JSCompiler_StaticMethods_getDateHeader$self_formatStart$$ = new $goog$i18n$DateTimeFormat$$($basis_formatEnd_formatStringStart$$ + " -"), $basis_formatEnd_formatStringStart$$ = new $goog$i18n$DateTimeFormat$$(" " + $basis_formatEnd_formatStringStart$$ + ", yyyy"), $header$$2_startDate$$2$$ = $JSCompiler_StaticMethods_format$$($JSCompiler_StaticMethods_getDateHeader$self_formatStart$$, 
  $header$$2_startDate$$2$$) + $JSCompiler_StaticMethods_format$$($basis_formatEnd_formatStringStart$$, $endDate$$2$$)) : $header$$2_startDate$$2$$.getDate() != $endDate$$2$$.getDate() ? ($basis_formatEnd_formatStringStart$$ = $goog$i18n$DateTimePatterns$$.$DAY_ABBR$, $JSCompiler_StaticMethods_getDateHeader$self_formatStart$$ = new $goog$i18n$DateTimeFormat$$($basis_formatEnd_formatStringStart$$ + " -"), $basis_formatEnd_formatStringStart$$ = new $goog$i18n$DateTimeFormat$$(" d MMM, yyyy"), $header$$2_startDate$$2$$ = 
  $JSCompiler_StaticMethods_format$$($JSCompiler_StaticMethods_getDateHeader$self_formatStart$$, $header$$2_startDate$$2$$) + $JSCompiler_StaticMethods_format$$($basis_formatEnd_formatStringStart$$, $endDate$$2$$)) : ($JSCompiler_StaticMethods_getDateHeader$self_formatStart$$ = new $goog$i18n$DateTimeFormat$$("EEEE, " + $goog$i18n$DateTimePatterns$$.$MONTH_DAY_FULL$ + ", yyyy"), $header$$2_startDate$$2$$ = $JSCompiler_StaticMethods_format$$($JSCompiler_StaticMethods_getDateHeader$self_formatStart$$, 
  $header$$2_startDate$$2$$));
  return $header$$2_startDate$$2$$
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
    var $button$$16$$ = $viewsToButtons$$[$view$$3$$];
    $JSCompiler_StaticMethods_updateButtons_$self$$.$viewManager_$.$currentView$ == $view$$3$$ ? ($JSCompiler_StaticMethods_setChecked$$($button$$16$$, $JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods_setFocused$$($button$$16$$, $JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_setAutoStates$$($button$$16$$, 16, $JSCompiler_alias_FALSE$$)) : ($JSCompiler_StaticMethods_setChecked$$($button$$16$$, $JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_setAutoStates$$($button$$16$$, 16, $JSCompiler_alias_TRUE$$))
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
  for(var $offset$$24$$ = 0, $length$$28$$ = $rflect$cal$MiniCalBuilder$HTML_PARTS_$$.length;++$offset$$24$$ < $length$$28$$ - 1;) {
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
        var $aSb$$inline_364_aSb$$inline_366$$ = $aSb$$3$$;
        $aSb$$inline_364_aSb$$inline_366$$.append(this.$timeManager_$.$basis$.getYear());
        $aSb$$inline_364_aSb$$inline_366$$.append("&nbsp;");
        $aSb$$inline_364_aSb$$inline_366$$.append($goog$i18n$DateTimeSymbols_en$$.$MONTHS$[this.$timeManager_$.$basis$.getMonth()]);
        break;
      case 8:
        for(var $aSb$$inline_364_aSb$$inline_366$$ = $aSb$$3$$, $aOffset$$inline_367$$ = $offset$$24$$, $dayNamesFirstNumber$$inline_368$$ = $goog$i18n$DateTimeSymbols_en$$.$FIRSTDAYOFWEEK$, $dayNameNumber$$inline_369$$ = 0, $counter$$inline_370$$ = 0;7 > $counter$$inline_370$$;$counter$$inline_370$$++) {
          0 < $counter$$inline_370$$ && $aSb$$inline_364_aSb$$inline_366$$.append($rflect$cal$MiniCalBuilder$HTML_PARTS_$$[$aOffset$$inline_367$$]), $dayNameNumber$$inline_369$$ = ($dayNamesFirstNumber$$inline_368$$ + $counter$$inline_370$$ + 1) % 7, $aSb$$inline_364_aSb$$inline_366$$.append($goog$i18n$DateTimeSymbols_en$$.$WEEKDAYS$[$dayNameNumber$$inline_369$$].charAt(0).toUpperCase()), $aSb$$inline_364_aSb$$inline_366$$.append($rflect$cal$MiniCalBuilder$HTML_PARTS_$$[$aOffset$$inline_367$$ + 1])
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
function $rflect$date$moveToDayOfWeekIfNeeded$$($aDate$$3_date$$inline_376$$) {
  var $JSCompiler_temp$$23_diff$$inline_375$$;
  0 != $JSCompiler_StaticMethods_getWeekday$$($aDate$$3_date$$inline_376$$) && ($JSCompiler_temp$$23_diff$$inline_375$$ = (($goog$i18n$DateTimeSymbols_en$$.$FIRSTDAYOFWEEK$ + 0 + 1) % 7 - $aDate$$3_date$$inline_376$$.getDay() + -7) % 7, $aDate$$3_date$$inline_376$$ = $aDate$$3_date$$inline_376$$.$clone$(), $aDate$$3_date$$inline_376$$.add(new $goog$date$Interval$$(0, 0, 0 === $JSCompiler_temp$$23_diff$$inline_375$$ ? $JSCompiler_temp$$23_diff$$inline_375$$ + -7 : $JSCompiler_temp$$23_diff$$inline_375$$)));
  return $JSCompiler_temp$$23_diff$$inline_375$$ = $aDate$$3_date$$inline_376$$
}
function $rflect$date$getTomorrow$$($aGivenDate_cutoff$$2$$) {
  var $dateObject_year$$15$$ = $JSCompiler_alias_NULL$$, $dateObject_year$$15$$ = $aGivenDate_cutoff$$2$$.getFullYear(), $month$$7$$ = $aGivenDate_cutoff$$2$$.getMonth(), $date$$42$$ = $aGivenDate_cutoff$$2$$.getDate(), $dayOfWeek$$3_previousDayOfWeek$$;
  $dayOfWeek$$3_previousDayOfWeek$$ = $aGivenDate_cutoff$$2$$.getDay();
  var $dayOfYear$$4$$ = $aGivenDate_cutoff$$2$$.$getDayOfYear$(), $previousDayOfYear$$ = $dayOfYear$$4$$, $weekNumber$$ = $aGivenDate_cutoff$$2$$.$getWeekNumber$(), $firstDayOfWeek$$ = $aGivenDate_cutoff$$2$$.$firstDayOfWeek_$, $aGivenDate_cutoff$$2$$ = $aGivenDate_cutoff$$2$$.$firstWeekCutOffDay_$, $numberOfDaysInCurrentYear$$ = 0 == $dateObject_year$$15$$ % 4 && (0 != $dateObject_year$$15$$ % 100 || 0 == $dateObject_year$$15$$ % 400) ? 366 : 365;
  $date$$42$$ == $goog$date$getNumberOfDaysInMonth$$($dateObject_year$$15$$, $month$$7$$) ? 11 == $month$$7$$ ? ($dateObject_year$$15$$++, $month$$7$$ = 0, $dayOfYear$$4$$ = $date$$42$$ = 1) : ($month$$7$$++, $date$$42$$ = 1, $dayOfYear$$4$$++) : ($date$$42$$++, $dayOfYear$$4$$++);
  $dayOfWeek$$3_previousDayOfWeek$$ = ($dayOfWeek$$3_previousDayOfWeek$$ + 1 + 7) % 7;
  ($dayOfWeek$$3_previousDayOfWeek$$ + 6) % 7 == $firstDayOfWeek$$ && (52 > $weekNumber$$ || 52 == $weekNumber$$ && $previousDayOfYear$$ + 1 + ($aGivenDate_cutoff$$2$$ - $firstDayOfWeek$$ + 7) % 7 < $numberOfDaysInCurrentYear$$ + 1 ? $weekNumber$$++ : $weekNumber$$ = 1);
  $dateObject_year$$15$$ = new $rflect$date$DateShim$$($dateObject_year$$15$$, $month$$7$$, $date$$42$$);
  $dateObject_year$$15$$.$day_$ = $dayOfWeek$$3_previousDayOfWeek$$;
  $dateObject_year$$15$$.$dayOfYear_$ = $dayOfYear$$4$$;
  $dateObject_year$$15$$.$weekNumber_$ = $weekNumber$$;
  return $dateObject_year$$15$$
}
function $rflect$date$DateShim$$($dateObj$$1_opt_year_or_date$$, $opt_month$$2$$, $opt_date$$3$$, $opt_hours$$3$$, $opt_minutes$$2$$, $opt_seconds$$2$$, $opt_milliseconds$$1$$) {
  $goog$isNumber$$($dateObj$$1_opt_year_or_date$$) ? (this.setYear($dateObj$$1_opt_year_or_date$$ || 0), this.setMonth($opt_month$$2$$ || 0), this.setDate($opt_date$$3$$ || 1), this.setHours($opt_hours$$3$$ || 0), this.setMinutes($opt_minutes$$2$$ || 0), this.setSeconds($opt_seconds$$2$$ || 0), this.setMilliseconds($opt_milliseconds$$1$$ || 0)) : ($dateObj$$1_opt_year_or_date$$ = $goog$isObject$$($dateObj$$1_opt_year_or_date$$) ? $dateObj$$1_opt_year_or_date$$ : new Date, this.setYear($dateObj$$1_opt_year_or_date$$.getFullYear()), 
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
  var $diff$$inline_394$$ = 0, $bitmask$$inline_395$$ = $opt_bitmask$$ || 63;
  $bitmask$$inline_395$$ & 1 && ($diff$$inline_394$$ = this.getYear() - $aOther$$.getFullYear());
  0 == $diff$$inline_394$$ && $bitmask$$inline_395$$ & 2 && ($diff$$inline_394$$ = this.getMonth() - $aOther$$.getMonth());
  0 == $diff$$inline_394$$ && $bitmask$$inline_395$$ & 4 && ($diff$$inline_394$$ = this.getDate() - $aOther$$.getDate());
  0 == $diff$$inline_394$$ && $bitmask$$inline_395$$ & 8 && ($diff$$inline_394$$ = this.getHours() - $aOther$$.getHours());
  0 == $diff$$inline_394$$ && $bitmask$$inline_395$$ & 16 && ($diff$$inline_394$$ = this.getMinutes() - $aOther$$.getMinutes());
  0 == $diff$$inline_394$$ && $bitmask$$inline_395$$ & 32 && ($diff$$inline_394$$ = this.getSeconds() - $aOther$$.getSeconds());
  $bitmask$$inline_395$$ & 128 && ($diff$$inline_394$$ = this.$getWeekNumber$() - $aOther$$.$getWeekNumber$());
  return 0 == (0 < $diff$$inline_394$$ ? 1 : 0 == $diff$$inline_394$$ ? 0 : -1)
};
$JSCompiler_prototypeAlias$$.valueOf = function $$JSCompiler_prototypeAlias$$$valueOf$() {
  return+[this.$year_$, this.$month_$, this.$dayOfMonth_$, this.$hours_$, this.$minutes_$, this.$seconds_$, this.$milliseconds_$].join("")
};
$JSCompiler_prototypeAlias$$.$clone$ = function $$JSCompiler_prototypeAlias$$$$clone$$() {
  var $date$$45$$ = new $rflect$date$DateShim$$(this);
  $date$$45$$.$firstDayOfWeek_$ = this.$firstDayOfWeek_$;
  $date$$45$$.$firstWeekCutOffDay_$ = this.$firstWeekCutOffDay_$;
  $date$$45$$.$dayOfYear_$ = this.$getDayOfYear$();
  var $aWeekNumber$$inline_407$$ = this.$getWeekNumber$();
  $date$$45$$.$weekNumber_$ = $aWeekNumber$$inline_407$$;
  return $date$$45$$
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
  var $daysNumber$$inline_418_difference$$inline_419_now$$inline_912_today$$inline_423$$ = 0;
  switch(this.$configuration$) {
    case 1:
      $daysNumber$$inline_418_difference$$inline_419_now$$inline_912_today$$inline_423$$ = 1;
      break;
    case 2:
      $daysNumber$$inline_418_difference$$inline_419_now$$inline_912_today$$inline_423$$ = this.$daysNumber$;
      break;
    case 3:
      $daysNumber$$inline_418_difference$$inline_419_now$$inline_912_today$$inline_423$$ = 7;
      break;
    case 4:
      $daysNumber$$inline_418_difference$$inline_419_now$$inline_912_today$$inline_423$$ = this.$daysNumber$;
      break;
    case 7:
    ;
    case 5:
      var $daysNumber$$inline_418_difference$$inline_419_now$$inline_912_today$$inline_423$$ = 0, $date$$inline_421_firstDayOfMonth$$inline_420$$ = this.$basis$.$clone$();
      $date$$inline_421_firstDayOfMonth$$inline_420$$.setDate(1);
      this.$start_$.$equals$($date$$inline_421_firstDayOfMonth$$inline_420$$) || ($daysNumber$$inline_418_difference$$inline_419_now$$inline_912_today$$inline_423$$ = $JSCompiler_StaticMethods_getWeekday$$($date$$inline_421_firstDayOfMonth$$inline_420$$) - $JSCompiler_StaticMethods_getWeekday$$(this.$start_$));
      $daysNumber$$inline_418_difference$$inline_419_now$$inline_912_today$$inline_423$$ = 7 == this.$configuration$ ? 42 : 0 == ($daysNumber$$inline_418_difference$$inline_419_now$$inline_912_today$$inline_423$$ + $goog$date$getNumberOfDaysInMonth$$(this.$basis$.getFullYear(), this.$basis$.getMonth())) % 7 ? $daysNumber$$inline_418_difference$$inline_419_now$$inline_912_today$$inline_423$$ + $goog$date$getNumberOfDaysInMonth$$(this.$basis$.getFullYear(), this.$basis$.getMonth()) : $daysNumber$$inline_418_difference$$inline_419_now$$inline_912_today$$inline_423$$ + 
      $goog$date$getNumberOfDaysInMonth$$(this.$basis$.getFullYear(), this.$basis$.getMonth()) - ($daysNumber$$inline_418_difference$$inline_419_now$$inline_912_today$$inline_423$$ + $goog$date$getNumberOfDaysInMonth$$(this.$basis$.getFullYear(), this.$basis$.getMonth())) % 7 + 7
  }
  this.$daySeries$.length = 0;
  $date$$inline_421_firstDayOfMonth$$inline_420$$ = new $rflect$date$DateShim$$(this.$start_$);
  $date$$inline_421_firstDayOfMonth$$inline_420$$.$dayOfYear_$ = this.$start_$.$getDayOfYear$();
  var $aWeekNumber$$inline_908_counter$$inline_422$$ = this.$start_$.$getWeekNumber$();
  $date$$inline_421_firstDayOfMonth$$inline_420$$.$weekNumber_$ = $aWeekNumber$$inline_908_counter$$inline_422$$;
  for($aWeekNumber$$inline_908_counter$$inline_422$$ = 0;$aWeekNumber$$inline_908_counter$$inline_422$$ < $daysNumber$$inline_418_difference$$inline_419_now$$inline_912_today$$inline_423$$;$aWeekNumber$$inline_908_counter$$inline_422$$++) {
    this.$daySeries$[$aWeekNumber$$inline_908_counter$$inline_422$$] = $date$$inline_421_firstDayOfMonth$$inline_420$$, $date$$inline_421_firstDayOfMonth$$inline_420$$ = $rflect$date$getTomorrow$$($date$$inline_421_firstDayOfMonth$$inline_420$$)
  }
  this.$interval$.start = this.$start_$.getTime();
  this.$interval$.end = (new $goog$date$Date$$($date$$inline_421_firstDayOfMonth$$inline_420$$)).getTime();
  $daysNumber$$inline_418_difference$$inline_419_now$$inline_912_today$$inline_423$$ = new Date;
  if(this.$isInNowPoint$ = this.$interval$.contains(+$daysNumber$$inline_418_difference$$inline_419_now$$inline_912_today$$inline_423$$) && (5 != this.$configuration$ || this.$basis$.getMonth() == $daysNumber$$inline_418_difference$$inline_419_now$$inline_912_today$$inline_423$$.getMonth())) {
    $daysNumber$$inline_418_difference$$inline_419_now$$inline_912_today$$inline_423$$ = new Date, this.$currentDay_$ = new $rflect$date$DateShim$$($daysNumber$$inline_418_difference$$inline_419_now$$inline_912_today$$inline_423$$.getFullYear(), $daysNumber$$inline_418_difference$$inline_419_now$$inline_912_today$$inline_423$$.getMonth(), $daysNumber$$inline_418_difference$$inline_419_now$$inline_912_today$$inline_423$$.getDate())
  }
};
$JSCompiler_prototypeAlias$$.shift = function $$JSCompiler_prototypeAlias$$$shift$($aDirection$$1$$) {
  var $daysNumber$$inline_427$$ = 0;
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
      $daysNumber$$inline_427$$ = this.$daysNumber$ * $aDirection$$1$$;
      this.$basis$.add(new $goog$date$Interval$$(0, 0, $daysNumber$$inline_427$$));
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
;function $rflect$string$buildClassNameRe$$($var_args$$62$$) {
  var $buffer$$9$$ = [];
  $goog$array$forEach$$(arguments, function($aVal$$, $aIndex$$3$$) {
    $buffer$$9$$[$aIndex$$3$$] = ("" + $aVal$$).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
  });
  return RegExp("(\\s|^)" + $buffer$$9$$.join("(\\s|$)|(\\s|^)") + "(\\s|$)")
}
function $rflect$string$getNumericIndex$$($aId$$2_matches$$) {
  return($aId$$2_matches$$ = RegExp("\\d{1," + ($goog$isDef$$(2) ? 2 : 1) + "}").exec($aId$$2_matches$$)) ? +$aId$$2_matches$$[0] : NaN
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
  var $startDate$$3$$ = $JSCompiler_alias_NULL$$, $endDate$$3$$ = $JSCompiler_alias_NULL$$, $minutes$$5$$ = 0, $tempDate$$ = $JSCompiler_alias_NULL$$;
  $JSCompiler_StaticMethods_calculateDates_$self$$.$isHorizontal$() ? ($tempDate$$ = $JSCompiler_StaticMethods_calculateDates_$self$$.$timeManager_$.$daySeries$[$aMinCell$$.x], $minutes$$5$$ = 30 * $aMinCell$$.y, $startDate$$3$$ = new $goog$date$DateTime$$($tempDate$$.getYear(), $tempDate$$.getMonth(), $tempDate$$.getDate(), $minutes$$5$$ / 60, $minutes$$5$$ % 60), $opt_maxCell$$ && (47 == $opt_maxCell$$.y ? ($tempDate$$ = $rflect$date$getTomorrow$$($JSCompiler_StaticMethods_calculateDates_$self$$.$timeManager_$.$daySeries$[$opt_maxCell$$.x]), 
  $endDate$$3$$ = new $goog$date$DateTime$$($tempDate$$.getYear(), $tempDate$$.getMonth(), $tempDate$$.getDate())) : ($tempDate$$ = $JSCompiler_StaticMethods_calculateDates_$self$$.$timeManager_$.$daySeries$[$opt_maxCell$$.x], $minutes$$5$$ = 30 * ($opt_maxCell$$.y + 1), $endDate$$3$$ = new $goog$date$DateTime$$($tempDate$$.getYear(), $tempDate$$.getMonth(), $tempDate$$.getDate(), $minutes$$5$$ / 60, $minutes$$5$$ % 60)))) : ($tempDate$$ = $JSCompiler_StaticMethods_calculateDates_$self$$.$timeManager_$.$daySeries$[$aMinCell$$.x + 
  7 * $aMinCell$$.y], $startDate$$3$$ = new $goog$date$DateTime$$($tempDate$$.getYear(), $tempDate$$.getMonth(), $tempDate$$.getDate()), $opt_maxCell$$ && ($tempDate$$ = $rflect$date$getTomorrow$$($JSCompiler_StaticMethods_calculateDates_$self$$.$timeManager_$.$daySeries$[$opt_maxCell$$.x + 7 * $opt_maxCell$$.y]), $endDate$$3$$ = new $goog$date$DateTime$$($tempDate$$.getYear(), $tempDate$$.getMonth(), $tempDate$$.getDate())));
  $JSCompiler_StaticMethods_calculateDates_$self$$.$startDate$ = $startDate$$3$$;
  $JSCompiler_StaticMethods_calculateDates_$self$$.$endDate$ = $endDate$$3$$
}
function $JSCompiler_StaticMethods_build_$$($JSCompiler_StaticMethods_build_$self$$, $aSb$$10$$) {
  for(var $sb$$3$$ = $aSb$$10$$ || new $goog$string$StringBuffer$$, $counter$$13$$ = 0, $length$$33$$ = $JSCompiler_StaticMethods_build_$self$$.$rects_$.length;$counter$$13$$ < $length$$33$$;$counter$$13$$++) {
    var $JSCompiler_StaticMethods_buildUnit_$self$$inline_429$$ = $JSCompiler_StaticMethods_build_$self$$, $aSb$$inline_430$$ = $sb$$3$$, $aRect$$inline_431$$ = $JSCompiler_StaticMethods_build_$self$$.$rects_$[$counter$$13$$];
    $aSb$$inline_430$$.append('<div class="mask');
    $JSCompiler_StaticMethods_buildUnit_$self$$inline_429$$.$additionalClassNames$ && ($aSb$$inline_430$$.append(" "), $aSb$$inline_430$$.append($JSCompiler_StaticMethods_buildUnit_$self$$inline_429$$.$additionalClassNames$));
    $aSb$$inline_430$$.append('" style="left:');
    $aSb$$inline_430$$.append(Math.floor($aRect$$inline_431$$.left));
    $aSb$$inline_430$$.append("px;top:");
    $aSb$$inline_430$$.append(Math.floor($aRect$$inline_431$$.top));
    $aSb$$inline_430$$.append("px;width:");
    $aSb$$inline_430$$.append(Math.ceil($aRect$$inline_431$$.width));
    $aSb$$inline_430$$.append("px;height:");
    $aSb$$inline_430$$.append(Math.ceil($aRect$$inline_431$$.height));
    $aSb$$inline_430$$.append('px">');
    $aSb$$inline_430$$.append("</div>")
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
$JSCompiler_prototypeAlias$$.$init$ = function $$JSCompiler_prototypeAlias$$$$init$$($JSCompiler_inline_result$$433_aConfiguration$$1_cell$$inline_436$$, $startSelectionIndex$$, $endSelectionIndex_minCell$$inline_437$$) {
  $rflect$cal$SelectionMask$$.prototype.$init$.call(this, $JSCompiler_inline_result$$433_aConfiguration$$1_cell$$inline_436$$);
  this.$maskEl_$ = $goog$dom$getElement$$("minical-mask-cnt");
  this.$indexIsInMask_$ = this.$draggedAtLeastOnce_$ = this.$dragStarted_$ = $JSCompiler_alias_FALSE$$;
  $_log$$("this.configuration_", this.$configuration_$);
  if(5 == this.$configuration_$) {
    this.$initialized_$ = $JSCompiler_alias_FALSE$$, this.$startCell_$ = $JSCompiler_StaticMethods_getCellBySelectionIndex_$$($startSelectionIndex$$), this.$currentCell_$ = $JSCompiler_StaticMethods_getCellBySelectionIndex_$$($endSelectionIndex_minCell$$inline_437$$), this.$update_$(), this.close()
  }else {
    this.$dragStarted_$ = $JSCompiler_alias_TRUE$$;
    if(this.$initialized_$) {
      var $JSCompiler_inline_result$$433_aConfiguration$$1_cell$$inline_436$$ = $JSCompiler_StaticMethods_getCellBySelectionIndex_$$($startSelectionIndex$$), $endSelectionIndex_minCell$$inline_437$$ = -1 == $JSCompiler_StaticMethods_compareCells_$$(this, this.$visibleStartCell_$, this.$visibleCurrentCell_$) ? this.$visibleStartCell_$ : this.$visibleCurrentCell_$, $maxCell$$inline_438$$ = 1 == $JSCompiler_StaticMethods_compareCells_$$(this, this.$visibleStartCell_$, this.$visibleCurrentCell_$) ? this.$visibleStartCell_$ : 
      this.$visibleCurrentCell_$;
      $_log$$("cell", $JSCompiler_inline_result$$433_aConfiguration$$1_cell$$inline_436$$);
      $_log$$("minCell", $endSelectionIndex_minCell$$inline_437$$);
      $_log$$("maxCell", $maxCell$$inline_438$$);
      $JSCompiler_inline_result$$433_aConfiguration$$1_cell$$inline_436$$ = 0 <= $JSCompiler_StaticMethods_compareCells_$$(this, $JSCompiler_inline_result$$433_aConfiguration$$1_cell$$inline_436$$, $endSelectionIndex_minCell$$inline_437$$) && 0 >= $JSCompiler_StaticMethods_compareCells_$$(this, $JSCompiler_inline_result$$433_aConfiguration$$1_cell$$inline_436$$, $maxCell$$inline_438$$)
    }else {
      $JSCompiler_inline_result$$433_aConfiguration$$1_cell$$inline_436$$ = $JSCompiler_alias_FALSE$$
    }
    this.$indexIsInMask_$ = $JSCompiler_inline_result$$433_aConfiguration$$1_cell$$inline_436$$;
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
  var $aMaxCell_duration$$1$$ = $JSCompiler_StaticMethods_calculateDateAndSelectionType_$self$$.$duration_$ = $aMaxCell_duration$$1$$.x + 7 * $aMaxCell_duration$$1$$.y - ($aMinCell$$1$$.x + 7 * $aMinCell$$1$$.y) + 1, $dayInMonth_indexOfFirstDayOfMonth$$ = $JSCompiler_StaticMethods_calculateDateAndSelectionType_$self$$.$timeManager_$.$daySeries$[6], $numberOfDaysInMonth_tempDate$$1_year$$19$$ = $dayInMonth_indexOfFirstDayOfMonth$$.getYear(), $month$$10$$ = $dayInMonth_indexOfFirstDayOfMonth$$.getMonth(), 
  $dayInMonth_indexOfFirstDayOfMonth$$ = $goog$array$findIndex$$($JSCompiler_StaticMethods_calculateDateAndSelectionType_$self$$.$timeManager_$.$daySeries$, function($aDate$$6$$) {
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
$goog$inherits$$($rflect$cal$MiniCal$$, $rflect$cal$Component$$);
$JSCompiler_prototypeAlias$$ = $rflect$cal$MiniCal$$.prototype;
$JSCompiler_prototypeAlias$$.$updateBeforeRedraw$ = function $$JSCompiler_prototypeAlias$$$$updateBeforeRedraw$$($opt_internal$$, $opt_direction$$) {
  $opt_internal$$ && $opt_direction$$ ? this.$timeManager_$.shift($opt_direction$$) : $JSCompiler_StaticMethods_shiftToPoint$$(this.$timeManager_$, this.$extTimeManager_$.$basis$);
  $JSCompiler_StaticMethods_initMask_$$(this)
};
function $JSCompiler_StaticMethods_initMask_$$($JSCompiler_StaticMethods_initMask_$self$$) {
  var $overlap_startSelectionIndex$$1$$ = -1, $endSelectionIndex$$1_startDate$$4$$ = -1;
  if($JSCompiler_StaticMethods_overlaps$$($JSCompiler_StaticMethods_initMask_$self$$.$timeManager_$.$interval$, $JSCompiler_StaticMethods_initMask_$self$$.$extTimeManager_$.$interval$)) {
    var $overlap_startSelectionIndex$$1$$ = $JSCompiler_StaticMethods_overlap$$($JSCompiler_StaticMethods_initMask_$self$$.$timeManager_$.$interval$, $JSCompiler_StaticMethods_initMask_$self$$.$extTimeManager_$.$interval$), $endSelectionIndex$$1_startDate$$4$$ = new $goog$date$Date$$, $endDate$$4$$ = new $goog$date$Date$$;
    $endSelectionIndex$$1_startDate$$4$$.setTime($overlap_startSelectionIndex$$1$$.start);
    $endDate$$4$$.setTime($overlap_startSelectionIndex$$1$$.end);
    var $startDateDay$$ = $endSelectionIndex$$1_startDate$$4$$.getDate(), $startDateMonth$$ = $endSelectionIndex$$1_startDate$$4$$.getMonth(), $endDateDay$$ = $endDate$$4$$.getDate(), $endDateMonth$$ = $endDate$$4$$.getMonth(), $overlap_startSelectionIndex$$1$$ = $goog$array$findIndex$$($JSCompiler_StaticMethods_initMask_$self$$.$timeManager_$.$daySeries$, function($aDate$$7$$) {
      return $startDateMonth$$ == $aDate$$7$$.getMonth() && $startDateDay$$ == $aDate$$7$$.getDate()
    }), $endSelectionIndex$$1_startDate$$4$$ = $goog$array$findIndexRight$$($JSCompiler_StaticMethods_initMask_$self$$.$timeManager_$.$daySeries$, function($aDate$$8$$) {
      return $endDateMonth$$ == $aDate$$8$$.getMonth() && $endDateDay$$ == $aDate$$8$$.getDate()
    });
    0 <= $overlap_startSelectionIndex$$1$$ && (0 > $endSelectionIndex$$1_startDate$$4$$ ? $endSelectionIndex$$1_startDate$$4$$ = $JSCompiler_StaticMethods_initMask_$self$$.$timeManager_$.$daySeries$.length - 1 : $endSelectionIndex$$1_startDate$$4$$--)
  }
  $JSCompiler_StaticMethods_initMask_$self$$.$selectionMask$.$init$(5, $overlap_startSelectionIndex$$1$$, $endSelectionIndex$$1_startDate$$4$$)
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
  var $aEvent$$3_className$$26$$ = $aEvent$$3_className$$26$$.target.className, $direction$$4$$ = 0;
  $rflect$string$buildClassNameRe$$("month-sel-btn-forward").test($aEvent$$3_className$$26$$) ? $direction$$4$$ = 1 : $rflect$string$buildClassNameRe$$("month-sel-btn-back").test($aEvent$$3_className$$26$$) && ($direction$$4$$ = -1);
  $direction$$4$$ && (this.$updateBeforeRedraw$($JSCompiler_alias_TRUE$$, $direction$$4$$), this.$updateByRedraw$())
};
$JSCompiler_prototypeAlias$$.$onMouseOver_$ = function $$JSCompiler_prototypeAlias$$$$onMouseOver_$$($aEvent$$4_target$$43$$) {
  $aEvent$$4_target$$43$$ = $aEvent$$4_target$$43$$.target;
  $JSCompiler_StaticMethods_isField_$$(this, $aEvent$$4_target$$43$$.className) && $JSCompiler_StaticMethods_registerTarget$$(this.$moRegistry_$, $aEvent$$4_target$$43$$, "goog-date-picker-selected")
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
  var $className$$29$$ = $aEvent$$6$$.target.className, $index$$59$$ = $rflect$string$getNumericIndex$$($aEvent$$6$$.target.id);
  $JSCompiler_StaticMethods_isField_$$(this, $className$$29$$) && this.$selectionMask$.$init$(4, $index$$59$$, 0);
  ($JSCompiler_StaticMethods_isButton_$$(this, $className$$29$$) || $JSCompiler_StaticMethods_isField_$$(this, $className$$29$$)) && $aEvent$$6$$.preventDefault()
};
$JSCompiler_prototypeAlias$$.$onSelectStart_$ = function $$JSCompiler_prototypeAlias$$$$onSelectStart_$$($aEvent$$7$$) {
  ($JSCompiler_StaticMethods_isButton_$$(this, $aEvent$$7$$.target.className) || $JSCompiler_StaticMethods_isField_$$(this, $aEvent$$7$$.target.className)) && $aEvent$$7$$.preventDefault()
};
$JSCompiler_prototypeAlias$$.$onMouseMove_$ = function $$JSCompiler_prototypeAlias$$$$onMouseMove_$$($aEvent$$8$$) {
  var $className$$31_target$$45$$ = $aEvent$$8$$.target, $index$$60$$ = $rflect$string$getNumericIndex$$($className$$31_target$$45$$.id), $className$$31_target$$45$$ = $className$$31_target$$45$$.className;
  this.$selectionMask$.$dragStarted_$ && $JSCompiler_StaticMethods_isField_$$(this, $className$$31_target$$45$$) && (this.$selectionMask$.update($index$$60$$), $aEvent$$8$$.preventDefault())
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
$goog$inherits$$($rflect$cal$ListSelector$$, $rflect$cal$Component$$);
var $rflect$cal$ListSelector$HTML_PARTS_$$ = '<div id="calendars-selector" class="list-selector">;<div id="calendars-label-cont" class="list-label-cont"><div id="calendars-label" class="list-label">;</div>;</div>;<div id="calendars-body" class="list-body ;" style="height:;px">;</div>;</div>'.split(";");
$JSCompiler_prototypeAlias$$ = $rflect$cal$ListSelector$$.prototype;
$JSCompiler_prototypeAlias$$.$buildBodyInternal$ = function $$JSCompiler_prototypeAlias$$$$buildBodyInternal$$($aSb$$14$$) {
  for(var $offset$$25$$ = 0, $length$$34$$ = $rflect$cal$ListSelector$HTML_PARTS_$$.length;++$offset$$25$$ < $length$$34$$ - 1;) {
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
$JSCompiler_prototypeAlias$$.$onMouseOver_$ = function $$JSCompiler_prototypeAlias$$$$onMouseOver_$$($aEvent$$11_target$$47$$) {
  var $aEvent$$11_target$$47$$ = $aEvent$$11_target$$47$$.target, $className$$33$$ = $aEvent$$11_target$$47$$.className;
  $JSCompiler_StaticMethods_registerTarget$$(this.$moRegistryForWhole_$, this.getHeader(), "list-label-cont-highlighted");
  this.$isButton$($className$$33$$) && $JSCompiler_StaticMethods_registerTarget$$(this.$moRegistryForParts_$, $aEvent$$11_target$$47$$, "list-selector-options-button-highlighted")
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
function $goog$fx$Dragger$$($target$$48$$, $opt_handle$$, $opt_limits$$) {
  this.target = $target$$48$$;
  this.handle = $opt_handle$$ || $target$$48$$;
  this.$limits$ = $opt_limits$$ || new $goog$math$Rect$$(NaN, NaN, NaN, NaN);
  this.$document_$ = $goog$dom$getOwnerDocument$$($target$$48$$);
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
$JSCompiler_prototypeAlias$$.$ieDragStartCancellingOn_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$getHandler$ = $JSCompiler_get$$("$eventHandler_$");
$JSCompiler_prototypeAlias$$.$setEnabled$ = $JSCompiler_set$$("$enabled_$");
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$fx$Dragger$$.$superClass_$.$disposeInternal$.call(this);
  $goog$events$unlisten$$(this.handle, ["touchstart", "mousedown"], this.$startDrag$, $JSCompiler_alias_FALSE$$, this);
  this.$eventHandler_$.$dispose$();
  delete this.target;
  delete this.handle;
  delete this.$eventHandler_$
};
$JSCompiler_prototypeAlias$$.$startDrag$ = function $$JSCompiler_prototypeAlias$$$$startDrag$$($e$$37$$) {
  var $doc$$inline_460_isMouseDown$$ = "mousedown" == $e$$37$$.type;
  if(this.$enabled_$ && !this.$dragging_$ && (!$doc$$inline_460_isMouseDown$$ || $JSCompiler_StaticMethods_isMouseActionButton$$($e$$37$$))) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$37$$);
    if(0 == this.$hysteresisDistanceSquared_$) {
      if($JSCompiler_StaticMethods_initializeDrag_$$(this, $e$$37$$), this.$dragging_$) {
        $e$$37$$.preventDefault()
      }else {
        return
      }
    }else {
      $e$$37$$.preventDefault()
    }
    var $doc$$inline_460_isMouseDown$$ = this.$document_$, $docEl$$inline_461$$ = $doc$$inline_460_isMouseDown$$.documentElement, $useCapture$$inline_462$$ = !$goog$fx$Dragger$HAS_SET_CAPTURE_$$;
    $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_460_isMouseDown$$, ["touchmove", "mousemove"], this.$handleMove_$, $useCapture$$inline_462$$);
    $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_460_isMouseDown$$, ["touchend", "mouseup"], this.$endDrag$, $useCapture$$inline_462$$);
    $goog$fx$Dragger$HAS_SET_CAPTURE_$$ ? ($docEl$$inline_461$$.setCapture($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $docEl$$inline_461$$, "losecapture", this.$endDrag$)) : $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $goog$dom$getWindow$$($doc$$inline_460_isMouseDown$$), "blur", this.$endDrag$);
    $goog$userAgent$IE$$ && this.$ieDragStartCancellingOn_$ && $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, $doc$$inline_460_isMouseDown$$, "dragstart", $goog$events$Event$preventDefault$$);
    this.$scrollTarget_$ && $JSCompiler_StaticMethods_listen$$(this.$eventHandler_$, this.$scrollTarget_$, "scroll", this.$onScroll_$, $useCapture$$inline_462$$);
    this.clientX = this.$startX$ = $e$$37$$.clientX;
    this.clientY = this.$startY$ = $e$$37$$.clientY;
    this.screenX = $e$$37$$.screenX;
    this.screenY = $e$$37$$.screenY;
    this.$deltaX$ = this.target.offsetLeft;
    this.$deltaY$ = this.target.offsetTop;
    this.$pageScroll$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$(this.$document_$));
    $goog$now$$()
  }else {
    this.dispatchEvent("earlycancel")
  }
};
function $JSCompiler_StaticMethods_initializeDrag_$$($JSCompiler_StaticMethods_initializeDrag_$self$$, $e$$38$$) {
  $JSCompiler_StaticMethods_initializeDrag_$self$$.dispatchEvent(new $goog$fx$DragEvent$$("start", $JSCompiler_StaticMethods_initializeDrag_$self$$, $e$$38$$.clientX, $e$$38$$.clientY)) !== $JSCompiler_alias_FALSE$$ && ($JSCompiler_StaticMethods_initializeDrag_$self$$.$dragging_$ = $JSCompiler_alias_TRUE$$)
}
$JSCompiler_prototypeAlias$$.$endDrag$ = function $$JSCompiler_prototypeAlias$$$$endDrag$$($e$$39$$) {
  $JSCompiler_StaticMethods_removeAll$$(this.$eventHandler_$);
  $goog$fx$Dragger$HAS_SET_CAPTURE_$$ && this.$document_$.releaseCapture();
  var $x$$59$$ = $JSCompiler_StaticMethods_limitX$$(this, this.$deltaX$), $y$$37$$ = $JSCompiler_StaticMethods_limitY$$(this, this.$deltaY$);
  this.$dragging_$ ? ($JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$39$$), this.$dragging_$ = $JSCompiler_alias_FALSE$$, this.dispatchEvent(new $goog$fx$DragEvent$$("end", this, $e$$39$$.clientX, $e$$39$$.clientY, 0, $x$$59$$, $y$$37$$))) : this.dispatchEvent("earlycancel");
  ("touchend" == $e$$39$$.type || "touchcancel" == $e$$39$$.type) && $e$$39$$.preventDefault()
};
function $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$41$$) {
  var $type$$74$$ = $e$$41$$.type;
  "touchstart" == $type$$74$$ || "touchmove" == $type$$74$$ ? $e$$41$$.$init$($e$$41$$.$event_$.targetTouches[0], $e$$41$$.currentTarget) : ("touchend" == $type$$74$$ || "touchcancel" == $type$$74$$) && $e$$41$$.$init$($e$$41$$.$event_$.changedTouches[0], $e$$41$$.currentTarget)
}
$JSCompiler_prototypeAlias$$.$handleMove_$ = function $$JSCompiler_prototypeAlias$$$$handleMove_$$($e$$42$$) {
  if(this.$enabled_$) {
    $JSCompiler_StaticMethods_maybeReinitTouchEvent_$$($e$$42$$);
    var $dx$$7_x$$60$$ = $e$$42$$.clientX - this.clientX, $dy$$7_pos$$5_y$$38$$ = $e$$42$$.clientY - this.clientY;
    this.clientX = $e$$42$$.clientX;
    this.clientY = $e$$42$$.clientY;
    this.screenX = $e$$42$$.screenX;
    this.screenY = $e$$42$$.screenY;
    if(!this.$dragging_$) {
      var $diffX$$ = this.$startX$ - this.clientX, $diffY$$ = this.$startY$ - this.clientY;
      if($diffX$$ * $diffX$$ + $diffY$$ * $diffY$$ > this.$hysteresisDistanceSquared_$ && ($JSCompiler_StaticMethods_initializeDrag_$$(this, $e$$42$$), !this.$dragging_$)) {
        this.$endDrag$($e$$42$$);
        return
      }
    }
    $dy$$7_pos$$5_y$$38$$ = $JSCompiler_StaticMethods_calculatePosition_$$(this, $dx$$7_x$$60$$, $dy$$7_pos$$5_y$$38$$);
    $dx$$7_x$$60$$ = $dy$$7_pos$$5_y$$38$$.x;
    $dy$$7_pos$$5_y$$38$$ = $dy$$7_pos$$5_y$$38$$.y;
    this.$dragging_$ && this.dispatchEvent(new $goog$fx$DragEvent$$("beforedrag", this, $e$$42$$.clientX, $e$$42$$.clientY, 0, $dx$$7_x$$60$$, $dy$$7_pos$$5_y$$38$$)) !== $JSCompiler_alias_FALSE$$ && ($JSCompiler_StaticMethods_doDrag$$(this, $e$$42$$, $dx$$7_x$$60$$, $dy$$7_pos$$5_y$$38$$), $e$$42$$.preventDefault())
  }
};
function $JSCompiler_StaticMethods_calculatePosition_$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$39$$, $dx$$8_x$$61$$, $dy$$8$$) {
  var $pageScroll$$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$39$$.$document_$)), $dx$$8_x$$61$$ = $dx$$8_x$$61$$ + ($pageScroll$$.x - $JSCompiler_StaticMethods_calculatePosition_$self_y$$39$$.$pageScroll$.x), $dy$$8$$ = $dy$$8$$ + ($pageScroll$$.y - $JSCompiler_StaticMethods_calculatePosition_$self_y$$39$$.$pageScroll$.y);
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$39$$.$pageScroll$ = $pageScroll$$;
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$39$$.$deltaX$ += $dx$$8_x$$61$$;
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$39$$.$deltaY$ += $dy$$8$$;
  $dx$$8_x$$61$$ = $JSCompiler_StaticMethods_limitX$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$39$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$39$$.$deltaX$);
  $JSCompiler_StaticMethods_calculatePosition_$self_y$$39$$ = $JSCompiler_StaticMethods_limitY$$($JSCompiler_StaticMethods_calculatePosition_$self_y$$39$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$39$$.$deltaY$);
  return new $goog$math$Coordinate$$($dx$$8_x$$61$$, $JSCompiler_StaticMethods_calculatePosition_$self_y$$39$$)
}
$JSCompiler_prototypeAlias$$.$onScroll_$ = function $$JSCompiler_prototypeAlias$$$$onScroll_$$($e$$43$$) {
  var $pos$$6$$ = $JSCompiler_StaticMethods_calculatePosition_$$(this, 0, 0);
  $e$$43$$.clientX = this.clientX;
  $e$$43$$.clientY = this.clientY;
  $JSCompiler_StaticMethods_doDrag$$(this, $e$$43$$, $pos$$6$$.x, $pos$$6$$.y)
};
function $JSCompiler_StaticMethods_doDrag$$($JSCompiler_StaticMethods_doDrag$self$$, $e$$44$$, $x$$62$$, $y$$40$$) {
  $JSCompiler_StaticMethods_doDrag$self$$.target.style.left = $x$$62$$ + "px";
  $JSCompiler_StaticMethods_doDrag$self$$.target.style.top = $y$$40$$ + "px";
  $JSCompiler_StaticMethods_doDrag$self$$.dispatchEvent(new $goog$fx$DragEvent$$("drag", $JSCompiler_StaticMethods_doDrag$self$$, $e$$44$$.clientX, $e$$44$$.clientY, 0, $x$$62$$, $y$$40$$))
}
function $JSCompiler_StaticMethods_limitX$$($JSCompiler_StaticMethods_limitX$self$$, $x$$63$$) {
  var $rect$$6_width$$17$$ = $JSCompiler_StaticMethods_limitX$self$$.$limits$, $left$$9$$ = !isNaN($rect$$6_width$$17$$.left) ? $rect$$6_width$$17$$.left : $JSCompiler_alias_NULL$$, $rect$$6_width$$17$$ = !isNaN($rect$$6_width$$17$$.width) ? $rect$$6_width$$17$$.width : 0;
  return Math.min($left$$9$$ != $JSCompiler_alias_NULL$$ ? $left$$9$$ + $rect$$6_width$$17$$ : Infinity, Math.max($left$$9$$ != $JSCompiler_alias_NULL$$ ? $left$$9$$ : -Infinity, $x$$63$$))
}
function $JSCompiler_StaticMethods_limitY$$($JSCompiler_StaticMethods_limitY$self$$, $y$$41$$) {
  var $height$$16_rect$$7$$ = $JSCompiler_StaticMethods_limitY$self$$.$limits$, $top$$7$$ = !isNaN($height$$16_rect$$7$$.top) ? $height$$16_rect$$7$$.top : $JSCompiler_alias_NULL$$, $height$$16_rect$$7$$ = !isNaN($height$$16_rect$$7$$.height) ? $height$$16_rect$$7$$.height : 0;
  return Math.min($top$$7$$ != $JSCompiler_alias_NULL$$ ? $top$$7$$ + $height$$16_rect$$7$$ : Infinity, Math.max($top$$7$$ != $JSCompiler_alias_NULL$$ ? $top$$7$$ : -Infinity, $y$$41$$))
}
function $goog$fx$DragEvent$$($type$$75$$, $dragobj$$, $clientX$$2$$, $clientY$$2$$, $browserEvent$$1$$, $opt_actX$$, $opt_actY$$) {
  $goog$events$Event$$.call(this, $type$$75$$);
  this.clientX = $clientX$$2$$;
  this.clientY = $clientY$$2$$;
  this.left = $goog$isDef$$($opt_actX$$) ? $opt_actX$$ : $dragobj$$.$deltaX$;
  this.top = $goog$isDef$$($opt_actY$$) ? $opt_actY$$ : $dragobj$$.$deltaY$
}
$goog$inherits$$($goog$fx$DragEvent$$, $goog$events$Event$$);
var $goog$Timer$defaultTimerObject$$ = $goog$global$$.window;
function $goog$Timer$callOnce$$($listener$$45$$, $opt_delay$$, $opt_handler$$13$$) {
  $goog$isFunction$$($listener$$45$$) ? $opt_handler$$13$$ && ($listener$$45$$ = $goog$bind$$($listener$$45$$, $opt_handler$$13$$)) : $listener$$45$$ && "function" == typeof $listener$$45$$.handleEvent ? $listener$$45$$ = $goog$bind$$($listener$$45$$.handleEvent, $listener$$45$$) : $JSCompiler_alias_THROW$$(Error("Invalid listener argument"));
  return 2147483647 < $opt_delay$$ ? -1 : $goog$Timer$defaultTimerObject$$.setTimeout($listener$$45$$, $opt_delay$$ || 0)
}
;function $goog$ui$PopupBase$$($opt_element$$12$$, $opt_type$$7$$) {
  this.$handler_$ = new $goog$events$EventHandler$$(this);
  var $elt$$inline_470$$ = $opt_element$$12$$ || $JSCompiler_alias_NULL$$;
  $JSCompiler_StaticMethods_ensureNotVisible_$$(this);
  this.$element_$ = $elt$$inline_470$$;
  $opt_type$$7$$ && (this.$type_$ = $opt_type$$7$$)
}
$goog$inherits$$($goog$ui$PopupBase$$, $goog$events$EventTarget$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$PopupBase$$.prototype;
$JSCompiler_prototypeAlias$$.$element_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$autoHide_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$autoHideRegion_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$isVisible_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$shouldHideAsync_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$lastShowTime_$ = -1;
$JSCompiler_prototypeAlias$$.$hideOnEscape_$ = $JSCompiler_alias_FALSE$$;
$JSCompiler_prototypeAlias$$.$enableCrossIframeDismissal_$ = $JSCompiler_alias_TRUE$$;
$JSCompiler_prototypeAlias$$.$type_$ = "toggle_display";
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
$JSCompiler_prototypeAlias$$.$setAutoHide$ = function $$JSCompiler_prototypeAlias$$$$setAutoHide$$($autoHide$$) {
  $JSCompiler_StaticMethods_ensureNotVisible_$$(this);
  this.$autoHide_$ = $autoHide$$
};
function $JSCompiler_StaticMethods_ensureNotVisible_$$($JSCompiler_StaticMethods_ensureNotVisible_$self$$) {
  $JSCompiler_StaticMethods_ensureNotVisible_$self$$.$isVisible_$ && $JSCompiler_alias_THROW$$(Error("Can not change this state of the popup while showing."))
}
$JSCompiler_prototypeAlias$$.$isVisible$ = $JSCompiler_get$$("$isVisible_$");
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($visible$$2$$) {
  this.$showTransition_$ && this.$showTransition_$.stop();
  this.$hideTransition_$ && this.$hideTransition_$.stop();
  $visible$$2$$ ? this.$show_$() : this.$hide_$()
};
$JSCompiler_prototypeAlias$$.$reposition$ = $goog$nullFunction$$;
$JSCompiler_prototypeAlias$$.$show_$ = function $$JSCompiler_prototypeAlias$$$$show_$$() {
  if(!this.$isVisible_$ && this.dispatchEvent("beforeshow")) {
    this.$element_$ || $JSCompiler_alias_THROW$$(Error("Caller must call setElement before trying to show the popup"));
    this.$reposition$();
    var $doc$$34$$ = $goog$dom$getOwnerDocument$$(this.$element_$);
    this.$hideOnEscape_$ && $JSCompiler_StaticMethods_listen$$(this.$handler_$, $doc$$34$$, "keydown", this.$onDocumentKeyDown_$, $JSCompiler_alias_TRUE$$);
    if(this.$autoHide_$) {
      if($JSCompiler_StaticMethods_listen$$(this.$handler_$, $doc$$34$$, "mousedown", this.$onDocumentMouseDown_$, $JSCompiler_alias_TRUE$$), $goog$userAgent$IE$$) {
        var $activeElement$$1$$;
        try {
          $activeElement$$1$$ = $doc$$34$$.activeElement
        }catch($e$$45$$) {
        }
        for(;$activeElement$$1$$ && "IFRAME" == $activeElement$$1$$.nodeName;) {
          try {
            var $tempDoc$$ = $activeElement$$1$$.contentDocument || $activeElement$$1$$.contentWindow.document
          }catch($e$$46$$) {
            break
          }
          $doc$$34$$ = $tempDoc$$;
          $activeElement$$1$$ = $doc$$34$$.activeElement
        }
        $JSCompiler_StaticMethods_listen$$(this.$handler_$, $doc$$34$$, "mousedown", this.$onDocumentMouseDown_$, $JSCompiler_alias_TRUE$$);
        $JSCompiler_StaticMethods_listen$$(this.$handler_$, $doc$$34$$, "deactivate", this.$onDocumentBlur_$)
      }else {
        $JSCompiler_StaticMethods_listen$$(this.$handler_$, $doc$$34$$, "blur", this.$onDocumentBlur_$)
      }
    }
    "toggle_display" == this.$type_$ ? (this.$element_$.style.visibility = "visible", $goog$style$showElement$$(this.$element_$, $JSCompiler_alias_TRUE$$)) : "move_offscreen" == this.$type_$ && this.$reposition$();
    this.$isVisible_$ = $JSCompiler_alias_TRUE$$;
    this.$showTransition_$ ? ($goog$events$listenOnce$$(this.$showTransition_$, "end", this.$onShow_$, $JSCompiler_alias_FALSE$$, this), this.$showTransition_$.play()) : this.$onShow_$()
  }
};
$JSCompiler_prototypeAlias$$.$hide_$ = function $$JSCompiler_prototypeAlias$$$$hide_$$($opt_target$$2$$) {
  if(!this.$isVisible_$ || !this.dispatchEvent({type:"beforehide", target:$opt_target$$2$$})) {
    return $JSCompiler_alias_FALSE$$
  }
  this.$handler_$ && $JSCompiler_StaticMethods_removeAll$$(this.$handler_$);
  this.$isVisible_$ = $JSCompiler_alias_FALSE$$;
  this.$hideTransition_$ ? ($goog$events$listenOnce$$(this.$hideTransition_$, "end", $goog$partial$$(this.$continueHidingPopup_$, $opt_target$$2$$), $JSCompiler_alias_FALSE$$, this), this.$hideTransition_$.play()) : this.$continueHidingPopup_$($opt_target$$2$$);
  return $JSCompiler_alias_TRUE$$
};
$JSCompiler_prototypeAlias$$.$continueHidingPopup_$ = function $$JSCompiler_prototypeAlias$$$$continueHidingPopup_$$($opt_target$$3$$) {
  "toggle_display" == this.$type_$ ? this.$shouldHideAsync_$ ? $goog$Timer$callOnce$$(this.$hidePopupElement_$, 0, this) : this.$hidePopupElement_$() : "move_offscreen" == this.$type_$ && (this.$element_$.style.left = "-200px", this.$element_$.style.top = "-200px");
  $goog$now$$();
  this.dispatchEvent({type:"hide", target:$opt_target$$3$$})
};
$JSCompiler_prototypeAlias$$.$hidePopupElement_$ = function $$JSCompiler_prototypeAlias$$$$hidePopupElement_$$() {
  this.$element_$.style.visibility = "hidden";
  $goog$style$showElement$$(this.$element_$, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$onShow_$ = function $$JSCompiler_prototypeAlias$$$$onShow_$$() {
  this.$lastShowTime_$ = $goog$now$$();
  this.dispatchEvent("show")
};
$JSCompiler_prototypeAlias$$.$onDocumentMouseDown_$ = function $$JSCompiler_prototypeAlias$$$$onDocumentMouseDown_$$($e$$47_target$$49$$) {
  $e$$47_target$$49$$ = $e$$47_target$$49$$.target;
  !$goog$dom$contains$$(this.$element_$, $e$$47_target$$49$$) && ((!this.$autoHideRegion_$ || $goog$dom$contains$$(this.$autoHideRegion_$, $e$$47_target$$49$$)) && !(150 > $goog$now$$() - this.$lastShowTime_$)) && this.$hide_$($e$$47_target$$49$$)
};
$JSCompiler_prototypeAlias$$.$onDocumentKeyDown_$ = function $$JSCompiler_prototypeAlias$$$$onDocumentKeyDown_$$($e$$48$$) {
  27 == $e$$48$$.keyCode && this.$hide_$($e$$48$$.target) && ($e$$48$$.preventDefault(), $e$$48$$.stopPropagation())
};
$JSCompiler_prototypeAlias$$.$onDocumentBlur_$ = function $$JSCompiler_prototypeAlias$$$$onDocumentBlur_$$($activeElement$$2_e$$49$$) {
  if(this.$enableCrossIframeDismissal_$) {
    var $doc$$35$$ = $goog$dom$getOwnerDocument$$(this.$element_$);
    if($goog$userAgent$IE$$ || $goog$userAgent$OPERA$$) {
      if($activeElement$$2_e$$49$$ = $doc$$35$$.activeElement, !$activeElement$$2_e$$49$$ || $goog$dom$contains$$(this.$element_$, $activeElement$$2_e$$49$$) || "BODY" == $activeElement$$2_e$$49$$.tagName) {
        return
      }
    }else {
      if($activeElement$$2_e$$49$$.target != $doc$$35$$) {
        return
      }
    }
    150 > $goog$now$$() - this.$lastShowTime_$ || this.$hide_$()
  }
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $goog$ui$PopupBase$$.$superClass_$.$disposeInternal$.call(this);
  this.$handler_$.$dispose$();
  $goog$dispose$$(this.$showTransition_$);
  $goog$dispose$$(this.$hideTransition_$);
  delete this.$element_$;
  delete this.$handler_$
};
function $goog$events$FocusHandler$$($element$$119_typeOut$$) {
  this.$element_$ = $element$$119_typeOut$$;
  $element$$119_typeOut$$ = $goog$userAgent$IE$$ ? "focusout" : "blur";
  this.$listenKeyIn_$ = $goog$events$listen$$(this.$element_$, $goog$userAgent$IE$$ ? "focusin" : "focus", this, !$goog$userAgent$IE$$);
  this.$listenKeyOut_$ = $goog$events$listen$$(this.$element_$, $element$$119_typeOut$$, this, !$goog$userAgent$IE$$)
}
$goog$inherits$$($goog$events$FocusHandler$$, $goog$events$EventTarget$$);
$goog$events$FocusHandler$$.prototype.handleEvent = function $$goog$events$FocusHandler$$$$handleEvent$($e$$50$$) {
  var $event$$5$$ = new $goog$events$BrowserEvent$$($e$$50$$.$event_$);
  $event$$5$$.type = "focusin" == $e$$50$$.type || "focus" == $e$$50$$.type ? "focusin" : "focusout";
  try {
    this.dispatchEvent($event$$5$$)
  }finally {
    $event$$5$$.$dispose$()
  }
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
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-modalpopup");
$JSCompiler_prototypeAlias$$.$getBackgroundElement$ = $JSCompiler_get$$("$bgEl_$");
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  $goog$ui$ModalPopup$$.$superClass_$.$createDom$.call(this);
  var $element$$120$$ = this.$getElement$();
  $goog$dom$classes$add$$($element$$120$$, this.$getCssClass$());
  $goog$dom$setFocusableTabIndex$$($element$$120$$, $JSCompiler_alias_TRUE$$);
  $goog$style$showElement$$($element$$120$$, $JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_manageBackgroundDom_$$(this);
  $JSCompiler_StaticMethods_createTabCatcher_$$(this)
};
function $JSCompiler_StaticMethods_manageBackgroundDom_$$($JSCompiler_StaticMethods_manageBackgroundDom_$self$$) {
  if($JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$useIframeMask_$ && !$JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgIframeEl_$) {
    var $JSCompiler_inline_result$$483$$;
    $JSCompiler_inline_result$$483$$ = $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$getDomHelper$().$createDom$("iframe", {frameborder:0, style:"border:0;vertical-align:bottom;", src:'javascript:""'});
    $JSCompiler_StaticMethods_manageBackgroundDom_$self$$.$bgIframeEl_$ = $JSCompiler_inline_result$$483$$;
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
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$121$$) {
  return!!$element$$121$$ && "DIV" == $element$$121$$.tagName
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$122$$) {
  $goog$ui$ModalPopup$$.$superClass_$.$decorateInternal$.call(this, $element$$122$$);
  $goog$dom$classes$add$$(this.$getElement$(), this.$getCssClass$());
  $JSCompiler_StaticMethods_manageBackgroundDom_$$(this);
  $JSCompiler_StaticMethods_createTabCatcher_$$(this);
  $goog$style$showElement$$(this.$getElement$(), $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $goog$asserts$assert$$(!!this.$bgEl_$, "Background element must not be null.");
  if(this.$bgIframeEl_$) {
    var $refNode$$inline_1149_refNode$$inline_1152_refNode$$inline_490$$ = this.$getElement$();
    $refNode$$inline_1149_refNode$$inline_1152_refNode$$inline_490$$.parentNode && $refNode$$inline_1149_refNode$$inline_1152_refNode$$inline_490$$.parentNode.insertBefore(this.$bgIframeEl_$, $refNode$$inline_1149_refNode$$inline_1152_refNode$$inline_490$$)
  }
  $refNode$$inline_1149_refNode$$inline_1152_refNode$$inline_490$$ = this.$getElement$();
  $refNode$$inline_1149_refNode$$inline_1152_refNode$$inline_490$$.parentNode && $refNode$$inline_1149_refNode$$inline_1152_refNode$$inline_490$$.parentNode.insertBefore(this.$bgEl_$, $refNode$$inline_1149_refNode$$inline_1152_refNode$$inline_490$$);
  $goog$ui$ModalPopup$$.$superClass_$.$enterDocument$.call(this);
  $refNode$$inline_1149_refNode$$inline_1152_refNode$$inline_490$$ = this.$getElement$();
  $refNode$$inline_1149_refNode$$inline_1152_refNode$$inline_490$$.parentNode && $refNode$$inline_1149_refNode$$inline_1152_refNode$$inline_490$$.parentNode.insertBefore(this.$tabCatcherElement_$, $refNode$$inline_1149_refNode$$inline_1152_refNode$$inline_490$$.nextSibling);
  this.$focusHandler_$ = new $goog$events$FocusHandler$$($JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()));
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$focusHandler_$, "focusin", this.$onFocus_$)
};
$JSCompiler_prototypeAlias$$.$exitDocument$ = function $$JSCompiler_prototypeAlias$$$$exitDocument$$() {
  this.$isVisible$() && this.$setVisible$($JSCompiler_alias_FALSE$$);
  $goog$dispose$$(this.$focusHandler_$);
  $goog$ui$ModalPopup$$.$superClass_$.$exitDocument$.call(this);
  $goog$dom$removeNode$$(this.$bgIframeEl_$);
  $goog$dom$removeNode$$(this.$bgEl_$);
  $goog$dom$removeNode$$(this.$tabCatcherElement_$)
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($visible$$3$$) {
  $goog$asserts$assert$$(this.$inDocument_$, "ModalPopup must be rendered first.");
  $visible$$3$$ != this.$visible_$ && (this.$popupShowTransition_$ && this.$popupShowTransition_$.stop(), this.$bgShowTransition_$ && this.$bgShowTransition_$.stop(), this.$popupHideTransition_$ && this.$popupHideTransition_$.stop(), this.$bgHideTransition_$ && this.$bgHideTransition_$.stop(), $visible$$3$$ ? this.$show_$() : this.$hide_$())
};
$JSCompiler_prototypeAlias$$.$show_$ = function $$JSCompiler_prototypeAlias$$$$show_$$() {
  this.dispatchEvent("beforeshow") && (this.$resizeBackground_$(), this.$reposition$(), $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), $JSCompiler_StaticMethods_getWindow$$(this.$getDomHelper$()), "resize", this.$resizeBackground_$), $JSCompiler_StaticMethods_showPopupElement_$$(this, $JSCompiler_alias_TRUE$$), this.focus(), this.$visible_$ = $JSCompiler_alias_TRUE$$, this.$popupShowTransition_$ && this.$bgShowTransition_$ ? ($goog$events$listenOnce$$(this.$popupShowTransition_$, "end", 
  this.$onShow$, $JSCompiler_alias_FALSE$$, this), this.$bgShowTransition_$.play(), this.$popupShowTransition_$.play()) : this.$onShow$())
};
$JSCompiler_prototypeAlias$$.$hide_$ = function $$JSCompiler_prototypeAlias$$$$hide_$$() {
  this.dispatchEvent("beforehide") && ($JSCompiler_StaticMethods_unlisten$$(this.$getHandler$(), $JSCompiler_StaticMethods_getWindow$$(this.$getDomHelper$()), "resize", this.$resizeBackground_$), this.$visible_$ = $JSCompiler_alias_FALSE$$, this.$popupHideTransition_$ && this.$bgHideTransition_$ ? ($goog$events$listenOnce$$(this.$popupHideTransition_$, "end", this.$onHide$, $JSCompiler_alias_FALSE$$, this), this.$bgHideTransition_$.play(), this.$popupHideTransition_$.play()) : this.$onHide$())
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
$JSCompiler_prototypeAlias$$.$isVisible$ = $JSCompiler_get$$("$visible_$");
$JSCompiler_prototypeAlias$$.focus = function $$JSCompiler_prototypeAlias$$$focus$() {
  this.$focusElement_$()
};
$JSCompiler_prototypeAlias$$.$resizeBackground_$ = function $$JSCompiler_prototypeAlias$$$$resizeBackground_$$() {
  this.$bgIframeEl_$ && $goog$style$showElement$$(this.$bgIframeEl_$, $JSCompiler_alias_FALSE$$);
  this.$bgEl_$ && $goog$style$showElement$$(this.$bgEl_$, $JSCompiler_alias_FALSE$$);
  var $doc$$37_h$$7$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()), $viewSize$$ = $goog$dom$getViewportSize_$$($goog$dom$getWindow$$($doc$$37_h$$7$$) || window || window), $w$$7$$ = Math.max($doc$$37_h$$7$$.body.scrollWidth, $viewSize$$.width), $doc$$37_h$$7$$ = Math.max($doc$$37_h$$7$$.body.scrollHeight, $viewSize$$.height);
  this.$bgIframeEl_$ && ($goog$style$showElement$$(this.$bgIframeEl_$, $JSCompiler_alias_TRUE$$), $goog$style$setSize$$(this.$bgIframeEl_$, $w$$7$$, $doc$$37_h$$7$$));
  this.$bgEl_$ && ($goog$style$showElement$$(this.$bgEl_$, $JSCompiler_alias_TRUE$$), $goog$style$setSize$$(this.$bgEl_$, $w$$7$$, $doc$$37_h$$7$$))
};
$JSCompiler_prototypeAlias$$.$reposition$ = function $$JSCompiler_prototypeAlias$$$$reposition$$() {
  var $doc$$38_left$$10_x$$65$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()), $viewSize$$1_win$$5$$ = $goog$dom$getWindow$$($doc$$38_left$$10_x$$65$$) || window;
  if("fixed" == $goog$style$getComputedPosition$$(this.$getElement$())) {
    var $scroll_top$$8_y$$43$$ = $doc$$38_left$$10_x$$65$$ = 0
  }else {
    $scroll_top$$8_y$$43$$ = $JSCompiler_StaticMethods_getDocumentScroll$$(this.$getDomHelper$()), $doc$$38_left$$10_x$$65$$ = $scroll_top$$8_y$$43$$.x, $scroll_top$$8_y$$43$$ = $scroll_top$$8_y$$43$$.y
  }
  var $popupSize$$ = $goog$style$getSize$$(this.$getElement$()), $viewSize$$1_win$$5$$ = $goog$dom$getViewportSize_$$($viewSize$$1_win$$5$$ || window), $doc$$38_left$$10_x$$65$$ = Math.max($doc$$38_left$$10_x$$65$$ + $viewSize$$1_win$$5$$.width / 2 - $popupSize$$.width / 2, 0), $scroll_top$$8_y$$43$$ = Math.max($scroll_top$$8_y$$43$$ + $viewSize$$1_win$$5$$.height / 2 - $popupSize$$.height / 2, 0);
  $goog$style$setPosition$$(this.$getElement$(), $doc$$38_left$$10_x$$65$$, $scroll_top$$8_y$$43$$);
  $goog$style$setPosition$$(this.$tabCatcherElement_$, $doc$$38_left$$10_x$$65$$, $scroll_top$$8_y$$43$$)
};
$JSCompiler_prototypeAlias$$.$onFocus_$ = function $$JSCompiler_prototypeAlias$$$$onFocus_$$($e$$51$$) {
  $e$$51$$.target == this.$tabCatcherElement_$ && $goog$Timer$callOnce$$(this.$focusElement_$, 0, this)
};
$JSCompiler_prototypeAlias$$.$focusElement_$ = function $$JSCompiler_prototypeAlias$$$$focusElement_$$() {
  try {
    $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()).body.focus(), this.$getElement$().focus()
  }catch($e$$52$$) {
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
function $goog$structs$getValues$$($col$$1$$) {
  if("function" == typeof $col$$1$$.$getValues$) {
    return $col$$1$$.$getValues$()
  }
  if($goog$isString$$($col$$1$$)) {
    return $col$$1$$.split("")
  }
  if($goog$isArrayLike$$($col$$1$$)) {
    for(var $rv$$16$$ = [], $l$$12$$ = $col$$1$$.length, $i$$83$$ = 0;$i$$83$$ < $l$$12$$;$i$$83$$++) {
      $rv$$16$$.push($col$$1$$[$i$$83$$])
    }
    return $rv$$16$$
  }
  return $goog$object$getValues$$($col$$1$$)
}
function $goog$structs$forEach$$($col$$6$$, $f$$39$$, $opt_obj$$35$$) {
  if("function" == typeof $col$$6$$.forEach) {
    $col$$6$$.forEach($f$$39$$, $opt_obj$$35$$)
  }else {
    if($goog$isArrayLike$$($col$$6$$) || $goog$isString$$($col$$6$$)) {
      $goog$array$forEach$$($col$$6$$, $f$$39$$, $opt_obj$$35$$)
    }else {
      var $keys$$1_rv$$inline_493$$;
      if("function" == typeof $col$$6$$.$getKeys$) {
        $keys$$1_rv$$inline_493$$ = $col$$6$$.$getKeys$()
      }else {
        if("function" != typeof $col$$6$$.$getValues$) {
          if($goog$isArrayLike$$($col$$6$$) || $goog$isString$$($col$$6$$)) {
            $keys$$1_rv$$inline_493$$ = [];
            for(var $l$$inline_494_values$$5$$ = $col$$6$$.length, $i$$inline_495_l$$14$$ = 0;$i$$inline_495_l$$14$$ < $l$$inline_494_values$$5$$;$i$$inline_495_l$$14$$++) {
              $keys$$1_rv$$inline_493$$.push($i$$inline_495_l$$14$$)
            }
          }else {
            $keys$$1_rv$$inline_493$$ = $goog$object$getKeys$$($col$$6$$)
          }
        }else {
          $keys$$1_rv$$inline_493$$ = $JSCompiler_alias_VOID$$
        }
      }
      for(var $l$$inline_494_values$$5$$ = $goog$structs$getValues$$($col$$6$$), $i$$inline_495_l$$14$$ = $l$$inline_494_values$$5$$.length, $i$$85$$ = 0;$i$$85$$ < $i$$inline_495_l$$14$$;$i$$85$$++) {
        $f$$39$$.call($opt_obj$$35$$, $l$$inline_494_values$$5$$[$i$$85$$], $keys$$1_rv$$inline_493$$ && $keys$$1_rv$$inline_493$$[$i$$85$$], $col$$6$$)
      }
    }
  }
}
;function $goog$structs$Map$$($opt_map$$, $var_args$$71$$) {
  this.$map_$ = {};
  this.$keys_$ = [];
  var $argLength$$2_keys$$inline_499$$ = arguments.length;
  if(1 < $argLength$$2_keys$$inline_499$$) {
    $argLength$$2_keys$$inline_499$$ % 2 && $JSCompiler_alias_THROW$$(Error("Uneven number of arguments"));
    for(var $i$$90_values$$inline_500$$ = 0;$i$$90_values$$inline_500$$ < $argLength$$2_keys$$inline_499$$;$i$$90_values$$inline_500$$ += 2) {
      this.set(arguments[$i$$90_values$$inline_500$$], arguments[$i$$90_values$$inline_500$$ + 1])
    }
  }else {
    if($opt_map$$) {
      $opt_map$$ instanceof $goog$structs$Map$$ ? ($argLength$$2_keys$$inline_499$$ = $opt_map$$.$getKeys$(), $i$$90_values$$inline_500$$ = $opt_map$$.$getValues$()) : ($argLength$$2_keys$$inline_499$$ = $goog$object$getKeys$$($opt_map$$), $i$$90_values$$inline_500$$ = $goog$object$getValues$$($opt_map$$));
      for(var $i$$inline_501$$ = 0;$i$$inline_501$$ < $argLength$$2_keys$$inline_499$$.length;$i$$inline_501$$++) {
        this.set($argLength$$2_keys$$inline_499$$[$i$$inline_501$$], $i$$90_values$$inline_500$$[$i$$inline_501$$])
      }
    }
  }
}
$JSCompiler_prototypeAlias$$ = $goog$structs$Map$$.prototype;
$JSCompiler_prototypeAlias$$.$count_$ = 0;
$JSCompiler_prototypeAlias$$.$getCount$ = $JSCompiler_get$$("$count_$");
$JSCompiler_prototypeAlias$$.$getValues$ = function $$JSCompiler_prototypeAlias$$$$getValues$$() {
  $JSCompiler_StaticMethods_cleanupKeysArray_$$(this);
  for(var $rv$$20$$ = [], $i$$91$$ = 0;$i$$91$$ < this.$keys_$.length;$i$$91$$++) {
    $rv$$20$$.push(this.$map_$[this.$keys_$[$i$$91$$]])
  }
  return $rv$$20$$
};
$JSCompiler_prototypeAlias$$.$getKeys$ = function $$JSCompiler_prototypeAlias$$$$getKeys$$() {
  $JSCompiler_StaticMethods_cleanupKeysArray_$$(this);
  return this.$keys_$.concat()
};
$JSCompiler_prototypeAlias$$.$equals$ = function $$JSCompiler_prototypeAlias$$$$equals$$($otherMap$$, $opt_equalityFn$$) {
  if(this === $otherMap$$) {
    return $JSCompiler_alias_TRUE$$
  }
  if(this.$count_$ != $otherMap$$.$getCount$()) {
    return $JSCompiler_alias_FALSE$$
  }
  var $equalityFn$$ = $opt_equalityFn$$ || $goog$structs$Map$defaultEquals$$;
  $JSCompiler_StaticMethods_cleanupKeysArray_$$(this);
  for(var $key$$59$$, $i$$93$$ = 0;$key$$59$$ = this.$keys_$[$i$$93$$];$i$$93$$++) {
    if(!$equalityFn$$(this.get($key$$59$$), $otherMap$$.get($key$$59$$))) {
      return $JSCompiler_alias_FALSE$$
    }
  }
  return $JSCompiler_alias_TRUE$$
};
function $goog$structs$Map$defaultEquals$$($a$$20$$, $b$$20$$) {
  return $a$$20$$ === $b$$20$$
}
$JSCompiler_prototypeAlias$$.clear = function $$JSCompiler_prototypeAlias$$$clear$() {
  this.$map_$ = {};
  this.$count_$ = this.$keys_$.length = 0
};
function $JSCompiler_StaticMethods_cleanupKeysArray_$$($JSCompiler_StaticMethods_cleanupKeysArray_$self$$) {
  if($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$count_$ != $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length) {
    for(var $srcIndex$$ = 0, $destIndex$$ = 0;$srcIndex$$ < $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length;) {
      var $key$$61$$ = $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$[$srcIndex$$];
      Object.prototype.hasOwnProperty.call($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$map_$, $key$$61$$) && ($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$[$destIndex$$++] = $key$$61$$);
      $srcIndex$$++
    }
    $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length = $destIndex$$
  }
  if($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$count_$ != $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length) {
    for(var $seen$$2$$ = {}, $destIndex$$ = $srcIndex$$ = 0;$srcIndex$$ < $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length;) {
      $key$$61$$ = $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$[$srcIndex$$], Object.prototype.hasOwnProperty.call($seen$$2$$, $key$$61$$) || ($JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$[$destIndex$$++] = $key$$61$$, $seen$$2$$[$key$$61$$] = 1), $srcIndex$$++
    }
    $JSCompiler_StaticMethods_cleanupKeysArray_$self$$.$keys_$.length = $destIndex$$
  }
}
$JSCompiler_prototypeAlias$$.get = function $$JSCompiler_prototypeAlias$$$get$($key$$62$$, $opt_val$$1$$) {
  return Object.prototype.hasOwnProperty.call(this.$map_$, $key$$62$$) ? this.$map_$[$key$$62$$] : $opt_val$$1$$
};
$JSCompiler_prototypeAlias$$.set = function $$JSCompiler_prototypeAlias$$$set$($key$$63$$, $value$$77$$) {
  Object.prototype.hasOwnProperty.call(this.$map_$, $key$$63$$) || (this.$count_$++, this.$keys_$.push($key$$63$$));
  this.$map_$[$key$$63$$] = $value$$77$$
};
$JSCompiler_prototypeAlias$$.$clone$ = function $$JSCompiler_prototypeAlias$$$$clone$$() {
  return new $goog$structs$Map$$(this)
};
function $goog$ui$Dialog$$($opt_class$$4$$, $opt_useIframeMask$$1$$, $opt_domHelper$$7$$) {
  $goog$ui$ModalPopup$$.call(this, $opt_useIframeMask$$1$$, $opt_domHelper$$7$$);
  this.$class_$ = $opt_class$$4$$ || "modal-dialog";
  this.$buttons_$ = $goog$ui$Dialog$ButtonSet$createOkCancel$$()
}
$goog$inherits$$($goog$ui$Dialog$$, $goog$ui$ModalPopup$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$Dialog$$.prototype;
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
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_get$$("$class_$");
$JSCompiler_prototypeAlias$$.$setContent$ = function $$JSCompiler_prototypeAlias$$$$setContent$$($html$$) {
  this.$content_$ = $html$$;
  this.$contentEl_$ && (this.$contentEl_$.innerHTML = $html$$)
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$() {
  this.$getElement$() || this.$render$();
  return this.$contentEl_$
};
$JSCompiler_prototypeAlias$$.$getBackgroundElement$ = function $$JSCompiler_prototypeAlias$$$$getBackgroundElement$$() {
  this.$getElement$() || this.$render$();
  return $goog$ui$Dialog$$.$superClass_$.$getBackgroundElement$.call(this)
};
function $JSCompiler_StaticMethods_setBackgroundElementOpacity$$($JSCompiler_StaticMethods_setBackgroundElementOpacity$self$$, $opacity$$) {
  $JSCompiler_StaticMethods_setBackgroundElementOpacity$self$$.$backgroundElementOpacity_$ = $opacity$$;
  if($JSCompiler_StaticMethods_setBackgroundElementOpacity$self$$.$getElement$()) {
    var $bgEl$$ = $JSCompiler_StaticMethods_setBackgroundElementOpacity$self$$.$getBackgroundElement$();
    $bgEl$$ && $goog$style$setOpacity$$($bgEl$$, $JSCompiler_StaticMethods_setBackgroundElementOpacity$self$$.$backgroundElementOpacity_$)
  }
}
function $JSCompiler_StaticMethods_setDraggingEnabled_$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$, $enabled$$2$$) {
  if($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$getElement$()) {
    var $element$$inline_507$$ = $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$, $className$$inline_508$$ = $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$class_$ + "-title-draggable";
    $enabled$$2$$ ? $goog$dom$classes$add$$($element$$inline_507$$, $className$$inline_508$$) : $goog$dom$classes$remove$$($element$$inline_507$$, $className$$inline_508$$)
  }
  $enabled$$2$$ && !$JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ ? ($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ = new $goog$fx$Dragger$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$getElement$(), $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$), $goog$dom$classes$add$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$titleEl_$, $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$class_$ + "-title-draggable"), $goog$events$listen$$($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$, 
  "start", $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$setDraggerLimits_$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_setDraggingEnabled_$self$$)) : !$enabled$$2$$ && $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ && ($JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$.$dispose$(), $JSCompiler_StaticMethods_setDraggingEnabled_$self$$.$dragger_$ = $JSCompiler_alias_NULL$$)
}
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  $goog$ui$Dialog$$.$superClass_$.$createDom$.call(this);
  var $JSCompiler_StaticMethods_attachToElement$self$$inline_917_element$$123$$ = this.$getElement$();
  $goog$asserts$assert$$($JSCompiler_StaticMethods_attachToElement$self$$inline_917_element$$123$$, "getElement() returns null");
  var $dom$$3$$ = this.$getDomHelper$();
  this.$titleEl_$ = $dom$$3$$.$createDom$("div", {className:this.$class_$ + "-title", id:$JSCompiler_StaticMethods_getId$$(this)}, this.$titleTextEl_$ = $dom$$3$$.$createDom$("span", this.$class_$ + "-title-text", this.$title_$), this.$titleCloseEl_$ = $dom$$3$$.$createDom$("span", this.$class_$ + "-title-close"));
  $goog$dom$append$$($JSCompiler_StaticMethods_attachToElement$self$$inline_917_element$$123$$, this.$titleEl_$, this.$contentEl_$ = $dom$$3$$.$createDom$("div", this.$class_$ + "-content"), this.$buttonEl_$ = $dom$$3$$.$createDom$("div", this.$class_$ + "-buttons"));
  this.$titleId_$ = this.$titleEl_$.id;
  $goog$dom$a11y$setRole$$($JSCompiler_StaticMethods_attachToElement$self$$inline_917_element$$123$$, "dialog");
  $JSCompiler_StaticMethods_attachToElement$self$$inline_917_element$$123$$.setAttribute("aria-labelledby", this.$titleId_$ || "");
  this.$content_$ && (this.$contentEl_$.innerHTML = this.$content_$);
  $goog$style$showElement$$(this.$titleCloseEl_$, this.$hasTitleCloseButton_$);
  this.$buttons_$ && ($JSCompiler_StaticMethods_attachToElement$self$$inline_917_element$$123$$ = this.$buttons_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_917_element$$123$$.$element_$ = this.$buttonEl_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_917_element$$123$$.$render$());
  $goog$style$showElement$$(this.$buttonEl_$, !!this.$buttons_$);
  $JSCompiler_StaticMethods_setBackgroundElementOpacity$$(this, this.$backgroundElementOpacity_$)
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($JSCompiler_StaticMethods_attachToElement$self$$inline_920_buttonsClass_contentClass_element$$124_titleClass$$) {
  $goog$ui$Dialog$$.$superClass_$.$decorateInternal$.call(this, $JSCompiler_StaticMethods_attachToElement$self$$inline_920_buttonsClass_contentClass_element$$124_titleClass$$);
  $JSCompiler_StaticMethods_attachToElement$self$$inline_920_buttonsClass_contentClass_element$$124_titleClass$$ = this.$class_$ + "-content";
  (this.$contentEl_$ = $goog$dom$getElementsByTagNameAndClass_$$($JSCompiler_StaticMethods_attachToElement$self$$inline_920_buttonsClass_contentClass_element$$124_titleClass$$, this.$getElement$())[0]) ? this.$content_$ = this.$contentEl_$.innerHTML : (this.$contentEl_$ = this.$getDomHelper$().$createDom$("div", $JSCompiler_StaticMethods_attachToElement$self$$inline_920_buttonsClass_contentClass_element$$124_titleClass$$), this.$content_$ && (this.$contentEl_$.innerHTML = this.$content_$), this.$getElement$().appendChild(this.$contentEl_$));
  var $JSCompiler_StaticMethods_attachToElement$self$$inline_920_buttonsClass_contentClass_element$$124_titleClass$$ = this.$class_$ + "-title", $titleTextClass$$ = this.$class_$ + "-title-text", $titleCloseClass$$ = this.$class_$ + "-title-close";
  (this.$titleEl_$ = $goog$dom$getElementsByTagNameAndClass_$$($JSCompiler_StaticMethods_attachToElement$self$$inline_920_buttonsClass_contentClass_element$$124_titleClass$$, this.$getElement$())[0]) ? (this.$titleTextEl_$ = $goog$dom$getElementsByTagNameAndClass_$$($titleTextClass$$, this.$titleEl_$)[0], this.$titleCloseEl_$ = $goog$dom$getElementsByTagNameAndClass_$$($titleCloseClass$$, this.$titleEl_$)[0], this.$titleEl_$.id || (this.$titleEl_$.id = $JSCompiler_StaticMethods_getId$$(this))) : 
  (this.$titleEl_$ = this.$getDomHelper$().$createDom$("div", {className:$JSCompiler_StaticMethods_attachToElement$self$$inline_920_buttonsClass_contentClass_element$$124_titleClass$$, id:$JSCompiler_StaticMethods_getId$$(this)}), this.$getElement$().insertBefore(this.$titleEl_$, this.$contentEl_$));
  this.$titleId_$ = this.$titleEl_$.id;
  this.$titleTextEl_$ ? this.$title_$ = $goog$dom$getTextContent$$(this.$titleTextEl_$) : (this.$titleTextEl_$ = this.$getDomHelper$().$createDom$("span", $titleTextClass$$, this.$title_$), this.$titleEl_$.appendChild(this.$titleTextEl_$));
  this.$getElement$().setAttribute("aria-labelledby", this.$titleId_$ || "");
  this.$titleCloseEl_$ || (this.$titleCloseEl_$ = this.$getDomHelper$().$createDom$("span", $titleCloseClass$$), this.$titleEl_$.appendChild(this.$titleCloseEl_$));
  $goog$style$showElement$$(this.$titleCloseEl_$, this.$hasTitleCloseButton_$);
  $JSCompiler_StaticMethods_attachToElement$self$$inline_920_buttonsClass_contentClass_element$$124_titleClass$$ = this.$class_$ + "-buttons";
  (this.$buttonEl_$ = $goog$dom$getElementsByTagNameAndClass_$$($JSCompiler_StaticMethods_attachToElement$self$$inline_920_buttonsClass_contentClass_element$$124_titleClass$$, this.$getElement$())[0]) ? (this.$buttons_$ = new $goog$ui$Dialog$ButtonSet$$(this.$getDomHelper$()), this.$buttons_$.$decorate$(this.$buttonEl_$)) : (this.$buttonEl_$ = this.$getDomHelper$().$createDom$("div", $JSCompiler_StaticMethods_attachToElement$self$$inline_920_buttonsClass_contentClass_element$$124_titleClass$$), this.$getElement$().appendChild(this.$buttonEl_$), 
  this.$buttons_$ && ($JSCompiler_StaticMethods_attachToElement$self$$inline_920_buttonsClass_contentClass_element$$124_titleClass$$ = this.$buttons_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_920_buttonsClass_contentClass_element$$124_titleClass$$.$element_$ = this.$buttonEl_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_920_buttonsClass_contentClass_element$$124_titleClass$$.$render$()), $goog$style$showElement$$(this.$buttonEl_$, !!this.$buttons_$));
  $JSCompiler_StaticMethods_setBackgroundElementOpacity$$(this, this.$backgroundElementOpacity_$)
};
$JSCompiler_prototypeAlias$$.$enterDocument$ = function $$JSCompiler_prototypeAlias$$$$enterDocument$$() {
  $goog$ui$Dialog$$.$superClass_$.$enterDocument$.call(this);
  $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "keydown", this.$onKey_$), this.$getElement$(), "keypress", this.$onKey_$);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$buttonEl_$, "click", this.$onButtonClick_$);
  $JSCompiler_StaticMethods_setDraggingEnabled_$$(this, this.$draggable_$);
  $JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$titleCloseEl_$, "click", this.$onTitleCloseClick_$);
  $goog$dom$a11y$setRole$$(this.$getElement$(), "dialog");
  "" !== this.$titleTextEl_$.id && this.$getElement$().setAttribute("aria-labelledby", this.$titleTextEl_$.id);
  if(!this.$modal_$ && (this.$modal_$ = $JSCompiler_alias_FALSE$$, this.$inDocument_$)) {
    var $dom$$inline_525$$ = this.$getDomHelper$(), $bg$$inline_526$$ = this.$getBackgroundElement$();
    $dom$$inline_525$$.removeNode(this.$bgIframeEl_$);
    $dom$$inline_525$$.removeNode($bg$$inline_526$$)
  }
};
$JSCompiler_prototypeAlias$$.$exitDocument$ = function $$JSCompiler_prototypeAlias$$$$exitDocument$$() {
  this.$isVisible$() && this.$setVisible$($JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_setDraggingEnabled_$$(this, $JSCompiler_alias_FALSE$$);
  $goog$ui$Dialog$$.$superClass_$.$exitDocument$.call(this)
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($visible$$5$$) {
  $visible$$5$$ != this.$isVisible$() && (this.$inDocument_$ || this.$render$(), $goog$ui$Dialog$$.$superClass_$.$setVisible$.call(this, $visible$$5$$))
};
$JSCompiler_prototypeAlias$$.$onShow$ = function $$JSCompiler_prototypeAlias$$$$onShow$$() {
  $goog$ui$Dialog$$.$superClass_$.$onShow$.call(this);
  this.dispatchEvent($goog$ui$Dialog$EventType$AFTER_SHOW$$)
};
$JSCompiler_prototypeAlias$$.$onHide$ = function $$JSCompiler_prototypeAlias$$$$onHide$$() {
  $goog$ui$Dialog$$.$superClass_$.$onHide$.call(this);
  this.dispatchEvent($goog$ui$Dialog$EventType$AFTER_HIDE$$);
  this.$disposeOnHide_$ && this.$dispose$()
};
$JSCompiler_prototypeAlias$$.focus = function $$JSCompiler_prototypeAlias$$$focus$() {
  $goog$ui$Dialog$$.$superClass_$.focus.call(this);
  if(this.$buttons_$) {
    var $defaultButton$$ = this.$buttons_$.$defaultButton_$;
    if($defaultButton$$) {
      for(var $doc$$39$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()), $buttons$$ = this.$buttonEl_$.getElementsByTagName("button"), $i$$98$$ = 0, $button$$17$$;$button$$17$$ = $buttons$$[$i$$98$$];$i$$98$$++) {
        if($button$$17$$.name == $defaultButton$$) {
          try {
            if($goog$userAgent$WEBKIT$$ || $goog$userAgent$OPERA$$) {
              var $temp$$1$$ = $doc$$39$$.createElement("input");
              $temp$$1$$.style.cssText = "position:fixed;width:0;height:0;left:0;top:0;";
              this.$getElement$().appendChild($temp$$1$$);
              $temp$$1$$.focus();
              this.$getElement$().removeChild($temp$$1$$)
            }
            $button$$17$$.focus()
          }catch($e$$55$$) {
          }
          break
        }
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$setDraggerLimits_$ = function $$JSCompiler_prototypeAlias$$$$setDraggerLimits_$$() {
  var $doc$$40_h$$8$$ = $JSCompiler_StaticMethods_getDocument$$(this.$getDomHelper$()), $viewSize$$2$$ = $goog$dom$getViewportSize_$$($goog$dom$getWindow$$($doc$$40_h$$8$$) || window || window), $w$$8$$ = Math.max($doc$$40_h$$8$$.body.scrollWidth, $viewSize$$2$$.width), $doc$$40_h$$8$$ = Math.max($doc$$40_h$$8$$.body.scrollHeight, $viewSize$$2$$.height), $dialogSize$$ = $goog$style$getSize$$(this.$getElement$());
  this.$dragger_$.$limits$ = "fixed" == $goog$style$getComputedPosition$$(this.$getElement$()) ? new $goog$math$Rect$$(0, 0, Math.max(0, $viewSize$$2$$.width - $dialogSize$$.width), Math.max(0, $viewSize$$2$$.height - $dialogSize$$.height)) || new $goog$math$Rect$$(NaN, NaN, NaN, NaN) : new $goog$math$Rect$$(0, 0, $w$$8$$ - $dialogSize$$.width, $doc$$40_h$$8$$ - $dialogSize$$.height) || new $goog$math$Rect$$(NaN, NaN, NaN, NaN)
};
$JSCompiler_prototypeAlias$$.$onTitleCloseClick_$ = function $$JSCompiler_prototypeAlias$$$$onTitleCloseClick_$$() {
  if(this.$hasTitleCloseButton_$) {
    var $bs_caption$$2$$ = this.$buttons_$, $key$$68$$ = $bs_caption$$2$$ && $bs_caption$$2$$.$cancelButton_$;
    $key$$68$$ ? ($bs_caption$$2$$ = $bs_caption$$2$$.get($key$$68$$), this.dispatchEvent(new $goog$ui$Dialog$Event$$($key$$68$$, $bs_caption$$2$$)) && this.$setVisible$($JSCompiler_alias_FALSE$$)) : this.$setVisible$($JSCompiler_alias_FALSE$$)
  }
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  this.$buttonEl_$ = this.$titleCloseEl_$ = $JSCompiler_alias_NULL$$;
  $goog$ui$Dialog$$.$superClass_$.$disposeInternal$.call(this)
};
$JSCompiler_prototypeAlias$$.$onButtonClick_$ = function $$JSCompiler_prototypeAlias$$$$onButtonClick_$$($button$$18_e$$58_el$$inline_537_key$$69$$) {
  a: {
    for($button$$18_e$$58_el$$inline_537_key$$69$$ = $button$$18_e$$58_el$$inline_537_key$$69$$.target;$button$$18_e$$58_el$$inline_537_key$$69$$ != $JSCompiler_alias_NULL$$ && $button$$18_e$$58_el$$inline_537_key$$69$$ != this.$buttonEl_$;) {
      if("BUTTON" == $button$$18_e$$58_el$$inline_537_key$$69$$.tagName) {
        break a
      }
      $button$$18_e$$58_el$$inline_537_key$$69$$ = $button$$18_e$$58_el$$inline_537_key$$69$$.parentNode
    }
    $button$$18_e$$58_el$$inline_537_key$$69$$ = $JSCompiler_alias_NULL$$
  }
  if($button$$18_e$$58_el$$inline_537_key$$69$$ && !$button$$18_e$$58_el$$inline_537_key$$69$$.disabled) {
    var $button$$18_e$$58_el$$inline_537_key$$69$$ = $button$$18_e$$58_el$$inline_537_key$$69$$.name, $caption$$3$$ = this.$buttons_$.get($button$$18_e$$58_el$$inline_537_key$$69$$);
    this.dispatchEvent(new $goog$ui$Dialog$Event$$($button$$18_e$$58_el$$inline_537_key$$69$$, $caption$$3$$)) && this.$setVisible$($JSCompiler_alias_FALSE$$)
  }
};
$JSCompiler_prototypeAlias$$.$onKey_$ = function $$JSCompiler_prototypeAlias$$$$onKey_$$($e$$59$$) {
  var $caption$$4_close$$ = $JSCompiler_alias_FALSE$$, $hasHandler$$ = $JSCompiler_alias_FALSE$$, $buttonSet$$ = this.$buttons_$, $isSpecialFormElement_target$$50$$ = $e$$59$$.target;
  if("keydown" == $e$$59$$.type) {
    if(this.$escapeToCancel_$ && 27 == $e$$59$$.keyCode) {
      var $cancel_key$$70$$ = $buttonSet$$ && $buttonSet$$.$cancelButton_$, $isSpecialFormElement_target$$50$$ = "SELECT" == $isSpecialFormElement_target$$50$$.tagName && !$isSpecialFormElement_target$$50$$.disabled;
      $cancel_key$$70$$ && !$isSpecialFormElement_target$$50$$ ? ($hasHandler$$ = $JSCompiler_alias_TRUE$$, $caption$$4_close$$ = $buttonSet$$.get($cancel_key$$70$$), $caption$$4_close$$ = this.dispatchEvent(new $goog$ui$Dialog$Event$$($cancel_key$$70$$, $caption$$4_close$$))) : $isSpecialFormElement_target$$50$$ || ($caption$$4_close$$ = $JSCompiler_alias_TRUE$$)
    }else {
      9 == $e$$59$$.keyCode && ($e$$59$$.shiftKey && $isSpecialFormElement_target$$50$$ == this.$getElement$()) && ($hasHandler$$ = $JSCompiler_alias_TRUE$$)
    }
  }else {
    if(13 == $e$$59$$.keyCode) {
      if("BUTTON" == $isSpecialFormElement_target$$50$$.tagName) {
        $cancel_key$$70$$ = $isSpecialFormElement_target$$50$$.name
      }else {
        if($buttonSet$$) {
          var $defaultKey$$ = $buttonSet$$.$defaultButton_$, $JSCompiler_temp$$36_buttons$$inline_541_defaultButton$$1$$;
          if($JSCompiler_temp$$36_buttons$$inline_541_defaultButton$$1$$ = $defaultKey$$) {
            a: {
              $JSCompiler_temp$$36_buttons$$inline_541_defaultButton$$1$$ = $buttonSet$$.$element_$.getElementsByTagName("BUTTON");
              for(var $i$$inline_542$$ = 0, $nextButton$$inline_543$$;$nextButton$$inline_543$$ = $JSCompiler_temp$$36_buttons$$inline_541_defaultButton$$1$$[$i$$inline_542$$];$i$$inline_542$$++) {
                if($nextButton$$inline_543$$.name == $defaultKey$$ || $nextButton$$inline_543$$.id == $defaultKey$$) {
                  $JSCompiler_temp$$36_buttons$$inline_541_defaultButton$$1$$ = $nextButton$$inline_543$$;
                  break a
                }
              }
              $JSCompiler_temp$$36_buttons$$inline_541_defaultButton$$1$$ = $JSCompiler_alias_NULL$$
            }
          }
          $isSpecialFormElement_target$$50$$ = ("TEXTAREA" == $isSpecialFormElement_target$$50$$.tagName || "SELECT" == $isSpecialFormElement_target$$50$$.tagName) && !$isSpecialFormElement_target$$50$$.disabled;
          $JSCompiler_temp$$36_buttons$$inline_541_defaultButton$$1$$ && (!$JSCompiler_temp$$36_buttons$$inline_541_defaultButton$$1$$.disabled && !$isSpecialFormElement_target$$50$$) && ($cancel_key$$70$$ = $defaultKey$$)
        }
      }
      $cancel_key$$70$$ && $buttonSet$$ && ($hasHandler$$ = $JSCompiler_alias_TRUE$$, $caption$$4_close$$ = this.dispatchEvent(new $goog$ui$Dialog$Event$$($cancel_key$$70$$, "" + $buttonSet$$.get($cancel_key$$70$$))))
    }
  }
  if($caption$$4_close$$ || $hasHandler$$) {
    $e$$59$$.stopPropagation(), $e$$59$$.preventDefault()
  }
  $caption$$4_close$$ && this.$setVisible$($JSCompiler_alias_FALSE$$)
};
function $goog$ui$Dialog$Event$$($key$$71$$, $caption$$5$$) {
  this.type = $goog$ui$Dialog$EventType$SELECT$$;
  this.key = $key$$71$$;
  this.caption = $caption$$5$$
}
$goog$inherits$$($goog$ui$Dialog$Event$$, $goog$events$Event$$);
var $goog$ui$Dialog$EventType$SELECT$$ = "dialogselect", $goog$ui$Dialog$EventType$AFTER_HIDE$$ = "afterhide", $goog$ui$Dialog$EventType$AFTER_SHOW$$ = "aftershow";
function $goog$ui$Dialog$ButtonSet$$($opt_domHelper$$8$$) {
  this.$dom_$ = $opt_domHelper$$8$$ || $goog$dom$getDomHelper$$();
  $goog$structs$Map$$.call(this)
}
$goog$inherits$$($goog$ui$Dialog$ButtonSet$$, $goog$structs$Map$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$Dialog$ButtonSet$$.prototype;
$JSCompiler_prototypeAlias$$.$class_$ = "goog-buttonset";
$JSCompiler_prototypeAlias$$.$defaultButton_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$element_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$cancelButton_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.set = function $$JSCompiler_prototypeAlias$$$set$($key$$72$$, $caption$$6$$, $opt_isDefault$$, $opt_isCancel$$) {
  $goog$structs$Map$$.prototype.set.call(this, $key$$72$$, $caption$$6$$);
  $opt_isDefault$$ && (this.$defaultButton_$ = $key$$72$$);
  $opt_isCancel$$ && (this.$cancelButton_$ = $key$$72$$);
  return this
};
function $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$self$$, $button$$19$$, $opt_isDefault$$1$$, $opt_isCancel$$1$$) {
  return $JSCompiler_StaticMethods_addButton$self$$.set($button$$19$$.key, $button$$19$$.caption, $opt_isDefault$$1$$, $opt_isCancel$$1$$)
}
$JSCompiler_prototypeAlias$$.$render$ = function $$JSCompiler_prototypeAlias$$$$render$$() {
  if(this.$element_$) {
    this.$element_$.innerHTML = "";
    var $domHelper$$3$$ = $goog$dom$getDomHelper$$(this.$element_$);
    $goog$structs$forEach$$(this, function($caption$$7$$, $key$$73$$) {
      var $button$$20$$ = $domHelper$$3$$.$createDom$("button", {name:$key$$73$$}, $caption$$7$$);
      $key$$73$$ == this.$defaultButton_$ && ($button$$20$$.className = this.$class_$ + "-default");
      this.$element_$.appendChild($button$$20$$)
    }, this)
  }
};
$JSCompiler_prototypeAlias$$.$decorate$ = function $$JSCompiler_prototypeAlias$$$$decorate$$($buttons$$2_element$$126$$) {
  if($buttons$$2_element$$126$$ && 1 == $buttons$$2_element$$126$$.nodeType) {
    this.$element_$ = $buttons$$2_element$$126$$;
    for(var $buttons$$2_element$$126$$ = this.$element_$.getElementsByTagName("button"), $i$$99$$ = 0, $button$$21$$, $key$$74$$, $caption$$8$$;$button$$21$$ = $buttons$$2_element$$126$$[$i$$99$$];$i$$99$$++) {
      if($key$$74$$ = $button$$21$$.name || $button$$21$$.id, $caption$$8$$ = $goog$dom$getTextContent$$($button$$21$$) || $button$$21$$.value, $key$$74$$) {
        var $isDefault$$ = 0 == $i$$99$$;
        this.set($key$$74$$, $caption$$8$$, $isDefault$$, $button$$21$$.name == $goog$ui$Dialog$DefaultButtonKeys$CANCEL$$);
        $isDefault$$ && $goog$dom$classes$add$$($button$$21$$, this.$class_$ + "-default")
      }
    }
  }
};
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
$JSCompiler_prototypeAlias$$.$getDomHelper$ = $JSCompiler_get$$("$dom_$");
var $goog$ui$Dialog$DefaultButtonKeys$CANCEL$$ = "cancel", $goog$ui$Dialog$ButtonSet$DefaultButtons$OK$$ = {key:"ok", caption:"OK"}, $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$ = {key:$goog$ui$Dialog$DefaultButtonKeys$CANCEL$$, caption:"Cancel"}, $goog$ui$Dialog$ButtonSet$DefaultButtons$YES$$ = {key:"yes", caption:"Yes"}, $goog$ui$Dialog$ButtonSet$DefaultButtons$NO$$ = {key:"no", caption:"No"}, $goog$ui$Dialog$ButtonSet$DefaultButtons$SAVE$$ = {key:"save", caption:"Save"}, $goog$ui$Dialog$ButtonSet$DefaultButtons$CONTINUE$$ = 
{key:"continue", caption:"Continue"};
function $goog$ui$Dialog$ButtonSet$createOkCancel$$() {
  return $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$OK$$, $JSCompiler_alias_TRUE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$, $JSCompiler_alias_FALSE$$, $JSCompiler_alias_TRUE$$)
}
"undefined" != typeof document && ($JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$OK$$, $JSCompiler_alias_TRUE$$, $JSCompiler_alias_TRUE$$), $goog$ui$Dialog$ButtonSet$createOkCancel$$(), $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$YES$$, $JSCompiler_alias_TRUE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$NO$$, $JSCompiler_alias_FALSE$$, 
$JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$YES$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$NO$$, $JSCompiler_alias_TRUE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$, $JSCompiler_alias_FALSE$$, $JSCompiler_alias_TRUE$$), $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, 
$goog$ui$Dialog$ButtonSet$DefaultButtons$CONTINUE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$SAVE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$, $JSCompiler_alias_TRUE$$, $JSCompiler_alias_TRUE$$));
function $rflect$cal$MainPaneBuilder$$($aViewManager$$8$$, $aMainPane$$, $aTimeManager$$5$$, $aEventManager$$, $aBlockPoolWeek$$, $aBlockPoolAllday$$, $aBlockPoolMonth$$, $aContainerSizeMonitor$$3$$, $aTimeMarker$$) {
  this.$viewManager_$ = $aViewManager$$8$$;
  this.$mainPane_$ = $aMainPane$$;
  this.$timeManager_$ = $aTimeManager$$5$$;
  this.$eventManager_$ = $aEventManager$$;
  this.$blockPoolWeek_$ = $aBlockPoolWeek$$;
  this.$blockPoolAllday_$ = $aBlockPoolAllday$$;
  this.$blockPoolMonth_$ = $aBlockPoolMonth$$;
  this.$containerSizeMonitor_$ = $aContainerSizeMonitor$$3$$;
  this.$timeMarker_$ = $aTimeMarker$$;
  this.$weekDayNameFormatWeek_$ = new $goog$i18n$DateTimeFormat$$("EEE, d MMM");
  this.$cache_$ = {}
}
var $rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$ = '<div id="main-pane" class="main-pane">,<div id="main-pane-header">,<div id="daynames-prefix-wk" style="width:61,px"><div id="daynames-zippy" class="zippy ,"></div>,</div>,<div id="main-pane-header-container" class="main-pane-header-container-wk" style="margin-left:61px,"><div id="main-pane-header-wk-daynames">,<div id="weekmode-daynames-table" style="width:,%">,<div id="dayname," class="dayname-wk" style="margin-left:,%;margin-right:,%;top:,%"><span class=",">,</span></div>,</div>,</div>,<div id="main-pane-header-scrollable" class="," style="height:,px">,<div id="alldayevents-grid-wrapper">,<div id="alldayevents-grid" style="height:,px;width:,%"><div id="wk-ad-mask-cnt"></div>,<div id="weekgrid-ad-col," class="weekgrid-col, wk-ad-layers-cont-outer" style="margin-left:,%;margin-right:,%;top:,%">,<div class="wk-ad-layers-cont">,<div id="wk-ad-dec-layer-col," class="wk-ad-decoration-layer">,<div class="expand-sign-wk-ad-cont">,<div class="expand-sign-wk-ad ,"></div></div>,</div>,<div id="wk-ad-events-layer-col," class="wk-ad-events-layer">,</div>,</div>,</div>,</div>,</div>,</div>,<div id="main-pane-header-wk-zippies">,<div id="weekmode-zippies-table" style="width:,%">,<div class="wk-col-zippy-cont" style="margin-left:,%;margin-right:,%;top:,%">,<div id="wk-zippy-col," class="zippy wk-col-zippy ,"></div>,</div>,</div>,</div>,</div>,</div>,<div id="main-pane-body-scrollable-wk" style="height:,px" class=",">,<div id="hours-container" style="width:60,px">,<div class=","><div class="hour-label ,">,</div></div>,</div>,<div id="grid-table-wrapper-wk" style="margin-left:60px">,<div id="grid-rows-container" class="wk-grid-rows-cont" style="width:,%">,<div class=","></div>,</div>,<div class="grid-table-wk-outer"><div id="grid-table-wk" class="grid-table-wk" style="width:,%"><div id="wk-mask-cnt"></div>,<div id="weekgrid-col," class="weekgrid-col," style="margin-left:,%;margin-right:,%;top:,%">,<div id="wk-dec-layer-in-col," class="wk-decoration-layer">,<div class="expand-sign-wk-cont"><div class="expand-sign-wk ,"></div></div>,<div class="today-mask-wk"></div>,</div>,<div id="wk-events-layer-col," class="wk-events-layer">,<div class="event-rect-wk" style="top:,px; margin-left:,%; margin-right:,%; height:,px; margin-bottom:,px;z-index:,"><div class="event-rect-wk-inner ,"><div class="event-wk-timelabel">, - ,</div>,</div></div>,</div>,</div>,</div></div>,</div>,</div>,</div>'.split(","), 
$rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$ = '<div id="main-pane" class="main-pane">,<div id="main-pane-header">,<div id="daynames-prefix-mn">,</div>,<div id="main-pane-header-container" class="main-pane-header-container-mn">,<div id="main-pane-header-wk-daynames" style="margin-right:,px"><table id="weekmode-daynames-table" cellspacing="0" cellpadding="0">,<tbody><tr>,<td id="dayname,">,</td>,</tr></tbody></table>,</div>,</div>,</div>,<div id="main-pane-body-scrollable-wrapper" style="height:,px;">,<div id="main-pane-header-mn-zippies">,<table id="monthmode-zippies-table" cellspacing="0" cellpadding="0"><tbody>,<tr><td id="mn-zippy-cont-row," style="height:,px;">,<div class="mn-row-zippy-cont">,<div id="mn-zippy-row," class="zippy mn-row-zippy ,"></div>,</div>,</td></tr>,</tbody></table>,</div>,<div id="main-pane-body-scrollable-mn" class=",">,<div id="grid-table-wrapper-outer" style="height:,px;">,<div id="weeknum-cont"><table id="weeknums" cellspacing="0" cellpadding="0">,<tr><td id="weeknum," class="weeknum-label" style="height:,px;"><span class="weeknum-label-inner">,</span></td></tr>,</table>,</div>,<div id="grid-table-wrapper-mn"><div id="mn-mask-cnt"></div>,<div id="grid-cols-container" class="mn-grid-cols-cont"><table id="grid-cols-cont-inner" cellspacing="0" cellpadding="0"><tbody><tr>,<td class="weekgrid-col,">&nbsp;</td>,</tr></tbody></table>,</div>,<table id="grid-table-mn" cellspacing="0" cellpadding="0" class="grid-table-mn"><tbody>,<tr><td id="monthgrid-row," class="monthgrid-row ," style="height:,px;">,<div class="mn-layers-cont">,<div id="mn-dec-layer-row," class="mn-decoration-layer">,<table cellspacing="0" cellpadding="0" class="daynums"><tbody><tr>,<td class="daycell"><div class="daycell-decoration-cont">,<div class="today-mask-mn"></div>,</div><div class="daycell-daynum-outer-cont"><div class="expand-sign-mn-cont"><div class="expand-sign-mn ,"></div>,</div>,<div class="daynum-cont"><div id="daynum-," class="daynum-label ,">,</div>,</div></div>,</td>,</tr></tbody></table>,</div>,<div id="mn-events-layer-row," class="mn-events-layer">,<div style="margin-left:,%; margin-right:,%;top:,px" class="event-rect-mn-outer"><div class="event-rect-mn ,"><div class="event-rect-mn-inner ,">,</div></div></div>,</div>,</div>,</td></tr>,</tbody></table>,</div>,</div>,</div>,</div>,</div>'.split(",");
function $rflect$cal$MainPaneBuilder$buildWeekBlockChip_$$($aSb$$45$$, $aOffset$$22$$, $aEventManager$$2_event$$6$$, $aChip$$5$$, $aTotalCols_lastCol$$, $aStartCol$$, $aColSpan$$) {
  var $pixelStart_shift$$ = 24 * $aChip$$5$$.start / 30, $pixelHeight$$ = 24 * ($aChip$$5$$.end - $aChip$$5$$.start) / 30, $widthQuant$$ = 100 / $aTotalCols_lastCol$$, $aEventManager$$2_event$$6$$ = $aEventManager$$2_event$$6$$.$events_$[$aChip$$5$$.$eventId$], $aTotalCols_lastCol$$ = $aStartCol$$ == $aTotalCols_lastCol$$ - 1;
  $aSb$$45$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$22$$]);
  $aSb$$45$$.append($pixelStart_shift$$);
  $aSb$$45$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$22$$ + 1]);
  $pixelStart_shift$$ = $widthQuant$$ * $aStartCol$$;
  $aSb$$45$$.append($pixelStart_shift$$);
  $aSb$$45$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$22$$ + 2]);
  $aSb$$45$$.append(100 - ($pixelStart_shift$$ + $widthQuant$$ * ($aColSpan$$ * ($aTotalCols_lastCol$$ ? 1 : 1.75) - 0.75 * ($aColSpan$$ - 1))));
  $aSb$$45$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$22$$ + 3]);
  $aSb$$45$$.append($pixelHeight$$ - 2);
  $aSb$$45$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$22$$ + 4]);
  $aSb$$45$$.append(-$pixelHeight$$ + 2);
  $aSb$$45$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$22$$ + 5]);
  $aSb$$45$$.append($aStartCol$$);
  $aSb$$45$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$22$$ + 6]);
  $aSb$$45$$.append("");
  $aSb$$45$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$22$$ + 7]);
  $rflect$cal$MainPaneBuilder$buildWeekChipsTimeLabel_$$($aSb$$45$$, $aChip$$5$$, $JSCompiler_alias_TRUE$$);
  $aSb$$45$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$22$$ + 8]);
  $rflect$cal$MainPaneBuilder$buildWeekChipsTimeLabel_$$($aSb$$45$$, $aChip$$5$$, $JSCompiler_alias_FALSE$$);
  $aSb$$45$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$22$$ + 9]);
  $aSb$$45$$.append($aEventManager$$2_event$$6$$.summary);
  $aSb$$45$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$22$$ + 10])
}
function $rflect$cal$MainPaneBuilder$buildMonthBlockChip_$$($aSb$$46$$, $aOffset$$23$$, $aEventManager$$3_event$$7$$, $aChip$$6$$, $aTotalCols$$1_cellStart$$, $aStartCol$$1$$, $aColSpan$$1_cellWidth$$, $opt_allDay$$) {
  var $aTotalCols$$1_cellStart$$ = $aChip$$6$$.start, $aColSpan$$1_cellWidth$$ = $aChip$$6$$.end - $aChip$$6$$.start, $widthQuant$$1$$ = 100 / 7, $aEventManager$$3_event$$7$$ = $aEventManager$$3_event$$7$$.$events_$[$aChip$$6$$.$eventId$];
  $aSb$$46$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$23$$]);
  $aSb$$46$$.append(!$opt_allDay$$ && $widthQuant$$1$$ * $aTotalCols$$1_cellStart$$);
  $aSb$$46$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$23$$ + 1]);
  $aSb$$46$$.append(!$opt_allDay$$ && 100 - $widthQuant$$1$$ * ($aTotalCols$$1_cellStart$$ + $aColSpan$$1_cellWidth$$));
  $aSb$$46$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$23$$ + 2]);
  $aSb$$46$$.append(17 * $aStartCol$$1$$);
  $aSb$$46$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$23$$ + 3]);
  $aChip$$6$$.$startIsCut$ && $aSb$$46$$.append("event-rect-mn-collapse-left");
  $aChip$$6$$.$endIsCut$ && $aSb$$46$$.append(" event-rect-mn-collapse-right");
  $aSb$$46$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$23$$ + 4]);
  $aChip$$6$$.$startIsCut$ && $aSb$$46$$.append("event-rect-mn-inner-collapse-left");
  $aChip$$6$$.$endIsCut$ && $aSb$$46$$.append(" event-rect-mn-inner-collapse-right");
  $aSb$$46$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$23$$ + 5]);
  $aSb$$46$$.append($aEventManager$$3_event$$7$$.summary);
  $aSb$$46$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$23$$ + 6])
}
function $rflect$cal$MainPaneBuilder$buildWeekChipsTimeLabel_$$($aSb$$47$$, $aChip$$7_mins$$, $aStart$$1$$) {
  var $totalMins$$ = $aStart$$1$$ ? $aChip$$7_mins$$.start : $aChip$$7_mins$$.end;
  $aStart$$1$$ && $aChip$$7_mins$$.$startIsCut$ || !$aStart$$1$$ && $aChip$$7_mins$$.$endIsCut$ ? $aSb$$47$$.append("00:00") : ($aChip$$7_mins$$ = $totalMins$$ % 60, $aSb$$47$$.append(($totalMins$$ - $aChip$$7_mins$$) / 60), $aSb$$47$$.append(":"), $aSb$$47$$.append($aChip$$7_mins$$))
}
function $rflect$cal$MainPaneBuilder$forEachChip_$$($aSb$$50$$, $aOffset$$26$$, $aEventManager$$4$$, $aBlockPool_blobs$$, $aColCounter$$2_blobCounter$$, $aFn$$) {
  for(var $aBlockPool_blobs$$ = $aBlockPool_blobs$$.$blocks$[$aColCounter$$2_blobCounter$$].$blobs$, $aColCounter$$2_blobCounter$$ = 0, $blobLength$$ = $aBlockPool_blobs$$.length;$aColCounter$$2_blobCounter$$ < $blobLength$$;$aColCounter$$2_blobCounter$$++) {
    for(var $blob$$10$$ = $aBlockPool_blobs$$[$aColCounter$$2_blobCounter$$].blob, $totalCols$$ = $aBlockPool_blobs$$[$aColCounter$$2_blobCounter$$].$totalCols$, $blobEntryCounter$$ = 0, $blobEntriesLength$$ = $blob$$10$$.length;$blobEntryCounter$$ < $blobEntriesLength$$;$blobEntryCounter$$++) {
      var $blobEntry$$ = $blob$$10$$[$blobEntryCounter$$];
      $aFn$$($aSb$$50$$, $aOffset$$26$$, $aEventManager$$4$$, $blobEntry$$.$chip$, $totalCols$$, $blobEntry$$.$startCol$, $blobEntry$$.colSpan)
    }
  }
}
$rflect$cal$MainPaneBuilder$$.prototype.$buildMonthGridRows_$ = function $$rflect$cal$MainPaneBuilder$$$$$buildMonthGridRows_$$($aSb$$51$$, $aOffset$$27$$) {
  for(var $rowCounter$$3$$ = 0, $rowsNumber$$1$$ = this.$blockPoolMonth_$.$blocksNumber_$;$rowCounter$$3$$ < $rowsNumber$$1$$;$rowCounter$$3$$++) {
    0 < $rowCounter$$3$$ && $aSb$$51$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$]), $aSb$$51$$.append($rowCounter$$3$$), $aSb$$51$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 1]), $rowCounter$$3$$ == $rowsNumber$$1$$ - 1 && $aSb$$51$$.append("monthgrid-row-last"), $aSb$$51$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 2]), $aSb$$51$$.append(this.$blockPoolMonth_$.$blocks$[$rowCounter$$3$$].size - 1), $aSb$$51$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 
    3]), $aSb$$51$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 4]), $aSb$$51$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 5]), $aSb$$51$$.append($rowCounter$$3$$), $aSb$$51$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 6]), $aSb$$51$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 7]), this.$buildDayCells_$($aSb$$51$$, $aOffset$$27$$ + 8, $rowCounter$$3$$), $aSb$$51$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 
    19]), $aSb$$51$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 20]), $aSb$$51$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 21]), $aSb$$51$$.append($rowCounter$$3$$), $aSb$$51$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 22]), $rflect$cal$MainPaneBuilder$forEachChip_$$($aSb$$51$$, $aOffset$$27$$ + 23, this.$eventManager_$, this.$blockPoolMonth_$, $rowCounter$$3$$, $rflect$cal$MainPaneBuilder$buildMonthBlockChip_$$), 
    $aSb$$51$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 30]), $aSb$$51$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 31]), $aSb$$51$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$27$$ + 32])
  }
};
$rflect$cal$MainPaneBuilder$$.prototype.$buildDayCells_$ = function $$rflect$cal$MainPaneBuilder$$$$$buildDayCells_$$($aSb$$52$$, $aOffset$$28$$, $aRowCounter$$2$$) {
  for(var $daySeries$$3$$ = this.$timeManager_$.$daySeries$, $block$$2$$, $currentMonth$$ = this.$timeManager_$.$basis$.getMonth(), $isInMonthView$$ = 5 == this.$viewManager_$.$currentView$, $colCounter$$5$$ = 0;7 > $colCounter$$5$$;$colCounter$$5$$++) {
    $block$$2$$ = this.$blockPoolMonth_$.$blocks$[$aRowCounter$$2$$], $aSb$$52$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$28$$]), this.$timeManager_$.$currentDay_$ && this.$timeManager_$.$currentDay_$.$equals$(this.$timeManager_$.$daySeries$[7 * $aRowCounter$$2$$ + $colCounter$$5$$], 7) && $aSb$$52$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$28$$ + 1]), $aSb$$52$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$28$$ + 2]), $aSb$$52$$.append(!$block$$2$$.$expanded$ && 
    $block$$2$$.$couldBeExpanded$ ? "expand-sign-mn-collapsed" : $block$$2$$.$expanded$ && $block$$2$$.$couldBeCollapsed$ ? "expand-sign-mn-expanded" : ""), $aSb$$52$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$28$$ + 3]), $aSb$$52$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$28$$ + 4]), $aSb$$52$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$28$$ + 5]), $aSb$$52$$.append(7 * $aRowCounter$$2$$ + $colCounter$$5$$), $aSb$$52$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$28$$ + 
    6]), $isInMonthView$$ && $currentMonth$$ != $daySeries$$3$$[7 * $aRowCounter$$2$$ + $colCounter$$5$$].getMonth() && $aSb$$52$$.append("dl-other-month"), $aSb$$52$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$28$$ + 7]), $aSb$$52$$.append($daySeries$$3$$[7 * $aRowCounter$$2$$ + $colCounter$$5$$].getDate()), $aSb$$52$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$28$$ + 8]), $aSb$$52$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$28$$ + 
    9]), $aSb$$52$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$28$$ + 10])
  }
};
for(var $rflect$pagevis$nameOfHiddenProperty_$$, $rflect$pagevis$nameOfVisibilityChangeEvent$$, $rflect$pagevis$VENDOR_HIDDEN_NAMES$$ = ["hidden", "msHidden", "mozHidden", "webkitHidden"], $rflect$pagevis$VENDOR_VISIBILITYCHANGE_NAMES$$ = ["visibilitychange", "msvisibilitychange", "mozvisibilitychange", "webkitvisibilitychange"], $vendorCounter$$inline_563$$ = 0;$vendorCounter$$inline_563$$ < $rflect$pagevis$VENDOR_HIDDEN_NAMES$$.length;$vendorCounter$$inline_563$$++) {
  if($rflect$pagevis$VENDOR_HIDDEN_NAMES$$[$vendorCounter$$inline_563$$] in document) {
    $rflect$pagevis$nameOfHiddenProperty_$$ = $rflect$pagevis$VENDOR_HIDDEN_NAMES$$[$vendorCounter$$inline_563$$];
    $rflect$pagevis$nameOfVisibilityChangeEvent$$ = $rflect$pagevis$VENDOR_VISIBILITYCHANGE_NAMES$$[$vendorCounter$$inline_563$$];
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
    var $today$$1$$ = new Date, $headEl_index$$61$$ = $goog$dom$getElement$$("time-marker-head");
    $headEl_index$$61$$ && ($headEl_index$$61$$.style.top = $JSCompiler_StaticMethods_getPosition_$$($JSCompiler_alias_TRUE$$, $today$$1$$) + "px");
    if(this.$timeManager_$.$isInNowPoint$) {
      var $headEl_index$$61$$ = $JSCompiler_StaticMethods_getIndexOfTodayBlock_$$(this, $today$$1$$), $lineEl$$ = $goog$dom$removeNode$$($goog$dom$getElement$$("time-marker")) || $goog$dom$createDom$$("div", {id:"time-marker", className:"time-marker"});
      $lineEl$$ && ($lineEl$$.style.top = $JSCompiler_StaticMethods_getPosition_$$($JSCompiler_alias_FALSE$$, $today$$1$$) + "px");
      $goog$dom$getElement$$("wk-dec-layer-in-col" + $headEl_index$$61$$).appendChild($lineEl$$)
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
function $goog$positioning$positionAtCoordinate$$($absolutePos$$1_style$$inline_574$$, $borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$, $elementSize_left$$inline_928_movableElementCorner$$1_right$$inline_1156$$, $bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$, $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$, $opt_overflow$$1_overflow$$inline_568_right$$inline_929_top$$inline_1157$$, $opt_preferredSize$$1_size$$13$$) {
  var $absolutePos$$1_style$$inline_574$$ = $absolutePos$$1_style$$inline_574$$.$clone$(), $corner$$1_status$$inline_569$$ = ($elementSize_left$$inline_928_movableElementCorner$$1_right$$inline_1156$$ & 4 && $goog$style$isRightToLeft$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$) ? $elementSize_left$$inline_928_movableElementCorner$$1_right$$inline_1156$$ ^ 2 : $elementSize_left$$inline_928_movableElementCorner$$1_right$$inline_1156$$) & -5, $elementSize_left$$inline_928_movableElementCorner$$1_right$$inline_1156$$ = 
  $goog$style$getSize$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$), $opt_preferredSize$$1_size$$13$$ = $opt_preferredSize$$1_size$$13$$ ? $opt_preferredSize$$1_size$$13$$.$clone$() : $elementSize_left$$inline_928_movableElementCorner$$1_right$$inline_1156$$.$clone$();
  if($bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$ || 0 != $corner$$1_status$$inline_569$$) {
    ($corner$$1_status$$inline_569$$ & 2 ? $absolutePos$$1_style$$inline_574$$.x -= $opt_preferredSize$$1_size$$13$$.width + ($bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$ ? $bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.right : 0) : $bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$ && ($absolutePos$$1_style$$inline_574$$.x += $bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.left), $corner$$1_status$$inline_569$$ & 
    1) ? $absolutePos$$1_style$$inline_574$$.y -= $opt_preferredSize$$1_size$$13$$.height + ($bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$ ? $bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.bottom : 0) : $bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$ && ($absolutePos$$1_style$$inline_574$$.y += $bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.top)
  }
  if($opt_overflow$$1_overflow$$inline_568_right$$inline_929_top$$inline_1157$$) {
    if($JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$) {
      $bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$ = $absolutePos$$1_style$$inline_574$$;
      $corner$$1_status$$inline_569$$ = 0;
      if(65 == ($opt_overflow$$1_overflow$$inline_568_right$$inline_929_top$$inline_1157$$ & 65) && ($bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.x < $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.left || $bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.x >= $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.right)) {
        $opt_overflow$$1_overflow$$inline_568_right$$inline_929_top$$inline_1157$$ &= -2
      }
      if(132 == ($opt_overflow$$1_overflow$$inline_568_right$$inline_929_top$$inline_1157$$ & 132) && ($bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.y < $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.top || $bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.y >= $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.bottom)) {
        $opt_overflow$$1_overflow$$inline_568_right$$inline_929_top$$inline_1157$$ &= -5
      }
      $bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.x < $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.left && $opt_overflow$$1_overflow$$inline_568_right$$inline_929_top$$inline_1157$$ & 1 && ($bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.x = $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.left, $corner$$1_status$$inline_569$$ |= 1);
      $bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.x < $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.left && ($bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.x + $opt_preferredSize$$1_size$$13$$.width > $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.right && $opt_overflow$$1_overflow$$inline_568_right$$inline_929_top$$inline_1157$$ & 16) && 
      ($opt_preferredSize$$1_size$$13$$.width = Math.max($opt_preferredSize$$1_size$$13$$.width - ($bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.x + $opt_preferredSize$$1_size$$13$$.width - $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.right), 0), $corner$$1_status$$inline_569$$ |= 4);
      $bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.x + $opt_preferredSize$$1_size$$13$$.width > $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.right && $opt_overflow$$1_overflow$$inline_568_right$$inline_929_top$$inline_1157$$ & 1 && ($bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.x = Math.max($JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.right - 
      $opt_preferredSize$$1_size$$13$$.width, $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.left), $corner$$1_status$$inline_569$$ |= 1);
      $opt_overflow$$1_overflow$$inline_568_right$$inline_929_top$$inline_1157$$ & 2 && ($corner$$1_status$$inline_569$$ |= ($bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.x < $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.left ? 16 : 0) | ($bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.x + $opt_preferredSize$$1_size$$13$$.width > $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.right ? 
      32 : 0));
      $bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.y < $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.top && $opt_overflow$$1_overflow$$inline_568_right$$inline_929_top$$inline_1157$$ & 4 && ($bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.y = $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.top, $corner$$1_status$$inline_569$$ |= 2);
      $bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.y >= $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.top && ($bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.y + $opt_preferredSize$$1_size$$13$$.height > $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.bottom && $opt_overflow$$1_overflow$$inline_568_right$$inline_929_top$$inline_1157$$ & 32) && 
      ($opt_preferredSize$$1_size$$13$$.height = Math.max($opt_preferredSize$$1_size$$13$$.height - ($bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.y + $opt_preferredSize$$1_size$$13$$.height - $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.bottom), 0), $corner$$1_status$$inline_569$$ |= 8);
      $bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.y + $opt_preferredSize$$1_size$$13$$.height > $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.bottom && $opt_overflow$$1_overflow$$inline_568_right$$inline_929_top$$inline_1157$$ & 4 && ($bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.y = Math.max($JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.bottom - 
      $opt_preferredSize$$1_size$$13$$.height, $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.top), $corner$$1_status$$inline_569$$ |= 2);
      $opt_overflow$$1_overflow$$inline_568_right$$inline_929_top$$inline_1157$$ & 8 && ($corner$$1_status$$inline_569$$ |= ($bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.y < $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.top ? 64 : 0) | ($bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$.y + $opt_preferredSize$$1_size$$13$$.height > $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.bottom ? 
      128 : 0));
      $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$ = $corner$$1_status$$inline_569$$
    }else {
      $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$ = 256
    }
    if($JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$ & 496) {
      return
    }
  }
  $goog$style$setPosition$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$, $absolutePos$$1_style$$inline_574$$);
  $goog$math$Size$equals$$($elementSize_left$$inline_928_movableElementCorner$$1_right$$inline_1156$$, $opt_preferredSize$$1_size$$13$$) || (($JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$ = $JSCompiler_StaticMethods_isCss1CompatMode$$($goog$dom$getDomHelper$$($goog$dom$getOwnerDocument$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$))), $goog$userAgent$IE$$ && (!$JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$ || 
  !$goog$userAgent$isVersion$$("8"))) ? ($absolutePos$$1_style$$inline_574$$ = $borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$.style, $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$) ? ($goog$userAgent$IE$$ ? ($JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$ = $goog$style$getIePixelValue_$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$, 
  $goog$style$getCascadedStyle$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$, "paddingLeft")), $elementSize_left$$inline_928_movableElementCorner$$1_right$$inline_1156$$ = $goog$style$getIePixelValue_$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$, $goog$style$getCascadedStyle$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$, "paddingRight")), $opt_overflow$$1_overflow$$inline_568_right$$inline_929_top$$inline_1157$$ = 
  $goog$style$getIePixelValue_$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$, $goog$style$getCascadedStyle$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$, "paddingTop")), $bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$ = $goog$style$getIePixelValue_$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$, $goog$style$getCascadedStyle$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$, 
  "paddingBottom")), $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$ = new $goog$math$Box$$($opt_overflow$$1_overflow$$inline_568_right$$inline_929_top$$inline_1157$$, $elementSize_left$$inline_928_movableElementCorner$$1_right$$inline_1156$$, $bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$, $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$)) : ($JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$ = 
  $goog$style$getComputedStyle$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$, "paddingLeft"), $elementSize_left$$inline_928_movableElementCorner$$1_right$$inline_1156$$ = $goog$style$getComputedStyle$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$, "paddingRight"), $opt_overflow$$1_overflow$$inline_568_right$$inline_929_top$$inline_1157$$ = $goog$style$getComputedStyle$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$, 
  "paddingTop"), $bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$ = $goog$style$getComputedStyle$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$, "paddingBottom"), $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$ = new $goog$math$Box$$(parseFloat($opt_overflow$$1_overflow$$inline_568_right$$inline_929_top$$inline_1157$$), parseFloat($elementSize_left$$inline_928_movableElementCorner$$1_right$$inline_1156$$), 
  parseFloat($bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$), parseFloat($JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$))), $goog$userAgent$IE$$ ? ($elementSize_left$$inline_928_movableElementCorner$$1_right$$inline_1156$$ = $goog$style$getIePixelBorder_$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$, "borderLeft"), $opt_overflow$$1_overflow$$inline_568_right$$inline_929_top$$inline_1157$$ = 
  $goog$style$getIePixelBorder_$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$, "borderRight"), $bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$ = $goog$style$getIePixelBorder_$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$, "borderTop"), $borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$ = $goog$style$getIePixelBorder_$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$, 
  "borderBottom"), $borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$ = new $goog$math$Box$$($bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$, $opt_overflow$$1_overflow$$inline_568_right$$inline_929_top$$inline_1157$$, $borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$, $elementSize_left$$inline_928_movableElementCorner$$1_right$$inline_1156$$)) : ($elementSize_left$$inline_928_movableElementCorner$$1_right$$inline_1156$$ = 
  $goog$style$getComputedStyle$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$, "borderLeftWidth"), $opt_overflow$$1_overflow$$inline_568_right$$inline_929_top$$inline_1157$$ = $goog$style$getComputedStyle$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$, "borderRightWidth"), $bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$ = $goog$style$getComputedStyle$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$, 
  "borderTopWidth"), $borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$ = $goog$style$getComputedStyle$$($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$, "borderBottomWidth"), $borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$ = new $goog$math$Box$$(parseFloat($bottom$$inline_1158_opt_margin$$1_pos$$inline_565_top$$inline_930$$), parseFloat($opt_overflow$$1_overflow$$inline_568_right$$inline_929_top$$inline_1157$$), 
  parseFloat($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$), parseFloat($elementSize_left$$inline_928_movableElementCorner$$1_right$$inline_1156$$))), $absolutePos$$1_style$$inline_574$$.pixelWidth = $opt_preferredSize$$1_size$$13$$.width - $borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$.left - $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.left - $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.right - 
  $borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$.right, $absolutePos$$1_style$$inline_574$$.pixelHeight = $opt_preferredSize$$1_size$$13$$.height - $borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$.top - $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.top - $JSCompiler_temp$$4_isCss1CompatMode$$inline_573_left$$inline_1155_opt_viewport_paddingBox$$inline_575$$.bottom - $borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$.bottom) : 
  ($absolutePos$$1_style$$inline_574$$.pixelWidth = $opt_preferredSize$$1_size$$13$$.width, $absolutePos$$1_style$$inline_574$$.pixelHeight = $opt_preferredSize$$1_size$$13$$.height) : ($borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$ = $borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$.style, $goog$userAgent$GECKO$$ ? $borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$.MozBoxSizing = "border-box" : $goog$userAgent$WEBKIT$$ ? 
  $borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$.WebkitBoxSizing = "border-box" : $borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$.boxSizing = "border-box", $borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$.width = Math.max($opt_preferredSize$$1_size$$13$$.width, 0) + "px", $borderBox$$inline_576_bottom$$inline_931_movableElement$$1_style$$inline_935$$.height = Math.max($opt_preferredSize$$1_size$$13$$.height, 
  0) + "px"))
}
;function $goog$positioning$AbstractPosition$$() {
}
$goog$positioning$AbstractPosition$$.prototype.$reposition$ = function $$goog$positioning$AbstractPosition$$$$$reposition$$() {
};
function $goog$positioning$AbsolutePosition$$($arg1$$1$$, $opt_arg2$$1$$) {
  this.$coordinate$ = $arg1$$1$$ instanceof $goog$math$Coordinate$$ ? $arg1$$1$$ : new $goog$math$Coordinate$$($arg1$$1$$, $opt_arg2$$1$$)
}
$goog$inherits$$($goog$positioning$AbsolutePosition$$, $goog$positioning$AbstractPosition$$);
$goog$positioning$AbsolutePosition$$.prototype.$reposition$ = function $$goog$positioning$AbsolutePosition$$$$$reposition$$($movableElement$$3$$, $movableCorner$$, $opt_margin$$3$$, $opt_preferredSize$$3$$) {
  $goog$positioning$positionAtCoordinate$$(this.$coordinate$, $movableElement$$3$$, $movableCorner$$, $opt_margin$$3$$, $JSCompiler_alias_NULL$$, $JSCompiler_alias_NULL$$, $opt_preferredSize$$3$$)
};
function $goog$positioning$AnchoredPosition$$($anchorElement$$1$$, $corner$$7$$, $opt_overflow$$2$$) {
  this.element = $anchorElement$$1$$;
  this.$corner$ = $corner$$7$$;
  this.$overflow_$ = $opt_overflow$$2$$
}
$goog$inherits$$($goog$positioning$AnchoredPosition$$, $goog$positioning$AbstractPosition$$);
$goog$positioning$AnchoredPosition$$.prototype.$reposition$ = function $$goog$positioning$AnchoredPosition$$$$$reposition$$($movableElement$$4$$, $movableCorner$$1$$, $opt_margin$$4$$) {
  var $absolutePos$$inline_591_anchorElement$$inline_578_corner$$inline_590$$ = this.element, $anchorElementCorner$$inline_579$$ = this.$corner$, $opt_overflow$$inline_583$$ = this.$overflow_$, $JSCompiler_temp_const$$850_moveableParentTopLeft$$inline_586$$, $o$$inline_1161_parent$$inline_587_rect$$inline_942$$ = $movableElement$$4$$.offsetParent;
  if($o$$inline_1161_parent$$inline_587_rect$$inline_942$$) {
    var $JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$ = "HTML" == $o$$inline_1161_parent$$inline_587_rect$$inline_942$$.tagName || "BODY" == $o$$inline_1161_parent$$inline_587_rect$$inline_942$$.tagName;
    if(!$JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$ || "static" != $goog$style$getComputedPosition$$($o$$inline_1161_parent$$inline_587_rect$$inline_942$$)) {
      $JSCompiler_temp_const$$850_moveableParentTopLeft$$inline_586$$ = $goog$style$getPageOffset$$($o$$inline_1161_parent$$inline_587_rect$$inline_942$$), $JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$ || ($JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$ = ($JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$ = 
      $goog$style$isRightToLeft$$($o$$inline_1161_parent$$inline_587_rect$$inline_942$$)) && $goog$userAgent$GECKO$$ ? -$o$$inline_1161_parent$$inline_587_rect$$inline_942$$.scrollLeft : $JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$ && (!$goog$userAgent$IE$$ || !$goog$userAgent$isVersion$$("8")) ? $o$$inline_1161_parent$$inline_587_rect$$inline_942$$.scrollWidth - $o$$inline_1161_parent$$inline_587_rect$$inline_942$$.clientWidth - 
      $o$$inline_1161_parent$$inline_587_rect$$inline_942$$.scrollLeft : $o$$inline_1161_parent$$inline_587_rect$$inline_942$$.scrollLeft, $JSCompiler_temp_const$$850_moveableParentTopLeft$$inline_586$$ = $goog$math$Coordinate$difference$$($JSCompiler_temp_const$$850_moveableParentTopLeft$$inline_586$$, new $goog$math$Coordinate$$($JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$, $o$$inline_1161_parent$$inline_587_rect$$inline_942$$.scrollTop)))
    }
  }
  $o$$inline_1161_parent$$inline_587_rect$$inline_942$$ = $goog$style$getPageOffset$$($absolutePos$$inline_591_anchorElement$$inline_578_corner$$inline_590$$);
  $JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$ = $goog$style$getSize$$($absolutePos$$inline_591_anchorElement$$inline_578_corner$$inline_590$$);
  $o$$inline_1161_parent$$inline_587_rect$$inline_942$$ = new $goog$math$Rect$$($o$$inline_1161_parent$$inline_587_rect$$inline_942$$.x, $o$$inline_1161_parent$$inline_587_rect$$inline_942$$.y, $JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$.width, $JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$.height);
  if($JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$ = $goog$style$getVisibleRectForElement$$($absolutePos$$inline_591_anchorElement$$inline_578_corner$$inline_590$$)) {
    var $position$$inline_1173_rect$$inline_1165_y1$$inline_1169$$ = new $goog$math$Rect$$($JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$.left, $JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$.top, $JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$.right - 
    $JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$.left, $JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$.bottom - $JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$.top), $JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$ = 
    Math.max($o$$inline_1161_parent$$inline_587_rect$$inline_942$$.left, $position$$inline_1173_rect$$inline_1165_y1$$inline_1169$$.left), $body$$inline_948_pos$$inline_949_x1$$inline_1167$$ = Math.min($o$$inline_1161_parent$$inline_587_rect$$inline_942$$.left + $o$$inline_1161_parent$$inline_587_rect$$inline_942$$.width, $position$$inline_1173_rect$$inline_1165_y1$$inline_1169$$.left + $position$$inline_1173_rect$$inline_1165_y1$$inline_1169$$.width);
    if($JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$ <= $body$$inline_948_pos$$inline_949_x1$$inline_1167$$) {
      var $newBase$$inline_947_relativeWin$$inline_1172_y0$$inline_1168$$ = Math.max($o$$inline_1161_parent$$inline_587_rect$$inline_942$$.top, $position$$inline_1173_rect$$inline_1165_y1$$inline_1169$$.top), $position$$inline_1173_rect$$inline_1165_y1$$inline_1169$$ = Math.min($o$$inline_1161_parent$$inline_587_rect$$inline_942$$.top + $o$$inline_1161_parent$$inline_587_rect$$inline_942$$.height, $position$$inline_1173_rect$$inline_1165_y1$$inline_1169$$.top + $position$$inline_1173_rect$$inline_1165_y1$$inline_1169$$.height);
      $newBase$$inline_947_relativeWin$$inline_1172_y0$$inline_1168$$ <= $position$$inline_1173_rect$$inline_1165_y1$$inline_1169$$ && ($o$$inline_1161_parent$$inline_587_rect$$inline_942$$.left = $JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$, $o$$inline_1161_parent$$inline_587_rect$$inline_942$$.top = $newBase$$inline_947_relativeWin$$inline_1172_y0$$inline_1168$$, $o$$inline_1161_parent$$inline_587_rect$$inline_942$$.width = 
      $body$$inline_948_pos$$inline_949_x1$$inline_1167$$ - $JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$, $o$$inline_1161_parent$$inline_587_rect$$inline_942$$.height = $position$$inline_1173_rect$$inline_1165_y1$$inline_1169$$ - $newBase$$inline_947_relativeWin$$inline_1172_y0$$inline_1168$$)
    }
  }
  $JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$ = $goog$dom$getDomHelper$$($absolutePos$$inline_591_anchorElement$$inline_578_corner$$inline_590$$);
  $newBase$$inline_947_relativeWin$$inline_1172_y0$$inline_1168$$ = $goog$dom$getDomHelper$$($movableElement$$4$$);
  if($JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$.$document_$ != $newBase$$inline_947_relativeWin$$inline_1172_y0$$inline_1168$$.$document_$) {
    var $body$$inline_948_pos$$inline_949_x1$$inline_1167$$ = $JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$.$document_$.body, $newBase$$inline_947_relativeWin$$inline_1172_y0$$inline_1168$$ = $JSCompiler_StaticMethods_getWindow$$($newBase$$inline_947_relativeWin$$inline_1172_y0$$inline_1168$$), $position$$inline_1173_rect$$inline_1165_y1$$inline_1169$$ = new $goog$math$Coordinate$$(0, 0), $currentWin$$inline_1174$$ = 
    $goog$dom$getWindow$$($goog$dom$getOwnerDocument$$($body$$inline_948_pos$$inline_949_x1$$inline_1167$$)), $currentEl$$inline_1175$$ = $body$$inline_948_pos$$inline_949_x1$$inline_1167$$;
    do {
      var $offset$$inline_1176$$ = $currentWin$$inline_1174$$ == $newBase$$inline_947_relativeWin$$inline_1172_y0$$inline_1168$$ ? $goog$style$getPageOffset$$($currentEl$$inline_1175$$) : $goog$style$getClientPosition$$($currentEl$$inline_1175$$);
      $position$$inline_1173_rect$$inline_1165_y1$$inline_1169$$.x += $offset$$inline_1176$$.x;
      $position$$inline_1173_rect$$inline_1165_y1$$inline_1169$$.y += $offset$$inline_1176$$.y
    }while($currentWin$$inline_1174$$ && $currentWin$$inline_1174$$ != $newBase$$inline_947_relativeWin$$inline_1172_y0$$inline_1168$$ && ($currentEl$$inline_1175$$ = $currentWin$$inline_1174$$.frameElement) && ($currentWin$$inline_1174$$ = $currentWin$$inline_1174$$.parent));
    $body$$inline_948_pos$$inline_949_x1$$inline_1167$$ = $goog$math$Coordinate$difference$$($position$$inline_1173_rect$$inline_1165_y1$$inline_1169$$, $goog$style$getPageOffset$$($body$$inline_948_pos$$inline_949_x1$$inline_1167$$));
    $goog$userAgent$IE$$ && !$JSCompiler_StaticMethods_isCss1CompatMode$$($JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$) && ($body$$inline_948_pos$$inline_949_x1$$inline_1167$$ = $goog$math$Coordinate$difference$$($body$$inline_948_pos$$inline_949_x1$$inline_1167$$, $JSCompiler_StaticMethods_getDocumentScroll$$($JSCompiler_inline_result$$937_isBody$$inline_588_isRtl$$inline_939_origBase$$inline_946_s$$inline_1162_visibleBox$$inline_943_x0$$inline_1166$$)));
    $o$$inline_1161_parent$$inline_587_rect$$inline_942$$.left += $body$$inline_948_pos$$inline_949_x1$$inline_1167$$.x;
    $o$$inline_1161_parent$$inline_587_rect$$inline_942$$.top += $body$$inline_948_pos$$inline_949_x1$$inline_1167$$.y
  }
  $absolutePos$$inline_591_anchorElement$$inline_578_corner$$inline_590$$ = ($anchorElementCorner$$inline_579$$ & 4 && $goog$style$isRightToLeft$$($absolutePos$$inline_591_anchorElement$$inline_578_corner$$inline_590$$) ? $anchorElementCorner$$inline_579$$ ^ 2 : $anchorElementCorner$$inline_579$$) & -5;
  $absolutePos$$inline_591_anchorElement$$inline_578_corner$$inline_590$$ = new $goog$math$Coordinate$$($absolutePos$$inline_591_anchorElement$$inline_578_corner$$inline_590$$ & 2 ? $o$$inline_1161_parent$$inline_587_rect$$inline_942$$.left + $o$$inline_1161_parent$$inline_587_rect$$inline_942$$.width : $o$$inline_1161_parent$$inline_587_rect$$inline_942$$.left, $absolutePos$$inline_591_anchorElement$$inline_578_corner$$inline_590$$ & 1 ? $o$$inline_1161_parent$$inline_587_rect$$inline_942$$.top + 
  $o$$inline_1161_parent$$inline_587_rect$$inline_942$$.height : $o$$inline_1161_parent$$inline_587_rect$$inline_942$$.top);
  $JSCompiler_temp_const$$850_moveableParentTopLeft$$inline_586$$ && ($absolutePos$$inline_591_anchorElement$$inline_578_corner$$inline_590$$ = $goog$math$Coordinate$difference$$($absolutePos$$inline_591_anchorElement$$inline_578_corner$$inline_590$$, $JSCompiler_temp_const$$850_moveableParentTopLeft$$inline_586$$));
  var $viewport$$inline_592$$;
  if($opt_overflow$$inline_583$$ && ($viewport$$inline_592$$ = $goog$style$getVisibleRectForElement$$($movableElement$$4$$)) && $JSCompiler_temp_const$$850_moveableParentTopLeft$$inline_586$$) {
    $viewport$$inline_592$$.top -= $JSCompiler_temp_const$$850_moveableParentTopLeft$$inline_586$$.y, $viewport$$inline_592$$.right -= $JSCompiler_temp_const$$850_moveableParentTopLeft$$inline_586$$.x, $viewport$$inline_592$$.bottom -= $JSCompiler_temp_const$$850_moveableParentTopLeft$$inline_586$$.y, $viewport$$inline_592$$.left -= $JSCompiler_temp_const$$850_moveableParentTopLeft$$inline_586$$.x
  }
  $goog$positioning$positionAtCoordinate$$($absolutePos$$inline_591_anchorElement$$inline_578_corner$$inline_590$$, $movableElement$$4$$, $movableCorner$$1$$, $opt_margin$$4$$, $viewport$$inline_592$$, $opt_overflow$$inline_583$$, $JSCompiler_alias_VOID$$)
};
function $goog$ui$Popup$$($opt_element$$13$$, $opt_position$$) {
  this.$popupCorner_$ = 4;
  this.$position_$ = $opt_position$$ || $JSCompiler_alias_VOID$$;
  $goog$ui$PopupBase$$.call(this, $opt_element$$13$$)
}
$goog$inherits$$($goog$ui$Popup$$, $goog$ui$PopupBase$$);
$goog$ui$Popup$$.prototype.$setPinnedCorner$ = function $$goog$ui$Popup$$$$$setPinnedCorner$$($corner$$11$$) {
  this.$popupCorner_$ = $corner$$11$$;
  this.$isVisible$() && this.$reposition$()
};
$goog$ui$Popup$$.prototype.$setPosition$ = function $$goog$ui$Popup$$$$$setPosition$$($position$$1$$) {
  this.$position_$ = $position$$1$$ || $JSCompiler_alias_VOID$$;
  this.$isVisible$() && this.$reposition$()
};
$goog$ui$Popup$$.prototype.$reposition$ = function $$goog$ui$Popup$$$$$reposition$$() {
  if(this.$position_$) {
    var $hideForPositioning$$ = !this.$isVisible$() && "move_offscreen" != this.$type_$, $el$$32$$ = this.$getElement$();
    $hideForPositioning$$ && ($el$$32$$.style.visibility = "hidden", $goog$style$showElement$$($el$$32$$, $JSCompiler_alias_TRUE$$));
    this.$position_$.$reposition$($el$$32$$, this.$popupCorner_$, this.$margin_$);
    $hideForPositioning$$ && $goog$style$showElement$$($el$$32$$, $JSCompiler_alias_FALSE$$)
  }
};
function $goog$ui$Bubble$$($message$$13$$, $opt_config$$, $opt_domHelper$$9$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$9$$);
  this.$message_$ = $message$$13$$;
  this.$popup_$ = new $goog$ui$Popup$$;
  this.$config_$ = $opt_config$$ || $goog$ui$Bubble$defaultConfig$$;
  this.$closeButtonId_$ = $JSCompiler_StaticMethods_getId$$(this) + ".cb";
  this.$messageId_$ = $JSCompiler_StaticMethods_getId$$(this) + ".mi"
}
$goog$inherits$$($goog$ui$Bubble$$, $goog$ui$Component$$);
$JSCompiler_prototypeAlias$$ = $goog$ui$Bubble$$.prototype;
$JSCompiler_prototypeAlias$$.$timeout_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$timerId_$ = 0;
$JSCompiler_prototypeAlias$$.$listener_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  $goog$ui$Bubble$$.$superClass_$.$createDom$.call(this);
  var $element$$134$$ = this.$getElement$();
  $element$$134$$.style.position = "absolute";
  $element$$134$$.style.visibility = "hidden";
  var $JSCompiler_StaticMethods_setElement$self$$inline_594$$ = this.$popup_$;
  $JSCompiler_StaticMethods_ensureNotVisible_$$($JSCompiler_StaticMethods_setElement$self$$inline_594$$);
  $JSCompiler_StaticMethods_setElement$self$$inline_594$$.$element_$ = $element$$134$$
};
$JSCompiler_prototypeAlias$$.$attach$ = function $$JSCompiler_prototypeAlias$$$$attach$$($anchorElement$$4$$) {
  var $doc$$inline_600_viewportWidth$$inline_602$$ = this.$getDomHelper$().$getOwnerDocument$($anchorElement$$4$$), $viewportElement$$inline_601_viewportHeight$$inline_603$$ = $goog$style$getClientViewportElement$$($doc$$inline_600_viewportWidth$$inline_602$$), $doc$$inline_600_viewportWidth$$inline_602$$ = $viewportElement$$inline_601_viewportHeight$$inline_603$$.offsetWidth, $viewportElement$$inline_601_viewportHeight$$inline_603$$ = $viewportElement$$inline_601_viewportHeight$$inline_603$$.offsetHeight, 
  $anchorElementOffset$$inline_604$$ = $goog$style$getPageOffset$$($anchorElement$$4$$), $anchorElementSize$$inline_605$$ = $goog$style$getSize$$($anchorElement$$4$$), $anchorType$$inline_606$$ = 0;
  $doc$$inline_600_viewportWidth$$inline_602$$ - $anchorElementOffset$$inline_604$$.x - $anchorElementSize$$inline_605$$.width > $anchorElementOffset$$inline_604$$.x && ($anchorType$$inline_606$$ += 1);
  $viewportElement$$inline_601_viewportHeight$$inline_603$$ - $anchorElementOffset$$inline_604$$.y - $anchorElementSize$$inline_605$$.height > $anchorElementOffset$$inline_604$$.y && ($anchorType$$inline_606$$ += 2);
  $JSCompiler_StaticMethods_setAnchoredPosition_$$(this, $anchorElement$$4$$, $goog$ui$Bubble$corners_$$[$anchorType$$inline_606$$])
};
$JSCompiler_prototypeAlias$$.$setPinnedCorner$ = function $$JSCompiler_prototypeAlias$$$$setPinnedCorner$$($corner$$12$$) {
  this.$popup_$.$setPinnedCorner$($corner$$12$$)
};
$JSCompiler_prototypeAlias$$.$setPosition$ = function $$JSCompiler_prototypeAlias$$$$setPosition$$($position$$2$$) {
  $position$$2$$ instanceof $goog$positioning$AbsolutePosition$$ ? this.$popup_$.$setPosition$($position$$2$$) : $position$$2$$ instanceof $goog$positioning$AnchoredPosition$$ ? $JSCompiler_StaticMethods_setAnchoredPosition_$$(this, $position$$2$$.element, $position$$2$$.$corner$) : $JSCompiler_alias_THROW$$(Error("Bubble only supports absolute and anchored positions!"))
};
$JSCompiler_prototypeAlias$$.setTimeout = $JSCompiler_set$$("$timeout_$");
$JSCompiler_prototypeAlias$$.$setAutoHide$ = function $$JSCompiler_prototypeAlias$$$$setAutoHide$$($autoHide$$1$$) {
  this.$popup_$.$setAutoHide$($autoHide$$1$$)
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($visible$$6$$) {
  if($visible$$6$$ && !this.$popup_$.$isVisible$()) {
    this.$inDocument_$ || $JSCompiler_alias_THROW$$(Error("You must render the bubble before showing it!"));
    var $JSCompiler_temp_const$$839_closeButton$$inline_610_messageDiv$$inline_609$$ = this.$getElement$(), $bubbleTopClass$$inline_954$$, $bubbleBottomClass$$inline_955$$;
    switch(this.$popup_$.$popupCorner_$) {
      case 0:
        $bubbleTopClass$$inline_954$$ = this.$config_$.$cssBubbleTopLeftAnchor$;
        $bubbleBottomClass$$inline_955$$ = this.$config_$.$cssBubbleBottomNoAnchor$;
        break;
      case 2:
        $bubbleTopClass$$inline_954$$ = this.$config_$.$cssBubbleTopRightAnchor$;
        $bubbleBottomClass$$inline_955$$ = this.$config_$.$cssBubbleBottomNoAnchor$;
        break;
      case 1:
        $bubbleTopClass$$inline_954$$ = this.$config_$.$cssBubbleTopNoAnchor$;
        $bubbleBottomClass$$inline_955$$ = this.$config_$.$cssBubbleBottomLeftAnchor$;
        break;
      case 3:
        $bubbleTopClass$$inline_954$$ = this.$config_$.$cssBubbleTopNoAnchor$;
        $bubbleBottomClass$$inline_955$$ = this.$config_$.$cssBubbleBottomRightAnchor$;
        break;
      default:
        $JSCompiler_alias_THROW$$(Error("This corner type is not supported by bubble!"))
    }
    var $message$$inline_956$$ = $JSCompiler_alias_NULL$$, $message$$inline_956$$ = "object" == typeof this.$message_$ ? '<div id="' + this.$messageId_$ + '">' : this.$message_$;
    $JSCompiler_temp_const$$839_closeButton$$inline_610_messageDiv$$inline_609$$.innerHTML = '<table border=0 cellspacing=0 cellpadding=0 style="z-index:1" width=' + this.$config_$.$bubbleWidth$ + '><tr><td colspan=4 class="' + $bubbleTopClass$$inline_954$$ + '"><tr><td class="' + this.$config_$.$cssBubbleLeft$ + '"><td class="' + this.$config_$.$cssBubbleFont$ + '" style="padding:0 4;background:white">' + $message$$inline_956$$ + '<td id="' + this.$closeButtonId_$ + '" class="' + this.$config_$.$cssCloseButton$ + 
    '"/><td class="' + this.$config_$.$cssBubbleRight$ + '"><tr><td colspan=4 class="' + $bubbleBottomClass$$inline_955$$ + '"></table>';
    "object" == typeof this.$message_$ && ($JSCompiler_temp_const$$839_closeButton$$inline_610_messageDiv$$inline_609$$ = this.$getDomHelper$().$getElement$(this.$messageId_$), this.$getDomHelper$().appendChild($JSCompiler_temp_const$$839_closeButton$$inline_610_messageDiv$$inline_609$$, this.$message_$));
    $JSCompiler_temp_const$$839_closeButton$$inline_610_messageDiv$$inline_609$$ = this.$getDomHelper$().$getElement$(this.$closeButtonId_$);
    this.$listener_$ = $goog$events$listen$$($JSCompiler_temp_const$$839_closeButton$$inline_610_messageDiv$$inline_609$$, "click", this.$hideBubble_$, $JSCompiler_alias_FALSE$$, this);
    this.$timeout_$ && (this.$timerId_$ = $goog$Timer$callOnce$$(this.$hideBubble_$, this.$timeout_$, this))
  }
  this.$popup_$.$setVisible$($visible$$6$$);
  this.$popup_$.$isVisible$() || $JSCompiler_StaticMethods_unconfigureElement_$$(this)
};
$JSCompiler_prototypeAlias$$.$isVisible$ = function $$JSCompiler_prototypeAlias$$$$isVisible$$() {
  return this.$popup_$.$isVisible$()
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $JSCompiler_StaticMethods_unconfigureElement_$$(this);
  this.$popup_$.$dispose$();
  this.$popup_$ = $JSCompiler_alias_NULL$$;
  $goog$ui$Bubble$$.$superClass_$.$disposeInternal$.call(this)
};
function $JSCompiler_StaticMethods_unconfigureElement_$$($JSCompiler_StaticMethods_unconfigureElement_$self$$) {
  $JSCompiler_StaticMethods_unconfigureElement_$self$$.$listener_$ && ($goog$events$unlistenByKey$$($JSCompiler_StaticMethods_unconfigureElement_$self$$.$listener_$), $JSCompiler_StaticMethods_unconfigureElement_$self$$.$listener_$ = $JSCompiler_alias_NULL$$);
  $JSCompiler_StaticMethods_unconfigureElement_$self$$.$timerId_$ && $goog$Timer$defaultTimerObject$$.clearTimeout($JSCompiler_StaticMethods_unconfigureElement_$self$$.$timerId_$);
  var $element$$136$$ = $JSCompiler_StaticMethods_unconfigureElement_$self$$.$getElement$();
  $element$$136$$ && ($JSCompiler_StaticMethods_unconfigureElement_$self$$.$getDomHelper$().$removeChildren$($element$$136$$), $element$$136$$.innerHTML = "")
}
function $JSCompiler_StaticMethods_setAnchoredPosition_$$($JSCompiler_StaticMethods_setAnchoredPosition_$self$$, $anchorElement$$5$$, $corner$$14$$) {
  $JSCompiler_StaticMethods_setAnchoredPosition_$self$$.$popup_$.$setPinnedCorner$($corner$$14$$);
  var $JSCompiler_temp_const$$17$$ = $JSCompiler_StaticMethods_setAnchoredPosition_$self$$.$popup_$, $margin$$inline_617$$ = new $goog$math$Box$$(0, 0, 0, 0);
  $corner$$14$$ & 2 ? $margin$$inline_617$$.right -= $JSCompiler_StaticMethods_setAnchoredPosition_$self$$.$config_$.$marginShift$ : $margin$$inline_617$$.left -= $JSCompiler_StaticMethods_setAnchoredPosition_$self$$.$config_$.$marginShift$;
  $JSCompiler_temp_const$$17$$.$margin_$ = $margin$$inline_617$$ == $JSCompiler_alias_NULL$$ || $margin$$inline_617$$ instanceof $goog$math$Box$$ ? $margin$$inline_617$$ : new $goog$math$Box$$($margin$$inline_617$$, $JSCompiler_alias_VOID$$, $JSCompiler_alias_VOID$$, $JSCompiler_alias_VOID$$);
  $JSCompiler_temp_const$$17$$.$isVisible$() && $JSCompiler_temp_const$$17$$.$reposition$();
  $JSCompiler_StaticMethods_setAnchoredPosition_$self$$.$popup_$.$setPosition$(new $goog$positioning$AnchoredPosition$$($anchorElement$$5$$, $corner$$14$$ ^ 3))
}
$JSCompiler_prototypeAlias$$.$hideBubble_$ = function $$JSCompiler_prototypeAlias$$$$hideBubble_$$() {
  this.$setVisible$($JSCompiler_alias_FALSE$$)
};
var $goog$ui$Bubble$defaultConfig$$ = {$bubbleWidth$:147, $marginShift$:60, $cssBubbleFont$:"goog-bubble-font", $cssCloseButton$:"goog-bubble-close-button", $cssBubbleTopRightAnchor$:"goog-bubble-top-right-anchor", $cssBubbleTopLeftAnchor$:"goog-bubble-top-left-anchor", $cssBubbleTopNoAnchor$:"goog-bubble-top-no-anchor", $cssBubbleBottomRightAnchor$:"goog-bubble-bottom-right-anchor", $cssBubbleBottomLeftAnchor$:"goog-bubble-bottom-left-anchor", $cssBubbleBottomNoAnchor$:"goog-bubble-bottom-no-anchor", 
$cssBubbleLeft$:"goog-bubble-left", $cssBubbleRight$:"goog-bubble-right"}, $goog$ui$Bubble$corners_$$ = [3, 1, 2, 0];
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
$JSCompiler_prototypeAlias$$.update = function $$JSCompiler_prototypeAlias$$$update$($aEvent$$12_currentCell$$1$$) {
  var $pageScroll$$1$$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$(this.$document_$)), $aEvent$$12_currentCell$$1$$ = $JSCompiler_StaticMethods_getCellByCoordinate_$$(this, $aEvent$$12_currentCell$$1$$.clientX + $pageScroll$$1$$.x - this.$elementOffset_$.x + this.$scrollableEl_$.scrollLeft, $aEvent$$12_currentCell$$1$$.clientY + $pageScroll$$1$$.y - this.$elementOffset_$.y + this.$scrollableEl_$.scrollTop);
  $goog$math$Coordinate$equals$$(this.$currentCell_$, $aEvent$$12_currentCell$$1$$) || (this.$currentCell_$ = $aEvent$$12_currentCell$$1$$, this.$update_$())
};
$JSCompiler_prototypeAlias$$.$init$ = function $$JSCompiler_prototypeAlias$$$$init$$($aConfiguration$$2$$, $aEvent$$13$$) {
  $rflect$cal$SelectionMask$$.prototype.$init$.call(this, $aConfiguration$$2$$);
  var $doc$$42_pageScroll$$2$$ = this.$document_$ || (this.$document_$ = $goog$dom$getOwnerDocument$$(this.$component_$.$getElement$())), $doc$$42_pageScroll$$2$$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$($doc$$42_pageScroll$$2$$)), $coordX_coordXWithoutScroll$$ = 0, $coordYWithoutScroll$$ = 0, $coordY$$ = $coordX_coordXWithoutScroll$$ = 0;
  this.$elementOffset_$ = new $goog$math$Coordinate$$(0, 0);
  this.$isWeekOrAllday_$() ? (1 == this.$configuration_$ ? (this.$scrollableEl_$ = $goog$dom$getElement$$("main-pane-header-scrollable"), this.$maskEl_$ = $goog$dom$getElement$$("wk-ad-mask-cnt"), this.$elementOffset_$ = $goog$style$getRelativePosition$$(this.$scrollableEl_$), this.$elementOffset_$.x += 1) : (this.$scrollableEl_$ = $goog$dom$getElement$$("main-pane-body-scrollable-wk"), this.$maskEl_$ = $goog$dom$getElement$$("wk-mask-cnt"), this.$elementOffset_$ = $goog$style$getRelativePosition$$(this.$scrollableEl_$), 
  this.$elementOffset_$.x += 62), this.$elementOffset_$.y += 1) : 3 == this.$configuration_$ && (this.$scrollableEl_$ = $goog$dom$getElement$$("main-pane-body-scrollable-mn"), this.$maskEl_$ = $goog$dom$getElement$$("mn-mask-cnt"), this.$elementOffset_$ = $goog$style$getRelativePosition$$(this.$scrollableEl_$), this.$elementOffset_$.x += 17, this.$elementOffset_$.y += 1);
  $coordX_coordXWithoutScroll$$ = $aEvent$$13$$.clientX + $doc$$42_pageScroll$$2$$.x - this.$elementOffset_$.x;
  $coordYWithoutScroll$$ = $aEvent$$13$$.clientY + $doc$$42_pageScroll$$2$$.y - this.$elementOffset_$.y;
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
  for(var $blocksNumber$$6$$ = $aBlockPool$$1$$.$blocksNumber_$, $counter$$19$$ = 0, $index$$62$$ = 0;$counter$$19$$ < $blocksNumber$$6$$ && $aCoord$$ > $aBlockPool$$1$$.$blocks$[$counter$$19$$].position;) {
    $index$$62$$ = $counter$$19$$++
  }
  return $index$$62$$
}
function $JSCompiler_StaticMethods_getCellCoord_$$($JSCompiler_StaticMethods_getCellCoord_$self$$, $aCellOrIndex$$, $aBlockDependent$$) {
  var $coord$$3$$ = 0;
  return $coord$$3$$ = $JSCompiler_StaticMethods_getCellCoord_$self$$.$isWeekOrAllday_$() ? $aBlockDependent$$ ? $aCellOrIndex$$.x : $aCellOrIndex$$.y : $aBlockDependent$$ ? $aCellOrIndex$$.y : $aCellOrIndex$$.x
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
    $JSCompiler_alias_FALSE$$), $defaultStep_step$$inline_626$$;
    $defaultStep_step$$inline_626$$ = 0;
    $defaultStep_step$$inline_626$$ = 1 == this.$configuration_$ ? this.$blockPoolAllday_$.$gridSize$.height : 2 == this.$configuration_$ ? 24 : this.$blockPoolMonth_$.$gridSize$.width / 7;
    var $maxSize_size$$inline_629$$;
    $maxSize_size$$inline_629$$ = 0;
    $maxSize_size$$inline_629$$ = 1 == this.$configuration_$ ? this.$blockPoolAllday_$.$gridSize$.height : 2 == this.$configuration_$ ? 1152 : this.$blockPoolMonth_$.$gridSize$.width;
    var $minIndex$$ = 0, $maxIndex$$ = 0;
    $startCellPrimaryCoord$$ == $currentCellPrimaryCoord$$ ? ($minIndex$$ = Math.min($startCellSecondaryCoord$$, $currentCellSecondaryCoord$$), $maxIndex$$ = Math.max($startCellSecondaryCoord$$, $currentCellSecondaryCoord$$), this.$rects_$.push(this.$getRect_$($blockPositionForStartCell$$, $minIndex$$ * $defaultStep_step$$inline_626$$, $blockSizeForStartCell$$, ($maxIndex$$ - $minIndex$$ + 1) * $defaultStep_step$$inline_626$$))) : (this.$rects_$.push(this.$getRect_$($blockPositionForStartCell$$, 
    $currentCellPrimaryCoord$$ > $startCellPrimaryCoord$$ ? $startCellSecondaryCoord$$ * $defaultStep_step$$inline_626$$ : 0, $blockSizeForStartCell$$, $currentCellPrimaryCoord$$ > $startCellPrimaryCoord$$ ? $maxSize_size$$inline_629$$ - $startCellSecondaryCoord$$ * $defaultStep_step$$inline_626$$ : ($startCellSecondaryCoord$$ + 1) * $defaultStep_step$$inline_626$$)), this.$rects_$.push(this.$getRect_$($blockPositionForCurrentCell$$, $currentCellPrimaryCoord$$ > $startCellPrimaryCoord$$ ? 0 : $currentCellSecondaryCoord$$ * 
    $defaultStep_step$$inline_626$$, $blockSizeForCurrentCell$$, $currentCellPrimaryCoord$$ > $startCellPrimaryCoord$$ ? ($currentCellSecondaryCoord$$ + 1) * $defaultStep_step$$inline_626$$ : $maxSize_size$$inline_629$$ - $currentCellSecondaryCoord$$ * $defaultStep_step$$inline_626$$)), 1 < Math.abs($currentCellPrimaryCoord$$ - $startCellPrimaryCoord$$) && ($minIndex$$ = Math.min($startCellPrimaryCoord$$, $currentCellPrimaryCoord$$), $maxIndex$$ = Math.max($startCellPrimaryCoord$$, $currentCellPrimaryCoord$$), 
    this.$rects_$.push(this.$getRect_$($JSCompiler_StaticMethods_getBlockPositionOrSize_$$(this, $minIndex$$ + 1, $JSCompiler_alias_TRUE$$), 0, $JSCompiler_StaticMethods_getBlockPositionOrSize_$$(this, $maxIndex$$, $JSCompiler_alias_TRUE$$) - $JSCompiler_StaticMethods_getBlockPositionOrSize_$$(this, $minIndex$$ + 1, $JSCompiler_alias_TRUE$$), $maxSize_size$$inline_629$$))));
    $JSCompiler_StaticMethods_calculateDates_$$(this, $minCell$$2$$, $maxCell$$2$$);
    this.$maskEl_$.innerHTML = $JSCompiler_StaticMethods_build_$$(this)
  }
};
function $rflect$cal$MainPane$$($JSCompiler_StaticMethods_setButtonSet$self$$inline_636_JSCompiler_StaticMethods_setTitle$self$$inline_633_aViewManager$$11$$, $JSCompiler_StaticMethods_attachToElement$self$$inline_958_aTimeManager$$8_buttons$$inline_637$$, $aEventManager$$5$$, $aContainerSizeMonitor$$4$$, $aBlockManager$$) {
  $goog$ui$Component$$.call(this, $JSCompiler_alias_VOID$$);
  this.$viewManager_$ = $JSCompiler_StaticMethods_setButtonSet$self$$inline_636_JSCompiler_StaticMethods_setTitle$self$$inline_633_aViewManager$$11$$;
  this.$timeManager_$ = $JSCompiler_StaticMethods_attachToElement$self$$inline_958_aTimeManager$$8_buttons$$inline_637$$;
  this.$eventManager_$ = $aEventManager$$5$$;
  this.$containerSizeMonitor_$ = $aContainerSizeMonitor$$4$$;
  this.$blockManager_$ = $aBlockManager$$;
  this.$timeMarker_$ = new $rflect$cal$TimeMarker$$($JSCompiler_StaticMethods_setButtonSet$self$$inline_636_JSCompiler_StaticMethods_setTitle$self$$inline_633_aViewManager$$11$$, $JSCompiler_StaticMethods_attachToElement$self$$inline_958_aTimeManager$$8_buttons$$inline_637$$);
  this.$mainPaneBuilder_$ = new $rflect$cal$MainPaneBuilder$$(this.$viewManager_$, this, $JSCompiler_StaticMethods_attachToElement$self$$inline_958_aTimeManager$$8_buttons$$inline_637$$, this.$eventManager_$, this.$blockManager_$.$blockPoolWeek$, this.$blockManager_$.$blockPoolAllday$, this.$blockManager_$.$blockPoolMonth$, this.$containerSizeMonitor_$, this.$timeMarker_$);
  $_inspect$$("mainPaneBuilder", this.$mainPaneBuilder_$);
  this.$selectionMask_$ = new $rflect$cal$MainPaneSelectionMask$$($JSCompiler_StaticMethods_setButtonSet$self$$inline_636_JSCompiler_StaticMethods_setTitle$self$$inline_633_aViewManager$$11$$, this, $JSCompiler_StaticMethods_attachToElement$self$$inline_958_aTimeManager$$8_buttons$$inline_637$$, this.$blockManager_$.$blockPoolWeek$, this.$blockManager_$.$blockPoolAllday$, this.$blockManager_$.$blockPoolMonth$);
  $_inspect$$("selectionMask", this.$selectionMask_$);
  this.$alldayGridSize$ = this.$alldayGridContainerSize$ = this.$gridSize$ = this.$gridContainerSize$ = this.$scrollablesCombinedWkSize_$ = $JSCompiler_alias_NULL$$;
  this.$scrollListenersKeys_$ = [];
  this.$moRegistry_$ = new $rflect$cal$MouseOverRegistry$$;
  $JSCompiler_StaticMethods_setButtonSet$self$$inline_636_JSCompiler_StaticMethods_setTitle$self$$inline_633_aViewManager$$11$$ = this.$dialog_$ = new $goog$ui$Dialog$$;
  $JSCompiler_StaticMethods_setButtonSet$self$$inline_636_JSCompiler_StaticMethods_setTitle$self$$inline_633_aViewManager$$11$$.$title_$ = "new event";
  $JSCompiler_StaticMethods_setButtonSet$self$$inline_636_JSCompiler_StaticMethods_setTitle$self$$inline_633_aViewManager$$11$$.$titleTextEl_$ && $goog$dom$setTextContent$$($JSCompiler_StaticMethods_setButtonSet$self$$inline_636_JSCompiler_StaticMethods_setTitle$self$$inline_633_aViewManager$$11$$.$titleTextEl_$, "new event");
  this.$dialog_$.$setContent$("<input/>");
  $JSCompiler_StaticMethods_setButtonSet$self$$inline_636_JSCompiler_StaticMethods_setTitle$self$$inline_633_aViewManager$$11$$ = this.$dialog_$;
  $JSCompiler_StaticMethods_attachToElement$self$$inline_958_aTimeManager$$8_buttons$$inline_637$$ = $JSCompiler_StaticMethods_addButton$$($JSCompiler_StaticMethods_addButton$$(new $goog$ui$Dialog$ButtonSet$$, $goog$ui$Dialog$ButtonSet$DefaultButtons$SAVE$$), $goog$ui$Dialog$ButtonSet$DefaultButtons$CANCEL$$, $JSCompiler_alias_TRUE$$, $JSCompiler_alias_TRUE$$);
  $JSCompiler_StaticMethods_setButtonSet$self$$inline_636_JSCompiler_StaticMethods_setTitle$self$$inline_633_aViewManager$$11$$.$buttons_$ = $JSCompiler_StaticMethods_attachToElement$self$$inline_958_aTimeManager$$8_buttons$$inline_637$$;
  $JSCompiler_StaticMethods_setButtonSet$self$$inline_636_JSCompiler_StaticMethods_setTitle$self$$inline_633_aViewManager$$11$$.$buttonEl_$ && ($JSCompiler_StaticMethods_setButtonSet$self$$inline_636_JSCompiler_StaticMethods_setTitle$self$$inline_633_aViewManager$$11$$.$buttons_$ ? ($JSCompiler_StaticMethods_attachToElement$self$$inline_958_aTimeManager$$8_buttons$$inline_637$$ = $JSCompiler_StaticMethods_setButtonSet$self$$inline_636_JSCompiler_StaticMethods_setTitle$self$$inline_633_aViewManager$$11$$.$buttons_$, 
  $JSCompiler_StaticMethods_attachToElement$self$$inline_958_aTimeManager$$8_buttons$$inline_637$$.$element_$ = $JSCompiler_StaticMethods_setButtonSet$self$$inline_636_JSCompiler_StaticMethods_setTitle$self$$inline_633_aViewManager$$11$$.$buttonEl_$, $JSCompiler_StaticMethods_attachToElement$self$$inline_958_aTimeManager$$8_buttons$$inline_637$$.$render$()) : $JSCompiler_StaticMethods_setButtonSet$self$$inline_636_JSCompiler_StaticMethods_setTitle$self$$inline_633_aViewManager$$11$$.$buttonEl_$.innerHTML = 
  "", $goog$style$showElement$$($JSCompiler_StaticMethods_setButtonSet$self$$inline_636_JSCompiler_StaticMethods_setTitle$self$$inline_633_aViewManager$$11$$.$buttonEl_$, !!$JSCompiler_StaticMethods_setButtonSet$self$$inline_636_JSCompiler_StaticMethods_setTitle$self$$inline_633_aViewManager$$11$$.$buttons_$));
  $JSCompiler_StaticMethods_addChild$$(this, this.$dialog_$);
  this.$bubble_$ = new $goog$ui$Bubble$$("New event")
}
$goog$inherits$$($rflect$cal$MainPane$$, $rflect$cal$Component$$);
$JSCompiler_prototypeAlias$$ = $rflect$cal$MainPane$$.prototype;
$JSCompiler_prototypeAlias$$.$updateBeforeRedraw$ = function $$JSCompiler_prototypeAlias$$$$updateBeforeRedraw$$() {
  var $JSCompiler_StaticMethods_setSizes$self$$inline_961_alldayBlockMaxHeight_containerSize$$ = this.$containerSizeMonitor_$.$getSize$();
  516 > $JSCompiler_StaticMethods_setSizes$self$$inline_961_alldayBlockMaxHeight_containerSize$$.width && ($JSCompiler_StaticMethods_setSizes$self$$inline_961_alldayBlockMaxHeight_containerSize$$.width = 516);
  374 > $JSCompiler_StaticMethods_setSizes$self$$inline_961_alldayBlockMaxHeight_containerSize$$.height && ($JSCompiler_StaticMethods_setSizes$self$$inline_961_alldayBlockMaxHeight_containerSize$$.height = 374);
  $JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$) ? (this.$scrollablesCombinedWkSize_$ = $JSCompiler_StaticMethods_setSizes$self$$inline_961_alldayBlockMaxHeight_containerSize$$.$clone$(), this.$scrollablesCombinedWkSize_$.height -= 113, this.$scrollablesCombinedWkSize_$.width -= 229, this.$scrollablesCombinedWkSize_$.width -= this.$containerSizeMonitor_$.$scrollbarWidth$, this.$alldayGridContainerSize$ = this.$scrollablesCombinedWkSize_$.$clone$(), this.$gridContainerSize$ = this.$scrollablesCombinedWkSize_$.$clone$(), 
  this.$gridSize$ = this.$gridContainerSize$.$clone$(), this.$gridSize$.height = 1152, this.$blockManager_$.$blockPoolAllday$.$expanded$ || (this.$alldayGridContainerSize$.height = 47, this.$alldayGridSize$ = this.$alldayGridContainerSize$.$clone$())) : $JSCompiler_StaticMethods_isInMonthMode$$(this.$viewManager_$) && (this.$gridContainerSize$ = $JSCompiler_StaticMethods_setSizes$self$$inline_961_alldayBlockMaxHeight_containerSize$$.$clone$(), this.$gridContainerSize$.height -= 78, this.$gridContainerSize$.width -= 
  196, this.$gridSize$ = this.$gridContainerSize$.$clone$(), this.$gridSize$.width -= $JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$) || $JSCompiler_StaticMethods_isInMonthMode$$(this.$viewManager_$) && this.$blockManager_$.$blockPoolMonth$.$expanded$ ? this.$containerSizeMonitor_$.$scrollbarWidth$ : 0);
  var $JSCompiler_StaticMethods_setSizes$self$$inline_961_alldayBlockMaxHeight_containerSize$$ = this.$blockManager_$, $aGridSize$$inline_962$$ = this.$gridSize$, $aGridContainerSize$$inline_963$$ = this.$gridContainerSize$, $opt_alldayGridSize$$inline_964$$ = this.$alldayGridSize$, $opt_alldayGridContainerSize$$inline_965$$ = this.$alldayGridContainerSize$;
  $JSCompiler_StaticMethods_isInWeekMode$$($JSCompiler_StaticMethods_setSizes$self$$inline_961_alldayBlockMaxHeight_containerSize$$.$viewManager_$) ? ($JSCompiler_StaticMethods_setSizes$self$$inline_961_alldayBlockMaxHeight_containerSize$$.$blockPoolWeek$.$gridContainerSize$ = $aGridContainerSize$$inline_963$$, $JSCompiler_StaticMethods_setSizes$self$$inline_961_alldayBlockMaxHeight_containerSize$$.$blockPoolWeek$.$gridSize$ = $aGridSize$$inline_962$$, $JSCompiler_StaticMethods_setSizes$self$$inline_961_alldayBlockMaxHeight_containerSize$$.$blockPoolAllday$.$gridSize$ = 
  $opt_alldayGridSize$$inline_964$$, $JSCompiler_StaticMethods_setSizes$self$$inline_961_alldayBlockMaxHeight_containerSize$$.$blockPoolAllday$.$gridContainerSize$ = $opt_alldayGridContainerSize$$inline_965$$) : $JSCompiler_StaticMethods_isInMonthMode$$($JSCompiler_StaticMethods_setSizes$self$$inline_961_alldayBlockMaxHeight_containerSize$$.$viewManager_$) && ($JSCompiler_StaticMethods_setSizes$self$$inline_961_alldayBlockMaxHeight_containerSize$$.$blockPoolMonth$.$gridContainerSize$ = $aGridContainerSize$$inline_963$$, 
  $JSCompiler_StaticMethods_setSizes$self$$inline_961_alldayBlockMaxHeight_containerSize$$.$blockPoolMonth$.$gridSize$ = $aGridSize$$inline_962$$);
  this.$blockManager_$.update();
  if($JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$) && (this.$blockManager_$.$blockPoolAllday$.$expanded$ && ($JSCompiler_StaticMethods_setSizes$self$$inline_961_alldayBlockMaxHeight_containerSize$$ = 0, $JSCompiler_StaticMethods_setSizes$self$$inline_961_alldayBlockMaxHeight_containerSize$$ = Math.floor(this.$scrollablesCombinedWkSize_$.height / 2), this.$alldayGridContainerSize$.height = this.$alldayGridSize$.height > $JSCompiler_StaticMethods_setSizes$self$$inline_961_alldayBlockMaxHeight_containerSize$$ ? 
  $JSCompiler_StaticMethods_setSizes$self$$inline_961_alldayBlockMaxHeight_containerSize$$ : this.$alldayGridSize$.height), this.$gridContainerSize$.height = this.$scrollablesCombinedWkSize_$.height - this.$alldayGridContainerSize$.height, this.$alldayGridContainerSize$.height += this.$blockManager_$.$blockPoolWeek$.$expanded$ ? this.$containerSizeMonitor_$.$scrollbarWidth$ : 0, 1152 < this.$gridContainerSize$.height)) {
    this.$gridContainerSize$.height = 1152 + ($JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$) && this.$blockManager_$.$blockPoolWeek$.$expanded$ ? this.$containerSizeMonitor_$.$scrollbarWidth$ : 0)
  }
  $JSCompiler_StaticMethods_removeScrollListeners_$$(this)
};
function $JSCompiler_StaticMethods_removeScrollListeners_$$($JSCompiler_StaticMethods_removeScrollListeners_$self$$) {
  $goog$array$forEach$$($JSCompiler_StaticMethods_removeScrollListeners_$self$$.$scrollListenersKeys_$, function($aKey$$) {
    $goog$events$unlistenByKey$$($aKey$$)
  });
  $JSCompiler_StaticMethods_removeScrollListeners_$self$$.$scrollListenersKeys_$.length = 0
}
$JSCompiler_prototypeAlias$$.$updateByRedraw$ = function $$JSCompiler_prototypeAlias$$$$updateByRedraw$$() {
  this.$getElement$().innerHTML = $JSCompiler_StaticMethods_buildBody$$(this);
  $JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$) ? this.$blockManager_$.$blockPoolWeek$.$expanded$ && this.$scrollListenersKeys_$.push($goog$events$listen$$(this.$dom_$.$getElement$("main-pane-body-scrollable-wk"), "scroll", this.$onMainPaneScrollableScroll_$, $JSCompiler_alias_FALSE$$, this)) : $JSCompiler_StaticMethods_isInMonthMode$$(this.$viewManager_$) && this.$blockManager_$.$blockPoolMonth$.$expanded$ && this.$scrollListenersKeys_$.push($goog$events$listen$$(this.$dom_$.$getElement$("main-pane-body-scrollable-mn"), 
  "scroll", this.$onMainPaneScrollableScroll_$, $JSCompiler_alias_FALSE$$, this));
  $JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$) ? this.$blockManager_$.$blockPoolWeek$.$expanded$ && (this.$dom_$.$getElement$("main-pane-body-scrollable-wk").scrollLeft = this.$dom_$.$getElement$("main-pane-header-scrollable").scrollLeft = this.$blockManager_$.$blockPoolWeek$.scrollLeft) : $JSCompiler_StaticMethods_isInMonthMode$$(this.$viewManager_$) && this.$blockManager_$.$blockPoolMonth$.$expanded$ && (this.$dom_$.$getElement$("main-pane-body-scrollable-mn").scrollTop = this.$blockManager_$.$blockPoolMonth$.scrollTop)
};
$JSCompiler_prototypeAlias$$.$buildBodyInternal$ = function $$JSCompiler_prototypeAlias$$$$buildBodyInternal$$($aSb$$56$$) {
  if($JSCompiler_StaticMethods_isInMonthMode$$(this.$viewManager_$)) {
    for(var $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_643_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_648$$ = this.$mainPaneBuilder_$, $offset$$inline_645_offset$$inline_650$$ = 0, $length$$inline_646_length$$inline_651$$ = $rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$.length;++$offset$$inline_645_offset$$inline_650$$ < $length$$inline_646_length$$inline_651$$ - 1;) {
      switch($aSb$$56$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$offset$$inline_645_offset$$inline_650$$]), $offset$$inline_645_offset$$inline_650$$) {
        case 5:
          var $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$ = 
          $aSb$$56$$;
          $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_643_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_648$$.$blockPoolMonth_$.$expanded$ ? $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.append($JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_643_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_648$$.$containerSizeMonitor_$.$scrollbarWidth$ + 
          2) : $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.append(2);
          break;
        case 8:
          for(var $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$ = 
          $aSb$$56$$, $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$ = $offset$$inline_645_offset$$inline_650$$, $aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ = 
          $goog$i18n$DateTimeSymbols_en$$.$FIRSTDAYOFWEEK$, $dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$ = 0, $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$ = 0;7 > 
          $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$;$blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$++) {
            0 < $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$ && $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$]), 
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.append($blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$), 
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$ + 
            1]), $dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$ = ($aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
            $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$ + 1) % 7, $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.append($goog$i18n$DateTimeSymbols_en$$.$WEEKDAYS$[$dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$]), 
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$ + 
            2])
          }
          $offset$$inline_645_offset$$inline_650$$ += 2;
          break;
        case 15:
          $aSb$$56$$.append($JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_643_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_648$$.$blockPoolMonth_$.$gridContainerSize$.height);
          break;
        case 19:
          $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$ = 
          $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_643_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_648$$;
          $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$ = $aSb$$56$$;
          $aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ = $offset$$inline_645_offset$$inline_650$$;
          $dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$ = 0;
          for($blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolMonth_$.$blocksNumber_$;$dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$ < 
          $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$;$dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$++) {
            0 < $dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$ && $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$]), 
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
            1]), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolMonth_$.$blocks$[$dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$].size), 
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
            2]), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
            3]), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
            4]), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
            5]), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolMonth_$.$blocks$[$dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$].$expanded$ ? 
            "mn-row-zippy-expanded" : "mn-row-zippy-collapsed"), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
            6]), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
            7]), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
            8])
          }
          $offset$$inline_645_offset$$inline_650$$ += 7;
          break;
        case 30:
          $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$ = 
          $aSb$$56$$;
          $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_643_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_648$$.$blockPoolMonth_$.$expanded$ ? $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.append("mpbs-mn-scroll-vert-on") : 
          $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.append("mpbs-mn-scroll-vert-off");
          break;
        case 32:
          $aSb$$56$$.append($JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_643_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_648$$.$blockPoolMonth_$.$gridSize$.height);
          break;
        case 35:
          for(var $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$ = 
          $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_643_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_648$$, $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$ = $aSb$$56$$, $aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ = 
          $offset$$inline_645_offset$$inline_650$$, $dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$ = $JSCompiler_alias_NULL$$, $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$ = 
          0, $blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolMonth_$.$blocksNumber_$;$blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$ < 
          $blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$;$blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$++) {
            0 < $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$ && $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$]), 
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
            1]), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolMonth_$.$blocks$[$blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$].size), 
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
            2]), $dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$timeManager_$.$daySeries$[7 * 
            $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$], $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$.$getWeekNumber$()), 
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
            3])
          }
          $offset$$inline_645_offset$$inline_650$$ += 3;
          break;
        case 43:
          $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$ = 
          $aSb$$56$$;
          $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$ = $offset$$inline_645_offset$$inline_650$$;
          for($aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ = 0;7 > $aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$;$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$++) {
            0 < $aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ && $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$]), 
            6 == $aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ && $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.append(" weekgrid-col-last"), 
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$ + 
            1])
          }
          $offset$$inline_645_offset$$inline_650$$++;
          break;
        case 48:
          $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_643_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_648$$.$buildMonthGridRows_$($aSb$$56$$, $offset$$inline_645_offset$$inline_650$$), $offset$$inline_645_offset$$inline_650$$ += 32
      }
    }
  }else {
    if($JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$)) {
      $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_643_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_648$$ = this.$mainPaneBuilder_$;
      $offset$$inline_645_offset$$inline_650$$ = 0;
      for($length$$inline_646_length$$inline_651$$ = $rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$.length;++$offset$$inline_645_offset$$inline_650$$ < $length$$inline_646_length$$inline_651$$ - 1;) {
        switch($aSb$$56$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$offset$$inline_645_offset$$inline_650$$]), $offset$$inline_645_offset$$inline_650$$) {
          case 3:
            $aSb$$56$$.append($JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_643_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_648$$.$blockPoolAllday_$.$expanded$ ? "goog-zippy-expanded" : "goog-zippy-collapsed");
            break;
          case 8:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$ = 
            $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_643_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_648$$;
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$ = $aSb$$56$$;
            $aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ = $offset$$inline_645_offset$$inline_650$$;
            $dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$timeManager_$.$daySeries$;
            $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$ = 0;
            $blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolWeek_$.$gridSize$.width;
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append((100 * ($blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$ / $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolAllday_$.$gridContainerSize$.width)).toFixed(4));
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
            1]);
            for(var $blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$ = 0, $aSb$$inline_1179_aSb$$inline_1185_blocksNumber$$inline_1012_blocksNumber$$inline_1029_timeIncrement$$inline_1061$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolWeek_$.$blocksNumber_$;$blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$ < 
            $aSb$$inline_1179_aSb$$inline_1185_blocksNumber$$inline_1012_blocksNumber$$inline_1029_timeIncrement$$inline_1061$$;$blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$++) {
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              2]), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              3]), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append((100 * ($blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$ / $blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$)).toFixed(4)), 
              $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$ += $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolWeek_$.$blocks$[$blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$].size, 
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              4]), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append((100 - 100 * ($blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$ / $blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$)).toFixed(4)), 
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              5]), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append(-100 * $blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              6]), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append(1 != $aSb$$inline_1179_aSb$$inline_1185_blocksNumber$$inline_1012_blocksNumber$$inline_1029_timeIncrement$$inline_1061$$ ? "dayname-wk-inner" : ""), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              7]), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($JSCompiler_StaticMethods_format$$($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$weekDayNameFormatWeek_$, 
              $dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$[$blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$])), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              8])
            }
            $offset$$inline_645_offset$$inline_650$$ += 8;
            break;
          case 19:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$ = 
            $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_643_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_648$$;
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$ = $aSb$$56$$;
            $aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ = $offset$$inline_645_offset$$inline_650$$;
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolAllday_$.$expanded$ ? 
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append("mphs-scroll-vert-on ") : $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append("mphs-scroll-vert-off ");
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolWeek_$.$expanded$ ? 
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append("mphs-scroll-horz-on") : $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append("mphs-scroll-horz-off");
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
            1]);
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolAllday_$.$gridContainerSize$.height);
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
            2]);
            $offset$$inline_645_offset$$inline_650$$ += 2;
            break;
          case 23:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$ = 
            $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_643_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_648$$;
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$ = $aSb$$56$$;
            $aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ = $offset$$inline_645_offset$$inline_650$$;
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolAllday_$.$gridSize$.height);
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
            1]);
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append((100 * ($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolWeek_$.$gridSize$.width / 
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolAllday_$.$gridContainerSize$.width)).toFixed(4));
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
            2]);
            $offset$$inline_645_offset$$inline_650$$ += 2;
            break;
          case 26:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$ = 
            $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_643_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_648$$;
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$ = $aSb$$56$$;
            $aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ = $offset$$inline_645_offset$$inline_650$$;
            $dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$ = 0;
            $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolWeek_$.$gridSize$.width;
            $blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolAllday_$.$blocks$[0].$sparseArrays$;
            $blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$ = 0;
            for($aSb$$inline_1179_aSb$$inline_1185_blocksNumber$$inline_1012_blocksNumber$$inline_1029_timeIncrement$$inline_1061$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolWeek_$.$blocksNumber_$;$blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$ < 
            $aSb$$inline_1179_aSb$$inline_1185_blocksNumber$$inline_1012_blocksNumber$$inline_1029_timeIncrement$$inline_1061$$;$blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$++) {
              0 < $blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$ && $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$]);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              1]);
              $blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$ == $aSb$$inline_1179_aSb$$inline_1185_blocksNumber$$inline_1012_blocksNumber$$inline_1029_timeIncrement$$inline_1061$$ - 1 && $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append(" weekgrid-col-last");
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              2]);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append((100 * ($dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$ / $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$)).toFixed(4));
              $dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$ += $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolWeek_$.$blocks$[$blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$].size;
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              3]);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append((100 - 100 * ($dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$ / 
              $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$)).toFixed(4));
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              4]);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append(-100 * $blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              5]);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              6]);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              7]);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              8]);
              var $aOffset$$inline_1180_aSb$$inline_1030_aSb$$inline_1033_counter$$inline_1062$$ = $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$, $aChips$$inline_1034_aOffset$$inline_1031_block$$inline_1182$$ = $aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              9, $aEventManager$$inline_1035_block$$inline_1032_counter$$inline_1183$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolAllday_$.$blocks$[0];
              $aOffset$$inline_1180_aSb$$inline_1030_aSb$$inline_1033_counter$$inline_1062$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aChips$$inline_1034_aOffset$$inline_1031_block$$inline_1182$$]);
              $aOffset$$inline_1180_aSb$$inline_1030_aSb$$inline_1033_counter$$inline_1062$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aChips$$inline_1034_aOffset$$inline_1031_block$$inline_1182$$ + 1]);
              $aOffset$$inline_1180_aSb$$inline_1030_aSb$$inline_1033_counter$$inline_1062$$.append(!$aEventManager$$inline_1035_block$$inline_1032_counter$$inline_1183$$.$expanded$ && $aEventManager$$inline_1035_block$$inline_1032_counter$$inline_1183$$.$couldBeExpanded$ ? "expand-sign-wk-ad-collapsed" : $aEventManager$$inline_1035_block$$inline_1032_counter$$inline_1183$$.$expanded$ && $aEventManager$$inline_1035_block$$inline_1032_counter$$inline_1183$$.$couldBeCollapsed$ ? "expand-sign-wk-ad-expanded" : 
              "");
              $aOffset$$inline_1180_aSb$$inline_1030_aSb$$inline_1033_counter$$inline_1062$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aChips$$inline_1034_aOffset$$inline_1031_block$$inline_1182$$ + 2]);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              12]);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              13]);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              14]);
              for(var $aOffset$$inline_1180_aSb$$inline_1030_aSb$$inline_1033_counter$$inline_1062$$ = $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$, $aChips$$inline_1034_aOffset$$inline_1031_block$$inline_1182$$ = $blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$[$blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$], 
              $aEventManager$$inline_1035_block$$inline_1032_counter$$inline_1183$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$eventManager_$, 
              $chip$$inline_1036$$ = $JSCompiler_alias_VOID$$, $chipCounter$$inline_1037$$ = 0, $length$$inline_1038$$ = $aChips$$inline_1034_aOffset$$inline_1031_block$$inline_1182$$.length;$chipCounter$$inline_1037$$ < $length$$inline_1038$$;$chipCounter$$inline_1037$$++) {
                ($chip$$inline_1036$$ = $aChips$$inline_1034_aOffset$$inline_1031_block$$inline_1182$$[$chipCounter$$inline_1037$$]) && $rflect$cal$MainPaneBuilder$buildMonthBlockChip_$$($aOffset$$inline_1180_aSb$$inline_1030_aSb$$inline_1033_counter$$inline_1062$$, 71, $aEventManager$$inline_1035_block$$inline_1032_counter$$inline_1183$$, $chip$$inline_1036$$, 0, $chipCounter$$inline_1037$$, 0, $JSCompiler_alias_TRUE$$)
              }
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              15]);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              16]);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              17])
            }
            $offset$$inline_645_offset$$inline_650$$ += 17;
            break;
          case 48:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$ = 
            $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_643_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_648$$;
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$ = $aSb$$56$$;
            $aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ = $offset$$inline_645_offset$$inline_650$$;
            $dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$ = 0;
            $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolWeek_$.$gridSize$.width;
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append((100 * ($blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$ / $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolWeek_$.$gridContainerSize$.width)).toFixed(4));
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
            1]);
            $blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$ = 0;
            for($blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolWeek_$.$blocksNumber_$;$blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$ < 
            $blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$;$blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$++) {
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              2]), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append((100 * ($dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$ / 
              $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$)).toFixed(4)), $dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$ += $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolWeek_$.$blocks$[$blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$].size, 
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              3]), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append((100 - 100 * ($dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$ / 
              $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$)).toFixed(4)), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              4]), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append(-100 * $blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              5]), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              6]), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              7]), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolWeek_$.$blocks$[$blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$].$expanded$ ? 
              "wk-col-zippy-expanded" : "wk-col-zippy-collapsed"), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              8]), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              9])
            }
            $offset$$inline_645_offset$$inline_650$$ += 9;
            break;
          case 62:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$ = 
            $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_643_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_648$$;
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$ = $aSb$$56$$;
            $aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ = $offset$$inline_645_offset$$inline_650$$;
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolWeek_$.$gridContainerSize$.height);
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
            1]);
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolWeek_$.$expanded$ ? 
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append("mpbs-wk-scroll-horz-on") : $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append("mpbs-wk-scroll-horz-off");
            $offset$$inline_645_offset$$inline_650$$++;
            break;
          case 66:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$ = 
            $aSb$$56$$;
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.append($rflect$cal$TimeMarker$HEAD_PARTS_$$[0]);
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.append($JSCompiler_StaticMethods_getPosition_$$($JSCompiler_alias_TRUE$$));
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.append($rflect$cal$TimeMarker$HEAD_PARTS_$$[1]);
            break;
          case 67:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$ = 
            $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_643_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_648$$;
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$ = $aSb$$56$$;
            $aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ = $offset$$inline_645_offset$$inline_650$$;
            $dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$ = 100 * ($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolWeek_$.$gridSize$.width / 
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolWeek_$.$gridContainerSize$.width);
            if(1 in $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$cache_$ && 
            2 in $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$cache_$) {
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$cache_$[1]), 
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$), $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$cache_$[2])
            }else {
              $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$ = new $goog$string$StringBuffer$$;
              $blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$ = new $goog$i18n$DateTimeFormat$$($goog$i18n$DateTimeSymbols_en$$.$TIMEFORMATS$[3]);
              $blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$ = new $goog$date$DateTime$$;
              $aSb$$inline_1179_aSb$$inline_1185_blocksNumber$$inline_1012_blocksNumber$$inline_1029_timeIncrement$$inline_1061$$ = new $goog$date$Interval$$(0, 0, 0, 0, 30);
              $blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$.setHours(0);
              $blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$.setMinutes(0);
              $blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$.setSeconds(0);
              for($aOffset$$inline_1180_aSb$$inline_1030_aSb$$inline_1033_counter$$inline_1062$$ = 0;48 > $aOffset$$inline_1180_aSb$$inline_1030_aSb$$inline_1033_counter$$inline_1062$$;$aOffset$$inline_1180_aSb$$inline_1030_aSb$$inline_1033_counter$$inline_1062$$++, $blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$.add($aSb$$inline_1179_aSb$$inline_1185_blocksNumber$$inline_1012_blocksNumber$$inline_1029_timeIncrement$$inline_1061$$)) {
                0 < $aOffset$$inline_1180_aSb$$inline_1030_aSb$$inline_1033_counter$$inline_1062$$ && $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$]), 
                $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$.append("grid-table-row "), 0 == $aOffset$$inline_1180_aSb$$inline_1030_aSb$$inline_1033_counter$$inline_1062$$ % 2 ? ($blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$.append("grid-table-row-even"), 
                $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
                1]), $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$.append("hl-even")) : ($blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$.append("grid-table-row-odd"), $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
                1]), $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$.append("hl-odd")), $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
                2]), $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$.append($JSCompiler_StaticMethods_format$$($blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$, $blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$)), 
                $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
                3])
              }
              $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              4]);
              $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              5]);
              $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              6]);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$cache_$[1] = 
              $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$.toString());
              $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$.clear();
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$);
              $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              7]);
              for($aOffset$$inline_1180_aSb$$inline_1030_aSb$$inline_1033_counter$$inline_1062$$ = 0;48 > $aOffset$$inline_1180_aSb$$inline_1030_aSb$$inline_1033_counter$$inline_1062$$;$aOffset$$inline_1180_aSb$$inline_1030_aSb$$inline_1033_counter$$inline_1062$$++) {
                $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
                8]), $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$.append("grid-table-row "), 0 == $aOffset$$inline_1180_aSb$$inline_1030_aSb$$inline_1033_counter$$inline_1062$$ % 2 ? $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$.append("grid-table-row-even") : 
                $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$.append("grid-table-row-odd"), $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
                9])
              }
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$cache_$[2] = 
              $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$.toString())
            }
            $offset$$inline_645_offset$$inline_650$$ += 9;
            break;
          case 78:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$ = 
            $aSb$$56$$;
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$ = $offset$$inline_645_offset$$inline_650$$;
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.append(100 * 
            ($JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_643_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_648$$.$blockPoolWeek_$.$gridSize$.width / $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_643_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_648$$.$blockPoolWeek_$.$gridContainerSize$.width));
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$ + 
            1]);
            $offset$$inline_645_offset$$inline_650$$++;
            break;
          case 80:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$ = 
            $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_643_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_648$$;
            $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$ = $aSb$$56$$;
            $aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ = $offset$$inline_645_offset$$inline_650$$;
            $dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$ = 0;
            $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolWeek_$.$gridSize$.width;
            $blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$ = 0;
            for($blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolWeek_$.$blocksNumber_$;$blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$ < 
            $blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$;$blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$++) {
              0 < $blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$ && $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$]);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              1]);
              $blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$ == $blocksNumber$$inline_1046_blocksNumber$$inline_1074_colCounter$$inline_1011_colCounter$$inline_1028_timeCounter$$inline_1060$$ - 1 && $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append(" weekgrid-col-last");
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              2]);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append((100 * ($dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$ / $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$)).toFixed(4));
              $dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$ += $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolWeek_$.$blocks$[$blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$].size;
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              3]);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append((100 - 100 * ($dateInFirstCol$$inline_994_dayNameNumber$$inline_973_daySeries$$inline_1008_gridRowsWidth$$inline_1057_prevColsCumulativeSize$$inline_1025_prevColsCumulativeSize$$inline_1043_prevColsCumulativeSize$$inline_1071_rowCounter$$inline_982$$ / 
              $blocksNumber$$inline_983_counter$$inline_974_gridWidth$$inline_1026_gridWidth$$inline_1044_gridWidth$$inline_1072_prevColsCumulativeSize$$inline_1009_rowCounter$$inline_995_sb$$inline_1058$$)).toFixed(4));
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              4]);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append(-100 * $blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              5]);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              6]);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              7]);
              $aSb$$inline_1179_aSb$$inline_1185_blocksNumber$$inline_1012_blocksNumber$$inline_1029_timeIncrement$$inline_1061$$ = $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$;
              $aOffset$$inline_1180_aSb$$inline_1030_aSb$$inline_1033_counter$$inline_1062$$ = $aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 8;
              $aChips$$inline_1034_aOffset$$inline_1031_block$$inline_1182$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolWeek_$.$blocks$[$blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$];
              for($aEventManager$$inline_1035_block$$inline_1032_counter$$inline_1183$$ = 0;6 > $aEventManager$$inline_1035_block$$inline_1032_counter$$inline_1183$$;$aEventManager$$inline_1035_block$$inline_1032_counter$$inline_1183$$++) {
                $aSb$$inline_1179_aSb$$inline_1185_blocksNumber$$inline_1012_blocksNumber$$inline_1029_timeIncrement$$inline_1061$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1180_aSb$$inline_1030_aSb$$inline_1033_counter$$inline_1062$$]), $aSb$$inline_1179_aSb$$inline_1185_blocksNumber$$inline_1012_blocksNumber$$inline_1029_timeIncrement$$inline_1061$$.append(!$aChips$$inline_1034_aOffset$$inline_1031_block$$inline_1182$$.$expanded$ && $aChips$$inline_1034_aOffset$$inline_1031_block$$inline_1182$$.$couldBeExpanded$ ? 
                "expand-sign-wk-collapsed" : $aChips$$inline_1034_aOffset$$inline_1031_block$$inline_1182$$.$expanded$ && $aChips$$inline_1034_aOffset$$inline_1031_block$$inline_1182$$.$couldBeCollapsed$ ? "expand-sign-wk-expanded" : ""), $aSb$$inline_1179_aSb$$inline_1185_blocksNumber$$inline_1012_blocksNumber$$inline_1029_timeIncrement$$inline_1061$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1180_aSb$$inline_1030_aSb$$inline_1033_counter$$inline_1062$$ + 1])
              }
              $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$timeManager_$.$currentDay_$ && 
              $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$timeManager_$.$currentDay_$.$equals$($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$timeManager_$.$daySeries$[$blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$], 
              7) && ($aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              10]), $aSb$$inline_1179_aSb$$inline_1185_blocksNumber$$inline_1012_blocksNumber$$inline_1029_timeIncrement$$inline_1061$$ = $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$, $aSb$$inline_1179_aSb$$inline_1185_blocksNumber$$inline_1012_blocksNumber$$inline_1029_timeIncrement$$inline_1061$$.append($rflect$cal$TimeMarker$HEAD_PARTS_$$[2]), 
              $aSb$$inline_1179_aSb$$inline_1185_blocksNumber$$inline_1012_blocksNumber$$inline_1029_timeIncrement$$inline_1061$$.append($JSCompiler_StaticMethods_getPosition_$$($JSCompiler_alias_FALSE$$)), $aSb$$inline_1179_aSb$$inline_1185_blocksNumber$$inline_1012_blocksNumber$$inline_1029_timeIncrement$$inline_1061$$.append($rflect$cal$TimeMarker$HEAD_PARTS_$$[3]));
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              11]);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              12]);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              13]);
              $rflect$cal$MainPaneBuilder$forEachChip_$$($aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$, $aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              14, $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$eventManager_$, 
              $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_1018_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_1005_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_1054_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_979_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_1014_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_1048_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_1040_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_1022_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_1068_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_991_aSb$$inline_1052_aSb$$inline_1065_aSb$$inline_968_aSb$$inline_970_aSb$$inline_986_aSb$$inline_998$$.$blockPoolWeek_$, 
              $blocksNumber$$inline_996_colCounter$$inline_1045_colCounter$$inline_1073_gridWidth$$inline_1010_sparseArrays$$inline_1027_timeFormat$$inline_1059$$, $rflect$cal$MainPaneBuilder$buildWeekBlockChip_$$);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              25]);
              $aOffset$$inline_1066_aOffset$$inline_971_aOffset$$inline_999_aSb$$inline_1006_aSb$$inline_1015_aSb$$inline_1019_aSb$$inline_1023_aSb$$inline_1041_aSb$$inline_1049_aSb$$inline_1055_aSb$$inline_1069_aSb$$inline_980_aSb$$inline_992$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_1007_aOffset$$inline_1016_aOffset$$inline_1020_aOffset$$inline_1024_aOffset$$inline_1042_aOffset$$inline_1050_aOffset$$inline_1056_aOffset$$inline_1070_aOffset$$inline_981_aOffset$$inline_993_counter$$inline_1000_dayNamesFirstNumber$$inline_972$$ + 
              26])
            }
            $offset$$inline_645_offset$$inline_650$$ += 26
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
  $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$(this.$getHandler$(), this.$getElement$(), "click", this.$onClick_$, $JSCompiler_alias_FALSE$$, this), this.$getElement$(), "mouseover", this.$onMouseOver_$, $JSCompiler_alias_FALSE$$, this), this.$getElement$(), "mouseout", this.$onMouseOut_$, $JSCompiler_alias_FALSE$$, 
  this), this.$getElement$(), "mousedown", this.$onMouseDown_$, $JSCompiler_alias_FALSE$$, this), this.$getElement$(), "selectstart", this.$onSelectStart_$, $JSCompiler_alias_FALSE$$, this), document, "mousemove", this.$onMouseMove_$, $JSCompiler_alias_FALSE$$, this), document, "mouseup", this.$onMouseUp_$, $JSCompiler_alias_FALSE$$, this);
  this.$timeMarker_$.start()
};
$JSCompiler_prototypeAlias$$.$onClick_$ = function $$JSCompiler_prototypeAlias$$$$onClick_$$($JSCompiler_StaticMethods_toggleBlock$self$$inline_653_JSCompiler_StaticMethods_toggleBlock$self$$inline_661_JSCompiler_StaticMethods_toggleBlock$self$$inline_664_aEvent$$14_zippyClicked$$) {
  var $target$$51$$ = $JSCompiler_StaticMethods_toggleBlock$self$$inline_653_JSCompiler_StaticMethods_toggleBlock$self$$inline_661_JSCompiler_StaticMethods_toggleBlock$self$$inline_664_aEvent$$14_zippyClicked$$.target, $id$$12$$ = $target$$51$$.id, $className$$34$$ = $target$$51$$.className, $JSCompiler_StaticMethods_toggleBlock$self$$inline_653_JSCompiler_StaticMethods_toggleBlock$self$$inline_661_JSCompiler_StaticMethods_toggleBlock$self$$inline_664_aEvent$$14_zippyClicked$$ = $JSCompiler_alias_FALSE$$, 
  $day$$inline_659_index$$64_index$$inline_658$$ = 0;
  $JSCompiler_StaticMethods_isInMonthMode$$(this.$viewManager_$) ? /mn\-zippy\-row\d{1}/.test($id$$12$$) ? ($day$$inline_659_index$$64_index$$inline_658$$ = /\d{1}/.exec($id$$12$$)[0], $JSCompiler_StaticMethods_toggleBlock$self$$inline_653_JSCompiler_StaticMethods_toggleBlock$self$$inline_661_JSCompiler_StaticMethods_toggleBlock$self$$inline_664_aEvent$$14_zippyClicked$$ = this.$blockManager_$.$blockPoolMonth$, $JSCompiler_StaticMethods_toggleBlock$self$$inline_653_JSCompiler_StaticMethods_toggleBlock$self$$inline_661_JSCompiler_StaticMethods_toggleBlock$self$$inline_664_aEvent$$14_zippyClicked$$.$blocks$[$day$$inline_659_index$$64_index$$inline_658$$].$expanded$ = 
  !$JSCompiler_StaticMethods_toggleBlock$self$$inline_653_JSCompiler_StaticMethods_toggleBlock$self$$inline_661_JSCompiler_StaticMethods_toggleBlock$self$$inline_664_aEvent$$14_zippyClicked$$.$blocks$[$day$$inline_659_index$$64_index$$inline_658$$].$expanded$, $JSCompiler_StaticMethods_updateExpandState_$$($JSCompiler_StaticMethods_toggleBlock$self$$inline_653_JSCompiler_StaticMethods_toggleBlock$self$$inline_661_JSCompiler_StaticMethods_toggleBlock$self$$inline_664_aEvent$$14_zippyClicked$$), this.$blockManager_$.$blockPoolMonth$.$expanded$ || 
  (this.$blockManager_$.$blockPoolMonth$.scrollTop = 0), $JSCompiler_StaticMethods_toggleBlock$self$$inline_653_JSCompiler_StaticMethods_toggleBlock$self$$inline_661_JSCompiler_StaticMethods_toggleBlock$self$$inline_664_aEvent$$14_zippyClicked$$ = $JSCompiler_alias_TRUE$$) : $JSCompiler_StaticMethods_isDaynumLabel_$$(this, $className$$34$$) ? $JSCompiler_StaticMethods_onDaynumLabelClick_$$(this, $id$$12$$) : $JSCompiler_StaticMethods_isWeeknumLabel_$$(this, $className$$34$$) && ($day$$inline_659_index$$64_index$$inline_658$$ = 
  $rflect$string$getNumericIndex$$($target$$51$$.parentNode.id), $_log$$("index", $day$$inline_659_index$$64_index$$inline_658$$), ($day$$inline_659_index$$64_index$$inline_658$$ = this.$timeManager_$.$daySeries$[7 * $day$$inline_659_index$$64_index$$inline_658$$]) && $JSCompiler_StaticMethods_switchView_$$(this, $day$$inline_659_index$$64_index$$inline_658$$, 3)) : $JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$) && (/wk\-zippy\-col\d{1}/.test($id$$12$$) ? ($day$$inline_659_index$$64_index$$inline_658$$ = 
  /\d{1}/.exec($id$$12$$)[0], $JSCompiler_StaticMethods_toggleBlock$self$$inline_653_JSCompiler_StaticMethods_toggleBlock$self$$inline_661_JSCompiler_StaticMethods_toggleBlock$self$$inline_664_aEvent$$14_zippyClicked$$ = this.$blockManager_$.$blockPoolWeek$, $JSCompiler_StaticMethods_toggleBlock$self$$inline_653_JSCompiler_StaticMethods_toggleBlock$self$$inline_661_JSCompiler_StaticMethods_toggleBlock$self$$inline_664_aEvent$$14_zippyClicked$$.$blocks$[$day$$inline_659_index$$64_index$$inline_658$$].$expanded$ = 
  !$JSCompiler_StaticMethods_toggleBlock$self$$inline_653_JSCompiler_StaticMethods_toggleBlock$self$$inline_661_JSCompiler_StaticMethods_toggleBlock$self$$inline_664_aEvent$$14_zippyClicked$$.$blocks$[$day$$inline_659_index$$64_index$$inline_658$$].$expanded$, $JSCompiler_StaticMethods_updateExpandState_$$($JSCompiler_StaticMethods_toggleBlock$self$$inline_653_JSCompiler_StaticMethods_toggleBlock$self$$inline_661_JSCompiler_StaticMethods_toggleBlock$self$$inline_664_aEvent$$14_zippyClicked$$), this.$blockManager_$.$blockPoolWeek$.$expanded$ || 
  (this.$blockManager_$.$blockPoolWeek$.scrollLeft = 0), $JSCompiler_StaticMethods_toggleBlock$self$$inline_653_JSCompiler_StaticMethods_toggleBlock$self$$inline_661_JSCompiler_StaticMethods_toggleBlock$self$$inline_664_aEvent$$14_zippyClicked$$ = $JSCompiler_alias_TRUE$$) : /daynames\-zippy/.test($id$$12$$) ? ($JSCompiler_StaticMethods_toggleBlock$self$$inline_653_JSCompiler_StaticMethods_toggleBlock$self$$inline_661_JSCompiler_StaticMethods_toggleBlock$self$$inline_664_aEvent$$14_zippyClicked$$ = 
  this.$blockManager_$.$blockPoolAllday$, $JSCompiler_StaticMethods_toggleBlock$self$$inline_653_JSCompiler_StaticMethods_toggleBlock$self$$inline_661_JSCompiler_StaticMethods_toggleBlock$self$$inline_664_aEvent$$14_zippyClicked$$.$blocks$[0].$expanded$ = !$JSCompiler_StaticMethods_toggleBlock$self$$inline_653_JSCompiler_StaticMethods_toggleBlock$self$$inline_661_JSCompiler_StaticMethods_toggleBlock$self$$inline_664_aEvent$$14_zippyClicked$$.$blocks$[0].$expanded$, $JSCompiler_StaticMethods_updateExpandState_$$($JSCompiler_StaticMethods_toggleBlock$self$$inline_653_JSCompiler_StaticMethods_toggleBlock$self$$inline_661_JSCompiler_StaticMethods_toggleBlock$self$$inline_664_aEvent$$14_zippyClicked$$), 
  $JSCompiler_StaticMethods_toggleBlock$self$$inline_653_JSCompiler_StaticMethods_toggleBlock$self$$inline_661_JSCompiler_StaticMethods_toggleBlock$self$$inline_664_aEvent$$14_zippyClicked$$ = $JSCompiler_alias_TRUE$$) : $JSCompiler_StaticMethods_isDaynumLabel_$$(this, $className$$34$$) && $JSCompiler_StaticMethods_onDaynumLabelClick_$$(this, $target$$51$$.parentNode.id));
  $JSCompiler_StaticMethods_toggleBlock$self$$inline_653_JSCompiler_StaticMethods_toggleBlock$self$$inline_661_JSCompiler_StaticMethods_toggleBlock$self$$inline_664_aEvent$$14_zippyClicked$$ && (this.$updateBeforeRedraw$(), this.$updateByRedraw$())
};
$JSCompiler_prototypeAlias$$.$onMouseOut_$ = function $$JSCompiler_prototypeAlias$$$$onMouseOut_$$($aEvent$$15_className$$35$$) {
  $aEvent$$15_className$$35$$ = $aEvent$$15_className$$35$$.target.className;
  ($JSCompiler_StaticMethods_isDaynumLabel_$$(this, $aEvent$$15_className$$35$$) || $JSCompiler_StaticMethods_isWeeknumLabel_$$(this, $aEvent$$15_className$$35$$) || $rflect$string$buildClassNameRe$$("zippy").test($aEvent$$15_className$$35$$)) && $JSCompiler_StaticMethods_registerTarget$$(this.$moRegistry_$, $JSCompiler_alias_NULL$$)
};
$JSCompiler_prototypeAlias$$.$onMouseOver_$ = function $$JSCompiler_prototypeAlias$$$$onMouseOver_$$($aEvent$$16_target$$53$$) {
  var $aEvent$$16_target$$53$$ = $aEvent$$16_target$$53$$.target, $className$$36$$ = $aEvent$$16_target$$53$$.className;
  $JSCompiler_StaticMethods_isDaynumLabel_$$(this, $className$$36$$) || $JSCompiler_StaticMethods_isWeeknumLabel_$$(this, $className$$36$$) ? $JSCompiler_StaticMethods_registerTarget$$(this.$moRegistry_$, $aEvent$$16_target$$53$$, "label-underlined") : $rflect$string$buildClassNameRe$$("zippy").test($className$$36$$) ? $JSCompiler_StaticMethods_registerTarget$$(this.$moRegistry_$, $aEvent$$16_target$$53$$, "zippy-highlighted") : $JSCompiler_StaticMethods_registerTarget$$(this.$moRegistry_$, $JSCompiler_alias_NULL$$)
};
function $JSCompiler_StaticMethods_onDaynumLabelClick_$$($JSCompiler_StaticMethods_onDaynumLabelClick_$self$$, $aId$$4$$) {
  var $day$$4_index$$65$$ = $rflect$string$getNumericIndex$$($aId$$4$$);
  $_log$$("index", $day$$4_index$$65$$);
  ($day$$4_index$$65$$ = $JSCompiler_StaticMethods_onDaynumLabelClick_$self$$.$timeManager_$.$daySeries$[$day$$4_index$$65$$]) && $JSCompiler_StaticMethods_switchView_$$($JSCompiler_StaticMethods_onDaynumLabelClick_$self$$, $day$$4_index$$65$$, 1)
}
function $JSCompiler_StaticMethods_switchView_$$($JSCompiler_StaticMethods_switchView_$self$$, $aDate$$10_opt_date$$inline_1089$$, $aType$$) {
  $aDate$$10_opt_date$$inline_1089$$ = new $goog$date$DateTime$$($aDate$$10_opt_date$$inline_1089$$.getYear(), $aDate$$10_opt_date$$inline_1089$$.getMonth(), $aDate$$10_opt_date$$inline_1089$$.getDate());
  $JSCompiler_StaticMethods_switchView_$self$$.$timeManager_$.$basis$ = $aDate$$10_opt_date$$inline_1089$$ || new $goog$date$Date$$;
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
$JSCompiler_prototypeAlias$$.$onMouseDown_$ = function $$JSCompiler_prototypeAlias$$$$onMouseDown_$$($aEvent$$17$$) {
  var $className$$37$$ = $aEvent$$17$$.target.className, $preventDefaultIsNeeded$$ = $JSCompiler_alias_FALSE$$;
  $JSCompiler_StaticMethods_isWeekGrid_$$(this, $className$$37$$) ? (this.$selectionMask_$.$init$(2, $aEvent$$17$$), $preventDefaultIsNeeded$$ = $JSCompiler_alias_TRUE$$) : $JSCompiler_StaticMethods_isAlldayGrid_$$(this, $className$$37$$) ? (this.$selectionMask_$.$init$(1, $aEvent$$17$$), $preventDefaultIsNeeded$$ = $JSCompiler_alias_TRUE$$) : $JSCompiler_StaticMethods_isMonthGrid_$$(this, $className$$37$$) && ($JSCompiler_StaticMethods_isDaynumLabel_$$(this, $className$$37$$) || this.$selectionMask_$.$init$(3, 
  $aEvent$$17$$), $preventDefaultIsNeeded$$ = $JSCompiler_alias_TRUE$$);
  $preventDefaultIsNeeded$$ && $aEvent$$17$$.preventDefault()
};
$JSCompiler_prototypeAlias$$.$onSelectStart_$ = function $$JSCompiler_prototypeAlias$$$$onSelectStart_$$($aEvent$$18$$) {
  var $className$$38$$ = $aEvent$$18$$.target.className;
  ($JSCompiler_StaticMethods_isWeekGrid_$$(this, $className$$38$$) || $JSCompiler_StaticMethods_isAlldayGrid_$$(this, $className$$38$$) || $JSCompiler_StaticMethods_isMonthGrid_$$(this, $className$$38$$)) && $aEvent$$18$$.preventDefault()
};
$JSCompiler_prototypeAlias$$.$onMouseMove_$ = function $$JSCompiler_prototypeAlias$$$$onMouseMove_$$($aEvent$$19$$) {
  this.$selectionMask_$.$initialized_$ && (this.$selectionMask_$.update($aEvent$$19$$), $aEvent$$19$$.preventDefault())
};
$JSCompiler_prototypeAlias$$.$onMouseUp_$ = function $$JSCompiler_prototypeAlias$$$$onMouseUp_$$($aEvent$$20$$) {
  this.$selectionMask_$.$initialized_$ && (this.$selectionMask_$.close(), this.$bubble_$.$setAutoHide$($JSCompiler_alias_FALSE$$), this.$bubble_$.$setPinnedCorner$(2), this.$bubble_$.$setPosition$(new $goog$positioning$AbsolutePosition$$(100, 100)), this.$bubble_$.$render$(), this.$bubble_$.$setVisible$($JSCompiler_alias_TRUE$$), $aEvent$$20$$.preventDefault())
};
$JSCompiler_prototypeAlias$$.$onMainPaneScrollableScroll_$ = function $$JSCompiler_prototypeAlias$$$$onMainPaneScrollableScroll_$$($aEvent$$21_scrollable$$) {
  var $aEvent$$21_scrollable$$ = $aEvent$$21_scrollable$$.target, $scrollPos$$ = 0;
  $JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$) ? ($scrollPos$$ = $aEvent$$21_scrollable$$.scrollLeft, this.$blockManager_$.$blockPoolWeek$.scrollLeft = $scrollPos$$, this.$dom_$.$getElement$("weekmode-zippies-table").style.left = "-" + $scrollPos$$ + "px", this.$dom_$.$getElement$("weekmode-daynames-table").style.left = "-" + $scrollPos$$ + "px", this.$dom_$.$getElement$("main-pane-header-scrollable").scrollLeft = $scrollPos$$) : $JSCompiler_StaticMethods_isInMonthMode$$(this.$viewManager_$) && 
  ($scrollPos$$ = $aEvent$$21_scrollable$$.scrollTop, this.$blockManager_$.$blockPoolMonth$.scrollTop = $scrollPos$$, this.$dom_$.$getElement$("monthmode-zippies-table").style.top = "-" + $scrollPos$$ + "px")
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $rflect$cal$MainPane$$.$superClass_$.$disposeInternal$.call(this);
  $JSCompiler_StaticMethods_removeScrollListeners_$$(this);
  this.$containerSizeMonitor_$ = this.$timeManager_$ = this.$viewManager_$ = $JSCompiler_alias_NULL$$
};
function $rflect$cal$MainBody$$($aViewManager$$12$$, $aTimeManager$$9$$, $aEventManager$$6$$, $aContainerSizeMonitor$$5$$, $aBlockManager$$1$$) {
  $goog$ui$Component$$.call(this, $JSCompiler_alias_VOID$$);
  this.$viewManager_$ = $aViewManager$$12$$;
  this.$timeManager_$ = $aTimeManager$$9$$;
  this.$eventManager_$ = $aEventManager$$6$$;
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
$goog$inherits$$($rflect$cal$MainBody$$, $rflect$cal$Component$$);
var $rflect$cal$MainBody$HTML_PARTS_$$ = '<div id="main-container">;<div class="cal-container">;<div id="top-pane">;</div>;<div id="main-body">;<div id="left-pane">;<div id="left-main-pane">;<div id="month-selector">;</div>;<div id="calendars-selector" class="list-selector">;</div>;<div id="tasks-selector" class="list-selector">;</div>;</div>;<div id="left-aux-pane">;</div>;</div>;<div id="main-pane" class="main-pane">;</div>;</div>;</div>;</div>'.split(";");
$JSCompiler_prototypeAlias$$ = $rflect$cal$MainBody$$.prototype;
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  this.$decorateInternal$(this.$dom_$.createElement("div"))
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($aElement$$5$$, $opt_doNotBuildBody$$5$$) {
  $rflect$cal$MainBody$$.$superClass_$.$decorateInternal$.call(this, $aElement$$5$$, $opt_doNotBuildBody$$5$$);
  $opt_doNotBuildBody$$5$$ || (this.$getElement$().id = "main-container", this.$getElement$().className = "main-container")
};
$JSCompiler_prototypeAlias$$.$buildBodyInternal$ = function $$JSCompiler_prototypeAlias$$$$buildBodyInternal$$($aSb$$57$$) {
  for(var $counter$$20$$ = 1, $length$$39$$ = $rflect$cal$MainBody$HTML_PARTS_$$.length - 1;$counter$$20$$ < $length$$39$$;$counter$$20$$++) {
    switch($aSb$$57$$.append($rflect$cal$MainBody$HTML_PARTS_$$[$counter$$20$$]), $counter$$20$$) {
      case 2:
        $JSCompiler_StaticMethods_buildBody$$(this.$topPane_$, $aSb$$57$$);
        break;
      case 7:
        $JSCompiler_StaticMethods_buildBody$$(this.$miniCal$, $aSb$$57$$);
        break;
      case 9:
        $JSCompiler_StaticMethods_buildBody$$(this.$calSelector_$, $aSb$$57$$);
        break;
      case 11:
        $JSCompiler_StaticMethods_buildBody$$(this.$taskSelector_$, $aSb$$57$$);
        break;
      case 17:
        $JSCompiler_StaticMethods_buildBody$$(this.$mainPane_$, $aSb$$57$$)
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
function $rflect$cal$blocks$Block$sort$$($a$$21$$, $b$$24$$) {
  var $diff$$3$$ = 0, $startComparison$$ = 0 < ($diff$$3$$ = $a$$21$$.start - $b$$24$$.start) ? 1 : 0 > $diff$$3$$ ? -1 : 0;
  return 0 != $startComparison$$ ? $startComparison$$ : 0 < ($diff$$3$$ = $b$$24$$.end - $a$$21$$.end) ? 1 : 0 > $diff$$3$$ ? -1 : 0
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
  for(var $index$$67$$ = 0;$index$$67$$ < $JSCompiler_StaticMethods_updateExpandState_$self$$.$blocksNumber_$;$index$$67$$++) {
    if($JSCompiler_StaticMethods_updateExpandState_$self$$.$blocks$[$index$$67$$].$expanded$) {
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
    var $JSCompiler_StaticMethods_computeEventMap$self$$inline_673_JSCompiler_StaticMethods_createSparseArraysFromBlobs$self$$inline_699$$ = $JSCompiler_StaticMethods_updateEventMap$self$$.$blocks$[$counter$$24$$], $aChips$$inline_674_blobs$$inline_701$$ = $aChips$$2$$[$counter$$24$$], $i$$inline_675_sparseArrays$$inline_702$$ = 0, $aDaysNumber$$inline_700_blobCounter$$inline_704_length$$inline_676$$ = 0, $blobLength$$inline_705_blobs$$inline_677_counter$$inline_703$$ = [], $blob$$inline_706_currentBlob$$inline_678$$ = 
    [], $chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$ = 0, $blobEntryCounter$$inline_707_maxCol$$inline_680$$ = 0;
    $aChips$$inline_674_blobs$$inline_701$$.sort($rflect$cal$blocks$Block$sort$$);
    for(var $blobEntriesLength$$inline_708_latestItemEnd$$inline_681$$ = $JSCompiler_alias_VOID$$, $chip$$inline_710_colEndArray$$inline_682$$ = [], $i$$inline_675_sparseArrays$$inline_702$$ = 0, $aDaysNumber$$inline_700_blobCounter$$inline_704_length$$inline_676$$ = $aChips$$inline_674_blobs$$inline_701$$.length;$i$$inline_675_sparseArrays$$inline_702$$ < $aDaysNumber$$inline_700_blobCounter$$inline_704_length$$inline_676$$;++$i$$inline_675_sparseArrays$$inline_702$$) {
      var $blobEntry$$inline_709_chip$$inline_683_startCol$$inline_711$$ = $aChips$$inline_674_blobs$$inline_701$$[$i$$inline_675_sparseArrays$$inline_702$$], $itemStart$$inline_684_start$$inline_712$$ = $blobEntry$$inline_709_chip$$inline_683_startCol$$inline_711$$.start, $chipCounter$$inline_713_itemEnd$$inline_685$$ = $blobEntry$$inline_709_chip$$inline_683_startCol$$inline_711$$.end;
      $blobEntriesLength$$inline_708_latestItemEnd$$inline_681$$ || ($blobEntriesLength$$inline_708_latestItemEnd$$inline_681$$ = $chipCounter$$inline_713_itemEnd$$inline_685$$);
      $blob$$inline_706_currentBlob$$inline_678$$.length && ($blobEntriesLength$$inline_708_latestItemEnd$$inline_681$$ && $itemStart$$inline_684_start$$inline_712$$ >= $blobEntriesLength$$inline_708_latestItemEnd$$inline_681$$) && ($blobLength$$inline_705_blobs$$inline_677_counter$$inline_703$$.push({blob:$blob$$inline_706_currentBlob$$inline_678$$, $totalCols$:$chip$$inline_710_colEndArray$$inline_682$$.length}), $blob$$inline_706_currentBlob$$inline_678$$ = [], $chip$$inline_710_colEndArray$$inline_682$$ = 
      []);
      for(var $chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$ = $JSCompiler_alias_FALSE$$, $end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$ = 0, $colEndArrayLength$$inline_688_currentBlobLength$$inline_692_spanOfShrunkItem$$inline_693$$ = $chip$$inline_710_colEndArray$$inline_682$$.length;$end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$ < $colEndArrayLength$$inline_688_currentBlobLength$$inline_692_spanOfShrunkItem$$inline_693$$;++$end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$) {
        if($chip$$inline_710_colEndArray$$inline_682$$[$end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$].end <= $itemStart$$inline_684_start$$inline_712$$) {
          $chip$$inline_710_colEndArray$$inline_682$$[$end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$] = $blobEntry$$inline_709_chip$$inline_683_startCol$$inline_711$$;
          for($chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$ = Number($end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$) + 1;$chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$ < $chip$$inline_710_colEndArray$$inline_682$$.length && !($chip$$inline_710_colEndArray$$inline_682$$[$chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$].end > 
          $itemStart$$inline_684_start$$inline_712$$);) {
            $chip$$inline_710_colEndArray$$inline_682$$[$chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$] = $blobEntry$$inline_709_chip$$inline_683_startCol$$inline_711$$, $chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$++
          }
          $blob$$inline_706_currentBlob$$inline_678$$.push({$chip$:$blobEntry$$inline_709_chip$$inline_683_startCol$$inline_711$$, $startCol$:$end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$, colSpan:$chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$ - $end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$});
          $end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$ > $blobEntryCounter$$inline_707_maxCol$$inline_680$$ && ($blobEntryCounter$$inline_707_maxCol$$inline_680$$ = $end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$);
          $blobEntriesLength$$inline_708_latestItemEnd$$inline_681$$ && $chipCounter$$inline_713_itemEnd$$inline_685$$ > $blobEntriesLength$$inline_708_latestItemEnd$$inline_681$$ && ($blobEntriesLength$$inline_708_latestItemEnd$$inline_681$$ = $chipCounter$$inline_713_itemEnd$$inline_685$$);
          $chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$ = $JSCompiler_alias_TRUE$$;
          break
        }
      }
      if(!$chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$) {
        $end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$ = 1;
        for($colEndArrayLength$$inline_688_currentBlobLength$$inline_692_spanOfShrunkItem$$inline_693$$ = $chip$$inline_710_colEndArray$$inline_682$$.length;$end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$ < $colEndArrayLength$$inline_688_currentBlobLength$$inline_692_spanOfShrunkItem$$inline_693$$;++$end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$) {
          if($goog$getUid$$($chip$$inline_710_colEndArray$$inline_682$$[$end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$]) == $goog$getUid$$($chip$$inline_710_colEndArray$$inline_682$$[$end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$ - 1])) {
            for(var $kk$$inline_691_mm$$inline_696$$ = 1, $colEndArrayLength$$inline_688_currentBlobLength$$inline_692_spanOfShrunkItem$$inline_693$$ = $blob$$inline_706_currentBlob$$inline_678$$.length;$kk$$inline_691_mm$$inline_696$$ < $colEndArrayLength$$inline_688_currentBlobLength$$inline_692_spanOfShrunkItem$$inline_693$$;++$kk$$inline_691_mm$$inline_696$$) {
              if($goog$getUid$$($blob$$inline_706_currentBlob$$inline_678$$[$kk$$inline_691_mm$$inline_696$$].$chip$) == $goog$getUid$$($chip$$inline_710_colEndArray$$inline_682$$[$end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$])) {
                $colEndArrayLength$$inline_688_currentBlobLength$$inline_692_spanOfShrunkItem$$inline_693$$ = $blob$$inline_706_currentBlob$$inline_678$$[$kk$$inline_691_mm$$inline_696$$].colSpan;
                $blob$$inline_706_currentBlob$$inline_678$$.push({$chip$:$blobEntry$$inline_709_chip$$inline_683_startCol$$inline_711$$, $startCol$:$chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$ = Number($blob$$inline_706_currentBlob$$inline_678$$[$kk$$inline_691_mm$$inline_696$$].$startCol$) + 1, colSpan:$colEndArrayLength$$inline_688_currentBlobLength$$inline_692_spanOfShrunkItem$$inline_693$$ - 1});
                $chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$ > $blobEntryCounter$$inline_707_maxCol$$inline_680$$ && ($blobEntryCounter$$inline_707_maxCol$$inline_680$$ = $chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$);
                for($chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$ = $end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$;$chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$ < $end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$ + $colEndArrayLength$$inline_688_currentBlobLength$$inline_692_spanOfShrunkItem$$inline_693$$ - 
                1;$chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$++) {
                  $chip$$inline_710_colEndArray$$inline_682$$[$chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$] = $blobEntry$$inline_709_chip$$inline_683_startCol$$inline_711$$
                }
                $blob$$inline_706_currentBlob$$inline_678$$[$kk$$inline_691_mm$$inline_696$$] = {$chip$:$blob$$inline_706_currentBlob$$inline_678$$[$kk$$inline_691_mm$$inline_696$$].$chip$, $startCol$:$chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$ = $blob$$inline_706_currentBlob$$inline_678$$[$kk$$inline_691_mm$$inline_696$$].$startCol$, colSpan:1};
                $chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$ > $blobEntryCounter$$inline_707_maxCol$$inline_680$$ && ($blobEntryCounter$$inline_707_maxCol$$inline_680$$ = $chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$);
                $blobEntriesLength$$inline_708_latestItemEnd$$inline_681$$ && $chipCounter$$inline_713_itemEnd$$inline_685$$ > $blobEntriesLength$$inline_708_latestItemEnd$$inline_681$$ && ($blobEntriesLength$$inline_708_latestItemEnd$$inline_681$$ = $chipCounter$$inline_713_itemEnd$$inline_685$$);
                break
              }
            }
            $chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$ = $JSCompiler_alias_TRUE$$;
            break
          }
        }
        if(!$chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$) {
          $end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$ = $chip$$inline_710_colEndArray$$inline_682$$.length;
          $kk$$inline_691_mm$$inline_696$$ = 1;
          for($colEndArrayLength$$inline_688_currentBlobLength$$inline_692_spanOfShrunkItem$$inline_693$$ = $blob$$inline_706_currentBlob$$inline_678$$.length;$kk$$inline_691_mm$$inline_696$$ < $colEndArrayLength$$inline_688_currentBlobLength$$inline_692_spanOfShrunkItem$$inline_693$$;++$kk$$inline_691_mm$$inline_696$$) {
            $chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$ = $blob$$inline_706_currentBlob$$inline_678$$[$kk$$inline_691_mm$$inline_696$$].$chip$.end, $blob$$inline_706_currentBlob$$inline_678$$[$kk$$inline_691_mm$$inline_696$$].$startCol$ + $blob$$inline_706_currentBlob$$inline_678$$[$kk$$inline_691_mm$$inline_696$$].colSpan == $end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$ && $chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$ <= 
            $itemStart$$inline_684_start$$inline_712$$ && ($blob$$inline_706_currentBlob$$inline_678$$[$kk$$inline_691_mm$$inline_696$$] = {$chip$:$blob$$inline_706_currentBlob$$inline_678$$[$kk$$inline_691_mm$$inline_696$$].$chip$, $startCol$:$chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$ = $blob$$inline_706_currentBlob$$inline_678$$[$kk$$inline_691_mm$$inline_696$$].$startCol$, colSpan:$blob$$inline_706_currentBlob$$inline_678$$[$kk$$inline_691_mm$$inline_696$$].colSpan + 
            1}, $chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$ > $blobEntryCounter$$inline_707_maxCol$$inline_680$$ && ($blobEntryCounter$$inline_707_maxCol$$inline_680$$ = $chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$))
          }
          $blob$$inline_706_currentBlob$$inline_678$$.push({$chip$:$blobEntry$$inline_709_chip$$inline_683_startCol$$inline_711$$, $startCol$:$chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$ = $chip$$inline_710_colEndArray$$inline_682$$.length, colSpan:1});
          $chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$ > $blobEntryCounter$$inline_707_maxCol$$inline_680$$ && ($blobEntryCounter$$inline_707_maxCol$$inline_680$$ = $chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$);
          $chip$$inline_710_colEndArray$$inline_682$$.push($blobEntry$$inline_709_chip$$inline_683_startCol$$inline_711$$);
          $blobEntriesLength$$inline_708_latestItemEnd$$inline_681$$ && $chipCounter$$inline_713_itemEnd$$inline_685$$ > $blobEntriesLength$$inline_708_latestItemEnd$$inline_681$$ && ($blobEntriesLength$$inline_708_latestItemEnd$$inline_681$$ = $chipCounter$$inline_713_itemEnd$$inline_685$$)
        }
      }
    }
    $blobLength$$inline_705_blobs$$inline_677_counter$$inline_703$$.push({blob:$blob$$inline_706_currentBlob$$inline_678$$, $totalCols$:$chip$$inline_710_colEndArray$$inline_682$$.length});
    $JSCompiler_StaticMethods_computeEventMap$self$$inline_673_JSCompiler_StaticMethods_createSparseArraysFromBlobs$self$$inline_699$$.$blobs$ = $blobLength$$inline_705_blobs$$inline_677_counter$$inline_703$$;
    if($opt_createArrays$$) {
      $JSCompiler_StaticMethods_computeEventMap$self$$inline_673_JSCompiler_StaticMethods_createSparseArraysFromBlobs$self$$inline_699$$ = $JSCompiler_StaticMethods_updateEventMap$self$$.$blocks$[$counter$$24$$];
      $aDaysNumber$$inline_700_blobCounter$$inline_704_length$$inline_676$$ = $opt_arraysLength$$ || 0;
      $aChips$$inline_674_blobs$$inline_701$$ = $JSCompiler_StaticMethods_computeEventMap$self$$inline_673_JSCompiler_StaticMethods_createSparseArraysFromBlobs$self$$inline_699$$.$blobs$;
      $i$$inline_675_sparseArrays$$inline_702$$ = [];
      for($blobLength$$inline_705_blobs$$inline_677_counter$$inline_703$$ = 0;$blobLength$$inline_705_blobs$$inline_677_counter$$inline_703$$ < $aDaysNumber$$inline_700_blobCounter$$inline_704_length$$inline_676$$;$blobLength$$inline_705_blobs$$inline_677_counter$$inline_703$$++) {
        $i$$inline_675_sparseArrays$$inline_702$$[$blobLength$$inline_705_blobs$$inline_677_counter$$inline_703$$] = []
      }
      $aDaysNumber$$inline_700_blobCounter$$inline_704_length$$inline_676$$ = 0;
      for($blobLength$$inline_705_blobs$$inline_677_counter$$inline_703$$ = $aChips$$inline_674_blobs$$inline_701$$.length;$aDaysNumber$$inline_700_blobCounter$$inline_704_length$$inline_676$$ < $blobLength$$inline_705_blobs$$inline_677_counter$$inline_703$$;$aDaysNumber$$inline_700_blobCounter$$inline_704_length$$inline_676$$++) {
        $blob$$inline_706_currentBlob$$inline_678$$ = $aChips$$inline_674_blobs$$inline_701$$[$aDaysNumber$$inline_700_blobCounter$$inline_704_length$$inline_676$$].blob;
        $blobEntryCounter$$inline_707_maxCol$$inline_680$$ = 0;
        for($blobEntriesLength$$inline_708_latestItemEnd$$inline_681$$ = $blob$$inline_706_currentBlob$$inline_678$$.length;$blobEntryCounter$$inline_707_maxCol$$inline_680$$ < $blobEntriesLength$$inline_708_latestItemEnd$$inline_681$$;$blobEntryCounter$$inline_707_maxCol$$inline_680$$++) {
          $blobEntry$$inline_709_chip$$inline_683_startCol$$inline_711$$ = $blob$$inline_706_currentBlob$$inline_678$$[$blobEntryCounter$$inline_707_maxCol$$inline_680$$];
          $chip$$inline_710_colEndArray$$inline_682$$ = $blobEntry$$inline_709_chip$$inline_683_startCol$$inline_711$$.$chip$;
          $blobEntry$$inline_709_chip$$inline_683_startCol$$inline_711$$ = $blobEntry$$inline_709_chip$$inline_683_startCol$$inline_711$$.$startCol$;
          $chipCounter$$inline_713_itemEnd$$inline_685$$ = $itemStart$$inline_684_start$$inline_712$$ = $chip$$inline_710_colEndArray$$inline_682$$.start;
          for($end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$ = $chip$$inline_710_colEndArray$$inline_682$$.end;$chipCounter$$inline_713_itemEnd$$inline_685$$ < $end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$;$chipCounter$$inline_713_itemEnd$$inline_685$$++) {
            $chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$ = $chip$$inline_710_colEndArray$$inline_682$$.$clone$(), $chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$.$startIsCut$ = $chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$.$endIsCut$ = $chipCounter$$inline_713_itemEnd$$inline_685$$ > 
            $itemStart$$inline_684_start$$inline_712$$ && $chipCounter$$inline_713_itemEnd$$inline_685$$ < $end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$ - 1, $chipCounter$$inline_713_itemEnd$$inline_685$$ == $itemStart$$inline_684_start$$inline_712$$ && 1 < $end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$ - $itemStart$$inline_684_start$$inline_712$$ && ($chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$.$endIsCut$ = 
            $JSCompiler_alias_TRUE$$), $chipCounter$$inline_713_itemEnd$$inline_685$$ == $end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$ - 1 && 1 < $end$$inline_714_ii$$inline_687_jj$$inline_690_lastColNum$$inline_695$$ - $itemStart$$inline_684_start$$inline_712$$ && ($chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$.$startIsCut$ = $JSCompiler_alias_TRUE$$), $i$$inline_675_sparseArrays$$inline_702$$[$chipCounter$$inline_713_itemEnd$$inline_685$$][$blobEntry$$inline_709_chip$$inline_683_startCol$$inline_711$$] = 
            $chipClone$$inline_715_lastCol$$inline_689_ll$$inline_694_mmEnd$$inline_697_placedItem$$inline_686_startCol$$inline_679$$
          }
        }
      }
      $JSCompiler_StaticMethods_computeEventMap$self$$inline_673_JSCompiler_StaticMethods_createSparseArraysFromBlobs$self$$inline_699$$.$sparseArrays$ = $i$$inline_675_sparseArrays$$inline_702$$
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
;function $rflect$cal$blocks$BlockManager$$($JSCompiler_StaticMethods_setBlocksNumber$self$$inline_717_aViewManager$$13$$, $aTimeManager$$10$$, $aEventManager$$7$$) {
  this.$viewManager_$ = $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_717_aViewManager$$13$$;
  this.$timeManager_$ = $aTimeManager$$10$$;
  this.$eventManager_$ = $aEventManager$$7$$;
  this.$blockPoolWeek$ = new $rflect$cal$blocks$BlockPool$$($JSCompiler_alias_TRUE$$);
  this.$blockPoolWeek$.fill();
  this.$blockPoolMonth$ = new $rflect$cal$blocks$BlockPool$$($JSCompiler_alias_FALSE$$);
  this.$blockPoolMonth$.fill(6);
  this.$blockPoolAllday$ = new $rflect$cal$blocks$BlockPool$$($JSCompiler_alias_FALSE$$);
  this.$blockPoolAllday$.fill(1);
  $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_717_aViewManager$$13$$ = this.$blockPoolAllday$;
  $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_717_aViewManager$$13$$.$blocksNumber_$ = 1;
  $JSCompiler_StaticMethods_updateExpandState_$$($JSCompiler_StaticMethods_setBlocksNumber$self$$inline_717_aViewManager$$13$$)
}
$rflect$cal$blocks$BlockManager$$.prototype.update = function $$rflect$cal$blocks$BlockManager$$$$update$() {
  if($JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$)) {
    var $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_720_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_723_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_726$$ = this.$blockPoolWeek$;
    $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_720_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_723_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_726$$.$blocksNumber_$ = this.$timeManager_$.$daySeries$.length;
    $JSCompiler_StaticMethods_updateExpandState_$$($JSCompiler_StaticMethods_setBlocksNumber$self$$inline_720_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_723_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_726$$);
    $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_720_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_723_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_726$$ = this.$blockPoolAllday$;
    $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_720_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_723_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_726$$.$blocksNumber_$ = 1;
    $JSCompiler_StaticMethods_updateExpandState_$$($JSCompiler_StaticMethods_setBlocksNumber$self$$inline_720_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_723_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_726$$);
    $JSCompiler_StaticMethods_updateCollapsedBlocks$$(this.$blockPoolWeek$);
    $JSCompiler_StaticMethods_updateCollapsedBlocks$$(this.$blockPoolAllday$);
    $JSCompiler_StaticMethods_updateEventMap$$(this.$blockPoolWeek$, this.$eventManager_$.$dayChips$);
    $JSCompiler_StaticMethods_updateEventMap$$(this.$blockPoolAllday$, this.$eventManager_$.$allDayChips$, $JSCompiler_alias_TRUE$$, this.$blockPoolWeek$.$blocksNumber_$);
    $JSCompiler_StaticMethods_updateExpandedBlocks$$(this.$blockPoolWeek$);
    $JSCompiler_StaticMethods_updateExpandedBlocks$$(this.$blockPoolAllday$)
  }else {
    $JSCompiler_StaticMethods_isInMonthMode$$(this.$viewManager_$) && ($JSCompiler_StaticMethods_setBlocksNumber$self$$inline_720_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_723_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_726$$ = this.$blockPoolMonth$, $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_720_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_723_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_726$$.$blocksNumber_$ = this.$timeManager_$.$daySeries$.length / 
    7, $JSCompiler_StaticMethods_updateExpandState_$$($JSCompiler_StaticMethods_setBlocksNumber$self$$inline_720_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_723_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_726$$), $JSCompiler_StaticMethods_updateCollapsedBlocks$$(this.$blockPoolMonth$), $JSCompiler_StaticMethods_updateEventMap$$(this.$blockPoolMonth$, this.$eventManager_$.$weekChips$), $JSCompiler_StaticMethods_updateExpandedBlocks$$(this.$blockPoolMonth$))
  }
};
function $goog$dom$ViewportSizeMonitor$$($opt_window$$3$$) {
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
  var $size$$16$$ = $goog$dom$getViewportSize_$$(this.$window_$ || window);
  $goog$math$Size$equals$$($size$$16$$, this.$size_$) || (this.$size_$ = $size$$16$$, this.dispatchEvent("resize"))
};
function $rflect$cal$ContainerSizeMonitor$$($aViewManager$$14_outerDiv$$inline_732$$, $aContainer$$2_innerDiv$$inline_733_width$$inline_734$$, $opt_window$$5$$) {
  $goog$dom$ViewportSizeMonitor$$.call(this, $opt_window$$5$$);
  this.$container_$ = $aContainer$$2_innerDiv$$inline_733_width$$inline_734$$;
  this.$containerSize_$ = new $goog$math$Size$$(this.$container_$.clientWidth, this.$container_$.clientHeight);
  $aViewManager$$14_outerDiv$$inline_732$$ = document.createElement("div");
  $aViewManager$$14_outerDiv$$inline_732$$.style.cssText = "visiblity:hidden;overflow:auto;position:absolute;top:0;width:100px;height:100px";
  $aContainer$$2_innerDiv$$inline_733_width$$inline_734$$ = document.createElement("div");
  $goog$style$setSize$$($aContainer$$2_innerDiv$$inline_733_width$$inline_734$$, "200px", "200px");
  $aViewManager$$14_outerDiv$$inline_732$$.appendChild($aContainer$$2_innerDiv$$inline_733_width$$inline_734$$);
  document.body.appendChild($aViewManager$$14_outerDiv$$inline_732$$);
  $aContainer$$2_innerDiv$$inline_733_width$$inline_734$$ = $aViewManager$$14_outerDiv$$inline_732$$.offsetWidth - $aViewManager$$14_outerDiv$$inline_732$$.clientWidth;
  $goog$dom$removeNode$$($aViewManager$$14_outerDiv$$inline_732$$);
  this.$scrollbarWidth$ = $aContainer$$2_innerDiv$$inline_733_width$$inline_734$$
}
$goog$inherits$$($rflect$cal$ContainerSizeMonitor$$, $goog$dom$ViewportSizeMonitor$$);
$JSCompiler_prototypeAlias$$ = $rflect$cal$ContainerSizeMonitor$$.prototype;
$JSCompiler_prototypeAlias$$.$scrollbarWidth$ = 0;
$JSCompiler_prototypeAlias$$.$windowSizePollTimeout_$ = 0;
$JSCompiler_prototypeAlias$$.$getSize$ = function $$JSCompiler_prototypeAlias$$$$getSize$$() {
  return this.$containerSize_$ ? this.$containerSize_$.$clone$() : $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$checkForSizeChange_$ = function $$JSCompiler_prototypeAlias$$$$checkForSizeChange_$$($aNotActualResize$$) {
  var $containerSize$$inline_737_viewportSize$$ = $goog$dom$getViewportSize_$$(this.$window_$ || window);
  if(!$goog$math$Size$equals$$($containerSize$$inline_737_viewportSize$$, this.$size_$) && (this.$size_$ = $containerSize$$inline_737_viewportSize$$, $containerSize$$inline_737_viewportSize$$ = new $goog$math$Size$$(this.$container_$.clientWidth, this.$container_$.clientHeight), $goog$math$Size$equals$$($containerSize$$inline_737_viewportSize$$, this.$containerSize_$) || (this.$containerSize_$ = $containerSize$$inline_737_viewportSize$$, this.dispatchEvent("resize")), this.$windowSizePollInterval_$ == 
  $JSCompiler_alias_NULL$$ && !$aNotActualResize$$)) {
    clearTimeout(this.$windowSizePollTimeout_$), this.$windowSizePollTimeout_$ = setTimeout($goog$bind$$(this.$checkForSizeChange_$, this, $JSCompiler_alias_TRUE$$), $goog$dom$ViewportSizeMonitor$WINDOW_SIZE_POLL_RATE$$)
  }
};
$JSCompiler_prototypeAlias$$.$disposeInternal$ = function $$JSCompiler_prototypeAlias$$$$disposeInternal$$() {
  $rflect$cal$ContainerSizeMonitor$$.$superClass_$.$disposeInternal$.call(this);
  clearTimeout(this.$windowSizePollTimeout_$);
  this.$containerSize_$ = this.$container_$ = $JSCompiler_alias_NULL$$
};
function $rflect$cal$ViewManager$$() {
  $goog$events$EventHandler$$.call(this);
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
$JSCompiler_prototypeAlias$$.$onMainBodyAction_$ = function $$JSCompiler_prototypeAlias$$$$onMainBodyAction_$$($aEvent$$22$$) {
  switch($JSCompiler_StaticMethods_getId$$($aEvent$$22$$.target)) {
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
$JSCompiler_prototypeAlias$$.$onDateSelect_$ = function $$JSCompiler_prototypeAlias$$$$onDateSelect_$$($aEvent$$23$$) {
  $_log$$("index is in mask", $aEvent$$23$$.$isInMask$);
  $aEvent$$23$$.$isInMask$ || ($JSCompiler_StaticMethods_shiftToPoint$$(this.$timeManager$, $aEvent$$23$$.$date$), this.$mainBody_$.$miniCal$.$updateBeforeRedraw$(), this.$mainBody_$.$miniCal$.$updateByRedraw$(), this.$mainBody_$.$updateBeforeRedraw$(3, 4, 2), this.$mainBody_$.$updateByRedraw$(3, 4, 2))
};
$JSCompiler_prototypeAlias$$.$onDateDrag_$ = function $$JSCompiler_prototypeAlias$$$$onDateDrag_$$($aEvent$$24$$) {
  this.$timeManager$.$basis$ = 5 == $aEvent$$24$$.$selectionConfiguration$ ? $aEvent$$24$$.$firstDayInMonth$ || new $goog$date$Date$$ : $aEvent$$24$$.$startDate$ || new $goog$date$Date$$;
  this.$timeManager$.$daysNumber$ = $aEvent$$24$$.duration;
  $JSCompiler_StaticMethods_showView$$(this, $aEvent$$24$$.$selectionConfiguration$, $aEvent$$24$$.target)
};
function $JSCompiler_StaticMethods_showView$$($JSCompiler_StaticMethods_showView$self$$, $JSCompiler_StaticMethods_preRender$self$$inline_751_aType$$1$$, $container$$inline_753_opt_caller$$) {
  var $calledByMiniCal$$ = $container$$inline_753_opt_caller$$ == $JSCompiler_StaticMethods_showView$self$$.$mainBody_$.$miniCal$;
  $JSCompiler_StaticMethods_showView$self$$.$currentView$ == $JSCompiler_StaticMethods_preRender$self$$inline_751_aType$$1$$ && $container$$inline_753_opt_caller$$ == $JSCompiler_alias_VOID$$ && !$JSCompiler_StaticMethods_showView$self$$.$isOnStartup_$ || ($JSCompiler_StaticMethods_showView$self$$.$currentView$ = $JSCompiler_StaticMethods_preRender$self$$inline_751_aType$$1$$, $JSCompiler_StaticMethods_showView$self$$.$timeManager$.$configuration$ = $JSCompiler_StaticMethods_showView$self$$.$currentView$, 
  $JSCompiler_StaticMethods_showView$self$$.$timeManager$.$run$(), $JSCompiler_StaticMethods_showView$self$$.$eventManager_$.$run$(), $JSCompiler_StaticMethods_showView$self$$.$isOnStartup_$ ? ($JSCompiler_StaticMethods_preRender$self$$inline_751_aType$$1$$ = $JSCompiler_StaticMethods_showView$self$$.$mainBody_$, $container$$inline_753_opt_caller$$ = $JSCompiler_StaticMethods_preRender$self$$inline_751_aType$$1$$.$dom_$.$document_$.body, $container$$inline_753_opt_caller$$.innerHTML = $rflect$cal$MainBody$HTML_PARTS_$$[0] + 
  $rflect$cal$MainBody$HTML_PARTS_$$[1] + $rflect$cal$MainBody$HTML_PARTS_$$[20] + $rflect$cal$MainBody$HTML_PARTS_$$[21], $JSCompiler_StaticMethods_preRender$self$$inline_751_aType$$1$$.$containerSizeMonitor_$.$checkForSizeChange_$($JSCompiler_alias_TRUE$$), $container$$inline_753_opt_caller$$.innerHTML = "", $JSCompiler_StaticMethods_showView$self$$.$mainBody_$.$updateBeforeRedraw$(), $JSCompiler_StaticMethods_showView$self$$.$mainBody_$.$render$(), $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_showView$self$$, 
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
  this.$blockManager_$ = this.$mainBody_$ = this.$containerSizeMonitor_$ = $JSCompiler_alias_NULL$$
};
function $rflect$cal$Main$$() {
  this.$viewManager$ = new $rflect$cal$ViewManager$$;
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
$goog$debug$Formatter$$.prototype.$showAbsoluteTime$ = $JSCompiler_alias_TRUE$$;
$goog$debug$Formatter$$.prototype.$showRelativeTime$ = $JSCompiler_alias_TRUE$$;
$goog$debug$Formatter$$.prototype.$showLoggerName$ = $JSCompiler_alias_TRUE$$;
$goog$debug$Formatter$$.prototype.$showExceptionText$ = $JSCompiler_alias_FALSE$$;
function $goog$debug$Formatter$getTwoDigitString_$$($n$$8$$) {
  return 10 > $n$$8$$ ? "0" + $n$$8$$ : "" + $n$$8$$
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
$JSCompiler_prototypeAlias$$.get = function $$JSCompiler_prototypeAlias$$$get$($index$$68$$) {
  $index$$68$$ = $JSCompiler_StaticMethods_normalizeIndex_$$(this, $index$$68$$);
  return this.$buff_$[$index$$68$$]
};
$JSCompiler_prototypeAlias$$.set = function $$JSCompiler_prototypeAlias$$$set$($index$$69$$, $item$$2$$) {
  $index$$69$$ = $JSCompiler_StaticMethods_normalizeIndex_$$(this, $index$$69$$);
  this.$buff_$[$index$$69$$] = $item$$2$$
};
$JSCompiler_prototypeAlias$$.$getCount$ = function $$JSCompiler_prototypeAlias$$$$getCount$$() {
  return this.$buff_$.length
};
$JSCompiler_prototypeAlias$$.clear = function $$JSCompiler_prototypeAlias$$$clear$() {
  this.$nextPtr_$ = this.$buff_$.length = 0
};
$JSCompiler_prototypeAlias$$.$getValues$ = function $$JSCompiler_prototypeAlias$$$$getValues$$() {
  for(var $l$$inline_762$$ = this.$getCount$(), $rv$$inline_763$$ = [], $i$$inline_764$$ = this.$getCount$() - this.$getCount$();$i$$inline_764$$ < $l$$inline_762$$;$i$$inline_764$$++) {
    $rv$$inline_763$$[$i$$inline_764$$] = this.get($i$$inline_764$$)
  }
  return $rv$$inline_763$$
};
$JSCompiler_prototypeAlias$$.$getKeys$ = function $$JSCompiler_prototypeAlias$$$$getKeys$$() {
  for(var $rv$$22$$ = [], $l$$20$$ = this.$getCount$(), $i$$104$$ = 0;$i$$104$$ < $l$$20$$;$i$$104$$++) {
    $rv$$22$$[$i$$104$$] = $i$$104$$
  }
  return $rv$$22$$
};
function $JSCompiler_StaticMethods_normalizeIndex_$$($JSCompiler_StaticMethods_normalizeIndex_$self$$, $index$$70$$) {
  $index$$70$$ >= $JSCompiler_StaticMethods_normalizeIndex_$self$$.$buff_$.length && $JSCompiler_alias_THROW$$(Error("Out of bounds exception"));
  return $JSCompiler_StaticMethods_normalizeIndex_$self$$.$buff_$.length < $JSCompiler_StaticMethods_normalizeIndex_$self$$.$maxSize_$ ? $index$$70$$ : ($JSCompiler_StaticMethods_normalizeIndex_$self$$.$nextPtr_$ + Number($index$$70$$)) % $JSCompiler_StaticMethods_normalizeIndex_$self$$.$maxSize_$
}
;function $goog$debug$getStacktrace$$($opt_fn$$4$$) {
  return $goog$debug$getStacktraceHelper_$$($opt_fn$$4$$ || arguments.callee.caller, [])
}
function $goog$debug$getStacktraceHelper_$$($fn$$7$$, $visited$$) {
  var $sb$$8$$ = [];
  if($goog$array$contains$$($visited$$, $fn$$7$$)) {
    $sb$$8$$.push("[...circular reference...]")
  }else {
    if($fn$$7$$ && 50 > $visited$$.length) {
      $sb$$8$$.push($goog$debug$getFunctionName$$($fn$$7$$) + "(");
      for(var $args$$11$$ = $fn$$7$$.arguments, $i$$110$$ = 0;$i$$110$$ < $args$$11$$.length;$i$$110$$++) {
        0 < $i$$110$$ && $sb$$8$$.push(", ");
        var $arg$$6_argDesc$$;
        $arg$$6_argDesc$$ = $args$$11$$[$i$$110$$];
        switch(typeof $arg$$6_argDesc$$) {
          case "object":
            $arg$$6_argDesc$$ = $arg$$6_argDesc$$ ? "object" : "null";
            break;
          case "string":
            break;
          case "number":
            $arg$$6_argDesc$$ = "" + $arg$$6_argDesc$$;
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
        $sb$$8$$.push($arg$$6_argDesc$$)
      }
      $visited$$.push($fn$$7$$);
      $sb$$8$$.push(")\n");
      try {
        $sb$$8$$.push($goog$debug$getStacktraceHelper_$$($fn$$7$$.caller, $visited$$))
      }catch($e$$66$$) {
        $sb$$8$$.push("[exception trying to get caller]\n")
      }
    }else {
      $fn$$7$$ ? $sb$$8$$.push("[...long stack...]") : $sb$$8$$.push("[end]")
    }
  }
  return $sb$$8$$.join("")
}
function $goog$debug$getFunctionName$$($fn$$8_functionSource$$) {
  if($goog$debug$fnNameCache_$$[$fn$$8_functionSource$$]) {
    return $goog$debug$fnNameCache_$$[$fn$$8_functionSource$$]
  }
  $fn$$8_functionSource$$ = "" + $fn$$8_functionSource$$;
  if(!$goog$debug$fnNameCache_$$[$fn$$8_functionSource$$]) {
    var $matches$$1$$ = /function ([^\(]+)/.exec($fn$$8_functionSource$$);
    $goog$debug$fnNameCache_$$[$fn$$8_functionSource$$] = $matches$$1$$ ? $matches$$1$$[1] : "[Anonymous]"
  }
  return $goog$debug$fnNameCache_$$[$fn$$8_functionSource$$]
}
var $goog$debug$fnNameCache_$$ = {};
function $goog$debug$LogRecord$$($level$$7$$, $msg$$, $loggerName$$, $opt_time$$, $opt_sequenceNumber$$) {
  this.reset($level$$7$$, $msg$$, $loggerName$$, $opt_time$$, $opt_sequenceNumber$$)
}
$goog$debug$LogRecord$$.prototype.$exception_$ = $JSCompiler_alias_NULL$$;
$goog$debug$LogRecord$$.prototype.$exceptionText_$ = $JSCompiler_alias_NULL$$;
var $goog$debug$LogRecord$nextSequenceNumber_$$ = 0;
$goog$debug$LogRecord$$.prototype.reset = function $$goog$debug$LogRecord$$$$reset$($level$$8$$, $msg$$1$$, $loggerName$$1$$, $opt_time$$1$$, $opt_sequenceNumber$$1$$) {
  "number" == typeof $opt_sequenceNumber$$1$$ || $goog$debug$LogRecord$nextSequenceNumber_$$++;
  this.$time_$ = $opt_time$$1$$ || $goog$now$$();
  this.$level_$ = $level$$8$$;
  this.$msg_$ = $msg$$1$$;
  this.$loggerName_$ = $loggerName$$1$$;
  delete this.$exception_$;
  delete this.$exceptionText_$
};
$goog$debug$LogRecord$$.prototype.$setLevel$ = $JSCompiler_set$$("$level_$");
function $goog$debug$Logger$$($name$$63$$) {
  this.$name_$ = $name$$63$$
}
$goog$debug$Logger$$.prototype.$parent_$ = $JSCompiler_alias_NULL$$;
$goog$debug$Logger$$.prototype.$level_$ = $JSCompiler_alias_NULL$$;
$goog$debug$Logger$$.prototype.$children_$ = $JSCompiler_alias_NULL$$;
$goog$debug$Logger$$.prototype.$handlers_$ = $JSCompiler_alias_NULL$$;
function $goog$debug$Logger$Level$$($name$$64$$, $value$$82$$) {
  this.name = $name$$64$$;
  this.value = $value$$82$$
}
$goog$debug$Logger$Level$$.prototype.toString = $JSCompiler_get$$("name");
var $goog$debug$Logger$Level$SHOUT$$ = new $goog$debug$Logger$Level$$("SHOUT", 1200), $goog$debug$Logger$Level$SEVERE$$ = new $goog$debug$Logger$Level$$("SEVERE", 1E3), $goog$debug$Logger$Level$WARNING$$ = new $goog$debug$Logger$Level$$("WARNING", 900), $goog$debug$Logger$Level$INFO$$ = new $goog$debug$Logger$Level$$("INFO", 800), $goog$debug$Logger$Level$CONFIG$$ = new $goog$debug$Logger$Level$$("CONFIG", 700), $goog$debug$Logger$Level$PREDEFINED_LEVELS$$ = [new $goog$debug$Logger$Level$$("OFF", 
Infinity), $goog$debug$Logger$Level$SHOUT$$, $goog$debug$Logger$Level$SEVERE$$, $goog$debug$Logger$Level$WARNING$$, $goog$debug$Logger$Level$INFO$$, $goog$debug$Logger$Level$CONFIG$$, new $goog$debug$Logger$Level$$("FINE", 500), new $goog$debug$Logger$Level$$("FINER", 400), new $goog$debug$Logger$Level$$("FINEST", 300), new $goog$debug$Logger$Level$$("ALL", 0)], $goog$debug$Logger$Level$predefinedLevelsCache_$$ = $JSCompiler_alias_NULL$$;
function $goog$debug$Logger$Level$getPredefinedLevel$$($name$$65$$) {
  if(!$goog$debug$Logger$Level$predefinedLevelsCache_$$) {
    $goog$debug$Logger$Level$predefinedLevelsCache_$$ = {};
    for(var $i$$inline_766$$ = 0, $level$$inline_767$$;$level$$inline_767$$ = $goog$debug$Logger$Level$PREDEFINED_LEVELS$$[$i$$inline_766$$];$i$$inline_766$$++) {
      $goog$debug$Logger$Level$predefinedLevelsCache_$$[$level$$inline_767$$.value] = $level$$inline_767$$, $goog$debug$Logger$Level$predefinedLevelsCache_$$[$level$$inline_767$$.name] = $level$$inline_767$$
    }
  }
  return $goog$debug$Logger$Level$predefinedLevelsCache_$$[$name$$65$$] || $JSCompiler_alias_NULL$$
}
$JSCompiler_prototypeAlias$$ = $goog$debug$Logger$$.prototype;
$JSCompiler_prototypeAlias$$.getParent = $JSCompiler_get$$("$parent_$");
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
$JSCompiler_prototypeAlias$$.log = function $$JSCompiler_prototypeAlias$$$log$($level$$15_logRecord$$inline_770$$, $msg$$5_msg$$inline_1108_target$$inline_771$$, $JSCompiler_StaticMethods_callPublish_$self$$inline_1110_opt_exception$$) {
  if($level$$15_logRecord$$inline_770$$.value >= $JSCompiler_StaticMethods_getEffectiveLevel$$(this).value) {
    $level$$15_logRecord$$inline_770$$ = this.$getLogRecord$($level$$15_logRecord$$inline_770$$, $msg$$5_msg$$inline_1108_target$$inline_771$$, $JSCompiler_StaticMethods_callPublish_$self$$inline_1110_opt_exception$$);
    $msg$$5_msg$$inline_1108_target$$inline_771$$ = "log:" + $level$$15_logRecord$$inline_770$$.$msg_$;
    $goog$global$$.console && ($goog$global$$.console.timeStamp ? $goog$global$$.console.timeStamp($msg$$5_msg$$inline_1108_target$$inline_771$$) : $goog$global$$.console.markTimeline && $goog$global$$.console.markTimeline($msg$$5_msg$$inline_1108_target$$inline_771$$));
    $goog$global$$.msWriteProfilerMark && $goog$global$$.msWriteProfilerMark($msg$$5_msg$$inline_1108_target$$inline_771$$);
    for($msg$$5_msg$$inline_1108_target$$inline_771$$ = this;$msg$$5_msg$$inline_1108_target$$inline_771$$;) {
      var $JSCompiler_StaticMethods_callPublish_$self$$inline_1110_opt_exception$$ = $msg$$5_msg$$inline_1108_target$$inline_771$$, $logRecord$$inline_1111$$ = $level$$15_logRecord$$inline_770$$;
      if($JSCompiler_StaticMethods_callPublish_$self$$inline_1110_opt_exception$$.$handlers_$) {
        for(var $i$$inline_1112$$ = 0, $handler$$inline_1113$$ = $JSCompiler_alias_VOID$$;$handler$$inline_1113$$ = $JSCompiler_StaticMethods_callPublish_$self$$inline_1110_opt_exception$$.$handlers_$[$i$$inline_1112$$];$i$$inline_1112$$++) {
          $handler$$inline_1113$$($logRecord$$inline_1111$$)
        }
      }
      $msg$$5_msg$$inline_1108_target$$inline_771$$ = $msg$$5_msg$$inline_1108_target$$inline_771$$.getParent()
    }
  }
};
$JSCompiler_prototypeAlias$$.$getLogRecord$ = function $$JSCompiler_prototypeAlias$$$$getLogRecord$$($level$$16$$, $msg$$6$$, $opt_exception$$1$$) {
  var $logRecord$$4$$ = new $goog$debug$LogRecord$$($level$$16$$, "" + $msg$$6$$, this.$name_$);
  if($opt_exception$$1$$) {
    $logRecord$$4$$.$exception_$ = $opt_exception$$1$$;
    var $JSCompiler_inline_result$$785$$;
    var $opt_fn$$inline_787$$ = arguments.callee.caller;
    try {
      var $e$$inline_788$$;
      var $href$$inline_1116$$ = $goog$getObjectByName$$("window.location.href");
      if($goog$isString$$($opt_exception$$1$$)) {
        $e$$inline_788$$ = {message:$opt_exception$$1$$, name:"Unknown error", lineNumber:"Not available", fileName:$href$$inline_1116$$, stack:"Not available"}
      }else {
        var $lineNumber$$inline_1117$$, $fileName$$inline_1118$$, $threwError$$inline_1119$$ = $JSCompiler_alias_FALSE$$;
        try {
          $lineNumber$$inline_1117$$ = $opt_exception$$1$$.lineNumber || $opt_exception$$1$$.$line$ || "Not available"
        }catch($e$$inline_1120$$) {
          $lineNumber$$inline_1117$$ = "Not available", $threwError$$inline_1119$$ = $JSCompiler_alias_TRUE$$
        }
        try {
          $fileName$$inline_1118$$ = $opt_exception$$1$$.fileName || $opt_exception$$1$$.filename || $opt_exception$$1$$.sourceURL || $href$$inline_1116$$
        }catch($e$$inline_1121$$) {
          $fileName$$inline_1118$$ = "Not available", $threwError$$inline_1119$$ = $JSCompiler_alias_TRUE$$
        }
        $e$$inline_788$$ = $threwError$$inline_1119$$ || !$opt_exception$$1$$.lineNumber || !$opt_exception$$1$$.fileName || !$opt_exception$$1$$.stack ? {message:$opt_exception$$1$$.message, name:$opt_exception$$1$$.name, lineNumber:$lineNumber$$inline_1117$$, fileName:$fileName$$inline_1118$$, stack:$opt_exception$$1$$.stack || "Not available"} : $opt_exception$$1$$
      }
      $JSCompiler_inline_result$$785$$ = "Message: " + $goog$string$htmlEscape$$($e$$inline_788$$.message) + '\nUrl: <a href="view-source:' + $e$$inline_788$$.fileName + '" target="_new">' + $e$$inline_788$$.fileName + "</a>\nLine: " + $e$$inline_788$$.lineNumber + "\n\nBrowser stack:\n" + $goog$string$htmlEscape$$($e$$inline_788$$.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + $goog$string$htmlEscape$$($goog$debug$getStacktrace$$($opt_fn$$inline_787$$) + "-> ")
    }catch($e2$$inline_789$$) {
      $JSCompiler_inline_result$$785$$ = "Exception trying to expose exception! You win, we lose. " + $e2$$inline_789$$
    }
    $logRecord$$4$$.$exceptionText_$ = $JSCompiler_inline_result$$785$$
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
function $goog$debug$LogManager$getLogger$$($name$$68$$) {
  $goog$debug$LogManager$initialize$$();
  var $JSCompiler_temp$$3_logger$$inline_798$$;
  if(!($JSCompiler_temp$$3_logger$$inline_798$$ = $goog$debug$LogManager$loggers_$$[$name$$68$$])) {
    $JSCompiler_temp$$3_logger$$inline_798$$ = new $goog$debug$Logger$$($name$$68$$);
    var $lastDotIndex$$inline_799_parentLogger$$inline_801$$ = $name$$68$$.lastIndexOf("."), $leafName$$inline_800$$ = $name$$68$$.substr($lastDotIndex$$inline_799_parentLogger$$inline_801$$ + 1), $lastDotIndex$$inline_799_parentLogger$$inline_801$$ = $goog$debug$LogManager$getLogger$$($name$$68$$.substr(0, $lastDotIndex$$inline_799_parentLogger$$inline_801$$));
    $lastDotIndex$$inline_799_parentLogger$$inline_801$$.$children_$ || ($lastDotIndex$$inline_799_parentLogger$$inline_801$$.$children_$ = {});
    $lastDotIndex$$inline_799_parentLogger$$inline_801$$.$children_$[$leafName$$inline_800$$] = $JSCompiler_temp$$3_logger$$inline_798$$;
    $JSCompiler_temp$$3_logger$$inline_798$$.$parent_$ = $lastDotIndex$$inline_799_parentLogger$$inline_801$$;
    $goog$debug$LogManager$loggers_$$[$name$$68$$] = $JSCompiler_temp$$3_logger$$inline_798$$
  }
  return $JSCompiler_temp$$3_logger$$inline_798$$
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
    var $JSCompiler_StaticMethods_addHandler$self$$inline_1131$$ = $goog$debug$LogManager$rootLogger_$$, $handler$$inline_1132$$ = this.$publishHandler_$;
    $JSCompiler_StaticMethods_addHandler$self$$inline_1131$$.$handlers_$ || ($JSCompiler_StaticMethods_addHandler$self$$inline_1131$$.$handlers_$ = []);
    $JSCompiler_StaticMethods_addHandler$self$$inline_1131$$.$handlers_$.push($handler$$inline_1132$$)
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
  $JSCompiler_StaticMethods_hasActiveWindow$$(this) && this.$writeInitialDocument_$()
};
$JSCompiler_prototypeAlias$$.$addLogRecord$ = function $$JSCompiler_prototypeAlias$$$$addLogRecord$$($logRecord$$8$$) {
  if(!this.$filteredLoggers_$[$logRecord$$8$$.$loggerName_$]) {
    var $JSCompiler_StaticMethods_formatRecord$self$$inline_811_html$$inline_817$$ = this.$formatter_$, $className$$inline_813$$;
    switch($logRecord$$8$$.$level_$.value) {
      case $goog$debug$Logger$Level$SHOUT$$.value:
        $className$$inline_813$$ = "dbg-sh";
        break;
      case $goog$debug$Logger$Level$SEVERE$$.value:
        $className$$inline_813$$ = "dbg-sev";
        break;
      case $goog$debug$Logger$Level$WARNING$$.value:
        $className$$inline_813$$ = "dbg-w";
        break;
      case $goog$debug$Logger$Level$INFO$$.value:
        $className$$inline_813$$ = "dbg-i";
        break;
      default:
        $className$$inline_813$$ = "dbg-f"
    }
    var $sb$$inline_814$$ = [];
    $sb$$inline_814$$.push($JSCompiler_StaticMethods_formatRecord$self$$inline_811_html$$inline_817$$.$prefix_$, " ");
    if($JSCompiler_StaticMethods_formatRecord$self$$inline_811_html$$inline_817$$.$showAbsoluteTime$) {
      var $time$$inline_1136$$ = new Date($logRecord$$8$$.$time_$);
      $sb$$inline_814$$.push("[", $goog$debug$Formatter$getTwoDigitString_$$($time$$inline_1136$$.getFullYear() - 2E3) + $goog$debug$Formatter$getTwoDigitString_$$($time$$inline_1136$$.getMonth() + 1) + $goog$debug$Formatter$getTwoDigitString_$$($time$$inline_1136$$.getDate()) + " " + $goog$debug$Formatter$getTwoDigitString_$$($time$$inline_1136$$.getHours()) + ":" + $goog$debug$Formatter$getTwoDigitString_$$($time$$inline_1136$$.getMinutes()) + ":" + $goog$debug$Formatter$getTwoDigitString_$$($time$$inline_1136$$.getSeconds()) + 
      "." + $goog$debug$Formatter$getTwoDigitString_$$(Math.floor($time$$inline_1136$$.getMilliseconds() / 10)), "] ")
    }
    $JSCompiler_StaticMethods_formatRecord$self$$inline_811_html$$inline_817$$.$showRelativeTime$ && $sb$$inline_814$$.push("[", $goog$string$whitespaceEscape$$($goog$debug$Formatter$getRelativeTime_$$($logRecord$$8$$, $JSCompiler_StaticMethods_formatRecord$self$$inline_811_html$$inline_817$$.$startTimeProvider_$.get())), "s] ");
    $JSCompiler_StaticMethods_formatRecord$self$$inline_811_html$$inline_817$$.$showLoggerName$ && $sb$$inline_814$$.push("[", $goog$string$htmlEscape$$($logRecord$$8$$.$loggerName_$), "] ");
    $sb$$inline_814$$.push('<span class="', $className$$inline_813$$, '">', $goog$string$newLineToBr$$($goog$string$whitespaceEscape$$($goog$string$htmlEscape$$($logRecord$$8$$.$msg_$))));
    $JSCompiler_StaticMethods_formatRecord$self$$inline_811_html$$inline_817$$.$showExceptionText$ && $logRecord$$8$$.$exception_$ && $sb$$inline_814$$.push("<br>", $goog$string$newLineToBr$$($goog$string$whitespaceEscape$$($logRecord$$8$$.$exceptionText_$ || "")));
    $sb$$inline_814$$.push("</span><br>");
    $JSCompiler_StaticMethods_formatRecord$self$$inline_811_html$$inline_817$$ = $sb$$inline_814$$.join("");
    this.$enabled_$ ? ($JSCompiler_StaticMethods_openWindow_$$(this), this.$savedMessages_$.add($JSCompiler_StaticMethods_formatRecord$self$$inline_811_html$$inline_817$$), $JSCompiler_StaticMethods_writeToLog_$$(this, $JSCompiler_StaticMethods_formatRecord$self$$inline_811_html$$inline_817$$)) : this.$savedMessages_$.add($JSCompiler_StaticMethods_formatRecord$self$$inline_811_html$$inline_817$$);
    this.$enableOnSevere_$ && $logRecord$$8$$.$level_$.value >= $goog$debug$Logger$Level$SEVERE$$.value && this.$setEnabled$($JSCompiler_alias_TRUE$$)
  }
};
function $JSCompiler_StaticMethods_writeToLog_$$($JSCompiler_StaticMethods_writeToLog_$self$$, $html$$4$$) {
  $JSCompiler_StaticMethods_writeToLog_$self$$.$outputBuffer_$.push($html$$4$$);
  $goog$global$$.clearTimeout($JSCompiler_StaticMethods_writeToLog_$self$$.$bufferTimeout_$);
  750 < $goog$now$$() - $JSCompiler_StaticMethods_writeToLog_$self$$.$lastCall_$ ? $JSCompiler_StaticMethods_writeToLog_$self$$.$writeBufferToLog_$() : $JSCompiler_StaticMethods_writeToLog_$self$$.$bufferTimeout_$ = $goog$global$$.setTimeout($goog$bind$$($JSCompiler_StaticMethods_writeToLog_$self$$.$writeBufferToLog_$, $JSCompiler_StaticMethods_writeToLog_$self$$), 250)
}
$JSCompiler_prototypeAlias$$.$writeBufferToLog_$ = function $$JSCompiler_prototypeAlias$$$$writeBufferToLog_$$() {
  this.$lastCall_$ = $goog$now$$();
  if($JSCompiler_StaticMethods_hasActiveWindow$$(this)) {
    var $body$$5_scroll$$1$$ = this.$win_$.document.body, $body$$5_scroll$$1$$ = $body$$5_scroll$$1$$ && 100 >= $body$$5_scroll$$1$$.scrollHeight - ($body$$5_scroll$$1$$.scrollTop + $body$$5_scroll$$1$$.clientHeight);
    this.$win_$.document.write(this.$outputBuffer_$.join(""));
    this.$outputBuffer_$.length = 0;
    $body$$5_scroll$$1$$ && this.$win_$.scrollTo(0, 1E6)
  }
};
function $JSCompiler_StaticMethods_writeSavedMessages_$$($JSCompiler_StaticMethods_writeSavedMessages_$self$$) {
  for(var $messages$$ = $JSCompiler_StaticMethods_writeSavedMessages_$self$$.$savedMessages_$.$getValues$(), $i$$116$$ = 0;$i$$116$$ < $messages$$.length;$i$$116$$++) {
    $JSCompiler_StaticMethods_writeToLog_$$($JSCompiler_StaticMethods_writeSavedMessages_$self$$, $messages$$[$i$$116$$])
  }
}
function $JSCompiler_StaticMethods_openWindow_$$($JSCompiler_StaticMethods_openWindow_$self$$) {
  if(!$JSCompiler_StaticMethods_hasActiveWindow$$($JSCompiler_StaticMethods_openWindow_$self$$) && !$JSCompiler_StaticMethods_openWindow_$self$$.$winOpening_$) {
    var $h$$9_winpos$$ = $goog$debug$DebugWindow$getCookieValue_$$($JSCompiler_StaticMethods_openWindow_$self$$.$identifier_$, "dbg", "0,0,800,500").split(","), $x$$69$$ = Number($h$$9_winpos$$[0]), $y$$44$$ = Number($h$$9_winpos$$[1]), $w$$9$$ = Number($h$$9_winpos$$[2]), $h$$9_winpos$$ = Number($h$$9_winpos$$[3]);
    $JSCompiler_StaticMethods_openWindow_$self$$.$winOpening_$ = $JSCompiler_alias_TRUE$$;
    $JSCompiler_StaticMethods_openWindow_$self$$.$win_$ = window.open("", $goog$userAgent$IE$$ ? $JSCompiler_StaticMethods_openWindow_$self$$.$identifier_$.replace(/[\s\-\.\,]/g, "_") : $JSCompiler_StaticMethods_openWindow_$self$$.$identifier_$, "width=" + $w$$9$$ + ",height=" + $h$$9_winpos$$ + ",toolbar=no,resizable=yes,scrollbars=yes,left=" + $x$$69$$ + ",top=" + $y$$44$$ + ",status=no,screenx=" + $x$$69$$ + ",screeny=" + $y$$44$$);
    !$JSCompiler_StaticMethods_openWindow_$self$$.$win_$ && !$JSCompiler_StaticMethods_openWindow_$self$$.$showedBlockedAlert_$ && (alert("Logger popup was blocked"), $JSCompiler_StaticMethods_openWindow_$self$$.$showedBlockedAlert_$ = $JSCompiler_alias_TRUE$$);
    $JSCompiler_StaticMethods_openWindow_$self$$.$winOpening_$ = $JSCompiler_alias_FALSE$$;
    $JSCompiler_StaticMethods_openWindow_$self$$.$win_$ && $JSCompiler_StaticMethods_openWindow_$self$$.$writeInitialDocument_$()
  }
}
$JSCompiler_prototypeAlias$$.$getStyleRules$ = $JSCompiler_returnArg$$("*{font:normal 14px monospace;}.dbg-sev{color:#F00}.dbg-w{color:#E92}.dbg-sh{background-color:#fd4;font-weight:bold;color:#000}.dbg-i{color:#666}.dbg-f{color:#999}.dbg-ev{color:#0A0}.dbg-m{color:#990}");
$JSCompiler_prototypeAlias$$.$writeInitialDocument_$ = function $$JSCompiler_prototypeAlias$$$$writeInitialDocument_$$() {
  $JSCompiler_StaticMethods_hasActiveWindow$$(this) || (this.$win_$.document.open(), $JSCompiler_StaticMethods_writeToLog_$$(this, "<style>" + this.$getStyleRules$() + '</style><hr><div class="dbg-ev" style="text-align:center">' + this.$welcomeMessage$ + "<br><small>Logger: " + this.$identifier_$ + "</small></div><hr>"), $JSCompiler_StaticMethods_writeSavedMessages_$$(this))
};
function $JSCompiler_StaticMethods_setCookie_$$($JSCompiler_StaticMethods_setCookie_$self$$, $key$$80$$, $value$$84$$) {
  $key$$80$$ += $JSCompiler_StaticMethods_setCookie_$self$$.$identifier_$;
  document.cookie = $key$$80$$ + "=" + encodeURIComponent($value$$84$$) + ";path=/;expires=" + (new Date($goog$now$$() + 2592E6)).toUTCString()
}
function $goog$debug$DebugWindow$getCookieValue_$$($fullKey_identifier$$2$$, $cookie_key$$82$$, $end$$4_opt_default$$1$$) {
  var $fullKey_identifier$$2$$ = $cookie_key$$82$$ + $fullKey_identifier$$2$$, $cookie_key$$82$$ = "" + document.cookie, $start$$10$$ = $cookie_key$$82$$.indexOf($fullKey_identifier$$2$$ + "=");
  return-1 != $start$$10$$ ? ($end$$4_opt_default$$1$$ = $cookie_key$$82$$.indexOf(";", $start$$10$$), decodeURIComponent($cookie_key$$82$$.substring($start$$10$$ + $fullKey_identifier$$2$$.length + 1, -1 == $end$$4_opt_default$$1$$ ? $cookie_key$$82$$.length : $end$$4_opt_default$$1$$))) : $end$$4_opt_default$$1$$ || ""
}
$JSCompiler_prototypeAlias$$.$saveWindowPositionSize_$ = function $$JSCompiler_prototypeAlias$$$$saveWindowPositionSize_$$() {
  $JSCompiler_StaticMethods_hasActiveWindow$$(this) && $JSCompiler_StaticMethods_setCookie_$$(this, "dbg", (this.$win_$.screenX || this.$win_$.screenLeft || 0) + "," + (this.$win_$.screenY || this.$win_$.screenTop || 0) + "," + (this.$win_$.outerWidth || 800) + "," + (this.$win_$.outerHeight || 500))
};
function $goog$debug$FancyWindow$$($opt_identifier$$1$$, $opt_prefix$$4$$) {
  if($goog$debug$FancyWindow$HAS_LOCAL_STORE$$) {
    var $storedKeys$$inline_824$$ = $goog$debug$FancyWindow$getStoredKeys_$$(), $key$$inline_825$$;
    for($key$$inline_825$$ in $storedKeys$$inline_824$$) {
      var $logger$$inline_827_loggerName$$inline_826$$ = $key$$inline_825$$.replace("fancywindow.sel.", ""), $logger$$inline_827_loggerName$$inline_826$$ = $goog$debug$LogManager$getLogger$$($logger$$inline_827_loggerName$$inline_826$$), $curLevel$$inline_828$$ = $logger$$inline_827_loggerName$$inline_826$$.$level_$, $storedLevel$$inline_829$$ = window.localStorage.getItem($key$$inline_825$$).toString();
      (!$curLevel$$inline_828$$ || $curLevel$$inline_828$$.toString() != $storedLevel$$inline_829$$) && $logger$$inline_827_loggerName$$inline_826$$.$setLevel$($goog$debug$Logger$Level$getPredefinedLevel$$($storedLevel$$inline_829$$))
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
  }catch($e$$inline_831$$) {
  }
  $goog$debug$FancyWindow$HAS_LOCAL_STORE$$ = $JSCompiler_alias_FALSE$$
}
$JSCompiler_prototypeAlias$$ = $goog$debug$FancyWindow$$.prototype;
$JSCompiler_prototypeAlias$$.$writeBufferToLog_$ = function $$JSCompiler_prototypeAlias$$$$writeBufferToLog_$$() {
  this.$lastCall_$ = $goog$now$$();
  if($JSCompiler_StaticMethods_hasActiveWindow$$(this)) {
    for(var $logel$$ = this.$dh_$.$getElement$("log"), $scroll$$2$$ = 100 >= $logel$$.scrollHeight - ($logel$$.scrollTop + $logel$$.offsetHeight), $i$$117$$ = 0;$i$$117$$ < this.$outputBuffer_$.length;$i$$117$$++) {
      var $div$$2$$ = this.$dh_$.$createDom$("div", "logmsg");
      $div$$2$$.innerHTML = this.$outputBuffer_$[$i$$117$$];
      $logel$$.appendChild($div$$2$$)
    }
    this.$outputBuffer_$.length = 0;
    this.$resizeStuff_$();
    $scroll$$2$$ && ($logel$$.scrollTop = $logel$$.scrollHeight)
  }
};
$JSCompiler_prototypeAlias$$.$writeInitialDocument_$ = function $$JSCompiler_prototypeAlias$$$$writeInitialDocument_$$() {
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
  var $el$$33$$ = this.$dh_$.$getElement$("optionsarea");
  $el$$33$$.innerHTML = "";
  for(var $loggers$$ = $goog$debug$FancyWindow$getLoggers_$$(), $dh$$1$$ = this.$dh_$, $i$$118$$ = 0;$i$$118$$ < $loggers$$.length;$i$$118$$++) {
    var $div$$3_logger$$3$$ = $goog$debug$LogManager$getLogger$$($loggers$$[$i$$118$$]), $div$$3_logger$$3$$ = $dh$$1$$.$createDom$("div", {}, $JSCompiler_StaticMethods_getDropDown_$$(this, "sel" + $loggers$$[$i$$118$$], $div$$3_logger$$3$$.$level_$ ? $div$$3_logger$$3$$.$level_$.name : "INHERIT"), $dh$$1$$.$createDom$("span", {}, $loggers$$[$i$$118$$] || "(root)"));
    $el$$33$$.appendChild($div$$3_logger$$3$$)
  }
  this.$dh_$.$getElement$("options").style.display = "block";
  return $JSCompiler_alias_FALSE$$
};
function $JSCompiler_StaticMethods_getDropDown_$$($JSCompiler_StaticMethods_getDropDown_$self_dh$$2$$, $id$$16_sel$$, $selected$$) {
  for(var $JSCompiler_StaticMethods_getDropDown_$self_dh$$2$$ = $JSCompiler_StaticMethods_getDropDown_$self_dh$$2$$.$dh_$, $id$$16_sel$$ = $JSCompiler_StaticMethods_getDropDown_$self_dh$$2$$.$createDom$("select", {id:$id$$16_sel$$}), $i$$119$$ = 0;$i$$119$$ < $goog$debug$Logger$Level$PREDEFINED_LEVELS$$.length;$i$$119$$++) {
    var $level$$17$$ = $goog$debug$Logger$Level$PREDEFINED_LEVELS$$[$i$$119$$], $option$$ = $JSCompiler_StaticMethods_getDropDown_$self_dh$$2$$.$createDom$("option", {}, $level$$17$$.name);
    $selected$$ == $level$$17$$.name && ($option$$.selected = $JSCompiler_alias_TRUE$$);
    $id$$16_sel$$.appendChild($option$$)
  }
  $id$$16_sel$$.appendChild($JSCompiler_StaticMethods_getDropDown_$self_dh$$2$$.$createDom$("option", {selected:"INHERIT" == $selected$$}, "INHERIT"));
  return $id$$16_sel$$
}
$JSCompiler_prototypeAlias$$.$closeOptions_$ = function $$JSCompiler_prototypeAlias$$$$closeOptions_$$() {
  this.$dh_$.$getElement$("options").style.display = "none";
  for(var $loggers$$1_loggers$$inline_833$$ = $goog$debug$FancyWindow$getLoggers_$$(), $dh$$3_storedKeys$$inline_834$$ = this.$dh_$, $i$$120_i$$inline_835$$ = 0;$i$$120_i$$inline_835$$ < $loggers$$1_loggers$$inline_833$$.length;$i$$120_i$$inline_835$$++) {
    var $key$$inline_836_logger$$4$$ = $goog$debug$LogManager$getLogger$$($loggers$$1_loggers$$inline_833$$[$i$$120_i$$inline_835$$]), $level$$18_level$$inline_837_sel$$1$$ = $dh$$3_storedKeys$$inline_834$$.$getElement$("sel" + $loggers$$1_loggers$$inline_833$$[$i$$120_i$$inline_835$$]), $level$$18_level$$inline_837_sel$$1$$ = $level$$18_level$$inline_837_sel$$1$$.options[$level$$18_level$$inline_837_sel$$1$$.selectedIndex].text;
    "INHERIT" == $level$$18_level$$inline_837_sel$$1$$ ? $key$$inline_836_logger$$4$$.$setLevel$($JSCompiler_alias_NULL$$) : $key$$inline_836_logger$$4$$.$setLevel$($goog$debug$Logger$Level$getPredefinedLevel$$($level$$18_level$$inline_837_sel$$1$$))
  }
  if($goog$debug$FancyWindow$HAS_LOCAL_STORE$$) {
    $loggers$$1_loggers$$inline_833$$ = $goog$debug$FancyWindow$getLoggers_$$();
    $dh$$3_storedKeys$$inline_834$$ = $goog$debug$FancyWindow$getStoredKeys_$$();
    for($i$$120_i$$inline_835$$ = 0;$i$$120_i$$inline_835$$ < $loggers$$1_loggers$$inline_833$$.length;$i$$120_i$$inline_835$$++) {
      $key$$inline_836_logger$$4$$ = "fancywindow.sel." + $loggers$$1_loggers$$inline_833$$[$i$$120_i$$inline_835$$], $level$$18_level$$inline_837_sel$$1$$ = $goog$debug$LogManager$getLogger$$($loggers$$1_loggers$$inline_833$$[$i$$120_i$$inline_835$$]).$level_$, $key$$inline_836_logger$$4$$ in $dh$$3_storedKeys$$inline_834$$ ? $level$$18_level$$inline_837_sel$$1$$ ? window.localStorage.getItem($key$$inline_836_logger$$4$$) != $level$$18_level$$inline_837_sel$$1$$.name && window.localStorage.setItem($key$$inline_836_logger$$4$$, 
      $level$$18_level$$inline_837_sel$$1$$.name) : window.localStorage.removeItem($key$$inline_836_logger$$4$$) : $level$$18_level$$inline_837_sel$$1$$ && window.localStorage.setItem($key$$inline_836_logger$$4$$, $level$$18_level$$inline_837_sel$$1$$.name)
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
  for(var $storedKeys$$2$$ = {}, $i$$122$$ = 0, $len$$4$$ = window.localStorage.length;$i$$122$$ < $len$$4$$;$i$$122$$++) {
    var $key$$85$$ = window.localStorage.key($i$$122$$);
    $key$$85$$ != $JSCompiler_alias_NULL$$ && 0 == $key$$85$$.lastIndexOf("fancywindow.sel.", 0) && ($storedKeys$$2$$[$key$$85$$] = $JSCompiler_alias_TRUE$$)
  }
  return $storedKeys$$2$$
}
function $goog$debug$FancyWindow$getLoggers_$$() {
  var $loggers$$3$$ = $goog$object$getKeys$$($goog$debug$LogManager$loggers_$$);
  $loggers$$3$$.sort();
  return $loggers$$3$$
}
;var $rflect$Debug$theLogger$$;
function $_inspect$$($name$$70$$, $obj$$74$$) {
  window["_inspect_" + $name$$70$$] = $obj$$74$$
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
}catch($e$$69$$) {
}
;
