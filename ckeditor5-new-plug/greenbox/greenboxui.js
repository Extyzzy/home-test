import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import positiveSvg from "../img/plus_round.svg";

export default class Greenboxui extends Plugin {
    init() {
        const editor = this.editor;

        // The "simpleBox" button must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add( 'greenBox', locale => {
            // The state of the button will be bound to the widget command.
            const command = editor.commands.get( 'insertGreenBox' );

            // The button will be an instance of ButtonView.
            const buttonView = new ButtonView( locale );

            buttonView.set( {
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
                label: 'GreenBox',
                icon: positiveSvg,
                tooltip: true
            } );

            // Bind the state of the button to the command.
            buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

            // Execute the command when the button is clicked (executed).
            this.listenTo( buttonView, 'execute', () => editor.execute( 'insertGreenBox') );

            return buttonView;
        } );
    }
}