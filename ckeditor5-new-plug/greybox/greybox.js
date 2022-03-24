// simplebox/simplebox.js

import Greyboxediting from './greyboxediting';
import Greyboxui from './greyboxui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class Greybox extends Plugin {
    static get requires() {
        return [ Greyboxediting, Greyboxui ];
    }
}
