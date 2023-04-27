import React from 'react';
import baseLoadable from '@loadable/component';

const loadable = (fn, options) =>
  baseLoadable(fn, {...options, fallback: <div>Not found</div>});

loadable.lib = baseLoadable.lib;

export default loadable;
