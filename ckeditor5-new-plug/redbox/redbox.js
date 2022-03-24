// simplebox/simplebox.js

import Redboxediting from './redboxediting';
import Redboxui from './redboxui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class Redbox extends Plugin {
    static get requires() {
        return [ Redboxediting, Redboxui ];
    }
}
