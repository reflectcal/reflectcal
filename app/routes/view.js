

/**
 * Renders main page for compiled view.
 */
exports.view = function(req, res){
  res.render('rflectcalendar-compiled', { calendars: '[]', settings: '[]' });
};

/**
 * Renders main page for uncompiled view.
 */
exports.viewSource = function(req, res){
  res.render('rflectcalendar-source', { calendars: '[]', settings: '[]' });
};