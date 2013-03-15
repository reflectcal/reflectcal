/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Dialog widget subclassing, which permits flat buttons.
 * @author alexeykofficial@gmail.com (Alex K.)
 * TODO(user):
 * Standardize CSS class names with other components
 * Add functionality to "host" other components in content area
 * Abstract out ButtonSet and make it more general
 * For now, no buttonset is used, and two specific buttons are added as
 * children.
 */

goog.provide('rflect.ui.Dialog');

goog.require('goog.ui.Component.EventType');
goog.require('goog.ui.Dialog');



/**
 * Class for showing simple dialog boxes.
 * The Html structure of the dialog box is:
 * <pre>
 *  Element         Function                Class-name, modal-dialog = default
 * ----------------------------------------------------------------------------
 * - iframe         Iframe mask              modal-dialog-bg
 * - div            Background mask          modal-dialog-bg
 * - div            Dialog area              modal-dialog
 *     - div        Title bar                modal-dialog-title
 *        - span                             modal-dialog-title-text
 *          - text  Title text               N/A
 *        - span                             modal-dialog-title-close
 *          - ??    Close box                N/A
 *     - div        Content area             modal-dialog-content
 *        - ??      User specified content   N/A
 *     - div        Button area              modal-dialog-buttons
 *        - button                           N/A
 *        - button
 *        - ...
 * </pre>
 * @constructor
 * @param {string=} opt_class CSS class name for the dialog element, also used
 *     as a class name prefix for related elements; defaults to modal-dialog.
 * @param {boolean=} opt_useIframeMask Work around windowed controls z-index
 *     issue by using an iframe instead of a div for bg element.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link
 *     goog.ui.Component} for semantics.
 * @param {goog.ui.ButtonRenderer=} opt_buttonRenderer Optional button renderer.
 * @extends {goog.ui.Dialog}
 */
rflect.ui.Dialog = function(opt_class, opt_useIframeMask, opt_domHelper,
    opt_buttonRenderer) {
  goog.ui.Dialog.call(this, opt_class, opt_useIframeMask, opt_domHelper);
  /**
   * CSS class name for the dialog element, also used as a class name prefix for
   * related elements.  Defaults to goog.getCssName('modal-dialog').
   * @type {string}
   * @private
   */
  this.class_ = opt_class || goog.getCssName('modal-dialog');

  this.buttons_ = rflect.ui.Dialog.ButtonSet.createOkCancel();

  /**
   * Renderer for buttons.
   * @type {goog.ui.ButtonRenderer}
   * @private
   */
  this.buttonRenderer_ = opt_buttonRenderer ||
      goog.ui.NativeButtonRenderer.getInstance();
};
goog.inherits(rflect.ui.Dialog, goog.ui.Dialog);


/**
 * Dialog event class.
 * @param {goog.ui.Button} key Key identifier for the button.
 * @param {goog.ui.ControlContent} caption Caption on the button (might be 
 * i18nlized).
 * @constructor
 * @extends {goog.events.Event}
 */
rflect.ui.Dialog.Event = function(key, caption) {
  this.type = goog.ui.Dialog.EventType.SELECT;
  this.key = key;
  this.caption = caption;
};
goog.inherits(rflect.ui.Dialog.Event, goog.events.Event);


/**
 * Button set. Default to Ok/Cancel.
 * @type {rflect.ui.Dialog.ButtonSet}
 * @private
 */
rflect.ui.Dialog.prototype.buttons_;


/** @override */
rflect.ui.Dialog.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var element = this.getElement();
  goog.asserts.assert(element, 'getElement() returns null');

  var dom = this.getDomHelper();
  this.titleEl_ = dom.createDom('div',
      {'className': goog.getCssName(this.class_, 'title'), 'id': this.getId()},
      this.titleTextEl_ = dom.createDom(
          'span', goog.getCssName(this.class_, 'title-text'), this.title_),
      this.titleCloseEl_ = dom.createDom(
          'span', goog.getCssName(this.class_, 'title-close'))),
  goog.dom.append(element, this.titleEl_,
      this.contentEl_ = dom.createDom('div',
          goog.getCssName(this.class_, 'content')),
      this.buttonEl_ = dom.createDom('div',
          goog.getCssName(this.class_, 'buttons')));

  this.titleId_ = this.titleEl_.id;
  goog.a11y.aria.setRole(element, this.getPreferredAriaRole());
  goog.a11y.aria.setState(element, goog.a11y.aria.State.LABELLEDBY,
      this.titleId_ || '');
  // If setContent() was called before createDom(), make sure the inner HTML of
  // the content element is initialized.
  if (this.content_) {
    this.contentEl_.innerHTML = this.content_;
  }
  goog.style.showElement(this.titleCloseEl_, this.hasTitleCloseButton_);

  // Render the buttons.
  if (this.buttons_) {
    // Appending button set dom to parent.
    this.dom.appendChild(this.buttonEl_, this.buttons_.createDom());
  }
  goog.style.showElement(this.buttonEl_, !!this.buttons_);
  this.setBackgroundElementOpacity(this.backgroundElementOpacity_);
};


/** @override */
rflect.ui.Dialog.prototype.decorateInternal = function(element) {
  goog.base(this, 'decorateInternal', element);
  var dialogElement = this.getElement();
  goog.asserts.assert(dialogElement,
      'The DOM element for dialog cannot be null.');
  // Decorate or create the content element.
  var contentClass = goog.getCssName(this.class_, 'content');
  this.contentEl_ = goog.dom.getElementsByTagNameAndClass(
      null, contentClass, dialogElement)[0];
  if (this.contentEl_) {
    this.content_ = this.contentEl_.innerHTML;
  } else {
    this.contentEl_ = this.getDomHelper().createDom('div', contentClass);
    if (this.content_) {
      this.contentEl_.innerHTML = this.content_;
    }
    dialogElement.appendChild(this.contentEl_);
  }

  // Decorate or create the title bar element.
  var titleClass = goog.getCssName(this.class_, 'title');
  var titleTextClass = goog.getCssName(this.class_, 'title-text');
  var titleCloseClass = goog.getCssName(this.class_, 'title-close');
  this.titleEl_ = goog.dom.getElementsByTagNameAndClass(
      null, titleClass, dialogElement)[0];
  if (this.titleEl_) {
    // Only look for title text & title close elements if a title bar element
    // was found.  Otherwise assume that the entire title bar has to be
    // created from scratch.
    this.titleTextEl_ = goog.dom.getElementsByTagNameAndClass(
        null, titleTextClass, this.titleEl_)[0];
    this.titleCloseEl_ = goog.dom.getElementsByTagNameAndClass(
        null, titleCloseClass, this.titleEl_)[0];
    // Give the title an id if it doesn't already have one.
    if (!this.titleEl_.id) {
      this.titleEl_.id = this.getId();
    }
  } else {
    // Create the title bar element and insert it before the content area.
    // This is useful if the element to decorate only includes a content area.
    this.titleEl_ = this.getDomHelper().createDom('div',
        {'className': titleClass, 'id': this.getId()});
    dialogElement.insertBefore(this.titleEl_, this.contentEl_);
  }
  this.titleId_ = this.titleEl_.id;

  // Decorate or create the title text element.
  if (this.titleTextEl_) {
    this.title_ = goog.dom.getTextContent(this.titleTextEl_);
  } else {
    this.titleTextEl_ = this.getDomHelper().createDom('span', titleTextClass,
        this.title_);
    this.titleEl_.appendChild(this.titleTextEl_);
  }
  goog.a11y.aria.setState(dialogElement, goog.a11y.aria.State.LABELLEDBY,
      this.titleId_ || '');
  // Decorate or create the title close element.
  if (!this.titleCloseEl_) {
    this.titleCloseEl_ = this.getDomHelper().createDom('span', titleCloseClass);
    this.titleEl_.appendChild(this.titleCloseEl_);
  }
  goog.style.showElement(this.titleCloseEl_, this.hasTitleCloseButton_);

  // Decorate or create the button container element.
  var buttonsClass = goog.getCssName(this.class_, 'buttons');
  this.buttonEl_ = goog.dom.getElementsByTagNameAndClass(
      null, buttonsClass, dialogElement)[0];
  this.buttons_ = new rflect.ui.Dialog.ButtonSet(this.getDomHelper(),
      this.buttonRenderer_);
  if (this.buttonEl_) {
    // Button container element found.  Create empty button set and use it to
    // decorate the button container.
    this.buttons_.decorateInternal(this.buttonEl_);
  } else {
    // Create new button container element, and render a button set into it.
    this.buttonEl_ = this.getDomHelper.createDom('div',
        goog.getCssName(this.class_, 'buttons'));
    this.buttons_.createDom(this.buttonEl_);
    goog.style.showElement(this.buttonEl_, !!this.buttons_);
  }
  this.setBackgroundElementOpacity(this.backgroundElementOpacity_);
};


/** @override */
rflect.ui.Dialog.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  // Listen for keyboard events while the dialog is visible.
  this.getHandler().
      listen(this.getElement(), goog.events.EventType.KEYDOWN, this.onKey_).
      listen(this.getElement(), goog.events.EventType.KEYPRESS, this.onKey_);

  // NOTE: see bug 1163154 for an example of an edge case where making the
  // dialog visible in response to a KEYDOWN will result in a CLICK event
  // firing on the default button (immediately closing the dialog) if the key
  // that fired the KEYDOWN is also normally used to activate controls
  // (i.e. SPACE/ENTER).
  //
  // This could be worked around by attaching the onButtonClick_ handler in a
  // setTimeout, but that was deemed undesirable.
  this.getHandler().listen(this.buttons_, goog.ui.Component.EventType.ACTION,
      this.onButtonClick_);

  // Add drag support.
  this.setDraggingEnabled_(this.draggable_);

  // Add event listeners to the close box and the button container.
  this.getHandler().listen(
      this.titleCloseEl_, goog.events.EventType.CLICK,
      this.onTitleCloseClick_);

  var element = this.getElement();
  goog.asserts.assert(element, 'The DOM element for dialog cannot be null');
  goog.a11y.aria.setRole(element, this.getPreferredAriaRole());
  if (this.titleTextEl_.id !== '') {
    goog.a11y.aria.setState(element, goog.a11y.aria.State.LABELLEDBY,
        this.titleTextEl_.id);
  }

  if (!this.modal_) {
    this.setModalInternal_(false);
  }
};


/**
 * Focuses the dialog contents and the default dialog button if there is one.
 * @override
 */
rflect.ui.Dialog.prototype.focus = function() {
  goog.base(this, 'focus');

  // Move focus to the default button (if any).
  if (this.getButtonSet()) {
    var defaultButton = this.getButtonSet().getDefault();
    if (defaultButton) {
      defaultButton.setFocused(true);
    }
  }
};


/**
 * Handles a click on the title close area.
 * @param {goog.events.BrowserEvent} e Browser's event object.
 * @private
 */
rflect.ui.Dialog.prototype.onTitleCloseClick_ = function(e) {
  if (!this.hasTitleCloseButton_) {
    return;
  }

  var bs = this.getButtonSet();
  var key = bs && bs.getCancel();
  // Only if there is a valid cancel button is an event dispatched.
  if (key) {
    var caption = /** @type {Element|string} */(key.getContent());
    if (this.dispatchEvent(new rflect.ui.Dialog.Event(key, caption))) {
      this.setVisible(false);
    }
  } else {
    this.setVisible(false);
  }
};


/**
 * Sets the button set to use.
 * Note: Passing in null will cause no button set to be rendered.
 * @param {rflect.ui.Dialog.ButtonSet?} buttons The button set to use.
 */
rflect.ui.Dialog.prototype.setButtonSet = function(buttons) {
  if (this.buttonEl_) {
    if (buttons) {
      this.dom_.appendChild(this.buttonEl_, buttons.getElement());
    } else {
      if (this.buttons_)
        this.buttons_.dispose();
      this.buttonEl_.innerHTML = '';
    }
    goog.style.showElement(this.buttonEl_, !!this.buttons_);
  }
  this.buttons_ = buttons;
};


/**
 * Returns the button set being used.
 * @return {rflect.ui.Dialog.ButtonSet?} The button set being used.
 */
rflect.ui.Dialog.prototype.getButtonSet = function() {
  return this.buttons_;
};


/**
 * Handles a click on the button container.
 * @param {goog.events.BrowserEvent} e Browser's event object.
 * @private
 */
rflect.ui.Dialog.prototype.onButtonClick_ = function(e) {
  var key = e.target;
  if (key instanceof goog.ui.Button) {
    var caption = /** @type {Element|string} */(key.getContent());
    if (this.dispatchEvent(new rflect.ui.Dialog.Event(key, caption))) {
      this.setVisible(false);
    }
  }
};


/**
 * Handles keydown and keypress events, and dismisses the popup if cancel is
 * pressed.  If there is a cancel action in the ButtonSet, than that will be
 * fired.  Also prevents tabbing out of the dialog.
 * @param {goog.events.BrowserEvent} e Browser's event object.
 * @private
 */
rflect.ui.Dialog.prototype.onKey_ = function(e) {
  var close = false;
  var hasHandler = false;
  var buttonSet = this.getButtonSet();
  var target = e.target;

  if (e.type == goog.events.EventType.KEYDOWN) {
    // Escape and tab can only properly be handled in keydown handlers.
    if (this.escapeToCancel_ && e.keyCode == goog.events.KeyCodes.ESC) {
      // Only if there is a valid cancel button is an event dispatched.
      var cancel = buttonSet && buttonSet.getCancel();

      // Users may expect to hit escape on a SELECT element.
      var isSpecialFormElement =
          target.tagName == 'SELECT' && !target.disabled;

      if (cancel && !isSpecialFormElement) {
        hasHandler = true;

        var caption = cancel.getContent();
        close = this.dispatchEvent(
            new rflect.ui.Dialog.Event(cancel,
                /** @type {Element|null|string} */(caption)));
      } else if (!isSpecialFormElement) {
        close = true;
      }
    } else if (e.keyCode == goog.events.KeyCodes.TAB && e.shiftKey &&
        target == this.getElement()) {
      // Prevent the user from shift-tabbing backwards out of the dialog box.
      // Instead, set up a wrap in focus backward to the end of the dialog.
      this.setupBackwardTabWrap();
    }
  } else if (e.keyCode == goog.events.KeyCodes.ENTER) {
    // Only handle ENTER in keypress events, in case the action opens a
    // popup window.
    var key;
    if (target.tagName == 'BUTTON') {
      // If focus was on a button, it must have been enabled, so we can fire
      // that button's handler.
      key = target.name;
    } else if (buttonSet) {
      // Try to fire the default button's handler (if one exists), but only if
      // the button is enabled.
      var defaultKey = buttonSet.getDefault();

      // Users may expect to hit enter on a TEXTAREA, SELECT or an A element.
      var isSpecialFormElement =
          (target.tagName == 'TEXTAREA' || target.tagName == 'SELECT' ||
           target.tagName == 'A') && !target.disabled;

      if (defaultKey && defaultKey.isEnabled() && !isSpecialFormElement) {
        key = defaultKey;
      }
    }
    if (key && buttonSet) {
      hasHandler = true;
      close = this.dispatchEvent(
          new rflect.ui.Dialog.Event(key, String(key.getContent())));
    }
  }

  if (close || hasHandler) {
    e.stopPropagation();
    e.preventDefault();
  }

  if (close) {
    this.setVisible(false);
  }
};


/**
 * A button set defines the behaviour of a set of buttons that the dialog can
 * show.  Uses the {@link goog.structs.Map} interface.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper; see {@link
 *    goog.ui.Component} for semantics.
 * @param {goog.ui.ButtonRenderer=} opt_buttonRenderer Optional button renderer.
 * @constructor
 * @extends {goog.ui.Component}
 */
rflect.ui.Dialog.ButtonSet = function(opt_domHelper, opt_buttonRenderer) {
  goog.ui.Component.call(this, opt_domHelper);

  /**
   * Renderer for buttons.
   * @type {goog.ui.ButtonRenderer}
   * @private
   */
  this.buttonRenderer_ = opt_buttonRenderer ||
      goog.ui.NativeButtonRenderer.getInstance();
};
goog.inherits(rflect.ui.Dialog.ButtonSet, goog.ui.Component);


/**
 * A CSS className for this component.
 * @type {string}
 * @private
 */
rflect.ui.Dialog.ButtonSet.prototype.class_ = goog.getCssName('goog-buttonset');


/**
 * The button that has default focus.
 * @type {?goog.ui.Button}
 * @private
 */
rflect.ui.Dialog.ButtonSet.prototype.defaultButton_ = null;


/**
 * The button whose action is associated with the escape key and the X button
 * on the dialog.
 * @type {?goog.ui.Button}
 * @private
 */
rflect.ui.Dialog.ButtonSet.prototype.cancelButton_ = null;


/**
 * Adds a button to this button set. Buttons will be displayed in the order they
 * are added.
 * @see goog.ui.Dialog.DefaultButtons
 * @param {!goog.ui.Button} button The button.
 * @param {boolean=} opt_isDefault Whether this button is the default button.
 *     Dialog will dispatch for this button if enter is pressed.
 * @param {boolean=} opt_isCancel Whether this button has the same behavior as
 *     cancel. If escape is pressed this button will fire.
 * @return {!rflect.ui.Dialog.ButtonSet} The button set, to make it easy to chain
 *     "addButton" calls and build new ButtonSets.
 */
rflect.ui.Dialog.ButtonSet.prototype.addButton = function(button, opt_isDefault,
    opt_isCancel) {
  this.addChild(button);
  if (opt_isDefault)
    this.defaultButton_ = button;
  if (opt_isCancel)
    this.cancelButton_ = button;
  return this;
};


/**
 * Renders the button set inside its container element.
 * @override
 */
rflect.ui.Dialog.ButtonSet.prototype.createDom = function() {
  var container = this.dom_.createDom('div');
  this.forEachChild(function(child) {
    this.dom_.appendChild(container, child.createDom());
  }, this);
  rflect.ui.Dialog.ButtonSet.superClass_.setElementInternal(container);
};


/**
 * Decorates the given element by adding any button-decorable elements found
 * among its descendants to the button set.  The first button found is assumed
 * to be the default and will receive focus when the button set is rendered.
 * If a button with a name of {@link goog.ui.Dialog.DefaultButtonKeys.CANCEL}
 * is found, it is assumed to have "Cancel" semantics.
 * @param {Element} element The element to decorate; should contain buttons.
 */
rflect.ui.Dialog.ButtonSet.prototype.decorateInternal = function(element) {
  this.setElementInternal(element);
  if (!element || element.nodeType != goog.dom.NodeType.ELEMENT) {
    return;
  }
  var buttons = this.dom_.getChildren(this.element_);
  for (var i = 0, buttonEl, key, caption; buttonEl = buttons[i]; i++) {
    var button = new goog.ui.Button(null, this.buttonRenderer_);
    var isDefault = i == 0;
    // Buttons should have a "name" attribute and have their caption defined by
    // their innerHTML, but not everyone knows this, and we should play nice.
    //key = button.name || button.id;
    caption = goog.dom.getTextContent(buttonEl) || buttonEl.value;
    var isCancel = caption == goog.ui.Dialog.DefaultButtonKeys.CANCEL;
    this.addButton(button, isDefault, isCancel);
    button.decorateInternal(buttonEl);
    if (isDefault) {
      goog.dom.classes.add(buttonEl, goog.getCssName(this.class_,
          'default'));
    }
  }
};


/**
 * Sets the default button.
 * @param {number} aIndex Index of default button.
 */
rflect.ui.Dialog.ButtonSet.prototype.setDefault = function(aIndex) {
  this.defaultButton_ = /**@type {goog.ui.Button}*/ (this.getChildAt(aIndex));
};


/**
 * Returns the default button.
 * @return {goog.ui.Button} The default button.
 */
rflect.ui.Dialog.ButtonSet.prototype.getDefault = function() {
  return this.defaultButton_;
};


/**
 * Sets the cancel button.
 * @param {number} aIndex Index of cancel button.
 */
rflect.ui.Dialog.ButtonSet.prototype.setCancel = function(aIndex) {
  this.cancelButton_ = /**@type {goog.ui.Button}*/ (this.getChildAt(aIndex));
};


/**
 * Returns the cancel button.
 * @return {goog.ui.Button} The cancel button.
 */
rflect.ui.Dialog.ButtonSet.prototype.getCancel = function() {
  return this.cancelButton_;
};


/**
 * Returns the HTML Button element.
 * @param {number} aIndex Index of button to return.
 * @return {goog.ui.Button} The button, if found else null.
 */
rflect.ui.Dialog.ButtonSet.prototype.getButton = function(aIndex) {
  var button = this.getChildAt(aIndex);
  if (button)
    return /**@type {goog.ui.Button}*/ (button);
  return null;
};


/**
 * Enables or disables a button in this set by key. If the button is not found,
 * does nothing.
 * @param {number} aIndex Index of button to enable or disable.
 * @param {boolean} enabled True to enable; false to disable.
 */
rflect.ui.Dialog.ButtonSet.prototype.setButtonEnabled = function(aIndex,
    enabled) {
  var button = this.getButton(aIndex);
  if (button) {
    button.setEnabled(enabled);
  }
};


/**
 * Enables or disables all of the buttons in this set.
 * @param {boolean} enabled True to enable; false to disable.
 */
rflect.ui.Dialog.ButtonSet.prototype.setAllButtonsEnabled = function(enabled) {
  this.forEachChild(function(button){
    button.disabled = !enabled;
  });
};


rflect.ui.Dialog.ButtonSet.getButton = function(caption) {
  return new goog.ui.Button(caption, goog.ui.FlatButtonRenderer.getInstance());
}


/**
 * Creates a new ButtonSet with a single 'OK' button, which is also set with
 * cancel button semantics so that pressing escape will close the dialog.
 * @return {!rflect.ui.Dialog.ButtonSet} The created ButtonSet.
 */
rflect.ui.Dialog.ButtonSet.createOk = function() {
  var ok = rflect.ui.Dialog.ButtonSet.getButton(
        goog.ui.Dialog.DefaultButtonCaptions.OK);
  return new rflect.ui.Dialog.ButtonSet().
      addButton(ok, true, true);
};


/**
 * Creates a new ButtonSet with 'SAVE' (default) and 'Cancel' buttons.
 * @return {!rflect.ui.Dialog.ButtonSet} The created ButtonSet.
 */
rflect.ui.Dialog.ButtonSet.createOkCancel = function() {
  var ok = rflect.ui.Dialog.ButtonSet.getButton(
      goog.ui.Dialog.DefaultButtonCaptions.OK);
  var cancel = rflect.ui.Dialog.ButtonSet.getButton(
      goog.ui.Dialog.DefaultButtonCaptions.CANCEL);
  return new rflect.ui.Dialog.ButtonSet().
      addButton(ok, true).addButton(cancel, false, true);
};


/**
 * Creates a new ButtonSet with 'SAVE' (default) and 'Cancel' buttons.
 * @return {!rflect.ui.Dialog.ButtonSet} The created ButtonSet.
 */
rflect.ui.Dialog.ButtonSet.createSaveCancel = function() {
  var save = rflect.ui.Dialog.ButtonSet.getButton(
      goog.ui.Dialog.DefaultButtonCaptions.SAVE);
  var cancel = rflect.ui.Dialog.ButtonSet.getButton(
      goog.ui.Dialog.DefaultButtonCaptions.CANCEL);
  return new rflect.ui.Dialog.ButtonSet().
      addButton(save, true).addButton(cancel, false, true);
};
