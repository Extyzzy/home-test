import Command from '@ckeditor/ckeditor5-core/src/command';

export default class Insertyellowboxcommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            // Insert <yellowBox>*</yellowBox> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertContent( createSimpleBox( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'yellowBox' );

        this.isEnabled = allowedIn !== null;
    }
}

function createSimpleBox( writer ) {
    const yellowBox = writer.createElement( 'yellowBox' );
    const yellowBoxTitle = writer.createElement( 'yellowBoxTitle' );
    const yellowBoxDescription = writer.createElement( 'yellowBoxDescription' );
    const yellowBoxDescriptionTop = writer.createElement( 'yellowBoxDescription_top' );

    writer.append( yellowBoxDescriptionTop, yellowBox );

    //writer.insertText( 'Focus', yellowBoxTitle, 'end' );
    // There must be at least one paragraph for the description to be editable.
    // See https://github.com/ckeditor/ckeditor5/issues/1464.
    writer.appendElement( 'paragraph', yellowBoxDescriptionTop );

    return yellowBox;
}