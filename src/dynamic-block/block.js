/**
 * BLOCK: dynamic-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText } = wp.editor;
const { Spinner, withAPIData, ServerSideRender } = wp.components;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('cgb/block-dynamic-block', {
	title: __('Dynamic Block'),
	description: __('A dynamic block'),
	icon: 'image-rotate',
	category: 'common',
	keywords: [
		__('dynamic-block'),
		__('Posts'),
		__('Police Academy')
	],
	edit: function({ attributes, setAttributes, className, isSelected }) {
		return (
			<ServerSideRender
				block="cgb/block-dynamic-block"
				attributes={attributes}
			/>
		);
	},
	save: function( { attributes } ) {
		return <div>Bleep bloop this block is deactivated.</div>;
	}
});
