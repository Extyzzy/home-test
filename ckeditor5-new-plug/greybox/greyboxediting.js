// greybox/BackImagediting.js

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

// ADDED 2 imports
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import Insertgreyboxcommand from './insertgreyboxcommand';


export default class Greyboxediting extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertGreyBox', new Insertgreyboxcommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'greyBox', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block'
        } );

        schema.register( 'greyBoxTitle', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'greyBox',

            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowContentOf: '$root'
        } );

        schema.register( 'greyBoxDescription', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'greyBox',

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$root'
        } );

        schema.register( 'greyBoxDescription_top', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'greyBox',

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$root'
        } );

        schema.register( 'greyBoxDescription_bottom', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'greyBox',

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$root'
        } );

        schema.addChildCheck( ( context, childDefinition ) => {
            if ( context.endsWith( 'greyBoxDescription' ) && context.endsWith( 'greyBoxDescription_top' )
                && context.endsWith( 'greyBoxDescription_bottom' ) && childDefinition.name == 'greyBox' ) {
                return false;
            }
        } );
    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        // <greyBox> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'greyBox',
            view: {
                name: 'section',
                classes: 'grey-box'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'greyBox',
            view: {
                name: 'section',
                classes: 'grey-box'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'greyBox',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'section', { class: 'grey-box' } );

                return toWidget( section, viewWriter, { label: 'grey box widget' } );
            }
        } );

        // <greyBoxTitle> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'greyBoxTitle',
            view: {
                name: 'div',
                classes: 'grey-box-title'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'greyBoxTitle',
            view: {
                name: 'div',
                classes: 'grey-box-title'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'greyBoxTitle',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'grey-box-title' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );

        // <greyBoxDescription> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'greyBoxDescription',
            view: {
                name: 'div',
                classes: 'grey-box-description'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'greyBoxDescription',
            view: {
                name: 'div',
                classes: 'grey-box-description'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'greyBoxDescription',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'grey-box-description' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );

        // <greyBoxDescriptionTop> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'greyBoxDescription_top',
            view: {
                name: 'div',
                classes: 'grey-box-description-top'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'greyBoxDescription_top',
            view: {
                name: 'div',
                classes: 'grey-box-description-top'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'greyBoxDescription_top',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'grey-box-description-top' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );

        // <greyBoxDescriptionBottom> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'greyBoxDescription_bottom',
            view: {
                name: 'div',
                classes: 'grey-box-description-bottom'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'greyBoxDescription_bottom',
            view: {
                name: 'div',
                classes: 'grey-box-description-bottom'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'greyBoxDescription_bottom',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'grey-box-description-bottom' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );
    }
}