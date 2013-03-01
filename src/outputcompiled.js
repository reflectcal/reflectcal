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
  var $s$$13$$ = "" + $num$$4$$, $index$$44_length$$inline_39$$ = $s$$13$$.indexOf(".");
  -1 == $index$$44_length$$inline_39$$ && ($index$$44_length$$inline_39$$ = $s$$13$$.length);
  $index$$44_length$$inline_39$$ = Math.max(0, $length$$14$$ - $index$$44_length$$inline_39$$);
  return Array($index$$44_length$$inline_39$$ + 1).join("0") + $s$$13$$
}
;var $goog$userAgent$detectedOpera_$$, $goog$userAgent$detectedIe_$$, $goog$userAgent$detectedWebkit_$$, $goog$userAgent$detectedMobile_$$, $goog$userAgent$detectedGecko_$$, $goog$userAgent$detectedMac_$$;
function $goog$userAgent$getUserAgentString$$() {
  return $goog$global$$.navigator ? $goog$global$$.navigator.userAgent : $JSCompiler_alias_NULL$$
}
$goog$userAgent$detectedGecko_$$ = $goog$userAgent$detectedMobile_$$ = $goog$userAgent$detectedWebkit_$$ = $goog$userAgent$detectedIe_$$ = $goog$userAgent$detectedOpera_$$ = $JSCompiler_alias_FALSE$$;
var $ua$$inline_42$$;
if($ua$$inline_42$$ = $goog$userAgent$getUserAgentString$$()) {
  var $navigator$$inline_43$$ = $goog$global$$.navigator;
  $goog$userAgent$detectedOpera_$$ = 0 == $ua$$inline_42$$.indexOf("Opera");
  $goog$userAgent$detectedIe_$$ = !$goog$userAgent$detectedOpera_$$ && -1 != $ua$$inline_42$$.indexOf("MSIE");
  $goog$userAgent$detectedMobile_$$ = ($goog$userAgent$detectedWebkit_$$ = !$goog$userAgent$detectedOpera_$$ && -1 != $ua$$inline_42$$.indexOf("WebKit")) && -1 != $ua$$inline_42$$.indexOf("Mobile");
  $goog$userAgent$detectedGecko_$$ = !$goog$userAgent$detectedOpera_$$ && !$goog$userAgent$detectedWebkit_$$ && "Gecko" == $navigator$$inline_43$$.product
}
var $goog$userAgent$OPERA$$ = $goog$userAgent$detectedOpera_$$, $goog$userAgent$IE$$ = $goog$userAgent$detectedIe_$$, $goog$userAgent$GECKO$$ = $goog$userAgent$detectedGecko_$$, $goog$userAgent$WEBKIT$$ = $goog$userAgent$detectedWebkit_$$, $goog$userAgent$MOBILE$$ = $goog$userAgent$detectedMobile_$$, $goog$userAgent$PLATFORM$$, $navigator$$inline_45$$ = $goog$global$$.navigator;
$goog$userAgent$PLATFORM$$ = $navigator$$inline_45$$ && $navigator$$inline_45$$.platform || "";
$goog$userAgent$detectedMac_$$ = -1 != $goog$userAgent$PLATFORM$$.indexOf("Mac");
var $goog$userAgent$WINDOWS$$ = -1 != $goog$userAgent$PLATFORM$$.indexOf("Win"), $goog$userAgent$VERSION$$;
a: {
  var $version$$inline_48$$ = "", $re$$inline_49$$;
  if($goog$userAgent$OPERA$$ && $goog$global$$.opera) {
    var $operaVersion$$inline_50$$ = $goog$global$$.opera.version, $version$$inline_48$$ = "function" == typeof $operaVersion$$inline_50$$ ? $operaVersion$$inline_50$$() : $operaVersion$$inline_50$$
  }else {
    if($goog$userAgent$GECKO$$ ? $re$$inline_49$$ = /rv\:([^\);]+)(\)|;)/ : $goog$userAgent$IE$$ ? $re$$inline_49$$ = /MSIE\s+([^\);]+)(\)|;)/ : $goog$userAgent$WEBKIT$$ && ($re$$inline_49$$ = /WebKit\/(\S+)/), $re$$inline_49$$) {
      var $arr$$inline_51$$ = $re$$inline_49$$.exec($goog$userAgent$getUserAgentString$$()), $version$$inline_48$$ = $arr$$inline_51$$ ? $arr$$inline_51$$[1] : ""
    }
  }
  if($goog$userAgent$IE$$) {
    var $docMode$$inline_52$$, $doc$$inline_709$$ = $goog$global$$.document;
    $docMode$$inline_52$$ = $doc$$inline_709$$ ? $doc$$inline_709$$.documentMode : $JSCompiler_alias_VOID$$;
    if($docMode$$inline_52$$ > parseFloat($version$$inline_48$$)) {
      $goog$userAgent$VERSION$$ = "" + $docMode$$inline_52$$;
      break a
    }
  }
  $goog$userAgent$VERSION$$ = $version$$inline_48$$
}
var $goog$userAgent$isVersionCache_$$ = {};
function $goog$userAgent$isVersion$$($version$$8$$) {
  var $JSCompiler_temp$$32_order$$inline_57$$;
  if(!($JSCompiler_temp$$32_order$$inline_57$$ = $goog$userAgent$isVersionCache_$$[$version$$8$$])) {
    $JSCompiler_temp$$32_order$$inline_57$$ = 0;
    for(var $v1Subs$$inline_58$$ = $goog$string$trim$$("" + $goog$userAgent$VERSION$$).split("."), $v2Subs$$inline_59$$ = $goog$string$trim$$("" + $version$$8$$).split("."), $subCount$$inline_60$$ = Math.max($v1Subs$$inline_58$$.length, $v2Subs$$inline_59$$.length), $subIdx$$inline_61$$ = 0;0 == $JSCompiler_temp$$32_order$$inline_57$$ && $subIdx$$inline_61$$ < $subCount$$inline_60$$;$subIdx$$inline_61$$++) {
      var $v1Sub$$inline_62$$ = $v1Subs$$inline_58$$[$subIdx$$inline_61$$] || "", $v2Sub$$inline_63$$ = $v2Subs$$inline_59$$[$subIdx$$inline_61$$] || "", $v1CompParser$$inline_64$$ = RegExp("(\\d*)(\\D*)", "g"), $v2CompParser$$inline_65$$ = RegExp("(\\d*)(\\D*)", "g");
      do {
        var $v1Comp$$inline_66$$ = $v1CompParser$$inline_64$$.exec($v1Sub$$inline_62$$) || ["", "", ""], $v2Comp$$inline_67$$ = $v2CompParser$$inline_65$$.exec($v2Sub$$inline_63$$) || ["", "", ""];
        if(0 == $v1Comp$$inline_66$$[0].length && 0 == $v2Comp$$inline_67$$[0].length) {
          break
        }
        $JSCompiler_temp$$32_order$$inline_57$$ = ((0 == $v1Comp$$inline_66$$[1].length ? 0 : parseInt($v1Comp$$inline_66$$[1], 10)) < (0 == $v2Comp$$inline_67$$[1].length ? 0 : parseInt($v2Comp$$inline_67$$[1], 10)) ? -1 : (0 == $v1Comp$$inline_66$$[1].length ? 0 : parseInt($v1Comp$$inline_66$$[1], 10)) > (0 == $v2Comp$$inline_67$$[1].length ? 0 : parseInt($v2Comp$$inline_67$$[1], 10)) ? 1 : 0) || ((0 == $v1Comp$$inline_66$$[2].length) < (0 == $v2Comp$$inline_67$$[2].length) ? -1 : (0 == $v1Comp$$inline_66$$[2].length) > 
        (0 == $v2Comp$$inline_67$$[2].length) ? 1 : 0) || ($v1Comp$$inline_66$$[2] < $v2Comp$$inline_67$$[2] ? -1 : $v1Comp$$inline_66$$[2] > $v2Comp$$inline_67$$[2] ? 1 : 0)
      }while(0 == $JSCompiler_temp$$32_order$$inline_57$$)
    }
    $JSCompiler_temp$$32_order$$inline_57$$ = $goog$userAgent$isVersionCache_$$[$version$$8$$] = 0 <= $JSCompiler_temp$$32_order$$inline_57$$
  }
  return $JSCompiler_temp$$32_order$$inline_57$$
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
    var $givenArgs$$inline_74$$ = Array.prototype.slice.call(arguments, 2), $message$$inline_77$$ = "Assertion failed";
    if($opt_message$$8$$) {
      var $message$$inline_77$$ = $message$$inline_77$$ + (": " + $opt_message$$8$$), $args$$inline_78$$ = $givenArgs$$inline_74$$
    }
    $JSCompiler_alias_THROW$$(new $goog$asserts$AssertionError$$("" + $message$$inline_77$$, $args$$inline_78$$ || []))
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
function $goog$disposeAll$$($var_args$$49$$) {
  for(var $i$$50$$ = 0, $len$$1$$ = arguments.length;$i$$50$$ < $len$$1$$;++$i$$50$$) {
    var $disposable$$1$$ = arguments[$i$$50$$];
    $goog$isArrayLike$$($disposable$$1$$) ? $goog$disposeAll$$.apply($JSCompiler_alias_NULL$$, $disposable$$1$$) : $disposable$$1$$ && "function" == typeof $disposable$$1$$.$dispose$ && $disposable$$1$$.$dispose$()
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
function $goog$reflect$sinkValue$$($x$$55$$) {
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
      var $JSCompiler_inline_result$$85$$;
      a: {
        try {
          $goog$reflect$sinkValue$$($relatedTarget$$.nodeName);
          $JSCompiler_inline_result$$85$$ = $JSCompiler_alias_TRUE$$;
          break a
        }catch($e$$inline_88$$) {
        }
        $JSCompiler_inline_result$$85$$ = $JSCompiler_alias_FALSE$$
      }
      $JSCompiler_inline_result$$85$$ || ($relatedTarget$$ = $JSCompiler_alias_NULL$$)
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
        var $evt$$14_useReturnValue$$inline_91$$ = $JSCompiler_alias_FALSE$$;
        if(0 == $ieEvent_retval$$1$$.keyCode) {
          try {
            $ieEvent_retval$$1$$.keyCode = -1;
            break a
          }catch($ex$$inline_92$$) {
            $evt$$14_useReturnValue$$inline_91$$ = $JSCompiler_alias_TRUE$$
          }
        }
        if($evt$$14_useReturnValue$$inline_91$$ || $ieEvent_retval$$1$$.returnValue == $JSCompiler_alias_VOID$$) {
          $ieEvent_retval$$1$$.returnValue = $JSCompiler_alias_TRUE$$
        }
      }
    }
    $evt$$14_useReturnValue$$inline_91$$ = new $goog$events$BrowserEvent$$;
    $evt$$14_useReturnValue$$inline_91$$.$init$($ieEvent_retval$$1$$, this);
    $ieEvent_retval$$1$$ = $JSCompiler_alias_TRUE$$;
    try {
      if($hasCapture$$2$$) {
        for(var $ancestors$$1$$ = [], $parent$$3$$ = $evt$$14_useReturnValue$$inline_91$$.currentTarget;$parent$$3$$;$parent$$3$$ = $parent$$3$$.parentNode) {
          $ancestors$$1$$.push($parent$$3$$)
        }
        $targetsMap$$1$$ = $map$$6$$[$JSCompiler_alias_TRUE$$];
        $targetsMap$$1$$.$remaining_$ = $targetsMap$$1$$.$count_$;
        for(var $i$$59$$ = $ancestors$$1$$.length - 1;!$evt$$14_useReturnValue$$inline_91$$.$propagationStopped_$ && 0 <= $i$$59$$ && $targetsMap$$1$$.$remaining_$;$i$$59$$--) {
          $evt$$14_useReturnValue$$inline_91$$.currentTarget = $ancestors$$1$$[$i$$59$$], $ieEvent_retval$$1$$ &= $goog$events$fireListeners_$$($targetsMap$$1$$, $ancestors$$1$$[$i$$59$$], $be$$1_type$$67$$, $JSCompiler_alias_TRUE$$, $evt$$14_useReturnValue$$inline_91$$)
        }
        if($hasBubble$$1$$) {
          $targetsMap$$1$$ = $map$$6$$[$JSCompiler_alias_FALSE$$];
          $targetsMap$$1$$.$remaining_$ = $targetsMap$$1$$.$count_$;
          for($i$$59$$ = 0;!$evt$$14_useReturnValue$$inline_91$$.$propagationStopped_$ && $i$$59$$ < $ancestors$$1$$.length && $targetsMap$$1$$.$remaining_$;$i$$59$$++) {
            $evt$$14_useReturnValue$$inline_91$$.currentTarget = $ancestors$$1$$[$i$$59$$], $ieEvent_retval$$1$$ &= $goog$events$fireListeners_$$($targetsMap$$1$$, $ancestors$$1$$[$i$$59$$], $be$$1_type$$67$$, $JSCompiler_alias_FALSE$$, $evt$$14_useReturnValue$$inline_91$$)
          }
        }
      }else {
        $ieEvent_retval$$1$$ = $goog$events$fireListener$$($listener$$41$$, $evt$$14_useReturnValue$$inline_91$$)
      }
    }finally {
      $ancestors$$1$$ && ($ancestors$$1$$.length = 0), $evt$$14_useReturnValue$$inline_91$$.$dispose$()
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
  var $cutoffSameWeek$$inline_103_d$$inline_101$$ = new Date(this.getFullYear(), this.getMonth(), this.getDate()), $firstday$$inline_102$$ = this.$firstDayOfWeek_$ || 0, $cutoffSameWeek$$inline_103_d$$inline_101$$ = $cutoffSameWeek$$inline_103_d$$inline_101$$.valueOf() + 864E5 * (((this.$firstWeekCutOffDay_$ || 3) - $firstday$$inline_102$$ + 7) % 7 - (($cutoffSameWeek$$inline_103_d$$inline_101$$.getDay() + 6) % 7 - $firstday$$inline_102$$ + 7) % 7);
  return Math.floor(Math.round(($cutoffSameWeek$$inline_103_d$$inline_101$$ - (new Date((new Date($cutoffSameWeek$$inline_103_d$$inline_101$$)).getFullYear(), 0, 1)).valueOf()) / 864E5) / 7) + 1
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
  for(var $allDayChipsCounter$$inline_120_allDayChipsLength$$ = this.$weekChips$.length = 0, $counter$$9$$ = 0, $length$$26$$ = $daySeries$$.length;$counter$$9$$ < $length$$26$$;$counter$$9$$++) {
    var $counter$$inline_122_yearKey$$ = $daySeries$$[$counter$$9$$].getFullYear();
    if($JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$)) {
      var $dayOfYearKey_length$$inline_123$$ = $daySeries$$[$counter$$9$$].$getDayOfYear$();
      this.$dayChips$.push($rflect$cal$events$EventManager$getNestedChips_$$(this.$chipsByDay_$, $counter$$inline_122_yearKey$$, $dayOfYearKey_length$$inline_123$$) || []);
      var $aKnownChipIds$$inline_113_weekKey$$ = $knownChipsIds$$, $aDayNumber$$inline_116$$ = $counter$$9$$, $aTotalDays$$inline_117$$ = $length$$26$$, $allDayChips$$inline_119$$ = this.$allDayChips$[0], $chips$$inline_121$$ = $JSCompiler_alias_VOID$$;
      if($chips$$inline_121$$ = $rflect$cal$events$EventManager$getNestedChips_$$(this.$allDayChipsByDay_$, $counter$$inline_122_yearKey$$, $dayOfYearKey_length$$inline_123$$)) {
        $counter$$inline_122_yearKey$$ = 0;
        for($dayOfYearKey_length$$inline_123$$ = $chips$$inline_121$$.length;$counter$$inline_122_yearKey$$ < $dayOfYearKey_length$$inline_123$$;$counter$$inline_122_yearKey$$++) {
          var $id$$inline_124_newChip$$inline_125$$ = $chips$$inline_121$$[$counter$$inline_122_yearKey$$].$eventId$;
          $aKnownChipIds$$inline_113_weekKey$$[$id$$inline_124_newChip$$inline_125$$] || ($aKnownChipIds$$inline_113_weekKey$$[$id$$inline_124_newChip$$inline_125$$] = 1, $id$$inline_124_newChip$$inline_125$$ = $chips$$inline_121$$[$counter$$inline_122_yearKey$$].$clone$(), $id$$inline_124_newChip$$inline_125$$.start = $aDayNumber$$inline_116$$, $id$$inline_124_newChip$$inline_125$$.$endIsCut$ = $aTotalDays$$inline_117$$ - $aDayNumber$$inline_116$$ < $id$$inline_124_newChip$$inline_125$$.end, $id$$inline_124_newChip$$inline_125$$.end = 
          $id$$inline_124_newChip$$inline_125$$.$endIsCut$ ? $aTotalDays$$inline_117$$ : $aDayNumber$$inline_116$$ + $id$$inline_124_newChip$$inline_125$$.end, $allDayChips$$inline_119$$[$allDayChipsCounter$$inline_120_allDayChipsLength$$++] = $id$$inline_124_newChip$$inline_125$$)
        }
      }
    }else {
      $JSCompiler_StaticMethods_isInMonthMode$$(this.$viewManager_$) && 0 == $counter$$9$$ % 7 && ($aKnownChipIds$$inline_113_weekKey$$ = $daySeries$$[$counter$$9$$].$getWeekNumber$(), this.$weekChips$.push($rflect$cal$events$EventManager$getNestedChips_$$(this.$chipsByWeek_$, $counter$$inline_122_yearKey$$, $aKnownChipIds$$inline_113_weekKey$$) || []))
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
function $JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$self$$, $key$$49_listener$$43_listenerArray$$inline_133_src$$18$$, $i$$inline_134_type$$71$$, $listener$$inline_129_opt_fn$$2$$, $capture$$inline_132_opt_capture$$3$$, $opt_handler$$11_opt_handler$$inline_131$$) {
  if($goog$isArray$$($i$$inline_134_type$$71$$)) {
    for(var $i$$62$$ = 0;$i$$62$$ < $i$$inline_134_type$$71$$.length;$i$$62$$++) {
      $JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$self$$, $key$$49_listener$$43_listenerArray$$inline_133_src$$18$$, $i$$inline_134_type$$71$$[$i$$62$$], $listener$$inline_129_opt_fn$$2$$, $capture$$inline_132_opt_capture$$3$$, $opt_handler$$11_opt_handler$$inline_131$$)
    }
  }else {
    a: {
      $listener$$inline_129_opt_fn$$2$$ = $listener$$inline_129_opt_fn$$2$$ || $JSCompiler_StaticMethods_unlisten$self$$;
      $opt_handler$$11_opt_handler$$inline_131$$ = $opt_handler$$11_opt_handler$$inline_131$$ || $JSCompiler_StaticMethods_unlisten$self$$.$handler_$ || $JSCompiler_StaticMethods_unlisten$self$$;
      $capture$$inline_132_opt_capture$$3$$ = !!$capture$$inline_132_opt_capture$$3$$;
      if($key$$49_listener$$43_listenerArray$$inline_133_src$$18$$ = $goog$events$getListeners_$$($key$$49_listener$$43_listenerArray$$inline_133_src$$18$$, $i$$inline_134_type$$71$$, $capture$$inline_132_opt_capture$$3$$)) {
        for($i$$inline_134_type$$71$$ = 0;$i$$inline_134_type$$71$$ < $key$$49_listener$$43_listenerArray$$inline_133_src$$18$$.length;$i$$inline_134_type$$71$$++) {
          if(!$key$$49_listener$$43_listenerArray$$inline_133_src$$18$$[$i$$inline_134_type$$71$$].$removed$ && $key$$49_listener$$43_listenerArray$$inline_133_src$$18$$[$i$$inline_134_type$$71$$].$listener$ == $listener$$inline_129_opt_fn$$2$$ && $key$$49_listener$$43_listenerArray$$inline_133_src$$18$$[$i$$inline_134_type$$71$$].capture == $capture$$inline_132_opt_capture$$3$$ && $key$$49_listener$$43_listenerArray$$inline_133_src$$18$$[$i$$inline_134_type$$71$$].$handler$ == $opt_handler$$11_opt_handler$$inline_131$$) {
            $key$$49_listener$$43_listenerArray$$inline_133_src$$18$$ = $key$$49_listener$$43_listenerArray$$inline_133_src$$18$$[$i$$inline_134_type$$71$$];
            break a
          }
        }
      }
      $key$$49_listener$$43_listenerArray$$inline_133_src$$18$$ = $JSCompiler_alias_NULL$$
    }
    $key$$49_listener$$43_listenerArray$$inline_133_src$$18$$ && ($key$$49_listener$$43_listenerArray$$inline_133_src$$18$$ = $key$$49_listener$$43_listenerArray$$inline_133_src$$18$$.key, $goog$events$unlistenByKey$$($key$$49_listener$$43_listenerArray$$inline_133_src$$18$$), $goog$array$remove$$($JSCompiler_StaticMethods_unlisten$self$$.$keys_$, $key$$49_listener$$43_listenerArray$$inline_133_src$$18$$))
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
  for(var $classes$$ = $goog$dom$classes$get$$($element$$7$$), $args$$3_args$$inline_137$$ = $goog$array$slice$$(arguments, 1), $expectedCount$$ = $classes$$.length + $args$$3_args$$inline_137$$.length, $classes$$inline_136$$ = $classes$$, $i$$inline_138$$ = 0;$i$$inline_138$$ < $args$$3_args$$inline_137$$.length;$i$$inline_138$$++) {
    $goog$array$contains$$($classes$$inline_136$$, $args$$3_args$$inline_137$$[$i$$inline_138$$]) || $classes$$inline_136$$.push($args$$3_args$$inline_137$$[$i$$inline_138$$])
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
  this.x = $opt_x$$ !== $JSCompiler_alias_VOID$$ ? $opt_x$$ : 0;
  this.y = $opt_y$$ !== $JSCompiler_alias_VOID$$ ? $opt_y$$ : 0
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
;function $goog$math$Size$$($width$$12$$, $height$$11$$) {
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
  $el$$2_win$$ = "CSS1Compat" == $doc$$6_innerHeight$$.compatMode ? $doc$$6_innerHeight$$.documentElement : $doc$$6_innerHeight$$.body;
  return new $goog$math$Size$$($el$$2_win$$.clientWidth, $el$$2_win$$.clientHeight)
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
var $goog$dom$TAGS_TO_IGNORE_$$ = {SCRIPT:1, STYLE:1, HEAD:1, IFRAME:1, OBJECT:1}, $goog$dom$PREDEFINED_TAG_VALUES_$$ = {IMG:" ", BR:"\n"};
function $goog$dom$isFocusableTabIndex$$($element$$22_index$$54$$) {
  var $attrNode$$ = $element$$22_index$$54$$.getAttributeNode("tabindex");
  return $attrNode$$ && $attrNode$$.specified ? ($element$$22_index$$54$$ = $element$$22_index$$54$$.tabIndex, $goog$isNumber$$($element$$22_index$$54$$) && 0 <= $element$$22_index$$54$$ && 32768 > $element$$22_index$$54$$) : $JSCompiler_alias_FALSE$$
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
function $JSCompiler_StaticMethods_getDocumentScroll$$($JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_142$$) {
  var $doc$$inline_141_win$$inline_143$$ = $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_142$$.$document_$, $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_142$$ = !$goog$userAgent$WEBKIT$$ && "CSS1Compat" == $doc$$inline_141_win$$inline_143$$.compatMode ? $doc$$inline_141_win$$inline_143$$.documentElement : $doc$$inline_141_win$$inline_143$$.body, $doc$$inline_141_win$$inline_143$$ = $doc$$inline_141_win$$inline_143$$.parentWindow || $doc$$inline_141_win$$inline_143$$.defaultView;
  return new $goog$math$Coordinate$$($doc$$inline_141_win$$inline_143$$.pageXOffset || $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_142$$.scrollLeft, $doc$$inline_141_win$$inline_143$$.pageYOffset || $JSCompiler_StaticMethods_getDocumentScroll$self_el$$inline_142$$.scrollTop)
}
$JSCompiler_prototypeAlias$$.appendChild = function $$JSCompiler_prototypeAlias$$$appendChild$($parent$$9$$, $child$$2$$) {
  $parent$$9$$.appendChild($child$$2$$)
};
$JSCompiler_prototypeAlias$$.append = function $$JSCompiler_prototypeAlias$$$append$($parent$$10$$, $var_args$$54$$) {
  $goog$dom$append_$$($goog$dom$getOwnerDocument$$($parent$$10$$), $parent$$10$$, arguments, 1)
};
function $JSCompiler_StaticMethods_getFirstElementChild$$($JSCompiler_StaticMethods_getFirstElementChild$self$$, $node$$6$$) {
  var $JSCompiler_temp$$30_node$$inline_145$$;
  if($node$$6$$.firstElementChild != $JSCompiler_alias_VOID$$) {
    $JSCompiler_temp$$30_node$$inline_145$$ = $node$$6$$.firstElementChild
  }else {
    for($JSCompiler_temp$$30_node$$inline_145$$ = $node$$6$$.firstChild;$JSCompiler_temp$$30_node$$inline_145$$ && 1 != $JSCompiler_temp$$30_node$$inline_145$$.nodeType;) {
      $JSCompiler_temp$$30_node$$inline_145$$ = $JSCompiler_temp$$30_node$$inline_145$$.nextSibling
    }
  }
  return $JSCompiler_temp$$30_node$$inline_145$$
}
$JSCompiler_prototypeAlias$$.contains = $goog$dom$contains$$;
function $goog$style$getStyle_$$($element$$33$$, $style$$3$$) {
  var $JSCompiler_inline_result$$148_doc$$inline_151_styles$$inline_152$$;
  a: {
    $JSCompiler_inline_result$$148_doc$$inline_151_styles$$inline_152$$ = $goog$dom$getOwnerDocument$$($element$$33$$);
    if($JSCompiler_inline_result$$148_doc$$inline_151_styles$$inline_152$$.defaultView && $JSCompiler_inline_result$$148_doc$$inline_151_styles$$inline_152$$.defaultView.getComputedStyle && ($JSCompiler_inline_result$$148_doc$$inline_151_styles$$inline_152$$ = $JSCompiler_inline_result$$148_doc$$inline_151_styles$$inline_152$$.defaultView.getComputedStyle($element$$33$$, $JSCompiler_alias_NULL$$))) {
      $JSCompiler_inline_result$$148_doc$$inline_151_styles$$inline_152$$ = $JSCompiler_inline_result$$148_doc$$inline_151_styles$$inline_152$$[$style$$3$$] || $JSCompiler_inline_result$$148_doc$$inline_151_styles$$inline_152$$.getPropertyValue($style$$3$$);
      break a
    }
    $JSCompiler_inline_result$$148_doc$$inline_151_styles$$inline_152$$ = ""
  }
  return $JSCompiler_inline_result$$148_doc$$inline_151_styles$$inline_152$$ || ($element$$33$$.currentStyle ? $element$$33$$.currentStyle[$style$$3$$] : $JSCompiler_alias_NULL$$) || $element$$33$$.style && $element$$33$$.style[$style$$3$$]
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
function $goog$style$getRelativePosition$$($a$$19_ap$$) {
  var $b$$18_bp$$ = document.documentElement, $a$$19_ap$$ = $goog$style$getClientPosition$$($a$$19_ap$$), $b$$18_bp$$ = $goog$style$getClientPosition$$($b$$18_bp$$);
  return new $goog$math$Coordinate$$($a$$19_ap$$.x - $b$$18_bp$$.x, $a$$19_ap$$.y - $b$$18_bp$$.y)
}
function $goog$style$getClientPosition$$($box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$) {
  var $pos$$4$$ = new $goog$math$Coordinate$$;
  if(1 == $box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$.nodeType) {
    if($box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$.getBoundingClientRect) {
      $box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$ = $goog$style$getBoundingClientRect_$$($box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$), $pos$$4$$.x = $box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$.left, $pos$$4$$.y = $box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$.top
    }else {
      var $isAbstractedEvent_scrollCoord$$1$$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$($box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$));
      var $box$$inline_158_doc$$inline_712$$, $doc$$inline_159$$ = $goog$dom$getOwnerDocument$$($box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$), $positionStyle$$inline_160$$ = $goog$style$getStyle_$$($box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$, "position"), $BUGGY_GECKO_BOX_OBJECT$$inline_161_parent$$inline_166$$ = $goog$userAgent$GECKO$$ && $doc$$inline_159$$.getBoxObjectFor && !$box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$.getBoundingClientRect && "absolute" == 
      $positionStyle$$inline_160$$ && ($box$$inline_158_doc$$inline_712$$ = $doc$$inline_159$$.getBoxObjectFor($box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$)) && (0 > $box$$inline_158_doc$$inline_712$$.screenX || 0 > $box$$inline_158_doc$$inline_712$$.screenY), $pos$$inline_162_targetEvent$$ = new $goog$math$Coordinate$$(0, 0), $JSCompiler_temp$$inline_713_JSCompiler_temp$$inline_714_viewportElement$$inline_163$$;
      $box$$inline_158_doc$$inline_712$$ = $doc$$inline_159$$ ? 9 == $doc$$inline_159$$.nodeType ? $doc$$inline_159$$ : $goog$dom$getOwnerDocument$$($doc$$inline_159$$) : document;
      if($JSCompiler_temp$$inline_713_JSCompiler_temp$$inline_714_viewportElement$$inline_163$$ = $goog$userAgent$IE$$) {
        if($JSCompiler_temp$$inline_713_JSCompiler_temp$$inline_714_viewportElement$$inline_163$$ = !$goog$userAgent$isDocumentMode$$(9)) {
          $JSCompiler_temp$$inline_713_JSCompiler_temp$$inline_714_viewportElement$$inline_163$$ = "CSS1Compat" != $goog$dom$getDomHelper$$($box$$inline_158_doc$$inline_712$$).$document_$.compatMode
        }
      }
      $JSCompiler_temp$$inline_713_JSCompiler_temp$$inline_714_viewportElement$$inline_163$$ = $JSCompiler_temp$$inline_713_JSCompiler_temp$$inline_714_viewportElement$$inline_163$$ ? $box$$inline_158_doc$$inline_712$$.body : $box$$inline_158_doc$$inline_712$$.documentElement;
      if($box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$ != $JSCompiler_temp$$inline_713_JSCompiler_temp$$inline_714_viewportElement$$inline_163$$) {
        if($box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$.getBoundingClientRect) {
          $box$$inline_158_doc$$inline_712$$ = $goog$style$getBoundingClientRect_$$($box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$), $box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$($doc$$inline_159$$)), $pos$$inline_162_targetEvent$$.x = $box$$inline_158_doc$$inline_712$$.left + $box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$.x, $pos$$inline_162_targetEvent$$.y = $box$$inline_158_doc$$inline_712$$.top + 
          $box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$.y
        }else {
          if($doc$$inline_159$$.getBoxObjectFor && !$BUGGY_GECKO_BOX_OBJECT$$inline_161_parent$$inline_166$$) {
            $box$$inline_158_doc$$inline_712$$ = $doc$$inline_159$$.getBoxObjectFor($box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$), $box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$ = $doc$$inline_159$$.getBoxObjectFor($JSCompiler_temp$$inline_713_JSCompiler_temp$$inline_714_viewportElement$$inline_163$$), $pos$$inline_162_targetEvent$$.x = $box$$inline_158_doc$$inline_712$$.screenX - $box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$.screenX, $pos$$inline_162_targetEvent$$.y = 
            $box$$inline_158_doc$$inline_712$$.screenY - $box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$.screenY
          }else {
            $BUGGY_GECKO_BOX_OBJECT$$inline_161_parent$$inline_166$$ = $box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$;
            do {
              $pos$$inline_162_targetEvent$$.x += $BUGGY_GECKO_BOX_OBJECT$$inline_161_parent$$inline_166$$.offsetLeft;
              $pos$$inline_162_targetEvent$$.y += $BUGGY_GECKO_BOX_OBJECT$$inline_161_parent$$inline_166$$.offsetTop;
              $BUGGY_GECKO_BOX_OBJECT$$inline_161_parent$$inline_166$$ != $box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$ && ($pos$$inline_162_targetEvent$$.x += $BUGGY_GECKO_BOX_OBJECT$$inline_161_parent$$inline_166$$.clientLeft || 0, $pos$$inline_162_targetEvent$$.y += $BUGGY_GECKO_BOX_OBJECT$$inline_161_parent$$inline_166$$.clientTop || 0);
              if($goog$userAgent$WEBKIT$$ && "fixed" == $goog$style$getStyle_$$($BUGGY_GECKO_BOX_OBJECT$$inline_161_parent$$inline_166$$, "position")) {
                $pos$$inline_162_targetEvent$$.x += $doc$$inline_159$$.body.scrollLeft;
                $pos$$inline_162_targetEvent$$.y += $doc$$inline_159$$.body.scrollTop;
                break
              }
              $BUGGY_GECKO_BOX_OBJECT$$inline_161_parent$$inline_166$$ = $BUGGY_GECKO_BOX_OBJECT$$inline_161_parent$$inline_166$$.offsetParent
            }while($BUGGY_GECKO_BOX_OBJECT$$inline_161_parent$$inline_166$$ && $BUGGY_GECKO_BOX_OBJECT$$inline_161_parent$$inline_166$$ != $box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$);
            if($goog$userAgent$OPERA$$ || $goog$userAgent$WEBKIT$$ && "absolute" == $positionStyle$$inline_160$$) {
              $pos$$inline_162_targetEvent$$.y -= $doc$$inline_159$$.body.offsetTop
            }
            for($BUGGY_GECKO_BOX_OBJECT$$inline_161_parent$$inline_166$$ = $box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$;($BUGGY_GECKO_BOX_OBJECT$$inline_161_parent$$inline_166$$ = $goog$style$getOffsetParent$$($BUGGY_GECKO_BOX_OBJECT$$inline_161_parent$$inline_166$$)) && $BUGGY_GECKO_BOX_OBJECT$$inline_161_parent$$inline_166$$ != $doc$$inline_159$$.body && $BUGGY_GECKO_BOX_OBJECT$$inline_161_parent$$inline_166$$ != $JSCompiler_temp$$inline_713_JSCompiler_temp$$inline_714_viewportElement$$inline_163$$;) {
              if($pos$$inline_162_targetEvent$$.x -= $BUGGY_GECKO_BOX_OBJECT$$inline_161_parent$$inline_166$$.scrollLeft, !$goog$userAgent$OPERA$$ || "TR" != $BUGGY_GECKO_BOX_OBJECT$$inline_161_parent$$inline_166$$.tagName) {
                $pos$$inline_162_targetEvent$$.y -= $BUGGY_GECKO_BOX_OBJECT$$inline_161_parent$$inline_166$$.scrollTop
              }
            }
          }
        }
      }
      $pos$$4$$.x = $pos$$inline_162_targetEvent$$.x - $isAbstractedEvent_scrollCoord$$1$$.x;
      $pos$$4$$.y = $pos$$inline_162_targetEvent$$.y - $isAbstractedEvent_scrollCoord$$1$$.y
    }
  }else {
    $isAbstractedEvent_scrollCoord$$1$$ = $goog$isFunction$$($box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$.$getBrowserEvent$), $pos$$inline_162_targetEvent$$ = $box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$, $box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$.targetTouches ? $pos$$inline_162_targetEvent$$ = $box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$.targetTouches[0] : $isAbstractedEvent_scrollCoord$$1$$ && $box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$.$event_$.targetTouches && 
    ($pos$$inline_162_targetEvent$$ = $box$$6_el$$12_scrollCoord$$inline_164_vpBox$$inline_165$$.$event_$.targetTouches[0]), $pos$$4$$.x = $pos$$inline_162_targetEvent$$.clientX, $pos$$4$$.y = $pos$$inline_162_targetEvent$$.clientY
  }
  return $pos$$4$$
}
function $goog$style$getPixelStyleValue_$$($value$$57$$) {
  "number" == typeof $value$$57$$ && ($value$$57$$ = Math.round($value$$57$$) + "px");
  return $value$$57$$
}
var $goog$style$unselectableStyle_$$ = $goog$userAgent$GECKO$$ ? "MozUserSelect" : $goog$userAgent$WEBKIT$$ ? "WebkitUserSelect" : $JSCompiler_alias_NULL$$;
function $goog$ui$IdGenerator$$() {
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
    var $obj$$inline_717$$ = $JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$, $key$$inline_718$$ = $JSCompiler_StaticMethods_setId$self$$.$id_$;
    $key$$inline_718$$ in $obj$$inline_717$$ && delete $obj$$inline_717$$[$key$$inline_718$$];
    $goog$object$add$$($JSCompiler_StaticMethods_setId$self$$.$parent_$.$childIndex_$, $id$$4$$, $JSCompiler_StaticMethods_setId$self$$)
  }
  $JSCompiler_StaticMethods_setId$self$$.$id_$ = $id$$4$$
}
$JSCompiler_prototypeAlias$$.$getElement$ = $JSCompiler_get$$("$element_$");
function $JSCompiler_StaticMethods_getHandler$$($JSCompiler_StaticMethods_getHandler$self$$) {
  return $JSCompiler_StaticMethods_getHandler$self$$.$googUiComponentHandler_$ || ($JSCompiler_StaticMethods_getHandler$self$$.$googUiComponentHandler_$ = new $goog$events$EventHandler$$($JSCompiler_StaticMethods_getHandler$self$$))
}
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
  var $index$$inline_180$$ = $JSCompiler_StaticMethods_addChild$self$$.$children_$ ? $JSCompiler_StaticMethods_addChild$self$$.$children_$.length : 0;
  $child$$11$$.$inDocument_$ && !$JSCompiler_StaticMethods_addChild$self$$.$inDocument_$ && $JSCompiler_alias_THROW$$(Error("Component already rendered"));
  (0 > $index$$inline_180$$ || $index$$inline_180$$ > ($JSCompiler_StaticMethods_addChild$self$$.$children_$ ? $JSCompiler_StaticMethods_addChild$self$$.$children_$.length : 0)) && $JSCompiler_alias_THROW$$(Error("Child component index out of bounds"));
  if(!$JSCompiler_StaticMethods_addChild$self$$.$childIndex_$ || !$JSCompiler_StaticMethods_addChild$self$$.$children_$) {
    $JSCompiler_StaticMethods_addChild$self$$.$childIndex_$ = {}, $JSCompiler_StaticMethods_addChild$self$$.$children_$ = []
  }
  if($child$$11$$.getParent() == $JSCompiler_StaticMethods_addChild$self$$) {
    var $contentElement$$inline_182_key$$inline_721$$ = $JSCompiler_StaticMethods_getId$$($child$$11$$);
    $JSCompiler_StaticMethods_addChild$self$$.$childIndex_$[$contentElement$$inline_182_key$$inline_721$$] = $child$$11$$;
    $goog$array$remove$$($JSCompiler_StaticMethods_addChild$self$$.$children_$, $child$$11$$)
  }else {
    $goog$object$add$$($JSCompiler_StaticMethods_addChild$self$$.$childIndex_$, $JSCompiler_StaticMethods_getId$$($child$$11$$), $child$$11$$)
  }
  $JSCompiler_StaticMethods_setParent$$($child$$11$$, $JSCompiler_StaticMethods_addChild$self$$);
  $goog$array$splice$$($JSCompiler_StaticMethods_addChild$self$$.$children_$, $index$$inline_180$$, 0, $child$$11$$);
  $child$$11$$.$inDocument_$ && $JSCompiler_StaticMethods_addChild$self$$.$inDocument_$ && $child$$11$$.getParent() == $JSCompiler_StaticMethods_addChild$self$$ ? ($contentElement$$inline_182_key$$inline_721$$ = $JSCompiler_StaticMethods_addChild$self$$.$getContentElement$(), $contentElement$$inline_182_key$$inline_721$$.insertBefore($child$$11$$.$getElement$(), $contentElement$$inline_182_key$$inline_721$$.childNodes[$index$$inline_180$$] || $JSCompiler_alias_NULL$$)) : $JSCompiler_StaticMethods_addChild$self$$.$inDocument_$ && 
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
      var $obj$$inline_728$$ = this.$childIndex_$;
      $id$$7$$ in $obj$$inline_728$$ && delete $obj$$inline_728$$[$id$$7$$];
      $goog$array$remove$$(this.$children_$, $child$$15$$);
      $opt_unrender$$ && ($child$$15$$.$exitDocument$(), $child$$15$$.$element_$ && $goog$dom$removeNode$$($child$$15$$.$element_$));
      $JSCompiler_StaticMethods_setParent$$($child$$15$$, $JSCompiler_alias_NULL$$)
    }
  }
  $child$$15$$ || $JSCompiler_alias_THROW$$(Error("Child is not in parent component"));
  return $child$$15$$
};
function $goog$ui$ControlRenderer$$() {
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
        var $JSCompiler_temp_const$$9$$ = $state$$2$$;
        if(!this.$stateByClass_$) {
          this.$classByState_$ || $JSCompiler_StaticMethods_createClassByStateMap_$$(this);
          var $obj$$inline_969$$ = this.$classByState_$, $transposed$$inline_970$$ = {}, $key$$inline_971$$;
          for($key$$inline_971$$ in $obj$$inline_969$$) {
            $transposed$$inline_970$$[$obj$$inline_969$$[$key$$inline_971$$]] = $key$$inline_971$$
          }
          this.$stateByClass_$ = $transposed$$inline_970$$
        }
        $className$$18_state$$inline_199$$ = parseInt(this.$stateByClass_$[$className$$18_state$$inline_199$$], 10);
        $state$$2$$ = $JSCompiler_temp_const$$9$$ | (isNaN($className$$18_state$$inline_199$$) ? 0 : $className$$18_state$$inline_199$$)
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
  $control$$4$$.$rightToLeft_$ == $JSCompiler_alias_NULL$$ && ($control$$4$$.$rightToLeft_$ = "rtl" == $goog$style$getStyle_$$($control$$4$$.$inDocument_$ ? $control$$4$$.$element_$ : $control$$4$$.$dom_$.$document_$.body, "direction"));
  $control$$4$$.$rightToLeft_$ && this.$setRightToLeft$($control$$4$$.$getElement$(), $JSCompiler_alias_TRUE$$);
  $control$$4$$.isEnabled() && this.$setFocusable$($control$$4$$, $control$$4$$.$visible_$)
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
  var $element$$inline_218_keyTarget$$1$$;
  if($control$$7$$.$supportedStates_$ & 32 && ($element$$inline_218_keyTarget$$1$$ = $control$$7$$.$getKeyEventTarget$())) {
    if(!$focusable$$ && $control$$7$$.$state_$ & 32) {
      try {
        $element$$inline_218_keyTarget$$1$$.blur()
      }catch($e$$20$$) {
      }
      $control$$7$$.$state_$ & 32 && $control$$7$$.$handleBlur$()
    }
    $goog$dom$isFocusableTabIndex$$($element$$inline_218_keyTarget$$1$$) != $focusable$$ && ($focusable$$ ? $element$$inline_218_keyTarget$$1$$.tabIndex = 0 : ($element$$inline_218_keyTarget$$1$$.tabIndex = -1, $element$$inline_218_keyTarget$$1$$.removeAttribute("tabIndex")))
  }
};
$JSCompiler_prototypeAlias$$.$setVisible$ = function $$JSCompiler_prototypeAlias$$$$setVisible$$($element$$84$$, $visible$$) {
  $element$$84$$.style.display = $visible$$ ? "" : "none"
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
$JSCompiler_prototypeAlias$$.$getKeyEventTarget$ = function $$JSCompiler_prototypeAlias$$$$getKeyEventTarget$$($control$$9$$) {
  return $control$$9$$.$getElement$()
};
$JSCompiler_prototypeAlias$$.$getCssClass$ = $JSCompiler_returnArg$$("goog-control");
function $JSCompiler_StaticMethods_getClassNames$$($JSCompiler_StaticMethods_getClassNames$self$$, $control$$10$$) {
  var $cssClass_extraClassNames$$1_state$$inline_229$$ = $JSCompiler_StaticMethods_getClassNames$self$$.$getCssClass$(), $classNames$$2$$ = [$cssClass_extraClassNames$$1_state$$inline_229$$], $classNames$$inline_230_structuralCssClass$$ = $JSCompiler_StaticMethods_getClassNames$self$$.$getCssClass$();
  $classNames$$inline_230_structuralCssClass$$ != $cssClass_extraClassNames$$1_state$$inline_229$$ && $classNames$$2$$.push($classNames$$inline_230_structuralCssClass$$);
  $cssClass_extraClassNames$$1_state$$inline_229$$ = $control$$10$$.$state_$;
  for($classNames$$inline_230_structuralCssClass$$ = [];$cssClass_extraClassNames$$1_state$$inline_229$$;) {
    var $mask$$inline_231$$ = $cssClass_extraClassNames$$1_state$$inline_229$$ & -$cssClass_extraClassNames$$1_state$$inline_229$$;
    $classNames$$inline_230_structuralCssClass$$.push($JSCompiler_StaticMethods_getClassForState$$($JSCompiler_StaticMethods_getClassNames$self$$, $mask$$inline_231$$));
    $cssClass_extraClassNames$$1_state$$inline_229$$ &= ~$mask$$inline_231$$
  }
  $classNames$$2$$.push.apply($classNames$$2$$, $classNames$$inline_230_structuralCssClass$$);
  ($cssClass_extraClassNames$$1_state$$inline_229$$ = $control$$10$$.$extraClassNames_$) && $classNames$$2$$.push.apply($classNames$$2$$, $cssClass_extraClassNames$$1_state$$inline_229$$);
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
  $opt_element$$11$$ && $JSCompiler_StaticMethods_attach$$(this, $opt_element$$11$$, $opt_capture$$6$$)
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
function $JSCompiler_StaticMethods_attach$$($JSCompiler_StaticMethods_attach$self$$, $element$$90$$, $opt_capture$$7$$) {
  $JSCompiler_StaticMethods_attach$self$$.$keyUpKey_$ && $JSCompiler_StaticMethods_attach$self$$.detach();
  $JSCompiler_StaticMethods_attach$self$$.$element_$ = $element$$90$$;
  $JSCompiler_StaticMethods_attach$self$$.$keyPressKey_$ = $goog$events$listen$$($JSCompiler_StaticMethods_attach$self$$.$element_$, "keypress", $JSCompiler_StaticMethods_attach$self$$, $opt_capture$$7$$);
  $JSCompiler_StaticMethods_attach$self$$.$keyDownKey_$ = $goog$events$listen$$($JSCompiler_StaticMethods_attach$self$$.$element_$, "keydown", $JSCompiler_StaticMethods_attach$self$$.$handleKeyDown_$, $opt_capture$$7$$, $JSCompiler_StaticMethods_attach$self$$);
  $JSCompiler_StaticMethods_attach$self$$.$keyUpKey_$ = $goog$events$listen$$($JSCompiler_StaticMethods_attach$self$$.$element_$, "keyup", $JSCompiler_StaticMethods_attach$self$$.$handleKeyup_$, $opt_capture$$7$$, $JSCompiler_StaticMethods_attach$self$$)
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
function $goog$ui$Control$$($content$$3$$, $JSCompiler_temp$$26_componentCtor$$inline_237_opt_renderer$$, $opt_domHelper$$1$$) {
  $goog$ui$Component$$.call(this, $opt_domHelper$$1$$);
  if(!$JSCompiler_temp$$26_componentCtor$$inline_237_opt_renderer$$) {
    for(var $JSCompiler_temp$$26_componentCtor$$inline_237_opt_renderer$$ = this.constructor, $key$$inline_238_rendererCtor$$inline_239$$;$JSCompiler_temp$$26_componentCtor$$inline_237_opt_renderer$$;) {
      $key$$inline_238_rendererCtor$$inline_239$$ = $goog$getUid$$($JSCompiler_temp$$26_componentCtor$$inline_237_opt_renderer$$);
      if($key$$inline_238_rendererCtor$$inline_239$$ = $goog$ui$registry$defaultRenderers_$$[$key$$inline_238_rendererCtor$$inline_239$$]) {
        break
      }
      $JSCompiler_temp$$26_componentCtor$$inline_237_opt_renderer$$ = $JSCompiler_temp$$26_componentCtor$$inline_237_opt_renderer$$.$superClass_$ ? $JSCompiler_temp$$26_componentCtor$$inline_237_opt_renderer$$.$superClass_$.constructor : $JSCompiler_alias_NULL$$
    }
    $JSCompiler_temp$$26_componentCtor$$inline_237_opt_renderer$$ = $key$$inline_238_rendererCtor$$inline_239$$ ? $goog$isFunction$$($key$$inline_238_rendererCtor$$inline_239$$.$getInstance$) ? $key$$inline_238_rendererCtor$$inline_239$$.$getInstance$() : new $key$$inline_238_rendererCtor$$inline_239$$ : $JSCompiler_alias_NULL$$
  }
  this.$renderer_$ = $JSCompiler_temp$$26_componentCtor$$inline_237_opt_renderer$$;
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
  var $ariaRole$$inline_266$$ = this.$preferredAriaRole_$ || this.$renderer_$.$getAriaRole$();
  $ariaRole$$inline_266$$ && ($element$$91$$.setAttribute("role", $ariaRole$$inline_266$$), $element$$91$$.$roleName$ = $ariaRole$$inline_266$$);
  this.$allowTextSelection_$ || this.$renderer_$.$setAllowTextSelection$($element$$91$$, $JSCompiler_alias_FALSE$$);
  this.$visible_$ || this.$renderer_$.$setVisible$($element$$91$$, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$getContentElement$ = function $$JSCompiler_prototypeAlias$$$$getContentElement$$() {
  return this.$renderer_$.$getContentElement$(this.$getElement$())
};
$JSCompiler_prototypeAlias$$.$canDecorate$ = function $$JSCompiler_prototypeAlias$$$$canDecorate$$($element$$92$$) {
  return this.$renderer_$.$canDecorate$($element$$92$$)
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($element$$93$$) {
  this.$element_$ = $element$$93$$ = this.$renderer_$.$decorate$(this, $element$$93$$);
  var $ariaRole$$inline_274$$ = this.$preferredAriaRole_$ || this.$renderer_$.$getAriaRole$();
  if($ariaRole$$inline_274$$) {
    var $element$$inline_746$$ = $element$$93$$;
    $element$$inline_746$$.setAttribute("role", $ariaRole$$inline_274$$);
    $element$$inline_746$$.$roleName$ = $ariaRole$$inline_274$$
  }
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
      $JSCompiler_StaticMethods_attach$$($keyHandler$$, $keyTarget$$2$$);
      $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_getHandler$$(this), $keyHandler$$, "key", this.$handleKeyEvent$), $keyTarget$$2$$, "focus", this.$handleFocus$), $keyTarget$$2$$, "blur", this.$handleBlur$)
    }
  }
};
function $JSCompiler_StaticMethods_enableMouseEventHandling_$$($JSCompiler_StaticMethods_enableMouseEventHandling_$self$$, $enable$$7$$) {
  var $handler$$5$$ = $JSCompiler_StaticMethods_getHandler$$($JSCompiler_StaticMethods_enableMouseEventHandling_$self$$), $element$$94$$ = $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$getElement$();
  $enable$$7$$ ? ($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($handler$$5$$, $element$$94$$, "mouseover", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOver$), $element$$94$$, "mousedown", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseDown$), $element$$94$$, "mouseup", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseUp$), $element$$94$$, 
  "mouseout", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOut$), $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_listen$$($handler$$5$$, $element$$94$$, "dblclick", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleDblClick$)) : ($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($JSCompiler_StaticMethods_unlisten$$($handler$$5$$, $element$$94$$, "mouseover", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOver$), 
  $element$$94$$, "mousedown", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseDown$), $element$$94$$, "mouseup", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseUp$), $element$$94$$, "mouseout", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleMouseOut$), $goog$userAgent$IE$$ && $JSCompiler_StaticMethods_unlisten$$($handler$$5$$, $element$$94$$, "dblclick", $JSCompiler_StaticMethods_enableMouseEventHandling_$self$$.$handleDblClick$))
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
function $JSCompiler_StaticMethods_setContentInternal$$($JSCompiler_StaticMethods_setContentInternal$self$$, $content$$5$$) {
  $JSCompiler_StaticMethods_setContentInternal$self$$.$content_$ = $content$$5$$
}
function $JSCompiler_StaticMethods_getCaption$$($JSCompiler_StaticMethods_getCaption$self_JSCompiler_temp$$27_JSCompiler_temp$$28_content$$6_textContent$$inline_277$$) {
  $JSCompiler_StaticMethods_getCaption$self_JSCompiler_temp$$27_JSCompiler_temp$$28_content$$6_textContent$$inline_277$$ = $JSCompiler_StaticMethods_getCaption$self_JSCompiler_temp$$27_JSCompiler_temp$$28_content$$6_textContent$$inline_277$$.$content_$;
  if(!$JSCompiler_StaticMethods_getCaption$self_JSCompiler_temp$$27_JSCompiler_temp$$28_content$$6_textContent$$inline_277$$) {
    return""
  }
  if(!$goog$isString$$($JSCompiler_StaticMethods_getCaption$self_JSCompiler_temp$$27_JSCompiler_temp$$28_content$$6_textContent$$inline_277$$)) {
    if($goog$isArray$$($JSCompiler_StaticMethods_getCaption$self_JSCompiler_temp$$27_JSCompiler_temp$$28_content$$6_textContent$$inline_277$$)) {
      $JSCompiler_StaticMethods_getCaption$self_JSCompiler_temp$$27_JSCompiler_temp$$28_content$$6_textContent$$inline_277$$ = $goog$array$map$$($JSCompiler_StaticMethods_getCaption$self_JSCompiler_temp$$27_JSCompiler_temp$$28_content$$6_textContent$$inline_277$$, $goog$dom$getRawTextContent$$).join("")
    }else {
      if($goog$dom$BrowserFeature$CAN_USE_INNER_TEXT$$ && "innerText" in $JSCompiler_StaticMethods_getCaption$self_JSCompiler_temp$$27_JSCompiler_temp$$28_content$$6_textContent$$inline_277$$) {
        $JSCompiler_StaticMethods_getCaption$self_JSCompiler_temp$$27_JSCompiler_temp$$28_content$$6_textContent$$inline_277$$ = $JSCompiler_StaticMethods_getCaption$self_JSCompiler_temp$$27_JSCompiler_temp$$28_content$$6_textContent$$inline_277$$.innerText.replace(/(\r\n|\r|\n)/g, "\n")
      }else {
        var $buf$$inline_278$$ = [];
        $goog$dom$getTextContent_$$($JSCompiler_StaticMethods_getCaption$self_JSCompiler_temp$$27_JSCompiler_temp$$28_content$$6_textContent$$inline_277$$, $buf$$inline_278$$, $JSCompiler_alias_TRUE$$);
        $JSCompiler_StaticMethods_getCaption$self_JSCompiler_temp$$27_JSCompiler_temp$$28_content$$6_textContent$$inline_277$$ = $buf$$inline_278$$.join("")
      }
      $JSCompiler_StaticMethods_getCaption$self_JSCompiler_temp$$27_JSCompiler_temp$$28_content$$6_textContent$$inline_277$$ = $JSCompiler_StaticMethods_getCaption$self_JSCompiler_temp$$27_JSCompiler_temp$$28_content$$6_textContent$$inline_277$$.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
      $JSCompiler_StaticMethods_getCaption$self_JSCompiler_temp$$27_JSCompiler_temp$$28_content$$6_textContent$$inline_277$$ = $JSCompiler_StaticMethods_getCaption$self_JSCompiler_temp$$27_JSCompiler_temp$$28_content$$6_textContent$$inline_277$$.replace(/\u200B/g, "");
      $goog$dom$BrowserFeature$CAN_USE_INNER_TEXT$$ || ($JSCompiler_StaticMethods_getCaption$self_JSCompiler_temp$$27_JSCompiler_temp$$28_content$$6_textContent$$inline_277$$ = $JSCompiler_StaticMethods_getCaption$self_JSCompiler_temp$$27_JSCompiler_temp$$28_content$$6_textContent$$inline_277$$.replace(/ +/g, " "));
      " " != $JSCompiler_StaticMethods_getCaption$self_JSCompiler_temp$$27_JSCompiler_temp$$28_content$$6_textContent$$inline_277$$ && ($JSCompiler_StaticMethods_getCaption$self_JSCompiler_temp$$27_JSCompiler_temp$$28_content$$6_textContent$$inline_277$$ = $JSCompiler_StaticMethods_getCaption$self_JSCompiler_temp$$27_JSCompiler_temp$$28_content$$6_textContent$$inline_277$$.replace(/^\s*/, ""))
    }
  }
  return $JSCompiler_StaticMethods_getCaption$self_JSCompiler_temp$$27_JSCompiler_temp$$28_content$$6_textContent$$inline_277$$.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
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
  var $parent$$inline_282$$ = this.getParent();
  if((!$parent$$inline_282$$ || "function" != typeof $parent$$inline_282$$.isEnabled || $parent$$inline_282$$.isEnabled()) && $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 1, !$enable$$8$$)) {
    $enable$$8$$ || (this.setActive($JSCompiler_alias_FALSE$$), $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_FALSE$$)), this.$visible_$ && this.$renderer_$.$setFocusable$(this, $enable$$8$$), this.$setState$(1, !$enable$$8$$)
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
  if(this.isEnabled() && ($JSCompiler_StaticMethods_isAutoState$$(this, 2) && $JSCompiler_StaticMethods_setHighlighted$$(this, $JSCompiler_alias_TRUE$$), $e$$28$$.$isButton$(0) && (!$goog$userAgent$WEBKIT$$ || !$goog$userAgent$detectedMac_$$ || !$e$$28$$.ctrlKey))) {
    $JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_TRUE$$), this.$renderer_$.$isFocusable$(this) && this.$getKeyEventTarget$().focus()
  }
  !this.$allowTextSelection_$ && ($e$$28$$.$isButton$(0) && (!$goog$userAgent$WEBKIT$$ || !$goog$userAgent$detectedMac_$$ || !$e$$28$$.ctrlKey)) && $e$$28$$.preventDefault()
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
    var $actionEvent_open$$inline_288$$ = !(this.$state_$ & 64);
    $JSCompiler_StaticMethods_isTransitionAllowed$$(this, 64, $actionEvent_open$$inline_288$$) && this.$setState$(64, $actionEvent_open$$inline_288$$)
  }
  $actionEvent_open$$inline_288$$ = new $goog$events$Event$$("action", this);
  $e$$31$$ && ($actionEvent_open$$inline_288$$.altKey = $e$$31$$.altKey, $actionEvent_open$$inline_288$$.ctrlKey = $e$$31$$.ctrlKey, $actionEvent_open$$inline_288$$.metaKey = $e$$31$$.metaKey, $actionEvent_open$$inline_288$$.shiftKey = $e$$31$$.shiftKey, $actionEvent_open$$inline_288$$.$platformModifierKey$ = $e$$31$$.$platformModifierKey$);
  return this.dispatchEvent($actionEvent_open$$inline_288$$)
};
$JSCompiler_prototypeAlias$$.$handleFocus$ = function $$JSCompiler_prototypeAlias$$$$handleFocus$$() {
  $JSCompiler_StaticMethods_isAutoState$$(this, 32) && $JSCompiler_StaticMethods_setFocused$$(this, $JSCompiler_alias_TRUE$$)
};
$JSCompiler_prototypeAlias$$.$handleBlur$ = function $$JSCompiler_prototypeAlias$$$$handleBlur$$() {
  $JSCompiler_StaticMethods_isAutoState$$(this, 4) && this.setActive($JSCompiler_alias_FALSE$$);
  $JSCompiler_StaticMethods_isAutoState$$(this, 32) && $JSCompiler_StaticMethods_setFocused$$(this, $JSCompiler_alias_FALSE$$)
};
$JSCompiler_prototypeAlias$$.$handleKeyEvent$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEvent$$($e$$34$$) {
  return this.$visible_$ && this.isEnabled() && this.$handleKeyEventInternal$($e$$34$$) ? ($e$$34$$.preventDefault(), $e$$34$$.stopPropagation(), $JSCompiler_alias_TRUE$$) : $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.$handleKeyEventInternal$ = function $$JSCompiler_prototypeAlias$$$$handleKeyEventInternal$$($e$$35$$) {
  return 13 == $e$$35$$.keyCode && this.$performActionInternal$($e$$35$$)
};
$goog$isFunction$$($goog$ui$Control$$) || $JSCompiler_alias_THROW$$(Error("Invalid component class " + $goog$ui$Control$$));
$goog$isFunction$$($goog$ui$ControlRenderer$$) || $JSCompiler_alias_THROW$$(Error("Invalid renderer class " + $goog$ui$ControlRenderer$$));
var $key$$inline_292$$ = $goog$getUid$$($goog$ui$Control$$);
$goog$ui$registry$defaultRenderers_$$[$key$$inline_292$$] = $goog$ui$ControlRenderer$$;
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
  var $element$$100$$ = $goog$ui$ButtonRenderer$$.$superClass_$.$decorate$.call(this, $button$$2$$, $element$$100$$), $value$$inline_299$$ = this.$getValue$($element$$100$$);
  $button$$2$$.$value_$ = $value$$inline_299$$;
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
  $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_getHandler$$($button$$6$$), $button$$6$$.$getElement$(), "click", $button$$6$$.$performActionInternal$)
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
    $keyTarget$$3$$ && $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_getHandler$$(this), $keyTarget$$3$$, "keyup", this.$handleKeyEventInternal$)
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
  var $JSCompiler_inline_result$$307_inner$$inline_312_outer$$inline_311$$;
  a: {
    if(($JSCompiler_inline_result$$307_inner$$inline_312_outer$$inline_311$$ = $JSCompiler_StaticMethods_getFirstElementChild$$($button$$15$$.$getDomHelper$(), $element$$116$$)) && -1 != $JSCompiler_inline_result$$307_inner$$inline_312_outer$$inline_311$$.className.indexOf(this.$getCssClass$() + "-outer-box")) {
      if(($JSCompiler_inline_result$$307_inner$$inline_312_outer$$inline_311$$ = $JSCompiler_StaticMethods_getFirstElementChild$$($button$$15$$.$getDomHelper$(), $JSCompiler_inline_result$$307_inner$$inline_312_outer$$inline_311$$)) && -1 != $JSCompiler_inline_result$$307_inner$$inline_312_outer$$inline_311$$.className.indexOf(this.$getCssClass$() + "-inner-box")) {
        $JSCompiler_inline_result$$307_inner$$inline_312_outer$$inline_311$$ = $JSCompiler_alias_TRUE$$;
        break a
      }
    }
    $JSCompiler_inline_result$$307_inner$$inline_312_outer$$inline_311$$ = $JSCompiler_alias_FALSE$$
  }
  $JSCompiler_inline_result$$307_inner$$inline_312_outer$$inline_311$$ || $element$$116$$.appendChild($JSCompiler_StaticMethods_createButton$$(this, $element$$116$$.childNodes, $button$$15$$.$getDomHelper$()));
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
function $goog$i18n$TimeZone$createTimeZone$$($offset$$inline_753_str$$inline_317_timeZoneData$$) {
  if("number" == typeof $offset$$inline_753_str$$inline_317_timeZoneData$$) {
    var $tz$$1_tz$$inline_316$$ = new $goog$i18n$TimeZone$$;
    $tz$$1_tz$$inline_316$$.$standardOffset_$ = $offset$$inline_753_str$$inline_317_timeZoneData$$;
    var $JSCompiler_inline_result$$749_offset$$inline_750_parts$$inline_754$$;
    $JSCompiler_inline_result$$749_offset$$inline_750_parts$$inline_754$$ = $offset$$inline_753_str$$inline_317_timeZoneData$$;
    if(0 == $JSCompiler_inline_result$$749_offset$$inline_750_parts$$inline_754$$) {
      $JSCompiler_inline_result$$749_offset$$inline_750_parts$$inline_754$$ = "Etc/GMT"
    }else {
      var $parts$$inline_751$$ = ["Etc/GMT", 0 > $JSCompiler_inline_result$$749_offset$$inline_750_parts$$inline_754$$ ? "-" : "+"];
      $JSCompiler_inline_result$$749_offset$$inline_750_parts$$inline_754$$ = Math.abs($JSCompiler_inline_result$$749_offset$$inline_750_parts$$inline_754$$);
      $parts$$inline_751$$.push(Math.floor($JSCompiler_inline_result$$749_offset$$inline_750_parts$$inline_754$$ / 60) % 100);
      $JSCompiler_inline_result$$749_offset$$inline_750_parts$$inline_754$$ %= 60;
      0 != $JSCompiler_inline_result$$749_offset$$inline_750_parts$$inline_754$$ && $parts$$inline_751$$.push(":", $goog$string$padNumber$$($JSCompiler_inline_result$$749_offset$$inline_750_parts$$inline_754$$, 2));
      $JSCompiler_inline_result$$749_offset$$inline_750_parts$$inline_754$$ = $parts$$inline_751$$.join("")
    }
    $tz$$1_tz$$inline_316$$.$timeZoneId_$ = $JSCompiler_inline_result$$749_offset$$inline_750_parts$$inline_754$$;
    0 == $offset$$inline_753_str$$inline_317_timeZoneData$$ ? $offset$$inline_753_str$$inline_317_timeZoneData$$ = "UTC" : ($JSCompiler_inline_result$$749_offset$$inline_750_parts$$inline_754$$ = ["UTC", 0 > $offset$$inline_753_str$$inline_317_timeZoneData$$ ? "+" : "-"], $offset$$inline_753_str$$inline_317_timeZoneData$$ = Math.abs($offset$$inline_753_str$$inline_317_timeZoneData$$), $JSCompiler_inline_result$$749_offset$$inline_750_parts$$inline_754$$.push(Math.floor($offset$$inline_753_str$$inline_317_timeZoneData$$ / 
    60) % 100), $offset$$inline_753_str$$inline_317_timeZoneData$$ %= 60, 0 != $offset$$inline_753_str$$inline_317_timeZoneData$$ && $JSCompiler_inline_result$$749_offset$$inline_750_parts$$inline_754$$.push(":", $offset$$inline_753_str$$inline_317_timeZoneData$$), $offset$$inline_753_str$$inline_317_timeZoneData$$ = $JSCompiler_inline_result$$749_offset$$inline_750_parts$$inline_754$$.join(""));
    $tz$$1_tz$$inline_316$$.$tzNames_$ = [$offset$$inline_753_str$$inline_317_timeZoneData$$, $offset$$inline_753_str$$inline_317_timeZoneData$$];
    $tz$$1_tz$$inline_316$$.$transitions_$ = [];
    return $tz$$1_tz$$inline_316$$
  }
  $tz$$1_tz$$inline_316$$ = new $goog$i18n$TimeZone$$;
  $tz$$1_tz$$inline_316$$.$timeZoneId_$ = $offset$$inline_753_str$$inline_317_timeZoneData$$.id;
  $tz$$1_tz$$inline_316$$.$standardOffset_$ = -$offset$$inline_753_str$$inline_317_timeZoneData$$.std_offset;
  $tz$$1_tz$$inline_316$$.$tzNames_$ = $offset$$inline_753_str$$inline_317_timeZoneData$$.names;
  $tz$$1_tz$$inline_316$$.$transitions_$ = $offset$$inline_753_str$$inline_317_timeZoneData$$.transitions;
  return $tz$$1_tz$$inline_316$$
}
function $JSCompiler_StaticMethods_getDaylightAdjustment$$($JSCompiler_StaticMethods_getDaylightAdjustment$self$$, $date$$13$$) {
  for(var $timeInHours$$ = Date.UTC($date$$13$$.getUTCFullYear(), $date$$13$$.getUTCMonth(), $date$$13$$.getUTCDate(), $date$$13$$.getUTCHours(), $date$$13$$.getUTCMinutes()) / 36E5, $index$$58$$ = 0;$index$$58$$ < $JSCompiler_StaticMethods_getDaylightAdjustment$self$$.$transitions_$.length && $timeInHours$$ >= $JSCompiler_StaticMethods_getDaylightAdjustment$self$$.$transitions_$[$index$$58$$];) {
    $index$$58$$ += 2
  }
  return 0 == $index$$58$$ ? 0 : $JSCompiler_StaticMethods_getDaylightAdjustment$self$$.$transitions_$[$index$$58$$ - 1]
}
;function $goog$i18n$DateTimeFormat$$($pattern$$1$$) {
  $goog$asserts$assert$$($pattern$$1$$ !== $JSCompiler_alias_VOID$$, "Pattern must be defined");
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
function $JSCompiler_StaticMethods_formatField_$$($opt_timeZone$$inline_350_opt_timeZone$$inline_355_patternStr$$, $date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$, $dateForDate$$1$$, $dateForTime$$1$$) {
  var $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ = $opt_timeZone$$inline_350_opt_timeZone$$inline_355_patternStr$$.length;
  switch($opt_timeZone$$inline_350_opt_timeZone$$inline_355_patternStr$$.charAt(0)) {
    case "G":
      return $date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$ = 0 < $dateForDate$$1$$.getFullYear() ? 1 : 0, 4 <= $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ ? $goog$i18n$DateTimeSymbols_en$$.$ERANAMES$[$date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$] : $goog$i18n$DateTimeSymbols_en$$.$ERAS$[$date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$];
    case "y":
      return $date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$ = $dateForDate$$1$$.getFullYear(), 0 > $date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$ && ($date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$ = -$date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$), 
      2 == $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ ? $goog$string$padNumber$$($date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$ % 100, 2) : "" + $date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$;
    case "M":
      return $JSCompiler_StaticMethods_formatMonth_$$($JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$, $dateForDate$$1$$);
    case "k":
      return $goog$string$padNumber$$($dateForTime$$1$$.getHours() || 24, $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$);
    case "S":
      return($dateForTime$$1$$.getTime() % 1E3 / 1E3).toFixed(Math.min(3, $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$)).substr(2) + (3 < $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ ? $goog$string$padNumber$$(0, $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ - 3) : "");
    case "E":
      return $date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$ = $dateForDate$$1$$.getDay(), 4 <= $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ ? $goog$i18n$DateTimeSymbols_en$$.$WEEKDAYS$[$date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$] : $goog$i18n$DateTimeSymbols_en$$.$SHORTWEEKDAYS$[$date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$];
    case "a":
      return $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ = $dateForTime$$1$$.getHours(), $goog$i18n$DateTimeSymbols_en$$.$AMPMS$[12 <= $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ && 24 > $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ ? 1 : 0];
    case "h":
      return $goog$string$padNumber$$($dateForTime$$1$$.getHours() % 12 || 12, $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$);
    case "K":
      return $goog$string$padNumber$$($dateForTime$$1$$.getHours() % 12, $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$);
    case "H":
      return $goog$string$padNumber$$($dateForTime$$1$$.getHours(), $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$);
    case "c":
      return $JSCompiler_StaticMethods_formatStandaloneDay_$$($JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$, $dateForDate$$1$$);
    case "L":
      return $JSCompiler_StaticMethods_formatStandaloneMonth_$$($JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$, $dateForDate$$1$$);
    case "Q":
      return $date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$ = Math.floor($dateForDate$$1$$.getMonth() / 3), 4 > $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ ? $goog$i18n$DateTimeSymbols_en$$.$SHORTQUARTERS$[$date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$] : $goog$i18n$DateTimeSymbols_en$$.$QUARTERS$[$date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$];
    case "d":
      return $goog$string$padNumber$$($dateForDate$$1$$.getDate(), $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$);
    case "m":
      return $goog$string$padNumber$$($dateForTime$$1$$.getMinutes(), $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$);
    case "s":
      return $goog$string$padNumber$$($dateForTime$$1$$.getSeconds(), $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$);
    case "v":
      return $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ = $JSCompiler_alias_VOID$$ || $goog$i18n$TimeZone$createTimeZone$$($date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$.getTimezoneOffset()), $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$.$timeZoneId_$;
    case "z":
      return $opt_timeZone$$inline_350_opt_timeZone$$inline_355_patternStr$$ = $JSCompiler_alias_VOID$$ || $goog$i18n$TimeZone$createTimeZone$$($date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$.getTimezoneOffset()), 4 > $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ ? $opt_timeZone$$inline_350_opt_timeZone$$inline_355_patternStr$$.$tzNames_$[0 < $JSCompiler_StaticMethods_getDaylightAdjustment$$($opt_timeZone$$inline_350_opt_timeZone$$inline_355_patternStr$$, 
      $date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$) ? 2 : 0] : $opt_timeZone$$inline_350_opt_timeZone$$inline_355_patternStr$$.$tzNames_$[0 < $JSCompiler_StaticMethods_getDaylightAdjustment$$($opt_timeZone$$inline_350_opt_timeZone$$inline_355_patternStr$$, $date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$) ? 3 : 1];
    case "Z":
      return $opt_timeZone$$inline_350_opt_timeZone$$inline_355_patternStr$$ = $JSCompiler_alias_VOID$$ || $goog$i18n$TimeZone$createTimeZone$$($date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$.getTimezoneOffset()), 4 > $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ ? ($JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ = 
      -($opt_timeZone$$inline_350_opt_timeZone$$inline_355_patternStr$$.$standardOffset_$ - $JSCompiler_StaticMethods_getDaylightAdjustment$$($opt_timeZone$$inline_350_opt_timeZone$$inline_355_patternStr$$, $date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$)), $date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$ = [0 > $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ ? 
      "-" : "+"], $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ = Math.abs($JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$), $date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$.push($goog$string$padNumber$$(Math.floor($JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ / 
      60) % 100, 2), $goog$string$padNumber$$($JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ % 60, 2))) : ($JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ = $opt_timeZone$$inline_350_opt_timeZone$$inline_355_patternStr$$.$standardOffset_$ - $JSCompiler_StaticMethods_getDaylightAdjustment$$($opt_timeZone$$inline_350_opt_timeZone$$inline_355_patternStr$$, $date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$), 
      $date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$ = ["GMT"], $date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$.push(0 >= $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ ? "+" : "-"), $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ = 
      Math.abs($JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$), $date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$.push($goog$string$padNumber$$(Math.floor($JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ / 60) % 100, 2), ":", $goog$string$padNumber$$($JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ % 
      60, 2))), $JSCompiler_temp$$701_count$$27_hours$$inline_336_offset$$inline_758_offset$$inline_973_opt_timeZone$$inline_345$$ = $date$$40_parts$$inline_759_parts$$inline_974_value$$inline_322_value$$inline_327_value$$inline_332_value$$inline_341$$.join("");
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
$JSCompiler_prototypeAlias$$.$sb_$ = $JSCompiler_alias_NULL$$;
$JSCompiler_prototypeAlias$$.$createDom$ = function $$JSCompiler_prototypeAlias$$$$createDom$$() {
  this.$decorateInternal$(this.$dom_$.createElement("div"))
};
$JSCompiler_prototypeAlias$$.$decorateInternal$ = function $$JSCompiler_prototypeAlias$$$$decorateInternal$$($aElement$$, $opt_doNotBuildBody$$) {
  $rflect$cal$Component$$.$superClass_$.$decorateInternal$.call(this, $aElement$$);
  $opt_doNotBuildBody$$ || (this.$getElement$().innerHTML = $JSCompiler_StaticMethods_buildBody$$(this))
};
function $JSCompiler_StaticMethods_buildBody$$($JSCompiler_StaticMethods_buildBody$self$$, $aSb$$) {
  var $sb$$2$$ = $aSb$$ || $JSCompiler_StaticMethods_buildBody$self$$.$sb_$ || ($JSCompiler_StaticMethods_buildBody$self$$.$sb_$ = new $goog$string$StringBuffer$$);
  $JSCompiler_StaticMethods_buildBody$self$$.$buildBodyInternal$($sb$$2$$);
  if(!$aSb$$) {
    var $str$$49$$ = $sb$$2$$.toString();
    $sb$$2$$.clear();
    return $str$$49$$
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
  $rflect$cal$Component$$.$superClass_$.$disposeInternal$.call(this);
  this.$sb_$ && (this.$sb_$.clear(), this.$sb_$ = $JSCompiler_alias_NULL$$)
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
  $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_getHandler$$(this), this.$buttonNewEvent_$, "action", function($aEvent$$2$$) {
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
        var $aSb$$inline_371_aSb$$inline_373$$ = $aSb$$3$$;
        $aSb$$inline_371_aSb$$inline_373$$.append(this.$timeManager_$.$basis$.getYear());
        $aSb$$inline_371_aSb$$inline_373$$.append("&nbsp;");
        $aSb$$inline_371_aSb$$inline_373$$.append($goog$i18n$DateTimeSymbols_en$$.$MONTHS$[this.$timeManager_$.$basis$.getMonth()]);
        break;
      case 8:
        for(var $aSb$$inline_371_aSb$$inline_373$$ = $aSb$$3$$, $aOffset$$inline_374$$ = $offset$$24$$, $dayNamesFirstNumber$$inline_375$$ = $goog$i18n$DateTimeSymbols_en$$.$FIRSTDAYOFWEEK$, $dayNameNumber$$inline_376$$ = 0, $counter$$inline_377$$ = 0;7 > $counter$$inline_377$$;$counter$$inline_377$$++) {
          0 < $counter$$inline_377$$ && $aSb$$inline_371_aSb$$inline_373$$.append($rflect$cal$MiniCalBuilder$HTML_PARTS_$$[$aOffset$$inline_374$$]), $dayNameNumber$$inline_376$$ = ($dayNamesFirstNumber$$inline_375$$ + $counter$$inline_377$$ + 1) % 7, $aSb$$inline_371_aSb$$inline_373$$.append($goog$i18n$DateTimeSymbols_en$$.$WEEKDAYS$[$dayNameNumber$$inline_376$$].charAt(0).toUpperCase()), $aSb$$inline_371_aSb$$inline_373$$.append($rflect$cal$MiniCalBuilder$HTML_PARTS_$$[$aOffset$$inline_374$$ + 1])
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
function $rflect$date$moveToDayOfWeekIfNeeded$$($aDate$$3_date$$inline_383$$) {
  var $JSCompiler_temp$$16_diff$$inline_382$$;
  0 != $JSCompiler_StaticMethods_getWeekday$$($aDate$$3_date$$inline_383$$) && ($JSCompiler_temp$$16_diff$$inline_382$$ = (($goog$i18n$DateTimeSymbols_en$$.$FIRSTDAYOFWEEK$ + 0 + 1) % 7 - $aDate$$3_date$$inline_383$$.getDay() + -7) % 7, $aDate$$3_date$$inline_383$$ = $aDate$$3_date$$inline_383$$.$clone$(), $aDate$$3_date$$inline_383$$.add(new $goog$date$Interval$$(0, 0, 0 === $JSCompiler_temp$$16_diff$$inline_382$$ ? $JSCompiler_temp$$16_diff$$inline_382$$ + -7 : $JSCompiler_temp$$16_diff$$inline_382$$)));
  return $JSCompiler_temp$$16_diff$$inline_382$$ = $aDate$$3_date$$inline_383$$
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
  var $diff$$inline_401$$ = 0, $bitmask$$inline_402$$ = $opt_bitmask$$ || 63;
  $bitmask$$inline_402$$ & 1 && ($diff$$inline_401$$ = this.getYear() - $aOther$$.getFullYear());
  0 == $diff$$inline_401$$ && $bitmask$$inline_402$$ & 2 && ($diff$$inline_401$$ = this.getMonth() - $aOther$$.getMonth());
  0 == $diff$$inline_401$$ && $bitmask$$inline_402$$ & 4 && ($diff$$inline_401$$ = this.getDate() - $aOther$$.getDate());
  0 == $diff$$inline_401$$ && $bitmask$$inline_402$$ & 8 && ($diff$$inline_401$$ = this.getHours() - $aOther$$.getHours());
  0 == $diff$$inline_401$$ && $bitmask$$inline_402$$ & 16 && ($diff$$inline_401$$ = this.getMinutes() - $aOther$$.getMinutes());
  0 == $diff$$inline_401$$ && $bitmask$$inline_402$$ & 32 && ($diff$$inline_401$$ = this.getSeconds() - $aOther$$.getSeconds());
  $bitmask$$inline_402$$ & 128 && ($diff$$inline_401$$ = this.$getWeekNumber$() - $aOther$$.$getWeekNumber$());
  return 0 == (0 < $diff$$inline_401$$ ? 1 : 0 == $diff$$inline_401$$ ? 0 : -1)
};
$JSCompiler_prototypeAlias$$.valueOf = function $$JSCompiler_prototypeAlias$$$valueOf$() {
  return+[this.$year_$, this.$month_$, this.$dayOfMonth_$, this.$hours_$, this.$minutes_$, this.$seconds_$, this.$milliseconds_$].join("")
};
$JSCompiler_prototypeAlias$$.$clone$ = function $$JSCompiler_prototypeAlias$$$$clone$$() {
  var $date$$45$$ = new $rflect$date$DateShim$$(this);
  $date$$45$$.$firstDayOfWeek_$ = this.$firstDayOfWeek_$;
  $date$$45$$.$firstWeekCutOffDay_$ = this.$firstWeekCutOffDay_$;
  $date$$45$$.$dayOfYear_$ = this.$getDayOfYear$();
  var $aWeekNumber$$inline_414$$ = this.$getWeekNumber$();
  $date$$45$$.$weekNumber_$ = $aWeekNumber$$inline_414$$;
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
  var $daysNumber$$inline_425_difference$$inline_426_now$$inline_772_today$$inline_430$$ = 0;
  switch(this.$configuration$) {
    case 1:
      $daysNumber$$inline_425_difference$$inline_426_now$$inline_772_today$$inline_430$$ = 1;
      break;
    case 2:
      $daysNumber$$inline_425_difference$$inline_426_now$$inline_772_today$$inline_430$$ = this.$daysNumber$;
      break;
    case 3:
      $daysNumber$$inline_425_difference$$inline_426_now$$inline_772_today$$inline_430$$ = 7;
      break;
    case 4:
      $daysNumber$$inline_425_difference$$inline_426_now$$inline_772_today$$inline_430$$ = this.$daysNumber$;
      break;
    case 7:
    ;
    case 5:
      var $daysNumber$$inline_425_difference$$inline_426_now$$inline_772_today$$inline_430$$ = 0, $date$$inline_428_firstDayOfMonth$$inline_427$$ = this.$basis$.$clone$();
      $date$$inline_428_firstDayOfMonth$$inline_427$$.setDate(1);
      this.$start_$.$equals$($date$$inline_428_firstDayOfMonth$$inline_427$$) || ($daysNumber$$inline_425_difference$$inline_426_now$$inline_772_today$$inline_430$$ = $JSCompiler_StaticMethods_getWeekday$$($date$$inline_428_firstDayOfMonth$$inline_427$$) - $JSCompiler_StaticMethods_getWeekday$$(this.$start_$));
      $daysNumber$$inline_425_difference$$inline_426_now$$inline_772_today$$inline_430$$ = 7 == this.$configuration$ ? 42 : 0 == ($daysNumber$$inline_425_difference$$inline_426_now$$inline_772_today$$inline_430$$ + $goog$date$getNumberOfDaysInMonth$$(this.$basis$.getFullYear(), this.$basis$.getMonth())) % 7 ? $daysNumber$$inline_425_difference$$inline_426_now$$inline_772_today$$inline_430$$ + $goog$date$getNumberOfDaysInMonth$$(this.$basis$.getFullYear(), this.$basis$.getMonth()) : $daysNumber$$inline_425_difference$$inline_426_now$$inline_772_today$$inline_430$$ + 
      $goog$date$getNumberOfDaysInMonth$$(this.$basis$.getFullYear(), this.$basis$.getMonth()) - ($daysNumber$$inline_425_difference$$inline_426_now$$inline_772_today$$inline_430$$ + $goog$date$getNumberOfDaysInMonth$$(this.$basis$.getFullYear(), this.$basis$.getMonth())) % 7 + 7
  }
  this.$daySeries$.length = 0;
  $date$$inline_428_firstDayOfMonth$$inline_427$$ = new $rflect$date$DateShim$$(this.$start_$);
  $date$$inline_428_firstDayOfMonth$$inline_427$$.$dayOfYear_$ = this.$start_$.$getDayOfYear$();
  var $aWeekNumber$$inline_768_counter$$inline_429$$ = this.$start_$.$getWeekNumber$();
  $date$$inline_428_firstDayOfMonth$$inline_427$$.$weekNumber_$ = $aWeekNumber$$inline_768_counter$$inline_429$$;
  for($aWeekNumber$$inline_768_counter$$inline_429$$ = 0;$aWeekNumber$$inline_768_counter$$inline_429$$ < $daysNumber$$inline_425_difference$$inline_426_now$$inline_772_today$$inline_430$$;$aWeekNumber$$inline_768_counter$$inline_429$$++) {
    this.$daySeries$[$aWeekNumber$$inline_768_counter$$inline_429$$] = $date$$inline_428_firstDayOfMonth$$inline_427$$, $date$$inline_428_firstDayOfMonth$$inline_427$$ = $rflect$date$getTomorrow$$($date$$inline_428_firstDayOfMonth$$inline_427$$)
  }
  this.$interval$.start = this.$start_$.getTime();
  this.$interval$.end = (new $goog$date$Date$$($date$$inline_428_firstDayOfMonth$$inline_427$$)).getTime();
  $daysNumber$$inline_425_difference$$inline_426_now$$inline_772_today$$inline_430$$ = new Date;
  if(this.$isInNowPoint$ = this.$interval$.contains(+$daysNumber$$inline_425_difference$$inline_426_now$$inline_772_today$$inline_430$$) && (5 != this.$configuration$ || this.$basis$.getMonth() == $daysNumber$$inline_425_difference$$inline_426_now$$inline_772_today$$inline_430$$.getMonth())) {
    $daysNumber$$inline_425_difference$$inline_426_now$$inline_772_today$$inline_430$$ = new Date, this.$currentDay_$ = new $rflect$date$DateShim$$($daysNumber$$inline_425_difference$$inline_426_now$$inline_772_today$$inline_430$$.getFullYear(), $daysNumber$$inline_425_difference$$inline_426_now$$inline_772_today$$inline_430$$.getMonth(), $daysNumber$$inline_425_difference$$inline_426_now$$inline_772_today$$inline_430$$.getDate())
  }
};
$JSCompiler_prototypeAlias$$.shift = function $$JSCompiler_prototypeAlias$$$shift$($aDirection$$1$$) {
  var $daysNumber$$inline_434$$ = 0;
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
      $daysNumber$$inline_434$$ = this.$daysNumber$ * $aDirection$$1$$;
      this.$basis$.add(new $goog$date$Interval$$(0, 0, $daysNumber$$inline_434$$));
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
  return($aId$$2_matches$$ = /\d{1,2}/.exec($aId$$2_matches$$)) ? +$aId$$2_matches$$[0] : NaN
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
    var $JSCompiler_StaticMethods_buildUnit_$self$$inline_436$$ = $JSCompiler_StaticMethods_build_$self$$, $aSb$$inline_437$$ = $sb$$3$$, $aRect$$inline_438$$ = $JSCompiler_StaticMethods_build_$self$$.$rects_$[$counter$$13$$];
    $aSb$$inline_437$$.append('<div class="mask');
    $JSCompiler_StaticMethods_buildUnit_$self$$inline_436$$.$additionalClassNames$ && ($aSb$$inline_437$$.append(" "), $aSb$$inline_437$$.append($JSCompiler_StaticMethods_buildUnit_$self$$inline_436$$.$additionalClassNames$));
    $aSb$$inline_437$$.append('" style="left:');
    $aSb$$inline_437$$.append(Math.floor($aRect$$inline_438$$.left));
    $aSb$$inline_437$$.append("px;top:");
    $aSb$$inline_437$$.append(Math.floor($aRect$$inline_438$$.top));
    $aSb$$inline_437$$.append("px;width:");
    $aSb$$inline_437$$.append(Math.ceil($aRect$$inline_438$$.width));
    $aSb$$inline_437$$.append("px;height:");
    $aSb$$inline_437$$.append(Math.ceil($aRect$$inline_438$$.height));
    $aSb$$inline_437$$.append('px">');
    $aSb$$inline_437$$.append("</div>")
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
$JSCompiler_prototypeAlias$$.$init$ = function $$JSCompiler_prototypeAlias$$$$init$$($JSCompiler_inline_result$$440_aConfiguration$$1_cell$$inline_443$$, $startSelectionIndex$$, $endSelectionIndex_minCell$$inline_444$$) {
  $rflect$cal$SelectionMask$$.prototype.$init$.call(this, $JSCompiler_inline_result$$440_aConfiguration$$1_cell$$inline_443$$);
  this.$maskEl_$ = $goog$dom$getElement$$("minical-mask-cnt");
  this.$indexIsInMask_$ = this.$draggedAtLeastOnce_$ = this.$dragStarted_$ = $JSCompiler_alias_FALSE$$;
  $_log$$("this.configuration_", this.$configuration_$);
  if(5 == this.$configuration_$) {
    this.$initialized_$ = $JSCompiler_alias_FALSE$$, this.$startCell_$ = $JSCompiler_StaticMethods_getCellBySelectionIndex_$$($startSelectionIndex$$), this.$currentCell_$ = $JSCompiler_StaticMethods_getCellBySelectionIndex_$$($endSelectionIndex_minCell$$inline_444$$), this.$update_$(), this.close()
  }else {
    this.$dragStarted_$ = $JSCompiler_alias_TRUE$$;
    if(this.$initialized_$) {
      var $JSCompiler_inline_result$$440_aConfiguration$$1_cell$$inline_443$$ = $JSCompiler_StaticMethods_getCellBySelectionIndex_$$($startSelectionIndex$$), $endSelectionIndex_minCell$$inline_444$$ = -1 == $JSCompiler_StaticMethods_compareCells_$$(this, this.$visibleStartCell_$, this.$visibleCurrentCell_$) ? this.$visibleStartCell_$ : this.$visibleCurrentCell_$, $maxCell$$inline_445$$ = 1 == $JSCompiler_StaticMethods_compareCells_$$(this, this.$visibleStartCell_$, this.$visibleCurrentCell_$) ? this.$visibleStartCell_$ : 
      this.$visibleCurrentCell_$;
      $_log$$("cell", $JSCompiler_inline_result$$440_aConfiguration$$1_cell$$inline_443$$);
      $_log$$("minCell", $endSelectionIndex_minCell$$inline_444$$);
      $_log$$("maxCell", $maxCell$$inline_445$$);
      $JSCompiler_inline_result$$440_aConfiguration$$1_cell$$inline_443$$ = 0 <= $JSCompiler_StaticMethods_compareCells_$$(this, $JSCompiler_inline_result$$440_aConfiguration$$1_cell$$inline_443$$, $endSelectionIndex_minCell$$inline_444$$) && 0 >= $JSCompiler_StaticMethods_compareCells_$$(this, $JSCompiler_inline_result$$440_aConfiguration$$1_cell$$inline_443$$, $maxCell$$inline_445$$)
    }else {
      $JSCompiler_inline_result$$440_aConfiguration$$1_cell$$inline_443$$ = $JSCompiler_alias_FALSE$$
    }
    this.$indexIsInMask_$ = $JSCompiler_inline_result$$440_aConfiguration$$1_cell$$inline_443$$;
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
  $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_getHandler$$(this), this.$getElement$(), "click", this.$onClick_$, $JSCompiler_alias_FALSE$$, this), this.$getElement$(), "mouseover", this.$onMouseOver_$, $JSCompiler_alias_FALSE$$, this), this.$getElement$(), "mouseout", this.$onMouseOut_$, 
  $JSCompiler_alias_FALSE$$, this), this.$getElement$(), "mousedown", this.$onMouseDown_$, $JSCompiler_alias_FALSE$$, this), this.$getElement$(), "selectstart", this.$onSelectStart_$, $JSCompiler_alias_FALSE$$, this), document, "mousemove", this.$onMouseMove_$, $JSCompiler_alias_FALSE$$, this), document, "mouseup", this.$onMouseUp_$, $JSCompiler_alias_FALSE$$, this)
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
  $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_getHandler$$(this), this.$getElement$(), "mouseover", this.$onMouseOver_$, $JSCompiler_alias_FALSE$$, this), this.$getElement$(), "mouseout", this.$onMouseOut_$, $JSCompiler_alias_FALSE$$, this);
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
var $rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$ = '<div id="main-pane" class="main-pane">,<div id="main-pane-header">,<div id="daynames-prefix-wk" style="width:61,px"><div id="daynames-zippy" class="zippy ,"></div>,</div>,<div id="main-pane-header-container" class="main-pane-header-container-wk" style="margin-left:61px,"><div id="main-pane-header-wk-daynames">,<div id="weekmode-daynames-table" style="width:,%">,<div id="dayname," class="dayname-wk" style="margin-left:,%;margin-right:,%;top:,%"><span class=",">,</span></div>,</div>,</div>,<div id="main-pane-header-scrollable" class="," style="height:,px">,<div id="alldayevents-grid-wrapper">,<div id="alldayevents-grid" style="height:,px;width:,%"><div id="wk-ad-mask-cnt"></div>,<div id="weekgrid-ad-col," class="weekgrid-col, wk-ad-layers-cont-outer" style="margin-left:,%;margin-right:,%;top:,%">,<div class="wk-ad-layers-cont">,<div id="wk-ad-dec-layer-col," class="wk-ad-decoration-layer">,<div class="expand-sign-wk-ad-cont">,<div class="expand-sign-wk-ad ,"></div></div>,</div>,<div id="wk-ad-events-layer-col," class="wk-ad-events-layer">,</div>,</div>,</div>,</div>,</div>,</div>,<div id="main-pane-header-wk-zippies">,<div id="weekmode-zippies-table" style="width:,%">,<div class="wk-col-zippy-cont" style="margin-left:,%;margin-right:,%;top:,%">,<div id="wk-zippy-col," class="zippy wk-col-zippy ,"></div>,</div>,</div>,</div>,</div>,</div>,<div id="main-pane-body-scrollable-wk" style="height:,px" class=",">,<div id="hours-container" style="width:60,px">,<div class=","><div class="hour-label ,">,</div></div>,</div>,<div id="grid-table-wrapper-wk" style="margin-left:60px">,<div id="grid-rows-container" class="wk-grid-rows-cont" style="width:,%">,<div class=","></div>,</div>,<div id="grid-table-wk" class="grid-table-wk" style="width:,%"><div id="wk-mask-cnt"></div>,<div id="weekgrid-col," class="weekgrid-col," style="margin-left:,%;margin-right:,%;top:,%">,<div id="wk-dec-layer-in-col," class="wk-decoration-layer">,<div class="today-mask-wk"></div>,<div class="expand-sign-wk-cont"><div class="expand-sign-wk ,"></div></div>,</div>,<div id="wk-events-layer-col," class="wk-events-layer">,<div class="event-rect-wk" style="top:,px; margin-left:,%; margin-right:,%; height:,px; margin-bottom:,px;z-index:,"><div class="event-rect-wk-inner ,"><div class="event-wk-timelabel">, - ,</div>,</div></div>,</div>,</div>,</div>,</div>,</div>,</div>'.split(","), 
$rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$ = '<div id="main-pane" class="main-pane">,<div id="main-pane-header">,<div id="daynames-prefix-mn">,</div>,<div id="main-pane-header-container" class="main-pane-header-container-mn">,<div id="main-pane-header-wk-daynames" style="margin-right:,px"><table id="weekmode-daynames-table" cellspacing="0" cellpadding="0">,<tbody><tr>,<td id="dayname,">,</td>,</tr></tbody></table>,</div>,</div>,</div>,<div id="main-pane-body-scrollable-wrapper" style="height:,px;">,<div id="main-pane-header-mn-zippies">,<table id="monthmode-zippies-table" cellspacing="0" cellpadding="0"><tbody>,<tr><td id="mn-zippy-cont-row," style="height:,px;">,<div class="mn-row-zippy-cont">,<div id="mn-zippy-row," class="zippy mn-row-zippy ,"></div>,</div>,</td></tr>,</tbody></table>,</div>,<div id="main-pane-body-scrollable-mn" class=",">,<div id="grid-table-wrapper-outer" style="height:,px;">,<div id="weeknum-cont"><table id="weeknums" cellspacing="0" cellpadding="0">,<tr><td id="weeknum," class="weeknum-label" style="height:,px;"><span class="weeknum-label-inner">,</span></td></tr>,</table>,</div>,<div id="grid-table-wrapper-mn"><div id="mn-mask-cnt"></div>,<div id="grid-cols-container" class="mn-grid-cols-cont"><table id="grid-cols-cont-inner" cellspacing="0" cellpadding="0"><tbody><tr>,<td class="weekgrid-col,">&nbsp;</td>,</tr></tbody></table>,</div>,<table id="grid-table-mn" cellspacing="0" cellpadding="0" class="grid-table-mn"><tbody>,<tr><td id="monthgrid-row," class="monthgrid-row ," style="height:,px;">,<div class="mn-layers-cont">,<div id="mn-dec-layer-row," class="mn-decoration-layer">,<table cellspacing="0" cellpadding="0" class="daynums"><tbody><tr>,<td class="daycell"><div class="daycell-decoration-cont">,<div class="today-mask-mn"></div>,</div><div class="daycell-daynum-outer-cont"><div class="expand-sign-mn-cont"><div class="expand-sign-mn ,"></div>,</div>,<div class="daynum-cont"><div id="daynum-," class="daynum-label ,">,</div>,</div></div>,</td>,</tr></tbody></table>,</div>,<div id="mn-events-layer-row," class="mn-events-layer">,<div style="margin-left:,%; margin-right:,%;top:,px" class="event-rect-mn-outer"><div class="event-rect-mn ,"><div class="event-rect-mn-inner ,">,</div></div></div>,</div>,</div>,</td></tr>,</tbody></table>,</div>,</div>,</div>,</div>,</div>'.split(",");
function $rflect$cal$MainPaneBuilder$buildWeekBlockChip_$$($aSb$$45$$, $aOffset$$22$$, $aEventManager$$2_event$$5$$, $aChip$$5$$, $aTotalCols_lastCol$$, $aStartCol$$, $aColSpan$$) {
  var $pixelStart_shift$$ = 24 * $aChip$$5$$.start / 30, $pixelHeight$$ = 24 * ($aChip$$5$$.end - $aChip$$5$$.start) / 30, $widthQuant$$ = 100 / $aTotalCols_lastCol$$, $aEventManager$$2_event$$5$$ = $aEventManager$$2_event$$5$$.$events_$[$aChip$$5$$.$eventId$], $aTotalCols_lastCol$$ = $aStartCol$$ == $aTotalCols_lastCol$$ - 1;
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
  $aSb$$45$$.append($aEventManager$$2_event$$5$$.summary);
  $aSb$$45$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$22$$ + 10])
}
function $rflect$cal$MainPaneBuilder$buildMonthBlockChip_$$($aSb$$46$$, $aOffset$$23$$, $aEventManager$$3_event$$6$$, $aChip$$6$$, $aTotalCols$$1_cellStart$$, $aStartCol$$1$$, $aColSpan$$1_cellWidth$$, $opt_allDay$$) {
  var $aTotalCols$$1_cellStart$$ = $aChip$$6$$.start, $aColSpan$$1_cellWidth$$ = $aChip$$6$$.end - $aChip$$6$$.start, $widthQuant$$1$$ = 100 / 7, $aEventManager$$3_event$$6$$ = $aEventManager$$3_event$$6$$.$events_$[$aChip$$6$$.$eventId$];
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
  $aSb$$46$$.append($aEventManager$$3_event$$6$$.summary);
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
for(var $rflect$pagevis$nameOfHiddenProperty_$$, $rflect$pagevis$nameOfVisibilityChangeEvent$$, $rflect$pagevis$VENDOR_HIDDEN_NAMES$$ = ["hidden", "msHidden", "mozHidden", "webkitHidden"], $rflect$pagevis$VENDOR_VISIBILITYCHANGE_NAMES$$ = ["visibilitychange", "msvisibilitychange", "mozvisibilitychange", "webkitvisibilitychange"], $vendorCounter$$inline_482$$ = 0;$vendorCounter$$inline_482$$ < $rflect$pagevis$VENDOR_HIDDEN_NAMES$$.length;$vendorCounter$$inline_482$$++) {
  if($rflect$pagevis$VENDOR_HIDDEN_NAMES$$[$vendorCounter$$inline_482$$] in document) {
    $rflect$pagevis$nameOfHiddenProperty_$$ = $rflect$pagevis$VENDOR_HIDDEN_NAMES$$[$vendorCounter$$inline_482$$];
    $rflect$pagevis$nameOfVisibilityChangeEvent$$ = $rflect$pagevis$VENDOR_VISIBILITYCHANGE_NAMES$$[$vendorCounter$$inline_482$$];
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
  this.$maskEl_$.style.display = "none";
  this.$initialized_$ = $JSCompiler_alias_FALSE$$
};
$JSCompiler_prototypeAlias$$.update = function $$JSCompiler_prototypeAlias$$$update$($aEvent$$12_currentCell$$1$$) {
  var $pageScroll$$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$(this.$document_$)), $aEvent$$12_currentCell$$1$$ = $JSCompiler_StaticMethods_getCellByCoordinate_$$(this, $aEvent$$12_currentCell$$1$$.clientX + $pageScroll$$.x - this.$elementOffset_$.x + this.$scrollableEl_$.scrollLeft, $aEvent$$12_currentCell$$1$$.clientY + $pageScroll$$.y - this.$elementOffset_$.y + this.$scrollableEl_$.scrollTop);
  $goog$math$Coordinate$equals$$(this.$currentCell_$, $aEvent$$12_currentCell$$1$$) || (this.$currentCell_$ = $aEvent$$12_currentCell$$1$$, this.$update_$())
};
$JSCompiler_prototypeAlias$$.$init$ = function $$JSCompiler_prototypeAlias$$$$init$$($aConfiguration$$2$$, $aEvent$$13$$) {
  $rflect$cal$SelectionMask$$.prototype.$init$.call(this, $aConfiguration$$2$$);
  var $doc$$33_pageScroll$$1$$ = this.$document_$ || (this.$document_$ = $goog$dom$getOwnerDocument$$(this.$component_$.$getElement$())), $doc$$33_pageScroll$$1$$ = $JSCompiler_StaticMethods_getDocumentScroll$$($goog$dom$getDomHelper$$($doc$$33_pageScroll$$1$$)), $coordX_coordXWithoutScroll$$ = 0, $coordYWithoutScroll$$ = 0, $coordY$$ = $coordX_coordXWithoutScroll$$ = 0;
  this.$elementOffset_$ = new $goog$math$Coordinate$$(0, 0);
  this.$isWeekOrAllday_$() ? (1 == this.$configuration_$ ? (this.$scrollableEl_$ = $goog$dom$getElement$$("main-pane-header-scrollable"), this.$maskEl_$ = $goog$dom$getElement$$("wk-ad-mask-cnt"), this.$elementOffset_$ = $goog$style$getRelativePosition$$(this.$scrollableEl_$), this.$elementOffset_$.x += 1) : (this.$scrollableEl_$ = $goog$dom$getElement$$("main-pane-body-scrollable-wk"), this.$maskEl_$ = $goog$dom$getElement$$("wk-mask-cnt"), this.$elementOffset_$ = $goog$style$getRelativePosition$$(this.$scrollableEl_$), 
  this.$elementOffset_$.x += 62), this.$elementOffset_$.y += 1) : 3 == this.$configuration_$ && (this.$scrollableEl_$ = $goog$dom$getElement$$("main-pane-body-scrollable-mn"), this.$maskEl_$ = $goog$dom$getElement$$("mn-mask-cnt"), this.$elementOffset_$ = $goog$style$getRelativePosition$$(this.$scrollableEl_$), this.$elementOffset_$.x += 17, this.$elementOffset_$.y += 1);
  $coordX_coordXWithoutScroll$$ = $aEvent$$13$$.clientX + $doc$$33_pageScroll$$1$$.x - this.$elementOffset_$.x;
  $coordYWithoutScroll$$ = $aEvent$$13$$.clientY + $doc$$33_pageScroll$$1$$.y - this.$elementOffset_$.y;
  $coordX_coordXWithoutScroll$$ += this.$scrollableEl_$.scrollLeft;
  $coordY$$ = $coordYWithoutScroll$$ + this.$scrollableEl_$.scrollTop;
  $coordYWithoutScroll$$ >= this.$scrollableEl_$.offsetHeight || 0 > $coordYWithoutScroll$$ || (this.$startCell_$ = $JSCompiler_StaticMethods_getCellByCoordinate_$$(this, $coordX_coordXWithoutScroll$$, $coordY$$), this.$currentCell_$ = this.$startCell_$.$clone$(), $_log$$("coord: ", new $goog$math$Coordinate$$($coordX_coordXWithoutScroll$$, $coordY$$)), $_log$$("this.startCell_", this.$startCell_$), $_log$$("this.currentCell_", this.$currentCell_$), this.$maskEl_$.style.display = "", this.$initialized_$ = 
  $JSCompiler_alias_TRUE$$, this.$update_$())
};
function $JSCompiler_StaticMethods_getCellByCoordinate_$$($JSCompiler_StaticMethods_getCellByCoordinate_$self$$, $aX$$1$$, $aY$$1$$) {
  var $cell$$1$$ = new $goog$math$Coordinate$$(0, 0), $maxX$$ = 0, $maxY$$ = 0;
  $JSCompiler_StaticMethods_getCellByCoordinate_$self$$.$isWeekOrAllday_$() ? ($maxX$$ = $JSCompiler_StaticMethods_getCellByCoordinate_$self$$.$blockPoolWeek_$.$blocksNumber_$ - 1, $cell$$1$$.x = $JSCompiler_StaticMethods_getBlockIndexByCoordinate_$$($aX$$1$$, $JSCompiler_StaticMethods_getCellByCoordinate_$self$$.$blockPoolWeek_$), 1 == $JSCompiler_StaticMethods_getCellByCoordinate_$self$$.$configuration_$ ? ($maxY$$ = 0, $cell$$1$$.y = 0) : ($maxY$$ = 47, $cell$$1$$.y = Math.floor($aY$$1$$ / 24))) : 
  ($maxX$$ = 6, $maxY$$ = $JSCompiler_StaticMethods_getCellByCoordinate_$self$$.$blockPoolMonth_$.$blocksNumber_$ - 1, $cell$$1$$.y = $JSCompiler_StaticMethods_getBlockIndexByCoordinate_$$($aY$$1$$, $JSCompiler_StaticMethods_getCellByCoordinate_$self$$.$blockPoolMonth_$), $cell$$1$$.x = Math.floor($aX$$1$$ / ($JSCompiler_StaticMethods_getCellByCoordinate_$self$$.$blockPoolMonth_$.$gridSize$.width / 7)));
  0 > $cell$$1$$.x && ($cell$$1$$.x = 0);
  $cell$$1$$.x > $maxX$$ && ($cell$$1$$.x = $maxX$$);
  0 > $cell$$1$$.y && ($cell$$1$$.y = 0);
  $cell$$1$$.y > $maxY$$ && ($cell$$1$$.y = $maxY$$);
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
    $JSCompiler_alias_FALSE$$), $defaultStep_step$$inline_491$$;
    $defaultStep_step$$inline_491$$ = 0;
    $defaultStep_step$$inline_491$$ = 1 == this.$configuration_$ ? this.$blockPoolAllday_$.$gridSize$.height : 2 == this.$configuration_$ ? 24 : this.$blockPoolMonth_$.$gridSize$.width / 7;
    var $maxSize_size$$inline_494$$;
    $maxSize_size$$inline_494$$ = 0;
    $maxSize_size$$inline_494$$ = 1 == this.$configuration_$ ? this.$blockPoolAllday_$.$gridSize$.height : 2 == this.$configuration_$ ? 1152 : this.$blockPoolMonth_$.$gridSize$.width;
    var $minIndex$$ = 0, $maxIndex$$ = 0;
    $startCellPrimaryCoord$$ == $currentCellPrimaryCoord$$ ? ($minIndex$$ = Math.min($startCellSecondaryCoord$$, $currentCellSecondaryCoord$$), $maxIndex$$ = Math.max($startCellSecondaryCoord$$, $currentCellSecondaryCoord$$), this.$rects_$.push(this.$getRect_$($blockPositionForStartCell$$, $minIndex$$ * $defaultStep_step$$inline_491$$, $blockSizeForStartCell$$, ($maxIndex$$ - $minIndex$$ + 1) * $defaultStep_step$$inline_491$$))) : (this.$rects_$.push(this.$getRect_$($blockPositionForStartCell$$, 
    $currentCellPrimaryCoord$$ > $startCellPrimaryCoord$$ ? $startCellSecondaryCoord$$ * $defaultStep_step$$inline_491$$ : 0, $blockSizeForStartCell$$, $currentCellPrimaryCoord$$ > $startCellPrimaryCoord$$ ? $maxSize_size$$inline_494$$ - $startCellSecondaryCoord$$ * $defaultStep_step$$inline_491$$ : ($startCellSecondaryCoord$$ + 1) * $defaultStep_step$$inline_491$$)), this.$rects_$.push(this.$getRect_$($blockPositionForCurrentCell$$, $currentCellPrimaryCoord$$ > $startCellPrimaryCoord$$ ? 0 : $currentCellSecondaryCoord$$ * 
    $defaultStep_step$$inline_491$$, $blockSizeForCurrentCell$$, $currentCellPrimaryCoord$$ > $startCellPrimaryCoord$$ ? ($currentCellSecondaryCoord$$ + 1) * $defaultStep_step$$inline_491$$ : $maxSize_size$$inline_494$$ - $currentCellSecondaryCoord$$ * $defaultStep_step$$inline_491$$)), 1 < Math.abs($currentCellPrimaryCoord$$ - $startCellPrimaryCoord$$) && ($minIndex$$ = Math.min($startCellPrimaryCoord$$, $currentCellPrimaryCoord$$), $maxIndex$$ = Math.max($startCellPrimaryCoord$$, $currentCellPrimaryCoord$$), 
    this.$rects_$.push(this.$getRect_$($JSCompiler_StaticMethods_getBlockPositionOrSize_$$(this, $minIndex$$ + 1, $JSCompiler_alias_TRUE$$), 0, $JSCompiler_StaticMethods_getBlockPositionOrSize_$$(this, $maxIndex$$, $JSCompiler_alias_TRUE$$) - $JSCompiler_StaticMethods_getBlockPositionOrSize_$$(this, $minIndex$$ + 1, $JSCompiler_alias_TRUE$$), $maxSize_size$$inline_494$$))));
    $JSCompiler_StaticMethods_calculateDates_$$(this, $minCell$$2$$, $maxCell$$2$$);
    this.$maskEl_$.innerHTML = $JSCompiler_StaticMethods_build_$$(this)
  }
};
function $rflect$cal$MainPane$$($aViewManager$$11$$, $aTimeManager$$8$$, $aEventManager$$5$$, $aContainerSizeMonitor$$4$$, $aBlockManager$$) {
  $goog$ui$Component$$.call(this, $JSCompiler_alias_VOID$$);
  this.$viewManager_$ = $aViewManager$$11$$;
  this.$timeManager_$ = $aTimeManager$$8$$;
  this.$eventManager_$ = $aEventManager$$5$$;
  this.$containerSizeMonitor_$ = $aContainerSizeMonitor$$4$$;
  this.$blockManager_$ = $aBlockManager$$;
  this.$timeMarker_$ = new $rflect$cal$TimeMarker$$($aViewManager$$11$$, $aTimeManager$$8$$);
  this.$mainPaneBuilder_$ = new $rflect$cal$MainPaneBuilder$$(this.$viewManager_$, this, $aTimeManager$$8$$, this.$eventManager_$, this.$blockManager_$.$blockPoolWeek$, this.$blockManager_$.$blockPoolAllday$, this.$blockManager_$.$blockPoolMonth$, this.$containerSizeMonitor_$, this.$timeMarker_$);
  $_inspect$$("mainPaneBuilder", this.$mainPaneBuilder_$);
  this.$selectionMask_$ = new $rflect$cal$MainPaneSelectionMask$$($aViewManager$$11$$, this, $aTimeManager$$8$$, this.$blockManager_$.$blockPoolWeek$, this.$blockManager_$.$blockPoolAllday$, this.$blockManager_$.$blockPoolMonth$);
  $_inspect$$("selectionMask", this.$selectionMask_$);
  this.$alldayGridSize$ = this.$alldayGridContainerSize$ = this.$gridSize$ = this.$gridContainerSize$ = this.$scrollablesCombinedWkSize_$ = $JSCompiler_alias_NULL$$;
  this.$scrollListenersKeys_$ = [];
  this.$moRegistry_$ = new $rflect$cal$MouseOverRegistry$$
}
$goog$inherits$$($rflect$cal$MainPane$$, $rflect$cal$Component$$);
$JSCompiler_prototypeAlias$$ = $rflect$cal$MainPane$$.prototype;
$JSCompiler_prototypeAlias$$.$updateBeforeRedraw$ = function $$JSCompiler_prototypeAlias$$$$updateBeforeRedraw$$() {
  var $JSCompiler_StaticMethods_setSizes$self$$inline_777_alldayBlockMaxHeight_containerSize$$ = this.$containerSizeMonitor_$.$getSize$();
  516 > $JSCompiler_StaticMethods_setSizes$self$$inline_777_alldayBlockMaxHeight_containerSize$$.width && ($JSCompiler_StaticMethods_setSizes$self$$inline_777_alldayBlockMaxHeight_containerSize$$.width = 516);
  374 > $JSCompiler_StaticMethods_setSizes$self$$inline_777_alldayBlockMaxHeight_containerSize$$.height && ($JSCompiler_StaticMethods_setSizes$self$$inline_777_alldayBlockMaxHeight_containerSize$$.height = 374);
  $JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$) ? (this.$scrollablesCombinedWkSize_$ = $JSCompiler_StaticMethods_setSizes$self$$inline_777_alldayBlockMaxHeight_containerSize$$.$clone$(), this.$scrollablesCombinedWkSize_$.height -= 113, this.$scrollablesCombinedWkSize_$.width -= 229, this.$scrollablesCombinedWkSize_$.width -= this.$containerSizeMonitor_$.$scrollbarWidth$, this.$alldayGridContainerSize$ = this.$scrollablesCombinedWkSize_$.$clone$(), this.$gridContainerSize$ = this.$scrollablesCombinedWkSize_$.$clone$(), 
  this.$gridSize$ = this.$gridContainerSize$.$clone$(), this.$gridSize$.height = 1152, this.$blockManager_$.$blockPoolAllday$.$expanded$ || (this.$alldayGridContainerSize$.height = 47, this.$alldayGridSize$ = this.$alldayGridContainerSize$.$clone$())) : $JSCompiler_StaticMethods_isInMonthMode$$(this.$viewManager_$) && (this.$gridContainerSize$ = $JSCompiler_StaticMethods_setSizes$self$$inline_777_alldayBlockMaxHeight_containerSize$$.$clone$(), this.$gridContainerSize$.height -= 78, this.$gridContainerSize$.width -= 
  196, this.$gridSize$ = this.$gridContainerSize$.$clone$(), this.$gridSize$.width -= $JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$) || $JSCompiler_StaticMethods_isInMonthMode$$(this.$viewManager_$) && this.$blockManager_$.$blockPoolMonth$.$expanded$ ? this.$containerSizeMonitor_$.$scrollbarWidth$ : 0);
  var $JSCompiler_StaticMethods_setSizes$self$$inline_777_alldayBlockMaxHeight_containerSize$$ = this.$blockManager_$, $aGridSize$$inline_778$$ = this.$gridSize$, $aGridContainerSize$$inline_779$$ = this.$gridContainerSize$, $opt_alldayGridSize$$inline_780$$ = this.$alldayGridSize$, $opt_alldayGridContainerSize$$inline_781$$ = this.$alldayGridContainerSize$;
  $JSCompiler_StaticMethods_isInWeekMode$$($JSCompiler_StaticMethods_setSizes$self$$inline_777_alldayBlockMaxHeight_containerSize$$.$viewManager_$) ? ($JSCompiler_StaticMethods_setSizes$self$$inline_777_alldayBlockMaxHeight_containerSize$$.$blockPoolWeek$.$gridContainerSize$ = $aGridContainerSize$$inline_779$$, $JSCompiler_StaticMethods_setSizes$self$$inline_777_alldayBlockMaxHeight_containerSize$$.$blockPoolWeek$.$gridSize$ = $aGridSize$$inline_778$$, $JSCompiler_StaticMethods_setSizes$self$$inline_777_alldayBlockMaxHeight_containerSize$$.$blockPoolAllday$.$gridSize$ = 
  $opt_alldayGridSize$$inline_780$$, $JSCompiler_StaticMethods_setSizes$self$$inline_777_alldayBlockMaxHeight_containerSize$$.$blockPoolAllday$.$gridContainerSize$ = $opt_alldayGridContainerSize$$inline_781$$) : $JSCompiler_StaticMethods_isInMonthMode$$($JSCompiler_StaticMethods_setSizes$self$$inline_777_alldayBlockMaxHeight_containerSize$$.$viewManager_$) && ($JSCompiler_StaticMethods_setSizes$self$$inline_777_alldayBlockMaxHeight_containerSize$$.$blockPoolMonth$.$gridContainerSize$ = $aGridContainerSize$$inline_779$$, 
  $JSCompiler_StaticMethods_setSizes$self$$inline_777_alldayBlockMaxHeight_containerSize$$.$blockPoolMonth$.$gridSize$ = $aGridSize$$inline_778$$);
  this.$blockManager_$.update();
  if($JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$) && (this.$blockManager_$.$blockPoolAllday$.$expanded$ && ($JSCompiler_StaticMethods_setSizes$self$$inline_777_alldayBlockMaxHeight_containerSize$$ = 0, $JSCompiler_StaticMethods_setSizes$self$$inline_777_alldayBlockMaxHeight_containerSize$$ = Math.floor(this.$scrollablesCombinedWkSize_$.height / 2), this.$alldayGridContainerSize$.height = this.$alldayGridSize$.height > $JSCompiler_StaticMethods_setSizes$self$$inline_777_alldayBlockMaxHeight_containerSize$$ ? 
  $JSCompiler_StaticMethods_setSizes$self$$inline_777_alldayBlockMaxHeight_containerSize$$ : this.$alldayGridSize$.height), this.$gridContainerSize$.height = this.$scrollablesCombinedWkSize_$.height - this.$alldayGridContainerSize$.height, this.$alldayGridContainerSize$.height += this.$blockManager_$.$blockPoolWeek$.$expanded$ ? this.$containerSizeMonitor_$.$scrollbarWidth$ : 0, 1152 < this.$gridContainerSize$.height)) {
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
    for(var $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_502_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_507$$ = this.$mainPaneBuilder_$, $offset$$inline_504_offset$$inline_509$$ = 0, $length$$inline_505_length$$inline_510$$ = $rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$.length;++$offset$$inline_504_offset$$inline_509$$ < $length$$inline_505_length$$inline_510$$ - 1;) {
      switch($aSb$$56$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$offset$$inline_504_offset$$inline_509$$]), $offset$$inline_504_offset$$inline_509$$) {
        case 5:
          var $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$ = 
          $aSb$$56$$;
          $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_502_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_507$$.$blockPoolMonth_$.$expanded$ ? $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.append($JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_502_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_507$$.$containerSizeMonitor_$.$scrollbarWidth$ + 
          2) : $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.append(2);
          break;
        case 8:
          for(var $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$ = 
          $aSb$$56$$, $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$ = $offset$$inline_504_offset$$inline_509$$, $aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ = 
          $goog$i18n$DateTimeSymbols_en$$.$FIRSTDAYOFWEEK$, $dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$ = 0, $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$ = 0;7 > $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$;$blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$++) {
            0 < $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$ && $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$]), 
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.append($blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$), 
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$ + 
            1]), $dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$ = ($aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
            $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$ + 1) % 7, $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.append($goog$i18n$DateTimeSymbols_en$$.$WEEKDAYS$[$dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$]), 
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$ + 
            2])
          }
          $offset$$inline_504_offset$$inline_509$$ += 2;
          break;
        case 15:
          $aSb$$56$$.append($JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_502_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_507$$.$blockPoolMonth_$.$gridContainerSize$.height);
          break;
        case 19:
          $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$ = 
          $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_502_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_507$$;
          $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$ = $aSb$$56$$;
          $aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ = $offset$$inline_504_offset$$inline_509$$;
          $dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$ = 0;
          for($blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolMonth_$.$blocksNumber_$;$dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$ < 
          $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$;$dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$++) {
            0 < $dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$ && $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$]), 
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
            1]), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolMonth_$.$blocks$[$dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$].size), 
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
            2]), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
            3]), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
            4]), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
            5]), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolMonth_$.$blocks$[$dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$].$expanded$ ? 
            "mn-row-zippy-expanded" : "mn-row-zippy-collapsed"), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
            6]), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
            7]), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
            8])
          }
          $offset$$inline_504_offset$$inline_509$$ += 7;
          break;
        case 30:
          $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$ = 
          $aSb$$56$$;
          $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_502_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_507$$.$blockPoolMonth_$.$expanded$ ? $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.append("mpbs-mn-scroll-vert-on") : 
          $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.append("mpbs-mn-scroll-vert-off");
          break;
        case 32:
          $aSb$$56$$.append($JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_502_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_507$$.$blockPoolMonth_$.$gridSize$.height);
          break;
        case 35:
          for(var $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$ = 
          $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_502_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_507$$, $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$ = $aSb$$56$$, $aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ = 
          $offset$$inline_504_offset$$inline_509$$, $dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$ = $JSCompiler_alias_NULL$$, $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$ = 
          0, $blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolMonth_$.$blocksNumber_$;$blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$ < 
          $blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$;$blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$++) {
            0 < $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$ && $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$]), 
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
            1]), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolMonth_$.$blocks$[$blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$].size), 
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
            2]), $dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$timeManager_$.$daySeries$[7 * 
            $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$], $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$.$getWeekNumber$()), 
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
            3])
          }
          $offset$$inline_504_offset$$inline_509$$ += 3;
          break;
        case 43:
          $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$ = 
          $aSb$$56$$;
          $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$ = $offset$$inline_504_offset$$inline_509$$;
          for($aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ = 0;7 > $aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$;$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$++) {
            0 < $aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ && $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$]), 
            6 == $aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ && $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.append(" weekgrid-col-last"), 
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_MONTH_$$[$aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$ + 
            1])
          }
          $offset$$inline_504_offset$$inline_509$$++;
          break;
        case 48:
          $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_502_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_507$$.$buildMonthGridRows_$($aSb$$56$$, $offset$$inline_504_offset$$inline_509$$), $offset$$inline_504_offset$$inline_509$$ += 32
      }
    }
  }else {
    if($JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$)) {
      $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_502_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_507$$ = this.$mainPaneBuilder_$;
      $offset$$inline_504_offset$$inline_509$$ = 0;
      for($length$$inline_505_length$$inline_510$$ = $rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$.length;++$offset$$inline_504_offset$$inline_509$$ < $length$$inline_505_length$$inline_510$$ - 1;) {
        switch($aSb$$56$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$offset$$inline_504_offset$$inline_509$$]), $offset$$inline_504_offset$$inline_509$$) {
          case 3:
            $aSb$$56$$.append($JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_502_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_507$$.$blockPoolAllday_$.$expanded$ ? "goog-zippy-expanded" : "goog-zippy-collapsed");
            break;
          case 8:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$ = 
            $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_502_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_507$$;
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$ = $aSb$$56$$;
            $aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ = $offset$$inline_504_offset$$inline_509$$;
            $dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$timeManager_$.$daySeries$;
            $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$ = 0;
            $blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolWeek_$.$gridSize$.width;
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append((100 * ($blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$ / $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolAllday_$.$gridContainerSize$.width)).toFixed(4));
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
            1]);
            for(var $blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$ = 0, $aSb$$inline_976_aSb$$inline_979_blocksNumber$$inline_828_blocksNumber$$inline_845_timeIncrement$$inline_877$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolWeek_$.$blocksNumber_$;$blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$ < 
            $aSb$$inline_976_aSb$$inline_979_blocksNumber$$inline_828_blocksNumber$$inline_845_timeIncrement$$inline_877$$;$blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$++) {
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              2]), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              3]), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append((100 * ($blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$ / $blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$)).toFixed(4)), 
              $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$ += $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolWeek_$.$blocks$[$blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$].size, 
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              4]), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append((100 - 100 * ($blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$ / $blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$)).toFixed(4)), 
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              5]), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append(-100 * $blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              6]), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append(1 != $aSb$$inline_976_aSb$$inline_979_blocksNumber$$inline_828_blocksNumber$$inline_845_timeIncrement$$inline_877$$ ? "dayname-wk-inner" : ""), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              7]), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($JSCompiler_StaticMethods_format$$($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$weekDayNameFormatWeek_$, 
              $dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$[$blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$])), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              8])
            }
            $offset$$inline_504_offset$$inline_509$$ += 8;
            break;
          case 19:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$ = 
            $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_502_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_507$$;
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$ = $aSb$$56$$;
            $aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ = $offset$$inline_504_offset$$inline_509$$;
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolAllday_$.$expanded$ ? 
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append("mphs-scroll-vert-on ") : $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append("mphs-scroll-vert-off ");
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolWeek_$.$expanded$ ? 
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append("mphs-scroll-horz-on") : $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append("mphs-scroll-horz-off");
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
            1]);
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolAllday_$.$gridContainerSize$.height);
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
            2]);
            $offset$$inline_504_offset$$inline_509$$ += 2;
            break;
          case 23:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$ = 
            $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_502_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_507$$;
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$ = $aSb$$56$$;
            $aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ = $offset$$inline_504_offset$$inline_509$$;
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolAllday_$.$gridSize$.height);
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
            1]);
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append((100 * ($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolWeek_$.$gridSize$.width / 
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolAllday_$.$gridContainerSize$.width)).toFixed(4));
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
            2]);
            $offset$$inline_504_offset$$inline_509$$ += 2;
            break;
          case 26:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$ = 
            $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_502_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_507$$;
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$ = $aSb$$56$$;
            $aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ = $offset$$inline_504_offset$$inline_509$$;
            $dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$ = 0;
            $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolWeek_$.$gridSize$.width;
            $blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolAllday_$.$blocks$[0].$sparseArrays$;
            $blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$ = 0;
            for($aSb$$inline_976_aSb$$inline_979_blocksNumber$$inline_828_blocksNumber$$inline_845_timeIncrement$$inline_877$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolWeek_$.$blocksNumber_$;$blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$ < 
            $aSb$$inline_976_aSb$$inline_979_blocksNumber$$inline_828_blocksNumber$$inline_845_timeIncrement$$inline_877$$;$blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$++) {
              0 < $blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$ && $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$]);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              1]);
              $blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$ == $aSb$$inline_976_aSb$$inline_979_blocksNumber$$inline_828_blocksNumber$$inline_845_timeIncrement$$inline_877$$ - 1 && $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append(" weekgrid-col-last");
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              2]);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append((100 * ($dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$ / $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$)).toFixed(4));
              $dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$ += $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolWeek_$.$blocks$[$blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$].size;
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              3]);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append((100 - 100 * ($dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$ / $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$)).toFixed(4));
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              4]);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append(-100 * $blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              5]);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              6]);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              7]);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              8]);
              var $aOffset$$inline_980_aSb$$inline_846_aSb$$inline_849_counter$$inline_878$$ = $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$, $aChips$$inline_850_aOffset$$inline_847_block$$inline_982$$ = $aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              9, $aEventManager$$inline_851_block$$inline_848_counter$$inline_983$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolAllday_$.$blocks$[0];
              $aOffset$$inline_980_aSb$$inline_846_aSb$$inline_849_counter$$inline_878$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aChips$$inline_850_aOffset$$inline_847_block$$inline_982$$]);
              $aOffset$$inline_980_aSb$$inline_846_aSb$$inline_849_counter$$inline_878$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aChips$$inline_850_aOffset$$inline_847_block$$inline_982$$ + 1]);
              $aOffset$$inline_980_aSb$$inline_846_aSb$$inline_849_counter$$inline_878$$.append(!$aEventManager$$inline_851_block$$inline_848_counter$$inline_983$$.$expanded$ && $aEventManager$$inline_851_block$$inline_848_counter$$inline_983$$.$couldBeExpanded$ ? "expand-sign-wk-ad-collapsed" : $aEventManager$$inline_851_block$$inline_848_counter$$inline_983$$.$expanded$ && $aEventManager$$inline_851_block$$inline_848_counter$$inline_983$$.$couldBeCollapsed$ ? "expand-sign-wk-ad-expanded" : "");
              $aOffset$$inline_980_aSb$$inline_846_aSb$$inline_849_counter$$inline_878$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aChips$$inline_850_aOffset$$inline_847_block$$inline_982$$ + 2]);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              12]);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              13]);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              14]);
              for(var $aOffset$$inline_980_aSb$$inline_846_aSb$$inline_849_counter$$inline_878$$ = $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$, $aChips$$inline_850_aOffset$$inline_847_block$$inline_982$$ = $blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$[$blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$], 
              $aEventManager$$inline_851_block$$inline_848_counter$$inline_983$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$eventManager_$, 
              $chip$$inline_852$$ = $JSCompiler_alias_VOID$$, $chipCounter$$inline_853$$ = 0, $length$$inline_854$$ = $aChips$$inline_850_aOffset$$inline_847_block$$inline_982$$.length;$chipCounter$$inline_853$$ < $length$$inline_854$$;$chipCounter$$inline_853$$++) {
                ($chip$$inline_852$$ = $aChips$$inline_850_aOffset$$inline_847_block$$inline_982$$[$chipCounter$$inline_853$$]) && $rflect$cal$MainPaneBuilder$buildMonthBlockChip_$$($aOffset$$inline_980_aSb$$inline_846_aSb$$inline_849_counter$$inline_878$$, 71, $aEventManager$$inline_851_block$$inline_848_counter$$inline_983$$, $chip$$inline_852$$, 0, $chipCounter$$inline_853$$, 0, $JSCompiler_alias_TRUE$$)
              }
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              15]);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              16]);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              17])
            }
            $offset$$inline_504_offset$$inline_509$$ += 17;
            break;
          case 48:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$ = 
            $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_502_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_507$$;
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$ = $aSb$$56$$;
            $aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ = $offset$$inline_504_offset$$inline_509$$;
            $dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$ = 0;
            $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolWeek_$.$gridSize$.width;
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append((100 * ($blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$ / $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolWeek_$.$gridContainerSize$.width)).toFixed(4));
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
            1]);
            $blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$ = 0;
            for($blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolWeek_$.$blocksNumber_$;$blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$ < 
            $blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$;$blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$++) {
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              2]), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append((100 * ($dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$ / $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$)).toFixed(4)), 
              $dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$ += $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolWeek_$.$blocks$[$blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$].size, 
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              3]), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append((100 - 100 * ($dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$ / $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$)).toFixed(4)), 
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              4]), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append(-100 * $blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              5]), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              6]), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              7]), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolWeek_$.$blocks$[$blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$].$expanded$ ? 
              "wk-col-zippy-expanded" : "wk-col-zippy-collapsed"), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              8]), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              9])
            }
            $offset$$inline_504_offset$$inline_509$$ += 9;
            break;
          case 62:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$ = 
            $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_502_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_507$$;
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$ = $aSb$$56$$;
            $aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ = $offset$$inline_504_offset$$inline_509$$;
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolWeek_$.$gridContainerSize$.height);
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
            1]);
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolWeek_$.$expanded$ ? 
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append("mpbs-wk-scroll-horz-on") : $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append("mpbs-wk-scroll-horz-off");
            $offset$$inline_504_offset$$inline_509$$++;
            break;
          case 66:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$ = 
            $aSb$$56$$;
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.append($rflect$cal$TimeMarker$HEAD_PARTS_$$[0]);
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.append($JSCompiler_StaticMethods_getPosition_$$($JSCompiler_alias_TRUE$$));
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.append($rflect$cal$TimeMarker$HEAD_PARTS_$$[1]);
            break;
          case 67:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$ = 
            $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_502_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_507$$;
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$ = $aSb$$56$$;
            $aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ = $offset$$inline_504_offset$$inline_509$$;
            $dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$ = 100 * ($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolWeek_$.$gridSize$.width / 
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolWeek_$.$gridContainerSize$.width);
            if(1 in $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$cache_$ && 
            2 in $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$cache_$) {
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$cache_$[1]), 
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$), $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$cache_$[2])
            }else {
              $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$ = new $goog$string$StringBuffer$$;
              $blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$ = new $goog$i18n$DateTimeFormat$$($goog$i18n$DateTimeSymbols_en$$.$TIMEFORMATS$[3]);
              $blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$ = new $goog$date$DateTime$$;
              $aSb$$inline_976_aSb$$inline_979_blocksNumber$$inline_828_blocksNumber$$inline_845_timeIncrement$$inline_877$$ = new $goog$date$Interval$$(0, 0, 0, 0, 30);
              $blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$.setHours(0);
              $blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$.setMinutes(0);
              $blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$.setSeconds(0);
              for($aOffset$$inline_980_aSb$$inline_846_aSb$$inline_849_counter$$inline_878$$ = 0;48 > $aOffset$$inline_980_aSb$$inline_846_aSb$$inline_849_counter$$inline_878$$;$aOffset$$inline_980_aSb$$inline_846_aSb$$inline_849_counter$$inline_878$$++, $blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$.add($aSb$$inline_976_aSb$$inline_979_blocksNumber$$inline_828_blocksNumber$$inline_845_timeIncrement$$inline_877$$)) {
                0 < $aOffset$$inline_980_aSb$$inline_846_aSb$$inline_849_counter$$inline_878$$ && $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$]), 
                $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$.append("grid-table-row "), 0 == $aOffset$$inline_980_aSb$$inline_846_aSb$$inline_849_counter$$inline_878$$ % 2 ? (47 != $aOffset$$inline_980_aSb$$inline_846_aSb$$inline_849_counter$$inline_878$$ && $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$.append("grid-table-row-even"), 
                $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
                1]), $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$.append("hl-even")) : (47 != $aOffset$$inline_980_aSb$$inline_846_aSb$$inline_849_counter$$inline_878$$ && $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$.append("grid-table-row-odd"), 
                $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
                1]), $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$.append("hl-odd")), $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
                2]), $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$.append($JSCompiler_StaticMethods_format$$($blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$, $blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$)), 
                $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
                3])
              }
              $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              4]);
              $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              5]);
              $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              6]);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$cache_$[1] = 
              $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$.toString());
              $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$.clear();
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$);
              $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              7]);
              for($aOffset$$inline_980_aSb$$inline_846_aSb$$inline_849_counter$$inline_878$$ = 0;48 > $aOffset$$inline_980_aSb$$inline_846_aSb$$inline_849_counter$$inline_878$$;$aOffset$$inline_980_aSb$$inline_846_aSb$$inline_849_counter$$inline_878$$++) {
                $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
                8]), $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$.append("grid-table-row "), 0 == $aOffset$$inline_980_aSb$$inline_846_aSb$$inline_849_counter$$inline_878$$ % 2 ? 47 != $aOffset$$inline_980_aSb$$inline_846_aSb$$inline_849_counter$$inline_878$$ && $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$.append("grid-table-row-even") : 
                47 != $aOffset$$inline_980_aSb$$inline_846_aSb$$inline_849_counter$$inline_878$$ && $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$.append("grid-table-row-odd"), $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
                9])
              }
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$cache_$[2] = 
              $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$.toString())
            }
            $offset$$inline_504_offset$$inline_509$$ += 9;
            break;
          case 78:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$ = 
            $aSb$$56$$;
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$ = $offset$$inline_504_offset$$inline_509$$;
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.append(100 * 
            ($JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_502_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_507$$.$blockPoolWeek_$.$gridSize$.width / $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_502_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_507$$.$blockPoolWeek_$.$gridContainerSize$.width));
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$ + 
            1]);
            $offset$$inline_504_offset$$inline_509$$++;
            break;
          case 80:
            $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$ = 
            $JSCompiler_StaticMethods_buildBodyInternalMonth_$self$$inline_502_JSCompiler_StaticMethods_buildBodyInternalWeek_$self$$inline_507$$;
            $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$ = $aSb$$56$$;
            $aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ = $offset$$inline_504_offset$$inline_509$$;
            $dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$ = 0;
            $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolWeek_$.$gridSize$.width;
            $blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$ = 0;
            for($blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolWeek_$.$blocksNumber_$;$blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$ < 
            $blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$;$blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$++) {
              0 < $blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$ && $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$]);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              1]);
              $blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$ == $blocksNumber$$inline_862_blocksNumber$$inline_890_colCounter$$inline_827_colCounter$$inline_844_timeCounter$$inline_876$$ - 1 && $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append(" weekgrid-col-last");
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              2]);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append((100 * ($dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$ / $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$)).toFixed(4));
              $dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$ += $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolWeek_$.$blocks$[$blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$].size;
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              3]);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append((100 - 100 * ($dateInFirstCol$$inline_810_dayNameNumber$$inline_789_daySeries$$inline_824_gridRowsWidth$$inline_873_prevColsCumulativeSize$$inline_841_prevColsCumulativeSize$$inline_859_prevColsCumulativeSize$$inline_887_rowCounter$$inline_798$$ / $blocksNumber$$inline_799_counter$$inline_790_gridWidth$$inline_842_gridWidth$$inline_860_gridWidth$$inline_888_prevColsCumulativeSize$$inline_825_rowCounter$$inline_811_sb$$inline_874$$)).toFixed(4));
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              4]);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append(-100 * $blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              5]);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              6]);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              7]);
              $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$timeManager_$.$currentDay_$ && 
              $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$timeManager_$.$currentDay_$.$equals$($JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$timeManager_$.$daySeries$[$blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$], 
              7) && ($aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              8]), $aSb$$inline_976_aSb$$inline_979_blocksNumber$$inline_828_blocksNumber$$inline_845_timeIncrement$$inline_877$$ = $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$, $aSb$$inline_976_aSb$$inline_979_blocksNumber$$inline_828_blocksNumber$$inline_845_timeIncrement$$inline_877$$.append($rflect$cal$TimeMarker$HEAD_PARTS_$$[2]), 
              $aSb$$inline_976_aSb$$inline_979_blocksNumber$$inline_828_blocksNumber$$inline_845_timeIncrement$$inline_877$$.append($JSCompiler_StaticMethods_getPosition_$$($JSCompiler_alias_FALSE$$)), $aSb$$inline_976_aSb$$inline_979_blocksNumber$$inline_828_blocksNumber$$inline_845_timeIncrement$$inline_877$$.append($rflect$cal$TimeMarker$HEAD_PARTS_$$[3]));
              $aSb$$inline_976_aSb$$inline_979_blocksNumber$$inline_828_blocksNumber$$inline_845_timeIncrement$$inline_877$$ = $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$;
              $aOffset$$inline_980_aSb$$inline_846_aSb$$inline_849_counter$$inline_878$$ = $aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 9;
              $aChips$$inline_850_aOffset$$inline_847_block$$inline_982$$ = $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolWeek_$.$blocks$[$blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$];
              for($aEventManager$$inline_851_block$$inline_848_counter$$inline_983$$ = 0;6 > $aEventManager$$inline_851_block$$inline_848_counter$$inline_983$$;$aEventManager$$inline_851_block$$inline_848_counter$$inline_983$$++) {
                $aSb$$inline_976_aSb$$inline_979_blocksNumber$$inline_828_blocksNumber$$inline_845_timeIncrement$$inline_877$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_980_aSb$$inline_846_aSb$$inline_849_counter$$inline_878$$]), $aSb$$inline_976_aSb$$inline_979_blocksNumber$$inline_828_blocksNumber$$inline_845_timeIncrement$$inline_877$$.append(!$aChips$$inline_850_aOffset$$inline_847_block$$inline_982$$.$expanded$ && $aChips$$inline_850_aOffset$$inline_847_block$$inline_982$$.$couldBeExpanded$ ? 
                "expand-sign-wk-collapsed" : $aChips$$inline_850_aOffset$$inline_847_block$$inline_982$$.$expanded$ && $aChips$$inline_850_aOffset$$inline_847_block$$inline_982$$.$couldBeCollapsed$ ? "expand-sign-wk-expanded" : ""), $aSb$$inline_976_aSb$$inline_979_blocksNumber$$inline_828_blocksNumber$$inline_845_timeIncrement$$inline_877$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_980_aSb$$inline_846_aSb$$inline_849_counter$$inline_878$$ + 1])
              }
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              11]);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              12]);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              13]);
              $rflect$cal$MainPaneBuilder$forEachChip_$$($aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$, $aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              14, $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$eventManager_$, 
              $JSCompiler_StaticMethods_buildAllDayGrid_$self$$inline_834_JSCompiler_StaticMethods_buildDayNamesWeek_$self$$inline_821_JSCompiler_StaticMethods_buildHoursAndGridRows_$self$$inline_870_JSCompiler_StaticMethods_buildMnRowZippies_$self$$inline_795_JSCompiler_StaticMethods_buildScrollableAllday_$self$$inline_830_JSCompiler_StaticMethods_buildScrollableWeek_$self$$inline_864_JSCompiler_StaticMethods_buildWeekColZippies_$self$$inline_856_JSCompiler_StaticMethods_buildWeekGridAdCols_$self$$inline_838_JSCompiler_StaticMethods_buildWeekGridCols_$self$$inline_884_JSCompiler_StaticMethods_buildWeekNumbers_$self$$inline_807_aSb$$inline_784_aSb$$inline_786_aSb$$inline_802_aSb$$inline_814_aSb$$inline_868_aSb$$inline_881$$.$blockPoolWeek_$, 
              $blocksNumber$$inline_812_colCounter$$inline_861_colCounter$$inline_889_gridWidth$$inline_826_sparseArrays$$inline_843_timeFormat$$inline_875$$, $rflect$cal$MainPaneBuilder$buildWeekBlockChip_$$);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              25]);
              $aOffset$$inline_787_aOffset$$inline_815_aOffset$$inline_882_aSb$$inline_796_aSb$$inline_808_aSb$$inline_822_aSb$$inline_831_aSb$$inline_835_aSb$$inline_839_aSb$$inline_857_aSb$$inline_865_aSb$$inline_871_aSb$$inline_885$$.append($rflect$cal$MainPaneBuilder$HTML_PARTS_WEEK_$$[$aOffset$$inline_797_aOffset$$inline_809_aOffset$$inline_823_aOffset$$inline_832_aOffset$$inline_836_aOffset$$inline_840_aOffset$$inline_858_aOffset$$inline_866_aOffset$$inline_872_aOffset$$inline_886_counter$$inline_816_dayNamesFirstNumber$$inline_788$$ + 
              26])
            }
            $offset$$inline_504_offset$$inline_509$$ += 26
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
  $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_getHandler$$(this), this.$getElement$(), "click", this.$onClick_$, $JSCompiler_alias_FALSE$$, this), this.$getElement$(), "mouseover", this.$onMouseOver_$, $JSCompiler_alias_FALSE$$, this), this.$getElement$(), "mouseout", this.$onMouseOut_$, 
  $JSCompiler_alias_FALSE$$, this), this.$getElement$(), "mousedown", this.$onMouseDown_$, $JSCompiler_alias_FALSE$$, this), this.$getElement$(), "selectstart", this.$onSelectStart_$, $JSCompiler_alias_FALSE$$, this), document, "mousemove", this.$onMouseMove_$, $JSCompiler_alias_FALSE$$, this), document, "mouseup", this.$onMouseUp_$, $JSCompiler_alias_FALSE$$, this);
  this.$timeMarker_$.start()
};
$JSCompiler_prototypeAlias$$.$onClick_$ = function $$JSCompiler_prototypeAlias$$$$onClick_$$($JSCompiler_StaticMethods_toggleBlock$self$$inline_512_JSCompiler_StaticMethods_toggleBlock$self$$inline_520_JSCompiler_StaticMethods_toggleBlock$self$$inline_523_aEvent$$14_zippyClicked$$) {
  var $target$$48$$ = $JSCompiler_StaticMethods_toggleBlock$self$$inline_512_JSCompiler_StaticMethods_toggleBlock$self$$inline_520_JSCompiler_StaticMethods_toggleBlock$self$$inline_523_aEvent$$14_zippyClicked$$.target, $id$$12$$ = $target$$48$$.id, $className$$34$$ = $target$$48$$.className, $JSCompiler_StaticMethods_toggleBlock$self$$inline_512_JSCompiler_StaticMethods_toggleBlock$self$$inline_520_JSCompiler_StaticMethods_toggleBlock$self$$inline_523_aEvent$$14_zippyClicked$$ = $JSCompiler_alias_FALSE$$, 
  $day$$inline_518_index$$64_index$$inline_517$$ = 0;
  $JSCompiler_StaticMethods_isInMonthMode$$(this.$viewManager_$) ? /mn\-zippy\-row\d{1}/.test($id$$12$$) ? ($day$$inline_518_index$$64_index$$inline_517$$ = /\d{1}/.exec($id$$12$$)[0], $JSCompiler_StaticMethods_toggleBlock$self$$inline_512_JSCompiler_StaticMethods_toggleBlock$self$$inline_520_JSCompiler_StaticMethods_toggleBlock$self$$inline_523_aEvent$$14_zippyClicked$$ = this.$blockManager_$.$blockPoolMonth$, $JSCompiler_StaticMethods_toggleBlock$self$$inline_512_JSCompiler_StaticMethods_toggleBlock$self$$inline_520_JSCompiler_StaticMethods_toggleBlock$self$$inline_523_aEvent$$14_zippyClicked$$.$blocks$[$day$$inline_518_index$$64_index$$inline_517$$].$expanded$ = 
  !$JSCompiler_StaticMethods_toggleBlock$self$$inline_512_JSCompiler_StaticMethods_toggleBlock$self$$inline_520_JSCompiler_StaticMethods_toggleBlock$self$$inline_523_aEvent$$14_zippyClicked$$.$blocks$[$day$$inline_518_index$$64_index$$inline_517$$].$expanded$, $JSCompiler_StaticMethods_updateExpandState_$$($JSCompiler_StaticMethods_toggleBlock$self$$inline_512_JSCompiler_StaticMethods_toggleBlock$self$$inline_520_JSCompiler_StaticMethods_toggleBlock$self$$inline_523_aEvent$$14_zippyClicked$$), this.$blockManager_$.$blockPoolMonth$.$expanded$ || 
  (this.$blockManager_$.$blockPoolMonth$.scrollTop = 0), $JSCompiler_StaticMethods_toggleBlock$self$$inline_512_JSCompiler_StaticMethods_toggleBlock$self$$inline_520_JSCompiler_StaticMethods_toggleBlock$self$$inline_523_aEvent$$14_zippyClicked$$ = $JSCompiler_alias_TRUE$$) : $JSCompiler_StaticMethods_isDaynumLabel_$$(this, $className$$34$$) ? $JSCompiler_StaticMethods_onDaynumLabelClick_$$(this, $id$$12$$) : $JSCompiler_StaticMethods_isWeeknumLabel_$$(this, $className$$34$$) && ($day$$inline_518_index$$64_index$$inline_517$$ = 
  $rflect$string$getNumericIndex$$($target$$48$$.parentNode.id), $_log$$("index", $day$$inline_518_index$$64_index$$inline_517$$), ($day$$inline_518_index$$64_index$$inline_517$$ = this.$timeManager_$.$daySeries$[7 * $day$$inline_518_index$$64_index$$inline_517$$]) && $JSCompiler_StaticMethods_switchView_$$(this, $day$$inline_518_index$$64_index$$inline_517$$, 3)) : $JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$) && (/wk\-zippy\-col\d{1}/.test($id$$12$$) ? ($day$$inline_518_index$$64_index$$inline_517$$ = 
  /\d{1}/.exec($id$$12$$)[0], $JSCompiler_StaticMethods_toggleBlock$self$$inline_512_JSCompiler_StaticMethods_toggleBlock$self$$inline_520_JSCompiler_StaticMethods_toggleBlock$self$$inline_523_aEvent$$14_zippyClicked$$ = this.$blockManager_$.$blockPoolWeek$, $JSCompiler_StaticMethods_toggleBlock$self$$inline_512_JSCompiler_StaticMethods_toggleBlock$self$$inline_520_JSCompiler_StaticMethods_toggleBlock$self$$inline_523_aEvent$$14_zippyClicked$$.$blocks$[$day$$inline_518_index$$64_index$$inline_517$$].$expanded$ = 
  !$JSCompiler_StaticMethods_toggleBlock$self$$inline_512_JSCompiler_StaticMethods_toggleBlock$self$$inline_520_JSCompiler_StaticMethods_toggleBlock$self$$inline_523_aEvent$$14_zippyClicked$$.$blocks$[$day$$inline_518_index$$64_index$$inline_517$$].$expanded$, $JSCompiler_StaticMethods_updateExpandState_$$($JSCompiler_StaticMethods_toggleBlock$self$$inline_512_JSCompiler_StaticMethods_toggleBlock$self$$inline_520_JSCompiler_StaticMethods_toggleBlock$self$$inline_523_aEvent$$14_zippyClicked$$), this.$blockManager_$.$blockPoolWeek$.$expanded$ || 
  (this.$blockManager_$.$blockPoolWeek$.scrollLeft = 0), $JSCompiler_StaticMethods_toggleBlock$self$$inline_512_JSCompiler_StaticMethods_toggleBlock$self$$inline_520_JSCompiler_StaticMethods_toggleBlock$self$$inline_523_aEvent$$14_zippyClicked$$ = $JSCompiler_alias_TRUE$$) : /daynames\-zippy/.test($id$$12$$) ? ($JSCompiler_StaticMethods_toggleBlock$self$$inline_512_JSCompiler_StaticMethods_toggleBlock$self$$inline_520_JSCompiler_StaticMethods_toggleBlock$self$$inline_523_aEvent$$14_zippyClicked$$ = 
  this.$blockManager_$.$blockPoolAllday$, $JSCompiler_StaticMethods_toggleBlock$self$$inline_512_JSCompiler_StaticMethods_toggleBlock$self$$inline_520_JSCompiler_StaticMethods_toggleBlock$self$$inline_523_aEvent$$14_zippyClicked$$.$blocks$[0].$expanded$ = !$JSCompiler_StaticMethods_toggleBlock$self$$inline_512_JSCompiler_StaticMethods_toggleBlock$self$$inline_520_JSCompiler_StaticMethods_toggleBlock$self$$inline_523_aEvent$$14_zippyClicked$$.$blocks$[0].$expanded$, $JSCompiler_StaticMethods_updateExpandState_$$($JSCompiler_StaticMethods_toggleBlock$self$$inline_512_JSCompiler_StaticMethods_toggleBlock$self$$inline_520_JSCompiler_StaticMethods_toggleBlock$self$$inline_523_aEvent$$14_zippyClicked$$), 
  $JSCompiler_StaticMethods_toggleBlock$self$$inline_512_JSCompiler_StaticMethods_toggleBlock$self$$inline_520_JSCompiler_StaticMethods_toggleBlock$self$$inline_523_aEvent$$14_zippyClicked$$ = $JSCompiler_alias_TRUE$$) : $JSCompiler_StaticMethods_isDaynumLabel_$$(this, $className$$34$$) && $JSCompiler_StaticMethods_onDaynumLabelClick_$$(this, $target$$48$$.parentNode.id));
  $JSCompiler_StaticMethods_toggleBlock$self$$inline_512_JSCompiler_StaticMethods_toggleBlock$self$$inline_520_JSCompiler_StaticMethods_toggleBlock$self$$inline_523_aEvent$$14_zippyClicked$$ && (this.$updateBeforeRedraw$(), this.$updateByRedraw$())
};
$JSCompiler_prototypeAlias$$.$onMouseOut_$ = function $$JSCompiler_prototypeAlias$$$$onMouseOut_$$($aEvent$$15_className$$35$$) {
  $aEvent$$15_className$$35$$ = $aEvent$$15_className$$35$$.target.className;
  ($JSCompiler_StaticMethods_isDaynumLabel_$$(this, $aEvent$$15_className$$35$$) || $JSCompiler_StaticMethods_isWeeknumLabel_$$(this, $aEvent$$15_className$$35$$) || $rflect$string$buildClassNameRe$$("zippy").test($aEvent$$15_className$$35$$)) && $JSCompiler_StaticMethods_registerTarget$$(this.$moRegistry_$, $JSCompiler_alias_NULL$$)
};
$JSCompiler_prototypeAlias$$.$onMouseOver_$ = function $$JSCompiler_prototypeAlias$$$$onMouseOver_$$($aEvent$$16_target$$50$$) {
  var $aEvent$$16_target$$50$$ = $aEvent$$16_target$$50$$.target, $className$$36$$ = $aEvent$$16_target$$50$$.className;
  $JSCompiler_StaticMethods_isDaynumLabel_$$(this, $className$$36$$) || $JSCompiler_StaticMethods_isWeeknumLabel_$$(this, $className$$36$$) ? $JSCompiler_StaticMethods_registerTarget$$(this.$moRegistry_$, $aEvent$$16_target$$50$$, "label-underlined") : $rflect$string$buildClassNameRe$$("zippy").test($className$$36$$) ? $JSCompiler_StaticMethods_registerTarget$$(this.$moRegistry_$, $aEvent$$16_target$$50$$, "zippy-highlighted") : $JSCompiler_StaticMethods_registerTarget$$(this.$moRegistry_$, $JSCompiler_alias_NULL$$)
};
function $JSCompiler_StaticMethods_onDaynumLabelClick_$$($JSCompiler_StaticMethods_onDaynumLabelClick_$self$$, $aId$$4$$) {
  var $day$$4_index$$65$$ = $rflect$string$getNumericIndex$$($aId$$4$$);
  $_log$$("index", $day$$4_index$$65$$);
  ($day$$4_index$$65$$ = $JSCompiler_StaticMethods_onDaynumLabelClick_$self$$.$timeManager_$.$daySeries$[$day$$4_index$$65$$]) && $JSCompiler_StaticMethods_switchView_$$($JSCompiler_StaticMethods_onDaynumLabelClick_$self$$, $day$$4_index$$65$$, 1)
}
function $JSCompiler_StaticMethods_switchView_$$($JSCompiler_StaticMethods_switchView_$self$$, $aDate$$10_opt_date$$inline_905$$, $aType$$) {
  $aDate$$10_opt_date$$inline_905$$ = new $goog$date$DateTime$$($aDate$$10_opt_date$$inline_905$$.getYear(), $aDate$$10_opt_date$$inline_905$$.getMonth(), $aDate$$10_opt_date$$inline_905$$.getDate());
  $JSCompiler_StaticMethods_switchView_$self$$.$timeManager_$.$basis$ = $aDate$$10_opt_date$$inline_905$$ || new $goog$date$Date$$;
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
  this.$selectionMask_$.$initialized_$ && (this.$selectionMask_$.close(), $aEvent$$20$$.preventDefault())
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
  for(var $counter$$20$$ = 1, $length$$38$$ = $rflect$cal$MainBody$HTML_PARTS_$$.length - 1;$counter$$20$$ < $length$$38$$;$counter$$20$$++) {
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
function $rflect$cal$blocks$Block$sort$$($a$$20$$, $b$$19$$) {
  var $diff$$3$$ = 0, $startComparison$$ = 0 < ($diff$$3$$ = $a$$20$$.start - $b$$19$$.start) ? 1 : 0 > $diff$$3$$ ? -1 : 0;
  return 0 != $startComparison$$ ? $startComparison$$ : 0 < ($diff$$3$$ = $b$$19$$.end - $a$$20$$.end) ? 1 : 0 > $diff$$3$$ ? -1 : 0
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
    var $JSCompiler_StaticMethods_computeEventMap$self$$inline_532_JSCompiler_StaticMethods_createSparseArraysFromBlobs$self$$inline_558$$ = $JSCompiler_StaticMethods_updateEventMap$self$$.$blocks$[$counter$$24$$], $aChips$$inline_533_blobs$$inline_560$$ = $aChips$$2$$[$counter$$24$$], $i$$inline_534_sparseArrays$$inline_561$$ = 0, $aDaysNumber$$inline_559_blobCounter$$inline_563_length$$inline_535$$ = 0, $blobLength$$inline_564_blobs$$inline_536_counter$$inline_562$$ = [], $blob$$inline_565_currentBlob$$inline_537$$ = 
    [], $chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$ = 0, $blobEntryCounter$$inline_566_maxCol$$inline_539$$ = 0;
    $aChips$$inline_533_blobs$$inline_560$$.sort($rflect$cal$blocks$Block$sort$$);
    for(var $blobEntriesLength$$inline_567_latestItemEnd$$inline_540$$ = $JSCompiler_alias_VOID$$, $chip$$inline_569_colEndArray$$inline_541$$ = [], $i$$inline_534_sparseArrays$$inline_561$$ = 0, $aDaysNumber$$inline_559_blobCounter$$inline_563_length$$inline_535$$ = $aChips$$inline_533_blobs$$inline_560$$.length;$i$$inline_534_sparseArrays$$inline_561$$ < $aDaysNumber$$inline_559_blobCounter$$inline_563_length$$inline_535$$;++$i$$inline_534_sparseArrays$$inline_561$$) {
      var $blobEntry$$inline_568_chip$$inline_542_startCol$$inline_570$$ = $aChips$$inline_533_blobs$$inline_560$$[$i$$inline_534_sparseArrays$$inline_561$$], $itemStart$$inline_543_start$$inline_571$$ = $blobEntry$$inline_568_chip$$inline_542_startCol$$inline_570$$.start, $chipCounter$$inline_572_itemEnd$$inline_544$$ = $blobEntry$$inline_568_chip$$inline_542_startCol$$inline_570$$.end;
      $blobEntriesLength$$inline_567_latestItemEnd$$inline_540$$ || ($blobEntriesLength$$inline_567_latestItemEnd$$inline_540$$ = $chipCounter$$inline_572_itemEnd$$inline_544$$);
      $blob$$inline_565_currentBlob$$inline_537$$.length && ($blobEntriesLength$$inline_567_latestItemEnd$$inline_540$$ && $itemStart$$inline_543_start$$inline_571$$ >= $blobEntriesLength$$inline_567_latestItemEnd$$inline_540$$) && ($blobLength$$inline_564_blobs$$inline_536_counter$$inline_562$$.push({blob:$blob$$inline_565_currentBlob$$inline_537$$, $totalCols$:$chip$$inline_569_colEndArray$$inline_541$$.length}), $blob$$inline_565_currentBlob$$inline_537$$ = [], $chip$$inline_569_colEndArray$$inline_541$$ = 
      []);
      for(var $chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$ = $JSCompiler_alias_FALSE$$, $end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$ = 0, $colEndArrayLength$$inline_547_currentBlobLength$$inline_551_spanOfShrunkItem$$inline_552$$ = $chip$$inline_569_colEndArray$$inline_541$$.length;$end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$ < $colEndArrayLength$$inline_547_currentBlobLength$$inline_551_spanOfShrunkItem$$inline_552$$;++$end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$) {
        if($chip$$inline_569_colEndArray$$inline_541$$[$end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$].end <= $itemStart$$inline_543_start$$inline_571$$) {
          $chip$$inline_569_colEndArray$$inline_541$$[$end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$] = $blobEntry$$inline_568_chip$$inline_542_startCol$$inline_570$$;
          for($chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$ = Number($end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$) + 1;$chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$ < $chip$$inline_569_colEndArray$$inline_541$$.length && !($chip$$inline_569_colEndArray$$inline_541$$[$chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$].end > 
          $itemStart$$inline_543_start$$inline_571$$);) {
            $chip$$inline_569_colEndArray$$inline_541$$[$chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$] = $blobEntry$$inline_568_chip$$inline_542_startCol$$inline_570$$, $chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$++
          }
          $blob$$inline_565_currentBlob$$inline_537$$.push({$chip$:$blobEntry$$inline_568_chip$$inline_542_startCol$$inline_570$$, $startCol$:$end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$, colSpan:$chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$ - $end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$});
          $end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$ > $blobEntryCounter$$inline_566_maxCol$$inline_539$$ && ($blobEntryCounter$$inline_566_maxCol$$inline_539$$ = $end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$);
          $blobEntriesLength$$inline_567_latestItemEnd$$inline_540$$ && $chipCounter$$inline_572_itemEnd$$inline_544$$ > $blobEntriesLength$$inline_567_latestItemEnd$$inline_540$$ && ($blobEntriesLength$$inline_567_latestItemEnd$$inline_540$$ = $chipCounter$$inline_572_itemEnd$$inline_544$$);
          $chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$ = $JSCompiler_alias_TRUE$$;
          break
        }
      }
      if(!$chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$) {
        $end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$ = 1;
        for($colEndArrayLength$$inline_547_currentBlobLength$$inline_551_spanOfShrunkItem$$inline_552$$ = $chip$$inline_569_colEndArray$$inline_541$$.length;$end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$ < $colEndArrayLength$$inline_547_currentBlobLength$$inline_551_spanOfShrunkItem$$inline_552$$;++$end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$) {
          if($goog$getUid$$($chip$$inline_569_colEndArray$$inline_541$$[$end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$]) == $goog$getUid$$($chip$$inline_569_colEndArray$$inline_541$$[$end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$ - 1])) {
            for(var $kk$$inline_550_mm$$inline_555$$ = 1, $colEndArrayLength$$inline_547_currentBlobLength$$inline_551_spanOfShrunkItem$$inline_552$$ = $blob$$inline_565_currentBlob$$inline_537$$.length;$kk$$inline_550_mm$$inline_555$$ < $colEndArrayLength$$inline_547_currentBlobLength$$inline_551_spanOfShrunkItem$$inline_552$$;++$kk$$inline_550_mm$$inline_555$$) {
              if($goog$getUid$$($blob$$inline_565_currentBlob$$inline_537$$[$kk$$inline_550_mm$$inline_555$$].$chip$) == $goog$getUid$$($chip$$inline_569_colEndArray$$inline_541$$[$end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$])) {
                $colEndArrayLength$$inline_547_currentBlobLength$$inline_551_spanOfShrunkItem$$inline_552$$ = $blob$$inline_565_currentBlob$$inline_537$$[$kk$$inline_550_mm$$inline_555$$].colSpan;
                $blob$$inline_565_currentBlob$$inline_537$$.push({$chip$:$blobEntry$$inline_568_chip$$inline_542_startCol$$inline_570$$, $startCol$:$chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$ = Number($blob$$inline_565_currentBlob$$inline_537$$[$kk$$inline_550_mm$$inline_555$$].$startCol$) + 1, colSpan:$colEndArrayLength$$inline_547_currentBlobLength$$inline_551_spanOfShrunkItem$$inline_552$$ - 1});
                $chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$ > $blobEntryCounter$$inline_566_maxCol$$inline_539$$ && ($blobEntryCounter$$inline_566_maxCol$$inline_539$$ = $chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$);
                for($chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$ = $end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$;$chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$ < $end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$ + $colEndArrayLength$$inline_547_currentBlobLength$$inline_551_spanOfShrunkItem$$inline_552$$ - 
                1;$chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$++) {
                  $chip$$inline_569_colEndArray$$inline_541$$[$chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$] = $blobEntry$$inline_568_chip$$inline_542_startCol$$inline_570$$
                }
                $blob$$inline_565_currentBlob$$inline_537$$[$kk$$inline_550_mm$$inline_555$$] = {$chip$:$blob$$inline_565_currentBlob$$inline_537$$[$kk$$inline_550_mm$$inline_555$$].$chip$, $startCol$:$chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$ = $blob$$inline_565_currentBlob$$inline_537$$[$kk$$inline_550_mm$$inline_555$$].$startCol$, colSpan:1};
                $chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$ > $blobEntryCounter$$inline_566_maxCol$$inline_539$$ && ($blobEntryCounter$$inline_566_maxCol$$inline_539$$ = $chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$);
                $blobEntriesLength$$inline_567_latestItemEnd$$inline_540$$ && $chipCounter$$inline_572_itemEnd$$inline_544$$ > $blobEntriesLength$$inline_567_latestItemEnd$$inline_540$$ && ($blobEntriesLength$$inline_567_latestItemEnd$$inline_540$$ = $chipCounter$$inline_572_itemEnd$$inline_544$$);
                break
              }
            }
            $chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$ = $JSCompiler_alias_TRUE$$;
            break
          }
        }
        if(!$chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$) {
          $end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$ = $chip$$inline_569_colEndArray$$inline_541$$.length;
          $kk$$inline_550_mm$$inline_555$$ = 1;
          for($colEndArrayLength$$inline_547_currentBlobLength$$inline_551_spanOfShrunkItem$$inline_552$$ = $blob$$inline_565_currentBlob$$inline_537$$.length;$kk$$inline_550_mm$$inline_555$$ < $colEndArrayLength$$inline_547_currentBlobLength$$inline_551_spanOfShrunkItem$$inline_552$$;++$kk$$inline_550_mm$$inline_555$$) {
            $chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$ = $blob$$inline_565_currentBlob$$inline_537$$[$kk$$inline_550_mm$$inline_555$$].$chip$.end, $blob$$inline_565_currentBlob$$inline_537$$[$kk$$inline_550_mm$$inline_555$$].$startCol$ + $blob$$inline_565_currentBlob$$inline_537$$[$kk$$inline_550_mm$$inline_555$$].colSpan == $end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$ && $chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$ <= 
            $itemStart$$inline_543_start$$inline_571$$ && ($blob$$inline_565_currentBlob$$inline_537$$[$kk$$inline_550_mm$$inline_555$$] = {$chip$:$blob$$inline_565_currentBlob$$inline_537$$[$kk$$inline_550_mm$$inline_555$$].$chip$, $startCol$:$chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$ = $blob$$inline_565_currentBlob$$inline_537$$[$kk$$inline_550_mm$$inline_555$$].$startCol$, colSpan:$blob$$inline_565_currentBlob$$inline_537$$[$kk$$inline_550_mm$$inline_555$$].colSpan + 
            1}, $chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$ > $blobEntryCounter$$inline_566_maxCol$$inline_539$$ && ($blobEntryCounter$$inline_566_maxCol$$inline_539$$ = $chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$))
          }
          $blob$$inline_565_currentBlob$$inline_537$$.push({$chip$:$blobEntry$$inline_568_chip$$inline_542_startCol$$inline_570$$, $startCol$:$chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$ = $chip$$inline_569_colEndArray$$inline_541$$.length, colSpan:1});
          $chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$ > $blobEntryCounter$$inline_566_maxCol$$inline_539$$ && ($blobEntryCounter$$inline_566_maxCol$$inline_539$$ = $chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$);
          $chip$$inline_569_colEndArray$$inline_541$$.push($blobEntry$$inline_568_chip$$inline_542_startCol$$inline_570$$);
          $blobEntriesLength$$inline_567_latestItemEnd$$inline_540$$ && $chipCounter$$inline_572_itemEnd$$inline_544$$ > $blobEntriesLength$$inline_567_latestItemEnd$$inline_540$$ && ($blobEntriesLength$$inline_567_latestItemEnd$$inline_540$$ = $chipCounter$$inline_572_itemEnd$$inline_544$$)
        }
      }
    }
    $blobLength$$inline_564_blobs$$inline_536_counter$$inline_562$$.push({blob:$blob$$inline_565_currentBlob$$inline_537$$, $totalCols$:$chip$$inline_569_colEndArray$$inline_541$$.length});
    $JSCompiler_StaticMethods_computeEventMap$self$$inline_532_JSCompiler_StaticMethods_createSparseArraysFromBlobs$self$$inline_558$$.$blobs$ = $blobLength$$inline_564_blobs$$inline_536_counter$$inline_562$$;
    if($opt_createArrays$$) {
      $JSCompiler_StaticMethods_computeEventMap$self$$inline_532_JSCompiler_StaticMethods_createSparseArraysFromBlobs$self$$inline_558$$ = $JSCompiler_StaticMethods_updateEventMap$self$$.$blocks$[$counter$$24$$];
      $aDaysNumber$$inline_559_blobCounter$$inline_563_length$$inline_535$$ = $opt_arraysLength$$ || 0;
      $aChips$$inline_533_blobs$$inline_560$$ = $JSCompiler_StaticMethods_computeEventMap$self$$inline_532_JSCompiler_StaticMethods_createSparseArraysFromBlobs$self$$inline_558$$.$blobs$;
      $i$$inline_534_sparseArrays$$inline_561$$ = [];
      for($blobLength$$inline_564_blobs$$inline_536_counter$$inline_562$$ = 0;$blobLength$$inline_564_blobs$$inline_536_counter$$inline_562$$ < $aDaysNumber$$inline_559_blobCounter$$inline_563_length$$inline_535$$;$blobLength$$inline_564_blobs$$inline_536_counter$$inline_562$$++) {
        $i$$inline_534_sparseArrays$$inline_561$$[$blobLength$$inline_564_blobs$$inline_536_counter$$inline_562$$] = []
      }
      $aDaysNumber$$inline_559_blobCounter$$inline_563_length$$inline_535$$ = 0;
      for($blobLength$$inline_564_blobs$$inline_536_counter$$inline_562$$ = $aChips$$inline_533_blobs$$inline_560$$.length;$aDaysNumber$$inline_559_blobCounter$$inline_563_length$$inline_535$$ < $blobLength$$inline_564_blobs$$inline_536_counter$$inline_562$$;$aDaysNumber$$inline_559_blobCounter$$inline_563_length$$inline_535$$++) {
        $blob$$inline_565_currentBlob$$inline_537$$ = $aChips$$inline_533_blobs$$inline_560$$[$aDaysNumber$$inline_559_blobCounter$$inline_563_length$$inline_535$$].blob;
        $blobEntryCounter$$inline_566_maxCol$$inline_539$$ = 0;
        for($blobEntriesLength$$inline_567_latestItemEnd$$inline_540$$ = $blob$$inline_565_currentBlob$$inline_537$$.length;$blobEntryCounter$$inline_566_maxCol$$inline_539$$ < $blobEntriesLength$$inline_567_latestItemEnd$$inline_540$$;$blobEntryCounter$$inline_566_maxCol$$inline_539$$++) {
          $blobEntry$$inline_568_chip$$inline_542_startCol$$inline_570$$ = $blob$$inline_565_currentBlob$$inline_537$$[$blobEntryCounter$$inline_566_maxCol$$inline_539$$];
          $chip$$inline_569_colEndArray$$inline_541$$ = $blobEntry$$inline_568_chip$$inline_542_startCol$$inline_570$$.$chip$;
          $blobEntry$$inline_568_chip$$inline_542_startCol$$inline_570$$ = $blobEntry$$inline_568_chip$$inline_542_startCol$$inline_570$$.$startCol$;
          $chipCounter$$inline_572_itemEnd$$inline_544$$ = $itemStart$$inline_543_start$$inline_571$$ = $chip$$inline_569_colEndArray$$inline_541$$.start;
          for($end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$ = $chip$$inline_569_colEndArray$$inline_541$$.end;$chipCounter$$inline_572_itemEnd$$inline_544$$ < $end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$;$chipCounter$$inline_572_itemEnd$$inline_544$$++) {
            $chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$ = $chip$$inline_569_colEndArray$$inline_541$$.$clone$(), $chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$.$startIsCut$ = $chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$.$endIsCut$ = $chipCounter$$inline_572_itemEnd$$inline_544$$ > 
            $itemStart$$inline_543_start$$inline_571$$ && $chipCounter$$inline_572_itemEnd$$inline_544$$ < $end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$ - 1, $chipCounter$$inline_572_itemEnd$$inline_544$$ == $itemStart$$inline_543_start$$inline_571$$ && 1 < $end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$ - $itemStart$$inline_543_start$$inline_571$$ && ($chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$.$endIsCut$ = 
            $JSCompiler_alias_TRUE$$), $chipCounter$$inline_572_itemEnd$$inline_544$$ == $end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$ - 1 && 1 < $end$$inline_573_ii$$inline_546_jj$$inline_549_lastColNum$$inline_554$$ - $itemStart$$inline_543_start$$inline_571$$ && ($chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$.$startIsCut$ = $JSCompiler_alias_TRUE$$), $i$$inline_534_sparseArrays$$inline_561$$[$chipCounter$$inline_572_itemEnd$$inline_544$$][$blobEntry$$inline_568_chip$$inline_542_startCol$$inline_570$$] = 
            $chipClone$$inline_574_lastCol$$inline_548_ll$$inline_553_mmEnd$$inline_556_placedItem$$inline_545_startCol$$inline_538$$
          }
        }
      }
      $JSCompiler_StaticMethods_computeEventMap$self$$inline_532_JSCompiler_StaticMethods_createSparseArraysFromBlobs$self$$inline_558$$.$sparseArrays$ = $i$$inline_534_sparseArrays$$inline_561$$
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
;function $rflect$cal$blocks$BlockManager$$($JSCompiler_StaticMethods_setBlocksNumber$self$$inline_576_aViewManager$$13$$, $aTimeManager$$10$$, $aEventManager$$7$$) {
  this.$viewManager_$ = $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_576_aViewManager$$13$$;
  this.$timeManager_$ = $aTimeManager$$10$$;
  this.$eventManager_$ = $aEventManager$$7$$;
  this.$blockPoolWeek$ = new $rflect$cal$blocks$BlockPool$$($JSCompiler_alias_TRUE$$);
  this.$blockPoolWeek$.fill();
  this.$blockPoolMonth$ = new $rflect$cal$blocks$BlockPool$$($JSCompiler_alias_FALSE$$);
  this.$blockPoolMonth$.fill(6);
  this.$blockPoolAllday$ = new $rflect$cal$blocks$BlockPool$$($JSCompiler_alias_FALSE$$);
  this.$blockPoolAllday$.fill(1);
  $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_576_aViewManager$$13$$ = this.$blockPoolAllday$;
  $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_576_aViewManager$$13$$.$blocksNumber_$ = 1;
  $JSCompiler_StaticMethods_updateExpandState_$$($JSCompiler_StaticMethods_setBlocksNumber$self$$inline_576_aViewManager$$13$$)
}
$rflect$cal$blocks$BlockManager$$.prototype.update = function $$rflect$cal$blocks$BlockManager$$$$update$() {
  if($JSCompiler_StaticMethods_isInWeekMode$$(this.$viewManager_$)) {
    var $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_579_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_582_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_585$$ = this.$blockPoolWeek$;
    $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_579_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_582_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_585$$.$blocksNumber_$ = this.$timeManager_$.$daySeries$.length;
    $JSCompiler_StaticMethods_updateExpandState_$$($JSCompiler_StaticMethods_setBlocksNumber$self$$inline_579_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_582_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_585$$);
    $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_579_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_582_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_585$$ = this.$blockPoolAllday$;
    $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_579_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_582_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_585$$.$blocksNumber_$ = 1;
    $JSCompiler_StaticMethods_updateExpandState_$$($JSCompiler_StaticMethods_setBlocksNumber$self$$inline_579_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_582_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_585$$);
    $JSCompiler_StaticMethods_updateCollapsedBlocks$$(this.$blockPoolWeek$);
    $JSCompiler_StaticMethods_updateCollapsedBlocks$$(this.$blockPoolAllday$);
    $JSCompiler_StaticMethods_updateEventMap$$(this.$blockPoolWeek$, this.$eventManager_$.$dayChips$);
    $JSCompiler_StaticMethods_updateEventMap$$(this.$blockPoolAllday$, this.$eventManager_$.$allDayChips$, $JSCompiler_alias_TRUE$$, this.$blockPoolWeek$.$blocksNumber_$);
    $JSCompiler_StaticMethods_updateExpandedBlocks$$(this.$blockPoolWeek$);
    $JSCompiler_StaticMethods_updateExpandedBlocks$$(this.$blockPoolAllday$)
  }else {
    $JSCompiler_StaticMethods_isInMonthMode$$(this.$viewManager_$) && ($JSCompiler_StaticMethods_setBlocksNumber$self$$inline_579_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_582_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_585$$ = this.$blockPoolMonth$, $JSCompiler_StaticMethods_setBlocksNumber$self$$inline_579_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_582_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_585$$.$blocksNumber_$ = this.$timeManager_$.$daySeries$.length / 
    7, $JSCompiler_StaticMethods_updateExpandState_$$($JSCompiler_StaticMethods_setBlocksNumber$self$$inline_579_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_582_JSCompiler_StaticMethods_setBlocksNumber$self$$inline_585$$), $JSCompiler_StaticMethods_updateCollapsedBlocks$$(this.$blockPoolMonth$), $JSCompiler_StaticMethods_updateEventMap$$(this.$blockPoolMonth$, this.$eventManager_$.$weekChips$), $JSCompiler_StaticMethods_updateExpandedBlocks$$(this.$blockPoolMonth$))
  }
};
function $goog$dom$ViewportSizeMonitor$$($opt_window$$3$$) {
  this.$window_$ = $opt_window$$3$$ || window;
  this.$listenerKey_$ = $goog$events$listen$$(this.$window_$, "resize", this.$handleResize_$, $JSCompiler_alias_FALSE$$, this);
  this.$size_$ = $goog$dom$getViewportSize_$$(this.$window_$ || window);
  if($goog$userAgent$WEBKIT$$ && $goog$userAgent$WINDOWS$$ || $goog$userAgent$OPERA$$ && this.$window_$.self != this.$window_$.top) {
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
  var $size$$14$$ = $goog$dom$getViewportSize_$$(this.$window_$ || window);
  $goog$math$Size$equals$$($size$$14$$, this.$size_$) || (this.$size_$ = $size$$14$$, this.dispatchEvent("resize"))
};
function $rflect$cal$ContainerSizeMonitor$$($aViewManager$$14_outerDiv$$inline_591$$, $aContainer$$2_innerDiv$$inline_592_width$$inline_593$$, $opt_window$$5_w$$inline_908$$) {
  $goog$dom$ViewportSizeMonitor$$.call(this, $opt_window$$5_w$$inline_908$$);
  this.$container_$ = $aContainer$$2_innerDiv$$inline_592_width$$inline_593$$;
  this.$containerSize_$ = new $goog$math$Size$$(this.$container_$.clientWidth, this.$container_$.clientHeight);
  $aViewManager$$14_outerDiv$$inline_591$$ = document.createElement("div");
  $aViewManager$$14_outerDiv$$inline_591$$.style.cssText = "visiblity:hidden;overflow:auto;position:absolute;top:0;width:100px;height:100px";
  var $aContainer$$2_innerDiv$$inline_592_width$$inline_593$$ = document.createElement("div"), $opt_window$$5_w$$inline_908$$ = "200px", $h$$inline_909$$;
  $opt_window$$5_w$$inline_908$$ instanceof $goog$math$Size$$ ? ($h$$inline_909$$ = $opt_window$$5_w$$inline_908$$.height, $opt_window$$5_w$$inline_908$$ = $opt_window$$5_w$$inline_908$$.width) : $h$$inline_909$$ = "200px";
  $aContainer$$2_innerDiv$$inline_592_width$$inline_593$$.style.width = $goog$style$getPixelStyleValue_$$($opt_window$$5_w$$inline_908$$);
  $aContainer$$2_innerDiv$$inline_592_width$$inline_593$$.style.height = $goog$style$getPixelStyleValue_$$($h$$inline_909$$);
  $aViewManager$$14_outerDiv$$inline_591$$.appendChild($aContainer$$2_innerDiv$$inline_592_width$$inline_593$$);
  document.body.appendChild($aViewManager$$14_outerDiv$$inline_591$$);
  $aContainer$$2_innerDiv$$inline_592_width$$inline_593$$ = $aViewManager$$14_outerDiv$$inline_591$$.offsetWidth - $aViewManager$$14_outerDiv$$inline_591$$.clientWidth;
  $goog$dom$removeNode$$($aViewManager$$14_outerDiv$$inline_591$$);
  this.$scrollbarWidth$ = $aContainer$$2_innerDiv$$inline_592_width$$inline_593$$
}
$goog$inherits$$($rflect$cal$ContainerSizeMonitor$$, $goog$dom$ViewportSizeMonitor$$);
$JSCompiler_prototypeAlias$$ = $rflect$cal$ContainerSizeMonitor$$.prototype;
$JSCompiler_prototypeAlias$$.$scrollbarWidth$ = 0;
$JSCompiler_prototypeAlias$$.$windowSizePollTimeout_$ = 0;
$JSCompiler_prototypeAlias$$.$getSize$ = function $$JSCompiler_prototypeAlias$$$$getSize$$() {
  return this.$containerSize_$ ? this.$containerSize_$.$clone$() : $JSCompiler_alias_NULL$$
};
$JSCompiler_prototypeAlias$$.$checkForSizeChange_$ = function $$JSCompiler_prototypeAlias$$$$checkForSizeChange_$$($aNotActualResize$$) {
  var $containerSize$$inline_596_viewportSize$$ = $goog$dom$getViewportSize_$$(this.$window_$ || window);
  if(!$goog$math$Size$equals$$($containerSize$$inline_596_viewportSize$$, this.$size_$) && (this.$size_$ = $containerSize$$inline_596_viewportSize$$, $containerSize$$inline_596_viewportSize$$ = new $goog$math$Size$$(this.$container_$.clientWidth, this.$container_$.clientHeight), $goog$math$Size$equals$$($containerSize$$inline_596_viewportSize$$, this.$containerSize_$) || (this.$containerSize_$ = $containerSize$$inline_596_viewportSize$$, this.dispatchEvent("resize")), this.$windowSizePollInterval_$ == 
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
function $JSCompiler_StaticMethods_showView$$($JSCompiler_StaticMethods_showView$self$$, $JSCompiler_StaticMethods_preRender$self$$inline_610_JSCompiler_StaticMethods_render_$self$$inline_928_aType$$1$$, $container$$inline_612_opt_caller$$) {
  var $calledByMiniCal$$ = $container$$inline_612_opt_caller$$ == $JSCompiler_StaticMethods_showView$self$$.$mainBody_$.$miniCal$;
  $JSCompiler_StaticMethods_showView$self$$.$currentView$ == $JSCompiler_StaticMethods_preRender$self$$inline_610_JSCompiler_StaticMethods_render_$self$$inline_928_aType$$1$$ && $container$$inline_612_opt_caller$$ == $JSCompiler_alias_VOID$$ && !$JSCompiler_StaticMethods_showView$self$$.$isOnStartup_$ || ($JSCompiler_StaticMethods_showView$self$$.$currentView$ = $JSCompiler_StaticMethods_preRender$self$$inline_610_JSCompiler_StaticMethods_render_$self$$inline_928_aType$$1$$, $JSCompiler_StaticMethods_showView$self$$.$timeManager$.$configuration$ = 
  $JSCompiler_StaticMethods_showView$self$$.$currentView$, $JSCompiler_StaticMethods_showView$self$$.$timeManager$.$run$(), $JSCompiler_StaticMethods_showView$self$$.$eventManager_$.$run$(), $JSCompiler_StaticMethods_showView$self$$.$isOnStartup_$ ? ($JSCompiler_StaticMethods_preRender$self$$inline_610_JSCompiler_StaticMethods_render_$self$$inline_928_aType$$1$$ = $JSCompiler_StaticMethods_showView$self$$.$mainBody_$, $container$$inline_612_opt_caller$$ = $JSCompiler_StaticMethods_preRender$self$$inline_610_JSCompiler_StaticMethods_render_$self$$inline_928_aType$$1$$.$dom_$.$document_$.body, 
  $container$$inline_612_opt_caller$$.innerHTML = $rflect$cal$MainBody$HTML_PARTS_$$[0] + $rflect$cal$MainBody$HTML_PARTS_$$[1] + $rflect$cal$MainBody$HTML_PARTS_$$[20] + $rflect$cal$MainBody$HTML_PARTS_$$[21], $JSCompiler_StaticMethods_preRender$self$$inline_610_JSCompiler_StaticMethods_render_$self$$inline_928_aType$$1$$.$containerSizeMonitor_$.$checkForSizeChange_$($JSCompiler_alias_TRUE$$), $container$$inline_612_opt_caller$$.innerHTML = "", $JSCompiler_StaticMethods_showView$self$$.$mainBody_$.$updateBeforeRedraw$(), 
  $JSCompiler_StaticMethods_preRender$self$$inline_610_JSCompiler_StaticMethods_render_$self$$inline_928_aType$$1$$ = $JSCompiler_StaticMethods_showView$self$$.$mainBody_$, $JSCompiler_StaticMethods_preRender$self$$inline_610_JSCompiler_StaticMethods_render_$self$$inline_928_aType$$1$$.$inDocument_$ && $JSCompiler_alias_THROW$$(Error("Component already rendered")), $JSCompiler_StaticMethods_preRender$self$$inline_610_JSCompiler_StaticMethods_render_$self$$inline_928_aType$$1$$.$element_$ || $JSCompiler_StaticMethods_preRender$self$$inline_610_JSCompiler_StaticMethods_render_$self$$inline_928_aType$$1$$.$createDom$(), 
  $JSCompiler_StaticMethods_preRender$self$$inline_610_JSCompiler_StaticMethods_render_$self$$inline_928_aType$$1$$.$dom_$.$document_$.body.appendChild($JSCompiler_StaticMethods_preRender$self$$inline_610_JSCompiler_StaticMethods_render_$self$$inline_928_aType$$1$$.$element_$), (!$JSCompiler_StaticMethods_preRender$self$$inline_610_JSCompiler_StaticMethods_render_$self$$inline_928_aType$$1$$.$parent_$ || $JSCompiler_StaticMethods_preRender$self$$inline_610_JSCompiler_StaticMethods_render_$self$$inline_928_aType$$1$$.$parent_$.$inDocument_$) && 
  $JSCompiler_StaticMethods_preRender$self$$inline_610_JSCompiler_StaticMethods_render_$self$$inline_928_aType$$1$$.$enterDocument$(), $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_showView$self$$, $JSCompiler_StaticMethods_showView$self$$.$containerSizeMonitor_$, "resize", $JSCompiler_StaticMethods_showView$self$$.$onViewportResize_$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_showView$self$$), $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_showView$self$$, 
  $JSCompiler_StaticMethods_showView$self$$.$mainBody_$, "action", $JSCompiler_StaticMethods_showView$self$$.$onMainBodyAction_$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_showView$self$$), $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_showView$self$$, $JSCompiler_StaticMethods_showView$self$$.$mainBody_$, "dateselect", $JSCompiler_StaticMethods_showView$self$$.$onDateSelect_$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_showView$self$$), $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_showView$self$$, 
  $JSCompiler_StaticMethods_showView$self$$.$mainBody_$, "datedrag", $JSCompiler_StaticMethods_showView$self$$.$onDateDrag_$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_showView$self$$), $JSCompiler_StaticMethods_listen$$($JSCompiler_StaticMethods_showView$self$$, $JSCompiler_StaticMethods_showView$self$$.$mainBody_$, "datedragend", $goog$nullFunction$$, $JSCompiler_alias_FALSE$$, $JSCompiler_StaticMethods_showView$self$$), $JSCompiler_StaticMethods_showView$self$$.$isOnStartup_$ = $JSCompiler_alias_FALSE$$) : 
  $calledByMiniCal$$ ? ($JSCompiler_StaticMethods_showView$self$$.$mainBody_$.$updateBeforeRedraw$(2, 3, 4), $JSCompiler_StaticMethods_showView$self$$.$mainBody_$.$updateByRedraw$(2, 3, 4)) : ($JSCompiler_StaticMethods_showView$self$$.$mainBody_$.$updateBeforeRedraw$(3, 4), $JSCompiler_StaticMethods_showView$self$$.$mainBody_$.$updateByRedraw$(3, 4)))
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
  var $sec$$ = ($logRecord$$1$$.$time_$ - $relativeTimeStart$$) / 1E3, $str$$50$$ = $sec$$.toFixed(3), $spacesToPrepend$$ = 0;
  if(1 > $sec$$) {
    $spacesToPrepend$$ = 2
  }else {
    for(;100 > $sec$$;) {
      $spacesToPrepend$$++, $sec$$ *= 10
    }
  }
  for(;0 < $spacesToPrepend$$--;) {
    $str$$50$$ = " " + $str$$50$$
  }
  return $str$$50$$
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
$JSCompiler_prototypeAlias$$.clear = function $$JSCompiler_prototypeAlias$$$clear$() {
  this.$nextPtr_$ = this.$buff_$.length = 0
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
      for(var $args$$11$$ = $fn$$7$$.arguments, $i$$106$$ = 0;$i$$106$$ < $args$$11$$.length;$i$$106$$++) {
        0 < $i$$106$$ && $sb$$8$$.push(", ");
        var $arg$$6_argDesc$$;
        $arg$$6_argDesc$$ = $args$$11$$[$i$$106$$];
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
      }catch($e$$45$$) {
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
    for(var $i$$inline_621$$ = 0, $level$$inline_622$$;$level$$inline_622$$ = $goog$debug$Logger$Level$PREDEFINED_LEVELS$$[$i$$inline_621$$];$i$$inline_621$$++) {
      $goog$debug$Logger$Level$predefinedLevelsCache_$$[$level$$inline_622$$.value] = $level$$inline_622$$, $goog$debug$Logger$Level$predefinedLevelsCache_$$[$level$$inline_622$$.name] = $level$$inline_622$$
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
$JSCompiler_prototypeAlias$$.log = function $$JSCompiler_prototypeAlias$$$log$($level$$15_logRecord$$inline_625$$, $msg$$5_msg$$inline_932_target$$inline_626$$, $JSCompiler_StaticMethods_callPublish_$self$$inline_934_opt_exception$$) {
  if($level$$15_logRecord$$inline_625$$.value >= $JSCompiler_StaticMethods_getEffectiveLevel$$(this).value) {
    $level$$15_logRecord$$inline_625$$ = this.$getLogRecord$($level$$15_logRecord$$inline_625$$, $msg$$5_msg$$inline_932_target$$inline_626$$, $JSCompiler_StaticMethods_callPublish_$self$$inline_934_opt_exception$$);
    $msg$$5_msg$$inline_932_target$$inline_626$$ = "log:" + $level$$15_logRecord$$inline_625$$.$msg_$;
    $goog$global$$.console && ($goog$global$$.console.timeStamp ? $goog$global$$.console.timeStamp($msg$$5_msg$$inline_932_target$$inline_626$$) : $goog$global$$.console.markTimeline && $goog$global$$.console.markTimeline($msg$$5_msg$$inline_932_target$$inline_626$$));
    $goog$global$$.msWriteProfilerMark && $goog$global$$.msWriteProfilerMark($msg$$5_msg$$inline_932_target$$inline_626$$);
    for($msg$$5_msg$$inline_932_target$$inline_626$$ = this;$msg$$5_msg$$inline_932_target$$inline_626$$;) {
      var $JSCompiler_StaticMethods_callPublish_$self$$inline_934_opt_exception$$ = $msg$$5_msg$$inline_932_target$$inline_626$$, $logRecord$$inline_935$$ = $level$$15_logRecord$$inline_625$$;
      if($JSCompiler_StaticMethods_callPublish_$self$$inline_934_opt_exception$$.$handlers_$) {
        for(var $i$$inline_936$$ = 0, $handler$$inline_937$$ = $JSCompiler_alias_VOID$$;$handler$$inline_937$$ = $JSCompiler_StaticMethods_callPublish_$self$$inline_934_opt_exception$$.$handlers_$[$i$$inline_936$$];$i$$inline_936$$++) {
          $handler$$inline_937$$($logRecord$$inline_935$$)
        }
      }
      $msg$$5_msg$$inline_932_target$$inline_626$$ = $msg$$5_msg$$inline_932_target$$inline_626$$.getParent()
    }
  }
};
$JSCompiler_prototypeAlias$$.$getLogRecord$ = function $$JSCompiler_prototypeAlias$$$$getLogRecord$$($level$$16$$, $msg$$6$$, $opt_exception$$1$$) {
  var $logRecord$$4$$ = new $goog$debug$LogRecord$$($level$$16$$, "" + $msg$$6$$, this.$name_$);
  if($opt_exception$$1$$) {
    $logRecord$$4$$.$exception_$ = $opt_exception$$1$$;
    var $JSCompiler_inline_result$$640$$;
    var $opt_fn$$inline_642$$ = arguments.callee.caller;
    try {
      var $e$$inline_643$$;
      var $href$$inline_940$$ = $goog$getObjectByName$$("window.location.href");
      if($goog$isString$$($opt_exception$$1$$)) {
        $e$$inline_643$$ = {message:$opt_exception$$1$$, name:"Unknown error", lineNumber:"Not available", fileName:$href$$inline_940$$, stack:"Not available"}
      }else {
        var $lineNumber$$inline_941$$, $fileName$$inline_942$$, $threwError$$inline_943$$ = $JSCompiler_alias_FALSE$$;
        try {
          $lineNumber$$inline_941$$ = $opt_exception$$1$$.lineNumber || $opt_exception$$1$$.$line$ || "Not available"
        }catch($e$$inline_944$$) {
          $lineNumber$$inline_941$$ = "Not available", $threwError$$inline_943$$ = $JSCompiler_alias_TRUE$$
        }
        try {
          $fileName$$inline_942$$ = $opt_exception$$1$$.fileName || $opt_exception$$1$$.filename || $opt_exception$$1$$.sourceURL || $href$$inline_940$$
        }catch($e$$inline_945$$) {
          $fileName$$inline_942$$ = "Not available", $threwError$$inline_943$$ = $JSCompiler_alias_TRUE$$
        }
        $e$$inline_643$$ = $threwError$$inline_943$$ || !$opt_exception$$1$$.lineNumber || !$opt_exception$$1$$.fileName || !$opt_exception$$1$$.stack ? {message:$opt_exception$$1$$.message, name:$opt_exception$$1$$.name, lineNumber:$lineNumber$$inline_941$$, fileName:$fileName$$inline_942$$, stack:$opt_exception$$1$$.stack || "Not available"} : $opt_exception$$1$$
      }
      $JSCompiler_inline_result$$640$$ = "Message: " + $goog$string$htmlEscape$$($e$$inline_643$$.message) + '\nUrl: <a href="view-source:' + $e$$inline_643$$.fileName + '" target="_new">' + $e$$inline_643$$.fileName + "</a>\nLine: " + $e$$inline_643$$.lineNumber + "\n\nBrowser stack:\n" + $goog$string$htmlEscape$$($e$$inline_643$$.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + $goog$string$htmlEscape$$($goog$debug$getStacktrace$$($opt_fn$$inline_642$$) + "-> ")
    }catch($e2$$inline_644$$) {
      $JSCompiler_inline_result$$640$$ = "Exception trying to expose exception! You win, we lose. " + $e2$$inline_644$$
    }
    $logRecord$$4$$.$exceptionText_$ = $JSCompiler_inline_result$$640$$
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
  var $JSCompiler_temp$$0_logger$$inline_653$$;
  if(!($JSCompiler_temp$$0_logger$$inline_653$$ = $goog$debug$LogManager$loggers_$$[$name$$68$$])) {
    $JSCompiler_temp$$0_logger$$inline_653$$ = new $goog$debug$Logger$$($name$$68$$);
    var $lastDotIndex$$inline_654_parentLogger$$inline_656$$ = $name$$68$$.lastIndexOf("."), $leafName$$inline_655$$ = $name$$68$$.substr($lastDotIndex$$inline_654_parentLogger$$inline_656$$ + 1), $lastDotIndex$$inline_654_parentLogger$$inline_656$$ = $goog$debug$LogManager$getLogger$$($name$$68$$.substr(0, $lastDotIndex$$inline_654_parentLogger$$inline_656$$));
    $lastDotIndex$$inline_654_parentLogger$$inline_656$$.$children_$ || ($lastDotIndex$$inline_654_parentLogger$$inline_656$$.$children_$ = {});
    $lastDotIndex$$inline_654_parentLogger$$inline_656$$.$children_$[$leafName$$inline_655$$] = $JSCompiler_temp$$0_logger$$inline_653$$;
    $JSCompiler_temp$$0_logger$$inline_653$$.$parent_$ = $lastDotIndex$$inline_654_parentLogger$$inline_656$$;
    $goog$debug$LogManager$loggers_$$[$name$$68$$] = $JSCompiler_temp$$0_logger$$inline_653$$
  }
  return $JSCompiler_temp$$0_logger$$inline_653$$
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
    var $JSCompiler_StaticMethods_addHandler$self$$inline_955$$ = $goog$debug$LogManager$rootLogger_$$, $handler$$inline_956$$ = this.$publishHandler_$;
    $JSCompiler_StaticMethods_addHandler$self$$inline_955$$.$handlers_$ || ($JSCompiler_StaticMethods_addHandler$self$$inline_955$$.$handlers_$ = []);
    $JSCompiler_StaticMethods_addHandler$self$$inline_955$$.$handlers_$.push($handler$$inline_956$$)
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
$JSCompiler_prototypeAlias$$.$setEnabled$ = function $$JSCompiler_prototypeAlias$$$$setEnabled$$($enable$$15$$) {
  (this.$enabled_$ = $enable$$15$$) && $JSCompiler_StaticMethods_openWindow_$$(this);
  $JSCompiler_StaticMethods_setCookie_$$(this, "enabled", $enable$$15$$ ? "1" : "0")
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
    var $JSCompiler_StaticMethods_formatRecord$self$$inline_666_html$$inline_672$$ = this.$formatter_$, $className$$inline_668$$;
    switch($logRecord$$8$$.$level_$.value) {
      case $goog$debug$Logger$Level$SHOUT$$.value:
        $className$$inline_668$$ = "dbg-sh";
        break;
      case $goog$debug$Logger$Level$SEVERE$$.value:
        $className$$inline_668$$ = "dbg-sev";
        break;
      case $goog$debug$Logger$Level$WARNING$$.value:
        $className$$inline_668$$ = "dbg-w";
        break;
      case $goog$debug$Logger$Level$INFO$$.value:
        $className$$inline_668$$ = "dbg-i";
        break;
      default:
        $className$$inline_668$$ = "dbg-f"
    }
    var $sb$$inline_669$$ = [];
    $sb$$inline_669$$.push($JSCompiler_StaticMethods_formatRecord$self$$inline_666_html$$inline_672$$.$prefix_$, " ");
    if($JSCompiler_StaticMethods_formatRecord$self$$inline_666_html$$inline_672$$.$showAbsoluteTime$) {
      var $time$$inline_960$$ = new Date($logRecord$$8$$.$time_$);
      $sb$$inline_669$$.push("[", $goog$debug$Formatter$getTwoDigitString_$$($time$$inline_960$$.getFullYear() - 2E3) + $goog$debug$Formatter$getTwoDigitString_$$($time$$inline_960$$.getMonth() + 1) + $goog$debug$Formatter$getTwoDigitString_$$($time$$inline_960$$.getDate()) + " " + $goog$debug$Formatter$getTwoDigitString_$$($time$$inline_960$$.getHours()) + ":" + $goog$debug$Formatter$getTwoDigitString_$$($time$$inline_960$$.getMinutes()) + ":" + $goog$debug$Formatter$getTwoDigitString_$$($time$$inline_960$$.getSeconds()) + 
      "." + $goog$debug$Formatter$getTwoDigitString_$$(Math.floor($time$$inline_960$$.getMilliseconds() / 10)), "] ")
    }
    $JSCompiler_StaticMethods_formatRecord$self$$inline_666_html$$inline_672$$.$showRelativeTime$ && $sb$$inline_669$$.push("[", $goog$string$whitespaceEscape$$($goog$debug$Formatter$getRelativeTime_$$($logRecord$$8$$, $JSCompiler_StaticMethods_formatRecord$self$$inline_666_html$$inline_672$$.$startTimeProvider_$.get())), "s] ");
    $JSCompiler_StaticMethods_formatRecord$self$$inline_666_html$$inline_672$$.$showLoggerName$ && $sb$$inline_669$$.push("[", $goog$string$htmlEscape$$($logRecord$$8$$.$loggerName_$), "] ");
    $sb$$inline_669$$.push('<span class="', $className$$inline_668$$, '">', $goog$string$newLineToBr$$($goog$string$whitespaceEscape$$($goog$string$htmlEscape$$($logRecord$$8$$.$msg_$))));
    $JSCompiler_StaticMethods_formatRecord$self$$inline_666_html$$inline_672$$.$showExceptionText$ && $logRecord$$8$$.$exception_$ && $sb$$inline_669$$.push("<br>", $goog$string$newLineToBr$$($goog$string$whitespaceEscape$$($logRecord$$8$$.$exceptionText_$ || "")));
    $sb$$inline_669$$.push("</span><br>");
    $JSCompiler_StaticMethods_formatRecord$self$$inline_666_html$$inline_672$$ = $sb$$inline_669$$.join("");
    this.$enabled_$ ? ($JSCompiler_StaticMethods_openWindow_$$(this), this.$savedMessages_$.add($JSCompiler_StaticMethods_formatRecord$self$$inline_666_html$$inline_672$$), $JSCompiler_StaticMethods_writeToLog_$$(this, $JSCompiler_StaticMethods_formatRecord$self$$inline_666_html$$inline_672$$)) : this.$savedMessages_$.add($JSCompiler_StaticMethods_formatRecord$self$$inline_666_html$$inline_672$$);
    this.$enableOnSevere_$ && $logRecord$$8$$.$level_$.value >= $goog$debug$Logger$Level$SEVERE$$.value && this.$setEnabled$($JSCompiler_alias_TRUE$$)
  }
};
function $JSCompiler_StaticMethods_writeToLog_$$($JSCompiler_StaticMethods_writeToLog_$self$$, $html$$2$$) {
  $JSCompiler_StaticMethods_writeToLog_$self$$.$outputBuffer_$.push($html$$2$$);
  $goog$global$$.clearTimeout($JSCompiler_StaticMethods_writeToLog_$self$$.$bufferTimeout_$);
  750 < $goog$now$$() - $JSCompiler_StaticMethods_writeToLog_$self$$.$lastCall_$ ? $JSCompiler_StaticMethods_writeToLog_$self$$.$writeBufferToLog_$() : $JSCompiler_StaticMethods_writeToLog_$self$$.$bufferTimeout_$ = $goog$global$$.setTimeout($goog$bind$$($JSCompiler_StaticMethods_writeToLog_$self$$.$writeBufferToLog_$, $JSCompiler_StaticMethods_writeToLog_$self$$), 250)
}
$JSCompiler_prototypeAlias$$.$writeBufferToLog_$ = function $$JSCompiler_prototypeAlias$$$$writeBufferToLog_$$() {
  this.$lastCall_$ = $goog$now$$();
  if($JSCompiler_StaticMethods_hasActiveWindow$$(this)) {
    var $body$$5_scroll$$ = this.$win_$.document.body, $body$$5_scroll$$ = $body$$5_scroll$$ && 100 >= $body$$5_scroll$$.scrollHeight - ($body$$5_scroll$$.scrollTop + $body$$5_scroll$$.clientHeight);
    this.$win_$.document.write(this.$outputBuffer_$.join(""));
    this.$outputBuffer_$.length = 0;
    $body$$5_scroll$$ && this.$win_$.scrollTo(0, 1E6)
  }
};
function $JSCompiler_StaticMethods_writeSavedMessages_$$($JSCompiler_StaticMethods_writeSavedMessages_$self$$) {
  for(var $JSCompiler_StaticMethods_getNewestValues$self$$inline_962_i$$112$$ = $JSCompiler_StaticMethods_writeSavedMessages_$self$$.$savedMessages_$, $l$$inline_964$$ = $JSCompiler_StaticMethods_getNewestValues$self$$inline_962_i$$112$$.$buff_$.length, $rv$$inline_965$$ = [], $i$$inline_966$$ = $JSCompiler_StaticMethods_getNewestValues$self$$inline_962_i$$112$$.$buff_$.length - $JSCompiler_StaticMethods_writeSavedMessages_$self$$.$savedMessages_$.$buff_$.length;$i$$inline_966$$ < $l$$inline_964$$;$i$$inline_966$$++) {
    $rv$$inline_965$$[$i$$inline_966$$] = $JSCompiler_StaticMethods_getNewestValues$self$$inline_962_i$$112$$.get($i$$inline_966$$)
  }
  for($JSCompiler_StaticMethods_getNewestValues$self$$inline_962_i$$112$$ = 0;$JSCompiler_StaticMethods_getNewestValues$self$$inline_962_i$$112$$ < $rv$$inline_965$$.length;$JSCompiler_StaticMethods_getNewestValues$self$$inline_962_i$$112$$++) {
    $JSCompiler_StaticMethods_writeToLog_$$($JSCompiler_StaticMethods_writeSavedMessages_$self$$, $rv$$inline_965$$[$JSCompiler_StaticMethods_getNewestValues$self$$inline_962_i$$112$$])
  }
}
function $JSCompiler_StaticMethods_openWindow_$$($JSCompiler_StaticMethods_openWindow_$self$$) {
  if(!$JSCompiler_StaticMethods_hasActiveWindow$$($JSCompiler_StaticMethods_openWindow_$self$$) && !$JSCompiler_StaticMethods_openWindow_$self$$.$winOpening_$) {
    var $h$$7_winpos$$ = $goog$debug$DebugWindow$getCookieValue_$$($JSCompiler_StaticMethods_openWindow_$self$$.$identifier_$, "dbg", "0,0,800,500").split(","), $x$$62$$ = Number($h$$7_winpos$$[0]), $y$$37$$ = Number($h$$7_winpos$$[1]), $w$$7$$ = Number($h$$7_winpos$$[2]), $h$$7_winpos$$ = Number($h$$7_winpos$$[3]);
    $JSCompiler_StaticMethods_openWindow_$self$$.$winOpening_$ = $JSCompiler_alias_TRUE$$;
    $JSCompiler_StaticMethods_openWindow_$self$$.$win_$ = window.open("", $goog$userAgent$IE$$ ? $JSCompiler_StaticMethods_openWindow_$self$$.$identifier_$.replace(/[\s\-\.\,]/g, "_") : $JSCompiler_StaticMethods_openWindow_$self$$.$identifier_$, "width=" + $w$$7$$ + ",height=" + $h$$7_winpos$$ + ",toolbar=no,resizable=yes,scrollbars=yes,left=" + $x$$62$$ + ",top=" + $y$$37$$ + ",status=no,screenx=" + $x$$62$$ + ",screeny=" + $y$$37$$);
    !$JSCompiler_StaticMethods_openWindow_$self$$.$win_$ && !$JSCompiler_StaticMethods_openWindow_$self$$.$showedBlockedAlert_$ && (alert("Logger popup was blocked"), $JSCompiler_StaticMethods_openWindow_$self$$.$showedBlockedAlert_$ = $JSCompiler_alias_TRUE$$);
    $JSCompiler_StaticMethods_openWindow_$self$$.$winOpening_$ = $JSCompiler_alias_FALSE$$;
    $JSCompiler_StaticMethods_openWindow_$self$$.$win_$ && $JSCompiler_StaticMethods_openWindow_$self$$.$writeInitialDocument_$()
  }
}
$JSCompiler_prototypeAlias$$.$getStyleRules$ = $JSCompiler_returnArg$$("*{font:normal 14px monospace;}.dbg-sev{color:#F00}.dbg-w{color:#E92}.dbg-sh{background-color:#fd4;font-weight:bold;color:#000}.dbg-i{color:#666}.dbg-f{color:#999}.dbg-ev{color:#0A0}.dbg-m{color:#990}");
$JSCompiler_prototypeAlias$$.$writeInitialDocument_$ = function $$JSCompiler_prototypeAlias$$$$writeInitialDocument_$$() {
  $JSCompiler_StaticMethods_hasActiveWindow$$(this) || (this.$win_$.document.open(), $JSCompiler_StaticMethods_writeToLog_$$(this, "<style>" + this.$getStyleRules$() + '</style><hr><div class="dbg-ev" style="text-align:center">' + this.$welcomeMessage$ + "<br><small>Logger: " + this.$identifier_$ + "</small></div><hr>"), $JSCompiler_StaticMethods_writeSavedMessages_$$(this))
};
function $JSCompiler_StaticMethods_setCookie_$$($JSCompiler_StaticMethods_setCookie_$self$$, $key$$69$$, $value$$84$$) {
  $key$$69$$ += $JSCompiler_StaticMethods_setCookie_$self$$.$identifier_$;
  document.cookie = $key$$69$$ + "=" + encodeURIComponent($value$$84$$) + ";path=/;expires=" + (new Date($goog$now$$() + 2592E6)).toUTCString()
}
function $goog$debug$DebugWindow$getCookieValue_$$($fullKey_identifier$$2$$, $cookie_key$$71$$, $end$$4_opt_default$$1$$) {
  var $fullKey_identifier$$2$$ = $cookie_key$$71$$ + $fullKey_identifier$$2$$, $cookie_key$$71$$ = "" + document.cookie, $start$$10$$ = $cookie_key$$71$$.indexOf($fullKey_identifier$$2$$ + "=");
  return-1 != $start$$10$$ ? ($end$$4_opt_default$$1$$ = $cookie_key$$71$$.indexOf(";", $start$$10$$), decodeURIComponent($cookie_key$$71$$.substring($start$$10$$ + $fullKey_identifier$$2$$.length + 1, -1 == $end$$4_opt_default$$1$$ ? $cookie_key$$71$$.length : $end$$4_opt_default$$1$$))) : $end$$4_opt_default$$1$$ || ""
}
$JSCompiler_prototypeAlias$$.$saveWindowPositionSize_$ = function $$JSCompiler_prototypeAlias$$$$saveWindowPositionSize_$$() {
  $JSCompiler_StaticMethods_hasActiveWindow$$(this) && $JSCompiler_StaticMethods_setCookie_$$(this, "dbg", (this.$win_$.screenX || this.$win_$.screenLeft || 0) + "," + (this.$win_$.screenY || this.$win_$.screenTop || 0) + "," + (this.$win_$.outerWidth || 800) + "," + (this.$win_$.outerHeight || 500))
};
function $goog$debug$FancyWindow$$($opt_identifier$$1$$, $opt_prefix$$4$$) {
  if($goog$debug$FancyWindow$HAS_LOCAL_STORE$$) {
    var $storedKeys$$inline_679$$ = $goog$debug$FancyWindow$getStoredKeys_$$(), $key$$inline_680$$;
    for($key$$inline_680$$ in $storedKeys$$inline_679$$) {
      var $logger$$inline_682_loggerName$$inline_681$$ = $key$$inline_680$$.replace("fancywindow.sel.", ""), $logger$$inline_682_loggerName$$inline_681$$ = $goog$debug$LogManager$getLogger$$($logger$$inline_682_loggerName$$inline_681$$), $curLevel$$inline_683$$ = $logger$$inline_682_loggerName$$inline_681$$.$level_$, $storedLevel$$inline_684$$ = window.localStorage.getItem($key$$inline_680$$).toString();
      (!$curLevel$$inline_683$$ || $curLevel$$inline_683$$.toString() != $storedLevel$$inline_684$$) && $logger$$inline_682_loggerName$$inline_681$$.$setLevel$($goog$debug$Logger$Level$getPredefinedLevel$$($storedLevel$$inline_684$$))
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
  }catch($e$$inline_686$$) {
  }
  $goog$debug$FancyWindow$HAS_LOCAL_STORE$$ = $JSCompiler_alias_FALSE$$
}
$JSCompiler_prototypeAlias$$ = $goog$debug$FancyWindow$$.prototype;
$JSCompiler_prototypeAlias$$.$writeBufferToLog_$ = function $$JSCompiler_prototypeAlias$$$$writeBufferToLog_$$() {
  this.$lastCall_$ = $goog$now$$();
  if($JSCompiler_StaticMethods_hasActiveWindow$$(this)) {
    for(var $logel$$ = this.$dh_$.$getElement$("log"), $scroll$$1$$ = 100 >= $logel$$.scrollHeight - ($logel$$.scrollTop + $logel$$.offsetHeight), $i$$113$$ = 0;$i$$113$$ < this.$outputBuffer_$.length;$i$$113$$++) {
      var $div$$2$$ = this.$dh_$.$createDom$("div", "logmsg");
      $div$$2$$.innerHTML = this.$outputBuffer_$[$i$$113$$];
      $logel$$.appendChild($div$$2$$)
    }
    this.$outputBuffer_$.length = 0;
    this.$resizeStuff_$();
    $scroll$$1$$ && ($logel$$.scrollTop = $logel$$.scrollHeight)
  }
};
$JSCompiler_prototypeAlias$$.$writeInitialDocument_$ = function $$JSCompiler_prototypeAlias$$$$writeInitialDocument_$$() {
  if($JSCompiler_StaticMethods_hasActiveWindow$$(this)) {
    var $doc$$34$$ = this.$win_$.document;
    $doc$$34$$.open();
    $doc$$34$$.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3.org/TR/html4/loose.dtd"><html><head><title>Logging: ' + this.$identifier_$ + "</title><style>" + this.$getStyleRules$() + '</style></head><body><div id="log" style="overflow:auto"></div><div id="head"><p><b>Logging: ' + this.$identifier_$ + "</b></p><p>" + this.$welcomeMessage$ + '</p><span id="clearbutton">clear</span><span id="exitbutton">exit</span><span id="openbutton">options</span></div><div id="options"><big><b>Options:</b></big><div id="optionsarea"></div><span id="closebutton">save and close</span></div></body></html>');
    $doc$$34$$.close();
    ($goog$userAgent$IE$$ ? $doc$$34$$.body : this.$win_$).onresize = $goog$bind$$(this.$resizeStuff_$, this);
    this.$dh_$ = new $goog$dom$DomHelper$$($doc$$34$$);
    this.$dh_$.$getElement$("openbutton").onclick = $goog$bind$$(this.$openOptions_$, this);
    this.$dh_$.$getElement$("closebutton").onclick = $goog$bind$$(this.$closeOptions_$, this);
    this.$dh_$.$getElement$("clearbutton").onclick = $goog$bind$$(this.$clear_$, this);
    this.$dh_$.$getElement$("exitbutton").onclick = $goog$bind$$(this.$exit_$, this);
    $JSCompiler_StaticMethods_writeSavedMessages_$$(this)
  }
};
$JSCompiler_prototypeAlias$$.$openOptions_$ = function $$JSCompiler_prototypeAlias$$$$openOptions_$$() {
  var $el$$29$$ = this.$dh_$.$getElement$("optionsarea");
  $el$$29$$.innerHTML = "";
  for(var $loggers$$ = $goog$debug$FancyWindow$getLoggers_$$(), $dh$$1$$ = this.$dh_$, $i$$114$$ = 0;$i$$114$$ < $loggers$$.length;$i$$114$$++) {
    var $div$$3_logger$$3$$ = $goog$debug$LogManager$getLogger$$($loggers$$[$i$$114$$]), $div$$3_logger$$3$$ = $dh$$1$$.$createDom$("div", {}, $JSCompiler_StaticMethods_getDropDown_$$(this, "sel" + $loggers$$[$i$$114$$], $div$$3_logger$$3$$.$level_$ ? $div$$3_logger$$3$$.$level_$.name : "INHERIT"), $dh$$1$$.$createDom$("span", {}, $loggers$$[$i$$114$$] || "(root)"));
    $el$$29$$.appendChild($div$$3_logger$$3$$)
  }
  this.$dh_$.$getElement$("options").style.display = "block";
  return $JSCompiler_alias_FALSE$$
};
function $JSCompiler_StaticMethods_getDropDown_$$($JSCompiler_StaticMethods_getDropDown_$self_dh$$2$$, $id$$16_sel$$, $selected$$) {
  for(var $JSCompiler_StaticMethods_getDropDown_$self_dh$$2$$ = $JSCompiler_StaticMethods_getDropDown_$self_dh$$2$$.$dh_$, $id$$16_sel$$ = $JSCompiler_StaticMethods_getDropDown_$self_dh$$2$$.$createDom$("select", {id:$id$$16_sel$$}), $i$$115$$ = 0;$i$$115$$ < $goog$debug$Logger$Level$PREDEFINED_LEVELS$$.length;$i$$115$$++) {
    var $level$$17$$ = $goog$debug$Logger$Level$PREDEFINED_LEVELS$$[$i$$115$$], $option$$ = $JSCompiler_StaticMethods_getDropDown_$self_dh$$2$$.$createDom$("option", {}, $level$$17$$.name);
    $selected$$ == $level$$17$$.name && ($option$$.selected = $JSCompiler_alias_TRUE$$);
    $id$$16_sel$$.appendChild($option$$)
  }
  $id$$16_sel$$.appendChild($JSCompiler_StaticMethods_getDropDown_$self_dh$$2$$.$createDom$("option", {selected:"INHERIT" == $selected$$}, "INHERIT"));
  return $id$$16_sel$$
}
$JSCompiler_prototypeAlias$$.$closeOptions_$ = function $$JSCompiler_prototypeAlias$$$$closeOptions_$$() {
  this.$dh_$.$getElement$("options").style.display = "none";
  for(var $loggers$$1_loggers$$inline_688$$ = $goog$debug$FancyWindow$getLoggers_$$(), $dh$$3_storedKeys$$inline_689$$ = this.$dh_$, $i$$116_i$$inline_690$$ = 0;$i$$116_i$$inline_690$$ < $loggers$$1_loggers$$inline_688$$.length;$i$$116_i$$inline_690$$++) {
    var $key$$inline_691_logger$$4$$ = $goog$debug$LogManager$getLogger$$($loggers$$1_loggers$$inline_688$$[$i$$116_i$$inline_690$$]), $level$$18_level$$inline_692_sel$$1$$ = $dh$$3_storedKeys$$inline_689$$.$getElement$("sel" + $loggers$$1_loggers$$inline_688$$[$i$$116_i$$inline_690$$]), $level$$18_level$$inline_692_sel$$1$$ = $level$$18_level$$inline_692_sel$$1$$.options[$level$$18_level$$inline_692_sel$$1$$.selectedIndex].text;
    "INHERIT" == $level$$18_level$$inline_692_sel$$1$$ ? $key$$inline_691_logger$$4$$.$setLevel$($JSCompiler_alias_NULL$$) : $key$$inline_691_logger$$4$$.$setLevel$($goog$debug$Logger$Level$getPredefinedLevel$$($level$$18_level$$inline_692_sel$$1$$))
  }
  if($goog$debug$FancyWindow$HAS_LOCAL_STORE$$) {
    $loggers$$1_loggers$$inline_688$$ = $goog$debug$FancyWindow$getLoggers_$$();
    $dh$$3_storedKeys$$inline_689$$ = $goog$debug$FancyWindow$getStoredKeys_$$();
    for($i$$116_i$$inline_690$$ = 0;$i$$116_i$$inline_690$$ < $loggers$$1_loggers$$inline_688$$.length;$i$$116_i$$inline_690$$++) {
      $key$$inline_691_logger$$4$$ = "fancywindow.sel." + $loggers$$1_loggers$$inline_688$$[$i$$116_i$$inline_690$$], $level$$18_level$$inline_692_sel$$1$$ = $goog$debug$LogManager$getLogger$$($loggers$$1_loggers$$inline_688$$[$i$$116_i$$inline_690$$]).$level_$, $key$$inline_691_logger$$4$$ in $dh$$3_storedKeys$$inline_689$$ ? $level$$18_level$$inline_692_sel$$1$$ ? window.localStorage.getItem($key$$inline_691_logger$$4$$) != $level$$18_level$$inline_692_sel$$1$$.name && window.localStorage.setItem($key$$inline_691_logger$$4$$, 
      $level$$18_level$$inline_692_sel$$1$$.name) : window.localStorage.removeItem($key$$inline_691_logger$$4$$) : $level$$18_level$$inline_692_sel$$1$$ && window.localStorage.setItem($key$$inline_691_logger$$4$$, $level$$18_level$$inline_692_sel$$1$$.name)
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
  for(var $storedKeys$$2$$ = {}, $i$$118$$ = 0, $len$$4$$ = window.localStorage.length;$i$$118$$ < $len$$4$$;$i$$118$$++) {
    var $key$$74$$ = window.localStorage.key($i$$118$$);
    $key$$74$$ != $JSCompiler_alias_NULL$$ && 0 == $key$$74$$.lastIndexOf("fancywindow.sel.", 0) && ($storedKeys$$2$$[$key$$74$$] = $JSCompiler_alias_TRUE$$)
  }
  return $storedKeys$$2$$
}
function $goog$debug$FancyWindow$getLoggers_$$() {
  var $res$$inline_695$$ = [], $i$$inline_696$$ = 0, $key$$inline_697$$;
  for($key$$inline_697$$ in $goog$debug$LogManager$loggers_$$) {
    $res$$inline_695$$[$i$$inline_696$$++] = $key$$inline_697$$
  }
  $res$$inline_695$$.sort();
  return $res$$inline_695$$
}
;var $rflect$Debug$theLogger$$;
function $_inspect$$($name$$70$$, $obj$$74$$) {
  window["_inspect_" + $name$$70$$] = $obj$$74$$
}
function $_log$$($str$$55$$, $opt_var$$) {
  var $number$$1$$ = arguments.length;
  if($goog$userAgent$IE$$) {
    if(!$rflect$Debug$theLogger$$) {
      var $debugWindow$$ = new $goog$debug$FancyWindow$$("main");
      $debugWindow$$.$setEnabled$($JSCompiler_alias_TRUE$$);
      $debugWindow$$.$init$();
      $rflect$Debug$theLogger$$ = $goog$debug$LogManager$getLogger$$("demo");
      $rflect$Debug$theLogger$$.info("Logger started")
    }
    $rflect$Debug$theLogger$$.info($str$$55$$ + (2 == $number$$1$$ ? ": " + ($goog$isObject$$($opt_var$$) ? $opt_var$$.toString() : $opt_var$$) : ""))
  }else {
    "console" in window && "log" in window.console && window.console.log($str$$55$$ + (2 == $number$$1$$ ? ": " + ($goog$isObject$$($opt_var$$) ? $opt_var$$.toString() : $opt_var$$) : ""))
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
}catch($e$$48$$) {
}
;
