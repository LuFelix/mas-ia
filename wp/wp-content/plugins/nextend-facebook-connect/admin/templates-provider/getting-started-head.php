<?php
defined('ABSPATH') || die();
/** @var $this NextendSocialProviderAdmin */

$provider = $this->getProvider();

$gettingStartedGuideUrl = apply_filters('nsl_getting_started_guide_url', $provider->getDocURL() . '#configuration');

?>
<div class="nsl-admin-getting-started"><!-- closed by getting-started-footer.php -->
    <h2 class="title"><?php _e('Getting Started', 'nextend-facebook-connect'); ?></h2>

    <p><?php printf(__('To allow your visitors to log in with their %1$s account, first you must create an App for %1$s. The following guide will help you through the %1$s App creation process. After you have created your %1$s App, head over to "Settings" and configure the fields with the credentials of the App you created.', 'nextend-facebook-connect'), $provider->getLabel()); ?></p>


    <h2 class="title"><?php printf(__('How to create an App for %s: ', 'nextend-facebook-connect'), $provider->getLabel()); ?></h2>
    <ul>
        <li><?php printf(__('Follow the guide at: %s', 'nextend-facebook-connect'), '<a href="' . $gettingStartedGuideUrl . '" target="_blank">' . $gettingStartedGuideUrl . '</a>'); ?></li>
    </ul>


    <h2 class="title"><?php _e('URLs for the App creation:', 'nextend-facebook-connect'); ?></h2>