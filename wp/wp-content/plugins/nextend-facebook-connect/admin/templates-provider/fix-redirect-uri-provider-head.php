<?php
defined('ABSPATH') || die();
/** @var $this NextendSocialProviderAdmin */

$provider = $this->getProvider();

$fixOAuthRedirectURLGuideUrl = $provider->getDocURL() . '#oauth-redirect-url-changes';
?>
<ul>
    <li><?php printf(__('Follow the guide at: %s', 'nextend-facebook-connect'), '<a href="' . $fixOAuthRedirectURLGuideUrl . '" target="_blank">' . $fixOAuthRedirectURLGuideUrl . '</a>'); ?></li>
</ul>