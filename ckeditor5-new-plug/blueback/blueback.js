import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import backBlueSvg from "../img/bluescreen.svg";
import {toWidget, toWidgetEditable} from "@ckeditor/ckeditor5-widget/src/utils";

let generateID = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

export default class Blueback extends Plugin {
    static get requires() {                                                    // ADDED
        return [ Widget ];
    }

    init() {
        const editor = this.editor;

        // The "simpleBox" button must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add( `blueback`, locale => {
            // The button will be an instance of ButtonView.
            const buttonView = new ButtonView( locale );

            editor.commands.get( 'insertBackImage' );

            buttonView.set( {
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
                label: 'Back blue',
                icon: backBlueSvg,
                tooltip: true
            } );

            buttonView.on( 'execute', () => {

                let id = generateID();

                this._defineSchema(id);
                this._defineConverters(id);             // ADDED

                this.editor.model.change( writer => {
                    // Insert <simpleBox>*</simpleBox> at the current selection position
                    // in a way that will result in creating a valid model structure.


                    this.editor.model.insertContent( createSimpleBox( writer, id ) );

                } );

            } )

            return buttonView;
        } );
    }

    _defineSchema(id) {
        const schema = this.editor.model.schema;

        schema.register( `back-img-container_${id}`, {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block'
        } );

        schema.register( `a_${id}`, {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block'
        } );

        schema.register( `backImage_${id}`, {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block',
        } );


        schema.register( `backImageDescription_${id}`, {
            // Cannot be split or left by the caret.
            isLimit: true,

            allowIn: `backImage_${id}`,

            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$root'
        } );

        schema.addChildCheck( ( context, childDefinition ) => {
            if ( context.endsWith( 'backImageDescription' ) && childDefinition.name == 'backImage' ) {
                return false;
            }
        } );
    }

    _defineConverters(id, src) {
        const conversion = this.editor.conversion;

        //back-img-container_${id}
        conversion.elementToElement({
            model: `back-img-container_${id}` ,
            view: {
                name: 'div',
                classes: 'back-blue-container'
            }
        });

        // a img tag converters
        conversion.for('upcast').elementToElement({
            model: `a_${id}`,
            view: {
                name: 'a',
                classes: 'invisible',
                href: src
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: `a_${id}`,
            view: {
                name: 'a',
                classes: 'invisible',
                href: src
            }
        });
        conversion.for('editingDowncast').elementToElement({
            model: `a_${id}`,
            view: (modelElement, {writer: viewWriter}) => {
                const section = viewWriter.createContainerElement('a', {
                    class: 'invisible',
                    href: src
                });

                return toWidget(section, viewWriter, {label: 'a href'});
            }
        });

        // <simpleBox> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: `backImage_${id}`,
            view: {
                name: 'section',
                classes: 'back-blue'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: `backImage_${id}`,
            view: {
                name: 'section',
                classes: 'back-blue'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: `backImage_${id}`,
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'section', { class: 'back-blue' } );

                return toWidget( section, viewWriter, { label: 'simple box widget' } );
            }
        } );


        // <backImageDescription> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: `backImageDescription_${id}`,
            view: {
                name: 'div',
                classes: 'back-img-description'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: `backImageDescription_${id}`,
            view: {
                name: 'div',
                classes: 'back-img-description'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: `backImageDescription_${id}`,
            view: ( modelElement, { writer: viewWriter } ) => {
                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement( 'div', { class: 'back-img-description' } );

                return toWidgetEditable( div, viewWriter );
            }
        } );
    }
}

function createSimpleBox( writer, id ) {
    const simpleBox = writer.createElement( `backImage_${id}` );
    const simpleBoxDescription = writer.createElement( `backImageDescription_${id}`);
    const aHref = writer.createElement( `a_${id}`);
    const backImg = writer.createElement( `back-img-container_${id}`);


    writer.append( simpleBoxDescription, simpleBox );
    writer.append( aHref, simpleBox );
    writer.append( backImg, simpleBox );

    // There must be at least one paragraph for the description to be editable.
    // See https://github.com/ckeditor/ckeditor5/issues/1464.
    writer.appendElement( 'paragraph', simpleBoxDescription );

    return simpleBox;
}