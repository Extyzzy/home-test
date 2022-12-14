import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import greySvg from "../img/grey.svg";

export default class Greyboxui extends Plugin {
    init() {
        const editor = this.editor;

        // The "simpleBox" button must be registegrey among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add( 'greyBox', locale => {
            // The state of the button will be bound to the widget command.
            const command = editor.commands.get( 'insertGreyBox' );

            // The button will be an instance of ButtonView.
            const buttonView = new ButtonView( locale );

            buttonView.set( {
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
                label: 'GreyBox',
                icon: greySvg,
                tooltip: true
            } );

            // Bind the state of the button to the command.
            buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

            // Execute the command when the button is clicked (executed).
            this.listenTo( buttonView, 'execute', () => editor.execute( 'insertGreyBox') );

            return buttonView;
        } );
    }
}