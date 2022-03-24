// simplebox/simplebox.js

import Greenboxediting from './greenboxediting';
import Greenboxui from './greenboxui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class Greenbox extends Plugin {
    static get requires() {
        return [ Greenboxediting, Greenboxui ];
    }
}
