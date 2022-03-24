// greenbox/BackImagediting.js

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

// ADDED 2 imports
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import Insertgreenboxcommand from './insertgreenboxcommand';


export default class Greenboxediting extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertGreenBox', new Insertgreenboxcommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'greenBox', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block'
        } );

        schema.register( 'greenBoxTitle', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'greenBox',

            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowContentOf: '$root'
        } );

        schema.register( 'greenBoxDescription', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'greenBox',

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$root'
        } );

        schema.addChildCheck( ( context, childDefinition ) => {
            if ( context.endsWith( 'greenBoxDescription' ) && childDefinition.name == 'greenBox' ) {
                return false;
            }
        } );
    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        // <greenBox> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'greenBox',
            view: {
                name: 'section',
                classes: 'green-box'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'greenBox',
            view: {
                name: 'section',
                classes: 'green-box'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'greenBox',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'section', { class: 'green-box' } );

                return toWidget( section, viewWriter, { label: 'green box widget' } );
            }
        } );

        // <greenBoxTitle> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'greenBoxTitle',
            view: {
                name: 'div',
                classes: 'green-box-title'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'greenBoxTitle',
            view: {
                name: 'div',
                classes: 'green-box-title'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'greenBoxTitle',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'green-box-title' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );

        // <greenBoxDescription> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'greenBoxDescription',
            view: {
                name: 'div',
                classes: 'green-box-description'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'greenBoxDescription',
            view: {
                name: 'div',
                classes: 'green-box-description'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'greenBoxDescription',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'green-box-description' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );
    }
}