// redbox/BackImagediting.js

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

// ADDED 2 imports
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import Insertredboxcommand from './insertredboxcommand';


export default class Redboxediting extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertRedBox', new Insertredboxcommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'redBox', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block'
        } );

        schema.register( 'redBoxTitle', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'redBox',

            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowContentOf: '$root'
        } );

        schema.register( 'redBoxDescription', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'redBox',

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$root'
        } );

        schema.addChildCheck( ( context, childDefinition ) => {
            if ( context.endsWith( 'redBoxDescription' ) && childDefinition.name == 'redBox' ) {
                return false;
            }
        } );
    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        // <redBox> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'redBox',
            view: {
                name: 'section',
                classes: 'red-box'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'redBox',
            view: {
                name: 'section',
                classes: 'red-box'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'redBox',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'section', { class: 'red-box' } );

                return toWidget( section, viewWriter, { label: 'red box widget' } );
            }
        } );

        // <redBoxTitle> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'redBoxTitle',
            view: {
                name: 'div',
                classes: 'red-box-title'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'redBoxTitle',
            view: {
                name: 'div',
                classes: 'red-box-title'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'redBoxTitle',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'red-box-title' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );

        // <redBoxDescription> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'redBoxDescription',
            view: {
                name: 'div',
                classes: 'red-box-description'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'redBoxDescription',
            view: {
                name: 'div',
                classes: 'red-box-description'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'redBoxDescription',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'red-box-description' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );
    }
}