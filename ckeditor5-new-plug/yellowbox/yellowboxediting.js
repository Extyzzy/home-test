// yellowbox/BackImagediting.js

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

// ADDED 2 imports
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import Insertyellowboxcommand from './insertyellowboxcommand';


export default class Yellowboxediting extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertYellowBox', new Insertyellowboxcommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'yellowBox', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block'
        } );

        schema.register( 'yellowBoxTitle', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'yellowBox',

            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowContentOf: '$root'
        } );

        schema.register( 'yellowBoxDescription', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'yellowBox',

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$root'
        } );

        schema.register( 'yellowBoxDescription_top', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'yellowBox',

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$root'
        } );

        schema.register( 'yellowBoxDescription_bottom', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'yellowBox',

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$root'
        } );

        schema.addChildCheck( ( context, childDefinition ) => {
            if ( context.endsWith( 'yellowBoxDescription' ) && context.endsWith( 'yellowBoxDescription_top' )
                && context.endsWith( 'yellowBoxDescription_bottom' ) && childDefinition.name == 'yellowBox' ) {
                return false;
            }
        } );
    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        // <yellowBox> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'yellowBox',
            view: {
                name: 'section',
                classes: 'yellow-box'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'yellowBox',
            view: {
                name: 'section',
                classes: 'yellow-box'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'yellowBox',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'section', { class: 'yellow-box' } );

                return toWidget( section, viewWriter, { label: 'yellow box widget' } );
            }
        } );

        // <yellowBoxTitle> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'yellowBoxTitle',
            view: {
                name: 'div',
                classes: 'yellow-box-title'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'yellowBoxTitle',
            view: {
                name: 'div',
                classes: 'yellow-box-title'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'yellowBoxTitle',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'yellow-box-title' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );

        // <yellowBoxDescription> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'yellowBoxDescription',
            view: {
                name: 'div',
                classes: 'yellow-box-description'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'yellowBoxDescription',
            view: {
                name: 'div',
                classes: 'yellow-box-description'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'yellowBoxDescription',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'yellow-box-description' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );

        // <yellowBoxDescriptionTop> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'yellowBoxDescription_top',
            view: {
                name: 'div',
                classes: 'yellow-box-description-top'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'yellowBoxDescription_top',
            view: {
                name: 'div',
                classes: 'yellow-box-description-top'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'yellowBoxDescription_top',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'yellow-box-description-top' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );

        // <yellowBoxDescriptionBottom> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'yellowBoxDescription_bottom',
            view: {
                name: 'div',
                classes: 'yellow-box-description-bottom'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'yellowBoxDescription_bottom',
            view: {
                name: 'div',
                classes: 'yellow-box-description-bottom'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'yellowBoxDescription_bottom',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'yellow-box-description-bottom' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );
    }
}