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
registerBlockType('cgb/block-steve-guttenblocks', {
	title: __('Steve Guttenblocks'),
	description: __('Guttenberg with two Ts'),
	icon: 'shield',
	category: 'common',
	keywords: [
		__('steve-guttenblocks — CGB Block'),
		__('Steve Guttenberg'),
		__('Police Academy')
	],
	attributes: {
		content: {
			type: 'array',
			source: 'children',
			selector: 'h2',
		},
		cite: {
			type: 'array',
			source: 'children',
			selector: 'p',
		},
		sources: {
			type: 'array',
			source: 'children',
			selector: 'ul',
		}
	},
	edit: function ( { attributes, setAttributes, className, isSelected } ) {
		return (
			<div className={ className } >
				<RichText 
					tagName="h2"
					value={ attributes.content }
					onChange={ ( content ) => setAttributes( { content } ) }
					placeholder={ __('What up, bruh?') }
				/>
				<RichText
					tagName="p"
					value={ attributes.cite }
					onChange={ ( cite ) => setAttributes( { cite } ) }
					placeholder={__('Nada')}
				/>
				<RichText
					tagName="ul"
					multiline="li"
					value={attributes.sources}
					onChange={(sources) => setAttributes({ sources })}
					placeholder={__('Sources')}
				/>
			</div>
		);
	},
	save: function( { attributes } ) {
		return (
			<div>
				<RichText.Content tagName="h2" value={ attributes.content } />
				<RichText.Content tagName="p" value={ attributes.cite } />
				<RichText.Content tagName="ul" value={ attributes.sources } />
			</div>
		);
	}
});
