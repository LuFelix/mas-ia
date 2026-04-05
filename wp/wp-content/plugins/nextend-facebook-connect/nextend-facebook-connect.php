<?php
/*
Plugin Name: Nextend Social Login
Plugin URI: https://social-login.nextendweb.com/
Description: Nextend Social Login displays social login buttons for Facebook, Google and X (formerly Twitter).
Version: 3.1.23
Requires PHP: 7.4
Requires at least: 4.9
Author: Nextendweb
Author URI: https://nextendweb.com/
License: GPL2
Text Domain: nextend-facebook-connect
Domain Path: /languages
*/

if (!defined('NSL_PATH_FILE')) {
    define('NSL_PATH_FILE', __FILE__);
}

if (!defined('NSL_PATH')) {
    define('NSL_PATH', dirname(NSL_PATH_FILE));
}
if (!defined('NSL_PLUGIN_BASENAME')) {
    define('NSL_PLUGIN_BASENAME', plugin_basename(NSL_PATH_FILE));
}

if (!defined('NSL_MIN_PHP_VERSION')) {
    define('NSL_MIN_PHP_VERSION', '7.4');
}

if (!defined('NSL_MIN_WP_VERSION')) {
    define('NSL_MIN_WP_VERSION', '4.9');
}


if (!version_compare(PHP_VERSION, NSL_MIN_PHP_VERSION, '>=')) {
    add_action('admin_notices', 'nsl_fail_php_version');
} elseif (!version_compare(get_bloginfo('version'), NSL_MIN_WP_VERSION, '>=')) {
    add_action('admin_notices', 'nsl_fail_wp_version');
} else {
    require_once(NSL_PATH . '/nextend-social-login.php');
}

function nsl_fail_php_version() {
    /* translators: %2$s: PHP version */
    $message      = sprintf(esc_html__('%1$s requires PHP version %2$s+, plugin is currently NOT ACTIVE.', 'nextend-facebook-connect'), 'Nextend Social Login', NSL_MIN_PHP_VERSION);
    $html_message = sprintf('<div class="error">%s</div>', wpautop($message));
    echo wp_kses_post($html_message);
}

function nsl_fail_wp_version() {
    /* translators: %2$s: WordPress version */
    $message      = sprintf(esc_html__('%1$s requires WordPress version %2$s+. Because you are using an earlier version, the plugin is currently NOT ACTIVE.', 'nextend-facebook-connect'), 'Nextend Social Login', NSL_MIN_WP_VERSION);
    $html_message = sprintf('<div class="error">%s</div>', wpautop($message));
    echo wp_kses_post($html_message);
}