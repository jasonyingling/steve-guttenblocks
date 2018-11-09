/**
 * BLOCK: steve-guttenblocks
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
registerBlockType('cgb/simple-block', {
	title: __('Simple Block'),
	description: __('A simple block using the RichText element'),
	icon: 'shield',
	category: 'common',
	keywords: [
		__('simple-block'),
		__('Simple Block'),
		__('RichText')
	],
	attributes: {
		content: {
			type: 'array',
			source: 'children',
			selector: 'h2',
		},
	},
	edit: function ({ attributes, setAttributes, className, isSelected }) {
		return (
			<RichText
				tagName="h2"
				className={className}
				value={attributes.content}
				onChange={(content) => setAttributes({ content })}
				placeholder={__('Enter text...', 'custom-block')}
				keepPlaceholderOnFocus={true}
			/>
		);
	},
	save: function( { attributes } ) {
		return (
			<RichText.Content tagName="h2" value={ attributes.content } />
		);
	}
});
