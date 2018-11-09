<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since 	1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * `wp-blocks`: includes block type registration and related functions.
 *
 * @since 1.0.0
 */
function steve_guttenblocks_cgb_block_assets() {
	// Styles.
	wp_enqueue_style(
		'steve_guttenblocks-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' ) // Version: filemtime — Gets file modification time.
	);
} // End function steve_guttenblocks_cgb_block_assets().

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'steve_guttenblocks_cgb_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function steve_guttenblocks_cgb_editor_assets() {
	// Scripts.
	wp_enqueue_script(
		'steve_guttenblocks-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components' ) // Dependencies, defined above.
		// filemtime( plugin_dir_path( __FILE__ ) . 'block.js' ) // Version: filemtime — Gets file modification time.
	);

	// Styles.
	wp_enqueue_style(
		'steve_guttenblocks-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' ) // Version: filemtime — Gets file modification time.
	);
} // End function steve_guttenblocks_cgb_editor_assets().

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'steve_guttenblocks_cgb_editor_assets' );

function cgb_dynamic_block_posts( $attributes ) {
	$dynamic_block_title = '';

	$recent_posts = wp_get_recent_posts( array(
		'numberposts' => 3,
		'post_stats' => 'publish'
	) );

	if ( $attributes['content'] ) {
		$title_content = '';

		foreach ( $attributes['content'] as $title ) {
			if ( is_string($title) ) {
				$title_content .= $title;
			} else {
				$title_content .= '<' . $title['type'] . '>';
			}
		}

		$dynamic_block_title = sprintf( '<h2>%1$s</h2>', $title_content );
	}

	$list_item_markup = '';

	foreach ( $recent_posts as $post ) {
		$post_id = $post['ID'];

		$title = get_the_title( $post_id );

		$list_item_markup .= sprintf(
			'<li><a href="%1$s">%2$s</a></li>',
			esc_url( get_permalink( $post_id ) ),
			esc_html( $title )
		);
	}

	$class = 'cgb-dynamic-block';
	if ( isset( $attributes['className'] ) ) {
		$class .= ' ' . $attributes['className'];
	}

	$block_content = sprintf(
		'<div class="%1$s">%2$s<ul>%3$s</ul></div>',
		esc_attr( $class ),
		$dynamic_block_title,
		$list_item_markup
	);

	return $block_content;
}

function cgb_api_block_posts( $attributes ) {

	$recent_posts = wp_get_recent_posts(
		array(
			'numberposts' => 3,
			'post_stats'  => 'publish',
		)
	);

	$dynamic_block_title = ( $attributes['content'] ) ? sprintf( '<h2>%1$s</h2>', $attributes['content'] ) : '';

	$list_item_markup = '';

	foreach ( $recent_posts as $post ) {
		$post_id = $post['ID'];

		$title = get_the_title( $post_id );

		$list_item_markup .= sprintf(
			'<li><a href="%1$s">%2$s</a></li>',
			esc_url( get_permalink( $post_id ) ),
			esc_html( $title )
		);
	}

	$class = 'cgb-api-block';
	if ( isset( $attributes['className'] ) ) {
		$class .= ' ' . $attributes['className'];
	}

	$block_content = sprintf(
		'<div class="%1$s">%2$s<ul>%3$s</ul></div>',
		esc_attr( $class ),
		$dynamic_block_title,
		$list_item_markup
	);

	return $block_content;
}

function register_dynamic_blocks() {
	register_block_type( 'cgb/block-dynamic-block', array(
		'attributes' => array(
			'content' => array(
				'type' => 'array',
			),
			'className' => array(
				'type' => 'string',
			)
		),
		'render_callback' => 'cgb_dynamic_block_posts',
	) );

	register_block_type(
		'cgb/api-block',
		array(
			'attributes' => array(
				'content' => array(
					'type' => 'string',
				),
				'className' => array(
					'type' => 'string',
				),
			),
			'render_callback' => 'cgb_api_block_posts',
		)
	);
}

add_action( 'init', 'register_dynamic_blocks' );