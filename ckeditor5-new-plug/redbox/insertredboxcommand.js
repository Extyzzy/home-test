import Command from '@ckeditor/ckeditor5-core/src/command';

export default class Insertredboxcommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            // Insert <redBox>*</redBox> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertContent( createSimpleBox( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'redBox' );

        this.isEnabled = allowedIn !== null;
    }
}

function createSimpleBox( writer ) {
    const redBox = writer.createElement( 'redBox' );
    const redBoxTitle = writer.createElement( 'redBoxTitle' );
    const redBoxDescription = writer.createElement( 'redBoxDescription' );

    writer.append( redBoxTitle, redBox );
    writer.append( redBoxDescription, redBox );

    writer.insertText( 'Nadelen', redBoxTitle, 'end' );
    // There must be at least one paragraph for the description to be editable.
    // See https://github.com/ckeditor/ckeditor5/issues/1464.
    writer.appendElement( 'paragraph', redBoxTitle );
    writer.appendElement( 'paragraph', redBoxDescription );

    return redBox;
}