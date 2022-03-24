import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import backImgSvg from "../img/imgbox.svg";
import {toWidget, toWidgetEditable} from "@ckeditor/ckeditor5-widget/src/utils";
import Command from '@ckeditor/ckeditor5-core/src/command';

export default class ImgBox extends Plugin {
    static get requires() {
        return [ SimpleBoxEditing, SimpleBoxUI ];
    }
}

class SimpleBoxUI extends Plugin {
    init() {
        console.log( 'SimpleBoxUI#init() got called' );

        const editor = this.editor;
        const t = editor.t;

        // The "simpleBox" button must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add( 'imgBox', locale => {
            // The state of the button will be bound to the widget command.
            const command = editor.commands.get( 'insertSimpleBox-img' );

            // The button will be an instance of ButtonView.
            const buttonView = new ButtonView( locale );

            buttonView.set( {
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
                label: 'Img box',
                icon: backImgSvg,
                tooltip: true
            } );

            // Bind the state of the button to the command.
            buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

            // Execute the command when the button is clicked (executed).
            this.listenTo( buttonView, 'execute', () => editor.execute( 'insertSimpleBox-img' ) );

            return buttonView;
        } );
    }
}

class SimpleBoxEditing extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {
        console.log( 'SimpleBoxEditing#init() got called' );

        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertSimpleBox-img', new InsertSimpleBoxCommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'simpleBox-img', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block'
        } );

        schema.register( 'simpleBoxTitle-img', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'simpleBox-img',

            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowContentOf: '$root'
        } );

        schema.register( 'simpleBoxDescription-img', {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: 'simpleBox-img',

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$root'
        } );

        schema.addChildCheck( ( context, childDefinition ) => {
            if ( context.endsWith( 'simpleBoxDescription-img' ) && childDefinition.name == 'simpleBox' ) {
                return false;
            }
        } );
    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        // <simpleBox> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'simpleBox-img',
            view: {
                name: 'section',
                classes: 'box-img'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'simpleBox-img',
            view: {
                name: 'section',
                classes: 'box-img'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleBox-img',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'section', { class: 'box-img' } );

                return toWidget( section, viewWriter, { label: 'simple box widget' } );
            }
        } );

        // <simpleBoxTitle> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'simpleBoxTitle-img',
            view: {
                name: 'div',
                classes: 'box-img-container'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'simpleBoxTitle-img',
            view: {
                name: 'div',
                classes: 'box-img-container'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleBoxTitle-img',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const h1 = viewWriter.createEditableElement( 'div', { class: 'box-img-container' } );

                return toWidgetEditable( h1, viewWriter );
            }
        } );

        // <simpleBoxDescription> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'simpleBoxDescription-img',
            view: {
                name: 'div',
                classes: 'box-img-description'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'simpleBoxDescription-img',
            view: {
                name: 'div',
                classes: 'box-img-description'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'simpleBoxDescription-img',
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'box-img-description' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );
    }
}

class InsertSimpleBoxCommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            // Insert <simpleBox>*</simpleBox> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertContent( createSimpleBox( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'simpleBox-img' );

        this.isEnabled = allowedIn !== null;
    }
}

function createSimpleBox( writer ) {
    const simpleBox = writer.createElement( 'simpleBox-img' );
    const simpleBoxTitle = writer.createElement( 'simpleBoxTitle-img' );
    const simpleBoxDescription = writer.createElement( 'simpleBoxDescription-img' );

    writer.append( simpleBoxTitle, simpleBox );
    writer.append( simpleBoxDescription, simpleBox );

    // There must be at least one paragraph for the description to be editable.
    // See https://github.com/ckeditor/ckeditor5/issues/1464.
    writer.appendElement( 'paragraph', simpleBoxTitle );
    writer.appendElement( 'paragraph', simpleBoxDescription );

    return simpleBox;
}