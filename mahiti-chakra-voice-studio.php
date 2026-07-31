<?php
/**
 * Plugin Name: Mahiti Chakra Pro AI Voice Studio
 * Plugin URI: https://mahitichakra.in
 * Description: 100% Free 100 HD AI Kannada Voice Studio Embed Plugin for mahitichakra.in
 * Version: 2.5.0
 * Author: Mahiti Chakra Team
 * Author URI: https://mahitichakra.in
 */

if (!defined('ABSPATH')) exit; // Exit if accessed directly

function render_mahiti_voice_studio_shortcode() {
    return '<div style="width:100%; margin:20px 0;">
        <iframe src="https://kannada-pro-studio.onrender.com?v=' . time() . '" width="100%" height="800px" style="border:none; border-radius:20px; box-shadow: 0 10px 30px rgba(0,0,0,0.35);"></iframe>
    </div>';
}
add_shortcode('mahiti_ai_voice', 'render_mahiti_voice_studio_shortcode');
