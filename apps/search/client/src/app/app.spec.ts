import { beforeEach, describe, expect, test } from 'bun:test';
import { App } from './app';

describe('App', () => {
    let component: App;

    beforeEach(async () => {
        component = new App();
    });

    test('should create the app', () => {
        component.ngOnInit();
        expect(component.shell).toBe('pkgJSON');
    });
});
