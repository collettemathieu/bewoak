import { GlobalRegistrator } from '@happy-dom/global-registrator';

// import 'zone.js';
// import 'zone.js/plugins/proxy';
// import 'zone.js/plugins/sync-test';
// import 'zone.js/testing';

GlobalRegistrator.register();

import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
