// simplebox/simplebox.js

import Yellowboxediting from './yellowboxediting';
import Yellowboxui from './yellowboxui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class Yellowbox extends Plugin {
    static get requires() {
        return [ Yellowboxediting, Yellowboxui ];
    }
}
