import Command from '@ckeditor/ckeditor5-core/src/command';

export default class Insertgreenboxcommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            // Insert <greenBox>*</greenBox> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertContent( createSimpleBox( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'greenBox' );

        this.isEnabled = allowedIn !== null;
    }
}

function createSimpleBox( writer ) {
    const greenBox = writer.createElement( 'greenBox' );
    const greenBoxTitle = writer.createElement( 'greenBoxTitle' );
    const greenBoxDescription = writer.createElement( 'greenBoxDescription' );

    writer.append( greenBoxTitle, greenBox );
    writer.append( greenBoxDescription, greenBox );

    writer.insertText( 'Voordelen', greenBoxTitle, 'end' );
    // There must be at least one paragraph for the description to be editable.
    // See https://github.com/ckeditor/ckeditor5/issues/1464.
    writer.appendElement( 'paragraph', greenBoxTitle );
    writer.appendElement( 'paragraph', greenBoxDescription );

    return greenBox;
}