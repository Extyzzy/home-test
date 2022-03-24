import Command from '@ckeditor/ckeditor5-core/src/command';

export default class Insertgreyboxcommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            // Insert <greyBox>*</greyBox> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertContent( createSimpleBox( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'greyBox' );

        this.isEnabled = allowedIn !== null;
    }
}

function createSimpleBox( writer ) {
    const greyBox = writer.createElement( 'greyBox' );
    const greyBoxDescriptionTop = writer.createElement( 'greyBoxDescription_top' );

    writer.append( greyBoxDescriptionTop, greyBox );

    // There must be at least one paragraph for the description to be editable.
    // See https://github.com/ckeditor/ckeditor5/issues/1464.
    writer.appendElement( 'paragraph', greyBoxDescriptionTop );

    return greyBox;
}